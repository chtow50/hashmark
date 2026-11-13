import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { AP_STAMP, BOARD_WEEK, CFP_STAMP, FEATURED_SLATE_WEEK, WEEK11_FEATURED } from "./featured.ts";
import { fcsStubsForWeek } from "./fcs-stubs.ts";
import { splitNewcomerStubRows } from "./fbs-newcomers-test-helpers.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");

const pack = JSON.parse(
  readFileSync(join(root, "data/week11_fbs_fbs_kick_tv_vegas_2026.json"), "utf8"),
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
const sql = readFileSync(join(root, "migrations/0087_week11_kick_tv_vegas.sql"), "utf8");
const blockFor = (home: string, away: string) =>
  sql.split("\n\n").find((b) => b.includes(`h.slug = '${home}' and a.slug = '${away}'`));

describe("Week 11 FBS–FBS kick / TV / Vegas (0087)", () => {
  it("covers 65 games, 28 Vegas (ESPN DraftKings = CBS Sports), 14 held kicks, CST offsets", () => {
    assert.equal(pack.meta.n_games, 65);
    assert.equal(pack.games.length, 65);
    assert.equal(pack.meta.n_with_vegas, 28);
    assert.equal(pack.meta.n_blank_vegas, 37);
    assert.equal(pack.meta.n_tbd_kick, 14);
    assert.equal(pack.meta.n_blank_tv, 17);
    assert.equal(pack.meta.excluded_fcs.length, 2);
    assert.match(pack.meta.excluded_fcs[0] ?? "", /401866462/);
    assert.match(pack.meta.excluded_fcs[1] ?? "", /401864537/);
    assert.equal(pack.games.filter((g) => g.vegas_details != null).length, 28);
    assert.equal((sql.match(/update games/g) ?? []).length, 65);
    assert.equal((sql.match(/g\.week = 11;/g) ?? []).length, 65);
    assert.equal((sql.match(/kickoff_at = /g) ?? []).length, 51);
    // DST ended Nov 1: every Week 11 kick is CST (UTC−6).
    assert.equal((sql.match(/:00-06'/g) ?? []).length, 51);
    assert.doesNotMatch(sql, /:00-05'/);
    assert.doesNotMatch(sql, /home_score|away_score|status\s*=|hx_rating|win_title|make_field/);
  });

  it("leaves the TBD / ESPN timeValid=false kicks blank (no invented kick or TV)", () => {
    for (const [home, away] of [
      ["ucf", "arizona-state"],
      ["byu", "baylor"],
      ["iowa-state", "cincinnati"],
      ["west-virginia", "kansas"],
      ["tcu", "kansas-state"],
      ["oklahoma-state", "texas-tech"],
      ["arizona", "utah"],
      ["georgia", "missouri"],
      ["kentucky", "florida"],
      ["lsu", "texas"],
      ["oklahoma", "ole-miss"],
      ["texas-am", "tennessee"],
      ["north-carolina", "louisville"],
      ["virginia-tech", "stanford"],
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

  it("stores the 28 two-source Vegas lines (positive = home favored)", () => {
    for (const [home, away, spread, total] of [
      ["ohio-state", "northwestern", 10.5, 47.5],
      ["vanderbilt", "alabama", -19.5, 54.5],
      ["charlotte", "east-carolina", -11.5, 45.5],
      ["temple", "uab", 2.5, 51.5],
      ["coastal-carolina", "arkansas-state", 1.5, 50.5],
      ["rice", "tulane", 1.5, 46.5],
      ["sam-houston", "kennesaw-state", -7.5, 44.5],
      ["missouri-state", "new-mexico-state", 1.5, 50.5],
      ["virginia", "california", 12.5, 47.5],
      ["northern-illinois", "nevada", -10.5, 46.5],
      ["georgia-state", "georgia-southern", -5.5, 55.5],
      ["western-kentucky", "jacksonville-state", -6, 52.5],
      ["liberty", "middle-tennessee", 20.5, 54.5],
      ["louisiana-tech", "southern-miss", 18.5, 54.5],
      ["marshall", "app-state", -2.5, 53.5],
      ["penn-state", "minnesota", 7.5, 43.5],
      ["south-alabama", "troy", 3, 56.5],
      ["iowa", "purdue", 16.5, 45.5],
      ["utep", "wyoming", -10, 43.5],
      ["ucf", "arizona-state", 2.5, 52.5],
      ["byu", "baylor", 7, 48.5],
      ["iowa-state", "cincinnati", 1.5, 60.5],
      ["west-virginia", "kansas", 2.5, 64.5],
      ["tcu", "kansas-state", 9.5, 45.5],
      ["oklahoma-state", "texas-tech", 2.5, 70.5],
      ["arizona", "utah", -2.5, 53.5],
      ["kentucky", "florida", 2.5, 53.5],
      ["lsu", "texas", 3.5, 45.5],
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

  it("keeps Friday cards on Friday (Illinois @ UCLA Fri 20:00 CT FOX)", () => {
    const g = pack.games.find((r) => r.home_slug === "ucla" && r.away_slug === "illinois");
    assert.equal(g?.kick_ct, "2026-11-13 20:00");
    assert.equal(g?.tv, "FOX");
    const block = blockFor("ucla", "illinois");
    assert.ok(block);
    assert.match(block, /Fri 2026-11-13 20:00 CT/);
    assert.match(block, /kickoff_at = timestamptz '2026-11-13 20:00:00-06'/);
    assert.match(block, /tv = 'FOX'/);
    assert.doesNotMatch(block, /Saturday|Sat /);
  });

  it("pins the Week 11 featured Michigan @ Oregon card: Sat 14:30 CT · FS1 · Vegas blank", () => {
    assert.equal(BOARD_WEEK, 11);
    assert.equal(FEATURED_SLATE_WEEK, 11);
    assert.equal(WEEK11_FEATURED.homeSlug, "oregon");
    assert.equal(WEEK11_FEATURED.awaySlug, "michigan");
    const g = pack.games.find((r) => r.home_slug === "oregon" && r.away_slug === "michigan");
    assert.equal(g?.espn_event_id, "401858523");
    assert.equal(g?.kick_ct, "2026-11-14 14:30");
    assert.equal(g?.tv, "FS1");
    assert.equal(g?.vegas_details, null);
    const block = blockFor("oregon", "michigan");
    assert.ok(block);
    assert.match(block, /kickoff_at = timestamptz '2026-11-14 14:30:00-06'/);
    assert.match(block, /tv = 'FS1'/);
    assert.match(block, /vegas_spread = null/);
  });
});

describe("Week 10 AP Top 25 stamp (0088, Nov. 1)", () => {
  const apSql = readFileSync(join(root, "migrations/0088_week10_ap_top25.sql"), "utf8");
  const ap = JSON.parse(readFileSync(join(root, "data/week10_ap_top25_2026.json"), "utf8"));

  it("clears then sets 25 AP ranks on week 0 rows only (no ties)", () => {
    assert.match(apSql, /update rankings set ap_rank = null where season = 2026 and week = 0;/);
    assert.equal((apSql.match(/^\s+\('[a-z-]+', \d+\)/gm) ?? []).length, 25);
    assert.match(apSql, /\('miami', 1\)/);
    assert.match(apSql, /\('georgia', 2\)/);
    assert.match(apSql, /\('utah', 3\)/);
    assert.match(apSql, /\('ohio-state', 11\)/);
    assert.match(apSql, /\('iowa', 21\)/);
    assert.match(apSql, /\('new-mexico', 22\)/);
    assert.match(apSql, /\('south-carolina', 23\)/);
    assert.match(apSql, /\('florida', 25\)/);
    assert.doesNotMatch(apSql, /\('smu',|\('northwestern',|\('oklahoma-state',|\('wisconsin',/);
    const body = apSql
      .split("\n")
      .filter((l) => !l.startsWith("--"))
      .join("\n");
    assert.doesNotMatch(body, /hx_|make_field|win_title|truncate|games/i);
    assert.equal(ap.poll_week, 10);
    assert.equal(ap.as_of, "2026-11-01");
    assert.deepEqual(
      ap.dropped.map((d: { slug: string }) => d.slug),
      ["smu", "northwestern", "oklahoma-state", "wisconsin"],
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
    assert.equal(BOARD_WEEK, 11);
    assert.equal(FEATURED_SLATE_WEEK, 11);
  });
});

describe("Week 11 Tuesday FINALs (0089, WMU@AKR + KENT@BGSU + OHIO@M-OH)", () => {
  const tueSql = readFileSync(join(root, "migrations/0089_week11_tue_finals.sql"), "utf8");
  const expected = [
    ["401866458", "akron", "western-michigan", 14, 42, "Western Michigan @ Akron — Western Michigan 42, Akron 14"],
    ["401866459", "bowling-green", "kent-state", 33, 28, "Kent State @ Bowling Green — Bowling Green 33, Kent State 28"],
    ["401866460", "miami-oh", "ohio", 34, 17, "Ohio @ Miami (OH) — Miami (OH) 34, Ohio 17"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((tueSql.match(/update games/g) ?? []).length, 3);
    assert.equal((tueSql.match(/g\.week = 11/g) ?? []).length, 3);
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

describe("Week 11 Wednesday FINALs (0090, BUFF@BALL + MASS@TOL; SAC@CMU stub)", () => {
  const wedSql = readFileSync(join(root, "migrations/0090_week11_wed_finals.sql"), "utf8");
  const expected = [
    ["401866461", "ball-state", "buffalo", 7, 28, "Buffalo @ Ball State — Buffalo 28, Ball State 7"],
    ["401866463", "toledo", "massachusetts", 24, 0, "Massachusetts @ Toledo — Toledo 24, Massachusetts 0"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((wedSql.match(/update games/g) ?? []).length, 2);
    assert.equal((wedSql.match(/g\.week = 11/g) ?? []).length, 2);
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

  it("adds Sacramento State @ Central Michigan as a Week 11 FCS FINAL stub", () => {
    const got = fcsStubsForWeek(11).map((g) => [g.teamSlug, g.home, g.opponentLabel, g.homeScore, g.awayScore, g.status]);
    assert.deepEqual(got, splitNewcomerStubRows([["central-michigan", true, "Sacramento State", 28, 7, "final"]] as const));
  });
});

describe("Week 11 Thursday FINALs (0097, MEM@USF + LA@ULM)", () => {
  const thuSql = readFileSync(join(root, "migrations/0097_week11_thu_finals.sql"), "utf8");
  const expected = [
    ["401862824", "usf", "memphis", 41, 52, "Memphis @ USF — Memphis 52, USF 41"],
    ["401869969", "ul-monroe", "louisiana", 21, 42, "Louisiana @ UL Monroe — Louisiana 42, UL Monroe 21"],
  ] as const;

  it("stamps scores+status only, with the exact home/away orientation", () => {
    assert.equal((thuSql.match(/update games/g) ?? []).length, 2);
    assert.equal((thuSql.match(/g\.week = 11/g) ?? []).length, 2);
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

describe("Week 11 AP (Nov. 8) + CFP committee (Nov. 10) stamp (0092)", () => {
  const sql = readFileSync(join(root, "migrations/0092_week11_ap_cfp_rankings.sql"), "utf8");
  const ap = JSON.parse(readFileSync(join(root, "data/week11_ap_top25_2026.json"), "utf8"));
  const cfp = JSON.parse(readFileSync(join(root, "data/cfp_rankings_2026_11_10.json"), "utf8"));

  it("clears then sets 25 AP and 25 CFP ranks on week 0 rows only", () => {
    assert.match(sql, /alter table rankings add column if not exists cfp_rank int;/);
    assert.match(sql, /update rankings set ap_rank = null where season = 2026 and week = 0;/);
    assert.match(sql, /update rankings set cfp_rank = null where season = 2026 and week = 0;/);
    assert.equal((sql.match(/^\s+\('[a-z-]+', \d+\)/gm) ?? []).length, 50);
    assert.equal(ap.poll_week, 11);
    assert.equal(ap.as_of, "2026-11-08");
    assert.equal(cfp.release, "2026-11-10");
    assert.equal(ap.teams.length, 25);
    assert.equal(cfp.teams.length, 25);
    assert.equal(ap.teams[0].slug, "georgia");
    assert.equal(cfp.teams[0].slug, "georgia");
    assert.equal(cfp.teams[2].slug, "alabama");
    assert.deepEqual(ap.dropped.map((d: { slug: string }) => d.slug), ["missouri", "florida"]);
    const body = sql.split("\n").filter((l) => !l.startsWith("--")).join("\n");
    assert.doesNotMatch(body, /hx_|make_field|win_title|truncate|games/i);
  });

  it("is the live chrome", () => {
    assert.equal(AP_STAMP.week, 11);
    assert.equal(AP_STAMP.asOf, "Nov. 8");
    assert.equal(CFP_STAMP.release, "2026-11-10");
  });
});

describe("Week 11 Vegas two-source fill (0095)", () => {
  const sql = readFileSync(join(root, "migrations/0095_week11_vegas_two_source.sql"), "utf8");
  const pack = JSON.parse(readFileSync(join(root, "data/week11_vegas_two_source_2026.json"), "utf8")) as {
    games: { home: string; away: string; dk: number; bovada: number; stamped: boolean; vegas_spread: number | null; vegas_total: number | null }[];
  };

  it("stamps a spread only where DraftKings and Bovada match exactly, home-positive, nulls only", () => {
    const stamped = pack.games.filter((g) => g.stamped);
    assert.equal(stamped.length, 21);
    assert.equal((sql.match(/^update games g$/gm) ?? []).length, 21);
    for (const g of stamped) {
      assert.equal(g.dk, g.bovada, `${g.away}@${g.home}`);
      // CFBD lines are the home team's line (negative = home favored); the board stores positive = home favored.
      assert.equal(g.vegas_spread, -g.dk, `${g.away}@${g.home}`);
      assert.ok(sql.includes(`and h.slug = '${g.home}' and a.slug = '${g.away}'`), `${g.away}@${g.home}`);
    }
    assert.equal((sql.match(/and g\.vegas_spread is null and g\.status <> 'final'/g) ?? []).length, 21);
    assert.doesNotMatch(sql, /kickoff_at|home_score|hx_rating|lock_home_hx/);
    // The stamp gate keys blocks by event digits; none sit above a week predicate here.
    assert.doesNotMatch(sql, /ESPN \d{6,}/);
  });
});
