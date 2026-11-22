import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useNavigate, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as parseLeaderSort, C as isConfScope, E as leadersSearch, L as viewLeaders, S as fmtStat, T as leaderMetric, a as LEADER_CONFS, d as SCOPE_LABEL, f as SOURCE_LABEL, i as LEADER_COLS, k as parseLeaderScope, l as QUALIFY, o as LEADER_POOLS, s as LEADER_SORTS } from "./qb-leaders-ClQAW6us.mjs";
import { T as TeamMark, ht as Panel, i as Route$2, mt as PageHead, yt as cn } from "./router-D-GGFVpx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stats_.qb-leaders-DPsR_kk9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE = 25;
var SORT_LABEL = {
	tepa: "Total EPA",
	epa: "EPA per dropback",
	eff: "NCAA passing efficiency",
	ypa: "Yards per attempt",
	cmp: "Completion %",
	yds: "Passing yards",
	td: "Passing TDs",
	int: "Interceptions",
	ruy: "Rushing yards"
};
function QbLeadersPage() {
	const { asOf, rows: all } = Route$2.useLoaderData();
	const search = Route$2.useSearch();
	const navigate = useNavigate({ from: "/stats/qb-leaders" });
	const scope = search.scope ?? "fbs";
	const sort = search.sort ?? "tepa";
	const dir = search.dir ?? "best";
	const sm = leaderMetric(sort);
	const { n, fbsN, rows } = (0, import_react.useMemo)(() => viewLeaders(all, {
		scope,
		sort,
		dir
	}), [
		all,
		scope,
		sort,
		dir
	]);
	const [showAll, setShowAll] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setShowAll(false);
	}, [
		scope,
		sort,
		dir
	]);
	const shown = showAll ? rows : rows.slice(0, PAGE);
	const q = QUALIFY.qb;
	const scopeName = SCOPE_LABEL[scope];
	const poolPhrase = scope === "fbs" ? `${n} qualified FBS quarterbacks` : `${n} qualified ${scopeName} quarterback${n === 1 ? "" : "s"}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: `2026 season · stats through ${asOf}`,
			title: "QB stat leaderboard",
			lede: `${poolPhrase}, sorted by ${SORT_LABEL[sort]}, ${dir === "best" ? "best first" : "worst first"}. Every other number shows its FBS rank among the ${fbsN} qualified QBs. Real season stats only: no player score, no second rating, and no Heisman prediction.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg",
				children: "How to read it"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-2 space-y-1.5 text-sm leading-relaxed text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: "The # column is the rank in this view"
						}),
						" (best to worst on the sort stat",
						scope === "fbs" ? "" : `, among ${scopeName} QBs`,
						"). When you filter, the FBS rank sits under it. Ranks stay best-to-worst even if you flip the list to worst first."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "Sorted by one stat."
					}), " Default is total EPA (expected points added on every pass and run the QB was charged with), because it counts both how good the plays were and how many there were. Pick a column or use Sort by; nothing is blended. For interceptions, fewer is better."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: "Small numbers next to each stat are FBS ranks"
						}),
						" among the ",
						fbsN,
						" qualified QBs (",
						q.perGame,
						"+ pass attempts per team game)."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: "EPA is raw"
						}),
						" (CollegeFootballData play-by-play, not opponent-adjusted), so schedule matters. Team record and HX rank are shown as context only and are current; the stats run through",
						" ",
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
			className: "mb-3 flex flex-col gap-3 lg:flex-row lg:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex max-w-full shrink-0 overflow-x-auto rounded-xl bg-raised p-1",
				role: "tablist",
				"aria-label": "QB pool",
				children: LEADER_POOLS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/stats/qb-leaders",
					search: leadersSearch(k, sort, dir),
					resetScroll: false,
					role: "tab",
					"aria-selected": scope === k,
					className: cn("inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-lg px-3 text-[13px] font-medium transition-colors sm:flex-none sm:px-4 sm:text-sm", scope === k ? "bg-fg text-bg" : "text-muted hover:text-fg"),
					children: SCOPE_LABEL[k]
				}, k))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col gap-2 sm:flex-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "relative flex-1 sm:max-w-56",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Conference"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: isConfScope(scope) ? scope : "",
							onChange: (e) => {
								const next = e.target.value ? parseLeaderScope(e.target.value) : "fbs";
								navigate({
									search: leadersSearch(next, sort, dir),
									resetScroll: false
								});
							},
							className: "h-12 w-full rounded-xl bg-raised px-3 text-sm text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: isConfScope(scope) ? "All FBS" : "Conference"
							}), LEADER_CONFS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c,
								children: SCOPE_LABEL[c]
							}, c))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "relative flex-1 sm:max-w-64 lg:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Sort by"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: sort,
							onChange: (e) => {
								const next = parseLeaderSort(e.target.value);
								navigate({
									search: leadersSearch(scope, next, "best"),
									resetScroll: false
								});
							},
							className: "h-12 w-full rounded-xl bg-raised px-3 text-sm text-fg",
							children: LEADER_SORTS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: k,
								children: ["Sort by ", SORT_LABEL[k]]
							}, k))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex shrink-0 overflow-x-auto rounded-xl bg-raised p-1 sm:flex-none",
						role: "group",
						"aria-label": "Sort direction",
						children: ["best", "worst"].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/stats/qb-leaders",
							search: leadersSearch(scope, sort, d),
							resetScroll: false,
							"aria-pressed": dir === d,
							className: cn("inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-lg px-3 text-[13px] font-medium transition-colors sm:flex-none sm:px-4 sm:text-sm", dir === d ? "bg-fg text-bg" : "text-muted hover:text-fg"),
							children: d === "best" ? "Best to worst" : "Worst to best"
						}, d))
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 rounded-xl bg-inset px-4 py-3 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: "Sorted by "
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: sm.l
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted",
					children: [
						" ",
						"· ",
						dir === "best" ? "best first" : "worst first",
						" · ",
						n,
						" QB",
						n === 1 ? "" : "s",
						scope === "fbs" ? "" : ` in ${scopeName}`
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs leading-relaxed text-muted",
				children: [
					sm.def,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-faint",
						children: [
							"(",
							SOURCE_LABEL[sm.src],
							sm.hi ? "" : "; lower is better",
							")"
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "p-0 sm:p-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "divide-y divide-border lg:hidden",
					children: [shown.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeaderCard, {
						r,
						sort,
						showFbs: scope !== "fbs"
					}, r.key)), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "px-4 py-10 text-center text-muted",
						children: [
							"No qualified QBs in ",
							scopeName,
							"."
						]
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden overflow-x-auto lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border text-left text-[11px] uppercase tracking-wide text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-14 px-3 py-2 text-right font-medium",
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
								LEADER_COLS.map((k, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderCell, {
									k,
									scope,
									sort,
									dir,
									alignRight: i >= LEADER_COLS.length - 3
								}, k))
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [shown.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/60 last:border-0 hover:bg-raised/60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 text-right tabular text-faint",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankCell, {
										r,
										sort,
										showFbs: scope !== "fbs"
									})
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
										title: r.stats[k].rank != null ? `FBS #${r.stats[k].rank}` : void 0,
										children: r.stats[k].rank ?? ""
									})]
								}, k))
							]
						}, r.key)), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							colSpan: LEADER_COLS.length + 3,
							className: "px-4 py-10 text-center text-muted",
							children: [
								"No qualified QBs in ",
								scopeName,
								"."
							]
						}) }) : null] })]
					})
				}),
				rows.length > PAGE ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setShowAll(!showAll),
						className: "inline-flex h-10 items-center rounded-lg bg-raised px-4 text-sm text-fg hover:bg-border",
						children: showAll ? `Show top ${PAGE}` : `Show all ${rows.length} QBs`
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
function RankCell({ r, sort, showFbs }) {
	if (r.stats[sort].v == null) return "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "block",
		children: r.rank
	}), showFbs && r.fbsRank != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "block text-[10px] font-normal normal-case tracking-normal text-faint",
		title: `FBS #${r.fbsRank}`,
		children: ["FBS #", r.fbsRank]
	}) : null] });
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
function HeaderCell({ k, scope, sort, dir, alignRight }) {
	const m = leaderMetric(k);
	const active = sort === k;
	const nextDir = active && dir === "best" ? "worst" : "best";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
		className: "group/th relative px-2 py-2 text-right font-medium",
		"aria-sort": active ? (m.hi ? dir === "best" : dir === "worst") ? "descending" : "ascending" : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/stats/qb-leaders",
			search: leadersSearch(scope, k, nextDir),
			resetScroll: false,
			title: m.l,
			className: cn("inline-flex min-h-8 items-center justify-end gap-1 whitespace-nowrap underline decoration-dotted decoration-faint underline-offset-4 hover:text-fg", active ? "text-fg decoration-fg" : "text-muted"),
			children: [m.s, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: cn("text-[10px]", active ? "opacity-100" : "opacity-0 group-hover/th:opacity-40"),
				children: active && dir === "worst" ? "▲" : "▼"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			role: "tooltip",
			className: cn("pointer-events-none absolute top-full z-40 mt-1 hidden w-56 rounded-lg border border-border bg-raised p-3 text-left text-xs font-normal normal-case leading-relaxed tracking-normal text-fg shadow-xl group-hover/th:block group-focus-within/th:block", alignRight ? "right-0" : "left-0"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-medium",
					children: m.l
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-muted",
					children: m.def
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-1 block text-faint",
					children: [
						SOURCE_LABEL[m.src],
						" · ",
						m.hi ? "higher is better" : "lower is better"
					]
				})
			]
		})]
	});
}
function LeaderCard({ r, sort, showFbs }) {
	const sm = leaderMetric(sort);
	const rest = LEADER_COLS.filter((k) => k !== sort);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "px-4 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-14 shrink-0 text-right tabular text-sm text-faint",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankCell, {
							r,
							sort,
							showFbs
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-0 flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QbName, { r })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shrink-0 rounded-md bg-raised px-2 py-1 text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-xl leading-none tabular",
							children: fmtStat(sm, r.stats[sort].v)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 text-[10px] uppercase tracking-wide text-fg/80",
							children: sm.s
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 pl-16 text-xs text-muted",
				children: ["Team now: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamContext, { r })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-2 grid grid-cols-4 gap-1 pl-16 text-xs",
				children: rest.slice(0, 8).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 rounded bg-raised/60 px-1.5 py-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "truncate text-[10px] uppercase tracking-wide text-fg/80",
						children: leaderMetric(k).s
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
						className: "tabular text-fg/90",
						children: [fmtStat(leaderMetric(k), r.stats[k].v), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1 text-[10px] text-faint",
							title: r.stats[k].rank != null ? `FBS #${r.stats[k].rank}` : void 0,
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
