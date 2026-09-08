/** One FINAL game used to tally this-year W–L. Ties increment neither side. */
export type SeasonRecordGame = {
  status: string;
  homeTeamId: number;
  awayTeamId: number;
  homeScore: number | null;
  awayScore: number | null;
};

export type SeasonRecord = {
  seasonWins: number;
  seasonLosses: number;
};

/** En-dash W–L for Board / Rankings / team hub. */
export function formatSeasonRecord(wins: number, losses: number): string {
  return `${wins}–${losses}`;
}

/**
 * This-year W–L from FINAL rows only. Missing scores and ties do not count.
 * FCS opponents count when the row is FINAL in `games` (same as FBS).
 */
export function tallySeasonRecord(games: SeasonRecordGame[], teamId: number): SeasonRecord {
  let seasonWins = 0;
  let seasonLosses = 0;
  for (const g of games) {
    if (g.status !== "final") continue;
    if (g.homeScore == null || g.awayScore == null) continue;
    const isHome = g.homeTeamId === teamId;
    const isAway = g.awayTeamId === teamId;
    if (!isHome && !isAway) continue;
    const teamScore = isHome ? g.homeScore : g.awayScore;
    const oppScore = isHome ? g.awayScore : g.homeScore;
    if (teamScore > oppScore) seasonWins += 1;
    else if (teamScore < oppScore) seasonLosses += 1;
  }
  return { seasonWins, seasonLosses };
}

/**
 * Left-join onto `teams t`. Every `games` row is the 2026 slate (no season col).
 * Mirrors `tallySeasonRecord`.
 */
export const SEASON_RECORD_JOIN = `
  left join (
    select team_id,
           sum(win)::int as season_wins,
           sum(loss)::int as season_losses
    from (
      select home_team_id as team_id,
             case when home_score > away_score then 1 else 0 end as win,
             case when home_score < away_score then 1 else 0 end as loss
      from games
      where status = 'final'
        and home_score is not null
        and away_score is not null
      union all
      select away_team_id,
             case when away_score > home_score then 1 else 0 end,
             case when away_score < home_score then 1 else 0 end
      from games
      where status = 'final'
        and home_score is not null
        and away_score is not null
    ) outcomes
    group by team_id
  ) wl on wl.team_id = t.id
`;
