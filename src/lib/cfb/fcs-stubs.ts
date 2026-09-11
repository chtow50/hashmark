/**
 * FBS vs FCS rows dropped from the 136-team games table.
 *
 * Week 1: W–L stubs (FINAL only when Research stamped a score).
 * Week 2: JSON ingest of AMD `data/week2_fbs_fcs_spreads_2026.json` —
 * kick / TV / Vegas close, hx_spread always null (vegas_only_fcs_unrated).
 * Do not invent FCS HX, scores, or a second rating.
 */
import week2FcsRaw from "../../../data/week2_fbs_fcs_spreads_2026.json" with { type: "json" };
import { chicagoCivilToIso } from "./chicago.ts";
import type { HxSpreadPolicy, ScheduleGame } from "./types.ts";

export type FcsStubStatus = "final" | "scheduled";

export type FcsStubGame = {
  teamSlug: string;
  week: number;
  kickoffDate: string;
  opponentLabel: string;
  home: boolean;
  status: FcsStubStatus;
  /** Home/away scores when FINAL — consistent with `home` (FBS host is home on every current stub). */
  homeScore: number | null;
  awayScore: number | null;
  kickoffAt?: string | null;
  tv?: string | null;
  /** Home-perspective Vegas close. Positive = home favored. Null when unsourced. */
  vegasSpread?: number | null;
  espnEventId?: string | null;
  homeName?: string;
  awayName?: string;
  homeShort?: string;
  awayShort?: string;
  fcsShort?: string;
  hxSpreadPolicy?: HxSpreadPolicy;
  live?: boolean;
};

type Week2FcsFile = {
  meta: { week: number; n_fbs_fcs: number; hx_stamp?: string; policy?: string };
  games: Week2FcsJsonGame[];
};

type Week2FcsJsonGame = {
  espn_event_id: string;
  kick_ct: string;
  kick_date: string;
  home_espn: string;
  away_espn: string;
  home_abbr: string;
  away_abbr: string;
  fbs_team: string;
  fbs_slug: string;
  fcs_opponent: string;
  fbs_is_home: boolean;
  neutral: boolean;
  vegas_details: string | null;
  vegas_spread: number | null;
  broadcast: string | null;
  status: string;
  hx_spread: number | null;
  hx_spread_policy: string;
};

const WEEK2_FCS = week2FcsRaw as Week2FcsFile;

/** Display abbreviations matching Week 1 TV stamps. Unknown strings pass through. */
const TV_SHORT: Record<string, string> = {
  "ACC Network": "ACCN",
  "SEC Network": "SECN",
  "Big Ten Network": "BTN",
};

const FCS_SWATCH = "#6e6e68";
const FBS_SWATCH = "#8a8a82";

function scheduled(teamSlug: string, week: number, kickoffDate: string): FcsStubGame {
  return {
    teamSlug,
    week,
    kickoffDate,
    opponentLabel: "FCS opponent",
    home: true,
    status: "scheduled",
    homeScore: null,
    awayScore: null,
  };
}

/** Research CFB vs ESPN overall — only this FINAL list. See data/fcs_finals_needed_for_wl_2026.json. */
function finalHome(
  teamSlug: string,
  week: number,
  kickoffDate: string,
  opponentLabel: string,
  homeScore: number,
  awayScore: number,
): FcsStubGame {
  return {
    teamSlug,
    week,
    kickoffDate,
    opponentLabel,
    home: true,
    status: "final",
    homeScore,
    awayScore,
  };
}

function shortTv(broadcast: string | null): string | null {
  if (!broadcast) return null;
  return TV_SHORT[broadcast] ?? broadcast;
}

/**
 * JSON `vegas_spread` is the FBS book line (negative = FBS favored, e.g. MIA −59.5).
 * The schedule board stores home-perspective (positive = home favored).
 */
export function homePerspectiveFcsVegas(g: Pick<Week2FcsJsonGame, "vegas_spread" | "fbs_is_home">): number | null {
  if (g.vegas_spread == null) return null;
  return g.fbs_is_home ? -g.vegas_spread : g.vegas_spread;
}

