/**
 * QB stat leaderboard (client-safe; no data import). Qualified FBS QBs from the /stats QB board,
 * sorted by one real stat (default: total EPA). Every other column shows the stat and its FBS rank among
 * the same qualified QBs. Team record and HX rank are context only. Not a rating, not a Heisman prediction.
 */
import { P4_CONFS, G5_CONFS } from "./qb-desk.ts";
import { isQualified, metricOf, sortRows, standing, type Metric, type StatRow } from "./stats.ts";

/** Columns shown for every QB, each with its FBS rank. Any column can be the sort. */
export const LEADER_COLS = ["tepa", "epa", "eff", "ypa", "cmp", "yds", "td", "int", "ruy"] as const;
export type LeaderCol = (typeof LEADER_COLS)[number];
export const LEADER_SORTS = LEADER_COLS;
export type LeaderSort = LeaderCol;
export const DEFAULT_LEADER_SORT: LeaderSort = "tepa";
export const parseLeaderSort = (v: unknown): LeaderSort => (LEADER_SORTS.includes(v as LeaderSort) ? (v as LeaderSort) : DEFAULT_LEADER_SORT);

export type LeaderDir = "best" | "worst";
export const DEFAULT_LEADER_DIR: LeaderDir = "best";
export const parseLeaderDir = (v: unknown): LeaderDir => (v === "worst" ? "worst" : DEFAULT_LEADER_DIR);

/**
 * View scopes. Slugs are written to the URL (?scope=sec). P4 / G5 membership comes from the
 * same sets the QB Desk uses; conference names match the teams table.
 */
export const LEADER_SCOPES = [
  "fbs",
  "p4",
  "g5",
  "sec",
  "big-ten",
  "acc",
  "big-12",
  "independent",
  "american",
  "sun-belt",
  "mac",
  "cusa",
  "mountain-west",
  "pac-12",
] as const;
export type LeaderScope = (typeof LEADER_SCOPES)[number];
export const DEFAULT_LEADER_SCOPE: LeaderScope = "fbs";

/** Broad pool pills (All FBS / Power 4 / Group of 5). */
export const LEADER_POOLS = ["fbs", "p4", "g5"] as const;
/** Per-conference scopes, P4 then independents then G5, matching /stats. */
export const LEADER_CONFS = [
  "sec",
  "big-ten",
  "acc",
  "big-12",
  "independent",
  "american",
  "sun-belt",
  "mac",
  "cusa",
  "mountain-west",
  "pac-12",
] as const;

export const SCOPE_LABEL: Record<LeaderScope, string> = {
  fbs: "All FBS",
  p4: "Power 4",
  g5: "Group of 5",
  sec: "SEC",
  "big-ten": "Big Ten",
  acc: "ACC",
  "big-12": "Big 12",
  independent: "Independents",
  american: "American",
  "sun-belt": "Sun Belt",
  mac: "MAC",
  cusa: "CUSA",
  "mountain-west": "Mountain West",
  "pac-12": "Pac-12",
};

/** Teams-table conference name for a per-conference scope; null for All / P4 / G5. */
const SCOPE_CONF: Record<LeaderScope, string | null> = {
  fbs: null,
  p4: null,
  g5: null,
  sec: "SEC",
  "big-ten": "Big Ten",
  acc: "ACC",
  "big-12": "Big 12",
  independent: "Independent",
  american: "American",
  "sun-belt": "Sun Belt",
  mac: "MAC",
  cusa: "CUSA",
  "mountain-west": "Mountain West",
  "pac-12": "Pac-12",
};

const SCOPE_ALIASES: Record<string, LeaderScope> = {
  fbs: "fbs",
  all: "fbs",
  "all-fbs": "fbs",
  p4: "p4",
  "power-4": "p4",
  "power 4": "p4",
  g5: "g5",
  "group-of-5": "g5",
  "group-of-five": "g5",
  "group of 5": "g5",
  "group of five": "g5",
  sec: "sec",
  "big-ten": "big-ten",
  "big ten": "big-ten",
  acc: "acc",
  "big-12": "big-12",
  "big 12": "big-12",
  independent: "independent",
  independents: "independent",
  american: "american",
  "sun-belt": "sun-belt",
  "sun belt": "sun-belt",
  mac: "mac",
  cusa: "cusa",
  "mountain-west": "mountain-west",
  "mountain west": "mountain-west",
  "pac-12": "pac-12",
  "pac 12": "pac-12",
};

