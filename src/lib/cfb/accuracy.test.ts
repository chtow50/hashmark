import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { gradeGame, rollup } from "./accuracy.ts";

const base = { id: "x", week: 3, kickoffDate: "2026-09-12", home: "a", away: "b", homeShort: "A", awayShort: "B", neutral: false, vegasSpread: null };

describe("accuracy grading", () => {
  it("grades only games with a frozen pregame number", () => {
    const g = gradeGame({ ...base, homeScore: 30, awayScore: 20, lockHome: 3, lockAway: 1 });
    assert.ok(g.graded && g.hxSpread! > 0 && g.pHome! > 0.5);
    assert.equal(g.suHit, true);
    assert.ok(Math.abs(g.absErr! - Math.abs(10 - g.hxSpread!)) < 1e-9);
    const n = gradeGame({ ...base, homeScore: 30, awayScore: 20, lockHome: null, lockAway: 1 });
    assert.equal(n.graded, false);
    assert.equal(n.naReason, "no-lock");
    assert.equal(n.hxSpread, null);
    const fcs = gradeGame({ ...base, homeScore: 30, awayScore: 20, lockHome: 3, lockAway: 1, naReason: "fcs" });
    assert.equal(fcs.graded, false);
  });
  it("rolls up SU, MAE, Brier and the lined Vegas subset on the same games", () => {
    const gs = [
      gradeGame({ ...base, homeScore: 30, awayScore: 20, lockHome: 3, lockAway: 1, vegasSpread: 7 }),
      gradeGame({ ...base, id: "y", homeScore: 10, awayScore: 20, lockHome: 3, lockAway: 1 }),
      gradeGame({ ...base, id: "z", homeScore: 10, awayScore: 20, lockHome: null, lockAway: null, naReason: "fcs" }),
    ];
    const r = rollup(gs);
    assert.equal(r.games, 3);
    assert.equal(r.graded, 2);
    assert.equal(r.na, 1);
    assert.equal(r.suHits, 1);
    assert.equal(r.suPct, 50);
    assert.equal(r.lined, 1);
    assert.equal(r.maeVegasLined, 3);
  });
});
