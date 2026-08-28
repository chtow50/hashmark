import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as getStateDetail, d as Panel, h as cn, i as Route$2, u as PageHead, v as fmtNum } from "./router-DJlRrram.mjs";
import { l as TeamSwatch } from "./marks-Dv8OG6qB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/states-DaAjooAC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ROWS = [
	[
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		"ME"
	],
	[
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		"VT",
		"NH",
		null
	],
	[
		"WA",
		"ID",
		"MT",
		"ND",
		"MN",
		"WI",
		null,
		"MI",
		"NY",
		"MA",
		"RI"
	],
	[
		"OR",
		"NV",
		"WY",
		"SD",
		"IA",
		"IL",
		"IN",
		"OH",
		"PA",
		"NJ",
		"CT"
	],
	[
		"CA",
		"UT",
		"CO",
		"NE",
		"MO",
		"KY",
		"WV",
		"VA",
		"MD",
		"DE",
		null
	],
	[
		null,
		"AZ",
		"NM",
		"KS",
		"AR",
		"TN",
		"NC",
		"SC",
		"DC",
		null,
		null
	],
	[
		null,
		null,
		null,
		"OK",
		"LA",
		"MS",
		"AL",
		"GA",
		null,
		null,
		null
	],
	[
		null,
		null,
		null,
		"TX",
		null,
		null,
		null,
		"FL",
		null,
		"AK",
		"HI"
	]
];
function tone(index, max) {
	const t = max <= 0 ? 0 : index / max;
	if (t < .08) return "bg-raised text-faint";
	if (t < .25) return "bg-heat-1 text-muted";
	if (t < .5) return "bg-heat-2 text-muted";
	if (t < .75) return "bg-heat-3 text-fg";
	return "bg-accent text-accent-fg";
}
function StateMosaic({ states, selected, onSelect }) {
	const byCode = new Map(states.map((s) => [s.code, s]));
	const max = Math.max(...states.map((s) => s.talentIndex), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "inline-grid min-w-[520px] grid-cols-11 gap-1 sm:min-w-0 sm:w-full",
			children: ROWS.flatMap((row, ri) => row.map((code, ci) => {
				if (!code) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-square" }, `${ri}-${ci}`);
				const st = byCode.get(code);
				const active = selected === code;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onSelect(code),
					title: st ? `${st.name} · talent ${st.talentIndex}` : code,
					className: cn("aspect-square rounded-md text-[10px] font-medium tabular transition-[box-shadow,transform] duration-150 sm:text-xs", tone(st?.talentIndex ?? 0, max), active && "ring-2 ring-fg ring-offset-1 ring-offset-bg"),
					children: code
				}, code);
			}))
		})
	});
}
function StatesPage() {
	const states = Route$2.useLoaderData();
	const search = Route$2.useSearch();
	const navigate = Route$2.useNavigate();
	const code = search.code ?? "TX";
	const [detail, setDetail] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let live = true;
		getStateDetail({ data: { code } }).then((d) => {
			if (live) setDetail(d);
		});
		return () => {
			live = false;
		};
	}, [code]);
	function select(next) {
		navigate({ search: { code: next } });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "Pipelines",
			title: "The states",
			lede: "Where the 2026 class comes from, which FBS programs live there, and who is harvesting the state."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateMosaic, {
				states,
				selected: code,
				onSelect: select
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-faint",
				children: "Heat is talent index — volume, five-stars, and average composite rating of HASHMARK-tracked recruits."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: detail?.state?.name ?? code
				}),
				detail?.state ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-4 grid grid-cols-2 gap-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[11px] uppercase tracking-[0.14em] text-faint",
							children: "Recruits"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-display text-2xl tabular",
							children: detail.state.recruits
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[11px] uppercase tracking-[0.14em] text-faint",
							children: "Five-stars"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-display text-2xl tabular",
							children: detail.state.fiveStars
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[11px] uppercase tracking-[0.14em] text-faint",
							children: "Avg rating"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-display text-2xl tabular",
							children: fmtNum(detail.state.avgRating, 1)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[11px] uppercase tracking-[0.14em] text-faint",
							children: "FBS teams"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-display text-2xl tabular",
							children: detail.state.teamCount
						})] })
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "Loading pipeline…"
				}),
				detail && detail.teams.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[11px] uppercase tracking-[0.14em] text-faint",
						children: "Programs in state"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2",
						children: detail.teams.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/teams/$slug",
							params: { slug: t.slug },
							className: "flex min-h-11 items-center gap-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSwatch, { color: t.color_primary }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: t.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted",
									children: [
										"HX #",
										t.hx_rank,
										" · ",
										t.city
									]
								})
							]
						}) }, t.slug))
					})]
				}) : null
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Who signed them"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 mb-4 text-sm text-muted",
					children: [
						"Tracked starters whose hometown is ",
						code,
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: (detail?.commits ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3 border-b border-line py-2.5 last:border-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/teams/$slug",
						params: { slug: c.teamSlug },
						className: "flex min-h-11 items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSwatch, { color: c.colorPrimary }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium",
							children: c.teamName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs text-muted",
							children: c.conference
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular text-sm",
						children: c.commits
					})]
				}, c.teamSlug)) })
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "mt-6 overflow-hidden p-0 sm:p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[560px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line text-[11px] uppercase tracking-[0.12em] text-faint",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "State"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Region"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Recruits"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "5-st"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Avg"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 font-medium",
								children: "Index"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: states.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "cursor-pointer border-b border-line last:border-0 hover:bg-raised/60",
						onClick: () => select(s.code),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "min-h-11 text-left font-medium",
									children: [
										s.name,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-faint",
											children: s.code
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 text-muted",
								children: s.region
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: s.recruits
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: s.fiveStars
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtNum(s.avgRating, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 tabular",
								children: fmtNum(s.talentIndex, 1)
							})
						]
					}, s.code)) })]
				})
			})
		})
	] });
}
//#endregion
export { StatesPage as component };
