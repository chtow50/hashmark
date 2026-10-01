import { o as __toESM } from "../_runtime.mjs";
import { a as fcsStubIsFinal, h as todayChicago, n as MODEL, o as fcsStubsForTeam, r as addDaysYmd } from "./fcs-stubs-Clb7Di69.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { H as notFound, S as require_jsx_runtime, _ as createFileRoute, b as useNavigate, d as useRouterState, g as lazyRouteComponent, h as Outlet, l as Scripts, p as createRouter, u as HeadContent, v as createRootRoute, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as string, i as object, n as literal, o as union, r as number, t as boolean } from "../_libs/zod.mjs";
import { n as TriangleAlert, o as Menu, r as Search, t as X, u as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Analytics } from "../_libs/vercel__analytics.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-Bm73qxnE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function fmtHeight(inches) {
	const whole = Math.round(inches);
	return `${Math.floor(whole / 12)}'${whole % 12}"`;
}
function fmtNum(n, digits = 1) {
	return n.toLocaleString("en-US", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	});
}
function fmtPct(n, digits = 1) {
	return `${fmtNum(n, digits)}%`;
}
function apLabel(rank) {
	return rank == null ? "NR" : String(rank);
}
function deltaVsAp(hxRank, apRank) {
	if (apRank == null) return {
		label: "NR",
		value: 0,
		kind: "nr"
	};
	const d = apRank - hxRank;
	if (d === 0) return {
		label: "even",
		value: 0,
		kind: "even"
	};
	if (d > 0) return {
		label: `+${d}`,
		value: d,
		kind: "up"
	};
	return {
		label: String(d),
		value: d,
		kind: "down"
	};
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-[opacity,transform,background-color,box-shadow] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-90",
			ghost: "bg-transparent text-fg hover:bg-raised",
			outline: "bg-transparent text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			subtle: "bg-raised text-fg hover:bg-raised/80"
		},
		size: {
			sm: "h-9 px-3 text-sm rounded-md",
			md: "h-11 px-4 text-sm rounded-md",
			lg: "h-12 px-5 text-base rounded-lg",
			icon: "size-11 rounded-md"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
/**
* HX Edge Pack — public monetization surface.
* Checkout URLs are Stripe Payment Links from env when they exist:
*   VITE_EDGE_CHECKOUT_URL       monthly ($15/mo) only
*   VITE_EDGE_CHECKOUT_WEEK_URL  week sample ($5) only — never fall back to monthly
* Never invent a payment link. Unset → #checkout-pending.
*/
var EDGE_CHECKOUT_PENDING = "#checkout-pending";
var EDGE_SUPPORT_EMAIL = "hello@hashmarkcfb.com";
var EDGE = {
	name: "HX Edge Pack",
	shortName: "Edge Pack",
	weekPrice: "$5",
	weekLabel: "$5 Week sample",
	monthPrice: "$15/mo",
	monthLabel: "$15/mo",
	supportEmail: EDGE_SUPPORT_EMAIL
};
function readCheckoutEnv() {
	return {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_AUTH_ENABLED": "false",
		"VITE_EDGE_CHECKOUT_URL": "https://buy.stripe.com/4gM6oIf74cZ3cbubIOdUY02",
		"VITE_EDGE_CHECKOUT_WEEK_URL": "https://buy.stripe.com/00w14obUSbUZ5N67sydUY03"
	};
}
/** Accept only absolute http(s) URLs. Empty, hash, or junk → unset. */
function resolveCheckoutUrl(raw) {
	const value = raw?.trim() ?? "";
	if (!value) return null;
	try {
		const url = new URL(value);
		if (url.protocol === "http:" || url.protocol === "https:") return url.toString();
	} catch {
		return null;
	}
	return null;
}
function edgeCheckoutUrl(kind = "month", env = readCheckoutEnv()) {
	if (kind === "week") return resolveCheckoutUrl(env.VITE_EDGE_CHECKOUT_WEEK_URL);
	return resolveCheckoutUrl(env.VITE_EDGE_CHECKOUT_URL);
}
function edgeCheckoutHref(kind = "month", env = readCheckoutEnv()) {
	return edgeCheckoutUrl(kind, env) ?? "#checkout-pending";
}
function edgeCheckoutLive(kind = "month", env = readCheckoutEnv()) {
	return edgeCheckoutUrl(kind, env) != null;
}
function EdgePackNavButton({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		size: "sm",
		variant: "primary",
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/edge",
			children: EDGE.shortName
		})
	});
}
function EdgePackStrip({ className, compact = false, paid = false }) {
	const paidMark = paid ? "Paid depth · " : "";
	if (compact) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/edge",
		className: cn("mb-6 flex min-h-11 items-center justify-between gap-3 text-sm text-muted hover:text-fg", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			paidMark,
			EDGE.name,
			" · weekly disagreements and SU/closer tape · ",
			EDGE.weekLabel,
			" · ",
			EDGE.monthLabel
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex shrink-0 items-center gap-1 text-fg",
			children: ["Open", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/edge",
		className: cn("flex flex-col gap-2 rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)] sm:flex-row sm:items-center sm:justify-between", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.18em] text-faint",
				children: EDGE.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [
					"Weekly depth — HX vs AP/market, flagged games, SU/closer tape.",
					" ",
					EDGE.weekLabel,
					" · ",
					EDGE.monthLabel,
					"."
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex h-11 shrink-0 items-center gap-1 text-sm text-fg",
			children: ["Open pack", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
		})]
	});
}
function EdgeBuyButton({ kind, label, className }) {
	const live = edgeCheckoutLive(kind);
	const href = edgeCheckoutHref(kind);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		variant: "primary",
		className: cn("w-full", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href,
			...live ? {
				target: "_blank",
				rel: "noopener noreferrer"
			} : {},
			children: label
		})
	});
}
function EdgeCheckoutNote({ className }) {
	if (edgeCheckoutLive("week") && edgeCheckoutLive("month")) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		id: EDGE_CHECKOUT_PENDING.slice(1),
		className: cn("text-sm text-muted", className),
		children: "Checkout wiring this week"
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var listTeams = createServerFn({ method: "GET" }).handler(createSsrRpc("212fff7d2072b94c01d35d756a6846efbcca652fa93e6206b5e625d8fd64ecc1"));
var getTeam = createServerFn({ method: "GET" }).validator(object({ slug: string().min(1) })).handler(createSsrRpc("7bd9c5bd2dac37273cb6e205f595eb0bc550bfd9c6ffff5b5b31dcf74c2250bb"));
var listRecruiting = createServerFn({ method: "GET" }).handler(createSsrRpc("eefaa67313e68bdbcc1c8f6789d44047383841a9720a2e2ed8b4294d8674c7ca"));
var listGames = createServerFn({ method: "GET" }).handler(createSsrRpc("245d4daa33d1f4543fb00eb58f19731eeb1b55fa11f6b5859d8efe1c0915d423"));
createServerFn({ method: "GET" }).validator(object({ date: string().regex(/^\d{4}-\d{2}-\d{2}$/) })).handler(createSsrRpc("9ad172d35fd2eca98874454de1af972b7e747ffcef39b3001b6739144dfe4457"));
/** FBS slate for one HASHMARK week, sorted by kick. Uses lock HX the same way as listGames. */
var listScheduleWeek = createServerFn({ method: "GET" }).validator(object({ week: number().int().min(0).max(13) })).handler(createSsrRpc("a86900331928441127b7b8d77aaf20878746d66deb7c81c2cb47f2c898494144"));
var getMatchup = createServerFn({ method: "GET" }).validator(object({
	home: string().min(1),
	away: string().min(1),
	neutral: boolean().optional()
})).handler(createSsrRpc("e848cc7c6a78d9034685b108649e3e18d710ecbbe452bcc72388a9cb1e28bc5d"));
var listStates = createServerFn({ method: "GET" }).handler(createSsrRpc("9e7264d9dac7ca986bcb4f134e9bd2a0a4dbce110f243ebdee63580e3b08ec00"));
var getStateDetail = createServerFn({ method: "GET" }).validator(object({ code: string().min(2).max(2) })).handler(createSsrRpc("bab9328854859b702258836ae2f74acf39b2bd6bc01cd038d2facb244149f301"));
var NICK = {
	bama: "alabama",
	tide: "alabama",
	nd: "notre-dame",
	osu: "ohio-state",
	bucks: "ohio-state",
	psu: "penn-state",
	olemiss: "ole-miss",
	fsu: "florida-state",
	uf: "florida",
	uga: "georgia",
	dawgs: "georgia",
	canes: "miami",
	mizzou: "missouri",
	vols: "tennessee",
	ou: "oklahoma",
	tamu: "texas-am",
	ttu: "texas-tech",
	gt: "georgia-tech",
	unc: "north-carolina",
	uw: "washington",
	pitt: "pittsburgh"
};
function norm(s) {
	return s.toLowerCase().replace(/&/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
}
function matches(t, q) {
	const raw = norm(q);
	if (!raw) return false;
	if (NICK[raw] === t.slug) return true;
	const hay = norm(`${t.name} ${t.shortName} ${t.slug.replaceAll("-", " ")} ${t.conference}`);
	if (hay.includes(raw)) return true;
	return raw.split(" ").every((p) => hay.includes(p));
}
function TeamFinder() {
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const [teams, setTeams] = (0, import_react.useState)(null);
	const [active, setActive] = (0, import_react.useState)(0);
	const inputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setOpen((v) => !v);
			}
			if (e.key === "Escape") setOpen(false);
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setQ("");
		setActive(0);
		const t = window.setTimeout(() => inputRef.current?.focus(), 20);
		if (!teams) listTeams().then((rows) => setTeams(rows.map((r) => ({
			slug: r.slug,
			name: r.name,
			shortName: r.shortName,
			conference: r.conference,
			hxRank: r.hxRank
		}))));
		return () => window.clearTimeout(t);
	}, [open, teams]);
	const hits = (0, import_react.useMemo)(() => {
		if (!teams) return [];
		if (!q.trim()) return teams.slice(0, 8);
		return teams.filter((t) => matches(t, q)).slice(0, 12);
	}, [teams, q]);
	function go(slug) {
		setOpen(false);
		navigate({
			to: "/teams/$slug",
			params: { slug }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "ghost",
		size: "icon",
		className: "text-muted hover:text-fg",
		"aria-label": "Search teams",
		onClick: () => setOpen(true),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
	}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-bg/80 backdrop-blur-sm",
			"aria-label": "Close search",
			onClick: () => setOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Search teams",
			className: "absolute inset-x-0 top-[12vh] mx-auto w-[min(560px,calc(100%-1.5rem))] overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border-hover)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative border-b border-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-faint" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: inputRef,
							type: "search",
							value: q,
							onChange: (e) => {
								setQ(e.target.value);
								setActive(0);
							},
							onKeyDown: (e) => {
								if (e.key === "ArrowDown") {
									e.preventDefault();
									setActive((i) => Math.min(hits.length - 1, i + 1));
								}
								if (e.key === "ArrowUp") {
									e.preventDefault();
									setActive((i) => Math.max(0, i - 1));
								}
								if (e.key === "Enter" && hits[active]) {
									e.preventDefault();
									go(hits[active].slug);
								}
							},
							placeholder: "Team, nickname, or conference",
							className: "h-14 w-full bg-transparent pr-12 pl-11 text-base text-fg outline-none placeholder:text-faint"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "absolute right-3 top-1/2 -translate-y-1/2 text-faint hover:text-fg",
							"aria-label": "Close search",
							onClick: () => setOpen(false),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "max-h-[50vh] overflow-y-auto py-1",
					children: !teams ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-4 py-3 text-sm text-muted",
						children: "Loading the 136…"
					}) : hits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-4 py-3 text-sm text-muted",
						children: "No team matches."
					}) : hits.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/teams/$slug",
						params: { slug: t.slug },
						onClick: () => setOpen(false),
						className: cn("flex items-center justify-between gap-3 px-4 py-2.5 text-sm", i === active ? "bg-raised text-fg" : "text-muted hover:bg-raised hover:text-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-fg",
							children: t.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-faint",
							children: t.conference
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[11px] tabular text-faint",
							children: ["HX ", t.hxRank]
						})]
					}) }, t.slug))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "border-t border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-faint",
					children: "⌘K · Enter opens the team page"
				})
			]
		})]
	}) : null] });
}
var CONFS = [
	"All",
	"SEC",
	"Big Ten",
	"ACC",
	"Big 12",
	"Independent",
	"Group of Five",
	"American",
	"Sun Belt",
	"MAC",
	"CUSA",
	"Mountain West",
	"Pac-12"
];
var G5 = /* @__PURE__ */ new Set([
	"Mountain West",
	"American",
	"Sun Belt",
	"CUSA",
	"MAC",
	"Pac-12"
]);
function parseConf(value) {
	return CONFS.includes(value) ? value : "All";
}
function inConf(conference, conf) {
	if (conf === "All") return true;
	if (conf === "Group of Five") return G5.has(conference);
	return conference === conf;
}
var NAV = [
	{
		to: "/",
		label: "Board"
	},
	{
		to: "/schedule",
		label: "Schedule"
	},
	{
		to: "/stories",
		label: "Stories"
	},
	{
		to: "/rankings",
		label: "Rankings"
	},
	{
		to: "/matchup",
		label: "Matchup"
	},
	{
		to: "/recruiting",
		label: "Recruiting"
	},
	{
		to: "/talent",
		label: "Talent"
	},
	{
		to: "/states",
		label: "States"
	},
	{
		to: "/model",
		label: "The Model"
	},
	{
		to: "/edge",
		label: "Edge Pack"
	}
];
function HashLogo({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: cn("flex items-center gap-2.5 text-fg", className),
		"aria-label": "HASHMARK home",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex h-7 items-end gap-[3px]",
			"aria-hidden": true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-5 w-[3px] rounded-full bg-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-7 w-[3px] rounded-full bg-accent" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-xl tracking-[0.18em]",
			children: "HASHMARK"
		})]
	});
}
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-accent-fg",
				children: "Skip to board"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-line bg-bg/92 backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HashLogo, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-1 lg:flex",
							children: NAV.filter((item) => item.to !== "/edge").map((item) => {
								const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.to,
									className: cn("relative flex h-11 items-center px-3 text-sm tracking-wide transition-colors duration-150", active ? "text-fg" : "text-muted hover:text-fg"),
									children: [item.label, active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-3 -bottom-px h-px bg-accent" }) : null]
								}, item.to);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 sm:gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden font-mono text-[11px] uppercase tracking-[0.16em] text-faint xl:inline",
									children: MODEL.weekLabel
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EdgePackNavButton, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamFinder, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "lg:hidden",
									"aria-expanded": open,
									"aria-controls": "mobile-nav",
									"aria-label": open ? "Close menu" : "Open menu",
									onClick: () => setOpen((v) => !v),
									children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
								})
							]
						})
					]
				}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					id: "mobile-nav",
					className: "border-t border-line px-4 py-3 lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col",
						children: [NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							onClick: () => setOpen(false),
							className: "flex h-12 items-center border-b border-line text-base text-fg last:border-0",
							children: item.label
						}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/desk",
							onClick: () => setOpen(false),
							className: "flex h-12 items-center text-base text-muted",
							children: "The Desk"
						})]
					})
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main",
				className: "mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display tracking-[0.16em] text-faint",
								children: [
									"HASHMARK · HX ",
									MODEL.version,
									" · hashmarkcfb.com"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:hello@hashmarkcfb.com",
								className: "hover:text-fg",
								children: "hello@hashmarkcfb.com"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "flex flex-wrap gap-x-4 gap-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "hover:text-fg",
									children: "Board"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/schedule",
									className: "hover:text-fg",
									children: "Schedule"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/stories",
									className: "hover:text-fg",
									children: "Stories"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/rankings",
									className: "hover:text-fg",
									children: "Rankings"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/matchup",
									className: "hover:text-fg",
									children: "Matchup"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/recruiting",
									className: "hover:text-fg",
									children: "Recruiting"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/talent",
									className: "hover:text-fg",
									children: "Talent"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/states",
									className: "hover:text-fg",
									children: "States"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/model",
									className: "hover:text-fg",
									children: "The Model"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/edge",
									className: "hover:text-fg",
									children: "Edge Pack"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/desk",
									className: "hover:text-fg",
									children: "The Desk"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-relaxed text-faint",
							children: "Research desk. Not a sportsbook. HASHMARK does not take wagers or list a street line."
						})
					]
				})
			})
		]
	});
}
function PageHead({ kicker, title, lede }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-8 max-w-2xl enter",
		children: [
			kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-faint",
				children: kicker
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-wide text-fg sm:text-5xl",
				children: title
			}),
			lede ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-base leading-relaxed text-muted",
				children: lede
			}) : null
		]
	});
}
function Panel({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5", className),
		children
	});
}
var NICK_TO_SLUG = {
	tamu: "texas-am",
	"a m": "texas-am",
	"texas am": "texas-am",
	bama: "alabama",
	tide: "alabama",
	nd: "notre-dame",
	irish: "notre-dame",
	osu: "ohio-state",
	bucks: "ohio-state",
	buckeyes: "ohio-state",
	psu: "penn-state",
	nittany: "penn-state",
	olemiss: "ole-miss",
	"ole miss": "ole-miss",
	fsu: "florida-state",
	noles: "florida-state",
	uf: "florida",
	gators: "florida",
	canes: "miami",
	hurricanes: "miami",
	dawgs: "georgia",
	uga: "georgia",
	ducks: "oregon",
	hoosiers: "indiana",
	mizzou: "missouri",
	vols: "tennessee",
	vol: "tennessee",
	wazzu: "washington-state",
	pitt: "pittsburgh",
	gtech: "georgia-tech",
	gt: "georgia-tech",
	jmu: "james-madison",
	sdsu: "san-diego-state",
	wvu: "west-virginia",
	vt: "virginia-tech",
	uk: "kentucky",
	ou: "oklahoma",
	sooners: "oklahoma",
	ttu: "texas-tech",
	unc: "north-carolina",
	uw: "washington",
	cal: "california",
	uconn: "uconn",
	umass: "massachusetts",
	utsa: "utsa",
	byu: "byu",
	lsu: "lsu",
	usc: "usc",
	ucla: "ucla",
	tcu: "tcu"
};
function normQuery(s) {
	return s.toLowerCase().replace(/&/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
}
function teamHaystack(t) {
	return normQuery([
		t.name,
		t.shortName,
		t.slug.replaceAll("-", " "),
		t.conference,
		t.mascot
	].filter(Boolean).join(" "));
}
function teamMatches(t, q) {
	const raw = normQuery(q);
	if (!raw) return true;
	if (NICK_TO_SLUG[raw] === t.slug) return true;
	const hay = teamHaystack(t);
	const compact = hay.replace(/ /g, "");
	const compactQ = raw.replace(/ /g, "");
	if (hay.includes(raw) || compactQ.length >= 3 && compact.includes(compactQ)) return true;
	return raw.split(" ").filter(Boolean).every((p) => hay.includes(p) || compact.includes(p));
}
function TeamSelect({ id, label, value, teams, onChange }) {
	const listId = `${id}-names`;
	const [query, setQuery] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => query.trim() ? teams.filter((t) => teamMatches(t, query)) : teams, [teams, query]);
	const options = query.trim() && !filtered.some((t) => t.slug === value) ? [...filtered, ...teams.filter((t) => t.slug === value)] : filtered;
	function pick(slug) {
		onChange(slug);
		setQuery("");
	}
	function applyQuery(next) {
		setQuery(next);
		const q = normQuery(next);
		if (!q) return;
		const nick = NICK_TO_SLUG[q];
		if (nick && teams.some((t) => t.slug === nick)) {
			pick(nick);
			return;
		}
		const exact = teams.find((t) => normQuery(t.name) === q || normQuery(t.shortName ?? "") === q);
		if (exact) {
			pick(exact.slug);
			return;
		}
		const hits = teams.filter((t) => teamMatches(t, next));
		if (hits.length === 1) pick(hits[0].slug);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "block min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-2 block text-[11px] uppercase tracking-[0.14em] text-faint",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: `${id}-search`,
						type: "search",
						list: listId,
						autoComplete: "off",
						spellCheck: false,
						placeholder: "Type a team, mascot, or nickname",
						"aria-label": `Search ${label} team`,
						value: query,
						onChange: (e) => applyQuery(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								if (filtered[0]) pick(filtered[0].slug);
							}
							if (e.key === "Escape") setQuery("");
						},
						className: "h-12 w-full rounded-lg bg-raised py-0 pr-10 pl-10 text-sm text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-faint focus:shadow-[var(--shadow-border-hover)]"
					}),
					query ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Clear search",
						className: "absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center text-faint hover:text-fg",
						onClick: () => setQuery(""),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
						id: listId,
						children: teams.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: t.name }, t.slug))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				id,
				value,
				"aria-label": `${label} team`,
				onChange: (e) => pick(e.target.value),
				className: "h-12 w-full rounded-lg bg-raised px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none focus:shadow-[var(--shadow-border-hover)]",
				children: [options.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
					value: t.slug,
					children: [
						t.hxRank,
						". ",
						t.name,
						t.conference ? ` · ${t.conference}` : ""
					]
				}, t.slug)), options.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value,
					children: "No match"
				}) : null]
			})]
		})]
	});
}
/** Conference filter chips. Uses real links so the board filters on navigation, not only client state. */
function ConfPills({ value, to, searchFor }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-5 flex gap-2 overflow-x-auto pb-1",
		role: "tablist",
		"aria-label": "Conference",
		children: CONFS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to,
			search: searchFor(c),
			role: "tab",
			"aria-selected": value === c,
			className: cn("inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm transition-colors duration-150", value === c ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
			children: c
		}, c))
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/featured-CEZjBgP_.js
/**
* Last stamped AP ballot on the live board.
* HX chrome is Week 4. AP is the last stamped poll (Week 4, Sept. 20) —
* not a Week 3 ballot.
*/
var AP_STAMP = {
	week: 4,
	asOf: "Sept. 20",
	label: "Week 4 AP",
	columnHint: "W4 stamp",
	vsHx: "last stamped AP (Week 4, Sept. 20)",
	lede: "HX is Week 4. AP is the last stamped poll (Week 4, Sept. 20) — not a Week 3 ballot."
};
/** Thursday night flag: Colorado at Georgia Tech, Bobby Dodd. */
var WEEK1_FLAG = {
	homeSlug: "georgia-tech",
	awaySlug: "colorado"
};
/**
* Friday ESPN: Pittsburgh at Virginia Tech. Schedule-page pin for
* `/schedule?w=5`. Fri 2026-10-02 18:00 CT · ESPN · VT −3.5 / 52.5.
* The home desk uses the earliest Week 5 kick, not this pin.
* BOARD_WEEK stays 4.
*/
var WEEK5_FEATURED = {
	homeSlug: "virginia-tech",
	awaySlug: "pittsburgh"
};
/**
* Friday ESPN: Iowa State at BYU. Schedule-page pin for
* `/schedule?w=6`. Fri 2026-10-09 21:15 CT · ESPN · BYU −14.5 / 50.5.
* Day-risk: HM labels Saturday, Oct 10; ESPN CT is Friday.
* Live desk / FEATURED_SLATE_WEEK stays 5. BOARD_WEEK stays 4.
*/
var WEEK6_FEATURED = {
	homeSlug: "byu",
	awaySlug: "iowa-state"
};
/**
* Pre-kick Thursday books for Colorado at GT. Used only when the row has no
* stamped close. After kick the close is Georgia Tech −6.5 / 50.5 on games.vegas_*.
* Not a Week 2 featured path — do not invent a Week 2 book.
*/
var GT_THURSDAY_BOOK = {
	homeSlug: WEEK1_FLAG.homeSlug,
	awaySlug: WEEK1_FLAG.awaySlug,
	/** Home-perspective spread. Positive = Georgia Tech favored. */
	spread: 6.5,
	totalLow: 50.5,
	totalHigh: 51,
	opened: 7.5,
	label: "Current book",
	sources: "USA Today −6.5 / 51 · FanDuel and Action −6.5 / 50.5 · opened −7.5"
};
function isColoradoAtGt(g) {
	return g.homeSlug === WEEK1_FLAG.homeSlug && g.awaySlug === WEEK1_FLAG.awaySlug;
}
function isUpcomingKick(g, nowMs) {
	if (g.status === "final") return false;
	if (g.isFcs) return false;
	if (g.kickoffAt != null) return Date.parse(g.kickoffAt) > nowMs;
	return true;
}
/**
* Next upcoming non-final on a kick-sorted HASHMARK week slate.
* Prefers the earliest future `kickoffAt`; if the slate has dates but no
* times, takes the first non-final in slate order.
* Never a FINAL. Never an FCS stub (no invented HX). Does not invent Vegas or scores.
*/
function selectFeaturedKick(slate, nowMs) {
	const upcoming = slate.filter((g) => isUpcomingKick(g, nowMs));
	const timed = upcoming.filter((g) => g.kickoffAt != null);
	if (timed.length) return timed.reduce((a, b) => Date.parse(a.kickoffAt) <= Date.parse(b.kickoffAt) ? a : b);
	return upcoming[0] ?? null;
}
/**
* Board featured for the live featured slate (Week 5).
* Week 2, Week 3, and Week 4 Research pins stay historical helpers —
* those rows are FINAL and must not feature. Liberty @ Coastal is FINAL
* (34–17) and must not feature. A finished Week 4 slate returns null.
* Week 5: earliest upcoming FBS kick. Blank Vegas stays blank.
* Never a FINAL. Never FCS. Never invent a book or matchup.
*/
function selectBoardFeaturedKick(slate, nowMs) {
	return selectFeaturedKick(slate, nowMs);
}
function isPittsburghAtVirginiaTech(g) {
	return g.homeSlug === WEEK5_FEATURED.homeSlug && g.awaySlug === WEEK5_FEATURED.awaySlug;
}
function isIowaStateAtByu(g) {
	return g.homeSlug === WEEK6_FEATURED.homeSlug && g.awaySlug === WEEK6_FEATURED.awaySlug;
}
/**
* Featured card scoped to the schedule week being viewed.
* Week 5 pins Pittsburgh @ Virginia Tech (CLEAR), even though WKU @ NMSU
* kicks earlier. Week 6 pins Iowa State @ BYU (CLEAR), even though midweek
* cards kick earlier. The homepage desk uses FEATURED_SLATE_WEEK (still 5)
* and the earliest kick, not these pins. Never invents a matchup.
*/
function selectWeekScopedFeatured(week, slate) {
	if (week === 5) return slate.find((g) => !g.isFcs && g.status !== "final" && isPittsburghAtVirginiaTech(g)) ?? null;
	if (week === 6) return slate.find((g) => !g.isFcs && g.status !== "final" && isIowaStateAtByu(g)) ?? null;
	return null;
}
/** Same rule as hashmarkWeekFromRow: Aug 29–30 2026 is Week 0. */
function featuredSlateWeek(g) {
	return g.kickoffDate <= "2026-08-30" ? 0 : g.week;
}
/** Stamped close when present. Unstamped GT still shows the pre-kick current book. Never invent. */
function featuredBook(g) {
	if (g.vegasSpread != null || g.vegasTotal != null) {
		const total = g.vegasTotal == null ? "—" : String(g.vegasTotal);
		return {
			kind: "close",
			label: "Vegas",
			spread: g.vegasSpread ?? 0,
			total,
			note: null
		};
	}
	if (isColoradoAtGt(g)) return {
		kind: "current",
		label: GT_THURSDAY_BOOK.label,
		spread: GT_THURSDAY_BOOK.spread,
		total: `${GT_THURSDAY_BOOK.totalLow}–${GT_THURSDAY_BOOK.totalHigh}`,
		note: `${GT_THURSDAY_BOOK.sources}. Not a close until kick.`
	};
	return null;
}
function favoriteLine(homeShort, awayShort, spread) {
	if (Math.abs(spread) < .05) return "PK";
	return spread > 0 ? `${homeShort} −${spread.toFixed(1)}` : `${awayShort} −${(-spread).toFixed(1)}`;
}
function formatVegas(line, total) {
	if (line == null && total == null) return "—";
	if (line == null) return `O/U ${total.toFixed(1)}`;
	if (total == null) return line;
	return `${line} · O/U ${total.toFixed(1)}`;
}
/** Same-favorite gap vs the current book. Null when sides disagree or no book. */
function spreadGap(hxSpread, bookSpread) {
	if (Math.abs(hxSpread) < .05 || Math.abs(bookSpread) < .05) return null;
	if (hxSpread > 0 !== bookSpread > 0) return null;
	return Math.round((hxSpread - bookSpread) * 10) / 10;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/stories-RojNgKqk.js
var STORY_DATE = "Friday, Aug 28, 2026";
var STORY_DATE_WEEK1 = "Friday, Sep 4, 2026";
var STORY_DATE_TAPE = "Tuesday, Sep 8, 2026";
var STORY_DATE_TAPE_WEEK2 = "Sunday, Sep 13, 2026";
var STORY_DATE_TAPE_WEEK3 = "Sunday, Sep 20, 2026";
var STORY_DATE_TAPE_WEEK4 = "Sunday, Sep 27, 2026";
var STORY_DATE_WEEK3 = "Friday, Sep 18, 2026";
var STORY_DATE_WEEK4 = "Friday, Sep 25, 2026";
var STORIES = [
	{
		slug: "week-4-tape",
		kicker: "Week 4 tape",
		headline: "Week 4 tape: 42/57 SU, 20/57 closer FLAG. Top 25 closer 8/18.",
		dek: "Full slate closer is a FLAG. Top 25 closer 8/18 is a FLAG. SU 12/18 in that cut. HX not retuned.",
		date: STORY_DATE_TAPE_WEEK4,
		body: [
			"Week 4 SU 42/57 (73.7%). HX closer to the final than Vegas 20/57 (35.1%) — FLAG, under 45%. Vegas closer 37/57. HX ATS 28/57 (49.1%). FBS–FBS only, n=57. Season W1–W4: SU 80.8% (164/203) · closer 40.9% (83/203). Soft-cal FLAG. This week’s ledger, not a retune.",
			"HX Top 25 involvement (n=18, hx_rank ≤25 on the live HX 2026.5 board): closer 8/18 (44.4%) — FLAG, under 45%. Vegas 10/18. SU 12/18. Full slate closer stays FLAG. The ranked cut did not clear 45% either.",
			"Six SU misses in the Top 25 cut: Ole Miss @ Florida, Iowa @ Michigan, Wisconsin @ Penn State, Texas A&M @ LSU, Missouri @ Mississippi State, Minnesota @ Washington. Minnesota @ Washington was closer for HX (Washington −8.0 vs Vegas WASH −10, FINAL 27–24) and still an SU miss.",
			"HX closer hits in the Top 25 cut (8): Northwestern @ Indiana, Clemson @ California, Texas @ Tennessee, Notre Dame @ Purdue, Oklahoma @ Georgia, Oregon @ USC, Missouri State @ SMU, Minnesota @ Washington.",
			"Fifteen full-slate SU misses, HX favorites: Army @ Temple, Wake Forest @ Louisville, Hawaiʻi @ Wyoming, Ole Miss @ Florida, TCU @ UCF, Iowa @ Michigan, Boise State @ Western Michigan, Wisconsin @ Penn State, Kansas State @ Cincinnati, Oklahoma State @ West Virginia, Texas A&M @ LSU, Missouri @ Mississippi State, Georgia Tech @ Stanford, Air Force @ Nevada, Minnesota @ Washington. Winner-flip hits: Navy @ UAB (HX UAB −13.8 vs Vegas NAVY −7, FINAL 20–24), Clemson @ California (HX Clemson −6.7 vs Vegas CAL −1.5, FINAL 24–10). Winner-flip misses: Army @ Temple, Ole Miss @ Florida, Boise State @ Western Michigan, Texas A&M @ LSU, Missouri @ Mississippi State, Air Force @ Nevada. HX ATS 28/57 (49.1%). Full-slate MAE HX 12.79 / Vegas 11.21. Brier 0.181. Research Vegas pack + ESPN FINALs. Soft-cal FLAG. all-D still in force. HX not retuned."
		],
		whyItMatters: "Fourth public ledger of 2026. Full slate closer is a FLAG. Top 25 closer 8/18 is a FLAG. SU 12/18 in that cut. HX not retuned.",
		sources: [{
			label: "HASHMARK Board",
			href: "https://hashmarkcfb.com/"
		}, {
			label: "HASHMARK Schedule",
			href: "https://hashmarkcfb.com/schedule?w=4"
		}]
	},
	{
		slug: "week-4-texas-am-lsu",
		kicker: "Week 4 · Winner flip",
		headline: "HX takes Texas A&M. Vegas takes LSU by more than a touchdown.",
		dek: "Both sides are 2–1 after SEC opener losses — and HASHMARK flips the favorite in Death Valley.",
		date: STORY_DATE_WEEK4,
		body: [
			"No. 23 Texas A&M visits No. 10 LSU on Saturday (6:30 CT, ABC). Live HASHMARK posts a winner flip: Texas A&M −2.7 / 57.4%. The sourced Vegas close on the schedule is LSU −8.5, O/U 51.5 — roughly an 11-point HX–market disagreement and the loudest ranked flip of the week.",
			"HX ranks Texas A&M 6th (6.11) against an AP Week 4 ballot that dropped the Aggies from 9 to 23 after the home loss to Kentucky. LSU sits HX 19th (4.08) while AP still has the Tigers 10th. Post–Week 3 FPI splits the difference: LSU 8th, A&M 12th. Among boards HASHMARK tracks, HX is the A&M-leaning model.",
			"Context without inventing snaps: both lost Week 3 SEC openers as favorites. A&M WR Terry Bussey is out for the season (lower-body / right-leg injury on the Kentucky kickoff). LSU safety Dashawn Spears is out for the season (ACL vs Ole Miss); TE Trey’Dez Green is expected to miss time (knee). SI’s LSU injury card also lists CB Ja’Keem Jackson questionable and WR Phillip Wright III out. Sam Leavitt has five interceptions to three touchdown passes through three games; Marcel Reed is coming off a rough Kentucky tape."
		],
		whyItMatters: "Primetime winner flip + HX’s season-long A&M overrate vs AP plummet. Lead card for the weekend.",
		sources: [
			{
				label: "HASHMARK Board",
				href: "https://hashmarkcfb.com/"
			},
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=4"
			},
			{
				label: "CBS Sports",
				href: "https://www.cbssports.com/college-football/news/lsu-texas-am-prediction-picks-odds-spread-where-to-watch-live/"
			},
			{
				label: "SI · LSU",
				href: "https://www.si.com/college/lsu/football/no-10-lsu-vs-no-23-texas-am-how-to-watch-odds-injuries-and-more"
			},
			{
				label: "Yahoo · Week 4 guide",
				href: "https://sports.yahoo.com/college-football/article/week-4-college-football-viewers-guide-texas-at-tennessee-ole-miss-florida-iowa-michigan-lsu-oregon-usc-132448309.html"
			},
			{
				label: "NCAA.com · Week 4 AP",
				href: "https://www.ncaa.com/news/football/article/2026-09-20/ole-miss-enters-top-five-latest-ap-top-25-college-football-rankings"
			},
			{
				label: "The Big Lead · FPI",
				href: "https://www.thebiglead.com/updated-espn-fpi-college-football-top-25-rankings-after-wild-week-3/"
			}
		]
	},
	{
		slug: "week-4-ole-miss-florida",
		kicker: "Week 4 · Winner flip",
		headline: "Vegas has Florida −3.5. HX has Ole Miss −2.5. Lacy is a game-time call.",
		dek: "AP’s new No. 4 road underdog — and HASHMARK still takes the Rebels.",
		date: STORY_DATE_WEEK4,
		body: [
			"No. 4 Ole Miss visits No. 21 Florida on Saturday (2:30 CT, ABC). Live HASHMARK: Ole Miss −2.5 / 56.8%. Vegas close on the schedule: Florida −3.5, O/U 58.5 — another winner flip on the SEC slate.",
			"Ole Miss jumped to AP 4 after beating LSU 32–24. HX still has the Rebels 8th (5.45) — four spots behind the new ballot. Florida is HX 24th (3.50) and AP 21st in its first Sumrall-era ranking. FPI is warmer on Florida (16th) than HX is.",
			"The injury cloud is sourced. Junior RB Kewan Lacy re-injured his surgically repaired left shoulder vs LSU and opened Wednesday’s SEC availability report as questionable. Pete Golding said the MRI wasn’t nearly as bad as we thought and called him a game-time decision (SI Ole Miss, Sep 24). Yahoo notes LSU ran for 172 yards in Oxford — Florida’s Jadan Baugh has 458 rush yards and eight touchdowns through three games."
		],
		whyItMatters: "Second ABC winner flip of the day; Lacy status is the national desk’s injury lead.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=4"
			},
			{
				label: "SI · Ole Miss · Lacy",
				href: "https://www.si.com/college/olemiss/football/where-kewan-lacy-lands-on-first-injury-report-for-ole-miss-vs-florida"
			},
			{
				label: "Yahoo · Week 4 guide",
				href: "https://sports.yahoo.com/college-football/article/week-4-college-football-viewers-guide-texas-at-tennessee-ole-miss-florida-iowa-michigan-lsu-oregon-usc-132448309.html"
			},
			{
				label: "NCAA.com · Week 4 AP",
				href: "https://www.ncaa.com/news/football/article/2026-09-20/ole-miss-enters-top-five-latest-ap-top-25-college-football-rankings"
			},
			{
				label: "The Big Lead · FPI",
				href: "https://www.thebiglead.com/updated-espn-fpi-college-football-top-25-rankings-after-wild-week-3/"
			}
		]
	},
	{
		slug: "week-4-texas-tennessee",
		kicker: "Week 4 · GameDay",
		headline: "No. 1 Texas at No. 14 Tennessee — HX and Vegas are within a point.",
		dek: "College GameDay is in Knoxville. The HASHMARK number is not the disagreement story this time.",
		date: STORY_DATE_WEEK4,
		body: [
			"No. 1 Texas visits No. 14 Tennessee on Saturday (11:00 CT, ABC). Live HASHMARK: Texas −3.8 / 59.9%. Vegas close on the schedule: Texas −4.5, O/U 55.5. That is a rare close card on a weekend full of flips.",
			"HX ranks Texas 5th (6.44) against AP’s No. 1; Tennessee is HX 18th (4.08) vs AP 14. FPI has Texas 2nd and Tennessee 10th — so the market and FPI are closer to each other than either is to HX’s Texas under-rank relative to the ballot.",
			"Injury note for the desk: Texas RB Hollywood Smothers remains questionable (lower-leg) on the Thursday SEC report, with local reports flagging real concern he may not go. Do not invent snaps. Yahoo frames Faizon Brandon’s early Tennessee tape (nine total TDs, zero interceptions) against a Texas defense allowing 3.4 yards per carry."
		],
		whyItMatters: "National window + clean HX/Vegas agreement contrast against the A&M–LSU and Ole Miss–Florida flips.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=4"
			},
			{
				label: "Yahoo · Week 4 guide",
				href: "https://sports.yahoo.com/college-football/article/week-4-college-football-viewers-guide-texas-at-tennessee-ole-miss-florida-iowa-michigan-lsu-oregon-usc-132448309.html"
			},
			{
				label: "Rocky Top Insider · Smothers",
				href: "https://www.rockytopinsider.com/2026/09/24/key-texas-running-back-hollywood-smothers-remains-questionable-on-thursday-night-sec-injury-report-before-tennessee-game/"
			},
			{
				label: "NCAA.com · Week 4 AP",
				href: "https://www.ncaa.com/news/football/article/2026-09-20/ole-miss-enters-top-five-latest-ap-top-25-college-football-rankings"
			},
			{
				label: "The Big Lead · FPI",
				href: "https://www.thebiglead.com/updated-espn-fpi-college-football-top-25-rankings-after-wild-week-3/"
			}
		]
	},
	{
		slug: "week-4-oregon-usc",
		kicker: "Week 4 · HX Flag",
		headline: "Vegas has Oregon −3 at the Coliseum. HX has Oregon −6 — and ranks them fourth.",
		dek: "AP’s No. 20 Ducks are still HX’s No. 4. Saturday night NBC is the stress test.",
		date: STORY_DATE_WEEK4,
		body: [
			"No. 20 Oregon visits No. 12 USC on Saturday (6:30 CT, NBC). Live HASHMARK: Oregon −6.0 / 65.1%. Vegas close on the schedule: Oregon −3.0, O/U 62.5 — a three-point chill, not a smash gap, but the ranking disagreement is huge.",
			"HX has Oregon 4th (6.91) — +16 vs AP Week 4’s 20th, still the biggest positive AP gap among HX’s Top 10 after Texas A&M’s ballot freefall. USC is HX 21st (3.85) against AP 12. FPI has Oregon 9th and USC 18th, so HX is the Oregon-bullish board and the USC-skeptical one.",
			"Oregon already owns a loss (Oklahoma State in Week 2). USC is 4–0 but Yahoo flags 75 points allowed over the last two weeks, including 35 to Rutgers. Stick to the number on hashmarkcfb.com/schedule. Do not invent portal or injury angles beyond what the desk sources."
		],
		whyItMatters: "Clean brand story — HX’s Oregon overrate vs AP meets a live ranked road favorite.",
		sources: [
			{
				label: "HASHMARK Board",
				href: "https://hashmarkcfb.com/"
			},
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=4"
			},
			{
				label: "Yahoo · Week 4 guide",
				href: "https://sports.yahoo.com/college-football/article/week-4-college-football-viewers-guide-texas-at-tennessee-ole-miss-florida-iowa-michigan-lsu-oregon-usc-132448309.html"
			},
			{
				label: "NCAA.com · Week 4 AP",
				href: "https://www.ncaa.com/news/football/article/2026-09-20/ole-miss-enters-top-five-latest-ap-top-25-college-football-rankings"
			},
			{
				label: "The Big Lead · FPI",
				href: "https://www.thebiglead.com/updated-espn-fpi-college-football-top-25-rankings-after-wild-week-3/"
			}
		]
	},
	{
		slug: "week-4-clemson-cal",
		kicker: "Week 4 · Friday",
		headline: "Vegas has Cal −1.5. HX has Clemson −6.7.",
		dek: "ACC after dark — HASHMARK flips the favorite in Berkeley.",
		date: STORY_DATE_WEEK4,
		body: [
			"Clemson visits California on Friday (9:30 CT, ESPN). Live HASHMARK: Clemson −6.7 / 66.5%. Vegas close on the schedule: Cal −1.5, O/U 50.5 — a winner flip and the Friday late window.",
			"HX still has Clemson 22nd (3.83) after the LSU loss in Week 1 and the UNC win last week; AP has the Tigers unranked. Yahoo notes freshman QB Tait Reynolds in his first road start after the weather-delayed UNC win, with Cal CB Kingston Lopa at five interceptions after Wagner.",
			"Last week’s UNC–Clemson card was the loudest spread gap on the board (HX Clemson −21.6 vs Vegas −3.5). This week the absolute gap is smaller, but the favorite flip is cleaner for social. Stick to the live schedule number."
		],
		whyItMatters: "Ready Friday social before the Saturday ABC slate; keeps the Clemson HX-over-AP thread alive.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=4"
			},
			{
				label: "HASHMARK Board",
				href: "https://hashmarkcfb.com/"
			},
			{
				label: "Yahoo · Week 4 guide",
				href: "https://sports.yahoo.com/college-football/article/week-4-college-football-viewers-guide-texas-at-tennessee-ole-miss-florida-iowa-michigan-lsu-oregon-usc-132448309.html"
			}
		]
	},
	{
		slug: "week-4-missouri-mississippi-state",
		kicker: "Week 4 · Winner flip",
		headline: "Vegas has Miss State −6.5. HX has Missouri −9.5.",
		dek: "Two newly relevant SEC teams — and HASHMARK flips the home favorite in Starkville.",
		date: STORY_DATE_WEEK4,
		body: [
			"No. 19 Missouri visits No. 24 Mississippi State on Saturday (6:45 CT, SEC Network). Live HASHMARK: Missouri −9.5 / 71.9%. Vegas close on the schedule: Miss St −6.5, O/U 58.5 — a winner flip of roughly 16 points from favorite to favorite.",
			"HX ranks Missouri 15th (4.26) vs AP 19; Mississippi State is HX 67th (0.20) while AP Week 4 has the Bulldogs 24th for the first time since 2022. That is a massive HX–ballot disagreement on the home side. FPI has Mississippi State 22nd — closer to AP than to HX.",
			"Yahoo frames Kamario Taylor’s early star turn and last year’s 4–0-then-collapse MSU pattern. Stick to the schedule number. Pair with A&M–LSU and Ole Miss–Florida if the cut is an SEC flips thread — Missouri is the quiet third flip on Saturday night."
		],
		whyItMatters: "Completes the SEC winner-flip trio; HX’s Miss State under-rank vs a new AP entry.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=4"
			},
			{
				label: "HASHMARK Board",
				href: "https://hashmarkcfb.com/"
			},
			{
				label: "Yahoo · Week 4 guide",
				href: "https://sports.yahoo.com/college-football/article/week-4-college-football-viewers-guide-texas-at-tennessee-ole-miss-florida-iowa-michigan-lsu-oregon-usc-132448309.html"
			},
			{
				label: "NCAA.com · Week 4 AP",
				href: "https://www.ncaa.com/news/football/article/2026-09-20/ole-miss-enters-top-five-latest-ap-top-25-college-football-rankings"
			},
			{
				label: "The Big Lead · FPI",
				href: "https://www.thebiglead.com/updated-espn-fpi-college-football-top-25-rankings-after-wild-week-3/"
			}
		]
	},
	{
		slug: "week-3-tape",
		kicker: "Week 3 tape",
		headline: "Week 3 tape: 49/56 SU, 23/56 closer FLAG. Top 25 closer 5/21.",
		dek: "Full slate closer is a FLAG. Top 25 closer 5/21. SU 20/21 in that cut. HX not retuned.",
		date: STORY_DATE_TAPE_WEEK3,
		body: [
			"Week 3 SU 49/56 (87.5%). HX closer to the final than Vegas 23/56 (41.1%) — FLAG, under 45%. Vegas closer 33/56. HX ATS 29/56 (51.8%). FBS–FBS only, n=56. Season W1–W3: SU 83.6% (122/146) · closer 43.2% (63/146). This week’s ledger, not the 70.8% 2019–2025 claim.",
			"HX Top 25 involvement (n=21, hx_rank ≤25 on the live board): closer 5/21 (23.8%). Vegas 16/21. SU 20/21. Full slate closer stays FLAG. The ranked cut was not the scorecard beat this week — margin accuracy lagged Vegas on several chalk blowouts.",
			"The one SU miss in the Top 25 cut: Kentucky @ Texas A&M (HX Texas A&M −26.0 / Vegas TA&M −16.5 / FINAL Kentucky 31–Texas A&M 21). Vegas closer.",
			"HX closer hits in the Top 25 cut (5): Miami @ Wake Forest, USC @ Rutgers, Troy @ Missouri, LSU @ Ole Miss, UTSA @ Texas.",
			"Seven full-slate SU misses, HX favorites: Kentucky @ Texas A&M, Mississippi State @ South Carolina, East Carolina @ Old Dominion, UConn @ Southern Miss, Ohio @ South Alabama, West Virginia @ Virginia, James Madison @ San Diego State. Winner-flip hits: Nevada @ Middle Tennessee (HX Middle Tennessee −5.0 vs Vegas NEV −3.5, FINAL 20–27), LSU @ Ole Miss (HX Ole Miss −7.8 vs Vegas LSU −3, FINAL 24–32). Winner-flip misses: UConn @ Southern Miss, Ohio @ South Alabama. HX ATS 29/56 (51.8%). Full-slate MAE HX 10.03 / Vegas 8.71. Brier 0.119. Research Vegas pack + ESPN FINALs. HX not retuned."
		],
		whyItMatters: "Third public ledger of 2026. Full slate closer is a FLAG. Top 25 closer 5/21. SU 20/21 in that cut. HX not retuned.",
		sources: [{
			label: "HASHMARK Board",
			href: "https://hashmarkcfb.com/"
		}, {
			label: "HASHMARK Schedule",
			href: "https://hashmarkcfb.com/schedule?w=3"
		}]
	},
	{
		slug: "week-3-houston-texas-tech",
		kicker: "Week 3 · Friday",
		headline: "Vegas has Texas Tech −7.5. HX has Tech −18.8.",
		dek: "Friday night FOX is the first stress test of HASHMARK’s Tech overrate vs AP.",
		date: STORY_DATE_WEEK3,
		body: [
			"No. 22 Houston visits No. 13 Texas Tech on Friday (7:00 CT, FOX). Live HASHMARK: Texas Tech −18.8 / 84.4%. Vegas close on the schedule: Texas Tech −7.5 — an ~11-point gap and the loudest Friday card.",
			"HX ranks Texas Tech 7th (5.84), +6 vs AP’s 13. Houston sits AP 22 / HX 41 (−19), the second-largest negative AP gap on the Week 3 disagreement card. Post–Week 2 FPI has Tech 16th; SP+ has Tech 15th (19.1). HX is the bullish Tech model among the boards HASHMARK tracks.",
			"This is an HX-vs-market and HX-vs-ballot story, not a claim about Houston’s résumé after two wins. The number on the schedule is the post. If Tech covers like an HX 7 seed, the prior looks early. If Houston keeps it one-score, the book was closer."
		],
		whyItMatters: "Ready Friday social before the Magnolia Bowl lead; HX brand disagreement with a live kick tonight.",
		sources: [
			{
				label: "HASHMARK Board",
				href: "https://hashmarkcfb.com/"
			},
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=3"
			},
			{
				label: "NCAA.com · Week 3 AP",
				href: "https://www.ncaa.com/news/football/article/2026-09-13/texas-climbs-no-1-oregon-plummets-latest-ap-top-25-college-football-rankings"
			},
			{
				label: "The Big Lead · FPI",
				href: "https://www.thebiglead.com/updated-espn-fpi-college-football-top-25-rankings-after-wild-week-2/"
			},
			{
				label: "Gators Wire · SP+",
				href: "https://gatorswire.usatoday.com/story/sports/college/gators/football/2026/09/13/florida-football-sp-rankings-ratings-week-2-campbell-win/91746475007/"
			}
		]
	},
	{
		slug: "week-3-lsu-ole-miss",
		kicker: "Week 3 · Magnolia Bowl",
		headline: "HX takes Ole Miss. Vegas takes LSU. Leavitt is questionable.",
		dek: "First AP top-10 Magnolia Bowl since 1962 — and HASHMARK flips the favorite in Oxford.",
		date: STORY_DATE_WEEK3,
		body: [
			"No. 7 LSU visits No. 8 Ole Miss on Saturday (6:30 CT, ABC). Live HASHMARK posts a winner flip: Ole Miss −7.8 / 68.8%. The sourced Vegas close on the schedule is LSU −3.0, O/U 59.5.",
			"That is the cleanest HX-vs-market card of the weekend. HX ranks Ole Miss 8th (5.46) — even with AP — and still has LSU 19th (4.06) against an AP ballot that has the Tigers 7th. Public boards are warmer on LSU than HX: post–Week 2 FPI has LSU 9th and Ole Miss 17th; SP+ (Sept. 13) has LSU 8th (24.1) and Ole Miss 20th (15.2). HX is the Rebel-leaning model among the boards HASHMARK tracks.",
			"The injury cloud is real and sourced. LSU QB Sam Leavitt was upgraded from doubtful to questionable on Thursday’s SEC availability report. Reuters / Field Level Media and WAFB report he missed Wednesday with back spasms (per LouisianaSports.net / Matt Moscona) and returned Thursday; the SEC report itself does not name the injury. Lane Kiffin stayed quiet. If he sits, backups Husan Longstreet or Landen Clark are the next names in the public notes — do not invent snaps.",
			"Context without inventing: first time both sides enter AP top 10 since 1962 (WLBT / Saturday Down South); Kiffin’s first game back at Vaught-Hemingway as LSU coach."
		],
		whyItMatters: "Primetime winner flip + Leavitt status + HX’s season-long LSU under-rank vs AP. Lead card for the weekend.",
		sources: [
			{
				label: "HASHMARK Board",
				href: "https://hashmarkcfb.com/"
			},
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=3"
			},
			{
				label: "Reuters · Leavitt questionable",
				href: "https://www.reuters.com/sports/lsu-qb-sam-leavitt-upgraded-questionable-vs-ole-miss--flm-2026-09-18/"
			},
			{
				label: "WAFB",
				href: "https://www.wafb.com/2026/09/18/lsu-qb-sam-leavitt-no-longer-listed-doubtful-ahead-ole-miss-matchup/"
			},
			{
				label: "WLBT · Magnolia Bowl since 1962",
				href: "https://www.wlbt.com/2026/09/18/no-8-ole-miss-no-7-lsu-meet-first-top-10-magnolia-bowl-since-1962/"
			},
			{
				label: "NCAA.com · Week 3 AP",
				href: "https://www.ncaa.com/news/football/article/2026-09-13/texas-climbs-no-1-oregon-plummets-latest-ap-top-25-college-football-rankings"
			},
			{
				label: "The Big Lead · FPI",
				href: "https://www.thebiglead.com/updated-espn-fpi-college-football-top-25-rankings-after-wild-week-2/"
			},
			{
				label: "Gators Wire · SP+",
				href: "https://gatorswire.usatoday.com/story/sports/college/gators/football/2026/09/13/florida-football-sp-rankings-ratings-week-2-campbell-win/91746475007/"
			}
		]
	},
	{
		slug: "week-3-unc-clemson",
		kicker: "Week 3 · HX Flag",
		headline: "Vegas has Clemson −3.5. HX has Clemson −21.6.",
		dek: "An ~18-point chill is the biggest HX–market disagreement on the Week 3 Top 25–adjacent slate.",
		date: STORY_DATE_WEEK3,
		body: [
			"North Carolina visits Clemson on Saturday (11:00 CT, ESPN/Disney+). Live HASHMARK: Clemson −21.6 / 86.9%. Vegas close on the schedule: Clemson −3.5, O/U 44.5.",
			"That absolute gap (~18 points) dwarfs most of the weekend’s ranked cards. HX still has Clemson 22nd (3.83) after the LSU loss — AP has the Tigers unranked. The market is pricing a short-field-goal favorite; HX is pricing a three-score home side.",
			"Belichick’s UNC is the road story the national desk will write. Stick to the number on the HASHMARK schedule. Do not invent Carolina injury or portal angles. Pair with Indiana–WKU and USC–Rutgers if the cut is “where HX and Vegas disagree” — Clemson is the largest sourced spread gap among the featured cards."
		],
		whyItMatters: "Largest sourced HX–Vegas spread gap on the Week 3 slate HASHMARK is featuring.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=3"
			},
			{
				label: "HASHMARK Board",
				href: "https://hashmarkcfb.com/"
			},
			{
				label: "NCAA.com · Week 3 AP",
				href: "https://www.ncaa.com/news/football/article/2026-09-13/texas-climbs-no-1-oregon-plummets-latest-ap-top-25-college-football-rankings"
			}
		]
	},
	{
		slug: "week-3-usc-rutgers",
		kicker: "Week 3 · HX Flag",
		headline: "Vegas wants USC −23.5 at Rutgers. HX has −9.3.",
		dek: "A 14-point chill on CBS — and the Trojans’ leading receiver is out.",
		date: STORY_DATE_WEEK3,
		body: [
			"No. 12 USC visits Rutgers on Saturday (2:30 CT, CBS) for the Big Ten opener. Live HASHMARK: USC −9.3 / 71.5%. Vegas close on the schedule: USC −23.5, O/U 59.5.",
			"That is a clear “HX cools chalk” card. HX ranks USC 21st (3.88) against AP 12. FPI has USC 10th; SP+ has USC 12th (19.5). HX is cooler on the Trojans than the poll, FPI, and the book.",
			"Injury context is sourced, not invented. Freshman WR Trent Mosley is Out on USC’s first Big Ten injury report vs Rutgers. Lincoln Riley told SI the timeline is “not extremely long-term” but still inconclusive; CBS’s Matt Zenitz reported Mosley is expected to miss multiple games. Mosley had 13 catches, 255 yards, four TDs through three games (SI). Do not invent snap counts for anyone else — the spread gap is the story; the injury is the public why."
		],
		whyItMatters: "Second-largest featured chill after Clemson/Indiana; pairs injury news with an HX–Vegas disagreement.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=3"
			},
			{
				label: "HASHMARK Board",
				href: "https://hashmarkcfb.com/"
			},
			{
				label: "Sports Illustrated · Mosley",
				href: "https://www.si.com/college/usc/football/lincoln-riley-explains-trent-mosley-status-official-injury-report"
			},
			{
				label: "ESPN · Mosley",
				href: "https://www.espn.com/college-football/story/_/id/49961942/usc-star-freshman-receiver-trent-mosley-vs-rutgers-undisclosed-injury"
			},
			{
				label: "NCAA.com · Week 3 AP",
				href: "https://www.ncaa.com/news/football/article/2026-09-13/texas-climbs-no-1-oregon-plummets-latest-ap-top-25-college-football-rankings"
			},
			{
				label: "The Big Lead · FPI",
				href: "https://www.thebiglead.com/updated-espn-fpi-college-football-top-25-rankings-after-wild-week-2/"
			},
			{
				label: "Gators Wire · SP+",
				href: "https://gatorswire.usatoday.com/story/sports/college/gators/football/2026/09/13/florida-football-sp-rankings-ratings-week-2-campbell-win/91746475007/"
			}
		]
	},
	{
		slug: "week-3-indiana-wku",
		kicker: "Week 3 · HX Flag",
		headline: "Vegas has Indiana −44.5. HX has Indiana −20.8.",
		dek: "A 23-point chill on Peacock — HASHMARK refuses the smash number.",
		date: STORY_DATE_WEEK3,
		body: [
			"Western Kentucky visits No. 4 Indiana on Saturday (3:00 CT, Peacock). Live HASHMARK: Indiana −20.8 / 86.1%. Vegas close on the schedule: Indiana −44.5, O/U 60.5.",
			"That is the largest absolute HX–Vegas gap on the featured Week 3 cards. HX ranks Indiana 11th (4.98) against AP 4. FPI has Indiana 6th; SP+ has Indiana 5th (25.4). Public efficiency boards and the ballot love the Hoosiers more than HX does — and the book is pricing a five-touchdown favorite HX will not match.",
			"Do not invent WKU injury or Indiana portal angles. When the market goes nuclear, HX stays inside two to three scores. Pair with Clemson (−21.6 vs −3.5) and USC (−9.3 vs −23.5) for a three-chills cut."
		],
		whyItMatters: "Largest featured absolute spread gap; frames HX as the cooler chalk model on smash favorites.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=3"
			},
			{
				label: "HASHMARK Board",
				href: "https://hashmarkcfb.com/"
			},
			{
				label: "NCAA.com · Week 3 AP",
				href: "https://www.ncaa.com/news/football/article/2026-09-13/texas-climbs-no-1-oregon-plummets-latest-ap-top-25-college-football-rankings"
			},
			{
				label: "The Big Lead · FPI",
				href: "https://www.thebiglead.com/updated-espn-fpi-college-football-top-25-rankings-after-wild-week-2/"
			},
			{
				label: "Gators Wire · SP+",
				href: "https://gatorswire.usatoday.com/story/sports/college/gators/football/2026/09/13/florida-football-sp-rankings-ratings-week-2-campbell-win/91746475007/"
			}
		]
	},
	{
		slug: "week-2-tape",
		kicker: "Week 2 tape",
		headline: "Week 2 tape: 37/47 SU, 20/47 closer FLAG. Top 25 closer 12/19.",
		dek: "Full slate closer is a FLAG. HX Top 25 desk beat the book 12/19. HX not retuned.",
		date: STORY_DATE_TAPE_WEEK2,
		body: [
			"Week 2 SU 37/47 (78.7%). HX closer to the final than Vegas 20/47 (42.6%) — FLAG, under 45%. Vegas closer 27/47. FBS–FBS only, n=47. Season W1–W2: SU 81.1% · closer 44.4%. This week’s ledger, not the 70.8% 2019–2025 claim.",
			"HX Top 25 involvement (n=19, hx_rank ≤25 on HX 2026.3 pre-Δ): closer 12/19 (63.2%). Vegas 7/19. SU 17/19. MAE HX 10.81 / Vegas 12.03. That is the public scorecard beat. Full slate closer is soft. The ranked desk beat the book. AP-only alt is 12/18 (66.7%); HX Top 25 is the cut.",
			"The two SU misses in the Top 25 cut: Oregon @ OKST (HX Oregon −27.0 / Vegas ORE −23.5 / FINAL 31–39) and OSU @ Texas (HX Ohio St −1.0 / Vegas TEX −1.5 / FINAL 23–24). Both Vegas closer.",
			"HX closer hits (12): Missouri @ Kansas, OU @ Michigan, ASU @ Texas A&M, Arizona @ BYU, Rice @ Notre Dame, Alabama @ Kentucky, Utah St @ Washington, Iowa St @ Iowa, Louisiana Tech @ LSU, Texas Tech @ Oregon St, Arkansas @ Utah, Louisiana @ USC. Vegas closer (7): Oregon @ OKST, Penn St @ Temple, WKU @ Georgia, Tennessee @ Georgia Tech, Georgia Southern @ Clemson, OSU @ Texas, Charlotte @ Ole Miss.",
			"Michigan winner-flip HIT: HX Mich −5.4 vs Vegas OU −5.5, FINAL Mich 17–10. Ten full-slate SU misses, HX favorites: Rutgers @ BC, App @ ECU, Oregon @ OKST, Duke @ Illinois, MSST @ Minnesota, UTSA @ Texas St, UNLV @ UNT, GaSt @ Kennesaw, Tulsa @ Sam Houston, OSU @ Texas. Winner-flip hits: USF @ Army, OU @ Michigan, Cal @ Syracuse, Navy @ FAU. HX ATS 20/47 (42.6%). Full-slate MAE HX 12.2 / Vegas 10.49. Brier 0.147. Research Vegas pack + ESPN FINALs. Tape is pre-Δ. HX stays 2026.3. No retune."
		],
		whyItMatters: "Second public ledger of 2026. Full slate closer is a FLAG. Top 25 desk beat Vegas 12/19. HX stays 2026.3 until a separate 2026.4 ship.",
		sources: [{
			label: "HASHMARK Board",
			href: "https://hashmarkcfb.com/"
		}, {
			label: "HASHMARK Schedule",
			href: "https://hashmarkcfb.com/schedule?w=2"
		}]
	},
	{
		slug: "week-1-tape",
		kicker: "Week 1 tape",
		headline: "Week 1 tape: 36/43 SU, 20/43 closer. HX not retuned.",
		dek: "Straight-up holds. Closer is a coin. Movers are O/D EPA — not a second rating.",
		date: STORY_DATE_TAPE,
		body: [
			"Week 1 SU 36/43 (83.7%). HX closer to the final than Vegas 20/43 (46.5%). Same tape, two scores. The SU number is this week’s ledger, not the 70.8% 2019–2025 claim.",
			"Top |ΔHX| movers are O/D EPA — Rutgers, UMass, James Madison, Liberty, Notre Dame, Wisconsin. Term = O/D. No HX retune. No second rating.",
			"The board’s disagreement card is Week 1 AP, not the Aug 17 preseason ballot. Virginia (−20), Houston (−18), LSU (−11), Missouri (+9), Texas Tech (+6) are the flags."
		],
		whyItMatters: "First full-slate public ledger of 2026. SU is the hit; closer is not. HX stays 2026.3.",
		sources: [{
			label: "HASHMARK Board",
			href: "https://hashmarkcfb.com/"
		}, {
			label: "HASHMARK Schedule",
			href: "https://hashmarkcfb.com/schedule?w=1"
		}]
	},
	{
		slug: "week-1-lsu-clemson-gap",
		kicker: "Week 1 · HX Flag",
		headline: "HX sees Clemson–LSU as a one-score game. Vegas does not.",
		dek: "Lane Kiffin’s debut in Baton Rouge is priced like a double-digit home favorite. HASHMARK is barely buying it.",
		date: STORY_DATE_WEEK1,
		body: [
			"Clemson visits LSU Saturday night (6:30 CT, ABC). Live HX has LSU at −3.6 (59.5% win probability). The sourced Vegas close on the Week 1 schedule is LSU −10.5 with O/U 51.5 — nearly seven points of daylight, the largest HX-vs-Vegas disagreement on the Week 1 slate.",
			"Preseason AP has LSU 11th. HX has them 20th (4.02), nine spots below the ballot, the largest HX–AP rank gap among ranked teams. Clemson is HX 21st and unranked in AP. ESPN FPI’s preseason title-odds table still keeps LSU in the top-10 championship conversation. HX is cooler on the Kiffin reboot until the tape proves otherwise.",
			"This is the cleanest trust-the-model-or-trust-the-market card of Week 1."
		],
		whyItMatters: "Biggest live HX–Vegas gap; also the largest HX–AP rank gap among ranked teams.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=1"
			},
			{
				label: "HASHMARK Board",
				href: "https://hashmarkcfb.com/"
			},
			{
				label: "NBC Sports",
				href: "https://www.nbcsports.com/betting/college-football/news/lsu-vs-clemson-prediction-odds-expert-picks-team-and-player-news-betting-trends-and-stats"
			},
			{
				label: "Action Network",
				href: "https://www.actionnetwork.com/ncaaf-game/clemson-lsu-score-odds-september-5-2026/287971"
			},
			{
				label: "AP Top 25",
				href: "https://apnews.com/hub/ap-top-25-college-football-poll"
			}
		]
	},
	{
		slug: "week-1-georgia-hx-one",
		kicker: "Week 1 · Board",
		headline: "HX opens Week 1 with Georgia on top — and Ohio State as the consensus counterweight",
		dek: "A 0.04 HX edge over the Buckeyes puts Kirby Smart ahead of AP, FPI, and SP+.",
		date: STORY_DATE_WEEK1,
		body: ["The live Top 25 still reads Georgia 7.89, Ohio State 7.85. Preseason AP has Ohio State No. 1 and Georgia No. 3. ESPN’s preseason FPI posts Ohio State No. 1 (FPI 28.7) with the highest national-title odds; Georgia sits fifth in that title-odds ordering. Bill Connelly’s final preseason SP+ crowned Ohio State No. 1 (32.7) with Georgia around No. 4 (26.4).", "Roster talent composite still lists Georgia first (94.3). Ohio State hosts Ball State Saturday (11:30 CT, BTN) as a −68.7 HX smash. HX is a talent-and-efficiency prior, not a résumé poll. That 0.04 gap is the brand disagreement."],
		whyItMatters: "Defines HASHMARK vs AP/FPI/SP+ for the season-long comparison desk.",
		sources: [
			{
				label: "HASHMARK Board",
				href: "https://hashmarkcfb.com/"
			},
			{
				label: "AP Top 25",
				href: "https://sportsdata.usatoday.com/football/ncaaf/ap-poll"
			},
			{
				label: "On3 · ESPN FPI",
				href: "https://www.on3.com/teams/ohio-state-buckeyes/news/ohio-state-buckeyes-football-espn-fpi-preseason-top-25-rankings-2/"
			},
			{
				label: "On3 · Preseason Top 25",
				href: "https://www.on3.com/news/espn-reveals-final-update-to-preseason-top-25-rankings-ahead-of-2026-college-football-season/"
			},
			{
				label: "ESPN · SP+",
				href: "https://www.espn.com/college-football/story/_/id/49593338/final-preseason-college-football-sp+-rankings-takeaways-2026"
			}
		]
	},
	{
		slug: "week-1-miami-stanford-gap",
		kicker: "Week 1 · HX Flag",
		headline: "Miami −17 at Stanford on HX. Vegas wants −23.5.",
		dek: "Friday night in Palo Alto is the other big market disagreement on the live HASHMARK board.",
		date: STORY_DATE_WEEK1,
		body: ["No. 7 / HX No. 10 Miami opens at Stanford Friday (8:00 CT, ESPN). HASHMARK posts Miami −17.0 (82.5%). The sourced Vegas close on the Week 1 schedule is Miami −23.5 — a 6.5-point chill from HX versus the market, second only to the LSU gap.", "Miami is still top-10 (5.23) but three spots below preseason AP (No. 7). Stanford already has a Week 0 win (37–27 over Hawaiʻi). HX is not fading Miami so much as refusing to price a three-touchdown road cover off one Cardinal tape."],
		whyItMatters: "Second-largest sourced HX–Vegas gap; clean Friday lead.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=1"
			},
			{
				label: "HASHMARK Board",
				href: "https://hashmarkcfb.com/"
			},
			{
				label: "NCAA.com TV schedule",
				href: "https://www.ncaa.com/news/football/article/college-football-tv-schedule-game-times-preview"
			}
		]
	},
	{
		slug: "week-1-oregon-boise",
		kicker: "Week 1 · Matchup",
		headline: "No. 2 Oregon hosts a CFP-proven Boise State — HX still wants a multi-score Autzen night",
		dek: "The Ducks’ nonconference home streak meets a Pac-12 flagship with playoff recent history.",
		date: STORY_DATE_WEEK1,
		body: ["Saturday at Autzen (2:30 CT, CBS). Preseason AP No. 2 Oregon (HX No. 4, 6.97) hosts Boise State. HX has Oregon −25.1 (89.4%). Public books sit in the mid-20s — CBS Sports / Bleacher Report around Oregon −24.5, total near 51.5. HASHMARK’s Vegas column on this game is blank, so that is not a HASHMARK close.", "Oregon’s long FBS nonconference home streak meets a Pac-12 flagship with recent CFP history. HX is slightly cooler than AP (−2) and still top-five. If Boise keeps it inside two scores, that is a national story."],
		whyItMatters: "Best on-paper Week 1 game that isn’t ranked-ranked; CFP path optics.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=1"
			},
			{
				label: "CBS Sports",
				href: "https://www.cbssports.com/college-football/news/oregon-boise-state-prediction-pick-odds-spread-where-to-watch-live/"
			},
			{
				label: "Oregon Public Broadcasting",
				href: "https://www.opb.org/article/2026/09/03/oregon-hosts-boise-state-indiana-opens-title-defense-big-ten-football/"
			},
			{
				label: "NCAA.com",
				href: "https://www.ncaa.com/game/6604288"
			}
		]
	},
	{
		slug: "week-1-ole-miss-louisville",
		kicker: "Week 1 · Ranked",
		headline: "Ole Miss–Louisville in Nashville is Week 1’s only Top 25 collision — and HX almost agrees with Vegas",
		dek: "A rare case where HASHMARK and the market are within a point and a half.",
		date: STORY_DATE_WEEK1,
		body: ["Sunday night at Nissan Stadium (6:30 CT, ABC): inaugural Music City Kickoff, the only ranked-on-ranked game in Week 1 — AP No. 9 Ole Miss vs No. 24 Louisville. HX has Ole Miss −7.9 (68.9%). The sourced Vegas close is Ole Miss −6.5 (O/U 55.5).", "HX ranks Ole Miss eighth (5.49, +1 vs AP). This is the models-agree counterpoint to the LSU card. The first regular-season AP poll posts Tuesday, Sept. 8."],
		whyItMatters: "Sole ranked-ranked Week 1 game; clean HX≈Vegas control story.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=1"
			},
			{
				label: "Associated Press",
				href: "https://apnews.com/live/top-25-college-football-poll-8-17-2026"
			},
			{
				label: "NCAA.com TV schedule",
				href: "https://www.ncaa.com/news/football/article/college-football-tv-schedule-game-times-preview"
			}
		]
	},
	{
		slug: "week-1-notre-dame-lambeau",
		kicker: "Week 1 · Board",
		headline: "Notre Dame at Lambeau, plus the HX cards that don’t look like chalk",
		dek: "HX backs the Irish by three scores and quietly likes Toledo at Michigan State.",
		date: STORY_DATE_WEEK1,
		body: ["Sunday, Wisconsin vs No. 4 Notre Dame at Lambeau Field (6:30 CT, NBC). HX has Notre Dame −21.9 (87.1%). The sourced Vegas close is Notre Dame −20.5 (O/U 47.5). HX ranks the Irish third (7.09).", "Quiet notes off the same board: Cal −1.3 over UCLA (53.5%) is the only game in the 45–55% zone. Toledo −7.0 at Michigan State (67.1%, Friday 7:00 CT, FS1) — flag it; HASHMARK’s Vegas column is blank, so there is no HASHMARK close. Monday, SMU at Florida State is HX SMU −8.3 (69.6%)."],
		whyItMatters: "Packages Sunday brand game with board curios that need Vegas fills.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=1"
			},
			{
				label: "Oregon Public Broadcasting",
				href: "https://www.opb.org/article/2026/09/03/oregon-hosts-boise-state-indiana-opens-title-defense-big-ten-football/"
			},
			{
				label: "HASHMARK Board",
				href: "https://hashmarkcfb.com/"
			}
		]
	},
	{
		slug: "week-0-tape",
		kicker: "Week 0 tape",
		headline: "Week 0 tape: 3/6 SU, 1/6 ATS. HX not retuned.",
		dek: "Hits USC, Virginia, Florida State. Misses Dublin, the Hawaiʻi flip, Memphis at UNLV. Vegas 4/6.",
		date: "Sunday, Aug 30, 2026",
		body: [
			"Pregame locks from /schedule. Elo = 1500 + 55×HX, HFA 60 (off on Neutral), quadratic spread. Win% was frozen. 70.8% SU is a 2019–2025 claim, not this tape.",
			"Hits: San José St at USC — HASHMARK USC 95.0% / −37.8, Vegas −38.5, final USC 42–26. SU hit, ATS no. NC State at Virginia — UVA 52.9% / −1.1, Vegas −4.0, final UVA 34–8. SU and ATS both hit. NM State at Florida St — FSU 87.7% / −22.6, Vegas −31.5, final FSU 34–17. SU hit, closer than Vegas, ATS no.",
			"Misses: UNC vs TCU, Dublin Neutral — TCU 74.2% / −10.9, Vegas −8.5, final UNC 15–10. Rain, 25 points, TCU WR Jordan Dwyer out. Dwyer is a note. We did not haircut the number. Hawaiʻi at Stanford, the flag — HASHMARK UH 53.8% / −1.4, Vegas Stanford −4.0, final Stanford 37–27. Frozen coach-change. If C20 had been on the matchup, Stanford ~59.6% / −3.6, near the close. That is a note, not a retune. Memphis at UNLV — UNLV 63.5% / −5.3, Vegas −4.0, final Memphis 27–21.",
			"NDSU and Sacramento State stay off this piece. They are not on the 136. Next week the matchup shows HX* win% and a units score. If they disagree by 4, the site flags it."
		],
		whyItMatters: "First 2026 public ledger vs the close. The 70.8% number waits until this tape has a season behind it.",
		sources: [{
			label: "HASHMARK Schedule",
			href: "https://hashmarkcfb.com/schedule"
		}]
	},
	{
		slug: "dublin-unc-tcu",
		kicker: "Week 0 · Dublin",
		headline: "College football’s 2026 season opens in Dublin — UNC–TCU, take two",
		dek: "Bill Belichick’s second North Carolina team gets an overseas rematch with the TCU club that wrecked his debut.",
		date: STORY_DATE,
		body: [
			"The first FBS snap of 2026 will be taken an ocean away. North Carolina and TCU kick off the Aer Lingus College Football Classic at 11 a.m. CT Saturday at Aviva Stadium in Dublin, on ESPN — the fifth straight year the sport has opened in Ireland.",
			"This is not a random pairing. Last September in Chapel Hill, TCU beat the Tar Heels 48–14 in Belichick’s first game as a college head coach: 542 yards, 258 on the ground, three UNC turnovers flipped into two defensive scores. The Horned Frogs are different now. Josh Hoover transferred to Indiana. Offensive coordinator Kendal Briles left for South Carolina. Harvard transfer Jaden Craig is the new quarterback; former UConn OC Gordon Sammis is calling plays. TCU is receiving votes in the AP poll (11 points). UNC is unranked.",
			"HASHMARK is not close. TCU is HX 30, UNC HX 87. The model does not buy a revenge narrative. It buys a Power roster against a roster that was 4–8 a year ago.",
			"The Tar Heels named sixth-year transfer Billy Edwards Jr. (Maryland, Wisconsin) the starter. Belichick has preached ball security and explosive-play prevention all week. Defensive coordinator Steve Belichick remains on medical leave, and Bill will call the defense.",
			"There is no ranked-vs-ranked game in Week 0. This is the closest the sport has to a marquee opener."
		],
		whyItMatters: "Sets the tone for Belichick Year 2. HX says the scoreboard should not be a mystery.",
		sources: [{
			label: "ESPN Press Room",
			href: "https://espnpressroom.com/press-release/college-football-returns-espns-week-0-slate-opens-2026-season-with-dublin-duel-all-acc-clash-cricket-meac-swac-challenge-kickoff-and-more/"
		}, {
			label: "CBS Sports",
			href: "https://www.cbssports.com/college-football/news/bill-belichick-defensive-play-caller-north-carolina-tcu-opener/"
		}]
	},
	{
		slug: "belichick-calls-defense",
		kicker: "Week 0 · UNC",
		headline: "Bill Belichick will call UNC’s defense vs. TCU with Steve Belichick still out",
		dek: "North Carolina’s defensive coordinator remains on medical leave; his father takes the play sheet for the Dublin opener.",
		date: STORY_DATE,
		body: [
			"Steve Belichick was placed on medical leave Aug. 6. UNC has given no diagnosis and no return timeline. Bill said only, “Yeah, no updates,” and “We’ll work it out.”",
			"CBS Sports, citing On3, reports Bill Belichick will hold the defensive play sheet in Dublin. Defensive line coach Bob Diaco has led much of the in-week planning. Belichick last called a defense full-time with the 2019 Patriots.",
			"UNC’s defense was torched in last year’s TCU opener (48 points, 542 yards) and climbed to 24.5 points allowed per game by December. As of Friday, Aug. 28, Steve Belichick is out for the opener."
		],
		whyItMatters: "The only confirmed coaching-structure change affecting a Week 0 Power matchup.",
		sources: [{
			label: "CBS Sports",
			href: "https://www.cbssports.com/college-football/news/bill-belichick-defensive-play-caller-north-carolina-tcu-opener/"
		}]
	},
	{
		slug: "memphis-at-unlv",
		kicker: "Week 0 · Group of Six",
		headline: "Memphis at UNLV is Week 0’s real game",
		dek: "Two Group of Six playoff hopefuls meet for the first time Saturday night in Las Vegas, with CFP-at-large math already in the room.",
		date: STORY_DATE,
		body: ["Memphis at UNLV, 9 p.m. CT, FOX, Allegiant Stadium. Dan Mullen: “You won’t feel it maybe after this game, but there’s going to be a lot of discussion about this game as the season goes on. Especially late into November.”", "First meeting. Charles Huff’s Memphis debut is a near-total rebuild (70-plus new players). UNLV is Year 2 under Mullen after 10–4. Both receiving AP votes (UNLV 4, Memphis 2). HASHMARK: UNLV HX 37, Memphis HX 50. Mullen named Jackson Arnold the starter; Alex Orji will play “pretty quick.” Huff had not named a Memphis starter as of late last week."],
		whyItMatters: "Highest-leverage Week 0 result for the Group of Six CFP race.",
		sources: [{
			label: "The Commercial Appeal",
			href: "https://www.commercialappeal.com/story/sports/college/memphis-tigers/2026/08/24/memphis-football-what-unlv-dan-mullen-said-about-season-opener/91411478007/"
		}, {
			label: "Las Vegas Review-Journal",
			href: "https://www.reviewjournal.com/sports/unlv/unlv-football/jackson-arnold-named-unlvs-starting-quarterback-for-memphis-opener-3870646/"
		}]
	},
	{
		slug: "usc-opens-shorthanded",
		kicker: "Week 0 · Ranked",
		headline: "Only ranked team in Week 0: No. 14 USC, minus its starting center",
		dek: "The Trojans open against San Jose State as the AP’s lone representative this weekend. HASHMARK has USC 22nd.",
		date: STORY_DATE,
		body: ["USC vs San Jose State, 2 p.m. CT, NBC, Coliseum. Starting center Kilian O’Connor suffered a season-ending knee injury in a non-contact camp drill. Tobias Raymond is expected to start at center. DT Jahkeem Stewart (foot) out at least for the opener. WR Tanook Hines is a game-time decision after an offseason medical procedure. HX: USC 22, SJSU 121. Jayden Maiava is the quarterback."],
		whyItMatters: "Only ranked result of the weekend. O’Connor’s loss is season-long. HX already had USC as a fade vs. the AP (−8).",
		sources: [{
			label: "CBS Sports",
			href: "https://www.cbssports.com/college-football/news/no-14-usc-loses-starting-center-kilian-oconnor-to-season-ending-knee-injury-in-practice/"
		}]
	},
	{
		slug: "ndsu-first-fbs-game",
		kicker: "Week 0 · FBS",
		headline: "North Dakota State plays its first FBS game — against a program that already made the jump",
		dek: "The Bison host Jacksonville State in the Fargodome. HASHMARK’s 136-team board does not include NDSU or Sacramento State yet.",
		date: STORY_DATE,
		body: ["NDSU, 10 FCS titles between 2011 and 2024, is FBS now — Mountain West, 4:30 p.m. CT, CBSSN, Fargodome. Jacksonville State has 27 FBS wins and QB Caden Creel. HX has Jax State 83rd. NDSU is not on the HASHMARK 136-team table. SP+ already has 138 teams including NDSU and Sacramento State. Nathan Hayes is listed as NDSU’s starting quarterback."],
		whyItMatters: "Most significant program-status game of the weekend, and a hole in the HX board.",
		sources: [{
			label: "NCAA.com",
			href: "https://www.ncaa.com/news/football/article/2026-08-24/college-football-schedule-when-does-2026-college-football-season-start"
		}]
	},
	{
		slug: "ap-preseason-frozen",
		kicker: "AP Poll",
		headline: "Ohio State is preseason No. 1. The defending champion is No. 6. Alabama is 13th.",
		dek: "The AP’s Aug. 17 poll is frozen until Sept. 8. HASHMARK disagrees with it on Indiana and Georgia.",
		date: STORY_DATE,
		body: ["Ohio State is AP No. 1 (40 of 69 first-place votes). Oregon No. 2. First time in 65 years the Big Ten occupies the top two preseason spots. Indiana, 16–0 national champion, is AP 6; HASHMARK has them 11th. Alabama is AP 13, first preseason outside the top 10 since 2008; HX has the Tide 9th. LSU is AP 11 / HX 20. Only USC among the 25 plays Saturday. First ranked-on-ranked game is Week 1: No. 9 Ole Miss vs No. 24 Louisville, Sept. 6. HX: Ole Miss 5, Louisville 25."],
		whyItMatters: "The ranking the sport plays under until Sept. 8, and HX’s running argument with it.",
		sources: [{
			label: "Associated Press",
			href: "https://apnews.com/article/fbc-t25-ap-top-25-bd2413a0e5694f53a5d59b0d511fbc34"
		}]
	},
	{
		slug: "hawaii-at-stanford",
		kicker: "HX Flag",
		headline: "HX’s Week 0 flag — Hawaiʻi at Stanford",
		dek: "HASHMARK has Hawaiʻi 82nd and Stanford 102nd. A Rainbow Warriors win is not an upset on this board.",
		date: STORY_DATE,
		body: ["Hawaiʻi at Stanford, 6 p.m. CT, ACC Network. UH went 9–4, beat Stanford 23–20 in Honolulu last year, returns QB Micah Alejado. Stanford is Year 1 under Tavita Pritchard with Michigan transfer Davis Warren. ESPN win probability was reported around 60/40 Stanford. HX is on the visitor."],
		whyItMatters: "Cleanest HX-vs-public-lean on the Week 0 slate.",
		sources: [{
			label: "Hawaiʻi Athletics",
			href: "https://hawaiiathletics.com/news/2026/8/24/football-rainbow-warriors-travel-to-stanford-for-season-opener.aspx"
		}]
	}
];
var WEEK0_SLATE = [
	{
		time: "11 a.m.",
		tv: "ESPN",
		note: "Dublin",
		away: {
			slug: "tcu",
			name: "TCU",
			rank: 30
		},
		home: {
			slug: "north-carolina",
			name: "UNC",
			rank: 87
		},
		neutral: true
	},
	{
		time: "2 p.m.",
		tv: "NBC",
		away: {
			slug: "san-jose-state",
			name: "San José State",
			rank: 121
		},
		home: {
			slug: "usc",
			name: "USC",
			rank: 22
		}
	},
	{
		time: "2:30 p.m.",
		tv: "ESPN",
		away: {
			slug: "nc-state",
			name: "NC State",
			rank: 32
		},
		home: {
			slug: "virginia",
			name: "Virginia",
			rank: 45
		}
	},
	{
		time: "4:30 p.m.",
		tv: "CBSSN",
		away: {
			slug: "jacksonville-state",
			name: "Jax State",
			rank: 83
		},
		home: {
			name: "NDSU",
			rank: null
		}
	},
	{
		time: "5:30 p.m.",
		tv: "ESPN+",
		away: {
			name: "Sacramento State",
			rank: null
		},
		home: {
			slug: "eastern-michigan",
			name: "EMU",
			rank: 105
		}
	},
	{
		time: "6 p.m.",
		tv: "CW",
		away: {
			slug: "new-mexico-state",
			name: "NMSU",
			rank: 125
		},
		home: {
			slug: "florida-state",
			name: "Florida State",
			rank: 65
		}
	},
	{
		time: "6 p.m.",
		tv: "ACCN",
		away: {
			slug: "hawaii",
			name: "Hawaiʻi",
			rank: 82
		},
		home: {
			slug: "stanford",
			name: "Stanford",
			rank: 102
		}
	},
	{
		time: "9 p.m.",
		tv: "FOX",
		away: {
			slug: "memphis",
			name: "Memphis",
			rank: 50
		},
		home: {
			slug: "unlv",
			name: "UNLV",
			rank: 37
		}
	}
];
function listStories() {
	return STORIES;
}
function getStory(slug) {
	return STORIES.find((s) => s.slug === slug) ?? null;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BqmSF1pI.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-DwjXrHEt.css";
var APP_NAME = "HASHMARK";
var Route$18 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "HASHMARK is a college football intelligence desk: HX power rankings, composite recruiting, roster talent, and head-to-head matchup modeling."
			},
			{
				name: "theme-color",
				content: "#09090b"
			},
			{
				name: "robots",
				content: "index,follow"
			},
			{
				property: "og:site_name",
				content: APP_NAME
			},
			{
				property: "og:title",
				content: "HASHMARK · College football ratings desk"
			},
			{
				property: "og:description",
				content: "College football ratings desk. One number: HX. Full 136 FBS."
			},
			{
				property: "og:image",
				content: "https://hashmarkcfb.com/og.jpg"
			},
			{
				property: "og:url",
				content: "https://hashmarkcfb.com"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "HASHMARK · College football ratings desk"
			},
			{
				name: "twitter:description",
				content: "One rating. Full 136 FBS. Board, slate, matchups, recruiting, talent."
			},
			{
				name: "twitter:image",
				content: "https://hashmarkcfb.com/og.jpg"
			}
		],
		links: [
			{
				rel: "canonical",
				href: "https://hashmarkcfb.com/"
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "apple-touch-icon",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"
			}
		]
	}),
	component: Root,
	notFoundComponent: NotFound
});
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-[0.18em] text-faint",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-wide",
				children: "Off the board"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-md text-muted",
				children: "That page is not in the HASHMARK set."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-6 inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg",
				children: "Back to the board"
			})
		]
	});
}
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
				type: "application/ld+json",
				dangerouslySetInnerHTML: { __html: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "WebSite",
					name: "HASHMARK",
					url: "https://hashmarkcfb.com",
					description: "College football ratings desk. One number: HX. Full 136 FBS.",
					potentialAction: {
						"@type": "SearchAction",
						target: "https://hashmarkcfb.com/teams/{search_term_string}",
						"query-input": "required name=search_term_string"
					}
				}) }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Analytics, {})
		] })]
	});
}
var $$splitComponentImporter$16 = () => import("./routes-BufBTiW5.mjs");
var Route$17 = createFileRoute("/")({
	loader: async () => {
		const [teams, games, slate] = await Promise.all([
			listTeams(),
			listGames(),
			listScheduleWeek({ data: { week: 5 } })
		]);
		const top = new Set(teams.slice(0, 20).map((t) => t.slug));
		const notable = games.filter((g) => top.has(g.homeSlug) && top.has(g.awaySlug));
		const featured = selectBoardFeaturedKick(slate.filter((g) => !g.isFcs), Date.now());
		return {
			teams,
			games: notable.length ? notable : games.slice(0, 12),
			featured
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$16, "component"),
	head: () => ({ meta: [{ title: `HASHMARK · Week 4 board` }] })
});
var $$splitComponentImporter$15 = () => import("./desk-B31BlYqG.mjs");
var Route$16 = createFileRoute("/desk")({
	component: lazyRouteComponent($$splitComponentImporter$15, "component"),
	head: () => ({ meta: [{ title: "The desk · HASHMARK" }, {
		name: "description",
		content: "What HASHMARK is, how HX is built, and the glossary for the college football ratings desk."
	}] })
});
var $$splitComponentImporter$14 = () => import("./edge-CoRGcp6Z.mjs");
var Route$15 = createFileRoute("/edge")({
	component: lazyRouteComponent($$splitComponentImporter$14, "component"),
	head: () => ({ meta: [{ title: `${EDGE.name} · HASHMARK` }, {
		name: "description",
		content: "HX Edge Pack is the weekly depth product. The $5 week sample is the full pack — confidence cards, unit O/D pulse, tape write-up — not the free-board teaser. The public board stays free."
	}] })
});
var $$splitComponentImporter$13 = () => import("./logos-BUBQzm-C.mjs");
var Route$14 = createFileRoute("/logos")({
	loader: async () => listTeams(),
	component: lazyRouteComponent($$splitComponentImporter$13, "component"),
	head: () => ({ meta: [{ title: "Team logos · HASHMARK" }] })
});
var $$splitComponentImporter$12 = () => import("./matchup-C55wR3UN.mjs");
function parseNeutral(v) {
	if (v === true || v === "1" || v === "true") return true;
	if (v === false || v === "0" || v === "false") return false;
}
var Route$13 = createFileRoute("/matchup")({
	validateSearch: (s) => ({
		home: typeof s.home === "string" ? s.home : "texas",
		away: typeof s.away === "string" ? s.away : "ohio-state",
		...parseNeutral(s.neutral) !== void 0 ? { neutral: parseNeutral(s.neutral) } : {}
	}),
	loaderDeps: ({ search }) => ({
		home: search.home ?? "texas",
		away: search.away ?? "ohio-state",
		neutral: search.neutral
	}),
	loader: async ({ deps }) => {
		const [teams, match] = await Promise.all([listTeams(), getMatchup({ data: {
			home: deps.home,
			away: deps.away,
			...deps.neutral !== void 0 ? { neutral: deps.neutral } : {}
		} })]);
		return {
			teams,
			match
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$12, "component"),
	head: () => ({ meta: [{ title: "Matchup · HASHMARK" }] })
});
var $$splitComponentImporter$11 = () => import("./model-CxUw9c8X.mjs");
var Route$12 = createFileRoute("/model")({
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	head: () => ({ meta: [{ title: "The Model · HASHMARK" }] })
});
var $$splitComponentImporter$10 = () => import("./rankings-ByNHgvRM.mjs");
var Route$11 = createFileRoute("/rankings")({
	validateSearch: (s) => {
		const conf = parseConf(s.conf);
		return conf === "All" ? {} : { conf };
	},
	loader: () => listTeams(),
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	head: () => ({ meta: [{ title: "HX Rankings · HASHMARK" }] })
});
/** Rank col is w-16; Team sticks at that offset so names never slide under AP. */
var YEARS = [
	2023,
	2024,
	2025,
	2026
];
var $$splitComponentImporter$9 = () => import("./recruiting-CIT-6AJF.mjs");
var Route$10 = createFileRoute("/recruiting")({
	validateSearch: (s) => {
		const y = Number(s.year);
		return {
			year: YEARS.includes(y) ? y : 2026,
			board: s.board === "cycle" ? "cycle" : "class",
			conf: parseConf(s.conf)
		};
	},
	loader: () => listRecruiting(),
	component: lazyRouteComponent($$splitComponentImporter$9, "component"),
	head: () => ({ meta: [{ title: "Composite Recruiting · HASHMARK" }] })
});
/**
* Default schedule week for a Chicago civil date (YYYY-MM-DD).
*
* Early buckets stay fixed:
*   Week 0 through 2026-08-30
*   Week 1 through 2026-09-07
*   Week 2 through 2026-09-12
*   Week 3 through 2026-09-20 (Week 3 slate finished Sep 17–19)
*   Week 4 through 2026-09-27 (Wed 2026-09-23 is Week 4)
*
* Later weeks end on successive Sundays (+7 from 2026-09-27) up to
* SCHEDULE_MAX_WEEK. Dates after the last Sunday stay on that cap —
* there is no permanent cap at week 3.
*/
function defaultWeek(ymd, maxWeek = 13) {
	if (ymd <= "2026-08-30") return 0;
	if (ymd <= "2026-09-07") return 1;
	if (ymd <= "2026-09-12") return 2;
	if (ymd <= "2026-09-20") return 3;
	if (ymd <= "2026-09-27") return Math.min(maxWeek, 4);
	let end = "2026-09-27";
	for (let week = 5; week <= maxWeek; week += 1) {
		end = addDaysYmd(end, 7);
		if (ymd <= end) return week;
	}
	return maxWeek;
}
function parseScheduleView(value) {
	if (value === "conf" || value === "conference") return "conf";
	if (value === "top25") return "top25";
	return "all";
}
/** HX top 25 plus AP ballot teams (ap_rank ≤ 25). */
function top25SlugSet(teams) {
	const slugs = /* @__PURE__ */ new Set();
	for (const t of teams) if (t.hxRank <= 25 || t.apRank != null && t.apRank <= 25) slugs.add(t.slug);
	return slugs;
}
function filterScheduleGames(games, teams, view, conf) {
	if (view === "all") return games;
	if (view === "top25") {
		const top = top25SlugSet(teams);
		return games.filter((g) => top.has(g.homeSlug) || top.has(g.awaySlug));
	}
	const inConference = new Set(teams.filter((t) => inConf(t.conference, conf)).map((t) => t.slug));
	return games.filter((g) => inConference.has(g.homeSlug) || inConference.has(g.awaySlug));
}
var $$splitComponentImporter$8 = () => import("./schedule-1pBVBw-5.mjs");
function parseWeek(v) {
	const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
	if (!Number.isInteger(n) || n < 0 || n > 13) return void 0;
	return n;
}
var Route$9 = createFileRoute("/schedule")({
	validateSearch: (s) => {
		const w = parseWeek(s.w);
		const view = parseScheduleView(s.view);
		const conf = parseConf(s.conf);
		return {
			...w !== void 0 ? { w } : {},
			...view !== "all" ? { view } : {},
			...view === "conf" && conf !== "All" ? { conf } : {}
		};
	},
	loaderDeps: ({ search }) => ({
		w: search.w,
		view: search.view,
		conf: search.conf
	}),
	loader: async ({ deps }) => {
		const week = deps.w ?? defaultWeek(todayChicago());
		const view = parseScheduleView(deps.view);
		const conf = parseConf(deps.conf);
		const [games, teams] = await Promise.all([listScheduleWeek({ data: { week } }), listTeams()]);
		return {
			week,
			games,
			filtered: filterScheduleGames(games, teams, view, conf),
			teams,
			view,
			conf
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	head: () => ({ meta: [{ title: "Schedule · HASHMARK" }] })
});
var $$splitComponentImporter$7 = () => import("./states-BxMYIabM.mjs");
function parseStateCode(value) {
	if (typeof value === "string" && /^[A-Za-z]{2}$/.test(value)) return value.toUpperCase();
	return "TX";
}
var Route$8 = createFileRoute("/states")({
	validateSearch: (s) => ({ code: parseStateCode(s.code) }),
	loaderDeps: ({ search }) => ({ code: search.code ?? "TX" }),
	loader: async ({ deps }) => {
		const code = deps.code;
		const [states, detail] = await Promise.all([listStates(), getStateDetail({ data: { code } })]);
		return {
			states,
			detail,
			code
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	head: () => ({ meta: [{ title: "States · HASHMARK" }] })
});
var $$splitComponentImporter$6 = () => import("./stories-0zZzUoZR.mjs");
var Route$7 = createFileRoute("/stories")({
	loader: () => listStories(),
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({ meta: [{ title: "Stories · HASHMARK" }] })
});
var $$splitComponentImporter$5 = () => import("./talent-C-vzVU4w.mjs");
var Route$6 = createFileRoute("/talent")({
	validateSearch: (s) => ({
		board: s.board === "size" ? "size" : "composite",
		conf: parseConf(s.conf)
	}),
	loader: () => listTeams(),
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [{ title: "Roster Talent · HASHMARK" }] })
});
var $$splitComponentImporter$4 = () => import("./edge.board-ykD6WA3T.mjs");
var Route$5 = createFileRoute("/edge/board")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: `Edge Board · ${EDGE.name} · HASHMARK` }, {
		name: "description",
		content: "HX Edge Board v1 — confidence schema: tiers A–D, calibration FLAGS, small/medium/large edge bands (large ≥ 7 pts), copy bans. Free board is HX vs Vegas. Paid pack is ranked cards."
	}] })
});
var verifyEdgeUnlock = createServerFn({ method: "GET" }).validator(object({ sessionId: string().optional() })).handler(createSsrRpc("4fe58dd28fd7340a345c36b313f0f7fe83bb1daaeec7d6b97ee43c0751bef21c"));
var $$splitComponentImporter$3 = () => import("./edge.unlock-B2jWvWJI.mjs");
var Route$4 = createFileRoute("/edge/unlock")({
	validateSearch: (s) => ({ ...typeof s.session_id === "string" && s.session_id ? { session_id: s.session_id } : {} }),
	loaderDeps: ({ search }) => ({ session_id: search.session_id }),
	loader: async ({ deps }) => verifyEdgeUnlock({ data: { ...deps.session_id ? { sessionId: deps.session_id } : {} } }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [
		{ title: `Unlock · ${EDGE.name} · HASHMARK` },
		{
			name: "robots",
			content: "noindex,nofollow"
		},
		{
			name: "description",
			content: "Post-purchase HX Edge Pack unlock. Paid checkout required."
		}
	] })
});
var scenario_sim_golden_request_default = {
	contract_version: "2026.09.14",
	product: "hx_edge_scenario_sim",
	n_sims: 1e4,
	seed: 20260913,
	hx_stamp: "HX 2026.4",
	hx_ship_path: "week2_od_hx_ship_2026.json",
	overrides: [{
		"type": "force_winner",
		"espn_event_id": "401856700",
		"week": 4,
		"home_slug": "georgia",
		"away_slug": "oklahoma",
		"winner_slug": "oklahoma",
		"note": "golden smoke — force Oklahoma @ Georgia week 4 (remaining non-FINAL)"
	}, {
		"type": "hx_bump",
		"team_slug": "oregon",
		"delta_hx": -.25,
		"note": "user scenario — not a live board rewrite"
	}],
	"return": {
		"teams": [
			"georgia",
			"oklahoma",
			"oregon",
			"ohio-state",
			"michigan"
		],
		"include_full_board": false,
		"include_baseline_delta": true
	}
};
var scenario_sim_golden_response_default = {
	contract_version: "2026.09.14",
	ok: true,
	error: null,
	meta: {
		"n_sims": 1e4,
		"seed": 20260913,
		"seed_policy": "client-supplied; same seed for baseline+scenario",
		"as_of": "2026-09-14",
		"as_of_tz": "America/Chicago",
		"hx_stamp": "HX 2026.4",
		"hx_ship_path": "week2_od_hx_ship_2026.json",
		"locked_finals": 183,
		"remaining_draws": 702,
		"runtime_sec": 10.23,
		"overrides_applied": 2
	},
	baseline: {
		"georgia": {
			"make_field": 75.26,
			"win_title": 21.59,
			"proj_wins": 10.491,
			"conf_title": 48.62
		},
		"oklahoma": {
			"make_field": 1.95,
			"win_title": .04,
			"proj_wins": 6.452,
			"conf_title": 1.06
		},
		"oregon": {
			"make_field": 46.2,
			"win_title": 6.91,
			"proj_wins": 9.122,
			"conf_title": 31.47
		},
		"ohio-state": {
			"make_field": 59.57,
			"win_title": 14.89,
			"proj_wins": 9.503,
			"conf_title": 44.98
		},
		"michigan": {
			"make_field": 21.29,
			"win_title": 1.23,
			"proj_wins": 8.543,
			"conf_title": 4.66
		}
	},
	scenario: {
		"georgia": {
			"make_field": 52.4,
			"win_title": 14.78,
			"proj_wins": 9.53,
			"conf_title": 34.45
		},
		"oklahoma": {
			"make_field": 6.53,
			"win_title": .24,
			"proj_wins": 7.297,
			"conf_title": 3.59
		},
		"oregon": {
			"make_field": 42.41,
			"win_title": 6.13,
			"proj_wins": 8.984,
			"conf_title": 28.49
		},
		"ohio-state": {
			"make_field": 60.77,
			"win_title": 15.76,
			"proj_wins": 9.539,
			"conf_title": 46.72
		},
		"michigan": {
			"make_field": 22.14,
			"win_title": 1.27,
			"proj_wins": 8.562,
			"conf_title": 5.01
		}
	},
	delta: {
		"georgia": {
			"make_field": -22.86,
			"win_title": -6.81,
			"proj_wins": -.961,
			"conf_title": -14.17
		},
		"oklahoma": {
			"make_field": 4.58,
			"win_title": .2,
			"proj_wins": .845,
			"conf_title": 2.53
		},
		"oregon": {
			"make_field": -3.79,
			"win_title": -.78,
			"proj_wins": -.138,
			"conf_title": -2.98
		},
		"ohio-state": {
			"make_field": 1.2,
			"win_title": .87,
			"proj_wins": .036,
			"conf_title": 1.74
		},
		"michigan": {
			"make_field": .85,
			"win_title": .04,
			"proj_wins": .019,
			"conf_title": .35
		}
	},
	overrides_echo: [{
		"type": "force_winner",
		"espn_event_id": "401856700",
		"week": 4,
		"home_slug": "georgia",
		"away_slug": "oklahoma",
		"winner_slug": "oklahoma",
		"note": "golden smoke — force Oklahoma @ Georgia week 4 (remaining non-FINAL)"
	}, {
		"type": "hx_bump",
		"team_slug": "oregon",
		"delta_hx": -.25,
		"note": "user scenario — not a live board rewrite"
	}],
	confidence_note: "Monte Carlo ± noise on 10k draws; not a lock. Calibration: cite live Top 25 closer vs full-slate tape when packaging."
};
var week4_hx_vs_ap_gaps_2026_default = {
	as_of: "2026-09-27",
	poll_week: 4,
	source_ap: "week4_ap_top25_2026 / NCAA Week 4 (Sept. 20)",
	source_hx: "week4_od_hx_ship_2026.json",
	hx_board: "HX 2026.6",
	note: "Rebuilt vs Week 4 AP ballot (Sept. 20) and live HX 2026.6 ranks in week4_od_hx_ship_2026. Gaps with |delta| >= 3. Oklahoma and Virginia left the ballot. Houston is AP 25 / HX 39. LSU is AP 10 / HX 17.",
	gaps: [
		{
			"name": "Mississippi State",
			"ap": 24,
			"hx": 66,
			"hx_rating": .2071,
			"delta": -42
		},
		{
			"name": "Texas A&M",
			"ap": 23,
			"hx": 6,
			"hx_rating": 6.0586,
			"delta": 17
		},
		{
			"name": "Oregon",
			"ap": 20,
			"hx": 4,
			"hx_rating": 6.9019,
			"delta": 16
		},
		{
			"name": "Houston",
			"ap": 25,
			"hx": 39,
			"hx_rating": 1.623,
			"delta": -14
		},
		{
			"name": "Louisville",
			"ap": 16,
			"hx": 26,
			"hx_rating": 2.98,
			"delta": -10
		},
		{
			"name": "BYU",
			"ap": 9,
			"hx": 18,
			"hx_rating": 4.1233,
			"delta": -9
		},
		{
			"name": "USC",
			"ap": 12,
			"hx": 21,
			"hx_rating": 3.8525,
			"delta": -9
		},
		{
			"name": "LSU",
			"ap": 10,
			"hx": 17,
			"hx_rating": 4.1243,
			"delta": -7
		},
		{
			"name": "Indiana",
			"ap": 5,
			"hx": 11,
			"hx_rating": 4.9465,
			"delta": -6
		},
		{
			"name": "Iowa",
			"ap": 17,
			"hx": 23,
			"hx_rating": 3.7055,
			"delta": -6
		},
		{
			"name": "Michigan",
			"ap": 18,
			"hx": 12,
			"hx_rating": 4.9296,
			"delta": 6
		},
		{
			"name": "Ohio State",
			"ap": 7,
			"hx": 2,
			"hx_rating": 7.8131,
			"delta": 5
		},
		{
			"name": "Tennessee",
			"ap": 14,
			"hx": 19,
			"hx_rating": 4.0751,
			"delta": -5
		},
		{
			"name": "Texas",
			"ap": 1,
			"hx": 5,
			"hx_rating": 6.4516,
			"delta": -4
		},
		{
			"name": "Ole Miss",
			"ap": 4,
			"hx": 8,
			"hx_rating": 5.4289,
			"delta": -4
		},
		{
			"name": "Miami",
			"ap": 6,
			"hx": 10,
			"hx_rating": 5.2345,
			"delta": -4
		},
		{
			"name": "Texas Tech",
			"ap": 11,
			"hx": 7,
			"hx_rating": 5.8155,
			"delta": 4
		},
		{
			"name": "Missouri",
			"ap": 19,
			"hx": 15,
			"hx_rating": 4.2572,
			"delta": 4
		},
		{
			"name": "Florida",
			"ap": 21,
			"hx": 24,
			"hx_rating": 3.5201,
			"delta": -3
		}
	],
	hx_not_in_ap: [
		{
			"hx_rank": 16,
			"name": "Oklahoma",
			"hx": 4.1888
		},
		{
			"hx_rank": 22,
			"name": "Clemson",
			"hx": 3.8338
		},
		{
			"hx_rank": 25,
			"name": "Washington",
			"hx": 3.244
		}
	],
	ap_not_in_hx25: [
		{
			"ap": 16,
			"name": "Louisville",
			"hx_rank": 26
		},
		{
			"ap": 24,
			"name": "Mississippi State",
			"hx_rank": 66
		},
		{
			"ap": 25,
			"name": "Houston",
			"hx_rank": 39
		}
	]
};
var week4_tape_2026_default = {
	meta: {
		"as_of": "2026-09-27 10:16 AM CT",
		"week": 4,
		"season": 2026,
		"scope": "FBS–FBS only",
		"n_games": 57,
		"su": "42/57",
		"su_pct": 73.7,
		"hx_closer": "20/57",
		"hx_closer_pct": 35.1,
		"vegas_closer": "37/57",
		"ats_hx": "28/57",
		"ats_hx_pct": 49.1,
		"mae_hx": 12.79,
		"mae_vegas": 11.21,
		"brier": .181,
		"season_w1_w4_su": "80.8%",
		"season_w1_w4_closer": "40.9%",
		"season_w1_w4_su_frac": "164/203",
		"season_w1_w4_closer_frac": "83/203",
		"sources": {
			"finals": "data/week4_fbs_fbs_finals_clear_2026-09-27.json",
			"grade": "data/week4_hx_vs_vegas_detail.json",
			"vegas": "data/week4_vegas_clear_pack_2026-09-23.json",
			"hx_ranks": "data/week3_od_hx_ship_2026.json (HX 2026.5, unchanged)",
			"peer": "data/week4_tape_research_peer_clear_2026-09-27.md"
		},
		"coverage_notes": [
			"All 57 FBS–FBS games are ESPN STATUS_FINAL. Liberty @ Coastal was already live; 56 scores stamp here.",
			"Vegas closes and kicks are the Sep 23 CLEAR pack already on the board. This tape does not rewrite them.",
			"HX lines are the live HX 2026.5 board. HX is not retuned.",
			"Closer FLAG: 20/57 (35.1%) is under 45%. Soft-cal FLAG remains."
		],
		"headline_flags": {
			"closer_below_45": true,
			"n_su_misses": 15,
			"n_winner_flip_hits": 2,
			"n_winner_flip_misses": 6
		}
	},
	su_misses: [
		{
			"matchup": "Army@Temple",
			"hx_fav": "Temple",
			"hx_spread_display": "Temple -6.6",
			"vegas_details": "ARMY -3",
			"final": "Army 21–Temple 17",
			"closer": "vegas",
			"winner_flip": true,
			"espn_event_id": "401862779"
		},
		{
			"matchup": "Wake Forest@Louisville",
			"hx_fav": "Louisville",
			"hx_spread_display": "Louisville -14.8",
			"vegas_details": "LOU -12.5",
			"final": "Wake Forest 30–Louisville 27",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401858243"
		},
		{
			"matchup": "Hawaiʻi@Wyoming",
			"hx_fav": "Hawaiʻi",
			"hx_spread_display": "Hawaiʻi -5.3",
			"vegas_details": "HAW -3",
			"final": "Hawaiʻi 10–Wyoming 27",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401864510"
		},
		{
			"matchup": "Ole Miss@Florida",
			"hx_fav": "Ole Miss",
			"hx_spread_display": "Ole Miss -2.5",
			"vegas_details": "FLA -3.5",
			"final": "Ole Miss 28–Florida 52",
			"closer": "vegas",
			"winner_flip": true,
			"espn_event_id": "401856699"
		},
		{
			"matchup": "TCU@UCF",
			"hx_fav": "TCU",
			"hx_spread_display": "TCU -5.6",
			"vegas_details": "TCU -3",
			"final": "TCU 13–UCF 21",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401856815"
		},
		{
			"matchup": "Iowa@Michigan",
			"hx_fav": "Michigan",
			"hx_spread_display": "Michigan -7.0",
			"vegas_details": "MICH -5.5",
			"final": "Iowa 20–Michigan 19",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401858463"
		},
		{
			"matchup": "Boise State@Western Michigan",
			"hx_fav": "Western Michigan",
			"hx_spread_display": "Western Michigan -0.8",
			"vegas_details": "BOIS -7",
			"final": "Boise State 32–Western Michigan 7",
			"closer": "vegas",
			"winner_flip": true,
			"espn_event_id": "401860897"
		},
		{
			"matchup": "Wisconsin@Penn State",
			"hx_fav": "Penn State",
			"hx_spread_display": "Penn State -14.6",
			"vegas_details": "PSU -10",
			"final": "Wisconsin 24–Penn State 20",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401858466"
		},
		{
			"matchup": "Kansas State@Cincinnati",
			"hx_fav": "Kansas State",
			"hx_spread_display": "Kansas State -7.3",
			"vegas_details": "KSU -6.5",
			"final": "Kansas State 26–Cincinnati 31",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401856814"
		},
		{
			"matchup": "Oklahoma State@West Virginia",
			"hx_fav": "West Virginia",
			"hx_spread_display": "West Virginia -3.4",
			"vegas_details": "WVU -1.5",
			"final": "Oklahoma State 41–West Virginia 24",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401856881"
		},
		{
			"matchup": "Texas A&M@LSU",
			"hx_fav": "Texas A&M",
			"hx_spread_display": "Texas A&M -2.7",
			"vegas_details": "LSU -8.5",
			"final": "Texas A&M 6–LSU 35",
			"closer": "vegas",
			"winner_flip": true,
			"espn_event_id": "401856702"
		},
		{
			"matchup": "Missouri@Mississippi State",
			"hx_fav": "Missouri",
			"hx_spread_display": "Missouri -9.5",
			"vegas_details": "MSST -6.5",
			"final": "Missouri 24–Mississippi State 31",
			"closer": "vegas",
			"winner_flip": true,
			"espn_event_id": "401856703"
		},
		{
			"matchup": "Georgia Tech@Stanford",
			"hx_fav": "Georgia Tech",
			"hx_spread_display": "Georgia Tech -3.8",
			"vegas_details": "GT -3.5",
			"final": "Georgia Tech 27–Stanford 34",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401858240"
		},
		{
			"matchup": "Air Force@Nevada",
			"hx_fav": "Nevada",
			"hx_spread_display": "Nevada -6.7",
			"vegas_details": "AF -5.5",
			"final": "Air Force 36–Nevada 33",
			"closer": "vegas",
			"winner_flip": true,
			"espn_event_id": "401864509"
		},
		{
			"matchup": "Minnesota@Washington",
			"hx_fav": "Washington",
			"hx_spread_display": "Washington -8.0",
			"vegas_details": "WASH -10",
			"final": "Minnesota 27–Washington 24",
			"closer": "hx",
			"winner_flip": false,
			"espn_event_id": "401858470"
		}
	],
	winner_flip_hits: [{
		"matchup": "Navy @ UAB",
		"hx": "UAB -13.8",
		"vegas": "NAVY -7",
		"final": "20–24",
		"espn_event_id": "401862778"
	}, {
		"matchup": "Clemson @ California",
		"hx": "Clemson -6.7",
		"vegas": "CAL -1.5",
		"final": "24–10",
		"espn_event_id": "401858234"
	}],
	winner_flip_misses: [
		{
			"matchup": "Army @ Temple",
			"hx": "Temple -6.6",
			"vegas": "ARMY -3",
			"final": "21–17",
			"espn_event_id": "401862779"
		},
		{
			"matchup": "Ole Miss @ Florida",
			"hx": "Ole Miss -2.5",
			"vegas": "FLA -3.5",
			"final": "28–52",
			"espn_event_id": "401856699"
		},
		{
			"matchup": "Boise State @ Western Michigan",
			"hx": "Western Michigan -0.8",
			"vegas": "BOIS -7",
			"final": "32–7",
			"espn_event_id": "401860897"
		},
		{
			"matchup": "Texas A&M @ LSU",
			"hx": "Texas A&M -2.7",
			"vegas": "LSU -8.5",
			"final": "6–35",
			"espn_event_id": "401856702"
		},
		{
			"matchup": "Missouri @ Mississippi State",
			"hx": "Missouri -9.5",
			"vegas": "MSST -6.5",
			"final": "24–31",
			"espn_event_id": "401856703"
		},
		{
			"matchup": "Air Force @ Nevada",
			"hx": "Nevada -6.7",
			"vegas": "AF -5.5",
			"final": "36–33",
			"espn_event_id": "401864509"
		}
	],
	games: [
		{
			"espn_event_id": "401869941",
			"kick_ct": "2026-09-24 18:30",
			"weekday": "Thu",
			"tv": "ESPN",
			"away": "Liberty",
			"home": "Coastal Carolina",
			"away_short": "LIB",
			"home_short": "CCU",
			"away_slug": "liberty",
			"home_slug": "coastal-carolina",
			"neutral": false,
			"hx_fav": "Liberty",
			"hx_home": 1,
			"hx_spread_display": "Liberty -1.0",
			"hx_wp": 52.7,
			"home_hx_rating": -2.0108,
			"away_hx_rating": -.5778,
			"home_hx_rank": 99,
			"away_hx_rank": 75,
			"vegas_home": 2.5,
			"vegas_details": "LIB -2.5",
			"vegas_ou": 50.5,
			"score_away": 34,
			"score_home": 17,
			"final_display": "Liberty 34–Coastal Carolina 17",
			"mov_home": -17,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 16,
			"err_vegas": 14.5,
			"winner_flip": false,
			"flags": [],
			"brier": .223729
		},
		{
			"espn_event_id": "401862779",
			"kick_ct": "2026-09-25 15:00",
			"weekday": "Fri",
			"tv": "ESPN",
			"away": "Army",
			"home": "Temple",
			"away_short": "ARMY",
			"home_short": "TEM",
			"away_slug": "army",
			"home_slug": "temple",
			"neutral": false,
			"hx_fav": "Temple",
			"hx_home": -6.6,
			"hx_spread_display": "Temple -6.6",
			"hx_wp": 66.2,
			"home_hx_rating": -3.311,
			"away_hx_rating": -4.3454,
			"home_hx_rank": 112,
			"away_hx_rank": 123,
			"vegas_home": 3,
			"vegas_details": "ARMY -3",
			"vegas_ou": 47.5,
			"score_away": 21,
			"score_home": 17,
			"final_display": "Army 21–Temple 17",
			"mov_home": -4,
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 10.6,
			"err_vegas": 1,
			"winner_flip": true,
			"flags": ["WINNER_FLIP_MISS"],
			"brier": .438244
		},
		{
			"espn_event_id": "401862778",
			"kick_ct": "2026-09-25 18:00",
			"weekday": "Fri",
			"tv": "ESPN",
			"away": "Navy",
			"home": "UAB",
			"away_short": "NAVY",
			"home_short": "UAB",
			"away_slug": "navy",
			"home_slug": "uab",
			"neutral": false,
			"hx_fav": "UAB",
			"hx_home": -13.8,
			"hx_spread_display": "UAB -13.8",
			"hx_wp": 78.6,
			"home_hx_rating": -2.0661,
			"away_hx_rating": -5.0846,
			"home_hx_rank": 100,
			"away_hx_rank": 129,
			"vegas_home": 7,
			"vegas_details": "NAVY -7",
			"vegas_ou": 51.5,
			"score_away": 20,
			"score_home": 24,
			"final_display": "Navy 20–UAB 24",
			"mov_home": 4,
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 9.8,
			"err_vegas": 11,
			"winner_flip": true,
			"flags": ["WINNER_FLIP_HIT"],
			"brier": .045796
		},
		{
			"espn_event_id": "401858461",
			"kick_ct": "2026-09-25 19:00",
			"weekday": "Fri",
			"tv": "FOX",
			"away": "Northwestern",
			"home": "Indiana",
			"away_short": "NU",
			"home_short": "IU",
			"away_slug": "northwestern",
			"home_slug": "indiana",
			"neutral": false,
			"hx_fav": "Indiana",
			"hx_home": -14.7,
			"hx_spread_display": "Indiana -14.7",
			"hx_wp": 79.8,
			"home_hx_rating": 4.981,
			"away_hx_rating": 1.736,
			"home_hx_rank": 11,
			"away_hx_rank": 36,
			"vegas_home": -21,
			"vegas_details": "IU -21",
			"vegas_ou": 49.5,
			"score_away": 23,
			"score_home": 29,
			"final_display": "Northwestern 23–Indiana 29",
			"mov_home": 6,
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 8.7,
			"err_vegas": 15,
			"winner_flip": false,
			"flags": [],
			"brier": .040804
		},
		{
			"espn_event_id": "401858234",
			"kick_ct": "2026-09-25 21:30",
			"weekday": "Fri",
			"tv": "ESPN",
			"away": "Clemson",
			"home": "California",
			"away_short": "CLEM",
			"home_short": "CAL",
			"away_slug": "clemson",
			"home_slug": "california",
			"neutral": false,
			"hx_fav": "Clemson",
			"hx_home": 6.7,
			"hx_spread_display": "Clemson -6.7",
			"hx_wp": 66.5,
			"home_hx_rating": .572,
			"away_hx_rating": 3.8301,
			"home_hx_rank": 60,
			"away_hx_rank": 22,
			"vegas_home": -1.5,
			"vegas_details": "CAL -1.5",
			"vegas_ou": 50.5,
			"score_away": 24,
			"score_home": 10,
			"final_display": "Clemson 24–California 10",
			"mov_home": -14,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 7.3,
			"err_vegas": 15.5,
			"winner_flip": true,
			"flags": ["WINNER_FLIP_HIT"],
			"brier": .112225
		},
		{
			"espn_event_id": "401856704",
			"kick_ct": "2026-09-26 11:00",
			"weekday": "Sat",
			"tv": "ABC",
			"away": "Texas",
			"home": "Tennessee",
			"away_short": "TEX",
			"home_short": "TENN",
			"away_slug": "texas",
			"home_slug": "tennessee",
			"neutral": false,
			"hx_fav": "Texas",
			"hx_home": 3.8,
			"hx_spread_display": "Texas -3.8",
			"hx_wp": 59.9,
			"home_hx_rating": 4.0824,
			"away_hx_rating": 6.4443,
			"home_hx_rank": 18,
			"away_hx_rank": 5,
			"vegas_home": 4.5,
			"vegas_details": "TEX -4.5",
			"vegas_ou": 55.5,
			"score_away": 20,
			"score_home": 17,
			"final_display": "Texas 20–Tennessee 17",
			"mov_home": -3,
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "hx",
			"err_hx": .8,
			"err_vegas": 1.5,
			"winner_flip": false,
			"flags": [],
			"brier": .160801
		},
		{
			"espn_event_id": "401856805",
			"kick_ct": "2026-09-26 11:00",
			"weekday": "Sat",
			"tv": "TNT",
			"away": "Sam Houston",
			"home": "Texas Tech",
			"away_short": "SHSU",
			"home_short": "TTU",
			"away_slug": "sam-houston",
			"home_slug": "texas-tech",
			"neutral": false,
			"hx_fav": "Texas Tech",
			"hx_home": -48.1,
			"hx_spread_display": "Texas Tech -48.1",
			"hx_wp": 97.1,
			"home_hx_rating": 5.8206,
			"away_hx_rating": -4.1936,
			"home_hx_rank": 7,
			"away_hx_rank": 120,
			"vegas_home": -34.5,
			"vegas_details": "TTU -34.5",
			"vegas_ou": 55.5,
			"score_away": 14,
			"score_home": 49,
			"final_display": "Sam Houston 14–Texas Tech 49",
			"mov_home": 35,
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 13.1,
			"err_vegas": .5,
			"winner_flip": false,
			"flags": [],
			"brier": 841e-6
		},
		{
			"espn_event_id": "401856813",
			"kick_ct": "2026-09-26 11:00",
			"weekday": "Sat",
			"tv": "ESPN2",
			"away": "Colorado",
			"home": "Baylor",
			"away_short": "COLO",
			"home_short": "BAY",
			"away_slug": "colorado",
			"home_slug": "baylor",
			"neutral": false,
			"hx_fav": "Baylor",
			"hx_home": -7.7,
			"hx_spread_display": "Baylor -7.7",
			"hx_wp": 68.6,
			"home_hx_rating": .9857,
			"away_hx_rating": -.3885,
			"home_hx_rank": 52,
			"away_hx_rank": 73,
			"vegas_home": -10,
			"vegas_details": "BAY -10",
			"vegas_ou": 55.5,
			"score_away": 13,
			"score_home": 23,
			"final_display": "Colorado 13–Baylor 23",
			"mov_home": 10,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 2.3,
			"err_vegas": 0,
			"winner_flip": false,
			"flags": [],
			"brier": .098596
		},
		{
			"espn_event_id": "401858242",
			"kick_ct": "2026-09-26 11:00",
			"weekday": "Sat",
			"tv": "ACC Network",
			"away": "Virginia Tech",
			"home": "Boston College",
			"away_short": "VT",
			"home_short": "BC",
			"away_slug": "virginia-tech",
			"home_slug": "boston-college",
			"neutral": false,
			"hx_fav": "Virginia Tech",
			"hx_home": 7.7,
			"hx_spread_display": "Virginia Tech -7.7",
			"hx_wp": 68.4,
			"home_hx_rating": -2.3233,
			"away_hx_rating": 1.2135,
			"home_hx_rank": 104,
			"away_hx_rank": 49,
			"vegas_home": 14,
			"vegas_details": "VT -14",
			"vegas_ou": 48.5,
			"score_away": 21,
			"score_home": 14,
			"final_display": "Virginia Tech 21–Boston College 14",
			"mov_home": -7,
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "hx",
			"err_hx": .7,
			"err_vegas": 7,
			"winner_flip": false,
			"flags": [],
			"brier": .099856
		},
		{
			"espn_event_id": "401858243",
			"kick_ct": "2026-09-26 11:00",
			"weekday": "Sat",
			"tv": "ESPN",
			"away": "Wake Forest",
			"home": "Louisville",
			"away_short": "WAKE",
			"home_short": "LOU",
			"away_slug": "wake-forest",
			"home_slug": "louisville",
			"neutral": false,
			"hx_fav": "Louisville",
			"hx_home": -14.8,
			"hx_spread_display": "Louisville -14.8",
			"hx_wp": 79.8,
			"home_hx_rating": 3.0061,
			"away_hx_rating": -.2499,
			"home_hx_rank": 26,
			"away_hx_rank": 72,
			"vegas_home": -12.5,
			"vegas_details": "LOU -12.5",
			"vegas_ou": 58.5,
			"score_away": 30,
			"score_home": 27,
			"final_display": "Wake Forest 30–Louisville 27",
			"mov_home": -3,
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 17.8,
			"err_vegas": 15.5,
			"winner_flip": false,
			"flags": [],
			"brier": .636804
		},
		{
			"espn_event_id": "401858465",
			"kick_ct": "2026-09-26 11:00",
			"weekday": "Sat",
			"tv": "FOX",
			"away": "Illinois",
			"home": "Ohio State",
			"away_short": "ILL",
			"home_short": "OSU",
			"away_slug": "illinois",
			"home_slug": "ohio-state",
			"neutral": false,
			"hx_fav": "Ohio State",
			"hx_home": -27.6,
			"hx_spread_display": "Ohio State -27.6",
			"hx_wp": 90.9,
			"home_hx_rating": 7.8131,
			"away_hx_rating": 1.635,
			"home_hx_rank": 2,
			"away_hx_rank": 38,
			"vegas_home": -26.5,
			"vegas_details": "OSU -26.5",
			"vegas_ou": 53.5,
			"score_away": 19,
			"score_home": 42,
			"final_display": "Illinois 19–Ohio State 42",
			"mov_home": 23,
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 4.6,
			"err_vegas": 3.5,
			"winner_flip": false,
			"flags": [],
			"brier": .008281
		},
		{
			"espn_event_id": "401860893",
			"kick_ct": "2026-09-26 11:00",
			"weekday": "Sat",
			"tv": "CBSSN",
			"away": "San Diego State",
			"home": "Toledo",
			"away_short": "SDSU",
			"home_short": "TOL",
			"away_slug": "san-diego-state",
			"home_slug": "toledo",
			"neutral": false,
			"hx_fav": "Toledo",
			"hx_home": -5.5,
			"hx_spread_display": "Toledo -5.5",
			"hx_wp": 63.9,
			"home_hx_rating": 1.5151,
			"away_hx_rating": .8026,
			"home_hx_rank": 43,
			"away_hx_rank": 55,
			"vegas_home": -3,
			"vegas_details": "TOL -3",
			"vegas_ou": 51.5,
			"score_away": 16,
			"score_home": 41,
			"final_display": "San Diego State 16–Toledo 41",
			"mov_home": 25,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 19.5,
			"err_vegas": 22,
			"winner_flip": false,
			"flags": [],
			"brier": .130321
		},
		{
			"espn_event_id": "401860896",
			"kick_ct": "2026-09-26 11:00",
			"weekday": "Sat",
			"tv": "ESPNU",
			"away": "Colorado State",
			"home": "UTSA",
			"away_short": "CSU",
			"home_short": "UTSA",
			"away_slug": "colorado-state",
			"home_slug": "utsa",
			"neutral": false,
			"hx_fav": "UTSA",
			"hx_home": -20.9,
			"hx_spread_display": "UTSA -20.9",
			"hx_wp": 86.3,
			"home_hx_rating": 1.3293,
			"away_hx_rating": -3.382,
			"home_hx_rank": 46,
			"away_hx_rank": 115,
			"vegas_home": -13.5,
			"vegas_details": "UTSA -13.5",
			"vegas_ou": 58.5,
			"score_away": 45,
			"score_home": 59,
			"final_display": "Colorado State 45–UTSA 59",
			"mov_home": 14,
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 6.9,
			"err_vegas": .5,
			"winner_flip": false,
			"flags": [],
			"brier": .018769
		},
		{
			"espn_event_id": "401864512",
			"kick_ct": "2026-09-26 11:00",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "UNLV",
			"home": "Akron",
			"away_short": "UNLV",
			"home_short": "AKR",
			"away_slug": "unlv",
			"home_slug": "akron",
			"neutral": false,
			"hx_fav": "UNLV",
			"hx_home": 14,
			"hx_spread_display": "UNLV -14.0",
			"hx_wp": 78.9,
			"home_hx_rating": -3.5181,
			"away_hx_rating": 1.7329,
			"home_hx_rank": 116,
			"away_hx_rank": 37,
			"vegas_home": 13.5,
			"vegas_details": "UNLV -13.5",
			"vegas_ou": 52.5,
			"score_away": 38,
			"score_home": 10,
			"final_display": "UNLV 38–Akron 10",
			"mov_home": -28,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 14,
			"err_vegas": 14.5,
			"winner_flip": false,
			"flags": [],
			"brier": .044521
		},
		{
			"espn_event_id": "401866425",
			"kick_ct": "2026-09-26 11:00",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "Ball State",
			"home": "Kent State",
			"away_short": "BALL",
			"home_short": "KENT",
			"away_slug": "ball-state",
			"home_slug": "kent-state",
			"neutral": false,
			"hx_fav": "Kent State",
			"hx_home": -1.7,
			"hx_spread_display": "Kent State -1.7",
			"hx_wp": 54.6,
			"home_hx_rating": -5.8934,
			"away_hx_rating": -5.3903,
			"home_hx_rank": 134,
			"away_hx_rank": 130,
			"vegas_home": -3.5,
			"vegas_details": "KENT -3.5",
			"vegas_ou": 50.5,
			"score_away": 13,
			"score_home": 26,
			"final_display": "Ball State 13–Kent State 26",
			"mov_home": 13,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 11.3,
			"err_vegas": 9.5,
			"winner_flip": false,
			"flags": [],
			"brier": .206116
		},
		{
			"espn_event_id": "401864576",
			"kick_ct": "2026-09-26 11:45",
			"weekday": "Sat",
			"tv": "SEC Network",
			"away": "South Alabama",
			"home": "Kentucky",
			"away_short": "USA",
			"home_short": "UK",
			"away_slug": "south-alabama",
			"home_slug": "kentucky",
			"neutral": false,
			"hx_fav": "Kentucky",
			"hx_home": -14.2,
			"hx_spread_display": "Kentucky -14.2",
			"hx_wp": 79.2,
			"home_hx_rating": .3153,
			"away_hx_rating": -2.8087,
			"home_hx_rank": 62,
			"away_hx_rank": 108,
			"vegas_home": -20.5,
			"vegas_details": "UK -20.5",
			"vegas_ou": 54.5,
			"score_away": 21,
			"score_home": 45,
			"final_display": "South Alabama 21–Kentucky 45",
			"mov_home": 24,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 9.8,
			"err_vegas": 3.5,
			"winner_flip": false,
			"flags": [],
			"brier": .043264
		},
		{
			"espn_event_id": "401858462",
			"kick_ct": "2026-09-26 12:30",
			"weekday": "Sat",
			"tv": "BTN",
			"away": "UCLA",
			"home": "Maryland",
			"away_short": "UCLA",
			"home_short": "MD",
			"away_slug": "ucla",
			"home_slug": "maryland",
			"neutral": false,
			"hx_fav": "UCLA",
			"hx_home": 1.4,
			"hx_spread_display": "UCLA -1.4",
			"hx_wp": 53.8,
			"home_hx_rating": -.2474,
			"away_hx_rating": 1.3253,
			"home_hx_rank": 71,
			"away_hx_rank": 47,
			"vegas_home": 1.5,
			"vegas_details": "UCLA -1.5",
			"vegas_ou": 56.5,
			"score_away": 54,
			"score_home": 3,
			"final_display": "UCLA 54–Maryland 3",
			"mov_home": -51,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 49.6,
			"err_vegas": 49.5,
			"winner_flip": false,
			"flags": [],
			"brier": .213444
		},
		{
			"espn_event_id": "401858467",
			"kick_ct": "2026-09-26 13:00",
			"weekday": "Sat",
			"tv": "Peacock",
			"away": "Notre Dame",
			"home": "Purdue",
			"away_short": "ND",
			"home_short": "PUR",
			"away_slug": "notre-dame",
			"home_slug": "purdue",
			"neutral": false,
			"hx_fav": "Notre Dame",
			"hx_home": 28.5,
			"hx_spread_display": "Notre Dame -28.5",
			"hx_wp": 91.4,
			"home_hx_rating": -1.5098,
			"away_hx_rating": 7.0293,
			"home_hx_rank": 94,
			"away_hx_rank": 3,
			"vegas_home": 27.5,
			"vegas_details": "ND -27.5",
			"vegas_ou": 58.5,
			"score_away": 49,
			"score_home": 10,
			"final_display": "Notre Dame 49–Purdue 10",
			"mov_home": -39,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 10.5,
			"err_vegas": 11.5,
			"winner_flip": false,
			"flags": [],
			"brier": .007396
		},
		{
			"espn_event_id": "401864511",
			"kick_ct": "2026-09-26 13:00",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "Northern Illinois",
			"home": "Georgia State",
			"away_short": "NIU",
			"home_short": "GAST",
			"away_slug": "northern-illinois",
			"home_slug": "georgia-state",
			"neutral": false,
			"hx_fav": "Georgia State",
			"hx_home": -4.8,
			"hx_spread_display": "Georgia State -4.8",
			"hx_wp": 62.4,
			"home_hx_rating": -4.3229,
			"away_hx_rating": -4.8335,
			"home_hx_rank": 122,
			"away_hx_rank": 127,
			"vegas_home": -10.5,
			"vegas_details": "GAST -10.5",
			"vegas_ou": 55.5,
			"score_away": 14,
			"score_home": 35,
			"final_display": "Northern Illinois 14–Georgia State 35",
			"mov_home": 21,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 16.2,
			"err_vegas": 10.5,
			"winner_flip": false,
			"flags": [],
			"brier": .141376
		},
		{
			"espn_event_id": "401864510",
			"kick_ct": "2026-09-26 14:00",
			"weekday": "Sat",
			"tv": "CW",
			"away": "Hawaiʻi",
			"home": "Wyoming",
			"away_short": "HAW",
			"home_short": "WYO",
			"away_slug": "hawaii",
			"home_slug": "wyoming",
			"neutral": false,
			"hx_fav": "Hawaiʻi",
			"hx_home": 5.3,
			"hx_spread_display": "Hawaiʻi -5.3",
			"hx_wp": 63.5,
			"home_hx_rating": -3.8092,
			"away_hx_rating": -.9715,
			"home_hx_rank": 118,
			"away_hx_rank": 81,
			"vegas_home": 3,
			"vegas_details": "HAW -3",
			"vegas_ou": 44.5,
			"score_away": 10,
			"score_home": 27,
			"final_display": "Hawaiʻi 10–Wyoming 27",
			"mov_home": 17,
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 22.3,
			"err_vegas": 20,
			"winner_flip": false,
			"flags": [],
			"brier": .403225
		},
		{
			"espn_event_id": "401856699",
			"kick_ct": "2026-09-26 14:30",
			"weekday": "Sat",
			"tv": "ABC",
			"away": "Ole Miss",
			"home": "Florida",
			"away_short": "MISS",
			"home_short": "FLA",
			"away_slug": "ole-miss",
			"home_slug": "florida",
			"neutral": false,
			"hx_fav": "Ole Miss",
			"hx_home": 2.5,
			"hx_spread_display": "Ole Miss -2.5",
			"hx_wp": 56.8,
			"home_hx_rating": 3.4998,
			"away_hx_rating": 5.4492,
			"home_hx_rank": 24,
			"away_hx_rank": 8,
			"vegas_home": -3.5,
			"vegas_details": "FLA -3.5",
			"vegas_ou": 58.5,
			"score_away": 28,
			"score_home": 52,
			"final_display": "Ole Miss 28–Florida 52",
			"mov_home": 24,
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 26.5,
			"err_vegas": 20.5,
			"winner_flip": true,
			"flags": ["WINNER_FLIP_MISS"],
			"brier": .322624
		},
		{
			"espn_event_id": "401856700",
			"kick_ct": "2026-09-26 14:30",
			"weekday": "Sat",
			"tv": "ESPN",
			"away": "Oklahoma",
			"home": "Georgia",
			"away_short": "OU",
			"home_short": "UGA",
			"away_slug": "oklahoma",
			"home_slug": "georgia",
			"neutral": false,
			"hx_fav": "Georgia",
			"hx_home": -16.6,
			"hx_spread_display": "Georgia -16.6",
			"hx_wp": 82.1,
			"home_hx_rating": 7.8978,
			"away_hx_rating": 4.1874,
			"home_hx_rank": 1,
			"away_hx_rank": 16,
			"vegas_home": -14,
			"vegas_details": "UGA -14",
			"vegas_ou": 44.5,
			"score_away": 13,
			"score_home": 41,
			"final_display": "Oklahoma 13–Georgia 41",
			"mov_home": 28,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 11.4,
			"err_vegas": 14,
			"winner_flip": false,
			"flags": [],
			"brier": .032041
		},
		{
			"espn_event_id": "401856815",
			"kick_ct": "2026-09-26 14:30",
			"weekday": "Sat",
			"tv": "FS1",
			"away": "TCU",
			"home": "UCF",
			"away_short": "TCU",
			"home_short": "UCF",
			"away_slug": "tcu",
			"home_slug": "ucf",
			"neutral": false,
			"hx_fav": "TCU",
			"hx_home": 5.6,
			"hx_spread_display": "TCU -5.6",
			"hx_wp": 64.2,
			"home_hx_rating": -.7314,
			"away_hx_rating": 2.2002,
			"home_hx_rank": 78,
			"away_hx_rank": 32,
			"vegas_home": 3,
			"vegas_details": "TCU -3",
			"vegas_ou": 48.5,
			"score_away": 13,
			"score_home": 21,
			"final_display": "TCU 13–UCF 21",
			"mov_home": 8,
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 13.6,
			"err_vegas": 11,
			"winner_flip": false,
			"flags": [],
			"brier": .412164
		},
		{
			"espn_event_id": "401856816",
			"kick_ct": "2026-09-26 14:30",
			"weekday": "Sat",
			"tv": "FOX",
			"away": "Utah",
			"home": "Iowa State",
			"away_short": "UTAH",
			"home_short": "ISU",
			"away_slug": "utah",
			"home_slug": "iowa-state",
			"neutral": false,
			"hx_fav": "Utah",
			"hx_home": 7.3,
			"hx_spread_display": "Utah -7.3",
			"hx_wp": 67.7,
			"home_hx_rating": .8418,
			"away_hx_rating": 4.273,
			"home_hx_rank": 54,
			"away_hx_rank": 14,
			"vegas_home": 8.5,
			"vegas_details": "UTAH -8.5",
			"vegas_ou": 48.5,
			"score_away": 31,
			"score_home": 17,
			"final_display": "Utah 31–Iowa State 17",
			"mov_home": -14,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 6.7,
			"err_vegas": 5.5,
			"winner_flip": false,
			"flags": [],
			"brier": .104329
		},
		{
			"espn_event_id": "401858463",
			"kick_ct": "2026-09-26 14:30",
			"weekday": "Sat",
			"tv": "CBS",
			"away": "Iowa",
			"home": "Michigan",
			"away_short": "IOWA",
			"home_short": "MICH",
			"away_slug": "iowa",
			"home_slug": "michigan",
			"neutral": false,
			"hx_fav": "Michigan",
			"hx_home": -7,
			"hx_spread_display": "Michigan -7.0",
			"hx_wp": 67.1,
			"home_hx_rating": 4.8942,
			"away_hx_rating": 3.7409,
			"home_hx_rank": 12,
			"away_hx_rank": 23,
			"vegas_home": -5.5,
			"vegas_details": "MICH -5.5",
			"vegas_ou": 38.5,
			"score_away": 20,
			"score_home": 19,
			"final_display": "Iowa 20–Michigan 19",
			"mov_home": -1,
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 8,
			"err_vegas": 6.5,
			"winner_flip": false,
			"flags": [],
			"brier": .450241
		},
		{
			"espn_event_id": "401860897",
			"kick_ct": "2026-09-26 14:30",
			"weekday": "Sat",
			"tv": "ESPN2",
			"away": "Boise State",
			"home": "Western Michigan",
			"away_short": "BOIS",
			"home_short": "WMU",
			"away_slug": "boise-state",
			"home_slug": "western-michigan",
			"neutral": false,
			"hx_fav": "Western Michigan",
			"hx_home": -.8,
			"hx_spread_display": "Western Michigan -0.8",
			"hx_wp": 52.1,
			"home_hx_rating": .4706,
			"away_hx_rating": 1.2954,
			"home_hx_rank": 61,
			"away_hx_rank": 48,
			"vegas_home": 7,
			"vegas_details": "BOIS -7",
			"vegas_ou": 50.5,
			"score_away": 32,
			"score_home": 7,
			"final_display": "Boise State 32–Western Michigan 7",
			"mov_home": -25,
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 25.8,
			"err_vegas": 18,
			"winner_flip": true,
			"flags": ["WINNER_FLIP_MISS"],
			"brier": .271441
		},
		{
			"espn_event_id": "401861970",
			"kick_ct": "2026-09-26 14:30",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "UConn",
			"home": "Miami (OH)",
			"away_short": "CONN",
			"home_short": "M-OH",
			"away_slug": "uconn",
			"home_slug": "miami-oh",
			"neutral": false,
			"hx_fav": "Miami (OH)",
			"hx_home": -6,
			"hx_spread_display": "Miami (OH) -6.0",
			"hx_wp": 65,
			"home_hx_rating": -.9784,
			"away_hx_rating": -1.8368,
			"home_hx_rank": 82,
			"away_hx_rank": 95,
			"vegas_home": -3.5,
			"vegas_details": "M-OH -3.5",
			"vegas_ou": 51.5,
			"score_away": 21,
			"score_home": 24,
			"final_display": "UConn 21–Miami (OH) 24",
			"mov_home": 3,
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 3,
			"err_vegas": .5,
			"winner_flip": false,
			"flags": [],
			"brier": .1225
		},
		{
			"espn_event_id": "401864579",
			"kick_ct": "2026-09-26 14:30",
			"weekday": "Sat",
			"tv": "CBSSN",
			"away": "New Mexico",
			"home": "New Mexico State",
			"away_short": "UNM",
			"home_short": "NMSU",
			"away_slug": "new-mexico",
			"home_slug": "new-mexico-state",
			"neutral": false,
			"hx_fav": "New Mexico",
			"hx_home": 5.1,
			"hx_spread_display": "New Mexico -5.1",
			"hx_wp": 63,
			"home_hx_rating": -4.7265,
			"away_hx_rating": -1.9515,
			"home_hx_rank": 125,
			"away_hx_rank": 98,
			"vegas_home": 11.5,
			"vegas_details": "UNM -11.5",
			"vegas_ou": 48.5,
			"score_away": 42,
			"score_home": 18,
			"final_display": "New Mexico 42–New Mexico State 18",
			"mov_home": -24,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 18.9,
			"err_vegas": 12.5,
			"winner_flip": false,
			"flags": [],
			"brier": .1369
		},
		{
			"espn_event_id": "401856806",
			"kick_ct": "2026-09-26 15:00",
			"weekday": "Sat",
			"tv": "ESPNU",
			"away": "Houston",
			"home": "Georgia Southern",
			"away_short": "HOU",
			"home_short": "GASO",
			"away_slug": "houston",
			"home_slug": "georgia-southern",
			"neutral": false,
			"hx_fav": "Houston",
			"hx_home": 7.6,
			"hx_spread_display": "Houston -7.6",
			"hx_wp": 68.2,
			"home_hx_rating": -1.8811,
			"away_hx_rating": 1.623,
			"home_hx_rank": 96,
			"away_hx_rank": 39,
			"vegas_home": 18.5,
			"vegas_details": "HOU -18.5",
			"vegas_ou": 56.5,
			"score_away": 42,
			"score_home": 28,
			"final_display": "Houston 42–Georgia Southern 28",
			"mov_home": -14,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 6.4,
			"err_vegas": 4.5,
			"winner_flip": false,
			"flags": [],
			"brier": .101124
		},
		{
			"espn_event_id": "401856698",
			"kick_ct": "2026-09-26 15:15",
			"weekday": "Sat",
			"tv": "SEC Network",
			"away": "Vanderbilt",
			"home": "Auburn",
			"away_short": "VAN",
			"home_short": "AUB",
			"away_slug": "vanderbilt",
			"home_slug": "auburn",
			"neutral": false,
			"hx_fav": "Auburn",
			"hx_home": -2.6,
			"hx_spread_display": "Auburn -2.6",
			"hx_wp": 57,
			"home_hx_rating": 2.2261,
			"away_hx_rating": 2.4299,
			"home_hx_rank": 31,
			"away_hx_rank": 29,
			"vegas_home": -9.5,
			"vegas_details": "AUB -9.5",
			"vegas_ou": 55.5,
			"score_away": 15,
			"score_home": 21,
			"final_display": "Vanderbilt 15–Auburn 21",
			"mov_home": 6,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 3.4,
			"err_vegas": 3.5,
			"winner_flip": false,
			"flags": [],
			"brier": .1849
		},
		{
			"espn_event_id": "401858464",
			"kick_ct": "2026-09-26 16:00",
			"weekday": "Sat",
			"tv": "BTN",
			"away": "Nebraska",
			"home": "Michigan State",
			"away_short": "NEB",
			"home_short": "MSU",
			"away_slug": "nebraska",
			"home_slug": "michigan-state",
			"neutral": false,
			"hx_fav": "Nebraska",
			"hx_home": 8.9,
			"hx_spread_display": "Nebraska -8.9",
			"hx_wp": 70.8,
			"home_hx_rating": -1.8991,
			"away_hx_rating": 1.9862,
			"home_hx_rank": 97,
			"away_hx_rank": 34,
			"vegas_home": 5.5,
			"vegas_details": "NEB -5.5",
			"vegas_ou": 48.5,
			"score_away": 31,
			"score_home": 13,
			"final_display": "Nebraska 31–Michigan State 13",
			"mov_home": -18,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 9.1,
			"err_vegas": 12.5,
			"winner_flip": false,
			"flags": [],
			"brier": .085264
		},
		{
			"espn_event_id": "401858466",
			"kick_ct": "2026-09-26 16:00",
			"weekday": "Sat",
			"tv": "Peacock",
			"away": "Wisconsin",
			"home": "Penn State",
			"away_short": "WIS",
			"home_short": "PSU",
			"away_slug": "wisconsin",
			"home_slug": "penn-state",
			"neutral": false,
			"hx_fav": "Penn State",
			"hx_home": -14.6,
			"hx_spread_display": "Penn State -14.6",
			"hx_wp": 79.6,
			"home_hx_rating": 4.3342,
			"away_hx_rating": 1.118,
			"home_hx_rank": 13,
			"away_hx_rank": 50,
			"vegas_home": -10,
			"vegas_details": "PSU -10",
			"vegas_ou": 44.5,
			"score_away": 24,
			"score_home": 20,
			"final_display": "Wisconsin 24–Penn State 20",
			"mov_home": -4,
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 18.6,
			"err_vegas": 14,
			"winner_flip": false,
			"flags": [],
			"brier": .633616
		},
		{
			"espn_event_id": "401862785",
			"kick_ct": "2026-09-26 16:00",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "South Florida",
			"home": "Bowling Green",
			"away_short": "USF",
			"home_short": "BGSU",
			"away_slug": "usf",
			"home_slug": "bowling-green",
			"neutral": false,
			"hx_fav": "South Florida",
			"hx_home": 11.1,
			"hx_spread_display": "South Florida -11.1",
			"hx_wp": 74.5,
			"home_hx_rating": -4.3558,
			"away_hx_rating": .1263,
			"home_hx_rank": 124,
			"away_hx_rank": 69,
			"vegas_home": 17.5,
			"vegas_details": "USF -17.5",
			"vegas_ou": 48.5,
			"score_away": 14,
			"score_home": 6,
			"final_display": "South Florida 14–Bowling Green 6",
			"mov_home": -8,
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 3.1,
			"err_vegas": 9.5,
			"winner_flip": false,
			"flags": [],
			"brier": .065025
		},
		{
			"espn_event_id": "401858239",
			"kick_ct": "2026-09-26 17:00",
			"weekday": "Sat",
			"tv": "ACC Network",
			"away": "Delaware",
			"home": "Virginia",
			"away_short": "DEL",
			"home_short": "UVA",
			"away_slug": "delaware",
			"home_slug": "virginia",
			"neutral": false,
			"hx_fav": "Virginia",
			"hx_home": -18.1,
			"hx_spread_display": "Virginia -18.1",
			"hx_wp": 83.6,
			"home_hx_rating": 1.4244,
			"away_hx_rating": -2.6347,
			"home_hx_rank": 45,
			"away_hx_rank": 105,
			"vegas_home": -19.5,
			"vegas_details": "UVA -19.5",
			"vegas_ou": 52.5,
			"score_away": 3,
			"score_home": 42,
			"final_display": "Delaware 3–Virginia 42",
			"mov_home": 39,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 20.9,
			"err_vegas": 19.5,
			"winner_flip": false,
			"flags": [],
			"brier": .026896
		},
		{
			"espn_event_id": "401869961",
			"kick_ct": "2026-09-26 17:00",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "James Madison",
			"home": "Old Dominion",
			"away_short": "JMU",
			"home_short": "ODU",
			"away_slug": "james-madison",
			"home_slug": "old-dominion",
			"neutral": false,
			"hx_fav": "James Madison",
			"hx_home": 5.3,
			"hx_spread_display": "James Madison -5.3",
			"hx_wp": 63.4,
			"home_hx_rating": -1.3393,
			"away_hx_rating": 1.4925,
			"home_hx_rank": 92,
			"away_hx_rank": 44,
			"vegas_home": 6,
			"vegas_details": "JMU -6",
			"vegas_ou": 44.5,
			"score_away": 46,
			"score_home": 20,
			"final_display": "James Madison 46–Old Dominion 20",
			"mov_home": -26,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 20.7,
			"err_vegas": 20,
			"winner_flip": false,
			"flags": [],
			"brier": .133956
		},
		{
			"espn_event_id": "401858238",
			"kick_ct": "2026-09-26 17:30",
			"weekday": "Sat",
			"tv": "CW",
			"away": "Central Michigan",
			"home": "Miami",
			"away_short": "CMU",
			"home_short": "MIA",
			"away_slug": "central-michigan",
			"home_slug": "miami",
			"neutral": false,
			"hx_fav": "Miami",
			"hx_home": -39.9,
			"hx_spread_display": "Miami -39.9",
			"hx_wp": 95.5,
			"home_hx_rating": 5.2345,
			"away_hx_rating": -3.3366,
			"home_hx_rank": 10,
			"away_hx_rank": 113,
			"vegas_home": -41.5,
			"vegas_details": "MIA -41.5",
			"vegas_ou": 53.5,
			"score_away": 3,
			"score_home": 52,
			"final_display": "Central Michigan 3–Miami 52",
			"mov_home": 49,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 9.1,
			"err_vegas": 7.5,
			"winner_flip": false,
			"flags": [],
			"brier": .002025
		},
		{
			"espn_event_id": "401862780",
			"kick_ct": "2026-09-26 17:30",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "Louisiana",
			"home": "Charlotte",
			"away_short": "UL",
			"home_short": "CLT",
			"away_slug": "louisiana",
			"home_slug": "charlotte",
			"neutral": false,
			"hx_fav": "Louisiana",
			"hx_home": 11.8,
			"hx_spread_display": "Louisiana -11.8",
			"hx_wp": 75.7,
			"home_hx_rating": -5.7447,
			"away_hx_rating": -1.0677,
			"home_hx_rank": 133,
			"away_hx_rank": 86,
			"vegas_home": 10,
			"vegas_details": "UL -10",
			"vegas_ou": 48.5,
			"score_away": 34,
			"score_home": 7,
			"final_display": "Louisiana 34–Charlotte 7",
			"mov_home": -27,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 15.2,
			"err_vegas": 17,
			"winner_flip": false,
			"flags": [],
			"brier": .059049
		},
		{
			"espn_event_id": "401856696",
			"kick_ct": "2026-09-26 18:00",
			"weekday": "Sat",
			"tv": "ESPN",
			"away": "South Carolina",
			"home": "Alabama",
			"away_short": "SC",
			"home_short": "ALA",
			"away_slug": "south-carolina",
			"home_slug": "alabama",
			"neutral": false,
			"hx_fav": "Alabama",
			"hx_home": -11.6,
			"hx_spread_display": "Alabama -11.6",
			"hx_wp": 75.3,
			"home_hx_rating": 5.2998,
			"away_hx_rating": 2.8667,
			"home_hx_rank": 9,
			"away_hx_rank": 27,
			"vegas_home": -12.5,
			"vegas_details": "ALA -12.5",
			"vegas_ou": 53.5,
			"score_away": 18,
			"score_home": 49,
			"final_display": "South Carolina 18–Alabama 49",
			"mov_home": 31,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 19.4,
			"err_vegas": 18.5,
			"winner_flip": false,
			"flags": [],
			"brier": .061009
		},
		{
			"espn_event_id": "401856814",
			"kick_ct": "2026-09-26 18:00",
			"weekday": "Sat",
			"tv": "ESPN2",
			"away": "Kansas State",
			"home": "Cincinnati",
			"away_short": "KSU",
			"home_short": "CIN",
			"away_slug": "kansas-state",
			"home_slug": "cincinnati",
			"neutral": false,
			"hx_fav": "Kansas State",
			"hx_home": 7.3,
			"hx_spread_display": "Kansas State -7.3",
			"hx_wp": 67.8,
			"home_hx_rating": -1.0048,
			"away_hx_rating": 2.431,
			"home_hx_rank": 83,
			"away_hx_rank": 28,
			"vegas_home": 6.5,
			"vegas_details": "KSU -6.5",
			"vegas_ou": 55.5,
			"score_away": 26,
			"score_home": 31,
			"final_display": "Kansas State 26–Cincinnati 31",
			"mov_home": 5,
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 12.3,
			"err_vegas": 11.5,
			"winner_flip": false,
			"flags": [],
			"brier": .459684
		},
		{
			"espn_event_id": "401856881",
			"kick_ct": "2026-09-26 18:00",
			"weekday": "Sat",
			"tv": "FS1",
			"away": "Oklahoma State",
			"home": "West Virginia",
			"away_short": "OKST",
			"home_short": "WVU",
			"away_slug": "oklahoma-state",
			"home_slug": "west-virginia",
			"neutral": false,
			"hx_fav": "West Virginia",
			"hx_home": -3.4,
			"hx_spread_display": "West Virginia -3.4",
			"hx_wp": 59.1,
			"home_hx_rating": -1.1242,
			"away_hx_rating": -1.1959,
			"home_hx_rank": 88,
			"away_hx_rank": 89,
			"vegas_home": -1.5,
			"vegas_details": "WVU -1.5",
			"vegas_ou": 60.5,
			"score_away": 41,
			"score_home": 24,
			"final_display": "Oklahoma State 41–West Virginia 24",
			"mov_home": -17,
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 20.4,
			"err_vegas": 18.5,
			"winner_flip": false,
			"flags": [],
			"brier": .349281
		},
		{
			"espn_event_id": "401862784",
			"kick_ct": "2026-09-26 18:00",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "Southern Miss",
			"home": "Tulane",
			"away_short": "USM",
			"home_short": "TULN",
			"away_slug": "southern-miss",
			"home_slug": "tulane",
			"neutral": false,
			"hx_fav": "Tulane",
			"hx_home": -1.7,
			"hx_spread_display": "Tulane -1.7",
			"hx_wp": 54.7,
			"home_hx_rating": -1.2055,
			"away_hx_rating": -.7079,
			"home_hx_rank": 90,
			"away_hx_rank": 77,
			"vegas_home": -18.5,
			"vegas_details": "TULN -18.5",
			"vegas_ou": 52.5,
			"score_away": 21,
			"score_home": 24,
			"final_display": "Southern Miss 21–Tulane 24",
			"mov_home": 3,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 1.3,
			"err_vegas": 15.5,
			"winner_flip": false,
			"flags": [],
			"brier": .205209
		},
		{
			"espn_event_id": "401869931",
			"kick_ct": "2026-09-26 18:00",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "Kennesaw State",
			"home": "Arkansas State",
			"away_short": "KENN",
			"home_short": "ARST",
			"away_slug": "kennesaw-state",
			"home_slug": "arkansas-state",
			"neutral": false,
			"hx_fav": "Arkansas State",
			"hx_home": -11.8,
			"hx_spread_display": "Arkansas State -11.8",
			"hx_wp": 75.6,
			"home_hx_rating": -1.4939,
			"away_hx_rating": -3.9818,
			"home_hx_rank": 93,
			"away_hx_rank": 119,
			"vegas_home": -6,
			"vegas_details": "ARST -6",
			"vegas_ou": 52.5,
			"score_away": 14,
			"score_home": 17,
			"final_display": "Kennesaw State 14–Arkansas State 17",
			"mov_home": 3,
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 8.8,
			"err_vegas": 3,
			"winner_flip": false,
			"flags": [],
			"brier": .059536
		},
		{
			"espn_event_id": "401871048",
			"kick_ct": "2026-09-26 18:00",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "Middle Tennessee",
			"home": "Jacksonville State",
			"away_short": "MTSU",
			"home_short": "JXST",
			"away_slug": "middle-tennessee",
			"home_slug": "jacksonville-state",
			"neutral": false,
			"hx_fav": "Jacksonville State",
			"hx_home": -17.5,
			"hx_spread_display": "Jacksonville State -17.5",
			"hx_wp": 83,
			"home_hx_rating": -.8731,
			"away_hx_rating": -4.7862,
			"home_hx_rank": 80,
			"away_hx_rank": 126,
			"vegas_home": -7,
			"vegas_details": "JXST -7",
			"vegas_ou": 51.5,
			"score_away": 13,
			"score_home": 23,
			"final_display": "Middle Tennessee 13–Jacksonville State 23",
			"mov_home": 10,
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 7.5,
			"err_vegas": 3,
			"winner_flip": false,
			"flags": [],
			"brier": .0289
		},
		{
			"espn_event_id": "401856702",
			"kick_ct": "2026-09-26 18:30",
			"weekday": "Sat",
			"tv": "ABC",
			"away": "Texas A&M",
			"home": "LSU",
			"away_short": "TA&M",
			"home_short": "LSU",
			"away_slug": "texas-am",
			"home_slug": "lsu",
			"neutral": false,
			"hx_fav": "Texas A&M",
			"hx_home": 2.7,
			"hx_spread_display": "Texas A&M -2.7",
			"hx_wp": 57.4,
			"home_hx_rating": 4.0776,
			"away_hx_rating": 6.1053,
			"home_hx_rank": 19,
			"away_hx_rank": 6,
			"vegas_home": -8.5,
			"vegas_details": "LSU -8.5",
			"vegas_ou": 51.5,
			"score_away": 6,
			"score_home": 35,
			"final_display": "Texas A&M 6–LSU 35",
			"mov_home": 29,
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 31.7,
			"err_vegas": 20.5,
			"winner_flip": true,
			"flags": ["WINNER_FLIP_MISS"],
			"brier": .329476
		},
		{
			"espn_event_id": "401856804",
			"kick_ct": "2026-09-26 18:30",
			"weekday": "Sat",
			"tv": "CBS",
			"away": "Arizona",
			"home": "Washington State",
			"away_short": "ARIZ",
			"home_short": "WSU",
			"away_slug": "arizona",
			"home_slug": "washington-state",
			"neutral": false,
			"hx_fav": "Arizona",
			"hx_home": 1.3,
			"hx_spread_display": "Arizona -1.3",
			"hx_wp": 53.6,
			"home_hx_rating": .7819,
			"away_hx_rating": 2.3313,
			"home_hx_rank": 57,
			"away_hx_rank": 30,
			"vegas_home": 10,
			"vegas_details": "ARIZ -10",
			"vegas_ou": 48.5,
			"score_away": 34,
			"score_home": 24,
			"final_display": "Arizona 34–Washington State 24",
			"mov_home": -10,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 8.7,
			"err_vegas": 0,
			"winner_flip": false,
			"flags": [],
			"brier": .215296
		},
		{
			"espn_event_id": "401858469",
			"kick_ct": "2026-09-26 18:30",
			"weekday": "Sat",
			"tv": "NBC",
			"away": "Oregon",
			"home": "USC",
			"away_short": "ORE",
			"home_short": "USC",
			"away_slug": "oregon",
			"home_slug": "usc",
			"neutral": false,
			"hx_fav": "Oregon",
			"hx_home": 6,
			"hx_spread_display": "Oregon -6.0",
			"hx_wp": 65.1,
			"home_hx_rating": 3.8488,
			"away_hx_rating": 6.9056,
			"home_hx_rank": 21,
			"away_hx_rank": 4,
			"vegas_home": 3,
			"vegas_details": "ORE -3",
			"vegas_ou": 62.5,
			"score_away": 41,
			"score_home": 27,
			"final_display": "Oregon 41–USC 27",
			"mov_home": -14,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 8,
			"err_vegas": 11,
			"winner_flip": false,
			"flags": [],
			"brier": .121801
		},
		{
			"espn_event_id": "401860894",
			"kick_ct": "2026-09-26 18:30",
			"weekday": "Sat",
			"tv": "CBSSN",
			"away": "Troy",
			"home": "Utah State",
			"away_short": "TROY",
			"home_short": "USU",
			"away_slug": "troy",
			"home_slug": "utah-state",
			"neutral": false,
			"hx_fav": "Utah State",
			"hx_home": -4.6,
			"hx_spread_display": "Utah State -4.6",
			"hx_wp": 61.9,
			"home_hx_rating": -.6356,
			"away_hx_rating": -1.0841,
			"home_hx_rank": 76,
			"away_hx_rank": 87,
			"vegas_home": -3,
			"vegas_details": "USU -3",
			"vegas_ou": 47.5,
			"score_away": 10,
			"score_home": 21,
			"final_display": "Troy 10–Utah State 21",
			"mov_home": 11,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 6.4,
			"err_vegas": 8,
			"winner_flip": false,
			"flags": [],
			"brier": .145161
		},
		{
			"espn_event_id": "401864572",
			"kick_ct": "2026-09-26 18:30",
			"weekday": "Sat",
			"tv": "ESPNU",
			"away": "App State",
			"home": "NC State",
			"away_short": "APP",
			"home_short": "NCSU",
			"away_slug": "app-state",
			"home_slug": "nc-state",
			"neutral": false,
			"hx_fav": "NC State",
			"hx_home": -19.2,
			"hx_spread_display": "NC State -19.2",
			"hx_wp": 84.8,
			"home_hx_rating": 2.1175,
			"away_hx_rating": -2.216,
			"home_hx_rank": 33,
			"away_hx_rank": 103,
			"vegas_home": -14,
			"vegas_details": "NCSU -14",
			"vegas_ou": 55.5,
			"score_away": 31,
			"score_home": 41,
			"final_display": "App State 31–NC State 41",
			"mov_home": 10,
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 9.2,
			"err_vegas": 4,
			"winner_flip": false,
			"flags": [],
			"brier": .023104
		},
		{
			"espn_event_id": "401856703",
			"kick_ct": "2026-09-26 18:45",
			"weekday": "Sat",
			"tv": "SEC Network",
			"away": "Missouri",
			"home": "Mississippi State",
			"away_short": "MIZ",
			"home_short": "MSST",
			"away_slug": "missouri",
			"home_slug": "mississippi-state",
			"neutral": false,
			"hx_fav": "Missouri",
			"hx_home": 9.5,
			"hx_spread_display": "Missouri -9.5",
			"hx_wp": 71.9,
			"home_hx_rating": .2047,
			"away_hx_rating": 4.2596,
			"home_hx_rank": 67,
			"away_hx_rank": 15,
			"vegas_home": -6.5,
			"vegas_details": "MSST -6.5",
			"vegas_ou": 58.5,
			"score_away": 24,
			"score_home": 31,
			"final_display": "Missouri 24–Mississippi State 31",
			"mov_home": 7,
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 16.5,
			"err_vegas": .5,
			"winner_flip": true,
			"flags": ["WINNER_FLIP_MISS"],
			"brier": .516961
		},
		{
			"espn_event_id": "401856697",
			"kick_ct": "2026-09-26 19:00",
			"weekday": "Sat",
			"tv": "SECN+",
			"away": "Tulsa",
			"home": "Arkansas",
			"away_short": "TLSA",
			"home_short": "ARK",
			"away_slug": "tulsa",
			"home_slug": "arkansas",
			"neutral": false,
			"hx_fav": "Arkansas",
			"hx_home": -17,
			"hx_spread_display": "Arkansas -17.0",
			"hx_wp": 82.5,
			"home_hx_rating": .5959,
			"away_hx_rating": -3.2034,
			"home_hx_rank": 59,
			"away_hx_rank": 111,
			"vegas_home": -7,
			"vegas_details": "ARK -7",
			"vegas_ou": 50.5,
			"score_away": 6,
			"score_home": 34,
			"final_display": "Tulsa 6–Arkansas 34",
			"mov_home": 28,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 11,
			"err_vegas": 21,
			"winner_flip": false,
			"flags": [],
			"brier": .030625
		},
		{
			"espn_event_id": "401862782",
			"kick_ct": "2026-09-26 19:00",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "Florida Atlantic",
			"home": "UL Monroe",
			"away_short": "FAU",
			"home_short": "ULM",
			"away_slug": "florida-atlantic",
			"home_slug": "ul-monroe",
			"neutral": false,
			"hx_fav": "Florida Atlantic",
			"hx_home": 2.4,
			"hx_spread_display": "Florida Atlantic -2.4",
			"hx_wp": 56.4,
			"home_hx_rating": -4.9467,
			"away_hx_rating": -3.0449,
			"home_hx_rank": 128,
			"away_hx_rank": 110,
			"vegas_home": 13.5,
			"vegas_details": "FAU -13.5",
			"vegas_ou": 57.5,
			"score_away": 45,
			"score_home": 17,
			"final_display": "Florida Atlantic 45–UL Monroe 17",
			"mov_home": -28,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 25.6,
			"err_vegas": 14.5,
			"winner_flip": false,
			"flags": [],
			"brier": .190096
		},
		{
			"espn_event_id": "401858241",
			"kick_ct": "2026-09-26 20:00",
			"weekday": "Sat",
			"tv": "ACC Network",
			"away": "Missouri State",
			"home": "SMU",
			"away_short": "MOST",
			"home_short": "SMU",
			"away_slug": "missouri-state",
			"home_slug": "smu",
			"neutral": false,
			"hx_fav": "SMU",
			"hx_home": -30.6,
			"hx_spread_display": "SMU -30.6",
			"hx_wp": 92.3,
			"home_hx_rating": 4.0469,
			"away_hx_rating": -2.7274,
			"home_hx_rank": 20,
			"away_hx_rank": 107,
			"vegas_home": -34.5,
			"vegas_details": "SMU -34.5",
			"vegas_ou": 59.5,
			"score_away": 24,
			"score_home": 34,
			"final_display": "Missouri State 24–SMU 34",
			"mov_home": 10,
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 20.6,
			"err_vegas": 24.5,
			"winner_flip": false,
			"flags": [],
			"brier": .005929
		},
		{
			"espn_event_id": "401860895",
			"kick_ct": "2026-09-26 20:00",
			"weekday": "Sat",
			"tv": "MW+",
			"away": "Oregon State",
			"home": "UTEP",
			"away_short": "ORST",
			"home_short": "UTEP",
			"away_slug": "oregon-state",
			"home_slug": "utep",
			"neutral": false,
			"hx_fav": "Oregon State",
			"hx_home": 11.1,
			"hx_spread_display": "Oregon State -11.1",
			"hx_wp": 74.6,
			"home_hx_rating": -5.531,
			"away_hx_rating": -1.031,
			"home_hx_rank": 132,
			"away_hx_rank": 84,
			"vegas_home": 10.5,
			"vegas_details": "ORST -10.5",
			"vegas_ou": 55.5,
			"score_away": 33,
			"score_home": 7,
			"final_display": "Oregon State 33–UTEP 7",
			"mov_home": -26,
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 14.9,
			"err_vegas": 15.5,
			"winner_flip": false,
			"flags": [],
			"brier": .064516
		},
		{
			"espn_event_id": "401860891",
			"kick_ct": "2026-09-26 21:00",
			"weekday": "Sat",
			"tv": "CW",
			"away": "Rice",
			"home": "Fresno State",
			"away_short": "RICE",
			"home_short": "FRES",
			"away_slug": "rice",
			"home_slug": "fresno-state",
			"neutral": false,
			"hx_fav": "Fresno State",
			"hx_home": -17.2,
			"hx_spread_display": "Fresno State -17.2",
			"hx_wp": 82.7,
			"home_hx_rating": .1906,
			"away_hx_rating": -3.6556,
			"home_hx_rank": 68,
			"away_hx_rank": 117,
			"vegas_home": -13.5,
			"vegas_details": "FRES -13.5",
			"vegas_ou": 44.5,
			"score_away": 24,
			"score_home": 38,
			"final_display": "Rice 24–Fresno State 38",
			"mov_home": 14,
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 3.2,
			"err_vegas": .5,
			"winner_flip": false,
			"flags": [],
			"brier": .029929
		},
		{
			"espn_event_id": "401858240",
			"kick_ct": "2026-09-26 21:30",
			"weekday": "Sat",
			"tv": "ESPN",
			"away": "Georgia Tech",
			"home": "Stanford",
			"away_short": "GT",
			"home_short": "STAN",
			"away_slug": "georgia-tech",
			"home_slug": "stanford",
			"neutral": false,
			"hx_fav": "Georgia Tech",
			"hx_home": 3.8,
			"hx_spread_display": "Georgia Tech -3.8",
			"hx_wp": 59.9,
			"home_hx_rating": -.7355,
			"away_hx_rating": 1.621,
			"home_hx_rank": 79,
			"away_hx_rank": 40,
			"vegas_home": 3.5,
			"vegas_details": "GT -3.5",
			"vegas_ou": 48.5,
			"score_away": 27,
			"score_home": 34,
			"final_display": "Georgia Tech 27–Stanford 34",
			"mov_home": 7,
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 10.8,
			"err_vegas": 10.5,
			"winner_flip": false,
			"flags": [],
			"brier": .358801
		},
		{
			"espn_event_id": "401864509",
			"kick_ct": "2026-09-26 21:30",
			"weekday": "Sat",
			"tv": "FS1",
			"away": "Air Force",
			"home": "Nevada",
			"away_short": "AFA",
			"home_short": "NEV",
			"away_slug": "air-force",
			"home_slug": "nevada",
			"neutral": false,
			"hx_fav": "Nevada",
			"hx_home": -6.7,
			"hx_spread_display": "Nevada -6.7",
			"hx_wp": 66.5,
			"home_hx_rating": -5.3963,
			"away_hx_rating": -6.4701,
			"home_hx_rank": 131,
			"away_hx_rank": 135,
			"vegas_home": 5.5,
			"vegas_details": "AF -5.5",
			"vegas_ou": 49.5,
			"score_away": 36,
			"score_home": 33,
			"final_display": "Air Force 36–Nevada 33",
			"mov_home": -3,
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 9.7,
			"err_vegas": 2.5,
			"winner_flip": true,
			"flags": ["WINNER_FLIP_MISS"],
			"brier": .442225
		},
		{
			"espn_event_id": "401858470",
			"kick_ct": "2026-09-26 22:00",
			"weekday": "Sat",
			"tv": "FOX",
			"away": "Minnesota",
			"home": "Washington",
			"away_short": "MINN",
			"home_short": "WASH",
			"away_slug": "minnesota",
			"home_slug": "washington",
			"neutral": false,
			"hx_fav": "Washington",
			"hx_home": -8,
			"hx_spread_display": "Washington -8.0",
			"hx_wp": 69.1,
			"home_hx_rating": 3.2867,
			"away_hx_rating": 1.8383,
			"home_hx_rank": 25,
			"away_hx_rank": 35,
			"vegas_home": -10,
			"vegas_details": "WASH -10",
			"vegas_ou": 45.5,
			"score_away": 27,
			"score_home": 24,
			"final_display": "Minnesota 27–Washington 24",
			"mov_home": -3,
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 11,
			"err_vegas": 13,
			"winner_flip": false,
			"flags": [],
			"brier": .477481
		}
	]
};
var week4_tape_top25_closer_2026_default = {
	meta: {
		"as_of": "2026-09-27 10:16 AM CT",
		"week": 4,
		"season": 2026,
		"universe": "FBS–FBS with ≥1 team in HX Top 25 (HX 2026.5 hx_rank_post ≤ 25)",
		"n_games": 18,
		"hx_closer": "8/18",
		"hx_closer_pct": 44.4,
		"su": "12/18",
		"su_pct": 66.7,
		"full_slate_closer": "20/57 (35.1%)",
		"source_tape": "data/week4_tape_2026.json",
		"rank_source": "week3_od_hx_ship_2026.json hx_rank_post (HX 2026.5, not retuned)"
	},
	games: [
		{
			"espn_event_id": "401858461",
			"kick_ct": "2026-09-25 19:00",
			"matchup": "NU @ IU",
			"away": "Northwestern",
			"home": "Indiana",
			"home_hx_rank": 11,
			"away_hx_rank": 36,
			"hx_spread_display": "Indiana -14.7",
			"vegas_details": "IU -21",
			"final": "Northwestern 23–Indiana 29",
			"score_away": 23,
			"score_home": 29,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401858234",
			"kick_ct": "2026-09-25 21:30",
			"matchup": "CLEM @ CAL",
			"away": "Clemson",
			"home": "California",
			"home_hx_rank": 60,
			"away_hx_rank": 22,
			"hx_spread_display": "Clemson -6.7",
			"vegas_details": "CAL -1.5",
			"final": "Clemson 24–California 10",
			"score_away": 24,
			"score_home": 10,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401856704",
			"kick_ct": "2026-09-26 11:00",
			"matchup": "TEX @ TENN",
			"away": "Texas",
			"home": "Tennessee",
			"home_hx_rank": 18,
			"away_hx_rank": 5,
			"hx_spread_display": "Texas -3.8",
			"vegas_details": "TEX -4.5",
			"final": "Texas 20–Tennessee 17",
			"score_away": 20,
			"score_home": 17,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401856805",
			"kick_ct": "2026-09-26 11:00",
			"matchup": "SHSU @ TTU",
			"away": "Sam Houston",
			"home": "Texas Tech",
			"home_hx_rank": 7,
			"away_hx_rank": 120,
			"hx_spread_display": "Texas Tech -48.1",
			"vegas_details": "TTU -34.5",
			"final": "Sam Houston 14–Texas Tech 49",
			"score_away": 14,
			"score_home": 49,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401858465",
			"kick_ct": "2026-09-26 11:00",
			"matchup": "ILL @ OSU",
			"away": "Illinois",
			"home": "Ohio State",
			"home_hx_rank": 2,
			"away_hx_rank": 38,
			"hx_spread_display": "Ohio State -27.6",
			"vegas_details": "OSU -26.5",
			"final": "Illinois 19–Ohio State 42",
			"score_away": 19,
			"score_home": 42,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401858467",
			"kick_ct": "2026-09-26 13:00",
			"matchup": "ND @ PUR",
			"away": "Notre Dame",
			"home": "Purdue",
			"home_hx_rank": 94,
			"away_hx_rank": 3,
			"hx_spread_display": "Notre Dame -28.5",
			"vegas_details": "ND -27.5",
			"final": "Notre Dame 49–Purdue 10",
			"score_away": 49,
			"score_home": 10,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401856699",
			"kick_ct": "2026-09-26 14:30",
			"matchup": "MISS @ FLA",
			"away": "Ole Miss",
			"home": "Florida",
			"home_hx_rank": 24,
			"away_hx_rank": 8,
			"hx_spread_display": "Ole Miss -2.5",
			"vegas_details": "FLA -3.5",
			"final": "Ole Miss 28–Florida 52",
			"score_away": 28,
			"score_home": 52,
			"closer": "vegas",
			"su_hit": false
		},
		{
			"espn_event_id": "401856700",
			"kick_ct": "2026-09-26 14:30",
			"matchup": "OU @ UGA",
			"away": "Oklahoma",
			"home": "Georgia",
			"home_hx_rank": 1,
			"away_hx_rank": 16,
			"hx_spread_display": "Georgia -16.6",
			"vegas_details": "UGA -14",
			"final": "Oklahoma 13–Georgia 41",
			"score_away": 13,
			"score_home": 41,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401856816",
			"kick_ct": "2026-09-26 14:30",
			"matchup": "UTAH @ ISU",
			"away": "Utah",
			"home": "Iowa State",
			"home_hx_rank": 54,
			"away_hx_rank": 14,
			"hx_spread_display": "Utah -7.3",
			"vegas_details": "UTAH -8.5",
			"final": "Utah 31–Iowa State 17",
			"score_away": 31,
			"score_home": 17,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401858463",
			"kick_ct": "2026-09-26 14:30",
			"matchup": "IOWA @ MICH",
			"away": "Iowa",
			"home": "Michigan",
			"home_hx_rank": 12,
			"away_hx_rank": 23,
			"hx_spread_display": "Michigan -7.0",
			"vegas_details": "MICH -5.5",
			"final": "Iowa 20–Michigan 19",
			"score_away": 20,
			"score_home": 19,
			"closer": "vegas",
			"su_hit": false
		},
		{
			"espn_event_id": "401858466",
			"kick_ct": "2026-09-26 16:00",
			"matchup": "WIS @ PSU",
			"away": "Wisconsin",
			"home": "Penn State",
			"home_hx_rank": 13,
			"away_hx_rank": 50,
			"hx_spread_display": "Penn State -14.6",
			"vegas_details": "PSU -10",
			"final": "Wisconsin 24–Penn State 20",
			"score_away": 24,
			"score_home": 20,
			"closer": "vegas",
			"su_hit": false
		},
		{
			"espn_event_id": "401858238",
			"kick_ct": "2026-09-26 17:30",
			"matchup": "CMU @ MIA",
			"away": "Central Michigan",
			"home": "Miami",
			"home_hx_rank": 10,
			"away_hx_rank": 113,
			"hx_spread_display": "Miami -39.9",
			"vegas_details": "MIA -41.5",
			"final": "Central Michigan 3–Miami 52",
			"score_away": 3,
			"score_home": 52,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401856696",
			"kick_ct": "2026-09-26 18:00",
			"matchup": "SC @ ALA",
			"away": "South Carolina",
			"home": "Alabama",
			"home_hx_rank": 9,
			"away_hx_rank": 27,
			"hx_spread_display": "Alabama -11.6",
			"vegas_details": "ALA -12.5",
			"final": "South Carolina 18–Alabama 49",
			"score_away": 18,
			"score_home": 49,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401856702",
			"kick_ct": "2026-09-26 18:30",
			"matchup": "TA&M @ LSU",
			"away": "Texas A&M",
			"home": "LSU",
			"home_hx_rank": 19,
			"away_hx_rank": 6,
			"hx_spread_display": "Texas A&M -2.7",
			"vegas_details": "LSU -8.5",
			"final": "Texas A&M 6–LSU 35",
			"score_away": 6,
			"score_home": 35,
			"closer": "vegas",
			"su_hit": false
		},
		{
			"espn_event_id": "401858469",
			"kick_ct": "2026-09-26 18:30",
			"matchup": "ORE @ USC",
			"away": "Oregon",
			"home": "USC",
			"home_hx_rank": 21,
			"away_hx_rank": 4,
			"hx_spread_display": "Oregon -6.0",
			"vegas_details": "ORE -3",
			"final": "Oregon 41–USC 27",
			"score_away": 41,
			"score_home": 27,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401856703",
			"kick_ct": "2026-09-26 18:45",
			"matchup": "MIZ @ MSST",
			"away": "Missouri",
			"home": "Mississippi State",
			"home_hx_rank": 67,
			"away_hx_rank": 15,
			"hx_spread_display": "Missouri -9.5",
			"vegas_details": "MSST -6.5",
			"final": "Missouri 24–Mississippi State 31",
			"score_away": 24,
			"score_home": 31,
			"closer": "vegas",
			"su_hit": false
		},
		{
			"espn_event_id": "401858241",
			"kick_ct": "2026-09-26 20:00",
			"matchup": "MOST @ SMU",
			"away": "Missouri State",
			"home": "SMU",
			"home_hx_rank": 20,
			"away_hx_rank": 107,
			"hx_spread_display": "SMU -30.6",
			"vegas_details": "SMU -34.5",
			"final": "Missouri State 24–SMU 34",
			"score_away": 24,
			"score_home": 34,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401858470",
			"kick_ct": "2026-09-26 22:00",
			"matchup": "MINN @ WASH",
			"away": "Minnesota",
			"home": "Washington",
			"home_hx_rank": 25,
			"away_hx_rank": 35,
			"hx_spread_display": "Washington -8.0",
			"vegas_details": "WASH -10",
			"final": "Minnesota 27–Washington 24",
			"score_away": 27,
			"score_home": 24,
			"closer": "hx",
			"su_hit": false
		}
	]
};
var sim_10k_2026_hx2026_6_default = {
	meta: {
		"n_sims": 1e4,
		"seed": 20260913,
		"as_of": "2026-09-28",
		"as_of_tz": "America/Chicago",
		"hx_stamp": "HX 2026.6",
		"hx_source": "/workspace/cfb/week4_od_hx_ship_2026.json",
		"hx_policy": "offline HX 2026.6 from week4_od_hx_ship_2026.json hx_post; matchup = board; do not claim LIVE",
		"c20_policy": "ship loaded: C20 already in hx_post; matchup = board (no second overlay)",
		"c20_teams": [
			{
				"team": "Florida",
				"hx_board": 3.5201,
				"adj_hx": .02,
				"hx_star": 3.52
			},
			{
				"team": "North Texas",
				"hx_board": -2.2121,
				"adj_hx": 0,
				"hx_star": -2.212
			},
			{
				"team": "Oklahoma State",
				"hx_board": -1.1718,
				"adj_hx": .024,
				"hx_star": -1.172
			},
			{
				"team": "Ole Miss",
				"hx_board": 5.4289,
				"adj_hx": -.02,
				"hx_star": 5.429
			},
			{
				"team": "Oregon State",
				"hx_board": -1.0053,
				"adj_hx": .026,
				"hx_star": -1.005
			},
			{
				"team": "South Florida",
				"hx_board": .1284,
				"adj_hx": .002,
				"hx_star": .128
			},
			{
				"team": "Stanford",
				"hx_board": -.735,
				"adj_hx": .001,
				"hx_star": -.735
			},
			{
				"team": "Tulane",
				"hx_board": -1.2293,
				"adj_hx": -.024,
				"hx_star": -1.229
			},
			{
				"team": "UConn",
				"hx_board": -1.8682,
				"adj_hx": -.031,
				"hx_star": -1.868
			},
			{
				"team": "Virginia Tech",
				"hx_board": 1.2153,
				"adj_hx": .002,
				"hx_star": 1.215
			}
		],
		"engine": {
			"elo": "1500+55*HX*",
			"hfa": 60,
			"p": "1/(1+10^(-d/400))",
			"draw": "Bernoulli",
			"spread_curve_A": .050835,
			"spread_curve_B": 45795e-9,
			"spread_note": "Quadratic spread documented only; CFP path is win/loss Bernoulli on P, not ATS"
		},
		"fcs_stub": {
			"rule": "Unrated FCS / non-HASHMARK opponent: fixed P(FBS wins)=0.92 home, 0.88 away, 0.90 neutral. NDSU and Sacramento State are not rated.",
			"remaining_fcs_games": 26,
			"fcs_opponent_names_sample": [
				"Charleston Southern",
				"Chattanooga",
				"Elon",
				"McNeese",
				"Merrimack",
				"North Dakota State",
				"Sacramento State",
				"Samford",
				"Tennessee Tech",
				"Texas Southern",
				"The Citadel",
				"Wofford"
			],
			"n_fcs_opponent_names": 12
		},
		"schedule": {
			"source": "hashmark-repo/data/cfb.db (ESPN 2026 slate; chtow50/hashmark data)",
			"scoreboard_finals": [
				"/workspace/cfb/data/espn_week1_2026_scoreboard.json",
				"/workspace/cfb/data/espn_week2_2026_scoreboard.json",
				"/workspace/cfb/data/espn_week3_2026_scoreboard_finals.json",
				"/workspace/cfb/data/espn_week4_2026_scoreboard_finals.json"
			],
			"week2_grade_dir": "/workspace/cfb/data/week2_grade",
			"locked_weeks": "Week 0–4 STATUS_FINAL (espn_week1 + espn_week2 + espn_week3_finals + espn_week4_finals); scores not invented",
			"n_schedule_games_fbs_involved": 885,
			"n_locked_finals": 328,
			"n_remaining_draws": 557,
			"incomplete_rs_under_12": [
				{
					"team": "Boise State",
					"games_listed": 11
				},
				{
					"team": "Colorado State",
					"games_listed": 11
				},
				{
					"team": "Fresno State",
					"games_listed": 11
				},
				{
					"team": "Oregon State",
					"games_listed": 11
				},
				{
					"team": "San Diego State",
					"games_listed": 11
				},
				{
					"team": "Texas State",
					"games_listed": 11
				},
				{
					"team": "Utah State",
					"games_listed": 11
				},
				{
					"team": "Washington State",
					"games_listed": 11
				}
			],
			"incomplete_note": "Eight teams list 11 games in DB (not 12). Opponents were NOT invented; missing game is untreated (usually a missing FCS stub). Documented only."
		},
		"cfp_2026_assumptions": {
			"field_size": 12,
			"aq": "P4 champions (ACC/Big Ten/Big 12/SEC) auto; highest-ranked G6 team (American/CUSA/MAC/MW/Pac-12/Sun Belt) auto regardless of champ; Notre Dame auto if proxy-ranked top 12",
			"seeding": "Seeds 1-12 by committee proxy among selected; top 4 get first-round byes",
			"first_round": "5v12, 6v11, 7v10, 8v9 at higher seed home (HFA=60)",
			"later_rounds": "QF/SF/NG neutral (HFA=0); bracket no re-seed (1 vs 8/9, 2 vs 7/10, 3 vs 6/11, 4 vs 5/12)",
			"ranking_proxy": "Sort by season wins, then matchup HX*, then fewer losses — not the official committee",
			"ccg": "Synthetic neutral CCG for SEC/B1G/Big12/ACC/American/CUSA/MAC/MW/Sun Belt (top-2 conf record). Pac-12 crown by record/H2H (2 teams). Independents: none.",
			"source": "NCAA.com 2026-08-11 CFP format explainer"
		},
		"runtime_sec": 4.46
	},
	teams: [
		{
			"name": "Notre Dame",
			"slug": "notre-dame",
			"conference": "Independent",
			"hx_board": 7.0216,
			"hx_matchup": 7.022,
			"make_field": 92.24,
			"win_title": 16.84,
			"proj_wins": 10.839,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Texas Tech",
			"slug": "texas-tech",
			"conference": "Big 12",
			"hx_board": 5.8155,
			"hx_matchup": 5.816,
			"make_field": 89.92,
			"win_title": 10.41,
			"proj_wins": 11.295,
			"conf_title": 57.45,
			"schedule_games_listed": 12
		},
		{
			"name": "Georgia",
			"slug": "georgia",
			"conference": "SEC",
			"hx_board": 7.8964,
			"hx_matchup": 7.896,
			"make_field": 84.5,
			"win_title": 23.56,
			"proj_wins": 10.88,
			"conf_title": 55.83,
			"schedule_games_listed": 12
		},
		{
			"name": "Miami",
			"slug": "miami",
			"conference": "ACC",
			"hx_board": 5.2345,
			"hx_matchup": 5.234,
			"make_field": 79.3,
			"win_title": 5.75,
			"proj_wins": 10.527,
			"conf_title": 54.65,
			"schedule_games_listed": 12
		},
		{
			"name": "Ohio State",
			"slug": "ohio-state",
			"conference": "Big Ten",
			"hx_board": 7.8131,
			"hx_matchup": 7.813,
			"make_field": 61.8,
			"win_title": 14.81,
			"proj_wins": 9.645,
			"conf_title": 46.33,
			"schedule_games_listed": 12
		},
		{
			"name": "Utah",
			"slug": "utah",
			"conference": "Big 12",
			"hx_board": 4.2865,
			"hx_matchup": 4.287,
			"make_field": 59.77,
			"win_title": 2.13,
			"proj_wins": 9.977,
			"conf_title": 22.99,
			"schedule_games_listed": 12
		},
		{
			"name": "Oregon",
			"slug": "oregon",
			"conference": "Big Ten",
			"hx_board": 6.9019,
			"hx_matchup": 6.902,
			"make_field": 58.33,
			"win_title": 8.86,
			"proj_wins": 9.616,
			"conf_title": 37.3,
			"schedule_games_listed": 12
		},
		{
			"name": "James Madison",
			"slug": "james-madison",
			"conference": "Sun Belt",
			"hx_board": 1.5026,
			"hx_matchup": 1.503,
			"make_field": 57.92,
			"win_title": .22,
			"proj_wins": 10.254,
			"conf_title": 46.47,
			"schedule_games_listed": 12
		},
		{
			"name": "Texas",
			"slug": "texas",
			"conference": "SEC",
			"hx_board": 6.4516,
			"hx_matchup": 6.452,
			"make_field": 56.98,
			"win_title": 7,
			"proj_wins": 9.797,
			"conf_title": 24.7,
			"schedule_games_listed": 12
		},
		{
			"name": "Toledo",
			"slug": "toledo",
			"conference": "MAC",
			"hx_board": 1.5508,
			"hx_matchup": 1.551,
			"make_field": 48.06,
			"win_title": .23,
			"proj_wins": 9.833,
			"conf_title": 41.83,
			"schedule_games_listed": 12
		},
		{
			"name": "Indiana",
			"slug": "indiana",
			"conference": "Big Ten",
			"hx_board": 4.9465,
			"hx_matchup": 4.947,
			"make_field": 37.32,
			"win_title": 1.69,
			"proj_wins": 9.186,
			"conf_title": 7.6,
			"schedule_games_listed": 12
		},
		{
			"name": "BYU",
			"slug": "byu",
			"conference": "Big 12",
			"hx_board": 4.1233,
			"hx_matchup": 4.123,
			"make_field": 37.3,
			"win_title": 1.12,
			"proj_wins": 9.145,
			"conf_title": 15.32,
			"schedule_games_listed": 12
		},
		{
			"name": "Alabama",
			"slug": "alabama",
			"conference": "SEC",
			"hx_board": 5.2821,
			"hx_matchup": 5.282,
			"make_field": 36.38,
			"win_title": 2.25,
			"proj_wins": 9.115,
			"conf_title": 8.64,
			"schedule_games_listed": 12
		},
		{
			"name": "UTSA",
			"slug": "utsa",
			"conference": "American",
			"hx_board": 1.2941,
			"hx_matchup": 1.294,
			"make_field": 35.44,
			"win_title": .14,
			"proj_wins": 9.432,
			"conf_title": 38.63,
			"schedule_games_listed": 12
		},
		{
			"name": "UNLV",
			"slug": "unlv",
			"conference": "Mountain West",
			"hx_board": 1.7521,
			"hx_matchup": 1.752,
			"make_field": 34.09,
			"win_title": .08,
			"proj_wins": 9.293,
			"conf_title": 53.18,
			"schedule_games_listed": 12
		},
		{
			"name": "SMU",
			"slug": "smu",
			"conference": "ACC",
			"hx_board": 3.9958,
			"hx_matchup": 3.996,
			"make_field": 33.64,
			"win_title": .8,
			"proj_wins": 9.052,
			"conf_title": 19.16,
			"schedule_games_listed": 12
		},
		{
			"name": "Memphis",
			"slug": "memphis",
			"conference": "American",
			"hx_board": 1.1066,
			"hx_matchup": 1.107,
			"make_field": 30.68,
			"win_title": .06,
			"proj_wins": 9.343,
			"conf_title": 32.87,
			"schedule_games_listed": 12
		},
		{
			"name": "Clemson",
			"slug": "clemson",
			"conference": "ACC",
			"hx_board": 3.8338,
			"hx_matchup": 3.834,
			"make_field": 27.31,
			"win_title": .72,
			"proj_wins": 8.778,
			"conf_title": 15.71,
			"schedule_games_listed": 12
		},
		{
			"name": "Iowa",
			"slug": "iowa",
			"conference": "Big Ten",
			"hx_board": 3.7055,
			"hx_matchup": 3.705,
			"make_field": 22.34,
			"win_title": .36,
			"proj_wins": 8.803,
			"conf_title": 3.09,
			"schedule_games_listed": 12
		},
		{
			"name": "South Florida",
			"slug": "usf",
			"conference": "American",
			"hx_board": .1284,
			"hx_matchup": .128,
			"make_field": 20.47,
			"win_title": .01,
			"proj_wins": 9.178,
			"conf_title": 11.46,
			"schedule_games_listed": 12
		},
		{
			"name": "Liberty",
			"slug": "liberty",
			"conference": "CUSA",
			"hx_board": -.5703,
			"hx_matchup": -.57,
			"make_field": 15.03,
			"win_title": .01,
			"proj_wins": 8.754,
			"conf_title": 26.37,
			"schedule_games_listed": 12
		},
		{
			"name": "Penn State",
			"slug": "penn-state",
			"conference": "Big Ten",
			"hx_board": 4.2841,
			"hx_matchup": 4.284,
			"make_field": 14.49,
			"win_title": .42,
			"proj_wins": 8.345,
			"conf_title": 1.55,
			"schedule_games_listed": 12
		},
		{
			"name": "Ole Miss",
			"slug": "ole-miss",
			"conference": "SEC",
			"hx_board": 5.4289,
			"hx_matchup": 5.429,
			"make_field": 13.57,
			"win_title": .81,
			"proj_wins": 8.181,
			"conf_title": 3.82,
			"schedule_games_listed": 12
		},
		{
			"name": "Marshall",
			"slug": "marshall",
			"conference": "Sun Belt",
			"hx_board": .2,
			"hx_matchup": .2,
			"make_field": 12.94,
			"win_title": .02,
			"proj_wins": 8.558,
			"conf_title": 18.65,
			"schedule_games_listed": 12
		},
		{
			"name": "LSU",
			"slug": "lsu",
			"conference": "SEC",
			"hx_board": 4.1243,
			"hx_matchup": 4.124,
			"make_field": 10.8,
			"win_title": .17,
			"proj_wins": 8.048,
			"conf_title": 1.82,
			"schedule_games_listed": 12
		},
		{
			"name": "Florida",
			"slug": "florida",
			"conference": "SEC",
			"hx_board": 3.5201,
			"hx_matchup": 3.52,
			"make_field": 8.3,
			"win_title": .13,
			"proj_wins": 7.935,
			"conf_title": 1.65,
			"schedule_games_listed": 12
		},
		{
			"name": "Michigan",
			"slug": "michigan",
			"conference": "Big Ten",
			"hx_board": 4.9296,
			"hx_matchup": 4.93,
			"make_field": 7.91,
			"win_title": .36,
			"proj_wins": 7.909,
			"conf_title": 1.67,
			"schedule_games_listed": 12
		},
		{
			"name": "Kansas State",
			"slug": "kansas-state",
			"conference": "Big 12",
			"hx_board": 2.4179,
			"hx_matchup": 2.418,
			"make_field": 6.96,
			"win_title": .04,
			"proj_wins": 7.841,
			"conf_title": 1.08,
			"schedule_games_listed": 12
		},
		{
			"name": "Ohio",
			"slug": "ohio",
			"conference": "MAC",
			"hx_board": .2198,
			"hx_matchup": .22,
			"make_field": 6.12,
			"win_title": 0,
			"proj_wins": 8.047,
			"conf_title": 16.64,
			"schedule_games_listed": 12
		},
		{
			"name": "Duke",
			"slug": "duke",
			"conference": "ACC",
			"hx_board": 1.5226,
			"hx_matchup": 1.523,
			"make_field": 5.93,
			"win_title": .02,
			"proj_wins": 7.921,
			"conf_title": 1.05,
			"schedule_games_listed": 12
		},
		{
			"name": "Tennessee",
			"slug": "tennessee",
			"conference": "SEC",
			"hx_board": 4.0751,
			"hx_matchup": 4.075,
			"make_field": 5.78,
			"win_title": .07,
			"proj_wins": 7.63,
			"conf_title": .68,
			"schedule_games_listed": 12
		},
		{
			"name": "Louisville",
			"slug": "louisville",
			"conference": "ACC",
			"hx_board": 2.98,
			"hx_matchup": 2.98,
			"make_field": 5.74,
			"win_title": .05,
			"proj_wins": 7.435,
			"conf_title": 4.04,
			"schedule_games_listed": 12
		},
		{
			"name": "Louisiana",
			"slug": "louisiana",
			"conference": "Sun Belt",
			"hx_board": -1.071,
			"hx_matchup": -1.071,
			"make_field": 5.47,
			"win_title": 0,
			"proj_wins": 7.9,
			"conf_title": 9.57,
			"schedule_games_listed": 12
		},
		{
			"name": "Western Michigan",
			"slug": "western-michigan",
			"conference": "MAC",
			"hx_board": .4289,
			"hx_matchup": .429,
			"make_field": 5.34,
			"win_title": 0,
			"proj_wins": 7.929,
			"conf_title": 25.56,
			"schedule_games_listed": 12
		},
		{
			"name": "USC",
			"slug": "usc",
			"conference": "Big Ten",
			"hx_board": 3.8525,
			"hx_matchup": 3.853,
			"make_field": 5.18,
			"win_title": .14,
			"proj_wins": 7.701,
			"conf_title": .7,
			"schedule_games_listed": 12
		},
		{
			"name": "Boise State",
			"slug": "boise-state",
			"conference": "Mountain West",
			"hx_board": 1.3371,
			"hx_matchup": 1.337,
			"make_field": 4.84,
			"win_title": .03,
			"proj_wins": 7.628,
			"conf_title": 18.84,
			"schedule_games_listed": 11
		},
		{
			"name": "UCLA",
			"slug": "ucla",
			"conference": "Big Ten",
			"hx_board": 1.3963,
			"hx_matchup": 1.396,
			"make_field": 4.8,
			"win_title": .05,
			"proj_wins": 7.972,
			"conf_title": .4,
			"schedule_games_listed": 12
		},
		{
			"name": "Houston",
			"slug": "houston",
			"conference": "Big 12",
			"hx_board": 1.623,
			"hx_matchup": 1.623,
			"make_field": 4.21,
			"win_title": .03,
			"proj_wins": 7.729,
			"conf_title": .47,
			"schedule_games_listed": 12
		},
		{
			"name": "Texas A&M",
			"slug": "texas-am",
			"conference": "SEC",
			"hx_board": 6.0586,
			"hx_matchup": 6.059,
			"make_field": 4.14,
			"win_title": .34,
			"proj_wins": 7.372,
			"conf_title": 1.36,
			"schedule_games_listed": 12
		},
		{
			"name": "Virginia",
			"slug": "virginia",
			"conference": "ACC",
			"hx_board": 1.3953,
			"hx_matchup": 1.395,
			"make_field": 3.73,
			"win_title": 0,
			"proj_wins": 7.463,
			"conf_title": 1.9,
			"schedule_games_listed": 12
		},
		{
			"name": "New Mexico",
			"slug": "new-mexico",
			"conference": "Mountain West",
			"hx_board": -1.978,
			"hx_matchup": -1.978,
			"make_field": 3.72,
			"win_title": 0,
			"proj_wins": 8.067,
			"conf_title": 2.87,
			"schedule_games_listed": 12
		},
		{
			"name": "Arizona",
			"slug": "arizona",
			"conference": "Big 12",
			"hx_board": 2.3424,
			"hx_matchup": 2.342,
			"make_field": 3.47,
			"win_title": .04,
			"proj_wins": 7.454,
			"conf_title": .62,
			"schedule_games_listed": 12
		},
		{
			"name": "Pittsburgh",
			"slug": "pittsburgh",
			"conference": "ACC",
			"hx_board": .8539,
			"hx_matchup": .854,
			"make_field": 3.29,
			"win_title": 0,
			"proj_wins": 7.771,
			"conf_title": .46,
			"schedule_games_listed": 12
		},
		{
			"name": "NC State",
			"slug": "nc-state",
			"conference": "ACC",
			"hx_board": 2.0961,
			"hx_matchup": 2.096,
			"make_field": 2.9,
			"win_title": .01,
			"proj_wins": 7.261,
			"conf_title": 1.72,
			"schedule_games_listed": 12
		},
		{
			"name": "Jacksonville State",
			"slug": "jacksonville-state",
			"conference": "CUSA",
			"hx_board": -.8958,
			"hx_matchup": -.896,
			"make_field": 2.85,
			"win_title": 0,
			"proj_wins": 7.68,
			"conf_title": 20.68,
			"schedule_games_listed": 12
		},
		{
			"name": "Missouri",
			"slug": "missouri",
			"conference": "SEC",
			"hx_board": 4.2572,
			"hx_matchup": 4.257,
			"make_field": 2.69,
			"win_title": .09,
			"proj_wins": 7.142,
			"conf_title": .59,
			"schedule_games_listed": 12
		},
		{
			"name": "Virginia Tech",
			"slug": "virginia-tech",
			"conference": "ACC",
			"hx_board": 1.2153,
			"hx_matchup": 1.215,
			"make_field": 2.63,
			"win_title": .01,
			"proj_wins": 7.562,
			"conf_title": .62,
			"schedule_games_listed": 12
		},
		{
			"name": "Nebraska",
			"slug": "nebraska",
			"conference": "Big Ten",
			"hx_board": 1.9888,
			"hx_matchup": 1.989,
			"make_field": 2.29,
			"win_title": .02,
			"proj_wins": 7.195,
			"conf_title": .24,
			"schedule_games_listed": 12
		},
		{
			"name": "Washington",
			"slug": "washington",
			"conference": "Big Ten",
			"hx_board": 3.244,
			"hx_matchup": 3.244,
			"make_field": 2.06,
			"win_title": .03,
			"proj_wins": 7.114,
			"conf_title": .21,
			"schedule_games_listed": 12
		},
		{
			"name": "East Carolina",
			"slug": "east-carolina",
			"conference": "American",
			"hx_board": -.4692,
			"hx_matchup": -.469,
			"make_field": 1.99,
			"win_title": 0,
			"proj_wins": 7.292,
			"conf_title": 8.85,
			"schedule_games_listed": 12
		},
		{
			"name": "Arizona State",
			"slug": "arizona-state",
			"conference": "Big 12",
			"hx_board": 1.6152,
			"hx_matchup": 1.615,
			"make_field": 1.83,
			"win_title": .01,
			"proj_wins": 6.821,
			"conf_title": 1.01,
			"schedule_games_listed": 12
		},
		{
			"name": "Miami (OH)",
			"slug": "miami-oh",
			"conference": "MAC",
			"hx_board": -.947,
			"hx_matchup": -.947,
			"make_field": 1.79,
			"win_title": 0,
			"proj_wins": 7.538,
			"conf_title": 12.23,
			"schedule_games_listed": 12
		},
		{
			"name": "Wisconsin",
			"slug": "wisconsin",
			"conference": "Big Ten",
			"hx_board": 1.1681,
			"hx_matchup": 1.168,
			"make_field": 1.45,
			"win_title": .01,
			"proj_wins": 7.173,
			"conf_title": .52,
			"schedule_games_listed": 12
		},
		{
			"name": "Oklahoma",
			"slug": "oklahoma",
			"conference": "SEC",
			"hx_board": 4.1888,
			"hx_matchup": 4.189,
			"make_field": 1.06,
			"win_title": .03,
			"proj_wins": 6.365,
			"conf_title": .7,
			"schedule_games_listed": 12
		},
		{
			"name": "Minnesota",
			"slug": "minnesota",
			"conference": "Big Ten",
			"hx_board": 1.881,
			"hx_matchup": 1.881,
			"make_field": .98,
			"win_title": 0,
			"proj_wins": 6.602,
			"conf_title": .27,
			"schedule_games_listed": 12
		},
		{
			"name": "App State",
			"slug": "app-state",
			"conference": "Sun Belt",
			"hx_board": -2.1946,
			"hx_matchup": -2.195,
			"make_field": .84,
			"win_title": 0,
			"proj_wins": 6.827,
			"conf_title": 1.95,
			"schedule_games_listed": 12
		},
		{
			"name": "Tulsa",
			"slug": "tulsa",
			"conference": "American",
			"hx_board": -3.1893,
			"hx_matchup": -3.189,
			"make_field": .79,
			"win_title": 0,
			"proj_wins": 6.961,
			"conf_title": .7,
			"schedule_games_listed": 12
		},
		{
			"name": "Vanderbilt",
			"slug": "vanderbilt",
			"conference": "SEC",
			"hx_board": 2.4377,
			"hx_matchup": 2.438,
			"make_field": .67,
			"win_title": .01,
			"proj_wins": 6.522,
			"conf_title": .1,
			"schedule_games_listed": 12
		},
		{
			"name": "Tulane",
			"slug": "tulane",
			"conference": "American",
			"hx_board": -1.2293,
			"hx_matchup": -1.229,
			"make_field": .64,
			"win_title": 0,
			"proj_wins": 6.552,
			"conf_title": 3.65,
			"schedule_games_listed": 12
		},
		{
			"name": "Fresno State",
			"slug": "fresno-state",
			"conference": "Mountain West",
			"hx_board": .1624,
			"hx_matchup": .162,
			"make_field": .62,
			"win_title": 0,
			"proj_wins": 6.663,
			"conf_title": 11.05,
			"schedule_games_listed": 11
		},
		{
			"name": "Western Kentucky",
			"slug": "western-kentucky",
			"conference": "CUSA",
			"hx_board": .3006,
			"hx_matchup": .301,
			"make_field": .62,
			"win_title": 0,
			"proj_wins": 7.292,
			"conf_title": 43.57,
			"schedule_games_listed": 12
		},
		{
			"name": "TCU",
			"slug": "tcu",
			"conference": "Big 12",
			"hx_board": 2.193,
			"hx_matchup": 2.193,
			"make_field": .5,
			"win_title": 0,
			"proj_wins": 6.017,
			"conf_title": .4,
			"schedule_games_listed": 12
		},
		{
			"name": "Baylor",
			"slug": "baylor",
			"conference": "Big 12",
			"hx_board": .9481,
			"hx_matchup": .948,
			"make_field": .48,
			"win_title": 0,
			"proj_wins": 6.219,
			"conf_title": .27,
			"schedule_games_listed": 12
		},
		{
			"name": "Troy",
			"slug": "troy",
			"conference": "Sun Belt",
			"hx_board": -1.0741,
			"hx_matchup": -1.074,
			"make_field": .4,
			"win_title": 0,
			"proj_wins": 6.39,
			"conf_title": 4.4,
			"schedule_games_listed": 12
		},
		{
			"name": "Arkansas State",
			"slug": "arkansas-state",
			"conference": "Sun Belt",
			"hx_board": -1.4899,
			"hx_matchup": -1.49,
			"make_field": .37,
			"win_title": 0,
			"proj_wins": 6.505,
			"conf_title": 4.45,
			"schedule_games_listed": 12
		},
		{
			"name": "Georgia Tech",
			"slug": "georgia-tech",
			"conference": "ACC",
			"hx_board": 1.6205,
			"hx_matchup": 1.621,
			"make_field": .37,
			"win_title": 0,
			"proj_wins": 4.899,
			"conf_title": .37,
			"schedule_games_listed": 12
		},
		{
			"name": "Florida Atlantic",
			"slug": "florida-atlantic",
			"conference": "American",
			"hx_board": -3.0471,
			"hx_matchup": -3.047,
			"make_field": .35,
			"win_title": 0,
			"proj_wins": 6.685,
			"conf_title": .53,
			"schedule_games_listed": 12
		},
		{
			"name": "Auburn",
			"slug": "auburn",
			"conference": "SEC",
			"hx_board": 2.2183,
			"hx_matchup": 2.218,
			"make_field": .29,
			"win_title": 0,
			"proj_wins": 6.438,
			"conf_title": .06,
			"schedule_games_listed": 12
		},
		{
			"name": "Northwestern",
			"slug": "northwestern",
			"conference": "Big Ten",
			"hx_board": 1.7705,
			"hx_matchup": 1.77,
			"make_field": .28,
			"win_title": 0,
			"proj_wins": 6.374,
			"conf_title": .02,
			"schedule_games_listed": 12
		},
		{
			"name": "California",
			"slug": "california",
			"conference": "ACC",
			"hx_board": .5683,
			"hx_matchup": .568,
			"make_field": .25,
			"win_title": 0,
			"proj_wins": 5.613,
			"conf_title": .24,
			"schedule_games_listed": 12
		},
		{
			"name": "Mississippi State",
			"slug": "mississippi-state",
			"conference": "SEC",
			"hx_board": .2071,
			"hx_matchup": .207,
			"make_field": .24,
			"win_title": 0,
			"proj_wins": 6.635,
			"conf_title": .03,
			"schedule_games_listed": 12
		},
		{
			"name": "North Texas",
			"slug": "north-texas",
			"conference": "American",
			"hx_board": -2.2121,
			"hx_matchup": -2.212,
			"make_field": .24,
			"win_title": 0,
			"proj_wins": 6.412,
			"conf_title": 1.79,
			"schedule_games_listed": 12
		},
		{
			"name": "Illinois",
			"slug": "illinois",
			"conference": "Big Ten",
			"hx_board": 1.635,
			"hx_matchup": 1.635,
			"make_field": .22,
			"win_title": 0,
			"proj_wins": 6.082,
			"conf_title": .1,
			"schedule_games_listed": 12
		},
		{
			"name": "Wake Forest",
			"slug": "wake-forest",
			"conference": "ACC",
			"hx_board": -.2238,
			"hx_matchup": -.224,
			"make_field": .18,
			"win_title": 0,
			"proj_wins": 6.505,
			"conf_title": .02,
			"schedule_games_listed": 12
		},
		{
			"name": "Iowa State",
			"slug": "iowa-state",
			"conference": "Big 12",
			"hx_board": .8283,
			"hx_matchup": .828,
			"make_field": .15,
			"win_title": 0,
			"proj_wins": 6.082,
			"conf_title": .13,
			"schedule_games_listed": 12
		},
		{
			"name": "Delaware",
			"slug": "delaware",
			"conference": "CUSA",
			"hx_board": -2.6056,
			"hx_matchup": -2.606,
			"make_field": .13,
			"win_title": 0,
			"proj_wins": 6.019,
			"conf_title": 3.27,
			"schedule_games_listed": 12
		},
		{
			"name": "San José State",
			"slug": "san-jose-state",
			"conference": "Mountain West",
			"hx_board": -4.248,
			"hx_matchup": -4.248,
			"make_field": .13,
			"win_title": 0,
			"proj_wins": 6.501,
			"conf_title": .08,
			"schedule_games_listed": 13
		},
		{
			"name": "UAB",
			"slug": "uab",
			"conference": "American",
			"hx_board": -2.0398,
			"hx_matchup": -2.04,
			"make_field": .13,
			"win_title": 0,
			"proj_wins": 5.976,
			"conf_title": 1.23,
			"schedule_games_listed": 12
		},
		{
			"name": "UCF",
			"slug": "ucf",
			"conference": "Big 12",
			"hx_board": -.7242,
			"hx_matchup": -.724,
			"make_field": .13,
			"win_title": 0,
			"proj_wins": 5.923,
			"conf_title": .09,
			"schedule_games_listed": 12
		},
		{
			"name": "Kansas",
			"slug": "kansas",
			"conference": "Big 12",
			"hx_board": .7891,
			"hx_matchup": .789,
			"make_field": .11,
			"win_title": 0,
			"proj_wins": 5.431,
			"conf_title": .1,
			"schedule_games_listed": 12
		},
		{
			"name": "Cincinnati",
			"slug": "cincinnati",
			"conference": "Big 12",
			"hx_board": -.9917,
			"hx_matchup": -.992,
			"make_field": .1,
			"win_title": 0,
			"proj_wins": 6.163,
			"conf_title": .03,
			"schedule_games_listed": 12
		},
		{
			"name": "Florida International",
			"slug": "fiu",
			"conference": "CUSA",
			"hx_board": -2.9997,
			"hx_matchup": -3,
			"make_field": .1,
			"win_title": 0,
			"proj_wins": 6.087,
			"conf_title": 2.38,
			"schedule_games_listed": 12
		},
		{
			"name": "Wyoming",
			"slug": "wyoming",
			"conference": "Mountain West",
			"hx_board": -3.7866,
			"hx_matchup": -3.787,
			"make_field": .08,
			"win_title": 0,
			"proj_wins": 6.332,
			"conf_title": .38,
			"schedule_games_listed": 12
		},
		{
			"name": "Central Michigan",
			"slug": "central-michigan",
			"conference": "MAC",
			"hx_board": -3.3366,
			"hx_matchup": -3.337,
			"make_field": .07,
			"win_title": 0,
			"proj_wins": 5.87,
			"conf_title": .46,
			"schedule_games_listed": 12
		},
		{
			"name": "Southern Miss",
			"slug": "southern-miss",
			"conference": "Sun Belt",
			"hx_board": -.6841,
			"hx_matchup": -.684,
			"make_field": .07,
			"win_title": 0,
			"proj_wins": 5.66,
			"conf_title": 9.53,
			"schedule_games_listed": 12
		},
		{
			"name": "UConn",
			"slug": "uconn",
			"conference": "Independent",
			"hx_board": -1.8682,
			"hx_matchup": -1.868,
			"make_field": .07,
			"win_title": 0,
			"proj_wins": 6.723,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Florida State",
			"slug": "florida-state",
			"conference": "ACC",
			"hx_board": .3063,
			"hx_matchup": .306,
			"make_field": .05,
			"win_title": 0,
			"proj_wins": 4.936,
			"conf_title": .05,
			"schedule_games_listed": 12
		},
		{
			"name": "South Carolina",
			"slug": "south-carolina",
			"conference": "SEC",
			"hx_board": 2.8844,
			"hx_matchup": 2.884,
			"make_field": .03,
			"win_title": .01,
			"proj_wins": 5.435,
			"conf_title": .01,
			"schedule_games_listed": 12
		},
		{
			"name": "Buffalo",
			"slug": "buffalo",
			"conference": "MAC",
			"hx_board": -3.3776,
			"hx_matchup": -3.378,
			"make_field": .03,
			"win_title": 0,
			"proj_wins": 5.817,
			"conf_title": .94,
			"schedule_games_listed": 12
		},
		{
			"name": "Kentucky",
			"slug": "kentucky",
			"conference": "SEC",
			"hx_board": .3218,
			"hx_matchup": .322,
			"make_field": .03,
			"win_title": 0,
			"proj_wins": 5.181,
			"conf_title": .01,
			"schedule_games_listed": 12
		},
		{
			"name": "Oklahoma State",
			"slug": "oklahoma-state",
			"conference": "Big 12",
			"hx_board": -1.1718,
			"hx_matchup": -1.172,
			"make_field": .03,
			"win_title": 0,
			"proj_wins": 5.535,
			"conf_title": .02,
			"schedule_games_listed": 12
		},
		{
			"name": "Old Dominion",
			"slug": "old-dominion",
			"conference": "Sun Belt",
			"hx_board": -1.3494,
			"hx_matchup": -1.349,
			"make_field": .03,
			"win_title": 0,
			"proj_wins": 5.153,
			"conf_title": 1.53,
			"schedule_games_listed": 12
		},
		{
			"name": "Akron",
			"slug": "akron",
			"conference": "MAC",
			"hx_board": -3.5373,
			"hx_matchup": -3.537,
			"make_field": .01,
			"win_title": 0,
			"proj_wins": 4.724,
			"conf_title": .95,
			"schedule_games_listed": 12
		},
		{
			"name": "Army",
			"slug": "army",
			"conference": "American",
			"hx_board": -4.3575,
			"hx_matchup": -4.357,
			"make_field": .01,
			"win_title": 0,
			"proj_wins": 5.465,
			"conf_title": .02,
			"schedule_games_listed": 12
		},
		{
			"name": "Coastal Carolina",
			"slug": "coastal-carolina",
			"conference": "Sun Belt",
			"hx_board": -2.0183,
			"hx_matchup": -2.018,
			"make_field": .01,
			"win_title": 0,
			"proj_wins": 4.656,
			"conf_title": 1.48,
			"schedule_games_listed": 12
		},
		{
			"name": "Colorado",
			"slug": "colorado",
			"conference": "Big 12",
			"hx_board": -.3509,
			"hx_matchup": -.351,
			"make_field": .01,
			"win_title": 0,
			"proj_wins": 5.041,
			"conf_title": .01,
			"schedule_games_listed": 12
		},
		{
			"name": "Eastern Michigan",
			"slug": "eastern-michigan",
			"conference": "MAC",
			"hx_board": -2.7072,
			"hx_matchup": -2.707,
			"make_field": .01,
			"win_title": 0,
			"proj_wins": 5.378,
			"conf_title": 1.11,
			"schedule_games_listed": 12
		},
		{
			"name": "Georgia Southern",
			"slug": "georgia-southern",
			"conference": "Sun Belt",
			"hx_board": -1.8811,
			"hx_matchup": -1.881,
			"make_field": .01,
			"win_title": 0,
			"proj_wins": 4.718,
			"conf_title": 1.31,
			"schedule_games_listed": 12
		},
		{
			"name": "Georgia State",
			"slug": "georgia-state",
			"conference": "Sun Belt",
			"hx_board": -4.3349,
			"hx_matchup": -4.335,
			"make_field": .01,
			"win_title": 0,
			"proj_wins": 5.22,
			"conf_title": .06,
			"schedule_games_listed": 12
		},
		{
			"name": "Missouri State",
			"slug": "missouri-state",
			"conference": "CUSA",
			"hx_board": -2.6763,
			"hx_matchup": -2.676,
			"make_field": .01,
			"win_title": 0,
			"proj_wins": 4.856,
			"conf_title": 2.38,
			"schedule_games_listed": 12
		},
		{
			"name": "North Carolina",
			"slug": "north-carolina",
			"conference": "ACC",
			"hx_board": -1.049,
			"hx_matchup": -1.049,
			"make_field": .01,
			"win_title": 0,
			"proj_wins": 4.745,
			"conf_title": .01,
			"schedule_games_listed": 12
		},
		{
			"name": "Sam Houston",
			"slug": "sam-houston",
			"conference": "CUSA",
			"hx_board": -4.1885,
			"hx_matchup": -4.189,
			"make_field": .01,
			"win_title": 0,
			"proj_wins": 4.111,
			"conf_title": .44,
			"schedule_games_listed": 12
		},
		{
			"name": "West Virginia",
			"slug": "west-virginia",
			"conference": "Big 12",
			"hx_board": -1.1483,
			"hx_matchup": -1.148,
			"make_field": .01,
			"win_title": 0,
			"proj_wins": 5.348,
			"conf_title": .01,
			"schedule_games_listed": 12
		},
		{
			"name": "Air Force",
			"slug": "air-force",
			"conference": "Mountain West",
			"hx_board": -6.5054,
			"hx_matchup": -6.505,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 4.668,
			"conf_title": .11,
			"schedule_games_listed": 12
		},
		{
			"name": "Arkansas",
			"slug": "arkansas",
			"conference": "SEC",
			"hx_board": .5818,
			"hx_matchup": .582,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 4.122,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Ball State",
			"slug": "ball-state",
			"conference": "MAC",
			"hx_board": -5.4016,
			"hx_matchup": -5.402,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 4.106,
			"conf_title": .01,
			"schedule_games_listed": 12
		},
		{
			"name": "Boston College",
			"slug": "boston-college",
			"conference": "ACC",
			"hx_board": -2.3251,
			"hx_matchup": -2.325,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.766,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Bowling Green",
			"slug": "bowling-green",
			"conference": "MAC",
			"hx_board": -4.3579,
			"hx_matchup": -4.358,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.896,
			"conf_title": .24,
			"schedule_games_listed": 12
		},
		{
			"name": "Charlotte",
			"slug": "charlotte",
			"conference": "American",
			"hx_board": -5.7414,
			"hx_matchup": -5.741,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 1.983,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Colorado State",
			"slug": "colorado-state",
			"conference": "Mountain West",
			"hx_board": -3.3468,
			"hx_matchup": -3.347,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.677,
			"conf_title": .61,
			"schedule_games_listed": 11
		},
		{
			"name": "Hawai'i",
			"slug": "hawaii",
			"conference": "Mountain West",
			"hx_board": -.9941,
			"hx_matchup": -.994,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 6.732,
			"conf_title": .01,
			"schedule_games_listed": 12
		},
		{
			"name": "Kennesaw State",
			"slug": "kennesaw-state",
			"conference": "CUSA",
			"hx_board": -3.9858,
			"hx_matchup": -3.986,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 4.059,
			"conf_title": .59,
			"schedule_games_listed": 12
		},
		{
			"name": "Kent State",
			"slug": "kent-state",
			"conference": "MAC",
			"hx_board": -5.8821,
			"hx_matchup": -5.882,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 4.386,
			"conf_title": .03,
			"schedule_games_listed": 12
		},
		{
			"name": "Louisiana Tech",
			"slug": "louisiana-tech",
			"conference": "CUSA",
			"hx_board": -2.0772,
			"hx_matchup": -2.077,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 5.656,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Maryland",
			"slug": "maryland",
			"conference": "Big Ten",
			"hx_board": -.3184,
			"hx_matchup": -.318,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 4.682,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Massachusetts",
			"slug": "massachusetts",
			"conference": "MAC",
			"hx_board": -8.9075,
			"hx_matchup": -8.908,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 5.12,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Michigan State",
			"slug": "michigan-state",
			"conference": "Big Ten",
			"hx_board": -1.9017,
			"hx_matchup": -1.902,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.681,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Middle Tennessee",
			"slug": "middle-tennessee",
			"conference": "CUSA",
			"hx_board": -4.7635,
			"hx_matchup": -4.763,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 4.667,
			"conf_title": .09,
			"schedule_games_listed": 12
		},
		{
			"name": "Navy",
			"slug": "navy",
			"conference": "American",
			"hx_board": -5.1109,
			"hx_matchup": -5.111,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.941,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Nevada",
			"slug": "nevada",
			"conference": "Mountain West",
			"hx_board": -5.361,
			"hx_matchup": -5.361,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.933,
			"conf_title": .01,
			"schedule_games_listed": 12
		},
		{
			"name": "New Mexico State",
			"slug": "new-mexico-state",
			"conference": "CUSA",
			"hx_board": -4.7,
			"hx_matchup": -4.7,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.584,
			"conf_title": .23,
			"schedule_games_listed": 12
		},
		{
			"name": "Northern Illinois",
			"slug": "northern-illinois",
			"conference": "MAC",
			"hx_board": -4.8215,
			"hx_matchup": -4.822,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.931,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Oregon State",
			"slug": "oregon-state",
			"conference": "Pac-12",
			"hx_board": -1.0053,
			"hx_matchup": -1.005,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 5.074,
			"conf_title": 51.41,
			"schedule_games_listed": 11
		},
		{
			"name": "Purdue",
			"slug": "purdue",
			"conference": "Big Ten",
			"hx_board": -1.5021,
			"hx_matchup": -1.502,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 2.968,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Rice",
			"slug": "rice",
			"conference": "American",
			"hx_board": -3.6274,
			"hx_matchup": -3.627,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 4.088,
			"conf_title": .22,
			"schedule_games_listed": 12
		},
		{
			"name": "Rutgers",
			"slug": "rutgers",
			"conference": "Big Ten",
			"hx_board": -.0691,
			"hx_matchup": -.069,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.804,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "San Diego State",
			"slug": "san-diego-state",
			"conference": "Mountain West",
			"hx_board": .7669,
			"hx_matchup": .767,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 5.25,
			"conf_title": 10.12,
			"schedule_games_listed": 11
		},
		{
			"name": "South Alabama",
			"slug": "south-alabama",
			"conference": "Sun Belt",
			"hx_board": -2.8152,
			"hx_matchup": -2.815,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 5.355,
			"conf_title": .57,
			"schedule_games_listed": 12
		},
		{
			"name": "Stanford",
			"slug": "stanford",
			"conference": "ACC",
			"hx_board": -.735,
			"hx_matchup": -.735,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 4.744,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Syracuse",
			"slug": "syracuse",
			"conference": "ACC",
			"hx_board": -1.3236,
			"hx_matchup": -1.324,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.522,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Temple",
			"slug": "temple",
			"conference": "American",
			"hx_board": -3.2989,
			"hx_matchup": -3.299,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 4.436,
			"conf_title": .05,
			"schedule_games_listed": 12
		},
		{
			"name": "Texas State",
			"slug": "texas-state",
			"conference": "Sun Belt",
			"hx_board": .7657,
			"hx_matchup": .766,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 6.096,
			"conf_title": 0,
			"schedule_games_listed": 11
		},
		{
			"name": "UL Monroe",
			"slug": "ul-monroe",
			"conference": "Sun Belt",
			"hx_board": -4.9445,
			"hx_matchup": -4.944,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 2.02,
			"conf_title": .03,
			"schedule_games_listed": 12
		},
		{
			"name": "UTEP",
			"slug": "utep",
			"conference": "CUSA",
			"hx_board": -5.5567,
			"hx_matchup": -5.557,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 4.652,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Utah State",
			"slug": "utah-state",
			"conference": "Mountain West",
			"hx_board": -.6456,
			"hx_matchup": -.646,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 4.136,
			"conf_title": 2.74,
			"schedule_games_listed": 11
		},
		{
			"name": "Washington State",
			"slug": "washington-state",
			"conference": "Pac-12",
			"hx_board": .7708,
			"hx_matchup": .771,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 4.911,
			"conf_title": 48.59,
			"schedule_games_listed": 11
		}
	]
};
var week4_ap_top25_2026_default = {
	product: "AP Top 25 stamp pack",
	poll: "AP",
	season: 2026,
	poll_week: 4,
	as_of: "2026-09-20",
	as_of_label: "Week 4 AP · Sept. 20",
	source: "https://www.ncaa.com/news/football/article/2026-09-20/ole-miss-enters-top-five-latest-ap-top-25-college-football-rankings",
	source_secondary: "Website peer CLEAR 2026-09-25 vs NCAA Week 4 ballot",
	chrome: {
		"replace": "Week 3 AP (Sept. 13) / AP_STAMP week:3",
		"set": {
			"week": 4,
			"asOf": "Sept. 20",
			"label": "Week 4 AP",
			"columnHint": "W4 stamp",
			"lede": "HX is Week 4. AP is the last stamped poll (Week 4, Sept. 20) — not a Week 3 ballot."
		}
	},
	scope: "AP ranks + chrome only — no HX retune",
	teams: [
		{
			"rank": 1,
			"school": "Texas",
			"slug": "texas",
			"record": "3-0",
			"previous_rank": 1,
			"first_place_votes": 58,
			"points": 1706
		},
		{
			"rank": 2,
			"school": "Georgia",
			"slug": "georgia",
			"record": "3-0",
			"previous_rank": 2,
			"first_place_votes": 3,
			"points": 1580
		},
		{
			"rank": 3,
			"school": "Notre Dame",
			"slug": "notre-dame",
			"record": "3-0",
			"previous_rank": 3,
			"first_place_votes": 0,
			"points": 1517
		},
		{
			"rank": 4,
			"school": "Ole Miss",
			"slug": "ole-miss",
			"record": "3-0",
			"previous_rank": 8,
			"first_place_votes": 3,
			"points": 1488
		},
		{
			"rank": 5,
			"school": "Indiana",
			"slug": "indiana",
			"record": "3-0",
			"previous_rank": 4,
			"first_place_votes": 4,
			"points": 1467
		},
		{
			"rank": 6,
			"school": "Miami (FL)",
			"slug": "miami",
			"record": "3-0",
			"previous_rank": 5,
			"first_place_votes": 1,
			"points": 1445
		},
		{
			"rank": 7,
			"school": "Ohio State",
			"slug": "ohio-state",
			"record": "2-1",
			"previous_rank": 6,
			"first_place_votes": 0,
			"points": 1415
		},
		{
			"rank": 8,
			"school": "Alabama",
			"slug": "alabama",
			"record": "3-0",
			"previous_rank": 10,
			"first_place_votes": 0,
			"points": 1182
		},
		{
			"rank": 9,
			"school": "BYU",
			"slug": "byu",
			"record": "3-0",
			"previous_rank": 11,
			"first_place_votes": 0,
			"points": 1090
		},
		{
			"rank": 10,
			"school": "LSU",
			"slug": "lsu",
			"record": "2-1",
			"previous_rank": 7,
			"first_place_votes": 0,
			"points": 1078
		},
		{
			"rank": 11,
			"school": "Texas Tech",
			"slug": "texas-tech",
			"record": "3-0",
			"previous_rank": 13,
			"first_place_votes": 0,
			"points": 1067
		},
		{
			"rank": 12,
			"school": "Southern Cal",
			"slug": "usc",
			"record": "4-0",
			"previous_rank": 12,
			"first_place_votes": 0,
			"points": 907
		},
		{
			"rank": 13,
			"school": "Penn State",
			"slug": "penn-state",
			"record": "3-0",
			"previous_rank": 14,
			"first_place_votes": 0,
			"points": 850
		},
		{
			"rank": 14,
			"school": "Tennessee",
			"slug": "tennessee",
			"record": "3-0",
			"previous_rank": 15,
			"first_place_votes": 0,
			"points": 826
		},
		{
			"rank": 15,
			"school": "Utah",
			"slug": "utah",
			"record": "3-0",
			"previous_rank": 17,
			"first_place_votes": 0,
			"points": 752
		},
		{
			"rank": 16,
			"school": "Louisville",
			"slug": "louisville",
			"record": "2-1",
			"previous_rank": 23,
			"first_place_votes": 0,
			"points": 692
		},
		{
			"rank": 17,
			"school": "Iowa",
			"slug": "iowa",
			"record": "3-0",
			"previous_rank": 18,
			"first_place_votes": 0,
			"points": 561
		},
		{
			"rank": 18,
			"school": "Michigan",
			"slug": "michigan",
			"record": "3-0",
			"previous_rank": 19,
			"first_place_votes": 0,
			"points": 432
		},
		{
			"rank": 19,
			"school": "Missouri",
			"slug": "missouri",
			"record": "3-0",
			"previous_rank": 20,
			"first_place_votes": 0,
			"points": 369
		},
		{
			"rank": 20,
			"school": "Oregon",
			"slug": "oregon",
			"record": "2-1",
			"previous_rank": 21,
			"first_place_votes": 0,
			"points": 364
		},
		{
			"rank": 21,
			"school": "Florida",
			"slug": "florida",
			"record": "3-0",
			"previous_rank": null,
			"first_place_votes": 0,
			"points": 269
		},
		{
			"rank": 22,
			"school": "SMU",
			"slug": "smu",
			"record": "2-1",
			"previous_rank": 16,
			"first_place_votes": 0,
			"points": 212
		},
		{
			"rank": 23,
			"school": "Texas A&M",
			"slug": "texas-am",
			"record": "2-1",
			"previous_rank": 9,
			"first_place_votes": 0,
			"points": 202
		},
		{
			"rank": 24,
			"school": "Mississippi State",
			"slug": "mississippi-state",
			"record": "3-0",
			"previous_rank": null,
			"first_place_votes": 0,
			"points": 179
		},
		{
			"rank": 25,
			"school": "Houston",
			"slug": "houston",
			"record": "2-1",
			"previous_rank": 22,
			"first_place_votes": 0,
			"points": 127
		}
	]
};
/**
* Truth-pack loaders. Numbers come from the AMD / Research JSON payloads —
* do not invent deltas, tape rates, or make/title splits.
*
*   data/week4_hx_vs_ap_gaps_2026.json
*   data/week1_accountability_pack_2026.json
*   data/week2_tape_2026.json
*   data/week2_tape_top25_closer_2026.json
*   data/week3_tape_2026.json
*   data/week3_tape_top25_closer_2026.json
*   data/week4_tape_2026.json
*   data/week4_tape_top25_closer_2026.json
*   data/sim_10k_2026_hx2026_6.json
*/
/** Research desk flags on the Week 4 ballot. Mississippi State (−42) leads the |delta| sort after these. */
var DISAGREE_HIGHLIGHT_NAMES = [
	"Texas A&M",
	"Oregon",
	"Houston",
	"LSU",
	"USC",
	"BYU"
];
var hxApGaps = week4_hx_vs_ap_gaps_2026_default;
var week4TapePack = week4_tape_2026_default;
var week4Top25Pack = week4_tape_top25_closer_2026_default;
var sim10k = sim_10k_2026_hx2026_6_default;
var AP_SLUG_BY_NAME = new Map(week4_ap_top25_2026_default.teams.flatMap((t) => {
	const names = [t.school];
	if (t.slug === "usc") names.push("USC");
	if (t.slug === "miami") names.push("Miami");
	if (t.slug === "ole-miss") names.push("Ole Miss");
	return names.map((n) => [n, t.slug]);
}));
/** HX 2026.6 10k draws — AMD re-sim (seed 20260913). Stamp from meta.hx_stamp when present. */
var SIM_10K_AS_OF = sim10k.meta.as_of;
var SIM_10K_HX_STAMP = sim10k.meta.hx_stamp ?? "HX 2026.6";
var SIM_10K_NOTE = `${SIM_10K_HX_STAMP} · 10k draws · as_of ${SIM_10K_AS_OF}`;
var HIGHLIGHT = new Set(DISAGREE_HIGHLIGHT_NAMES);
function isOdTerm(term) {
	return /^O\/D\b/.test(term);
}
/** Display term for movers — pack stores "O/D EPA"; chrome is O/D. */
function odTermLabel(term) {
	return isOdTerm(term) ? "O/D" : term;
}
function refForName(name, teams) {
	return teams.find((t) => t.name === name || t.shortName === name);
}
/** Board card rows: highlighted five first (JSON order), then remaining by |delta|. */
function boardDisagreementRows(teams) {
	const rows = hxApGaps.gaps.map((g) => {
		const ref = refForName(g.name, teams);
		return {
			...g,
			slug: ref?.slug ?? AP_SLUG_BY_NAME.get(g.name) ?? slugGuess(g.name),
			shortName: ref?.shortName ?? g.name,
			colorPrimary: ref?.colorPrimary ?? "#8c8c86",
			highlight: HIGHLIGHT.has(g.name)
		};
	});
	const flagged = DISAGREE_HIGHLIGHT_NAMES.map((name) => rows.find((r) => r.name === name)).filter((r) => r != null);
	const rest = rows.filter((r) => !r.highlight).sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
	return [...flagged, ...rest];
}
function slugGuess(name) {
	return name.normalize("NFKD").replace(/[’']/g, "").replace(/&/g, "and").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function asciiLineToDisplay(line) {
	return line.replace(/ -/g, " −").replace(/^-/g, "−");
}
function pctFromLabeled(raw) {
	return Number.parseFloat(raw.replace("%", ""));
}
function flagId(matchup, result) {
	return `${matchup.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-winner-flip-${result.toLowerCase()}`;
}
/** Research Week 4 tape mapped onto the board chrome shape. Headline numbers only from the pack. */
function week4Tape() {
	const m = week4TapePack.meta;
	return {
		n: m.n_games,
		su: m.su,
		su_pct: m.su_pct,
		hx_closer: m.hx_closer,
		hx_closer_pct: m.hx_closer_pct,
		closer_flag: m.headline_flags.closer_below_45,
		closer_flag_rule: "<45%",
		vegas_closer: m.vegas_closer,
		hx_ats: m.ats_hx,
		hx_ats_pct: m.ats_hx_pct,
		mae_hx: m.mae_hx,
		mae_vegas: m.mae_vegas,
		brier: m.brier,
		source: "Research week4_tape_2026 · FBS–FBS n=57 · ESPN FINALs"
	};
}
function week4SeasonTape() {
	const m = week4TapePack.meta;
	return {
		label: "W1–W4",
		weeks: [
			1,
			2,
			3,
			4
		],
		su: m.season_w1_w4_su_frac,
		su_pct: pctFromLabeled(m.season_w1_w4_su),
		hx_closer: m.season_w1_w4_closer_frac,
		hx_closer_pct: pctFromLabeled(m.season_w1_w4_closer),
		note: "Week 1–4 rollup from Research week4_tape_2026"
	};
}
function week4BoardFlags() {
	const byEspn = new Map(week4TapePack.games.map((g) => [g.espn_event_id, g]));
	return [...week4TapePack.winner_flip_hits.map((row) => ({
		result: "HIT",
		row
	})), ...week4TapePack.winner_flip_misses.map((row) => ({
		result: "MISS",
		row
	}))].map(({ result, row }) => {
		const game = byEspn.get(row.espn_event_id);
		return {
			id: flagId(row.matchup, result),
			label: `${row.matchup} winner-flip`,
			result,
			matchup: row.matchup,
			espn_event_id: row.espn_event_id,
			hx: asciiLineToDisplay(row.hx),
			vegas: asciiLineToDisplay(row.vegas),
			final: row.final,
			away_score: game?.score_away ?? 0,
			home_score: game?.score_home ?? 0
		};
	});
}
function week4Top25Tape() {
	const m = week4Top25Pack.meta;
	const vegasN = week4Top25Pack.games.filter((g) => g.closer === "vegas").length;
	return {
		n: m.n_games,
		su: m.su,
		su_pct: m.su_pct,
		hx_closer: m.hx_closer,
		hx_closer_pct: m.hx_closer_pct,
		vegas_closer: `${vegasN}/${m.n_games}`,
		source: "week4_tape_top25_closer_2026 · HX Top 25 involvement n=18 · HX 2026.5 ranks · ESPN FINALs"
	};
}
function simTeamBySlug(slug) {
	return sim10k.teams.find((t) => t.slug === slug);
}
function toScheduleRow(teamSlug, g) {
	const homeIs = g.homeSlug === teamSlug;
	const oppSlug = homeIs ? g.awaySlug : g.homeSlug;
	const oppName = homeIs ? g.awayName : g.homeName;
	const oppColor = homeIs ? g.awayColor : g.homeColor;
	return {
		key: `fbs-${g.id}`,
		week: g.week,
		kickoffDate: g.kickoffDate,
		opponentLabel: oppName,
		opponentSlug: oppSlug,
		opponentColor: oppColor,
		home: homeIs,
		neutral: g.neutral,
		location: g.location,
		status: g.status,
		homeScore: g.homeScore,
		awayScore: g.awayScore,
		isFcs: false,
		game: g
	};
}
/** Map preseason playoff_odds (logistic make-field curve) until AMD draws land. */
function make12FromTeam(team) {
	const hasLegacy = Number.isFinite(team.playoffOdds);
	return {
		makeField: hasLegacy ? team.playoffOdds : null,
		winTitle: null,
		makeFieldSource: hasLegacy ? "legacy-playoff-odds" : "pending",
		winTitleSource: "pending"
	};
}
/**
* Make-field and win-title from HX 2026.6 10k draws (sim_10k_2026_hx2026_6.json).
* Falls back to the legacy logistic make-field if the slug is missing.
* Never treat make_field as a national title.
*/
function make12FromSim(slug, team) {
	const row = simTeamBySlug(slug);
	if (row) return {
		makeField: row.make_field,
		winTitle: row.win_title,
		makeFieldSource: "amd-draws",
		winTitleSource: "amd-draws"
	};
	return team ? make12FromTeam(team) : {
		makeField: null,
		winTitle: null,
		makeFieldSource: "pending",
		winTitleSource: "pending"
	};
}
function toFcsStubRow(stub, i) {
	return {
		key: `fcs-${stub.teamSlug}-${stub.kickoffDate}-${i}`,
		week: stub.week,
		kickoffDate: stub.kickoffDate,
		opponentLabel: stub.opponentLabel,
		opponentSlug: null,
		opponentColor: null,
		home: stub.home,
		neutral: false,
		location: null,
		status: stub.status,
		homeScore: stub.homeScore,
		awayScore: stub.awayScore,
		isFcs: true,
		game: null,
		kickoffAt: stub.kickoffAt ?? null,
		tv: stub.tv ?? null,
		vegasSpread: stub.vegasSpread ?? null,
		homeShort: stub.homeShort ?? null,
		awayShort: stub.awayShort ?? null,
		hxSpreadPolicy: stub.hxSpreadPolicy,
		live: stub.live
	};
}
function buildRemainingSchedule(teamSlug, games) {
	const fbsRows = games.filter((g) => g.status !== "final").map((g) => toScheduleRow(teamSlug, g));
	const fcsRows = fcsStubsForTeam(teamSlug).filter((stub) => !fcsStubIsFinal(stub)).map((stub, i) => toFcsStubRow(stub, i));
	return [...fbsRows, ...fcsRows].sort((a, b) => {
		if (a.kickoffDate !== b.kickoffDate) return a.kickoffDate < b.kickoffDate ? -1 : 1;
		if (a.week !== b.week) return a.week - b.week;
		return a.opponentLabel.localeCompare(b.opponentLabel);
	});
}
/** Full FBS season slate for a team hub — played and unplayed. */
function buildSeasonSchedule(teamSlug, games) {
	return games.map((g) => toScheduleRow(teamSlug, g));
}
function make12FieldLabel(source) {
	if (source === "legacy-playoff-odds") return "Pre-AMD logistic estimate";
	if (source === "pending") return "Awaiting AMD draws";
	return `${SIM_10K_NOTE} · make-field, not title`;
}
function make12TitleLabel(source) {
	if (source === "pending") return "Awaiting AMD draws";
	return SIM_10K_NOTE;
}
function make12PanelLede(source) {
	if (source === "amd-draws") return `Make-field is not a national title. ${SIM_10K_NOTE}.`;
	if (source === "legacy-playoff-odds") return "12-team CFP field odds — make-field and national-title paths are separate draws.";
	return "12-team CFP field odds — make-field and national-title paths are separate draws.";
}
var SCENARIO_SIM_CONTRACT_VERSION = "2026.09.14";
var SCENARIO_SIM_PRODUCT = "hx_edge_scenario_sim";
var SCENARIO_SIM_SEED = 20260913;
var SCENARIO_SIM_GOLDEN_TEAMS = [
	"georgia",
	"oklahoma",
	"oregon",
	"ohio-state",
	"michigan"
];
var SCENARIO_SIM_CONFIDENCE_NOTE = "Monte Carlo ± noise on 10k draws; not a lock. Calibration: cite live Top 25 closer vs full-slate tape when packaging.";
var SCENARIO_SIM_DEMO_LABEL = "demo fixture — CLI not wired";
/** Website-cleared AMD golden: Oklahoma @ Georgia W4 + Oregon HX bump. */
var SCENARIO_SIM_GOLDEN_EVENT_ID = "401856700";
var SCENARIO_SIM_GOLDEN_FORCE = {
	type: "force_winner",
	espn_event_id: SCENARIO_SIM_GOLDEN_EVENT_ID,
	week: 4,
	home_slug: "georgia",
	away_slug: "oklahoma",
	winner_slug: "oklahoma",
	note: "golden smoke — force Oklahoma @ Georgia week 4 (remaining non-FINAL)"
};
var SCENARIO_SIM_GOLDEN_BUMP = {
	type: "hx_bump",
	team_slug: "oregon",
	delta_hx: -.25,
	note: "user scenario — not a live board rewrite"
};
function isRecord(value) {
	return typeof value === "object" && value != null && !Array.isArray(value);
}
function normalizeTeamSlug(raw) {
	return (raw ?? "").trim().toLowerCase().replace(/_/g, "-").replace(/\s+/g, "-");
}
function clampHxBump(delta) {
	if (!Number.isFinite(delta)) return 0;
	return Math.min(1, Math.max(-1, delta));
}
function hxBumpInRange(delta) {
	return Number.isFinite(delta) && delta >= -1 && delta <= 1;
}
function knownSimSlugs() {
	return new Set(sim10k.teams.map((t) => t.slug));
}
function slugSet(known) {
	return known ?? knownSimSlugs();
}
function collectSlugs(override) {
	if (override.type === "hx_bump") return [normalizeTeamSlug(override.team_slug)];
	return [
		normalizeTeamSlug(override.home_slug),
		normalizeTeamSlug(override.away_slug),
		normalizeTeamSlug(override.winner_slug)
	];
}
function validateOverrides(overrides, opts) {
	if (!Array.isArray(overrides) || overrides.length === 0) return {
		ok: false,
		error: "empty_overrides",
		message: "Need 1–3 overrides."
	};
	if (overrides.length > 3) return {
		ok: false,
		error: "too_many_overrides",
		message: `At most 3 overrides.`
	};
	const known = slugSet(opts?.knownSlugs);
	const normalized = [];
	for (const raw of overrides) {
		if (!raw || raw.type !== "force_winner" && raw.type !== "hx_bump") return {
			ok: false,
			error: "incomplete_override",
			message: "Each override needs a type."
		};
		if (raw.type === "hx_bump") {
			const team_slug = normalizeTeamSlug(raw.team_slug);
			if (!team_slug) return {
				ok: false,
				error: "incomplete_override",
				message: "HX bump needs a team."
			};
			if (!known.has(team_slug)) return {
				ok: false,
				error: "unknown_slug",
				message: `Unknown team: ${team_slug}`
			};
			if (!Number.isFinite(raw.delta_hx)) return {
				ok: false,
				error: "delta_hx_out_of_range",
				message: "HX bump must be a number."
			};
			if (opts?.strictHxBump && !hxBumpInRange(raw.delta_hx)) return {
				ok: false,
				error: "delta_hx_out_of_range",
				message: "HX bump must sit in [-1, 1]."
			};
			const next = {
				type: "hx_bump",
				team_slug,
				delta_hx: opts?.strictHxBump ? raw.delta_hx : clampHxBump(raw.delta_hx)
			};
			if (raw.note?.trim()) next.note = raw.note.trim();
			normalized.push(next);
			continue;
		}
		const home_slug = normalizeTeamSlug(raw.home_slug);
		const away_slug = normalizeTeamSlug(raw.away_slug);
		const winner_slug = normalizeTeamSlug(raw.winner_slug);
		if (!home_slug || !away_slug || !winner_slug) return {
			ok: false,
			error: "incomplete_override",
			message: "Force winner needs home, away, and winner."
		};
		if (home_slug === away_slug) return {
			ok: false,
			error: "incomplete_override",
			message: "Home and away must be different teams."
		};
		for (const slug of [
			home_slug,
			away_slug,
			winner_slug
		]) if (!known.has(slug)) return {
			ok: false,
			error: "unknown_slug",
			message: `Unknown team: ${slug}`
		};
		if (winner_slug !== home_slug && winner_slug !== away_slug) return {
			ok: false,
			error: "winner_not_in_game",
			message: "Winner must be home or away."
		};
		const next = {
			type: "force_winner",
			home_slug,
			away_slug,
			winner_slug
		};
		if (typeof raw.week === "number" && Number.isFinite(raw.week)) next.week = Math.trunc(raw.week);
		if (raw.espn_event_id?.trim()) next.espn_event_id = raw.espn_event_id.trim();
		if (raw.note?.trim()) next.note = raw.note.trim();
		normalized.push(next);
	}
	return {
		ok: true,
		overrides: normalized
	};
}
function buildScenarioRequest(input) {
	const validated = validateOverrides(input.overrides, {
		strictHxBump: input.strictHxBump,
		knownSlugs: input.knownSlugs
	});
	if (!validated.ok) return validated;
	const teams = (input.teams?.map(normalizeTeamSlug).filter(Boolean) ?? []).length ? input.teams.map(normalizeTeamSlug).filter(Boolean) : defaultReturnTeams(validated.overrides);
	const known = slugSet(input.knownSlugs);
	for (const slug of teams) if (!known.has(slug)) return {
		ok: false,
		error: "unknown_slug",
		message: `Unknown team: ${slug}`
	};
	return {
		ok: true,
		request: {
			contract_version: SCENARIO_SIM_CONTRACT_VERSION,
			product: SCENARIO_SIM_PRODUCT,
			n_sims: input.n_sims ?? 1e4,
			seed: input.seed === void 0 ? SCENARIO_SIM_SEED : input.seed,
			hx_stamp: input.hx_stamp ?? "HX 2026.4",
			hx_ship_path: input.hx_ship_path ?? "week2_od_hx_ship_2026.json",
			overrides: validated.overrides,
			return: {
				teams,
				include_full_board: input.include_full_board ?? false,
				include_baseline_delta: input.include_baseline_delta ?? true
			}
		}
	};
}
function defaultReturnTeams(overrides) {
	const seen = /* @__PURE__ */ new Set();
	const teams = [];
	for (const ov of overrides) for (const slug of collectSlugs(ov)) {
		if (!slug || seen.has(slug)) continue;
		seen.add(slug);
		teams.push(slug);
	}
	for (const slug of SCENARIO_SIM_GOLDEN_TEAMS) if (!seen.has(slug)) {
		seen.add(slug);
		teams.push(slug);
	}
	return teams.slice(0, 6);
}
function loadScenarioSimGoldenRequest() {
	return scenario_sim_golden_request_default;
}
function loadScenarioSimFixture() {
	return scenario_sim_golden_response_default;
}
function parseScenarioUnlockSearch(s) {
	const out = {};
	const edge = readFlag(s.edge);
	const unlock = readFlag(s.unlock);
	if (edge) out.edge = edge;
	if (unlock) out.unlock = unlock;
	return out;
}
function readFlag(value) {
	if (value === true || value === 1) return "1";
	if (typeof value === "string" && value.trim()) return value.trim();
}
function flagOn(value) {
	if (!value) return false;
	const v = value.trim().toLowerCase();
	return v === "1" || v === "true" || v === "yes";
}
/** Soft gate for the MVP. No accounts. `?unlock=1` (or `?edge=1`) or demo constant. */
function isScenarioSimUnlocked(search = {}) {
	return flagOn(search.edge) || flagOn(search.unlock);
}
function roundTo(n, digits) {
	const f = 10 ** digits;
	return Math.round(n * f) / f;
}
function subtractMetrics(scenario, baseline) {
	return {
		make_field: roundTo(scenario.make_field - baseline.make_field, 2),
		win_title: roundTo(scenario.win_title - baseline.win_title, 2),
		proj_wins: roundTo(scenario.proj_wins - baseline.proj_wins, 2),
		conf_title: roundTo(scenario.conf_title - baseline.conf_title, 1)
	};
}
function metricsFromSimRow(slug) {
	const row = simTeamBySlug(slug);
	if (row) return {
		make_field: row.make_field,
		win_title: row.win_title,
		proj_wins: roundTo(row.proj_wins, 3),
		conf_title: roundTo(row.conf_title, 2)
	};
	const odds = make12FromSim(slug);
	if (odds.makeField == null || odds.winTitle == null) return null;
	return {
		make_field: odds.makeField,
		win_title: odds.winTitle,
		proj_wins: 0,
		conf_title: 0
	};
}
function zeroDelta() {
	return {
		make_field: 0,
		win_title: 0,
		proj_wins: 0,
		conf_title: 0
	};
}
function errorResponse(error, request) {
	return {
		contract_version: SCENARIO_SIM_CONTRACT_VERSION,
		ok: false,
		error,
		meta: request ? {
			n_sims: request.n_sims,
			seed: request.seed ?? 20260913,
			hx_stamp: request.hx_stamp,
			overrides_applied: 0
		} : null,
		baseline: {},
		scenario: {},
		delta: {},
		overrides_echo: request?.overrides ?? [],
		confidence_note: SCENARIO_SIM_CONFIDENCE_NOTE
	};
}
/**
* Golden fixture runner until the live CLI path exists.
* Georgia 75.26/21.59 → 52.40/14.78 plus the four other AMD return teams.
* Does not draw seasons in the browser.
*/
function runDemoScenarioSim(request) {
	const validated = validateOverrides(request.overrides);
	if (!validated.ok) return errorResponse(validated.error, request);
	const fixture = loadScenarioSimFixture();
	const teams = request.return.teams.length ? request.return.teams : defaultReturnTeams(validated.overrides);
	const baseline = {};
	const scenario = {};
	const delta = {};
	for (const slug of teams) {
		const fromFixture = isRecord(fixture.baseline[slug]) && isRecord(fixture.scenario[slug]) ? {
			baseline: fixture.baseline[slug],
			scenario: fixture.scenario[slug]
		} : null;
		if (fromFixture) {
			baseline[slug] = fromFixture.baseline;
			scenario[slug] = fromFixture.scenario;
			delta[slug] = fixture.delta[slug] ?? subtractMetrics(fromFixture.scenario, fromFixture.baseline);
			continue;
		}
		const row = metricsFromSimRow(slug);
		if (!row) return errorResponse("unknown_slug", request);
		baseline[slug] = row;
		scenario[slug] = row;
		delta[slug] = fixture.delta[slug] ?? zeroDelta();
	}
	return {
		contract_version: SCENARIO_SIM_CONTRACT_VERSION,
		ok: true,
		error: null,
		meta: {
			...fixture.meta,
			n_sims: request.n_sims,
			seed: request.seed ?? fixture.meta.seed,
			hx_stamp: request.hx_stamp,
			overrides_applied: validated.overrides.length
		},
		baseline,
		scenario,
		delta,
		overrides_echo: validated.overrides,
		confidence_note: fixture.confidence_note || "Monte Carlo ± noise on 10k draws; not a lock. Calibration: cite live Top 25 closer vs full-slate tape when packaging."
	};
}
function formatScenarioError(code) {
	switch (code) {
		case "too_many_overrides": return "At most three overrides.";
		case "unknown_slug": return "Unknown team slug.";
		case "game_already_final": return "That game is already final.";
		case "game_not_found": return "Game not found.";
		case "delta_hx_out_of_range": return "HX bump must sit in [-1, 1].";
		case "engine_busy": return "Engine is busy.";
		case "empty_overrides": return "Need 1–3 overrides.";
		case "incomplete_override": return "Override is incomplete.";
		case "winner_not_in_game": return "Winner must be home or away.";
		default: return "Could not build the request.";
	}
}
var $$splitComponentImporter$2 = () => import("./edge_.sim-IxyJI3aZ.mjs");
var Route$3 = createFileRoute("/edge_/sim")({
	validateSearch: (s) => parseScenarioUnlockSearch(s),
	loader: async () => {
		return { teams: (await listTeams()).map((t) => ({
			slug: t.slug,
			name: t.name,
			hxRank: t.hxRank,
			shortName: t.shortName,
			conference: t.conference
		})) };
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({ meta: [
		{ title: `Scenario Sim (preview / offline) · ${EDGE.name}` },
		{
			name: "description",
			content: "HX Edge Pack Scenario Sim preview / offline. Desk fixture — not this week’s paid pack."
		},
		{
			name: "robots",
			content: "noindex,nofollow"
		}
	] })
});
var $$splitComponentImporter$1 = () => import("./stories._slug-ChLh2H7-.mjs");
var Route$2 = createFileRoute("/stories/$slug")({
	loader: ({ params }) => {
		const story = getStory(params.slug);
		if (!story) throw notFound();
		return story;
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.headline} · HASHMARK` : "Story · HASHMARK" }] })
});
var $$splitComponentImporter = () => import("./teams._slug-DFDXaVAf.mjs");
var Route$1 = createFileRoute("/teams/$slug")({
	loader: async ({ params }) => {
		const data = await getTeam({ data: { slug: params.slug } });
		if (!data) throw notFound();
		return data;
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.team.name} · HASHMARK` : "Team · HASHMARK" }] })
});
var Route = createFileRoute("/api/edge/pack")({ server: { handlers: { GET: async ({ request }) => {
	const { handleEdgePackDownload } = await import("./edge-pack-files.server-BMb5kkz6.mjs");
	return handleEdgePackDownload(request);
} } } });
var IndexRoute = Route$17.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$18
});
var DeskRoute = Route$16.update({
	id: "/desk",
	path: "/desk",
	getParentRoute: () => Route$18
});
var EdgeRoute = Route$15.update({
	id: "/edge",
	path: "/edge",
	getParentRoute: () => Route$18
});
var LogosRoute = Route$14.update({
	id: "/logos",
	path: "/logos",
	getParentRoute: () => Route$18
});
var MatchupRoute = Route$13.update({
	id: "/matchup",
	path: "/matchup",
	getParentRoute: () => Route$18
});
var ModelRoute = Route$12.update({
	id: "/model",
	path: "/model",
	getParentRoute: () => Route$18
});
var RankingsRoute = Route$11.update({
	id: "/rankings",
	path: "/rankings",
	getParentRoute: () => Route$18
});
var RecruitingRoute = Route$10.update({
	id: "/recruiting",
	path: "/recruiting",
	getParentRoute: () => Route$18
});
var ScheduleRoute = Route$9.update({
	id: "/schedule",
	path: "/schedule",
	getParentRoute: () => Route$18
});
var StatesRoute = Route$8.update({
	id: "/states",
	path: "/states",
	getParentRoute: () => Route$18
});
var StoriesRoute = Route$7.update({
	id: "/stories",
	path: "/stories",
	getParentRoute: () => Route$18
});
var TalentRoute = Route$6.update({
	id: "/talent",
	path: "/talent",
	getParentRoute: () => Route$18
});
var EdgeBoardRoute = Route$5.update({
	id: "/board",
	path: "/board",
	getParentRoute: () => EdgeRoute
});
var EdgeUnlockRoute = Route$4.update({
	id: "/unlock",
	path: "/unlock",
	getParentRoute: () => EdgeRoute
});
var EdgeSimRoute = Route$3.update({
	id: "/edge_/sim",
	path: "/edge/sim",
	getParentRoute: () => Route$18
});
var StoriesSlugRoute = Route$2.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => StoriesRoute
});
var TeamsSlugRoute = Route$1.update({
	id: "/teams/$slug",
	path: "/teams/$slug",
	getParentRoute: () => Route$18
});
var ApiEdgePackRoute = Route.update({
	id: "/api/edge/pack",
	path: "/api/edge/pack",
	getParentRoute: () => Route$18
});
var EdgeRouteChildren = {
	EdgeBoardRoute,
	EdgeUnlockRoute
};
var EdgeRouteWithChildren = EdgeRoute._addFileChildren(EdgeRouteChildren);
var StoriesRouteChildren = { StoriesSlugRoute };
var rootRouteChildren = {
	IndexRoute,
	DeskRoute,
	EdgeRoute: EdgeRouteWithChildren,
	LogosRoute,
	MatchupRoute,
	ModelRoute,
	RankingsRoute,
	RecruitingRoute,
	ScheduleRoute,
	StatesRoute,
	StoriesRoute: StoriesRoute._addFileChildren(StoriesRouteChildren),
	TalentRoute,
	EdgeSimRoute,
	TeamsSlugRoute,
	ApiEdgePackRoute
};
var routeTree = Route$18._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { EdgePackStrip as $, Route$7 as A, AP_STAMP as B, odTermLabel as C, week4Top25Tape as D, week4Tape as E, YEARS as F, selectWeekScopedFeatured as G, featuredBook as H, Route$11 as I, ConfPills as J, spreadGap as K, Route$13 as L, Route$9 as M, defaultWeek as N, Route$4 as O, Route$10 as P, EdgeCheckoutNote as Q, Route$14 as R, boardDisagreementRows as S, week4SeasonTape as T, featuredSlateWeek as U, favoriteLine as V, formatVegas as W, EDGE_SUPPORT_EMAIL as X, EDGE as Y, EdgeBuyButton as Z, make12FieldLabel as _, WEEK0_SLATE as a, deltaVsAp as at, make12TitleLabel as b, SCENARIO_SIM_GOLDEN_EVENT_ID as c, fmtPct as ct, formatScenarioError as d, PageHead as et, isScenarioSimUnlocked as f, buildSeasonSchedule as g, buildRemainingSchedule as h, Route$3 as i, cn as it, Route$8 as j, Route$6 as k, SCENARIO_SIM_GOLDEN_FORCE as l, inConf as lt, runDemoScenarioSim as m, Route$1 as n, TeamSelect as nt, SCENARIO_SIM_DEMO_LABEL as o, fmtHeight as ot, loadScenarioSimGoldenRequest as p, Button as q, Route$2 as r, apLabel as rt, SCENARIO_SIM_GOLDEN_BUMP as s, fmtNum as st, router_exports as t, Panel as tt, buildScenarioRequest as u, make12FromSim as v, week4BoardFlags as w, SIM_10K_HX_STAMP as x, make12PanelLede as y, Route$17 as z };
