import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { parseSqlStampsForWeek, readMigrationsSql } from "./fcs-fbs-stamp-gate.ts";
import { fcsStubsForWeek } from "./fcs-stubs.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const pack = JSON.parse(
  readFileSync(join(root, "data/week7_fbs_fbs_kick_tv_vegas_2026.json"), "utf8"),
) as {
  meta: { n_games: number; n_with_vegas: number; n_blank_vegas: number; n_blank_tv: number; n_tbd_kick: number };
  games: Array<{
    espn_event_id: string;
    home_slug: string;
    away_slug: string;
    kick_ct: string | null;
    tv: string | null;
    vegas_details: string | null;
    board_vegas_spread: number | null;
    over_under: number | null;
  }>;
};
const sql = readFileSync(join(root, "migrations/0057_week7_kick_tv_vegas.sql"), "utf8");

describe("Week 7 FBS–FBS kick / TV / Vegas (0057)", () => {
  it("covers 57 games, 6 Vegas (ESPN DraftKings = CBS Sports), 1 TBD kick", () => {
    assert.equal(pack.meta.n_games, 57);
    assert.equal(pack.games.length, 57);
    assert.equal(pack.meta.n_with_vegas, 6);
    assert.equal(pack.meta.n_blank_vegas, 51);
    assert.equal(pack.meta.n_tbd_kick, 1);
    assert.equal((sql.match(/update games/g) ?? []).length, 57);
    assert.equal((sql.match(/g\.week = 7;/g) ?? []).length, 57);
    assert.doesNotMatch(sql, /home_score|away_score|status\s*=|hx_rating|win_title|make_field/);
  });

  it("stores the board convention (positive = home favored) for every Vegas row", () => {
    const expected: Array<[string, string, number, number]> = [
      ["texas-state", "colorado-state", 11.5, 67.5],
      ["purdue", "washington", 2.5, 51.5],
      ["kansas-state", "kansas", 8.5, 54.5],
      ["tennessee", "alabama", -6.5, 55.5],
      ["oklahoma", "kentucky", 6.5, 42.5],
      ["houston", "oklahoma-state", 3.5, 58.5],
    ];
    const withVegas = pack.games.filter((g) => g.board_vegas_spread != null);
    assert.equal(withVegas.length, expected.length);
    for (const [home, away, spread, total] of expected) {
      const g = withVegas.find((r) => r.home_slug === home && r.away_slug === away);
      assert.ok(g, `${away} @ ${home}`);
      assert.equal(g.board_vegas_spread, spread);
      assert.equal(g.over_under, total);
      const block = sql.split("\n\n").find((b) => b.includes(`h.slug = '${home}' and a.slug = '${away}'`));
      assert.ok(block, `sql block ${away} @ ${home}`);
      assert.match(block, new RegExp(`vegas_spread = ${spread}\\b`));
      assert.match(block, new RegExp(`vegas_total = ${total}\\b`));
    }
  });

  it("holds Nebraska @ Oregon kick + TV (ESPN vs CBS disagree; goducks.com TBD)", () => {
    const g = pack.games.find((r) => r.home_slug === "oregon" && r.away_slug === "nebraska");
    assert.equal(g?.kick_ct, null);
    assert.equal(g?.tv, null);
    const block = sql.split("\n\n").find((b) => b.includes("h.slug = 'oregon' and a.slug = 'nebraska'"));
    assert.ok(block);
    assert.doesNotMatch(block, /kickoff_at|\btv\s*=/);
  });

  it("pins the featured Alabama @ Tennessee card: Sat 14:30 CT · ABC · ALA −6.5 / 55.5", () => {
    const g = pack.games.find((r) => r.home_slug === "tennessee" && r.away_slug === "alabama");
    assert.equal(g?.kick_ct, "2026-10-17 14:30");
    assert.equal(g?.tv, "ABC");
    assert.equal(g?.vegas_details, "ALA -6.5");
    assert.match(sql, /kickoff_at = timestamptz '2026-10-17 14:30:00-05'/);
  });
});

