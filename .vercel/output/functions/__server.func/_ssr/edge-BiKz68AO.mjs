import { n as MODEL } from "./fcs-stubs-CVws5Dy_.mjs";
import { S as require_jsx_runtime, h as Outlet, m as useChildMatches, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as EdgeBoardPanel } from "./edge-board-5fLMgE4L.mjs";
import { $ as Panel, Q as PageHead, X as EdgeCheckoutNote, Y as EdgeBuyButton, q as EDGE } from "./router-BkdnoR0o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edge-BiKz68AO.js
var import_jsx_runtime = require_jsx_runtime();
var INCLUDED = [
	"Confidence cards for the week — A–D tiers on the slate. Never a lock.",
	"Unit O/D pulse — who moved on offense and defense after the tape.",
	"Tape write-up — SU / closer for the week just played. Full depth, not the free-board teaser.",
	"HX vs AP disagreements — where the last stamped ballot and the rating split.",
	"HX vs market disagreements — spread gap versus the book, same favorite called out."
];
var NOT_INCLUDED = [
	"No locks. The pack does not pick ‘plays’ or guarantee a side.",
	"No guaranteed ROI. Tape is scored; it is not a promise the next week pays.",
	"No second rating. Edge Pack is the same HX, written out.",
	"No login wall on the public board, slate, or matchup engine."
];
function EdgeLayout() {
	if (useChildMatches().length > 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EdgePage, {});
}
function EdgePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: `Weekly pack · HX ${MODEL.version}`,
				title: EDGE.name,
				lede: "Weekly paid pack. The $5 week sample is the full depth pack — confidence cards, unit O/D pulse, tape write-up — not the free-board teaser. Same HX as the public board. The free board stays public."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.18em] text-faint",
						children: "Week sample · paid depth"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-4xl tabular tracking-wide",
						children: EDGE.weekPrice
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "One paid week of the full pack: confidence cards, unit O/D pulse, tape write-up. Not the free-board teaser. Same contents as the month, once."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EdgeBuyButton, {
						kind: "week",
						label: `Buy · ${EDGE.weekLabel}`,
						className: "mt-5"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.18em] text-faint",
						children: "Monthly"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-4xl tabular tracking-wide",
						children: EDGE.monthPrice
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Weekly pack through the season."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EdgeBuyButton, {
						kind: "month",
						label: `Buy · ${EDGE.monthLabel}`,
						className: "mt-5"
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EdgeCheckoutNote, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EdgeBoardPanel, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "What is in it"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm leading-relaxed text-muted",
					children: INCLUDED.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "What is not"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm leading-relaxed text-muted",
					children: NOT_INCLUDED.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "The board stays free"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: "Rankings, slate, matchup engine, recruiting, and talent stay on the public desk. Edge Pack does not replace that — it writes the week’s disagreements and the tape so you do not have to reconstruct them from the board alone."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "text-fg underline-offset-4 hover:underline",
							children: "Back to the board"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-faint",
							children: " · "
						}),
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
							to: "/desk",
							className: "text-fg underline-offset-4 hover:underline",
							children: "The desk"
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl text-xs leading-relaxed text-faint",
				children: "HX Edge Pack is an informational model product. It is not gambling advice. HASHMARK does not take wagers or list a street line. The model is scored in public on the board — Edge Pack is the write-up, not a promise the tape will pay."
			})
		]
	});
}
//#endregion
export { EdgeLayout as component };
