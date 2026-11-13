import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { fcsStubsForWeek } from "./fcs-stubs.ts";
import { AP_STAMP, BOARD_WEEK, FEATURED_SLATE_WEEK, WEEK10_FEATURED } from "./featured.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");

const pack = JSON.parse(
  readFileSync(join(root, "data/week10_fbs_fbs_kick_tv_vegas_2026.json"), "utf8"),
) as {
  meta: { n_games: number; n_with_vegas: number; n_blank_vegas: number; n_blank_tv: number; n_tbd_kick: number; excluded_fcs: string[] };
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
const sql = readFileSync(join(root, "migrations/0080_week10_kick_tv_vegas.sql"), "utf8");
const blockFor = (home: string, away: string) =>
  sql.split("\n\n").find((b) => b.includes(`h.slug = '${home}' and a.slug = '${away}'`));

describe("Week 10 FBS–FBS kick / TV / Vegas (0080)", () => {
  it("covers 61 games, 5 Vegas (ESPN DraftKings = CBS Sports), 3 held kicks, CST offsets", () => {
    assert.equal(pack.meta.n_games, 61);
    assert.equal(pack.games.length, 61);
    assert.equal(pack.meta.n_with_vegas, 5);
    assert.equal(pack.meta.n_blank_vegas, 56);
    assert.equal(pack.meta.n_tbd_kick, 3);
    assert.equal(pack.meta.n_blank_tv, 3);
    assert.equal(pack.meta.excluded_fcs.length, 2);
    assert.equal(pack.games.filter((g) => g.vegas_details != null).length, 5);
    assert.equal((sql.match(/update games/g) ?? []).length, 61);
    assert.equal((sql.match(/g\.week = 10;/g) ?? []).length, 61);
    assert.equal((sql.match(/kickoff_at = /g) ?? []).length, 58);
    // DST ended Nov 1: every Week 10 kick is CST (UTC−6).
    assert.equal((sql.match(/:00-06'/g) ?? []).length, 58);
    assert.doesNotMatch(sql, /:00-05'/);
    assert.doesNotMatch(sql, /home_score|away_score|status\s*=|hx_rating|win_title|make_field/);
  });

  it("leaves the TBD / conflicting kicks blank (no invented kick or TV)", () => {
    for (const [home, away] of [
      ["houston", "cincinnati"],
      ["baylor", "iowa-state"],
      ["kansas-state", "oklahoma-state"],
    ] as const) {
      const g = pack.games.find((r) => r.home_slug === home && r.away_slug === away);
      assert.ok(g, `${away} @ ${home}`);
      assert.equal(g.kick_ct, null);
      assert.equal(g.tv, null);
      const block = blockFor(home, away);
      assert.ok(block);
      assert.doesNotMatch(block, /kickoff_at|tv =/);
    }
  });

  it("stores the five two-source Vegas lines (positive = home favored)", () => {
    for (const [home, away, spread, total] of [
      ["east-carolina", "usf", -1.5, 45.5],
      ["app-state", "georgia-state", 3.5, 57.5],
      ["georgia-southern", "marshall", 8.5, 53.5],
      ["ole-miss", "georgia", -3, 56.5],
      ["northwestern", "iowa", 1.5, 42.5],
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

  it("kept the historical Week 10 featured Oregon @ Ohio State card: Sat 14:30 CT · CBS · Vegas blank", () => {
    assert.equal(BOARD_WEEK, 11);
    assert.equal(FEATURED_SLATE_WEEK, 11);
    assert.equal(WEEK10_FEATURED.homeSlug, "ohio-state");
    assert.equal(WEEK10_FEATURED.awaySlug, "oregon");
    const g = pack.games.find((r) => r.home_slug === "ohio-state" && r.away_slug === "oregon");
    assert.equal(g?.kick_ct, "2026-11-07 14:30");
    assert.equal(g?.tv, "CBS");
    assert.equal(g?.vegas_details, null);
    const block = blockFor("ohio-state", "oregon");
    assert.ok(block);
    assert.match(block, /kickoff_at = timestamptz '2026-11-07 14:30:00-06'/);
    assert.match(block, /tv = 'CBS'/);
    assert.match(block, /vegas_spread = null/);
  });
});

describe("Week 9 AP Top 25 stamp (0081, Oct. 25)", () => {
  const apSql = readFileSync(join(root, "migrations/0081_week9_ap_top25.sql"), "utf8");
  const ap = JSON.parse(readFileSync(join(root, "data/week9_ap_top25_2026.json"), "utf8"));

  it("clears then sets 25 AP ranks on week 0 rows only (T20 tie kept)", () => {
    assert.match(apSql, /update rankings set ap_rank = null where season = 2026 and week = 0;/);
    assert.equal((apSql.match(/^\s+\('[a-z-]+', \d+\)/gm) ?? []).length, 25);
    assert.match(apSql, /\('miami', 1\)/);
    assert.match(apSql, /\('ohio-state', 2\)/);
    assert.match(apSql, /\('boise-state', 20\)/);
    assert.match(apSql, /\('northwestern', 20\)/);
    assert.doesNotMatch(apSql, /', 21\)/);
    assert.match(apSql, /\('wisconsin', 25\)/);
    assert.doesNotMatch(apSql, /\('iowa',|\('usc',/);
    const body = apSql
      .split("\n")
      .filter((l) => !l.startsWith("--"))
      .join("\n");
    assert.doesNotMatch(body, /hx_|make_field|win_title|truncate|games/i);
    assert.equal(ap.poll_week, 9);
    assert.equal(ap.as_of, "2026-10-25");
    assert.deepEqual(
      ap.dropped.map((d: { slug: string }) => d.slug),
      ["iowa", "usc"],
    );
    for (const t of ap.teams as { slug: string; rank: number }[]) {
      assert.match(apSql, new RegExp(`\\('${t.slug}', ${t.rank}\\)`));
    }
  });

  it("was superseded on the chrome by the Week 11 stamp (0092)", () => {
    assert.equal(AP_STAMP.week, 11);
    assert.equal(AP_STAMP.asOf, "Nov. 8");
    assert.equal(AP_STAMP.label, "Week 11 AP");
    assert.equal(AP_STAMP.columnHint, "W11 stamp");
  });
});

describe("Week 10 Tuesday FINALs (0082, OHIO@AKR + BUFF@M-OH)", () => {
  const tueSql = readFileSync(join(root, "migrations/0082_week10_tue_finals.sql"), "utf8");
  const expected = [
    ["401866453", "akron", "ohio", 20, 28, "Ohio @ Akron — Ohio 28, Akron 20"],
    ["401866454", "miami-oh", "buffalo", 31, 34, "Buffalo @ Miami (OH) — Buffalo 34, Miami (OH) 31"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((tueSql.match(/update games/g) ?? []).length, 2);
    assert.equal((tueSql.match(/g\.week = 10/g) ?? []).length, 2);
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

describe("Week 10 Wednesday FINALs (0083, BALL@MASS + CMU@EMU; TOL@SAC stub)", () => {
  const wedSql = readFileSync(join(root, "migrations/0083_week10_wed_finals.sql"), "utf8");
  const expected = [
    ["401866455", "massachusetts", "ball-state", 31, 30, "Ball State @ Massachusetts — Massachusetts 31, Ball State 30"],
    ["401866456", "eastern-michigan", "central-michigan", 7, 35, "Central Michigan vs Eastern Michigan (neutral, Ford Field) — Central Michigan 35, Eastern Michigan 7"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((wedSql.match(/update games/g) ?? []).length, 2);
    assert.equal((wedSql.match(/g\.week = 10/g) ?? []).length, 2);
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

  it("adds Toledo @ Sacramento State as a Week 10 FCS FINAL stub", () => {
    const got = fcsStubsForWeek(10)
      .filter((g) => g.teamSlug === "toledo")
      .map((g) => [g.teamSlug, g.home, g.opponentLabel, g.homeScore, g.awayScore, g.status]);
    assert.deepEqual(got, [["toledo", false, "Sacramento State", 17, 20, "final"]]);
  });
});

describe("Week 10 Thursday FINALs (0084, UTSA@FAU + JMU@USM)", () => {
  const thuSql = readFileSync(join(root, "migrations/0084_week10_thu_finals.sql"), "utf8");
  const expected = [
    ["401862817", "florida-atlantic", "utsa", 60, 29, "UTSA @ Florida Atlantic — Florida Atlantic 60, UTSA 29"],
    ["401869964", "southern-miss", "james-madison", 23, 54, "James Madison @ Southern Miss — James Madison 54, Southern Miss 23"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((thuSql.match(/update games/g) ?? []).length, 2);
    assert.equal((thuSql.match(/g\.week = 10/g) ?? []).length, 2);
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

describe("Week 10 Friday FINALs (0085, VT@SMU + USF@ECU + NEB@ILL + UNM@NEV + TCU@ARIZ)", () => {
  const friSql = readFileSync(join(root, "migrations/0085_week10_fri_finals.sql"), "utf8");
  const expected = [
    ["401858288", "smu", "virginia-tech", 51, 28, "Virginia Tech @ SMU — SMU 51, Virginia Tech 28"],
    ["401862818", "east-carolina", "usf", 20, 17, "USF @ East Carolina — East Carolina 20, USF 17"],
    ["401858510", "illinois", "nebraska", 24, 13, "Nebraska @ Illinois — Illinois 24, Nebraska 13"],
    ["401864533", "nevada", "new-mexico", 3, 31, "New Mexico @ Nevada — New Mexico 31, Nevada 3"],
    ["401856855", "arizona", "tcu", 29, 28, "TCU @ Arizona — Arizona 29, TCU 28"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((friSql.match(/update games/g) ?? []).length, 5);
    assert.equal((friSql.match(/g\.week = 10/g) ?? []).length, 5);
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

describe("Week 10 Saturday FINALs (0086, 50 FBS–FBS; MRMK@WAKE stub)", () => {
  const satSql = readFileSync(join(root, "migrations/0086_week10_sat_finals.sql"), "utf8");
  const expected = [
    ["401858291", "notre-dame", "miami", 31, 24, "Miami @ Notre Dame — Notre Dame 31, Miami 24"],
    ["401856741", "ole-miss", "georgia", 7, 42, "Georgia @ Ole Miss — Georgia 42, Ole Miss 7"],
    ["401856849", "utah", "byu", 28, 20, "BYU @ Utah — Utah 28, BYU 20"],
    ["401856740", "lsu", "alabama", 13, 31, "Alabama @ LSU — Alabama 31, LSU 13"],
    ["401856745", "tennessee", "kentucky", 34, 6, "Kentucky @ Tennessee — Tennessee 34, Kentucky 6"],
    ["401856743", "missouri", "texas", 20, 34, "Texas @ Missouri — Texas 34, Missouri 20"],
    ["401858512", "minnesota", "ucla", 20, 34, "UCLA @ Minnesota — UCLA 34, Minnesota 20"],
    ["401858514", "ohio-state", "oregon", 28, 41, "Oregon @ Ohio State — Oregon 41, Ohio State 28"],
    ["401856856", "texas-tech", "west-virginia", 53, 48, "West Virginia @ Texas Tech — Texas Tech 53, West Virginia 48"],
    ["401856851", "houston", "cincinnati", 31, 24, "Cincinnati @ Houston — Houston 31, Cincinnati 24"],
    ["401858513", "northwestern", "iowa", 10, 24, "Iowa @ Northwestern — Iowa 24, Northwestern 10"],
    ["401856744", "south-carolina", "texas-am", 17, 9, "Texas A&M @ South Carolina — South Carolina 17, Texas A&M 9"],
    ["401856739", "florida", "oklahoma", 7, 23, "Oklahoma @ Florida — Oklahoma 23, Florida 7"],
    ["401860911", "colorado-state", "boise-state", 38, 64, "Boise State @ Colorado State — Boise State 64, Colorado State 38"],
    ["401856853", "baylor", "iowa-state", 42, 31, "Iowa State @ Baylor — Baylor 42, Iowa State 31"],
    ["401858285", "syracuse", "clemson", 13, 18, "Clemson @ Syracuse — Clemson 18, Syracuse 13"],
    ["401858289", "boston-college", "florida-state", 24, 31, "Florida State @ Boston College — Florida State 31, Boston College 24"],
    ["401858292", "uconn", "north-carolina", 21, 38, "North Carolina @ UConn — North Carolina 38, UConn 21"],
    ["401862822", "tulane", "tulsa", 10, 60, "Tulsa @ Tulane — Tulsa 60, Tulane 10"],
    ["401858286", "nc-state", "duke", 3, 41, "Duke @ NC State — Duke 41, NC State 3"],
    ["401858515", "purdue", "maryland", 29, 34, "Maryland @ Purdue — Maryland 34, Purdue 29"],
    ["401856738", "auburn", "arkansas", 26, 23, "Arkansas @ Auburn — Auburn 26, Arkansas 23"],
    ["401856854", "kansas-state", "oklahoma-state", 28, 66, "Oklahoma State @ Kansas State — Oklahoma State 66, Kansas State 28"],
    ["401869945", "coastal-carolina", "old-dominion", 8, 21, "Old Dominion @ Coastal Carolina — Old Dominion 21, Coastal Carolina 8"],
    ["401869927", "app-state", "georgia-state", 23, 39, "Georgia State @ App State — Georgia State 39, App State 23"],
    ["401869936", "arkansas-state", "ul-monroe", 17, 19, "UL Monroe @ Arkansas State — UL Monroe 19, Arkansas State 17"],
    ["401871073", "kennesaw-state", "delaware", 42, 40, "Delaware @ Kennesaw State — Kennesaw State 42, Delaware 40"],
    ["401858516", "washington", "penn-state", 25, 28, "Penn State @ Washington — Penn State 28, Washington 25"],
    ["401862819", "uab", "charlotte", 23, 12, "Charlotte @ UAB — UAB 23, Charlotte 12"],
    ["401862820", "navy", "temple", 42, 35, "Temple @ Navy — Navy 42, Temple 35"],
    ["401869951", "georgia-southern", "marshall", 49, 13, "Marshall @ Georgia Southern — Georgia Southern 49, Marshall 13"],
    ["401871076", "middle-tennessee", "western-kentucky", 51, 42, "Western Kentucky @ Middle Tennessee — Middle Tennessee 51, Western Kentucky 42"],
    ["401856850", "kansas", "ucf", 32, 33, "UCF @ Kansas — UCF 33, Kansas 32"],
    ["401862821", "north-texas", "rice", 52, 23, "Rice @ North Texas — North Texas 52, Rice 23"],
    ["401864534", "san-jose-state", "northern-illinois", 30, 19, "Northern Illinois @ San José State — San José State 30, Northern Illinois 19"],
    ["401871074", "fiu", "missouri-state", 23, 20, "Missouri State @ Florida International — Florida International 23, Missouri State 20"],
    ["401871098", "troy", "louisiana-tech", 17, 41, "Louisiana Tech @ Troy — Louisiana Tech 41, Troy 17"],
    ["401856742", "mississippi-state", "vanderbilt", 23, 25, "Vanderbilt @ Mississippi State — Vanderbilt 25, Mississippi State 23"],
    ["401858517", "wisconsin", "rutgers", 31, 10, "Rutgers @ Wisconsin — Wisconsin 31, Rutgers 10"],
    ["401869968", "louisiana", "south-alabama", 28, 26, "South Alabama @ Louisiana — Louisiana 28, South Alabama 26"],
    ["401871075", "jacksonville-state", "sam-houston", 47, 14, "Sam Houston @ Jacksonville State — Jacksonville State 47, Sam Houston 14"],
    ["401856852", "arizona-state", "colorado", 20, 10, "Colorado @ Arizona State — Arizona State 20, Colorado 10"],
    ["401858287", "georgia-tech", "louisville", 17, 44, "Louisville @ Georgia Tech — Louisville 44, Georgia Tech 17"],
    ["401858511", "michigan", "michigan-state", 6, 15, "Michigan State @ Michigan — Michigan State 15, Michigan 6"],
    ["401862823", "army", "air-force", 21, 24, "Air Force @ Army — Air Force 24, Army 21"],
    ["401870795", "new-mexico-state", "liberty", 14, 30, "Liberty @ New Mexico State — Liberty 30, New Mexico State 14"],
    ["401860913", "utah-state", "fresno-state", 17, 10, "Fresno State @ Utah State — Utah State 17, Fresno State 10"],
    ["401864532", "utep", "hawaii", 14, 17, "Hawaiʻi @ UTEP — Hawaiʻi 17, UTEP 14"],
    ["401860912", "oregon-state", "texas-state", 21, 42, "Texas State @ Oregon State — Texas State 42, Oregon State 21"],
    ["401864535", "unlv", "wyoming", 35, 41, "Wyoming @ UNLV — Wyoming 41, UNLV 35"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal(expected.length, 50);
    assert.equal((satSql.match(/update games/g) ?? []).length, 50);
    assert.equal((satSql.match(/g\.week = 10/g) ?? []).length, 50);
    for (const [espn, hSlug, aSlug, hs, as, label] of expected) {
      assert.ok(satSql.includes(`-- ${label}`), label);
      assert.ok(satSql.includes(`home_score = ${hs},\n    away_score = ${as}\n`), `${espn} scores`);
      assert.ok(satSql.includes(`and h.slug = '${hSlug}' and a.slug = '${aSlug}';`), `${espn} orientation`);
      assert.match(satSql, new RegExp(`Source event ${espn}`));
    }
    assert.doesNotMatch(satSql, /kickoff_at|vegas_spread|vegas_total|\btv\s*=|hx_rating|win_title|make_field/);
    const header = satSql.split(/update games/i)[0] ?? "";
    assert.doesNotMatch(header, /\b401\d{6,}\b/);
  });

  it("adds Merrimack @ Wake Forest as a Week 10 FCS FINAL stub", () => {
    const got = fcsStubsForWeek(10).map((g) => [g.teamSlug, g.home, g.opponentLabel, g.homeScore, g.awayScore, g.status]);
    assert.deepEqual(got, [
      ["toledo", false, "Sacramento State", 17, 20, "final"],
      ["wake-forest", true, "Merrimack", 77, 0, "final"],
    ]);
  });
});
