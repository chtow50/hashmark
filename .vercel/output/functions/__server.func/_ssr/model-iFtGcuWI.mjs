import { t as MODEL } from "./model-BWbC4Ztz.mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Panel, u as PageHead, y as fmtPct } from "./router-DJlRrram.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/model-iFtGcuWI.js
var import_jsx_runtime = require_jsx_runtime();
var WEIGHTS = [
	{
		key: "Prior season",
		w: MODEL.weights.prior,
		note: "Last year’s results and strength of schedule, decayed."
	},
	{
		key: "Returning production",
		w: MODEL.weights.returning,
		note: "Estimated snaps and usage back from 2025, portal-adjusted."
	},
	{
		key: "Roster talent",
		w: MODEL.weights.talent,
		note: "Weighted 247 of the listed two-deep, including portal transfers. Starters full weight, backups 0.4. Split on the talent board into HS vs portal and six units (QB, skill, OL, DL, LB, DB). Not the incoming HS class, and not OL mass."
	},
	{
		key: "Recruiting composite",
		w: MODEL.weights.recruiting,
		note: "247 composite for the incoming HS class only. Flip years on the recruiting board."
	},
	{
		key: "Offensive-line mass",
		w: MODEL.weights.olMass,
		note: "A small HX term (8%). Size is a feature of the rating, not the talent composite."
	},
	{
		key: "Special teams",
		w: MODEL.weights.special,
		note: "Coverage, return, and kicking unit continuity."
	}
];
function ModelPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: `HX ${MODEL.version}`,
			title: "How the rating is built",
			lede: "HX is a preseason power rating on an open scale. Ohio State opened 2026 at 34.82. A replacement-level Group of Five team sits near 7. Matchup math is a logistic on the rating gap."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "Weights"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-4",
				children: WEIGHTS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: row.key
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular text-muted",
							children: fmtPct(row.w * 100, 0)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1.5 h-1 overflow-hidden rounded-full bg-raised",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-accent",
							style: { width: `${row.w * 100}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs text-muted",
						children: row.note
					})
				] }, row.key))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Matchup engine"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: [
						"Home-field is a flat ",
						MODEL.homeField,
						" HX points, zeroed on a neutral floor. The spread is the edge times ",
						MODEL.pointsPerRating,
						" points per rating. Win probability is logistic with σ = ",
						MODEL.sigma,
						". Totals start from 51.4 and flex with the two offensive and defensive subunits."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-4 overflow-x-auto rounded-lg bg-inset p-4 font-mono text-xs leading-relaxed text-accent",
					children: `edge = HX_home − HX_away + home_field
P(home) = 1 / (1 + e^{−edge / σ})
spread  = edge × ${MODEL.pointsPerRating}`
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Two-deeps are the listed charts from TWO·DEEP — jersey, class, hometown, and measurables on every starter and backup. Roster talent is that two-deep’s composite rating, transfers included. Offensive-line mass is a separate 8% HX term and does not drive the talent board." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Indiana sits sixth in the AP after a national title. HX has the Hoosiers ninth. The model withholds credit when returning production collapses in the portal — a championship hangover is a feature, not a miss." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Alabama is 13th on the ballot and eighth here. The 2026 composite class ranked second nationally; roster talent remains a top-five unit. HX trusts the infrastructure more than last year’s record." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "USC posted the No. 1 composite class (42 commits, 310.67 points). That is not enough, by itself, to outrank a fully formed Ohio State or Georgia two-deep, so the Trojans open 13th — well ahead of their AP tie at 15th, short of a playoff lock." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "BYU’s AP ranking (14th) outruns the talent inputs. HX parks the Cougars 22nd until the roster grades catch the résumé." })
				]
			})]
		})
	] });
}
//#endregion
export { ModelPage as component };
