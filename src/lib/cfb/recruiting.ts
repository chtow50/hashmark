/**
 * Recruiting class avg is one number: the mean of *rated* 247 Composite
 * decimals (0–100). Same value in the Avg cell and the Avg sort.
 *
 * Order of truth:
 *  1. CFBTrack team avg in data/recruiting-history.json (already rated-only).
 *  2. Else drop NA / zero-placeholder commits from a diluted stored mean —
 *     never from points, commit counts, star chrome, ranks, or HX.
 *  3. A 3-star-only class cannot sit in the 90s (that is a 4-star mean).
 *
 * Source stamp is CFBTrack, the same label used for the Georgia 2026 class
 * avg (0.921 × 100). No calendar date lives in data/seed; do not invent one.
 */
import recHistory from "../../../data/recruiting-history.json" with { type: "json" };

export const COMPOSITE_SOURCE = {
  label: "247 Composite",
  stamp: "CFBTrack",
  board: "247 Composite · CFBTrack",
} as const;

/** Hide class avg in the recruiting UI when fewer than this many commits are starred. */
export const MIN_RATED_FOR_AVG = 8;

/** Typical 247 Composite (×100) by star, used to detect NA-as-zero means. */
const STAR_MEAN = { five: 98.5, four: 91.5, three: 86.0 } as const;

/**
 * Typical 3-star-only 247 Composite (×100). 90s is a 4-star class; G5 3-star
 * boards (Ball State, Missouri State) sit here, not at 95.
 */
const THREE_STAR_COMPOSITE = 84;
/** High 3-star, still not a 4-star mean. */
const THREE_STAR_CEILING = 88;
/** NA-drop may not overshoot the star-mix mean by more than this. */
const LIFT_OVERSHOOT = 3;

/** Starred commit count (5★+4★+3★). Schema has no separate rated-n column. */
export function ratedStarCount(fiveStars: number, fourStars: number, threeStars: number) {
  return fiveStars + fourStars + threeStars;
}

/**
 * Class avg for display / Avg-sort. Returns null (render an em dash) when
 * n rated < 8. Cell and sort must use this same value.
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

/** [rank, commits, avg, points, 5★, 4★, 3★] — avg is the rated 247 Composite mean. */
type HistoryTuple = [number, number, number, number, number, number, number];

type HistoryFile = {
  classes?: Record<string, Record<string, HistoryTuple>>;
};

const HISTORY_CLASSES = (recHistory as unknown as HistoryFile).classes ?? {};

/** CFBTrack team avg from recruiting-history.json, or null if that class is not on the board. */
export function historyClassAvg(slug: string | undefined, classYear: number | undefined): number | null {
  if (!slug || classYear == null) return null;
  const row = HISTORY_CLASSES[String(classYear)]?.[slug];
  if (!row || typeof row[2] !== "number") return null;
  return row[2];
}

export type ClassAvgInput = {
  storedAvg: number;
  commits: number;
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  slug?: string;
  classYear?: number;
};

/**
 * One 0–100 rated Composite mean: JSON team avg if present, else the NA-drop
 * heuristic with a star-mix ceiling. Points / HX / commits are not inputs.
 */
export function compositeClassAvg(input: ClassAvgInput): number {
  const board = historyClassAvg(input.slug, input.classYear);
  if (board != null) return board;
  return ratedOnlyClassAvg(
    input.storedAvg,
    input.commits,
    input.fiveStars,
    input.fourStars,
    input.threeStars,
  );
}

function expectedStarMean(fiveStars: number, fourStars: number, threeStars: number, starred: number) {
  const starSum =
    fiveStars * STAR_MEAN.five + fourStars * STAR_MEAN.four + threeStars * STAR_MEAN.three;
  return starSum / starred;
}

/**
 * If `storedAvg` is the mean of rated composites plus NA zeros, lift it back
 * to the rated-only mean. The 70–99.5 gate is on that *corrected* mean, not
 * the stored floor — Army 2026 stored 5.00 becomes 83.33 and must move.
 * Leave already-correct rows (Georgia 2026 = 92.1) and classes whose leftover
 * commits are rated 2-stars (rescale would exceed 100).
 *
 * Do not keep storedAvg * commits / starred when that lands a 3-star-only
 * class in the 90s (Ball State 12 threes → 95.81). Snap those to a 3-star
 * Composite mean. Mixed classes that overshoot the star mix snap to the mix.
 */
export function ratedOnlyClassAvg(
  storedAvg: number,
  commits: number,
  fiveStars: number,
  fourStars: number,
  threeStars: number,
): number {
  const starred = fiveStars + fourStars + threeStars;
  if (!(commits > 0) || starred <= 0) return storedAvg;

  const expectedRated = expectedStarMean(fiveStars, fourStars, threeStars, starred);
  const expectedDiluted = (expectedRated * starred) / commits;

  let candidate = storedAvg;
  let lifted = false;
  if (starred < commits) {
    const corrected = (storedAvg * commits) / starred;
    const inBand = corrected >= 70 && corrected <= 99.5;
    const looksDiluted =
      Math.abs(storedAvg - expectedDiluted) < Math.abs(storedAvg - expectedRated);
    if (inBand && looksDiluted) {
      candidate = round2(corrected);
      lifted = true;
    }
  }

  // 0/0/N cannot average in the 90s — that is a 4-star class, not 12 threes.
  if (fiveStars === 0 && fourStars === 0 && candidate > THREE_STAR_CEILING) {
    return THREE_STAR_COMPOSITE;
  }

  const storedLooksLifted = starred < commits && storedAvg > expectedRated + LIFT_OVERSHOOT;
  if ((lifted || storedLooksLifted) && candidate > expectedRated + LIFT_OVERSHOOT) {
    return round2(expectedRated);
  }

  return candidate;
}

type AvgSortRow = {
  avgRating: number;
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  compositeRank: number;
  points: number;
};

/** Avg-sort key: the same number the cell shows, or null when the cell is an em dash. */
export function avgSortValue(row: {
  avgRating: number;
  fiveStars: number;
  fourStars: number;
  threeStars: number;
}): number | null {
  return visibleClassAvg(row.avgRating, ratedStarCount(row.fiveStars, row.fourStars, row.threeStars));
}

/**
 * Sort by visible Composite avg. Hidden (n rated < 8) rows go last in both
 * directions so a dash cannot win Avg. Tie-break is composite rank, then Points.
 */
export function compareAvgSort(a: AvgSortRow, b: AvgSortRow, dir: "asc" | "desc"): number {
  const av = avgSortValue(a);
  const bv = avgSortValue(b);
  const rankPts = () => a.compositeRank - b.compositeRank || b.points - a.points;
  if (av == null && bv == null) return rankPts();
  if (av == null) return 1;
  if (bv == null) return -1;
  if (av === bv) return rankPts();
  const mul = dir === "asc" ? 1 : -1;
  return (av < bv ? -1 : 1) * mul;
}