describe("Week 7 Tuesday FINALs (0058, DEL@MTSU + FIU@JXST)", () => {
  const tueSql = readFileSync(join(root, "migrations/0058_week7_tue_finals.sql"), "utf8");
  const expected = [
    ["401871067", "middle-tennessee", "delaware", 33, 30, "Delaware @ Middle Tennessee — Middle Tennessee 33, Delaware 30"],
    ["401871053", "jacksonville-state", "fiu", 27, 24, "Florida International @ Jacksonville State — Jacksonville State 27, FIU 24"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((tueSql.match(/update games/g) ?? []).length, 2);
    assert.equal((tueSql.match(/g\.week = 7/g) ?? []).length, 2);
    for (const [espn, hSlug, aSlug, hs, as, label] of expected) {
      assert.ok(tueSql.includes(`-- ${label}`), label);
      assert.ok(tueSql.includes(`home_score = ${hs},\n    away_score = ${as}\n`), `${espn} scores`);
      assert.ok(tueSql.includes(`and h.slug = '${hSlug}' and a.slug = '${aSlug}';`), `${espn} orientation`);
      assert.match(tueSql, new RegExp(`Source event ${espn}`));
    }
    assert.doesNotMatch(tueSql, /kickoff_at|vegas_spread|vegas_total|\btv\s*=|hx_rating|win_title|make_field/);
    const header = tueSql.split(/update games/i)[0] ?? "";
    assert.doesNotMatch(header, /\b401\d{6,}\b/);
  });
});

describe("Week 7 Wednesday FINALs (0059, KENN@MOST + WKU@SHSU)", () => {
  const wedSql = readFileSync(join(root, "migrations/0059_week7_wed_finals.sql"), "utf8");
  const expected = [
    ["401871054", "missouri-state", "kennesaw-state", 24, 21, "Kennesaw State @ Missouri State — Missouri State 24, Kennesaw State 21"],
    ["401871068", "sam-houston", "western-kentucky", 3, 16, "Western Kentucky @ Sam Houston — Western Kentucky 16, Sam Houston 3"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((wedSql.match(/update games/g) ?? []).length, 2);
    assert.equal((wedSql.match(/g\.week = 7/g) ?? []).length, 2);
    for (const [espn, hSlug, aSlug, hs, as, label] of expected) {
      assert.ok(wedSql.includes(`-- ${label}`), label);
      assert.ok(wedSql.includes(`home_score = ${hs},\n    away_score = ${as}\n`), `${espn} scores`);
      assert.ok(wedSql.includes(`and h.slug = '${hSlug}' and a.slug = '${aSlug}';`), `${espn} orientation`);
      assert.match(wedSql, new RegExp(`Source event ${espn}`));
    }
    assert.doesNotMatch(wedSql, /kickoff_at|vegas_spread|vegas_total|\btv\s*=|hx_rating|win_title|make_field/);
    const header = wedSql.split(/update games/i)[0] ?? "";
    assert.doesNotMatch(header, /\b401\d{6,}\b/);
  });
});

describe("Week 7 Thursday FINALs (0060, ECU@UAB + GASO@ODU + CSU@TXST)", () => {
  const thuSql = readFileSync(join(root, "migrations/0060_week7_thu_finals.sql"), "utf8");
  const expected = [
    ["401862800", "uab", "east-carolina", 30, 17, "East Carolina @ UAB — UAB 30, East Carolina 17 (OT)"],
    ["401869950", "old-dominion", "georgia-southern", 15, 23, "Georgia Southern @ Old Dominion — Georgia Southern 23, Old Dominion 15 (road win)"],
    ["401860923", "texas-state", "colorado-state", 66, 27, "Colorado State @ Texas State — Texas State 66, Colorado State 27"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((thuSql.match(/update games/g) ?? []).length, 3);
    assert.equal((thuSql.match(/g\.week = 7/g) ?? []).length, 3);
    for (const [espn, hSlug, aSlug, hs, as, label] of expected) {
      assert.ok(thuSql.includes(`-- ${label}`), label);
      assert.ok(thuSql.includes(`home_score = ${hs},\n    away_score = ${as}\n`), `${espn} scores`);
      assert.ok(thuSql.includes(`and h.slug = '${hSlug}' and a.slug = '${aSlug}';`), `${espn} orientation`);
      assert.match(thuSql, new RegExp(`Source event ${espn}`));
    }
    assert.doesNotMatch(thuSql, /kickoff_at|vegas_spread|vegas_total|\btv\s*=|hx_rating|win_title|make_field/);
    const header = thuSql.split(/update games/i)[0] ?? "";
    assert.doesNotMatch(header, /\b401\d{6,}\b/);
  });
});

