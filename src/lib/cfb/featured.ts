import { chicagoWeekday } from "./chicago.ts";
import type { ScheduleGame } from "./types";

/** Rankings stay on HASHMARK Week 0 until the Sunday after Week 1. */
export const BOARD_WEEK = 0;

/** Featured kick reads the HASHMARK Week 1 slate (`/schedule?w=1`). */
export const FEATURED_SLATE_WEEK = 1;

/** Thursday night flag: Colorado at Georgia Tech, Bobby Dodd. */
export const WEEK1_FLAG = {
  homeSlug: "georgia-tech",
  awaySlug: "colorado",
} as const;

/** Friday desk flag after Thursday FINALs: Miami at Stanford. */
export const WEEK1_FRIDAY_FLAG = {
  homeSlug: "stanford",
  awaySlug: "miami",
} as const;

/**
 * Pre-kick Thursday books for Colorado at GT. Used only when the row has no
 * stamped close. After kick the close is Georgia Tech −6.5 / 50.5 on games.vegas_*.
 */
export const GT_THURSDAY_BOOK = {
  homeSlug: WEEK1_FLAG.homeSlug,
  awaySlug: WEEK1_FLAG.awaySlug,
  /** Home-perspective spread. Positive = Georgia Tech favored. */
  spread: 6.5,
  totalLow: 50.5,
  totalHigh: 51,
  opened: 7.5,
  label: "Current book",
  sources: "USA Today −6.5 / 51 · FanDuel and Action −6.5 / 50.5 · opened −7.5",
} as const;

export function isColoradoAtGt(g: Pick<ScheduleGame, "homeSlug" | "awaySlug">): boolean {
  return g.homeSlug === WEEK1_FLAG.homeSlug && g.awaySlug === WEEK1_FLAG.awaySlug;
}

export function isMiamiAtStanford(g: Pick<ScheduleGame, "homeSlug" | "awaySlug">): boolean {
  return g.homeSlug === WEEK1_FRIDAY_FLAG.homeSlug && g.awaySlug === WEEK1_FRIDAY_FLAG.awaySlug;
}

export function isUpcomingKick(g: Pick<ScheduleGame, "status" | "kickoffAt">, nowMs: number): boolean {
  return g.status !== "final" && g.kickoffAt != null && Date.parse(g.kickoffAt) > nowMs;
}

/**
 * Next featured kick from a kick-sorted HASHMARK week slate.
 * Prefers Colorado at GT while that kick is still in the future.
 * After GT/Illinois Thursday FINALs, prefers Miami at Stanford (Friday
 * desk flag), else the first remaining Friday kick, else the next future
 * non-final. Never an in-progress or FINAL game, never a fallback to tape.
 */
export function selectFeaturedKick<T extends Pick<ScheduleGame, "status" | "kickoffAt" | "homeSlug" | "awaySlug">>(
  slate: T[],
  nowMs: number,
): T | null {
  const upcoming = slate.filter((g) => isUpcomingKick(g, nowMs));
  const thursday = upcoming.find((g) => isColoradoAtGt(g));
  if (thursday) return thursday;
  const fridayFlag = upcoming.find((g) => isMiamiAtStanford(g));
  if (fridayFlag) return fridayFlag;
  const friday = upcoming.find((g) => g.kickoffAt != null && chicagoWeekday(g.kickoffAt) === "Friday");
  return friday ?? upcoming[0] ?? null;
}

/** Same rule as hashmarkWeekFromRow: Aug 29–30 2026 is Week 0. */
export function featuredSlateWeek(g: Pick<ScheduleGame, "kickoffDate" | "week">): number {
  return g.kickoffDate <= "2026-08-30" ? 0 : g.week;
}

export type FeaturedBook = {
  kind: "current" | "close";
  label: string;
  /** Home-perspective spread. */
  spread: number;
  total: string;
  note: string | null;
};

/** Stamped close when present. Unstamped GT still shows the pre-kick current book. Never invent. */
export function featuredBook(g: Pick<ScheduleGame, "homeSlug" | "awaySlug" | "vegasSpread" | "vegasTotal">): FeaturedBook | null {
  if (g.vegasSpread != null || g.vegasTotal != null) {
    const total = g.vegasTotal == null ? "—" : String(g.vegasTotal);
    return {
      kind: "close",
      label: "Vegas",
      spread: g.vegasSpread ?? 0,
      total,
      note: null,
    };
  }
  if (isColoradoAtGt(g)) {
    return {
      kind: "current",
      label: GT_THURSDAY_BOOK.label,
      spread: GT_THURSDAY_BOOK.spread,
      total: `${GT_THURSDAY_BOOK.totalLow}–${GT_THURSDAY_BOOK.totalHigh}`,
      note: `${GT_THURSDAY_BOOK.sources}. Not a close until kick.`,
    };
  }
  return null;
}

export function favoriteLine(homeShort: string, awayShort: string, spread: number): string {
  if (Math.abs(spread) < 0.05) return "PK";
  return spread > 0 ? `${homeShort} −${spread.toFixed(1)}` : `${awayShort} −${(-spread).toFixed(1)}`;
}

/** Same-favorite gap vs the current book. Null when sides disagree or no book. */
export function spreadGap(hxSpread: number, bookSpread: number): number | null {
  if (Math.abs(hxSpread) < 0.05 || Math.abs(bookSpread) < 0.05) return null;
  if (hxSpread > 0 !== bookSpread > 0) return null;
  return Math.round((hxSpread - bookSpread) * 10) / 10;
}
