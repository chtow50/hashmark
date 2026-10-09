import assert from "node:assert/strict";
import test from "node:test";
import { predictMatchup } from "./model.ts";
import { isWinnerFlip, matchupChips, needsRowFinalChip } from "./schedule-flags.ts";

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

test("matchupChips surfaces spread gap when same favorite and |gap| >= 4", () => {
  const p = pred(10.3);
  const chips = matchupChips(p, { neutral: false, vegasSpread: 6.0, status: "scheduled" });
  assert.deepEqual(chips.map((c) => c.kind), ["spread_gap"]);
  // Away favorite, same side.
  assert.deepEqual(
    matchupChips(pred(-10.3), { neutral: false, vegasSpread: -6.0, status: "scheduled" }).map((c) => c.kind),
    ["spread_gap"],
  );
});

test("matchupChips: no spread gap chip under 4 pts (HX = Vegas is not a flag)", () => {
  const kinds = (hx: number, book: number) =>
    matchupChips(pred(hx), { neutral: false, vegasSpread: book, status: "scheduled" }).map((c) => c.kind);
  // Week 6 USF @ UTSA: HX UTSA −7.0 vs Vegas UTSA −7.0.
  assert.deepEqual(kinds(7.0, 7), []);
  assert.deepEqual(kinds(10.3, 9.1), []);
  assert.deepEqual(kinds(10, 6.5), []);
  assert.deepEqual(kinds(-7.0, -7), []);
});

test("matchupChips: exactly 4.0 pts shows the spread gap chip", () => {
  const kinds = (hx: number, book: number) =>
    matchupChips(pred(hx), { neutral: false, vegasSpread: book, status: "scheduled" }).map((c) => c.kind);
  assert.deepEqual(kinds(11.0, 7), ["spread_gap"]);
  assert.deepEqual(kinds(3.0, 7), ["spread_gap"]);
  assert.deepEqual(kinds(10.4, 6.5), []); // 3.9
  // Week 6 home featured ISU @ BYU: HX BYU −15.0 vs Vegas BYU −10.5 (gap 4.5).
  assert.deepEqual(kinds(15.0, 10.5), ["spread_gap"]);
});

test("winner flip is unchanged by the spread gap threshold", () => {
  const kinds = (hx: number, book: number) =>
    matchupChips(pred(hx), { neutral: false, vegasSpread: book, status: "scheduled" }).map((c) => c.kind);
  assert.deepEqual(kinds(7, -3), ["winner_flip"]);
  assert.deepEqual(kinds(0.5, -0.5), ["winner_flip"]);
  assert.deepEqual(kinds(-12, 10), ["winner_flip"]);
  assert.equal(isWinnerFlip(pred(1.2), -2.5), true);
});

test("a FINAL /schedule row has exactly one Final chip", () => {
  // Mirrors ScheduleRow: matchupChips() for HX rows + the row-level Final (Vegas-only rows).
  const rowFinals = (
    p: ReturnType<typeof pred> | null,
    vegasSpread: number | null,
    status: "final" | "scheduled",
    neutral = false,
  ) => {
    const chips = p ? matchupChips(p, { neutral, vegasSpread, status }) : [];
    return chips.filter((c) => c.kind === "final").length + (needsRowFinalChip(chips, status) ? 1 : 0);
  };
  assert.equal(rowFinals(pred(7.0), 7, "final"), 1); // USF @ UTSA FINAL
  assert.equal(rowFinals(pred(15), 10.5, "final"), 1); // with spread gap
  assert.equal(rowFinals(pred(7), -3, "final", true), 1); // neutral + winner flip
  assert.equal(rowFinals(null, 20, "final"), 1); // FCS Vegas-only (no HX prediction)
  assert.equal(rowFinals(pred(7), 7, "scheduled"), 0);
  assert.equal(rowFinals(null, 20, "scheduled"), 0);
  assert.deepEqual(
    matchupChips(pred(15), { neutral: false, vegasSpread: 10.5, status: "final" }).map((c) => c.kind),
    ["final", "spread_gap"],
  );
});