describe("Week 7 Friday FINALs (0061, MEM@TULN + WASH@PUR + APP@CCU)", () => {
  const friSql = readFileSync(join(root, "migrations/0061_week7_fri_finals.sql"), "utf8");
  const expected = [
    ["401862801", "tulane", "memphis", 31, 17, "Memphis @ Tulane — Tulane 31, Memphis 17"],
    ["401858493", "purdue", "washington", 26, 38, "Washington @ Purdue — Washington 38, Purdue 26 (road win)"],
    ["401869844", "coastal-carolina", "app-state", 32, 35, "App State @ Coastal Carolina — App State 35, Coastal Carolina 32 (road win)"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((friSql.match(/update games/g) ?? []).length, 3);
    assert.equal((friSql.match(/g\.week = 7/g) ?? []).length, 3);
    for (const [espn, hSlug, aSlug, hs, as, label] of expected) {
      assert.ok(friSql.includes(`-- ${label}`), label);
      assert.ok(friSql.includes(`home_score = ${hs},\n    away_score = ${as}\n`), `${espn} scores`);
      assert.ok(friSql.includes(`and h.slug = '${hSlug}' and a.slug = '${aSlug}';`), `${espn} orientation`);
      assert.match(friSql, new RegExp(`Source event ${espn}`));
    }
    assert.doesNotMatch(friSql, /kickoff_at|vegas_spread|vegas_total|\btv\s*=|hx_rating|win_title|make_field/);
    const header = friSql.split(/update games/i)[0] ?? "";
    assert.doesNotMatch(header, /\b401\d{6,}\b/);
  });
});

