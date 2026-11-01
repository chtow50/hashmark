import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { fcsStubsForWeek } from "./fcs-stubs.ts";
import { AP_STAMP, BOARD_WEEK, FEATURED_SLATE_WEEK, WEEK9_FEATURED } from "./featured.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");

describe("Week 8 late FINAL (0071, Houston @ Utah)", () => {
  const lateSql = readFileSync(join(root, "migrations/0071_week8_late_finals.sql"), "utf8");
  it("stamps Utah 21, Houston 13 with exact home/away orientation, scores+status only", () => {
    assert.equal((lateSql.match(/update games/g) ?? []).length, 1);
    assert.match(lateSql, /g\.week = 8/);
    assert.match(lateSql, /h\.slug = 'utah' and a\.slug = 'houston'/);
    assert.match(lateSql, /home_score = 21/);
    assert.match(lateSql, /away_score = 13/);
    assert.match(lateSql, /status = 'final'/);
    assert.doesNotMatch(lateSql, /kickoff_at|vegas_spread|\btv\s*=|hx_rating|win_title|make_field/);
    // ESPN event digits stay below the update block so the stamp gate keeps 0064 kick/Vegas.
    const header = lateSql.slice(0, lateSql.indexOf("update games"));
    assert.doesNotMatch(header, /401856837/);
    assert.match(lateSql, /401856837/);
  });
});

const pack = JSON.parse(
  readFileSync(join(root, "data/week9_fbs_fbs_kick_tv_vegas_2026.json"), "utf8"),
) as {
  meta: { n_games: number; n_with_vegas: number; n_blank_vegas: number; n_blank_tv: number; n_tbd_kick: number; excluded_fcs: string[] };
  games: Array<{
    home_slug: string;
    away_slug: string;
    kick_ct: string | null;
    tv: string | null;
    vegas_details: string | null;
    board_vegas_spread: number | null;
    over_under: number | null;
  }>;
};
const sql = readFileSync(join(root, "migrations/0072_week9_kick_tv_vegas.sql"), "utf8");
const blockFor = (home: string, away: string) =>
  sql.split("\n\n").find((b) => b.includes(`h.slug = '${home}' and a.slug = '${away}'`));

describe("Week 9 FBS–FBS kick / TV / Vegas (0072)", () => {
  it("covers 54 games, 6 Vegas (ESPN DraftKings = CBS Sports), 0 TBD kick, 0 blank TV", () => {
    assert.equal(pack.meta.n_games, 54);
    assert.equal(pack.games.length, 54);
    assert.equal(pack.meta.n_with_vegas, 6);
    assert.equal(pack.meta.n_blank_vegas, 48);
    assert.equal(pack.meta.n_tbd_kick, 0);
    assert.equal(pack.meta.n_blank_tv, 0);
    assert.equal(pack.meta.excluded_fcs.length, 2);
    assert.equal(pack.games.filter((g) => g.vegas_details != null).length, 6);
    assert.equal(pack.games.filter((g) => g.kick_ct == null).length, 0);
    assert.equal((sql.match(/update games/g) ?? []).length, 54);
    assert.equal((sql.match(/g\.week = 9;/g) ?? []).length, 54);
    assert.doesNotMatch(sql, /home_score|away_score|status\s*=|hx_rating|win_title|make_field/);
  });

  it("stores the six two-source Vegas lines (positive = home favored)", () => {
    for (const [home, away, spread, total] of [
      ["ucf", "baylor", 2.5, 48.5],
      ["texas-tech", "arizona", 4.5, 55.5],
      ["navy", "notre-dame", -30.5, 52.5],
      ["cincinnati", "utah", -6.5, 55.5],
      ["wake-forest", "virginia", 13.5, 49.5],
      ["texas", "mississippi-state", 20.5, 50.5],
    ] as const) {
      const g = pack.games.find((r) => r.home_slug === home && r.away_slug === away);
      assert.ok(g, `${away} @ ${home}`);
      assert.equal(g.board_vegas_spread, spread);
      assert.equal(g.over_under, total);
      const block = blockFor(home, away);
      assert.ok(block, `${away} @ ${home} block`);
      assert.match(block, new RegExp(`vegas_spread = ${spread}\\b`));
      assert.match(block, new RegExp(`vegas_total = ${total}\\b`));
    }
  });

  it("kept the historical Week 9 featured Ohio State @ USC card: Sat 18:30 CT · NBC · Vegas blank", () => {
    assert.equal(BOARD_WEEK, 10);
    assert.equal(FEATURED_SLATE_WEEK, 10);
    assert.equal(WEEK9_FEATURED.homeSlug, "usc");
    assert.equal(WEEK9_FEATURED.awaySlug, "ohio-state");
    const g = pack.games.find((r) => r.home_slug === "usc" && r.away_slug === "ohio-state");
    assert.equal(g?.kick_ct, "2026-10-31 18:30");
    assert.equal(g?.tv, "NBC");
    assert.equal(g?.vegas_details, null);
    const block = blockFor("usc", "ohio-state");
    assert.ok(block);
    assert.match(block, /kickoff_at = timestamptz '2026-10-31 18:30:00-05'/);
    assert.match(block, /tv = 'NBC'/);
    assert.match(block, /vegas_spread = null/);
  });
});

