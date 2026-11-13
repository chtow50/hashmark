import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as modelShare, r as predictMatchup, t as MODEL } from "./model-C--_NYY0.mjs";
import { r as formatKickCt } from "./chicago-CEb1x88L.mjs";
import { n as gameKey } from "./game-key-MogMlpsX.mjs";
import { a as SOURCE_LABEL, f as fmtStat, n as METRICS } from "./stats-Btq-9QFw.mjs";
import { F as confRaceFor, K as vegasParts, L as fmtOdds, Q as PinButton, R as parseRaceConf, S as Stat, V as favoriteLine, X as PageHead, Z as Panel, _ as LineStat, et as apLabel, g as DeskChip, it as fmtPct, n as Route, nt as fmtHeight, rt as fmtNum, tt as cn, v as MixBar, w as TeamMark, y as RankMove } from "./router-v5UZ3BkC.mjs";
import { t as ShareImageButton } from "./share-button-CmQIZdLC.mjs";
import { c as TALENT_UNITS } from "./positions-C0zZnrTX.mjs";
import { n as RosterList } from "./roster-duel-DagSQ4V4.mjs";
import { n as matchupChips, t as isWinnerFlip } from "./schedule-flags-Cn3M-osX.mjs";
import { a as ratedStarCount, o as visibleClassAvg, t as COMPOSITE_SOURCE } from "./recruiting-B2tK2ji6.mjs";
import { n as formatSeasonRecord } from "./sim_free_hx2026_8-RefHl5mu.mjs";
import { a as make12FreeFromSim, n as buildRemainingSchedule, r as buildSeasonSchedule } from "./season-sim-DHebyHVh.mjs";
import { t as HxResultsPanel } from "./hx-results-C4pYjLFW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teams._slug-CnVB3E-z.js
var import_jsx_runtime = require_jsx_runtime();
function TeamHubScheduleRow({ row }) {
	const g = row.game;
	const vegasOnly = row.isFcs;
	const pred = g && !vegasOnly && !g.hxUnrated ? predictMatchup({
		hxRating: g.homeHx,
		offenseRating: g.homeOff,
		defenseRating: g.homeDef
	}, {
		hxRating: g.awayHx,
		offenseRating: g.awayOff,
		defenseRating: g.awayDef
	}, { neutral: g.neutral }) : null;
	const hxLine = g && pred ? favoriteLine(g.homeShort, g.awayShort, pred.spread) : null;
	const hxWin = pred ? pred.spread >= 0 ? pred.homeWinPct : pred.awayWinPct : null;
	const vegasHomeShort = g?.homeShort ?? row.homeShort ?? null;
	const vegasAwayShort = g?.awayShort ?? row.awayShort ?? null;
	const vegasSpread = g?.vegasSpread ?? row.vegasSpread ?? null;
	const vegasLine = vegasSpread == null || vegasHomeShort == null || vegasAwayShort == null ? null : favoriteLine(vegasHomeShort, vegasAwayShort, vegasSpread);
	const flip = g && pred ? isWinnerFlip(pred, g.vegasSpread) : false;
	const chips = g && pred ? matchupChips(pred, {
		neutral: g.neutral,
		vegasSpread: g.vegasSpread,
		status: g.status
	}) : [];
	const isFinal = row.status === "final" && row.homeScore != null && row.awayScore != null && g != null;
	const finalScore = isFinal ? `${g.awayShort} ${g.awayScore}–${g.homeScore} ${g.homeShort}` : null;
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap items-start justify-between gap-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[11px] uppercase tracking-[0.14em] text-faint",
							children: [
								"Week ",
								row.week,
								" · ",
								row.kickoffDate,
								row.neutral ? " · Neutral" : null,
								row.location ? ` · ${row.location}` : null
							]
						}),
						chips.map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskChip, {
							tone: chip.tone,
							children: chip.label
						}, chip.kind)),
						row.isFcs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded bg-raised px-1.5 py-0.5 text-[10px] uppercase tracking-[0.1em] text-faint",
							children: row.hxSpreadPolicy === "vegas_only_fcs_unrated" ? "Vegas-only" : "FCS stub"
						}) : null,
						row.live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskChip, {
							tone: "accent",
							children: "In progress"
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap items-center gap-2",
					children: [row.opponentSlug && row.opponentColor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
						slug: row.opponentSlug,
						color: row.opponentColor,
						logoSize: 20
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-medium",
						children: [
							row.home ? "vs" : "@",
							" ",
							row.opponentLabel
						]
					})]
				}),
				row.kickoffAt || row.tv ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						row.kickoffAt ? formatKickCt(row.kickoffAt) : null,
						row.kickoffAt && row.tv ? " · " : null,
						row.tv
					]
				}) : null,
				isFinal && finalScore ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: finalScore
				}) : null,
				flip && hxLine && g ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-warn",
					children: [
						"HASHMARK takes ",
						hxLine,
						" · Vegas has ",
						vegasLine ?? "the other side"
					]
				}) : null
			]
		})
	}), g && pred && hxLine && hxWin != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineStat, {
				label: "HASHMARK",
				value: hxLine,
				sub: `${fmtPct(hxWin * 100, 1)} to win`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineStat, {
				label: "Vegas",
				...vegasParts(vegasLine, g.vegasTotal)
			}),
			isFinal && finalScore ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineStat, {
				label: "FINAL",
				value: finalScore,
				className: "col-span-2 sm:col-span-1"
			}) : null
		]
	}) : vegasOnly || g?.hxUnrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineStat, {
				label: "HASHMARK",
				value: null,
				empty: g?.hxUnrated ? "No pregame HX" : "FCS opponent · unrated"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineStat, {
				label: "Vegas",
				...vegasParts(vegasLine, null)
			}),
			g?.hxUnrated && isFinal && finalScore ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineStat, {
				label: "FINAL",
				value: finalScore,
				className: "col-span-2 sm:col-span-1"
			}) : null
		]
	}) : null] });
	if (g) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "py-3.5",
		children: [isFinal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/games/$key",
			params: { key: gameKey(row.kickoffDate, g.awaySlug, g.homeSlug) },
			className: "-mx-1 block rounded-md px-1 transition-colors duration-150 hover:bg-raised",
			children: inner
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/matchup",
			search: {
				home: g.homeSlug,
				away: g.awaySlug,
				...g.neutral ? { neutral: true } : {}
			},
			className: "-mx-1 block rounded-md px-1 transition-colors duration-150 hover:bg-raised",
			children: inner
		}), row.opponentSlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/teams/$slug",
			params: { slug: row.opponentSlug },
			className: "mt-1 inline-block text-xs text-muted hover:text-accent",
			children: "Opponent page"
		}) : null]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: "py-3.5",
		children: inner
	});
}
function RemainingScheduleSection({ rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "mb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "Remaining schedule"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Unplayed FBS slate plus FCS stubs. HASHMARK spread and win% from HX; FCS is Vegas-only (no invented HASHMARK spread)."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs tabular text-faint",
				children: rows.length === 0 ? "Season complete" : `${rows.length} left`
			})]
		}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "No remaining games on the board."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-line",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamHubScheduleRow, { row }, row.key))
		})]
	});
}
function SeasonScheduleSection({ rows }) {
	if (rows.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "mb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "Season schedule"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Full FBS slate — HASHMARK line and Vegas close when stamped; FINAL when locked."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-line",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamHubScheduleRow, { row }, row.key))
		})]
	});
}
var W = 320;
var H = 56;
var PAD = 6;
/** Team colors too dark to read on the dark board fall back to the text color. */
function readable(hex) {
	const m = /^#?([0-9a-f]{6})$/i.exec(hex ?? "");
	if (!m) return "currentColor";
	const n = parseInt(m[1], 16);
	const lin = (c) => (c /= 255) <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
	return .2126 * lin(n >> 16 & 255) + .7152 * lin(n >> 8 & 255) + .0722 * lin(n & 255) < .07 ? "currentColor" : `#${m[1]}`;
}
function num(v) {
	return `${v < 0 ? "−" : ""}${Math.abs(v).toFixed(2)}`;
}
function sign(v) {
	return `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v).toFixed(2)}`;
}
/** HX entering each week, from the refit history. Points only where a number exists. */
function HxSparkline({ history, color: teamColor }) {
	const color = readable(teamColor);
	const pts = history.points;
	const first = pts[0];
	const last = pts[pts.length - 1];
	if (pts.length < 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm text-muted",
		children: [
			"HX history starts the week this team joined the board (Week ",
			first.week,
			"): ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular text-fg",
				children: num(first.hx)
			}),
			", No.",
			" ",
			first.rank,
			"."
		]
	});
	const vals = pts.map((p) => p.hx);
	const lo = Math.min(...vals);
	const hi = Math.max(...vals);
	const span = hi - lo || 1;
	const x = (i) => PAD + i * 308 / (pts.length - 1);
	const y = (v) => PAD + (hi - v) * 44 / span;
	const path = pts.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.hx).toFixed(1)}`).join(" ");
	const delta = last.hx - first.hx;
	const rankMove = first.rank - last.rank;
	const label = `HX by week: ${pts.map((p) => `Week ${p.week} ${num(p.hx)} (No. ${p.rank})`).join(", ")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] uppercase tracking-[0.12em] text-muted",
					children: "HX by week"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted",
					children: [
						"Since preseason ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular text-fg",
							children: sign(delta)
						}),
						" HX ·",
						" ",
						rankMove === 0 ? "rank unchanged" : `${rankMove > 0 ? "up" : "down"} ${Math.abs(rankMove)} spot${Math.abs(rankMove) === 1 ? "" : "s"}`
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: `0 0 ${W} ${H}`,
				className: "mt-2 h-14 w-full text-fg",
				preserveAspectRatio: "none",
				role: "img",
				"aria-label": label,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: path,
					fill: "none",
					stroke: color,
					strokeWidth: 2,
					vectorEffect: "non-scaling-stroke",
					strokeLinejoin: "round"
				}), pts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: x(i),
					cy: y(p.hx),
					r: i === pts.length - 1 ? 3 : 1.8,
					fill: color,
					vectorEffect: "non-scaling-stroke",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `Entering Week ${p.week}${p.week === 1 ? " (preseason)" : ""}: HX ${num(p.hx)}, No. ${p.rank} of ${p.of}` })
				}, p.week))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex justify-between text-[11px] tabular text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Wk ",
					first.week,
					" ",
					first.week === 1 ? "(pre) " : "",
					num(first.hx),
					" · No. ",
					first.rank
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Now ",
					num(last.hx),
					" · No. ",
					last.rank
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1.5 text-[11px] text-muted",
				children: [
					"HX entering each week, refit on the FINALs before it. Week 1 is the frozen preseason board. Peak ",
					num(history.peak.hx),
					" (Wk",
					" ",
					history.peak.week,
					"), low ",
					num(history.low.hx),
					" (Wk ",
					history.low.week,
					")."
				]
			})
		]
	});
}
/** Team-page advanced block: CFBD EPA / success / explosiveness / line yards / havoc with FBS rank. */
function AdvancedStatsPanel({ data, teamSlug }) {
	const rows = data.rows.map((r) => ({
		...r,
		m: METRICS.teams.find((x) => x.k === r.k)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "mb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Advanced stats"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/stats",
					className: "text-sm text-accent hover:underline",
					children: "All teams in the stats explorer →"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-4",
				children: rows.map(({ k, m, value, rank, n }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					title: m.def,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-muted",
						children: m.l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
						className: "mt-0.5 flex items-baseline gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-2xl tabular",
							children: fmtStat(m, value)
						}), rank != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("text-xs tabular", rank <= Math.ceil(n / 4) ? "text-accent" : "text-faint"),
							children: [
								"#",
								rank,
								" of ",
								n
							]
						}) : null]
					})]
				}, k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "mt-4 text-xs text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
						className: "cursor-pointer text-faint",
						children: "Definitions and sources"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1.5",
						children: rows.map(({ k, m }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg",
								children: m.l
							}),
							" (",
							SOURCE_LABEL[m.src],
							"): ",
							m.def
						] }, k))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2",
						children: [
							"Source: ",
							data.meta.advanced_source,
							", through games kicked off by ",
							data.meta.advanced_through.slice(0, 10),
							" (UTC)",
							data.games != null ? `, ${data.games} FBS games` : "",
							". ",
							data.meta.adjustment,
							" Rank is among 138 FBS teams; #1 is best (lowest for defensive \"allowed\" stats). These are stats, not HX."
						]
					})
				]
			})
		]
	});
}
function fmtSigned(v) {
	return `${v < 0 ? "−" : ""}${Math.abs(v).toFixed(2)}`;
}
function TeamPage() {
	const { team, players, games, classes, advanced, sor, hxHistory } = Route.useLoaderData();
	const share = modelShare(team);
	const make12 = make12FreeFromSim(team.slug, team);
	const race = confRaceFor(team.slug);
	const remaining = buildRemainingSchedule(team.slug, games);
	const season = buildSeasonSchedule(team.slug, games);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: `${team.conference} · ${team.city}, ${team.state}`,
			title: team.name,
			lede: `${team.mascot} · ${formatSeasonRecord(team.seasonWins, team.seasonLosses)} · 2025: ${team.lastFinish}`,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinButton, {
					slug: team.slug,
					name: team.shortName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareImageButton, { card: () => ({
					kicker: `${team.conference} · HX board`,
					title: `${team.name} ${team.mascot}`,
					subtitle: formatSeasonRecord(team.seasonWins, team.seasonLosses),
					stats: [
						{
							label: "HX rank",
							value: `No. ${team.hxRank}`
						},
						{
							label: "HX",
							value: fmtSigned(team.hxRating)
						},
						{
							label: "Proj W",
							value: fmtNum(team.projectedWins, 1)
						},
						{
							label: "Make 12",
							value: make12.makeField == null ? "—" : fmtPct(make12.makeField, 1)
						}
					],
					line: hxHistory && hxHistory.points.length > 1 ? {
						values: hxHistory.points.map((p) => p.hx),
						caption: "HX entering each week",
						startLabel: `Wk ${hxHistory.points[0].week} (pre) · No. ${hxHistory.points[0].rank}`,
						endLabel: `Now · No. ${hxHistory.points.at(-1).rank}`
					} : void 0,
					accent: team.colorPrimary,
					footer: "Make 12 = odds of making the playoff field (10k HX sims), not title odds.",
					filename: `hashmark-${team.slug}.png`
				}) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
							slug: team.slug,
							color: team.colorPrimary,
							swatchClassName: "h-12 w-1.5",
							logoSize: 32
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-5xl tabular leading-none",
							children: team.hxRank
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-sm text-muted",
							children: "HX rank of 138"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "HX",
								value: fmtNum(team.hxRating, 2)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "AP",
								value: apLabel(team.apRank),
								hint: apHint(team.hxRank, team.apRank)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Proj W",
								value: fmtNum(team.projectedWins, 1),
								hint: "10k-draw mean"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Make 12",
								value: make12.makeField == null ? "—" : fmtPct(make12.makeField, 1),
								hint: "Make the field, not title odds"
							})
						]
					})]
				}),
				hxHistory ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 border-t border-line pt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HxSparkline, {
						history: hxHistory,
						color: team.colorPrimary
					})
				}) : null,
				sor ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 border-t border-line pt-3 text-sm text-muted",
					children: [
						"Strength of record ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular text-fg",
							children: ["No. ", sor.sorRank]
						}),
						" (",
						sor.sor > 0 ? "+" : sor.sor < 0 ? "−" : "",
						Math.abs(sor.sor).toFixed(2),
						" wins vs a top-25 team) · schedule played",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular text-fg",
							children: sor.sosPlayedRank != null ? `No. ${sor.sosPlayedRank}` : "n/a"
						}),
						" · schedule left",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular text-fg",
							children: sor.sosRemainingRank != null ? `No. ${sor.sosRemainingRank}` : "n/a"
						}),
						".",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/strength",
							className: "underline underline-offset-4 hover:text-fg",
							children: "All teams"
						})
					]
				}) : null,
				race && race.conf_title != null && parseRaceConf(team.conference) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: cn("text-sm text-muted", sor ? "mt-1.5" : "mt-4 border-t border-line pt-3"),
					children: [
						team.conference,
						" race:",
						" ",
						race.make_ccg != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular text-fg",
								children: fmtOdds(race.make_ccg)
							}),
							" to reach the title game,",
							" "
						] }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular text-fg",
							children: fmtOdds(race.conf_title)
						}),
						" to win the league.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/conferences",
							search: team.conference === "SEC" ? {} : { conf: parseRaceConf(team.conference) },
							className: "underline underline-offset-4 hover:text-fg",
							children: "Full race"
						})
					]
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			"aria-label": "On this page",
			className: "sticky top-14 z-30 -mx-4 mb-6 flex gap-1 overflow-x-auto border-b border-line bg-bg/92 px-4 py-2 backdrop-blur-md sm:top-16 sm:mx-0 sm:rounded-xl sm:border sm:px-2",
			children: [
				["upcoming", "Upcoming"],
				...advanced ? [["advanced", "Advanced stats"]] : [],
				["results", "HX vs results"],
				["season", "Season"],
				["roster", team.hasProfile === false ? "About" : "Roster & rating"]
			].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `#${id}`,
				className: "inline-flex h-9 shrink-0 items-center rounded-lg px-3 text-sm text-muted transition-colors hover:bg-raised hover:text-fg",
				children: label
			}, id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "upcoming",
			className: "scroll-mt-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemainingScheduleSection, {
				rows: remaining,
				teamShortName: team.shortName
			})
		}),
		advanced ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "advanced",
			className: "scroll-mt-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdvancedStatsPanel, {
				data: advanced,
				teamSlug: team.slug
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "results",
			className: "scroll-mt-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HxResultsPanel, {
				teamSlug: team.slug,
				games
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "season",
			className: "scroll-mt-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeasonScheduleSection, { rows: season })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: "roster",
			className: "scroll-mt-32"
		}),
		team.hasProfile === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewcomerPanel, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-wide",
						children: "Why this rating"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3",
						children: [
							[
								"Talent",
								share.talent,
								MODEL.weights.talent
							],
							[
								"Prior rating",
								share.prior,
								MODEL.weights.prior
							],
							[
								"Win trend",
								share.trend,
								MODEL.weights.trend
							],
							[
								"Retention",
								share.retention,
								MODEL.weights.retention
							],
							[
								"Portal net",
								share.portal,
								MODEL.weights.portal
							]
						].map(([label, z, w]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								label,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-faint",
									children: ["× ", w]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular text-muted",
								children: [z >= 0 ? "+" : "", fmtNum(z, 2)]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 h-1 overflow-hidden rounded-full bg-raised",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-accent",
								style: { width: `${Math.max(4, Math.min(100, (z + 2.5) / 5 * 100))}%` }
							})
						})] }, label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-muted",
						children: "Z-scores vs the preseason FBS pool (136 teams). Composite HX = weighted sum."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-wide",
						children: "Size"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Measurables only. Talent is the panel below."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid grid-cols-2 gap-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "Avg height",
								v: fmtHeight(team.avgHeightIn)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "Avg weight",
								v: `${fmtNum(team.avgWeightLbs, 0)} lb`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "OL size",
								v: `${fmtHeight(team.olAvgHeightIn)} / ${fmtNum(team.olAvgWeightLbs, 0)} lb`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "Skill height",
								v: fmtHeight(team.skillAvgHeightIn)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "DB height",
								v: fmtHeight(team.dbAvgHeightIn)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KV, {
								k: "Returning starters",
								v: String(team.returningStarters)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/matchup",
							search: {
								home: team.slug,
								away: team.slug === "ohio-state" ? "texas" : "ohio-state"
							},
							className: "inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg",
							children: "Run a matchup"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/talent",
							search: { board: "composite" },
							className: "inline-flex h-11 items-center rounded-md bg-raised px-4 text-sm",
							children: "Talent board"
						})]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex flex-wrap items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl tracking-wide",
							children: "Roster talent"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: "Two-deep composite · transfers included"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Composite",
								value: fmtNum(team.talentScore, 1),
								hint: `#${team.talentRank} nationally`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "HS two-deep",
								value: fmtNum(team.hsTalent, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Portal two-deep",
								value: fmtNum(team.portalTalent, 1),
								hint: `${team.transferCount} transfers`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Blue-chip",
								value: fmtPct(team.blueChipPct, 0)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 max-w-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MixBar, {
							leftPct: 100 - team.portalShare,
							leftLabel: "HS weight",
							rightLabel: "Portal weight"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid grid-cols-3 gap-4 sm:grid-cols-6",
						children: TALENT_UNITS.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: u.label,
							value: fmtNum(team[u.key], 1)
						}, u.key))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex flex-wrap items-baseline justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-wide",
						children: "Composite classes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm text-muted",
						children: [COMPOSITE_SOURCE.board, " · 2023–2026"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-lg text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3 font-medium",
									children: "Year"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3 font-medium",
									children: "Rk"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3 font-medium",
									children: "vs last"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3 font-medium",
									children: "Commits"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3 font-medium",
									children: "Avg"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3 font-medium",
									children: "Points"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 font-medium",
									children: "5 / 4 / 3"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: classes.map((c, i) => {
							const prev = classes[i - 1];
							const delta = prev ? prev.compositeRank - c.compositeRank : null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-line last:border-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/recruiting",
											search: {
												year: c.classYear,
												board: "class"
											},
											className: "font-medium",
											children: c.classYear
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3 tabular",
										children: c.compositeRank
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankMove, { delta })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3 tabular",
										children: c.commits
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3 tabular",
										children: visibleClassAvg(c.avgRating, ratedStarCount(c.fiveStars, c.fourStars, c.threeStars)) == null ? "—" : fmtNum(c.avgRating, 2)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2.5 pr-3 tabular",
										children: fmtNum(c.points, 1)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-2.5 tabular",
										children: [
											c.fiveStars,
											" / ",
											c.fourStars,
											" / ",
											c.threeStars
										]
									})
								]
							}, c.classYear);
						}) })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Two-deep"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-faint",
					children: team.twoDeepSource === "listed" ? "Listed chart · TWO·DEEP" : "Projected · ranked by recruiting rating within position group"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RosterList, { players })] })
		] })
	] });
}
/** 2026 FBS newcomers (0093): no preseason profile rows, so no talent, class, size, or two-deep panels. */
function NewcomerPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "mb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl tracking-wide",
			children: "2026 FBS newcomer"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-sm text-muted",
			children: "This program moved up from FCS in 2026 and was not on the preseason board. Its HX starts from the newcomer prior (the mean preseason HX of the 2025 newcomers Delaware and Missouri State) and is refit weekly on its FBS results like every other team. Games it played before joining the board show no pregame HX line and are not graded. Talent, recruiting class, size, and two-deep panels return once a sourced profile is stamped."
		})]
	});
}
function KV({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-[11px] uppercase tracking-[0.14em] text-faint",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 tabular",
		children: v
	})] });
}
function apHint(rank, ap) {
	if (ap == null) return "Unranked in AP";
	const d = ap - rank;
	if (d === 0) return "Even with AP";
	const n = Math.abs(d);
	const spots = n === 1 ? "spot" : "spots";
	return d > 0 ? `HX ${n} ${spots} higher` : `AP ${n} ${spots} higher`;
}
//#endregion
export { TeamPage as component };
