import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Q as Panel, X as ConfPills, Z as PageHead, a as Route$5, at as fmtPct, et as TeamSelect, it as fmtNum, m as CompareRow, nt as cn, ot as inConf, rt as fmtHeight, v as MixBar, w as TeamMark } from "./router-DpZMmqM3.mjs";
import { c as TALENT_UNITS } from "./positions-C0zZnrTX.mjs";
import { i as sizeSortLabel, r as sizeLensFor, t as SIZE_GROUPS } from "./size-groups-BYECeJcY.mjs";
import { t as ShowMore } from "./show-more-BZUcJgPy.mjs";
import { t as TalentNav } from "./talent-nav-_bLSVw9b.mjs";
import { a as Scatter, c as Bar, d as Legend, i as XAxis, l as ResponsiveContainer, n as BarChart, o as CartesianGrid, r as YAxis, s as ReferenceLine, t as ScatterChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/talent-jxwohzAz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Weighted two-deep rating for high-school signees (non-transfers). */
function hasHsSlice(team) {
	return Number.isFinite(team.hsTalent) && team.hsTalent > 0;
}
/** Weighted two-deep rating for portal transfers on the roster. */
function hasPortalSlice(team) {
	return team.transferCount > 0 && Number.isFinite(team.portalTalent) && team.portalTalent > 0;
}
/** Portal share of two-deep weight (0–100). Hidden when no portal players. */
function hasPortalMix(team) {
	return hasPortalSlice(team) && Number.isFinite(team.portalShare) && team.portalShare > 0;
}
function TalentSliceStats({ team, className }) {
	const hs = hasHsSlice(team);
	const portal = hasPortalSlice(team);
	const mix = hasPortalMix(team);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] uppercase tracking-[0.12em] text-faint",
				children: "HS two-deep"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 font-display text-2xl tabular leading-none",
				children: hs ? fmtNum(team.hsTalent, 1) : "—"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] uppercase tracking-[0.12em] text-faint",
					children: "Portal two-deep"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 font-display text-2xl tabular leading-none",
					children: portal ? fmtNum(team.portalTalent, 1) : "—"
				}),
				portal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 text-xs text-muted",
					children: [team.transferCount, " transfers"]
				}) : null
			] })]
		}), mix ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MixBar, {
				leftPct: 100 - team.portalShare,
				leftLabel: "HS weight",
				rightLabel: "Portal weight"
			})
		}) : hs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-xs text-muted",
			children: "No portal players on the listed two-deep."
		}) : null]
	});
}
function TalentSliceMixCell({ team }) {
	if (!hasPortalMix(team)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-xs text-faint",
		children: "HS only"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-w-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MixBar, {
			leftPct: 100 - team.portalShare,
			leftLabel: "HS",
			rightLabel: "Portal"
		})
	});
}
function TalentSliceChart({ teams }) {
	const chart = teams.slice(0, 10).map((t) => ({
		name: t.shortName,
		hs: hasHsSlice(t) ? Number(t.hsTalent.toFixed(1)) : null,
		portal: hasPortalSlice(t) ? Number(t.portalTalent.toFixed(1)) : null
	}));
	const values = chart.flatMap((c) => [c.hs, c.portal]).filter((v) => v != null);
	if (values.length === 0) return null;
	const ymin = Math.max(70, Math.floor(Math.min(...values) - 2));
	const ymax = Math.min(100, Math.ceil(Math.max(...values) + 1));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-72",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data: chart,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 8
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-line)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "name",
						tick: {
							fill: "var(--color-muted)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false,
						interval: 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: {
							fill: "var(--color-faint)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false,
						domain: [ymin, ymax]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						contentStyle: {
							background: "var(--color-surface)",
							border: "1px solid var(--color-border)",
							borderRadius: 10,
							color: "var(--color-fg)"
						},
						formatter: (v, name) => [v == null ? "—" : `${v}`, name === "hs" ? "HS" : "Portal"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
						verticalAlign: "top",
						height: 28,
						formatter: (value) => value === "hs" ? "HS two-deep" : "Portal two-deep",
						wrapperStyle: {
							fontSize: 11,
							color: "var(--color-faint)",
							textTransform: "uppercase",
							letterSpacing: "0.12em"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "hs",
						name: "hs",
						fill: "var(--color-accent)",
						radius: [
							4,
							4,
							0,
							0
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "portal",
						name: "portal",
						fill: "var(--color-faint)",
						radius: [
							4,
							4,
							0,
							0
						]
					})
				]
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-1 text-xs text-muted",
		children: [
			"Top 10 by composite. The axis starts at ",
			ymin,
			", not 0, so small gaps look larger than they are."
		]
	})] });
}
function TalentSliceLeaders({ teams }) {
	const hsLeader = [...teams].filter(hasHsSlice).sort((a, b) => b.hsTalent - a.hsTalent)[0];
	const portalLeader = [...teams].filter(hasPortalSlice).sort((a, b) => b.portalTalent - a.portalTalent)[0];
	const mixLeader = [...teams].filter(hasPortalMix).sort((a, b) => b.portalShare - a.portalShare)[0];
	if (!hsLeader && !portalLeader) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 sm:grid-cols-3",
		children: [
			hsLeader ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg bg-raised/60 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] uppercase tracking-[0.12em] text-faint",
						children: "Top HS two-deep"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-2 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
							slug: hsLeader.slug,
							color: hsLeader.colorPrimary,
							logoSize: 18
						}), hsLeader.name]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-display text-3xl tabular",
						children: fmtNum(hsLeader.hsTalent, 1)
					})
				]
			}) : null,
			portalLeader ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg bg-raised/60 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] uppercase tracking-[0.12em] text-faint",
						children: "Top portal two-deep"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-2 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
							slug: portalLeader.slug,
							color: portalLeader.colorPrimary,
							logoSize: 18
						}), portalLeader.name]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-display text-3xl tabular",
						children: fmtNum(portalLeader.portalTalent, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 text-xs text-muted",
						children: [portalLeader.transferCount, " transfers"]
					})
				]
			}) : null,
			mixLeader ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg bg-raised/60 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] uppercase tracking-[0.12em] text-faint",
						children: "Heaviest portal mix"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-2 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
							slug: mixLeader.slug,
							color: mixLeader.colorPrimary,
							logoSize: 18
						}), mixLeader.name]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-display text-3xl tabular",
						children: fmtPct(mixLeader.portalShare, 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-xs text-muted",
						children: "portal weight on two-deep"
					})
				]
			}) : null
		]
	});
}
/**
* Talent vs HX vs results — side-by-side real numbers, never a second rating.
*
*  - Talent: 247Sports Team Talent Composite (whole roster), data/talent_247_2026.json
*    (CFBD /talent mirror). Ranked among HASHMARK's FBS teams.
*  - HX rank: the live board (rankings week 0 row, refit weekly).
*  - Record: stamped FINALs (season W-L on the board).
*  - Gap = talent rank − HX rank. Positive = HX has the team higher than its roster talent
*    ("playing above its talent"); negative = below. Pure arithmetic on the two ranks.
*/
var talentFile = {
	source: "247Sports Team Talent Composite",
	via: "CollegeFootballData.com /talent, pulled Nov 12, 2026",
	url: "https://247sports.com/season/2026-football/compositeteamtalent/",
	note: "Whole-roster 247 Composite talent points. Rank is among HASHMARK's FBS teams. Not HX and not the two-deep composite.",
	years: /* @__PURE__ */ JSON.parse("{\"2025\":[{\"slug\":\"georgia\",\"talent\":1002.98,\"rank\":1},{\"slug\":\"alabama\",\"talent\":993.55,\"rank\":2},{\"slug\":\"ohio-state\",\"talent\":973.69,\"rank\":3},{\"slug\":\"texas\",\"talent\":973.54,\"rank\":4},{\"slug\":\"oregon\",\"talent\":941.22,\"rank\":5},{\"slug\":\"lsu\",\"talent\":920.05,\"rank\":6},{\"slug\":\"clemson\",\"talent\":918.43,\"rank\":7},{\"slug\":\"texas-am\",\"talent\":917.29,\"rank\":8},{\"slug\":\"notre-dame\",\"talent\":912.11,\"rank\":9},{\"slug\":\"penn-state\",\"talent\":910.42,\"rank\":10},{\"slug\":\"michigan\",\"talent\":907.22,\"rank\":11},{\"slug\":\"florida\",\"talent\":898.58,\"rank\":12},{\"slug\":\"auburn\",\"talent\":891.84,\"rank\":13},{\"slug\":\"oklahoma\",\"talent\":882.59,\"rank\":14},{\"slug\":\"miami\",\"talent\":874.57,\"rank\":15},{\"slug\":\"tennessee\",\"talent\":866.57,\"rank\":16},{\"slug\":\"usc\",\"talent\":847.53,\"rank\":17},{\"slug\":\"south-carolina\",\"talent\":833.26,\"rank\":18},{\"slug\":\"florida-state\",\"talent\":828.45,\"rank\":19},{\"slug\":\"nebraska\",\"talent\":821.39,\"rank\":20},{\"slug\":\"ole-miss\",\"talent\":813.11,\"rank\":21},{\"slug\":\"missouri\",\"talent\":804.77,\"rank\":22},{\"slug\":\"arkansas\",\"talent\":772.64,\"rank\":23},{\"slug\":\"mississippi-state\",\"talent\":770.48,\"rank\":24},{\"slug\":\"smu\",\"talent\":766.67,\"rank\":25},{\"slug\":\"ucla\",\"talent\":766.62,\"rank\":26},{\"slug\":\"kentucky\",\"talent\":763.18,\"rank\":27},{\"slug\":\"wisconsin\",\"talent\":763.17,\"rank\":28},{\"slug\":\"texas-tech\",\"talent\":757.49,\"rank\":29},{\"slug\":\"colorado\",\"talent\":755.2,\"rank\":30},{\"slug\":\"north-carolina\",\"talent\":753.2,\"rank\":31},{\"slug\":\"tcu\",\"talent\":745.01,\"rank\":32},{\"slug\":\"arizona-state\",\"talent\":738.52,\"rank\":33},{\"slug\":\"syracuse\",\"talent\":727.83,\"rank\":34},{\"slug\":\"baylor\",\"talent\":726.3,\"rank\":35},{\"slug\":\"california\",\"talent\":726.21,\"rank\":36},{\"slug\":\"washington\",\"talent\":720.56,\"rank\":37},{\"slug\":\"michigan-state\",\"talent\":717.42,\"rank\":38},{\"slug\":\"georgia-tech\",\"talent\":715.56,\"rank\":39},{\"slug\":\"virginia-tech\",\"talent\":712.19,\"rank\":40},{\"slug\":\"minnesota\",\"talent\":711.04,\"rank\":41},{\"slug\":\"iowa\",\"talent\":710,\"rank\":42},{\"slug\":\"ucf\",\"talent\":709.99,\"rank\":43},{\"slug\":\"utah\",\"talent\":707.86,\"rank\":44},{\"slug\":\"nc-state\",\"talent\":707.51,\"rank\":45},{\"slug\":\"stanford\",\"talent\":707.27,\"rank\":46},{\"slug\":\"kansas-state\",\"talent\":705.85,\"rank\":47},{\"slug\":\"kansas\",\"talent\":705.32,\"rank\":48},{\"slug\":\"oklahoma-state\",\"talent\":702.74,\"rank\":49},{\"slug\":\"louisville\",\"talent\":700.77,\"rank\":50},{\"slug\":\"unlv\",\"talent\":700.54,\"rank\":51},{\"slug\":\"maryland\",\"talent\":699.31,\"rank\":52},{\"slug\":\"rutgers\",\"talent\":689.22,\"rank\":53},{\"slug\":\"purdue\",\"talent\":687.74,\"rank\":54},{\"slug\":\"vanderbilt\",\"talent\":685.42,\"rank\":55},{\"slug\":\"pittsburgh\",\"talent\":681.21,\"rank\":56},{\"slug\":\"northwestern\",\"talent\":677.97,\"rank\":57},{\"slug\":\"duke\",\"talent\":669.18,\"rank\":58},{\"slug\":\"memphis\",\"talent\":668.63,\"rank\":59},{\"slug\":\"oregon-state\",\"talent\":667.99,\"rank\":60},{\"slug\":\"usf\",\"talent\":666.89,\"rank\":61},{\"slug\":\"virginia\",\"talent\":666.74,\"rank\":62},{\"slug\":\"west-virginia\",\"talent\":662.33,\"rank\":63},{\"slug\":\"illinois\",\"talent\":662.13,\"rank\":64},{\"slug\":\"utsa\",\"talent\":662.09,\"rank\":65},{\"slug\":\"houston\",\"talent\":656.74,\"rank\":66},{\"slug\":\"arizona\",\"talent\":651.62,\"rank\":67},{\"slug\":\"tulane\",\"talent\":650.87,\"rank\":68},{\"slug\":\"boston-college\",\"talent\":650.12,\"rank\":69},{\"slug\":\"byu\",\"talent\":649.36,\"rank\":70},{\"slug\":\"iowa-state\",\"talent\":648.93,\"rank\":71},{\"slug\":\"indiana\",\"talent\":645.34,\"rank\":72},{\"slug\":\"cincinnati\",\"talent\":644.1,\"rank\":73},{\"slug\":\"wake-forest\",\"talent\":627.16,\"rank\":74},{\"slug\":\"toledo\",\"talent\":620.13,\"rank\":75},{\"slug\":\"texas-state\",\"talent\":612.16,\"rank\":76},{\"slug\":\"georgia-state\",\"talent\":611.97,\"rank\":77},{\"slug\":\"east-carolina\",\"talent\":611.55,\"rank\":78},{\"slug\":\"app-state\",\"talent\":611.31,\"rank\":79},{\"slug\":\"coastal-carolina\",\"talent\":610.88,\"rank\":80},{\"slug\":\"boise-state\",\"talent\":610.65,\"rank\":81},{\"slug\":\"florida-atlantic\",\"talent\":605.22,\"rank\":82},{\"slug\":\"southern-miss\",\"talent\":602.53,\"rank\":83},{\"slug\":\"liberty\",\"talent\":599.12,\"rank\":84},{\"slug\":\"tulsa\",\"talent\":594.78,\"rank\":85},{\"slug\":\"san-diego-state\",\"talent\":594.27,\"rank\":86},{\"slug\":\"miami-oh\",\"talent\":592.1,\"rank\":87},{\"slug\":\"arkansas-state\",\"talent\":591.27,\"rank\":88},{\"slug\":\"marshall\",\"talent\":590.64,\"rank\":89},{\"slug\":\"fresno-state\",\"talent\":586.84,\"rank\":90},{\"slug\":\"louisiana\",\"talent\":585.82,\"rank\":91},{\"slug\":\"colorado-state\",\"talent\":583.71,\"rank\":92},{\"slug\":\"georgia-southern\",\"talent\":574.48,\"rank\":93},{\"slug\":\"eastern-michigan\",\"talent\":572.9,\"rank\":94},{\"slug\":\"washington-state\",\"talent\":569.46,\"rank\":95},{\"slug\":\"north-texas\",\"talent\":569.15,\"rank\":96},{\"slug\":\"uconn\",\"talent\":568.12,\"rank\":97},{\"slug\":\"fiu\",\"talent\":562.61,\"rank\":98},{\"slug\":\"troy\",\"talent\":561.87,\"rank\":99},{\"slug\":\"western-kentucky\",\"talent\":561.36,\"rank\":100},{\"slug\":\"utep\",\"talent\":551.88,\"rank\":101},{\"slug\":\"south-alabama\",\"talent\":544.87,\"rank\":102},{\"slug\":\"uab\",\"talent\":540.93,\"rank\":103},{\"slug\":\"akron\",\"talent\":537.21,\"rank\":104},{\"slug\":\"western-michigan\",\"talent\":534.35,\"rank\":105},{\"slug\":\"rice\",\"talent\":530.06,\"rank\":106},{\"slug\":\"bowling-green\",\"talent\":527.31,\"rank\":107},{\"slug\":\"charlotte\",\"talent\":526.3,\"rank\":108},{\"slug\":\"san-jose-state\",\"talent\":522.91,\"rank\":109},{\"slug\":\"middle-tennessee\",\"talent\":520.55,\"rank\":110},{\"slug\":\"jacksonville-state\",\"talent\":519.93,\"rank\":111},{\"slug\":\"buffalo\",\"talent\":513.33,\"rank\":112},{\"slug\":\"temple\",\"talent\":507.91,\"rank\":113},{\"slug\":\"utah-state\",\"talent\":503.59,\"rank\":114},{\"slug\":\"ball-state\",\"talent\":495.35,\"rank\":115},{\"slug\":\"louisiana-tech\",\"talent\":493.5,\"rank\":116},{\"slug\":\"wyoming\",\"talent\":489.33,\"rank\":117},{\"slug\":\"massachusetts\",\"talent\":488.73,\"rank\":118},{\"slug\":\"nevada\",\"talent\":488.69,\"rank\":119},{\"slug\":\"hawaii\",\"talent\":481.2,\"rank\":120},{\"slug\":\"central-michigan\",\"talent\":481.16,\"rank\":121},{\"slug\":\"old-dominion\",\"talent\":477.45,\"rank\":122},{\"slug\":\"sam-houston\",\"talent\":477.35,\"rank\":123},{\"slug\":\"ul-monroe\",\"talent\":473.34,\"rank\":124},{\"slug\":\"northern-illinois\",\"talent\":471.01,\"rank\":125},{\"slug\":\"ohio\",\"talent\":469.99,\"rank\":126},{\"slug\":\"james-madison\",\"talent\":459.53,\"rank\":127},{\"slug\":\"kent-state\",\"talent\":456.24,\"rank\":128},{\"slug\":\"missouri-state\",\"talent\":426.1,\"rank\":129},{\"slug\":\"new-mexico-state\",\"talent\":402.9,\"rank\":130},{\"slug\":\"new-mexico\",\"talent\":378.8,\"rank\":131},{\"slug\":\"kennesaw-state\",\"talent\":338.87,\"rank\":132},{\"slug\":\"delaware\",\"talent\":242.85,\"rank\":133},{\"slug\":\"army\",\"talent\":23.66,\"rank\":134}],\"2026\":[{\"slug\":\"georgia\",\"talent\":1003.67,\"rank\":1},{\"slug\":\"texas\",\"talent\":985.17,\"rank\":2},{\"slug\":\"oregon\",\"talent\":984.33,\"rank\":3},{\"slug\":\"alabama\",\"talent\":973.53,\"rank\":4},{\"slug\":\"ohio-state\",\"talent\":964.27,\"rank\":5},{\"slug\":\"notre-dame\",\"talent\":953.03,\"rank\":6},{\"slug\":\"texas-am\",\"talent\":933,\"rank\":7},{\"slug\":\"lsu\",\"talent\":931.76,\"rank\":8},{\"slug\":\"usc\",\"talent\":899,\"rank\":9},{\"slug\":\"florida\",\"talent\":891.07,\"rank\":10},{\"slug\":\"michigan\",\"talent\":890.02,\"rank\":11},{\"slug\":\"miami\",\"talent\":885.94,\"rank\":12},{\"slug\":\"tennessee\",\"talent\":885.9,\"rank\":13},{\"slug\":\"ole-miss\",\"talent\":885.72,\"rank\":14},{\"slug\":\"south-carolina\",\"talent\":862.87,\"rank\":15},{\"slug\":\"clemson\",\"talent\":862.85,\"rank\":16},{\"slug\":\"oklahoma\",\"talent\":851.14,\"rank\":17},{\"slug\":\"auburn\",\"talent\":828.19,\"rank\":18},{\"slug\":\"missouri\",\"talent\":808.36,\"rank\":19},{\"slug\":\"mississippi-state\",\"talent\":804.53,\"rank\":20},{\"slug\":\"florida-state\",\"talent\":800.2,\"rank\":21},{\"slug\":\"nebraska\",\"talent\":787.45,\"rank\":22},{\"slug\":\"kentucky\",\"talent\":786.65,\"rank\":23},{\"slug\":\"washington\",\"talent\":777.63,\"rank\":24},{\"slug\":\"ucla\",\"talent\":774.45,\"rank\":25},{\"slug\":\"penn-state\",\"talent\":774.04,\"rank\":26},{\"slug\":\"virginia-tech\",\"talent\":769.12,\"rank\":27},{\"slug\":\"north-carolina\",\"talent\":767.89,\"rank\":28},{\"slug\":\"texas-tech\",\"talent\":767.89,\"rank\":28},{\"slug\":\"wisconsin\",\"talent\":767.68,\"rank\":30},{\"slug\":\"smu\",\"talent\":764.5,\"rank\":31},{\"slug\":\"nc-state\",\"talent\":757.14,\"rank\":32},{\"slug\":\"california\",\"talent\":751.92,\"rank\":33},{\"slug\":\"georgia-tech\",\"talent\":751.65,\"rank\":34},{\"slug\":\"syracuse\",\"talent\":745.61,\"rank\":35},{\"slug\":\"arkansas\",\"talent\":745.48,\"rank\":36},{\"slug\":\"louisville\",\"talent\":739.97,\"rank\":37},{\"slug\":\"indiana\",\"talent\":735.26,\"rank\":38},{\"slug\":\"colorado\",\"talent\":731.62,\"rank\":39},{\"slug\":\"tcu\",\"talent\":730.79,\"rank\":40},{\"slug\":\"minnesota\",\"talent\":728.79,\"rank\":41},{\"slug\":\"vanderbilt\",\"talent\":727.39,\"rank\":42},{\"slug\":\"baylor\",\"talent\":723.28,\"rank\":43},{\"slug\":\"iowa\",\"talent\":722.73,\"rank\":44},{\"slug\":\"arizona-state\",\"talent\":722,\"rank\":45},{\"slug\":\"maryland\",\"talent\":719.64,\"rank\":46},{\"slug\":\"kansas-state\",\"talent\":718.67,\"rank\":47},{\"slug\":\"rutgers\",\"talent\":709.04,\"rank\":48},{\"slug\":\"west-virginia\",\"talent\":707.6,\"rank\":49},{\"slug\":\"stanford\",\"talent\":705.81,\"rank\":50},{\"slug\":\"illinois\",\"talent\":704.01,\"rank\":51},{\"slug\":\"usf\",\"talent\":703.81,\"rank\":52},{\"slug\":\"virginia\",\"talent\":700.18,\"rank\":53},{\"slug\":\"arizona\",\"talent\":699.59,\"rank\":54},{\"slug\":\"purdue\",\"talent\":698.33,\"rank\":55},{\"slug\":\"unlv\",\"talent\":696.03,\"rank\":56},{\"slug\":\"houston\",\"talent\":695.93,\"rank\":57},{\"slug\":\"utah\",\"talent\":695.72,\"rank\":58},{\"slug\":\"byu\",\"talent\":689.42,\"rank\":59},{\"slug\":\"northwestern\",\"talent\":688.32,\"rank\":60},{\"slug\":\"michigan-state\",\"talent\":685.02,\"rank\":61},{\"slug\":\"kansas\",\"talent\":684.51,\"rank\":62},{\"slug\":\"wake-forest\",\"talent\":680.87,\"rank\":63},{\"slug\":\"pittsburgh\",\"talent\":675.02,\"rank\":64},{\"slug\":\"oklahoma-state\",\"talent\":672.69,\"rank\":65},{\"slug\":\"ucf\",\"talent\":672.14,\"rank\":66},{\"slug\":\"memphis\",\"talent\":670.31,\"rank\":67},{\"slug\":\"iowa-state\",\"talent\":669.55,\"rank\":68},{\"slug\":\"duke\",\"talent\":668.47,\"rank\":69},{\"slug\":\"tulane\",\"talent\":665.11,\"rank\":70},{\"slug\":\"boston-college\",\"talent\":660,\"rank\":71},{\"slug\":\"utsa\",\"talent\":655.82,\"rank\":72},{\"slug\":\"uconn\",\"talent\":652.56,\"rank\":73},{\"slug\":\"boise-state\",\"talent\":641.17,\"rank\":74},{\"slug\":\"colorado-state\",\"talent\":640.31,\"rank\":75},{\"slug\":\"oregon-state\",\"talent\":635.79,\"rank\":76},{\"slug\":\"cincinnati\",\"talent\":634.28,\"rank\":77},{\"slug\":\"georgia-southern\",\"talent\":634.19,\"rank\":78},{\"slug\":\"liberty\",\"talent\":633.35,\"rank\":79},{\"slug\":\"temple\",\"talent\":631.07,\"rank\":80},{\"slug\":\"washington-state\",\"talent\":630.29,\"rank\":81},{\"slug\":\"texas-state\",\"talent\":624.81,\"rank\":82},{\"slug\":\"east-carolina\",\"talent\":623.79,\"rank\":83},{\"slug\":\"tulsa\",\"talent\":622.84,\"rank\":84},{\"slug\":\"app-state\",\"talent\":621.61,\"rank\":85},{\"slug\":\"miami-oh\",\"talent\":621.37,\"rank\":86},{\"slug\":\"western-kentucky\",\"talent\":611.52,\"rank\":87},{\"slug\":\"fresno-state\",\"talent\":609.75,\"rank\":88},{\"slug\":\"san-diego-state\",\"talent\":609.22,\"rank\":89},{\"slug\":\"fiu\",\"talent\":607.56,\"rank\":90},{\"slug\":\"arkansas-state\",\"talent\":606.22,\"rank\":91},{\"slug\":\"uab\",\"talent\":606.18,\"rank\":92},{\"slug\":\"jacksonville-state\",\"talent\":602.83,\"rank\":93},{\"slug\":\"southern-miss\",\"talent\":602.63,\"rank\":94},{\"slug\":\"north-texas\",\"talent\":602.08,\"rank\":95},{\"slug\":\"troy\",\"talent\":596.19,\"rank\":96},{\"slug\":\"marshall\",\"talent\":594.71,\"rank\":97},{\"slug\":\"florida-atlantic\",\"talent\":593.36,\"rank\":98},{\"slug\":\"louisiana\",\"talent\":590.94,\"rank\":99},{\"slug\":\"rice\",\"talent\":589.89,\"rank\":100},{\"slug\":\"james-madison\",\"talent\":588.31,\"rank\":101},{\"slug\":\"utep\",\"talent\":585.76,\"rank\":102},{\"slug\":\"eastern-michigan\",\"talent\":580.64,\"rank\":103},{\"slug\":\"charlotte\",\"talent\":576.77,\"rank\":104},{\"slug\":\"coastal-carolina\",\"talent\":573.96,\"rank\":105},{\"slug\":\"georgia-state\",\"talent\":573.83,\"rank\":106},{\"slug\":\"south-alabama\",\"talent\":573.38,\"rank\":107},{\"slug\":\"western-michigan\",\"talent\":572.2,\"rank\":108},{\"slug\":\"middle-tennessee\",\"talent\":571.5,\"rank\":109},{\"slug\":\"san-jose-state\",\"talent\":569.25,\"rank\":110},{\"slug\":\"bowling-green\",\"talent\":568.33,\"rank\":111},{\"slug\":\"new-mexico\",\"talent\":568.19,\"rank\":112},{\"slug\":\"ball-state\",\"talent\":563.88,\"rank\":113},{\"slug\":\"sacramento-state\",\"talent\":561.42,\"rank\":114},{\"slug\":\"hawaii\",\"talent\":556.82,\"rank\":115},{\"slug\":\"toledo\",\"talent\":556.26,\"rank\":116},{\"slug\":\"sam-houston\",\"talent\":554.47,\"rank\":117},{\"slug\":\"nevada\",\"talent\":549.99,\"rank\":118},{\"slug\":\"missouri-state\",\"talent\":549.92,\"rank\":119},{\"slug\":\"buffalo\",\"talent\":549.31,\"rank\":120},{\"slug\":\"akron\",\"talent\":546.84,\"rank\":121},{\"slug\":\"old-dominion\",\"talent\":544.25,\"rank\":122},{\"slug\":\"utah-state\",\"talent\":543.98,\"rank\":123},{\"slug\":\"louisiana-tech\",\"talent\":543.02,\"rank\":124},{\"slug\":\"central-michigan\",\"talent\":540.01,\"rank\":125},{\"slug\":\"northern-illinois\",\"talent\":536.58,\"rank\":126},{\"slug\":\"wyoming\",\"talent\":528.29,\"rank\":127},{\"slug\":\"massachusetts\",\"talent\":525.94,\"rank\":128},{\"slug\":\"ohio\",\"talent\":522.84,\"rank\":129},{\"slug\":\"kent-state\",\"talent\":522.83,\"rank\":130},{\"slug\":\"north-dakota-state\",\"talent\":515.59,\"rank\":131},{\"slug\":\"ul-monroe\",\"talent\":505.49,\"rank\":132},{\"slug\":\"kennesaw-state\",\"talent\":502.86,\"rank\":133},{\"slug\":\"delaware\",\"talent\":483.48,\"rank\":134},{\"slug\":\"new-mexico-state\",\"talent\":460.38,\"rank\":135},{\"slug\":\"army\",\"talent\":303.83,\"rank\":136},{\"slug\":\"air-force\",\"talent\":272.35,\"rank\":137},{\"slug\":\"navy\",\"talent\":195.68,\"rank\":138}]}")
};
var TALENT_247_SOURCE = {
	label: talentFile.source,
	via: talentFile.via,
	url: talentFile.url
};
var t26 = new Map(talentFile.years["2026"].map((r) => [r.slug, r]));
var t25 = new Map((talentFile.years["2025"] ?? []).map((r) => [r.slug, r]));
function talent247(slug) {
	const r = t26.get(slug);
	if (!r) return null;
	return {
		talent: r.talent,
		rank: r.rank,
		prevRank: t25.get(slug)?.rank ?? null
	};
}
function buildTalentResults(teams) {
	const out = [];
	for (const t of teams) {
		const tal = talent247(t.slug);
		if (!tal || !Number.isFinite(t.hxRank) || t.hxRank <= 0) continue;
		const gp = t.seasonWins + t.seasonLosses;
		out.push({
			...t,
			talent: tal.talent,
			talentRank: tal.rank,
			prevTalentRank: tal.prevRank,
			winPct: gp > 0 ? t.seasonWins / gp : null,
			gap: tal.rank - t.hxRank
		});
	}
	return out.sort((a, b) => a.talentRank - b.talentRank || a.hxRank - b.hxRank);
}
/** Average ranks (ties share the mean rank), 1 = largest when `desc`. */
function avgRanks(values, desc) {
	const idx = values.map((v, i) => [v, i]).sort((a, b) => desc ? b[0] - a[0] : a[0] - b[0]);
	const ranks = new Array(values.length);
	let i = 0;
	while (i < idx.length) {
		let j = i;
		while (j + 1 < idx.length && idx[j + 1][0] === idx[i][0]) j++;
		const r = (i + j) / 2 + 1;
		for (let k = i; k <= j; k++) ranks[idx[k][1]] = r;
		i = j + 1;
	}
	return ranks;
}
function pearson(x, y) {
	const n = x.length;
	const mx = x.reduce((s, v) => s + v, 0) / n;
	const my = y.reduce((s, v) => s + v, 0) / n;
	let sxy = 0;
	let sxx = 0;
	let syy = 0;
	for (let i = 0; i < n; i++) {
		sxy += (x[i] - mx) * (y[i] - my);
		sxx += (x[i] - mx) ** 2;
		syy += (y[i] - my) ** 2;
	}
	return sxx === 0 || syy === 0 ? 0 : sxy / Math.sqrt(sxx * syy);
}
/** Spearman rank correlation (tie-corrected via average ranks). Higher x and higher y = positive. */
function spearman(x, y) {
	if (x.length !== y.length || x.length < 3) return NaN;
	return pearson(avgRanks(x, true), avgRanks(y, true));
}
function summarizeTalentResults(rows, k = 8) {
	const withWin = rows.filter((r) => r.winPct != null);
	const byGap = [...rows].sort((a, b) => b.gap - a.gap || a.hxRank - b.hxRank);
	return {
		n: rows.length,
		rhoHx: spearman(rows.map((r) => r.talent), rows.map((r) => -r.hxRank)),
		rhoWin: spearman(withWin.map((r) => r.talent), withWin.map((r) => r.winPct)),
		above: byGap.slice(0, k).filter((r) => r.gap > 0),
		below: [...byGap].reverse().slice(0, k).filter((r) => r.gap < 0)
	};
}
var fmtRho = (r) => Number.isFinite(r) ? r.toFixed(2) : "—";
var record = (t) => `${t.seasonWins}-${t.seasonLosses}`;
function Gap({ gap, className }) {
	if (gap === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("tabular text-faint", className),
		children: "even"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("tabular", gap > 0 ? "text-up" : "text-down", className),
		children: gap > 0 ? `+${gap}` : `−${Math.abs(gap)}`
	});
}
function MiniList({ title, rows, empty }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-faint",
		children: title
	}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: empty
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "space-y-1",
		children: rows.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/teams/$slug",
			params: { slug: t.slug },
			className: "flex min-h-11 items-center justify-between gap-3 rounded-lg px-2 hover:bg-raised",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex min-w-0 items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
						slug: t.slug,
						color: t.colorPrimary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: t.shortName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-xs tabular text-muted",
						children: record(t)
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "shrink-0 text-xs tabular text-muted",
				children: [
					"talent ",
					t.talentRank,
					" · HX ",
					t.hxRank,
					" ·",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gap, {
						gap: t.gap,
						className: "font-medium"
					})
				]
			})]
		}) }, t.slug))
	})] });
}
/** Small summary on the default roster board. */
function TalentResultsTeaser({ summary }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "mb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Talent vs results"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/talent",
					search: { board: "results" },
					className: "text-sm text-fg underline decoration-border underline-offset-4",
					children: [
						"All ",
						summary.n,
						" teams →"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: [
					"Roster talent and HX rank line up at ρ = ",
					fmtRho(summary.rhoHx),
					" across FBS (Spearman; 1 = same order). Gap = 247 talent rank − HX rank."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-5 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniList, {
					title: "Most above their talent",
					rows: summary.above.slice(0, 3),
					empty: "None."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniList, {
					title: "Most below their talent",
					rows: summary.below.slice(0, 3),
					empty: "None."
				})]
			})
		]
	});
}
function ResultsBoard({ rows, summary, conf }) {
	const local = (0, import_react.useMemo)(() => summarizeTalentResults(rows), [rows]);
	const [sort, setSort] = (0, import_react.useState)("gap");
	const sorted = (0, import_react.useMemo)(() => {
		const out = [...rows];
		if (sort === "gap") out.sort((a, b) => b.gap - a.gap || a.hxRank - b.hxRank);
		else if (sort === "winPct") out.sort((a, b) => (b.winPct ?? -1) - (a.winPct ?? -1) || a.hxRank - b.hxRank);
		else out.sort((a, b) => a[sort] - b[sort]);
		return out;
	}, [rows, sort]);
	const points = rows.map((t) => ({
		x: t.talentRank,
		y: t.hxRank,
		name: t.shortName,
		gap: t.gap,
		rec: record(t)
	}));
	const maxRank = Math.max(138, ...rows.map((t) => Math.max(t.talentRank, t.hxRank)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid grid-cols-3 gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Talent vs HX",
					value: fmtRho(summary.rhoHx),
					sub: "Spearman ρ, all FBS"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Talent vs win %",
					value: fmtRho(summary.rhoWin),
					sub: "Spearman ρ, all FBS"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Teams",
					value: String(summary.n),
					sub: "every FBS team"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfPills, {
			value: conf,
			to: "/talent",
			searchFor: (c) => ({
				board: "results",
				...c === "All" ? {} : { conf: c }
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniList, {
					title: conf === "All" ? "Playing above their talent" : `Above their talent · ${conf}`,
					rows: local.above,
					empty: "No team in this group has HX ahead of its talent rank."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniList, {
					title: conf === "All" ? "Playing below their talent" : `Below their talent · ${conf}`,
					rows: local.below,
					empty: "No team in this group has HX behind its talent rank."
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Talent rank vs HX rank"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Each dot is a team. On the line, HX ranks a team exactly where its roster talent does; above the line, HX has it higher than its talent."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 h-80 sm:h-96",
					role: "img",
					"aria-label": "Scatter of 247 talent rank against HX rank",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScatterChart, {
							margin: {
								top: 8,
								right: 12,
								bottom: 24,
								left: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { stroke: "var(--color-line)" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									type: "number",
									dataKey: "x",
									name: "Talent rank",
									domain: [1, maxRank],
									ticks: [
										1,
										25,
										50,
										75,
										100,
										125
									],
									tick: {
										fill: "var(--color-faint)",
										fontSize: 11
									},
									label: {
										value: "247 talent rank",
										position: "insideBottom",
										offset: -12,
										fill: "var(--color-muted)",
										fontSize: 11
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									type: "number",
									dataKey: "y",
									name: "HX rank",
									reversed: true,
									domain: [1, maxRank],
									ticks: [
										1,
										25,
										50,
										75,
										100,
										125
									],
									width: 36,
									tick: {
										fill: "var(--color-faint)",
										fontSize: 11
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
									segment: [{
										x: 1,
										y: 1
									}, {
										x: maxRank,
										y: maxRank
									}],
									stroke: "var(--color-border)",
									strokeDasharray: "4 4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									cursor: false,
									content: ({ payload }) => {
										const d = payload?.[0]?.payload;
										if (!d) return null;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg bg-surface px-3 py-2 text-xs shadow-[var(--shadow-border)]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-medium text-fg",
												children: [
													d.name,
													" · ",
													d.rec
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "tabular text-muted",
												children: [
													"talent ",
													d.x,
													" · HX ",
													d.y,
													" · gap ",
													d.gap > 0 ? `+${d.gap}` : d.gap
												]
											})]
										});
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scatter, {
									data: points.filter((p) => p.gap >= 0),
									fill: "var(--color-accent)",
									fillOpacity: .85
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scatter, {
									data: points.filter((p) => p.gap < 0),
									fill: "var(--color-muted)",
									fillOpacity: .7
								})
							]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-faint",
					children: "Y axis: HX rank, No. 1 at the top. Light dots: at or above talent; gray: below."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-3 flex gap-2 overflow-x-auto pb-1",
			role: "group",
			"aria-label": "Sort",
			children: [
				["gap", "Gap"],
				["talentRank", "Talent"],
				["hxRank", "HX"],
				["winPct", "Win %"]
			].map(([k, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setSort(k),
				"aria-pressed": sort === k,
				className: cn("h-11 shrink-0 rounded-full px-4 text-sm transition-colors duration-150", sort === k ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
				children: ["Sort: ", label]
			}, k))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 sm:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShowMore, {
				items: sorted,
				noun: "teams",
				resetKey: `${sort}-${conf}`,
				className: "space-y-2",
				render: (t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/teams/$slug",
					params: { slug: t.slug },
					className: "block rounded-xl bg-surface p-3 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex min-w-0 items-center gap-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
									slug: t.slug,
									color: t.colorPrimary
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate font-medium",
									children: t.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 text-xs tabular text-muted",
									children: record(t)
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gap, {
							gap: t.gap,
							className: "shrink-0 font-display text-lg"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 grid grid-cols-3 gap-1 text-center text-xs tabular",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
								label: "Talent rk",
								value: String(t.talentRank)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
								label: "HX rk",
								value: String(t.hxRank)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
								label: "247 pts",
								value: fmtNum(t.talent, 1)
							})
						]
					})]
				}, t.slug)
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "mb-6 hidden overflow-hidden p-0 sm:block sm:p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-3xl text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Team"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "247 talent"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Talent rk"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								title: "2025 247 team talent rank",
								children: "2025 rk"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "HX rk"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Record"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								title: "Talent rank − HX rank",
								children: "Gap"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: sorted.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line last:border-0 hover:bg-raised/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/teams/$slug",
									params: { slug: t.slug },
									className: "flex min-h-11 items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
										slug: t.slug,
										color: t.colorPrimary,
										logoSize: 20
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-medium",
										children: t.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted",
										children: t.conference
									})] })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 tabular",
								children: fmtNum(t.talent, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 tabular",
								children: t.talentRank
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 tabular text-muted",
								children: t.prevTalentRank ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 tabular",
								children: t.hxRank
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 tabular",
								children: record(t)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gap, {
									gap: t.gap,
									className: "font-medium"
								})
							})
						]
					}, t.slug)) })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "How to read this"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 space-y-2 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: "247 talent"
						}),
						" is the",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: TALENT_247_SOURCE.url,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "underline hover:text-fg",
							children: TALENT_247_SOURCE.label
						}),
						" ",
						"for 2026: the whole roster's 247 Composite ratings, transfers included (",
						TALENT_247_SOURCE.via,
						"). Rank is among HASHMARK's FBS teams. It is not the two-deep composite on the roster board."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "HX rank"
					}), " is the live board, refit weekly on stamped FINALs. Record is the stamped season W-L."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "Gap"
					}), " = talent rank − HX rank. +20 means HX has the team 20 spots higher than its roster talent. It is a difference of two ranks, not a rating, and it does not feed HX."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "ρ"
					}), " is the Spearman rank correlation: 1 means the two lists are in the same order, 0 means no relationship."] })
				]
			})]
		})
	] });
}
function Stat({ label, value, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface px-3 py-3 shadow-[var(--shadow-border)] sm:px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-mono text-[10px] uppercase tracking-[0.14em] text-faint sm:text-[11px]",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 font-display text-2xl tabular sm:text-3xl",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-0.5 text-xs text-muted",
				children: sub
			})
		]
	});
}
function Cell({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "rounded bg-raised px-1 py-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-[10px] text-faint",
			children: label
		}), value]
	});
}
var LENSES = [
	{
		key: "talentScore",
		label: "Composite"
	},
	{
		key: "hsTalent",
		label: "HS"
	},
	{
		key: "portalTalent",
		label: "Portal"
	},
	{
		key: "starterTalent",
		label: "Starters"
	},
	{
		key: "offTalent",
		label: "Offense"
	},
	{
		key: "defTalent",
		label: "Defense"
	}
];
function TalentPage() {
	const allTeams = Route$5.useLoaderData();
	const teams = (0, import_react.useMemo)(() => allTeams.filter((t) => t.hasProfile !== false), [allTeams]);
	const board = Route$5.useSearch().board ?? "composite";
	const conf = Route$5.useSearch().conf ?? "All";
	const [a, setA] = (0, import_react.useState)("ohio-state");
	const [b, setB] = (0, import_react.useState)("georgia");
	const [lens, setLens] = (0, import_react.useState)("talentScore");
	const [sizeGroup, setSizeGroup] = (0, import_react.useState)("OL");
	const [sizeMetric, setSizeMetric] = (0, import_react.useState)("weight");
	const sizeLens = sizeLensFor(sizeGroup, sizeMetric);
	const left = teams.find((t) => t.slug === a);
	const right = teams.find((t) => t.slug === b);
	const pool = (0, import_react.useMemo)(() => teams.filter((t) => inConf(t.conference, conf)), [teams, conf]);
	const ranked = (0, import_react.useMemo)(() => [...pool].sort((x, y) => y[lens] - x[lens] || x.talentRank - y.talentRank), [pool, lens]);
	const results = (0, import_react.useMemo)(() => buildTalentResults(allTeams), [allTeams]);
	const summary = (0, import_react.useMemo)(() => summarizeTalentResults(results), [results]);
	const resultsPool = (0, import_react.useMemo)(() => results.filter((t) => inConf(t.conference, conf)), [results, conf]);
	const sizeRanked = (0, import_react.useMemo)(() => [...pool].sort((x, y) => y[sizeLens] - x[sizeLens] || x.talentRank - y.talentRank), [pool, sizeLens]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: board === "results" ? "Talent vs results" : board === "size" ? "Measurables" : "Two-deep composite",
			title: board === "results" ? "Talent vs results" : board === "size" ? "Roster size" : "Roster talent",
			lede: board === "results" ? "Which programs are playing above or below their roster? 247 team talent next to the HX rank and the record. Nothing here is blended into HX." : board === "size" ? "Average height and weight by position group on the listed two-deep. Size is a measurable, not talent and not HX." : "Who is on the roster now: high-school signees plus portal transfers, weighted by the listed two-deep (starters full weight, backups 0.4)."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentNav, { active: board === "results" ? "results" : board === "size" ? "size" : "roster" }),
		board === "results" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultsBoard, {
			rows: resultsPool,
			summary,
			conf
		}) : board === "composite" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompositeBoard, {
			ranked,
			left,
			right,
			a,
			b,
			teams,
			setA,
			setB,
			conf,
			lens,
			setLens,
			summary
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SizeBoard, {
			ranked: sizeRanked,
			left,
			right,
			a,
			b,
			teams,
			setA,
			setB,
			conf,
			sizeGroup,
			setSizeGroup,
			sizeMetric,
			setSizeMetric,
			sizeLens
		})
	] });
}
function CompositeBoard({ ranked, left, right, a, b, teams, setA, setB, conf, lens, setLens, summary }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentResultsTeaser, { summary }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfPills, {
			value: conf,
			to: "/talent",
			searchFor: (c) => c === "All" ? {} : { conf: c }
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 flex gap-2 overflow-x-auto pb-1",
			children: LENSES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setLens(c.key),
				className: cn("h-11 shrink-0 rounded-full px-4 text-sm transition-colors duration-150", lens === c.key ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
				children: c.label
			}, c.key))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 text-sm text-muted",
			children: [
				"Ranking by ",
				LENSES.find((l) => l.key === lens)?.label ?? "composite",
				". Offensive line lives on Size — measurables, not this sort."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 sm:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShowMore, {
				items: ranked,
				noun: "teams",
				resetKey: lens,
				className: "space-y-3",
				render: (t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentCard, {
					team: t,
					place: i + 1,
					lens
				}, t.slug)
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "mb-6 hidden overflow-hidden p-0 sm:block sm:p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-4xl text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Rk"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Team"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Composite"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "HS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Portal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Mix"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Off"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Def"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Blue"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Units"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ranked.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line last:border-0 hover:bg-raised/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 tabular",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/teams/$slug",
									params: { slug: t.slug },
									className: "flex min-h-11 items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
										slug: t.slug,
										color: t.colorPrimary,
										logoSize: 20
									}), t.name]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtNum(t.talentScore, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtNum(t.hsTalent, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: hasPortalSlice(t) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [fmtNum(t.portalTalent, 1), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 text-xs text-muted",
									children: t.transferCount
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-faint",
									children: "—"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentSliceMixCell, { team: t })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular text-muted",
								children: fmtNum(t.offTalent, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular text-muted",
								children: fmtNum(t.defTalent, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtPct(t.blueChipPct, 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 text-xs tabular text-muted",
								children: TALENT_UNITS.map((u) => `${u.label} ${fmtNum(t[u.key], 0)}`).join(" · ")
							})
						]
					}, t.slug)) })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Compare two rosters"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSelect, {
						id: "talent-a",
						label: "Team A",
						value: a,
						teams,
						onChange: setA
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSelect, {
						id: "talent-b",
						label: "Team B",
						value: b,
						teams,
						onChange: setB
					})]
				}),
				left && right ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-[11px] uppercase tracking-[0.12em] text-faint",
							children: "HS vs portal slices"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "HS two-deep",
							a: left.hsTalent,
							b: right.hsTalent,
							max: 100,
							format: (n) => fmtNum(n, 1)
						}),
						hasPortalSlice(left) || hasPortalSlice(right) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Portal two-deep",
							a: left.portalTalent,
							b: right.portalTalent,
							max: 100,
							format: (n) => fmtNum(n, 1)
						}) : null,
						hasPortalMix(left) || hasPortalMix(right) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Portal weight",
							a: left.portalShare,
							b: right.portalShare,
							max: 100,
							format: (n) => fmtPct(n, 0)
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Talent composite",
							a: left.talentScore,
							b: right.talentScore,
							max: 100,
							format: (n) => fmtNum(n, 1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Starter talent",
							a: left.starterTalent,
							b: right.starterTalent,
							max: 100,
							format: (n) => fmtNum(n, 1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Offense",
							a: left.offTalent,
							b: right.offTalent,
							max: 100,
							format: (n) => fmtNum(n, 1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Defense",
							a: left.defTalent,
							b: right.defTalent,
							max: 100,
							format: (n) => fmtNum(n, 1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Blue-chip %",
							a: left.blueChipPct,
							b: right.blueChipPct,
							max: 100,
							format: (n) => fmtPct(n, 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-[11px] uppercase tracking-[0.12em] text-faint",
							children: "Unit slices — not the ranking"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1",
							children: TALENT_UNITS.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
								label: u.label,
								a: left[u.key],
								b: right[u.key],
								max: 100,
								format: (n) => fmtNum(n, 1)
							}, u.key))
						})
					]
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "High school vs portal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Separate weighted 247 ratings on the listed two-deep — HS signees vs portal transfers — plus portal weight share. Sourced from roster players (transfer flag) and TWO·DEEP depth weights."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentSliceLeaders, { teams: ranked })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentSliceChart, { teams: ranked })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "How the composite is built"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-4 grid gap-3 text-sm text-muted sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium text-fg",
						children: "The two-deep"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: "Listed TWO·DEEP charts from thetwodeep.com (2026-09-07) for 136 programs. North Dakota State and Sacramento State moved up to FBS after that and have no two-deep yet. 247 composite, transfers included."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium text-fg",
						children: "Transfers count"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: "A portal player is talent on this roster, not a hole in last year’s class."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium text-fg",
						children: "OL is not this board"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1",
						children: [
							"Line size is a measurable, not an HX term. Open",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/talent",
								search: { board: "size" },
								className: "text-fg underline decoration-border underline-offset-4",
								children: "Size"
							}),
							" ",
							"for mass. Units below are slices, not the ranking."
						]
					})] })
				]
			})]
		})
	] });
}
function SizeBoard({ ranked, left, right, a, b, teams, setA, setB, conf, sizeGroup, setSizeGroup, sizeMetric, setSizeMetric, sizeLens }) {
	const chart = ranked.slice(0, 12).map((t) => ({
		name: t.shortName,
		ol: Math.round(t.olAvgWeightLbs)
	}));
	function formatSize(team, key) {
		if (key.endsWith("HeightIn")) return fmtHeight(team[key]);
		return `${fmtNum(team[key], 0)} lb`;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "Measurables by position group"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: [
					"Average height and weight on the listed two-deep for QB, skill, OL, DL, LB, and DB. This board is separate from the talent composite — open",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/talent",
						search: { conf: conf === "All" ? void 0 : conf },
						className: "text-fg underline decoration-border underline-offset-4",
						children: "Composite"
					}),
					" ",
					"for roster ratings."
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Compare two teams"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSelect, {
						id: "size-a",
						label: "Team A",
						value: a,
						teams,
						onChange: setA
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSelect, {
						id: "size-b",
						label: "Team B",
						value: b,
						teams,
						onChange: setB
					})]
				}),
				left && right ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [SIZE_GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-line last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: `${g.label} weight`,
							a: left[g.weightKey],
							b: right[g.weightKey],
							max: 360,
							format: (n) => `${fmtNum(n, 0)} lb`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: `${g.label} height`,
							a: left[g.heightKey],
							b: right[g.heightKey],
							max: 84,
							format: (n) => fmtHeight(n)
						})]
					}, g.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 border-t border-line pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Roster weight",
							a: left.avgWeightLbs,
							b: right.avgWeightLbs,
							max: 280,
							format: (n) => `${fmtNum(n, 0)} lb`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Talent composite",
							a: left.talentScore,
							b: right.talentScore,
							max: 100,
							format: (n) => fmtNum(n, 1)
						})]
					})]
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-1 font-display text-2xl tracking-wide",
					children: "Heaviest offensive lines"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-sm text-muted",
					children: "Average OL weight on the two-deep."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-64",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: chart,
							margin: {
								top: 8,
								right: 8,
								left: 0,
								bottom: 8
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "var(--color-line)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "name",
									tick: {
										fill: "var(--color-muted)",
										fontSize: 11
									},
									axisLine: false,
									tickLine: false,
									interval: 0
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tick: {
										fill: "var(--color-faint)",
										fontSize: 11
									},
									axisLine: false,
									tickLine: false,
									domain: [290, 340]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									contentStyle: {
										background: "var(--color-surface)",
										border: "1px solid var(--color-border)",
										borderRadius: 10,
										color: "var(--color-fg)"
									},
									formatter: (v) => [`${v} lb`, "OL weight"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "ol",
									fill: "var(--color-accent)",
									radius: [
										4,
										4,
										0,
										0
									]
								})
							]
						})
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfPills, {
			value: conf,
			to: "/talent",
			searchFor: (c) => ({
				board: "size",
				...c === "All" ? {} : { conf: c }
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-3 flex gap-2 overflow-x-auto pb-1",
			role: "tablist",
			"aria-label": "Position group",
			children: SIZE_GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				role: "tab",
				"aria-selected": sizeGroup === g.key,
				onClick: () => setSizeGroup(g.key),
				className: cn("h-10 shrink-0 rounded-full px-4 text-sm transition-colors duration-150", sizeGroup === g.key ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
				children: g.label
			}, g.key))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 flex gap-2",
			children: ["weight", "height"].map((metric) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": sizeMetric === metric,
				onClick: () => setSizeMetric(metric),
				className: cn("h-9 rounded-full px-3 text-sm capitalize transition-colors duration-150", sizeMetric === metric ? "bg-raised text-fg" : "bg-transparent text-muted hover:text-fg"),
				children: metric
			}, metric))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 text-sm text-muted",
			children: [
				"Sorted by ",
				sizeSortLabel(sizeLens),
				"."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sm:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShowMore, {
				items: ranked,
				noun: "teams",
				resetKey: sizeLens,
				className: "space-y-3",
				render: (t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/teams/$slug",
					params: { slug: t.slug },
					className: "block rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-xl tabular text-muted",
									children: i + 1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
									slug: t.slug,
									color: t.colorPrimary,
									logoSize: 20
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: t.name
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl tabular",
							children: formatSize(t, sizeLens)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-xs tabular text-muted",
						children: SIZE_GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							g.label,
							" ",
							fmtHeight(t[g.heightKey]),
							" / ",
							fmtNum(t[g.weightKey], 0),
							" lb"
						] }, g.key))
					})]
				}, t.slug)
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "hidden overflow-hidden p-0 sm:block sm:p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-5xl text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("thead", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Rk"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Team"
							}),
							SIZE_GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								colSpan: 2,
								children: g.label
							}, g.key)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Composite"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line text-[10px] uppercase tracking-[0.1em] text-faint",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-3 py-2" }),
							SIZE_GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "Wt"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "Ht"
							})] }, g.key)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-3 py-2" })
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ranked.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line last:border-0 hover:bg-raised/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 tabular",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/teams/$slug",
									params: { slug: t.slug },
									className: "flex min-h-11 items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
										slug: t.slug,
										color: t.colorPrimary,
										logoSize: 20
									}), t.name]
								})
							}),
							SIZE_GROUPS.flatMap((g) => [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtNum(t[g.weightKey], 0)
							}, `${t.slug}-${g.key}-wt`), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtHeight(t[g.heightKey])
							}, `${t.slug}-${g.key}-ht`)]),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtNum(t.talentScore, 1)
							})
						]
					}, t.slug)) })]
				})
			})
		})
	] });
}
function TalentCard({ team, place, lens }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/teams/$slug",
		params: { slug: team.slug },
		className: "block rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl tabular text-muted",
							children: place
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
							slug: team.slug,
							color: team.colorPrimary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: team.name
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-xl tabular",
					children: fmtNum(team[lens], 1)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 text-xs tabular text-muted",
				children: ["Composite ", fmtNum(team.talentScore, 1)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentSliceStats, {
				team,
				className: "mt-3"
			})
		]
	});
}
//#endregion
export { TalentPage as component };
