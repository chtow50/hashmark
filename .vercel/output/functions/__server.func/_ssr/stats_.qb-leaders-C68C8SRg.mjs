import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as leaderMetric, a as QUALIFY, h as fmtStat, n as LEADER_COLS, r as LEADER_SORTS } from "./qb-leaders-BOzOsd03.mjs";
import { $ as Panel, Q as PageHead, T as TeamMark, i as Route$2, rt as cn } from "./router-C8XJdDW9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stats_.qb-leaders-C68C8SRg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE = 25;
var SORT_LABEL = {
	tepa: "Total EPA",
	epa: "EPA per dropback",
	eff: "NCAA passing efficiency",
	yds: "Passing yards",
	td: "Passing TDs"
};
function QbLeadersPage() {
	const { asOf, n, rows } = Route$2.useLoaderData();
	const sort = Route$2.useSearch().sort ?? "tepa";
	const sm = leaderMetric(sort);
	const [all, setAll] = (0, import_react.useState)(false);
	const shown = all ? rows : rows.slice(0, PAGE);
	const q = QUALIFY.qb;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: `2026 season · stats through ${asOf}`,
			title: "QB stat leaderboard",
			lede: `The ${n} qualified FBS quarterbacks, sorted by ${SORT_LABEL[sort]}. Every other number shows its FBS rank among the same QBs. Real season stats only: no player score, no second rating, and no Heisman prediction.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg",
				children: "How to read it"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-2 space-y-1.5 text-sm leading-relaxed text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "Sorted by one stat."
					}), " Default is total EPA (expected points added on every pass and run the QB was charged with), because it counts both how good the plays were and how many there were. Switch the sort below; nothing is blended."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: "Small numbers are FBS ranks"
						}),
						" among the ",
						n,
						" qualified QBs (",
						q.perGame,
						"+ pass attempts per team game). For interceptions, fewer ranks higher."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: "EPA is raw"
						}),
						" (CollegeFootballData play-by-play, not opponent-adjusted), so schedule matters. Team record and HX rank are shown as context only and are current; the stats run through ",
						asOf,
						"."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: "QBs only."
						}),
						" Rusher and receiver EPA cover different play sets (carries, targets), so they don't line up with a QB's total. Those boards live on",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/stats",
							search: { tab: "rush" },
							className: "text-accent underline-offset-2 hover:underline",
							children: "/stats"
						}),
						"."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Tap a QB for his HASHMARK QB Desk: last game, rank moves and game-by-game EPA." })
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "-mx-4 mb-3 flex items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0",
			role: "tablist",
			"aria-label": "Sort by",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mr-1 shrink-0 text-xs text-muted",
				children: "Sort by"
			}), LEADER_SORTS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/stats/qb-leaders",
				search: k === "tepa" ? {} : { sort: k },
				resetScroll: false,
				role: "tab",
				"aria-selected": sort === k,
				className: cn("inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-full border px-3 text-xs transition-colors", sort === k ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:border-faint hover:text-fg"),
				children: SORT_LABEL[k]
			}, k))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "p-0 sm:p-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "divide-y divide-border lg:hidden",
					children: shown.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeaderCard, {
						r,
						sort
					}, r.key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden overflow-x-auto lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border text-left text-[11px] uppercase tracking-wide text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-10 px-3 py-2 text-right font-medium",
									children: "#"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "Quarterback"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "Team now"
								}),
								LEADER_COLS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: cn("px-2 py-2 text-right font-medium", k === sort && "text-fg"),
									title: leaderMetric(k).l,
									children: leaderMetric(k).s
								}, k))
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: shown.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/60 last:border-0 hover:bg-raised/60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 text-right tabular text-faint",
									children: r.stats[sort]?.v == null ? "—" : r.rank
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QbName, { r })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "whitespace-nowrap px-3 py-2 text-xs text-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamContext, { r })
								}),
								LEADER_COLS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: cn("whitespace-nowrap px-2 py-2 text-right tabular", k === sort ? "font-semibold text-fg" : "text-fg/90"),
									children: [fmtStat(leaderMetric(k), r.stats[k].v), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1 text-[10px] text-faint",
										children: r.stats[k].rank ?? ""
									})]
								}, k))
							]
						}, r.key)) })]
					})
				}),
				rows.length > PAGE ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setAll(!all),
						className: "inline-flex h-10 items-center rounded-lg bg-raised px-4 text-sm text-fg hover:bg-border",
						children: all ? `Show top ${PAGE}` : `Show all ${rows.length} QBs`
					})
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-xs leading-relaxed text-muted",
			children: [
				"Sources: EPA from CollegeFootballData (CFBD) play-by-play, through ",
				asOf,
				"; attempts, completions, yards, TDs, INTs and rushing yards from the official box via cfbstats.com. Rushing yards are NCAA net (sack losses count). Definitions for every column are in the",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/stats",
					search: { tab: "qb" },
					className: "text-accent underline-offset-2 hover:underline",
					children: "stats explorer glossary"
				}),
				". ",
				sm.l,
				" is the sort; HX is the only rating on HASHMARK."
			]
		})
	] });
}
function QbName({ r }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/stats",
		search: {
			tab: "qb",
			qb: r.key
		},
		className: "flex min-h-10 min-w-0 items-center gap-2 hover:text-accent",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
			slug: r.slug,
			color: r.color
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate font-medium",
				children: r.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "block truncate text-xs text-muted",
				children: [
					r.team,
					" · ",
					r.g,
					" G · ",
					r.att,
					" att"
				]
			})]
		})]
	});
}
function TeamContext({ r }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [r.record ?? "—", r.hxRank ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "text-faint",
		children: [" · HX #", r.hxRank]
	}) : null] });
}
function LeaderCard({ r, sort }) {
	const sm = leaderMetric(sort);
	const rest = LEADER_COLS.filter((k) => k !== sort);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "px-4 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-7 shrink-0 text-right tabular text-sm text-faint",
						children: r.stats[sort]?.v == null ? "—" : r.rank
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-0 flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QbName, { r })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shrink-0 rounded-md bg-raised px-2 py-1 text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-xl leading-none tabular",
							children: fmtStat(sm, r.stats[sort]?.v ?? null)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 text-[10px] uppercase tracking-wide text-fg/80",
							children: sm.s
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 pl-10 text-xs text-muted",
				children: ["Team now: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamContext, { r })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-2 grid grid-cols-4 gap-1 pl-10 text-xs",
				children: rest.slice(0, 8).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 rounded bg-raised/60 px-1.5 py-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "truncate text-[10px] uppercase tracking-wide text-fg/80",
						children: leaderMetric(k).s
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
						className: "tabular text-fg/90",
						children: [fmtStat(leaderMetric(k), r.stats[k].v), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1 text-[10px] text-faint",
							children: r.stats[k].rank ? `#${r.stats[k].rank}` : ""
						})]
					})]
				}, k))
			})
		]
	});
}
//#endregion
export { QbLeadersPage as component };
