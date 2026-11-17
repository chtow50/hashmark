import test from "node:test";
import assert from "node:assert/strict";
import {
  buildTalentResults,
  spearman,
  summarizeTalentResults,
  talent247,
} from "./talent-results.ts";
import talentRaw from "../../../data/talent_247_2026.json" with { type: "json" };

test("247 talent file: 138 teams 2026, competition ranks, Georgia No. 1", () => {
  const rows = (
    talentRaw as { years: Record<string, { slug: string; talent: number; rank: number }[]> }
  ).years["2026"];
  assert.equal(rows.length, 138);
  assert.equal(rows[0].slug, "georgia");
  assert.equal(rows[0].talent, 1003.67);
  for (let i = 1; i < rows.length; i++) {
    assert.ok(rows[i].talent <= rows[i - 1].talent);
    assert.equal(rows[i].rank, rows[i].talent === rows[i - 1].talent ? rows[i - 1].rank : i + 1);
  }
  assert.deepEqual(talent247("georgia"), { talent: 1003.67, rank: 1, prevRank: 1 });
  assert.equal(talent247("not-a-team"), null);
});

test("spearman: perfect, inverse, ties", () => {
  assert.equal(spearman([1, 2, 3, 4], [10, 20, 30, 40]), 1);
  assert.equal(spearman([1, 2, 3, 4], [4, 3, 2, 1]), -1);
  assert.ok(Math.abs(spearman([1, 1, 2, 3], [1, 2, 3, 4]) - 0.9486832980505138) < 1e-12);
  assert.ok(Number.isNaN(spearman([1, 2], [1, 2])));
});

test("gap = talent rank − HX rank; win% from W-L; unrated skipped", () => {
  const base = { name: "", shortName: "", conference: "SEC", colorPrimary: "#000" };
  const rows = buildTalentResults([
    { ...base, slug: "georgia", hxRank: 5, seasonWins: 8, seasonLosses: 2 },
    { ...base, slug: "texas", hxRank: 0, seasonWins: 0, seasonLosses: 0 },
    { ...base, slug: "nope", hxRank: 3, seasonWins: 1, seasonLosses: 1 },
  ]);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].gap, 1 - 5);
  assert.equal(rows[0].winPct, 0.8);
  const s = summarizeTalentResults(rows);
  assert.equal(s.above.length, 0);
  assert.equal(s.below[0].slug, "georgia");
});
