import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as fmtHeight, v as fmtNum } from "./router-DJlRrram.mjs";
import { t as POS_ORDER } from "./positions-BXGdtgxF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/roster-duel-RLEH9DLA.js
var import_jsx_runtime = require_jsx_runtime();
function group(players) {
	const map = /* @__PURE__ */ new Map();
	for (const p of players) {
		const list = map.get(p.position) ?? [];
		list.push(p);
		map.set(p.position, list);
	}
	for (const list of map.values()) list.sort((a, b) => a.depth - b.depth || a.name.localeCompare(b.name));
	return map;
}
function positionsOf(a, b) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const pos of POS_ORDER) if (a.has(pos) || b?.has(pos)) {
		out.push(pos);
		seen.add(pos);
	}
	for (const pos of a.keys()) if (!seen.has(pos)) {
		out.push(pos);
		seen.add(pos);
	}
	if (b) {
		for (const pos of b.keys()) if (!seen.has(pos)) out.push(pos);
	}
	return out;
}
function RosterDuel({ home, away, homeName, awayName }) {
	const h = group(home);
	const a = group(away);
	const rows = [];
	for (const pos of positionsOf(h, a)) {
		const ln = h.get(pos)?.length ?? 0;
		const rn = a.get(pos)?.length ?? 0;
		const n = Math.max(ln, rn, 0);
		for (let i = 0; i < n; i++) rows.push({
			pos,
			left: h.get(pos)?.[i],
			right: a.get(pos)?.[i]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[640px] text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-line text-[11px] uppercase tracking-[0.14em] text-faint",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 pr-3 font-medium",
						children: homeName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 px-2 text-center font-medium",
						children: "Pos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 pl-3 font-medium text-right",
						children: awayName
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-line last:border-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3 pr-3 align-top",
						children: row.left ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerCell, { p: row.left }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-faint",
							children: "—"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-2 py-3 text-center font-mono text-xs text-muted",
						children: row.pos
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3 pl-3 text-right align-top",
						children: row.right ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerCell, {
							p: row.right,
							align: "right"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-faint",
							children: "—"
						})
					})
				]
			}, `${row.pos}-${i}`)) })]
		})
	});
}
function jerseyLabel(n) {
	if (n == null || Number.isNaN(n)) return "";
	return `#${n}`;
}
function PlayerCell({ p, align }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: align === "right" ? "text-right" : "",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "font-medium text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mr-1 font-mono text-xs text-faint",
					children: jerseyLabel(p.jersey)
				}),
				p.name,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-normal text-faint",
					children: [
						p.classYear,
						" · ",
						p.stars,
						"-star",
						p.transfer ? " · TR" : ""
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-0.5 text-xs tabular text-muted",
			children: [
				fmtHeight(p.heightIn),
				" · ",
				fmtNum(p.weightLbs, 0),
				" lb · ",
				p.hometownState
			]
		})]
	});
}
function RosterList({ players }) {
	const offense = players.filter((p) => p.unit === "OFF");
	const defense = players.filter((p) => p.unit === "DEF");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TwoDeepTable, {
			title: "Offense",
			players: offense
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TwoDeepTable, {
			title: "Defense",
			players: defense
		})]
	});
}
function TwoDeepTable({ title, players }) {
	const g = group(players);
	const rows = positionsOf(g).map((pos) => {
		const list = g.get(pos) ?? [];
		return {
			pos,
			one: list[0],
			two: list[1]
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mb-3 font-display text-xl tracking-wide",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3 sm:hidden",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "border-b border-line pb-3 last:border-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-xs text-muted",
					children: row.pos
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1.5 space-y-1.5",
					children: [row.one ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthName, { p: row.one }) : null, row.two ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthName, { p: row.two }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-faint",
						children: "—"
					})]
				})]
			}, row.pos))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hidden overflow-x-auto sm:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line text-[11px] uppercase tracking-[0.14em] text-faint",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-14 py-2 pr-2 font-medium",
							children: "Pos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-2 font-medium",
							children: "1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 font-medium",
							children: "2"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line last:border-0 align-top",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5 pr-2 font-mono text-xs text-muted",
							children: row.pos
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5 pr-3",
							children: row.one ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthName, { p: row.one }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-faint",
								children: "—"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5",
							children: row.two ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthName, { p: row.two }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-faint",
								children: "—"
							})
						})
					]
				}, row.pos)) })]
			})
		})
	] });
}
function DepthName({ p }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "font-medium",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mr-1 font-mono text-xs text-faint",
				children: jerseyLabel(p.jersey)
			}),
			p.name,
			p.transfer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-1.5 font-mono text-xs text-faint",
				children: "TR"
			}) : null
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-xs text-muted",
		children: [
			p.classYear,
			" · ",
			fmtHeight(p.heightIn),
			" · ",
			fmtNum(p.weightLbs, 0),
			" lb · ",
			p.hometownState
		]
	})] });
}
//#endregion
export { RosterList as n, RosterDuel as t };
