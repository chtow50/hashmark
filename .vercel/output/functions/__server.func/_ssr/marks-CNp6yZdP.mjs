import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as cn, j as fmtNum, k as deltaVsAp } from "./router-DoDUm557.mjs";
import { n as TeamLogo, r as hasTeamLogo } from "./team-logo-5LKu-lW2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marks-CNp6yZdP.js
var import_jsx_runtime = require_jsx_runtime();
function TeamSwatch({ color, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-block shrink-0 rounded-sm", className ?? "h-5 w-1.5"),
		style: { background: color },
		"aria-hidden": true
	});
}
/** Color bar + optional logo — fails soft to swatch-only when asset missing. */
function TeamMark({ slug, color, swatchClassName, logoSize = 18, className }) {
	const showLogo = hasTeamLogo(slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex shrink-0 items-center", showLogo ? "gap-1.5" : "", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSwatch, {
			color,
			className: swatchClassName
		}), showLogo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamLogo, {
			slug,
			size: logoSize
		}) : null]
	});
}
function TeamLink({ slug, name, color, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/teams/$slug",
		params: { slug },
		className: cn("inline-flex min-h-11 items-center gap-2.5 text-fg hover:text-accent", "transition-colors duration-150", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
			slug,
			color
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium tracking-tight",
			children: name
		})]
	});
}
function RankNum({ rank, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("font-display tabular text-muted", className),
		children: rank
	});
}
function RankMove({ delta }) {
	if (delta == null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-xs tabular text-faint",
		children: "—"
	});
	if (delta === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-xs tabular text-faint",
		children: "even"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-xs tabular text-muted",
		children: delta > 0 ? `↑${delta}` : `↓${-delta}`
	});
}
function RankSpark({ values, className }) {
	const nums = values.filter((v) => typeof v === "number" && Number.isFinite(v));
	if (nums.length < 2) return null;
	const w = 72;
	const h = 22;
	const max = Math.max(80, ...nums);
	const pts = values.map((v, i) => {
		if (v == null || !Number.isFinite(v)) return null;
		const x = i / Math.max(values.length - 1, 1) * 68 + 2;
		const y = 2 + (v - 1) / (max - 1) * 18;
		return `${x.toFixed(1)},${y.toFixed(1)}`;
	}).filter(Boolean).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: `0 0 ${w} ${h}`,
		className: cn("h-5 w-20 text-accent", className),
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.5",
			points: pts
		})
	});
}
function DeskChip({ children, tone = "muted" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex h-6 items-center rounded-full px-2 text-[11px] uppercase tracking-[0.12em]", tone === "accent" && "bg-accent text-accent-fg", tone === "warn" && "bg-raised text-warn", tone === "muted" && "bg-raised text-muted"),
		children
	});
}
function DeltaChip({ hxRank, apRank }) {
	const d = deltaVsAp(hxRank, apRank);
	if (d.kind === "even") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-xs text-faint tabular",
		children: "AP even"
	});
	if (d.kind === "nr") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-xs text-faint",
		children: "AP NR"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("text-xs tabular", d.kind === "up" ? "text-up" : "text-down"),
		children: [
			d.kind === "up" ? "↑" : "↓",
			" ",
			Math.abs(d.value),
			" vs AP"
		]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] uppercase tracking-[0.14em] text-faint",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 font-display text-xl tabular leading-none whitespace-nowrap text-fg sm:text-2xl",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-xs text-muted",
				children: hint
			}) : null
		]
	});
}
function CompareRow({ label, a, b, max, format, invert, aTeam, bTeam }) {
	const aWin = invert ? a < b : a > b;
	const bWin = invert ? b < a : b > a;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[1fr_7.5rem_1fr] items-center gap-3 py-2.5 sm:grid-cols-[1fr_8rem_1fr]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-col items-end gap-1",
				children: [
					aTeam ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
						slug: aTeam.slug,
						color: aTeam.color,
						logoSize: 16,
						swatchClassName: "h-4 w-1"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("text-sm tabular", aWin ? "text-fg" : "text-muted"),
						children: format(a)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1 w-full overflow-hidden rounded-full bg-raised",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("ml-auto h-full rounded-full", aWin ? "bg-accent" : "bg-faint"),
							style: { width: `${Math.min(100, a / max * 100)}%` }
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center text-[11px] uppercase tracking-[0.12em] text-faint",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-col items-start gap-1",
				children: [
					bTeam ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
						slug: bTeam.slug,
						color: bTeam.color,
						logoSize: 16,
						swatchClassName: "h-4 w-1"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("text-sm tabular", bWin ? "text-fg" : "text-muted"),
						children: format(b)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1 w-full overflow-hidden rounded-full bg-raised",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("h-full rounded-full", bWin ? "bg-accent" : "bg-faint"),
							style: { width: `${Math.min(100, b / max * 100)}%` }
						})
					})
				]
			})
		]
	});
}
function MixBar({ leftPct, leftLabel, rightLabel }) {
	const left = Math.max(0, Math.min(100, leftPct));
	const right = 100 - left;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1.5 flex justify-between text-[11px] uppercase tracking-[0.12em] text-faint",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			leftLabel,
			" ",
			fmtNum(left, 0),
			"%"
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			rightLabel,
			" ",
			fmtNum(right, 0),
			"%"
		] })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-1.5 overflow-hidden rounded-full bg-raised",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full bg-accent",
			style: { width: `${left}%` }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full bg-faint",
			style: { width: `${right}%` }
		})]
	})] });
}
function WinBar({ homePct, homeName, awayName }) {
	const home = Math.round(homePct * 1e3) / 10;
	const away = Math.round((100 - home) * 10) / 10;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-2 flex items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] uppercase tracking-[0.14em] text-faint",
			children: homeName
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "font-display text-3xl tabular leading-none",
			children: [fmtNum(home, 1), "%"]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-right",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] uppercase tracking-[0.14em] text-faint",
				children: awayName
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "font-display text-3xl tabular leading-none",
				children: [fmtNum(away, 1), "%"]
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-2 overflow-hidden rounded-full bg-raised",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full bg-accent",
			style: { width: `${home}%` }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full bg-faint",
			style: { width: `${away}%` }
		})]
	})] });
}
//#endregion
export { RankMove as a, Stat as c, TeamSwatch as d, WinBar as f, MixBar as i, TeamLink as l, DeltaChip as n, RankNum as o, DeskChip as r, RankSpark as s, CompareRow as t, TeamMark as u };
