import assert from "node:assert/strict";
import test from "node:test";
import { ratedOnlyClassAvg } from "./recruiting.ts";

test("Texas A&M 2023: one NA zero is dropped; points stay out of this helper", () => {
  // 20 commits, 19 rated, stored 87.02 = 91.6 * 19/20
  assert.equal(ratedOnlyClassAvg(87.02, 20, 2, 11, 6), 91.6);
});

test("Arkansas 2023: six NA zeros are dropped", () => {
  // 27 commits, 21 with stars, stored 68.91
  assert.equal(ratedOnlyClassAvg(68.91, 27, 0, 8, 13), 88.6);
});

test("Georgia 2026 stays 92.1 (already the rated CFBTrack mean)", () => {
  assert.equal(ratedOnlyClassAvg(92.1, 32, 1, 22, 7), 92.1);
});

test("fully starred class is unchanged", () => {
  assert.equal(ratedOnlyClassAvg(94.06, 26, 5, 17, 4), 94.06);
});

test("leftover rated 2-stars are not treated as NA (rescale would exceed 100)", () => {
  assert.equal(ratedOnlyClassAvg(85.21, 28, 0, 8, 15), 85.21);
});
