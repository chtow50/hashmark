import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { computeSor, pWin } from "./sor.ts";

describe("strength of record / schedule", () => {
  const hx = { a: 5, b: 3, c: 0, d: -2 };
  const games = [
    { home: "a", away: "b", neutral: false, final: true, winner: "a" },
    { home: "c", away: "a", neutral: false, final: true, winner: "c" },
    { home: "a", away: "d", neutral: true, final: false, winner: null },
    { home: "b", away: "d", neutral: false, final: true, winner: "b" },
  ];
  const fcs = [{ team: "a", site: "home" as const, final: true, won: true }, { team: "d", site: "away" as const, final: false, won: null }];
  const rows = computeSor(hx, games, fcs, 2);
  const by = Object.fromEntries(rows.map((r) => [r.slug, r]));
  it("counts real results, FCS included, and averages FBS opponent HX only", () => {
    assert.equal(by.a.w, 2);
    assert.equal(by.a.l, 1);
    assert.equal(by.a.fcsPlayed, 1);
    assert.equal(by.a.sosPlayed, 1.5); // b (3) and c (0)
    assert.equal(by.a.sosRemaining, -2);
    assert.equal(by.d.fcsRemaining, 1);
    assert.equal(by.c.sosRemaining, null);
  });
  it("SOR = wins − benchmark expected wins at the same sites", () => {
    const bench = pWin(2, 3, "home") + pWin(2, 0, "away") + 0.92;
    assert.ok(Math.abs(by.a.benchW - bench) < 1e-9);
    assert.ok(Math.abs(by.a.sor - (2 - bench)) < 1e-9);
    assert.ok(pWin(2, 2, "home") > 0.5 && Math.abs(pWin(2, 2, "neutral") - 0.5) < 1e-12);
  });
  it("ranks 1 = best SOR and hardest schedule", () => {
    const sorted = [...rows].sort((x, y) => y.sor - x.sor);
    assert.equal(by[sorted[0].slug].sorRank, 1);
    const hardest = [...rows].filter((r) => r.sosPlayed != null).sort((x, y) => y.sosPlayed! - x.sosPlayed!)[0];
    assert.equal(hardest.sosPlayedRank, 1);
  });
});