describe("Week 8 AP Top 25 stamp (0073, Oct. 18)", () => {
  const apSql = readFileSync(join(root, "migrations/0073_week8_ap_top25.sql"), "utf8");
  const ap = JSON.parse(readFileSync(join(root, "data/week8_ap_top25_2026.json"), "utf8"));

  it("clears then sets 25 AP ranks on week 0 rows only", () => {
    assert.match(apSql, /update rankings set ap_rank = null where season = 2026 and week = 0;/);
    assert.equal((apSql.match(/^\s+\('[a-z-]+', \d+\)/gm) ?? []).length, 25);
    assert.match(apSql, /\('miami', 1\)/);
    assert.match(apSql, /\('byu', 2\)/);
    assert.match(apSql, /\('kentucky', 12\)/);
    assert.match(apSql, /\('arizona', 25\)/);
    assert.doesNotMatch(apSql, /'mississippi-state'|'oklahoma-state'/);
    const body = apSql
      .split("\n")
      .filter((l) => !l.startsWith("--"))
      .join("\n");
    assert.doesNotMatch(body, /hx_|make_field|win_title|truncate|games/i);
    assert.equal(ap.poll_week, 8);
    assert.equal(ap.as_of, "2026-10-18");
    assert.deepEqual(
      ap.dropped.map((d: { slug: string }) => d.slug),
      ["mississippi-state", "oklahoma-state"],
    );
    for (const t of ap.teams as { slug: string; rank: number }[]) {
      assert.match(apSql, new RegExp(`\\('${t.slug}', ${t.rank}\\)`));
    }
  });

  it("was superseded on the chrome by the Week 9 stamp (0081)", () => {
    assert.equal(AP_STAMP.week, 9);
    assert.equal(AP_STAMP.asOf, "Oct. 25");
    assert.equal(AP_STAMP.label, "Week 9 AP");
    assert.equal(AP_STAMP.columnHint, "W9 stamp");
  });
});

