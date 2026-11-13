import { inConf, parseConf, type ConfFilter } from "./conferences.ts";
import type { ScheduleGame, TeamSummary } from "./types.ts";

export type ScheduleView = "top25" | "conf" | "all";

export function parseScheduleView(value: unknown): ScheduleView {
  if (value === "conf" || value === "conference") return "conf";
  if (value === "top25") return "top25";
  return "all";
}

/** Last schedule week the site serves (bowls/CFP live elsewhere). Mirrors HASHMARK_MAX_WEEK in queries.ts. */
export const SCHEDULE_MAX_WEEK = 13;

/**
 * ?w= parser for /schedule. Integer weeks clamp into 0..max (w=99 → 13, w=-1 → 0);
 * anything else (abc, 1.5, empty) is undefined so the caller falls back to the current week.
 * The router merges raw search params into deps, so the loader must run this too.
 */
export function parseScheduleWeek(value: unknown, max = SCHEDULE_MAX_WEEK): number | undefined {
  const n =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim() !== ""
        ? Number(value)
        : Number.NaN;
  if (!Number.isInteger(n)) return undefined;
  return Math.min(max, Math.max(0, n));
}

/** HX top 25 plus AP ballot teams (ap_rank ≤ 25). */
export function top25SlugSet(teams: TeamSummary[]): Set<string> {
  const slugs = new Set<string>();
  for (const t of teams) {
    if (t.hxRank <= 25 || (t.apRank != null && t.apRank <= 25)) slugs.add(t.slug);
  }
  return slugs;
}

export function filterScheduleGames(
  games: ScheduleGame[],
  teams: TeamSummary[],
  view: ScheduleView,
  conf: ConfFilter,
): ScheduleGame[] {
  if (view === "all") return games;

  if (view === "top25") {
    const top = top25SlugSet(teams);
    return games.filter((g) => top.has(g.homeSlug) || top.has(g.awaySlug));
  }

  const inConference = new Set(
    teams.filter((t) => inConf(t.conference, conf)).map((t) => t.slug),
  );
  return games.filter((g) => inConference.has(g.homeSlug) || inConference.has(g.awaySlug));
}

export { parseConf };
