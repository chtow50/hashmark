import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { fcsStubsForWeek } from "./fcs-stubs.ts";
import { AP_STAMP, BOARD_WEEK, FEATURED_SLATE_WEEK, WEEK8_FEATURED } from "./featured.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const pack = JSON.parse(
  readFileSync(join(root, "data/week8_fbs_fbs_kick_tv_vegas_2026.json"), "utf8"),
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
const sql = readFileSync(join(root, "migrations/0064_week8_kick_tv_vegas.sql"), "utf8");
const blockFor = (home: string, away: string) =>
  sql.split("\n\n").find((b) => b.includes(`h.slug = '${home}' and a.slug = '${away}'`));

describe("Week 8 FBS–FBS kick / TV / Vegas (0064)", () => {
  it("covers 54 games, 7 Vegas (ESPN DraftKings = CBS Sports), 6 kick HOLDs", () => {
    assert.equal(pack.meta.n_games, 54);
    assert.equal(pack.games.length, 54);
    assert.equal(pack.meta.n_with_vegas, 7);
    assert.equal(pack.meta.n_blank_vegas, 47);
    assert.equal(pack.meta.n_tbd_kick, 6);
    assert.equal(pack.meta.n_blank_tv, 7);
    assert.equal(pack.meta.excluded_fcs.length, 2);
    assert.equal((sql.match(/update games/g) ?? []).length, 54);
    assert.equal((sql.match(/g\.week = 8;/g) ?? []).length, 54);
    assert.doesNotMatch(sql, /home_score|away_score|status\s*=|hx_rating|win_title|make_field/);
  });

  it("stores the board convention (positive = home favored) for every Vegas row", () => {
    const expected: Array<[string, string, number, number]> = [
      ["memphis", "east-carolina", 9.5, 53.5],
      ["uconn", "massachusetts", 16.5, 47.5],
      ["minnesota", "iowa", -5.5, 41.5],
      ["ucla", "michigan-state", 13.5, 47.5],
      ["clemson", "virginia-tech", -1.5, 49.5],
      ["kentucky", "vanderbilt", 11.5, 51.5],
      ["arizona", "iowa-state", 10, 50.5],
    ];
    const withVegas = pack.games.filter((g) => g.board_vegas_spread != null);
    assert.equal(withVegas.length, expected.length);
    for (const [home, away, spread, total] of expected) {
      const g = withVegas.find((r) => r.home_slug === home && r.away_slug === away);
      assert.ok(g, `${away} @ ${home}`);
      assert.equal(g.board_vegas_spread, spread);
      assert.equal(g.over_under, total);
      const block = blockFor(home, away);
      assert.ok(block, `sql block ${away} @ ${home}`);
      assert.match(block, new RegExp(`vegas_spread = ${spread}\\b`));
      assert.match(block, new RegExp(`vegas_total = ${total}\\b`));
    }
  });

  it("holds kick + TV on the TBD / disputed cards", () => {
    for (const [home, away] of [
      ["ucf", "byu"],
      ["cincinnati", "texas-tech"],
      ["oklahoma-state", "colorado"],
      ["kansas", "baylor"],
      ["utah", "houston"],
      ["arizona-state", "kansas-state"],
    ] as const) {
      const g = pack.games.find((r) => r.home_slug === home && r.away_slug === away);
      assert.ok(g, `${away} @ ${home}`);
      assert.equal(g.kick_ct, null);
      assert.equal(g.tv, null);
      const block = blockFor(home, away);
      assert.ok(block);
      assert.doesNotMatch(block, /kickoff_at|\btv\s*=/);
    }
  });

  it("kept the historical Week 8 featured Ole Miss @ Texas card: Sat 18:30 CT · ABC · Vegas blank", () => {
    assert.equal(BOARD_WEEK, 9);
    assert.equal(FEATURED_SLATE_WEEK, 9);
    assert.equal(WEEK8_FEATURED.homeSlug, "texas");
    assert.equal(WEEK8_FEATURED.awaySlug, "ole-miss");
    const g = pack.games.find((r) => r.home_slug === "texas" && r.away_slug === "ole-miss");
    assert.equal(g?.kick_ct, "2026-10-24 18:30");
    assert.equal(g?.tv, "ABC");
    assert.equal(g?.vegas_details, null);
    const block = blockFor("texas", "ole-miss");
    assert.ok(block);
    assert.match(block, /kickoff_at = timestamptz '2026-10-24 18:30:00-05'/);
    assert.match(block, /tv = 'ABC'/);
    assert.match(block, /vegas_spread = null/);
  });
});

