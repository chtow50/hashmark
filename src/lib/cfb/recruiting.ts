/**
 * Recruiting class avg is the mean of *rated* 247 Composite decimals (0–100).
 * Unrated / NA / zero-placeholder commits are dropped from the mean only —
 * never from points, commit counts, star chrome, ranks, or HX.
 *
 * Source stamp is CFBTrack, the same label used for the Georgia 2026 class
 * avg (0.921 × 100). No calendar date lives in data/seed; do not invent one.
 */
export const COMPOSITE_SOURCE = {
  label: "247 Composite",
  stamp: "CFBTrack",
  board: "247 Composite · CFBTrack",
} as const;

/** Typical 247 Composite (×100) by star, used only to detect NA-as-zero means. */
const STAR_MEAN = { five: 98.5, four: 91.5, three: 86.0 } as const;

function round2(n: number) {
  return Math.round(n * 100 + Number.EPSILON) / 100;
}

/**
 * If `storedAvg` is the mean of rated composites plus NA zeros, lift it back
 * to the rated-only mean. The 70–99.5 gate is on that *corrected* mean, not
 * the stored floor — Army 2026 stored 5.00 becomes 83.33 and must move.
 * Leave already-correct rows (Georgia 2026 = 92.1) and classes whose leftover
 * commits are rated 2-stars (rescale would exceed 100).
 */
export function ratedOnlyClassAvg(
  storedAvg: number,
  commits: number,
  fiveStars: number,
  fourStars: number,
  threeStars: number,
): number {
  const starred = fiveStars + fourStars + threeStars;
  if (!(commits > 0) || starred <= 0 || starred >= commits) return storedAvg;
  const corrected = (storedAvg * commits) / starred;
  if (corrected < 70 || corrected > 99.5) return storedAvg;
  const starSum =
    fiveStars * STAR_MEAN.five + fourStars * STAR_MEAN.four + threeStars * STAR_MEAN.three;
  const expectedRated = starSum / starred;
  const expectedDiluted = starSum / commits;
  if (Math.abs(storedAvg - expectedDiluted) < Math.abs(storedAvg - expectedRated)) {
    return round2(corrected);
  }
  return storedAvg;
}