describe("Week 7 Saturday FINALs (0062, 46 FBS–FBS cards)", () => {
  const satSql = readFileSync(join(root, "migrations/0062_week7_sat_finals.sql"), "utf8");
  // [espn, home slug, away slug, home score, away score, label]
  const expected = [
    ["401856833", "colorado", "utah", 24, 27, "Utah @ Colorado — Utah 27, Colorado 24 (road win)"],
    ["401864521", "hawaii", "new-mexico", 10, 21, "New Mexico @ Hawaiʻi — New Mexico 21, Hawaiʻi 10 (road win)"],
    ["401856719", "georgia", "auburn", 24, 27, "Auburn @ Georgia — Auburn 27, Georgia 24 (road win)"],
    ["401856809", "byu", "notre-dame", 28, 24, "Notre Dame @ BYU — BYU 28, Notre Dame 24"],
    ["401858263", "miami", "florida-state", 43, 35, "Florida State @ Miami — Miami 43, Florida State 35 (2OT)"],
    ["401858488", "indiana", "ohio-state", 15, 19, "Ohio State @ Indiana — Ohio State 19, Indiana 15 (road win)"],
    ["401856723", "tennessee", "alabama", 26, 10, "Alabama @ Tennessee — Tennessee 26, Alabama 10"],
    ["401856724", "texas", "florida", 24, 27, "Florida @ Texas — Florida 27, Texas 24 (road win)"],
    ["401856721", "ole-miss", "missouri", 31, 3, "Missouri @ Ole Miss — Ole Miss 31, Missouri 3"],
    ["401856828", "texas-tech", "arizona-state", 53, 25, "Arizona State @ Texas Tech — Texas Tech 53, Arizona State 25"],
    ["401858494", "ucla", "wisconsin", 17, 7, "Wisconsin @ UCLA — UCLA 17, Wisconsin 7"],
    ["401856722", "oklahoma", "kentucky", 13, 21, "Kentucky @ Oklahoma — Kentucky 21, Oklahoma 13 (road win)"],
    ["401856720", "lsu", "mississippi-state", 31, 0, "Mississippi State @ LSU — LSU 31, Mississippi State 0"],
    ["401856831", "houston", "oklahoma-state", 35, 32, "Oklahoma State @ Houston — Houston 35, Oklahoma State 32"],
    ["401858269", "california", "wake-forest", 7, 41, "Wake Forest @ California — Wake Forest 41, California 7 (road win)"],
    ["401858268", "smu", "virginia", 23, 13, "Virginia @ SMU — SMU 23, Virginia 13"],
    ["401858491", "michigan-state", "northwestern", 21, 24, "Northwestern @ Michigan State — Northwestern 24, Michigan State 21 (road win)"],
    ["401856829", "west-virginia", "cincinnati", 45, 42, "Cincinnati @ West Virginia — West Virginia 45, Cincinnati 42"],
    ["401856830", "kansas-state", "kansas", 35, 24, "Kansas @ Kansas State — Kansas State 35, Kansas 24"],
    ["401858267", "boston-college", "pittsburgh", 27, 21, "Pittsburgh @ Boston College — Boston College 27, Pittsburgh 21"],
    ["401862802", "army", "florida-atlantic", 56, 24, "Florida Atlantic @ Army — Army 56, Florida Atlantic 24"],
    ["401866441", "bowling-green", "ball-state", 31, 32, "Ball State @ Bowling Green — Ball State 32, Bowling Green 31 (OT, road win)"],
    ["401869957", "james-madison", "georgia-state", 49, 22, "Georgia State @ James Madison — James Madison 49, Georgia State 22"],
    ["401858489", "maryland", "rutgers", 30, 37, "Rutgers @ Maryland — Rutgers 37, Maryland 30 (road win)"],
    ["401862803", "temple", "charlotte", 31, 38, "Charlotte @ Temple — Charlotte 38, Temple 31 (road win)"],
    ["401866442", "buffalo", "massachusetts", 25, 18, "Massachusetts @ Buffalo — Buffalo 25, Massachusetts 18 (OT)"],
    ["401866443", "central-michigan", "western-michigan", 14, 21, "Western Michigan @ Central Michigan — Western Michigan 21, Central Michigan 14 (road win)"],
    ["401858264", "virginia-tech", "georgia-tech", 34, 24, "Georgia Tech @ Virginia Tech — Virginia Tech 34, Georgia Tech 24"],
    ["401858266", "duke", "north-carolina", 20, 24, "North Carolina @ Duke — North Carolina 24, Duke 20 (road win)"],
    ["401858490", "michigan", "penn-state", 21, 18, "Penn State @ Michigan — Michigan 21, Penn State 18"],
    ["401864522", "wyoming", "northern-illinois", 41, 23, "Northern Illinois @ Wyoming — Wyoming 41, Northern Illinois 23"],
    ["401864524", "air-force", "unlv", 41, 31, "UNLV @ Air Force — Air Force 41, UNLV 31"],
    ["401866444", "eastern-michigan", "toledo", 14, 34, "Toledo @ Eastern Michigan — Toledo 34, Eastern Michigan 14 (road win)"],
    ["401866478", "miami-oh", "akron", 34, 14, "Akron @ Miami (OH) — Miami (OH) 34, Akron 14"],
    ["401862805", "rice", "tulsa", 17, 38, "Tulsa @ Rice — Tulsa 38, Rice 17 (road win)"],
    ["401869966", "louisiana", "troy", 33, 6, "Troy @ Louisiana — Louisiana 33, Troy 6"],
    ["401860903", "oregon-state", "washington-state", 48, 30, "Washington State @ Oregon State — Oregon State 48, Washington State 30"],
    ["401856726", "vanderbilt", "arkansas", 21, 31, "Arkansas @ Vanderbilt — Arkansas 31, Vanderbilt 21 (road win)"],
    ["401856832", "baylor", "tcu", 6, 17, "TCU @ Baylor — TCU 17, Baylor 6 (road win)"],
    ["401862806", "usf", "kent-state", 29, 2, "Kent State @ South Florida — South Florida 29, Kent State 2"],
    ["401869934", "southern-miss", "arkansas-state", 13, 23, "Arkansas State @ Southern Miss — Arkansas State 23, Southern Miss 13 (road win)"],
    ["401858265", "syracuse", "louisville", 26, 34, "Louisville @ Syracuse — Louisville 34, Syracuse 26 (road win)"],
    ["401862804", "utsa", "navy", 38, 34, "Navy @ UTSA — UTSA 38, Navy 34"],
    ["401871091", "ul-monroe", "louisiana-tech", 0, 24, "Louisiana Tech @ UL Monroe — Louisiana Tech 24, UL Monroe 0 (road win)"],
    ["401864523", "utep", "san-jose-state", 11, 24, "San José State @ UTEP — San José State 24, UTEP 11 (road win)"],
    ["401860904", "san-diego-state", "fresno-state", 26, 23, "Fresno State @ San Diego State — San Diego State 26, Fresno State 23"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal(expected.length, 46);
    assert.equal((satSql.match(/update games/g) ?? []).length, 46);
    assert.equal((satSql.match(/g\.week = 7/g) ?? []).length, 46);
    assert.equal((satSql.match(/status = 'final'/g) ?? []).length, 46);
    for (const [espn, hSlug, aSlug, hs, as, label] of expected) {
      assert.ok(satSql.includes(`-- ${label}`), label);
      assert.ok(satSql.includes(`home_score = ${hs},\n    away_score = ${as}\n`), `${espn} scores`);
      assert.ok(satSql.includes(`and h.slug = '${hSlug}' and a.slug = '${aSlug}';`), `${espn} orientation`);
      assert.ok(!satSql.includes(`h.slug = '${aSlug}' and a.slug = '${hSlug}'`), `${espn} reversed`);
      assert.match(satSql, new RegExp(`Source event ${espn}`));
    }
    assert.doesNotMatch(satSql, /kickoff_at|vegas_spread|vegas_total|\btv\s*=|hx_rating|win_title|make_field/);
    const header = satSql.split(/update games/i)[0] ?? "";
    assert.doesNotMatch(header, /\b401\d{6,}\b/);
  });

  it("leaves the in-progress Nebraska @ Oregon card unstamped", () => {
    assert.doesNotMatch(satSql, /h\.slug = 'oregon' and a\.slug = 'nebraska'/);
  });

  it("keeps 0057 kick on all stamped cards in the stamp gate", () => {
    const sqlByEspn = parseSqlStampsForWeek(readMigrationsSql(root), 7);
    for (const [espn] of expected) {
      const row = sqlByEspn.get(espn);
      assert.ok(row, `missing stamp-gate row for ${espn}`);
      assert.equal(row.hasKick, true, `${espn} kick`);
    }
  });
});

