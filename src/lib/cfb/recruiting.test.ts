import assert from "node:assert/strict";
import test from "node:test";
import {
  apply247Roster,
  avgSortValue,
  compareAvgSort,
  compositeClassAvg,
  featuredByComposite,
  historyClassAvg,
  isGaussian01Roster,
  keep247Rosters,
  ratedOnlyClassAvg,
  ratedStarCount,
  visibleClassAvg,
} from "./recruiting.ts";

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

test("featured cards are composite-rank / Points leaders, not highest avg", () => {
  const rows = [
    { name: "Ball State", compositeRank: 119, points: 118.63, avgRating: 95.81 },
    { name: "Colorado", compositeRank: 37, points: 209.08, avgRating: 95.07 },
    { name: "Oregon", compositeRank: 3, points: 303.22, avgRating: 92.38 },
    { name: "Alabama", compositeRank: 2, points: 303.79, avgRating: 92.04 },
    { name: "USC", compositeRank: 1, points: 310.67, avgRating: 92.08 },
  ];
  assert.deepEqual(
    featuredByComposite(rows).map((r) => r.name),
    ["USC", "Alabama", "Oregon"],
  );
});

test("featuredByComposite returns the same row objects the table holds", () => {
  const usc = { name: "USC", compositeRank: 1, points: 310.67, commits: 34, avgRating: 92.08 };
  const bama = { name: "Alabama", compositeRank: 2, points: 303.79, commits: 26, avgRating: 92.04 };
  const oregon = { name: "Oregon", compositeRank: 3, points: 303.22, commits: 25, avgRating: 92.38 };
  const ball = { name: "Ball State", compositeRank: 113, points: 170.02, commits: 19, avgRating: 84.29 };
  const featured = featuredByComposite([ball, oregon, usc, bama]);
  assert.equal(featured[0], usc);
  assert.equal(featured[0].commits, 34);
  assert.equal(featured[0].avgRating, 92.08);
});

test("hide class avg when n rated (5+4+3) is under 8", () => {
  assert.equal(ratedStarCount(0, 0, 5), 5);
  assert.equal(ratedStarCount(0, 0, 7), 7);
  assert.equal(ratedStarCount(0, 0, 6), 6);
  assert.equal(visibleClassAvg(84.49, 5), null); // ULM 2026
  assert.equal(visibleClassAvg(85.47, 7), null); // Akron 2026
  assert.equal(visibleClassAvg(84.3, 6), null); // NMSU 2026
  assert.equal(visibleClassAvg(83.63, 8), 83.63); // Navy 2026 — boundary shows
  assert.equal(visibleClassAvg(92.08, 34), 92.08);
  assert.equal(visibleClassAvg(83, 12), 83); // Missouri State 2026 after Composite lock
});

test("history board prefers CFBTrack team avg over the commits/starred lift", () => {
  assert.equal(historyClassAvg("colorado", 2025), 89.43);
  assert.equal(historyClassAvg("texas-am", 2023), 91.6);
  assert.equal(historyClassAvg("arkansas", 2023), 88.48);
  assert.equal(historyClassAvg("georgia", 2026), null); // 2026 is not on the JSON board
  assert.equal(
    compositeClassAvg({
      storedAvg: 83.19,
      commits: 16,
      fiveStars: 0,
      fourStars: 8,
      threeStars: 6,
      slug: "colorado",
      classYear: 2025,
    }),
    89.43,
  );
});

test("12 threes cannot average 95.81 — Ball State 2025 sits in the 80s", () => {
  // Screenshot row: rank 119, 16 commits, 118.63 pts, 0/0/12. Stored 71.86
  // lifted to 95.81 via storedAvg * commits / starred. That is not Composite.
  const fromSeed = ratedOnlyClassAvg(71.86, 16, 0, 0, 12);
  const alreadyLifted = ratedOnlyClassAvg(95.81, 16, 0, 0, 12);
  assert.equal(fromSeed, 83);
  assert.equal(alreadyLifted, 83);
  assert.notEqual(fromSeed, 95.81);
});

test("Ball State 2026 Points row keeps the rated Composite mean (~84)", () => {
  // 19 commits / 170.02 pts / 0/0/18. One leftover NA. Not the 16/118.6 row.
  assert.equal(ratedOnlyClassAvg(79.85, 19, 0, 0, 18), 84.29);
  assert.equal(
    compositeClassAvg({
      storedAvg: 79.85,
      commits: 19,
      fiveStars: 0,
      fourStars: 0,
      threeStars: 18,
      slug: "ball-state",
      classYear: 2026,
    }),
    84.29,
  );
});

test("Missouri State 2026 0/0/12 cannot show 90.53 — 3-star class in the 80s", () => {
  // Seed 77.6 * 14 / 12 = 90.53. 247 / CFBTrack for this Points row is ~83.
  const fromSeed = ratedOnlyClassAvg(77.6, 14, 0, 0, 12);
  const alreadyLifted = ratedOnlyClassAvg(90.53, 14, 0, 0, 12);
  assert.equal(fromSeed, 83);
  assert.equal(alreadyLifted, 83);
  assert.ok(fromSeed >= 82 && fromSeed <= 88);
});

