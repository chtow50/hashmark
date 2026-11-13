import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { X as PageHead, Y as ConfPills, Z as Panel, at as inConf, o as Route$5, s as SORTS, tt as cn, w as TeamMark } from "./router-Dh9r26Pe.mjs";
import { t as ShowMore } from "./show-more-6axMVXot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/strength-CrBwQJOJ.js
var import_jsx_runtime = require_jsx_runtime();
var signed = (x) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(x).toFixed(2)}`;
function StrengthPage() {
	const { teams, sor } = Route$5.useLoaderData();
	const search = Route$5.useSearch();
	const conf = search.conf ?? "All";
	const sort = search.sort ?? "sor";
	const bySlug = new Map(teams.map((t) => [t.slug, t]));
	const bench = bySlug.get(sor.benchSlug);
	const rows = sor.rows.filter((r) => bySlug.has(r.slug) && inConf(bySlug.get(r.slug).conference, conf)).sort((a, b) => {
		if (sort === "played") return (a.sosPlayedRank ?? 999) - (b.sosPlayedRank ?? 999) || a.sorRank - b.sorRank;
		if (sort === "remaining") return (a.sosRemainingRank ?? 999) - (b.sosRemainingRank ?? 999) || a.sorRank - b.sorRank;
		return a.sorRank - b.sorRank;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "Current HX · real 2026 schedule",
			title: "Strength of record & schedule",
			lede: `Strength of record asks how much better your record is than a typical top-25 team's would be against the same opponents, at the same sites. The benchmark is the current No. 25 on the HX board${bench ? ` (${bench.name}, HX ${sor.benchHx.toFixed(2)})` : ""}. Schedule strength is the average current HX of FBS opponents, played and still to come.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfPills, {
			value: conf,
			to: "/strength",
			searchFor: (c) => ({
				...c === "All" ? {} : { conf: c },
				...sort !== "sor" ? { sort } : {}
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex gap-2 overflow-x-auto pb-1",
			role: "tablist",
			"aria-label": "Sort",
			children: SORTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/strength",
				search: {
					...conf !== "All" ? { conf } : {},
					...s.key !== "sor" ? { sort: s.key } : {}
				},
				role: "tab",
				"aria-selected": sort === s.key,
				className: cn("inline-flex h-10 shrink-0 items-center rounded-lg border px-3 text-sm transition-colors", sort === s.key ? "border-fg bg-fg text-bg" : "border-border text-muted hover:text-fg"),
				children: s.label
			}, s.key))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sm:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShowMore, {
				items: rows,
				noun: "teams",
				resetKey: `${conf}|${sort}`,
				className: "space-y-3",
				render: (r) => {
					const t = bySlug.get(r.slug);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/teams/$slug",
						params: { slug: r.slug },
						className: "block rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 items-center gap-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-7 shrink-0 font-display text-xl tabular text-muted",
										children: rankFor(r, sort) ?? "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
										slug: t.slug,
										color: t.colorPrimary,
										logoSize: 20
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate font-medium",
											children: t.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "block text-xs text-muted",
											children: [
												r.w,
												"–",
												r.l,
												" · HX No. ",
												t.hxRank
											]
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-xl tabular",
									children: signed(r.sor)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[10px] uppercase tracking-wide text-muted",
									children: ["SOR No. ", r.sorRank]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-3 gap-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
									label: "Top-25 team",
									value: `${r.benchW.toFixed(1)}–${(r.w + r.l - r.benchW).toFixed(1)}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
									label: "Played",
									value: sosText(r.sosPlayed, r.sosPlayedRank)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
									label: "Left",
									value: sosText(r.sosRemaining, r.sosRemainingRank)
								})
							]
						})]
					}, r.slug);
				}
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "hidden p-0 sm:block sm:p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full border-separate border-spacing-0 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-[11px] uppercase tracking-[0.08em] text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "border-b border-border px-3 py-3 text-right font-medium",
								children: "#"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "border-b border-border px-3 py-3 text-left font-medium",
								children: "Team"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "border-b border-border px-3 py-3 text-right font-medium",
								children: "Record"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "border-b border-border px-3 py-3 text-right font-medium",
								title: "What the No. 25 HX team would expect on these games",
								children: "Top-25 team"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "border-b border-border px-3 py-3 text-right font-medium",
								title: "Actual wins minus the benchmark's expected wins",
								children: "SOR"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "border-b border-border px-3 py-3 text-right font-medium",
								title: "Average current HX of FBS opponents played (rank)",
								children: "Schedule played"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "border-b border-border px-3 py-3 text-right font-medium",
								title: "Average current HX of FBS opponents left (rank)",
								children: "Schedule left"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => {
						const t = bySlug.get(r.slug);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:[&>td]:bg-raised",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "w-10 border-b border-line px-3 py-2 text-right tabular text-faint",
									children: rankFor(r, sort) ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "border-b border-line px-3 py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/teams/$slug",
										params: { slug: t.slug },
										className: "flex min-h-10 items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
											slug: t.slug,
											color: t.colorPrimary
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block font-medium",
											children: t.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "block text-xs text-muted",
											children: [
												t.conference,
												" · HX No. ",
												t.hxRank
											]
										})] })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "border-b border-line px-3 py-2 text-right tabular",
									children: [
										r.w,
										"–",
										r.l,
										r.fcsPlayed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "block text-[11px] text-muted",
											children: [r.fcsPlayed, " vs FCS"]
										}) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "border-b border-line px-3 py-2 text-right tabular text-muted",
									children: [
										r.benchW.toFixed(1),
										"–",
										(r.w + r.l - r.benchW).toFixed(1)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: cn("border-b border-line px-3 py-2 text-right font-semibold tabular", r.sor > 0 ? "text-up" : r.sor < 0 ? "text-down" : ""),
									children: [signed(r.sor), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block text-[11px] font-normal text-muted",
										children: ["No. ", r.sorRank]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "border-b border-line px-3 py-2 text-right tabular",
									children: [sosText(r.sosPlayed, r.sosPlayedRank), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block text-[11px] text-muted",
										children: [r.fbsPlayed, " FBS"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "border-b border-line px-3 py-2 text-right tabular",
									children: [sosText(r.sosRemaining, r.sosRemainingRank), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block text-[11px] text-muted",
										children: [
											r.fbsRemaining,
											" FBS",
											r.fcsRemaining ? ` + ${r.fcsRemaining} FCS` : ""
										]
									})]
								})
							]
						}, r.slug);
					}) })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg",
				children: "Method"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Benchmark: the current No. 25 team on the HX board. For each game already played, its win chance uses the HX matchup engine (Elo = 1500 + 55 × HX, 60 points home field, none at neutral sites). Against an FCS opponent it uses the season sim's fixed rule: 92% home, 88% away." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "SOR = actual wins − the benchmark's expected wins on those games. +1.00 means one more win than a typical top-25 team would have." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Schedule played / left = average current HX of FBS opponents, ranked 1–138 (No. 1 = hardest). FCS opponents have no HX, so they are counted but left out of the average." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"Everything uses current HX, so a win over a team that has since risen counts for more. Only real FINALs and the real remaining slate are used. More on ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/model",
							hash: "sor",
							className: "underline underline-offset-4 hover:text-fg",
							children: "The Model"
						}),
						"."
					] })
				]
			})]
		})
	] });
}
function rankFor(r, sort) {
	return sort === "played" ? r.sosPlayedRank : sort === "remaining" ? r.sosRemainingRank : r.sorRank;
}
function sosText(v, rank) {
	return v == null ? "n/a" : `${v.toFixed(2)} · No. ${rank}`;
}
function Mini({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0 rounded-lg bg-raised px-2 py-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "truncate text-[10px] uppercase tracking-wide text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "truncate tabular text-fg/90",
			children: value
		})]
	});
}
//#endregion
export { StrengthPage as component };
