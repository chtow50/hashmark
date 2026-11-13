import { n as gameKey } from "./game-key-MogMlpsX.mjs";
import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Check, t as X } from "../_libs/lucide-react.mjs";
import { A as Route$18, V as favoriteLine, X as PageHead, Z as Panel, tt as cn } from "./router-C8l9Ifjn.mjs";
import { t as ShareImageButton } from "./share-button-CmQIZdLC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/accuracy-DHlxJX7_.js
var import_jsx_runtime = require_jsx_runtime();
var f = (x, d = 1) => x == null ? "n/a" : x.toFixed(d);
var NA_TEXT = {
	fcs: "FCS opponent: no HX",
	unrated: "Newcomer: no pregame HX line",
	"no-lock": "No frozen pregame number"
};
function AccuracyPage() {
	const { games, season, weeks } = Route$18.useLoaderData();
	const search = Route$18.useSearch();
	const latest = weeks.filter((w) => w.r.graded > 0).at(-1)?.week ?? weeks.at(-1)?.week ?? 0;
	const week = search.week != null && weeks.some((w) => w.week === search.week) ? search.week : latest;
	const list = games.filter((g) => g.week === week);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "2026 season · frozen pregame numbers only",
			title: "Accuracy",
			lede: "Every FINAL against the HX line and win probability that were live before kickoff. The pregame number is frozen when a game is stamped and never rewritten by a later board. Games with no frozen number are marked n/a, not backfilled.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareImageButton, { card: () => ({
				kicker: "HX accuracy · 2026 season",
				title: "Frozen pregame HX vs results",
				subtitle: `${season.graded} of ${season.games} FINALs graded · ${season.na} n/a (no frozen number)`,
				stats: [
					{
						label: "Winners picked",
						value: season.suPct == null ? "n/a" : `${season.suPct.toFixed(1)}%`
					},
					{
						label: "Avg miss",
						value: season.mae == null ? "n/a" : `${season.mae.toFixed(1)} pts`
					},
					{
						label: "Brier",
						value: f(season.brier, 3)
					},
					{
						label: "Vegas line miss",
						value: season.maeVegasLined == null ? "n/a" : `${season.maeVegasLined.toFixed(1)} pts`
					}
				],
				footer: `Stamped pregame Vegas line on the ${season.lined} lined games; HX missed ${f(season.maeHxLined)} on the same games.`,
				filename: "hashmark-accuracy-2026.png"
			}) })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					label: "Winners picked",
					value: season.suPct == null ? "n/a" : `${season.suPct.toFixed(1)}%`,
					sub: `${season.suHits} of ${season.graded - pickEms(games)} picks`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					label: "Average miss",
					value: season.mae == null ? "n/a" : `${season.mae.toFixed(1)} pts`,
					sub: "|final margin − HX line|"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					label: "Brier score",
					value: f(season.brier, 3),
					sub: "win % calibration · lower is better"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					label: "Graded",
					value: `${season.graded}`,
					sub: `of ${season.games} FINALs · ${season.na} n/a`
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg",
				children: "Against the Vegas line"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm leading-relaxed text-muted",
				children: [
					"On the ",
					season.lined,
					" graded games that also have a Vegas line on file, HX missed by ",
					f(season.maeHxLined),
					" points on average and the stamped Vegas line missed by ",
					f(season.maeVegasLined),
					".",
					" ",
					season.maeHxLined != null && season.maeVegasLined != null && season.maeVegasLined < season.maeHxLined ? "The market is still better. That is the Soft-cal FLAG, and it stays up." : null,
					" ",
					"Bias ",
					season.bias == null ? "n/a" : `${season.bias > 0 ? "+" : ""}${season.bias.toFixed(1)}`,
					" (positive = home teams beat the HX line)."
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6 p-0 sm:p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-3 px-4 pt-4 sm:px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg",
					children: "By week"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted",
					children: "Tap a week for its games"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "mt-2 w-full border-separate border-spacing-0 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-[11px] uppercase tracking-[0.08em] text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "border-b border-border px-3 py-2 text-left font-medium",
								children: "Week"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "border-b border-border px-3 py-2 text-right font-medium",
								children: "Graded"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "border-b border-border px-3 py-2 text-right font-medium",
								children: "Winners"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "border-b border-border px-3 py-2 text-right font-medium",
								children: "Avg miss"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "hidden border-b border-border px-3 py-2 text-right font-medium sm:table-cell",
								children: "Brier"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "hidden border-b border-border px-3 py-2 text-right font-medium sm:table-cell",
								children: "HX / Vegas miss"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [weeks.map(({ week: w, r }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: cn("hover:[&>td]:bg-raised", w === week && "[&>td]:bg-raised"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "border-b border-line px-3 py-1.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/accuracy",
									search: w === latest ? {} : { week: w },
									className: "inline-flex min-h-10 items-center font-medium underline-offset-4 hover:underline",
									children: ["Week ", w]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "border-b border-line px-3 py-1.5 text-right tabular text-muted",
								children: [
									r.graded,
									"/",
									r.games
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "border-b border-line px-3 py-1.5 text-right tabular",
								children: r.suPct == null ? "n/a" : `${r.suPct.toFixed(1)}%`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "border-b border-line px-3 py-1.5 text-right tabular",
								children: f(r.mae)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "hidden border-b border-line px-3 py-1.5 text-right tabular sm:table-cell",
								children: f(r.brier, 3)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "hidden border-b border-line px-3 py-1.5 text-right tabular text-muted sm:table-cell",
								children: r.lined ? `${f(r.maeHxLined)} / ${f(r.maeVegasLined)} (${r.lined})` : "n/a"
							})
						]
					}, w)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "font-semibold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2",
								children: "Season"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-3 py-2 text-right tabular",
								children: [
									season.graded,
									"/",
									season.games
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 text-right tabular",
								children: season.suPct == null ? "n/a" : `${season.suPct.toFixed(1)}%`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 text-right tabular",
								children: f(season.mae)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "hidden px-3 py-2 text-right tabular sm:table-cell",
								children: f(season.brier, 3)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "hidden px-3 py-2 text-right tabular sm:table-cell",
								children: [
									f(season.maeHxLined),
									" / ",
									f(season.maeVegasLined),
									" (",
									season.lined,
									")"
								]
							})
						]
					})] })]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "p-0 sm:p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline justify-between gap-2 px-4 pt-4 sm:px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-lg",
					children: [
						"Week ",
						week,
						" games"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted",
					children: [list.length, " FINALs"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 divide-y divide-line",
				children: list.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameRow, { g }, g.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg",
				children: "How games are graded"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The pregame number is the HX board that was live when the game was stamped FINAL, saved on the game (Week 0 was frozen before the coach-change moves). Later refits never touch it." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "HX line and win % come from those two numbers through the board's matchup engine (Elo = 1500 + 55 × HX, 60 points home field)." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Winners picked counts games where the HX favorite won; pick'ems don't count. Average miss = |final margin − HX line|. Brier = squared gap between the HX win % and the result (0 is perfect, 0.25 is a coin flip)." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "n/a: FCS opponents (no HX), and 2026 newcomers' games before they joined the board. These are never filled in from a later board." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"Vegas comparison uses only games with a Vegas line on file. Method on ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/model",
							className: "underline underline-offset-4 hover:text-fg",
							children: "The Model"
						}),
						"."
					] })
				]
			})]
		})
	] });
}
function pickEms(games) {
	return games.filter((g) => g.graded && g.suHit == null).length;
}
function Card({ label, value, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] uppercase tracking-[0.14em] text-faint",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 font-display text-2xl tabular",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-0.5 text-xs text-muted",
				children: sub
			})
		]
	});
}
function GameRow({ g }) {
	const line = g.hxSpread == null ? null : favoriteLine(g.homeShort, g.awayShort, g.hxSpread);
	const favP = g.pHome == null ? null : g.hxSpread != null && g.hxSpread < 0 ? 1 - g.pHome : g.pHome;
	const winnerHome = g.margin > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "truncate",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: cn(!winnerHome && "font-semibold text-fg"),
						children: [
							g.awayShort,
							" ",
							g.awayScore
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-faint",
						children: g.neutral ? " vs " : " at "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: cn(winnerHome && "font-semibold text-fg"),
						children: [
							g.homeShort,
							" ",
							g.homeScore
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-xs text-muted",
				children: [g.kickoffDate, g.naReason !== "fcs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/games/$key",
					params: { key: gameKey(g.kickoffDate, g.away, g.home) },
					className: "underline underline-offset-4 hover:text-fg",
					children: "Box score"
				})] }) : null]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-4 text-sm sm:justify-end",
			children: g.graded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] uppercase tracking-wide text-faint",
						children: "HX "
					}), line]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular text-muted",
					children: favP == null ? "" : `${(favP * 100).toFixed(1)}%`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular text-muted",
					children: ["miss ", g.absErr.toFixed(1)]
				}),
				g.suHit == null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted",
					children: "PK"
				}) : g.suHit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					className: "h-4 w-4 text-up",
					"aria-label": "Winner picked"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
					className: "h-4 w-4 text-down",
					"aria-label": "Winner missed"
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-xs text-muted",
				children: ["n/a · ", NA_TEXT[g.naReason ?? "no-lock"]]
			})
		})]
	});
}
//#endregion
export { AccuracyPage as component };
