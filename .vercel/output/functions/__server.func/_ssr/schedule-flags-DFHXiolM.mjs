import { V as isNotableSpreadGap } from "./router-n-y9EUiz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schedule-flags-DFHXiolM.js
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
	else if (opts.vegasSpread != null && isNotableSpreadGap(pred.spread, opts.vegasSpread)) chips.push({
		kind: "spread_gap",
		label: "Spread gap",
		tone: "warn"
	});
	return chips;
}
/**
* /schedule rows render matchupChips() and then their own Final chip for rows
* without an HX prediction (FCS Vegas-only). Only add it when matchupChips()
* did not already, so a FINAL row shows exactly one Final chip.
*/
function needsRowFinalChip(chips, status) {
	return status === "final" && !chips.some((c) => c.kind === "final");
}
//#endregion
export { matchupChips as n, needsRowFinalChip as r, isWinnerFlip as t };
