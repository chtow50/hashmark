import { o as __toESM } from "../_runtime.mjs";
import { n as MODEL } from "./fcs-stubs-DntyZ00F.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as DeltaChip, o as RankNum, u as TeamMark } from "./marks-D4lVI_VV.mjs";
import { $ as Panel, F as Route$11, K as ConfPills, Q as PageHead, at as fmtNum, nt as cn, ot as fmtPct, st as inConf, v as make12FromSim, z as AP_STAMP } from "./router-mpRDmuA6.mjs";
import { n as formatSeasonRecord } from "./season-record-CQ8jUQPP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rankings-CXFvNlRH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MOBILE_SORTS = [
	{
		key: "hxRank",
		label: "HX"
	},
	{
		key: "hxRating",
		label: "Rating"
	},
	{
		key: "apRank",
		label: "AP"
	},
	{
		key: "makeField",
		label: "Make 12"
	}
];
/** Rank col is w-16; Team sticks at that offset so names never slide under AP. */
var STICKY_RANK = "sticky left-0 z-20 w-16 min-w-16 bg-surface";
var STICKY_TEAM = "sticky left-16 z-20 min-w-36 border-r border-line bg-surface sm:min-w-52";
function make12Pct(t) {
	return fmtPct(make12FromSim(t.slug, t).makeField ?? t.playoffOdds, 1);
}
function RankingsPage() {
	const teams = Route$11.useLoaderData();
	const conf = Route$11.useSearch().conf ?? "All";
	const [sort, setSort] = (0, import_react.useState)("hxRank");
	const [dir, setDir] = (0, import_react.useState)("asc");
	const filtered = (0, import_react.useMemo)(() => {
		const rows = teams.filter((t) => inConf(t.conference, conf));
		const mul = dir === "asc" ? 1 : -1;
		return [...rows].sort((a, b) => {
			const av = value(a, sort);
			const bv = value(b, sort);
			if (av === bv) return a.hxRank - b.hxRank;
			return (av < bv ? -1 : 1) * mul;
		});
	}, [
		teams,
		conf,
		sort,
		dir
	]);
	function toggle(key) {
		if (sort === key) setDir((d) => d === "asc" ? "desc" : "asc");
		else {
			setSort(key);
			setDir(key === "hxRating" || key === "projectedWins" || key === "makeField" || key === "talentScore" ? "desc" : "asc");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: `Week 3 · HX ${MODEL.version}`,
			title: "Power rankings",
			lede: `Every FBS program, ranked by HX. Talent is listed two-deep composite, not class rank — TWO·DEEP / 247. Talent and prior-year SP+/Elo/SRS carry the real signal. Make 12 is make-field, not title odds; projected wins are Elo vs the 2026 slate. ${AP_STAMP.lede}`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfPills, {
			value: conf,
			to: "/rankings",
			searchFor: (c) => c === "All" ? {} : { conf: c }
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-4 text-xs tabular text-faint",
			children: [
				filtered.length,
				" of ",
				teams.length,
				conf !== "All" ? ` · ${conf}` : ""
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-3 flex gap-2 overflow-x-auto pb-1 sm:hidden",
			role: "group",
			"aria-label": "Sort rankings",
			children: MOBILE_SORTS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => toggle(opt.key),
				className: cn("inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm transition-colors duration-150", sort === opt.key ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
				children: [opt.label, sort === opt.key ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-1.5 tabular",
					children: dir === "asc" ? "↑" : "↓"
				}) : null]
			}, opt.key))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3 sm:hidden",
			children: filtered.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankingCard, { team: t }) }, t.slug))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "hidden overflow-hidden p-0 sm:block sm:p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-[11px] uppercase tracking-[0.12em] text-faint",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								onClick: () => toggle("hxRank"),
								active: sort === "hxRank",
								className: cn(STICKY_RANK, "z-30 border-b border-line px-4"),
								children: "HX"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: cn(STICKY_TEAM, "z-30 border-b border-line px-3 py-3 font-medium"),
								children: "Team"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Th, {
								onClick: () => toggle("apRank"),
								active: sort === "apRank",
								className: "border-b border-line",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block",
									children: "AP"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 block text-[10px] font-normal normal-case tracking-[0.08em] text-faint",
									children: AP_STAMP.columnHint
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								onClick: () => toggle("hxRating"),
								active: sort === "hxRating",
								className: "border-b border-line",
								children: "Rating"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "hidden border-b border-line px-3 py-3 font-medium md:table-cell",
								children: "Off / Def"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								onClick: () => toggle("projectedWins"),
								active: sort === "projectedWins",
								className: "hidden border-b border-line md:table-cell",
								children: "Proj W"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								onClick: () => toggle("makeField"),
								active: sort === "makeField",
								className: "border-b border-line",
								children: "Make 12"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Th, {
								onClick: () => toggle("talentScore"),
								active: sort === "talentScore",
								className: "border-b border-line",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block",
									children: "Talent"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 block text-[10px] font-normal normal-case tracking-[0.08em] text-faint",
									children: "two-deep"
								})]
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "group last:[&>td]:border-b-0 hover:bg-raised/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: cn(STICKY_RANK, "border-b border-line px-4 py-3 group-hover:bg-raised"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankNum, {
									rank: t.hxRank,
									className: "text-xl text-fg"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: cn(STICKY_TEAM, "border-b border-line px-3 py-3 group-hover:bg-raised"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/teams/$slug",
									params: { slug: t.slug },
									className: "flex min-h-11 items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
										slug: t.slug,
										color: t.colorPrimary
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block whitespace-nowrap font-medium",
										children: t.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block whitespace-nowrap text-xs text-muted",
										children: [
											t.conference,
											" · ",
											formatSeasonRecord(t.seasonWins, t.seasonLosses)
										]
									})] })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "border-b border-line px-3 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "tabular",
									children: t.apRank ?? "NR"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeltaChip, {
									hxRank: t.hxRank,
									apRank: t.apRank
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "border-b border-line px-3 py-3 tabular",
								children: fmtNum(t.hxRating, 2)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "hidden border-b border-line px-3 py-3 tabular text-muted md:table-cell",
								children: [
									fmtNum(t.offenseRating, 1),
									" / ",
									fmtNum(t.defenseRating, 1)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "hidden border-b border-line px-3 py-3 tabular md:table-cell",
								children: fmtNum(t.projectedWins, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "border-b border-line px-3 py-3 tabular",
								children: make12Pct(t)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "border-b border-line px-3 py-3 tabular",
								children: fmtNum(t.talentScore, 1)
							})
						]
					}, t.slug)) })]
				})
			})
		})
	] });
}
function RankingCard({ team }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/teams/$slug",
		params: { slug: team.slug },
		className: "block rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-start gap-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankNum, {
						rank: team.hxRank,
						className: "w-8 shrink-0 text-2xl text-fg"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
						slug: team.slug,
						color: team.colorPrimary,
						className: "mt-1 shrink-0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium",
							children: team.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-0.5 block text-xs text-muted",
							children: [
								team.conference,
								" · ",
								formatSeasonRecord(team.seasonWins, team.seasonLosses)
							]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shrink-0 text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-2xl tabular leading-none text-fg",
					children: fmtNum(team.hxRating, 2)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-[11px] uppercase tracking-[0.12em] text-faint",
					children: "Rating"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid grid-cols-2 gap-3 border-t border-line pt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-[11px] uppercase tracking-[0.12em] text-faint",
					children: ["AP · ", AP_STAMP.columnHint]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular text-fg",
						children: team.apRank ?? "NR"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeltaChip, {
						hxRank: team.hxRank,
						apRank: team.apRank
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] uppercase tracking-[0.12em] text-faint",
					children: "Make 12"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 tabular text-fg",
					children: make12Pct(team)
				})]
			})]
		})]
	});
}
function value(t, key) {
	if (key === "apRank") return t.apRank ?? 99;
	if (key === "makeField") return make12FromSim(t.slug, t).makeField ?? t.playoffOdds;
	return t[key];
}
function Th({ children, onClick, active, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
		className: cn("px-3 py-3 font-medium", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick,
			className: cn("min-h-9 text-left uppercase tracking-[0.12em]", active ? "text-fg" : "text-faint hover:text-muted"),
			children
		})
	});
}
//#endregion
export { RankingsPage as component };
