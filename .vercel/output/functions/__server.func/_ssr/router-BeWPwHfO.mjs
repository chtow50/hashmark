import { o as __toESM } from "../_runtime.mjs";
import { a as fcsStubIsFinal, h as todayChicago, n as MODEL, o as fcsStubsForTeam, r as addDaysYmd } from "./fcs-stubs-BIYqld0L.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { H as notFound, S as require_jsx_runtime, _ as createFileRoute, b as useNavigate, d as useRouterState, g as lazyRouteComponent, h as Outlet, l as Scripts, p as createRouter, u as HeadContent, v as createRootRoute, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as string, i as object, n as literal, o as union, r as number, t as boolean } from "../_libs/zod.mjs";
import { n as TriangleAlert, o as Menu, r as Search, t as X, u as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Analytics } from "../_libs/vercel__analytics.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-BAnCHjuz.js
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
//#region node_modules/.nitro/vite/services/ssr/assets/featured-BydkJ1g-.js
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
* Friday ESPN: Pittsburgh at Virginia Tech. Research Week 5 featured card
* for `/schedule?w=5` only. Fri 2026-10-02 18:00 CT · ESPN · VT −5.5 / 56.5.
* Not the live desk — BOARD_WEEK and FEATURED_SLATE_WEEK stay 4.
*/
var WEEK5_FEATURED = {
	homeSlug: "virginia-tech",
	awaySlug: "pittsburgh"
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
* Board featured for the live chrome week (Week 4 slate).
* Week 2 and Week 3 Research pins stay historical helpers — those rows
* are FINAL and must not feature. Pitt FINAL is not featured.
* Week 4: next upcoming FBS kick on the week-4 slate. Liberty @ Coastal
* is FINAL (34–17) and must not feature. While Friday is still ahead, the
* earliest kick is the card (Army @ Temple, Fri 15:00 CT).
* Blank Vegas stays blank when the row has no stamped book. Never invent a book.
* Never a FINAL. Never FCS. Never invent a matchup.
*/
function selectBoardFeaturedKick(slate, nowMs) {
	return selectFeaturedKick(slate, nowMs);
}
function isPittsburghAtVirginiaTech(g) {
	return g.homeSlug === WEEK5_FEATURED.homeSlug && g.awaySlug === WEEK5_FEATURED.awaySlug;
}
/**
* Featured card scoped to the schedule week being viewed.
* Week 5 pins Pittsburgh @ Virginia Tech (CLEAR), even though WKU @ NMSU
* kicks earlier. Other weeks have no schedule-page pin — the homepage desk
* stays Week 4 via FEATURED_SLATE_WEEK. Never invents a matchup.
*/
function selectWeekScopedFeatured(week, slate) {
	if (week !== 5) return null;
	return slate.find((g) => !g.isFcs && g.status !== "final" && isPittsburghAtVirginiaTech(g)) ?? null;
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
//#region node_modules/.nitro/vite/services/ssr/assets/stories-DKcaNNi9.js
var STORY_DATE = "Friday, Aug 28, 2026";
var STORY_DATE_WEEK1 = "Friday, Sep 4, 2026";
var STORY_DATE_TAPE = "Tuesday, Sep 8, 2026";
var STORY_DATE_TAPE_WEEK2 = "Sunday, Sep 13, 2026";
var STORY_DATE_TAPE_WEEK3 = "Sunday, Sep 20, 2026";
var STORY_DATE_WEEK3 = "Friday, Sep 18, 2026";
var STORY_DATE_WEEK4 = "Friday, Sep 25, 2026";
var STORIES = [
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
//#region node_modules/.nitro/vite/services/ssr/assets/router-BeWPwHfO.js
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
var $$splitComponentImporter$16 = () => import("./routes-CYdMVWHI.mjs");
var Route$17 = createFileRoute("/")({
	loader: async () => {
		const [teams, games, slate] = await Promise.all([
			listTeams(),
			listGames(),
			listScheduleWeek({ data: { week: 4 } })
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
var $$splitComponentImporter$15 = () => import("./desk-CTJdO-8M.mjs");
var Route$16 = createFileRoute("/desk")({
	component: lazyRouteComponent($$splitComponentImporter$15, "component"),
	head: () => ({ meta: [{ title: "The desk · HASHMARK" }, {
		name: "description",
		content: "What HASHMARK is, how HX is built, and the glossary for the college football ratings desk."
	}] })
});
var $$splitComponentImporter$14 = () => import("./edge-BsHqT-lh.mjs");
var Route$15 = createFileRoute("/edge")({
	component: lazyRouteComponent($$splitComponentImporter$14, "component"),
	head: () => ({ meta: [{ title: `${EDGE.name} · HASHMARK` }, {
		name: "description",
		content: "HX Edge Pack is the weekly depth product. The $5 week sample is the full pack — confidence cards, unit O/D pulse, tape write-up — not the free-board teaser. The public board stays free."
	}] })
});
var $$splitComponentImporter$13 = () => import("./logos-C0Yrcgmm.mjs");
var Route$14 = createFileRoute("/logos")({
	loader: async () => listTeams(),
	component: lazyRouteComponent($$splitComponentImporter$13, "component"),
	head: () => ({ meta: [{ title: "Team logos · HASHMARK" }] })
});
var $$splitComponentImporter$12 = () => import("./matchup-DrKLTqP7.mjs");
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
var $$splitComponentImporter$11 = () => import("./model-x9WlfW3O.mjs");
var Route$12 = createFileRoute("/model")({
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	head: () => ({ meta: [{ title: "The Model · HASHMARK" }] })
});
var $$splitComponentImporter$10 = () => import("./rankings-BU7_vflF.mjs");
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
var $$splitComponentImporter$9 = () => import("./recruiting-DpZmOx-H.mjs");
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
var $$splitComponentImporter$8 = () => import("./schedule-B_axYzUJ.mjs");
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
var $$splitComponentImporter$7 = () => import("./states-TAM4GSMU.mjs");
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
var $$splitComponentImporter$6 = () => import("./stories-DjWVHOy1.mjs");
var Route$7 = createFileRoute("/stories")({
	loader: () => listStories(),
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({ meta: [{ title: "Stories · HASHMARK" }] })
});
var $$splitComponentImporter$5 = () => import("./talent-DDDRzuMp.mjs");
var Route$6 = createFileRoute("/talent")({
	validateSearch: (s) => ({
		board: s.board === "size" ? "size" : "composite",
		conf: parseConf(s.conf)
	}),
	loader: () => listTeams(),
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [{ title: "Roster Talent · HASHMARK" }] })
});
var $$splitComponentImporter$4 = () => import("./edge.board-CAogOZKB.mjs");
var Route$5 = createFileRoute("/edge/board")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: `Edge Board · ${EDGE.name} · HASHMARK` }, {
		name: "description",
		content: "HX Edge Board v1 — confidence schema: tiers A–D, calibration FLAGS, small/medium/large edge bands (large ≥ 7 pts), copy bans. Free board is HX vs Vegas. Paid pack is ranked cards."
	}] })
});
var verifyEdgeUnlock = createServerFn({ method: "GET" }).validator(object({ sessionId: string().optional() })).handler(createSsrRpc("4fe58dd28fd7340a345c36b313f0f7fe83bb1daaeec7d6b97ee43c0751bef21c"));
var $$splitComponentImporter$3 = () => import("./edge.unlock-BJzNUNtH.mjs");
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
	as_of: "2026-09-25",
	poll_week: 4,
	source_ap: "week4_ap_top25_2026 / NCAA Week 4 (Sept. 20)",
	source_hx: "week3_od_hx_ship_2026.json",
	hx_board: "HX 2026.5",
	note: "Rebuilt vs Week 4 AP ballot (Sept. 20) and live HX 2026.5 ranks in week3_od_hx_ship_2026. Gaps with |delta| >= 3. Oklahoma and Virginia left the ballot. Houston is AP 25 / HX 39 (not the Week 3 AP 22 row). LSU is AP 10 / HX 19 (not AP 7).",
	gaps: [
		{
			"name": "Mississippi State",
			"ap": 24,
			"hx": 67,
			"hx_rating": .2047,
			"delta": -43
		},
		{
			"name": "Texas A&M",
			"ap": 23,
			"hx": 6,
			"hx_rating": 6.1053,
			"delta": 17
		},
		{
			"name": "Oregon",
			"ap": 20,
			"hx": 4,
			"hx_rating": 6.9056,
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
			"hx_rating": 3.0061,
			"delta": -10
		},
		{
			"name": "LSU",
			"ap": 10,
			"hx": 19,
			"hx_rating": 4.0776,
			"delta": -9
		},
		{
			"name": "USC",
			"ap": 12,
			"hx": 21,
			"hx_rating": 3.8488,
			"delta": -9
		},
		{
			"name": "BYU",
			"ap": 9,
			"hx": 17,
			"hx_rating": 4.1233,
			"delta": -8
		},
		{
			"name": "Indiana",
			"ap": 5,
			"hx": 11,
			"hx_rating": 4.981,
			"delta": -6
		},
		{
			"name": "Iowa",
			"ap": 17,
			"hx": 23,
			"hx_rating": 3.7409,
			"delta": -6
		},
		{
			"name": "Michigan",
			"ap": 18,
			"hx": 12,
			"hx_rating": 4.8942,
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
			"name": "Texas",
			"ap": 1,
			"hx": 5,
			"hx_rating": 6.4443,
			"delta": -4
		},
		{
			"name": "Ole Miss",
			"ap": 4,
			"hx": 8,
			"hx_rating": 5.4492,
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
			"hx_rating": 5.8206,
			"delta": 4
		},
		{
			"name": "Tennessee",
			"ap": 14,
			"hx": 18,
			"hx_rating": 4.0824,
			"delta": -4
		},
		{
			"name": "Missouri",
			"ap": 19,
			"hx": 15,
			"hx_rating": 4.2596,
			"delta": 4
		},
		{
			"name": "Florida",
			"ap": 21,
			"hx": 24,
			"hx_rating": 3.4998,
			"delta": -3
		}
	],
	hx_not_in_ap: [
		{
			"hx_rank": 16,
			"name": "Oklahoma",
			"hx": 4.1874
		},
		{
			"hx_rank": 22,
			"name": "Clemson",
			"hx": 3.8301
		},
		{
			"hx_rank": 25,
			"name": "Washington",
			"hx": 3.2867
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
			"hx_rank": 67
		},
		{
			"ap": 25,
			"name": "Houston",
			"hx_rank": 39
		}
	]
};
var week3_tape_2026_default = {
	meta: {
		"as_of": "2026-09-20 10:06 AM CT",
		"week": 3,
		"season": 2026,
		"scope": "FBS–FBS only",
		"n_games": 56,
		"su": "49/56",
		"su_pct": 87.5,
		"hx_closer": "23/56",
		"hx_closer_pct": 41.1,
		"vegas_closer": "33/56",
		"ats_hx": "29/56",
		"ats_hx_pct": 51.8,
		"mae_hx": 10.03,
		"mae_vegas": 8.71,
		"brier": .119,
		"season_w1_w3_su": "83.6%",
		"season_w1_w3_closer": "43.2%",
		"season_w1_w3_su_frac": "122/146",
		"season_w1_w3_closer_frac": "63/146",
		"sources": {
			"slate_vegas": "/workspace/cfb/week3_fbs_fbs_kick_tv_vegas_2026.json",
			"finals": ["/workspace/cfb/week3_remaining_finals_clear_2026.json", "ESPN site.web.api scoreboard dates=20260917-20260920 groups=80"],
			"hx_pregame": "https://hashmarkcfb.com/schedule?w=3 (homeHx/awayHx; recomputed spread)",
			"grade_crosscheck": "/workspace/cfb/metrics/week3_hx_vs_vegas_detail.json",
			"week1_rollup": "/workspace/cfb/metrics/weekly_hx_vs_vegas.md (W1 36/43 SU, 20/43 closer)",
			"week2_tape": "/workspace/cfb/week2_tape_2026.json"
		},
		"coverage_notes": [
			"All 56 FBS–FBS games have Research Vegas closes (kick pack) and HX lines from live schedule homeHx/awayHx (zero gaps).",
			"Live site stamps only Syracuse@Pittsburgh FINAL; remaining scores from ESPN STATUS_FINAL.",
			"Live site vegasSpread sign can differ from Research home-perspective closes — Research pack used for Vegas.",
			"HX spreads are American (negative = favorite). hx_home is home-perspective American line.",
			"No invented lines. No open FBS–FBS games."
		],
		"headline_flags": {
			"closer_below_45": true,
			"n_su_misses": 7,
			"n_winner_flip_hits": 2,
			"n_winner_flip_misses": 2
		}
	},
	su_misses: [
		{
			"matchup": "Kentucky@Texas A&M",
			"hx_fav": "Texas A&M",
			"hx_spread_display": "Texas A&M -26.0",
			"vegas_details": "TA&M -16.5",
			"final": "Kentucky 31–Texas A&M 21",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401856694"
		},
		{
			"matchup": "Mississippi State@South Carolina",
			"hx_fav": "South Carolina",
			"hx_spread_display": "South Carolina -12.9",
			"vegas_details": "SC -4",
			"final": "Mississippi State 41–South Carolina 34",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401856691"
		},
		{
			"matchup": "East Carolina@Old Dominion",
			"hx_fav": "Old Dominion",
			"hx_spread_display": "Old Dominion -0.6",
			"vegas_details": "ODU -3",
			"final": "East Carolina 20–Old Dominion 17",
			"closer": "hx",
			"winner_flip": false,
			"espn_event_id": "401862710"
		},
		{
			"matchup": "UConn@Southern Miss",
			"hx_fav": "Southern Miss",
			"hx_spread_display": "Southern Miss -7.2",
			"vegas_details": "CONN -3",
			"final": "UConn 48–Southern Miss 20",
			"closer": "vegas",
			"winner_flip": true,
			"espn_event_id": "401861963"
		},
		{
			"matchup": "Ohio@South Alabama",
			"hx_fav": "Ohio",
			"hx_spread_display": "Ohio -6.0",
			"vegas_details": "USA -4.5",
			"final": "Ohio 36–South Alabama 41",
			"closer": "vegas",
			"winner_flip": true,
			"espn_event_id": "401866423"
		},
		{
			"matchup": "West Virginia@Virginia",
			"hx_fav": "Virginia",
			"hx_spread_display": "Virginia -8.3",
			"vegas_details": "UVA -10",
			"final": "West Virginia 38–Virginia 27",
			"closer": "hx",
			"winner_flip": false,
			"espn_event_id": "401856802"
		},
		{
			"matchup": "James Madison@San Diego State",
			"hx_fav": "San Diego State",
			"hx_spread_display": "San Diego State -1.1",
			"vegas_details": "SDSU -2.5",
			"final": "James Madison 26–San Diego State 13",
			"closer": "hx",
			"winner_flip": false,
			"espn_event_id": "401860887"
		}
	],
	winner_flip_hits: [{
		"matchup": "Nevada @ Middle Tennessee",
		"hx": "Middle Tennessee -5.0",
		"vegas": "NEV -3.5",
		"final": "20–27",
		"espn_event_id": "401864443"
	}, {
		"matchup": "LSU @ Ole Miss",
		"hx": "Ole Miss -7.8",
		"vegas": "LSU -3",
		"final": "24–32",
		"espn_event_id": "401856688"
	}],
	winner_flip_misses: [{
		"matchup": "UConn @ Southern Miss",
		"hx": "Southern Miss -7.2",
		"vegas": "CONN -3",
		"final": "48–20",
		"espn_event_id": "401861963"
	}, {
		"matchup": "Ohio @ South Alabama",
		"hx": "Ohio -6.0",
		"vegas": "USA -4.5",
		"final": "36–41",
		"espn_event_id": "401866423"
	}],
	games: [
		{
			"espn_event_id": "401858225",
			"kick_ct": "2026-09-17 18:30",
			"weekday": "Thu",
			"tv": "ESPN",
			"away": "Syracuse",
			"home": "Pittsburgh",
			"away_short": "SYR",
			"home_short": "PITT",
			"away_slug": "syracuse",
			"home_slug": "pittsburgh",
			"neutral": false,
			"hx_fav": "Pittsburgh",
			"hx_home": -10.8,
			"hx_spread_display": "Pittsburgh -10.8",
			"hx_wp": 74.1,
			"home_hx_rating": .8784,
			"away_hx_rating": -1.3481,
			"home_hx_rank": 53,
			"away_hx_rank": 92,
			"vegas_home": -10.5,
			"vegas_details": "PITT -10.5",
			"vegas_ou": 51.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 13,
			"score_home": 27,
			"final_display": "Syracuse 13–Pittsburgh 27",
			"mov_home": 14,
			"score_source": "espn_STATUS_FINAL;already_live",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 3.2,
			"err_vegas": 3.5,
			"winner_flip": false,
			"flags": [],
			"brier": .067081
		},
		{
			"espn_event_id": "401858226",
			"kick_ct": "2026-09-18 18:30",
			"weekday": "Fri",
			"tv": "ESPN",
			"away": "Miami",
			"home": "Wake Forest",
			"away_short": "MIA",
			"home_short": "WAKE",
			"away_slug": "miami",
			"home_slug": "wake-forest",
			"neutral": false,
			"hx_fav": "Miami",
			"hx_home": 15,
			"hx_spread_display": "Miami -15.0",
			"hx_wp": 80.1,
			"home_hx_rating": -.2499,
			"away_hx_rating": 5.2345,
			"home_hx_rank": 72,
			"away_hx_rank": 10,
			"vegas_home": 20.5,
			"vegas_details": "MIA -20.5",
			"vegas_ou": 55.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 33,
			"score_home": 20,
			"final_display": "Miami 33–Wake Forest 20",
			"mov_home": -13,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 2,
			"err_vegas": 7.5,
			"winner_flip": false,
			"flags": [],
			"brier": .039601
		},
		{
			"espn_event_id": "401856811",
			"kick_ct": "2026-09-18 19:00",
			"weekday": "Fri",
			"tv": "FOX",
			"away": "Houston",
			"home": "Texas Tech",
			"away_short": "HOU",
			"home_short": "TTU",
			"away_slug": "houston",
			"home_slug": "texas-tech",
			"neutral": false,
			"hx_fav": "Texas Tech",
			"hx_home": -18.8,
			"hx_spread_display": "Texas Tech -18.8",
			"hx_wp": 84.4,
			"home_hx_rating": 5.8395,
			"away_hx_rating": 1.6041,
			"home_hx_rank": 7,
			"away_hx_rank": 41,
			"vegas_home": -7.5,
			"vegas_details": "TTU -7.5",
			"vegas_ou": null,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 26,
			"score_home": 28,
			"final_display": "Houston 26–Texas Tech 28",
			"mov_home": 2,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 16.8,
			"err_vegas": 5.5,
			"winner_flip": false,
			"flags": [],
			"brier": .024336
		},
		{
			"espn_event_id": "401869940",
			"kick_ct": "2026-09-19 10:30",
			"weekday": "Sat",
			"tv": "CBSSN",
			"away": "Coastal Carolina",
			"home": "Delaware",
			"away_short": "CCU",
			"home_short": "DEL",
			"away_slug": "coastal-carolina",
			"home_slug": "delaware",
			"neutral": false,
			"hx_fav": "Delaware",
			"hx_home": -1.6,
			"hx_spread_display": "Delaware -1.6",
			"hx_wp": 54.4,
			"home_hx_rating": -2.5905,
			"away_hx_rating": -2.055,
			"home_hx_rank": 105,
			"away_hx_rank": 99,
			"vegas_home": -5.5,
			"vegas_details": "DEL -5.5",
			"vegas_ou": 57.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 14,
			"score_home": 22,
			"final_display": "Coastal Carolina 14–Delaware 22",
			"mov_home": 8,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 6.4,
			"err_vegas": 2.5,
			"winner_flip": false,
			"flags": [],
			"brier": .207936
		},
		{
			"espn_event_id": "401856686",
			"kick_ct": "2026-09-19 11:00",
			"weekday": "Sat",
			"tv": "ABC",
			"away": "Georgia",
			"home": "Arkansas",
			"away_short": "UGA",
			"home_short": "ARK",
			"away_slug": "georgia",
			"home_slug": "arkansas",
			"neutral": false,
			"hx_fav": "Georgia",
			"hx_home": 22.8,
			"hx_spread_display": "Georgia -22.8",
			"hx_wp": 87.8,
			"home_hx_rating": .5882,
			"away_hx_rating": 7.9055,
			"home_hx_rank": 59,
			"away_hx_rank": 1,
			"vegas_home": 25.5,
			"vegas_details": "UGA -25.5",
			"vegas_ou": 54.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 45,
			"score_home": 17,
			"final_display": "Georgia 45–Arkansas 17",
			"mov_home": -28,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 5.2,
			"err_vegas": 2.5,
			"winner_flip": false,
			"flags": [],
			"brier": .014884
		},
		{
			"espn_event_id": "401858454",
			"kick_ct": "2026-09-19 11:00",
			"weekday": "Sat",
			"tv": "FOX",
			"away": "Kent State",
			"home": "Ohio State",
			"away_short": "KENT",
			"home_short": "OSU",
			"away_slug": "kent-state",
			"home_slug": "ohio-state",
			"neutral": false,
			"hx_fav": "Ohio State",
			"hx_home": -71.7,
			"hx_spread_display": "Ohio State -71.7",
			"hx_wp": 99.1,
			"home_hx_rating": 7.8131,
			"away_hx_rating": -5.8934,
			"home_hx_rank": 2,
			"away_hx_rank": 134,
			"vegas_home": -52.5,
			"vegas_details": "OSU -52.5",
			"vegas_ou": 59.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 3,
			"score_home": 59,
			"final_display": "Kent State 3–Ohio State 59",
			"mov_home": 56,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 15.7,
			"err_vegas": 3.5,
			"winner_flip": false,
			"flags": [],
			"brier": 81e-6
		},
		{
			"espn_event_id": "401858456",
			"kick_ct": "2026-09-19 11:00",
			"weekday": "Sat",
			"tv": "BTN",
			"away": "Buffalo",
			"home": "Penn State",
			"away_short": "BUFF",
			"home_short": "PSU",
			"away_slug": "buffalo",
			"home_slug": "penn-state",
			"neutral": false,
			"hx_fav": "Penn State",
			"hx_home": -35.3,
			"hx_spread_display": "Penn State -35.3",
			"hx_wp": 94.2,
			"home_hx_rating": 4.3342,
			"away_hx_rating": -3.3653,
			"home_hx_rank": 13,
			"away_hx_rank": 114,
			"vegas_home": -39.5,
			"vegas_details": "PSU -39.5",
			"vegas_ou": 48.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 13,
			"score_home": 55,
			"final_display": "Buffalo 13–Penn State 55",
			"mov_home": 42,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 6.7,
			"err_vegas": 2.5,
			"winner_flip": false,
			"flags": [],
			"brier": .003364
		},
		{
			"espn_event_id": "401856792",
			"kick_ct": "2026-09-19 11:00",
			"weekday": "Sat",
			"tv": "ESPN2",
			"away": "Tulane",
			"home": "Kansas State",
			"away_short": "TULN",
			"home_short": "KSU",
			"away_slug": "tulane",
			"home_slug": "kansas-state",
			"neutral": false,
			"hx_fav": "Kansas State",
			"hx_home": -16,
			"hx_spread_display": "Kansas State -16.0",
			"hx_wp": 81.3,
			"home_hx_rating": 2.3903,
			"away_hx_rating": -1.1648,
			"home_hx_rank": 29,
			"away_hx_rank": 89,
			"vegas_home": -20.5,
			"vegas_details": "KSU -20.5",
			"vegas_ou": 49.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 20,
			"score_home": 31,
			"final_display": "Tulane 20–Kansas State 31",
			"mov_home": 11,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 5,
			"err_vegas": 9.5,
			"winner_flip": false,
			"flags": [],
			"brier": .034969
		},
		{
			"espn_event_id": "401856798",
			"kick_ct": "2026-09-19 11:00",
			"weekday": "Sat",
			"tv": "ESPNU",
			"away": "Bowling Green",
			"home": "Iowa State",
			"away_short": "BGSU",
			"home_short": "ISU",
			"away_slug": "bowling-green",
			"home_slug": "iowa-state",
			"neutral": false,
			"hx_fav": "Iowa State",
			"hx_home": -23.1,
			"hx_spread_display": "Iowa State -23.1",
			"hx_wp": 88,
			"home_hx_rating": .8494,
			"away_hx_rating": -4.3634,
			"home_hx_rank": 54,
			"away_hx_rank": 124,
			"vegas_home": -23.5,
			"vegas_details": "ISU -23.5",
			"vegas_ou": 44.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 7,
			"score_home": 55,
			"final_display": "Bowling Green 7–Iowa State 55",
			"mov_home": 48,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 24.9,
			"err_vegas": 24.5,
			"winner_flip": false,
			"flags": [],
			"brier": .0144
		},
		{
			"espn_event_id": "401856812",
			"kick_ct": "2026-09-19 11:00",
			"weekday": "Sat",
			"tv": "FS1",
			"away": "Arizona State",
			"home": "Kansas",
			"away_short": "ASU",
			"home_short": "KU",
			"away_slug": "arizona-state",
			"home_slug": "kansas",
			"neutral": true,
			"hx_fav": "Arizona State",
			"hx_home": 2.5,
			"hx_spread_display": "Arizona State -2.5",
			"hx_wp": 56.7,
			"home_hx_rating": .7774,
			"away_hx_rating": 1.6269,
			"home_hx_rank": 57,
			"away_hx_rank": 40,
			"vegas_home": 5.5,
			"vegas_details": "ASU -5.5",
			"vegas_ou": 51.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 24,
			"score_home": 17,
			"final_display": "Arizona State 24–Kansas 17",
			"mov_home": -7,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 4.5,
			"err_vegas": 1.5,
			"winner_flip": false,
			"flags": [],
			"brier": .187489
		},
		{
			"espn_event_id": "401858229",
			"kick_ct": "2026-09-19 11:00",
			"weekday": "Sat",
			"tv": "ESPN/Disney+",
			"away": "North Carolina",
			"home": "Clemson",
			"away_short": "UNC",
			"home_short": "CLEM",
			"away_slug": "north-carolina",
			"home_slug": "clemson",
			"neutral": false,
			"hx_fav": "Clemson",
			"hx_home": -21.6,
			"hx_spread_display": "Clemson -21.6",
			"hx_wp": 86.9,
			"home_hx_rating": 3.8288,
			"away_hx_rating": -1.0477,
			"home_hx_rank": 22,
			"away_hx_rank": 85,
			"vegas_home": -3.5,
			"vegas_details": "CLEM -3.5",
			"vegas_ou": 44.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 20,
			"score_home": 28,
			"final_display": "North Carolina 20–Clemson 28",
			"mov_home": 8,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 13.6,
			"err_vegas": 4.5,
			"winner_flip": false,
			"flags": [],
			"brier": .017161
		},
		{
			"espn_event_id": "401858451",
			"kick_ct": "2026-09-19 11:00",
			"weekday": "Sat",
			"tv": "BTN",
			"away": "Akron",
			"home": "Minnesota",
			"away_short": "AKR",
			"home_short": "MINN",
			"away_slug": "akron",
			"home_slug": "minnesota",
			"neutral": false,
			"hx_fav": "Minnesota",
			"hx_home": -24.2,
			"hx_spread_display": "Minnesota -24.2",
			"hx_wp": 88.8,
			"home_hx_rating": 1.8794,
			"away_hx_rating": -3.5592,
			"home_hx_rank": 35,
			"away_hx_rank": 116,
			"vegas_home": -24.5,
			"vegas_details": "MINN -24.5",
			"vegas_ou": 49.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 7,
			"score_home": 41,
			"final_display": "Akron 7–Minnesota 41",
			"mov_home": 34,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 9.8,
			"err_vegas": 9.5,
			"winner_flip": false,
			"flags": [],
			"brier": .012544
		},
		{
			"espn_event_id": "401860889",
			"kick_ct": "2026-09-19 11:00",
			"weekday": "Sat",
			"tv": "USA Net",
			"away": "North Texas",
			"home": "Texas State",
			"away_short": "UNT",
			"home_short": "TXST",
			"away_slug": "north-texas",
			"home_slug": "texas-state",
			"neutral": false,
			"hx_fav": "Texas State",
			"hx_home": -13.4,
			"hx_spread_display": "Texas State -13.4",
			"hx_wp": 78,
			"home_hx_rating": .7288,
			"away_hx_rating": -2.1752,
			"home_hx_rank": 58,
			"away_hx_rank": 102,
			"vegas_home": -3,
			"vegas_details": "TXST -3",
			"vegas_ou": 63.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 35,
			"score_home": 49,
			"final_display": "North Texas 35–Texas State 49",
			"mov_home": 14,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": .6,
			"err_vegas": 11,
			"winner_flip": false,
			"flags": [],
			"brier": .0484
		},
		{
			"espn_event_id": "401858460",
			"kick_ct": "2026-09-19 11:30",
			"weekday": "Sat",
			"tv": "Peacock",
			"away": "Eastern Michigan",
			"home": "Wisconsin",
			"away_short": "EMU",
			"home_short": "WIS",
			"away_slug": "eastern-michigan",
			"home_slug": "wisconsin",
			"neutral": false,
			"hx_fav": "Wisconsin",
			"hx_home": -17.1,
			"hx_spread_display": "Wisconsin -17.1",
			"hx_wp": 82.6,
			"home_hx_rating": 1.1067,
			"away_hx_rating": -2.7134,
			"home_hx_rank": 50,
			"away_hx_rank": 106,
			"vegas_home": -23.5,
			"vegas_details": "WIS -23.5",
			"vegas_ou": 45.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 10,
			"score_home": 54,
			"final_display": "Eastern Michigan 10–Wisconsin 54",
			"mov_home": 44,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 26.9,
			"err_vegas": 20.5,
			"winner_flip": false,
			"flags": [],
			"brier": .030276
		},
		{
			"espn_event_id": "401856695",
			"kick_ct": "2026-09-19 11:45",
			"weekday": "Sat",
			"tv": "SEC Network",
			"away": "NC State",
			"home": "Vanderbilt",
			"away_short": "NCSU",
			"home_short": "VAN",
			"away_slug": "nc-state",
			"home_slug": "vanderbilt",
			"neutral": false,
			"hx_fav": "Vanderbilt",
			"hx_home": -4.2,
			"hx_spread_display": "Vanderbilt -4.2",
			"hx_wp": 60.9,
			"home_hx_rating": 2.4299,
			"away_hx_rating": 2.1175,
			"home_hx_rank": 28,
			"away_hx_rank": 33,
			"vegas_home": -3,
			"vegas_details": "VAN -3",
			"vegas_ou": 51.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 31,
			"score_home": 35,
			"final_display": "NC State 31–Vanderbilt 35",
			"mov_home": 4,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "hx",
			"err_hx": .2,
			"err_vegas": 1,
			"winner_flip": false,
			"flags": [],
			"brier": .152881
		},
		{
			"espn_event_id": "401864508",
			"kick_ct": "2026-09-19 12:00",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "Wyoming",
			"home": "Central Michigan",
			"away_short": "WYO",
			"home_short": "CMU",
			"away_slug": "wyoming",
			"home_slug": "central-michigan",
			"neutral": false,
			"hx_fav": "Central Michigan",
			"hx_home": -4.5,
			"hx_spread_display": "Central Michigan -4.5",
			"hx_wp": 61.7,
			"home_hx_rating": -3.3662,
			"away_hx_rating": -3.7796,
			"home_hx_rank": 115,
			"away_hx_rank": 118,
			"vegas_home": -1.5,
			"vegas_details": "CMU -1.5",
			"vegas_ou": 39.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 10,
			"score_home": 24,
			"final_display": "Wyoming 10–Central Michigan 24",
			"mov_home": 14,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 9.5,
			"err_vegas": 12.5,
			"winner_flip": false,
			"flags": [],
			"brier": .146689
		},
		{
			"espn_event_id": "401862774",
			"kick_ct": "2026-09-19 14:00",
			"weekday": "Sat",
			"tv": "CBSSN",
			"away": "Temple",
			"home": "Toledo",
			"away_short": "TEM",
			"home_short": "TOL",
			"away_slug": "temple",
			"home_slug": "toledo",
			"neutral": false,
			"hx_fav": "Toledo",
			"hx_home": -21.4,
			"hx_spread_display": "Toledo -21.4",
			"hx_wp": 86.7,
			"home_hx_rating": 1.5151,
			"away_hx_rating": -3.311,
			"home_hx_rank": 43,
			"away_hx_rank": 112,
			"vegas_home": -5.5,
			"vegas_details": "TOL -5.5",
			"vegas_ou": 51.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 48,
			"score_home": 49,
			"final_display": "Temple 48–Toledo 49",
			"mov_home": 1,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 20.4,
			"err_vegas": 4.5,
			"winner_flip": false,
			"flags": [],
			"brier": .017689
		},
		{
			"espn_event_id": "401856694",
			"kick_ct": "2026-09-19 14:30",
			"weekday": "Sat",
			"tv": "ESPN",
			"away": "Kentucky",
			"home": "Texas A&M",
			"away_short": "UK",
			"home_short": "TA&M",
			"away_slug": "kentucky",
			"home_slug": "texas-am",
			"neutral": false,
			"hx_fav": "Texas A&M",
			"hx_home": -26,
			"hx_spread_display": "Texas A&M -26.0",
			"hx_wp": 90,
			"home_hx_rating": 6.1292,
			"away_hx_rating": .2914,
			"home_hx_rank": 6,
			"away_hx_rank": 64,
			"vegas_home": -16.5,
			"vegas_details": "TA&M -16.5",
			"vegas_ou": 49.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 31,
			"score_home": 21,
			"final_display": "Kentucky 31–Texas A&M 21",
			"mov_home": -10,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 36,
			"err_vegas": 26.5,
			"winner_flip": false,
			"flags": [],
			"brier": .81
		},
		{
			"espn_event_id": "401856685",
			"kick_ct": "2026-09-19 14:30",
			"weekday": "Sat",
			"tv": "ABC",
			"away": "Florida State",
			"home": "Alabama",
			"away_short": "FSU",
			"home_short": "ALA",
			"away_slug": "florida-state",
			"home_slug": "alabama",
			"neutral": false,
			"hx_fav": "Alabama",
			"hx_home": -22.1,
			"hx_spread_display": "Alabama -22.1",
			"hx_wp": 87.3,
			"home_hx_rating": 5.2998,
			"away_hx_rating": .3063,
			"home_hx_rank": 9,
			"away_hx_rank": 62,
			"vegas_home": -19.5,
			"vegas_details": "ALA -19.5",
			"vegas_ou": 49.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 36,
			"score_home": 50,
			"final_display": "Florida State 36–Alabama 50",
			"mov_home": 14,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 8.1,
			"err_vegas": 5.5,
			"winner_flip": false,
			"flags": [],
			"brier": .016129
		},
		{
			"espn_event_id": "401858457",
			"kick_ct": "2026-09-19 14:30",
			"weekday": "Sat",
			"tv": "CBS",
			"away": "USC",
			"home": "Rutgers",
			"away_short": "USC",
			"home_short": "RUTG",
			"away_slug": "usc",
			"home_slug": "rutgers",
			"neutral": false,
			"hx_fav": "USC",
			"hx_home": 9.3,
			"hx_spread_display": "USC -9.3",
			"hx_wp": 71.5,
			"home_hx_rating": -.105,
			"away_hx_rating": 3.8847,
			"home_hx_rank": 70,
			"away_hx_rank": 21,
			"vegas_home": 23.5,
			"vegas_details": "USC -23.5",
			"vegas_ou": 59.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 42,
			"score_home": 35,
			"final_display": "USC 42–Rutgers 35",
			"mov_home": -7,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 2.3,
			"err_vegas": 16.5,
			"winner_flip": false,
			"flags": [],
			"brier": .081225
		},
		{
			"espn_event_id": "401858230",
			"kick_ct": "2026-09-19 14:30",
			"weekday": "Sat",
			"tv": "ESPN2",
			"away": "SMU",
			"home": "Louisville",
			"away_short": "SMU",
			"home_short": "LOU",
			"away_slug": "smu",
			"home_slug": "louisville",
			"neutral": false,
			"hx_fav": "Louisville",
			"hx_home": -.1,
			"hx_spread_display": "Louisville -0.1",
			"hx_wp": 50.4,
			"home_hx_rating": 3.0061,
			"away_hx_rating": 4.0469,
			"home_hx_rank": 26,
			"away_hx_rank": 20,
			"vegas_home": -1.5,
			"vegas_details": "LOU -1.5",
			"vegas_ou": 59.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 31,
			"score_home": 41,
			"final_display": "SMU 31–Louisville 41",
			"mov_home": 10,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 9.9,
			"err_vegas": 8.5,
			"winner_flip": false,
			"flags": [],
			"brier": .246016
		},
		{
			"espn_event_id": "401856801",
			"kick_ct": "2026-09-19 14:30",
			"weekday": "Sat",
			"tv": "FOX",
			"away": "Utah State",
			"home": "Utah",
			"away_short": "USU",
			"home_short": "UTAH",
			"away_slug": "utah-state",
			"home_slug": "utah",
			"neutral": false,
			"hx_fav": "Utah",
			"hx_home": -21.8,
			"hx_spread_display": "Utah -21.8",
			"hx_wp": 87,
			"home_hx_rating": 4.273,
			"away_hx_rating": -.6356,
			"home_hx_rank": 15,
			"away_hx_rank": 76,
			"vegas_home": -28.5,
			"vegas_details": "UTAH -28.5",
			"vegas_ou": 56.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 0,
			"score_home": 33,
			"final_display": "Utah State 0–Utah 33",
			"mov_home": 33,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 11.2,
			"err_vegas": 4.5,
			"winner_flip": false,
			"flags": [],
			"brier": .0169
		},
		{
			"espn_event_id": "401858450",
			"kick_ct": "2026-09-19 14:30",
			"weekday": "Sat",
			"tv": "BTN",
			"away": "UTEP",
			"home": "Michigan",
			"away_short": "UTEP",
			"home_short": "MICH",
			"away_slug": "utep",
			"home_slug": "michigan",
			"neutral": false,
			"hx_fav": "Michigan",
			"hx_home": -50.6,
			"hx_spread_display": "Michigan -50.6",
			"hx_wp": 97.5,
			"home_hx_rating": 4.8972,
			"away_hx_rating": -5.534,
			"home_hx_rank": 12,
			"away_hx_rank": 132,
			"vegas_home": -35.5,
			"vegas_details": "MICH -35.5",
			"vegas_ou": 48.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 17,
			"score_home": 52,
			"final_display": "UTEP 17–Michigan 52",
			"mov_home": 35,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 15.6,
			"err_vegas": .5,
			"winner_flip": false,
			"flags": [],
			"brier": 625e-6
		},
		{
			"espn_event_id": "401856797",
			"kick_ct": "2026-09-19 14:30",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "Miami (OH)",
			"home": "Cincinnati",
			"away_short": "M-OH",
			"home_short": "CIN",
			"away_slug": "miami-oh",
			"home_slug": "cincinnati",
			"neutral": false,
			"hx_fav": "Cincinnati",
			"hx_home": -3.1,
			"hx_spread_display": "Cincinnati -3.1",
			"hx_wp": 58.2,
			"home_hx_rating": -1.0126,
			"away_hx_rating": -.9706,
			"home_hx_rank": 83,
			"away_hx_rank": 81,
			"vegas_home": -14.5,
			"vegas_details": "CIN -14.5",
			"vegas_ou": 50.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 31,
			"score_home": 35,
			"final_display": "Miami (OH) 31–Cincinnati 35",
			"mov_home": 4,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": .9,
			"err_vegas": 10.5,
			"winner_flip": false,
			"flags": [],
			"brier": .174724
		},
		{
			"espn_event_id": "401858449",
			"kick_ct": "2026-09-19 15:00",
			"weekday": "Sat",
			"tv": "Peacock",
			"away": "Western Kentucky",
			"home": "Indiana",
			"away_short": "WKU",
			"home_short": "IU",
			"away_slug": "western-kentucky",
			"home_slug": "indiana",
			"neutral": false,
			"hx_fav": "Indiana",
			"hx_home": -20.8,
			"hx_spread_display": "Indiana -20.8",
			"hx_wp": 86.1,
			"home_hx_rating": 4.981,
			"away_hx_rating": .3006,
			"home_hx_rank": 11,
			"away_hx_rank": 63,
			"vegas_home": -44.5,
			"vegas_details": "IU -44.5",
			"vegas_ou": 60.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 0,
			"score_home": 38,
			"final_display": "Western Kentucky 0–Indiana 38",
			"mov_home": 38,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 17.2,
			"err_vegas": 6.5,
			"winner_flip": false,
			"flags": [],
			"brier": .019321
		},
		{
			"espn_event_id": "401858231",
			"kick_ct": "2026-09-19 15:00",
			"weekday": "Sat",
			"tv": "CW",
			"away": "Stanford",
			"home": "Duke",
			"away_short": "STAN",
			"home_short": "DUKE",
			"away_slug": "stanford",
			"home_slug": "duke",
			"neutral": false,
			"hx_fav": "Duke",
			"hx_home": -11,
			"hx_spread_display": "Duke -11.0",
			"hx_wp": 74.3,
			"home_hx_rating": 1.5276,
			"away_hx_rating": -.7405,
			"home_hx_rank": 42,
			"away_hx_rank": 79,
			"vegas_home": -9.5,
			"vegas_details": "DUKE -9.5",
			"vegas_ou": 51.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 7,
			"score_home": 35,
			"final_display": "Stanford 7–Duke 35",
			"mov_home": 28,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 17,
			"err_vegas": 18.5,
			"winner_flip": false,
			"flags": [],
			"brier": .066049
		},
		{
			"espn_event_id": "401866422",
			"kick_ct": "2026-09-19 15:00",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "Ball State",
			"home": "Liberty",
			"away_short": "BALL",
			"home_short": "LIB",
			"away_slug": "ball-state",
			"home_slug": "liberty",
			"neutral": false,
			"hx_fav": "Liberty",
			"hx_home": -21.4,
			"hx_spread_display": "Liberty -21.4",
			"hx_wp": 86.7,
			"home_hx_rating": -.5694,
			"away_hx_rating": -5.3987,
			"home_hx_rank": 75,
			"away_hx_rank": 131,
			"vegas_home": -14.5,
			"vegas_details": "LIB -14.5",
			"vegas_ou": 49.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 15,
			"score_home": 51,
			"final_display": "Ball State 15–Liberty 51",
			"mov_home": 36,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 14.6,
			"err_vegas": 21.5,
			"winner_flip": false,
			"flags": [],
			"brier": .017689
		},
		{
			"espn_event_id": "401867804",
			"kick_ct": "2026-09-19 15:00",
			"weekday": "Sat",
			"tv": "ESPNU",
			"away": "Louisiana Tech",
			"home": "Baylor",
			"away_short": "LT",
			"home_short": "BAY",
			"away_slug": "louisiana-tech",
			"home_slug": "baylor",
			"neutral": false,
			"hx_fav": "Baylor",
			"hx_home": -14,
			"hx_spread_display": "Baylor -14.0",
			"hx_wp": 78.9,
			"home_hx_rating": .9892,
			"away_hx_rating": -2.0807,
			"home_hx_rank": 52,
			"away_hx_rank": 101,
			"vegas_home": -19.5,
			"vegas_details": "BAY -19.5",
			"vegas_ou": 53.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 19,
			"score_home": 36,
			"final_display": "Louisiana Tech 19–Baylor 36",
			"mov_home": 17,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 3,
			"err_vegas": 2.5,
			"winner_flip": false,
			"flags": [],
			"brier": .044521
		},
		{
			"espn_event_id": "401856691",
			"kick_ct": "2026-09-19 15:15",
			"weekday": "Sat",
			"tv": "SEC Network",
			"away": "Mississippi State",
			"home": "South Carolina",
			"away_short": "MSST",
			"home_short": "SC",
			"away_slug": "mississippi-state",
			"home_slug": "south-carolina",
			"neutral": false,
			"hx_fav": "South Carolina",
			"hx_home": -12.9,
			"hx_spread_display": "South Carolina -12.9",
			"hx_wp": 77.2,
			"home_hx_rating": 2.9195,
			"away_hx_rating": .1519,
			"home_hx_rank": 27,
			"away_hx_rank": 68,
			"vegas_home": -4,
			"vegas_details": "SC -4",
			"vegas_ou": 59.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 41,
			"score_home": 34,
			"final_display": "Mississippi State 41–South Carolina 34",
			"mov_home": -7,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 19.9,
			"err_vegas": 11,
			"winner_flip": false,
			"flags": [],
			"brier": .595984
		},
		{
			"espn_event_id": "401862710",
			"kick_ct": "2026-09-19 17:00",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "East Carolina",
			"home": "Old Dominion",
			"away_short": "ECU",
			"home_short": "ODU",
			"away_slug": "east-carolina",
			"home_slug": "old-dominion",
			"neutral": false,
			"hx_fav": "Old Dominion",
			"hx_home": -.6,
			"hx_spread_display": "Old Dominion -0.6",
			"hx_wp": 51.7,
			"home_hx_rating": -1.3425,
			"away_hx_rating": -.466,
			"home_hx_rank": 91,
			"away_hx_rank": 74,
			"vegas_home": -3,
			"vegas_details": "ODU -3",
			"vegas_ou": 49.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 20,
			"score_home": 17,
			"final_display": "East Carolina 20–Old Dominion 17",
			"mov_home": -3,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 3.6,
			"err_vegas": 6,
			"winner_flip": false,
			"flags": [],
			"brier": .267289
		},
		{
			"espn_event_id": "401862771",
			"kick_ct": "2026-09-19 17:00",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "Florida International",
			"home": "Florida Atlantic",
			"away_short": "FIU",
			"home_short": "FAU",
			"away_slug": "fiu",
			"home_slug": "florida-atlantic",
			"neutral": false,
			"hx_fav": "Florida Atlantic",
			"hx_home": -3.2,
			"hx_spread_display": "Florida Atlantic -3.2",
			"hx_wp": 58.5,
			"home_hx_rating": -3.0257,
			"away_hx_rating": -3.0218,
			"home_hx_rank": 110,
			"away_hx_rank": 109,
			"vegas_home": -7,
			"vegas_details": "FAU -7",
			"vegas_ou": 62.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 10,
			"score_home": 16,
			"final_display": "Florida International 10–Florida Atlantic 16",
			"mov_home": 6,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 2.8,
			"err_vegas": 1,
			"winner_flip": false,
			"flags": [],
			"brier": .172225
		},
		{
			"espn_event_id": "401864574",
			"kick_ct": "2026-09-19 17:00",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "Charlotte",
			"home": "App State",
			"away_short": "CLT",
			"home_short": "APP",
			"away_slug": "charlotte",
			"home_slug": "app-state",
			"neutral": false,
			"hx_fav": "App State",
			"hx_home": -16.1,
			"hx_spread_display": "App State -16.1",
			"hx_wp": 81.5,
			"home_hx_rating": -2.1887,
			"away_hx_rating": -5.772,
			"home_hx_rank": 103,
			"away_hx_rank": 133,
			"vegas_home": -17.5,
			"vegas_details": "APP -17.5",
			"vegas_ou": 51.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 21,
			"score_home": 26,
			"final_display": "Charlotte 21–App State 26",
			"mov_home": 5,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 11.1,
			"err_vegas": 12.5,
			"winner_flip": false,
			"flags": [],
			"brier": .034225
		},
		{
			"espn_event_id": "401871047",
			"kick_ct": "2026-09-19 17:30",
			"weekday": "Sat",
			"tv": "CBSSN",
			"away": "Marshall",
			"home": "Missouri State",
			"away_short": "MRSH",
			"home_short": "MOST",
			"away_slug": "marshall",
			"home_slug": "missouri-state",
			"neutral": false,
			"hx_fav": "Marshall",
			"hx_home": 5.6,
			"hx_spread_display": "Marshall -5.6",
			"hx_wp": 64.2,
			"home_hx_rating": -2.7278,
			"away_hx_rating": .2097,
			"home_hx_rank": 107,
			"away_hx_rank": 67,
			"vegas_home": 3.5,
			"vegas_details": "MRSH -3.5",
			"vegas_ou": 51.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 30,
			"score_home": 24,
			"final_display": "Marshall 30–Missouri State 24",
			"mov_home": -6,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": .4,
			"err_vegas": 2.5,
			"winner_flip": false,
			"flags": [],
			"brier": .128164
		},
		{
			"espn_event_id": "401856689",
			"kick_ct": "2026-09-19 18:00",
			"weekday": "Sat",
			"tv": "SECN+",
			"away": "Troy",
			"home": "Missouri",
			"away_short": "TROY",
			"home_short": "MIZ",
			"away_slug": "troy",
			"home_slug": "missouri",
			"neutral": false,
			"hx_fav": "Missouri",
			"hx_home": -24.4,
			"hx_spread_display": "Missouri -24.4",
			"hx_wp": 88.9,
			"home_hx_rating": 4.3307,
			"away_hx_rating": -1.1552,
			"home_hx_rank": 14,
			"away_hx_rank": 87,
			"vegas_home": -26.5,
			"vegas_details": "MIZ -26.5",
			"vegas_ou": 50.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 17,
			"score_home": 27,
			"final_display": "Troy 17–Missouri 27",
			"mov_home": 10,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 14.4,
			"err_vegas": 16.5,
			"winner_flip": false,
			"flags": [],
			"brier": .012321
		},
		{
			"espn_event_id": "401856687",
			"kick_ct": "2026-09-19 18:00",
			"weekday": "Sat",
			"tv": "ESPN",
			"away": "Florida",
			"home": "Auburn",
			"away_short": "FLA",
			"home_short": "AUB",
			"away_slug": "florida",
			"home_slug": "auburn",
			"neutral": false,
			"hx_fav": "Florida",
			"hx_home": .5,
			"hx_spread_display": "Florida -0.5",
			"hx_wp": 51.4,
			"home_hx_rating": 2.2318,
			"away_hx_rating": 3.4941,
			"home_hx_rank": 31,
			"away_hx_rank": 24,
			"vegas_home": 2.5,
			"vegas_details": "FLA -2.5",
			"vegas_ou": 53.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 44,
			"score_home": 39,
			"final_display": "Florida 44–Auburn 39",
			"mov_home": -5,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 4.5,
			"err_vegas": 2.5,
			"winner_flip": false,
			"flags": [],
			"brier": .236196
		},
		{
			"espn_event_id": "401856800",
			"kick_ct": "2026-09-19 18:00",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "Georgia State",
			"home": "UCF",
			"away_short": "GAST",
			"home_short": "UCF",
			"away_slug": "georgia-state",
			"home_slug": "ucf",
			"neutral": false,
			"hx_fav": "UCF",
			"hx_home": -16.4,
			"hx_spread_display": "UCF -16.4",
			"hx_wp": 81.8,
			"home_hx_rating": -.6965,
			"away_hx_rating": -4.3578,
			"home_hx_rank": 78,
			"away_hx_rank": 123,
			"vegas_home": -18.5,
			"vegas_details": "UCF -18.5",
			"vegas_ou": 51.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 30,
			"score_home": 44,
			"final_display": "Georgia State 30–UCF 44",
			"mov_home": 14,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 2.4,
			"err_vegas": 4.5,
			"winner_flip": false,
			"flags": [],
			"brier": .033124
		},
		{
			"espn_event_id": "401861963",
			"kick_ct": "2026-09-19 18:00",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "UConn",
			"home": "Southern Miss",
			"away_short": "CONN",
			"home_short": "USM",
			"away_slug": "uconn",
			"home_slug": "southern-miss",
			"neutral": false,
			"hx_fav": "Southern Miss",
			"hx_home": -7.2,
			"hx_spread_display": "Southern Miss -7.2",
			"hx_wp": 67.5,
			"home_hx_rating": -.661,
			"away_hx_rating": -1.8837,
			"home_hx_rank": 77,
			"away_hx_rank": 96,
			"vegas_home": 3,
			"vegas_details": "CONN -3",
			"vegas_ou": 54.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 48,
			"score_home": 20,
			"final_display": "UConn 48–Southern Miss 20",
			"mov_home": -28,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 35.2,
			"err_vegas": 25,
			"winner_flip": true,
			"flags": ["WINNER_FLIP_MISS"],
			"brier": .455625
		},
		{
			"espn_event_id": "401862773",
			"kick_ct": "2026-09-19 18:00",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "Western Michigan",
			"home": "Rice",
			"away_short": "WMU",
			"home_short": "RICE",
			"away_slug": "western-michigan",
			"home_slug": "rice",
			"neutral": false,
			"hx_fav": "Western Michigan",
			"hx_home": 9.8,
			"hx_spread_display": "Western Michigan -9.8",
			"hx_wp": 72.3,
			"home_hx_rating": -3.6543,
			"away_hx_rating": .4693,
			"home_hx_rank": 117,
			"away_hx_rank": 61,
			"vegas_home": 9.5,
			"vegas_details": "WMU -9.5",
			"vegas_ou": 43.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 28,
			"score_home": 21,
			"final_display": "Western Michigan 28–Rice 21",
			"mov_home": -7,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 2.8,
			"err_vegas": 2.5,
			"winner_flip": false,
			"flags": [],
			"brier": .076729
		},
		{
			"espn_event_id": "401864443",
			"kick_ct": "2026-09-19 18:00",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "Nevada",
			"home": "Middle Tennessee",
			"away_short": "NEV",
			"home_short": "MTSU",
			"away_slug": "nevada",
			"home_slug": "middle-tennessee",
			"neutral": false,
			"hx_fav": "Middle Tennessee",
			"hx_home": -5,
			"hx_spread_display": "Middle Tennessee -5.0",
			"hx_wp": 62.7,
			"home_hx_rating": -4.8169,
			"away_hx_rating": -5.3656,
			"home_hx_rank": 126,
			"away_hx_rank": 130,
			"vegas_home": 3.5,
			"vegas_details": "NEV -3.5",
			"vegas_ou": 50.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 20,
			"score_home": 27,
			"final_display": "Nevada 20–Middle Tennessee 27",
			"mov_home": 7,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 2,
			"err_vegas": 10.5,
			"winner_flip": true,
			"flags": ["WINNER_FLIP_HIT"],
			"brier": .139129
		},
		{
			"espn_event_id": "401866423",
			"kick_ct": "2026-09-19 18:00",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "Ohio",
			"home": "South Alabama",
			"away_short": "OHIO",
			"home_short": "USA",
			"away_slug": "ohio",
			"home_slug": "south-alabama",
			"neutral": false,
			"hx_fav": "Ohio",
			"hx_home": 6,
			"hx_spread_display": "Ohio -6.0",
			"hx_wp": 64.9,
			"home_hx_rating": -2.8108,
			"away_hx_rating": .2219,
			"home_hx_rank": 108,
			"away_hx_rank": 65,
			"vegas_home": -4.5,
			"vegas_details": "USA -4.5",
			"vegas_ou": 51.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 36,
			"score_home": 41,
			"final_display": "Ohio 36–South Alabama 41",
			"mov_home": 5,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 11,
			"err_vegas": .5,
			"winner_flip": true,
			"flags": ["WINNER_FLIP_MISS"],
			"brier": .421201
		},
		{
			"espn_event_id": "401869948",
			"kick_ct": "2026-09-19 18:00",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "Georgia Southern",
			"home": "Jacksonville State",
			"away_short": "GASO",
			"home_short": "JVST",
			"away_slug": "georgia-southern",
			"home_slug": "jacksonville-state",
			"neutral": false,
			"hx_fav": "Jacksonville State",
			"hx_home": -6.3,
			"hx_spread_display": "Jacksonville State -6.3",
			"hx_wp": 65.5,
			"home_hx_rating": -.9069,
			"away_hx_rating": -1.8473,
			"home_hx_rank": 80,
			"away_hx_rank": 95,
			"vegas_home": -3,
			"vegas_details": "JXST -3",
			"vegas_ou": 52.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 27,
			"score_home": 31,
			"final_display": "Georgia Southern 27–Jacksonville State 31",
			"mov_home": 4,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 2.3,
			"err_vegas": 1,
			"winner_flip": false,
			"flags": [],
			"brier": .119025
		},
		{
			"espn_event_id": "401858453",
			"kick_ct": "2026-09-19 18:30",
			"weekday": "Sat",
			"tv": "NBC",
			"away": "Michigan State",
			"home": "Notre Dame",
			"away_short": "MSU",
			"home_short": "ND",
			"away_slug": "michigan-state",
			"home_slug": "notre-dame",
			"neutral": false,
			"hx_fav": "Notre Dame",
			"hx_home": -41.9,
			"hx_spread_display": "Notre Dame -41.9",
			"hx_wp": 96,
			"home_hx_rating": 7.0293,
			"away_hx_rating": -1.8991,
			"home_hx_rank": 3,
			"away_hx_rank": 97,
			"vegas_home": -29.5,
			"vegas_details": "ND -29.5",
			"vegas_ou": 52.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 10,
			"score_home": 27,
			"final_display": "Michigan State 10–Notre Dame 27",
			"mov_home": 17,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 24.9,
			"err_vegas": 12.5,
			"winner_flip": false,
			"flags": [],
			"brier": .0016
		},
		{
			"espn_event_id": "401856688",
			"kick_ct": "2026-09-19 18:30",
			"weekday": "Sat",
			"tv": "ABC",
			"away": "LSU",
			"home": "Ole Miss",
			"away_short": "LSU",
			"home_short": "MISS",
			"away_slug": "lsu",
			"home_slug": "ole-miss",
			"neutral": false,
			"hx_fav": "Ole Miss",
			"hx_home": -7.8,
			"hx_spread_display": "Ole Miss -7.8",
			"hx_wp": 68.8,
			"home_hx_rating": 5.4649,
			"away_hx_rating": 4.0619,
			"home_hx_rank": 8,
			"away_hx_rank": 19,
			"vegas_home": 3,
			"vegas_details": "LSU -3",
			"vegas_ou": 59.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 24,
			"score_home": 32,
			"final_display": "LSU 24–Ole Miss 32",
			"mov_home": 8,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": .2,
			"err_vegas": 11,
			"winner_flip": true,
			"flags": ["WINNER_FLIP_HIT"],
			"brier": .097344
		},
		{
			"espn_event_id": "401856795",
			"kick_ct": "2026-09-19 18:30",
			"weekday": "Sat",
			"tv": "CBS",
			"away": "BYU",
			"home": "Colorado State",
			"away_short": "BYU",
			"home_short": "CSU",
			"away_slug": "byu",
			"home_slug": "colorado-state",
			"neutral": false,
			"hx_fav": "BYU",
			"hx_home": 23.2,
			"hx_spread_display": "BYU -23.2",
			"hx_wp": 88.1,
			"home_hx_rating": -3.3335,
			"away_hx_rating": 4.0748,
			"home_hx_rank": 113,
			"away_hx_rank": 18,
			"vegas_home": 17.5,
			"vegas_details": "BYU -17.5",
			"vegas_ou": 52.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 41,
			"score_home": 23,
			"final_display": "BYU 41–Colorado State 23",
			"mov_home": -18,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 5.2,
			"err_vegas": .5,
			"winner_flip": false,
			"flags": [],
			"brier": .014161
		},
		{
			"espn_event_id": "401856690",
			"kick_ct": "2026-09-19 18:30",
			"weekday": "Sat",
			"tv": "ESPN2",
			"away": "New Mexico",
			"home": "Oklahoma",
			"away_short": "UNM",
			"home_short": "OU",
			"away_slug": "new-mexico",
			"home_slug": "oklahoma",
			"neutral": false,
			"hx_fav": "Oklahoma",
			"hx_home": -27.5,
			"hx_spread_display": "Oklahoma -27.5",
			"hx_wp": 90.8,
			"home_hx_rating": 4.1908,
			"away_hx_rating": -1.9549,
			"home_hx_rank": 16,
			"away_hx_rank": 98,
			"vegas_home": -22.5,
			"vegas_details": "OU -22.5",
			"vegas_ou": 46.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 6,
			"score_home": 14,
			"final_display": "New Mexico 6–Oklahoma 14",
			"mov_home": 8,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 19.5,
			"err_vegas": 14.5,
			"winner_flip": false,
			"flags": [],
			"brier": .008464
		},
		{
			"espn_event_id": "401856802",
			"kick_ct": "2026-09-19 18:30",
			"weekday": "Sat",
			"tv": "ACC Network",
			"away": "West Virginia",
			"home": "Virginia",
			"away_short": "WVU",
			"home_short": "UVA",
			"away_slug": "west-virginia",
			"home_slug": "virginia",
			"neutral": true,
			"hx_fav": "Virginia",
			"hx_home": -8.3,
			"hx_spread_display": "Virginia -8.3",
			"hx_wp": 69.7,
			"home_hx_rating": 1.4645,
			"away_hx_rating": -1.1643,
			"home_hx_rank": 45,
			"away_hx_rank": 88,
			"vegas_home": -10,
			"vegas_details": "UVA -10",
			"vegas_ou": 53.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 38,
			"score_home": 27,
			"final_display": "West Virginia 38–Virginia 27",
			"mov_home": -11,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 19.3,
			"err_vegas": 21,
			"winner_flip": false,
			"flags": [],
			"brier": .485809
		},
		{
			"espn_event_id": "401856796",
			"kick_ct": "2026-09-19 18:30",
			"weekday": "Sat",
			"tv": "",
			"away": "Colorado",
			"home": "Northwestern",
			"away_short": "COLO",
			"home_short": "NU",
			"away_slug": "colorado",
			"home_slug": "northwestern",
			"neutral": false,
			"hx_fav": "Northwestern",
			"hx_home": -10.6,
			"hx_spread_display": "Northwestern -10.6",
			"hx_wp": 73.7,
			"home_hx_rating": 1.7547,
			"away_hx_rating": -.4072,
			"home_hx_rank": 36,
			"away_hx_rank": 73,
			"vegas_home": -3.5,
			"vegas_details": "NU -3.5",
			"vegas_ou": 48.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 7,
			"score_home": 41,
			"final_display": "Colorado 7–Northwestern 41",
			"mov_home": 34,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 23.4,
			"err_vegas": 30.5,
			"winner_flip": false,
			"flags": [],
			"brier": .069169
		},
		{
			"espn_event_id": "401858232",
			"kick_ct": "2026-09-19 18:30",
			"weekday": "Sat",
			"tv": "",
			"away": "Virginia Tech",
			"home": "Maryland",
			"away_short": "VT",
			"home_short": "MD",
			"away_slug": "virginia-tech",
			"home_slug": "maryland",
			"neutral": false,
			"hx_fav": "Virginia Tech",
			"hx_home": .9,
			"hx_spread_display": "Virginia Tech -0.9",
			"hx_wp": 52.6,
			"home_hx_rating": -.2269,
			"away_hx_rating": 1.193,
			"home_hx_rank": 71,
			"away_hx_rank": 49,
			"vegas_home": 3,
			"vegas_details": "VT -3",
			"vegas_ou": 53.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 35,
			"score_home": 26,
			"final_display": "Virginia Tech 35–Maryland 26",
			"mov_home": -9,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 8.1,
			"err_vegas": 6,
			"winner_flip": false,
			"flags": [],
			"brier": .224676
		},
		{
			"espn_event_id": "401856692",
			"kick_ct": "2026-09-19 18:45",
			"weekday": "Sat",
			"tv": "SEC Network",
			"away": "Kennesaw State",
			"home": "Tennessee",
			"away_short": "KENN",
			"home_short": "TENN",
			"away_slug": "kennesaw-state",
			"home_slug": "tennessee",
			"neutral": false,
			"hx_fav": "Tennessee",
			"hx_home": -37.2,
			"hx_spread_display": "Tennessee -37.2",
			"hx_wp": 94.8,
			"home_hx_rating": 4.0824,
			"away_hx_rating": -3.9818,
			"home_hx_rank": 17,
			"away_hx_rank": 119,
			"vegas_home": -35.5,
			"vegas_details": "TENN -35.5",
			"vegas_ou": 59.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 9,
			"score_home": 42,
			"final_display": "Kennesaw State 9–Tennessee 42",
			"mov_home": 33,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 4.2,
			"err_vegas": 2.5,
			"winner_flip": false,
			"flags": [],
			"brier": .002704
		},
		{
			"espn_event_id": "401856693",
			"kick_ct": "2026-09-19 19:00",
			"weekday": "Sat",
			"tv": "SECN+",
			"away": "UTSA",
			"home": "Texas",
			"away_short": "UTSA",
			"home_short": "TEX",
			"away_slug": "utsa",
			"home_slug": "texas",
			"neutral": false,
			"hx_fav": "Texas",
			"hx_home": -22.7,
			"hx_spread_display": "Texas -22.7",
			"hx_wp": 87.7,
			"home_hx_rating": 6.4443,
			"away_hx_rating": 1.3293,
			"home_hx_rank": 5,
			"away_hx_rank": 46,
			"vegas_home": -30.5,
			"vegas_details": "TEX -30.5",
			"vegas_ou": 58.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 6,
			"score_home": 30,
			"final_display": "UTSA 6–Texas 30",
			"mov_home": 24,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 1.3,
			"err_vegas": 6.5,
			"winner_flip": false,
			"flags": [],
			"brier": .015129
		},
		{
			"espn_event_id": "401856799",
			"kick_ct": "2026-09-19 19:00",
			"weekday": "Sat",
			"tv": "ESPNU",
			"away": "Arkansas State",
			"home": "TCU",
			"away_short": "ARST",
			"home_short": "TCU",
			"away_slug": "arkansas-state",
			"home_slug": "tcu",
			"neutral": false,
			"hx_fav": "TCU",
			"hx_home": -16.5,
			"hx_spread_display": "TCU -16.5",
			"hx_wp": 82,
			"home_hx_rating": 2.1977,
			"away_hx_rating": -1.4914,
			"home_hx_rank": 32,
			"away_hx_rank": 93,
			"vegas_home": -20.5,
			"vegas_details": "TCU -20.5",
			"vegas_ou": 55.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 7,
			"score_home": 31,
			"final_display": "Arkansas State 7–TCU 31",
			"mov_home": 24,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": 7.5,
			"err_vegas": 3.5,
			"winner_flip": false,
			"flags": [],
			"brier": .0324
		},
		{
			"espn_event_id": "401862776",
			"kick_ct": "2026-09-19 19:00",
			"weekday": "Sat",
			"tv": "ESPN+",
			"away": "UAB",
			"home": "Louisiana",
			"away_short": "UAB",
			"home_short": "UL",
			"away_slug": "uab",
			"home_slug": "louisiana",
			"neutral": false,
			"hx_fav": "Louisiana",
			"hx_home": -6.4,
			"hx_spread_display": "Louisiana -6.4",
			"hx_wp": 65.9,
			"home_hx_rating": -1.0739,
			"away_hx_rating": -2.0599,
			"home_hx_rank": 86,
			"away_hx_rank": 100,
			"vegas_home": -7.5,
			"vegas_details": "UL -7.5",
			"vegas_ou": 56.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 14,
			"score_home": 21,
			"final_display": "UAB 14–Louisiana 21",
			"mov_home": 7,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": .6,
			"err_vegas": .5,
			"winner_flip": false,
			"flags": [],
			"brier": .116281
		},
		{
			"espn_event_id": "401860887",
			"kick_ct": "2026-09-19 21:00",
			"weekday": "Sat",
			"tv": "CW",
			"away": "James Madison",
			"home": "San Diego State",
			"away_short": "JMU",
			"home_short": "SDSU",
			"away_slug": "james-madison",
			"home_slug": "san-diego-state",
			"neutral": false,
			"hx_fav": "San Diego State",
			"hx_home": -1.1,
			"hx_spread_display": "San Diego State -1.1",
			"hx_wp": 52.9,
			"home_hx_rating": .7873,
			"away_hx_rating": 1.5078,
			"home_hx_rank": 55,
			"away_hx_rank": 44,
			"vegas_home": -2.5,
			"vegas_details": "SDSU -2.5",
			"vegas_ou": 46.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 26,
			"score_home": 13,
			"final_display": "James Madison 26–San Diego State 13",
			"mov_home": -13,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": false,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 14.1,
			"err_vegas": 15.5,
			"winner_flip": false,
			"flags": [],
			"brier": .279841
		},
		{
			"espn_event_id": "401856793",
			"kick_ct": "2026-09-19 21:30",
			"weekday": "Sat",
			"tv": "TNT",
			"away": "Northern Illinois",
			"home": "Arizona",
			"away_short": "NIU",
			"home_short": "ARIZ",
			"away_slug": "northern-illinois",
			"home_slug": "arizona",
			"neutral": false,
			"hx_fav": "Arizona",
			"hx_home": -32.7,
			"hx_spread_display": "Arizona -32.7",
			"hx_wp": 93.3,
			"home_hx_rating": 2.3532,
			"away_hx_rating": -4.8554,
			"home_hx_rank": 30,
			"away_hx_rank": 127,
			"vegas_home": -34.5,
			"vegas_details": "ARIZ -34.5",
			"vegas_ou": 49.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 17,
			"score_home": 42,
			"final_display": "Northern Illinois 17–Arizona 42",
			"mov_home": 25,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": false,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 7.7,
			"err_vegas": 9.5,
			"winner_flip": false,
			"flags": [],
			"brier": .004489
		},
		{
			"espn_event_id": "401858458",
			"kick_ct": "2026-09-19 22:00",
			"weekday": "Sat",
			"tv": "BTN",
			"away": "Purdue",
			"home": "UCLA",
			"away_short": "PUR",
			"home_short": "UCLA",
			"away_slug": "purdue",
			"home_slug": "ucla",
			"neutral": false,
			"hx_fav": "UCLA",
			"hx_home": -13.1,
			"hx_spread_display": "UCLA -13.1",
			"hx_wp": 77.6,
			"home_hx_rating": 1.3253,
			"away_hx_rating": -1.5098,
			"home_hx_rank": 47,
			"away_hx_rank": 94,
			"vegas_home": -14.5,
			"vegas_details": "UCLA -14.5",
			"vegas_ou": 52.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 38,
			"score_home": 52,
			"final_display": "Purdue 38–UCLA 52",
			"mov_home": 14,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "vegas",
			"err_hx": .9,
			"err_vegas": .5,
			"winner_flip": false,
			"flags": [],
			"brier": .050176
		},
		{
			"espn_event_id": "401860888",
			"kick_ct": "2026-09-19 22:00",
			"weekday": "Sat",
			"tv": "FS1",
			"away": "Fresno State",
			"home": "San José State",
			"away_short": "FRES",
			"home_short": "SJSU",
			"away_slug": "fresno-state",
			"home_slug": "san-jose-state",
			"neutral": false,
			"hx_fav": "Fresno State",
			"hx_home": 11.1,
			"hx_spread_display": "Fresno State -11.1",
			"hx_wp": 74.6,
			"home_hx_rating": -4.2722,
			"away_hx_rating": .2148,
			"home_hx_rank": 121,
			"away_hx_rank": 66,
			"vegas_home": 6.5,
			"vegas_details": "FRES -6.5",
			"vegas_ou": 50.5,
			"vegas_source": "Research kick/Vegas pack (ESPN/DraftKings close)",
			"hx_source": "Live hashmarkcfb.com/schedule?w=3 homeHx/awayHx → quadratic HX* (Elo 1500+55×HX, HFA 60, 0.0508d+0.0000458d|d|); cross-check metrics/week3_hx_vs_vegas_detail.json",
			"score_away": 26,
			"score_home": 10,
			"final_display": "Fresno State 26–San José State 10",
			"mov_home": -16,
			"score_source": "espn_STATUS_FINAL",
			"su_hit": true,
			"ats_hx_hit": true,
			"ats_push": false,
			"closer": "hx",
			"err_hx": 4.9,
			"err_vegas": 9.5,
			"winner_flip": false,
			"flags": [],
			"brier": .064516
		}
	]
};
var week3_tape_top25_closer_2026_default = {
	meta: {
		"as_of": "2026-09-20 10:06 AM CT",
		"week": 3,
		"season": 2026,
		"universe": "FBS–FBS with ≥1 team in HX Top 25 (live schedule homeRank/awayRank ≤ 25)",
		"n_games": 21,
		"hx_closer": "5/21",
		"hx_closer_pct": 23.8,
		"su": "20/21",
		"su_pct": 95.2,
		"full_slate_closer": "23/56 (41.1%)",
		"source_tape": "/workspace/cfb/week3_tape_2026.json",
		"rank_source": "hashmarkcfb.com/schedule?w=3 homeRank/awayRank"
	},
	games: [
		{
			"espn_event_id": "401858226",
			"kick_ct": "2026-09-18 18:30",
			"matchup": "MIA @ WAKE",
			"away": "Miami",
			"home": "Wake Forest",
			"home_hx_rank": 72,
			"away_hx_rank": 10,
			"hx_spread_display": "Miami -15.0",
			"vegas_details": "MIA -20.5",
			"final": "Miami 33–Wake Forest 20",
			"score_away": 33,
			"score_home": 20,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401856811",
			"kick_ct": "2026-09-18 19:00",
			"matchup": "HOU @ TTU",
			"away": "Houston",
			"home": "Texas Tech",
			"home_hx_rank": 7,
			"away_hx_rank": 41,
			"hx_spread_display": "Texas Tech -18.8",
			"vegas_details": "TTU -7.5",
			"final": "Houston 26–Texas Tech 28",
			"score_away": 26,
			"score_home": 28,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401856686",
			"kick_ct": "2026-09-19 11:00",
			"matchup": "UGA @ ARK",
			"away": "Georgia",
			"home": "Arkansas",
			"home_hx_rank": 59,
			"away_hx_rank": 1,
			"hx_spread_display": "Georgia -22.8",
			"vegas_details": "UGA -25.5",
			"final": "Georgia 45–Arkansas 17",
			"score_away": 45,
			"score_home": 17,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401858454",
			"kick_ct": "2026-09-19 11:00",
			"matchup": "KENT @ OSU",
			"away": "Kent State",
			"home": "Ohio State",
			"home_hx_rank": 2,
			"away_hx_rank": 134,
			"hx_spread_display": "Ohio State -71.7",
			"vegas_details": "OSU -52.5",
			"final": "Kent State 3–Ohio State 59",
			"score_away": 3,
			"score_home": 59,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401858456",
			"kick_ct": "2026-09-19 11:00",
			"matchup": "BUFF @ PSU",
			"away": "Buffalo",
			"home": "Penn State",
			"home_hx_rank": 13,
			"away_hx_rank": 114,
			"hx_spread_display": "Penn State -35.3",
			"vegas_details": "PSU -39.5",
			"final": "Buffalo 13–Penn State 55",
			"score_away": 13,
			"score_home": 55,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401858229",
			"kick_ct": "2026-09-19 11:00",
			"matchup": "UNC @ CLEM",
			"away": "North Carolina",
			"home": "Clemson",
			"home_hx_rank": 22,
			"away_hx_rank": 85,
			"hx_spread_display": "Clemson -21.6",
			"vegas_details": "CLEM -3.5",
			"final": "North Carolina 20–Clemson 28",
			"score_away": 20,
			"score_home": 28,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401856694",
			"kick_ct": "2026-09-19 14:30",
			"matchup": "UK @ TA&M",
			"away": "Kentucky",
			"home": "Texas A&M",
			"home_hx_rank": 6,
			"away_hx_rank": 64,
			"hx_spread_display": "Texas A&M -26.0",
			"vegas_details": "TA&M -16.5",
			"final": "Kentucky 31–Texas A&M 21",
			"score_away": 31,
			"score_home": 21,
			"closer": "vegas",
			"su_hit": false
		},
		{
			"espn_event_id": "401856685",
			"kick_ct": "2026-09-19 14:30",
			"matchup": "FSU @ ALA",
			"away": "Florida State",
			"home": "Alabama",
			"home_hx_rank": 9,
			"away_hx_rank": 62,
			"hx_spread_display": "Alabama -22.1",
			"vegas_details": "ALA -19.5",
			"final": "Florida State 36–Alabama 50",
			"score_away": 36,
			"score_home": 50,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401858457",
			"kick_ct": "2026-09-19 14:30",
			"matchup": "USC @ RUTG",
			"away": "USC",
			"home": "Rutgers",
			"home_hx_rank": 70,
			"away_hx_rank": 21,
			"hx_spread_display": "USC -9.3",
			"vegas_details": "USC -23.5",
			"final": "USC 42–Rutgers 35",
			"score_away": 42,
			"score_home": 35,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401858230",
			"kick_ct": "2026-09-19 14:30",
			"matchup": "SMU @ LOU",
			"away": "SMU",
			"home": "Louisville",
			"home_hx_rank": 26,
			"away_hx_rank": 20,
			"hx_spread_display": "Louisville -0.1",
			"vegas_details": "LOU -1.5",
			"final": "SMU 31–Louisville 41",
			"score_away": 31,
			"score_home": 41,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401856801",
			"kick_ct": "2026-09-19 14:30",
			"matchup": "USU @ UTAH",
			"away": "Utah State",
			"home": "Utah",
			"home_hx_rank": 15,
			"away_hx_rank": 76,
			"hx_spread_display": "Utah -21.8",
			"vegas_details": "UTAH -28.5",
			"final": "Utah State 0–Utah 33",
			"score_away": 0,
			"score_home": 33,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401858450",
			"kick_ct": "2026-09-19 14:30",
			"matchup": "UTEP @ MICH",
			"away": "UTEP",
			"home": "Michigan",
			"home_hx_rank": 12,
			"away_hx_rank": 132,
			"hx_spread_display": "Michigan -50.6",
			"vegas_details": "MICH -35.5",
			"final": "UTEP 17–Michigan 52",
			"score_away": 17,
			"score_home": 52,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401858449",
			"kick_ct": "2026-09-19 15:00",
			"matchup": "WKU @ IU",
			"away": "Western Kentucky",
			"home": "Indiana",
			"home_hx_rank": 11,
			"away_hx_rank": 63,
			"hx_spread_display": "Indiana -20.8",
			"vegas_details": "IU -44.5",
			"final": "Western Kentucky 0–Indiana 38",
			"score_away": 0,
			"score_home": 38,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401856689",
			"kick_ct": "2026-09-19 18:00",
			"matchup": "TROY @ MIZ",
			"away": "Troy",
			"home": "Missouri",
			"home_hx_rank": 14,
			"away_hx_rank": 87,
			"hx_spread_display": "Missouri -24.4",
			"vegas_details": "MIZ -26.5",
			"final": "Troy 17–Missouri 27",
			"score_away": 17,
			"score_home": 27,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401856687",
			"kick_ct": "2026-09-19 18:00",
			"matchup": "FLA @ AUB",
			"away": "Florida",
			"home": "Auburn",
			"home_hx_rank": 31,
			"away_hx_rank": 24,
			"hx_spread_display": "Florida -0.5",
			"vegas_details": "FLA -2.5",
			"final": "Florida 44–Auburn 39",
			"score_away": 44,
			"score_home": 39,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401858453",
			"kick_ct": "2026-09-19 18:30",
			"matchup": "MSU @ ND",
			"away": "Michigan State",
			"home": "Notre Dame",
			"home_hx_rank": 3,
			"away_hx_rank": 97,
			"hx_spread_display": "Notre Dame -41.9",
			"vegas_details": "ND -29.5",
			"final": "Michigan State 10–Notre Dame 27",
			"score_away": 10,
			"score_home": 27,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401856688",
			"kick_ct": "2026-09-19 18:30",
			"matchup": "LSU @ MISS",
			"away": "LSU",
			"home": "Ole Miss",
			"home_hx_rank": 8,
			"away_hx_rank": 19,
			"hx_spread_display": "Ole Miss -7.8",
			"vegas_details": "LSU -3",
			"final": "LSU 24–Ole Miss 32",
			"score_away": 24,
			"score_home": 32,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401856795",
			"kick_ct": "2026-09-19 18:30",
			"matchup": "BYU @ CSU",
			"away": "BYU",
			"home": "Colorado State",
			"home_hx_rank": 113,
			"away_hx_rank": 18,
			"hx_spread_display": "BYU -23.2",
			"vegas_details": "BYU -17.5",
			"final": "BYU 41–Colorado State 23",
			"score_away": 41,
			"score_home": 23,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401856690",
			"kick_ct": "2026-09-19 18:30",
			"matchup": "UNM @ OU",
			"away": "New Mexico",
			"home": "Oklahoma",
			"home_hx_rank": 16,
			"away_hx_rank": 98,
			"hx_spread_display": "Oklahoma -27.5",
			"vegas_details": "OU -22.5",
			"final": "New Mexico 6–Oklahoma 14",
			"score_away": 6,
			"score_home": 14,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401856692",
			"kick_ct": "2026-09-19 18:45",
			"matchup": "KENN @ TENN",
			"away": "Kennesaw State",
			"home": "Tennessee",
			"home_hx_rank": 17,
			"away_hx_rank": 119,
			"hx_spread_display": "Tennessee -37.2",
			"vegas_details": "TENN -35.5",
			"final": "Kennesaw State 9–Tennessee 42",
			"score_away": 9,
			"score_home": 42,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401856693",
			"kick_ct": "2026-09-19 19:00",
			"matchup": "UTSA @ TEX",
			"away": "UTSA",
			"home": "Texas",
			"home_hx_rank": 5,
			"away_hx_rank": 46,
			"hx_spread_display": "Texas -22.7",
			"vegas_details": "TEX -30.5",
			"final": "UTSA 6–Texas 30",
			"score_away": 6,
			"score_home": 30,
			"closer": "hx",
			"su_hit": true
		}
	]
};
var sim_10k_2026_hx2026_4_default = {
	meta: {
		"n_sims": 1e4,
		"seed": 20260913,
		"as_of": "2026-09-13",
		"as_of_tz": "America/Chicago",
		"hx_source": "/workspace/data/week2_od_hx_ship_2026.json",
		"hx_policy": "live HX 2026.4 from week2_od_hx_ship_2026.json hx_post (Week-2 O/D + ΔHX); matchup = board",
		"c20_policy": "od_matchup.hx_star for matchup draws (Connelly residual 10)",
		"c20_teams": [
			{
				"team": "Florida",
				"hx_board": 3.4941,
				"adj_hx": -.012,
				"hx_star": 3.494
			},
			{
				"team": "North Texas",
				"hx_board": -2.1752,
				"adj_hx": .018,
				"hx_star": -2.175
			},
			{
				"team": "Oklahoma State",
				"hx_board": -1.1959,
				"adj_hx": -.001,
				"hx_star": -1.196
			},
			{
				"team": "Ole Miss",
				"hx_board": 5.4649,
				"adj_hx": -.027,
				"hx_star": 5.465
			},
			{
				"team": "Oregon State",
				"hx_board": -1.0472,
				"adj_hx": .038,
				"hx_star": -1.047
			},
			{
				"team": "South Florida",
				"hx_board": .127,
				"adj_hx": -.043,
				"hx_star": .127
			},
			{
				"team": "Stanford",
				"hx_board": -.7405,
				"adj_hx": .018,
				"hx_star": -.741
			},
			{
				"team": "Tulane",
				"hx_board": -1.1648,
				"adj_hx": -.01,
				"hx_star": -1.165
			},
			{
				"team": "UConn",
				"hx_board": -1.8837,
				"adj_hx": -.001,
				"hx_star": -1.884
			},
			{
				"team": "Virginia Tech",
				"hx_board": 1.193,
				"adj_hx": .017,
				"hx_star": 1.193
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
			"remaining_fcs_games": 32,
			"n_fcs_games_listed": 85
		},
		"schedule": {
			"source": "hashmark-repo/migrations/0003_seed.sql + Week 0–2 FINAL stamps",
			"n_schedule_games_fbs_involved": 739,
			"n_locked_finals": 92,
			"n_remaining_draws": 647,
			"incomplete_rs_under_12": [
				{
					"team": "Alabama",
					"games_listed": 11
				},
				{
					"team": "Army",
					"games_listed": 11
				},
				{
					"team": "Auburn",
					"games_listed": 11
				},
				{
					"team": "Ball State",
					"games_listed": 11
				},
				{
					"team": "Boise State",
					"games_listed": 10
				},
				{
					"team": "Boston College",
					"games_listed": 11
				},
				{
					"team": "Bowling Green",
					"games_listed": 11
				},
				{
					"team": "Buffalo",
					"games_listed": 11
				},
				{
					"team": "California",
					"games_listed": 11
				},
				{
					"team": "Central Michigan",
					"games_listed": 11
				},
				{
					"team": "Clemson",
					"games_listed": 11
				},
				{
					"team": "Colorado State",
					"games_listed": 11
				},
				{
					"team": "Duke",
					"games_listed": 11
				},
				{
					"team": "East Carolina",
					"games_listed": 11
				},
				{
					"team": "Eastern Michigan",
					"games_listed": 10
				},
				{
					"team": "Florida Atlantic",
					"games_listed": 11
				},
				{
					"team": "Florida International",
					"games_listed": 11
				},
				{
					"team": "Florida State",
					"games_listed": 11
				},
				{
					"team": "Fresno State",
					"games_listed": 11
				},
				{
					"team": "Georgia Tech",
					"games_listed": 11
				},
				{
					"team": "Hawai'i",
					"games_listed": 10
				},
				{
					"team": "Illinois",
					"games_listed": 11
				},
				{
					"team": "Iowa",
					"games_listed": 11
				},
				{
					"team": "Jacksonville State",
					"games_listed": 11
				},
				{
					"team": "Kent State",
					"games_listed": 11
				},
				{
					"team": "LSU",
					"games_listed": 11
				},
				{
					"team": "Marshall",
					"games_listed": 11
				},
				{
					"team": "Massachusetts",
					"games_listed": 10
				},
				{
					"team": "Memphis",
					"games_listed": 11
				},
				{
					"team": "Mississippi State",
					"games_listed": 11
				},
				{
					"team": "Navy",
					"games_listed": 11
				},
				{
					"team": "Nebraska",
					"games_listed": 11
				},
				{
					"team": "Nevada",
					"games_listed": 11
				},
				{
					"team": "New Mexico",
					"games_listed": 11
				},
				{
					"team": "North Texas",
					"games_listed": 11
				},
				{
					"team": "Northern Illinois",
					"games_listed": 11
				},
				{
					"team": "Ohio",
					"games_listed": 10
				},
				{
					"team": "Oklahoma State",
					"games_listed": 11
				},
				{
					"team": "Ole Miss",
					"games_listed": 11
				},
				{
					"team": "Oregon",
					"games_listed": 11
				},
				{
					"team": "Oregon State",
					"games_listed": 10
				},
				{
					"team": "Pittsburgh",
					"games_listed": 11
				},
				{
					"team": "Rutgers",
					"games_listed": 11
				},
				{
					"team": "Sam Houston",
					"games_listed": 11
				},
				{
					"team": "San Diego State",
					"games_listed": 11
				},
				{
					"team": "South Florida",
					"games_listed": 11
				},
				{
					"team": "Stanford",
					"games_listed": 11
				},
				{
					"team": "Texas A&M",
					"games_listed": 11
				},
				{
					"team": "Texas State",
					"games_listed": 10
				},
				{
					"team": "Toledo",
					"games_listed": 11
				},
				{
					"team": "Tulsa",
					"games_listed": 11
				},
				{
					"team": "UAB",
					"games_listed": 11
				},
				{
					"team": "UL Monroe",
					"games_listed": 11
				},
				{
					"team": "UNLV",
					"games_listed": 11
				},
				{
					"team": "UTEP",
					"games_listed": 11
				},
				{
					"team": "Utah State",
					"games_listed": 11
				},
				{
					"team": "Wake Forest",
					"games_listed": 11
				},
				{
					"team": "Washington",
					"games_listed": 11
				},
				{
					"team": "Washington State",
					"games_listed": 10
				},
				{
					"team": "Western Kentucky",
					"games_listed": 11
				},
				{
					"team": "Wyoming",
					"games_listed": 11
				}
			],
			"incomplete_note": "Teams listing under 12 games were not given invented opponents."
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
		"runtime_sec": 3.08,
		"hx_stamp": "HX 2026.4",
		"note": "Re-sim on live HX 2026.4 after Week 2 O/D + ΔHX. Make-field and win-title are separate draws. Georgia locked 75.26 / 21.59."
	},
	teams: [
		{
			"name": "Notre Dame",
			"slug": "notre-dame",
			"conference": "Independent",
			"hx_board": 7.0293,
			"hx_matchup": 7.029,
			"make_field": 89.27,
			"win_title": 17.57,
			"proj_wins": 10.731,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Texas Tech",
			"slug": "texas-tech",
			"conference": "Big 12",
			"hx_board": 5.8395,
			"hx_matchup": 5.84,
			"make_field": 86.45,
			"win_title": 9.48,
			"proj_wins": 11.109,
			"conf_title": 56.14,
			"schedule_games_listed": 12
		},
		{
			"name": "Georgia",
			"slug": "georgia",
			"conference": "SEC",
			"hx_board": 7.9055,
			"hx_matchup": 7.905,
			"make_field": 75.26,
			"win_title": 21.59,
			"proj_wins": 10.498,
			"conf_title": 48.54,
			"schedule_games_listed": 12
		},
		{
			"name": "Miami",
			"slug": "miami",
			"conference": "ACC",
			"hx_board": 5.2345,
			"hx_matchup": 5.234,
			"make_field": 71.08,
			"win_title": 5.24,
			"proj_wins": 10.196,
			"conf_title": 48.19,
			"schedule_games_listed": 12
		},
		{
			"name": "Ohio State",
			"slug": "ohio-state",
			"conference": "Big Ten",
			"hx_board": 7.8131,
			"hx_matchup": 7.813,
			"make_field": 59.57,
			"win_title": 14.89,
			"proj_wins": 9.536,
			"conf_title": 46.5,
			"schedule_games_listed": 12
		},
		{
			"name": "SMU",
			"slug": "smu",
			"conference": "ACC",
			"hx_board": 4.0469,
			"hx_matchup": 4.047,
			"make_field": 54.57,
			"win_title": 1.54,
			"proj_wins": 9.573,
			"conf_title": 27.9,
			"schedule_games_listed": 12
		},
		{
			"name": "Texas",
			"slug": "texas",
			"conference": "SEC",
			"hx_board": 6.4443,
			"hx_matchup": 6.444,
			"make_field": 51.49,
			"win_title": 6.29,
			"proj_wins": 9.225,
			"conf_title": 18.69,
			"schedule_games_listed": 12
		},
		{
			"name": "Utah",
			"slug": "utah",
			"conference": "Big 12",
			"hx_board": 4.273,
			"hx_matchup": 4.273,
			"make_field": 50.49,
			"win_title": 1.93,
			"proj_wins": 9.484,
			"conf_title": 19.28,
			"schedule_games_listed": 12
		},
		{
			"name": "UTSA",
			"slug": "utsa",
			"conference": "American",
			"hx_board": 1.3293,
			"hx_matchup": 1.329,
			"make_field": 45.26,
			"win_title": .12,
			"proj_wins": 9.34,
			"conf_title": 38.37,
			"schedule_games_listed": 12
		},
		{
			"name": "James Madison",
			"slug": "james-madison",
			"conference": "Sun Belt",
			"hx_board": 1.5078,
			"hx_matchup": 1.508,
			"make_field": 44.82,
			"win_title": .21,
			"proj_wins": 9.29,
			"conf_title": 39.14,
			"schedule_games_listed": 12
		},
		{
			"name": "Penn State",
			"slug": "penn-state",
			"conference": "Big Ten",
			"hx_board": 4.3342,
			"hx_matchup": 4.334,
			"make_field": 43.92,
			"win_title": 1.48,
			"proj_wins": 9.171,
			"conf_title": 6.3,
			"schedule_games_listed": 12
		},
		{
			"name": "BYU",
			"slug": "byu",
			"conference": "Big 12",
			"hx_board": 4.0748,
			"hx_matchup": 4.075,
			"make_field": 39.63,
			"win_title": 1.21,
			"proj_wins": 9.023,
			"conf_title": 17.34,
			"schedule_games_listed": 12
		},
		{
			"name": "Oregon",
			"slug": "oregon",
			"conference": "Big Ten",
			"hx_board": 6.9056,
			"hx_matchup": 6.906,
			"make_field": 38.57,
			"win_title": 6.91,
			"proj_wins": 8.192,
			"conf_title": 29.88,
			"schedule_games_listed": 11
		},
		{
			"name": "Indiana",
			"slug": "indiana",
			"conference": "Big Ten",
			"hx_board": 4.981,
			"hx_matchup": 4.981,
			"make_field": 37.31,
			"win_title": 2.03,
			"proj_wins": 8.872,
			"conf_title": 8.01,
			"schedule_games_listed": 12
		},
		{
			"name": "Michigan",
			"slug": "michigan",
			"conference": "Big Ten",
			"hx_board": 4.8972,
			"hx_matchup": 4.897,
			"make_field": 27.42,
			"win_title": 1.31,
			"proj_wins": 8.564,
			"conf_title": 4.67,
			"schedule_games_listed": 12
		},
		{
			"name": "Texas A&M",
			"slug": "texas-am",
			"conference": "SEC",
			"hx_board": 6.1292,
			"hx_matchup": 6.129,
			"make_field": 23.84,
			"win_title": 2.5,
			"proj_wins": 8.022,
			"conf_title": 11.98,
			"schedule_games_listed": 11
		},
		{
			"name": "Toledo",
			"slug": "toledo",
			"conference": "MAC",
			"hx_board": 1.5151,
			"hx_matchup": 1.515,
			"make_field": 23.55,
			"win_title": .1,
			"proj_wins": 8.409,
			"conf_title": 40.46,
			"schedule_games_listed": 11
		},
		{
			"name": "Kansas State",
			"slug": "kansas-state",
			"conference": "Big 12",
			"hx_board": 2.3903,
			"hx_matchup": 2.39,
			"make_field": 19.47,
			"win_title": .16,
			"proj_wins": 8.264,
			"conf_title": 3,
			"schedule_games_listed": 12
		},
		{
			"name": "Memphis",
			"slug": "memphis",
			"conference": "American",
			"hx_board": 1.1066,
			"hx_matchup": 1.107,
			"make_field": 18.68,
			"win_title": .05,
			"proj_wins": 8.358,
			"conf_title": 33.44,
			"schedule_games_listed": 11
		},
		{
			"name": "Western Michigan",
			"slug": "western-michigan",
			"conference": "MAC",
			"hx_board": .4693,
			"hx_matchup": .469,
			"make_field": 17.9,
			"win_title": 0,
			"proj_wins": 8.231,
			"conf_title": 25.44,
			"schedule_games_listed": 12
		},
		{
			"name": "Alabama",
			"slug": "alabama",
			"conference": "SEC",
			"hx_board": 5.2998,
			"hx_matchup": 5.3,
			"make_field": 17.52,
			"win_title": .97,
			"proj_wins": 7.811,
			"conf_title": 7.31,
			"schedule_games_listed": 11
		},
		{
			"name": "Tennessee",
			"slug": "tennessee",
			"conference": "SEC",
			"hx_board": 4.0824,
			"hx_matchup": 4.082,
			"make_field": 15.36,
			"win_title": .36,
			"proj_wins": 7.996,
			"conf_title": 1.59,
			"schedule_games_listed": 12
		},
		{
			"name": "Liberty",
			"slug": "liberty",
			"conference": "CUSA",
			"hx_board": -.5694,
			"hx_matchup": -.569,
			"make_field": 15.14,
			"win_title": 0,
			"proj_wins": 8.157,
			"conf_title": 27.39,
			"schedule_games_listed": 12
		},
		{
			"name": "Louisville",
			"slug": "louisville",
			"conference": "ACC",
			"hx_board": 3.0061,
			"hx_matchup": 3.006,
			"make_field": 14.01,
			"win_title": .26,
			"proj_wins": 7.796,
			"conf_title": 7.33,
			"schedule_games_listed": 12
		},
		{
			"name": "Ole Miss",
			"slug": "ole-miss",
			"conference": "SEC",
			"hx_board": 5.4649,
			"hx_matchup": 5.465,
			"make_field": 13.84,
			"win_title": .88,
			"proj_wins": 7.558,
			"conf_title": 6.25,
			"schedule_games_listed": 11
		},
		{
			"name": "Virginia",
			"slug": "virginia",
			"conference": "ACC",
			"hx_board": 1.4645,
			"hx_matchup": 1.464,
			"make_field": 13.19,
			"win_title": .08,
			"proj_wins": 8.055,
			"conf_title": 1.84,
			"schedule_games_listed": 12
		},
		{
			"name": "Missouri",
			"slug": "missouri",
			"conference": "SEC",
			"hx_board": 4.3307,
			"hx_matchup": 4.331,
			"make_field": 12.79,
			"win_title": .51,
			"proj_wins": 7.785,
			"conf_title": 2.06,
			"schedule_games_listed": 12
		},
		{
			"name": "UNLV",
			"slug": "unlv",
			"conference": "Mountain West",
			"hx_board": 1.7329,
			"hx_matchup": 1.733,
			"make_field": 12.35,
			"win_title": .03,
			"proj_wins": 8.23,
			"conf_title": 61.97,
			"schedule_games_listed": 11
		},
		{
			"name": "South Florida",
			"slug": "usf",
			"conference": "American",
			"hx_board": .127,
			"hx_matchup": .127,
			"make_field": 12.22,
			"win_title": .01,
			"proj_wins": 7.955,
			"conf_title": 12.1,
			"schedule_games_listed": 11
		},
		{
			"name": "Clemson",
			"slug": "clemson",
			"conference": "ACC",
			"hx_board": 3.8288,
			"hx_matchup": 3.829,
			"make_field": 11.98,
			"win_title": .3,
			"proj_wins": 7.324,
			"conf_title": 9.95,
			"schedule_games_listed": 11
		},
		{
			"name": "USC",
			"slug": "usc",
			"conference": "Big Ten",
			"hx_board": 3.8847,
			"hx_matchup": 3.885,
			"make_field": 10.78,
			"win_title": .3,
			"proj_wins": 7.792,
			"conf_title": 1.22,
			"schedule_games_listed": 12
		},
		{
			"name": "Miami (OH)",
			"slug": "miami-oh",
			"conference": "MAC",
			"hx_board": -.9706,
			"hx_matchup": -.971,
			"make_field": 8,
			"win_title": .01,
			"proj_wins": 7.615,
			"conf_title": 12.79,
			"schedule_games_listed": 12
		},
		{
			"name": "NC State",
			"slug": "nc-state",
			"conference": "ACC",
			"hx_board": 2.1175,
			"hx_matchup": 2.118,
			"make_field": 7.78,
			"win_title": .06,
			"proj_wins": 7.499,
			"conf_title": 1.72,
			"schedule_games_listed": 12
		},
		{
			"name": "Houston",
			"slug": "houston",
			"conference": "Big 12",
			"hx_board": 1.6041,
			"hx_matchup": 1.604,
			"make_field": 7.56,
			"win_title": 0,
			"proj_wins": 7.596,
			"conf_title": .98,
			"schedule_games_listed": 12
		},
		{
			"name": "Louisiana",
			"slug": "louisiana",
			"conference": "Sun Belt",
			"hx_board": -1.0739,
			"hx_matchup": -1.074,
			"make_field": 6.12,
			"win_title": 0,
			"proj_wins": 7.297,
			"conf_title": 11.07,
			"schedule_games_listed": 12
		},
		{
			"name": "Marshall",
			"slug": "marshall",
			"conference": "Sun Belt",
			"hx_board": .2097,
			"hx_matchup": .21,
			"make_field": 5.39,
			"win_title": 0,
			"proj_wins": 7.21,
			"conf_title": 20.02,
			"schedule_games_listed": 11
		},
		{
			"name": "Iowa",
			"slug": "iowa",
			"conference": "Big Ten",
			"hx_board": 3.7416,
			"hx_matchup": 3.742,
			"make_field": 4.33,
			"win_title": .04,
			"proj_wins": 7.152,
			"conf_title": 1.56,
			"schedule_games_listed": 11
		},
		{
			"name": "Southern Miss",
			"slug": "southern-miss",
			"conference": "Sun Belt",
			"hx_board": -.661,
			"hx_matchup": -.661,
			"make_field": 3.87,
			"win_title": 0,
			"proj_wins": 6.726,
			"conf_title": 10.4,
			"schedule_games_listed": 12
		},
		{
			"name": "Jacksonville State",
			"slug": "jacksonville-state",
			"conference": "CUSA",
			"hx_board": -.9069,
			"hx_matchup": -.907,
			"make_field": 3.66,
			"win_title": 0,
			"proj_wins": 7.055,
			"conf_title": 18.41,
			"schedule_games_listed": 11
		},
		{
			"name": "LSU",
			"slug": "lsu",
			"conference": "SEC",
			"hx_board": 4.0619,
			"hx_matchup": 4.062,
			"make_field": 3.44,
			"win_title": .06,
			"proj_wins": 6.834,
			"conf_title": 1.28,
			"schedule_games_listed": 11
		},
		{
			"name": "UCLA",
			"slug": "ucla",
			"conference": "Big Ten",
			"hx_board": 1.3253,
			"hx_matchup": 1.325,
			"make_field": 3.39,
			"win_title": .02,
			"proj_wins": 7.239,
			"conf_title": .27,
			"schedule_games_listed": 12
		},
		{
			"name": "Florida",
			"slug": "florida",
			"conference": "SEC",
			"hx_board": 3.4941,
			"hx_matchup": 3.494,
			"make_field": 3.29,
			"win_title": .08,
			"proj_wins": 6.854,
			"conf_title": .34,
			"schedule_games_listed": 12
		},
		{
			"name": "Troy",
			"slug": "troy",
			"conference": "Sun Belt",
			"hx_board": -1.1552,
			"hx_matchup": -1.155,
			"make_field": 2.97,
			"win_title": 0,
			"proj_wins": 6.832,
			"conf_title": 4.18,
			"schedule_games_listed": 12
		},
		{
			"name": "Washington",
			"slug": "washington",
			"conference": "Big Ten",
			"hx_board": 3.2867,
			"hx_matchup": 3.287,
			"make_field": 2.78,
			"win_title": .02,
			"proj_wins": 6.809,
			"conf_title": .89,
			"schedule_games_listed": 11
		},
		{
			"name": "Oklahoma",
			"slug": "oklahoma",
			"conference": "SEC",
			"hx_board": 4.1908,
			"hx_matchup": 4.191,
			"make_field": 2.72,
			"win_title": .1,
			"proj_wins": 6.444,
			"conf_title": 1.23,
			"schedule_games_listed": 12
		},
		{
			"name": "Arizona",
			"slug": "arizona",
			"conference": "Big 12",
			"hx_board": 2.3532,
			"hx_matchup": 2.353,
			"make_field": 2.69,
			"win_title": .02,
			"proj_wins": 6.864,
			"conf_title": .67,
			"schedule_games_listed": 12
		},
		{
			"name": "App State",
			"slug": "app-state",
			"conference": "Sun Belt",
			"hx_board": -2.1887,
			"hx_matchup": -2.189,
			"make_field": 2.39,
			"win_title": 0,
			"proj_wins": 6.801,
			"conf_title": 2.17,
			"schedule_games_listed": 12
		},
		{
			"name": "Vanderbilt",
			"slug": "vanderbilt",
			"conference": "SEC",
			"hx_board": 2.4299,
			"hx_matchup": 2.43,
			"make_field": 2.16,
			"win_title": .01,
			"proj_wins": 6.47,
			"conf_title": .29,
			"schedule_games_listed": 12
		},
		{
			"name": "South Carolina",
			"slug": "south-carolina",
			"conference": "SEC",
			"hx_board": 2.9195,
			"hx_matchup": 2.92,
			"make_field": 2.05,
			"win_title": .06,
			"proj_wins": 6.511,
			"conf_title": .36,
			"schedule_games_listed": 12
		},
		{
			"name": "New Mexico",
			"slug": "new-mexico",
			"conference": "Mountain West",
			"hx_board": -1.9549,
			"hx_matchup": -1.955,
			"make_field": 2.02,
			"win_title": 0,
			"proj_wins": 6.947,
			"conf_title": 6.12,
			"schedule_games_listed": 11
		},
		{
			"name": "Virginia Tech",
			"slug": "virginia-tech",
			"conference": "ACC",
			"hx_board": 1.193,
			"hx_matchup": 1.193,
			"make_field": 1.99,
			"win_title": 0,
			"proj_wins": 6.743,
			"conf_title": .34,
			"schedule_games_listed": 12
		},
		{
			"name": "Duke",
			"slug": "duke",
			"conference": "ACC",
			"hx_board": 1.5276,
			"hx_matchup": 1.528,
			"make_field": 1.89,
			"win_title": .01,
			"proj_wins": 6.679,
			"conf_title": .78,
			"schedule_games_listed": 11
		},
		{
			"name": "TCU",
			"slug": "tcu",
			"conference": "Big 12",
			"hx_board": 2.1977,
			"hx_matchup": 2.198,
			"make_field": 1.81,
			"win_title": 0,
			"proj_wins": 6.481,
			"conf_title": 1.09,
			"schedule_games_listed": 12
		},
		{
			"name": "Ohio",
			"slug": "ohio",
			"conference": "MAC",
			"hx_board": .2219,
			"hx_matchup": .222,
			"make_field": 1.81,
			"win_title": 0,
			"proj_wins": 6.837,
			"conf_title": 17.68,
			"schedule_games_listed": 10
		},
		{
			"name": "Arkansas State",
			"slug": "arkansas-state",
			"conference": "Sun Belt",
			"hx_board": -1.4914,
			"hx_matchup": -1.491,
			"make_field": 1.67,
			"win_title": 0,
			"proj_wins": 6.456,
			"conf_title": 4.91,
			"schedule_games_listed": 12
		},
		{
			"name": "Tulane",
			"slug": "tulane",
			"conference": "American",
			"hx_board": -1.1648,
			"hx_matchup": -1.165,
			"make_field": 1.63,
			"win_title": 0,
			"proj_wins": 6.306,
			"conf_title": 3.61,
			"schedule_games_listed": 12
		},
		{
			"name": "Baylor",
			"slug": "baylor",
			"conference": "Big 12",
			"hx_board": .9892,
			"hx_matchup": .989,
			"make_field": 1.21,
			"win_title": 0,
			"proj_wins": 6.138,
			"conf_title": .23,
			"schedule_games_listed": 12
		},
		{
			"name": "Arizona State",
			"slug": "arizona-state",
			"conference": "Big 12",
			"hx_board": 1.6269,
			"hx_matchup": 1.627,
			"make_field": 1.19,
			"win_title": 0,
			"proj_wins": 6.289,
			"conf_title": .55,
			"schedule_games_listed": 12
		},
		{
			"name": "Fresno State",
			"slug": "fresno-state",
			"conference": "Mountain West",
			"hx_board": .2148,
			"hx_matchup": .215,
			"make_field": 1.19,
			"win_title": 0,
			"proj_wins": 6.26,
			"conf_title": 9.51,
			"schedule_games_listed": 11
		},
		{
			"name": "Old Dominion",
			"slug": "old-dominion",
			"conference": "Sun Belt",
			"hx_board": -1.3425,
			"hx_matchup": -1.343,
			"make_field": 1.19,
			"win_title": 0,
			"proj_wins": 5.973,
			"conf_title": 3.95,
			"schedule_games_listed": 12
		},
		{
			"name": "Pittsburgh",
			"slug": "pittsburgh",
			"conference": "ACC",
			"hx_board": .8784,
			"hx_matchup": .878,
			"make_field": 1.11,
			"win_title": 0,
			"proj_wins": 6.532,
			"conf_title": .46,
			"schedule_games_listed": 11
		},
		{
			"name": "Georgia Tech",
			"slug": "georgia-tech",
			"conference": "ACC",
			"hx_board": 1.6339,
			"hx_matchup": 1.634,
			"make_field": 1.07,
			"win_title": 0,
			"proj_wins": 5.206,
			"conf_title": 1.06,
			"schedule_games_listed": 11
		},
		{
			"name": "San Diego State",
			"slug": "san-diego-state",
			"conference": "Mountain West",
			"hx_board": .7873,
			"hx_matchup": .787,
			"make_field": .99,
			"win_title": 0,
			"proj_wins": 6.037,
			"conf_title": 5.34,
			"schedule_games_listed": 11
		},
		{
			"name": "Iowa State",
			"slug": "iowa-state",
			"conference": "Big 12",
			"hx_board": .8494,
			"hx_matchup": .849,
			"make_field": .88,
			"win_title": 0,
			"proj_wins": 6.218,
			"conf_title": .33,
			"schedule_games_listed": 12
		},
		{
			"name": "Northwestern",
			"slug": "northwestern",
			"conference": "Big Ten",
			"hx_board": 1.7547,
			"hx_matchup": 1.755,
			"make_field": .86,
			"win_title": 0,
			"proj_wins": 6.222,
			"conf_title": .1,
			"schedule_games_listed": 12
		},
		{
			"name": "UConn",
			"slug": "uconn",
			"conference": "Independent",
			"hx_board": -1.8837,
			"hx_matchup": -1.884,
			"make_field": .7,
			"win_title": 0,
			"proj_wins": 6.397,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Wisconsin",
			"slug": "wisconsin",
			"conference": "Big Ten",
			"hx_board": 1.1067,
			"hx_matchup": 1.107,
			"make_field": .66,
			"win_title": 0,
			"proj_wins": 6.164,
			"conf_title": .19,
			"schedule_games_listed": 12
		},
		{
			"name": "Delaware",
			"slug": "delaware",
			"conference": "CUSA",
			"hx_board": -2.5905,
			"hx_matchup": -2.591,
			"make_field": .63,
			"win_title": 0,
			"proj_wins": 5.659,
			"conf_title": 3.43,
			"schedule_games_listed": 12
		},
		{
			"name": "Boise State",
			"slug": "boise-state",
			"conference": "Mountain West",
			"hx_board": 1.3042,
			"hx_matchup": 1.304,
			"make_field": .59,
			"win_title": 0,
			"proj_wins": 6.005,
			"conf_title": 9.13,
			"schedule_games_listed": 10
		},
		{
			"name": "Georgia Southern",
			"slug": "georgia-southern",
			"conference": "Sun Belt",
			"hx_board": -1.8473,
			"hx_matchup": -1.847,
			"make_field": .57,
			"win_title": 0,
			"proj_wins": 5.359,
			"conf_title": 1.59,
			"schedule_games_listed": 12
		},
		{
			"name": "Western Kentucky",
			"slug": "western-kentucky",
			"conference": "CUSA",
			"hx_board": .3006,
			"hx_matchup": .301,
			"make_field": .54,
			"win_title": 0,
			"proj_wins": 6.484,
			"conf_title": 44.71,
			"schedule_games_listed": 11
		},
		{
			"name": "Kansas",
			"slug": "kansas",
			"conference": "Big 12",
			"hx_board": .7774,
			"hx_matchup": .777,
			"make_field": .5,
			"win_title": 0,
			"proj_wins": 5.77,
			"conf_title": .21,
			"schedule_games_listed": 12
		},
		{
			"name": "Coastal Carolina",
			"slug": "coastal-carolina",
			"conference": "Sun Belt",
			"hx_board": -2.055,
			"hx_matchup": -2.055,
			"make_field": .5,
			"win_title": 0,
			"proj_wins": 5.562,
			"conf_title": 1.88,
			"schedule_games_listed": 12
		},
		{
			"name": "Minnesota",
			"slug": "minnesota",
			"conference": "Big Ten",
			"hx_board": 1.8794,
			"hx_matchup": 1.879,
			"make_field": .49,
			"win_title": 0,
			"proj_wins": 5.795,
			"conf_title": .14,
			"schedule_games_listed": 12
		},
		{
			"name": "Tulsa",
			"slug": "tulsa",
			"conference": "American",
			"hx_board": -3.2034,
			"hx_matchup": -3.203,
			"make_field": .47,
			"win_title": 0,
			"proj_wins": 6.132,
			"conf_title": .6,
			"schedule_games_listed": 11
		},
		{
			"name": "San José State",
			"slug": "san-jose-state",
			"conference": "Mountain West",
			"hx_board": -4.2722,
			"hx_matchup": -4.272,
			"make_field": .38,
			"win_title": 0,
			"proj_wins": 5.817,
			"conf_title": 1.47,
			"schedule_games_listed": 12
		},
		{
			"name": "Nebraska",
			"slug": "nebraska",
			"conference": "Big Ten",
			"hx_board": 1.9862,
			"hx_matchup": 1.986,
			"make_field": .36,
			"win_title": .01,
			"proj_wins": 5.898,
			"conf_title": .09,
			"schedule_games_listed": 11
		},
		{
			"name": "California",
			"slug": "california",
			"conference": "ACC",
			"hx_board": .572,
			"hx_matchup": .572,
			"make_field": .35,
			"win_title": 0,
			"proj_wins": 4.947,
			"conf_title": .33,
			"schedule_games_listed": 11
		},
		{
			"name": "East Carolina",
			"slug": "east-carolina",
			"conference": "American",
			"hx_board": -.466,
			"hx_matchup": -.466,
			"make_field": .33,
			"win_title": 0,
			"proj_wins": 5.769,
			"conf_title": 8.45,
			"schedule_games_listed": 11
		},
		{
			"name": "Louisiana Tech",
			"slug": "louisiana-tech",
			"conference": "CUSA",
			"hx_board": -2.0807,
			"hx_matchup": -2.081,
			"make_field": .33,
			"win_title": 0,
			"proj_wins": 5.767,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "North Texas",
			"slug": "north-texas",
			"conference": "American",
			"hx_board": -2.1752,
			"hx_matchup": -2.175,
			"make_field": .26,
			"win_title": 0,
			"proj_wins": 5.618,
			"conf_title": 1.49,
			"schedule_games_listed": 11
		},
		{
			"name": "Missouri State",
			"slug": "missouri-state",
			"conference": "CUSA",
			"hx_board": -2.7278,
			"hx_matchup": -2.728,
			"make_field": .26,
			"win_title": 0,
			"proj_wins": 5.326,
			"conf_title": 2.46,
			"schedule_games_listed": 12
		},
		{
			"name": "Florida International",
			"slug": "fiu",
			"conference": "CUSA",
			"hx_board": -3.0218,
			"hx_matchup": -3.022,
			"make_field": .25,
			"win_title": 0,
			"proj_wins": 5.467,
			"conf_title": 2.3,
			"schedule_games_listed": 11
		},
		{
			"name": "Maryland",
			"slug": "maryland",
			"conference": "Big Ten",
			"hx_board": -.2269,
			"hx_matchup": -.227,
			"make_field": .2,
			"win_title": 0,
			"proj_wins": 5.662,
			"conf_title": .01,
			"schedule_games_listed": 12
		},
		{
			"name": "Colorado",
			"slug": "colorado",
			"conference": "Big 12",
			"hx_board": -.4072,
			"hx_matchup": -.407,
			"make_field": .19,
			"win_title": 0,
			"proj_wins": 4.865,
			"conf_title": .11,
			"schedule_games_listed": 12
		},
		{
			"name": "Auburn",
			"slug": "auburn",
			"conference": "SEC",
			"hx_board": 2.2318,
			"hx_matchup": 2.232,
			"make_field": .16,
			"win_title": 0,
			"proj_wins": 5.18,
			"conf_title": .07,
			"schedule_games_listed": 11
		},
		{
			"name": "Illinois",
			"slug": "illinois",
			"conference": "Big Ten",
			"hx_board": 1.635,
			"hx_matchup": 1.635,
			"make_field": .15,
			"win_title": 0,
			"proj_wins": 5.173,
			"conf_title": .15,
			"schedule_games_listed": 11
		},
		{
			"name": "Akron",
			"slug": "akron",
			"conference": "MAC",
			"hx_board": -3.5592,
			"hx_matchup": -3.559,
			"make_field": .13,
			"win_title": 0,
			"proj_wins": 5.251,
			"conf_title": .78,
			"schedule_games_listed": 12
		},
		{
			"name": "UAB",
			"slug": "uab",
			"conference": "American",
			"hx_board": -2.0599,
			"hx_matchup": -2.06,
			"make_field": .12,
			"win_title": 0,
			"proj_wins": 5.146,
			"conf_title": .88,
			"schedule_games_listed": 11
		},
		{
			"name": "West Virginia",
			"slug": "west-virginia",
			"conference": "Big 12",
			"hx_board": -1.1643,
			"hx_matchup": -1.164,
			"make_field": .1,
			"win_title": 0,
			"proj_wins": 5.239,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Temple",
			"slug": "temple",
			"conference": "American",
			"hx_board": -3.311,
			"hx_matchup": -3.311,
			"make_field": .1,
			"win_title": 0,
			"proj_wins": 5.172,
			"conf_title": .31,
			"schedule_games_listed": 12
		},
		{
			"name": "UCF",
			"slug": "ucf",
			"conference": "Big 12",
			"hx_board": -.6965,
			"hx_matchup": -.697,
			"make_field": .09,
			"win_title": 0,
			"proj_wins": 5.053,
			"conf_title": .04,
			"schedule_games_listed": 12
		},
		{
			"name": "South Alabama",
			"slug": "south-alabama",
			"conference": "Sun Belt",
			"hx_board": -2.8108,
			"hx_matchup": -2.811,
			"make_field": .08,
			"win_title": 0,
			"proj_wins": 4.852,
			"conf_title": .57,
			"schedule_games_listed": 12
		},
		{
			"name": "North Carolina",
			"slug": "north-carolina",
			"conference": "ACC",
			"hx_board": -1.0477,
			"hx_matchup": -1.048,
			"make_field": .06,
			"win_title": 0,
			"proj_wins": 4.859,
			"conf_title": .03,
			"schedule_games_listed": 12
		},
		{
			"name": "Georgia State",
			"slug": "georgia-state",
			"conference": "Sun Belt",
			"hx_board": -4.3578,
			"hx_matchup": -4.358,
			"make_field": .06,
			"win_title": 0,
			"proj_wins": 4.933,
			"conf_title": .1,
			"schedule_games_listed": 12
		},
		{
			"name": "Cincinnati",
			"slug": "cincinnati",
			"conference": "Big 12",
			"hx_board": -1.0126,
			"hx_matchup": -1.013,
			"make_field": .05,
			"win_title": 0,
			"proj_wins": 5.036,
			"conf_title": .01,
			"schedule_games_listed": 12
		},
		{
			"name": "Florida Atlantic",
			"slug": "florida-atlantic",
			"conference": "American",
			"hx_board": -3.0257,
			"hx_matchup": -3.026,
			"make_field": .05,
			"win_title": 0,
			"proj_wins": 4.941,
			"conf_title": .54,
			"schedule_games_listed": 11
		},
		{
			"name": "Rice",
			"slug": "rice",
			"conference": "American",
			"hx_board": -3.6543,
			"hx_matchup": -3.654,
			"make_field": .05,
			"win_title": 0,
			"proj_wins": 4.434,
			"conf_title": .19,
			"schedule_games_listed": 12
		},
		{
			"name": "Wake Forest",
			"slug": "wake-forest",
			"conference": "ACC",
			"hx_board": -.2499,
			"hx_matchup": -.25,
			"make_field": .04,
			"win_title": 0,
			"proj_wins": 4.754,
			"conf_title": .03,
			"schedule_games_listed": 11
		},
		{
			"name": "Buffalo",
			"slug": "buffalo",
			"conference": "MAC",
			"hx_board": -3.3653,
			"hx_matchup": -3.365,
			"make_field": .04,
			"win_title": 0,
			"proj_wins": 4.812,
			"conf_title": 1.26,
			"schedule_games_listed": 11
		},
		{
			"name": "Wyoming",
			"slug": "wyoming",
			"conference": "Mountain West",
			"hx_board": -3.7796,
			"hx_matchup": -3.78,
			"make_field": .04,
			"win_title": 0,
			"proj_wins": 5.177,
			"conf_title": .49,
			"schedule_games_listed": 11
		},
		{
			"name": "Florida State",
			"slug": "florida-state",
			"conference": "ACC",
			"hx_board": .3063,
			"hx_matchup": .306,
			"make_field": .03,
			"win_title": 0,
			"proj_wins": 4.088,
			"conf_title": .03,
			"schedule_games_listed": 11
		},
		{
			"name": "Rutgers",
			"slug": "rutgers",
			"conference": "Big Ten",
			"hx_board": -.105,
			"hx_matchup": -.105,
			"make_field": .02,
			"win_title": 0,
			"proj_wins": 4.005,
			"conf_title": .02,
			"schedule_games_listed": 11
		},
		{
			"name": "Utah State",
			"slug": "utah-state",
			"conference": "Mountain West",
			"hx_board": -.6356,
			"hx_matchup": -.636,
			"make_field": .02,
			"win_title": 0,
			"proj_wins": 4.803,
			"conf_title": 1.27,
			"schedule_games_listed": 11
		},
		{
			"name": "Oklahoma State",
			"slug": "oklahoma-state",
			"conference": "Big 12",
			"hx_board": -1.1959,
			"hx_matchup": -1.196,
			"make_field": .02,
			"win_title": 0,
			"proj_wins": 3.918,
			"conf_title": .02,
			"schedule_games_listed": 11
		},
		{
			"name": "Central Michigan",
			"slug": "central-michigan",
			"conference": "MAC",
			"hx_board": -3.3662,
			"hx_matchup": -3.366,
			"make_field": .02,
			"win_title": 0,
			"proj_wins": 4.589,
			"conf_title": .44,
			"schedule_games_listed": 11
		},
		{
			"name": "Kentucky",
			"slug": "kentucky",
			"conference": "SEC",
			"hx_board": .2914,
			"hx_matchup": .291,
			"make_field": .01,
			"win_title": 0,
			"proj_wins": 3.988,
			"conf_title": .01,
			"schedule_games_listed": 12
		},
		{
			"name": "Boston College",
			"slug": "boston-college",
			"conference": "ACC",
			"hx_board": -2.3224,
			"hx_matchup": -2.322,
			"make_field": .01,
			"win_title": 0,
			"proj_wins": 3.054,
			"conf_title": .01,
			"schedule_games_listed": 11
		},
		{
			"name": "Colorado State",
			"slug": "colorado-state",
			"conference": "Mountain West",
			"hx_board": -3.3335,
			"hx_matchup": -3.333,
			"make_field": .01,
			"win_title": 0,
			"proj_wins": 3.936,
			"conf_title": .53,
			"schedule_games_listed": 11
		},
		{
			"name": "Army",
			"slug": "army",
			"conference": "American",
			"hx_board": -4.3454,
			"hx_matchup": -4.345,
			"make_field": .01,
			"win_title": 0,
			"proj_wins": 4.224,
			"conf_title": .01,
			"schedule_games_listed": 11
		},
		{
			"name": "Middle Tennessee",
			"slug": "middle-tennessee",
			"conference": "CUSA",
			"hx_board": -4.8169,
			"hx_matchup": -4.817,
			"make_field": .01,
			"win_title": 0,
			"proj_wins": 4.363,
			"conf_title": .19,
			"schedule_games_listed": 12
		},
		{
			"name": "Nevada",
			"slug": "nevada",
			"conference": "Mountain West",
			"hx_board": -5.3656,
			"hx_matchup": -5.366,
			"make_field": .01,
			"win_title": 0,
			"proj_wins": 4.077,
			"conf_title": .28,
			"schedule_games_listed": 11
		},
		{
			"name": "Washington State",
			"slug": "washington-state",
			"conference": "Pac-12",
			"hx_board": .7819,
			"hx_matchup": .782,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 4.404,
			"conf_title": 56.8,
			"schedule_games_listed": 10
		},
		{
			"name": "Texas State",
			"slug": "texas-state",
			"conference": "Sun Belt",
			"hx_board": .7288,
			"hx_matchup": .729,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 4.826,
			"conf_title": 0,
			"schedule_games_listed": 10
		},
		{
			"name": "Arkansas",
			"slug": "arkansas",
			"conference": "SEC",
			"hx_board": .5882,
			"hx_matchup": .588,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 4.006,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Mississippi State",
			"slug": "mississippi-state",
			"conference": "SEC",
			"hx_board": .1519,
			"hx_matchup": .152,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 4.2,
			"conf_title": 0,
			"schedule_games_listed": 11
		},
		{
			"name": "Stanford",
			"slug": "stanford",
			"conference": "ACC",
			"hx_board": -.7405,
			"hx_matchup": -.741,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.459,
			"conf_title": 0,
			"schedule_games_listed": 11
		},
		{
			"name": "Hawai'i",
			"slug": "hawaii",
			"conference": "Mountain West",
			"hx_board": -.9715,
			"hx_matchup": -.972,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 5.557,
			"conf_title": 3.87,
			"schedule_games_listed": 10
		},
		{
			"name": "Oregon State",
			"slug": "oregon-state",
			"conference": "Pac-12",
			"hx_board": -1.0472,
			"hx_matchup": -1.047,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.784,
			"conf_title": 43.2,
			"schedule_games_listed": 10
		},
		{
			"name": "Syracuse",
			"slug": "syracuse",
			"conference": "ACC",
			"hx_board": -1.3481,
			"hx_matchup": -1.348,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.701,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Purdue",
			"slug": "purdue",
			"conference": "Big Ten",
			"hx_board": -1.5098,
			"hx_matchup": -1.51,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.257,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Michigan State",
			"slug": "michigan-state",
			"conference": "Big Ten",
			"hx_board": -1.8991,
			"hx_matchup": -1.899,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 4.037,
			"conf_title": 0,
			"schedule_games_listed": 12
		},
		{
			"name": "Eastern Michigan",
			"slug": "eastern-michigan",
			"conference": "MAC",
			"hx_board": -2.7134,
			"hx_matchup": -2.713,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.539,
			"conf_title": .86,
			"schedule_games_listed": 10
		},
		{
			"name": "Kennesaw State",
			"slug": "kennesaw-state",
			"conference": "CUSA",
			"hx_board": -3.9818,
			"hx_matchup": -3.982,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 4.271,
			"conf_title": .52,
			"schedule_games_listed": 12
		},
		{
			"name": "Sam Houston",
			"slug": "sam-houston",
			"conference": "CUSA",
			"hx_board": -4.2139,
			"hx_matchup": -4.214,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.108,
			"conf_title": .4,
			"schedule_games_listed": 11
		},
		{
			"name": "Bowling Green",
			"slug": "bowling-green",
			"conference": "MAC",
			"hx_board": -4.3634,
			"hx_matchup": -4.363,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 4.274,
			"conf_title": .17,
			"schedule_games_listed": 11
		},
		{
			"name": "New Mexico State",
			"slug": "new-mexico-state",
			"conference": "CUSA",
			"hx_board": -4.7265,
			"hx_matchup": -4.726,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.884,
			"conf_title": .19,
			"schedule_games_listed": 12
		},
		{
			"name": "Northern Illinois",
			"slug": "northern-illinois",
			"conference": "MAC",
			"hx_board": -4.8554,
			"hx_matchup": -4.855,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.498,
			"conf_title": 0,
			"schedule_games_listed": 11
		},
		{
			"name": "UL Monroe",
			"slug": "ul-monroe",
			"conference": "Sun Belt",
			"hx_board": -4.9694,
			"hx_matchup": -4.969,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 2.421,
			"conf_title": .02,
			"schedule_games_listed": 11
		},
		{
			"name": "Navy",
			"slug": "navy",
			"conference": "American",
			"hx_board": -5.0846,
			"hx_matchup": -5.085,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.715,
			"conf_title": 0,
			"schedule_games_listed": 11
		},
		{
			"name": "Ball State",
			"slug": "ball-state",
			"conference": "MAC",
			"hx_board": -5.3987,
			"hx_matchup": -5.399,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.759,
			"conf_title": .12,
			"schedule_games_listed": 11
		},
		{
			"name": "UTEP",
			"slug": "utep",
			"conference": "CUSA",
			"hx_board": -5.534,
			"hx_matchup": -5.534,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 4.049,
			"conf_title": 0,
			"schedule_games_listed": 11
		},
		{
			"name": "Charlotte",
			"slug": "charlotte",
			"conference": "American",
			"hx_board": -5.772,
			"hx_matchup": -5.772,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.323,
			"conf_title": .01,
			"schedule_games_listed": 12
		},
		{
			"name": "Kent State",
			"slug": "kent-state",
			"conference": "MAC",
			"hx_board": -5.8934,
			"hx_matchup": -5.893,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.04,
			"conf_title": 0,
			"schedule_games_listed": 11
		},
		{
			"name": "Air Force",
			"slug": "air-force",
			"conference": "Mountain West",
			"hx_board": -6.4701,
			"hx_matchup": -6.47,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 3.934,
			"conf_title": .02,
			"schedule_games_listed": 12
		},
		{
			"name": "Massachusetts",
			"slug": "massachusetts",
			"conference": "MAC",
			"hx_board": -8.922,
			"hx_matchup": -8.922,
			"make_field": 0,
			"win_title": 0,
			"proj_wins": 2.175,
			"conf_title": 0,
			"schedule_games_listed": 10
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
*   data/sim_10k_2026_hx2026_4.json
*/
/** Research desk flags on the Week 4 ballot. Mississippi State (−43) leads the |delta| sort after these. */
var DISAGREE_HIGHLIGHT_NAMES = [
	"Texas A&M",
	"Oregon",
	"Houston",
	"LSU",
	"USC",
	"BYU"
];
var hxApGaps = week4_hx_vs_ap_gaps_2026_default;
var week3TapePack = week3_tape_2026_default;
var week3Top25Pack = week3_tape_top25_closer_2026_default;
var sim10k = sim_10k_2026_hx2026_4_default;
var AP_SLUG_BY_NAME = new Map(week4_ap_top25_2026_default.teams.flatMap((t) => {
	const names = [t.school];
	if (t.slug === "usc") names.push("USC");
	if (t.slug === "miami") names.push("Miami");
	if (t.slug === "ole-miss") names.push("Ole Miss");
	return names.map((n) => [n, t.slug]);
}));
var SIM_10K_NOTE = `HX 2026.4 · 10k draws · as_of ${sim10k.meta.as_of}`;
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
/** Research Week 3 tape mapped onto the board chrome shape. Headline numbers only from the pack. */
function week3Tape() {
	const m = week3TapePack.meta;
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
		source: "Research week3_tape_2026 · FBS–FBS n=56 · ESPN FINALs"
	};
}
function week3SeasonTape() {
	const m = week3TapePack.meta;
	return {
		label: "W1–W3",
		weeks: [
			1,
			2,
			3
		],
		su: m.season_w1_w3_su_frac,
		su_pct: pctFromLabeled(m.season_w1_w3_su),
		hx_closer: m.season_w1_w3_closer_frac,
		hx_closer_pct: pctFromLabeled(m.season_w1_w3_closer),
		note: "Week 1–3 rollup from Research week3_tape_2026"
	};
}
function week3BoardFlags() {
	const byEspn = new Map(week3TapePack.games.map((g) => [g.espn_event_id, g]));
	return [...week3TapePack.winner_flip_hits.map((row) => ({
		result: "HIT",
		row
	})), ...week3TapePack.winner_flip_misses.map((row) => ({
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
function week3Top25Tape() {
	const m = week3Top25Pack.meta;
	const vegasN = week3Top25Pack.games.filter((g) => g.closer === "vegas").length;
	return {
		n: m.n_games,
		su: m.su,
		su_pct: m.su_pct,
		hx_closer: m.hx_closer,
		hx_closer_pct: m.hx_closer_pct,
		vegas_closer: `${vegasN}/${m.n_games}`,
		source: "Research week3_tape_top25_closer_2026 · HX Top 25 involvement n=21 · ESPN FINALs"
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
* Make-field and win-title from HX 2026.4 10k draws (sim_10k_2026_hx2026_4.json).
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
var $$splitComponentImporter$2 = () => import("./edge_.sim-B_ACdzI4.mjs");
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
var $$splitComponentImporter$1 = () => import("./stories._slug-CdCSpXW-.mjs");
var Route$2 = createFileRoute("/stories/$slug")({
	loader: ({ params }) => {
		const story = getStory(params.slug);
		if (!story) throw notFound();
		return story;
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.headline} · HASHMARK` : "Story · HASHMARK" }] })
});
var $$splitComponentImporter = () => import("./teams._slug-oAMxe-RB.mjs");
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
	const { handleEdgePackDownload } = await import("./edge-pack-files.server-DD7Fdf3H.mjs");
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
export { PageHead as $, Route$8 as A, favoriteLine as B, week3BoardFlags as C, Route$4 as D, week3Top25Tape as E, Route$11 as F, spreadGap as G, featuredSlateWeek as H, Route$13 as I, EDGE as J, Button as K, Route$14 as L, defaultWeek as M, Route$10 as N, Route$6 as O, YEARS as P, EdgePackStrip as Q, Route$17 as R, odTermLabel as S, week3Tape as T, formatVegas as U, featuredBook as V, selectWeekScopedFeatured as W, EdgeBuyButton as X, EDGE_SUPPORT_EMAIL as Y, EdgeCheckoutNote as Z, make12FieldLabel as _, WEEK0_SLATE as a, fmtHeight as at, make12TitleLabel as b, SCENARIO_SIM_GOLDEN_EVENT_ID as c, inConf as ct, formatScenarioError as d, Panel as et, isScenarioSimUnlocked as f, buildSeasonSchedule as g, buildRemainingSchedule as h, Route$3 as i, deltaVsAp as it, Route$9 as j, Route$7 as k, SCENARIO_SIM_GOLDEN_FORCE as l, runDemoScenarioSim as m, Route$1 as n, apLabel as nt, SCENARIO_SIM_DEMO_LABEL as o, fmtNum as ot, loadScenarioSimGoldenRequest as p, ConfPills as q, Route$2 as r, cn as rt, SCENARIO_SIM_GOLDEN_BUMP as s, fmtPct as st, router_exports as t, TeamSelect as tt, buildScenarioRequest as u, make12FromSim as v, week3SeasonTape as w, boardDisagreementRows as x, make12PanelLede as y, AP_STAMP as z };