describe("Week 7 FBS vs FCS FINALs (WEEK7_FCS_STUBS)", () => {
  it("has the five ESPN STATUS_FINAL results with venue orientation", () => {
    const got = fcsStubsForWeek(7).map((g) => [g.teamSlug, g.home, g.opponentLabel, g.homeScore, g.awayScore, g.status]);
    assert.deepEqual(got, [
      ["clemson", true, "Charleston Southern", 37, 0, "final"],
      ["texas-am", true, "The Citadel", 41, 0, "final"],
      ["nevada", false, "North Dakota State", 31, 17, "final"],
      ["stanford", true, "Elon", 34, 7, "final"],
      ["ohio", false, "Sacramento State", 7, 48, "final"],
    ]);
  });
});

describe("Week 7 late Saturday FINAL (0063, NEB@ORE)", () => {
  const lateSql = readFileSync(join(root, "migrations/0063_week7_late_finals.sql"), "utf8");
  const expected = [
    ["401858492", "oregon", "nebraska", 17, 14, "Nebraska @ Oregon — Oregon 17, Nebraska 14"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((lateSql.match(/update games/g) ?? []).length, 1);
    assert.equal((lateSql.match(/g\.week = 7/g) ?? []).length, 1);
    for (const [espn, hSlug, aSlug, hs, as, label] of expected) {
      assert.ok(lateSql.includes(`-- ${label}`), label);
      assert.ok(lateSql.includes(`home_score = ${hs},\n    away_score = ${as}\n`), `${espn} scores`);
      assert.ok(lateSql.includes(`and h.slug = '${hSlug}' and a.slug = '${aSlug}';`), `${espn} orientation`);
      assert.match(lateSql, new RegExp(`Source event ${espn}`));
    }
    assert.doesNotMatch(lateSql, /kickoff_at|vegas_spread|vegas_total|\btv\s*=|hx_rating|win_title|make_field/);
    const header = lateSql.split(/update games/i)[0] ?? "";
    assert.doesNotMatch(header, /\b401\d{6,}\b/);
  });

  it("every Week 7 FBS–FBS card in the 0057 pack has a FINAL stamp (57/57)", () => {
    const all = ["0058", "0059", "0060", "0061", "0062", "0063"]
      .map((n) => {
        const f = readdirSync(join(root, "migrations")).find((x) => x.startsWith(`${n}_`));
        assert.ok(f, n);
        return readFileSync(join(root, "migrations", f), "utf8");
      })
      .join("\n");
    for (const g of pack.games) {
      assert.ok(
        all.includes(`and h.slug = '${g.home_slug}' and a.slug = '${g.away_slug}';`),
        `${g.away_slug} @ ${g.home_slug} FINAL`,
      );
    }
  });
});