function week2StubFromJson(g: Week2FcsJsonGame): FcsStubGame {
  const fbsIsHome = g.fbs_is_home;
  const fcsLabel = fbsIsHome ? g.away_espn : g.home_espn;
  const fcsShort = fbsIsHome ? g.away_abbr : g.home_abbr;
  return {
    teamSlug: g.fbs_slug,
    week: 2,
    kickoffDate: g.kick_date,
    opponentLabel: fcsLabel,
    home: fbsIsHome,
    status: g.status === "STATUS_FINAL" ? "final" : "scheduled",
    homeScore: null,
    awayScore: null,
    kickoffAt: chicagoCivilToIso(g.kick_ct),
    tv: shortTv(g.broadcast),
    vegasSpread: homePerspectiveFcsVegas(g),
    espnEventId: g.espn_event_id,
    homeName: fbsIsHome ? g.fbs_team : fcsLabel,
    awayName: fbsIsHome ? fcsLabel : g.fbs_team,
    homeShort: g.home_abbr,
    awayShort: g.away_abbr,
    fcsShort,
    hxSpreadPolicy: "vegas_only_fcs_unrated",
    live: g.status === "STATUS_IN_PROGRESS",
  };
}

const WEEK1_FCS_STUBS: FcsStubGame[] = [
  scheduled("buffalo", 1, "2026-09-03"),
  scheduled("delaware", 1, "2026-09-03"),
  scheduled("kennesaw-state", 1, "2026-09-03"),
  finalHome("minnesota", 1, "2026-09-03", "Eastern Illinois", 59, 7),
  finalHome("missouri", 1, "2026-09-03", "UAPB", 54, 14),
  scheduled("ucf", 1, "2026-09-03"),
  finalHome("utah", 1, "2026-09-03", "Idaho", 66, 14),
  scheduled("georgia-state", 1, "2026-09-04"),
  scheduled("kansas", 1, "2026-09-04"),
  finalHome("purdue", 1, "2026-09-04", "Indiana State", 44, 19),
  scheduled("air-force", 1, "2026-09-05"),
  finalHome("app-state", 1, "2026-09-05", "Maine", 55, 3),
  scheduled("arizona", 1, "2026-09-05"),
  scheduled("arizona-state", 1, "2026-09-05"),
  scheduled("arkansas", 1, "2026-09-05"),
  finalHome("army", 1, "2026-09-05", "Bryant", 59, 3),
  scheduled("bowling-green", 1, "2026-09-05"),
  finalHome("byu", 1, "2026-09-05", "Utah Tech", 63, 7),
  scheduled("charlotte", 1, "2026-09-05"),
  finalHome("georgia", 1, "2026-09-05", "Tennessee State", 63, 3),
  scheduled("georgia-southern", 1, "2026-09-05"),
  scheduled("iowa-state", 1, "2026-09-05"),
  scheduled("jacksonville-state", 1, "2026-09-05"),
  scheduled("kansas-state", 1, "2026-09-05"),
  scheduled("kentucky", 1, "2026-09-05"),
  scheduled("louisiana", 1, "2026-09-05"),
  scheduled("louisiana-tech", 1, "2026-09-05"),
  finalHome("maryland", 1, "2026-09-05", "Hampton", 62, 0),
  scheduled("middle-tennessee", 1, "2026-09-05"),
  finalHome("navy", 1, "2026-09-05", "Towson", 42, 15),
  scheduled("new-mexico-state", 1, "2026-09-05"),
  scheduled("northwestern", 1, "2026-09-05"),
  scheduled("old-dominion", 1, "2026-09-05"),
  scheduled("rice", 1, "2026-09-05"),
  scheduled("san-diego-state", 1, "2026-09-05"),
  scheduled("south-alabama", 1, "2026-09-05"),
  scheduled("southern-miss", 1, "2026-09-05"),
  scheduled("syracuse", 1, "2026-09-05"),
  scheduled("temple", 1, "2026-09-05"),
  finalHome("tennessee", 1, "2026-09-05", "Furman", 56, 9),
  finalHome("texas-tech", 1, "2026-09-05", "Nicholls", 33, 3),
  finalHome("uconn", 1, "2026-09-05", "Lafayette", 56, 7),
  scheduled("utah-state", 1, "2026-09-05"),
  scheduled("utsa", 1, "2026-09-05"),
  scheduled("vanderbilt", 1, "2026-09-05"),
  finalHome("virginia-tech", 1, "2026-09-05", "VMI", 73, 3),
];

const WEEK2_FCS_STUBS: FcsStubGame[] = WEEK2_FCS.games.map(week2StubFromJson);

/** FBS vs FCS rows dropped from the 136-team games table. Unlisted Week 1 FCS stay scheduled stubs. */
export const FCS_STUB_GAMES: FcsStubGame[] = [...WEEK1_FCS_STUBS, ...WEEK2_FCS_STUBS];

export function fcsStubIsFinal(stub: FcsStubGame): boolean {
  return stub.status === "final" && stub.homeScore != null && stub.awayScore != null;
}

export function fcsStubsForTeam(slug: string): FcsStubGame[] {
  return FCS_STUB_GAMES.filter((g) => g.teamSlug === slug);
}

export function fcsStubsForWeek(week: number): FcsStubGame[] {
  return FCS_STUB_GAMES.filter((g) => g.week === week);
}

