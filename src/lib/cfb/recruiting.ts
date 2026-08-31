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

/** Hide class avg in the recruiting UI when fewer than this many commits are starred. */
export const MIN_RATED_FOR_AVG = 8;

/** Typical 247 Composite (×100) by star, used only to detect NA-as-zero means. */
const STAR_MEAN = { five: 98.5, four: 91.5, three: 86.0 } as const;

/** Starred commit count (5★+4★+3★). Schema has no separate rated-n column. */
export function ratedStarCount(fiveStars: number, fourStars: number, threeStars: number) {
  return fiveStars + fourStars + threeStars;
}

/**
 * Class avg for display. Returns null (render an em dash) when n rated < 8.
 * Does not change the stored / formula avg — Missouri State 2026 stays in the DB.
 */
export function visibleClassAvg(avgRating: number, ratedCount: number): number | null {
  return ratedCount >= MIN_RATED_FOR_AVG ? avgRating : null;
}

type FeaturedRow = { compositeRank: number; points: number };

/**
 * Top 3 of a year (or conf-filtered year) by 247 Composite order: rank, then Points.
 * Never by avg — featured cards must ignore the table's current sort.
 */
export function featuredByComposite<T extends FeaturedRow>(rows: T[]): T[] {
  return [...rows]
    .sort((a, b) => a.compositeRank - b.compositeRank || b.points - a.points)
    .slice(0, 3);
}

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
