import { o as modelShare, t as MODEL } from "./chicago-BAye5qRT.mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as fmtNum, C as PageHead, D as cn, E as apLabel, j as fmtPct, k as fmtHeight, n as Route, w as Panel } from "./router-BESdhWwq.mjs";
import { a as RankMove, c as Stat, d as TeamSwatch, i as MixBar, n as DeltaChip } from "./marks-ckZKOuCF.mjs";
import { c as TALENT_UNITS } from "./positions-C8RvhdNc.mjs";
import { n as RosterList } from "./roster-duel-nDBdPy99.mjs";
import { a as ratedStarCount, o as visibleClassAvg, t as COMPOSITE_SOURCE } from "./recruiting-B2tK2ji6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teams._slug-qu8ME6U3.js
var import_jsx_runtime = require_jsx_runtime();
/** FBS vs FCS rows dropped from the 136-team games table — opponent names stubbed until Research wires them. */
var FCS_STUB_GAMES = [
	{
		teamSlug: "buffalo",
		week: 1,
		kickoffDate: "2026-09-03",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "delaware",
		week: 1,
		kickoffDate: "2026-09-03",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "kennesaw-state",
		week: 1,
		kickoffDate: "2026-09-03",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "minnesota",
		week: 1,
		kickoffDate: "2026-09-03",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "missouri",
		week: 1,
		kickoffDate: "2026-09-03",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "ucf",
		week: 1,
		kickoffDate: "2026-09-03",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "utah",
		week: 1,
		kickoffDate: "2026-09-03",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "georgia-state",
		week: 1,
		kickoffDate: "2026-09-04",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "kansas",
		week: 1,
		kickoffDate: "2026-09-04",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "purdue",
		week: 1,
		kickoffDate: "2026-09-04",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "air-force",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "arizona",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "arizona-state",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "arkansas",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "army",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "bowling-green",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "byu",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "charlotte",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "georgia",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "georgia-southern",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "iowa-state",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "jacksonville-state",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "kansas-state",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "kentucky",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "louisiana",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "louisiana-tech",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "maryland",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "middle-tennessee",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "navy",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "new-mexico-state",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "northwestern",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "old-dominion",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "rice",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "san-diego-state",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "south-alabama",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "southern-miss",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "syracuse",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "temple",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "tennessee",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "texas-tech",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "utah-state",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "utsa",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "vanderbilt",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	},
	{
		teamSlug: "virginia-tech",
		week: 1,
		kickoffDate: "2026-09-05",
		opponentLabel: "FCS opponent",
		home: true
	}
];
function fcsStubsForTeam(slug) {
	return FCS_STUB_GAMES.filter((g) => g.teamSlug === slug);
}
/** Map preseason playoff_odds (logistic make-field curve) until AMD draws land. */
function make12FromTeam(team) {
	const hasLegacy = Number.isFinite(team.playoffOdds);
	return {
		makeField: hasLegacy ? team.playoffOdds : null,
		winTitle: null,
		makeFieldSource: hasLegacy ? "legacy-playoff-odds" : "pending",
		winTitleSource: "pending"
	};
}
function buildRemainingSchedule(teamSlug, games) {
	const fbsRows = games.filter((g) => g.status !== "final").map((g) => {
		const homeIs = g.homeSlug === teamSlug;
		const oppSlug = homeIs ? g.awaySlug : g.homeSlug;
		const oppName = homeIs ? g.awayName : g.homeName;
		return {
			key: `fbs-${g.id}`,
			week: g.week,
			kickoffDate: g.kickoffDate,
			opponentLabel: oppName,
			opponentSlug: oppSlug,
			home: homeIs,
			neutral: g.neutral,
			location: g.location,
			status: g.status,
			homeScore: null,
			awayScore: null,
			isFcs: false
		};
	});
	const fcsRows = fcsStubsForTeam(teamSlug).map((stub, i) => ({
		key: `fcs-${teamSlug}-${stub.kickoffDate}-${i}`,
		week: stub.week,
		kickoffDate: stub.kickoffDate,
		opponentLabel: stub.opponentLabel,
		opponentSlug: null,
		home: stub.home,
		neutral: false,
		location: null,
		status: "scheduled",
		homeScore: null,
		awayScore: null,
		isFcs: true
	}));
	return [...fbsRows, ...fcsRows].sort((a, b) => {
		if (a.kickoffDate !== b.kickoffDate) return a.kickoffDate < b.kickoffDate ? -1 : 1;
		if (a.week !== b.week) return a.week - b.week;
		return a.opponentLabel.localeCompare(b.opponentLabel);
	});
}
function make12FieldLabel(source) {
	if (source === "legacy-playoff-odds") return "Pre-AMD logistic estimate";
	if (source === "pending") return "Awaiting AMD draws";
	return "10k sim draws";
}
function make12TitleLabel(source) {
	if (source === "pending") return "Awaiting AMD draws";
	return "10k sim draws";
}
function OddsCell({ label, value, sourceNote, pending }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-md border border-line bg-raised/40 px-4 py-3", pending && "border-dashed"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] uppercase tracking-[0.14em] text-faint",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("mt-1 font-display text-2xl tabular leading-none sm:text-3xl", pending ? "text-muted" : "text-fg"),
				children: value
			}),
			sourceNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1.5 text-xs text-muted",
				children: sourceNote
			}) : null
		]
	});
}
/** Make 12 panel — make-field and win-title are separate cells (never title-only). */
function Make12Panel({ odds, className }) {
	const makeFieldPending = odds.makeField == null;
	const winTitlePending = odds.winTitle == null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "Make 12"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "12-team CFP field odds — make-field and national-title paths are separate draws."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OddsCell, {
				label: "Make field",
				value: makeFieldPending ? "—" : fmtPct(odds.makeField, 1),
				sourceNote: make12FieldLabel(odds.makeFieldSource),
				pending: makeFieldPending
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OddsCell, {
				label: "Win title",
				value: winTitlePending ? "—" : fmtPct(odds.winTitle, 1),
				sourceNote: make12TitleLabel(odds.winTitleSource),
				pending: winTitlePending
			})]
		})]
	});
}
function RemainingScheduleSection({ rows, teamShortName }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "mb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "Remaining schedule"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Unplayed FBS slate plus FCS stubs off the 136-team board. Season-sim draws pending."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs tabular text-faint",
				children: rows.length === 0 ? "Season complete" : `${rows.length} left`
			})]
		}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "No remaining games on the board."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-line",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "py-3.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[11px] uppercase tracking-[0.14em] text-faint",
							children: [
								"Week ",
								row.week,
								" · ",
								row.kickoffDate,
								row.neutral ? " · Neutral" : null,
								row.location ? ` · ${row.location}` : null
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium",
								children: [
									row.home ? "vs" : "@",
									" ",
									row.opponentSlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/teams/$slug",
										params: { slug: row.opponentSlug },
										className: "hover:text-accent",
										children: row.opponentLabel
									}) : row.opponentLabel
								]
							}), row.isFcs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded bg-raised px-1.5 py-0.5 text-[10px] uppercase tracking-[0.1em] text-faint",
								children: "FCS stub"
							}) : null]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "uppercase tracking-[0.12em] text-faint",
							children: teamShortName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 tabular",
							children: row.home ? "Home" : "Away"
						})]
					})]
				})
			}, row.key))
		})]
	});
}
function TeamPage() {
	const { team, players, games, classes } = Route.useLoaderData();
	const share = modelShare(team);
	const make12 = make12FromTeam(team);
	const remaining = buildRemainingSchedule(team.slug, games);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: `${team.conference} · ${team.city}, ${team.state}`,
			title: team.name,
			lede: `${team.mascot} · ${team.lastWins}–${team.lastLosses} last season · ${team.lastFinish}`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSwatch, {
						color: team.colorPrimary,
						className: "h-12 w-1.5"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-5xl tabular leading-none",
						children: team.hxRank
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-sm text-muted",
						children: "HX rank"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-6 sm:grid-cols-3",
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
							value: fmtNum(team.projectedWins, 1)
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeltaChip, {
					hxRank: team.hxRank,
					apRank: team.apRank
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Make12Panel, { odds: make12 })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemainingScheduleSection, {
			rows: remaining,
			teamShortName: team.shortName
		}),
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
					children: "Z-scores vs the 136-team FBS pool. Composite HX = weighted sum."
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
	] });
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
	return d > 0 ? `HX ${d} spots higher` : `AP ${-d} spots higher`;
}
//#endregion
export { TeamPage as component };