export const parseLeaderScope = (v: unknown): LeaderScope => {
  if (typeof v !== "string") return DEFAULT_LEADER_SCOPE;
  return SCOPE_ALIASES[v.trim().toLowerCase()] ?? DEFAULT_LEADER_SCOPE;
};

export const isConfScope = (scope: LeaderScope): scope is (typeof LEADER_CONFS)[number] =>
  (LEADER_CONFS as readonly string[]).includes(scope);

export function inLeaderScope(conference: string, scope: LeaderScope): boolean {
  if (scope === "fbs") return true;
  if (scope === "p4") return P4_CONFS.has(conference);
  if (scope === "g5") return G5_CONFS.has(conference);
  return conference === SCOPE_CONF[scope];
}

export const leaderMetric = (k: string): Metric => metricOf("qb", k)!;

/** Search object with defaults dropped, so the bare /stats/qb-leaders URL stays canonical. */
export function leadersSearch(scope: LeaderScope, sort: LeaderSort, dir: LeaderDir): { scope?: LeaderScope; sort?: LeaderSort; dir?: LeaderDir } {
  const s: { scope?: LeaderScope; sort?: LeaderSort; dir?: LeaderDir } = {};
  if (scope !== DEFAULT_LEADER_SCOPE) s.scope = scope;
  if (sort !== DEFAULT_LEADER_SORT) s.sort = sort;
  if (dir !== DEFAULT_LEADER_DIR) s.dir = dir;
  return s;
}

export type LeaderTeam = { slug: string; w: number; l: number; hxRank: number | null };
export type LeaderRow = {
  /** Rank by the sort stat in the current view (ties share a rank). Always best-to-worst, even if the list is shown worst-first. */
  rank: number;
  /** Same stat's rank among all qualified FBS QBs. Equal to `rank` when the scope is All FBS. */
  fbsRank: number | null;
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
 * Builds the full qualified FBS board. Ranks on every column (and `rank` / `fbsRank`) are FBS ranks.
 * Use `viewLeaders` to filter, re-sort, and compute the rank within a narrower scope.
 */
export function buildLeaders(args: {
  rows: StatRow[];
  sort?: LeaderSort;
  keyOf: (r: StatRow) => string;
  teams: LeaderTeam[];
}): { n: number; rows: LeaderRow[] } {
  const sort = args.sort ?? DEFAULT_LEADER_SORT;
  const { rows, keyOf, teams } = args;
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
    const fbsRank = standing(sm, r.v[sort] ?? null, sortVals)?.rank ?? null;
    return {
      rank: fbsRank ?? 0,
      fbsRank,
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

/**
 * Filters a full FBS board to `scope`, ranks by `sort` within that pool (best-to-worst, even when
 * `dir` is worst-first), and orders the list by `dir`. Column ranks stay the FBS ranks from `buildLeaders`.
 */
export function viewLeaders(
  rows: LeaderRow[],
  opts: { scope?: LeaderScope; sort?: LeaderSort; dir?: LeaderDir } = {},
): { n: number; fbsN: number; rows: LeaderRow[] } {
  const scope = opts.scope ?? DEFAULT_LEADER_SCOPE;
  const sort = opts.sort ?? DEFAULT_LEADER_SORT;
  const dir = opts.dir ?? DEFAULT_LEADER_DIR;
  const fbsN = rows.length;
  const pool = rows.filter((r) => inLeaderScope(r.conference, scope));
  const sm = leaderMetric(sort);
  const sortVals = pool.map((r) => r.stats[sort].v);
  const ranked = pool.map((r) => {
    const v = r.stats[sort].v;
    const rank = standing(sm, v, sortVals)?.rank ?? 0;
    return { ...r, rank, fbsRank: r.stats[sort].rank };
  });
  return { n: pool.length, fbsN, rows: sortLeaderRows(ranked, sort, dir) };
}

function sortLeaderRows(rows: LeaderRow[], sort: LeaderSort, dir: LeaderDir): LeaderRow[] {
  const mt = leaderMetric(sort);
  const sign = (mt.hi ? -1 : 1) * (dir === "best" ? 1 : -1);
  return [...rows].sort((a, b) => {
    const x = a.stats[sort].v,
      y = b.stats[sort].v;
    if (x == null && y == null) return a.name.localeCompare(b.name);
    if (x == null) return 1;
    if (y == null) return -1;
    return sign * (x - y) || a.name.localeCompare(b.name);
  });
}
