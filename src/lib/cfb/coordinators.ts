/**
 * Best Coordinators (client-safe; no data import). Track record of the units current Power 4
 * coordinators ran, built only from seasons with a verified sole-coordinator credit. Not a coach
 * rating and no composite score: every column is a real unit stat; HX stays the only rating.
 *
 * A season is credited only when (a) the school's official season staff page lists him as the
 * only coordinator on that side and (b) a cited source shows the head coach did not call that
 * side (the coordinator's bio says he called plays, or the head coach's bio has no coordinator
 * role on that side) and (c) no head-coach or coordinator change happened that season.
 * The offline audit (data/coordinators_2026.json) carries the source URL for every credit.
 */

export type Unit = "off" | "def";
export const UNITS: readonly Unit[] = ["off", "def"];
export const UNIT_LABEL: Record<Unit, string> = { off: "Offensive coordinators", def: "Defensive coordinators" };
export const UNIT_SHORT: Record<Unit, string> = { off: "OC", def: "DC" };

export type WindowKey = "10y" | "5y";
export const WINDOWS: Record<WindowKey, { from: number; to: number; min: number; label: string }> = {
  "10y": { from: 2016, to: 2025, min: 5, label: "10 years (2016–25)" },
  "5y": { from: 2021, to: 2025, min: 3, label: "5 years (2021–25)" },
};
export const DEFAULT_WINDOW: WindowKey = "10y";
export const parseWindow = (v: unknown): WindowKey => (v === "5y" ? "5y" : DEFAULT_WINDOW);
export const parseUnit = (v: unknown): Unit => (v === "def" ? "def" : "off");

export type SeasonStats = { epa: number | null; sr: number | null; xpl: number | null; ppd: number | null; rank: number | null; nFbs: number; games?: number | null };
export type HistoryRow = {
  season: number;
  team: string;
  school: string;
  status: "verified" | "excluded";
  staffUrl: string | null;
  headCoach: string;
  bioLine: string;
  stats: SeasonStats | null;
  hcUrl?: string;
  hcNote?: string;
  reasons?: string[];
};
export type CoachRecord = { name: string; unit: Unit; team: string; title: string; bioUrl: string; history: HistoryRow[] };
export type PopulationEntry = { name: string; unit: Unit; team: string; title: string };
export type CoordinatorsFile = { built: string; source: string; population: PopulationEntry[]; coaches: CoachRecord[] };

/** Columns, all real unit stats. `hiOff` = higher is better for an offense; defense flips EPA/SR/XPL/PPD. */
export const COORD_COLS = ["epa", "sr", "ppd", "xpl", "rank", "n"] as const;
export type CoordCol = (typeof COORD_COLS)[number];
export const DEFAULT_COORD_SORT: CoordCol = "epa";
export const parseCoordSort = (v: unknown): CoordCol => (COORD_COLS.includes(v as CoordCol) ? (v as CoordCol) : DEFAULT_COORD_SORT);
export type CoordDir = "best" | "worst";
export const parseCoordDir = (v: unknown): CoordDir => (v === "worst" ? "worst" : "best");

export const COL_META: Record<CoordCol, { s: string; l: string; def: string; digits: number }> = {
  epa: { s: "Adj EPA/play", l: "Opponent-adjusted EPA per play", def: "HASHMARK ridge model, same as /stats. Average of the unit's season values; each season counts once.", digits: 3 },
  sr: { s: "Success %", l: "Opponent-adjusted success rate", def: "Share of plays that gain 50% of needed yards on 1st down, 70% on 2nd, 100% on 3rd/4th.", digits: 1 },
  ppd: { s: "Pts/drive", l: "Points per drive", def: "Offense: points scored per drive. Defense: points allowed per drive. FBS-vs-FBS games; not opponent-adjusted.", digits: 2 },
  xpl: { s: "Explosiveness", l: "Opponent-adjusted explosiveness", def: "Average EPA on successful plays: how big the good plays are.", digits: 3 },
  rank: { s: "Avg FBS rank", l: "Average FBS rank (adj EPA/play)", def: "The unit's FBS rank on adjusted EPA/play each credited season, averaged.", digits: 1 },
  n: { s: "Seasons", l: "Credited seasons in the window", def: "Seasons with a verified sole-coordinator credit inside the window.", digits: 0 },
};

/** True when a higher value is better for this unit and column. */
export function higherIsBetter(unit: Unit, col: CoordCol): boolean {
  if (col === "n") return true;
  if (col === "rank") return false;
  return unit === "off";
}

