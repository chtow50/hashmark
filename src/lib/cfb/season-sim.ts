import { fcsStubIsFinal, fcsStubsForTeam, type FcsStubGame } from "./fcs-stubs.ts";
import type { GameStatus, ScheduleGame, TeamSummary } from "./types.ts";

/** One row on a team hub schedule panel. */
export type TeamScheduleRow = {
  key: string;
  week: number;
  kickoffDate: string;
  opponentLabel: string;
  opponentSlug: string | null;
  opponentColor: string | null;
  home: boolean;
  neutral: boolean;
  location: string | null;
  status: GameStatus;
  homeScore: number | null;
  awayScore: number | null;
  isFcs: boolean;
  /** Full FBS game row for odds / matchup link — null for FCS stubs. */
  game: ScheduleGame | null;
};

/** @deprecated Use ScheduleGame — kept for test fixtures. */
export type TeamScheduleGame = ScheduleGame;

export type Make12Source = "amd-draws" | "legacy-playoff-odds" | "pending";

/** CFP Make 12 odds — make-field and win-title are separate draws (AMD owns 10k sim). */
export type Make12Odds = {
  makeField: number | null;
  winTitle: number | null;
  makeFieldSource: Make12Source;
  winTitleSource: Make12Source;
};

function toScheduleRow(teamSlug: string, g: ScheduleGame): TeamScheduleRow {
  const homeIs = g.homeSlug === teamSlug;
  const oppSlug = homeIs ? g.awaySlug : g.homeSlug;
  const oppName = homeIs ? g.awayName : g.homeName;
  const oppColor = homeIs ? g.awayColor : g.homeColor;
  return {
    key: `fbs-${g.id}`,
    week: g.week,
    kickoffDate: g.kickoffDate,
    opponentLabel: oppName,
    opponentSlug: oppSlug,
    opponentColor: oppColor,
    home: homeIs,
    neutral: g.neutral,
    location: g.location,
    status: g.status,
    homeScore: g.homeScore,
    awayScore: g.awayScore,
    isFcs: false,
    game: g,
  };
}

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

function toFcsStubRow(stub: FcsStubGame, i: number): TeamScheduleRow {
  return {
    key: `fcs-${stub.teamSlug}-${stub.kickoffDate}-${i}`,
    week: stub.week,
    kickoffDate: stub.kickoffDate,
    opponentLabel: stub.opponentLabel,
    opponentSlug: null,
    opponentColor: null,
    home: stub.home,
    neutral: false,
    location: null,
    status: stub.status,
    homeScore: stub.homeScore,
    awayScore: stub.awayScore,
    isFcs: true,
    game: null,
  };
}

export function buildRemainingSchedule(
  teamSlug: string,
  games: ScheduleGame[],
): TeamScheduleRow[] {
  const fbsRows = games.filter((g) => g.status !== "final").map((g) => toScheduleRow(teamSlug, g));

  const fcsRows = fcsStubsForTeam(teamSlug)
    .filter((stub) => !fcsStubIsFinal(stub))
    .map((stub, i) => toFcsStubRow(stub, i));

  return [...fbsRows, ...fcsRows].sort((a, b) => {
    if (a.kickoffDate !== b.kickoffDate) return a.kickoffDate < b.kickoffDate ? -1 : 1;
    if (a.week !== b.week) return a.week - b.week;
    return a.opponentLabel.localeCompare(b.opponentLabel);
  });
}

/** Full FBS season slate for a team hub — played and unplayed. */
export function buildSeasonSchedule(teamSlug: string, games: ScheduleGame[]): TeamScheduleRow[] {
  return games.map((g) => toScheduleRow(teamSlug, g));
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
