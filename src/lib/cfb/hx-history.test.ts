import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { teamHxHistory } from "./hx-history.ts";

const refit = JSON.parse(readFileSync(new URL("../../../data/hx_refit_2026.json", import.meta.url), "utf8"));
const late = { "north-dakota-state": 12, "sacramento-state": 12 };
const live = Object.fromEntries(refit.board.map((b: { slug: string; hx: number; rank: number }) => [b.slug, b]));

describe("HX history", () => {
  it("ends on the live board and starts on the frozen preseason prior", () => {
    const prior = JSON.parse(readFileSync(new URL("../../../data/hx_preseason_prior_2026.json", import.meta.url), "utf8"));
    for (const b of refit.board) {
      const h = teamHxHistory(refit.history, b.slug, late, live)!;
      assert.ok(Math.abs(h.points.at(-1)!.hx - b.hx) < 1e-3, b.slug);
      if (!(b.slug in late)) {
        assert.equal(h.points.length, refit.history.weeks.length);
        assert.equal(h.points.at(-1)!.rank, b.rank, b.slug);
        const p = prior.teams.find((t: { slug: string }) => t.slug === b.slug);
        assert.ok(Math.abs(h.points[0].hx - p.hx) < 1e-3, b.slug);
      }
    }
  });
  it("starts late joiners the week they joined and ranks them only from then", () => {
    const h = teamHxHistory(refit.history, "north-dakota-state", late)!;
    assert.equal(h.points.length, 1);
    assert.equal(h.points[0].week, 12);
    assert.equal(h.points[0].of, 138);
    const g = teamHxHistory(refit.history, "georgia", late)!;
    assert.equal(g.points[0].of, 136);
    assert.equal(teamHxHistory(refit.history, "nope", late), null);
  });
});
