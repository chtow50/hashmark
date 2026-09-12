import { t as MODEL } from "./chicago-ClRwnsKl.mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as PageHead, w as Panel } from "./router-CSFOaWQO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desk-CsA94pCH.js
var import_jsx_runtime = require_jsx_runtime();
var GLOSSARY = [
	{
		term: "HX",
		def: "The HASHMARK Index. One number for every FBS team, built from recruiting talent, last year’s SP+/Elo/SRS, four-year win trend, returning production, and portal net. Georgia opened 2026 near +7.9. A replacement-level Group of Five team sits near 0."
	},
	{
		term: "Make 12",
		def: "Chance a team makes the 12-team College Football Playoff field, from 10,000 season simulations seeded by HX. Not a national-title odds number."
	},
	{
		term: "Closer / SU",
		def: "Straight-up (SU) is who HX picked to win. Closer is whether the HASHMARK spread was nearer the final margin than the market close. Week 1 tape: 36/43 SU, 20/43 closer."
	},
	{
		term: "Vegas-only",
		def: "An FCS opponent is outside the 136-team HX board. HASHMARK will not invent a spread. The row shows the market number only."
	},
	{
		term: "Talent vs size",
		def: "Roster talent is a two-deep composite (high-school plus portal). OL mass is a separate size board. Size is not talent and is not an HX term."
	}
];
function DeskPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: `HX ${MODEL.version}`,
				title: "The desk",
				lede: "HASHMARK is a public college football ratings desk. One rating. Full 136 FBS. Not a sportsbook, not a tip sheet, not the AP ballot."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-wide",
						children: "What this is"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: "The board, slate, matchup engine, recruiting classes, and roster talent live on this site every week of the season. HX is the rating. The rest of the desk exists so you can see why a number moved — or why it did not."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: "Week 1 held 36 of 43 straight-up. The closer column was a coin. That split stays on the homepage because the model should be scored in public."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/model",
								className: "text-fg underline-offset-4 hover:underline",
								children: "How the rating is built"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-faint",
								children: " · "
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/matchup",
								className: "text-fg underline-offset-4 hover:underline",
								children: "Run a matchup"
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-wide",
						children: "What this is not"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2 text-sm leading-relaxed text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Not a sportsbook. HASHMARK never takes a wager and does not list a street line." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Not a live in-game feed. The restamp tool on a matchup page is manual." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Not an FCS rating. Those games are Vegas-only until a program is on the 136." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Not the AP poll. Gaps versus AP are a feature of the board, not a bug." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm text-muted",
						children: [
							"Questions or corrections:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:hello@hashmarkcfb.com",
								className: "text-fg hover:underline",
								children: "hello@hashmarkcfb.com"
							})
						]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "Glossary"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-4 divide-y divide-line",
				children: GLOSSARY.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "font-mono text-xs uppercase tracking-[0.14em] text-faint",
						children: row.term
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "text-sm leading-relaxed text-muted",
						children: row.def
					})]
				}, row.term))
			})] })
		]
	});
}
//#endregion
export { DeskPage as component };
