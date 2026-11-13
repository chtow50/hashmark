import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useNavigate, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Check, i as Plus, r as Search, t as X } from "../_libs/lucide-react.mjs";
import { a as STAT_TABS, c as columnSet, d as metricOf, h as standing, i as SOURCE_LABEL, m as sortRows, n as METRICS, o as TAB_LABEL, p as percentileMap, r as QUICK_VIEWS, t as COLUMN_SETS, u as fmtStat } from "./stats-CFALzbEE.mjs";
import { B as Panel, J as parseConf, L as CONFS, S as teamLogoSrc, U as cn, b as TeamMark, o as Route$5, q as inConf, z as PageHead } from "./router-CZUHcH44.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stats-BY4HncbE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var label = (tab, r) => tab === "teams" ? r.name : `${r.name} (${r.team})`;
/**
* Cell background by percentile (100 = best): up-tone above the median, down-tone below,
* strength grows toward the extremes; the middle third stays unshaded.
*/
function cellTint(p) {
	if (p == null) return void 0;
	const d = (p - 50) / 50;
	if (Math.abs(d) < .34) return void 0;
	const a = Math.round(7 + (Math.abs(d) - .34) * 30);
	return { background: `color-mix(in srgb, var(--color-${d > 0 ? "up" : "down"}) ${a}%, transparent)` };
}
function MetricSelect({ tab, value, onChange, id, labelText }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		htmlFor: id,
		className: "flex min-w-0 flex-1 flex-col gap-1 text-xs text-muted",
		children: [labelText, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			id,
			value,
			onChange: (e) => onChange(e.target.value),
			className: "h-11 w-full rounded-lg bg-raised px-2 text-sm text-fg",
			children: COLUMN_SETS[tab].slice(1).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
				label: s.label,
				children: s.cols.map((k) => {
					const m = metricOf(tab, k);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: k,
						children: m.l
					}, k);
				})
			}, s.key))
		})]
	});
}
/** Top 10 bars for the sorted metric inside the current conference filter. */
function StatsLeaders({ tab, rows, metric }) {
	const top = sortRows(rows, metric).filter((r) => r.v[metric.k] != null).slice(0, 10);
	const all = rows.map((r) => r.v[metric.k]).filter((x) => x != null);
	const worst = all.length ? metric.hi ? Math.min(...all) : Math.max(...all) : 0;
	const best = top[0]?.v[metric.k] ?? 0;
	const span = Math.abs(best - worst) || 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "h-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "font-display text-lg",
				children: ["Top 10 · ", metric.l]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-4 text-xs text-muted",
				children: [
					"Follows the table sort. ",
					metric.hi ? "Higher is better." : "Lower is better.",
					" Bars start at the worst value in view."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-2.5",
				children: top.map((r, i) => {
					const v = r.v[metric.k];
					const w = Math.max(3, 100 * Math.abs(v - worst) / span);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[1.25rem_minmax(0,1fr)_4rem] items-center gap-x-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right tabular text-faint",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex min-w-0 items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
									slug: r.slug,
									color: r.color,
									logoSize: 16
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "truncate",
									title: label(tab, r),
									children: [r.name, tab !== "teams" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted",
										children: [" · ", r.team]
									}) : null]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right font-medium tabular",
								children: fmtStat(metric, v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "col-span-2 mt-1 h-1.5 rounded-full bg-raised",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block h-1.5 rounded-full",
									style: {
										width: `${w}%`,
										background: r.color
									}
								})
							})
						]
					}, r.id);
				})
			})
		]
	});
}
var SCATTER_DEFAULTS = {
	teams: ["epa", "oepa"],
	qb: ["use", "epa"],
	rush: ["att", "epa"],
	rec: ["use", "epa"]
};
/** SVG scatter: any two metrics, better is always up/right, average lines, compared rows labeled. */
function StatsScatter({ tab, rows, picks }) {
	const [xk, setX] = (0, import_react.useState)(SCATTER_DEFAULTS[tab][0]);
	const [yk, setY] = (0, import_react.useState)(SCATTER_DEFAULTS[tab][1]);
	const [hover, setHover] = (0, import_react.useState)(null);
	const xm = metricOf(tab, xk);
	const ym = metricOf(tab, yk);
	const pts = rows.filter((r) => r.v[xk] != null && r.v[yk] != null);
	const box = (0, import_react.useRef)(null);
	const [W, setW] = (0, import_react.useState)(640);
	(0, import_react.useEffect)(() => {
		const el = box.current;
		if (!el) return;
		const ro = new ResizeObserver(([e]) => setW(Math.max(300, Math.round(e.contentRect.width))));
		ro.observe(el);
		return () => ro.disconnect();
	}, []);
	const H = Math.round(Math.min(460, Math.max(300, W * .72))), PL = 52, PR = 12, PT = 18, PB = 44;
	const ext = (k) => {
		const v = pts.map((r) => r.v[k]);
		const lo = Math.min(...v), hi = Math.max(...v);
		const pad = (hi - lo) * .06 || 1;
		return [lo - pad, hi + pad];
	};
	const [x0, x1] = pts.length ? ext(xk) : [0, 1];
	const [y0, y1] = pts.length ? ext(yk) : [0, 1];
	const fx = (v) => (v - x0) / (x1 - x0);
	const fy = (v) => (v - y0) / (y1 - y0);
	const sx = (v) => PL + (xm.hi ? fx(v) : 1 - fx(v)) * (W - PL - PR);
	const sy = (v) => PT + (ym.hi ? 1 - fy(v) : fy(v)) * (H - PT - PB);
	const ticks = (a, b) => [
		.1,
		.3,
		.5,
		.7,
		.9
	].map((t) => a + t * (b - a));
	const mean = (k) => pts.length ? pts.reduce((s, r) => s + r.v[k], 0) / pts.length : 0;
	const mx = mean(xk), my = mean(yk);
	const logos = tab === "teams";
	const picked = pts.filter((r) => picks.includes(r.id));
	const tip = hover ? {
		x: sx(hover.v[xk]),
		y: sy(hover.v[yk])
	} : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg",
			children: "Chart builder"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-3 text-xs text-muted",
			children: "Pick any two stats. Axes are oriented so up and to the right is always better; dashed lines are the average in view. Rows in Compare are labeled."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex flex-col gap-3 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricSelect, {
				id: "sc-x",
				labelText: "Across (x)",
				tab,
				value: xk,
				onChange: setX
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricSelect, {
				id: "sc-y",
				labelText: "Up (y)",
				tab,
				value: yk,
				onChange: setY
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			ref: box,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: `0 0 ${W} ${H}`,
				width: W,
				height: H,
				className: "block h-auto w-full select-none",
				role: "img",
				"aria-label": `${ym.l} against ${xm.l}`,
				onMouseLeave: () => setHover(null),
				children: [
					ticks(x0, x1).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: sx(t),
						x2: sx(t),
						y1: PT,
						y2: H - PB,
						stroke: "var(--color-line)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: sx(t),
						y: H - PB + 16,
						textAnchor: "middle",
						fill: "var(--color-muted)",
						fontSize: "11",
						children: fmtStat(xm, t)
					})] }, `x${t}`)),
					ticks(y0, y1).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: PL,
						x2: W - PR,
						y1: sy(t),
						y2: sy(t),
						stroke: "var(--color-line)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 46,
						y: sy(t) + 4,
						textAnchor: "end",
						fill: "var(--color-muted)",
						fontSize: "11",
						children: fmtStat(ym, t)
					})] }, `y${t}`)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: sx(mx),
						x2: sx(mx),
						y1: PT,
						y2: H - PB,
						stroke: "var(--color-faint)",
						strokeDasharray: "4 4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: PL,
						x2: W - PR,
						y1: sy(my),
						y2: sy(my),
						stroke: "var(--color-faint)",
						strokeDasharray: "4 4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: W - PR - 4,
						y: 30,
						textAnchor: "end",
						fill: "var(--color-up)",
						fontSize: "11",
						children: "Better on both ↗"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 56,
						y: H - PB - 6,
						fill: "var(--color-down)",
						fontSize: "11",
						children: "↙ Worse on both"
					}),
					pts.map((r) => {
						const cx = sx(r.v[xk]), cy = sy(r.v[yk]);
						const src = logos ? teamLogoSrc(r.slug) : null;
						const on = hover?.id === r.id || picks.includes(r.id);
						const dim = picks.length > 0 && !on;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							onMouseEnter: () => setHover(r),
							opacity: dim ? .55 : 1,
							style: { cursor: "pointer" },
							children: [src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("image", {
								href: src,
								style: { filter: "drop-shadow(0 0 1px rgba(242,241,236,0.75))" },
								x: cx - (on ? 11 : 8),
								y: cy - (on ? 11 : 8),
								width: on ? 22 : 16,
								height: on ? 22 : 16
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx,
								cy,
								r: on ? 6.5 : 4.5,
								fill: r.color,
								stroke: "var(--color-bg)",
								strokeWidth: "1"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx,
								cy,
								r: 11,
								fill: "transparent",
								onClick: () => setHover(r)
							})]
						}, r.id);
					}),
					picked.map((r) => {
						const cx = sx(r.v[xk]), cy = sy(r.v[yk]);
						const right = cx < W - 120;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							pointerEvents: "none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx,
								cy,
								r: 13,
								fill: "none",
								stroke: "var(--color-fg)",
								strokeWidth: "1.5"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
								x: right ? cx + 16 : cx - 16,
								y: cy + 4,
								textAnchor: right ? "start" : "end",
								fill: "var(--color-fg)",
								fontSize: "12",
								fontWeight: "600",
								paintOrder: "stroke",
								stroke: "var(--color-surface)",
								strokeWidth: "3",
								children: r.name
							})]
						}, `l-${r.id}`);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
						x: W - PR,
						y: H - 6,
						textAnchor: "end",
						fill: "var(--color-fg)",
						fontSize: "12",
						children: [xm.l, " →"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
						x: PL,
						y: 14,
						fill: "var(--color-fg)",
						fontSize: "12",
						children: ["↑ ", ym.l]
					})
				]
			}), hover && tip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute z-10 w-56 rounded-lg border border-border bg-raised p-2.5 text-xs shadow-xl",
				style: {
					left: Math.max(0, Math.min(tip.x - 112, W - 224)),
					top: Math.max(tip.y - 84, 0)
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex items-center gap-1.5 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-2.5 w-2.5 rounded-full",
							style: { background: hover.color }
						}), label(tab, hover)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-muted",
						children: [
							xm.s,
							": ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg tabular",
								children: fmtStat(xm, hover.v[xk])
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-muted",
						children: [
							ym.s,
							": ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg tabular",
								children: fmtStat(ym, hover.v[yk])
							})
						]
					})
				]
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-xs text-muted",
			children: [
				pts.length,
				" plotted",
				xm.hi && ym.hi ? "" : " · lower-is-better axes are flipped",
				". Hover or tap a ",
				logos ? "logo" : "dot",
				" for values."
			]
		})
	] });
}
/** 1–2 picks side by side everywhere; 3–4 picks wrap to two columns on phones. */
var gridCols = (n) => n <= 1 ? "grid-cols-1" : n === 2 ? "grid-cols-2" : n === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4";
/** Compare up to 4 rows: value, percentile and rank inside the current conference cohort. */
function StatsCompare({ tab, rows, cohort, conf, picks, setPicks, defaultSet }) {
	const [showAll, setShowAll] = (0, import_react.useState)(false);
	const [text, setText] = (0, import_react.useState)("");
	const chosen = picks.map((id) => rows.find((r) => r.id === id)).filter((r) => Boolean(r));
	const options = (0, import_react.useMemo)(() => [...rows].sort((a, b) => a.name.localeCompare(b.name)), [rows]);
	const set = columnSet(tab, defaultSet);
	const metrics = showAll ? METRICS[tab] : set.cols.map((k) => metricOf(tab, k));
	const cohortVals = (m, r) => cohort.some((c) => c.id === r.id) ? cohort.map((c) => c.v[m.k]) : [...cohort.map((c) => c.v[m.k]), r.v[m.k]];
	const tryAdd = (value) => {
		const hit = options.find((r) => label(tab, r).toLowerCase() === value.trim().toLowerCase());
		if (hit && !picks.includes(hit.id) && picks.length < 4) {
			setPicks([...picks, hit.id]);
			setText("");
		} else setText(value);
	};
	const n = chosen.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg",
			children: "Compare"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs text-muted",
			children: [
				"Up to 4. Add from the table (+) or search here. Bars and P = percentile within ",
				conf === "All" ? "all FBS" : conf,
				" ",
				tab === "teams" ? "teams" : "qualifiers",
				" (P100 = best)."
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "w-full sm:w-72",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Add to compare"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					list: `cmp-${tab}`,
					value: text,
					disabled: picks.length >= 4,
					onChange: (e) => tryAdd(e.target.value),
					placeholder: picks.length >= 4 ? "Compare is full: remove one" : `Add a ${tab === "teams" ? "team" : "player"}…`,
					className: "h-11 w-full rounded-lg bg-raised px-3 text-sm text-fg placeholder:text-faint disabled:opacity-60"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
					id: `cmp-${tab}`,
					children: options.filter((r) => !picks.includes(r.id)).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: label(tab, r) }, r.id))
				})
			]
		})]
	}), n === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-lg bg-inset px-4 py-8 text-center text-sm text-muted",
		children: "Nothing picked yet. Use + on any row in the table above."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("grid gap-2 border-b border-border pb-3", gridCols(n)),
				children: chosen.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-2 rounded-lg bg-raised py-1 pl-2 pr-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-6 w-1 shrink-0 rounded-full",
							style: { background: r.color }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate font-medium",
								children: r.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-xs text-muted",
								children: tab === "teams" ? r.conference : `${r.pos} · ${r.team}`
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setPicks(picks.filter((p) => p !== r.id)),
							className: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted hover:bg-border hover:text-fg",
							"aria-label": `Remove ${r.name}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})
					]
				}, r.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "divide-y divide-line",
				children: metrics.map((m) => {
					const valid = chosen.map((r) => r.v[m.k]).filter((x) => x != null);
					const best = valid.length > 1 ? m.hi ? Math.max(...valid) : Math.min(...valid) : null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1.5 text-xs text-muted",
							title: m.def,
							children: [m.l, m.hi ? "" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-faint",
								children: " · lower is better"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("grid gap-x-3 gap-y-2", gridCols(n)),
							children: chosen.map((r) => {
								const v = r.v[m.k];
								const s = standing(m, v, cohortVals(m, r));
								const top = best != null && v === best;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline justify-between gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex min-w-0 items-baseline gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "h-2 w-2 shrink-0 self-center rounded-full sm:hidden",
												style: { background: r.color },
												"aria-hidden": true
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("tabular", top ? "font-semibold text-fg" : "text-fg/85"),
												children: fmtStat(m, v)
											})]
										}), s ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "whitespace-nowrap text-[11px] tabular text-muted",
											children: [
												"P",
												Math.round(s.p),
												" · #",
												s.rank
											]
										}) : null]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 h-1.5 rounded-full bg-raised",
										children: s ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-1.5 rounded-full",
											style: {
												width: `${Math.max(3, s.p)}%`,
												background: r.color
											}
										}) : null
									})]
								}, r.id);
							})
						})]
					}, m.k);
				})
			}),
			set.cols.length < METRICS[tab].length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setShowAll(!showAll),
				className: "mt-3 inline-flex h-10 items-center rounded-lg bg-raised px-4 text-sm text-fg hover:bg-border",
				children: showAll ? `Show only ${set.label}` : `Show all ${METRICS[tab].length} stats`
			}) : null
		]
	})] });
}
var DEFAULT_SORT = {
	teams: "nepa",
	qb: "epa",
	rush: "yds",
	rec: "yds"
};
var PAGE = 25;
/** Link search with defaults dropped, matching validateSearch (no redirect on crawl). */
function statsSearch(tab, conf, group, sort, dir) {
	return {
		tab: tab === "teams" ? void 0 : tab,
		conf: conf === "All" ? void 0 : conf,
		group: group && group !== COLUMN_SETS[tab][0].key ? group : void 0,
		sort: sort && sort !== DEFAULT_SORT[tab] ? sort : void 0,
		dir: dir === "worst" ? "worst" : void 0
	};
}
var DEFAULT_PICKS = {
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
function defaultPicks(tab, rows) {
	const ids = DEFAULT_PICKS[tab].map((k) => rows.find((r) => tab === "teams" ? r.slug === k : r.name === k)?.id).filter((x) => Boolean(x));
	for (const r of sortRows(rows, metricOf(tab, DEFAULT_SORT[tab]))) if (ids.length < 3 && !ids.includes(r.id)) ids.push(r.id);
	return ids;
}
function StatsPage() {
	const { meta, rows } = Route$5.useLoaderData();
	const search = Route$5.useSearch();
	const navigate = useNavigate({ from: "/stats" });
	const tab = search.tab ?? "teams";
	const conf = search.conf ?? "All";
	const set = columnSet(tab, search.group);
	const sortMetric = metricOf(tab, search.sort ?? DEFAULT_SORT[tab]) ?? METRICS[tab][0];
	const dir = search.dir === "worst" ? "worst" : "best";
	const [query, setQuery] = (0, import_react.useState)("");
	const [showAll, setShowAll] = (0, import_react.useState)(false);
	const [picksByTab, setPicksByTab] = (0, import_react.useState)({});
	const picks = picksByTab[tab] ?? defaultPicks(tab, rows);
	const setPicks = (next) => setPicksByTab((p) => ({
		...p,
		[tab]: next.slice(0, 4)
	}));
	const togglePick = (id) => setPicks(picks.includes(id) ? picks.filter((p) => p !== id) : [...picks, id]);
	const pool = (0, import_react.useMemo)(() => rows.filter((r) => inConf(r.conference, conf)), [rows, conf]);
	const sorted = (0, import_react.useMemo)(() => sortRows(pool, sortMetric, dir), [
		pool,
		sortMetric,
		dir
	]);
	const rankOf = (0, import_react.useMemo)(() => new Map(sortRows(pool, sortMetric).map((r, i) => [r.id, i + 1])), [pool, sortMetric]);
	const cols = set.cols.map((k) => metricOf(tab, k)).filter(Boolean);
	const pct = (0, import_react.useMemo)(() => new Map(cols.map((m) => [m.k, percentileMap(pool, m)])), [pool, cols]);
	const q = query.trim().toLowerCase();
	const matches = q ? sorted.filter((r) => r.name.toLowerCase().includes(q) || r.team.toLowerCase().includes(q)) : sorted;
	const shown = q || showAll ? matches : matches.slice(0, PAGE);
	const noun = tab === "teams" ? "teams" : tab === "qb" ? "QBs" : tab === "rush" ? "rushers" : "receivers";
	const poolLabel = tab === "teams" ? `${pool.length} teams` : `${pool.length} ${noun} (${meta.pools[tab]})`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: `2026 season · through ${meta.as_of}`,
			title: "Stats explorer",
			lede: "Team and player stats for every FBS program: play-by-play EPA (CollegeFootballData) next to the official box (cfbstats). Sort any column, filter by conference, chart any two stats, and compare up to four. Stats, not ratings: HX stays the one rating."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex flex-col gap-3 lg:flex-row lg:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "inline-flex shrink-0 rounded-xl bg-raised p-1",
				role: "tablist",
				"aria-label": "Stat board",
				children: STAT_TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/stats",
					search: statsSearch(t, conf),
					role: "tab",
					"aria-selected": tab === t,
					className: cn("inline-flex h-10 flex-1 items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors sm:flex-none", tab === t ? "bg-fg text-bg" : "text-muted hover:text-fg"),
					children: TAB_LABEL[t]
				}, t))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative flex-1 sm:max-w-56",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Conference"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: conf,
						onChange: (e) => navigate({ search: statsSearch(tab, parseConf(e.target.value), set.key, sortMetric.k, search.dir) }),
						className: "h-12 w-full rounded-xl bg-raised px-3 text-sm text-fg",
						children: CONFS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: c === "All" ? "All conferences" : c
						}, c))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative flex-1 lg:max-w-72",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "sr-only",
							children: ["Find a ", tab === "teams" ? "team" : "player or team"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "search",
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: tab === "teams" ? "Find a team" : "Find a player or team",
							className: "h-12 w-full rounded-xl bg-raised pl-9 pr-3 text-sm text-fg placeholder:text-faint"
						})
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "-mx-4 mb-2 flex items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mr-1 shrink-0 text-xs text-muted",
				children: "Quick views"
			}), QUICK_VIEWS[tab].map((v) => {
				const active = set.key === v.group && sortMetric.k === v.sort && dir === "best";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/stats",
					search: statsSearch(tab, conf, v.group, v.sort),
					className: cn("inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-full border px-3 text-xs transition-colors", active ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:border-faint hover:text-fg"),
					children: v.label
				}, v.label);
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex gap-1 overflow-x-auto border-b border-border",
			role: "tablist",
			"aria-label": "Columns",
			children: COLUMN_SETS[tab].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/stats",
				search: statsSearch(tab, conf, c.key, c.cols.includes(sortMetric.k) ? sortMetric.k : c.cols[0], search.dir),
				role: "tab",
				"aria-selected": set.key === c.key,
				className: cn("-mb-px inline-flex h-11 shrink-0 items-center border-b-2 px-3 text-sm transition-colors", set.key === c.key ? "border-fg text-fg" : "border-transparent text-muted hover:text-fg"),
				children: c.label
			}, c.key))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortedBy, {
			metric: sortMetric,
			dir,
			poolLabel,
			conf
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "overflow-hidden p-0 sm:p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("overflow-auto", showAll && !q && "max-h-[80vh]"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full border-separate border-spacing-0 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "sticky top-0 z-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-[11px] uppercase tracking-[0.08em] text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "sticky left-0 z-30 w-8 border-b border-border bg-surface px-2 py-3 text-right font-medium",
									children: "#"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "sticky left-8 z-30 border-b border-r border-border bg-surface px-3 py-3 text-left font-medium",
									children: tab === "teams" ? "Team" : "Player"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "whitespace-nowrap border-b border-border bg-surface px-3 py-3 text-right font-medium",
									children: tab === "teams" ? "W–L" : "G"
								}),
								cols.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderCell, {
									m,
									tab,
									conf,
									group: set.key,
									active: sortMetric.k === m.k,
									dir,
									alignRight: i >= cols.length - 3
								}, m.k)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "border-b border-border bg-surface px-2 py-3 text-center font-medium",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: "Compare"
									})
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [shown.map((r) => {
						const picked = picks.includes(r.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: cn("group", picked && "[&>td]:bg-raised"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "sticky left-0 z-10 w-8 border-b border-line bg-surface px-2 py-2 text-right tabular text-faint group-hover:bg-raised",
									children: r.v[sortMetric.k] == null ? "—" : rankOf.get(r.id)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "sticky left-8 z-10 max-w-[8.5rem] border-b border-r border-line bg-surface px-3 py-2 group-hover:bg-raised sm:max-w-none",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/teams/$slug",
										params: { slug: r.slug },
										className: "flex min-h-10 items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
											slug: r.slug,
											color: r.color
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block truncate font-medium sm:whitespace-nowrap",
												children: r.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("truncate text-xs text-muted sm:block sm:whitespace-nowrap", tab === "teams" ? "hidden" : "block"),
												children: tab === "teams" ? r.conference : r.team
											})]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "whitespace-nowrap border-b border-line px-3 py-2 text-right tabular text-muted",
									children: tab === "teams" ? r.wl : r.g
								}),
								cols.map((m) => {
									const p = pct.get(m.k)?.get(r.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: cn("whitespace-nowrap border-b border-line px-3 py-2 text-right tabular", sortMetric.k === m.k ? "font-semibold text-fg" : "text-fg/85"),
										style: cellTint(p),
										title: p == null ? void 0 : `${m.l}: P${Math.round(p)} in ${conf === "All" ? "FBS" : conf}`,
										children: fmtStat(m, r.v[m.k])
									}, m.k);
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "border-b border-line px-1 py-1 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => togglePick(r.id),
										disabled: !picked && picks.length >= 4,
										"aria-pressed": picked,
										"aria-label": picked ? `Remove ${r.name} from compare` : `Add ${r.name} to compare`,
										title: picked ? "In compare (click to remove)" : picks.length >= 4 ? "Compare is full (4)" : "Add to compare",
										className: cn("inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors disabled:opacity-30", picked ? "bg-accent text-accent-fg" : "text-muted hover:bg-raised hover:text-fg"),
										children: picked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
									})
								})
							]
						}, r.id);
					}), shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						colSpan: cols.length + 4,
						className: "px-4 py-10 text-center text-muted",
						children: [
							"No ",
							noun,
							" match “",
							query,
							"”",
							conf !== "All" ? ` in ${conf}` : "",
							"."
						]
					}) }) : null] })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 text-xs text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShadeLegend, {}), !q && matches.length > PAGE ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setShowAll(!showAll),
					className: "inline-flex h-10 items-center rounded-lg bg-raised px-4 text-sm text-fg hover:bg-border",
					children: showAll ? `Show top ${PAGE}` : `Show all ${matches.length} ${noun}`
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					matches.length,
					" ",
					noun
				] })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsCompare, {
				tab,
				rows,
				cohort: pool,
				conf,
				picks,
				setPicks,
				defaultSet: set.key
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsScatter, {
					tab,
					rows: pool,
					picks
				}, `sc-${tab}`)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsLeaders, {
					tab,
					rows: pool,
					metric: sortMetric
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
					className: "flex min-h-11 cursor-pointer list-none items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-display text-lg",
						children: "Glossary, sources and method"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "block text-xs text-muted",
						children: [METRICS[tab].length, " stats on this board · where each number comes from"]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted",
						children: "Show"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-4 mt-3 text-sm leading-relaxed text-muted",
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
								className: "text-xs font-normal text-muted",
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
			] })
		})
	] });
}
function SortedBy({ metric, dir, poolLabel, conf }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 rounded-xl bg-inset px-4 py-3 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted",
				children: "Sorted by "
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: metric.l
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-muted",
				children: [
					" ",
					"· ",
					dir === "best" ? "best first" : "worst first",
					" · ",
					poolLabel,
					conf === "All" ? "" : ` in ${conf}`
				]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-xs leading-relaxed text-muted",
			children: [
				metric.def,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-faint",
					children: [
						"(",
						SOURCE_LABEL[metric.src],
						metric.hi ? "" : "; lower is better",
						")"
					]
				})
			]
		})]
	});
}
function HeaderCell({ m, tab, conf, group, active, dir, alignRight }) {
	const nextDir = active && dir === "best" ? "worst" : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
		className: "group/th relative border-b border-border bg-surface px-3 py-3 text-right font-medium",
		"aria-sort": active ? (m.hi ? dir === "best" : dir === "worst") ? "descending" : "ascending" : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/stats",
			search: statsSearch(tab, conf, group, m.k, nextDir),
			className: cn("inline-flex min-h-8 items-center gap-1 whitespace-nowrap underline decoration-dotted decoration-faint underline-offset-4 hover:text-fg", active && "text-fg decoration-fg"),
			children: [m.s, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: cn("text-[10px]", active ? "opacity-100" : "opacity-0 group-hover/th:opacity-40"),
				children: active && dir === "worst" ? "▲" : "▼"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			role: "tooltip",
			className: cn("pointer-events-none absolute top-full z-40 mt-1 hidden w-64 rounded-lg border border-border bg-raised p-3 text-left text-xs font-normal normal-case leading-relaxed tracking-normal text-fg shadow-xl group-hover/th:block group-focus-within/th:block", alignRight ? "right-0" : "left-0"),
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
function ShadeLegend() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cell shade = percentile in this view:" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "h-3 w-5 rounded-sm",
					style: cellTint(5)
				}), " worse"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-5 rounded-sm border border-border" }), " middle"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "h-3 w-5 rounded-sm",
					style: cellTint(95)
				}), " better"]
			})
		]
	});
}
//#endregion
export { StatsPage as component };
