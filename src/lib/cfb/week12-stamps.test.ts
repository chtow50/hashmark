import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
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
