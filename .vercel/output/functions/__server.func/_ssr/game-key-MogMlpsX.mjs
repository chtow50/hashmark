//#region node_modules/.nitro/vite/services/ssr/assets/game-key-MogMlpsX.js
/** /games/<key> URLs: `<kickoff date>-<away slug>-at-<home slug>`, e.g. 2026-11-14-michigan-at-oregon. */
function gameKey(kickoffDate, away, home) {
	return `${kickoffDate.slice(0, 10)}-${away}-at-${home}`;
}
function parseGameKey(key) {
	const m = /^(\d{4}-\d{2}-\d{2})-([a-z0-9-]+?)-at-([a-z0-9-]+)$/.exec(key);
	return m ? {
		date: m[1],
		away: m[2],
		home: m[3]
	} : null;
}
/** Calendar date in America/Chicago for an ISO instant (CFBD start times are UTC). */
function chicagoDate(iso) {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: "America/Chicago",
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).format(new Date(iso));
}
//#endregion
export { gameKey as n, parseGameKey as r, chicagoDate as t };
