import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as UNIT_SIDE, b as whoLine, c as buildBoard3y, d as fmtCol, f as higherIsBetter, i as UNIT_SHORT, l as colsFor, n as LABEL_TEXT, o as VIEWS, p as labelCounts, r as UNIT_LABEL, s as buildBoard2026, t as COL_META, u as coordSearch, v as qualifies3y } from "./coordinators-rOHwFHgg.mjs";
import { M as Route$19, T as TeamMark, dt as Panel, ht as cn, ut as PageHead } from "./router-D7MSK8oJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coordinators-DPtFshvC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CoordinatorsPage() {
	const data = Route$19.useLoaderData();
	const { units2026, prior2025, coaches, live, talent, asOf2026, teams } = data;
	const search = Route$19.useSearch();
	const view = search.view ?? "2026";
	const unit = search.unit ?? "off";
	const sort = search.sort ?? "epa";
	const dir = search.dir ?? "best";
	const tn = (slug) => teams[slug]?.name ?? slug;
	const byCoach = (0, import_react.useMemo)(() => new Map(coaches.map((c) => [`${c.unit}|${c.team}|${c.name}`, c])), [coaches]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: `Production board · every FBS offense and defense · through ${asOf2026}`,
			title: "Best coordinators",
			lede: "Who is producing right now, and who has done it for more than one year. Every FBS unit is ranked on what it produced, with the coordinator the school lists for it: a gauge for offseason hiring. Track record of the units they ran, not a coach rating. HX stays the only team rating on HASHMARK."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex flex-col gap-3 sm:flex-row sm:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex max-w-full shrink-0 rounded-xl bg-raised p-1",
				role: "tablist",
				"aria-label": "Side of the ball",
				children: ["off", "def"].map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/coordinators",
					search: coordSearch(view, u, "epa", "best"),
					resetScroll: false,
					role: "tab",
					"aria-selected": unit === u,
					className: cn("inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-lg px-4 text-sm font-medium transition-colors sm:flex-none", unit === u ? "bg-fg text-bg" : "text-muted hover:text-fg"),
					children: UNIT_LABEL[u]
				}, u))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex max-w-full shrink-0 rounded-xl bg-raised p-1",
				role: "group",
				"aria-label": "View",
				children: ["2026", "3y"].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/coordinators",
					search: coordSearch(k, unit, "epa", "best"),
					resetScroll: false,
					"aria-pressed": view === k,
					className: cn("inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-lg px-3 text-sm font-medium transition-colors sm:flex-none sm:px-4", view === k ? "bg-fg text-bg" : "text-muted hover:text-fg"),
					children: VIEWS[k].label
				}, k))
			})]
		}),
		view === "2026" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Board2026, {
			units: units2026,
			live,
			prior: prior2025,
			talent,
			unit,
			sort,
			dir,
			teams,
			tn,
			byCoach,
			asOf: asOf2026
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Board3y, {
			coaches,
			units: units2026,
			unit,
			sort,
			dir,
			teams,
			tn
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Method, { unit }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-xs leading-relaxed text-muted",
			children: [
				data.source,
				" Built ",
				data.built,
				". 2026 numbers use the /stats team board through ",
				asOf2026,
				". Head coaches: ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/coaches",
					className: "text-accent hover:underline",
					children: "head coach before and after"
				}),
				"."
			]
		})
	] });
}
function Board2026({ units, live, prior, talent, unit, sort, dir, teams, tn, byCoach, asOf }) {
	const rows = (0, import_react.useMemo)(() => buildBoard2026(units, live, prior, talent, unit, sort, dir), [
		units,
		live,
		prior,
		talent,
		unit,
		sort,
		dir
	]);
	const lc = labelCounts(units, unit);
	const [open, setOpen] = (0, import_react.useState)({});
	const toggle = (k) => setOpen((o) => ({
		...o,
		[k]: !o[k]
	}));
	const cols = colsFor("2026");
	const ranked = rows.filter((r) => r.rank > 0).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 rounded-xl bg-inset px-4 py-3 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-medium",
			"data-testid": "board-count",
			children: [
				"All ",
				ranked,
				" FBS ",
				UNIT_SIDE[unit],
				"s ranked on 2026 production"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-muted",
			children: [
				" ",
				"· ",
				lc.sole,
				" with one listed ",
				UNIT_SHORT[unit],
				lc["with-co"] ? ` · ${lc["with-co"]} ${UNIT_SHORT[unit]} plus a co-${UNIT_SHORT[unit]}` : "",
				lc.co ? ` · ${lc.co} co-${UNIT_SHORT[unit]}s only` : "",
				lc["hc-title"] + lc["hc-calls"] ? ` · ${lc["hc-title"] + lc["hc-calls"]} head-coach-run` : "",
				lc.interim ? ` · ${lc.interim} interim` : "",
				lc.unverified ? ` · ${lc.unverified} unverified` : "",
				". Sorted by ",
				COL_META[sort].l,
				", ",
				dir === "best" ? "best first" : "worst first",
				"."
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs leading-relaxed text-muted",
			children: "Labeled units stay on the board so the list is complete. Tap a unit for sources, last season, and the coordinator's 2024–26 record."
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "p-0 sm:p-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "divide-y divide-border lg:hidden",
			children: rows.map((r) => {
				const k = `${unit}|${r.u.team}`;
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
									className: "w-7 shrink-0 text-right tabular text-sm text-faint",
									children: r.rank || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnitName, {
									u: r.u,
									teams
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "shrink-0 rounded-md bg-raised px-2 py-1 text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-display text-xl leading-none tabular",
										children: fmtCol(sort, r.v[sort])
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-0.5 block text-[10px] uppercase tracking-wide text-fg/80",
										children: COL_META[sort].s
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "mt-2 grid grid-cols-3 gap-1 pl-10 text-xs",
							children: cols.filter((c) => c !== sort).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 rounded bg-raised/60 px-1.5 py-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "truncate text-[10px] uppercase tracking-wide text-fg/80",
									children: COL_META[c].s
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "tabular text-fg/90",
									children: fmtCol(c, r.v[c])
								})]
							}, c))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => toggle(k),
							"aria-expanded": !!open[k],
							className: "mt-2 ml-10 inline-flex h-9 items-center rounded-lg bg-raised px-3 text-xs text-fg hover:bg-border",
							children: open[k] ? "Hide details" : "Sources & record"
						}),
						open[k] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnitDetail, {
							r,
							prior: prior[r.u.team]?.[unit] ?? null,
							tn,
							byCoach,
							asOf
						}) : null
					]
				}, k);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
							children: "Unit · coordinator"
						}),
						cols.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderCell, {
							col: c,
							unit,
							view: "2026",
							sort,
							dir,
							alignRight: i >= cols.length - 2
						}, c)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-right font-medium",
							children: "More"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => {
					const k = `${unit}|${r.u.team}`;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/60 hover:bg-raised/60",
						"data-testid": "coord-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 text-right tabular text-faint",
								children: r.rank || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "max-w-[24rem] px-3 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnitName, {
									u: r.u,
									teams
								})
							}),
							cols.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: cn("whitespace-nowrap px-2 py-2 text-right tabular", c === sort ? "font-semibold text-fg" : "text-fg/90"),
								children: fmtCol(c, r.v[c])
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
							colSpan: cols.length + 2,
							className: "max-w-0 px-3 pb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnitDetail, {
								r,
								prior: prior[r.u.team]?.[unit] ?? null,
								tn,
								byCoach,
								asOf
							})
						})]
					}) : null] }, k);
				}) })]
			})
		})]
	})] });
}
function LabelChip({ u }) {
	if (u.label === "sole") return null;
	const tone = u.label === "unverified" ? "border-dashed text-muted" : "text-fg/80";
	const text = u.label === "with-co" ? `+ co-${UNIT_SHORT[u.unit]} ${u.coaches.slice(1).map((c) => c.name.split(" ").slice(-1)[0]).join(", ")}` : LABEL_TEXT[u.label];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-1.5 inline-block whitespace-nowrap rounded border border-border px-1.5 py-px align-middle text-[10px] uppercase tracking-wide", tone),
		children: text
	});
}
function UnitName({ u, teams }) {
	const t = teams[u.team];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex min-w-0 flex-1 items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
			slug: u.team,
			color: t?.color ?? "#888888"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "block truncate font-medium",
				children: [u.coaches.length ? whoLine(u) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: "No coordinator listed"
				}), u.since === 2026 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-1.5 align-middle text-[10px] uppercase tracking-wide text-accent",
					children: "1st year"
				}) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "block truncate text-xs text-muted",
				children: [
					t?.name ?? u.team,
					" ",
					UNIT_SIDE[u.unit],
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelChip, { u })
				]
			})]
		})]
	});
}
function statLine(s, ppdOrPpg) {
	if (!s) return "no FBS unit numbers";
	const pts = ppdOrPpg === "ppd" ? s.ppd != null ? ` · ${s.ppd.toFixed(2)} pts/drive` : "" : s.ppg != null ? ` · ${s.ppg.toFixed(1)} pts/game` : "";
	return `${fmtCol("epa", s.epa)} adj EPA · FBS #${s.rank ?? "—"} of ${s.nFbs} · ${s.sr == null ? "—" : `${(s.sr > 1 ? s.sr : s.sr * 100).toFixed(1)}%`} success · ${fmtCol("xpl", s.xpl)} XPL${pts}`;
}
function UnitDetail({ r, prior, tn, byCoach, asOf }) {
	const u = r.u;
	const recs = u.coaches.map((c) => byCoach.get(`${u.unit}|${u.team}|${c.name}`)).filter((c) => !!c);
	const lr = r.live;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 space-y-2 text-xs",
		"data-testid": "coord-detail",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border/70 px-3 py-2 leading-relaxed",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-fg",
						children: "Who runs it"
					}),
					u.coaches.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-1 space-y-0.5",
						children: u.coaches.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg",
								children: c.name
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: ["· ", c.title]
							})
						] }, c.name))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-muted",
						children: [
							"The school's 2026 staff page lists no ",
							u.unit === "off" ? "offensive" : "defensive",
							" coordinator."
						]
					}),
					u.label !== "sole" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-muted",
						children: [LABEL_TEXT[u.label], u.note ? `: ${u.note}` : "."]
					}) : u.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-muted",
						children: u.note
					}) : null,
					u.hcSource ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-muted",
						children: [
							"“",
							u.hcSource.quote,
							"”",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: u.hcSource.url,
								target: "_blank",
								rel: "noreferrer",
								className: "underline underline-offset-2 hover:text-fg",
								children: "source"
							})
						]
					}) : null,
					u.since != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-muted",
						children: u.since === 2026 ? "First season in this role here." : u.since <= 2024 ? "In this role here since 2024 or earlier (official staff pages)." : `In this role here since ${u.since} (official staff pages).`
					}) : null,
					u.staffUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: u.staffUrl,
						target: "_blank",
						rel: "noreferrer",
						className: "mt-1 inline-block underline underline-offset-2 hover:text-fg",
						children: "2026 staff page"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border/70 px-3 py-2 leading-relaxed",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "tabular text-fg/90",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-fg",
								children: "2026"
							}),
							" · ",
							lr ? statLine({
								...lr,
								nFbs: lr.n
							}, "ppg") : "no adjusted numbers yet",
							lr?.games ? ` · ${lr.games} games` : "",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-faint",
								children: [
									"(through ",
									asOf,
									")"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 tabular text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg/80",
								children: "2025, same school"
							}),
							" · ",
							statLine(prior, "ppd")
						]
					}),
					r.talent != null && lr?.rank ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-muted",
						children: [
							"Roster talent #",
							r.talent,
							" (247 composite) vs ",
							UNIT_SIDE[u.unit],
							" #",
							lr.rank,
							": ",
							lr.rank < r.talent ? `producing ${r.talent - lr.rank} spots above` : lr.rank > r.talent ? `${lr.rank - r.talent} spots below` : "level with",
							" its talent rank."
						]
					}) : null
				]
			}),
			recs.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-1 font-medium text-fg",
				children: [
					c.name,
					", 2024–26 ",
					qualifies3y(c) ? "" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-normal text-muted",
						children: "(not enough credited seasons for the 3-year board)"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
				c,
				tn
			})] }, c.name))
		]
	});
}
function Board3y({ coaches, units, unit, sort, dir, teams, tn }) {
	const rows = (0, import_react.useMemo)(() => buildBoard3y(coaches, unit, sort, dir), [
		coaches,
		unit,
		sort,
		dir
	]);
	const [open, setOpen] = (0, import_react.useState)({});
	const toggle = (k) => setOpen((o) => ({
		...o,
		[k]: !o[k]
	}));
	const cols = colsFor("3y");
	const pool = coaches.filter((c) => c.unit === unit);
	const unranked = pool.filter((c) => !qualifies3y(c)).sort((a, b) => a.team.localeCompare(b.team));
	const unitOf = new Map(units.map((u) => [`${u.unit}|${u.team}`, u]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 rounded-xl bg-inset px-4 py-3 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-medium",
				"data-testid": "board-count",
				children: [
					rows.length,
					" of ",
					pool.length,
					" current ",
					UNIT_SHORT[unit],
					"s ranked on 2024–26 production"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-muted",
				children: [
					" ",
					"(",
					VIEWS["3y"].min,
					"+ credited seasons; each season counts once). Sorted by ",
					COL_META[sort].l,
					", ",
					dir === "best" ? "best first" : "worst first",
					"."
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs leading-relaxed text-muted",
				children: [
					"A season counts when that year's official staff page lists him with the full ",
					UNIT_SHORT[unit],
					" title at that school (a co-",
					UNIT_SHORT[unit],
					" may also be listed). 2026 counts to date. Tap a coach for every season with sources."
				]
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
											className: "w-7 shrink-0 text-right tabular text-sm text-faint",
											children: r.rank
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoachName, {
											c: r.coach,
											teams,
											u: unitOf.get(`${unit}|${r.coach.team}`)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "shrink-0 rounded-md bg-raised px-2 py-1 text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block font-display text-xl leading-none tabular",
												children: fmtCol(sort, r.v[sort])
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-0.5 block text-[10px] uppercase tracking-wide text-fg/80",
												children: COL_META[sort].s
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
									className: "mt-2 grid grid-cols-4 gap-1 pl-10 text-xs",
									children: cols.filter((c) => c !== sort).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 rounded bg-raised/60 px-1.5 py-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "truncate text-[10px] uppercase tracking-wide text-fg/80",
											children: COL_META[c].s
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "tabular text-fg/90",
											children: fmtCol(c, r.v[c])
										})]
									}, c))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => toggle(k),
									"aria-expanded": !!open[k],
									className: "mt-2 ml-10 inline-flex h-9 items-center rounded-lg bg-raised px-3 text-xs text-fg hover:bg-border",
									children: open[k] ? "Hide history" : "Season-by-season history"
								}),
								open[k] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
									c: r.coach,
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
								cols.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderCell, {
									col: c,
									unit,
									view: "3y",
									sort,
									dir,
									alignRight: i >= cols.length - 2
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
										className: "max-w-[24rem] px-3 py-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoachName, {
											c: r.coach,
											teams,
											u: unitOf.get(`${unit}|${r.coach.team}`)
										})
									}),
									cols.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: cn("whitespace-nowrap px-2 py-2 text-right tabular", c === sort ? "font-semibold text-fg" : "text-fg/90"),
										children: fmtCol(c, r.v[c])
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
									colSpan: cols.length + 2,
									className: "max-w-0 px-3 pb-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
										c: r.coach,
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
						" has enough credited seasons yet."
					]
				}) : null
			]
		}),
		unranked.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-lg",
					children: [
						"Current ",
						UNIT_SHORT[unit],
						"s with one credited season"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "First-year coordinators, co-coordinator years, and seasons without an official staff page leave only 2026. They are on the 2026 board."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 grid gap-x-4 gap-y-1 text-sm sm:grid-cols-2 lg:grid-cols-3",
					children: unranked.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "truncate text-fg/90",
						children: [
							c.name,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: ["· ", tn(c.team)]
							})
						]
					}, `${c.team}|${c.name}`))
				})
			]
		}) : null
	] });
}
function CoachName({ c, teams, u }) {
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
					c.title,
					u ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelChip, { u }) : null
				]
			})]
		})]
	});
}
function HeaderCell({ col, unit, view, sort, dir, alignRight }) {
	const m = COL_META[col];
	const active = sort === col;
	const nextDir = active && dir === "best" ? "worst" : "best";
	const hi = higherIsBetter(unit, col);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
		className: "group/th relative px-2 py-2 text-right font-medium",
		"aria-sort": active ? (hi ? dir === "best" : dir === "worst") ? "descending" : "ascending" : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/coordinators",
			search: coordSearch(view, unit, col, nextDir),
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
			className: cn("pointer-events-none absolute top-full z-40 mt-1 hidden w-60 rounded-lg border border-border bg-raised p-3 text-left text-xs font-normal normal-case leading-relaxed tracking-normal text-fg shadow-xl group-hover/th:block group-focus-within/th:block", alignRight ? "right-0" : "left-0"),
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
function History({ c, tn }) {
	const rows = [...c.history].sort((a, b) => b.season - a.season);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2 space-y-2",
		"data-testid": "coord-history",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "divide-y divide-border/50 rounded-lg border border-border/70",
			children: rows.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryLine, {
				h,
				tn
			}, `${h.team}${h.season}`))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] text-faint",
			children: "FBS seasons 2024–26 from official season staff pages (live or archived). A missing year means he was not listed as a coordinator on an available FBS staff page that season. Greyed seasons are not credited."
		})]
	});
}
function HistoryLine({ h, tn }) {
	const ok = h.status === "credited";
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/teams/$slug",
					params: { slug: h.team },
					hash: "coordinators",
					className: cn("min-w-28 underline decoration-faint underline-offset-2 hover:text-fg", ok ? "text-fg" : ""),
					children: tn(h.team)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("tabular", ok ? "text-fg/90" : ""),
					children: statLine(h.stats, h.season === 2026 ? "ppg" : "ppd")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide", ok ? "bg-raised text-fg/80" : "bg-raised/50"),
					children: ok ? "credited" : "not credited"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 leading-relaxed sm:pl-[3.25rem]",
			children: [
				h.title ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [h.title, ". "] }) : null,
				!ok && h.reasons?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [h.reasons.join("; "), ". "] }) : null,
				ok && h.playcall ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [h.playcall, " "] }) : null,
				h.staffUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: h.staffUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "underline underline-offset-2 hover:text-fg",
					children: [h.season, " staff page"]
				}) : null
			]
		})]
	});
}
function Method({ unit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		className: "mt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
			className: "cursor-pointer font-display text-lg",
			children: "How it works"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-2 space-y-1.5 text-sm leading-relaxed text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "Production, not reputation:"
					}),
					" units are ranked on opponent-adjusted EPA per play from the HASHMARK ridge model (same as /stats, FBS-vs-FBS games), with success rate, explosiveness and points as support. ",
					unit === "def" ? "For defenses, lower is better on EPA, success rate, explosiveness and points." : "",
					" No composite score."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "2026 board:"
					}),
					" every FBS ",
					UNIT_SIDE[unit],
					". The coordinator is whoever the school's official 2026 staff page lists. Co-coordinators, head coaches who hold the title or are documented play-callers (with a cited source), interim setups, and units with no listed or confirmed coordinator are labeled, not dropped. “vs 2025” is the same school's unit last season; for a first-year coordinator that is the unit he inherited. Talent rank is the 247 Team Talent Composite, for context."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-fg",
					children: "3-year board (2024–26):"
				}), " current coordinators only. A season counts when that year's official staff page (live or archived) lists him holding the full coordinator title on that side at that school (a co-coordinator may also be listed), the school had one head coach that season (2024–25), and the head coach is not documented calling that side. Seasons where he was only a co-coordinator, missing staff pages and head-coach play-caller seasons are shown greyed with the reason. Each credited season counts once (equal weight); 2026 counts to date; 2 credited seasons to be ranked."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-fg",
					children: "Limits:"
				}), " a staff page is a snapshot, so a mid-season change can hide behind it. Titles say who holds the job, not always who calls every play. Treat this as the track record of the units they ran, not a coach rating."] })
			]
		})] })
	});
}
//#endregion
export { CoordinatorsPage as component };