describe("Week 7 AP Top 25 stamp (0065, Oct. 11)", () => {
  const apSql = readFileSync(join(root, "migrations/0065_week7_ap_top25.sql"), "utf8");
  const ap = JSON.parse(readFileSync(join(root, "data/week7_ap_top25_2026.json"), "utf8"));

  it("clears then sets 25 AP ranks on week 0 rows only", () => {
    assert.match(apSql, /update rankings set ap_rank = null where season = 2026 and week = 0;/);
    assert.equal((apSql.match(/^\s+\('[a-z-]+', \d+\)/gm) ?? []).length, 25);
    assert.match(apSql, /\('georgia', 1\)/);
    assert.match(apSql, /\('kentucky', 15\)/);
    assert.match(apSql, /\('wake-forest', 21\)/);
    assert.match(apSql, /\('northwestern', 25\)/);
    assert.doesNotMatch(apSql, /'oregon'|'florida'|'pittsburgh'/);
    const body = apSql
      .split("\n")
      .filter((l) => !l.startsWith("--"))
      .join("\n");
    assert.doesNotMatch(body, /hx_|make_field|win_title|truncate|games/i);
    assert.equal(ap.poll_week, 7);
    assert.equal(ap.as_of, "2026-10-11");
    assert.deepEqual(
      ap.dropped.map((d: { slug: string }) => d.slug),
      ["oregon", "florida", "pittsburgh"],
    );
    for (const t of ap.teams as { slug: string; rank: number }[]) {
      assert.match(apSql, new RegExp(`\\('${t.slug}', ${t.rank}\\)`));
    }
  });

  it("was superseded on the chrome by the Week 8 stamp (0073)", () => {
    assert.equal(AP_STAMP.week, 8);
    assert.equal(AP_STAMP.label, "Week 8 AP");
    assert.equal(AP_STAMP.columnHint, "W8 stamp");
  });
});

