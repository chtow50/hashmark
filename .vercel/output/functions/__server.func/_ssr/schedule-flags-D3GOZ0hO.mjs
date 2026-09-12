import { b as spreadGap } from "./router-CrZqY1zT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schedule-flags-D3GOZ0hO.js
/** HX and Vegas pick opposite favorites (both off PK). */
function isWinnerFlip(pred, vegasSpread) {
	if (vegasSpread == null) return false;
	if (Math.abs(pred.spread) < .05 || Math.abs(vegasSpread) < .05) return false;
	return pred.spread > 0 !== vegasSpread > 0;
}
/** Slate flags for matchup / schedule rows — no invented lines. */
function matchupChips(pred, opts) {
	const chips = [];
	if (opts.neutral) chips.push({
		kind: "neutral",
		label: "Neutral",
		tone: "muted"
	});
	if (opts.status === "final") chips.push({
		kind: "final",
		label: "Final",
		tone: "accent"
	});
	if (isWinnerFlip(pred, opts.vegasSpread)) chips.push({
		kind: "winner_flip",
		label: "Winner flip",
		tone: "warn"
	});
	else if (opts.vegasSpread != null && spreadGap(pred.spread, opts.vegasSpread) != null) chips.push({
		kind: "spread_gap",
		label: "Spread gap",
		tone: "warn"
	});
	return chips;
}
//#endregion
export { matchupChips as n, isWinnerFlip as t };
