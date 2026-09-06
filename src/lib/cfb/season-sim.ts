import { fcsStubsForTeam } from "./fcs-stubs.ts";
import type { GameRow, GameStatus, TeamSummary } from "./types.ts";

/** One row on a team hub remaining-schedule panel. */
export type RemainingScheduleRow = {
  key: string;
  week: number;
  kickoffDate: string;
  opponentLabel: string;
  opponentSlug: string | null;
  home: boolean;
  neutral: boolean;
  location: string | null;
  status: GameStatus;
  homeScore: number | null;
  awayScore: number | null;
  isFcs: boolean;
};

export type Make12Source = "amd-draws" | "legacy-playoff-odds" | "pending";

/** CFP Make 12 odds — make-field and win-title are separate draws (AMD owns 10k sim). */
export type Make12Odds = {
  makeField: number | null;
  winTitle: number | null;
  makeFieldSource: Make12Source;
  winTitleSource: Make12Source;
};

export type TeamScheduleGame = GameRow & {
  status: GameStatus;
  homeScore: number | null;
  awayScore: number | null;
};

/** Map preseason playoff_odds (logistic make-field curve) until AMD draws land. */
export function make12FromTeam(team: Pick<TeamSummary, "playoffOdds">): Make12Odds {
  const hasLegacy = Number.isFinite(team.playoffOdds);
  return {
    makeField: hasLegacy ? team.playoffOdds : null,
    winTitle: null,
    makeFieldSource: hasLegacy ? "legacy-playoff-odds" : "pending",
    winTitleSource: "pending",
  };
}

export function buildRemainingSchedule(
  teamSlug: string,
  games: TeamScheduleGame[],
): RemainingScheduleRow[] {
  const fbsRows: RemainingScheduleRow[] = games
    .filter((g) => g.status !== "final")
    .map((g) => {
      const homeIs = g.homeSlug === teamSlug;
      const oppSlug = homeIs ? g.awaySlug : g.homeSlug;
      const oppName = homeIs ? g.awayName : g.homeName;
      return {
        key: `fbs-${g.id}`,
        week: g.week,
        kickoffDate: g.kickoffDate,
        opponentLabel: oppName,
        opponentSlug: oppSlug,
        home: homeIs,
        neutral: g.neutral,
        location: g.location,
        status: g.status,
        homeScore: null,
        awayScore: null,
        isFcs: false,
      };
    });

  const fcsRows: RemainingScheduleRow[] = fcsStubsForTeam(teamSlug).map((stub, i) => ({
    key: `fcs-${teamSlug}-${stub.kickoffDate}-${i}`,
    week: stub.week,
    kickoffDate: stub.kickoffDate,
    opponentLabel: stub.opponentLabel,
    opponentSlug: null,
    home: stub.home,
    neutral: false,
    location: null,
    status: "scheduled" as const,
    homeScore: null,
    awayScore: null,
    isFcs: true,
  }));

  return [...fbsRows, ...fcsRows].sort((a, b) => {
    if (a.kickoffDate !== b.kickoffDate) return a.kickoffDate < b.kickoffDate ? -1 : 1;
    if (a.week !== b.week) return a.week - b.week;
    return a.opponentLabel.localeCompare(b.opponentLabel);
  });
}

export function make12FieldLabel(source: Make12Source): string | undefined {
  if (source === "legacy-playoff-odds") return "Pre-AMD logistic estimate";
  if (source === "pending") return "Awaiting AMD draws";
  return "10k sim draws";
}

export function make12TitleLabel(source: Make12Source): string | undefined {
  if (source === "pending") return "Awaiting AMD draws";
  return "10k sim draws";
}
