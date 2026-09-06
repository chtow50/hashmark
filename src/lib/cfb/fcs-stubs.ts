export type FcsStubGame = {
  teamSlug: string;
  week: number;
  kickoffDate: string;
  opponentLabel: string;
  home: boolean;
};

/** FBS vs FCS rows dropped from the 136-team games table — opponent names stubbed until Research wires them. */
export const FCS_STUB_GAMES: FcsStubGame[] = [
  { teamSlug: 'buffalo', week: 1, kickoffDate: '2026-09-03', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'delaware', week: 1, kickoffDate: '2026-09-03', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'kennesaw-state', week: 1, kickoffDate: '2026-09-03', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'minnesota', week: 1, kickoffDate: '2026-09-03', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'missouri', week: 1, kickoffDate: '2026-09-03', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'ucf', week: 1, kickoffDate: '2026-09-03', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'utah', week: 1, kickoffDate: '2026-09-03', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'georgia-state', week: 1, kickoffDate: '2026-09-04', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'kansas', week: 1, kickoffDate: '2026-09-04', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'purdue', week: 1, kickoffDate: '2026-09-04', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'air-force', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'arizona', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'arizona-state', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'arkansas', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'army', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'bowling-green', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'byu', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'charlotte', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'georgia', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'georgia-southern', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'iowa-state', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'jacksonville-state', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'kansas-state', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'kentucky', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'louisiana', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'louisiana-tech', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'maryland', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'middle-tennessee', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'navy', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'new-mexico-state', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'northwestern', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'old-dominion', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'rice', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'san-diego-state', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'south-alabama', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'southern-miss', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'syracuse', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'temple', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'tennessee', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'texas-tech', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'utah-state', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'utsa', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'vanderbilt', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
  { teamSlug: 'virginia-tech', week: 1, kickoffDate: '2026-09-05', opponentLabel: 'FCS opponent', home: true },
];

export function fcsStubsForTeam(slug: string): FcsStubGame[] {
  return FCS_STUB_GAMES.filter((g) => g.teamSlug === slug);
}
