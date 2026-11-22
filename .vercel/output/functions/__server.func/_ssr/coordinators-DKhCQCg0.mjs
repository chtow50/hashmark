import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as fmtCol, F as UNIT_LABEL, H as inWindow, I as UNIT_SHORT, L as WINDOWS, M as Route$19, N as COL_META, P as COORD_COLS, R as buildBoard, T as TeamMark, U as qualifyCounts, V as higherIsBetter, W as unrankedFor, dt as PageHead, ft as Panel, gt as cn, z as coordSearch } from "./router-Dh_7IsAt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coordinators-DKhCQCg0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CoordinatorsPage() {
	const { file, now, asOf2026, teams } = Route$19.useLoaderData();
	const search = Route$19.useSearch();
	const unit = search.unit ?? "off";
	const w = search.window ?? "10y";
	const sort = search.sort ?? "epa";
	const dir = search.dir ?? "best";
	const rows = (0, import_react.useMemo)(() => buildBoard(file.coaches, unit, w, sort, dir), [
		file,
		unit,
		w,
		sort,
		dir
	]);
	const counts = qualifyCounts(file, unit, w);
	const unranked = unrankedFor(file, unit, w);
	const [open, setOpen] = (0, import_react.useState)({});
	const toggle = (k) => setOpen((o) => ({
		...o,
		[k]: !o[k]
	}));
	const win = WINDOWS[w];
	const side = unit === "off" ? "offense" : "defense";
	const tn = (slug, fallback) => teams[slug]?.name ?? fallback ?? slug;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "Current Power 4 coordinators · credits verified through 2025",
			title: "Best coordinators",
			lede: "Track record of the units they ran, not a coach rating. Each current Power 4 coordinator is measured by how his units played in seasons where an official staff page and a cited source show he alone ran that side of the ball. No composite score: HX stays the only rating on HASHMARK."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg",
				children: "How a season gets credited"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-2 space-y-1.5 text-sm leading-relaxed text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "Who is in it:"
					}), " coordinators listed as the only OC or DC on their school's official 2026 staff page. Co-coordinator setups, and schools with no single OC or DC listed, are left out."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "Which seasons count:"
					}), " FBS seasons from the coach's official bio where (1) that season's official staff page lists him as the only coordinator on that side, (2) a cited source shows the head coach did not call that side (his own bio says he called plays, or the head coach's bio has no coordinator role on that side), and (3) the head coach and coordinator stayed put all season, bowl included. Anything unclear is left out and shown greyed in his history with the reason."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "Who gets ranked:"
					}), " 5+ credited seasons in the 10-year view (2016–25) or 3+ in the 5-year view (2021–25). Each season counts once."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: "The numbers"
						}),
						" are the ",
						side,
						"'s season values from the HASHMARK ridge model, same as /stats (opponent-adjusted EPA per play, success rate and explosiveness over FBS-vs-FBS games), plus points per drive and the unit's FBS rank on adjusted EPA. ",
						unit === "def" ? "For defenses, lower is better on every stat." : "",
						" 2026 to date is shown in each history as context and is not part of the ranking."
					] })
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex flex-col gap-3 sm:flex-row sm:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex max-w-full shrink-0 rounded-xl bg-raised p-1",
				role: "tablist",
				"aria-label": "Side of the ball",
				children: ["off", "def"].map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/coordinators",
					search: coordSearch(u, w, "epa", "best"),
					resetScroll: false,
					role: "tab",
					"aria-selected": unit === u,
					className: cn("inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-lg px-4 text-sm font-medium transition-colors sm:flex-none", unit === u ? "bg-fg text-bg" : "text-muted hover:text-fg"),
					children: UNIT_LABEL[u]
				}, u))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex max-w-full shrink-0 rounded-xl bg-raised p-1",
				role: "group",
				"aria-label": "Window",
				children: ["10y", "5y"].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/coordinators",
					search: coordSearch(unit, k, sort, dir),
					resetScroll: false,
					"aria-pressed": w === k,
					className: cn("inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-lg px-4 text-sm font-medium transition-colors sm:flex-none", w === k ? "bg-fg text-bg" : "text-muted hover:text-fg"),
					children: WINDOWS[k].label
				}, k))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 rounded-xl bg-inset px-4 py-3 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-medium",
				"data-testid": "qualify-count",
				children: [
					counts.ranked,
					" of ",
					counts.total,
					" current Power 4 ",
					UNIT_SHORT[unit],
					"s qualify"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-muted",
				children: [
					" ",
					"for the ",
					win.label,
					" view (",
					win.min,
					"+ credited seasons). Sorted by ",
					COL_META[sort].l,
					", ",
					dir === "best" ? "best first" : "worst first",
					"."
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs leading-relaxed text-muted",
				children: "Small counts are the honest result of the verification rules, not a cutoff. Tap a coach for every season, with sources."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "p-0 sm:p-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "divide-y divide-border lg:hidden",
					children: rows.map((r) => {
						const k = `${unit}|${r.coach.name}`;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "px-4 py-3",
							"data-testid": "coord-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => toggle(k),
									"aria-expanded": !!open[k],
									className: "flex w-full items-center gap-3 text-left",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-6 shrink-0 text-right tabular text-sm text-faint",
											children: r.rank
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoachName, {
											c: r.coach,
											teams
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "shrink-0 rounded-md bg-raised px-2 py-1 text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block font-display text-xl leading-none tabular",
												children: fmtCol(sort, r.sum[sort])
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-0.5 block text-[10px] uppercase tracking-wide text-fg/80",
												children: COL_META[sort].s
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
									className: "mt-2 grid grid-cols-3 gap-1 pl-9 text-xs",
									children: COORD_COLS.filter((c) => c !== sort).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 rounded bg-raised/60 px-1.5 py-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "truncate text-[10px] uppercase tracking-wide text-fg/80",
											children: COL_META[c].s
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "tabular text-fg/90",
											children: fmtCol(c, r.sum[c])
										})]
									}, c))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => toggle(k),
									"aria-expanded": !!open[k],
									className: "mt-2 ml-9 inline-flex h-9 items-center rounded-lg bg-raised px-3 text-xs text-fg hover:bg-border",
									children: open[k] ? "Hide history" : "Season-by-season history"
								}),
								open[k] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
									c: r.coach,
									w,
									now: now[k] ?? null,
									asOf: asOf2026,
									tn
								}) : null
							]
						}, k);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden overflow-x-auto lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border text-left text-[11px] uppercase tracking-wide text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-12 px-3 py-2 text-right font-medium",
									children: "#"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "Coordinator · team now"
								}),
								COORD_COLS.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderCell, {
									col: c,
									unit,
									w,
									sort,
									dir,
									alignRight: i >= COORD_COLS.length - 2
								}, c)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 text-right font-medium",
									children: "History"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => {
							const k = `${unit}|${r.coach.name}`;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border/60 hover:bg-raised/60",
								"data-testid": "coord-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2 text-right tabular text-faint",
										children: r.rank
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "max-w-[22rem] px-3 py-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoachName, {
											c: r.coach,
											teams
										})
									}),
									COORD_COLS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: cn("whitespace-nowrap px-2 py-2 text-right tabular", c === sort ? "font-semibold text-fg" : "text-fg/90"),
										children: fmtCol(c, r.sum[c])
									}, c)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => toggle(k),
											"aria-expanded": !!open[k],
											className: "inline-flex h-8 items-center rounded-lg bg-raised px-3 text-xs text-fg hover:bg-border",
											children: open[k] ? "Hide" : "Show"
										})
									})
								]
							}), open[k] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border/60 bg-inset/40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: COORD_COLS.length + 2,
									className: "max-w-0 px-3 pb-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
										c: r.coach,
										w,
										now: now[k] ?? null,
										asOf: asOf2026,
										tn
									})
								})]
							}) : null] }, k);
						}) })]
					})
				}),
				rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "px-4 py-10 text-center text-muted",
					children: [
						"No current ",
						UNIT_SHORT[unit],
						" has enough credited seasons for this view."
					]
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg",
					children: "Not ranked in this view"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						unranked.length,
						" current Power 4 ",
						UNIT_SHORT[unit],
						"s have fewer than ",
						win.min,
						" credited seasons in ",
						win.from,
						"–",
						String(win.to).slice(2),
						": new coordinators, co-coordinator years, head coaches who call that side, or seasons without an official staff page all leave a season uncredited."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 grid gap-x-4 gap-y-1 text-sm sm:grid-cols-2 lg:grid-cols-3",
					children: unranked.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "truncate text-fg/90",
						children: [
							p.name,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: ["· ", tn(p.team)]
							})
						]
					}, `${p.team}|${p.name}`))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-xs leading-relaxed text-muted",
			children: [
				file.source,
				" Built ",
				file.built,
				". 2026 to date uses the /stats team board through ",
				asOf2026,
				"."
			]
		})
	] });
}
function CoachName({ c, teams }) {
	const t = teams[c.team];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex min-w-0 flex-1 items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
			slug: c.team,
			color: t?.color ?? "#888888"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate font-medium",
				children: c.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "block truncate text-xs text-muted",
				children: [
					t?.name ?? c.team,
					" · ",
					c.title
				]
			})]
		})]
	});
}
function HeaderCell({ col, unit, w, sort, dir, alignRight }) {
	const m = COL_META[col];
	const active = sort === col;
	const nextDir = active && dir === "best" ? "worst" : "best";
	const hi = higherIsBetter(unit, col);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
		className: "group/th relative px-2 py-2 text-right font-medium",
		"aria-sort": active ? (hi ? dir === "best" : dir === "worst") ? "descending" : "ascending" : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/coordinators",
			search: coordSearch(unit, w, col, nextDir),
			resetScroll: false,
			title: m.l,
			className: cn("inline-flex min-h-8 items-center justify-end gap-1 whitespace-nowrap underline decoration-dotted decoration-faint underline-offset-4 hover:text-fg", active ? "text-fg decoration-fg" : "text-muted"),
			children: [m.s, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: cn("text-[10px]", active ? "opacity-100" : "opacity-0 group-hover/th:opacity-40"),
				children: active && dir === "worst" ? "▲" : "▼"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			role: "tooltip",
			className: cn("pointer-events-none absolute top-full z-40 mt-1 hidden w-56 rounded-lg border border-border bg-raised p-3 text-left text-xs font-normal normal-case leading-relaxed tracking-normal text-fg shadow-xl group-hover/th:block group-focus-within/th:block", alignRight ? "right-0" : "left-0"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-medium",
					children: m.l
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-muted",
					children: m.def
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-faint",
					children: hi ? "higher is better" : "lower is better"
				})
			]
		})]
	});
}
function History({ c, w, now, asOf, tn }) {
	const rows = [...c.history].sort((a, b) => b.season - a.season);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 space-y-2",
		"data-testid": "coord-history",
		children: [
			now ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border/70 px-3 py-2 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-medium text-fg",
					children: [
						"2026 to date · ",
						tn(c.team),
						" ",
						c.unit === "off" ? "offense" : "defense",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-normal text-muted",
							children: [
								"(context only, not ranked; through ",
								asOf,
								")"
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 tabular text-fg/90",
					children: [
						"Adj EPA/play ",
						fmtCol("epa", now.epa),
						" · FBS #",
						now.rank,
						" of ",
						now.n,
						" · Success ",
						now.sr == null ? "—" : `${now.sr.toFixed(1)}%`,
						" · Explosiveness ",
						fmtCol("xpl", now.xpl),
						now.games ? ` · ${now.games} games` : ""
					]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "divide-y divide-border/50 rounded-lg border border-border/70",
				children: rows.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryLine, {
					h,
					inWin: inWindow(h.season, w),
					tn
				}, `${h.team}${h.season}`))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11px] text-faint",
				children: [
					"Stops from his",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: c.bioUrl,
						target: "_blank",
						rel: "noreferrer",
						className: "underline underline-offset-2 hover:text-fg",
						children: "official bio"
					}),
					". FBS seasons 2016–25 only. Greyed seasons are not credited."
				]
			})
		]
	});
}
function HistoryLine({ h, inWin, tn }) {
	const ok = h.status === "verified";
	const s = h.stats;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: cn("px-3 py-2 text-xs", ok ? "" : "text-faint"),
		"data-status": h.status,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-baseline gap-x-3 gap-y-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("w-10 tabular font-medium", ok ? "text-fg" : ""),
					children: h.season
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("min-w-28", ok ? "text-fg" : ""),
					children: tn(h.team, h.school)
				}),
				s ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("tabular", ok ? "text-fg/90" : ""),
					children: [
						fmtCol("epa", s.epa),
						" adj EPA · FBS #",
						s.rank,
						" of ",
						s.nFbs,
						" · ",
						s.sr == null ? "—" : `${s.sr.toFixed(1)}%`,
						" success · ",
						fmtCol("ppd", s.ppd),
						" pts/drive · ",
						fmtCol("xpl", s.xpl),
						" XPL"
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "no FBS unit numbers" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide", ok ? "bg-raised text-fg/80" : "bg-raised/50"),
					children: ok ? inWin ? "credited" : "credited · outside window" : "not credited"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 leading-relaxed sm:pl-[3.25rem]",
			children: [
				ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Head coach ",
					h.headCoach,
					". ",
					h.hcNote,
					" "
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [h.reasons?.join("; "), ". "] }),
				h.staffUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: h.staffUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "underline underline-offset-2 hover:text-fg",
					children: [h.season, " staff page"]
				}) : null,
				ok && h.hcUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: h.hcUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "underline underline-offset-2 hover:text-fg",
					children: "play-caller source"
				})] }) : null
			]
		})]
	});
}
//#endregion
export { CoordinatorsPage as component };
