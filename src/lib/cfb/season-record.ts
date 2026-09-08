import { FCS_STUB_GAMES, fcsStubIsFinal, fcsStubsForTeam, type FcsStubGame } from "./fcs-stubs";

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

export function combineSeasonRecord(fbs: SeasonRecord, fcs: SeasonRecord): SeasonRecord {
  return {
    seasonWins: fbs.seasonWins + fcs.seasonWins,
    seasonLosses: fbs.seasonLosses + fcs.seasonLosses,
  };
}

function outcome(teamScore: number, oppScore: number): SeasonRecord {
  if (teamScore > oppScore) return { seasonWins: 1, seasonLosses: 0 };
  if (teamScore < oppScore) return { seasonWins: 0, seasonLosses: 1 };
  return { seasonWins: 0, seasonLosses: 0 };
}

/**
 * This-year W–L from FINAL `games` rows only. Missing scores and ties do not count.
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
    const row = outcome(teamScore, oppScore);
    seasonWins += row.seasonWins;
    seasonLosses += row.seasonLosses;
  }
  return { seasonWins, seasonLosses };
}

/** FINAL FCS stubs for one FBS slug. Scheduled stubs and missing scores do not count. */
export function tallyFcsStubs(stubs: FcsStubGame[]): SeasonRecord {
  let seasonWins = 0;
  let seasonLosses = 0;
  for (const s of stubs) {
    if (!fcsStubIsFinal(s)) continue;
    const teamScore = s.home ? s.homeScore! : s.awayScore!;
    const oppScore = s.home ? s.awayScore! : s.homeScore!;
    const row = outcome(teamScore, oppScore);
    seasonWins += row.seasonWins;
    seasonLosses += row.seasonLosses;
  }
  return { seasonWins, seasonLosses };
}

export function tallyFcsStubRecord(slug: string): SeasonRecord {
  return tallyFcsStubs(fcsStubsForTeam(slug));
}

/** One win/loss row per FINAL FCS stub (joined to teams.slug in SQL). */
export function fcsStubWinLossRows(): { slug: string; win: number; loss: number }[] {
  return FCS_STUB_GAMES.filter(fcsStubIsFinal).map((s) => {
    const rec = tallyFcsStubs([s]);
    return { slug: s.teamSlug, win: rec.seasonWins, loss: rec.seasonLosses };
  });
}

function fcsStubUnionSql(): string {
  const rows = fcsStubWinLossRows();
  if (rows.length === 0) return "";
  const values = rows
    .map((r) => `('${r.slug.replace(/'/g, "''")}', ${r.win}::int, ${r.loss}::int)`)
    .join(",\n        ");
  return `
      union all
      select t.id, v.win, v.loss
      from (values
        ${values}
      ) as v(slug, win, loss)
      join teams t on t.slug = v.slug`;
}

/**
 * Left-join onto `teams t`. Every `games` row is the 2026 slate (no season col).
 * Mirrors `tallySeasonRecord` plus FINAL FCS stubs (`tallyFcsStubRecord`).
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
      ${fcsStubUnionSql()}
    ) outcomes
    group by team_id
  ) wl on wl.team_id = t.id
`;
