import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { hxTrajectory, hxVsResults, risersFallers, summarizeHxResults } from "./hx-results.ts";
import { predictMatchup } from "./model.ts";
import type { ScheduleGame } from "./types.ts";

const refit = JSON.parse(readFileSync(new URL("../../../data/hx_refit_2026.json", import.meta.url), "utf8"));

function game(over: Partial<ScheduleGame>): ScheduleGame {
  return {
    id: 1, week: 3, kickoffDate: "2026-09-12", homeSlug: "ucla", awaySlug: "oregon",
    homeName: "UCLA", awayName: "Oregon", homeShort: "UCLA", awayShort: "Oregon",
    homeColor: "#000", awayColor: "#000", homeHx: 2, awayHx: 3, homeRank: 40, awayRank: 10,
    homeOff: 0, awayOff: 0, homeDef: 0, awayDef: 0, neutral: false, location: null, headline: null,
    kickoffAt: null, vegasSpread: null, vegasTotal: null, homeScore: 30, awayScore: 20,
    status: "final", tv: null, ...over,
  };
}

describe("hxVsResults", () => {
  it("grades a team's FINALs from its own side, using the pregame-locked HX", () => {
    const g = game({});
    const p = predictMatchup({ hxRating: 2, offenseRating: 0, defenseRating: 0 }, { hxRating: 3, offenseRating: 0, defenseRating: 0 });
    const [home] = hxVsResults("ucla", [g]);
    assert.equal(home.expected, p.spread);
    assert.equal(home.actual, 10);
    assert.equal(home.diff, 10 - p.spread);
    const [away] = hxVsResults("oregon", [g]);
    assert.equal(away.expected, -p.spread);
    assert.equal(away.actual, -10);
  });
  it("skips scheduled games, FCS stubs, and other teams' games", () => {
    const rows = hxVsResults("ucla", [
      game({ id: 2, status: "scheduled", homeScore: null, awayScore: null }),
      game({ id: 3, isFcs: true }),
      game({ id: 4, homeSlug: "texas", awaySlug: "lsu" }),
    ]);
    assert.equal(rows.length, 0);
    assert.equal(summarizeHxResults(rows), null);
  });
  it("summarizes means and SU hits (ties are not hits)", () => {
    const rows = hxVsResults("ucla", [
      game({ id: 1, week: 1, homeHx: 5, awayHx: 0, homeScore: 21, awayScore: 20 }),
      game({ id: 2, week: 2, homeHx: 5, awayHx: 0, homeScore: 10, awayScore: 30 }),
      game({ id: 3, week: 3, homeHx: 5, awayHx: 0, homeScore: 17, awayScore: 17 }),
    ]);
    const s = summarizeHxResults(rows)!;
    assert.equal(s.n, 3);
    assert.equal(s.suHits, 1);
    assert.ok(Math.abs(s.avgActual - (1 - 20 + 0) / 3) < 1e-9);
    assert.ok(Math.abs(s.avgDiff - (s.avgActual - s.avgExpected)) < 1e-9);
  });
});

describe("refit-file panels", () => {
  it("HX trajectory is the refit history (Week 1 = preseason prior) ending at the live board", () => {
    const t = hxTrajectory("ucla")!;
    const row = refit.board.find((r: { slug: string }) => r.slug === "ucla");
    assert.deepEqual(t.points.map((p) => p.hx), refit.history.hx.ucla);
    // history is stored at 3 dp, the board at 4 dp
    assert.ok(Math.abs(t.points[0].hx - row.pre_hx) < 6e-4);
    assert.ok(Math.abs(t.points.at(-1)!.hx - row.hx) < 6e-4);
    assert.equal(t.rank, row.rank);
    assert.equal(hxTrajectory("not-a-team"), null);
  });
  it("risers/fallers are rank moves since preseason, sorted by size", () => {
    const { risers, fallers } = risersFallers(6);
    assert.equal(risers.length, 6);
    assert.equal(fallers.length, 6);
    for (const m of [...risers, ...fallers]) assert.equal(m.delta, m.preRank - m.rank);
    for (let i = 1; i < 6; i++) {
      assert.ok(risers[i - 1].delta >= risers[i].delta);
      assert.ok(fallers[i - 1].delta <= fallers[i].delta);
    }
    assert.ok(risers.every((m) => m.delta > 0) && fallers.every((m) => m.delta < 0));
    const maxRise = Math.max(...refit.board.map((r: { pre_rank: number; rank: number }) => r.pre_rank - r.rank));
    assert.equal(risers[0].delta, maxRise);
  });
});
