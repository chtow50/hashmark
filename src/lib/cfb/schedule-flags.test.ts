import assert from "node:assert/strict";
import test from "node:test";
import { predictMatchup } from "./model.ts";
import { isWinnerFlip, matchupChips } from "./schedule-flags.ts";

function pred(spread: number) {
  const home = { hxRating: 8, offenseRating: 30, defenseRating: 25 };
  const away = { hxRating: 6, offenseRating: 28, defenseRating: 27 };
  const base = predictMatchup(home, away, { neutral: false });
  const scale = spread / (base.spread || 1);
  return { ...base, spread };
}

test("isWinnerFlip when favorites disagree", () => {
  const p = pred(7);
  assert.equal(isWinnerFlip(p, -3), true);
  assert.equal(isWinnerFlip(p, 3), false);
});

test("isWinnerFlip ignores PK and missing Vegas", () => {
  const p = pred(0);
  assert.equal(isWinnerFlip(p, 3), false);
  assert.equal(isWinnerFlip(pred(7), null), false);
});

test("matchupChips surfaces neutral, final, winner flip", () => {
  const p = pred(7);
  const chips = matchupChips(p, { neutral: true, vegasSpread: -3, status: "final" });
  assert.deepEqual(
    chips.map((c) => c.kind),
    ["neutral", "final", "winner_flip"],
  );
});

test("matchupChips surfaces spread gap when same favorite", () => {
  const p = pred(10);
  const chips = matchupChips(p, { neutral: false, vegasSpread: 6.5, status: "scheduled" });
  assert.deepEqual(chips.map((c) => c.kind), ["spread_gap"]);
});
