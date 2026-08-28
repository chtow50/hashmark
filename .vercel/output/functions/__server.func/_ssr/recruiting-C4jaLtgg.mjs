import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Route$3, d as Panel, h as cn, o as YEARS, u as PageHead, v as fmtNum } from "./router-DJlRrram.mjs";
import { a as RankNum, i as RankMove, l as TeamSwatch, o as RankSpark } from "./marks-Dv8OG6qB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recruiting-C4jaLtgg.js
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
function RecruitingPage() {
	const rows = Route$3.useLoaderData();
	const year = Route$3.useSearch().year ?? 2026;
	const board = Route$3.useSearch().board ?? "class";
	const [conf, setConf] = (0, import_react.useState)("All");
	const [sort, setSort] = (0, import_react.useState)("compositeRank");
	const [dir, setDir] = (0, import_react.useState)("asc");
	const leaders = (0, import_react.useMemo)(() => yearLeaders(rows), [rows]);
	const ofYear = (0, import_react.useMemo)(() => {
		const prevMap = new Map(rows.filter((r) => r.classYear === year - 1).map((r) => [r.slug, r.compositeRank]));
		const base = rows.filter((r) => r.classYear === year).filter((r) => inConf(r.conference, conf)).map((r) => {
			const prev = prevMap.get(r.slug);
			return {
				...r,
				prevRank: prev ?? null,
				delta: prev == null ? null : prev - r.compositeRank
			};
		});
		const mul = dir === "asc" ? 1 : -1;
		return [...base].sort((a, b) => {
			const av = sort === "delta" ? a.delta ?? 0 : a[sort];
			const bv = sort === "delta" ? b.delta ?? 0 : b[sort];
			if (av === bv) return a.compositeRank - b.compositeRank;
			return (av < bv ? -1 : 1) * mul;
		});
	}, [
		rows,
		year,
		conf,
		sort,
		dir
	]);
	const cycle = (0, import_react.useMemo)(() => fourYearBoard(rows, conf), [rows, conf]);
	function toggle(key) {
		if (sort === key) setDir((d) => d === "asc" ? "desc" : "asc");
		else {
			setSort(key);
			setDir(key === "compositeRank" ? "asc" : "desc");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "247Sports composite",
			title: board === "cycle" ? "Four-year cycle" : `Class of ${year}`,
			lede: "Incoming high-school classes only. Flip the year. This is not roster talent — transfers sit on the talent board, not here."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid grid-cols-2 gap-2 sm:grid-cols-5",
			children: [YEARS.map((y) => {
				const lead = leaders[y];
				const active = board === "class" && y === year;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/recruiting",
					search: {
						year: y,
						board: "class"
					},
					className: cn("rounded-xl px-4 py-3 shadow-[var(--shadow-border)] transition-colors duration-150", active ? "bg-accent text-accent-fg" : "bg-surface text-fg hover:bg-raised"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("font-mono text-[11px] uppercase tracking-[0.16em]", active ? "text-accent-fg/70" : "text-faint"),
							children: "Class of"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-3xl tracking-wide",
							children: y
						}),
						lead ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("mt-1 truncate text-sm", active ? "text-accent-fg/80" : "text-muted"),
							children: [
								"#",
								lead.rank,
								" ",
								lead.name
							]
						}) : null
					]
				}, y);
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/recruiting",
				search: {
					year,
					board: "cycle"
				},
				className: cn("rounded-xl px-4 py-3 shadow-[var(--shadow-border)] transition-colors duration-150", board === "cycle" ? "bg-accent text-accent-fg" : "bg-surface text-fg hover:bg-raised"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("font-mono text-[11px] uppercase tracking-[0.16em]", board === "cycle" ? "text-accent-fg/70" : "text-faint"),
						children: "2023–2026"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-3xl tracking-wide",
						children: "Cycle"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("mt-1 truncate text-sm", board === "cycle" ? "text-accent-fg/80" : "text-muted"),
						children: cycle[0] ? `#1 ${cycle[0].name}` : "Four-year avg"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 flex gap-2 overflow-x-auto pb-1",
			children: CONFS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setConf(c),
				className: cn("h-10 shrink-0 rounded-full px-4 text-sm transition-colors duration-150", conf === c ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
				children: c
			}, c))
		}),
		board === "cycle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CycleTable, { cycle }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 grid gap-4 sm:grid-cols-3",
			children: ofYear.slice(0, 3).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-3xl tabular text-muted",
						children: t.compositeRank
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankMove, { delta: t.delta })]
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
						t.commits,
						" commits · ",
						fmtNum(t.avgRating, 2),
						" avg · ",
						t.fiveStars,
						" five-stars"
					]
				})
			] }, t.slug))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "overflow-hidden p-0 sm:p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-3xl text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								onClick: () => toggle("compositeRank"),
								active: sort === "compositeRank",
								children: "Rk"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Team"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								onClick: () => toggle("delta"),
								active: sort === "delta",
								children: "vs last"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								onClick: () => toggle("commits"),
								active: sort === "commits",
								children: "Commits"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								onClick: () => toggle("avgRating"),
								active: sort === "avgRating",
								children: "Avg"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								onClick: () => toggle("points"),
								active: sort === "points",
								children: "Points"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "5 / 4 / 3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "HX"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ofYear.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line last:border-0 hover:bg-raised/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankNum, {
									rank: t.compositeRank,
									className: "text-lg text-fg"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/teams/$slug",
									params: { slug: t.slug },
									className: "flex min-h-11 items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSwatch, { color: t.colorPrimary }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-medium",
										children: t.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted",
										children: t.conference
									})] })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankMove, { delta: t.delta })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: t.commits
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtNum(t.avgRating, 2)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtNum(t.points, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarBar, {
									five: t.fiveStars,
									four: t.fourStars,
									three: t.threeStars
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular text-muted",
								children: t.hxRank
							})
						]
					}, t.slug)) })]
				})
			})
		})] })
	] });
}
function CycleTable({ cycle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "overflow-hidden p-0 sm:p-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-line px-4 py-4 sm:px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "Four-year cycle"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Composite rank by signing class. Average is unweighted — 2023 through 2026."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-3xl text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Team"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-3 font-medium",
							children: "Cycle"
						}),
						YEARS.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-3 font-medium tabular",
							children: y
						}, y)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-3 font-medium",
							children: "Avg rk"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-3 font-medium",
							children: "Pts"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: cycle.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line last:border-0 hover:bg-raised/60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/teams/$slug",
								params: { slug: row.slug },
								className: "flex min-h-11 items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSwatch, { color: row.colorPrimary }), row.name]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankSpark, { values: YEARS.map((y) => row.byYear[y] ?? null) })
						}),
						YEARS.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 tabular",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/recruiting",
								search: {
									year: y,
									board: "class"
								},
								className: "hover:text-accent",
								children: row.byYear[y] ?? "—"
							})
						}, y)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 tabular",
							children: fmtNum(row.avgRank, 1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 tabular text-muted",
							children: fmtNum(row.points, 0)
						})
					]
				}, row.slug)) })]
			})
		})]
	});
}
function yearLeaders(rows) {
	const out = {};
	for (const y of YEARS) {
		const top = rows.filter((r) => r.classYear === y).sort((a, b) => a.compositeRank - b.compositeRank)[0];
		if (top) out[y] = {
			name: top.shortName,
			rank: top.compositeRank
		};
	}
	return out;
}
function inConf(conference, conf) {
	if (conf === "All") return true;
	if (conf === "Group of Five") return G5.has(conference);
	return conference === conf;
}
function fourYearBoard(rows, conf) {
	const bySlug = /* @__PURE__ */ new Map();
	for (const r of rows) {
		const cur = bySlug.get(r.slug) ?? {
			slug: r.slug,
			name: r.name,
			colorPrimary: r.colorPrimary,
			conference: r.conference,
			byYear: {},
			points: 0,
			ranks: []
		};
		cur.byYear[r.classYear] = r.compositeRank;
		cur.points += r.points;
		cur.ranks.push(r.compositeRank);
		bySlug.set(r.slug, cur);
	}
	return [...bySlug.values()].filter((r) => inConf(r.conference, conf)).map((r) => ({
		...r,
		avgRank: r.ranks.reduce((s, n) => s + n, 0) / r.ranks.length
	})).sort((a, b) => a.avgRank - b.avgRank);
}
function Th({ children, onClick, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
		className: "px-3 py-3 font-medium",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick,
			className: cn("min-h-9 text-left uppercase tracking-[0.12em]", active ? "text-fg" : "text-faint hover:text-muted"),
			children
		})
	});
}
function StarBar({ five, four, three }) {
	const total = Math.max(five + four + three, 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-1.5 overflow-hidden rounded-full bg-raised",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-accent",
				style: { width: `${five / total * 100}%` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-muted",
				style: { width: `${four / total * 100}%` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-faint",
				style: { width: `${three / total * 100}%` }
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-1 text-xs tabular text-muted",
		children: [
			five,
			" / ",
			four,
			" / ",
			three
		]
	})] });
}
//#endregion
export { RecruitingPage as component };
