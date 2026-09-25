import type { ScheduleGame } from "./types";

/**
 * Board chrome week (Rankings / home PageHead). Ranking *rows* stay
 * `season = 2026 AND week = 0` — that is what queries read.
 */
export const BOARD_WEEK = 4;

/**
 * Last stamped AP ballot on the live board.
 * HX chrome is Week 4. AP is the last stamped poll (Week 4, Sept. 20) —
 * not a Week 3 ballot.
 */
export const AP_STAMP = {
  week: 4,
  asOf: "Sept. 20",
  label: "Week 4 AP",
  columnHint: "W4 stamp",
  vsHx: "last stamped AP (Week 4, Sept. 20)",
  lede: "HX is Week 4. AP is the last stamped poll (Week 4, Sept. 20) — not a Week 3 ballot.",
} as const;

/**
 * Featured kick reads the HASHMARK Week 4 slate (`/schedule?w=4`).
 * Next upcoming non-final by kick time; if the slate has dates but no
 * times, first non-final in slate order. Never invent a kick, TV, Vegas,
 * or a Research pin. FCS rows are Vegas-only (unrated) — never feature
 * them (would invent HX). Liberty @ Coastal is FINAL (Liberty 34, Coastal 17)
 * and must not feature. Earliest remaining Friday window is the card while
 * it is still upcoming (Army @ Temple, Fri 15:00 CT).
 */
export const FEATURED_SLATE_WEEK = 4;

/** Thursday night flag: Colorado at Georgia Tech, Bobby Dodd. */
export const WEEK1_FLAG = {
  homeSlug: "georgia-tech",
  awaySlug: "colorado",
} as const;

/** Saturday night ABC: Ohio State at Texas. Historical Research featured pick. FINAL 23–24. */
export const WEEK2_FEATURED = {
  homeSlug: "texas",
  awaySlug: "ohio-state",
} as const;

/** Alt card: Oklahoma at Michigan, noon FOX. */
export const WEEK2_FEATURED_ALT = {
  homeSlug: "michigan",
  awaySlug: "oklahoma",
} as const;

/** Thursday night ESPN: Syracuse at Pittsburgh. Research Week 3 card. FINAL 27–13. */
export const WEEK3_FEATURED = {
  id: 97,
  homeSlug: "pittsburgh",
  awaySlug: "syracuse",
} as const;

/**
 * Thursday night ESPN: Liberty at Coastal Carolina. Historical opener identity
 * for stamp tests. FINAL Liberty 34–Coastal 17 — not the live featured card.
 * Vegas close stays LIB −2.5 / 50.5 from the Sep 23 CLEAR pack.
 */
export const WEEK4_FEATURED = {
  homeSlug: "coastal-carolina",
  awaySlug: "liberty",
} as const;

/**
 * Friday ESPN: Pittsburgh at Virginia Tech. Research Week 5 featured card
 * for `/schedule?w=5` only. Fri 2026-10-02 18:00 CT · ESPN · VT −5.5 / 56.5.
 * Not the live desk — BOARD_WEEK and FEATURED_SLATE_WEEK stay 4.
 */
export const WEEK5_FEATURED = {
  homeSlug: "virginia-tech",
  awaySlug: "pittsburgh",
} as const;

