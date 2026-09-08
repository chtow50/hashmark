//#region node_modules/.nitro/vite/services/ssr/assets/season-record-Bop-q4Ke.js
function scheduled(teamSlug, week, kickoffDate) {
	return {
		teamSlug,
		week,
		kickoffDate,
		opponentLabel: "FCS opponent",
		home: true,
		status: "scheduled",
		homeScore: null,
		awayScore: null
	};
}
/** Research CFB vs ESPN overall — only this FINAL list. See data/fcs_finals_needed_for_wl_2026.json. */
function finalHome(teamSlug, week, kickoffDate, opponentLabel, homeScore, awayScore) {
	return {
		teamSlug,
		week,
		kickoffDate,
		opponentLabel,
		home: true,
		status: "final",
		homeScore,
		awayScore
	};
}
/** FBS vs FCS rows dropped from the 136-team games table. Unlisted Week 1 FCS stay scheduled stubs. */
var FCS_STUB_GAMES = [
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
	finalHome("virginia-tech", 1, "2026-09-05", "VMI", 73, 3)
];
function fcsStubIsFinal(stub) {
	return stub.status === "final" && stub.homeScore != null && stub.awayScore != null;
}
function fcsStubsForTeam(slug) {
	return FCS_STUB_GAMES.filter((g) => g.teamSlug === slug);
}
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
export { formatSeasonRecord as i, fcsStubIsFinal as n, fcsStubsForTeam as r, SEASON_RECORD_JOIN as t };