test("Avg cell and Avg sort share the same 0–100 number; hidden rows cannot win", () => {
  const colorado25 = {
    name: "Colorado",
    compositeRank: 38,
    points: 209.08,
    avgRating: compositeClassAvg({
      storedAvg: 83.19,
      commits: 16,
      fiveStars: 0,
      fourStars: 8,
      threeStars: 6,
      slug: "colorado",
      classYear: 2025,
    }),
    fiveStars: 0,
    fourStars: 8,
    threeStars: 6,
  };
  const ball26 = {
    name: "Ball State",
    compositeRank: 113,
    points: 170.02,
    avgRating: compositeClassAvg({
      storedAvg: 79.85,
      commits: 19,
      fiveStars: 0,
      fourStars: 0,
      threeStars: 18,
      slug: "ball-state",
      classYear: 2026,
    }),
    fiveStars: 0,
    fourStars: 0,
    threeStars: 18,
  };
  const ulm = {
    name: "ULM",
    compositeRank: 127,
    points: 160.28,
    avgRating: 84.49,
    fiveStars: 0,
    fourStars: 0,
    threeStars: 5,
  };

  assert.equal(colorado25.avgRating, 89.43);
  assert.equal(ball26.avgRating, 84.29);
  assert.equal(avgSortValue(colorado25), colorado25.avgRating);
  assert.equal(avgSortValue(ball26), ball26.avgRating);
  assert.equal(avgSortValue(ulm), null);

  const sorted = [ball26, colorado25, ulm].sort((a, b) => compareAvgSort(a, b, "desc"));
  assert.deepEqual(
    sorted.map((r) => r.name),
    ["Colorado", "Ball State", "ULM"],
  );
});

function roster(partial: {
  slug: string;
  classYear: number;
  compositeRank: number;
  commits: number;
  avgRating: number;
  points: number;
  fiveStars: number;
  fourStars: number;
  threeStars: number;
}) {
  return partial;
}

test("52.9 is Gaussian 0-1; 151.6 is 247 Composite points", () => {
  assert.equal(
    isGaussian01Roster({ avgRating: 41.66, points: 52.92, fiveStars: 0, fourStars: 0, threeStars: 8 }),
    true,
  );
  assert.equal(
    isGaussian01Roster({ avgRating: 77.6, points: 151.56, fiveStars: 0, fourStars: 0, threeStars: 12 }),
    false,
  );
  assert.equal(
    isGaussian01Roster({ avgRating: 71.86, points: 118.63, fiveStars: 0, fourStars: 0, threeStars: 12 }),
    false,
  );
});

test("keep the 247 Points row; drop the 0-1 Gaussian duplicate", () => {
  const ballGhost = roster({
    slug: "ball-state",
    classYear: 2025,
    compositeRank: 119,
    commits: 16,
    avgRating: 71.86,
    points: 118.63,
    fiveStars: 0,
    fourStars: 0,
    threeStars: 12,
  });
  const ball247 = roster({
    slug: "ball-state",
    classYear: 2026,
    compositeRank: 113,
    commits: 19,
    avgRating: 79.85,
    points: 170.02,
    fiveStars: 0,
    fourStars: 0,
    threeStars: 18,
  });
  const msuGhost = roster({
    slug: "missouri-state",
    classYear: 2025,
    compositeRank: 136,
    commits: 18,
    avgRating: 41.66,
    points: 52.92,
    fiveStars: 0,
    fourStars: 0,
    threeStars: 8,
  });
  const msu247 = roster({
    slug: "missouri-state",
    classYear: 2026,
    compositeRank: 131,
    commits: 14,
    avgRating: 77.6,
    points: 151.56,
    fiveStars: 0,
    fourStars: 0,
    threeStars: 12,
  });
  const colorado25 = roster({
    slug: "colorado",
    classYear: 2025,
    compositeRank: 37,
    commits: 16,
    avgRating: 83.19,
    points: 209.08,
    fiveStars: 0,
    fourStars: 8,
    threeStars: 6,
  });
  const colorado26 = roster({
    slug: "colorado",
    classYear: 2026,
    compositeRank: 67,
    commits: 14,
    avgRating: 86.99,
    points: 193.36,
    fiveStars: 0,
    fourStars: 2,
    threeStars: 12,
  });

  const kept = keep247Rosters(
    [ballGhost, ball247, msuGhost, msu247, colorado25, colorado26].map((r) => apply247Roster(r)),
  );
  const byKey = Object.fromEntries(kept.map((r) => [`${r.slug}:${r.classYear}`, r]));

  assert.equal(byKey["ball-state:2025"], undefined);
  assert.equal(byKey["ball-state:2026"]?.commits, 19);
  assert.equal(byKey["ball-state:2026"]?.points, 170.02);
  assert.equal(byKey["ball-state:2026"]?.avgRating, 84.29);

  assert.equal(byKey["missouri-state:2025"], undefined);
  assert.equal(byKey["missouri-state:2026"]?.commits, 14);
  assert.equal(byKey["missouri-state:2026"]?.points, 151.56);
  assert.equal(byKey["missouri-state:2026"]?.avgRating, 83);

  assert.equal(byKey["colorado:2025"]?.avgRating, 89.43);
  assert.equal(byKey["colorado:2025"]?.commits, 15); // JSON 247 commits, not the extra Gaussian kid
  assert.equal(byKey["colorado:2025"]?.points, 209.08);
  assert.equal(byKey["colorado:2026"]?.points, 193.36);

  const avgSorted = kept
    .filter((r) => r.classYear === 2026)
    .sort((a, b) => compareAvgSort(a, b, "desc"));
  assert.equal(
    avgSorted.find((r) => r.slug === "ball-state")?.commits,
    19,
  );
  assert.equal(
    avgSorted.find((r) => r.slug === "missouri-state")?.points,
    151.56,
  );
});
