import { n as modelShare, r as predictMatchup } from "./model-BWbC4Ztz.mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as fmtHeight, d as Panel, m as apLabel, n as Route, u as PageHead, v as fmtNum, y as fmtPct } from "./router-DJlRrram.mjs";
import { i as RankMove, l as TeamSwatch, n as DeltaChip, r as MixBar, s as Stat, u as WinBar } from "./marks-Dv8OG6qB.mjs";
import { r as TALENT_UNITS } from "./positions-BXGdtgxF.mjs";
import { n as RosterList } from "./roster-duel-RLEH9DLA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teams._slug-daX4A2ce.js
var import_jsx_runtime = require_jsx_runtime();
function TeamPage() {
	const { team, players, games, classes } = Route.useLoaderData();
	const share = modelShare(team);
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
					className: "grid grid-cols-2 gap-6 sm:grid-cols-4",
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
							label: "Playoff",
							value: fmtPct(team.playoffOdds, 1)
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
						["Prior", share.prior],
						["Returning", share.returning],
						["Talent", share.talent],
						["Recruiting", share.recruiting],
						["OL mass", share.olMass],
						["Special", share.special]
					].map(([label, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular text-muted",
							children: fmtPct(v * 100, 0)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 h-1 overflow-hidden rounded-full bg-raised",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-accent",
							style: { width: `${v * 100}%` }
						})
					})] }, label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-muted",
					children: "OL mass is 8% of HX — a size feature, not the talent composite."
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
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted",
					children: "247Sports · 2023–2026"
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
									children: fmtNum(c.avgRating, 2)
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
		games.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 font-display text-2xl tracking-wide",
				children: "On the slate"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-line",
				children: games.map((g) => {
					const homeIs = g.homeSlug === team.slug;
					const pred = predictMatchup({
						hxRating: g.homeHx,
						offenseRating: g.homeOff,
						defenseRating: g.homeDef
					}, {
						hxRating: g.awayHx,
						offenseRating: g.awayOff,
						defenseRating: g.awayDef
					}, { neutral: g.neutral });
					const opp = homeIs ? g.awayName : g.homeName;
					const oppSlug = homeIs ? g.awaySlug : g.homeSlug;
					const win = homeIs ? pred.homeWinPct : pred.awayWinPct;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] uppercase tracking-[0.14em] text-faint",
								children: [
									"Week ",
									g.week,
									" · ",
									g.kickoffDate,
									" · ",
									g.location
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/matchup",
								search: {
									home: g.homeSlug,
									away: g.awaySlug
								},
								className: "mt-1 inline-block font-medium",
								children: [
									homeIs ? "vs" : "@",
									" ",
									opp
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full max-w-xs sm:w-56",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinBar, {
									homePct: win,
									homeName: team.shortName,
									awayName: homeIs ? g.awayShort : g.homeShort
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/teams/$slug",
								params: { slug: oppSlug },
								className: "text-xs text-muted hover:text-fg",
								children: "Opponent page"
							})
						})]
					}, g.id);
				})
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "Two-deep"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-faint",
				children: "Listed chart · TWO·DEEP"
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
