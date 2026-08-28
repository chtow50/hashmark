import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Panel, h as cn, s as Route$4, u as PageHead, v as fmtNum, y as fmtPct } from "./router-DJlRrram.mjs";
import { a as RankNum, l as TeamSwatch, n as DeltaChip } from "./marks-Dv8OG6qB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rankings-B-vrRBPd.js
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
function RankingsPage() {
	const teams = Route$4.useLoaderData();
	const [conf, setConf] = (0, import_react.useState)("All");
	const [sort, setSort] = (0, import_react.useState)("hxRank");
	const [dir, setDir] = (0, import_react.useState)("asc");
	const filtered = (0, import_react.useMemo)(() => {
		const rows = conf === "All" ? teams : conf === "Group of Five" ? teams.filter((t) => G5.has(t.conference)) : teams.filter((t) => t.conference === conf);
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
			setDir(key === "hxRating" || key === "projectedWins" || key === "playoffOdds" || key === "talentScore" ? "desc" : "asc");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "HX Rating · Week 0",
			title: "Power rankings",
			lede: "Every FBS program in the HASHMARK database, ranked by HX. Offense and defense are internally scaled; playoff odds are simulated from the preseason slate."
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
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "overflow-hidden p-0 sm:p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[760px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								onClick: () => toggle("hxRank"),
								active: sort === "hxRank",
								children: "HX"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Team"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								onClick: () => toggle("hxRating"),
								active: sort === "hxRating",
								children: "Rating"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								onClick: () => toggle("apRank"),
								active: sort === "apRank",
								children: "AP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Off / Def"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								onClick: () => toggle("projectedWins"),
								active: sort === "projectedWins",
								children: "Proj W"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								onClick: () => toggle("playoffOdds"),
								active: sort === "playoffOdds",
								children: "CFP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								onClick: () => toggle("talentScore"),
								active: sort === "talentScore",
								children: "Talent"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line last:border-0 hover:bg-raised/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankNum, {
									rank: t.hxRank,
									className: "text-xl text-fg"
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
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block text-xs text-muted",
										children: [
											t.conference,
											" · ",
											t.lastWins,
											"–",
											t.lastLosses
										]
									})] })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtNum(t.hxRating, 2)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-3 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "tabular",
									children: t.apRank ?? "NR"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeltaChip, {
									hxRank: t.hxRank,
									apRank: t.apRank
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-3 py-3 tabular text-muted",
								children: [
									fmtNum(t.offenseRating, 1),
									" / ",
									fmtNum(t.defenseRating, 1)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtNum(t.projectedWins, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtPct(t.playoffOdds, 1)
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
function value(t, key) {
	if (key === "apRank") return t.apRank ?? 99;
	return t[key];
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
//#endregion
export { RankingsPage as component };