/**
 * Pre-kick Thursday books for Colorado at GT. Used only when the row has no
 * stamped close. After kick the close is Georgia Tech −6.5 / 50.5 on games.vegas_*.
 * Not a Week 2 featured path — do not invent a Week 2 book.
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

export function isOhioStateAtTexas(g: Pick<ScheduleGame, "homeSlug" | "awaySlug">): boolean {
  return g.homeSlug === WEEK2_FEATURED.homeSlug && g.awaySlug === WEEK2_FEATURED.awaySlug;
}

export function isOklahomaAtMichigan(g: Pick<ScheduleGame, "homeSlug" | "awaySlug">): boolean {
  return g.homeSlug === WEEK2_FEATURED_ALT.homeSlug && g.awaySlug === WEEK2_FEATURED_ALT.awaySlug;
}

export function isUpcomingKick(
  g: Pick<ScheduleGame, "status" | "kickoffAt"> & { isFcs?: boolean },
  nowMs: number,
): boolean {
  if (g.status === "final") return false;
  if (g.isFcs) return false;
  if (g.kickoffAt != null) return Date.parse(g.kickoffAt) > nowMs;
  return true;
}

/**
 * Next upcoming non-final on a kick-sorted HASHMARK week slate.
 * Prefers the earliest future `kickoffAt`; if the slate has dates but no
 * times, takes the first non-final in slate order.
 * Never a FINAL. Never an FCS stub (no invented HX). Does not invent Vegas or scores.
 */
export function selectFeaturedKick<
  T extends Pick<ScheduleGame, "status" | "kickoffAt"> & { isFcs?: boolean },
>(slate: T[], nowMs: number): T | null {
  const upcoming = slate.filter((g) => isUpcomingKick(g, nowMs));
  const timed = upcoming.filter((g) => g.kickoffAt != null);
  if (timed.length) {
    return timed.reduce((a, b) =>
      Date.parse(a.kickoffAt as string) <= Date.parse(b.kickoffAt as string) ? a : b,
    );
  }
  return upcoming[0] ?? null;
}

/**
 * Board featured for the live chrome week (Week 4 slate).
 * Week 2 and Week 3 Research pins stay historical helpers — those rows
 * are FINAL and must not feature. Pitt FINAL is not featured.
 * Week 4: next upcoming FBS kick on the week-4 slate. Liberty @ Coastal
 * is FINAL (34–17) and must not feature. While Friday is still ahead, the
 * earliest kick is the card (Army @ Temple, Fri 15:00 CT).
 * Blank Vegas stays blank when the row has no stamped book. Never invent a book.
 * Never a FINAL. Never FCS. Never invent a matchup.
 */
export function selectBoardFeaturedKick<
  T extends Pick<ScheduleGame, "status" | "kickoffAt" | "homeSlug" | "awaySlug"> & { isFcs?: boolean },
>(slate: T[], nowMs: number): T | null {
  return selectFeaturedKick(slate, nowMs);
}

export function isPittsburghAtVirginiaTech(
  g: Pick<ScheduleGame, "homeSlug" | "awaySlug">,
): boolean {
  return g.homeSlug === WEEK5_FEATURED.homeSlug && g.awaySlug === WEEK5_FEATURED.awaySlug;
}

/**
 * Featured card scoped to the schedule week being viewed.
 * Week 5 pins Pittsburgh @ Virginia Tech (CLEAR), even though WKU @ NMSU
 * kicks earlier. Other weeks have no schedule-page pin — the homepage desk
 * stays Week 4 via FEATURED_SLATE_WEEK. Never invents a matchup.
 */
export function selectWeekScopedFeatured<
  T extends Pick<ScheduleGame, "status" | "homeSlug" | "awaySlug"> & { isFcs?: boolean },
>(week: number, slate: T[]): T | null {
  if (week !== 5) return null;
  return (
    slate.find((g) => !g.isFcs && g.status !== "final" && isPittsburghAtVirginiaTech(g)) ?? null
  );
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

export function formatVegas(line: string | null, total: number | null): string {
  if (line == null && total == null) return "—";
  if (line == null) return `O/U ${total!.toFixed(1)}`;
  if (total == null) return line;
  return `${line} · O/U ${total.toFixed(1)}`;
}

/** Same-favorite gap vs the current book. Null when sides disagree or no book. */
export function spreadGap(hxSpread: number, bookSpread: number): number | null {
  if (Math.abs(hxSpread) < 0.05 || Math.abs(bookSpread) < 0.05) return null;
  if (hxSpread > 0 !== bookSpread > 0) return null;
  return Math.round((hxSpread - bookSpread) * 10) / 10;
}
