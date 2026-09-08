import { a as modelShare, o as predictMatchup, t as MODEL } from "./chicago-DXJoTaoU.mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as fmtHeight, D as apLabel, M as fmtPct, O as cn, T as Panel, _ as favoriteLine, b as formatVegas, j as fmtNum, n as Route, w as PageHead } from "./router-DgNS_QMM.mjs";
import { a as RankMove, c as Stat, i as MixBar, n as DeltaChip, r as DeskChip, u as TeamMark } from "./marks-BAdZVDnV.mjs";
import { c as TALENT_UNITS } from "./positions-C0zZnrTX.mjs";
import { n as RosterList } from "./roster-duel-DUr5lzvr.mjs";
import { n as matchupChips, t as isWinnerFlip } from "./schedule-flags-TITPWIaI.mjs";
import { a as ratedStarCount, o as visibleClassAvg, t as COMPOSITE_SOURCE } from "./recruiting-B2tK2ji6.mjs";
import { i as formatSeasonRecord } from "./season-record-Bop-q4Ke.mjs";
import { a as make12FromSim, i as make12FieldLabel, n as buildRemainingSchedule, o as make12PanelLede, r as buildSeasonSchedule, s as make12TitleLabel } from "./season-sim-CYc-TMmG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teams._slug-Dq_9K0wd.js
var import_jsx_runtime = require_jsx_runtime();
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
function StatBlock({ label, value, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] uppercase tracking-[0.14em] text-faint",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 font-display text-xl tabular leading-none text-fg sm:text-2xl",
			children: value
		})]
	});
}
function TeamHubScheduleRow({ row }) {
	const g = row.game;
	const pred = g ? predictMatchup({
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
	const vegasLine = g?.vegasSpread == null ? null : favoriteLine(g.homeShort, g.awayShort, g.vegasSpread);
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
							children: "FCS stub"
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBlock, {
				label: "HASHMARK",
				value: `${hxLine} · ${fmtPct(hxWin * 100, 1)}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBlock, {
				label: "Vegas",
				value: formatVegas(vegasLine, g.vegasTotal)
			}),
			isFinal && finalScore ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBlock, {
				label: "FINAL",
				value: finalScore
			}) : null
		]
	}) : null] });
	if (g) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "py-3.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
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
				children: make12PanelLede(odds.makeFieldSource)
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
				children: "Unplayed FBS slate plus FCS stubs. HASHMARK spread and win% from HX; Vegas when stamped on the tape."
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
function TeamPage() {
	const { team, players, games, classes } = Route.useLoaderData();
	const share = modelShare(team);
	const make12 = make12FromSim(team.slug, team);
	const remaining = buildRemainingSchedule(team.slug, games);
	const season = buildSeasonSchedule(team.slug, games);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: `${team.conference} · ${team.city}, ${team.state}`,
			title: team.name,
			lede: `${team.mascot} · ${formatSeasonRecord(team.seasonWins, team.seasonLosses)} · ${team.lastFinish}`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeasonScheduleSection, { rows: season }),
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
