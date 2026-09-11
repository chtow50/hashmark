import { i as formatKickDayTitle, r as formatKickCt, s as predictMatchup, t as MODEL } from "./chicago-ClRwnsKl.mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as ArrowRight } from "../_libs/lucide-react.mjs";
import { D as apLabel, M as fmtPct, O as cn, S as Button, T as Panel, _ as favoriteLine, j as fmtNum, m as Route$11, v as featuredBook, w as PageHead, x as spreadGap, y as featuredSlateWeek } from "./router-DoDUm557.mjs";
import { c as Stat, f as WinBar, l as TeamLink, n as DeltaChip, o as RankNum, u as TeamMark } from "./marks-CNp6yZdP.mjs";
import { n as formatSeasonRecord } from "./season-record-CUAJoKfH.mjs";
import { a as make12FromSim, c as odMovers, l as odTermLabel, t as boardDisagreementRows, u as week1Tape } from "./season-sim-BsCcHZRL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BGaPBAvN.js
var import_jsx_runtime = require_jsx_runtime();
function DisagreementCard({ rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl tracking-wide",
			children: "Where HX disagrees"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 mb-4 text-sm text-muted",
			children: "Largest gaps versus Week 1 AP — not the preseason ballot."
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
					children: row.delta > 0 ? `HX +${row.delta}` : `HX ${row.delta}`
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
function AccountabilityCard({ tape, movers }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "Week 1 tape"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "SU and closer vs the close. HX not retuned."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/stories/$slug",
				params: { slug: "week-1-tape" },
				className: "text-sm text-muted hover:text-fg",
				children: "Desk note"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border border-line bg-raised/40 px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] uppercase tracking-[0.14em] text-faint",
						children: "SU"
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
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border border-line bg-raised/40 px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] uppercase tracking-[0.14em] text-faint",
						children: "Closer"
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
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint",
			children: "HX movers · term = O/D"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
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
		})
	] });
}
function Home() {
	const { teams, games, featured } = Route$11.useLoaderData();
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
	const disagreements = boardDisagreementRows(teams).slice(0, 8);
	const tape = week1Tape();
	const movers = odMovers(6);
	const oneMake = one ? make12FromSim(one.slug, one) : null;
	const recLeaders = [...teams].sort((a, b) => a.recRank - b.recRank).slice(0, 5);
	const talentLeaders = [...teams].sort((a, b) => a.talentRank - b.talentRank).slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: `Week 2 · HX ${MODEL.version}`,
				title: `Week 2 board`,
				lede: "HASHMARK runs a single rating — HX — from recruiting talent, last year’s SP+/Elo/SRS, four-year win trend, returning production, and portal net. Full 136 FBS. The AP column is Week 1 AP (Sept. 8)."
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
								value: apLabel(one.apRank)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Make 12",
								value: oneMake?.makeField != null ? fmtPct(oneMake.makeField, 1) : fmtPct(one.playoffOdds, 0),
								hint: oneMake?.makeFieldSource === "amd-draws" ? "make-field · HX 2026.3 10k" : void 0
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
					children: [featured && featurePred ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedKick, {
						featured,
						pred: featurePred
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisagreementCard, { rows: disagreements })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountabilityCard, {
				tape,
				movers
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
						search: {
							year: y,
							board: "class"
						},
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
					search: { board: "composite" },
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
	const gap = book ? spreadGap(pred.spread, book.spread) : null;
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
		gap != null && bookLine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] uppercase tracking-[0.14em] text-faint",
				children: "HASHMARK"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 font-display text-xl tabular leading-none text-fg sm:text-2xl",
				children: [
					hxLine,
					" / ",
					fmtPct(hxWin * 100, 1)
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] uppercase tracking-[0.14em] text-faint",
				children: book?.label ?? "Vegas"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 font-display text-xl tabular leading-none text-fg sm:text-2xl",
				children: book && bookLine ? `${bookLine} · ${book.total}` : "—"
			})] })]
		}),
		gap != null && bookLine ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
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
//#endregion
export { Home as component };
