//#region node_modules/.nitro/vite/services/ssr/assets/model-BWbC4Ztz.js
/** Published HASHMARK Index (HX) specification, 2026.1 preseason. */
var MODEL = {
	name: "HX Rating",
	version: "2026.1",
	season: 2026,
	week: 0,
	weekLabel: "2026 Preseason",
	homeField: 2.4,
	sigma: 6.5,
	pointsPerRating: 1.42,
	weights: {
		prior: .28,
		returning: .24,
		talent: .2,
		recruiting: .16,
		olMass: .08,
		special: .04
	}
};
function predictMatchup(home, away, opts) {
	const hf = opts?.neutral ? 0 : MODEL.homeField;
	const edge = home.hxRating - away.hxRating + hf;
	const homeWinPct = 1 / (1 + Math.exp(-edge / MODEL.sigma));
	const spread = edge * MODEL.pointsPerRating;
	const tempo = 51.4 + (home.offenseRating + away.offenseRating - home.defenseRating - away.defenseRating) * .18;
	const total = Math.max(38, Math.min(72, tempo));
	const homeScore = total / 2 + spread / 2;
	const awayScore = total / 2 - spread / 2;
	return {
		homeWinPct,
		awayWinPct: 1 - homeWinPct,
		spread: Math.round(spread * 10) / 10,
		total: Math.round(total * 10) / 10,
		homeScore: Math.max(6, Math.round(homeScore)),
		awayScore: Math.max(6, Math.round(awayScore)),
		edge: Math.round(edge * 100) / 100
	};
}
function modelShare(team) {
	const recNorm = team.recPoints / 310;
	const talentNorm = team.talentScore / 100;
	const retNorm = team.returningProduction / 100;
	const priorNorm = (team.priorScore + 5) / 40;
	const olNorm = (team.olAvgWeightLbs - 300) / 30;
	const specNorm = team.specialRating / 20;
	const parts = {
		prior: MODEL.weights.prior * priorNorm,
		returning: MODEL.weights.returning * retNorm,
		talent: MODEL.weights.talent * talentNorm,
		recruiting: MODEL.weights.recruiting * recNorm,
		olMass: MODEL.weights.olMass * Math.max(0, olNorm),
		special: MODEL.weights.special * specNorm
	};
	const sum = Object.values(parts).reduce((a, b) => a + b, 0) || 1;
	return {
		prior: parts.prior / sum,
		returning: parts.returning / sum,
		talent: parts.talent / sum,
		recruiting: parts.recruiting / sum,
		olMass: parts.olMass / sum,
		special: parts.special / sum
	};
}
//#endregion
export { modelShare as n, predictMatchup as r, MODEL as t };
