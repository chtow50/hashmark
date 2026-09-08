import { S as require_jsx_runtime, h as Outlet, m as useChildMatches, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as Panel, a as Route$3, h as WEEK0_SLATE, w as PageHead } from "./router-DgNS_QMM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stories-mxa4YdXL.js
var import_jsx_runtime = require_jsx_runtime();
function hxLabel(side) {
	return side.rank == null ? "—" : String(side.rank);
}
function SideName({ side }) {
	if ("slug" in side) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/teams/$slug",
		params: { slug: side.slug },
		className: "text-fg hover:text-accent",
		children: side.name
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-fg",
		children: side.name
	});
}
function StoriesPage() {
	const childMatches = useChildMatches();
	const stories = Route$3.useLoaderData();
	if (childMatches.length > 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	const lead = stories[0];
	const rest = stories.slice(1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "Week 1 · 2026",
			title: "The Week 1 desk.",
			lede: "Tape is in. SU 36/43. Closer 20/43. HX not retuned. Gaps vs Week 1 AP."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-8 font-mono text-[11px] uppercase tracking-[0.16em] text-faint",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/schedule",
					search: { w: 1 },
					className: "text-fg underline decoration-border underline-offset-4 hover:text-accent",
					children: "Week 1 schedule"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-2",
					"aria-hidden": true,
					children: "·"
				}),
				"HX 2026.3 · no retune"
			]
		}),
		lead ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/stories/$slug",
			params: { slug: lead.slug },
			className: "mb-6 block rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)] sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.18em] text-faint",
					children: [
						lead.kicker,
						" · ",
						lead.date
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-3xl tracking-wide text-fg sm:text-4xl",
					children: lead.headline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-base leading-relaxed text-muted",
					children: lead.dek
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: rest.map((story) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/stories/$slug",
				params: { slug: story.slug },
				className: "flex flex-col rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.18em] text-faint",
						children: [
							story.kicker,
							" · ",
							story.date
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-2xl tracking-wide text-fg",
						children: story.headline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 flex-1 text-sm leading-relaxed text-muted",
						children: story.dek
					})
				]
			}, story.slug))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-10 overflow-hidden p-0 opacity-80 sm:p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-line px-4 py-3 sm:px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg tracking-wide text-muted",
					children: "Week 0, already played"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-faint",
					children: "Saturday, Aug. 29 · times CT. USC already has tape. Stanford beat Hawaiʻi 37–27."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[560px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Kick"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Matchup"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "TV"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "HX"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: WEEK0_SLATE.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line last:border-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 tabular text-muted",
								children: g.time
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex min-h-11 flex-wrap items-center gap-x-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideName, { side: g.away }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-faint",
											children: g.neutral ? "vs" : "at"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideName, { side: g.home }),
										g.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-faint",
											children: ["· ", g.note]
										}) : null
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 text-muted",
								children: g.tv
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3 font-display tabular",
								children: [
									hxLabel(g.away),
									" / ",
									hxLabel(g.home)
								]
							})
						]
					}, `${g.time}-${g.tv}-${g.away.name}`)) })]
				})
			})]
		})
	] });
}
//#endregion
export { StoriesPage as component };
