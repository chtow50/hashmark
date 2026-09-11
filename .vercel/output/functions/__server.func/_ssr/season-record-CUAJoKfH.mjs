import { r as fcsStubIsFinal, t as FCS_STUB_GAMES } from "./fcs-stubs-DjDUCR2C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/season-record-CUAJoKfH.js
/** En-dash W–L for Board / Rankings / team hub. */
function formatSeasonRecord(wins, losses) {
	return `${wins}–${losses}`;
}
function outcome(teamScore, oppScore) {
	if (teamScore > oppScore) return {
		seasonWins: 1,
		seasonLosses: 0
	};
	if (teamScore < oppScore) return {
		seasonWins: 0,
		seasonLosses: 1
	};
	return {
		seasonWins: 0,
		seasonLosses: 0
	};
}
/** FINAL FCS stubs for one FBS slug. Scheduled stubs and missing scores do not count. */
function tallyFcsStubs(stubs) {
	let seasonWins = 0;
	let seasonLosses = 0;
	for (const s of stubs) {
		if (!fcsStubIsFinal(s)) continue;
		const row = outcome(s.home ? s.homeScore : s.awayScore, s.home ? s.awayScore : s.homeScore);
		seasonWins += row.seasonWins;
		seasonLosses += row.seasonLosses;
	}
	return {
		seasonWins,
		seasonLosses
	};
}
/** One win/loss row per FINAL FCS stub (joined to teams.slug in SQL). */
function fcsStubWinLossRows() {
	return FCS_STUB_GAMES.filter(fcsStubIsFinal).map((s) => {
		const rec = tallyFcsStubs([s]);
		return {
			slug: s.teamSlug,
			win: rec.seasonWins,
			loss: rec.seasonLosses
		};
	});
}
function fcsStubUnionSql() {
	const rows = fcsStubWinLossRows();
	if (rows.length === 0) return "";
	return `
      union all
      select t.id, v.win, v.loss
      from (values
        ${rows.map((r) => `('${r.slug.replace(/'/g, "''")}', ${r.win}::int, ${r.loss}::int)`).join(",\n        ")}
      ) as v(slug, win, loss)
      join teams t on t.slug = v.slug`;
}
/**
* Left-join onto `teams t`. Every `games` row is the 2026 slate (no season col).
* Mirrors `tallySeasonRecord` plus FINAL FCS stubs (`tallyFcsStubRecord`).
*/
var SEASON_RECORD_JOIN = `
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
//#endregion
export { formatSeasonRecord as n, SEASON_RECORD_JOIN as t };
