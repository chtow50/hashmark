import { fcsStubIsFinal, fcsStubsForTeam, type FcsStubGame } from "./fcs-stubs.ts";
import { SIM_10K_AS_OF, SIM_10K_NOTE, simTeamBySlug } from "./truth-pack.ts";
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
  /** Full FBS game row for odds / matchup link — null for FCS stubs (never invent HX). */
  game: ScheduleGame | null;
  kickoffAt?: string | null;
  tv?: string | null;
  /** Home-perspective Vegas close when stamped. */
  vegasSpread?: number | null;
  homeShort?: string | null;
  awayShort?: string | null;
  hxSpreadPolicy?: ScheduleGame["hxSpreadPolicy"];
  live?: boolean;
};

/** @deprecated Use ScheduleGame — kept for test fixtures. */
export type TeamScheduleGame = ScheduleGame;

/**
 * "pack-only" marks a value that exists in the AMD draws but is Edge Pack / paid only
 * (win_title). Free surfaces never carry the number — make-field stays public.
 */
export type Make12Source = "amd-draws" | "legacy-playoff-odds" | "pending" | "pack-only";

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

/** A sim row as seen by the Make 12 mapper — make-field only (free export shape). */
export type Make12SimRow = { make_field: number };

/**
 * Map one HX 2026.7 10k-draw row to Make 12 odds. Falls back to the legacy
 * logistic make-field if the row is missing. Never treat make_field as a title.
 *
 * Client code never passes `winTitle` — this module is bundled into the public
 * JS, so it must not read any title field off a row. Only the server-only full
 * loader (./sim-full.server.ts) supplies it. No title → "pack-only".
 */
export function make12FromSimRow(
  row: Make12SimRow | undefined,
  team?: Pick<TeamSummary, "playoffOdds">,
  winTitle: number | null = null,
): Make12Odds {
  if (row) {
    const hasTitle = winTitle != null && Number.isFinite(winTitle);
    return {
      makeField: row.make_field,
      winTitle: hasTitle ? winTitle : null,
      makeFieldSource: "amd-draws",
      winTitleSource: hasTitle ? "amd-draws" : "pack-only",
    };
  }
  return team ? make12FromTeam(team) : {
    makeField: null,
    winTitle: null,
    makeFieldSource: "pending",
    winTitleSource: "pending",
  };
}

/**
 * Free-surface projection of Make 12: make-field stays public, win_title is
 * Edge Pack / paid only (AMD + Research rule). The number is dropped, not hidden.
 */
export function make12FreeView(odds: Make12Odds): Make12Odds {
  return {
    makeField: odds.makeField,
    makeFieldSource: odds.makeFieldSource,
    winTitle: null,
    winTitleSource: odds.winTitleSource === "amd-draws" ? "pack-only" : odds.winTitleSource,
  };
}

/**
 * Free board / rankings / free team page Make 12 — reads the free sim export
 * (data/sim_free_hx2026_7.json), which has no win_title at all, so nothing
 * title-shaped can reach the client bundle. The full sim with win_title is
 * server/test only: ./sim-full.server.ts (make12FromSimFull).
 */
export function make12FreeFromSim(
  slug: string,
  team?: Pick<TeamSummary, "playoffOdds">,
): Make12Odds {
  return make12FreeView(make12FromSimRow(simTeamBySlug(slug), team));
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
    kickoffAt: stub.kickoffAt ?? null,
    tv: stub.tv ?? null,
    vegasSpread: stub.vegasSpread ?? null,
    homeShort: stub.homeShort ?? null,
    awayShort: stub.awayShort ?? null,
    hxSpreadPolicy: stub.hxSpreadPolicy,
    live: stub.live,
  };
}

export function buildRemainingSchedule(
  teamSlug: string,
  games: ScheduleGame[],
  /** FCS stubs for this team. Defaults to the live data; fixtures pass their own. */
  stubs: FcsStubGame[] = fcsStubsForTeam(teamSlug),
): TeamScheduleRow[] {
  const fbsRows = games.filter((g) => g.status !== "final").map((g) => toScheduleRow(teamSlug, g));

  const fcsRows = stubs
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
  return `${SIM_10K_NOTE} · make-field, not title`;
}

export function make12TitleLabel(source: Make12Source): string | undefined {
  if (source === "pending") return "Awaiting AMD draws";
  if (source === "pack-only") return "Edge Pack only · make-field stays free";
  return SIM_10K_NOTE;
}

export function make12PanelLede(source: Make12Source): string {
  if (source === "amd-draws") {
    return `Make-field is not a national title. ${SIM_10K_NOTE}.`;
  }
  if (source === "legacy-playoff-odds") {
    return "12-team CFP field odds — make-field and national-title paths are separate draws.";
  }
  return "12-team CFP field odds — make-field and national-title paths are separate draws.";
}

export { SIM_10K_AS_OF, SIM_10K_NOTE };
