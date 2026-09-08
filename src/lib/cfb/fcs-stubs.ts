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
};

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

/** FBS vs FCS rows dropped from the 136-team games table. Unlisted Week 1 FCS stay scheduled stubs. */
export const FCS_STUB_GAMES: FcsStubGame[] = [
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

export function fcsStubIsFinal(stub: FcsStubGame): boolean {
  return stub.status === "final" && stub.homeScore != null && stub.awayScore != null;
}

export function fcsStubsForTeam(slug: string): FcsStubGame[] {
  return FCS_STUB_GAMES.filter((g) => g.teamSlug === slug);
}
