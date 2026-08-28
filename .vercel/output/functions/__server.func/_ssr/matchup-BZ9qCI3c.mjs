import { x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Route$6, d as Panel, f as TeamSelect, u as PageHead, v as fmtNum, y as fmtPct } from "./router-DJlRrram.mjs";
import { l as TeamSwatch, s as Stat, t as CompareRow, u as WinBar } from "./marks-Dv8OG6qB.mjs";
import { t as RosterDuel } from "./roster-duel-RLEH9DLA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/matchup-BZ9qCI3c.js
var import_jsx_runtime = require_jsx_runtime();
function MatchupPage() {
	const { teams, match } = Route$6.useLoaderData();
	const search = Route$6.useSearch();
	const navigate = useNavigate({ from: "/matchup" });
	const homeSlug = search.home ?? "texas";
	const awaySlug = search.away ?? "ohio-state";
	function setPair(next) {
		navigate({ search: {
			home: next.home ?? homeSlug,
			away: next.away ?? awaySlug
		} });
	}
	const { home, away, prediction, homePlayers, awayPlayers } = match;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "Predictive model",
			title: "Head to head",
			lede: "Pick any two programs. HX converts the rating gap plus a 2.4-point home edge into a spread, total, and win probability."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSelect, {
					id: "home",
					label: "Home",
					value: homeSlug,
					teams,
					onChange: (slug) => setPair({ home: slug })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-12 rounded-lg bg-raised px-4 text-sm text-muted hover:text-fg",
					onClick: () => setPair({
						home: awaySlug,
						away: homeSlug
					}),
					children: "Swap"
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinBar, {
						homePct: prediction.homeWinPct,
						homeName: home.shortName,
						awayName: away.shortName
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "HX edge",
							value: prediction.edge > 0 ? `+${fmtNum(prediction.edge, 2)}` : fmtNum(prediction.edge, 2),
							hint: "Includes home field"
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
						children: "Two-deep composite, transfers included. Unit slices sit under that. OL mass is an 8% HX term, not the ranking."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "HX rating",
						a: home.hxRating,
						b: away.hxRating,
						max: 36,
						format: (n) => fmtNum(n, 2)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "Talent composite",
						a: home.talentScore,
						b: away.talentScore,
						max: 100,
						format: (n) => fmtNum(n, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "HS two-deep",
						a: home.hsTalent,
						b: away.hsTalent,
						max: 100,
						format: (n) => fmtNum(n, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "Portal two-deep",
						a: home.portalTalent,
						b: away.portalTalent,
						max: 100,
						format: (n) => fmtNum(n, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "Offense two-deep",
						a: home.offTalent,
						b: away.offTalent,
						max: 100,
						format: (n) => fmtNum(n, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "Defense two-deep",
						a: home.defTalent,
						b: away.defTalent,
						max: 100,
						format: (n) => fmtNum(n, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "QB",
						a: home.qbTalent,
						b: away.qbTalent,
						max: 100,
						format: (n) => fmtNum(n, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "Skill",
						a: home.skillTalent,
						b: away.skillTalent,
						max: 100,
						format: (n) => fmtNum(n, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "OL",
						a: home.olTalent,
						b: away.olTalent,
						max: 100,
						format: (n) => fmtNum(n, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "DL",
						a: home.dlTalent,
						b: away.dlTalent,
						max: 100,
						format: (n) => fmtNum(n, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "LB",
						a: home.lbTalent,
						b: away.lbTalent,
						max: 100,
						format: (n) => fmtNum(n, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "DB",
						a: home.dbTalent,
						b: away.dbTalent,
						max: 100,
						format: (n) => fmtNum(n, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "Blue-chip %",
						a: home.blueChipPct,
						b: away.blueChipPct,
						max: 100,
						format: (n) => fmtPct(n, 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "Portal share",
						a: home.portalShare,
						b: away.portalShare,
						max: 100,
						format: (n) => fmtPct(n, 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "2026 class pts",
						a: home.recPoints,
						b: away.recPoints,
						max: 320,
						format: (n) => fmtNum(n, 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "Returning",
						a: home.returningProduction,
						b: away.returningProduction,
						max: 100,
						format: (n) => fmtPct(n, 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "Offense rating",
						a: home.offenseRating,
						b: away.offenseRating,
						max: 36,
						format: (n) => fmtNum(n, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "Defense rating",
						a: home.defenseRating,
						b: away.defenseRating,
						max: 36,
						format: (n) => fmtNum(n, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
						label: "OL mass (HX 8%)",
						a: home.olAvgWeightLbs,
						b: away.olAvgWeightLbs,
						max: 360,
						format: (n) => `${fmtNum(n, 0)} lb`
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex flex-wrap items-baseline justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-wide",
						children: "Two-deep"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-faint",
						children: "Listed chart · TWO·DEEP"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RosterDuel, {
					home: homePlayers,
					away: awayPlayers,
					homeName: home.shortName,
					awayName: away.shortName
				})] })
			]
		})
	] });
}
function TeamHead({ team, side }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0 flex-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-[0.14em] text-faint",
			children: side
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSwatch, {
				color: team.colorPrimary,
				className: "h-8 w-1.5"
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
