/**
 * Best Coordinators (client-safe; no data import). A production board: every FBS offense and defense
 * ranked by what the unit produced, with the coordinator the school lists for it. Built as a hiring
 * gauge, not a coach rating: every column is a real unit stat and HX stays the only team rating.
 *
 * Two views:
 *  - "2026": every FBS unit this season, ranked on opponent-adjusted EPA/play (same ridge model as
 *    /stats). The coordinator comes from the school's official 2026 staff page. Co-coordinators,
 *    head coaches who hold the coordinator title or are documented play-callers, interim setups, and
 *    units with no listed coordinator stay on the board with a label instead of being dropped.
 *  - "3y": current coordinators averaged over 2024–26, crediting only seasons where that season's
 *    official staff page lists him as the only coordinator on that side at that school. Each credited
 *    season counts once (equal weight); 2+ credited seasons to be ranked.
 */

export type Unit = "off" | "def";
export const UNITS: readonly Unit[] = ["off", "def"];
export const UNIT_LABEL: Record<Unit, string> = { off: "Offenses · OCs", def: "Defenses · DCs" };
export const UNIT_SHORT: Record<Unit, string> = { off: "OC", def: "DC" };
export const UNIT_SIDE: Record<Unit, string> = { off: "offense", def: "defense" };

export type ViewKey = "2026" | "3y";
export const VIEWS: Record<ViewKey, { label: string; from: number; to: number; min: number }> = {
  "2026": { label: "2026 season", from: 2026, to: 2026, min: 1 },
  "3y": { label: "3-year average (2024–26)", from: 2024, to: 2026, min: 2 },
};
export const DEFAULT_VIEW: ViewKey = "2026";
export const parseView = (v: unknown): ViewKey => (v === "3y" ? "3y" : DEFAULT_VIEW);
export const parseUnit = (v: unknown): Unit => (v === "def" ? "def" : "off");

/** How the school lists who runs the unit in 2026. */
export type CoordLabel = "sole" | "with-co" | "co" | "hc-title" | "hc-calls" | "interim" | "unverified";
export const LABEL_TEXT: Record<CoordLabel, string> = {
  sole: "",
  "with-co": "Plus co-coordinator",
  co: "Co-coordinators",
  "hc-title": "Head coach holds the title",
  "hc-calls": "Head coach calls plays",
  interim: "Interim",
  unverified: "Coordinator unverified",
};

export type Person = { name: string; title: string };
/** One FBS unit in 2026: who the official staff page lists, and how. Stats are attached on the server. */
export type Unit2026 = {
  team: string;
  unit: Unit;
  label: CoordLabel;
  coaches: Person[];
  staffUrl: string | null;
  note?: string;
  hcSource?: { url: string; quote: string };
  /** First season of his current run in this role here, when official season pages show it (2024 = "2024 or earlier"). */
  since?: number | null;
};

export type SeasonStats = { epa: number | null; sr: number | null; xpl: number | null; ppd?: number | null; ppg?: number | null; rank: number | null; nFbs: number; games?: number | null };
export type HistoryRow = {
  season: number;
  team: string;
  status: "credited" | "excluded";
  title?: string;
  staffUrl: string | null;
  reasons?: string[];
  /** v1 also verified the play-caller for this season (bio or head-coach source). */
  playcall?: string | null;
  stats: SeasonStats | null;
};
export type CoachRecord = { name: string; unit: Unit; team: string; title: string; history: HistoryRow[] };
export type CoordinatorsFile = {
  built: string;
  source: string;
  units2026: Unit2026[];
  /** 2025 unit numbers per team (same model), for "vs. 2025". */
  prior2025: Record<string, Partial<Record<Unit, SeasonStats>>>;
  coaches: CoachRecord[];
};

