import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as ArrowRight } from "../_libs/lucide-react.mjs";
import { r as DeskChip } from "./marks-D4lVI_VV.mjs";
import { $ as Panel, nt as cn, q as EDGE } from "./router-mpRDmuA6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edge-board-p07aj1cN.js
var import_jsx_runtime = require_jsx_runtime();
var hx_edge_confidence_schema_2026_default = {
	product: "hx_edge_card_confidence",
	contract_version: "2026.09.14",
	schema_id: "hx_edge_confidence_schema_2026",
	hx_stamp: "HX 2026.4",
	never_lock_badge: true,
	sort: [
		"tier A→D",
		"|Δ| desc",
		"lean desc"
	],
	calibration_thresholds: {
		"top25_soft_below": 50,
		"full_slate_soft_below": 45
	},
	calibration_flags: {
		"ok": "Slice closer at or above the threshold. Cards may lead only when the rest of the tier rule holds.",
		"soft": "FLAG — calibration soft. Do not lead the pack. Show FLAG on the card."
	},
	bands: {
		"edge_size_pts": {
			"small": [0, 3],
			"medium": [3, 7],
			"large": [7, 99]
		},
		"edge_size": {
			"small": {
				"min_abs_gap_pts": 0,
				"max_abs_gap_pts": 3,
				"exclusive_max": true,
				"rule": "|HX − Vegas| < 3 pts"
			},
			"medium": {
				"min_abs_gap_pts": 3,
				"max_abs_gap_pts": 7,
				"exclusive_max": true,
				"rule": "|HX − Vegas| 3 ≤ |Δ| < 7 pts"
			},
			"large": {
				"min_abs_gap_pts": 7,
				"rule": "|HX − Vegas| ≥ 7 pts"
			}
		},
		"notable_gap": {
			"min_abs_gap_pts": 4,
			"rule": "|HX − Vegas| ≥ 4 pts — Week 3 pack notable-gap filter, not a size band"
		},
		"lean": {
			"strong": {
				"min_pp_from_50": 15,
				"rule": "HX win probability ≥ 15pp from 50"
			},
			"lean": {
				"min_pp_from_50": 5,
				"max_pp_from_50": 15,
				"exclusive_max": true,
				"rule": "HX win probability 5–15pp from 50"
			},
			"coin": {
				"max_pp_from_50": 5,
				"exclusive_max": true,
				"wp_window": [45, 55],
				"rule": "HX win probability within 5pp of 50 (45–55% toss-up)"
			}
		}
	},
	confidence_tier_rules: {
		"A": {
			"tier": "A",
			"lead": true,
			"calibration_slice": "top25",
			"calibration_flag": "ok",
			"edge_size_bands": ["medium", "large"],
			"lean_band": "strong",
			"rule": "Top 25 slice, calibration ok (closer ≥ 50%), medium or large |HX−Vegas| (medium 3 ≤ |Δ| < 7, large ≥ 7), strong lean (≥ 15pp from 50). Winner flips allowed. Can lead the pack. Never a lock."
		},
		"B": {
			"tier": "B",
			"lead": false,
			"calibration_slice": "top25",
			"calibration_flag": "ok",
			"edge_size_band": "small",
			"lean_band": "strong",
			"rule": "Top 25 slice, calibration ok, small |HX−Vegas| (< 3 pts), strong lean. Same favorite as the book. Do not lead."
		},
		"C": {
			"tier": "C",
			"lead": false,
			"calibration_slice": "top25",
			"calibration_flag": "ok",
			"lean_band": "coin",
			"rule": "Top 25 slice, calibration ok, coin lean (45–55% toss-up). Small-edge character. Do not lead."
		},
		"D": {
			"tier": "D",
			"lead": false,
			"calibration_slice": "full_slate",
			"calibration_flag": "soft",
			"rule": "Full-slate slice under the 45% closer FLAG, or any card whose slice is calibration-soft. Do not lead. Soft cards show FLAG — calibration soft. Never a lock."
		}
	},
	copy_ban_list: [
		"lock",
		"locks",
		"guaranteed",
		"sure thing",
		"can't miss",
		"print money",
		"ROI promise"
	],
	free_vs_paid: {
		"free": {
			"surface": "public board / schedule",
			"includes": "Public schedule HX vs Vegas only — spread gap, same favorite called out. One Make 12 cell on the board. No ranked confidence cards."
		},
		"paid": {
			"surface": "HX Edge Pack",
			"includes": "Ranked confidence cards A–D with calibration FLAGS, unit O/D pulse, tape write-up. Same HX as the public board — written out. Not a second rating."
		}
	},
	example_cards: [{
		"demo_label": "EXAMPLE / schema demo",
		"source": "Week 3 peer-CLEARed pack. Schema demo — not a dump of the paid pack.",
		"game": "Western Kentucky @ Indiana",
		"kick_ct": "2026-09-19 15:00 CT · Peacock",
		"hx_line": "Indiana −20.8 / 86.1%",
		"vegas_line": "IU −44.5 (ESPN/DraftKings)",
		"abs_gap_pts": 23.7,
		"winner_flip": false,
		"lean_strength": 36.1,
		"edge_size_band": "large",
		"lean_band": "strong",
		"confidence_tier": "A",
		"calibration_slice": "top25",
		"calibration_flag": "ok",
		"pack_blurb": "|Δ| 23.7 pts (large) · HX lean strong (36.1pp from 50) · Top25 slice · cal ok (63.2%)"
	}, {
		"demo_label": "EXAMPLE / schema demo",
		"source": "Week 3 peer-CLEARed pack. Schema demo — not a dump of the paid pack.",
		"game": "Ohio @ South Alabama",
		"kick_ct": "Sat Sep 19 · 18:00 CT · ESPN+",
		"hx_line": "Ohio −6.0 / 64.9%",
		"vegas_line": "USA −4.5 (ESPN/DraftKings)",
		"abs_gap_pts": 10.5,
		"winner_flip": true,
		"lean_strength": 14.9,
		"edge_size_band": "large",
		"lean_band": "lean",
		"confidence_tier": "D",
		"calibration_slice": "full_slate",
		"calibration_flag": "soft",
		"pack_blurb": "Winner flip · |Δ| 10.5 pts (large) · HX lean lean (14.9pp from 50) · FLAG — full-slate calibration soft (42.6%)"
	}]
};
/**
* HX Edge Board v1 — public confidence-schema surface.
* Uses hx_edge_confidence_schema_2026. Does not dump the paid pack.
*/
var EDGE_BOARD_PRODUCT = "hx_edge_card_confidence";
var EDGE_BOARD_SCHEMA_ID = "hx_edge_confidence_schema_2026";
function loadEdgeConfidenceSchema() {
	return hx_edge_confidence_schema_2026_default;
}
var EDGE_BOARD_TIERS = [
	"A",
	"B",
	"C",
	"D"
];
var EDGE_SIZE_BANDS = [
	"small",
	"medium",
	"large"
];
function exampleCards(schema = loadEdgeConfidenceSchema()) {
	return schema.example_cards.slice(0, 2);
}
function EdgeBoardPanel({ className }) {
	const schema = loadEdgeConfidenceSchema();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.18em] text-faint",
				children: ["Edge Board v1 · ", schema.contract_version]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-2xl tracking-wide",
				children: "Confidence schema"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: "Tiers A–D, calibration FLAGS, small / medium / large edge bands (large ≥ 7 pts) and lean bands. Free board is public schedule HX vs Vegas. Paid pack is ranked confidence cards. Schema demo — not the full paid pack."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/edge/board",
				className: "mt-5 inline-flex h-11 items-center gap-1 text-sm text-fg underline-offset-4 hover:underline",
				children: ["Open Edge Board", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
			})
		]
	});
}
function EdgeBoardView() {
	const schema = loadEdgeConfidenceSchema();
	const cards = exampleCards(schema);
	const tiers = EDGE_BOARD_TIERS.map((tier) => schema.confidence_tier_rules[tier]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskChip, { children: "schema demo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskChip, { children: schema.hx_stamp })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-3 font-display text-2xl tracking-wide",
					children: [EDGE.name, " · confidence"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: [
						"Product `",
						EDGE_BOARD_PRODUCT,
						"` · `",
						EDGE_BOARD_SCHEMA_ID,
						"`. Never a lock badge. Same HX as the public board — ranked, not a second rating."
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Free vs paid"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-4 space-y-4 text-sm leading-relaxed",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
						className: "font-mono text-[11px] uppercase tracking-[0.14em] text-faint",
						children: ["Free · ", schema.free_vs_paid.free.surface]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-muted",
						children: schema.free_vs_paid.free.includes
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
						className: "font-mono text-[11px] uppercase tracking-[0.14em] text-faint",
						children: ["Paid · ", schema.free_vs_paid.paid.surface]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-muted",
						children: schema.free_vs_paid.paid.includes
					})] })]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Calibration FLAGS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-3 text-sm leading-relaxed text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"Top 25 closer soft below",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular text-fg",
							children: [schema.calibration_thresholds.top25_soft_below, "%"]
						}),
						". ",
						schema.calibration_flags.ok
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"Full-slate closer soft below",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular text-fg",
							children: [schema.calibration_thresholds.full_slate_soft_below, "%"]
						}),
						". ",
						schema.calibration_flags.soft
					] })]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide",
				children: "Tiers A–D"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: tiers.map((tier) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md bg-raised/60 p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-2xl tracking-wide",
							children: ["Tier ", tier.tier]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskChip, {
							tone: tier.lead ? "accent" : "muted",
							children: tier.lead ? "can lead" : "do not lead"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: tier.rule
					})]
				}, tier.tier))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-wide",
						children: "Edge / lean bands"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-2 text-sm leading-relaxed text-muted",
						children: [
							EDGE_SIZE_BANDS.map((band) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								schema.bands.edge_size[band].rule,
								" → ",
								band
							] }, band)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [schema.bands.lean.strong.rule, " → strong"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [schema.bands.lean.lean.rule, " → lean"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [schema.bands.lean.coin.rule, " → coin"] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm leading-relaxed text-muted",
						children: [schema.bands.notable_gap.rule, "."]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-wide",
						children: "Copy ban list"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 flex flex-wrap gap-2",
						children: schema.copy_ban_list.map((word) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex h-8 items-center rounded-md bg-raised px-2.5 font-mono text-xs text-muted",
							children: word
						}) }, word))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-muted",
						children: "Informational model product. Not gambling advice. HASHMARK does not take wagers."
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.18em] text-faint",
					children: "Example cards · schema demo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 lg:grid-cols-2",
					children: cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExampleCard, { card }, card.game))
				})]
			})
		]
	});
}
function ExampleCard({ card }) {
	const flagSoft = card.calibration_flag === "soft";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskChip, {
					tone: "warn",
					children: card.demo_label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskChip, { children: `Tier ${card.confidence_tier}` }),
				flagSoft ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskChip, {
					tone: "warn",
					children: "FLAG — calibration soft"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskChip, { children: "cal ok" })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mt-3 font-display text-2xl tracking-wide",
			children: card.game
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: card.kick_ct
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-4 grid gap-3 text-sm sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "font-mono text-[11px] uppercase tracking-[0.14em] text-faint",
					children: "HX"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "mt-1 text-fg",
					children: card.hx_line
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "font-mono text-[11px] uppercase tracking-[0.14em] text-faint",
					children: "Vegas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "mt-1 text-fg",
					children: card.vegas_line
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "font-mono text-[11px] uppercase tracking-[0.14em] text-faint",
					children: "|Δ|"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
					className: "mt-1 tabular text-fg",
					children: [
						card.abs_gap_pts,
						" pts · ",
						card.edge_size_band
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "font-mono text-[11px] uppercase tracking-[0.14em] text-faint",
					children: "Lean"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
					className: "mt-1 text-fg",
					children: [card.lean_band, card.winner_flip ? " · winner flip" : ""]
				})] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm leading-relaxed text-muted",
			children: card.pack_blurb
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("mt-3 text-xs leading-relaxed text-faint"),
			children: card.source
		})
	] });
}
//#endregion
export { EdgeBoardPanel as n, EdgeBoardView as r, EDGE_BOARD_SCHEMA_ID as t };
