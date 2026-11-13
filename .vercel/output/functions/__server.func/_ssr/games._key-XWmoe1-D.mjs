import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as formatKickDayTitle, r as formatKickCt } from "./chicago-CEb1x88L.mjs";
import { V as favoriteLine, X as PageHead, Z as Panel, i as Route$2, it as fmtPct, tt as cn, w as TeamMark } from "./router-C8l9Ifjn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/games._key-XWmoe1-D.js
var import_jsx_runtime = require_jsx_runtime();
var pct = (v) => v == null ? "—" : `${Number(v).toFixed(1)}%`;
var dec = (d) => (v) => v == null ? "—" : `${Number(v) < 0 ? "−" : ""}${Math.abs(Number(v)).toFixed(d)}`;
var int = (v) => v == null ? "—" : String(v);
var pair = (a, b) => a == null || b == null ? "—" : `${a}–${b}`;
var BOX = [
	{
		label: "First downs",
		get: (s) => int(s.fd),
		num: (s) => s.fd,
		hi: true
	},
	{
		label: "Total yards",
		get: (s) => int(s.yds),
		num: (s) => s.yds,
		hi: true
	},
	{
		label: "Rushing",
		get: (s) => s.ra == null ? "—" : `${s.ra}–${s.ry}`,
		num: (s) => s.ry,
		hi: true,
		hint: "carries–yards"
	},
	{
		label: "Yards per carry",
		get: (s) => s.ra ? (Number(s.ry) / Number(s.ra)).toFixed(1) : "—",
		num: (s) => s.ra ? Number(s.ry) / Number(s.ra) : null,
		hi: true
	},
	{
		label: "Passing",
		get: (s) => s.pa == null ? "—" : `${s.cmp}/${s.pa}, ${s.py}`,
		num: (s) => s.py,
		hi: true,
		hint: "comp/att, net yards"
	},
	{
		label: "3rd down",
		get: (s) => pair(s.c3, s.a3),
		num: (s) => s.a3 ? Number(s.c3) / Number(s.a3) : null,
		hi: true
	},
	{
		label: "4th down",
		get: (s) => pair(s.c4, s.a4)
	},
	{
		label: "Turnovers",
		get: (s) => int(s.to),
		num: (s) => s.to,
		hi: false,
		hint: "INT thrown + fumbles lost"
	},
	{
		label: "Sacks (by defense)",
		get: (s) => int(s.sk),
		num: (s) => s.sk,
		hi: true
	},
	{
		label: "Tackles for loss",
		get: (s) => int(s.tfl),
		num: (s) => s.tfl,
		hi: true
	},
	{
		label: "Penalties",
		get: (s) => pair(s.pen, s.peny),
		num: (s) => s.peny,
		hi: false,
		hint: "number–yards"
	},
	{
		label: "Time of possession",
		get: (s) => s.top == null ? "—" : String(s.top)
	}
];
var ADV = [
	{
		label: "EPA per play",
		get: (s) => dec(3)(s.epa),
		num: (s) => s.epa,
		hi: true,
		hint: "Expected points added per offensive play"
	},
	{
		label: "Success rate",
		get: (s) => pct(s.sr),
		num: (s) => s.sr,
		hi: true,
		hint: "Plays that gain enough yardage for the down and distance"
	},
	{
		label: "Explosiveness",
		get: (s) => dec(2)(s.xpl),
		num: (s) => s.xpl,
		hi: true,
		hint: "Average EPA on successful plays"
	},
	{
		label: "Rush EPA / play",
		get: (s) => dec(3)(s.repa),
		num: (s) => s.repa,
		hi: true
	},
	{
		label: "Rush success",
		get: (s) => pct(s.rsr),
		num: (s) => s.rsr,
		hi: true
	},
	{
		label: "Pass EPA / play",
		get: (s) => dec(3)(s.pepa),
		num: (s) => s.pepa,
		hi: true
	},
	{
		label: "Pass success",
		get: (s) => pct(s.psr),
		num: (s) => s.psr,
		hi: true
	},
	{
		label: "Standard-down success",
		get: (s) => pct(s.sdsr),
		num: (s) => s.sdsr,
		hi: true
	},
	{
		label: "Passing-down success",
		get: (s) => pct(s.pdsr),
		num: (s) => s.pdsr,
		hi: true
	},
	{
		label: "Line yards / carry",
		get: (s) => dec(2)(s.ly),
		num: (s) => s.ly,
		hi: true
	},
	{
		label: "Stuff rate",
		get: (s) => pct(s.stuff),
		num: (s) => s.stuff,
		hi: false,
		hint: "Runs stopped at or behind the line"
	},
	{
		label: "Plays · drives",
		get: (s) => s.plays == null ? "—" : `${s.plays} · ${s.drives}`
	}
];
function BoxTable({ title, lines, g, note }) {
	const sides = title === "Box score" ? g.box : g.adv;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "p-0 sm:p-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-baseline justify-between gap-2 px-4 pt-4 sm:px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: note
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "mt-3 w-full table-fixed text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("colgroup", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { className: "w-[30%] sm:w-[22%]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { className: "w-[30%] sm:w-[22%]" })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "text-[11px] uppercase tracking-[0.12em] text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "border-b border-line px-4 py-2 text-left font-normal sm:px-5",
							children: "Stat"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "border-b border-line px-2 py-2 text-right font-normal",
							children: g.away.shortName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "border-b border-line px-4 py-2 text-right font-normal sm:px-5",
							children: g.home.shortName
						})
					]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: lines.map((l) => {
					const a = l.num?.(sides.away) ?? null;
					const h = l.num?.(sides.home) ?? null;
					const better = a == null || h == null || a === h || l.hi == null ? null : a > h === l.hi ? "away" : "home";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "border-b border-line px-4 py-2 sm:px-5",
							children: [l.label, l.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-[11px] leading-snug text-faint",
								children: l.hint
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cn("border-b border-line px-2 py-2 text-right tabular", better === "away" ? "font-semibold text-fg" : "text-muted"),
							children: l.get(sides.away)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cn("border-b border-line px-4 py-2 text-right tabular sm:px-5", better === "home" ? "font-semibold text-fg" : "text-muted"),
							children: l.get(sides.home)
						})
					] }, l.label);
				}) })
			]
		})]
	});
}
function GamePageView() {
	const g = Route$2.useLoaderData();
	const final = g.status === "final" && g.homeScore != null && g.awayScore != null;
	const vegasLine = g.vegasSpread == null ? null : favoriteLine(g.home.shortName, g.away.shortName, g.vegasSpread);
	const gr = g.graded;
	const hxLine = gr?.graded && gr.hxSpread != null ? favoriteLine(g.home.shortName, g.away.shortName, gr.hxSpread) : null;
	const hxFavP = gr?.graded && gr.pHome != null && gr.hxSpread != null ? gr.hxSpread >= 0 ? gr.pHome : 1 - gr.pHome : null;
	const winner = final ? g.homeScore > g.awayScore ? "home" : "away" : null;
	const sideRow = (t, score, side) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/teams/$slug",
			params: { slug: t.slug },
			className: "flex min-w-0 items-center gap-3 hover:text-accent",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
				slug: t.slug,
				color: t.color,
				swatchClassName: "h-9 w-1.5",
				logoSize: 28
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block truncate text-lg font-medium",
					children: t.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-xs text-muted",
					children: t.hxRank != null ? `HX No. ${t.hxRank} now` : "Not on the HX board"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-display text-5xl tabular", winner && winner !== side ? "text-muted" : "text-fg"),
			children: score ?? "—"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: `Week ${g.week} · ${formatKickDayTitle(g.kickoffAt, g.kickoffDate)}${g.neutral ? " · Neutral site" : ""}`,
			title: `${g.away.shortName} at ${g.home.shortName}`,
			lede: [
				final ? "FINAL" : g.kickoffAt ? formatKickCt(g.kickoffAt) : null,
				g.tv,
				g.location
			].filter(Boolean).join(" · ")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [sideRow(g.away, g.awayScore, "away"), sideRow(g.home, g.homeScore, "home")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] uppercase tracking-[0.12em] text-muted",
								children: "Pregame HX"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 tabular",
								children: hxLine ?? (final ? g.unrated ? "No pregame HX" : "n/a" : "—")
							}),
							hxFavP != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted",
								children: [fmtPct(hxFavP * 100, 1), " to win"]
							}) : null
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] uppercase tracking-[0.12em] text-muted",
								children: "Vegas line"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 tabular",
								children: vegasLine ?? "Not on file"
							}),
							g.vegasTotal != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted",
								children: ["O/U ", g.vegasTotal.toFixed(1)]
							}) : null
						] }),
						gr?.graded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] uppercase tracking-[0.12em] text-muted",
							children: "HX pick"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1",
							children: gr.suHit == null ? "Pick'em" : gr.suHit ? "Right" : "Wrong"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] uppercase tracking-[0.12em] text-muted",
							children: "Line missed by"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 tabular",
							children: [gr.absErr.toFixed(1), " pts"]
						})] })] }) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-xs text-muted",
					children: [
						final ? "Pregame HX is the board frozen when this game was stamped FINAL; later refits never change it. " : "This game hasn't been played. ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/matchup",
							search: {
								home: g.home.slug,
								away: g.away.slug,
								...g.neutral ? { neutral: true } : {}
							},
							className: "underline underline-offset-4 hover:text-fg",
							children: final ? "Run it on today's board" : "HX line on today's board"
						}),
						final ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/accuracy",
							search: { week: g.week },
							className: "underline underline-offset-4 hover:text-fg",
							children: [
								"Week ",
								g.week,
								" accuracy"
							]
						})] }) : null
					]
				})
			]
		}),
		final ? g.box ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoxTable, {
				title: "Box score",
				lines: BOX,
				g,
				note: "Team totals"
			}), g.adv ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoxTable, {
				title: "Advanced",
				lines: ADV,
				g,
				note: "Offense, all plays"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "Advanced"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "No play-by-play advanced stats on file for this game."
			})] })]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "No box score on file for this game yet. It appears after the next weekly data pull."
		}) }) : null,
		g.source ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-xs text-faint",
			children: [
				"Source: ",
				g.source.box,
				", games through ",
				g.source.through.slice(0, 10),
				". Bold = the better side for that stat."
			]
		}) : null
	] });
}
//#endregion
export { GamePageView as component };
