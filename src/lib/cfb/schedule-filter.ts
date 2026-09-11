import { inConf, parseConf, type ConfFilter } from "./conferences.ts";
import type { ScheduleGame, TeamSummary } from "./types.ts";

export type ScheduleView = "top25" | "conf" | "all";

export function parseScheduleView(value: unknown): ScheduleView {
  if (value === "conf" || value === "conference") return "conf";
  if (value === "all") return "all";
  return "top25";
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