export function isVegasOnlyFcs(
  g: Pick<ScheduleGame, "isFcs" | "hxSpreadPolicy">,
): boolean {
  return g.isFcs === true || g.hxSpreadPolicy === "vegas_only_fcs_unrated";
}

function fcsSyntheticSlug(short: string, espnEventId: string): string {
  const token = short.toLowerCase().replace(/[^a-z0-9]+/g, "") || espnEventId;
  return `fcs-${token}`;
}

function stubScheduleId(stub: FcsStubGame, index: number): number {
  const n = stub.espnEventId ? Number(stub.espnEventId) : NaN;
  if (Number.isFinite(n) && n > 0) return -n;
  return -(2_000_000 + stub.week * 1000 + index);
}

/** Board rows for one HASHMARK week. Only stubs with a named opponent (Week 2 JSON). */
export function fcsScheduleGamesForWeek(week: number): ScheduleGame[] {
  return fcsStubsForWeek(week)
    .filter((stub) => stub.hxSpreadPolicy === "vegas_only_fcs_unrated")
    .map((stub, i) => fcsStubToScheduleGame(stub, i));
}

export function fcsScheduleGamesForDate(ymd: string): ScheduleGame[] {
  return FCS_STUB_GAMES.filter(
    (stub) => stub.kickoffDate === ymd && stub.hxSpreadPolicy === "vegas_only_fcs_unrated",
  ).map((stub, i) => fcsStubToScheduleGame(stub, i));
}

export function fcsStubToScheduleGame(stub: FcsStubGame, index = 0): ScheduleGame {
  const fbsIsHome = stub.home;
  const fcsShort = stub.fcsShort ?? "FCS";
  const fcsName = stub.opponentLabel;
  const fbsName = fbsIsHome ? (stub.homeName ?? stub.teamSlug) : (stub.awayName ?? stub.teamSlug);
  const fbsShort = fbsIsHome ? (stub.homeShort ?? stub.teamSlug) : (stub.awayShort ?? stub.teamSlug);
  const fcsSlug = fcsSyntheticSlug(fcsShort, stub.espnEventId ?? String(index));
  return {
    id: stubScheduleId(stub, index),
    week: stub.week,
    kickoffDate: stub.kickoffDate,
    homeSlug: fbsIsHome ? stub.teamSlug : fcsSlug,
    awaySlug: fbsIsHome ? fcsSlug : stub.teamSlug,
    homeName: fbsIsHome ? fbsName : fcsName,
    awayName: fbsIsHome ? fcsName : fbsName,
    homeShort: fbsIsHome ? fbsShort : fcsShort,
    awayShort: fbsIsHome ? fcsShort : fbsShort,
    homeColor: fbsIsHome ? FBS_SWATCH : FCS_SWATCH,
    awayColor: fbsIsHome ? FCS_SWATCH : FBS_SWATCH,
    homeHx: 0,
    awayHx: 0,
    homeRank: 0,
    awayRank: 0,
    homeOff: 0,
    awayOff: 0,
    homeDef: 0,
    awayDef: 0,
    neutral: false,
    location: null,
    headline: stub.live ? "IN_PROGRESS" : null,
    kickoffAt: stub.kickoffAt ?? null,
    vegasSpread: stub.vegasSpread ?? null,
    vegasTotal: null,
    homeScore: stub.homeScore,
    awayScore: stub.awayScore,
    status: stub.status,
    tv: stub.tv ?? null,
    isFcs: true,
    hxSpreadPolicy: stub.hxSpreadPolicy ?? "vegas_only_fcs_unrated",
  };
}

export function mergeFcsScheduleGames(games: ScheduleGame[], week: number): ScheduleGame[] {
  const fcs = fcsScheduleGamesForWeek(week);
  if (fcs.length === 0) return games;
  return sortScheduleGames([...games, ...fcs]);
}

export function sortScheduleGames(games: ScheduleGame[]): ScheduleGame[] {
  return [...games].sort((a, b) => {
    if (a.kickoffDate !== b.kickoffDate) return a.kickoffDate < b.kickoffDate ? -1 : 1;
    const ta = a.kickoffAt ? Date.parse(a.kickoffAt) : null;
    const tb = b.kickoffAt ? Date.parse(b.kickoffAt) : null;
    if (ta != null && tb != null && ta !== tb) return ta - tb;
    if (ta != null && tb == null) return -1;
    if (ta == null && tb != null) return 1;
    return a.id - b.id;
  });
}

export const WEEK2_FCS_META = {
  asOf: "2026-09-10",
  n: WEEK2_FCS.games.length,
  policy: "vegas_only_fcs_unrated" as const,
};
