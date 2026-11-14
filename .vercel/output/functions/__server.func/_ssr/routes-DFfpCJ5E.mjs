import { r as predictMatchup, t as MODEL } from "./model-C--_NYY0.mjs";
import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as ArrowRight } from "../_libs/lucide-react.mjs";
import { i as formatKickDayTitle, r as formatKickCt } from "./chicago-CEb1x88L.mjs";
import { B as CFP_STAMP, C as TeamLink, H as featuredBook, S as Stat, T as WinBar, U as featuredSlateWeek, V as favoriteLine, W as isNotableSpreadGap, X as PageHead, Z as Panel, _ as LineStat, b as RankNum, ct as usePinnedTeam, et as apLabel, h as DeltaChip, it as fmtPct, j as Route$19, q as Button, rt as fmtNum, tt as cn, w as TeamMark, z as AP_STAMP } from "./router-rU7ZlTxw.mjs";
import { a as isVegasOnlyFcs } from "./fcs-stubs-BauL-2kD.mjs";
import { n as formatSeasonRecord } from "./sim_free_hx2026_8-RefHl5mu.mjs";
import { a as make12FreeFromSim, c as week10SeasonTape, i as liveDisagreementRows, l as week10Tape, o as odTermLabel, s as week10BoardFlags, t as SIM_10K_HX_STAMP, u as week10Top25Tape } from "./season-sim-DHebyHVh.mjs";
import { n as RisersFallersCard } from "./hx-results-DKLpLd6C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DFfpCJ5E.js
var import_jsx_runtime = require_jsx_runtime();
function DisagreementCard({ rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl tracking-wide",
			children: "Where HX disagrees"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 mb-4 text-sm text-muted",
			children: [
				"Largest gaps versus ",
				AP_STAMP.vsHx,
				", against the current HX board (refit weekly)."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: cn("flex items-center justify-between gap-3 py-2", row.highlight && "-mx-2 rounded-md border-l-2 border-warn bg-raised/40 px-2"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-w-0 items-center gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamLink, {
					slug: row.slug,
					name: row.shortName,
					color: row.colorPrimary
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shrink-0 text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("text-sm tabular", row.delta > 0 ? "text-up" : row.delta < 0 ? "text-down" : "text-muted"),
					children: row.delta === 0 ? "Even" : `${Math.abs(row.delta)} ${Math.abs(row.delta) === 1 ? "spot" : "spots"} ${row.delta > 0 ? "higher" : "lower"} on HX`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-[11px] tabular text-faint",
					children: [
						"AP ",
						row.ap,
						" · HX ",
						row.hx
					]
				})]
			})]
		}, row.name)) })
	] });
}
function AccountabilityCard({ tape, top25, season, flags, movers, weekLabel = "Week 4 tape", storySlug = "week-4-tape", scheduleWeek, closerScope = "slate", dek = "Full slate closer is a FLAG. Top 25 closer 8/18 is a FLAG. HX not retuned.", flagsKicker = "Board flags · pregame board" }) {
	const top25CloserFlag = top25.hx_closer_pct < 45;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: weekLabel
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: dek
			})] }), scheduleWeek != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/schedule",
				search: { w: scheduleWeek },
				className: "text-sm text-muted hover:text-fg",
				children: [
					"Week ",
					scheduleWeek,
					" FINALs"
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/stories/$slug",
				params: { slug: storySlug },
				className: "text-sm text-muted hover:text-fg",
				children: "Desk note"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-line bg-raised/40 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] uppercase tracking-[0.14em] text-faint",
							children: "SU · slate"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 font-display text-2xl tabular leading-none text-fg sm:text-3xl",
							children: tape.su
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1.5 text-xs tabular text-muted",
							children: [fmtNum(tape.su_pct, 1), "%"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("rounded-md border bg-raised/40 px-4 py-3", tape.closer_flag ? "border-warn/40" : "border-up/40"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("text-[11px] uppercase tracking-[0.14em]", tape.closer_flag ? "text-warn" : "text-up"),
							children: tape.closer_flag ? "Closer · FLAG" : `Closer · ${closerScope}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 font-display text-2xl tabular leading-none text-fg sm:text-3xl",
							children: tape.hx_closer
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1.5 text-xs tabular text-muted",
							children: [fmtNum(tape.hx_closer_pct, 1), "%"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-line bg-raised/40 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] uppercase tracking-[0.14em] text-faint",
							children: "SU · Top 25"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 font-display text-2xl tabular leading-none text-fg sm:text-3xl",
							children: top25.su
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1.5 text-xs tabular text-muted",
							children: [fmtNum(top25.su_pct, 1), "%"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("rounded-md border bg-raised/40 px-4 py-3", top25CloserFlag ? "border-warn/40" : "border-up/40"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("text-[11px] uppercase tracking-[0.14em]", top25CloserFlag ? "text-warn" : "text-up"),
							children: top25CloserFlag ? "Closer · Top 25 · FLAG" : "Closer · Top 25"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 font-display text-2xl tabular leading-none text-fg sm:text-3xl",
							children: top25.hx_closer
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1.5 text-xs tabular text-muted",
							children: [fmtNum(top25.hx_closer_pct, 1), "%"]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-sm text-muted",
			children: [
				tape.lined ? `MAE on the ${tape.lined.n} Vegas-lined cards: HX ${fmtNum(tape.lined.mae_hx, 2)} / Vegas ${fmtNum(tape.lined.mae_vegas, 2)}. Full-slate HX MAE ${fmtNum(tape.mae_hx, 2)} (n=${tape.n}).` : `Slate MAE HX ${fmtNum(tape.mae_hx, 2)} / Vegas ${fmtNum(tape.mae_vegas, 2)}.`,
				" ",
				"ATS ",
				tape.hx_ats,
				". Vegas closer ",
				tape.vegas_closer,
				".",
				top25.mae_hx != null && top25.mae_vegas != null ? ` Top 25 MAE HX ${fmtNum(top25.mae_hx, 2)} / Vegas ${fmtNum(top25.mae_vegas, 2)}.` : ` Top 25 Vegas closer ${top25.vegas_closer}.`
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm text-muted",
			children: [
				"Season ",
				season.label,
				": SU ",
				fmtNum(season.su_pct, 1),
				"% · closer ",
				fmtNum(season.hx_closer_pct, 1),
				"%"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint",
			children: flagsKicker
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-2",
			children: flags.map((flag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-start justify-between gap-3 py-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-fg",
						children: flag.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-0.5 text-xs tabular text-muted",
						children: [
							flag.hx,
							" vs ",
							flag.vegas,
							" · ",
							flag.final
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("shrink-0 pt-0.5 text-[11px] uppercase tracking-[0.12em]", flag.result === "HIT" ? "text-up" : "text-down"),
					children: flag.result
				})]
			}, flag.id))
		}),
		movers && movers.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint",
			children: "Week 1 HX movers · term = O/D"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-2",
			children: movers.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between gap-3 py-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/teams/$slug",
					params: { slug: m.slug },
					className: "min-h-11 inline-flex items-center text-sm text-fg hover:text-accent",
					children: m.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "shrink-0 text-right text-xs tabular text-muted",
					children: [
						m.delta_hx > 0 ? "+" : "",
						fmtNum(m.delta_hx, 3),
						" · ",
						odTermLabel(m.term)
					]
				})]
			}, m.slug))
		})] }) : null
	] });
}
/**
* "Your team" card on the board. Client-only (localStorage pin), so it renders
* nothing on the server and nothing until a team is pinned. Same HX line math
* as the schedule rows; FCS stubs and unrated FINALs show no HX line.
*/
function PinnedTeamCard({ teams, slate, week }) {
	const [pinned, setPinned] = usePinnedTeam();
	const team = pinned ? teams.find((t) => t.slug === pinned) : void 0;
	if (!team) return null;
	const g = slate.find((x) => x.homeSlug === team.slug || x.awaySlug === team.slug);
	const isHome = g ? g.homeSlug === team.slug : false;
	const pred = g && !isVegasOnlyFcs(g) && g.hxUnrated !== true ? predictMatchup({
		hxRating: g.homeHx,
		offenseRating: g.homeOff,
		defenseRating: g.homeDef
	}, {
		hxRating: g.awayHx,
		offenseRating: g.awayOff,
		defenseRating: g.awayDef
	}, { neutral: g.neutral }) : null;
	const hxLine = g && pred ? favoriteLine(g.homeShort, g.awayShort, pred.spread) : null;
	const vegasLine = g && g.vegasSpread != null ? favoriteLine(g.homeShort, g.awayShort, g.vegasSpread) : null;
	const opp = g ? isHome ? g.awayName : g.homeName : null;
	const final = g?.status === "final" && g.homeScore != null && g.awayScore != null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "enter",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.18em] text-faint",
					children: "Your team"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setPinned(null),
					className: "min-h-10 text-xs text-muted hover:text-fg",
					children: "Unpin"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
						slug: team.slug,
						color: team.colorPrimary,
						swatchClassName: "h-10 w-1.5 rounded-sm",
						logoSize: 20
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/teams/$slug",
						params: { slug: team.slug },
						className: "font-display text-3xl tracking-wide",
						children: team.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							team.conference,
							" · ",
							formatSeasonRecord(team.seasonWins, team.seasonLosses)
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4 sm:gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "HX rank",
						value: String(team.hxRank)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "HX",
						value: fmtNum(team.hxRating, 2)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 border-t border-line pt-4",
				children: [g && opp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs uppercase tracking-wide text-faint",
						children: ["Week ", week]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm",
						children: [
							isHome ? "vs" : g.neutral ? "vs" : "at",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg",
								children: opp
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [" · ", final ? `FINAL ${g.awayShort} ${g.awayScore}, ${g.homeShort} ${g.homeScore}` : g.kickoffAt ? formatKickCt(g.kickoffAt) : formatKickDayTitle(null, g.kickoffDate)]
							})
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineStat, {
							label: "HASHMARK",
							value: hxLine,
							empty: "No HX line"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineStat, {
							label: "Vegas",
							value: vegasLine,
							empty: "No line posted"
						})]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"No game for ",
						team.shortName,
						" in Week ",
						week,
						"."
					]
				}), g && !isVegasOnlyFcs(g) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/matchup",
					search: {
						home: g.homeSlug,
						away: g.awaySlug,
						...g.neutral ? { neutral: true } : {}
					},
					className: "mt-3 inline-block text-sm text-muted underline-offset-4 hover:text-fg hover:underline",
					children: "Open in the matchup engine"
				}) : null]
			})
		]
	});
}
function Home() {
	const { teams, games, featured, slate } = Route$19.useLoaderData();
	const top = teams.slice(0, 25);
	const one = teams[0];
	const featurePred = featured ? predictMatchup({
		hxRating: featured.homeHx,
		offenseRating: featured.homeOff,
		defenseRating: featured.homeDef
	}, {
		hxRating: featured.awayHx,
		offenseRating: featured.awayOff,
		defenseRating: featured.awayDef
	}, { neutral: featured.neutral }) : null;
	const disagreements = liveDisagreementRows(teams).slice(0, 8);
	const tape = week10Tape();
	const top25 = week10Top25Tape();
	const season = week10SeasonTape();
	const flags = week10BoardFlags();
	const oneMake = one ? make12FreeFromSim(one.slug, one) : null;
	const recLeaders = [...teams].sort((a, b) => a.recRank - b.recRank).slice(0, 5);
	const talentLeaders = [...teams].sort((a, b) => a.talentRank - b.talentRank).slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: `Week 11 · HX ${MODEL.version}`,
				title: `Week 11 board`,
				lede: `HASHMARK runs a single rating — HX. It starts from recruiting talent, last year’s SP+/Elo/SRS, four-year win trend, returning production, and portal net, then is refit every week from this season’s results. Full 138 FBS. ${AP_STAMP.lede}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinnedTeamCard, {
				teams,
				slate,
				week: 11
			}),
			one ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				className: "enter",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.18em] text-faint",
						children: "HX No. 1"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
							slug: one.slug,
							color: one.colorPrimary,
							swatchClassName: "h-10 w-1.5 rounded-sm",
							logoSize: 20
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/teams/$slug",
							params: { slug: one.slug },
							className: "font-display text-4xl tracking-wide sm:text-5xl",
							children: one.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								one.mascot,
								" · ",
								one.conference,
								" · ",
								formatSeasonRecord(one.seasonWins, one.seasonLosses)
							]
						})] })]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-3 sm:gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "HX",
								value: fmtNum(one.hxRating, 2)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "AP",
								value: apLabel(one.apRank),
								hint: AP_STAMP.columnHint
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Make 12",
								value: oneMake?.makeField != null ? fmtPct(oneMake.makeField, 1) : fmtPct(one.playoffOdds, 0),
								hint: oneMake?.makeFieldSource === "amd-draws" ? `make-field · ${SIM_10K_HX_STAMP} 10k` : void 0
							})
						]
					})]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[1.2fr_0.8fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-wide",
						children: "Top 25"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/rankings",
						className: "text-sm text-muted hover:text-fg",
						children: "Full board"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: top.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 border-b border-line py-2.5 last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankNum, {
							rank: t.hxRank,
							className: "w-8 text-lg"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamLink, {
							slug: t.slug,
							name: t.name,
							color: t.colorPrimary,
							className: "min-h-10 flex-1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular text-sm text-muted",
							children: formatSeasonRecord(t.seasonWins, t.seasonLosses)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden tabular text-sm text-muted sm:inline",
							children: fmtNum(t.hxRating, 2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeltaChip, {
							hxRank: t.hxRank,
							apRank: t.apRank
						})
					]
				}, t.slug)) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						featured && featurePred ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedKick, {
							featured,
							pred: featurePred
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisagreementCard, { rows: disagreements }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RisersFallersCard, { teams })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CfpBlock, { teams }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountabilityCard, {
				tape,
				top25,
				season,
				flags,
				weekLabel: "Week 10 tape",
				scheduleWeek: 10,
				closerScope: "Vegas-lined",
				dek: "SU 36/61 is under 70% — SU FLAG. Closer 3/5 is graded only on the 5 cards with a stamped Vegas line — small sample, not under 45%, so no closer FLAG. Soft-cal FLAG stays. Graded on the pregame HX 2026.7 board; HX is refit weekly from Week 11 on.",
				flagsKicker: "Board flags · pregame HX 2026.7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Composite class of 2026"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						2023,
						2024,
						2025,
						2026
					].map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/recruiting",
						search: { year: y === 2026 ? void 0 : y },
						className: "inline-flex h-9 items-center rounded-full bg-raised px-3 text-sm text-muted hover:text-fg",
						children: y
					}, y))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-5",
				children: recLeaders.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/teams/$slug",
					params: { slug: t.slug },
					className: "bg-surface p-4 hover:bg-raised",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-2xl tabular text-muted",
							children: t.recRank
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
								slug: t.slug,
								color: t.colorPrimary
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: t.shortName
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 text-xs tabular text-muted",
							children: [
								t.fiveStars,
								" five-star · ",
								fmtNum(t.recAvg, 1),
								" avg"
							]
						})
					]
				}, t.slug))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Roster talent composite"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Listed two-deep, transfers included. Not OL mass."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/talent",
					search: {},
					className: "text-sm text-muted hover:text-fg",
					children: "Full board"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-5",
				children: talentLeaders.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/teams/$slug",
					params: { slug: t.slug },
					className: "bg-surface p-4 hover:bg-raised",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-2xl tabular text-muted",
							children: t.talentRank
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
								slug: t.slug,
								color: t.colorPrimary
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: t.shortName
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 text-xs tabular text-muted",
							children: [
								fmtNum(t.talentScore, 1),
								" · ",
								t.transferCount,
								" TR · ",
								fmtPct(t.portalShare, 0),
								" portal"
							]
						})
					]
				}, t.slug))
			})] })
		]
	});
}
function FeaturedKick({ featured, pred }) {
	const week = featuredSlateWeek(featured);
	const hxLine = favoriteLine(featured.homeShort, featured.awayShort, pred.spread);
	const hxWin = pred.spread >= 0 ? pred.homeWinPct : pred.awayWinPct;
	const book = featuredBook(featured);
	const bookLine = book ? favoriteLine(featured.homeShort, featured.awayShort, book.spread) : null;
	const notableGap = book ? isNotableSpreadGap(pred.spread, book.spread) : false;
	const kick = featured.kickoffAt ? formatKickCt(featured.kickoffAt) : formatKickDayTitle(null, featured.kickoffDate);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-mono text-[11px] uppercase tracking-[0.18em] text-faint",
			children: [
				"Week ",
				week,
				" · ",
				featured.location
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-2 font-display text-2xl tracking-wide",
			children: featured.neutral ? `${featured.awayShort} vs ${featured.homeShort}` : `${featured.awayShort} at ${featured.homeShort}`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted",
			children: [
				kick,
				featured.tv ? ` · ${featured.tv}` : "",
				featured.neutral ? " · Neutral" : ""
			]
		}),
		notableGap && bookLine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 inline-flex h-6 items-center rounded-full bg-raised px-2 text-[11px] uppercase tracking-[0.12em] text-warn",
			children: "Spread gap"
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinBar, {
				homePct: pred.homeWinPct,
				homeName: featured.homeShort,
				awayName: featured.awayShort
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineStat, {
				label: "HASHMARK",
				value: hxLine,
				sub: `${fmtPct(hxWin * 100, 1)} to win`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineStat, {
				label: book?.label ?? "Vegas",
				value: book && bookLine ? bookLine : null,
				sub: book && book.total !== "—" ? `O/U ${book.total}` : book ? "Total not posted" : null
			})]
		}),
		notableGap && bookLine ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-sm text-warn",
			children: [
				"HASHMARK ",
				hxLine,
				" vs book ",
				bookLine,
				" · same favorite"
			]
		}) : null,
		book?.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-xs leading-relaxed text-muted",
			children: book.note
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			className: "mt-5 w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/matchup",
				search: {
					home: featured.homeSlug,
					away: featured.awaySlug,
					...featured.neutral ? { neutral: true } : {}
				},
				children: ["Open matchup", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
			})
		})
	] });
}
/** CFP committee top 12 (last stamped release) next to HX rank and make-field. Committee's number, not HASHMARK's. */
function CfpBlock({ teams }) {
	const ranked = teams.filter((t) => t.cfpRank != null && t.cfpRank <= 12).sort((a, b) => (a.cfpRank ?? 99) - (b.cfpRank ?? 99));
	if (ranked.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "CFP committee top 12"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/rankings",
				className: "text-sm text-muted hover:text-fg",
				children: "All CFP ranks on the board"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-4 text-sm text-muted",
			children: [CFP_STAMP.label, " (committee top 25; ESPN, NCAA.com cross-check). The committee’s order, shown beside HX rank and HASHMARK make-field odds. Not a projected bracket."]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[420px] text-sm tabular",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line text-left text-[11px] uppercase tracking-[0.14em] text-faint",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-normal",
							children: "CFP"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-normal",
							children: "Team"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 text-right font-normal",
							children: "Record"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 text-right font-normal",
							children: "HX"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 text-right font-normal",
							children: "Make 12"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ranked.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3 text-muted",
							children: t.cfpRank
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamLink, {
								slug: t.slug,
								name: t.shortName,
								color: t.colorPrimary
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3 text-right text-muted",
							children: formatSeasonRecord(t.seasonWins, t.seasonLosses)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-2 pr-3 text-right",
							children: ["#", t.hxRank]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 text-right",
							children: fmtPct(make12FreeFromSim(t.slug, t).makeField ?? 0, 1)
						})
					]
				}, t.slug)) })]
			})
		})
	] });
}
//#endregion
export { Home as component };
