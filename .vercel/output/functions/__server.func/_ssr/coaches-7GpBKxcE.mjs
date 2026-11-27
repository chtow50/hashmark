import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useNavigate, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as recordText, F as COL_LABEL, H as tone, I as coachSearch, L as deltas, P as Route$21, R as parseCol, T as TeamMark, U as viewRows, V as signed, W as yearsText, dt as Panel, ht as cn, ut as PageHead, z as pctText } from "./router-D7MSK8oJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coaches-7GpBKxcE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SORTS = [
	"win",
	"rec",
	"tal",
	"epa",
	"tenure",
	"name",
	"school"
];
function CoachesPage() {
	const { file, teams } = Route$21.useLoaderData();
	const search = Route$21.useSearch();
	const view = search.view ?? "compared";
	const sort = search.sort ?? "win";
	const dir = search.dir ?? "best";
	const focus = search.team;
	const navigate = useNavigate();
	const rows = (0, import_react.useMemo)(() => viewRows(file, view, sort, dir), [
		file,
		view,
		sort,
		dir
	]);
	const nCompared = file.coaches.filter((c) => c.status === "compared").length;
	const nNew = file.coaches.filter((c) => c.status === "too-new").length;
	const nNone = file.coaches.filter((c) => c.status === "no-before").length;
	const [open, setOpen] = (0, import_react.useState)(focus ? { [focus]: true } : {});
	const toggle = (k) => setOpen((o) => ({
		...o,
		[k]: !o[k]
	}));
	(0, import_react.useEffect)(() => {
		if (!focus) return;
		setOpen((o) => ({
			...o,
			[focus]: true
		}));
		const t = setTimeout(() => [...document.querySelectorAll(`[data-coach="${focus}"]`)].find((el) => el.offsetParent !== null)?.scrollIntoView({ block: "start" }), 60);
		return () => clearTimeout(t);
	}, [focus]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: `Every current FBS head coach · seasons through ${file.lastCompleted} · built ${file.built}`,
			title: "Head coach before and after",
			lede: "For each coach, the program in the seasons before he arrived next to the same number of seasons under him: record, recruiting classes, roster talent and opponent-adjusted EPA, as side-by-side changes. Context, not a verdict: no coach score and no second rating. HX stays the only team rating on HASHMARK."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex flex-col gap-3 sm:flex-row sm:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex max-w-full shrink-0 rounded-xl bg-raised p-1",
				role: "group",
				"aria-label": "View",
				children: ["compared", "all"].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/coaches",
					search: coachSearch(k, sort, dir),
					resetScroll: false,
					"aria-pressed": view === k,
					className: cn("inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-lg px-3 text-sm font-medium transition-colors sm:flex-none sm:px-4", view === k ? "bg-fg text-bg" : "text-muted hover:text-fg"),
					children: k === "compared" ? `Compared (${nCompared})` : `All ${file.coaches.length} coaches`
				}, k))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-sm text-muted lg:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0",
						children: "Sort by"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: sort,
						onChange: (e) => navigate({
							to: "/coaches",
							search: coachSearch(view, parseCol(e.target.value), "best"),
							resetScroll: false
						}),
						className: "h-10 min-w-0 flex-1 rounded-lg border border-border bg-raised px-2 text-fg",
						"aria-label": "Sort by",
						children: SORTS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: COL_LABEL[c]
						}, c))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/coaches",
						search: coachSearch(view, sort, dir === "best" ? "worst" : "best"),
						resetScroll: false,
						className: "inline-flex h-10 shrink-0 items-center rounded-lg bg-raised px-3 text-fg",
						children: dir === "best" ? "Best first" : "Worst first"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 rounded-xl bg-inset px-4 py-3 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				"data-testid": "coach-count",
				children: view === "compared" ? `${nCompared} coaches compared` : `${file.coaches.length} coaches listed`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-muted",
				children: [
					" ",
					"· ",
					nNew,
					" too new (under ",
					file.minSeasons,
					" completed seasons, listed under All) · ",
					nNone,
					" with no usable before window. Sorted by ",
					COL_LABEL[sort],
					sort === "name" || sort === "school" ? "" : dir === "best" ? ", biggest improvement first" : ", biggest decline first",
					"."
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs leading-relaxed text-muted",
				children: [
					"Windows are matched: the same number of seasons (up to ",
					file.maxMatch,
					") right before he arrived and right after. Green is better, red is worse. Tap a coach for the season-by-season rows, prior head-coaching stops and notes."
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "p-0 sm:p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "divide-y divide-border lg:hidden",
				children: rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoachCard, {
					c,
					teams,
					open: !!open[c.slug],
					toggle: () => toggle(c.slug)
				}, c.slug))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden overflow-x-auto lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border text-left text-[11px] uppercase tracking-wide text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortLink, {
									col: "name",
									label: "Coach · school",
									view,
									sort,
									dir
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 font-medium",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortLink, {
									col: "tenure",
									label: "Window",
									view,
									sort,
									dir
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortLink, {
									col: "win",
									label: "Win %",
									view,
									sort,
									dir
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortLink, {
									col: "rec",
									label: "Class rank",
									view,
									sort,
									dir
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortLink, {
									col: "tal",
									label: "Talent rank",
									view,
									sort,
									dir
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortLink, {
									col: "epa",
									label: "Net adj EPA",
									view,
									sort,
									dir
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "HX now"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-right font-medium",
								children: "More"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((c) => {
						const t = teams[c.slug];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							"data-coach": c.slug,
							className: "scroll-mt-32 border-b border-border/60 align-top hover:bg-raised/60",
							"data-testid": "coach-row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Who, {
										c,
										t,
										slug: c.slug
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-2 text-xs text-muted",
									children: windowText(c)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCells, { c }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-2 text-right tabular text-fg/90",
									children: t?.hxRank ? `#${t.hxRank}` : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => toggle(c.slug),
										"aria-expanded": !!open[c.slug],
										className: "inline-flex h-8 items-center rounded-lg bg-raised px-3 text-xs text-fg hover:bg-border",
										children: open[c.slug] ? "Hide" : "Show"
									})
								})
							]
						}), open[c.slug] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "border-b border-border/60 bg-inset/40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 8,
								className: "max-w-0 px-3 pb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
									c,
									teams
								})
							})
						}) : null] }, c.slug);
					}) })]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Method, { file })
	] });
}
function windowText(c) {
	if (c.status === "compared" && c.before && c.after) return `${yearsText(c.before.years)} → ${yearsText(c.after.years)}`;
	if (c.status === "too-new") return c.completed ? `${c.completed} completed season, too new` : c.first >= 2026 ? "First year (2026)" : "No completed season";
	return "No before window";
}
function SortLink({ col, label, view, sort, dir }) {
	const active = sort === col;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/coaches",
		search: coachSearch(view, col, active ? dir === "best" ? "worst" : "best" : "best"),
		resetScroll: false,
		className: cn("inline-flex items-center gap-1 hover:text-fg", active && "text-fg"),
		children: [label, active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			children: dir === "best" ? "▼" : "▲"
		}) : null]
	});
}
function Who({ c, t, slug }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex min-w-0 items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
			slug,
			color: t?.color ?? "#888888"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "block font-medium",
				children: [
					c.name,
					c.status === "too-new" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: "too new" }) : null,
					c.status === "no-before" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: "no before window" }) : null,
					c.status === "compared" && c.notes.some((n) => n.startsWith("Started partway")) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: "started midseason" }) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "block text-xs text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/teams/$slug",
						params: { slug },
						className: "underline-offset-2 hover:underline",
						children: t?.name ?? c.school
					}),
					" ",
					"· since ",
					c.first
				]
			})]
		})]
	});
}
function Chip({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "ml-1.5 inline-block whitespace-nowrap rounded border border-dashed border-border px-1.5 py-px align-middle text-[10px] font-normal uppercase tracking-wide text-muted",
		children
	});
}
function Cell({ before, after, delta, unit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "block leading-tight",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("block font-display text-lg tabular", tone(delta, 1e-4)),
			children: unit === "pts" ? `${signed(delta, 1)} pts` : unit === "rank" ? `${delta == null ? "—" : delta > 0 ? "▲" : delta < 0 ? "▼" : ""} ${delta == null ? "" : Math.abs(delta).toFixed(1)}` : signed(delta, 3)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "block text-[11px] text-muted tabular",
			children: [
				before,
				" → ",
				after
			]
		})]
	});
}
function MetricCells({ c }) {
	const d = deltas(c);
	const b = c.before;
	const a = c.after;
	if (c.status !== "compared" || !b || !a) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		colSpan: 4,
		className: "px-2 py-2 text-xs text-muted",
		children: c.status === "too-new" ? "Not compared yet: a coach needs at least two completed seasons." : "Not compared: the program has no usable before window."
	});
	const r1 = (v) => v == null ? "—" : v.toFixed(1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: "px-2 py-2 text-right",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
				before: pctText(b.winPct),
				after: pctText(a.winPct),
				delta: d.win,
				unit: "pts"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: "px-2 py-2 text-right",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
				before: r1(b.recRank),
				after: r1(a.recRank),
				delta: d.rec,
				unit: "rank"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: "px-2 py-2 text-right",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
				before: r1(b.talentRank),
				after: r1(a.talentRank),
				delta: d.tal,
				unit: "rank"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: "px-2 py-2 text-right",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
				before: signed(b.netEpa, 3),
				after: signed(a.netEpa, 3),
				delta: d.epa
			})
		})
	] });
}
function CoachCard({ c, teams, open, toggle }) {
	const t = teams[c.slug];
	const d = deltas(c);
	const b = c.before;
	const a = c.after;
	const r1 = (v) => v == null ? "—" : v.toFixed(1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		"data-coach": c.slug,
		className: "scroll-mt-32 px-4 py-3",
		"data-testid": "coach-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: toggle,
				"aria-expanded": open,
				className: "flex w-full items-start gap-2 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Who, {
					c,
					t,
					slug: c.slug
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-auto shrink-0 text-right text-[11px] text-muted",
					children: t?.hxRank ? `HX #${t.hxRank}` : ""
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: windowText(c)
			}),
			c.status === "compared" && b && a ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-2 grid grid-cols-2 gap-1.5 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Win %",
						before: pctText(b.winPct),
						after: pctText(a.winPct),
						text: `${signed(d.win, 1)} pts`,
						delta: d.win
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Class rank",
						before: r1(b.recRank),
						after: r1(a.recRank),
						text: d.rec == null ? "—" : `${d.rec > 0 ? "▲" : d.rec < 0 ? "▼" : ""} ${Math.abs(d.rec).toFixed(1)}`,
						delta: d.rec
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Talent rank",
						before: r1(b.talentRank),
						after: r1(a.talentRank),
						text: d.tal == null ? "—" : `${d.tal > 0 ? "▲" : d.tal < 0 ? "▼" : ""} ${Math.abs(d.tal).toFixed(1)}`,
						delta: d.tal
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Net adj EPA",
						before: signed(b.netEpa, 3),
						after: signed(a.netEpa, 3),
						text: signed(d.epa, 3),
						delta: d.epa
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: c.status === "too-new" ? "Listed, not compared: needs at least two completed seasons." : "Listed, not compared: no usable before window."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: toggle,
				"aria-expanded": open,
				className: "mt-2 inline-flex h-9 items-center rounded-lg bg-raised px-3 text-xs text-fg hover:bg-border",
				children: open ? "Hide details" : "Seasons, prior stops & notes"
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
				c,
				teams
			}) : null
		]
	});
}
function Stat({ k, before, after, text, delta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0 rounded bg-raised/60 px-2 py-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-[10px] uppercase tracking-wide text-fg/80",
				children: k
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: cn("font-display text-base tabular", tone(delta, 1e-4)),
				children: text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
				className: "text-[11px] text-muted tabular",
				children: [
					before,
					" → ",
					after
				]
			})
		]
	});
}
function Detail({ c, teams }) {
	const t = teams[c.slug];
	const winLine = (label, w) => w ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-raised/60 px-3 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] uppercase tracking-wide text-fg/80",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "tabular text-sm",
				children: [
					recordText(w),
					" · ",
					pctText(w.winPct),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted",
						children: [
							"(",
							yearsText(w.years),
							")"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted tabular",
				children: [
					"Class rank ",
					w.recRank == null ? "—" : w.recRank.toFixed(1),
					" (",
					w.recPts == null ? "—" : w.recPts.toFixed(0),
					" pts) · talent rank ",
					w.talentRank == null ? "—" : w.talentRank.toFixed(1),
					" · off ",
					signed(w.offEpa, 3),
					" / def ",
					signed(w.defEpa, 3),
					" EPA"
				]
			})
		]
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 space-y-3 text-sm",
		"data-testid": "coach-detail",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 sm:grid-cols-3",
				children: [
					c.status === "compared" ? winLine(`Before (${c.n} seasons)`, c.before) : null,
					c.status === "compared" ? winLine(`Under ${c.name.split(" ").slice(-1)[0]} (first ${c.n})`, c.after) : null,
					c.tenure && (c.completed > c.n || c.status !== "compared") ? winLine(`Full tenure (${c.completed} completed seasons)`, c.tenure) : null
				]
			}),
			c.notes.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1 text-xs text-muted",
				children: c.notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", n] }, n))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-1 text-[11px] uppercase tracking-wide text-muted",
				children: "Prior FBS head-coaching stops (CFBD, 2005 on)"
			}), c.prior.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "text-xs",
				children: c.prior.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "tabular",
					children: [
						p.school,
						" ",
						yearsText([p.from, p.to]),
						": ",
						recordText(p)
					]
				}, p.school + p.from))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "None in the CFBD record since 2005. FCS, NFL and other stops are not in this source, so a blank is not a claim there were none."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeasonTable, { c }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/teams/$slug",
					params: { slug: c.slug },
					className: "text-accent hover:underline",
					children: [t?.name ?? c.school, " team page →"]
				})
			})
		]
	});
}
var ROLE = {
	before: "before",
	earlier: "earlier",
	transition: "transition",
	tenure: "under him",
	"2026": "2026"
};
function SeasonTable({ c }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-full overflow-x-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[30rem] text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border text-left text-[10px] uppercase tracking-wide text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-1 pr-2 font-medium",
						children: "Season"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-1 py-1 font-medium",
						children: "Role"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-1 py-1 text-right font-medium",
						children: "Record"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-1 py-1 text-right font-medium",
						children: "Class"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-1 py-1 text-right font-medium",
						children: "Talent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-1 py-1 text-right font-medium",
						children: "Off EPA"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-1 py-1 text-right font-medium",
						children: "Def EPA"
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: c.seasons.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: cn("border-b border-border/50 tabular", s.win ? "text-fg" : "text-muted"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-1 pr-2",
						children: s.y
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "px-1 py-1",
						children: [ROLE[s.who], s.win ? " ✓" : ""]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-1 py-1 text-right",
						children: recordText(s)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-1 py-1 text-right",
						children: s.rec ? `#${s.rec[0]}` : "NR"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-1 py-1 text-right",
						children: s.tal ? `#${s.tal[0]}` : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-1 py-1 text-right",
						children: s.epa ? signed(s.epa.off, 3) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-1 py-1 text-right",
						children: s.epa ? signed(s.epa.de, 3) : "—"
					})
				]
			}, s.y)) })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-[11px] text-muted",
			children: "✓ = season counted in the matched windows. Def EPA is EPA allowed per play, so lower is better."
		})]
	});
}
function Method({ file }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6 rounded-xl border border-border/70 px-4 py-4 text-sm text-muted",
		"data-testid": "coach-method",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 font-display text-xl tracking-wide text-fg",
				children: "How this is built"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-1.5 leading-relaxed",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "Coaches."
					}), " The 138 FBS head coaches CFBD lists for 2026. A coach counts from the first season he coached at least 75% of the team's games. A season he started partway through (interim or midseason hire) is shown and left out of both windows."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: "Windows."
						}),
						" Up to ",
						file.maxMatch,
						" seasons right before he arrived against his first ",
						file.maxMatch,
						" completed seasons, matched in length (never fewer than ",
						file.minSeasons,
						"). ",
						file.lastCompleted,
						" is the last completed season; 2026 is in progress and not in any window. Full-tenure numbers are in each coach's detail."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: "Minimum tenure."
						}),
						" At least ",
						file.minSeasons,
						" completed seasons to be compared. Newer coaches are listed under All, marked too new. Coaches hired before 2005 have no before window in this data."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "Win %."
					}), " Team win-loss totals including bowls and playoffs, from CFBD /records; ties count half. The 2020 season is included as played. Win % changes are in percentage points."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "Recruiting."
					}), " 247Sports Composite national class rank (CFBD), averaged over the class years that match the season windows (his first class is the class signed in his first season). Class rank is the average rank: a lower number is better, and the arrow shows rank positions gained (▲) or lost (▼)."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "Talent."
					}), " 247Sports Team Talent Composite rank among FBS teams (CFBD /talent, 2015 on), averaged the same way. Blank when the window starts before 2015. Roster talent lags recruiting, so a new coach inherits most of year one."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "Net adj EPA."
					}), " HASHMARK's opponent-adjusted offense EPA/play minus defense EPA allowed per play (the same adjustment as /stats), FBS vs FBS, 2016 on. Blank when the window starts before 2016."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "HX now."
					}), " Today's HX rank, for context only. HX is not recomputed for past seasons and nothing here is blended into it."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "Left out on purpose."
					}), " Transfer-portal class ranks: no credible, citable source we can pull (247 blocks automated access and CFBD has no team portal ranking), so none are shown. NCAA sanctions, injuries, conference moves and coordinator changes are not tracked here; a change is not proof the coach caused it. Prior head-coaching stops come from CFBD (FBS, 2005 on), so FCS, NFL and earlier stops are missing."] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs",
				children: "Sources:"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-1 list-disc space-y-0.5 pl-5 text-xs",
				children: file.sources.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					s.label,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: s.url,
						target: "_blank",
						rel: "noreferrer",
						className: "underline underline-offset-2 hover:text-fg",
						children: "link"
					})
				] }, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs",
				children: [
					"Built ",
					file.built,
					". Related: ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/coordinators",
						className: "text-accent hover:underline",
						children: "Best coordinators"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/recruiting",
						className: "text-accent hover:underline",
						children: "Recruiting"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/talent",
						className: "text-accent hover:underline",
						children: "Talent"
					}),
					"."
				]
			})
		]
	});
}
//#endregion
export { CoachesPage as component };
