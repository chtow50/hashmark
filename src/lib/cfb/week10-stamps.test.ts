import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
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

  it("pins the featured Oregon @ Ohio State card: Sat 14:30 CT · CBS · Vegas blank", () => {
    assert.equal(BOARD_WEEK, 10);
    assert.equal(FEATURED_SLATE_WEEK, 10);
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

  it("drives the AP chrome", () => {
    assert.equal(AP_STAMP.week, 9);
    assert.equal(AP_STAMP.asOf, "Oct. 25");
    assert.equal(AP_STAMP.label, "Week 9 AP");
    assert.equal(AP_STAMP.columnHint, "W9 stamp");
  });
});
