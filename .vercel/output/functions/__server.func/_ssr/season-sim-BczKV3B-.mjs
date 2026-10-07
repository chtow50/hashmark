import { g as SIM_10K_NOTE, y as simTeamBySlug } from "./router-C9dr0PeT.mjs";
import { i as fcsStubsForTeam, r as fcsStubIsFinal } from "./fcs-stubs-B-_G6ret.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/season-sim-BczKV3B-.js
function toScheduleRow(teamSlug, g) {
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
		game: g
	};
}
/** Map preseason playoff_odds (logistic make-field curve) until AMD draws land. */
function make12FromTeam(team) {
	const hasLegacy = Number.isFinite(team.playoffOdds);
	return {
		makeField: hasLegacy ? team.playoffOdds : null,
		winTitle: null,
		makeFieldSource: hasLegacy ? "legacy-playoff-odds" : "pending",
		winTitleSource: "pending"
	};
}
/**
* Map one HX 2026.7 10k-draw row to Make 12 odds. Falls back to the legacy
* logistic make-field if the row is missing. Never treat make_field as a title.
*
* Client code never passes `winTitle` — this module is bundled into the public
* JS, so it must not read any title field off a row. Only the server-only full
* loader (./sim-full.server.ts) supplies it. No title → "pack-only".
*/
function make12FromSimRow(row, team, winTitle = null) {
	if (row) {
		const hasTitle = winTitle != null && Number.isFinite(winTitle);
		return {
			makeField: row.make_field,
			winTitle: hasTitle ? winTitle : null,
			makeFieldSource: "amd-draws",
			winTitleSource: hasTitle ? "amd-draws" : "pack-only"
		};
	}
	return team ? make12FromTeam(team) : {
		makeField: null,
		winTitle: null,
		makeFieldSource: "pending",
		winTitleSource: "pending"
	};
}
/**
* Free-surface projection of Make 12: make-field stays public, win_title is
* Edge Pack / paid only (AMD + Research rule). The number is dropped, not hidden.
*/
function make12FreeView(odds) {
	return {
		makeField: odds.makeField,
		makeFieldSource: odds.makeFieldSource,
		winTitle: null,
		winTitleSource: odds.winTitleSource === "amd-draws" ? "pack-only" : odds.winTitleSource
	};
}
/**
* Free board / rankings / free team page Make 12 — reads the free sim export
* (data/sim_free_hx2026_7.json), which has no win_title at all, so nothing
* title-shaped can reach the client bundle. The full sim with win_title is
* server/test only: ./sim-full.server.ts (make12FromSimFull).
*/
function make12FreeFromSim(slug, team) {
	return make12FreeView(make12FromSimRow(simTeamBySlug(slug), team));
}
function toFcsStubRow(stub, i) {
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
		live: stub.live
	};
}
function buildRemainingSchedule(teamSlug, games) {
	const fbsRows = games.filter((g) => g.status !== "final").map((g) => toScheduleRow(teamSlug, g));
	const fcsRows = fcsStubsForTeam(teamSlug).filter((stub) => !fcsStubIsFinal(stub)).map((stub, i) => toFcsStubRow(stub, i));
	return [...fbsRows, ...fcsRows].sort((a, b) => {
		if (a.kickoffDate !== b.kickoffDate) return a.kickoffDate < b.kickoffDate ? -1 : 1;
		if (a.week !== b.week) return a.week - b.week;
		return a.opponentLabel.localeCompare(b.opponentLabel);
	});
}
/** Full FBS season slate for a team hub — played and unplayed. */
function buildSeasonSchedule(teamSlug, games) {
	return games.map((g) => toScheduleRow(teamSlug, g));
}
function make12FieldLabel(source) {
	if (source === "legacy-playoff-odds") return "Pre-AMD logistic estimate";
	if (source === "pending") return "Awaiting AMD draws";
	return `${SIM_10K_NOTE} · make-field, not title`;
}
function make12TitleLabel(source) {
	if (source === "pending") return "Awaiting AMD draws";
	if (source === "pack-only") return "Edge Pack only · make-field stays free";
	return SIM_10K_NOTE;
}
function make12PanelLede(source) {
	if (source === "amd-draws") return `Make-field is not a national title. ${SIM_10K_NOTE}.`;
	if (source === "legacy-playoff-odds") return "12-team CFP field odds — make-field and national-title paths are separate draws.";
	return "12-team CFP field odds — make-field and national-title paths are separate draws.";
}
//#endregion
export { make12FreeView as a, make12FreeFromSim as i, buildSeasonSchedule as n, make12PanelLede as o, make12FieldLabel as r, make12TitleLabel as s, buildRemainingSchedule as t };
