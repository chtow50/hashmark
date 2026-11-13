/**
 * HX vs results — measured only. Expected margins come from the pregame-locked HX on each
 * stamped FINAL (lock_home_hx / lock_away_hx, coalesced into homeHx / awayHx by the query),
 * through the shipped spread map. HX-by-week and preseason ranks come from the weekly refit
 * file data/hx_refit_2026.json (scripts/hx-refit.mjs). Nothing here is estimated.
 */
import refitRaw from "../../../data/hx_refit_2026.json" with { type: "json" };
import { predictMatchup } from "./model.ts";
import type { ScheduleGame } from "./types.ts";

type RefitBoardRow = { slug: string; hx: number; rank: number; pre_hx: number; pre_rank: number };
type RefitFile = {
  meta: { hx_stamp: string; through_week: number };
  board: RefitBoardRow[];
  history: { weeks: number[]; note: string; hx: Record<string, number[]> };
};

const refit = refitRaw as unknown as RefitFile;
const boardBySlug = new Map(refit.board.map((r) => [r.slug, r]));

export const HX_REFIT_STAMP = refit.meta.hx_stamp;
export const HX_REFIT_THROUGH_WEEK = refit.meta.through_week;

export type HxResultRow = {
  gameId: number;
  week: number;
  opponentSlug: string;
  opponentShort: string;
  home: boolean;
  neutral: boolean;
  /** Team-perspective pregame HX margin (positive = HX had this team winning). */
  expected: number;
  /** Team-perspective final margin. */
  actual: number;
  /** actual − expected. */
  diff: number;
};

export type HxResultsSummary = {
  n: number;
  avgExpected: number;
  avgActual: number;
  /** Mean of (actual − expected): positive = beat the pregame HX line on average. */
  avgDiff: number;
  /** HX picked the winner (ties excluded from hits). */
  suHits: number;
};

/** Stamped FBS–FBS FINALs for a team, graded against the pregame HX line. */
export function hxVsResults(teamSlug: string, games: ScheduleGame[]): HxResultRow[] {
  const rows: HxResultRow[] = [];
  for (const g of games) {
    if (g.isFcs || g.status !== "final" || g.homeScore == null || g.awayScore == null) continue;
    const home = g.homeSlug === teamSlug;
    if (!home && g.awaySlug !== teamSlug) continue;
    const pred = predictMatchup(
      { hxRating: g.homeHx, offenseRating: g.homeOff, defenseRating: g.homeDef },
      { hxRating: g.awayHx, offenseRating: g.awayOff, defenseRating: g.awayDef },
      { neutral: g.neutral },
    );
    const sign = home ? 1 : -1;
    const expected = sign * pred.spread;
    const actual = sign * (g.homeScore - g.awayScore);
    rows.push({
      gameId: g.id,
      week: g.week,
      opponentSlug: home ? g.awaySlug : g.homeSlug,
      opponentShort: home ? g.awayShort : g.homeShort,
      home,
      neutral: g.neutral,
      expected,
      actual,
      diff: actual - expected,
    });
  }
  return rows.sort((a, b) => a.week - b.week || a.gameId - b.gameId);
}

export function summarizeHxResults(rows: HxResultRow[]): HxResultsSummary | null {
  if (rows.length === 0) return null;
  const n = rows.length;
  const sum = (f: (r: HxResultRow) => number) => rows.reduce((s, r) => s + f(r), 0);
  return {
    n,
    avgExpected: sum((r) => r.expected) / n,
    avgActual: sum((r) => r.actual) / n,
    avgDiff: sum((r) => r.diff) / n,
    suHits: rows.filter((r) => r.actual !== 0 && Math.sign(r.actual) === Math.sign(r.expected)).length,
  };
}

export type HxTrajectory = {
  /** HX entering each week (Week 1 = preseason prior), from the refit file. */
  points: { week: number; hx: number }[];
  preHx: number;
  preRank: number;
  hx: number;
  rank: number;
};

export function hxTrajectory(slug: string): HxTrajectory | null {
  const b = boardBySlug.get(slug);
  const series = refit.history.hx[slug];
  if (!b || !series) return null;
  return {
    points: refit.history.weeks.map((week, i) => ({ week, hx: series[i] })),
    preHx: b.pre_hx,
    preRank: b.pre_rank,
    hx: b.hx,
    rank: b.rank,
  };
}

export type RankMover = { slug: string; preRank: number; rank: number; delta: number; preHx: number; hx: number };

/** Biggest HX rank moves since the preseason board (delta = preRank − rank; positive = rose). */
export function risersFallers(limit = 6): { risers: RankMover[]; fallers: RankMover[] } {
  const all: RankMover[] = refit.board.map((r) => ({
    slug: r.slug,
    preRank: r.pre_rank,
    rank: r.rank,
    delta: r.pre_rank - r.rank,
    preHx: r.pre_hx,
    hx: r.hx,
  }));
  const risers = all
    .filter((m) => m.delta > 0)
    .sort((a, b) => b.delta - a.delta || a.rank - b.rank)
    .slice(0, limit);
  const fallers = all
    .filter((m) => m.delta < 0)
    .sort((a, b) => a.delta - b.delta || a.rank - b.rank)
    .slice(0, limit);
  return { risers, fallers };
}
