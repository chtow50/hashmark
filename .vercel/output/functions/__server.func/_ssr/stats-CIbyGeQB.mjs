import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as TAB_LABEL, c as fmtStat, d as sortRows, f as standing, i as STAT_TABS, l as metricOf, n as METRICS, r as SOURCE_LABEL, t as GROUPS } from "./stats-B2MUK_7K.mjs";
import { G as inConf, I as ConfPills, L as PageHead, R as Panel, V as cn, b as TeamMark, o as Route$5 } from "./router-CPsEb8B9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stats-CIbyGeQB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var label = (tab, r) => tab === "teams" ? r.name : `${r.name} (${r.team})`;
function MetricSelect({ tab, value, onChange, id, labelText }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		htmlFor: id,
		className: "flex flex-col gap-1 text-xs text-faint",
		children: [labelText, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			id,
			value,
			onChange: (e) => onChange(e.target.value),
			className: "h-9 rounded-lg bg-raised px-2 text-sm text-fg",
			children: METRICS[tab].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: m.k,
				children: m.l
			}, m.k))
		})]
	});
}
/** Top 10 bars for the sorted metric inside the current conference filter. */
function StatsLeaders({ tab, rows, metric }) {
	const top = sortRows(rows, metric).filter((r) => r.v[metric.k] != null).slice(0, 10);
	const vals = top.map((r) => r.v[metric.k]);
	const all = rows.map((r) => r.v[metric.k]).filter((x) => x != null);
	const worst = all.length ? metric.hi ? Math.min(...all) : Math.max(...all) : 0;
	const best = vals[0] ?? 0;
	const span = Math.abs(best - worst) || 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "mb-1 font-display text-lg",
			children: ["Leaders · ", metric.l]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-4 text-xs text-faint",
			children: [metric.hi ? "Higher is better." : "Lower is better.", " Bar length is measured from the worst value in the pool."]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-2",
			children: top.map((r, i) => {
				const v = r.v[metric.k];
				const w = Math.max(3, 100 * Math.abs(v - worst) / span);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[1.5rem_minmax(0,11rem)_1fr_4.5rem] items-center gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular text-faint",
							children: i + 1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "truncate",
							title: label(tab, r),
							children: [r.name, tab !== "teams" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-faint",
								children: [" · ", r.team]
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-2.5 rounded-full bg-raised",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block h-2.5 rounded-full",
								style: {
									width: `${w}%`,
									background: r.color
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-right tabular",
							children: fmtStat(metric, v)
						})
					]
				}, r.id);
			})
		})
	] });
}
var SCATTER_DEFAULTS = {
	teams: ["epa", "oepa"],
	qb: ["use", "epa"],
	rush: ["att", "epa"],
	rec: ["use", "epa"]
};
/** Light SVG scatter: pick any two metrics; hover a dot for the row. */
function StatsScatter({ tab, rows }) {
	const [xk, setX] = (0, import_react.useState)(SCATTER_DEFAULTS[tab][0]);
	const [yk, setY] = (0, import_react.useState)(SCATTER_DEFAULTS[tab][1]);
	const [hover, setHover] = (0, import_react.useState)(null);
	const xm = metricOf(tab, xk);
	const ym = metricOf(tab, yk);
	const pts = rows.filter((r) => r.v[xk] != null && r.v[yk] != null);
	const W = 520, H = 360, P = 44;
	const ext = (k) => {
		const v = pts.map((r) => r.v[k]);
		const lo = Math.min(...v), hi = Math.max(...v);
		const pad = (hi - lo) * .05 || 1;
		return [lo - pad, hi + pad];
	};
	const [x0, x1] = pts.length ? ext(xk) : [0, 1];
	const [y0, y1] = pts.length ? ext(yk) : [0, 1];
	const sx = (v) => xm.hi ? P + (v - x0) / (x1 - x0) * 432 : 476 - (v - x0) / (x1 - x0) * 432;
	const sy = (v) => ym.hi ? 316 - (v - y0) / (y1 - y0) * 272 : P + (v - y0) / (y1 - y0) * 272;
	const ticks = (a, b) => [
		0,
		.25,
		.5,
		.75,
		1
	].map((t) => a + t * (b - a));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 font-display text-lg",
			children: "Chart builder"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricSelect, {
				id: "sc-x",
				labelText: "X axis",
				tab,
				value: xk,
				onChange: setX
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricSelect, {
				id: "sc-y",
				labelText: "Y axis",
				tab,
				value: yk,
				onChange: setY
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: `0 0 ${W} ${H}`,
			className: "h-auto w-full",
			role: "img",
			"aria-label": `${ym.l} vs ${xm.l}`,
			children: [
				ticks(x0, x1).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: sx(t),
					x2: sx(t),
					y1: P,
					y2: 316,
					className: "stroke-line"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: sx(t),
					y: 332,
					textAnchor: "middle",
					className: "fill-faint text-[10px]",
					children: fmtStat(xm, t)
				})] }, `x${t}`)),
				ticks(y0, y1).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: P,
					x2: 476,
					y1: sy(t),
					y2: sy(t),
					className: "stroke-line"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: 38,
					y: sy(t) + 3,
					textAnchor: "end",
					className: "fill-faint text-[10px]",
					children: fmtStat(ym, t)
				})] }, `y${t}`)),
				pts.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: sx(r.v[xk]),
					cy: sy(r.v[yk]),
					r: hover?.id === r.id ? 6 : 4,
					fill: r.color,
					fillOpacity: .8,
					className: "stroke-bg",
					onMouseEnter: () => setHover(r),
					onFocus: () => setHover(r),
					tabIndex: 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `${label(tab, r)}: ${xm.s} ${fmtStat(xm, r.v[xk])}, ${ym.s} ${fmtStat(ym, r.v[yk])}` })
				}, r.id)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
					x: 476,
					y: 354,
					textAnchor: "end",
					className: "fill-muted text-[11px]",
					children: [
						xm.s,
						" →",
						xm.hi ? "" : " (lower)"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
					x: 6,
					y: 14,
					className: "fill-muted text-[11px]",
					children: [
						"↑ ",
						ym.s,
						ym.hi ? "" : " (lower)"
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 min-h-5 text-xs text-muted",
			children: hover ? `${label(tab, hover)} · ${xm.s} ${fmtStat(xm, hover.v[xk])} · ${ym.s} ${fmtStat(ym, hover.v[yk])}` : `${pts.length} plotted. Up and right is better on both axes.`
		})
	] });
}
var COMPARE_DEFAULTS = {
	teams: [
		"texas-am",
		"georgia",
		"texas",
		"ohio-state"
	],
	qb: [
		"Marcel Reed",
		"Gunner Stockton",
		"Arch Manning",
		"Julian Sayin"
	],
	rush: [],
	rec: ["Jeremiah Smith"]
};
/** Compare up to 4 rows: value, rank, and percentile inside the current conference cohort. */
function StatsCompare({ tab, rows, cohort, conf }) {
	const initial = (0, import_react.useMemo)(() => {
		const ids = COMPARE_DEFAULTS[tab].map((k) => rows.find((r) => tab === "teams" ? r.slug === k : r.name === k)?.id).filter((x) => Boolean(x));
		for (const r of rows) if (ids.length < (tab === "teams" ? 4 : 3) && !ids.includes(r.id)) ids.push(r.id);
		return ids;
	}, [tab, rows]);
	const [picks, setPicks] = (0, import_react.useState)(initial);
	const [add, setAdd] = (0, import_react.useState)("");
	const chosen = picks.map((id) => rows.find((r) => r.id === id)).filter((r) => Boolean(r));
	const options = (0, import_react.useMemo)(() => [...rows].sort((a, b) => a.name.localeCompare(b.name)), [rows]);
	const metrics = METRICS[tab];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 flex flex-wrap items-end justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg",
			children: "Compare"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs text-faint",
			children: [
				"Up to 4. P = percentile within ",
				conf === "All" ? "all FBS" : conf,
				" ",
				tab === "teams" ? "teams" : "qualifiers",
				" (P100 best); # = rank."
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "flex items-end gap-2 text-xs text-faint",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Add to compare"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: add,
				disabled: picks.length >= 4,
				onChange: (e) => {
					const id = e.target.value;
					if (id && !picks.includes(id) && picks.length < 4) setPicks([...picks, id]);
					setAdd("");
				},
				className: "h-9 max-w-64 rounded-lg bg-raised px-2 text-sm text-fg disabled:opacity-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: picks.length >= 4 ? "4 picked (remove one)" : "Add…"
				}), options.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: r.id,
					disabled: picks.includes(r.id),
					children: label(tab, r)
				}, r.id))]
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[560px] text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "text-[11px] uppercase tracking-[0.1em] text-faint",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "py-2 pr-3 font-medium",
					children: "Metric"
				}), chosen.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-2 py-2 font-medium normal-case tracking-normal",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-2.5 w-2.5 shrink-0 rounded-full",
								style: { background: r.color }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-fg",
								children: label(tab, r)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setPicks(picks.filter((p) => p !== r.id)),
								className: "ml-auto px-1 text-faint hover:text-fg",
								"aria-label": `Remove ${r.name}`,
								children: "×"
							})
						]
					})
				}, r.id))]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: metrics.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-t border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "py-2 pr-3 text-muted",
					title: m.def,
					children: m.l
				}), chosen.map((r) => {
					const s = standing(m, r.v[m.k], cohort.some((c) => c.id === r.id) ? cohort.map((c) => c.v[m.k]) : [...cohort.map((c) => c.v[m.k]), r.v[m.k]]);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-2 py-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-14 tabular",
								children: fmtStat(m, r.v[m.k])
							}), s ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-1.5 flex-1 rounded-full bg-raised",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("block h-1.5 rounded-full", s.p >= 50 ? "bg-accent" : "bg-faint"),
									style: { width: `${Math.max(2, s.p)}%` }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "w-24 text-right text-xs tabular text-faint",
								children: [
									"P",
									Math.round(s.p),
									" · #",
									s.rank,
									"/",
									s.n
								]
							})] }) : null]
						})
					}, r.id);
				})]
			}, m.k)) })]
		})
	})] });
}
var DEFAULT_SORT = {
	teams: "nepa",
	qb: "epa",
	rush: "yds",
	rec: "yds"
};
/** Link search with defaults dropped, matching validateSearch (no redirect on crawl). */
function statsSearch(tab, conf, group, sort) {
	return {
		tab: tab === "teams" ? void 0 : tab,
		conf: conf === "All" ? void 0 : conf,
		group: group && group !== GROUPS[tab][0] ? group : void 0,
		sort: sort && sort !== DEFAULT_SORT[tab] ? sort : void 0
	};
}
function StatsPage() {
	const { meta, rows } = Route$5.useLoaderData();
	const search = Route$5.useSearch();
	const tab = search.tab ?? "teams";
	const conf = search.conf ?? "All";
	const group = search.group ?? GROUPS[tab][0];
	const sortMetric = metricOf(tab, search.sort ?? DEFAULT_SORT[tab]) ?? METRICS[tab][0];
	const [query, setQuery] = (0, import_react.useState)("");
	const pool = (0, import_react.useMemo)(() => rows.filter((r) => inConf(r.conference, conf)), [rows, conf]);
	const sorted = (0, import_react.useMemo)(() => sortRows(pool, sortMetric), [pool, sortMetric]);
	const shown = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return q ? sorted.filter((r) => r.name.toLowerCase().includes(q) || r.team.toLowerCase().includes(q)) : sorted;
	}, [sorted, query]);
	const rankOf = (0, import_react.useMemo)(() => new Map(sorted.map((r, i) => [r.id, i + 1])), [sorted]);
	const cols = METRICS[tab].filter((m) => m.g === group);
	const poolLabel = tab === "teams" ? "138 FBS teams" : `${meta.pools[tab]}, ${rows.length} players`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: `Through ${meta.as_of}`,
			title: "Stats explorer",
			lede: "Every FBS team and the qualified passers, rushers, and receivers. EPA columns come from play-by-play (CollegeFootballData); counting stats come from the official box (cfbstats). These are stats, not HX: HX stays the one rating on the site."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex gap-2 overflow-x-auto pb-1",
			role: "tablist",
			"aria-label": "Stat board",
			children: STAT_TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/stats",
				search: statsSearch(t, conf),
				role: "tab",
				"aria-selected": tab === t,
				className: cn("inline-flex h-11 shrink-0 items-center rounded-lg px-4 text-sm font-medium transition-colors", tab === t ? "bg-fg text-bg" : "bg-raised text-muted hover:text-fg"),
				children: TAB_LABEL[t]
			}, t))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfPills, {
			value: conf,
			to: "/stats",
			searchFor: (c) => statsSearch(tab, c, group, sortMetric.k)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex flex-wrap items-center gap-2",
			children: [GROUPS[tab].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/stats",
				search: statsSearch(tab, conf, g, METRICS[tab].find((m) => m.g === g)?.k),
				className: cn("inline-flex h-9 items-center rounded-full px-3 text-xs transition-colors", group === g ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
				children: g
			}, g)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "search",
				value: query,
				onChange: (e) => setQuery(e.target.value),
				placeholder: tab === "teams" ? "Find a team" : "Find a player or team",
				"aria-label": "Filter rows",
				className: "ml-auto h-9 w-48 rounded-lg bg-raised px-3 text-sm text-fg placeholder:text-faint"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 text-xs text-faint",
			children: [
				poolLabel,
				" · ",
				conf === "All" ? "all conferences" : conf,
				" · sorted by ",
				sortMetric.l,
				" (",
				SOURCE_LABEL[sortMetric.src],
				"). Click a column to sort."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "overflow-hidden p-0 sm:p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-h-[70vh] overflow-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full border-separate border-spacing-0 text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "sticky top-0 z-20 bg-surface",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-[11px] uppercase tracking-[0.1em] text-faint",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "sticky left-0 z-30 border-b border-line bg-surface px-3 py-3 font-medium",
									children: "#"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "sticky left-10 z-30 min-w-44 border-b border-r border-line bg-surface px-3 py-3 font-medium",
									children: tab === "teams" ? "Team" : "Player"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "border-b border-line px-3 py-3 font-medium",
									children: tab === "teams" ? "W–L" : "G"
								}),
								cols.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "border-b border-line px-3 py-3 font-medium",
									title: `${m.l}: ${m.def}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/stats",
										search: statsSearch(tab, conf, group, m.k),
										className: cn("whitespace-nowrap hover:text-fg", sortMetric.k === m.k && "text-accent"),
										"aria-sort": sortMetric.k === m.k ? m.hi ? "descending" : "ascending" : void 0,
										children: [m.s, sortMetric.k === m.k ? " ▾" : ""]
									})
								}, m.k))
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: shown.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "group hover:bg-raised/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "sticky left-0 z-10 border-b border-line bg-surface px-3 py-2 tabular text-faint group-hover:bg-raised",
								children: r.v[sortMetric.k] == null ? "—" : rankOf.get(r.id)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "sticky left-10 z-10 border-b border-r border-line bg-surface px-3 py-2 group-hover:bg-raised",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/teams/$slug",
									params: { slug: r.slug },
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
										slug: r.slug,
										color: r.color
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block whitespace-nowrap font-medium",
										children: r.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block whitespace-nowrap text-xs text-muted",
										children: tab === "teams" ? r.conference : `${r.pos} · ${r.team}`
									})] })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "whitespace-nowrap border-b border-line px-3 py-2 tabular text-muted",
								children: tab === "teams" ? r.wl : r.g
							}),
							cols.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: cn("border-b border-line px-3 py-2 tabular", sortMetric.k === m.k ? "text-fg" : "text-muted"),
								children: fmtStat(m, r.v[m.k])
							}, m.k))
						]
					}, r.id)) })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsLeaders, {
				tab,
				rows: pool,
				metric: sortMetric
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsScatter, {
				tab,
				rows: pool
			}, `sc-${tab}`)]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsCompare, {
				tab,
				rows,
				cohort: pool,
				conf
			}, `cmp-${tab}`)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-1 font-display text-lg",
					children: "Definitions and sources"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-4 text-xs leading-relaxed text-muted",
					children: [
						"Box: ",
						meta.box_source,
						". Advanced: ",
						meta.advanced_source,
						", through games kicked off by ",
						meta.advanced_through.slice(0, 10),
						" (UTC). ",
						meta.adjustment,
						" Player EPA shows \"—\" when CFBD play-by-play does not credit at least 70% of the player's box volume (matched: QB ",
						meta.matched_advanced.qb,
						", RB ",
						meta.matched_advanced.rush,
						", WR/TE ",
						meta.matched_advanced.rec,
						"). CFBD counting stats can differ from the official box by 1–3, so counts here always come from cfbstats."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2",
					children: METRICS[tab].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
						className: "font-medium",
						children: [
							m.l,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-normal text-faint",
								children: [
									"· ",
									m.s,
									" · ",
									SOURCE_LABEL[m.src]
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "text-muted",
						children: m.def
					})] }, m.k))
				})
			]
		})
	] });
}
//#endregion
export { StatsPage as component };
