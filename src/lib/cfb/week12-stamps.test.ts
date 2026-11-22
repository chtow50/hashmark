import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { fcsStubsForWeek } from "./fcs-stubs.ts";
import { BOARD_WEEK, FEATURED_SLATE_WEEK, WEEK12_FEATURED } from "./featured.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");

const pack = JSON.parse(
  readFileSync(join(root, "data/week12_fbs_fbs_kick_tv_vegas_2026.json"), "utf8"),
) as {
  week: number;
  n_games: number;
  n_with_vegas: number;
  n_blank_vegas: number;
  n_blank_tv: number;
  n_tbd_kick: number;
  excluded_fcs: string[];
  games: Array<{
    espn_event_id: string;
    home_slug: string;
    away_slug: string;
    kick_ct: string | null;
    tv: string | null;
    espn_details: string | null;
  }>;
};
const sql = readFileSync(join(root, "migrations/0101_week12_kick_tv.sql"), "utf8");
const blockFor = (home: string, away: string) =>
  sql.split("\n\n").find((b) => b.includes(`h.slug = '${home}' and a.slug = '${away}'`));

describe("Week 12 FBS–FBS kick / TV (0101)", () => {
  it("covers 66 games, 0 Vegas (no two-book match), 4 held kicks, CST offsets", () => {
    assert.equal(pack.week, 12);
    assert.equal(pack.n_games, 66);
    assert.equal(pack.games.length, 66);
    assert.equal(pack.n_with_vegas, 0);
    assert.equal(pack.n_blank_vegas, 66);
    assert.equal(pack.n_tbd_kick, 4);
    assert.equal(pack.n_blank_tv, 7);
    assert.equal(pack.excluded_fcs.length, 4);
    assert.equal((sql.match(/update games/g) ?? []).length, 66);
    assert.equal((sql.match(/g\.week = 12;/g) ?? []).length, 66);
    assert.equal((sql.match(/kickoff_at = /g) ?? []).length, 62);
    // DST ended Nov 1: every Week 12 kick is CST (UTC−6).
    assert.equal((sql.match(/:00-06'/g) ?? []).length, 62);
    assert.doesNotMatch(sql, /:00-05'/);
    // Vegas is only ever cleared here, never filled.
    assert.equal((sql.match(/vegas_spread = null/g) ?? []).length, 66);
    assert.doesNotMatch(sql, /vegas_spread = -?\d/);
    assert.doesNotMatch(sql, /home_score|away_score|status\s*=|hx_rating|win_title|make_field/);
  });

  it("leaves the ESPN timeValid=false kicks blank (no invented kick or TV)", () => {
    for (const [home, away] of [
      ["miami", "virginia-tech"],
      ["louisville", "pittsburgh"],
      ["georgia-tech", "wake-forest"],
      ["tulane", "north-texas"],
    ] as const) {
      const g = pack.games.find((r) => r.home_slug === home && r.away_slug === away);
      assert.ok(g, `${away} @ ${home}`);
      assert.equal(g.kick_ct, null);
      assert.equal(g.tv, null);
      const block = blockFor(home, away);
      assert.ok(block, `${away} @ ${home} block`);
      assert.doesNotMatch(block, /kickoff_at|tv =/);
    }
  });

  it("keeps midweek and Friday cards on their CT day (Oregon @ Michigan State Fri 19:00 CT FOX)", () => {
    const g = pack.games.find((r) => r.home_slug === "michigan-state" && r.away_slug === "oregon");
    assert.equal(g?.kick_ct, "2026-11-20 19:00");
    assert.equal(g?.tv, "FOX");
    const block = blockFor("michigan-state", "oregon");
    assert.ok(block);
    assert.match(block, /Fri 2026-11-20 19:00 CT/);
    assert.match(block, /kickoff_at = timestamptz '2026-11-20 19:00:00-06'/);
    assert.match(block, /kickoff_date = date '2026-11-20'/);
    assert.doesNotMatch(block, /Saturday|Sat /);
    const tue = blockFor("western-michigan", "eastern-michigan");
    assert.ok(tue);
    assert.match(tue, /kickoff_at = timestamptz '2026-11-17 17:00:00-06'/);
  });

  it("pins the Week 12 featured LSU @ Tennessee card: Sat 14:30 CT · ABC · Vegas blank", () => {
    assert.equal(BOARD_WEEK, 12);
    assert.equal(FEATURED_SLATE_WEEK, 12);
    assert.equal(WEEK12_FEATURED.homeSlug, "tennessee");
    assert.equal(WEEK12_FEATURED.awaySlug, "lsu");
    const g = pack.games.find((r) => r.home_slug === "tennessee" && r.away_slug === "lsu");
    assert.equal(g?.espn_event_id, "401856754");
    assert.equal(g?.kick_ct, "2026-11-21 14:30");
    assert.equal(g?.tv, "ABC");
    const block = blockFor("tennessee", "lsu");
    assert.ok(block);
    assert.match(block, /kickoff_at = timestamptz '2026-11-21 14:30:00-06'/);
    assert.match(block, /tv = 'ABC'/);
    assert.match(block, /vegas_spread = null/);
  });
});

describe("Week 11 Sunday sweep (0100)", () => {
  const sun = readFileSync(join(root, "migrations/0100_week11_sun_finals.sql"), "utf8");

  it("stamps North Dakota State 21, Hawaiʻi 13 (ESPN 401864537) in exact orientation", () => {
    assert.match(sun, /North Dakota State 21, Hawaii 13/);
    assert.match(sun, /home_score = 13,\n\s+away_score = 21/);
    assert.match(sun, /h\.slug = 'hawaii' and a\.slug = 'north-dakota-state'/);
    assert.match(sun, /401864537/);
  });

  it("moves Ole Miss @ Oklahoma to its ESPN CT date (Sun Nov 15, 12:00 CT, SEC Network) with the two-book line", () => {
    const block = sun.split("\n\n").find((b) => b.includes("h.slug = 'oklahoma' and a.slug = 'ole-miss'") && b.includes("kickoff_at"));
    assert.ok(block);
    assert.match(block, /ESPN 401856887/);
    assert.match(block, /kickoff_at = timestamptz '2026-11-15 12:00:00-06'/);
    assert.match(block, /kickoff_date = date '2026-11-15'/);
    assert.match(block, /tv = 'SEC Network'/);
    assert.match(block, /vegas_spread = 2\.5/);
    assert.match(block, /vegas_total = 48\.5/);
  });
});

describe("Week 12 Tuesday FINALs (0104)", () => {
  const tueSql = readFileSync(join(root, "migrations/0104_week12_tue_finals.sql"), "utf8");
  const expected = [
    ["401866465", "western-michigan", "eastern-michigan", 34, 27, "Eastern Michigan @ Western Michigan — Western Michigan 34, Eastern Michigan 27"],
    ["401866464", "ohio", "ball-state", 35, 28, "Ball State @ Ohio — Ohio 35, Ball State 28"],
    ["401866466", "kent-state", "miami-oh", 3, 20, "Miami (OH) @ Kent State — Kent State 3, Miami (OH) 20"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((tueSql.match(/update games/g) ?? []).length, 3);
    assert.equal((tueSql.match(/g\.week = 12/g) ?? []).length, 3);
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

describe("Week 12 Wednesday FINALs (0105)", () => {
  const wedSql = readFileSync(join(root, "migrations/0105_week12_wed_finals.sql"), "utf8");
  const expected = [
    ["401866467", "massachusetts", "akron", 33, 34, "Akron @ Massachusetts — Massachusetts 33, Akron 34"],
    ["401866469", "buffalo", "central-michigan", 40, 21, "Central Michigan @ Buffalo — Buffalo 40, Central Michigan 21"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((wedSql.match(/update games/g) ?? []).length, 2);
    assert.equal((wedSql.match(/g\.week = 12/g) ?? []).length, 2);
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

describe("Week 12 Thursday FINAL (0106)", () => {
  const thuSql = readFileSync(join(root, "migrations/0106_week12_thu_finals.sql"), "utf8");
  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((thuSql.match(/update games/g) ?? []).length, 1);
    assert.equal((thuSql.match(/g\.week = 12/g) ?? []).length, 1);
    assert.ok(thuSql.includes("-- Rice @ Temple — Temple 27, Rice 31"));
    assert.ok(thuSql.includes("home_score = 27,\n    away_score = 31\n"));
    assert.ok(thuSql.includes("and h.slug = 'temple' and a.slug = 'rice';"));
    assert.match(thuSql, /Source event 401862830/);
    assert.doesNotMatch(thuSql, /kickoff_at|vegas_spread|vegas_total|\btv\s*=|hx_rating|win_title|make_field/);
    const header = thuSql.split(/update games/i)[0] ?? "";
    assert.doesNotMatch(header, /\b401\d{6,}\b/);
  });
});

describe("Week 12 Friday FINALs (0107)", () => {
  const friSql = readFileSync(join(root, "migrations/0107_week12_fri_finals.sql"), "utf8");
  const expected = [
    ["ucf", "iowa-state", 48, 17],
    ["duke", "clemson", 10, 20],
    ["toledo", "bowling-green", 19, 0],
    ["michigan-state", "oregon", 7, 45],
    ["air-force", "utep", 52, 3],
    ["wyoming", "new-mexico", 17, 24],
  ] as const;
  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((friSql.match(/update games/g) ?? []).length, 6);
    assert.equal((friSql.match(/g\.week = 12/g) ?? []).length, 6);
    for (const [home, away, hs, as] of expected) {
      assert.ok(friSql.includes(`home_score = ${hs},\n    away_score = ${as}\n`));
      assert.ok(friSql.includes(`and h.slug = '${home}' and a.slug = '${away}';`));
    }
    assert.doesNotMatch(friSql, /kickoff_at|vegas_spread|vegas_total|\btv\s*=|hx_rating|win_title|make_field/);
    const header = friSql.split(/update games/i)[0] ?? "";
    assert.doesNotMatch(header, /\b401\d{6,}\b/);
  });
});

describe("Week 12 Saturday FINALs (0108)", () => {
  const satSql = readFileSync(join(root, "migrations/0108_week12_sat_finals.sql"), "utf8");
  const expected = [
    ["south-carolina", "georgia", 6, 34],
    ["tcu", "utah", 17, 38],
    ["michigan", "ucla", 18, 16],
    ["texas", "arkansas", 45, 3],
    ["notre-dame", "smu", 24, 3],
    ["miami", "virginia-tech", 28, 20],
    ["washington", "indiana", 27, 24],
    ["tennessee", "lsu", 27, 13],
    ["kansas", "byu", 29, 31],
    ["georgia-tech", "wake-forest", 29, 50],
    ["baylor", "texas-tech", 10, 20],
    ["nebraska", "ohio-state", 31, 28],
    ["illinois", "iowa", 17, 34],
    ["missouri", "kentucky", 28, 14],
    ["boise-state", "san-diego-state", 20, 22],
    ["usc", "maryland", 35, 21],
    ["kansas-state", "arizona", 28, 35],
    ["west-virginia", "houston", 31, 34],
    ["oklahoma", "texas-am", 28, 7],
    ["louisville", "pittsburgh", 42, 10],
    ["florida", "vanderbilt", 34, 27],
    ["cincinnati", "colorado", 35, 28],
    ["boston-college", "syracuse", 27, 15],
    ["minnesota", "northwestern", 20, 17],
    ["purdue", "wisconsin", 10, 42],
    ["army", "east-carolina", 6, 10],
    ["navy", "memphis", 38, 34],
    ["tulane", "north-texas", 28, 24],
    ["virginia", "north-carolina", 41, 24],
    ["liberty", "western-kentucky", 45, 14],
    ["tulsa", "charlotte", 42, 14],
    ["jacksonville-state", "missouri-state", 25, 20],
    ["sam-houston", "middle-tennessee", 28, 31],
    ["florida-atlantic", "usf", 35, 14],
    ["app-state", "ul-monroe", 17, 16],
    ["louisiana", "coastal-carolina", 38, 24],
    ["new-mexico-state", "delaware", 30, 42],
    ["kennesaw-state", "fiu", 35, 24],
    ["florida-state", "nc-state", 10, 28],
    ["penn-state", "rutgers", 24, 25],
    ["uconn", "old-dominion", 29, 21],
    ["north-dakota-state", "northern-illinois", 31, 25],
    ["troy", "georgia-southern", 7, 45],
    ["marshall", "georgia-state", 28, 27],
    ["southern-miss", "south-alabama", 35, 40],
    ["texas-state", "washington-state", 42, 14],
    ["san-jose-state", "unlv", 22, 24],
    ["louisiana-tech", "arkansas-state", 48, 3],
    ["california", "stanford", 28, 44],
    ["fresno-state", "colorado-state", 49, 42],
    ["uab", "utsa", 17, 19],
    ["oregon-state", "utah-state", 31, 24],
    ["nevada", "hawaii", 16, 8],
  ] as const;
  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((satSql.match(/update games/g) ?? []).length, 53);
    assert.equal((satSql.match(/g\.week = 12/g) ?? []).length, 53);
    for (const [home, away, hs, as] of expected) {
      assert.ok(satSql.includes(`home_score = ${hs},\n    away_score = ${as}\n`));
      assert.ok(satSql.includes(`and h.slug = '${home}' and a.slug = '${away}';`));
    }
    assert.doesNotMatch(satSql, /kickoff_at|vegas_spread|vegas_total|\btv\s*=|hx_rating|win_title|make_field/);
    assert.doesNotMatch(satSql, /oklahoma-state/);
    const header = satSql.split(/update games/i)[0] ?? "";
    assert.doesNotMatch(header, /\b401\d{6,}\b/);
  });

  it("adds the four Week 12 FBS-vs-FCS FINAL stubs", () => {
    const got = fcsStubsForWeek(12).map((g) => [g.teamSlug, g.home, g.opponentLabel, g.homeScore, g.awayScore, g.status]);
    assert.deepEqual(got, [
      ["alabama", true, "Chattanooga", 47, 0, "final"],
      ["ole-miss", true, "Wofford", 59, 17, "final"],
      ["mississippi-state", true, "Tennessee Tech", 34, 16, "final"],
      ["auburn", true, "Samford", 59, 17, "final"],
    ]);
  });
});
