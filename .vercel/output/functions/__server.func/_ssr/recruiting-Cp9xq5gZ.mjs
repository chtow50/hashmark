import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as ALL_YEARS, S as RankSpark, T as TeamMark, _t as fmtNum, b as RankMove, dt as Panel, ht as cn, k as YEARS, lt as ConfPills, m as StatesTab, p as Route$12, ut as PageHead, x as RankNum, yt as inConf } from "./router-BiTaWoq_.mjs";
import { t as recruiting_2027_247_default } from "./recruiting_2027_247-Dy88ENix.mjs";
import { a as ratedStarCount, i as featuredByComposite, n as compareAvgSort, o as visibleClassAvg, t as COMPOSITE_SOURCE } from "./recruiting-B2tK2ji6.mjs";
import { t as ShowMore } from "./show-more-BnopAhY7.mjs";
import { t as TalentNav } from "./talent-nav-ARvglTzI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recruiting-Cp9xq5gZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** 247 lists no FBS team-composite rank for these rows (FCS that year): stored with 0 points. */
var isUnranked = (r) => r.points === 0;
function RecruitingRoute() {
	const data = Route$12.useLoaderData();
	const navigate = Route$12.useNavigate();
	if (data.states) {
		const st = data.states;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: "Pipelines",
				title: "Recruiting by state",
				lede: "Where the 2026 class comes from, which FBS programs live there, and who is harvesting the state."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentNav, { active: "states" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatesTab, {
				states: st.states,
				detail: st.detail,
				code: st.code,
				onSelect: (code) => navigate({ search: {
					tab: "states",
					code: code === "TX" ? void 0 : code
				} })
			})
		] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecruitingPage, { rows: data.rows });
}
function RecruitingPage({ rows }) {
	const year = Route$12.useSearch().year ?? 2026;
	const board = Route$12.useSearch().board ?? "class";
	const conf = Route$12.useSearch().conf ?? "All";
	const [sort, setSort] = (0, import_react.useState)("compositeRank");
	const [dir, setDir] = (0, import_react.useState)("asc");
	const leaders = (0, import_react.useMemo)(() => yearLeaders(rows), [rows]);
	const ofYear = (0, import_react.useMemo)(() => {
		const prevMap = new Map(rows.filter((r) => r.classYear === year - 1 && !isUnranked(r)).map((r) => [r.slug, r.compositeRank]));
		return rows.filter((r) => r.classYear === year).filter((r) => inConf(r.conference, conf)).map((r) => {
			const prev = prevMap.get(r.slug);
			const unranked = isUnranked(r);
			return {
				...r,
				prevRank: prev ?? null,
				unranked,
				delta: prev == null || unranked ? null : prev - r.compositeRank
			};
		});
	}, [
		rows,
		year,
		conf
	]);
	const featured = (0, import_react.useMemo)(() => featuredByComposite(ofYear.filter((r) => !r.unranked)), [ofYear]);
	const tableRows = (0, import_react.useMemo)(() => {
		if (sort === "avgRating") return [...ofYear].sort((a, b) => compareAvgSort(a, b, dir));
		const mul = dir === "asc" ? 1 : -1;
		return [...ofYear].sort((a, b) => {
			const av = sort === "delta" ? a.delta ?? 0 : a[sort];
			const bv = sort === "delta" ? b.delta ?? 0 : b[sort];
			if (av === bv) return a.compositeRank - b.compositeRank || b.points - a.points;
			return (av < bv ? -1 : 1) * mul;
		});
	}, [
		ofYear,
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
			lede: board === "cycle" ? "Every FBS program's signed classes, 2023 through 2026, by 247Sports Composite rank — next to where HX has the team now." : year === 2027 ? "The class of 2027 is still being built: commitments, not signatures, ahead of the December early signing period. 247Sports Composite top 50." : "Incoming high-school classes only. Class avg is the mean of rated 247 Composite decimals (×100); unrated commits are dropped from the average, never from points. Transfers count on the roster talent board, not here."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentNav, { active: "classes" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid grid-cols-3 gap-2 sm:grid-cols-6",
			children: [ALL_YEARS.map((y) => {
				const lead = leaders[y];
				const active = board === "class" && y === year;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/recruiting",
					search: {
						year: y === 2026 ? void 0 : y,
						conf: conf === "All" ? void 0 : conf
					},
					className: cn("rounded-xl px-3 py-3 shadow-[var(--shadow-border)] transition-colors duration-150 sm:px-4", active ? "bg-accent text-accent-fg" : "bg-surface text-fg hover:bg-raised"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("font-mono text-[11px] uppercase tracking-[0.16em]", active ? "text-accent-fg/70" : "text-faint"),
							children: y === 2027 ? "In progress" : "Class of"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-2xl tracking-wide sm:text-3xl",
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
					year: year === 2026 ? void 0 : year,
					board: "cycle",
					conf: conf === "All" ? void 0 : conf
				},
				className: cn("rounded-xl px-3 py-3 shadow-[var(--shadow-border)] transition-colors duration-150 sm:px-4", board === "cycle" ? "bg-accent text-accent-fg" : "bg-surface text-fg hover:bg-raised"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("font-mono text-[11px] uppercase tracking-[0.16em]", board === "cycle" ? "text-accent-fg/70" : "text-faint"),
						children: "2023–2026"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-2xl tracking-wide sm:text-3xl",
						children: "Cycle"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("mt-1 truncate text-sm", board === "cycle" ? "text-accent-fg/80" : "text-muted"),
						children: cycle[0] ? `#1 ${cycle[0].name}` : "Four-year avg"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceLine, { year: board === "cycle" ? 2026 : year }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfPills, {
				value: conf,
				to: "/recruiting",
				searchFor: (c) => ({
					...year === 2026 ? {} : { year },
					...board === "class" ? {} : { board },
					...c === "All" ? {} : { conf: c }
				})
			})
		}),
		board === "cycle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CycleTable, { cycle }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 hidden gap-4 sm:grid sm:grid-cols-3",
				children: featured.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
							slug: t.slug,
							color: t.colorPrimary,
							logoSize: 20
						}), t.name]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: [
							t.commits,
							" commits ·",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClassAvg, {
								avg: t.avgRating,
								five: t.fiveStars,
								four: t.fourStars,
								three: t.threeStars,
								withLabel: true
							}),
							" ",
							"· ",
							t.fiveStars,
							" five-stars"
						]
					})
				] }, t.slug))
			}),
			year === 2027 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-4 text-sm text-muted",
				children: [
					"Showing the ",
					tableRows.length,
					" FBS classes in 247's top 50",
					conf === "All" ? "" : ` from ${conf}`,
					". Classes outside the top 50 are not listed yet."
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sm:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShowMore, {
					items: tableRows,
					noun: "classes",
					resetKey: `${year}-${conf}-${sort}-${dir}`,
					className: "space-y-2",
					render: (t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClassCard, { t }, t.slug)
				})
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
									children: `vs ${year - 1}`
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
									title: "Current HX rank (live board)",
									children: "HX now"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: tableRows.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line last:border-0 hover:bg-raised/60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: t.unranked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-faint",
										title: "No 247 FBS team-composite rank that year",
										children: "NR"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankNum, {
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
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
											slug: t.slug,
											color: t.colorPrimary,
											logoSize: 20
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
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
									className: "px-3 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClassAvg, {
										avg: t.avgRating,
										five: t.fiveStars,
										four: t.fourStars,
										three: t.threeStars
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3 tabular",
									children: t.unranked ? "—" : fmtNum(t.points, 1)
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
			})
		] })
	] });
}
function CycleTable({ cycle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "sm:hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShowMore, {
			items: cycle,
			noun: "teams",
			className: "space-y-2",
			render: (row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/teams/$slug",
				params: { slug: row.slug },
				className: "block rounded-xl bg-surface p-3 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex min-w-0 items-center gap-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-6 font-display text-lg tabular text-muted",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
								slug: row.slug,
								color: row.colorPrimary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate font-medium",
								children: row.name
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "shrink-0 text-right text-xs tabular text-muted",
						children: [
							"avg rk",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg text-fg",
								children: row.avgRank == null ? "—" : fmtNum(row.avgRank, 1)
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid grid-cols-5 gap-1 text-center text-xs tabular",
					children: [YEARS.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded bg-raised px-1 py-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[10px] text-faint",
							children: `'${String(y).slice(2)}`
						}), row.byYear[y] ?? "NR"]
					}, y)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded bg-raised px-1 py-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[10px] text-faint",
							children: "HX now"
						}), row.hxRank]
					})]
				})]
			}, row.slug)
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "hidden overflow-hidden p-0 sm:block sm:p-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-line px-4 py-4 sm:px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "Four-year cycle"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Composite rank by signing class, 2023 through 2026. Average is unweighted over ranked classes (NR = no 247 FBS team rank that year). HX now is the live board rank, shown beside the cycle, not blended with it."
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
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-3 font-medium",
							children: "HX now"
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
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
									slug: row.slug,
									color: row.colorPrimary
								}), row.name]
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
								search: { year: y === 2026 ? void 0 : y },
								className: "hover:text-accent",
								children: row.byYear[y] ?? "NR"
							})
						}, y)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 tabular",
							children: row.avgRank == null ? "—" : fmtNum(row.avgRank, 1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 tabular text-muted",
							children: fmtNum(row.points, 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 tabular text-muted",
							children: row.hxRank
						})
					]
				}, row.slug)) })]
			})
		})]
	})] });
}
function SourceLine({ year }) {
	if (year === 2027) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mb-5 text-xs text-faint",
		children: [
			"Source:",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: recruiting_2027_247_default.url,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "underline hover:text-fg",
				children: "247Sports Composite Team Rankings, class of 2027"
			}),
			" ",
			"· as of ",
			recruiting_2027_247_default.asOfLabel,
			" · commitments can still change"
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mb-5 text-xs text-faint",
		children: [
			"Source: ",
			COMPOSITE_SOURCE.label,
			" team rankings (final), cross-checked against",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "https://collegefootballdata.com",
				target: "_blank",
				rel: "noopener noreferrer",
				className: "underline hover:text-fg",
				children: "CollegeFootballData.com"
			}),
			" ",
			"on Nov 17, 2026 (2023–2026: every ranked class matches on rank and points). Class avg: rated commits only."
		]
	});
}
function ClassCard({ t }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/teams/$slug",
		params: { slug: t.slug },
		className: "block rounded-xl bg-surface p-3 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex min-w-0 items-center gap-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-7 font-display text-lg tabular text-fg",
						children: t.unranked ? "NR" : t.compositeRank
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
						slug: t.slug,
						color: t.colorPrimary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate font-medium",
							children: t.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block text-xs text-muted",
							children: [
								t.conference,
								" · HX now ",
								t.hxRank
							]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "shrink-0 text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-display text-lg tabular",
					children: t.unranked ? "—" : fmtNum(t.points, 1)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankMove, { delta: t.delta })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex items-center justify-between gap-3 text-xs text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				t.commits,
				" commits ·",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClassAvg, {
					avg: t.avgRating,
					five: t.fiveStars,
					four: t.fourStars,
					three: t.threeStars,
					withLabel: true
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "tabular",
				children: [
					t.fiveStars,
					"/",
					t.fourStars,
					"/",
					t.threeStars
				]
			})]
		})]
	});
}
function yearLeaders(rows) {
	const out = {};
	for (const y of ALL_YEARS) {
		const top = rows.filter((r) => r.classYear === y).sort((a, b) => a.compositeRank - b.compositeRank)[0];
		if (top) out[y] = {
			name: top.shortName,
			rank: top.compositeRank
		};
	}
	return out;
}
function fourYearBoard(rows, conf) {
	const bySlug = /* @__PURE__ */ new Map();
	for (const r of rows) {
		if (!YEARS.includes(r.classYear)) continue;
		const cur = bySlug.get(r.slug) ?? {
			slug: r.slug,
			name: r.name,
			colorPrimary: r.colorPrimary,
			conference: r.conference,
			byYear: {},
			points: 0,
			ranks: [],
			hxRank: r.hxRank
		};
		if (!isUnranked(r)) {
			cur.byYear[r.classYear] = r.compositeRank;
			cur.points += r.points;
			cur.ranks.push(r.compositeRank);
		}
		bySlug.set(r.slug, cur);
	}
	return [...bySlug.values()].filter((r) => inConf(r.conference, conf)).map((r) => ({
		...r,
		avgRank: r.ranks.length ? r.ranks.reduce((s, n) => s + n, 0) / r.ranks.length : null
	})).sort((a, b) => (a.avgRank ?? 999) - (b.avgRank ?? 999) || b.points - a.points);
}
function Th({ children, onClick, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
		className: "px-3 py-3 font-medium",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick,
			className: cn("min-h-9 min-w-9 text-left uppercase tracking-[0.12em]", active ? "text-fg" : "text-faint hover:text-muted"),
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
function ClassAvg({ avg, five, four, three, withLabel = false }) {
	const rated = ratedStarCount(five, four, three);
	const shown = visibleClassAvg(avg, rated);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "tabular",
		children: [
			shown == null ? "—" : fmtNum(shown, 2),
			withLabel ? " avg" : "",
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-muted",
				children: [
					" · ",
					rated,
					" rated"
				]
			})
		]
	});
}
//#endregion
export { RecruitingRoute as component };
