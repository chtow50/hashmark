import { o as __toESM } from "../_runtime.mjs";
import { c as todayChicago, i as formatKickDayTitle, r as formatKickCt, s as predictMatchup } from "./chicago-ClRwnsKl.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ChevronRight, o as ChevronLeft } from "../_libs/lucide-react.mjs";
import { C as PageHead, D as cn, S as ConfPills, c as defaultWeek, g as favoriteLine, j as fmtPct, s as Route$5, w as Panel, x as Button, y as formatVegas } from "./router-CSFOaWQO.mjs";
import { r as DeskChip, u as TeamMark } from "./marks-DHZQbUpe.mjs";
import { n as matchupChips, t as isWinnerFlip } from "./schedule-flags-D3GOZ0hO.mjs";
import { a as isVegasOnlyFcs } from "./fcs-stubs-C9MJUh8O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schedule-GPwjfQTR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var VIEW_OPTIONS = [
	{
		key: "top25",
		label: "Top 25"
	},
	{
		key: "conf",
		label: "Conference"
	},
	{
		key: "all",
		label: "All FBS"
	}
];
function searchForView(view, conf, week) {
	const base = { w: week === defaultWeek(todayChicago()) ? void 0 : week };
	if (view !== "top25") base.view = view;
	if (view === "conf" && conf !== "All") base.conf = conf;
	return base;
}
function SchedulePage() {
	const { week, games, filtered, view, conf } = Route$5.useLoaderData();
	const prev = week > 0 ? week - 1 : null;
	const next = week < 13 ? week + 1 : null;
	const emptyCopy = (0, import_react.useMemo)(() => {
		if (view === "top25") return {
			title: "No Top 25 games this week",
			body: "Nothing on the slate matches a team in the HX or Week 1 AP Top 25. Try All FBS or pick another week."
		};
		if (view === "conf" && conf !== "All") return {
			title: `No ${conf} games this week`,
			body: `Week ${week} has no matchups with a ${conf} team. Try another conference or switch to All FBS.`
		};
		if (view === "conf") return {
			title: "Pick a conference",
			body: "Choose a conference below to filter the slate."
		};
		return {
			title: "No FBS games on the 136",
			body: "This week has no HASHMARK matchup on the board."
		};
	}, [
		view,
		conf,
		week
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: `Week ${week} · The slate`,
			title: `Week ${week} slate`,
			lede: "HASHMARK spread and win% from HX. FCS opponents are unrated — Vegas close only, no invented HASHMARK spread. FINAL is locked on the tape. Sorted by kick, America/Chicago."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 flex gap-2 overflow-x-auto pb-1",
			role: "tablist",
			"aria-label": "Schedule filter",
			children: VIEW_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/schedule",
				search: searchForView(opt.key, conf, week),
				role: "tab",
				"aria-selected": view === opt.key,
				className: cn("inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm transition-colors duration-150", view === opt.key ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
				children: opt.label
			}, opt.key))
		}),
		view === "conf" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfPills, {
			value: conf,
			to: "/schedule",
			searchFor: (c) => ({
				view: "conf",
				...week !== defaultWeek(todayChicago()) ? { w: week } : {},
				...c === "All" ? {} : { conf: c }
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-4 text-xs tabular text-faint",
			children: [
				filtered.length,
				" of ",
				games.length,
				" games",
				view === "top25" ? " · Top 25" : null,
				view === "conf" && conf !== "All" ? ` · ${conf}` : null,
				view === "all" ? " · All FBS" : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex items-center justify-between gap-3",
			children: [
				prev !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/schedule",
						search: searchForView(view, conf, prev),
						"aria-label": `Week ${prev}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }),
							"Week ",
							prev
						]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					disabled: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), "Week 0"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-center font-mono text-[11px] uppercase tracking-[0.14em] text-faint",
					children: [
						"Week ",
						week,
						" · CT"
					]
				}),
				next !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/schedule",
						search: searchForView(view, conf, next),
						"aria-label": `Week ${next}`,
						children: [
							"Week ",
							next,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
						]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
			]
		}),
		filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl tracking-wide",
			children: emptyCopy.title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed text-muted",
			children: emptyCopy.body
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "overflow-hidden p-0 sm:p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-line",
				children: filtered.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScheduleRow, { game: g }, g.id))
			})
		})
	] });
}
function ScheduleRow({ game: g }) {
	const vegasOnly = isVegasOnlyFcs(g);
	const pred = vegasOnly ? null : predictMatchup({
		hxRating: g.homeHx,
		offenseRating: g.homeOff,
		defenseRating: g.homeDef
	}, {
		hxRating: g.awayHx,
		offenseRating: g.awayOff,
		defenseRating: g.awayDef
	}, { neutral: g.neutral });
	const hxLine = pred ? favoriteLine(g.homeShort, g.awayShort, pred.spread) : null;
	const hxWin = pred ? pred.spread >= 0 ? pred.homeWinPct : pred.awayWinPct : null;
	const vegasLine = g.vegasSpread == null ? null : favoriteLine(g.homeShort, g.awayShort, g.vegasSpread);
	const flip = pred ? isWinnerFlip(pred, g.vegasSpread) : false;
	const chips = pred ? matchupChips(pred, {
		neutral: g.neutral,
		vegasSpread: g.vegasSpread,
		status: g.status
	}) : [];
	const fbsSlug = g.homeSlug.startsWith("fcs-") ? g.awaySlug : g.homeSlug;
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-start justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						chips.map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskChip, {
							tone: chip.tone,
							children: chip.label
						}, chip.kind)),
						vegasOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskChip, {
							tone: "muted",
							children: "Vegas-only"
						}) : null,
						g.status === "final" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskChip, {
							tone: "accent",
							children: "Final"
						}) : null,
						g.headline === "IN_PROGRESS" && g.status !== "final" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskChip, {
							tone: "accent",
							children: "In progress"
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap items-center gap-x-2 gap-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
								slug: g.awaySlug,
								color: g.awayColor
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: g.awayName
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-faint",
							children: g.neutral ? "vs" : "@"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
								slug: g.homeSlug,
								color: g.homeColor
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: g.homeName
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						g.neutral ? "Neutral site" : null,
						g.neutral && g.location ? " · " : null,
						g.location,
						g.status === "final" && g.homeScore != null && g.awayScore != null ? ` · ${g.awayShort} ${g.awayScore}–${g.homeScore} ${g.homeShort}` : null
					]
				}),
				flip && hxLine ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-warn",
					children: [
						"HASHMARK takes ",
						hxLine,
						" · Vegas has ",
						vegasLine ?? "the other side"
					]
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "shrink-0 text-right font-mono text-sm tabular text-muted",
			children: [
				formatKickDayTitle(g.kickoffAt, g.kickoffDate),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				formatKickCt(g.kickoffAt),
				g.tv ? ` · ${g.tv}` : ""
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBlock, {
				label: "HASHMARK",
				value: vegasOnly ? "—" : hxLine && hxWin != null ? `${hxLine} · ${fmtPct(hxWin * 100, 1)}` : "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBlock, {
				label: "Vegas",
				value: formatVegas(vegasLine, g.vegasTotal)
			}),
			g.status === "final" && g.homeScore != null && g.awayScore != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBlock, {
				label: "FINAL",
				value: `${g.awayShort} ${g.awayScore}–${g.homeScore} ${g.homeShort}`
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBlock, {
				label: "Kick",
				value: g.tv ? `${formatKickCt(g.kickoffAt)} · ${g.tv}` : formatKickCt(g.kickoffAt),
				className: "hidden sm:block"
			})
		]
	})] });
	if (vegasOnly) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/teams/$slug",
		params: { slug: fbsSlug },
		className: "block px-4 py-4 transition-colors duration-150 hover:bg-raised sm:px-5",
		children: inner
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/matchup",
		search: {
			home: g.homeSlug,
			away: g.awaySlug,
			...g.neutral ? { neutral: true } : {}
		},
		className: "block px-4 py-4 transition-colors duration-150 hover:bg-raised sm:px-5",
		children: inner
	}) });
}
function StatBlock({ label, value, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] uppercase tracking-[0.14em] text-faint",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 font-display text-xl tabular leading-none text-fg sm:text-2xl",
			children: value
		})]
	});
}
//#endregion
export { SchedulePage as component };
