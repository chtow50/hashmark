import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
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

  it("pins the featured Ole Miss @ Texas card: Sat 18:30 CT · ABC · Vegas blank", () => {
    assert.equal(BOARD_WEEK, 8);
    assert.equal(FEATURED_SLATE_WEEK, 8);
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

  it("drives the AP chrome", () => {
    assert.equal(AP_STAMP.week, 7);
    assert.equal(AP_STAMP.label, "Week 7 AP");
    assert.equal(AP_STAMP.columnHint, "W7 stamp");
  });
});