describe("Week 8 Tuesday FINALs (0066, MTSU@FIU + MOST@DEL + USA@MRSH)", () => {
  const tueSql = readFileSync(join(root, "migrations/0066_week8_tue_finals.sql"), "utf8");
  const expected = [
    ["401871055", "fiu", "middle-tennessee", 23, 26, "Middle Tennessee @ FIU — Middle Tennessee 26, FIU 23"],
    ["401871069", "delaware", "missouri-state", 61, 38, "Missouri State @ Delaware — Delaware 61, Missouri State 38"],
    ["401871092", "marshall", "south-alabama", 20, 13, "South Alabama @ Marshall — Marshall 20, South Alabama 13"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((tueSql.match(/update games/g) ?? []).length, 3);
    assert.equal((tueSql.match(/g\.week = 8/g) ?? []).length, 3);
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

describe("Week 8 Wednesday FINAL (0067, NMSU@SHSU)", () => {
  const wedSql = readFileSync(join(root, "migrations/0067_week8_wed_finals.sql"), "utf8");

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((wedSql.match(/update games/g) ?? []).length, 1);
    assert.equal((wedSql.match(/g\.week = 8/g) ?? []).length, 1);
    assert.ok(wedSql.includes("-- New Mexico State @ Sam Houston — New Mexico State 30, Sam Houston 24"));
    assert.ok(wedSql.includes("home_score = 24,\n    away_score = 30\n"));
    assert.ok(wedSql.includes("and h.slug = 'sam-houston' and a.slug = 'new-mexico-state';"));
    assert.match(wedSql, /Source event 401871070/);
    assert.doesNotMatch(wedSql, /kickoff_at|vegas_spread|vegas_total|\btv\s*=|hx_rating|win_title|make_field/);
    const header = wedSql.split(/update games/i)[0] ?? "";
    assert.doesNotMatch(header, /\b401\d{6,}\b/);
  });
});

describe("Week 8 Thursday FINALs (0068, JMU@APP + LIB@KENN + ECU@MEM)", () => {
  const thuSql = readFileSync(join(root, "migrations/0068_week8_thu_finals.sql"), "utf8");

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((thuSql.match(/update games/g) ?? []).length, 3);
    assert.equal((thuSql.match(/g\.week = 8/g) ?? []).length, 3);
    assert.ok(thuSql.includes("-- James Madison @ App State — James Madison 31, App State 34 (OT)"));
    assert.ok(thuSql.includes("home_score = 34,\n    away_score = 31\n"));
    assert.ok(thuSql.includes("and h.slug = 'app-state' and a.slug = 'james-madison';"));
    assert.ok(thuSql.includes("-- Liberty @ Kennesaw State — Liberty 34, Kennesaw State 6"));
    assert.ok(thuSql.includes("home_score = 6,\n    away_score = 34\n"));
    assert.ok(thuSql.includes("and h.slug = 'kennesaw-state' and a.slug = 'liberty';"));
    assert.ok(thuSql.includes("-- East Carolina @ Memphis — East Carolina 34, Memphis 41 (OT)"));
    assert.ok(thuSql.includes("home_score = 41,\n    away_score = 34\n"));
    assert.ok(thuSql.includes("and h.slug = 'memphis' and a.slug = 'east-carolina';"));
    assert.match(thuSql, /Source events 401869845, 401871056, 401862807/);
    assert.doesNotMatch(thuSql, /kickoff_at|vegas_spread|vegas_total|\btv\s*=|hx_rating|win_title|make_field/);
    const header = thuSql.split(/update games/i)[0] ?? "";
    assert.doesNotMatch(header, /\b401\d{6,}\b/);
  });
});

describe("Week 8 Friday FINALs (0069, DUKE@UVA + MASS@CONN + ARMY@TLSA + AFA@WYO + NCSU@STAN)", () => {
  const friSql = readFileSync(join(root, "migrations/0069_week8_fri_finals.sql"), "utf8");

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((friSql.match(/update games/g) ?? []).length, 5);
    assert.equal((friSql.match(/g\.week = 8/g) ?? []).length, 5);
    assert.ok(friSql.includes("-- Duke @ Virginia — Duke 19, Virginia 16"));
    assert.ok(friSql.includes("home_score = 16,\n    away_score = 19\n"));
    assert.ok(friSql.includes("and h.slug = 'virginia' and a.slug = 'duke';"));
    assert.ok(friSql.includes("-- Massachusetts @ UConn — Massachusetts 16, UConn 35"));
    assert.ok(friSql.includes("home_score = 35,\n    away_score = 16\n"));
    assert.ok(friSql.includes("and h.slug = 'uconn' and a.slug = 'massachusetts';"));
    assert.ok(friSql.includes("-- Army @ Tulsa — Army 38, Tulsa 35"));
    assert.ok(friSql.includes("home_score = 35,\n    away_score = 38\n"));
    assert.ok(friSql.includes("and h.slug = 'tulsa' and a.slug = 'army';"));
    assert.ok(friSql.includes("-- Air Force @ Wyoming — Air Force 14, Wyoming 28"));
    assert.ok(friSql.includes("home_score = 28,\n    away_score = 14\n"));
    assert.ok(friSql.includes("and h.slug = 'wyoming' and a.slug = 'air-force';"));
    assert.ok(friSql.includes("-- NC State @ Stanford — NC State 28, Stanford 31"));
    assert.ok(friSql.includes("home_score = 31,\n    away_score = 28\n"));
    assert.ok(friSql.includes("and h.slug = 'stanford' and a.slug = 'nc-state';"));
    assert.match(friSql, /Source events 401858271, 401861965, 401862808, 401864525, 401858272/);
    assert.doesNotMatch(friSql, /kickoff_at|vegas_spread|vegas_total|\btv\s*=|hx_rating|win_title|make_field/);
    const header = friSql.split(/update games/i)[0] ?? "";
    assert.doesNotMatch(header, /\b401\d{6,}\b/);
  });
});

