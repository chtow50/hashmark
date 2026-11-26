/**
 * Head coach before and after: each current FBS head coach's program in the seasons before he arrived next to the same
 * number of seasons under him. Side-by-side changes only: no coach score, no second rating. HX stays the only rating.
 */
export type CoachStatus = "compared" | "too-new" | "no-before";

export type Window = {
  years: [number, number];
  w: number;
  l: number;
  t: number;
  winPct: number | null;
  recRank: number | null;
  recPts: number | null;
  talentRank: number | null;
  netEpa: number | null;
  offEpa: number | null;
  defEpa: number | null;
};

export type SeasonRow = {
  y: number;
  w: number;
  l: number;
  t: number;
  who: "before" | "transition" | "tenure" | "earlier" | "2026";
  win: "before" | "after" | null;
  mine: number;
  rec: [number, number] | null;
  tal: [number, number] | null;
  epa: { off: number; de: number; n: number } | null;
};

export type PriorStop = { school: string; from: number; to: number; w: number; l: number; t: number };

export type CoachRow = {
  slug: string;
  school: string;
  name: string;
  first: number;
  firstSeason: number;
  status: CoachStatus;
  n: number;
  completed: number;
  notes: string[];
  before: Window | null;
  after: Window | null;
  tenure: Window | null;
  seasons: SeasonRow[];
  prior: PriorStop[];
};

export type CoachesFile = {
  built: string;
  cfbdCalls: number;
  minSeasons: number;
  maxMatch: number;
  lastCompleted: number;
  sources: { label: string; url: string }[];
  coaches: CoachRow[];
};

export type CoachCol = "win" | "rec" | "tal" | "epa" | "tenure" | "name" | "school";
export type CoachDir = "best" | "worst";
export type CoachView = "compared" | "all";

export const COLS: CoachCol[] = ["win", "rec", "tal", "epa", "tenure", "name", "school"];
export const COL_LABEL: Record<CoachCol, string> = {
  win: "Win %",
  rec: "Recruiting rank",
  tal: "Talent rank",
  epa: "Net adj EPA/play",
  tenure: "Seasons",
  name: "Coach",
  school: "School",
};

export const parseCol = (v: unknown): CoachCol => (COLS.includes(v as CoachCol) ? (v as CoachCol) : "win");
export const parseDir = (v: unknown): CoachDir => (v === "worst" ? "worst" : "best");
export const parseView = (v: unknown): CoachView => (v === "all" ? "all" : "compared");

/** Defaults dropped so shared URLs stay short. */
export function coachSearch(view: CoachView, sort: CoachCol, dir: CoachDir, team?: string) {
  const s: { view?: CoachView; sort?: CoachCol; dir?: CoachDir; team?: string } = {};
  if (view !== "compared") s.view = view;
  if (sort !== "win") s.sort = sort;
  if (dir !== "best") s.dir = dir;
  if (team) s.team = team;
  return s;
}

export type Deltas = {
  /** Win percentage points, after minus before (positive = better). */
  win: number | null;
  /** Average class rank, before minus after (positive = recruiting rank got better, i.e. a smaller number). */
  rec: number | null;
  /** Average 247 talent rank, before minus after (positive = better). */
  tal: number | null;
  /** Net adjusted EPA/play (offense minus defense allowed), after minus before (positive = better). */
  epa: number | null;
};

const diff = (a: number | null | undefined, b: number | null | undefined) => (a == null || b == null ? null : a - b);

export function deltas(c: CoachRow): Deltas {
  if (c.status !== "compared" || !c.before || !c.after) return { win: null, rec: null, tal: null, epa: null };
  const win = diff(c.after.winPct, c.before.winPct);
  return {
    win: win == null ? null : win * 100,
    rec: diff(c.before.recRank, c.after.recRank),
    tal: diff(c.before.talentRank, c.after.talentRank),
    epa: diff(c.after.netEpa, c.before.netEpa),
  };
}

export function sortRows(rows: CoachRow[], sort: CoachCol, dir: CoachDir): CoachRow[] {
  const sign = dir === "best" ? -1 : 1;
  const val = (c: CoachRow): number | string | null => {
    if (sort === "name") return c.name.split(" ").slice(-1)[0].toLowerCase();
    if (sort === "school") return c.school.toLowerCase();
    if (sort === "tenure") return c.completed;
    return deltas(c)[sort];
  };
  return [...rows].sort((a, b) => {
    const va = val(a);
    const vb = val(b);
    if (va == null && vb == null) return a.school.localeCompare(b.school);
    if (va == null) return 1;
    if (vb == null) return -1;
    if (typeof va === "string" || typeof vb === "string") {
      const c = String(va).localeCompare(String(vb));
      // text columns: "best" = A to Z
      return (dir === "best" ? 1 : -1) * c || a.school.localeCompare(b.school);
    }
    return sign * (va - vb) || a.school.localeCompare(b.school);
  });
}

export function viewRows(file: CoachesFile, view: CoachView, sort: CoachCol, dir: CoachDir): CoachRow[] {
  const rows = view === "compared" ? file.coaches.filter((c) => c.status === "compared") : file.coaches;
  return sortRows(rows, sort, dir);
}

export const recordText = (w: { w: number; l: number; t: number }) => `${w.w}-${w.l}${w.t ? `-${w.t}` : ""}`;
export const pctText = (v: number | null | undefined) => (v == null ? "—" : `${(v * 100).toFixed(1)}%`);
export const signed = (v: number | null, d = 1) => (v == null ? "—" : `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v).toFixed(d)}`);
export const yearsText = (y: [number, number]) => (y[0] === y[1] ? `${y[0]}` : `${y[0]}–${y[1]}`);
export const tone = (v: number | null, eps = 0.05) => (v == null || Math.abs(v) < eps ? "text-muted" : v > 0 ? "text-emerald-400" : "text-rose-400");
