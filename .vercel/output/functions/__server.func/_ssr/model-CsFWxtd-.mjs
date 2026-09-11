import { t as MODEL } from "./chicago-ClRwnsKl.mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as Panel, w as PageHead } from "./router-S_s9RPrE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/model-CsFWxtd-.js
var import_jsx_runtime = require_jsx_runtime();
var WEIGHTS = [
	{
		key: "Recruiting talent",
		w: MODEL.weights.talent,
		note: "CFBD team talent composite (247 recruiting strength of the current roster). Real signal — ablation +0.052."
	},
	{
		key: "Prior-year rating",
		w: MODEL.weights.prior,
		note: "Blend of last season’s SP+, Elo, and SRS, each z-scored first. Real signal — ablation +0.037."
	},
	{
		key: "Recent win-trend",
		w: MODEL.weights.trend,
		note: "Weighted win% over the previous four seasons (0.4 / 0.3 / 0.2 / 0.1). Inside the noise band; kept at modest weight."
	},
	{
		key: "Roster retention",
		w: MODEL.weights.retention,
		note: "CFBD returning production (percent PPA + usage). Inside noise. Not the two-deep talent composite."
	},
	{
		key: "Portal net",
		w: MODEL.weights.portal,
		note: "Incoming transfer ratings minus outgoing, this offseason. Inside noise. Roster talent already counts who is actually on the two-deep."
	}
];
function ModelPage() {
	const wsum = Object.values(MODEL.weights).reduce((a, b) => a + b, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: `HX ${MODEL.version}`,
			title: "How the rating is built",
			lede: "HX is a preseason composite: each feature is z-scored across FBS, then weighted. Georgia opened 2026 at +7.89. A replacement-level Group of Five team sits near 0. Head-to-head uses Elo seeded from that composite."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Weights"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Walk-forward Top 25 balanced ≈ 0.646. Only talent and prior rating beat season-to-season noise. QB continuity, coach tenure, and SOS were tested and zeroed — they made the score worse. A separate Connelly-residual term moved ten new-HC ratings on this board. Tenure stays zeroed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-4",
					children: WEIGHTS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: row.key
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular text-muted",
								children: row.w.toFixed(1)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 h-1 overflow-hidden rounded-full bg-raised",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-accent",
								style: { width: `${row.w / wsum * 100}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-xs text-muted",
							children: row.note
						})
					] }, row.key))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Matchup engine"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: [
						"Each team starts at ",
						MODEL.eloBase,
						" + ",
						MODEL.eloScale,
						" × HX. Home-field is ",
						MODEL.homeFieldElo,
						" Elo points, dropped on a neutral floor. Win probability is the standard Elo logistic; spread is a quadratic on that same gap. Calibrated on 2019–2025 FBS games at 70.8% straight-up."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-4 overflow-x-auto whitespace-pre-wrap rounded-lg bg-inset p-4 font-mono text-xs leading-relaxed text-accent",
					children: `Elo     = ${MODEL.eloBase} + ${MODEL.eloScale} × HX
P(home) = 1 / (1 + 10^(−(EloΔ + HFA) / ${MODEL.eloDenom}))
d       = EloΔ + HFA
spread  = 0.050835 × d
        + 4.5795×10⁻⁵ × d × |d|`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: "The old linear map compressed blowouts; this curve was fit on 2019–2023 FBS actual MOV (holdout 2024–2025), not on this week’s Vegas."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-muted",
					children: [
						"Run any pair on the",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/matchup",
							className: "text-fg underline decoration-border underline-offset-4",
							children: "matchup board"
						}),
						"."
					]
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "2026 notes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-4 text-sm leading-relaxed text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The board is the full 136-team FBS set from the HASHMARK database — recruiting, portal, returning production, SP+/Elo/SRS, and 2026 rosters. Two-deeps are the listed TWO·DEEP charts for all 136 programs (thetwodeep.com, refreshed 2026-09-07). HX talent z-scores stay on the prior listed/projected mix until a talent recompute is cleared." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Indiana is fifth on the Week 1 AP ballot after a national title. HX has the Hoosiers eleventh. Talent composite is league-average; the model withholds credit when the roster does not match the résumé." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Georgia and Ohio State are 1–2 here. Week 1 AP has Ohio State first and Georgia second. HX keeps Georgia first because Georgia’s talent z-score is the strongest in the pool. Texas Tech’s résumé (prior +1.99) outruns its talent (+0.66), so the Red Raiders sit eighth in HX — above their Week 1 AP rank at 13th, short of a playoff lock on last year alone." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Offensive-line mass is on the talent Size board as a measurable. It is not a term in HX. The talent composite is the depth-weighted 247 of the two-deep, transfers included." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ten 2026 coach changes carry a Connelly residual on the rankings board (κ = −0.25, 15% OC bump). Ole Miss drops to 8th; Florida climbs to 24th; Virginia Tech to 49th. Week 0 matchup win% is frozen at the pre-move HX, including Hawaiʻi at Stanford (Hawaiʻi 53.8%, HAW −1.4)." })
				]
			})]
		})
	] });
}
//#endregion
export { ModelPage as component };