/** 2026 board columns. `delta` = change in adj EPA/play vs the same unit in 2025. `talent` = 247 roster talent rank. */
export const COLS_2026 = ["epa", "sr", "xpl", "ppg", "delta", "talent"] as const;
export const COLS_3Y = ["epa", "sr", "xpl", "rank", "n"] as const;
export type CoordCol = (typeof COLS_2026)[number] | (typeof COLS_3Y)[number];
const ALL_COLS: readonly CoordCol[] = ["epa", "sr", "xpl", "ppg", "delta", "talent", "rank", "n"];
export const colsFor = (v: ViewKey): readonly CoordCol[] => (v === "2026" ? COLS_2026 : COLS_3Y);
export const DEFAULT_COORD_SORT: CoordCol = "epa";
export const parseCoordSort = (v: unknown, view: ViewKey = DEFAULT_VIEW): CoordCol =>
  ALL_COLS.includes(v as CoordCol) && colsFor(view).includes(v as CoordCol) ? (v as CoordCol) : DEFAULT_COORD_SORT;
export type CoordDir = "best" | "worst";
export const parseCoordDir = (v: unknown): CoordDir => (v === "worst" ? "worst" : "best");

export const COL_META: Record<CoordCol, { s: string; l: string; def: string; digits: number }> = {
  epa: { s: "Adj EPA/play", l: "Opponent-adjusted EPA per play", def: "HASHMARK ridge model, same as /stats, FBS-vs-FBS games. The ranking stat.", digits: 3 },
  sr: { s: "Success %", l: "Opponent-adjusted success rate", def: "Share of plays that gain 50% of needed yards on 1st down, 70% on 2nd, 100% on 3rd/4th.", digits: 1 },
  xpl: { s: "Explosiveness", l: "Opponent-adjusted explosiveness", def: "Average EPA on successful plays: how big the good plays are.", digits: 3 },
  ppg: { s: "Pts/game", l: "Points per game", def: "Offense: points scored per game. Defense: points allowed per game. All games, not opponent-adjusted.", digits: 1 },
  delta: { s: "vs 2025", l: "Change in adj EPA/play vs the same unit in 2025", def: "This season minus last season for this school's unit (positive = better for offense; for defense, negative = fewer EPA allowed = better). For a first-year coordinator it is the change from the unit he inherited.", digits: 3 },
  talent: { s: "Talent rank", l: "247 roster talent rank (2026)", def: "247Sports Team Talent Composite rank among FBS teams: what the unit had to work with. Context only.", digits: 0 },
  rank: { s: "Avg FBS rank", l: "Average FBS rank (adj EPA/play)", def: "The unit's FBS rank on adjusted EPA/play each credited season, averaged.", digits: 1 },
  n: { s: "Seasons", l: "Credited seasons, 2024–26", def: "Seasons where that year's official staff page lists him as the only coordinator on that side.", digits: 0 },
};

/** True when a higher value is better for this unit and column. */
export function higherIsBetter(unit: Unit, col: CoordCol): boolean {
  if (col === "n") return true;
  if (col === "rank" || col === "talent") return false;
  return unit === "off";
}

const mean = (xs: (number | null | undefined)[]): number | null => {
  const v = xs.filter((x): x is number => typeof x === "number" && Number.isFinite(x));
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
};
export type Values = Partial<Record<CoordCol, number | null>>;

/** Compare rows on a column, best first; adjusted EPA then a label as tie-breaks. Missing values sort last. */
function cmp<T extends { v: Values; key: string }>(unit: Unit, col: CoordCol) {
  return (a: T, b: T): number => {
    for (const k of [col, "epa" as CoordCol]) {
      const x = a.v[k], y = b.v[k];
      if (x == null && y == null) continue;
      if (x == null) return 1;
      if (y == null) return -1;
      if (x !== y) return higherIsBetter(unit, k) ? y - x : x - y;
    }
    return a.key.localeCompare(b.key);
  };
}

/** `rank` is the standing on adjusted EPA/play and does not change with the sort; `dir` flips the order. */
function rankAndSort<T extends { v: Values; key: string; rank: number }>(rows: T[], unit: Unit, sort: CoordCol, dir: CoordDir): T[] {
  [...rows].sort(cmp<T>(unit, "epa")).forEach((r, i) => (r.rank = r.v.epa == null ? 0 : i + 1));
  const sorted = [...rows].sort(cmp<T>(unit, sort));
  return dir === "worst" ? sorted.reverse() : sorted;
}