describe("Week 8 Saturday FINALs (0070, 41 FBS games) + Week 8 FCS stubs", () => {
  const satSql = readFileSync(join(root, "migrations/0070_week8_sat_finals.sql"), "utf8");
  const expected = [
    ["401858274", "miami", "pittsburgh", 52, 23, "Pittsburgh @ Miami — Pittsburgh 23, Miami 52"],
    ["401858270", "smu", "california", 59, 20, "California @ SMU — California 20, SMU 59"],
    ["401858498", "northwestern", "rutgers", 42, 14, "Rutgers @ Northwestern — Rutgers 14, Northwestern 42"],
    ["401866450", "toledo", "western-michigan", 45, 38, "Western Michigan @ Toledo — Western Michigan 38, Toledo 45"],
    ["401856841", "tcu", "west-virginia", 20, 24, "West Virginia @ TCU — West Virginia 24, TCU 20"],
    ["401858496", "michigan", "indiana", 6, 13, "Indiana @ Michigan — Indiana 13, Michigan 6"],
    ["401862809", "florida-atlantic", "rice", 51, 49, "Rice @ Florida Atlantic — Rice 49, Florida Atlantic 51"],
    ["401856728", "auburn", "lsu", 17, 38, "LSU @ Auburn — LSU 38, Auburn 17"],
    ["401866446", "kent-state", "akron", 35, 20, "Akron @ Kent State — Akron 20, Kent State 35"],
    ["401866476", "central-michigan", "miami-oh", 27, 28, "Miami (OH) @ Central Michigan — Miami (OH) 28, Central Michigan 27"],
    ["401858495", "illinois", "oregon", 21, 10, "Oregon @ Illinois — Oregon 10, Illinois 21"],
    ["401856730", "mississippi-state", "oklahoma", 15, 23, "Oklahoma @ Mississippi State — Oklahoma 23, Mississippi State 15"],
    ["401864526", "northern-illinois", "hawaii", 21, 56, "Hawaiʻi @ Northern Illinois — Hawaiʻi 56, Northern Illinois 21"],
    ["401858499", "ucla", "michigan-state", 28, 10, "Michigan State @ UCLA — Michigan State 10, UCLA 28"],
    ["401858497", "minnesota", "iowa", 13, 10, "Iowa @ Minnesota — Iowa 10, Minnesota 13"],
    ["401856727", "alabama", "texas-am", 31, 20, "Texas A&M @ Alabama — Texas A&M 20, Alabama 31"],
    ["401858273", "georgia-tech", "boston-college", 27, 49, "Boston College @ Georgia Tech — Boston College 49, Georgia Tech 27"],
    ["401856731", "south-carolina", "tennessee", 27, 24, "Tennessee @ South Carolina — Tennessee 24, South Carolina 27"],
    ["401866448", "buffalo", "bowling-green", 31, 24, "Bowling Green @ Buffalo — Bowling Green 24, Buffalo 31"],
    ["401862810", "navy", "north-texas", 39, 49, "North Texas @ Navy — North Texas 49, Navy 39"],
    ["401866449", "ohio", "eastern-michigan", 24, 20, "Eastern Michigan @ Ohio — Eastern Michigan 20, Ohio 24"],
    ["401871094", "troy", "ul-monroe", 14, 21, "UL Monroe @ Troy — UL Monroe 21, Troy 14"],
    ["401871093", "louisiana-tech", "old-dominion", 26, 0, "Old Dominion @ Louisiana Tech — Old Dominion 0, Louisiana Tech 26"],
    ["401864528", "nevada", "san-jose-state", 28, 13, "San José State @ Nevada — San José State 13, Nevada 28"],
    ["401869967", "southern-miss", "louisiana", 35, 31, "Louisiana @ Southern Miss — Louisiana 31, Southern Miss 35"],
    ["401860907", "washington-state", "boise-state", 10, 31, "Boise State @ Washington State — Boise State 31, Washington State 10"],
    ["401860905", "colorado-state", "san-diego-state", 56, 49, "San Diego State @ Colorado State — San Diego State 49, Colorado State 56"],
    ["401869935", "arkansas-state", "georgia-state", 38, 32, "Georgia State @ Arkansas State — Georgia State 32, Arkansas State 38"],
    ["401858276", "clemson", "virginia-tech", 16, 20, "Virginia Tech @ Clemson — Virginia Tech 20, Clemson 16"],
    ["401858275", "north-carolina", "syracuse", 30, 31, "Syracuse @ North Carolina — Syracuse 31, North Carolina 30"],
    ["401856729", "kentucky", "vanderbilt", 34, 17, "Vanderbilt @ Kentucky — Vanderbilt 17, Kentucky 34"],
    ["401856838", "arizona", "iowa-state", 39, 3, "Iowa State @ Arizona — Iowa State 3, Arizona 39"],
    ["401858500", "wisconsin", "usc", 24, 7, "USC @ Wisconsin — USC 7, Wisconsin 24"],
    ["401856732", "texas", "ole-miss", 34, 27, "Ole Miss @ Texas — Ole Miss 27, Texas 34"],
    ["401860906", "texas-state", "utah-state", 20, 17, "Utah State @ Texas State — Utah State 17, Texas State 20"],
    ["401862811", "tulane", "utsa", 19, 42, "UTSA @ Tulane — UTSA 42, Tulane 19"],
    ["401856835", "ucf", "byu", 39, 31, "BYU @ UCF — BYU 31, UCF 39"],
    ["401856840", "cincinnati", "texas-tech", 37, 24, "Texas Tech @ Cincinnati — Texas Tech 24, Cincinnati 37"],
    ["401856839", "arizona-state", "kansas-state", 28, 17, "Kansas State @ Arizona State — Kansas State 17, Arizona State 28"],
    ["401856834", "kansas", "baylor", 25, 24, "Baylor @ Kansas — Baylor 24, Kansas 25"],
    ["401856836", "oklahoma-state", "colorado", 57, 24, "Colorado @ Oklahoma State — Colorado 24, Oklahoma State 57"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((satSql.match(/update games/g) ?? []).length, 41);
    assert.equal((satSql.match(/g\.week = 8/g) ?? []).length, 41);
    for (const [espn, hSlug, aSlug, hs, as, label] of expected) {
      assert.ok(satSql.includes(`-- ${label}`), label);
      assert.ok(satSql.includes(`home_score = ${hs},\n    away_score = ${as}\n`), `${espn} scores`);
      assert.ok(satSql.includes(`and h.slug = '${hSlug}' and a.slug = '${aSlug}';`), `${espn} orientation`);
      assert.ok(satSql.includes(espn), `${espn} source`);
    }
    assert.doesNotMatch(satSql, /and h\.slug = 'utah' and a\.slug = 'houston';/);
    assert.doesNotMatch(satSql, /kickoff_at|vegas_spread|vegas_total|\btv\s*=|hx_rating|win_title|make_field/);
    const header = satSql.split(/update games/i)[0] ?? "";
    assert.doesNotMatch(header, /\b401\d{6,}\b/);
  });

  it("adds the two Week 8 FCS FINALs as stubs", () => {
    const got = fcsStubsForWeek(8).map((g) => [g.teamSlug, g.home, g.opponentLabel, g.homeScore, g.awayScore, g.status]);
    assert.deepEqual(got, [
      ["ball-state", true, "Sacramento State", 34, 17, "final"],
      ["new-mexico", true, "North Dakota State", 21, 16, "final"],
    ]);
  });
});
