import { c as predictMatchup } from "./chicago-ce7grsdn.mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Panel, K as fmtNum, W as cn, b as TeamLink } from "./router-BJ-BF5JA.mjs";
import { t as hx_refit_2026_default } from "./hx_refit_2026-Df8LzcA4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hx-results-CT_y50Wy.js
var import_jsx_runtime = require_jsx_runtime();
/**
* HX vs results — measured only. Expected margins come from the pregame-locked HX on each
* stamped FINAL (lock_home_hx / lock_away_hx, coalesced into homeHx / awayHx by the query),
* through the shipped spread map. HX-by-week and preseason ranks come from the weekly refit
* file data/hx_refit_2026.json (scripts/hx-refit.mjs). Nothing here is estimated.
*/
var refit = hx_refit_2026_default;
var boardBySlug = new Map(refit.board.map((r) => [r.slug, r]));
var HX_REFIT_STAMP = refit.meta.hx_stamp;
var HX_REFIT_THROUGH_WEEK = refit.meta.through_week;
/** Stamped FBS–FBS FINALs for a team, graded against the pregame HX line. */
function hxVsResults(teamSlug, games) {
	const rows = [];
	for (const g of games) {
		if (g.isFcs || g.hxUnrated || g.status !== "final" || g.homeScore == null || g.awayScore == null) continue;
		const home = g.homeSlug === teamSlug;
		if (!home && g.awaySlug !== teamSlug) continue;
		const pred = predictMatchup({
			hxRating: g.homeHx,
			offenseRating: g.homeOff,
			defenseRating: g.homeDef
		}, {
			hxRating: g.awayHx,
			offenseRating: g.awayOff,
			defenseRating: g.awayDef
		}, { neutral: g.neutral });
		const sign = home ? 1 : -1;
		const expected = sign * pred.spread;
		const actual = sign * (g.homeScore - g.awayScore);
		rows.push({
			gameId: g.id,
			week: g.week,
			opponentSlug: home ? g.awaySlug : g.homeSlug,
			opponentShort: home ? g.awayShort : g.homeShort,
			home,
			neutral: g.neutral,
			expected,
			actual,
			diff: actual - expected
		});
	}
	return rows.sort((a, b) => a.week - b.week || a.gameId - b.gameId);
}
function summarizeHxResults(rows) {
	if (rows.length === 0) return null;
	const n = rows.length;
	const sum = (f) => rows.reduce((s, r) => s + f(r), 0);
	return {
		n,
		avgExpected: sum((r) => r.expected) / n,
		avgActual: sum((r) => r.actual) / n,
		avgDiff: sum((r) => r.diff) / n,
		suHits: rows.filter((r) => r.actual !== 0 && Math.sign(r.actual) === Math.sign(r.expected)).length
	};
}
function hxTrajectory(slug) {
	const b = boardBySlug.get(slug);
	const series = refit.history.hx[slug];
	if (!b || !series) return null;
	return {
		points: refit.history.weeks.map((week, i) => ({
			week,
			hx: series[i]
		})),
		preHx: b.pre_hx,
		preRank: b.pre_rank,
		hx: b.hx,
		rank: b.rank
	};
}
/** Biggest HX rank moves since the preseason board (delta = preRank − rank; positive = rose). */
function risersFallers(limit = 6) {
	const all = refit.board.flatMap((r) => r.pre_rank == null ? [] : [{
		slug: r.slug,
		preRank: r.pre_rank,
		rank: r.rank,
		delta: r.pre_rank - r.rank,
		preHx: r.pre_hx,
		hx: r.hx
	}]);
	return {
		risers: all.filter((m) => m.delta > 0).sort((a, b) => b.delta - a.delta || a.rank - b.rank).slice(0, limit),
		fallers: all.filter((m) => m.delta < 0).sort((a, b) => a.delta - b.delta || a.rank - b.rank).slice(0, limit)
	};
}
var signed = (n, d = 1) => `${n > 0 ? "+" : n < 0 ? "−" : ""}${fmtNum(Math.abs(n), d)}`;
function Sparkline({ values, className }) {
	if (values.length < 2) return null;
	const w = 240;
	const h = 56;
	const min = Math.min(...values);
	const span = Math.max(...values) - min || 1;
	const pts = values.map((v, i) => {
		return [i / (values.length - 1) * 232 + 4, 52 - (v - min) / span * 48];
	});
	const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
	const [lx, ly] = pts[pts.length - 1];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${w} ${h}`,
		className: cn("h-14 w-full max-w-[240px]", className),
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d,
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			className: "text-accent"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: lx,
			cy: ly,
			r: "3",
			className: "fill-accent"
		})]
	});
}
/** Team page: pregame HX line vs final margin on every stamped FBS FINAL, plus HX by week. */
function HxResultsPanel({ teamSlug, games }) {
	const rows = hxVsResults(teamSlug, games);
	const summary = summarizeHxResults(rows);
	const traj = hxTrajectory(teamSlug);
	if (!summary && !traj) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "mb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "HX vs results"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-faint",
					children: [
						HX_REFIT_STAMP,
						" · FBS FINALs through Week ",
						HX_REFIT_THROUGH_WEEK
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Expected margin is the pregame HX line for each game (the board in effect at kickoff). Actual is the final."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-6 sm:grid-cols-[1fr_auto]",
				children: [summary ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid grid-cols-3 gap-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[11px] uppercase tracking-[0.14em] text-faint",
							children: "Expected"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-display text-2xl tabular leading-none",
							children: signed(summary.avgExpected)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[11px] uppercase tracking-[0.14em] text-faint",
							children: "Actual"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-display text-2xl tabular leading-none",
							children: signed(summary.avgActual)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[11px] uppercase tracking-[0.14em] text-faint",
							children: "vs HX"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: cn("mt-1 font-display text-2xl tabular leading-none", summary.avgDiff > 0 ? "text-up" : summary.avgDiff < 0 ? "text-down" : ""),
							children: signed(summary.avgDiff)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "col-span-3 text-xs text-muted",
							children: [
								"Points per game, ",
								summary.n,
								" FBS FINAL",
								summary.n === 1 ? "" : "s",
								". HX picked the winner",
								" ",
								summary.suHits,
								"/",
								summary.n,
								"."
							]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: games.some((g) => g.hxUnrated && (g.homeSlug === teamSlug || g.awaySlug === teamSlug)) ? "No graded FINALs yet. Games played before this team joined the board had no pregame HX line." : "No FBS FINALs stamped yet."
				}), traj ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] uppercase tracking-[0.14em] text-faint",
						children: "HX by week"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, {
						values: traj.points.map((p) => p.hx),
						className: "mt-1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs tabular text-muted",
						children: [
							traj.preRank == null ? "Newcomer prior" : "Preseason",
							" ",
							fmtNum(traj.preHx, 2),
							traj.preRank == null ? "" : ` (#${traj.preRank})`,
							" → now ",
							fmtNum(traj.hx, 2),
							" (#",
							traj.rank,
							")"
						]
					})
				] }) : null]
			}),
			rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm tabular",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line text-left text-[11px] uppercase tracking-[0.14em] text-faint",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 font-normal",
								children: "Wk"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 font-normal",
								children: "Opponent"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 text-right font-normal",
								children: "Expected"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 text-right font-normal",
								children: "Actual"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-right font-normal",
								children: "Diff"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line last:border-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 pr-3 text-muted",
								children: r.week
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-2 pr-3",
								children: [r.neutral ? "vs " : r.home ? "" : "@ ", r.opponentShort]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 pr-3 text-right",
								children: signed(r.expected)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 pr-3 text-right",
								children: signed(r.actual, 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: cn("py-2 text-right", r.diff > 0 ? "text-up" : r.diff < 0 ? "text-down" : "text-muted"),
								children: signed(r.diff)
							})
						]
					}, r.gameId)) })]
				})
			}) : null
		]
	});
}
function MoverList({ title, movers, bySlug }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "text-[11px] uppercase tracking-[0.14em] text-faint",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-2",
		children: movers.map((m) => {
			const t = bySlug.get(m.slug);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between gap-3 py-1.5",
				children: [t ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamLink, {
					slug: t.slug,
					name: t.shortName,
					color: t.colorPrimary
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.slug }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "shrink-0 text-right text-sm tabular",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: m.delta > 0 ? "text-up" : "text-down",
						children: signed(m.delta, 0)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-2 text-[11px] text-faint",
						children: [
							"#",
							m.preRank,
							" → #",
							m.rank
						]
					})]
				})]
			}, m.slug);
		})
	})] });
}
/** Homepage: biggest HX rank moves since the preseason board. */
function RisersFallersCard({ teams, limit = 5 }) {
	const { risers, fallers } = risersFallers(limit);
	const bySlug = new Map(teams.map((t) => [t.slug, t]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl tracking-wide",
			children: "Risers & fallers"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 mb-4 text-sm text-muted",
			children: [
				"HX rank now vs the preseason board · ",
				HX_REFIT_STAMP,
				", FINALs through Week ",
				HX_REFIT_THROUGH_WEEK,
				"."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoverList, {
				title: "Risers",
				movers: risers,
				bySlug
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoverList, {
				title: "Fallers",
				movers: fallers,
				bySlug
			})]
		})
	] });
}
//#endregion
export { RisersFallersCard as n, HxResultsPanel as t };
