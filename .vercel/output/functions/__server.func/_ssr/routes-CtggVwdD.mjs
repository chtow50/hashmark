import { r as formatKickCt, s as predictMatchup } from "./chicago-BAye5qRT.mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as ArrowRight } from "../_libs/lucide-react.mjs";
import { A as fmtNum, C as PageHead, E as apLabel, _ as favoriteLine, b as spreadGap, j as fmtPct, m as Route$11, v as featuredBook, w as Panel, x as Button, y as featuredSlateWeek } from "./router-BESdhWwq.mjs";
import { c as Stat, f as WinBar, l as TeamLink, n as DeltaChip, o as RankNum, u as TeamMark } from "./marks-ckZKOuCF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CtggVwdD.js
var import_jsx_runtime = require_jsx_runtime();
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
	const disagreements = [...teams].filter((t) => t.apRank != null).map((t) => ({
		team: t,
		delta: (t.apRank ?? t.hxRank) - t.hxRank
	})).sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta)).slice(0, 6);
	const recLeaders = [...teams].sort((a, b) => a.recRank - b.recRank).slice(0, 5);
	const talentLeaders = [...teams].sort((a, b) => a.talentRank - b.talentRank).slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: `Week 0 locked · HX 2026.2`,
				title: `Week 0 board`,
				lede: "HASHMARK runs a single rating — HX — from recruiting talent, last year’s SP+/Elo/SRS, four-year win trend, returning production, and portal net. Full 136 FBS. The AP column is the Aug 17 preseason ballot."
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
								one.lastWins,
								"–",
								one.lastLosses,
								" last fall"
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
								value: fmtPct(one.playoffOdds, 0)
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
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl tracking-wide",
							children: "Where HX disagrees"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 mb-4 text-sm text-muted",
							children: "Largest gaps versus the preseason AP ballot."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: disagreements.map(({ team, delta }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamLink, {
								slug: team.slug,
								name: team.shortName,
								color: team.colorPrimary
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: delta > 0 ? "text-sm tabular text-up" : "text-sm tabular text-down",
								children: delta > 0 ? `HX +${delta}` : `HX ${delta}`
							})]
						}, team.slug)) })
					] })]
				})]
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
	const kick = formatKickCt(featured.kickoffAt);
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
