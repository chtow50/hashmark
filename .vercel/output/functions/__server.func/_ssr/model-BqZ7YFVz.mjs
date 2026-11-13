import { t as MODEL } from "./model-C--_NYY0.mjs";
import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { X as PageHead, Z as Panel } from "./router-C8l9Ifjn.mjs";
import { n as hx_refit_2026_default } from "./hx_refit_2026-DruU6f41.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/model-BqZ7YFVz.js
var import_jsx_runtime = require_jsx_runtime();
var hx_2026_8_backtest_2026_default = {
	meta: {
		"source": "HASHMARK review 2026-11-12 (/workspace/hashmark-review, scripts backtest.mjs). Stamped FBS–FBS FINALs from repo migrations through 0090 (Week 0 stored as Week 1). Shipped = the HX board that was live each week (HX 2026.7 and earlier). HX 2026.8 walk-forward = Bayesian blend refit using only FINALs before each week, knobs also chosen only from earlier weeks.",
		"as_of": "2026-11-12",
		"as_of_tz": "America/Chicago"
	},
	weeks: [
		{
			"week": 1,
			"shipped": {
				"n": 49,
				"su": 40,
				"mae": 14.823,
				"brier": .142
			},
			"hx_2026_8_walkforward": {
				"n": 49,
				"su": 40,
				"mae": 14.823,
				"brier": .142
			}
		},
		{
			"week": 2,
			"shipped": {
				"n": 47,
				"su": 37,
				"mae": 12.196,
				"brier": .147
			},
			"hx_2026_8_walkforward": {
				"n": 47,
				"su": 39,
				"mae": 11.325,
				"brier": .14
			}
		},
		{
			"week": 3,
			"shipped": {
				"n": 56,
				"su": 49,
				"mae": 10.025,
				"brier": .119
			},
			"hx_2026_8_walkforward": {
				"n": 56,
				"su": 45,
				"mae": 10.355,
				"brier": .127
			}
		},
		{
			"week": 4,
			"shipped": {
				"n": 57,
				"su": 42,
				"mae": 12.789,
				"brier": .181
			},
			"hx_2026_8_walkforward": {
				"n": 57,
				"su": 44,
				"mae": 12.27,
				"brier": .177
			}
		},
		{
			"week": 5,
			"shipped": {
				"n": 55,
				"su": 39,
				"mae": 14.865,
				"brier": .195
			},
			"hx_2026_8_walkforward": {
				"n": 55,
				"su": 40,
				"mae": 13.486,
				"brier": .171
			}
		},
		{
			"week": 6,
			"shipped": {
				"n": 56,
				"su": 33,
				"mae": 12.742,
				"brier": .232
			},
			"hx_2026_8_walkforward": {
				"n": 56,
				"su": 36,
				"mae": 12.219,
				"brier": .221
			}
		},
		{
			"week": 7,
			"shipped": {
				"n": 57,
				"su": 34,
				"mae": 12.685,
				"brier": .234
			},
			"hx_2026_8_walkforward": {
				"n": 57,
				"su": 36,
				"mae": 11.717,
				"brier": .227
			}
		},
		{
			"week": 8,
			"shipped": {
				"n": 54,
				"su": 31,
				"mae": 12.989,
				"brier": .26
			},
			"hx_2026_8_walkforward": {
				"n": 54,
				"su": 31,
				"mae": 11.271,
				"brier": .25
			}
		},
		{
			"week": 9,
			"shipped": {
				"n": 54,
				"su": 44,
				"mae": 12.371,
				"brier": .153
			},
			"hx_2026_8_walkforward": {
				"n": 54,
				"su": 40,
				"mae": 12.985,
				"brier": .17
			}
		},
		{
			"week": 10,
			"shipped": {
				"n": 61,
				"su": 36,
				"mae": 15.955,
				"brier": .266
			},
			"hx_2026_8_walkforward": {
				"n": 61,
				"su": 37,
				"mae": 13.313,
				"brier": .223
			}
		}
	],
	totals_w2_11: {
		"n": 502,
		"shipped": {
			"n": 502,
			"su": 349,
			"mae": 13.036,
			"brier": .199
		},
		"hx_2026_8_walkforward": {
			"n": 502,
			"su": 352,
			"mae": 12.103,
			"brier": .19
		}
	},
	totals_w6_11: {
		"n": 287,
		"shipped": {
			"n": 287,
			"su": 182,
			"mae": 13.46,
			"brier": .228
		},
		"hx_2026_8_walkforward": {
			"n": 287,
			"su": 184,
			"mae": 12.273,
			"brier": .217
		}
	},
	vegas_lined_w2_11: {
		"n": 295,
		"mae_vegas": 11.269,
		"mae_shipped": 12.846,
		"mae_hx_2026_8_walkforward": 12.227
	},
	paired_w2_11: {
		"n": 502,
		"mean_mae_improvement": .934,
		"se": .286,
		"t": 3.26,
		"games_better": 281,
		"games_worse": 221
	},
	calibration_slope: {
		"preseason_w1_5": .893,
		"preseason_w6_11": .552,
		"hx_2026_8_w2_11": .908
	}
};
var WEIGHTS = [
	{
		key: "Recruiting talent",
		w: MODEL.weights.talent,
		note: "CFBD team talent composite (247 recruiting strength of the current roster). Real signal — ablation +0.052."
	},
	{
		key: "Prior-year rating",
		w: MODEL.weights.prior,
		note: "Blend of last season’s SP+, Elo, and SRS, each z-scored first. Real signal — ablation +0.037."
	},
	{
		key: "Recent win-trend",
		w: MODEL.weights.trend,
		note: "Weighted win% over the previous four seasons (0.4 / 0.3 / 0.2 / 0.1). Inside the noise band; kept at modest weight."
	},
	{
		key: "Roster retention",
		w: MODEL.weights.retention,
		note: "CFBD returning production (percent PPA + usage). Inside noise. Not the two-deep talent composite."
	},
	{
		key: "Portal net",
		w: MODEL.weights.portal,
		note: "Incoming transfer ratings minus outgoing, this offseason. Inside noise. Roster talent already counts who is actually on the two-deep."
	}
];
function ModelPage() {
	const wsum = Object.values(MODEL.weights).reduce((a, b) => a + b, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: `HX ${MODEL.version}`,
			title: "How the rating is built",
			lede: "HX starts from a preseason composite and is refit every week from stamped FINALs, so teams that are better or worse than expected move as the season goes. A replacement-level Group of Five team sits near 0. Head-to-head uses Elo built from HX."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InSeasonPanel, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Preseason prior · weights"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Each feature is z-scored across FBS, then weighted. Georgia opened 2026 at +7.89. Walk-forward Top 25 balanced ≈ 0.646. Only talent and prior rating beat season-to-season noise. QB continuity, coach tenure, and SOS were tested and zeroed — they made the score worse. A separate Connelly-residual term moved ten new-HC ratings on this board. Tenure stays zeroed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-4",
					children: WEIGHTS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: row.key
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular text-muted",
								children: row.w.toFixed(1)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 h-1 overflow-hidden rounded-full bg-raised",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-accent",
								style: { width: `${row.w / wsum * 100}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-xs text-muted",
							children: row.note
						})
					] }, row.key))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Matchup engine"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: [
						"Each team starts at ",
						MODEL.eloBase,
						" + ",
						MODEL.eloScale,
						" × HX. Home-field is ",
						MODEL.homeFieldElo,
						" Elo points, dropped on a neutral floor. Win probability is the standard Elo logistic; spread is a quadratic on that same gap. Calibrated on 2019–2025 FBS games at 70.8% straight-up."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-4 overflow-x-auto whitespace-pre-wrap rounded-lg bg-inset p-4 font-mono text-xs leading-relaxed text-accent",
					children: `Elo     = ${MODEL.eloBase} + ${MODEL.eloScale} × HX
P(home) = 1 / (1 + 10^(−(EloΔ + HFA) / ${MODEL.eloDenom}))
d       = EloΔ + HFA
spread  = 0.050835 × d
        + 4.5795×10⁻⁵ × d × |d|`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: "The old linear map compressed blowouts; this curve was fit on 2019–2023 FBS actual MOV (holdout 2024–2025), not on this week’s Vegas."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-muted",
					children: [
						"Run any pair on the",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/matchup",
							className: "text-fg underline decoration-border underline-offset-4",
							children: "matchup board"
						}),
						"."
					]
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "sor",
				className: "scroll-mt-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Strength of record and schedule"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 space-y-3 text-sm leading-relaxed text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Strength of record (SOR) = actual wins minus the wins a typical top-25 team would expect on the same schedule. The benchmark is whoever is No. 25 on the current HX board. Each played game uses the matchup engine: Elo = ",
						MODEL.eloBase,
						" + ",
						MODEL.eloScale,
						" × HX, ",
						MODEL.homeFieldElo,
						" points home field, none at neutral sites. FCS games use the season sim's fixed rule (benchmark wins 92% at home, 88% away)."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Strength of schedule = the average current HX of FBS opponents, split into played and still to play, ranked 1–138 (No. 1 = hardest). FCS opponents have no HX, so they are counted but kept out of the average. Both use current HX and only real FINALs and the real remaining slate; neither changes HX. Full table:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/strength",
							className: "underline underline-offset-4 hover:text-fg",
							children: "strength of record & schedule"
						}),
						"."
					] })]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "2026 notes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-4 text-sm leading-relaxed text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The board is the full 138-team FBS set: the 136 preseason programs (recruiting, portal, returning production, SP+/Elo/SRS, and 2026 rosters) plus 2026 newcomers North Dakota State and Sacramento State, which start from a newcomer prior and are refit on results. Two-deeps are the listed TWO·DEEP charts for the 136 preseason programs (thetwodeep.com, refreshed 2026-09-07)." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Offensive-line mass is on the talent Size board as a measurable. It is not a term in HX. The talent composite is the depth-weighted 247 of the two-deep, transfers included." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ten 2026 coach changes carry a Connelly residual in the preseason prior (κ = −0.25, 15% OC bump). The in-season refit starts from that prior." })
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskSection, {})
	] });
}
var GLOSSARY = [
	{
		term: "HX",
		def: "The HASHMARK Index. One number for every FBS team, built from a preseason prior (recruiting talent, last year’s SP+/Elo/SRS, four-year win trend, returning production, portal net) and refit every week from this season’s results. A replacement-level Group of Five team sits near 0."
	},
	{
		term: "Make 12",
		def: "Chance a team makes the 12-team College Football Playoff field, from 10,000 season simulations seeded by HX. Not a national-title odds number."
	},
	{
		term: "Closer / SU",
		def: "Straight-up (SU) is who HX picked to win. Closer is whether the HASHMARK spread was nearer the final margin than the stamped Vegas line, graded only on games with a line on file. The weekly tape on the board carries the current counts."
	},
	{
		term: "Vegas line",
		def: "The DraftKings/Bovada spread stamped before kickoff (two-source rule), usually during game week. It is a pregame market number and can differ from the final closing line."
	},
	{
		term: "Vegas-only",
		def: "An FCS opponent is outside the HX board. HASHMARK will not invent a spread. The row shows the market number only."
	},
	{
		term: "Talent vs size",
		def: "Roster talent is a two-deep composite (high-school plus portal). OL mass is a separate size board. Size is not talent and is not an HX term."
	}
];
/** Formerly /desk: what the site is, what it is not, and the glossary. */
function DeskSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "desk",
		className: "mt-6 scroll-mt-24 space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "What this is"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: "HASHMARK is a public college football ratings desk. One rating, every FBS team. The board, slate, matchup engine, stats, recruiting classes, and roster talent are here every week of the season so you can see why a number moved — or why it did not. The model is scored in public on the weekly tape."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "What this is not"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm leading-relaxed text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Not a sportsbook. HASHMARK never takes a wager." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Not a live in-game feed." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Not an FCS rating. Those games are Vegas-only." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Not the AP poll. Gaps versus AP are a feature of the board, not a bug." })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-muted",
					children: [
						"Questions or corrections:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "mailto:hello@hashmarkcfb.com",
							className: "text-fg hover:underline",
							children: "hello@hashmarkcfb.com"
						})
					]
				})
			] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl tracking-wide",
			children: "Glossary"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
			className: "mt-4 divide-y divide-line",
			children: GLOSSARY.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "font-mono text-xs uppercase tracking-[0.14em] text-faint",
					children: row.term
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "text-sm leading-relaxed text-muted",
					children: row.def
				})]
			}, row.term))
		})] })]
	});
}
var pct = (g) => g.n ? `${(100 * g.su / g.n).toFixed(1)}%` : "—";
var fmt = (x, d = 2) => x == null ? "—" : x.toFixed(d);
function InSeasonPanel() {
	const t = hx_2026_8_backtest_2026_default.totals_w2_11;
	const live = hx_refit_2026_default.grades.filter((g) => g.live);
	const m = hx_refit_2026_default.meta;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "mb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl tracking-wide",
			children: "In season · weekly refit"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 text-sm leading-relaxed text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Every Sunday, after the week’s FINALs are stamped, HX is refit from the preseason prior and every FBS–FBS result so far. Each margin is turned into an Elo gap with the same spread curve the board uses (capped at ±",
						m.margin_cap,
						" points so blowouts don’t run the table), adjusted for opponent and home field. The preseason prior counts as ",
						m.lambda,
						" games, so its weight fades as a team plays: roughly half after two games, roughly a fifth after eight."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"One rating, same scale: Elo = ",
						MODEL.eloBase,
						" + ",
						MODEL.eloScale,
						" × HX. Only the HX values move. FCS opponents are unrated and stay out of the fit. Current board: ",
						m.n_finals,
						" FINALs through Week ",
						m.through_week,
						"."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Why: through Week 10 the board leaned on preseason expectations. Preseason spread gaps were worth ",
						hx_2026_8_backtest_2026_default.calibration_slope.preseason_w1_5,
						" of a point per point in Weeks 1–5 and",
						" ",
						hx_2026_8_backtest_2026_default.calibration_slope.preseason_w6_11,
						" in Weeks 6–11. Refit week by week using only earlier results, the same games come in at ",
						hx_2026_8_backtest_2026_default.calibration_slope.hx_2026_8_w2_11,
						"."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Soft-cal FLAG stays. On Vegas-lined games in Weeks 2–11 the stamped Vegas line still beats both boards (MAE ",
						fmt(hx_2026_8_backtest_2026_default.vegas_lined_w2_11.mae_vegas),
						" vs ",
						fmt(hx_2026_8_backtest_2026_default.vegas_lined_w2_11.mae_hx_2026_8_walkforward),
						" refit and ",
						fmt(hx_2026_8_backtest_2026_default.vegas_lined_w2_11.mae_shipped),
						" as shipped, n = ",
						hx_2026_8_backtest_2026_default.vegas_lined_w2_11.n,
						")."
					] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm tabular",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
						className: "mb-2 text-left text-xs text-muted",
						children: "Accountability · stamped FBS–FBS FINALs. “As shipped” is the board that was live each week; “Refit” uses only results from earlier weeks."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-left text-xs text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-1 pr-2 font-normal",
								children: "Week"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-1 pr-2 font-normal",
								children: "Games"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-1 pr-2 font-normal",
								children: "SU as shipped"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-1 pr-2 font-normal",
								children: "SU refit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-1 pr-2 font-normal",
								children: "MAE as shipped"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-1 font-normal",
								children: "MAE refit"
							})
						]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
						hx_2026_8_backtest_2026_default.weeks.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border/60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: w.week
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: w.shipped.n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: w.shipped.su
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: w.week === 1 ? "—" : w.hx_2026_8_walkforward.su
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: fmt(w.shipped.mae)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1",
									children: w.week === 1 ? "—" : fmt(w.hx_2026_8_walkforward.mae)
								})
							]
						}, w.week)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border font-medium text-fg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: "2–11"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: t.n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-1 pr-2",
									children: [
										t.shipped.su,
										" · ",
										pct(t.shipped)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-1 pr-2",
									children: [
										t.hx_2026_8_walkforward.su,
										" · ",
										pct(t.hx_2026_8_walkforward)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: fmt(t.shipped.mae)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1",
									children: fmt(t.hx_2026_8_walkforward.mae)
								})
							]
						}),
						live.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border/60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-1 pr-2",
									children: [g.week, " · live"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: g.n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: g.su
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1 pr-2",
									children: "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1",
									children: fmt(g.mae)
								})
							]
						}, `live-${g.week}`))
					] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted",
				children: [
					"Week 1 is the preseason board for both. Weeks 2–11 total includes the ",
					t.n - hx_2026_8_backtest_2026_default.weeks.filter((w) => w.week >= 2).reduce((a, w) => a + w.shipped.n, 0),
					" Week 11 FINALs stamped before the switch (Nov 12). Refit was closer to the final margin in",
					" ",
					hx_2026_8_backtest_2026_default.paired_w2_11.games_better,
					" of ",
					hx_2026_8_backtest_2026_default.paired_w2_11.n,
					" games. From Week 12 the refit rows are the live board."
				]
			})] })]
		})]
	});
}
//#endregion
export { ModelPage as component };
