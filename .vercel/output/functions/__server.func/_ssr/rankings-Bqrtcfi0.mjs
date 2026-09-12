import { o as __toESM } from "../_runtime.mjs";
import { t as MODEL } from "./chicago-ClRwnsKl.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as fmtNum, C as PageHead, D as cn, N as inConf, S as ConfPills, d as Route$7, j as fmtPct, w as Panel } from "./router-CrZqY1zT.mjs";
import { n as DeltaChip, o as RankNum, u as TeamMark } from "./marks-DHZQbUpe.mjs";
import { n as formatSeasonRecord } from "./season-record-yFUvy0tH.mjs";
import { a as make12FromSim } from "./season-sim-1NMv-jPR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rankings-Bqrtcfi0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Rank col is w-16; Team sticks at that offset so names never slide under Off/Def. */
var STICKY_RANK = "sticky left-0 z-20 w-16 min-w-16 bg-surface";
var STICKY_TEAM = "sticky left-16 z-20 min-w-52 border-r border-line bg-surface";
function RankingsPage() {
	const teams = Route$7.useLoaderData();
	const conf = Route$7.useSearch().conf ?? "All";
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
			kicker: `Week 2 · HX ${MODEL.version}`,
			title: "Power rankings",
			lede: "Every FBS program, ranked by HX. Talent is listed two-deep composite, not class rank — TWO·DEEP / 247. Talent and prior-year SP+/Elo/SRS carry the real signal. Make 12 is make-field, not title odds; projected wins are Elo vs the 2026 slate. AP is Week 1 AP (Sept. 8)."
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
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "overflow-hidden p-0 sm:p-0",
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								onClick: () => toggle("hxRating"),
								active: sort === "hxRating",
								className: "border-b border-line",
								children: "Rating"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								onClick: () => toggle("apRank"),
								active: sort === "apRank",
								className: "border-b border-line",
								children: "AP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "border-b border-line px-3 py-3 font-medium",
								children: "Off / Def"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								onClick: () => toggle("projectedWins"),
								active: sort === "projectedWins",
								className: "border-b border-line",
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "border-b border-line px-3 py-3 tabular",
								children: fmtNum(t.hxRating, 2)
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "border-b border-line px-3 py-3 tabular text-muted",
								children: [
									fmtNum(t.offenseRating, 1),
									" / ",
									fmtNum(t.defenseRating, 1)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "border-b border-line px-3 py-3 tabular",
								children: fmtNum(t.projectedWins, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "border-b border-line px-3 py-3 tabular",
								children: fmtPct(make12FromSim(t.slug, t).makeField ?? t.playoffOdds, 1)
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
