import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as fmtHeight, d as Panel, f as TeamSelect, h as cn, r as Route$1, u as PageHead, v as fmtNum, y as fmtPct } from "./router-DJlRrram.mjs";
import { l as TeamSwatch, r as MixBar, t as CompareRow } from "./marks-Dv8OG6qB.mjs";
import { r as TALENT_UNITS } from "./positions-BXGdtgxF.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/talent-YZplrCvT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CONFS = [
	"All",
	"SEC",
	"Big Ten",
	"ACC",
	"Big 12",
	"Independent",
	"Group of Five"
];
var G5 = /* @__PURE__ */ new Set([
	"Mountain West",
	"American",
	"Sun Belt",
	"CUSA",
	"MAC",
	"Pac-12"
]);
var LENSES = [
	{
		key: "talentScore",
		label: "Composite"
	},
	{
		key: "hsTalent",
		label: "HS"
	},
	{
		key: "portalTalent",
		label: "Portal"
	},
	{
		key: "starterTalent",
		label: "Starters"
	},
	{
		key: "offTalent",
		label: "Offense"
	},
	{
		key: "defTalent",
		label: "Defense"
	}
];
var SIZE_LENSES = [
	{
		key: "olAvgWeightLbs",
		label: "OL weight"
	},
	{
		key: "olAvgHeightIn",
		label: "OL height"
	},
	{
		key: "avgWeightLbs",
		label: "Roster weight"
	},
	{
		key: "skillAvgHeightIn",
		label: "Skill height"
	},
	{
		key: "dbAvgHeightIn",
		label: "DB height"
	}
];
function TalentPage() {
	const teams = Route$1.useLoaderData();
	const board = Route$1.useSearch().board ?? "composite";
	const [a, setA] = (0, import_react.useState)("ohio-state");
	const [b, setB] = (0, import_react.useState)("georgia");
	const [conf, setConf] = (0, import_react.useState)("All");
	const [lens, setLens] = (0, import_react.useState)("talentScore");
	const [sizeLens, setSizeLens] = (0, import_react.useState)("olAvgWeightLbs");
	const left = teams.find((t) => t.slug === a);
	const right = teams.find((t) => t.slug === b);
	const pool = (0, import_react.useMemo)(() => {
		if (conf === "All") return teams;
		if (conf === "Group of Five") return teams.filter((t) => G5.has(t.conference));
		return teams.filter((t) => t.conference === conf);
	}, [teams, conf]);
	const ranked = (0, import_react.useMemo)(() => [...pool].sort((x, y) => y[lens] - x[lens] || x.talentRank - y.talentRank), [pool, lens]);
	const sizeRanked = (0, import_react.useMemo)(() => [...pool].sort((x, y) => y[sizeLens] - x[sizeLens] || x.talentRank - y.talentRank), [pool, sizeLens]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "Two-deep composite",
			title: "Roster talent",
			lede: "Who is on the roster now — high-school signees plus portal transfers. Starters carry full weight, backups 0.4. Offensive-line mass is an 8% HX term on the Size board, not this ranking."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid grid-cols-2 gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/talent",
				search: { board: "composite" },
				className: cn("rounded-xl px-4 py-3 shadow-[var(--shadow-border)] transition-colors duration-150", board === "composite" ? "bg-accent text-accent-fg" : "bg-surface text-fg hover:bg-raised"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("font-mono text-[11px] uppercase tracking-[0.16em]", board === "composite" ? "text-accent-fg/70" : "text-faint"),
						children: "Ranking"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-2xl tracking-wide sm:text-3xl",
						children: "Composite"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("mt-1 text-sm", board === "composite" ? "text-accent-fg/80" : "text-muted"),
						children: "Two-deep + transfers"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/talent",
				search: { board: "size" },
				className: cn("rounded-xl px-4 py-3 shadow-[var(--shadow-border)] transition-colors duration-150", board === "size" ? "bg-accent text-accent-fg" : "bg-surface text-fg hover:bg-raised"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("font-mono text-[11px] uppercase tracking-[0.16em]", board === "size" ? "text-accent-fg/70" : "text-faint"),
						children: "HX feature · 8%"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-2xl tracking-wide sm:text-3xl",
						children: "Size"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("mt-1 text-sm", board === "size" ? "text-accent-fg/80" : "text-muted"),
						children: "OL mass, not talent"
					})
				]
			})]
		}),
		board === "composite" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompositeBoard, {
			ranked,
			left,
			right,
			a,
			b,
			teams,
			setA,
			setB,
			conf,
			setConf,
			lens,
			setLens
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SizeBoard, {
			ranked: sizeRanked,
			left,
			right,
			a,
			b,
			teams,
			setA,
			setB,
			conf,
			setConf,
			sizeLens,
			setSizeLens
		})
	] });
}
function CompositeBoard({ ranked, left, right, a, b, teams, setA, setB, conf, setConf, lens, setLens }) {
	const chart = ranked.slice(0, 12).map((t) => ({
		name: t.shortName,
		talent: Number(t.talentScore.toFixed(1))
	}));
	const ymin = Math.max(70, Math.floor(Math.min(...chart.map((c) => c.talent), 90) - 2));
	const ymax = Math.min(100, Math.ceil(Math.max(...chart.map((c) => c.talent), 94) + 1));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "How the composite is built"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-4 grid gap-3 text-sm text-muted sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium text-fg",
						children: "Listed two-deep"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: "Every starter and backup from TWO·DEEP. Rating is that player’s 247 composite."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium text-fg",
						children: "Transfers count"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: "A portal player is talent on this roster, not a hole in last year’s class."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium text-fg",
						children: "OL is not this board"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1",
						children: [
							"Line size is 8% of HX. Open",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/talent",
								search: { board: "size" },
								className: "text-fg underline decoration-border underline-offset-4",
								children: "Size"
							}),
							" ",
							"for mass. Units below are slices, not the ranking."
						]
					})] })
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 grid gap-4 sm:grid-cols-3",
			children: ranked.slice(0, 3).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-3xl tabular text-muted",
					children: t.talentRank
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/teams/$slug",
					params: { slug: t.slug },
					className: "mt-2 flex items-center gap-2 font-display text-2xl tracking-wide",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSwatch, { color: t.colorPrimary }), t.name]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						fmtNum(t.talentScore, 1),
						" composite · ",
						t.transferCount,
						" transfers · ",
						fmtPct(t.portalShare, 0),
						" portal weight"
					]
				})
			] }, t.slug))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Compare two rosters"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSelect, {
						id: "talent-a",
						label: "Team A",
						value: a,
						teams,
						onChange: setA
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSelect, {
						id: "talent-b",
						label: "Team B",
						value: b,
						teams,
						onChange: setB
					})]
				}),
				left && right ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Talent composite",
							a: left.talentScore,
							b: right.talentScore,
							max: 100,
							format: (n) => fmtNum(n, 1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "HS two-deep",
							a: left.hsTalent,
							b: right.hsTalent,
							max: 100,
							format: (n) => fmtNum(n, 1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Portal two-deep",
							a: left.portalTalent,
							b: right.portalTalent,
							max: 100,
							format: (n) => fmtNum(n, 1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Portal weight",
							a: left.portalShare,
							b: right.portalShare,
							max: 100,
							format: (n) => fmtPct(n, 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Starter talent",
							a: left.starterTalent,
							b: right.starterTalent,
							max: 100,
							format: (n) => fmtNum(n, 1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Offense",
							a: left.offTalent,
							b: right.offTalent,
							max: 100,
							format: (n) => fmtNum(n, 1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Defense",
							a: left.defTalent,
							b: right.defTalent,
							max: 100,
							format: (n) => fmtNum(n, 1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Blue-chip %",
							a: left.blueChipPct,
							b: right.blueChipPct,
							max: 100,
							format: (n) => fmtPct(n, 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-[11px] uppercase tracking-[0.12em] text-faint",
							children: "Unit slices — not the ranking"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1",
							children: TALENT_UNITS.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
								label: u.label,
								a: left[u.key],
								b: right[u.key],
								max: 100,
								format: (n) => fmtNum(n, 1)
							}, u.key))
						})
					]
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-1 font-display text-2xl tracking-wide",
					children: "Top of the composite"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-sm text-muted",
					children: "Weighted 247 of the listed two-deep, transfers included. HS and portal are subset ratings — not additive slices."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-64",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: chart,
							margin: {
								top: 8,
								right: 8,
								left: 0,
								bottom: 8
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "var(--color-line)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "name",
									tick: {
										fill: "var(--color-muted)",
										fontSize: 11
									},
									axisLine: false,
									tickLine: false,
									interval: 0
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tick: {
										fill: "var(--color-faint)",
										fontSize: 11
									},
									axisLine: false,
									tickLine: false,
									domain: [ymin, ymax]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									contentStyle: {
										background: "var(--color-surface)",
										border: "1px solid var(--color-border)",
										borderRadius: 10,
										color: "var(--color-fg)"
									},
									formatter: (v) => [`${v}`, "Composite"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "talent",
									fill: "var(--color-accent)",
									radius: [
										4,
										4,
										0,
										0
									]
								})
							]
						})
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfPills, {
			conf,
			setConf
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 flex gap-2 overflow-x-auto pb-1",
			children: LENSES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setLens(c.key),
				className: cn("h-10 shrink-0 rounded-full px-4 text-sm transition-colors duration-150", lens === c.key ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
				children: c.label
			}, c.key))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 text-sm text-muted",
			children: [
				"Ranking by ",
				LENSES.find((l) => l.key === lens)?.label ?? "composite",
				". Offensive line lives on Size — 8% of HX, not this sort."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3 sm:hidden",
			children: ranked.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentCard, {
				team: t,
				place: i + 1,
				lens
			}, t.slug))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "hidden overflow-hidden p-0 sm:block sm:p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-4xl text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Rk"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Team"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Composite"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "HS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Portal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Mix"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Off"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Def"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Blue"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Units"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ranked.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line last:border-0 hover:bg-raised/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 tabular",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/teams/$slug",
									params: { slug: t.slug },
									className: "flex min-h-11 items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSwatch, { color: t.colorPrimary }), t.name]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtNum(t.talentScore, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtNum(t.hsTalent, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-3 py-3 tabular",
								children: [fmtNum(t.portalTalent, 1), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 text-xs text-muted",
									children: t.transferCount
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex h-1.5 w-20 overflow-hidden rounded-full bg-raised",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-accent",
										style: { width: `${100 - t.portalShare}%` }
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-faint",
										style: { width: `${t.portalShare}%` }
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular text-muted",
								children: fmtNum(t.offTalent, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular text-muted",
								children: fmtNum(t.defTalent, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtPct(t.blueChipPct, 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 text-xs tabular text-muted",
								children: TALENT_UNITS.map((u) => `${u.label} ${fmtNum(t[u.key], 0)}`).join(" · ")
							})
						]
					}, t.slug)) })]
				})
			})
		})
	] });
}
function SizeBoard({ ranked, left, right, a, b, teams, setA, setB, conf, setConf, sizeLens, setSizeLens }) {
	const chart = ranked.slice(0, 12).map((t) => ({
		name: t.shortName,
		ol: Math.round(t.olAvgWeightLbs)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "A feature, not the composite"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: [
					"Offensive-line mass is 8% of HX — the same weight as a small continuity term, not a substitute for who is actually on the two-deep. Use this board to compare height and weight. Rank talent on",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/talent",
						search: { board: "composite" },
						className: "text-fg underline decoration-border underline-offset-4",
						children: "Composite"
					}),
					"."
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Compare size"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSelect, {
						id: "size-a",
						label: "Team A",
						value: a,
						teams,
						onChange: setA
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSelect, {
						id: "size-b",
						label: "Team B",
						value: b,
						teams,
						onChange: setB
					})]
				}),
				left && right ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "OL weight",
							a: left.olAvgWeightLbs,
							b: right.olAvgWeightLbs,
							max: 360,
							format: (n) => `${fmtNum(n, 0)} lb`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "OL height",
							a: left.olAvgHeightIn,
							b: right.olAvgHeightIn,
							max: 82,
							format: (n) => fmtHeight(n)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Skill height",
							a: left.skillAvgHeightIn,
							b: right.skillAvgHeightIn,
							max: 80,
							format: (n) => fmtHeight(n)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "DB height",
							a: left.dbAvgHeightIn,
							b: right.dbAvgHeightIn,
							max: 78,
							format: (n) => fmtHeight(n)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Roster weight",
							a: left.avgWeightLbs,
							b: right.avgWeightLbs,
							max: 280,
							format: (n) => `${fmtNum(n, 0)} lb`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 border-t border-line pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
								label: "Talent composite",
								a: left.talentScore,
								b: right.talentScore,
								max: 100,
								format: (n) => fmtNum(n, 1)
							})
						})
					]
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-1 font-display text-2xl tracking-wide",
					children: "Heaviest lines"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-sm text-muted",
					children: "Average listed offensive-line weight. This chart does not rank talent."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-64",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: chart,
							margin: {
								top: 8,
								right: 8,
								left: 0,
								bottom: 8
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "var(--color-line)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "name",
									tick: {
										fill: "var(--color-muted)",
										fontSize: 11
									},
									axisLine: false,
									tickLine: false,
									interval: 0
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tick: {
										fill: "var(--color-faint)",
										fontSize: 11
									},
									axisLine: false,
									tickLine: false,
									domain: [290, 340]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									contentStyle: {
										background: "var(--color-surface)",
										border: "1px solid var(--color-border)",
										borderRadius: 10,
										color: "var(--color-fg)"
									},
									formatter: (v) => [`${v} lb`, "OL weight"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "ol",
									fill: "var(--color-accent)",
									radius: [
										4,
										4,
										0,
										0
									]
								})
							]
						})
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfPills, {
			conf,
			setConf
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 flex gap-2 overflow-x-auto pb-1",
			children: SIZE_LENSES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setSizeLens(c.key),
				className: cn("h-10 shrink-0 rounded-full px-4 text-sm transition-colors duration-150", sizeLens === c.key ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
				children: c.label
			}, c.key))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 text-sm text-muted",
			children: [
				"Sorted by ",
				SIZE_LENSES.find((l) => l.key === sizeLens)?.label ?? "OL weight",
				". Composite stays on the right so size never pretends to be talent."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3 sm:hidden",
			children: ranked.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/teams/$slug",
				params: { slug: t.slug },
				className: "block rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl tabular text-muted",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSwatch, { color: t.colorPrimary }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: t.name
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl tabular",
						children: sizeLens.includes("Height") || sizeLens.endsWith("In") ? fmtHeight(t[sizeLens]) : `${fmtNum(t[sizeLens], 0)} lb`
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-2 text-xs tabular text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"OL ",
						fmtHeight(t.olAvgHeightIn),
						" / ",
						fmtNum(t.olAvgWeightLbs, 0),
						" lb"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Talent ", fmtNum(t.talentScore, 1)] })]
				})]
			}, t.slug))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "hidden overflow-hidden p-0 sm:block sm:p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-3xl text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Rk"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Team"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "OL wt"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "OL ht"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Skill ht"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "DB ht"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Roster wt"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Composite"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ranked.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line last:border-0 hover:bg-raised/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 tabular",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/teams/$slug",
									params: { slug: t.slug },
									className: "flex min-h-11 items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSwatch, { color: t.colorPrimary }), t.name]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtNum(t.olAvgWeightLbs, 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtHeight(t.olAvgHeightIn)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtHeight(t.skillAvgHeightIn)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtHeight(t.dbAvgHeightIn)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular text-muted",
								children: fmtNum(t.avgWeightLbs, 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtNum(t.talentScore, 1)
							})
						]
					}, t.slug)) })]
				})
			})
		})
	] });
}
function ConfPills({ conf, setConf }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-3 flex gap-2 overflow-x-auto pb-1",
		children: CONFS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setConf(c),
			className: cn("h-10 shrink-0 rounded-full px-4 text-sm transition-colors duration-150", conf === c ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
			children: c
		}, c))
	});
}
function TalentCard({ team, place, lens }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/teams/$slug",
		params: { slug: team.slug },
		className: "block rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl tabular text-muted",
							children: place
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSwatch, { color: team.colorPrimary }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: team.name
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-xl tabular",
					children: fmtNum(team[lens], 1)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-3 gap-2 text-xs tabular text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Comp ", fmtNum(team.talentScore, 1)] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["HS ", fmtNum(team.hsTalent, 1)] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Portal ", fmtNum(team.portalTalent, 1)] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MixBar, {
					leftPct: 100 - team.portalShare,
					leftLabel: "HS",
					rightLabel: "Portal"
				})
			})
		]
	});
}
//#endregion
export { TalentPage as component };