/** 2026 unit stats attached on the server (null when the team has no adjusted numbers yet). */
export type Live2026 = { epa: number | null; sr: number | null; xpl: number | null; ppg: number | null; games: number | null; rank: number | null; n: number };
export type Board2026Row = { u: Unit2026; live: Live2026 | null; talent: number | null; v: Values; key: string; rank: number };

export function buildBoard2026(
  units: Unit2026[],
  live: Record<string, Live2026 | null>,
  prior: CoordinatorsFile["prior2025"],
  talent: Record<string, number>,
  unit: Unit,
  sort: CoordCol = "epa",
  dir: CoordDir = "best",
): Board2026Row[] {
  const rows: Board2026Row[] = units
    .filter((u) => u.unit === unit)
    .map((u) => {
      const l = live[`${u.unit}|${u.team}`] ?? null;
      const p = prior[u.team]?.[u.unit]?.epa;
      const delta = l?.epa != null && p != null ? l.epa - p : null;
      const t = talent[u.team] ?? null;
      return { u, live: l, talent: t, key: `${u.team}`, rank: 0, v: { epa: l?.epa ?? null, sr: l?.sr ?? null, xpl: l?.xpl ?? null, ppg: l?.ppg ?? null, delta, talent: t } };
    });
  return rankAndSort(rows, unit, sort, dir);
}

/** Seasons that count for the 3-year view (credited, with numbers, inside 2024–26). */
export function creditedSeasons(c: CoachRecord): HistoryRow[] {
  return c.history.filter((h) => h.status === "credited" && h.stats != null && h.stats.epa != null && h.season >= VIEWS["3y"].from && h.season <= VIEWS["3y"].to);
}
export const qualifies3y = (c: CoachRecord) => creditedSeasons(c).length >= VIEWS["3y"].min;

/** Equal-weight mean over credited seasons. */
export function summarize3y(c: CoachRecord): Values {
  const s = creditedSeasons(c).map((h) => h.stats!);
  return { epa: mean(s.map((x) => x.epa)), sr: mean(s.map((x) => x.sr)), xpl: mean(s.map((x) => x.xpl)), rank: mean(s.map((x) => x.rank)), n: s.length };
}

export type Board3yRow = { coach: CoachRecord; v: Values; key: string; rank: number };
export function buildBoard3y(coaches: CoachRecord[], unit: Unit, sort: CoordCol = "epa", dir: CoordDir = "best"): Board3yRow[] {
  const rows = coaches.filter((c) => c.unit === unit && qualifies3y(c)).map((coach) => ({ coach, v: summarize3y(coach), key: coach.name, rank: 0 }));
  return rankAndSort(rows, unit, sort, dir);
}

/** Label counts for the 2026 board (one per unit). */
export function labelCounts(units: Unit2026[], unit: Unit): Record<CoordLabel, number> {
  const out: Record<CoordLabel, number> = { sole: 0, "with-co": 0, co: 0, "hc-title": 0, "hc-calls": 0, interim: 0, unverified: 0 };
  for (const u of units) if (u.unit === unit) out[u.label] += 1;
  return out;
}

export function fmtCol(col: CoordCol, v: number | null | undefined): string {
  if (v == null || !Number.isFinite(v)) return "—";
  const d = COL_META[col].digits;
  const s = v.toFixed(d);
  if (col === "talent") return `#${s}`;
  return (col === "epa" || col === "delta") && v > 0 ? `+${s}` : s.replace("-", "−");
}

export const coordSearch = (view: ViewKey, unit: Unit, sort: CoordCol, dir: CoordDir) => ({
  view: view === DEFAULT_VIEW ? undefined : view,
  unit: unit === "off" ? undefined : unit,
  sort: sort === DEFAULT_COORD_SORT ? undefined : sort,
  dir: dir === "best" ? undefined : dir,
});

/** "Who runs it" line for a 2026 unit. */
export function whoLine(u: Unit2026): string {
  if (!u.coaches.length) return "No coordinator listed";
  if (u.label === "with-co") return u.coaches[0].name;
  return u.coaches.map((c) => c.name).join(" & ");
}
