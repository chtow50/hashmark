import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as TeamMark, F as confRacesMeta, I as fmtOdds, M as RACE_CONFS, N as confRace, O as Route$16, X as Panel, Y as PageHead, et as cn } from "./router-Dj1AWC4C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/conferences-D9geSNAx.js
var import_jsx_runtime = require_jsx_runtime();
function ConferencesPage() {
	const teams = Route$16.useLoaderData();
	const conf = Route$16.useSearch().conf ?? "SEC";
	const meta = confRacesMeta();
	const bySlug = new Map(teams.map((t) => [t.slug, t]));
	const rows = confRace(conf);
	const hasCcg = conf !== "Pac-12";
	const leader = rows[0];
	const leaderTeam = leader ? bySlug.get(leader.slug) : void 0;
	const alive = rows.filter((r) => (r.conf_title ?? 0) > 0).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: `${meta.hx_stamp} · ${meta.n_sims.toLocaleString("en-US")} simulated seasons · ${meta.as_of}`,
			title: "Conference races",
			lede: "Who reaches each title game and who wins the league, from the same 10,000 HX season simulations behind Make 12. FINALs are locked; every remaining game is drawn from HX win probability."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0",
			role: "tablist",
			"aria-label": "Conference",
			children: RACE_CONFS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/conferences",
				search: c === "SEC" ? {} : { conf: c },
				role: "tab",
				"aria-selected": conf === c,
				className: cn("inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm transition-colors duration-150 sm:h-9 sm:px-3.5", conf === c ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
				children: c
			}, c))
		}),
		leader && leaderTeam ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
						slug: leaderTeam.slug,
						color: leaderTeam.colorPrimary,
						swatchClassName: "h-10 w-1.5 rounded-sm",
						logoSize: 22
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.18em] text-faint",
						children: [conf, " favorite"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/teams/$slug",
						params: { slug: leaderTeam.slug },
						className: "font-display text-3xl tracking-wide",
						children: leaderTeam.name
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-4 sm:gap-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Big, {
							label: "Win the league",
							value: fmtOdds(leader.conf_title)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Big, {
							label: hasCcg ? "Title game" : "Title game",
							value: hasCcg ? fmtOdds(leader.make_ccg) : "None"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Big, {
							label: "Still alive",
							value: `${alive} of ${rows.length}`
						})
					]
				})]
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "p-0 sm:p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full border-separate border-spacing-0 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-[11px] uppercase tracking-[0.08em] text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "border-b border-border px-3 py-3 text-left font-medium",
								children: "Team"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "hidden border-b border-border px-3 py-3 text-right font-medium sm:table-cell",
								title: "Conference record in FINALs so far",
								children: "Conf now"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "border-b border-border px-2 py-3 text-right font-medium sm:px-3",
								title: "Average simulated conference record after the regular season",
								children: "Proj conf"
							}),
							hasCcg ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								className: "border-b border-border px-3 py-3 text-right font-medium sm:text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sm:hidden",
									children: "Title gm"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "Title game"
								})]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								className: "border-b border-border px-3 py-3 text-right font-medium sm:text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sm:hidden",
									children: "Champ"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "Win the league"
								})]
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => {
						const t = bySlug.get(r.slug);
						if (!t) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:[&>td]:bg-raised",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "border-b border-line py-2 pl-3 pr-1 sm:px-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/teams/$slug",
										params: { slug: t.slug },
										className: "flex min-h-10 items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamMark, {
											slug: t.slug,
											color: t.colorPrimary
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block truncate font-medium",
												children: t.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "block text-xs text-muted",
												children: [
													"HX No. ",
													t.hxRank,
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "sm:hidden",
														children: [
															" · ",
															r.conf_w_now,
															"–",
															r.conf_l_now,
															" conf"
														]
													})
												]
											})]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "hidden whitespace-nowrap border-b border-line px-3 py-2 text-right tabular text-muted sm:table-cell",
									children: [
										r.conf_w_now,
										"–",
										r.conf_l_now
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "whitespace-nowrap border-b border-line px-2 py-2 text-right tabular sm:px-3",
									children: [
										r.proj_conf_w.toFixed(1),
										"–",
										r.proj_conf_l.toFixed(1)
									]
								}),
								hasCcg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "border-b border-line px-2 py-2 sm:px-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OddsBar, {
										value: r.make_ccg,
										color: t.colorPrimary
									})
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "border-b border-line px-2 py-2 sm:px-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OddsBar, {
										value: r.conf_title,
										color: t.colorPrimary,
										strong: true
									})
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
				children: "How this works"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						meta.n_sims.toLocaleString("en-US"),
						" seasons, fixed seed ",
						meta.seed,
						", on the ",
						meta.hx_stamp,
						" board. Each remaining game is a coin weighted by HX win probability (Elo = 1500 + 55 × HX, 60 points home field). Played games are locked."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: meta.title_game_rule }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: meta.pac12_rule }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Title-game odds add to 200% in each league (two teams per game); league-title odds add to 100%. “<0.1%” means alive but rare; 0% means it never happened in the draws." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"Same draws as Make 12 on the",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/rankings",
							className: "underline underline-offset-4 hover:text-fg",
							children: "rankings"
						}),
						". Method details on",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/model",
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
function Big({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-[11px] uppercase tracking-[0.14em] text-faint",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 font-display text-2xl tabular",
		children: value
	})] });
}
function OddsBar({ value, color, strong }) {
	const w = value == null ? 0 : Math.max(value > 0 ? 1.5 : 0, Math.min(100, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-end gap-2 sm:min-w-[9rem] sm:justify-start",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("shrink-0 text-right tabular sm:w-14", strong ? "font-semibold text-fg" : "text-fg/85"),
			children: fmtOdds(value)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden h-2 flex-1 rounded-full bg-raised sm:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block h-2 rounded-full",
				style: {
					width: `${w}%`,
					background: color
				}
			})
		})]
	});
}
//#endregion
export { ConferencesPage as component };