describe("Week 9 Tuesday FINALs (0074, DEL@WKU + SHSU@MOST)", () => {
  const tueSql = readFileSync(join(root, "migrations/0074_week9_tue_finals.sql"), "utf8");
  const expected = [
    ["401871071", "western-kentucky", "delaware", 21, 35, "Delaware @ Western Kentucky — Delaware 35, Western Kentucky 21"],
    ["401871072", "missouri-state", "sam-houston", 24, 3, "Sam Houston @ Missouri State — Missouri State 24, Sam Houston 3"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((tueSql.match(/update games/g) ?? []).length, 2);
    assert.equal((tueSql.match(/g\.week = 9/g) ?? []).length, 2);
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

describe("Week 9 Wednesday FINALs (0075, KENN@MTSU + JVST@NMSU)", () => {
  const wedSql = readFileSync(join(root, "migrations/0075_week9_wed_finals.sql"), "utf8");
  const expected = [
    ["401871058", "middle-tennessee", "kennesaw-state", 28, 44, "Kennesaw State @ Middle Tennessee — Kennesaw State 44, Middle Tennessee 28"],
    ["401871057", "new-mexico-state", "jacksonville-state", 0, 24, "Jacksonville State @ New Mexico State — Jacksonville State 24, New Mexico State 0"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((wedSql.match(/update games/g) ?? []).length, 2);
    assert.equal((wedSql.match(/g\.week = 9/g) ?? []).length, 2);
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

describe("Week 9 Thursday FINALs (0076, FAU@UNT + TROY@JMU)", () => {
  const thuSql = readFileSync(join(root, "migrations/0076_week9_thu_finals.sql"), "utf8");
  const expected = [
    ["401862812", "north-texas", "florida-atlantic", 48, 41, "Florida Atlantic @ North Texas — North Texas 48, Florida Atlantic 41"],
    ["401869963", "james-madison", "troy", 21, 24, "Troy @ James Madison — Troy 24, James Madison 21"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((thuSql.match(/update games/g) ?? []).length, 2);
    assert.equal((thuSql.match(/g\.week = 9/g) ?? []).length, 2);
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

describe("Week 9 Friday FINALs (0077, TULN@CLT + BAY@UCF; KENT@SAC stub)", () => {
  const friSql = readFileSync(join(root, "migrations/0077_week9_fri_finals.sql"), "utf8");
  const expected = [
    ["401862813", "charlotte", "tulane", 31, 38, "Tulane @ Charlotte — Tulane 38, Charlotte 31"],
    ["401856844", "ucf", "baylor", 9, 41, "Baylor @ UCF — Baylor 41, UCF 9"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((friSql.match(/update games/g) ?? []).length, 2);
    assert.equal((friSql.match(/g\.week = 9/g) ?? []).length, 2);
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

  it("adds Kent State @ Sacramento State as a Week 9 FCS FINAL stub", () => {
    const got = fcsStubsForWeek(9).filter((g) => g.teamSlug === "kent-state").map((g) => [g.teamSlug, g.home, g.opponentLabel, g.homeScore, g.awayScore, g.status]);
    assert.deepEqual(got, [["kent-state", false, "Sacramento State", 31, 10, "final"]]);
  });
});

describe("Week 9 Saturday FINALs (0078, 43 FBS games; UTEP@NDSU stub)", () => {
  const satSql = readFileSync(join(root, "migrations/0078_week9_sat_finals.sql"), "utf8");
  const expected = [
    ["401856842", "texas-tech", "arizona", 34, 26, "Arizona @ Texas Tech — Arizona 26, Texas Tech 34"],
    ["401858277", "nc-state", "california", 31, 10, "California @ NC State — California 10, NC State 31"],
    ["401858278", "syracuse", "smu", 30, 27, "SMU @ Syracuse — SMU 27, Syracuse 30"],
    ["401858279", "duke", "boston-college", 47, 2, "Boston College @ Duke — Boston College 2, Duke 47"],
    ["401858502", "iowa", "wisconsin", 30, 0, "Wisconsin @ Iowa — Wisconsin 0, Iowa 30"],
    ["401858503", "maryland", "illinois", 17, 20, "Illinois @ Maryland — Illinois 20, Maryland 17"],
    ["401859185", "navy", "notre-dame", 13, 35, "Notre Dame @ Navy — Notre Dame 35, Navy 13"],
    ["401862816", "usf", "uab", 30, 10, "UAB @ South Florida — UAB 10, South Florida 30"],
    ["401866452", "western-michigan", "bowling-green", 23, 10, "Bowling Green @ Western Michigan — Bowling Green 10, Western Michigan 23"],
    ["401858507", "rutgers", "michigan", 21, 28, "Michigan @ Rutgers — Michigan 28, Rutgers 21"],
    ["401856735", "ole-miss", "auburn", 45, 15, "Auburn @ Ole Miss — Auburn 15, Ole Miss 45"],
    ["401871096", "old-dominion", "marshall", 23, 36, "Marshall @ Old Dominion — Marshall 36, Old Dominion 23"],
    ["401856846", "colorado", "kansas-state", 27, 24, "Kansas State @ Colorado — Kansas State 24, Colorado 27"],
    ["401869944", "georgia-state", "coastal-carolina", 20, 31, "Coastal Carolina @ Georgia State — Coastal Carolina 31, Georgia State 20"],
    ["401861966", "air-force", "uconn", 35, 26, "UConn @ Air Force — UConn 26, Air Force 35"],
    ["401862815", "east-carolina", "temple", 17, 9, "Temple @ East Carolina — Temple 9, East Carolina 17"],
    ["401871097", "south-alabama", "louisiana-tech", 20, 35, "Louisiana Tech @ South Alabama — Louisiana Tech 35, South Alabama 20"],
    ["401858283", "louisville", "stanford", 52, 24, "Stanford @ Louisville — Stanford 24, Louisville 52"],
    ["401856734", "georgia", "florida", 27, 8, "Florida @ Georgia — Florida 8, Georgia 27"],
    ["401856843", "byu", "arizona-state", 27, 20, "Arizona State @ BYU — Arizona State 20, BYU 27"],
    ["401856845", "tcu", "kansas", 22, 16, "Kansas @ TCU — Kansas 16, TCU 22"],
    ["401858501", "indiana", "minnesota", 23, 16, "Minnesota @ Indiana — Minnesota 16, Indiana 23"],
    ["401858505", "oregon", "northwestern", 34, 26, "Northwestern @ Oregon — Northwestern 26, Oregon 34"],
    ["401860910", "utah-state", "colorado-state", 31, 14, "Colorado State @ Utah State — Colorado State 14, Utah State 31"],
    ["401871059", "liberty", "fiu", 49, 10, "Florida International @ Liberty — Florida International 10, Liberty 49"],
    ["401871095", "ul-monroe", "southern-miss", 21, 35, "Southern Miss @ UL Monroe — Southern Miss 35, UL Monroe 21"],
    ["401856848", "cincinnati", "utah", 25, 49, "Utah @ Cincinnati — Utah 49, Cincinnati 25"],
    ["401858284", "wake-forest", "virginia", 51, 7, "Virginia @ Wake Forest — Virginia 7, Wake Forest 51"],
    ["401864529", "san-jose-state", "new-mexico", 16, 21, "New Mexico @ San José State — New Mexico 21, San José State 16"],
    ["401856736", "oklahoma", "south-carolina", 25, 42, "South Carolina @ Oklahoma — South Carolina 42, Oklahoma 25"],
    ["401858506", "penn-state", "purdue", 31, 17, "Purdue @ Penn State — Purdue 17, Penn State 31"],
    ["401858508", "ucla", "nevada", 27, 0, "Nevada @ UCLA — Nevada 0, UCLA 27"],
    ["401869846", "georgia-southern", "app-state", 19, 3, "App State @ Georgia Southern — App State 3, Georgia Southern 19"],
    ["401856847", "iowa-state", "oklahoma-state", 51, 49, "Oklahoma State @ Iowa State — Oklahoma State 49, Iowa State 51"],
    ["401858280", "florida-state", "clemson", 24, 36, "Clemson @ Florida State — Clemson 36, Florida State 24"],
    ["401860909", "san-diego-state", "washington-state", 26, 20, "Washington State @ San Diego State — Washington State 20, San Diego State 26"],
    ["401856737", "texas", "mississippi-state", 31, 3, "Mississippi State @ Texas — Mississippi State 3, Texas 31"],
    ["401858281", "pittsburgh", "georgia-tech", 34, 11, "Georgia Tech @ Pittsburgh — Georgia Tech 11, Pittsburgh 34"],
    ["401858282", "north-carolina", "miami", 35, 38, "Miami @ North Carolina — Miami 38, North Carolina 35"],
    ["401858509", "usc", "ohio-state", 30, 18, "Ohio State @ USC — Ohio State 18, USC 30"],
    ["401856733", "arkansas", "missouri", 10, 34, "Missouri @ Arkansas — Missouri 34, Arkansas 10"],
    ["401858504", "nebraska", "washington", 10, 17, "Washington @ Nebraska — Washington 17, Nebraska 10"],
    ["401862814", "memphis", "army", 49, 22, "Army @ Memphis — Army 22, Memphis 49"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((satSql.match(/update games/g) ?? []).length, 43);
    assert.equal((satSql.match(/g\.week = 9/g) ?? []).length, 43);
    for (const [espn, hSlug, aSlug, hs, as, label] of expected) {
      assert.ok(satSql.includes(`-- ${label}`), label);
      assert.ok(satSql.includes(`home_score = ${hs},\n    away_score = ${as}\n`), `${espn} scores`);
      assert.ok(satSql.includes(`and h.slug = '${hSlug}' and a.slug = '${aSlug}';`), `${espn} orientation`);
      assert.match(satSql, new RegExp(`Source event ${espn}`));
    }
    for (const [home, away] of [["boise-state", "texas-state"], ["unlv", "northern-illinois"], ["fresno-state", "oregon-state"]]) {
      assert.ok(!satSql.includes(`and h.slug = '${home}' and a.slug = '${away}';`), `${away} @ ${home} still in progress`);
    }
    assert.doesNotMatch(satSql, /kickoff_at|vegas_spread|vegas_total|\btv\s*=|hx_rating|win_title|make_field/);
    const header = satSql.split(/update games/i)[0] ?? "";
    assert.doesNotMatch(header, /\b401\d{6,}\b/);
  });

  it("adds UTEP @ North Dakota State as a Week 9 FCS FINAL stub", () => {
    const got = fcsStubsForWeek(9).map((g) => [g.teamSlug, g.home, g.opponentLabel, g.homeScore, g.awayScore, g.status]);
    assert.deepEqual(got, [
      ["kent-state", false, "Sacramento State", 31, 10, "final"],
      ["utep", false, "North Dakota State", 31, 7, "final"],
    ]);
  });
});

describe("Week 9 Saturday late FINALs (0079, TXST@BSU, NIU@UNLV, ORST@FRES)", () => {
  const lateSql = readFileSync(join(root, "migrations/0079_week9_sat_late_finals.sql"), "utf8");
  const expected = [
    ["401860908", "boise-state", "texas-state", 46, 45, "Texas State @ Boise State — Texas State 45, Boise State 46"],
    ["401864530", "unlv", "northern-illinois", 31, 24, "Northern Illinois @ UNLV — Northern Illinois 24, UNLV 31"],
    ["401860924", "fresno-state", "oregon-state", 38, 22, "Oregon State @ Fresno State — Oregon State 22, Fresno State 38"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((lateSql.match(/update games/g) ?? []).length, 3);
    assert.equal((lateSql.match(/g\.week = 9/g) ?? []).length, 3);
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
});