export const inWindow = (season: number, w: WindowKey) => season >= WINDOWS[w].from && season <= WINDOWS[w].to;

/** Credited seasons in a window (verified only, with unit numbers). */
export function creditedSeasons(c: CoachRecord, w: WindowKey): HistoryRow[] {
  return c.history.filter((h) => h.status === "verified" && h.stats != null && inWindow(h.season, w));
}

/** The qualification rule: at least `min` credited seasons inside the window. */
export function qualifies(c: CoachRecord, w: WindowKey): boolean {
  return creditedSeasons(c, w).length >= WINDOWS[w].min;
}

export type WindowSummary = Record<CoordCol, number | null>;
const mean = (xs: (number | null | undefined)[]): number | null => {
  const v = xs.filter((x): x is number => typeof x === "number" && Number.isFinite(x));
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
};

/** Unweighted mean over credited seasons (each season counts once). */
export function summarize(c: CoachRecord, w: WindowKey): WindowSummary {
  const s = creditedSeasons(c, w).map((h) => h.stats!);
  return { epa: mean(s.map((x) => x.epa)), sr: mean(s.map((x) => x.sr)), ppd: mean(s.map((x) => x.ppd)), xpl: mean(s.map((x) => x.xpl)), rank: mean(s.map((x) => x.rank)), n: s.length };
}

export type BoardRow = { coach: CoachRecord; sum: WindowSummary; rank: number };

/** Compare on a column, best first, with adjusted EPA then name as tie-breaks. */
function cmp(unit: Unit, col: CoordCol) {
  return (a: BoardRow, b: BoardRow): number => {
    const key = (r: BoardRow, k: CoordCol) => r.sum[k];
    for (const k of [col, "epa" as CoordCol]) {
      const x = key(a, k), y = key(b, k);
      if (x == null && y == null) continue;
      if (x == null) return 1;
      if (y == null) return -1;
      if (x !== y) return higherIsBetter(unit, k) ? y - x : x - y;
    }
    return a.coach.name.localeCompare(b.coach.name);
  };
}

/**
 * Qualified coordinators for one unit and window. `rank` is the standing on adjusted EPA/play
 * (offense: highest first; defense: lowest allowed first) and does not change with the sort.
 */
export function buildBoard(coaches: CoachRecord[], unit: Unit, w: WindowKey, sort: CoordCol = "epa", dir: CoordDir = "best"): BoardRow[] {
  const rows: BoardRow[] = coaches.filter((c) => c.unit === unit && qualifies(c, w)).map((coach) => ({ coach, sum: summarize(coach, w), rank: 0 }));
  [...rows].sort(cmp(unit, "epa")).forEach((r, i) => (r.rank = i + 1));
  const sorted = [...rows].sort(cmp(unit, sort));
  return dir === "worst" ? sorted.reverse() : sorted;
}

/** "N of M current P4 coordinators qualify" counts per unit and window. */
export function qualifyCounts(file: Pick<CoordinatorsFile, "population" | "coaches">, unit: Unit, w: WindowKey) {
  const total = file.population.filter((p) => p.unit === unit).length;
  const ranked = file.coaches.filter((c) => c.unit === unit && qualifies(c, w)).length;
  return { ranked, total };
}

/** Current coordinators in the population who do not qualify in this window (name + team only). */
export function unrankedFor(file: Pick<CoordinatorsFile, "population" | "coaches">, unit: Unit, w: WindowKey): PopulationEntry[] {
  const q = new Set(file.coaches.filter((c) => c.unit === unit && qualifies(c, w)).map((c) => c.name));
  return file.population.filter((p) => p.unit === unit && !q.has(p.name)).sort((a, b) => a.team.localeCompare(b.team));
}

export function fmtCol(col: CoordCol, v: number | null | undefined, signed = col === "epa"): string {
  if (v == null || !Number.isFinite(v)) return "—";
  const d = COL_META[col].digits;
  const s = v.toFixed(d);
  return signed && v > 0 ? `+${s}` : s.replace("-", "−");
}

export const coordSearch = (unit: Unit, w: WindowKey, sort: CoordCol, dir: CoordDir) => ({
  unit: unit === "off" ? undefined : unit,
  window: w === DEFAULT_WINDOW ? undefined : w,
  sort: sort === DEFAULT_COORD_SORT ? undefined : sort,
  dir: dir === "best" ? undefined : dir,
});

/** 2026 to date for the coordinator's current unit (from the /stats board; context only, not ranked). */
export type Season2026 = { epa: number | null; sr: number | null; xpl: number | null; rank: number | null; n: number; games: number | null };
