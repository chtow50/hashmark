import assert from "node:assert/strict";
import test from "node:test";
import { ratedOnlyClassAvg } from "./recruiting.ts";

test("Texas A&M 2023: Research CFB live-check — 1740.4/19, not /20", () => {
  // Rank 15, 20 enrollees, 19 rated. HASHMARK stored 87.02 = 1740.4/20.
  // Rated-only is 1740.4/19 = 91.60. 91.42 was 1737/19 (same bug, rounding).
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

test("2026 academies: NA-as-zero floors jump; points stay out of this helper", () => {
  // Army 50/3, Navy 50/8, Air Force 49/10 — leftover commits are unrated zeros.
  assert.equal(ratedOnlyClassAvg(5.0, 50, 0, 0, 3), 83.33);
  assert.equal(ratedOnlyClassAvg(13.38, 50, 0, 0, 8), 83.63);
  assert.equal(ratedOnlyClassAvg(17.04, 49, 0, 0, 10), 83.5);
});
