//#region node_modules/.nitro/vite/services/ssr/assets/chicago-BAye5qRT.js
/**
* HASHMARK Index — the user's validated preseason model (2026.2).
* Weights from power_rankings.py DEFAULT_WEIGHTS, walk-forward Top 25
* balanced ≈ 0.646. Talent and prior_rating carry the real signal.
* Matchup math is the Elo mapping from matchup.py (70.8% SU, 2019–2025).
* Spread is a quadratic on Elo gap, fit on 2019–2023 FBS MOV (holdout 2024–2025).
*/
var MODEL = {
	name: "HX Rating",
	version: "2026.2",
	season: 2026,
	week: 0,
	weekLabel: "Week 0 locked · next update after Week 1 Sunday",
	eloBase: 1500,
	eloScale: 55,
	homeFieldElo: 60,
	eloDenom: 400,
	/** Previous linear spread map (kept for display). */
	pointsPerElo: .0534,
	/** Quadratic MOV map: spread = a·d + b·d·|d| */
	spreadA: .050835,
	spreadB: 45795e-9,
	weights: {
		talent: 1.5,
		prior: 1.5,
		trend: 1,
		retention: .5,
		portal: .5
	}
};
function toElo(composite) {
	return MODEL.eloBase + MODEL.eloScale * composite;
}
/** Home-perspective spread (positive = home favored). Round separately. */
function spreadFromDiff(d) {
	return MODEL.spreadA * d + MODEL.spreadB * d * Math.abs(d);
}
function predictMatchup(home, away, opts) {
	const h = toElo(home.hxRating);
	const a = toElo(away.hxRating);
	const hfa = opts?.neutral ? 0 : MODEL.homeFieldElo;
	const diff = h - a + hfa;
	const homeWinPct = 1 / (1 + 10 ** (-diff / MODEL.eloDenom));
	const spread = spreadFromDiff(diff);
	const tempo = 51.4 + (home.offenseRating + away.offenseRating - home.defenseRating - away.defenseRating) * .12;
	const total = Math.max(38, Math.min(78, tempo));
	const homeScore = total / 2 + spread / 2;
	const awayScore = total / 2 - spread / 2;
	return {
		homeWinPct,
		awayWinPct: 1 - homeWinPct,
		spread: Math.round(spread * 10) / 10,
		total: Math.round(total * 10) / 10,
		homeScore: Math.max(6, Math.round(homeScore)),
		awayScore: Math.max(6, Math.round(awayScore)),
		edge: Math.round(diff * 10) / 10
	};
}
/** Signed z-scores that actually enter the composite. */
function modelShare(team) {
	return {
		talent: team.zTalent,
		prior: team.zPrior,
		trend: team.zTrend,
		retention: team.zRetention,
		portal: team.zPortal
	};
}
/** Civil-date helpers for the schedule board. Kick times display in Chicago. */
var CHICAGO_TZ = "America/Chicago";
function ymdInTimeZone(date, timeZone = CHICAGO_TZ) {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone,
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).format(date);
}
function todayChicago(now = /* @__PURE__ */ new Date()) {
	return ymdInTimeZone(now, CHICAGO_TZ);
}
function civilYmd(value) {
	return value.length >= 10 ? value.slice(0, 10) : value;
}
/**
* Visible slate day: America/Chicago civil date of kickoff_at.
* Never the UTC calendar date of the instant (Thu 19:00 CT = Fri 00:00 UTC).
*/
function kickoffCivilYmd(kickoffAt, fallbackYmd) {
	if (kickoffAt) {
		const when = new Date(kickoffAt);
		if (!Number.isNaN(when.getTime())) return ymdInTimeZone(when, CHICAGO_TZ);
	}
	return civilYmd(fallbackYmd);
}
function chicagoWeekday(iso) {
	return new Intl.DateTimeFormat("en-US", {
		timeZone: CHICAGO_TZ,
		weekday: "long"
	}).format(new Date(iso));
}
function formatChicagoTitle(ymd) {
	const [y, m, d] = civilYmd(ymd).split("-").map(Number);
	const probe = new Date(Date.UTC(y, m - 1, d, 17));
	return new Intl.DateTimeFormat("en-US", {
		timeZone: CHICAGO_TZ,
		weekday: "long",
		month: "short",
		day: "numeric"
	}).format(probe);
}
/** Weekday + calendar date of the kick, always America/Chicago. */
function formatKickDayTitle(kickoffAt, fallbackYmd) {
	if (kickoffAt) {
		const when = new Date(kickoffAt);
		if (!Number.isNaN(when.getTime())) return new Intl.DateTimeFormat("en-US", {
			timeZone: CHICAGO_TZ,
			weekday: "long",
			month: "short",
			day: "numeric"
		}).format(when);
	}
	if (fallbackYmd) return formatChicagoTitle(fallbackYmd);
	return "—";
}
function formatKickCt(iso) {
	if (!iso) return "—";
	const when = new Date(iso);
	if (Number.isNaN(when.getTime())) return "—";
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: CHICAGO_TZ,
		hour: "numeric",
		minute: "2-digit",
		hour12: true
	}).formatToParts(when);
	const hour = parts.find((p) => p.type === "hour")?.value;
	const minute = parts.find((p) => p.type === "minute")?.value;
	if (!hour || !minute) return "—";
	return `${hour}:${minute} CT`;
}
//#endregion
export { kickoffCivilYmd as a, todayChicago as c, formatKickDayTitle as i, chicagoWeekday as n, modelShare as o, formatKickCt as r, predictMatchup as s, MODEL as t };
