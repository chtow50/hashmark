/**
 * Talent vs HX vs results — side-by-side real numbers, never a second rating.
 *
 *  - Talent: 247Sports Team Talent Composite (whole roster), data/talent_247_2026.json
 *    (CFBD /talent mirror). Ranked among HASHMARK's FBS teams.
 *  - HX rank: the live board (rankings week 0 row, refit weekly).
 *  - Record: stamped FINALs (season W-L on the board).
 *  - Gap = talent rank − HX rank. Positive = HX has the team higher than its roster talent
 *    ("playing above its talent"); negative = below. Pure arithmetic on the two ranks.
 */
import talentRaw from "../../../data/talent_247_2026.json" with { type: "json" };

type TalentRow = { slug: string; talent: number; rank: number };
type TalentFile = {
  source: string;
  via: string;
  url: string;
  note: string;
  years: Record<string, TalentRow[]>;
};
const talentFile = talentRaw as unknown as TalentFile;

export const TALENT_247_SOURCE = {
  label: talentFile.source,
  via: talentFile.via,
  url: talentFile.url,
} as const;

const t26 = new Map(talentFile.years["2026"].map((r) => [r.slug, r]));
const t25 = new Map((talentFile.years["2025"] ?? []).map((r) => [r.slug, r]));

export function talent247(
  slug: string,
): { talent: number; rank: number; prevRank: number | null } | null {
  const r = t26.get(slug);
  if (!r) return null;
  return { talent: r.talent, rank: r.rank, prevRank: t25.get(slug)?.rank ?? null };
}

export type TalentResultsInput = {
  slug: string;
  name: string;
  shortName: string;
  conference: string;
  colorPrimary: string;
  hxRank: number;
  seasonWins: number;
  seasonLosses: number;
};

export type TalentResultsRow = TalentResultsInput & {
  talent: number;
  talentRank: number;
  /** 2025 247 talent rank (null if the team was not in the 2025 list). */
  prevTalentRank: number | null;
  winPct: number | null;
  /** talentRank − hxRank (positive = HX above talent). */
  gap: number;
};

export function buildTalentResults(teams: TalentResultsInput[]): TalentResultsRow[] {
  const out: TalentResultsRow[] = [];
  for (const t of teams) {
    const tal = talent247(t.slug);
    if (!tal || !Number.isFinite(t.hxRank) || t.hxRank <= 0) continue;
    const gp = t.seasonWins + t.seasonLosses;
    out.push({
      ...t,
      talent: tal.talent,
      talentRank: tal.rank,
      prevTalentRank: tal.prevRank,
      winPct: gp > 0 ? t.seasonWins / gp : null,
      gap: tal.rank - t.hxRank,
    });
  }
  return out.sort((a, b) => a.talentRank - b.talentRank || a.hxRank - b.hxRank);
}

/** Average ranks (ties share the mean rank), 1 = largest when `desc`. */
function avgRanks(values: number[], desc: boolean): number[] {
  const idx = values
    .map((v, i) => [v, i] as const)
    .sort((a, b) => (desc ? b[0] - a[0] : a[0] - b[0]));
  const ranks = new Array<number>(values.length);
  let i = 0;
  while (i < idx.length) {
    let j = i;
    while (j + 1 < idx.length && idx[j + 1][0] === idx[i][0]) j++;
    const r = (i + j) / 2 + 1;
    for (let k = i; k <= j; k++) ranks[idx[k][1]] = r;
    i = j + 1;
  }
  return ranks;
}

function pearson(x: number[], y: number[]): number {
  const n = x.length;
  const mx = x.reduce((s, v) => s + v, 0) / n;
  const my = y.reduce((s, v) => s + v, 0) / n;
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  for (let i = 0; i < n; i++) {
    sxy += (x[i] - mx) * (y[i] - my);
    sxx += (x[i] - mx) ** 2;
    syy += (y[i] - my) ** 2;
  }
  return sxx === 0 || syy === 0 ? 0 : sxy / Math.sqrt(sxx * syy);
}

/** Spearman rank correlation (tie-corrected via average ranks). Higher x and higher y = positive. */
export function spearman(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length < 3) return Number.NaN;
  return pearson(avgRanks(x, true), avgRanks(y, true));
}

export type TalentResultsSummary = {
  n: number;
  /** Spearman between 247 talent points and HX (via HX rank). */
  rhoHx: number;
  /** Spearman between 247 talent points and win %. */
  rhoWin: number;
  above: TalentResultsRow[];
  below: TalentResultsRow[];
};

export function summarizeTalentResults(rows: TalentResultsRow[], k = 8): TalentResultsSummary {
  const withWin = rows.filter((r) => r.winPct != null);
  const byGap = [...rows].sort((a, b) => b.gap - a.gap || a.hxRank - b.hxRank);
  return {
    n: rows.length,
    rhoHx: spearman(
      rows.map((r) => r.talent),
      rows.map((r) => -r.hxRank),
    ),
    rhoWin: spearman(
      withWin.map((r) => r.talent),
      withWin.map((r) => r.winPct as number),
    ),
    above: byGap.slice(0, k).filter((r) => r.gap > 0),
    below: [...byGap]
      .reverse()
      .slice(0, k)
      .filter((r) => r.gap < 0),
  };
}
