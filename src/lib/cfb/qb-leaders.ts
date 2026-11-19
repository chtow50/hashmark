/**
 * QB stat leaderboard (client-safe; no data import). Qualified FBS QBs from the /stats QB board,
 * sorted by one real stat (default: total EPA). Every other column shows the stat and its FBS rank among
 * the same qualified QBs. Team record and HX rank are context only. Not a rating, not a Heisman prediction.
 */
import { isQualified, metricOf, sortRows, standing, type Metric, type StatRow } from "./stats.ts";

/** Stats a leaderboard can sort by (all real season stats already on /stats). */
export const LEADER_SORTS = ["tepa", "epa", "eff", "yds", "td"] as const;
export type LeaderSort = (typeof LEADER_SORTS)[number];
export const DEFAULT_LEADER_SORT: LeaderSort = "tepa";
export const parseLeaderSort = (v: unknown): LeaderSort => (LEADER_SORTS.includes(v as LeaderSort) ? (v as LeaderSort) : DEFAULT_LEADER_SORT);

/** Columns shown for every QB, each with its FBS rank. */
export const LEADER_COLS = ["tepa", "epa", "eff", "ypa", "cmp", "yds", "td", "int", "ruy"] as const;
export type LeaderCol = (typeof LEADER_COLS)[number];

export const leaderMetric = (k: string): Metric => metricOf("qb", k)!;

export type LeaderTeam = { slug: string; w: number; l: number; hxRank: number | null };
export type LeaderRow = {
  /** Rank by the sort stat (ties share a rank). */
  rank: number;
  key: string;
  name: string;
  slug: string;
  team: string;
  conference: string;
  color: string;
  g: number;
  att: number;
  record: string | null;
  hxRank: number | null;
  stats: Record<LeaderCol, { v: number | null; rank: number | null }>;
};

/**
 * Builds the board: qualified QBs only, sorted by `sort` (best first; QBs with no value for it go last, unranked).
 * Ranks for every column are FBS ranks inside the qualified pool. Pure.
 */
export function buildLeaders(args: {
  rows: StatRow[];
  sort: LeaderSort;
  keyOf: (r: StatRow) => string;
  teams: LeaderTeam[];
}): { n: number; rows: LeaderRow[] } {
  const { rows, sort, keyOf, teams } = args;
  const pool = rows.filter((r) => isQualified("qb", r));
  const bySlug = new Map(teams.map((t) => [t.slug, t]));
  const colVals = new Map(LEADER_COLS.map((k) => [k, pool.map((r) => r.v[k] ?? null)]));
  const sm = leaderMetric(sort);
  const sortVals = pool.map((r) => r.v[sort] ?? null);
  const out = sortRows(pool, sm).map((r): LeaderRow => {
    const t = bySlug.get(r.slug);
    const stats = Object.fromEntries(
      LEADER_COLS.map((k) => {
        const v = r.v[k] ?? null;
        return [k, { v, rank: standing(leaderMetric(k), v, colVals.get(k)!)?.rank ?? null }];
      }),
    ) as LeaderRow["stats"];
    return {
      rank: standing(sm, r.v[sort] ?? null, sortVals)?.rank ?? 0,
      key: keyOf(r),
      name: r.name,
      slug: r.slug,
      team: r.team,
      conference: r.conference,
      color: r.color,
      g: r.g,
      att: r.vol ?? 0,
      record: t ? `${t.w}–${t.l}` : null,
      hxRank: t?.hxRank ?? null,
      stats,
    };
  });
  return { n: pool.length, rows: out };
}
