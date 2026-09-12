import { o as __toESM } from "../_runtime.mjs";
import { r as formatKickCt } from "./chicago-ClRwnsKl.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as fmtNum, C as PageHead, T as TeamSelect, b as spreadGap, f as Route$9, g as favoriteLine, j as fmtPct, w as Panel } from "./router-CrZqY1zT.mjs";
import { c as Stat, f as WinBar, r as DeskChip, t as CompareRow, u as TeamMark } from "./marks-DHZQbUpe.mjs";
import { t as RosterDuel } from "./roster-duel-DKXLDu0D.mjs";
import { n as matchupChips, t as isWinnerFlip } from "./schedule-flags-D3GOZ0hO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/matchup-t4zqVV1e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** AMD in-game restamp. Same HX mean. Sigma from 2019–2023 FBS linescores (n=3458). */
var RESTAMP_PERIODS = [
	"Q1",
	"half",
	"Q3",
	"FINAL"
];
var RESTAMP_SIGMA = {
	Q1: 15.335849462797231,
	half: 11.442739265399666,
	Q3: 7.966494691654868,
	FINAL: 0
};
var RESTAMP_TIME_LEFT = {
	Q1: 45,
	half: 30,
	Q3: 15,
	FINAL: 0
};
function erf(x) {
	const sign = x < 0 ? -1 : 1;
	const ax = Math.abs(x);
	const a1 = .254829592;
	const a2 = -.284496736;
	const a3 = 1.421413741;
	const a4 = -1.453152027;
	const a5 = 1.061405429;
	const t = 1 / (1 + .3275911 * ax);
	return sign * (1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax));
}
function phi(z) {
	return .5 * (1 + erf(z / Math.SQRT2));
}
/** Home-perspective pregame spread already includes HFA (0 if Neutral). */
function restamp(pregameSpread, homeScore, awayScore, period) {
	const sigma = RESTAMP_SIGMA[period];
	const tLeft = RESTAMP_TIME_LEFT[period];
	const restampedSpread = homeScore - awayScore + pregameSpread * (tLeft / 60);
	if (period === "FINAL" || sigma <= 0) return {
		pHome: restampedSpread > 0 ? 1 : restampedSpread < 0 ? 0 : .5,
		restampedSpread,
		sigma: 0,
		period
	};
	return {
		pHome: phi(restampedSpread / sigma),
		restampedSpread,
		sigma,
		period
	};
}
function MatchupPage() {
	const { teams, match } = Route$9.useLoaderData();
	const search = Route$9.useSearch();
	const navigate = useNavigate({ from: "/matchup" });
	const homeSlug = search.home ?? "texas";
	const awaySlug = search.away ?? "ohio-state";
	const appliedNeutral = match.appliedNeutral ?? false;
	const pairKey = `${homeSlug}|${awaySlug}|${appliedNeutral}`;
	function setPair(next) {
		const swapped = next.home !== void 0 && next.away !== void 0;
		const toggling = next.neutral !== void 0;
		const search = {
			home: next.home ?? homeSlug,
			away: next.away ?? awaySlug
		};
		if (toggling || swapped) search.neutral = next.neutral ?? appliedNeutral;
		navigate({ search });
	}
	const { home, away, prediction, homePlayers, awayPlayers, game } = match;
	const homeTeam = home ? {
		slug: home.slug,
		color: home.colorPrimary
	} : void 0;
	const awayTeam = away ? {
		slug: away.slug,
		color: away.colorPrimary
	} : void 0;
	const [period, setPeriod] = (0, import_react.useState)(null);
	const [homeScore, setHomeScore] = (0, import_react.useState)("");
	const [awayScore, setAwayScore] = (0, import_react.useState)("");
	const hxLine = prediction != null ? favoriteLine(home?.shortName ?? "", away?.shortName ?? "", prediction.spread) : null;
	const vegasLine = game?.vegasSpread != null && home && away ? favoriteLine(home.shortName, away.shortName, game.vegasSpread) : null;
	const chips = prediction != null ? matchupChips(prediction, {
		neutral: appliedNeutral,
		vegasSpread: game?.vegasSpread ?? null,
		status: game?.status ?? "scheduled"
	}) : [];
	const flip = prediction != null ? isWinnerFlip(prediction, game?.vegasSpread ?? null) : false;
	const gap = prediction != null && game?.vegasSpread != null ? spreadGap(prediction.spread, game.vegasSpread) : null;
	const homePts = homeScore === "" ? NaN : Number(homeScore);
	const awayPts = awayScore === "" ? NaN : Number(awayScore);
	const stamped = prediction && period && Number.isFinite(homePts) && Number.isFinite(awayPts) ? restamp(prediction.spread, homePts, awayPts, period) : null;
	const winPct = stamped?.pHome ?? prediction?.homeWinPct;
	const periodLabel = {
		Q1: "Q1",
		half: "Half",
		Q3: "Q3",
		FINAL: "FINAL"
	};
	(0, import_react.useEffect)(() => {
		setPeriod(null);
		setHomeScore("");
		setAwayScore("");
	}, [pairKey]);
	(0, import_react.useEffect)(() => {
		if (game?.status === "final" && game.homeScore != null && game.awayScore != null) {
			setPeriod("FINAL");
			setHomeScore(String(game.homeScore));
			setAwayScore(String(game.awayScore));
		}
	}, [
		pairKey,
		game?.status,
		game?.homeScore,
		game?.awayScore
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "Predictive model",
			title: "Head to head",
			lede: "Type a school or pick from the list. HX seeds an Elo rating (1500 + 55 × composite). Home-field is 60 Elo points unless Neutral site is on (Dublin, CFP, etc.). Win probability and spread come from that gap."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-start",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSelect, {
					id: "home",
					label: "Home",
					value: homeSlug,
					teams,
					onChange: (slug) => setPair({ home: slug })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-0 hidden text-[11px] uppercase tracking-[0.14em] text-transparent sm:block",
							"aria-hidden": true,
							children: "Home"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-12 w-full rounded-lg bg-raised px-4 text-sm text-muted hover:text-fg sm:w-auto",
							onClick: () => setPair({
								home: awaySlug,
								away: homeSlug
							}),
							children: "Swap"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": appliedNeutral,
							className: appliedNeutral ? "h-12 w-full rounded-lg bg-accent px-4 text-sm text-accent-fg sm:w-auto" : "h-12 w-full rounded-lg bg-raised px-4 text-sm text-muted hover:text-fg sm:w-auto",
							onClick: () => setPair({ neutral: !appliedNeutral }),
							children: "Neutral site"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSelect, {
					id: "away",
					label: "Away",
					value: awaySlug,
					teams,
					onChange: (slug) => setPair({ away: slug })
				})
			]
		}),
		!home || !away || !prediction ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "Choose two teams in the HASHMARK database."
		}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					chips.length > 0 || game ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 border-b border-line pb-5",
						children: [
							chips.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: chips.map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskChip, {
									tone: chip.tone,
									children: chip.label
								}, chip.kind))
							}) : null,
							game ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted",
								children: [
									game.kickoffAt ? formatKickCt(game.kickoffAt) : null,
									game.tv ? `${game.kickoffAt ? " · " : ""}${game.tv}` : null,
									game.location ? ` · ${game.location}` : null,
									game.status === "final" && game.homeScore != null && game.awayScore != null ? ` · Tape ${away.shortName} ${game.awayScore}–${game.homeScore} ${home.shortName}` : null
								]
							}) : null,
							flip && hxLine && vegasLine ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-warn",
								children: [
									"HASHMARK takes ",
									hxLine,
									" · Vegas has ",
									vegasLine
								]
							}) : null,
							!flip && gap != null && hxLine && vegasLine ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-warn",
								children: [
									"HASHMARK ",
									hxLine,
									" vs Vegas ",
									vegasLine,
									" · same favorite"
								]
							}) : null
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamHead, {
								team: home,
								side: "Home"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-display text-5xl tabular tracking-wide",
									children: [
										prediction.homeScore,
										"–",
										prediction.awayScore
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm text-muted",
									children: [
										prediction.spread >= 0 ? `${home.shortName} −${fmtNum(prediction.spread, 1)}` : `${away.shortName} −${fmtNum(-prediction.spread, 1)}`,
										" · ",
										"O/U ",
										fmtNum(prediction.total, 1)
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamHead, {
								team: away,
								side: "Away"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinBar, {
							homePct: winPct ?? prediction.homeWinPct,
							homeName: home.shortName,
							awayName: away.shortName
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RestampBar, {
						homeName: home.shortName,
						awayName: away.shortName,
						period,
						periodLabel,
						homeScore,
						awayScore,
						stamped,
						onPeriod: setPeriod,
						onHomeScore: setHomeScore,
						onAwayScore: setAwayScore
					}, pairKey)
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "HX edge",
							value: prediction.edge > 0 ? `+${fmtNum(prediction.edge, 2)}` : fmtNum(prediction.edge, 2),
							hint: appliedNeutral ? "Neutral site · HFA off" : "Includes home field"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Home win",
							value: fmtPct(prediction.homeWinPct * 100, 1)
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Projected wins",
							value: `${fmtNum(home.projectedWins, 1)} / ${fmtNum(away.projectedWins, 1)}`,
							hint: "Season, pre-game"
						}) })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-1 font-display text-2xl tracking-wide",
						children: "Roster talent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 text-sm text-muted",
						children: "Two-deep composite, transfers included. Unit slices sit under that. OL mass is size, not the ranking."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "HX rating",
						a: home.hxRating,
						b: away.hxRating,
						max: 10,
						format: (n) => fmtNum(n, 2),
						aTeam: homeTeam,
						bTeam: awayTeam
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "Talent composite",
						a: home.talentScore,
						b: away.talentScore,
						max: 100,
						format: (n) => fmtNum(n, 1),
						aTeam: homeTeam,
						bTeam: awayTeam
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "HS two-deep",
						a: home.hsTalent,
						b: away.hsTalent,
						max: 100,
						format: (n) => fmtNum(n, 1),
						aTeam: homeTeam,
						bTeam: awayTeam
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "Portal two-deep",
						a: home.portalTalent,
						b: away.portalTalent,
						max: 100,
						format: (n) => fmtNum(n, 1),
						aTeam: homeTeam,
						bTeam: awayTeam
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "Offense two-deep",
						a: home.offTalent,
						b: away.offTalent,
						max: 100,
						format: (n) => fmtNum(n, 1),
						aTeam: homeTeam,
						bTeam: awayTeam
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "Defense two-deep",
						a: home.defTalent,
						b: away.defTalent,
						max: 100,
						format: (n) => fmtNum(n, 1),
						aTeam: homeTeam,
						bTeam: awayTeam
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "QB",
						a: home.qbTalent,
						b: away.qbTalent,
						max: 100,
						format: (n) => fmtNum(n, 1),
						aTeam: homeTeam,
						bTeam: awayTeam
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "Skill",
						a: home.skillTalent,
						b: away.skillTalent,
						max: 100,
						format: (n) => fmtNum(n, 1),
						aTeam: homeTeam,
						bTeam: awayTeam
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "OL",
						a: home.olTalent,
						b: away.olTalent,
						max: 100,
						format: (n) => fmtNum(n, 1),
						aTeam: homeTeam,
						bTeam: awayTeam
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "DL",
						a: home.dlTalent,
						b: away.dlTalent,
						max: 100,
						format: (n) => fmtNum(n, 1),
						aTeam: homeTeam,
						bTeam: awayTeam
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "LB",
						a: home.lbTalent,
						b: away.lbTalent,
						max: 100,
						format: (n) => fmtNum(n, 1),
						aTeam: homeTeam,
						bTeam: awayTeam
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "DB",
						a: home.dbTalent,
						b: away.dbTalent,
						max: 100,
						format: (n) => fmtNum(n, 1),
						aTeam: homeTeam,
						bTeam: awayTeam
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "Blue-chip %",
						a: home.blueChipPct,
						b: away.blueChipPct,
						max: 100,
						format: (n) => fmtPct(n, 0),
						aTeam: homeTeam,
						bTeam: awayTeam
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "Portal share",
						a: home.portalShare,
						b: away.portalShare,
						max: 100,
						format: (n) => fmtPct(n, 0),
						aTeam: homeTeam,
						bTeam: awayTeam
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "2026 class pts",
						a: home.recPoints,
						b: away.recPoints,
						max: 320,
						format: (n) => fmtNum(n, 0),
						aTeam: homeTeam,
						bTeam: awayTeam
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "Returning",
						a: home.returningProduction,
						b: away.returningProduction,
						max: 100,
						format: (n) => fmtPct(n, 0),
						aTeam: homeTeam,
						bTeam: awayTeam
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "Offense rating",
						a: home.offenseRating,
						b: away.offenseRating,
						max: 45,
						format: (n) => fmtNum(n, 1),
						aTeam: homeTeam,
						bTeam: awayTeam
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "Defense rating",
						a: home.defenseRating,
						b: away.defenseRating,
						max: 45,
						format: (n) => fmtNum(n, 1),
						aTeam: homeTeam,
						bTeam: awayTeam
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "OL mass",
						a: home.olAvgWeightLbs,
						b: away.olAvgWeightLbs,
						max: 360,
						format: (n) => `${fmtNum(n, 0)} lb`,
						aTeam: homeTeam,
						bTeam: awayTeam
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex flex-wrap items-baseline justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-wide",
						children: "Two-deep"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-faint",
						children: home.twoDeepSource === "listed" && away.twoDeepSource === "listed" ? "Listed charts · TWO·DEEP" : "Listed TWO·DEEP where available · CFBD projection otherwise"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RosterDuel, {
					home: homePlayers,
					away: awayPlayers,
					homeName: home.shortName,
					awayName: away.shortName,
					homeSlug: home.slug,
					awaySlug: away.slug,
					homeColor: home.colorPrimary,
					awayColor: away.colorPrimary
				})] })
			]
		})
	] });
}
function RestampBar({ homeName, awayName, period, periodLabel, homeScore, awayScore, stamped, onPeriod, onHomeScore, onAwayScore }) {
	const missing = period != null && (homeScore === "" || awayScore === "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 border-t border-line pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.18em] text-faint",
				children: "In-game restamp"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Same HX prior. Type the score at the stamp. Not a live feed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": period == null,
					className: period == null ? "h-10 rounded-lg bg-accent px-3 text-sm text-accent-fg" : "h-10 rounded-lg bg-raised px-3 text-sm text-muted hover:text-fg",
					onClick: () => onPeriod(null),
					children: "Pregame"
				}), RESTAMP_PERIODS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": period === p,
					className: period === p ? "h-10 rounded-lg bg-accent px-3 text-sm text-accent-fg" : "h-10 rounded-lg bg-raised px-3 text-sm text-muted hover:text-fg",
					onClick: () => onPeriod(p),
					children: periodLabel[p]
				}, p))]
			}),
			period ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-end gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm text-muted",
						children: [homeName, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							inputMode: "numeric",
							className: "mt-1 block h-11 w-20 rounded-lg bg-raised px-3 tabular text-fg",
							value: homeScore,
							onChange: (e) => onHomeScore(e.target.value.replace(/[^0-9]/g, ""))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pb-3 text-muted",
						children: "–"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm text-muted",
						children: [awayName, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							inputMode: "numeric",
							className: "mt-1 block h-11 w-20 rounded-lg bg-raised px-3 tabular text-fg",
							value: awayScore,
							onChange: (e) => onAwayScore(e.target.value.replace(/[^0-9]/g, ""))
						})]
					})
				]
			}) : null,
			missing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "Type both scores to restamp."
			}) : null,
			stamped ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted",
				children: [
					periodLabel[stamped.period],
					" restamp",
					" ",
					stamped.restampedSpread >= 0 ? `${homeName} −${fmtNum(stamped.restampedSpread, 1)}` : `${awayName} −${fmtNum(-stamped.restampedSpread, 1)}`,
					" · ",
					homeName,
					" ",
					fmtPct(stamped.pHome * 100, 1)
				]
			}) : null
		]
	});
}
function TeamHead({ team, side }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0 flex-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-[0.14em] text-faint",
			children: side
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
				slug: team.slug,
				color: team.colorPrimary,
				swatchClassName: "h-8 w-1.5",
				logoSize: 24
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display text-3xl tracking-wide",
				children: team.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-sm text-muted",
				children: [
					"HX #",
					team.hxRank,
					" · ",
					team.conference
				]
			})] })]
		})]
	});
}
//#endregion
export { MatchupPage as component };
