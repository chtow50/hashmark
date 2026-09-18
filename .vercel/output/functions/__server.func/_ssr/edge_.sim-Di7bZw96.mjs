import { o as __toESM } from "../_runtime.mjs";
import { n as MODEL } from "./fcs-stubs-DntyZ00F.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Minus, i as Plus } from "../_libs/lucide-react.mjs";
import { r as DeskChip } from "./marks-D4lVI_VV.mjs";
import { $ as Panel, G as Button, Q as PageHead, Y as EdgeBuyButton, at as fmtNum, c as SCENARIO_SIM_GOLDEN_EVENT_ID, d as formatScenarioError, f as isScenarioSimUnlocked, i as Route$3, l as SCENARIO_SIM_GOLDEN_FORCE, m as runDemoScenarioSim, nt as cn, o as SCENARIO_SIM_DEMO_LABEL, ot as fmtPct, p as loadScenarioSimGoldenRequest, q as EDGE, s as SCENARIO_SIM_GOLDEN_BUMP, u as buildScenarioRequest } from "./router-D3T1CaOX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edge_.sim-Di7bZw96.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var METRIC_COLS = [
	{
		key: "make_field",
		label: "Make field",
		kind: "pct",
		digits: 2
	},
	{
		key: "win_title",
		label: "Win title",
		kind: "pct",
		digits: 2
	},
	{
		key: "proj_wins",
		label: "Proj. wins",
		kind: "num",
		digits: 2
	},
	{
		key: "conf_title",
		label: "Conf. title",
		kind: "pct",
		digits: 1
	}
];
function newRow(teams, seed, golden = false) {
	const home = teams.find((t) => t.slug === SCENARIO_SIM_GOLDEN_FORCE.home_slug) ?? teams[0];
	const away = teams.find((t) => t.slug === SCENARIO_SIM_GOLDEN_FORCE.away_slug) ?? teams[1] ?? teams[0];
	return {
		key: `fw-${seed}`,
		week: String(SCENARIO_SIM_GOLDEN_FORCE.week ?? 4),
		espnEventId: golden ? SCENARIO_SIM_GOLDEN_EVENT_ID : "",
		homeSlug: home?.slug ?? SCENARIO_SIM_GOLDEN_FORCE.home_slug,
		awaySlug: away?.slug ?? SCENARIO_SIM_GOLDEN_FORCE.away_slug,
		winner: "away",
		note: golden ? SCENARIO_SIM_GOLDEN_FORCE.note ?? "" : ""
	};
}
function fmtMetric(value, kind, digits) {
	return kind === "pct" ? fmtPct(value, digits) : fmtNum(value, digits);
}
function deltaClass(n) {
	if (n > 0) return "text-up";
	if (n < 0) return "text-down";
	return "text-faint";
}
function signed(n, formatted) {
	if (n > 0) return `+${formatted}`;
	return formatted;
}
function ScenarioSimGate({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.18em] text-faint",
				children: "HX Edge Pack"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-2xl tracking-wide",
				children: "Scenario Sim (preview / offline)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: "Offline desk fixture — not this week’s paid pack. Soft unlock is a query flag until Checkout returns a token. No site login. The public board still shows one Make 12 cell."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EdgeBuyButton, {
					kind: "week",
					label: `Buy · ${EDGE.weekLabel}`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EdgeBuyButton, {
					kind: "month",
					label: `Buy · ${EDGE.monthLabel}`
				})]
			})
		]
	});
}
function ScenarioSimPanel({ teams, className }) {
	const golden = loadScenarioSimGoldenRequest();
	const [rows, setRows] = (0, import_react.useState)(() => [newRow(teams, 1, true)]);
	const [bump, setBump] = (0, import_react.useState)({
		on: true,
		teamSlug: teams.find((t) => t.slug === SCENARIO_SIM_GOLDEN_BUMP.team_slug)?.slug ?? teams[0]?.slug ?? SCENARIO_SIM_GOLDEN_BUMP.team_slug,
		deltaHx: String(SCENARIO_SIM_GOLDEN_BUMP.delta_hx),
		note: SCENARIO_SIM_GOLDEN_BUMP.note ?? ""
	});
	const [returnSlugs, setReturnSlugs] = (0, import_react.useState)(() => golden.return.teams.join(", "));
	const [error, setError] = (0, import_react.useState)(null);
	const [request, setRequest] = (0, import_react.useState)(golden);
	const [response, setResponse] = (0, import_react.useState)(() => runDemoScenarioSim(golden));
	const canAddForce = rows.length + (bump.on ? 1 : 0) < 3;
	const canEnableBump = rows.length < 3;
	const nameBySlug = (0, import_react.useMemo)(() => {
		return new Map(teams.map((t) => [t.slug, t.name]));
	}, [teams]);
	function setRow(key, patch) {
		setRows((cur) => cur.map((row) => row.key === key ? {
			...row,
			...patch
		} : row));
	}
	function collectOverrides() {
		const list = rows.map((row) => {
			const weekNum = Number.parseInt(row.week, 10);
			const ov = {
				type: "force_winner",
				home_slug: row.homeSlug,
				away_slug: row.awaySlug,
				winner_slug: row.winner === "home" ? row.homeSlug : row.awaySlug
			};
			if (Number.isFinite(weekNum)) ov.week = weekNum;
			if (row.espnEventId.trim()) ov.espn_event_id = row.espnEventId.trim();
			if (row.note.trim()) ov.note = row.note.trim();
			return ov;
		});
		if (bump.on) {
			const delta = Number.parseFloat(bump.deltaHx);
			const ov = {
				type: "hx_bump",
				team_slug: bump.teamSlug,
				delta_hx: Number.isFinite(delta) ? delta : 0
			};
			if (bump.note.trim()) ov.note = bump.note.trim();
			list.push(ov);
		}
		return list;
	}
	function run() {
		const teamsWanted = returnSlugs.split(/[,\s]+/).map((s) => s.trim().toLowerCase()).filter(Boolean);
		const built = buildScenarioRequest({
			overrides: collectOverrides(),
			teams: teamsWanted.length ? teamsWanted : golden.return.teams,
			seed: golden.seed
		});
		if (!built.ok) {
			setError(formatScenarioError(built.error));
			setRequest(null);
			setResponse(null);
			return;
		}
		const demo = runDemoScenarioSim(built.request);
		if (!demo.ok) {
			setError(formatScenarioError(demo.error));
			setRequest(built.request);
			setResponse(demo);
			return;
		}
		setError(null);
		setRequest(built.request);
		setResponse(demo);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("space-y-6", className),
		children: [
			response ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioSimResult, {
				response,
				nameBySlug
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskChip, { children: "preview / offline" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskChip, { children: "desk fixture" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-2xl tracking-wide",
					children: "Scenario Sim (preview / offline)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: [
						"Pin one to three overrides (`force_winner` + `hx_bump`), then read baseline vs scenario vs Δ. This desk run is a ",
						SCENARIO_SIM_DEMO_LABEL,
						". Not this week’s paid pack. Not a lock, not a guarantee, and not ROI."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 space-y-4",
					children: rows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForceWinnerEditor, {
						index,
						row,
						teams,
						onChange: (patch) => setRow(row.key, patch),
						onRemove: rows.length > 1 ? () => setRows((cur) => cur.filter((r) => r.key !== row.key)) : void 0
					}, row.key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						disabled: !canAddForce,
						onClick: () => setRows((cur) => [...cur, newRow(teams, Date.now())]),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Force winner"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HxBumpEditor, {
					bump,
					teams,
					disabled: !bump.on && !canEnableBump,
					onChange: setBump
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-5 block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-2 block text-[11px] uppercase tracking-[0.14em] text-faint",
						children: "Return teams"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: returnSlugs,
						onChange: (e) => setReturnSlugs(e.target.value),
						spellCheck: false,
						className: "h-12 w-full rounded-lg bg-raised px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-faint focus:shadow-[var(--shadow-border-hover)]",
						"aria-label": "Return team slugs"
					})]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-down",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					className: "mt-5 w-full sm:w-auto",
					onClick: run,
					children: "Run scenario"
				})
			] }),
			request ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.18em] text-faint",
					children: "Request"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: SCENARIO_SIM_DEMO_LABEL
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-3 max-h-64 overflow-auto rounded-lg bg-inset p-4 font-mono text-xs leading-relaxed text-muted",
					children: JSON.stringify(request, null, 2)
				})
			] }) : null
		]
	});
}
function ForceWinnerEditor({ index, row, teams, onChange, onRemove }) {
	const home = teams.find((t) => t.slug === row.homeSlug);
	const away = teams.find((t) => t.slug === row.awaySlug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-raised/60 p-3 shadow-[var(--shadow-border)] sm:p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.18em] text-faint",
				children: ["Force winner ", index + 1]
			}), onRemove ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onRemove,
				className: "inline-flex size-11 items-center justify-center text-muted hover:text-fg",
				"aria-label": `Remove force winner ${index + 1}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-2 block text-[11px] uppercase tracking-[0.14em] text-faint",
						children: "Week"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 1,
						max: 15,
						value: row.week,
						onChange: (e) => onChange({ week: e.target.value }),
						className: "h-12 w-full rounded-md bg-inset px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none focus:shadow-[var(--shadow-border-hover)]"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-2 block text-[11px] uppercase tracking-[0.14em] text-faint",
						children: "ESPN event"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: row.espnEventId,
						onChange: (e) => onChange({ espnEventId: e.target.value }),
						spellCheck: false,
						placeholder: "401856700",
						className: "h-12 w-full rounded-md bg-inset px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-faint focus:shadow-[var(--shadow-border-hover)]",
						"aria-label": "ESPN event id"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamNativeSelect, {
					label: "Home",
					value: row.homeSlug,
					teams,
					onChange: (homeSlug) => onChange({
						homeSlug,
						winner: row.winner === "home" ? "home" : row.winner
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamNativeSelect, {
					label: "Away",
					value: row.awaySlug,
					teams,
					onChange: (awaySlug) => onChange({ awaySlug })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-2 block text-[11px] uppercase tracking-[0.14em] text-faint",
						children: "Winner"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: row.winner,
						onChange: (e) => onChange({ winner: e.target.value }),
						className: "h-12 w-full rounded-md bg-inset px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none focus:shadow-[var(--shadow-border-hover)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "home",
							children: home?.name ?? "Home"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "away",
							children: away?.name ?? "Away"
						})]
					})]
				})
			]
		})]
	});
}
function HxBumpEditor({ bump, teams, disabled, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5 rounded-md bg-raised/60 p-3 shadow-[var(--shadow-border)] sm:p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "flex min-h-11 items-center gap-3 text-sm text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "checkbox",
				className: "size-4 accent-accent",
				checked: bump.on,
				disabled: disabled && !bump.on,
				onChange: (e) => onChange({
					...bump,
					on: e.target.checked
				})
			}), "Optional HX bump"]
		}), bump.on ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamNativeSelect, {
					label: "Team",
					value: bump.teamSlug,
					teams,
					onChange: (teamSlug) => onChange({
						...bump,
						teamSlug
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mb-2 block text-[11px] uppercase tracking-[0.14em] text-faint",
						children: [
							"ΔHX (",
							-1,
							" to ",
							1,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						step: "0.05",
						min: -1,
						max: 1,
						value: bump.deltaHx,
						onChange: (e) => onChange({
							...bump,
							deltaHx: e.target.value
						}),
						className: "h-12 w-full rounded-md bg-inset px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none focus:shadow-[var(--shadow-border-hover)]"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-2 block text-[11px] uppercase tracking-[0.14em] text-faint",
						children: "Note"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: bump.note,
						onChange: (e) => onChange({
							...bump,
							note: e.target.value
						}),
						className: "h-12 w-full rounded-md bg-inset px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-faint focus:shadow-[var(--shadow-border-hover)]"
					})]
				})
			]
		}) : null]
	});
}
function TeamNativeSelect({ label, value, teams, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-2 block text-[11px] uppercase tracking-[0.14em] text-faint",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "h-12 w-full rounded-md bg-inset px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none focus:shadow-[var(--shadow-border-hover)]",
			children: teams.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
				value: t.slug,
				children: [
					t.hxRank,
					". ",
					t.name,
					t.conference ? ` · ${t.conference}` : ""
				]
			}, t.slug))
		})]
	});
}
function ScenarioSimResult({ response, nameBySlug }) {
	const slugs = Object.keys(response.baseline);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskChip, {
				tone: "warn",
				children: SCENARIO_SIM_DEMO_LABEL
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskChip, { children: "preview / offline" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-3 font-display text-2xl tracking-wide",
			children: "Baseline · scenario · Δ"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: response.confidence_note || "Monte Carlo ± noise on 10k draws; not a lock. Calibration: cite live Top 25 closer vs full-slate tape when packaging."
		}),
		!response.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-down",
			children: formatScenarioError(response.error)
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[42rem] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line text-[11px] uppercase tracking-[0.14em] text-faint",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium",
							children: "Team"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium",
							children: "Cut"
						}),
						METRIC_COLS.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium tabular",
							children: col.label
						}, col.key))
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: slugs.flatMap((slug) => {
					return [
						{
							cut: "Baseline",
							metrics: response.baseline[slug]
						},
						{
							cut: "Scenario",
							metrics: response.scenario[slug]
						},
						{
							cut: "Δ",
							metrics: response.delta[slug],
							delta: true
						}
					].map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: cn("border-b border-line", i === 2 && "border-b-2"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 pr-3 font-medium text-fg",
								children: i === 0 ? nameBySlug.get(slug) ?? slug : ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 pr-3 text-muted",
								children: row.cut
							}),
							METRIC_COLS.map((col) => {
								const n = row.metrics[col.key];
								const formatted = fmtMetric(n, col.kind, col.digits);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: cn("py-2.5 pr-3 tabular", row.delta ? deltaClass(n) : "text-fg"),
									children: row.delta ? signed(n, formatted) : formatted
								}, col.key);
							})
						]
					}, `${slug}-${row.cut}`));
				}) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-xs leading-relaxed text-faint",
			children: ["Make field is not win title. Numbers above are a desk fixture until the AMD CLI is wired. Not this week’s paid pack. ", response.confidence_note]
		})
	] });
}
function EdgeSimPage() {
	const { teams } = Route$3.useLoaderData();
	const search = Route$3.useSearch();
	const unlocked = isScenarioSimUnlocked(search);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: `${EDGE.name} · HX ${MODEL.version}`,
				title: "Scenario Sim (preview / offline)",
				lede: "Offline desk fixture. Pin a winner or an HX bump, then read baseline vs scenario vs Δ. Not this week’s paid pack. Monte Carlo noise, not a lock."
			}),
			unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioSimPanel, { teams }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioSimGate, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/edge",
						className: "text-fg underline-offset-4 hover:underline",
						children: "Back to Edge Pack"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-faint",
						children: " · "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/edge/board",
						className: "text-fg underline-offset-4 hover:underline",
						children: "Edge Board"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-faint",
						children: " · "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-fg underline-offset-4 hover:underline",
						children: "The board"
					})
				]
			})
		]
	});
}
//#endregion
export { EdgeSimPage as component };
