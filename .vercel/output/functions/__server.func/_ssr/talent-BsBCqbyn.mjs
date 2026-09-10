import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as fmtHeight, C as ConfPills, E as TeamSelect, M as fmtPct, N as inConf, O as cn, T as Panel, i as Route$2, j as fmtNum, w as PageHead } from "./router-b4QcdpTO.mjs";
import { i as MixBar, t as CompareRow, u as TeamMark } from "./marks-BAdZVDnV.mjs";
import { c as TALENT_UNITS } from "./positions-C0zZnrTX.mjs";
import { i as sizeSortLabel, r as sizeLensFor, t as SIZE_GROUPS } from "./size-groups-BYECeJcY.mjs";
import { a as Bar, c as Legend, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/talent-BsBCqbyn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Weighted two-deep rating for high-school signees (non-transfers). */
function hasHsSlice(team) {
	return Number.isFinite(team.hsTalent) && team.hsTalent > 0;
}
/** Weighted two-deep rating for portal transfers on the roster. */
function hasPortalSlice(team) {
	return team.transferCount > 0 && Number.isFinite(team.portalTalent) && team.portalTalent > 0;
}
/** Portal share of two-deep weight (0–100). Hidden when no portal players. */
function hasPortalMix(team) {
	return hasPortalSlice(team) && Number.isFinite(team.portalShare) && team.portalShare > 0;
}
function TalentSliceStats({ team, className }) {
	const hs = hasHsSlice(team);
	const portal = hasPortalSlice(team);
	const mix = hasPortalMix(team);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] uppercase tracking-[0.12em] text-faint",
				children: "HS two-deep"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 font-display text-2xl tabular leading-none",
				children: hs ? fmtNum(team.hsTalent, 1) : "—"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] uppercase tracking-[0.12em] text-faint",
					children: "Portal two-deep"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 font-display text-2xl tabular leading-none",
					children: portal ? fmtNum(team.portalTalent, 1) : "—"
				}),
				portal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 text-xs text-muted",
					children: [team.transferCount, " transfers"]
				}) : null
			] })]
		}), mix ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MixBar, {
				leftPct: 100 - team.portalShare,
				leftLabel: "HS weight",
				rightLabel: "Portal weight"
			})
		}) : hs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-xs text-muted",
			children: "No portal players on the listed two-deep."
		}) : null]
	});
}
function TalentSliceMixCell({ team }) {
	if (!hasPortalMix(team)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-xs text-faint",
		children: "HS only"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-w-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MixBar, {
			leftPct: 100 - team.portalShare,
			leftLabel: "HS",
			rightLabel: "Portal"
		})
	});
}
function TalentSliceChart({ teams }) {
	const chart = teams.slice(0, 10).map((t) => ({
		name: t.shortName,
		hs: hasHsSlice(t) ? Number(t.hsTalent.toFixed(1)) : null,
		portal: hasPortalSlice(t) ? Number(t.portalTalent.toFixed(1)) : null
	}));
	const values = chart.flatMap((c) => [c.hs, c.portal]).filter((v) => v != null);
	if (values.length === 0) return null;
	const ymin = Math.max(70, Math.floor(Math.min(...values) - 2));
	const ymax = Math.min(100, Math.ceil(Math.max(...values) + 1));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-72",
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
						formatter: (v, name) => [v == null ? "—" : `${v}`, name === "hs" ? "HS" : "Portal"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
						verticalAlign: "top",
						height: 28,
						formatter: (value) => value === "hs" ? "HS two-deep" : "Portal two-deep",
						wrapperStyle: {
							fontSize: 11,
							color: "var(--color-faint)",
							textTransform: "uppercase",
							letterSpacing: "0.12em"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "hs",
						name: "hs",
						fill: "var(--color-accent)",
						radius: [
							4,
							4,
							0,
							0
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "portal",
						name: "portal",
						fill: "var(--color-faint)",
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
	});
}
function TalentSliceLeaders({ teams }) {
	const hsLeader = [...teams].filter(hasHsSlice).sort((a, b) => b.hsTalent - a.hsTalent)[0];
	const portalLeader = [...teams].filter(hasPortalSlice).sort((a, b) => b.portalTalent - a.portalTalent)[0];
	const mixLeader = [...teams].filter(hasPortalMix).sort((a, b) => b.portalShare - a.portalShare)[0];
	if (!hsLeader && !portalLeader) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 sm:grid-cols-3",
		children: [
			hsLeader ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg bg-raised/60 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] uppercase tracking-[0.12em] text-faint",
						children: "Top HS two-deep"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-2 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
							slug: hsLeader.slug,
							color: hsLeader.colorPrimary,
							logoSize: 18
						}), hsLeader.name]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-display text-3xl tabular",
						children: fmtNum(hsLeader.hsTalent, 1)
					})
				]
			}) : null,
			portalLeader ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg bg-raised/60 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] uppercase tracking-[0.12em] text-faint",
						children: "Top portal two-deep"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-2 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
							slug: portalLeader.slug,
							color: portalLeader.colorPrimary,
							logoSize: 18
						}), portalLeader.name]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-display text-3xl tabular",
						children: fmtNum(portalLeader.portalTalent, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 text-xs text-muted",
						children: [portalLeader.transferCount, " transfers"]
					})
				]
			}) : null,
			mixLeader ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg bg-raised/60 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] uppercase tracking-[0.12em] text-faint",
						children: "Heaviest portal mix"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-2 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
							slug: mixLeader.slug,
							color: mixLeader.colorPrimary,
							logoSize: 18
						}), mixLeader.name]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-display text-3xl tabular",
						children: fmtPct(mixLeader.portalShare, 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-xs text-muted",
						children: "portal weight on two-deep"
					})
				]
			}) : null
		]
	});
}
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
function TalentPage() {
	const teams = Route$2.useLoaderData();
	const board = Route$2.useSearch().board ?? "composite";
	const conf = Route$2.useSearch().conf ?? "All";
	const [a, setA] = (0, import_react.useState)("ohio-state");
	const [b, setB] = (0, import_react.useState)("georgia");
	const [lens, setLens] = (0, import_react.useState)("talentScore");
	const [sizeGroup, setSizeGroup] = (0, import_react.useState)("OL");
	const [sizeMetric, setSizeMetric] = (0, import_react.useState)("weight");
	const sizeLens = sizeLensFor(sizeGroup, sizeMetric);
	const left = teams.find((t) => t.slug === a);
	const right = teams.find((t) => t.slug === b);
	const pool = (0, import_react.useMemo)(() => teams.filter((t) => inConf(t.conference, conf)), [teams, conf]);
	const ranked = (0, import_react.useMemo)(() => [...pool].sort((x, y) => y[lens] - x[lens] || x.talentRank - y.talentRank), [pool, lens]);
	const sizeRanked = (0, import_react.useMemo)(() => [...pool].sort((x, y) => y[sizeLens] - x[sizeLens] || x.talentRank - y.talentRank), [pool, sizeLens]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "Two-deep composite",
			title: "Roster talent",
			lede: "Who is on the roster now — high-school signees plus portal transfers. HS and portal are separate two-deep ratings and a weight mix, not additive slices of the composite. Starters carry full weight, backups 0.4. Size is a separate board — not talent and not HX."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid grid-cols-2 gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/talent",
				search: {
					board: "composite",
					conf: conf === "All" ? void 0 : conf
				},
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
				search: {
					board: "size",
					conf: conf === "All" ? void 0 : conf
				},
				className: cn("rounded-xl px-4 py-3 shadow-[var(--shadow-border)] transition-colors duration-150", board === "size" ? "bg-accent text-accent-fg" : "bg-surface text-fg hover:bg-raised"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("font-mono text-[11px] uppercase tracking-[0.16em]", board === "size" ? "text-accent-fg/70" : "text-faint"),
						children: "Measurables"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-2xl tracking-wide sm:text-3xl",
						children: "Size"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("mt-1 text-sm", board === "size" ? "text-accent-fg/80" : "text-muted"),
						children: "Height and weight by group"
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
			sizeGroup,
			setSizeGroup,
			sizeMetric,
			setSizeMetric,
			sizeLens
		})
	] });
}
function CompositeBoard({ ranked, left, right, a, b, teams, setA, setB, conf, lens, setLens }) {
	const chart = ranked.slice(0, 12).map((t) => ({
		name: t.shortName,
		talent: Number(t.talentScore.toFixed(1))
	}));
	const ymin = Math.max(70, Math.floor(Math.min(...chart.map((c) => c.talent), 90) - 2));
	const ymax = Math.min(100, Math.ceil(Math.max(...chart.map((c) => c.talent), 94) + 1));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "High school vs portal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Separate weighted 247 ratings on the listed two-deep — HS signees vs portal transfers — plus portal weight share. Sourced from roster players (transfer flag) and TWO·DEEP depth weights."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentSliceLeaders, { teams: ranked })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentSliceChart, { teams: ranked })
				})
			]
		}),
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
						children: "The two-deep"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: "Listed TWO·DEEP charts from thetwodeep.com for all 136 FBS programs (2026-09-07). 247 composite, transfers included."
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
							"Line size is a measurable, not an HX term. Open",
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
						slug: t.slug,
						color: t.colorPrimary,
						logoSize: 20
					}), t.name]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [fmtNum(t.talentScore, 1), " composite"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentSliceStats, {
					team: t,
					className: "mt-4"
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-[11px] uppercase tracking-[0.12em] text-faint",
							children: "HS vs portal slices"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "HS two-deep",
							a: left.hsTalent,
							b: right.hsTalent,
							max: 100,
							format: (n) => fmtNum(n, 1)
						}),
						hasPortalSlice(left) || hasPortalSlice(right) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Portal two-deep",
							a: left.portalTalent,
							b: right.portalTalent,
							max: 100,
							format: (n) => fmtNum(n, 1)
						}) : null,
						hasPortalMix(left) || hasPortalMix(right) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Portal weight",
							a: left.portalShare,
							b: right.portalShare,
							max: 100,
							format: (n) => fmtPct(n, 0)
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Talent composite",
							a: left.talentScore,
							b: right.talentScore,
							max: 100,
							format: (n) => fmtNum(n, 1)
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
			value: conf,
			to: "/talent",
			searchFor: (c) => ({
				board: "composite",
				...c === "All" ? {} : { conf: c }
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 flex gap-2 overflow-x-auto pb-1",
			children: LENSES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setLens(c.key),
				className: cn("h-11 shrink-0 rounded-full px-4 text-sm transition-colors duration-150", lens === c.key ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
				children: c.label
			}, c.key))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 text-sm text-muted",
			children: [
				"Ranking by ",
				LENSES.find((l) => l.key === lens)?.label ?? "composite",
				". Offensive line lives on Size — measurables, not this sort."
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
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
										slug: t.slug,
										color: t.colorPrimary,
										logoSize: 20
									}), t.name]
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: hasPortalSlice(t) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [fmtNum(t.portalTalent, 1), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 text-xs text-muted",
									children: t.transferCount
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-faint",
									children: "—"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentSliceMixCell, { team: t })
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
function SizeBoard({ ranked, left, right, a, b, teams, setA, setB, conf, sizeGroup, setSizeGroup, sizeMetric, setSizeMetric, sizeLens }) {
	const chart = ranked.slice(0, 12).map((t) => ({
		name: t.shortName,
		ol: Math.round(t.olAvgWeightLbs)
	}));
	function formatSize(team, key) {
		if (key.endsWith("HeightIn")) return fmtHeight(team[key]);
		return `${fmtNum(team[key], 0)} lb`;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "Measurables by position group"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: [
					"Average height and weight on the listed two-deep for QB, skill, OL, DL, LB, and DB. This board is separate from the talent composite — open",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/talent",
						search: {
							board: "composite",
							conf: conf === "All" ? void 0 : conf
						},
						className: "text-fg underline decoration-border underline-offset-4",
						children: "Composite"
					}),
					" ",
					"for roster ratings."
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Compare two teams"
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
					children: [SIZE_GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-line last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: `${g.label} weight`,
							a: left[g.weightKey],
							b: right[g.weightKey],
							max: 360,
							format: (n) => `${fmtNum(n, 0)} lb`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: `${g.label} height`,
							a: left[g.heightKey],
							b: right[g.heightKey],
							max: 84,
							format: (n) => fmtHeight(n)
						})]
					}, g.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 border-t border-line pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Roster weight",
							a: left.avgWeightLbs,
							b: right.avgWeightLbs,
							max: 280,
							format: (n) => `${fmtNum(n, 0)} lb`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
							label: "Talent composite",
							a: left.talentScore,
							b: right.talentScore,
							max: 100,
							format: (n) => fmtNum(n, 1)
						})]
					})]
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-1 font-display text-2xl tracking-wide",
					children: "Heaviest offensive lines"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-sm text-muted",
					children: "Average OL weight on the two-deep."
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
			value: conf,
			to: "/talent",
			searchFor: (c) => ({
				board: "size",
				...c === "All" ? {} : { conf: c }
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-3 flex gap-2 overflow-x-auto pb-1",
			role: "tablist",
			"aria-label": "Position group",
			children: SIZE_GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				role: "tab",
				"aria-selected": sizeGroup === g.key,
				onClick: () => setSizeGroup(g.key),
				className: cn("h-10 shrink-0 rounded-full px-4 text-sm transition-colors duration-150", sizeGroup === g.key ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
				children: g.label
			}, g.key))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 flex gap-2",
			children: ["weight", "height"].map((metric) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": sizeMetric === metric,
				onClick: () => setSizeMetric(metric),
				className: cn("h-9 rounded-full px-3 text-sm capitalize transition-colors duration-150", sizeMetric === metric ? "bg-raised text-fg" : "bg-transparent text-muted hover:text-fg"),
				children: metric
			}, metric))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 text-sm text-muted",
			children: [
				"Sorted by ",
				sizeSortLabel(sizeLens),
				"."
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
								slug: t.slug,
								color: t.colorPrimary,
								logoSize: 20
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: t.name
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl tabular",
						children: formatSize(t, sizeLens)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-xs tabular text-muted",
					children: SIZE_GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						g.label,
						" ",
						fmtHeight(t[g.heightKey]),
						" / ",
						fmtNum(t[g.weightKey], 0),
						" lb"
					] }, g.key))
				})]
			}, t.slug))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "hidden overflow-hidden p-0 sm:block sm:p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-5xl text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("thead", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
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
							SIZE_GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								colSpan: 2,
								children: g.label
							}, g.key)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Composite"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line text-[10px] uppercase tracking-[0.1em] text-faint",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-3 py-2" }),
							SIZE_GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "Wt"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "Ht"
							})] }, g.key)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-3 py-2" })
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ranked.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
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
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
										slug: t.slug,
										color: t.colorPrimary,
										logoSize: 20
									}), t.name]
								})
							}),
							SIZE_GROUPS.flatMap((g) => [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtNum(t[g.weightKey], 0)
							}, `${t.slug}-${g.key}-wt`), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtHeight(t[g.heightKey])
							}, `${t.slug}-${g.key}-ht`)]),
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
							slug: team.slug,
							color: team.colorPrimary
						}),
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
				className: "mt-3 text-xs tabular text-muted",
				children: ["Composite ", fmtNum(team.talentScore, 1)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentSliceStats, {
				team,
				className: "mt-3"
			})
		]
	});
}
//#endregion
export { TalentPage as component };
