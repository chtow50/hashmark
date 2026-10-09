import { o as __toESM } from "../_runtime.mjs";
import { l as todayChicago, n as addDaysYmd, t as MODEL } from "./chicago-DFO_OETY.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useRouter, S as useNavigate, Z as notFound, _ as Outlet, b as createRootRoute, d as Scripts, f as HeadContent, h as createRouter, p as useRouterState, v as lazyRouteComponent, w as require_jsx_runtime, x as Link, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as string, i as object, n as literal, o as union, r as number, t as boolean } from "../_libs/zod.mjs";
import { n as TriangleAlert, o as Menu, r as Search, t as X, u as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Analytics } from "../_libs/vercel__analytics.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-BNuyUTDq.js
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
//#region node_modules/.nitro/vite/services/ssr/assets/featured-BIrK5pyi.js
/**
* Last stamped AP ballot on the live board.
* HX chrome is Week 6. AP is the last stamped poll (Week 5, Sept. 27) —
* not a Week 4 ballot. No Week 6 AP yet — do not invent one.
*/
var AP_STAMP = {
	week: 5,
	asOf: "Sept. 27",
	label: "Week 5 AP",
	columnHint: "W5 stamp",
	vsHx: "last stamped AP (Week 5, Sept. 27)",
	lede: "HX is Week 6. AP is the last stamped poll (Week 5, Sept. 27) — not a Week 4 ballot."
};
/** Thursday night flag: Colorado at Georgia Tech, Bobby Dodd. */
var WEEK1_FLAG = {
	homeSlug: "georgia-tech",
	awaySlug: "colorado"
};
/**
* Friday ESPN: Pittsburgh at Virginia Tech. Schedule-page pin for
* `/schedule?w=5`. Fri 2026-10-02 18:00 CT · ESPN · VT −3.5 / 52.5.
* Historical Week 5 pin — home desk now uses WEEK6_FEATURED.
* BOARD_WEEK is 6.
*/
var WEEK5_FEATURED = {
	homeSlug: "virginia-tech",
	awaySlug: "pittsburgh"
};
/**
* Friday ESPN: Iowa State at BYU. Schedule-page pin for
* `/schedule?w=6` and the home desk featured card.
* Fri 2026-10-09 21:15 CT · ESPN · BYU −10.5 / 48.5
* (Oct 5 CLEAR restamp; was −14.5 / 50.5).
* Day-risk: HM labels Saturday, Oct 10; ESPN CT is Friday.
* Home desk FEATURED_SLATE_WEEK is 6 and prefers this pin over the
* earliest Week 6 kick. BOARD_WEEK is 6.
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
* Board featured for the live featured slate (Week 6).
* Prefers the Week 6 Research pin (Iowa State @ BYU) via
* `selectWeekScopedFeatured(FEATURED_SLATE_WEEK, …)`. Falls back to the
* earliest upcoming kick only when the pin is missing or FINAL.
* Week 2–5 Research pins stay historical helpers. Never a FINAL. Never
* FCS. Never invent a book or matchup. Blank Vegas stays blank.
*/
function selectBoardFeaturedKick(slate, nowMs) {
	const pinned = selectWeekScopedFeatured(6, slate);
	if (pinned && isUpcomingKick(pinned, nowMs)) return pinned;
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
* cards kick earlier. The homepage desk uses FEATURED_SLATE_WEEK (6) and
* the same Week 6 pin via `selectBoardFeaturedKick`. Never invents a matchup.
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
/** Same-favorite gap of at least SPREAD_GAP_MIN_PTS. A 0.0 gap (HX = Vegas) is not a flag. */
function isNotableSpreadGap(hxSpread, bookSpread) {
	const gap = spreadGap(hxSpread, bookSpread);
	return gap != null && Math.abs(gap) >= 4;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/stories-BsX3-O3s.js
var STORY_DATE = "Friday, Aug 28, 2026";
var STORY_DATE_WEEK1 = "Friday, Sep 4, 2026";
var STORY_DATE_TAPE = "Tuesday, Sep 8, 2026";
var STORY_DATE_TAPE_WEEK2 = "Sunday, Sep 13, 2026";
var STORY_DATE_TAPE_WEEK3 = "Sunday, Sep 20, 2026";
var STORY_DATE_TAPE_WEEK4 = "Sunday, Sep 27, 2026";
var STORY_DATE_WEEK3 = "Friday, Sep 18, 2026";
var STORY_DATE_WEEK4 = "Friday, Sep 25, 2026";
var STORY_DATE_WEEK5 = "Friday, Oct 2, 2026";
var STORIES = [
	{
		slug: "week-5-tape",
		kicker: "Week 5 tape",
		headline: "Week 5 tape: 39/55 SU, 20/55 closer FLAG.",
		dek: "Full slate closer is a FLAG. Soft-cal FLAG stays. HX not retuned.",
		date: "Sunday, Oct 4, 2026",
		body: [
			"Week 5 SU 39/55 (70.9%). HX closer to the final than Vegas 20/55 (36.4%) — FLAG, under 45%. Vegas closer 35/55. Ties 0. FBS–FBS only, n=55. Season W1–W5 arithmetic, not a fresh audit of Weeks 1–4: SU 78.7% (203/258) · closer 39.9% (103/258). Soft-cal FLAG. This week’s ledger, not a retune.",
			"Stored file ATS is 26/55 (47.3%). This desk did not re-derive that ATS rule. Full-slate MAE HX 14.87 / Vegas 13.19. Brier 0.195. Research Vegas books + ESPN FINALs. Soft-cal FLAG. all-D still in force. HX not retuned.",
			"Sixteen SU misses, HX favorites: Western Kentucky @ New Mexico State, North Texas @ Tulsa, Pittsburgh @ Virginia Tech, Penn State @ Northwestern, Michigan @ Minnesota, Syracuse @ UConn, Navy @ Air Force, Old Dominion @ Georgia State, Bowling Green @ Miami (OH), Kentucky @ South Carolina, Purdue @ Illinois, Georgia Southern @ Coastal Carolina, Temple @ South Florida, Fresno State @ Washington State, Baylor @ Arizona State, San José State @ Hawaiʻi.",
			"Winner-flip hits: Florida @ Missouri, Eastern Michigan @ Massachusetts, Louisville @ NC State, Virginia @ Florida State, Army @ Louisiana Tech, Texas State @ San Diego State. Winner-flip misses: Western Kentucky @ New Mexico State, Syracuse @ UConn, Navy @ Air Force, Old Dominion @ Georgia State, Georgia Southern @ Coastal Carolina. Two overtime cards in the new stamps: Syracuse 42–UConn 41 and Kentucky 35–South Carolina 34. The schedule card has no overtime badge, so those rows stamp as FINAL with the score only. North Texas 45–44 Tulsa was already live.",
			"Top 25 involvement on the HX 2026.6 pregame board (n=15, hx_rank ≤25): closer 7/15 (46.7%), SU 13/15. That cut uses the Week 4 rule on this week’s CLEARed finals. It is not the Research headline and it does not clear the full-slate FLAG."
		],
		whyItMatters: "Fifth public ledger of 2026. Full slate closer is a FLAG. Soft-cal FLAG stays. HX not retuned.",
		sources: [{
			label: "HASHMARK Board",
			href: "https://hashmarkcfb.com/"
		}, {
			label: "HASHMARK Schedule",
			href: "https://hashmarkcfb.com/schedule?w=5"
		}]
	},
	{
		slug: "week-5-florida-missouri",
		kicker: "Week 5 · Winner flip",
		headline: "Vegas has Florida −4.5. HX has Missouri −5.6.",
		dek: "AP’s new No. 8 road favorite — and HASHMARK flips the card in Columbia.",
		date: STORY_DATE_WEEK5,
		body: [
			"No. 8 Florida visits No. 25 Missouri on Saturday (2:30 CT, ABC). Live HASHMARK posts a winner flip: Missouri −5.6 / 64.1%. The sourced Vegas close on the schedule is Florida −4.5, O/U 56.5 — roughly a 10-point HX–market disagreement and the only ranked-vs-ranked flip on the Week 5 board.",
			"HX ranks Missouri 15th (4.26) against an AP Week 5 ballot that dropped the Tigers from 19 to 25 after the Miss State loss. Florida sits HX 24th (3.52) while AP vaulted the Gators 13 spots to 8 after the 52–28 win over Ole Miss (NCAA / AP Week 5). That is a −16 HX–ballot gap on the road favorite — HX still treats Sumrall’s start as mid-20s talent, not a top-10 ballot surge.",
			"Injury cloud is sourced. Florida WR Vernell Brown III (knee) and WR Bailey Stockton (back) opened the week questionable; RB Kelvin Jimenez is out (knee). Missouri lists RB Ahmad Hardy out among five outs on the Thursday availability report (Florida athletics / On3). Stick to the number on hashmarkcfb.com/schedule. Do not invent snaps."
		],
		whyItMatters: "Primetime ranked winner flip + HX’s Florida under-rank vs the biggest AP riser of the week. Lead card for @Hashmark_CFB.",
		sources: [
			{
				label: "HASHMARK Board",
				href: "https://hashmarkcfb.com/"
			},
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=5"
			},
			{
				label: "NCAA.com · Week 5 AP",
				href: "https://www.ncaa.com/news/football/article/2026-09-27/florida-flies-top-10-latest-ap-top-25-college-football-rankings"
			},
			{
				label: "Florida Gators · Opening Kickoff",
				href: "https://floridagators.com/news/2026/10/1/football-the-opening-kickoff-no-8-gators-at-no-25-missouri-buzz-builds-focus-required"
			},
			{
				label: "On3 · Florida availability",
				href: "https://www.on3.com/teams/florida-gators/news/thursday-availability-report-for-florida-gators-vs-missouri-tigers/"
			},
			{
				label: "CBS Sports · Week 5 odds",
				href: "https://www.cbssports.com/betting/news/2026-week-5-college-football-odds-betting-lines-spreads-start-times-get-cfb-predictions-best-bets-picks/"
			}
		]
	},
	{
		slug: "week-5-miami-clemson",
		kicker: "Week 5 · Spread gap",
		headline: "Same favorite. Sixteen-plus points apart.",
		dek: "No. 4 Miami in Death Valley — HASHMARK almost calls it a coin flip; the book does not.",
		date: STORY_DATE_WEEK5,
		body: [
			"No. 4 Miami visits Clemson on Saturday (6:30 CT, ABC). Live HASHMARK: Miami −0.9 / 52.5%. Vegas close on the schedule: Miami −17.5, O/U 49.5. Same side, ~16.6-point chill — the largest HX–Vegas absolute gap on the Week 5 FBS–FBS slate.",
			"HX ranks Miami 10th (5.23) against AP’s No. 4. Clemson is HX 22nd (3.83) and still unranked on the Week 5 ballot after the LSU opener loss and three straight wins (including last week’s Cal flip hit on the HASHMARK tape). The market prices Miami as a blowout road favorite; HX prices a one-point lean.",
			"CBS frames Darian Mensah’s early tape (14 TD passes, zero interceptions through four games) against a Clemson pass defense that held opponents under 150 passing yards in each of the last two. Miami is averaging 51.8 points per game and a 42.8-point margin through four — school-record pace per CBS. Stick to the live schedule number. This is not a winner flip; it is the board’s loudest disagreement."
		],
		whyItMatters: "Clean brand story — HX vs book magnitude on a national ABC night, with Clemson’s HX-over-AP thread still alive.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=5"
			},
			{
				label: "HASHMARK Board",
				href: "https://hashmarkcfb.com/"
			},
			{
				label: "CBS Sports · Miami–Clemson",
				href: "https://www.cbssports.com/college-football/news/miami-clemson-prediction-picks-odds-spread-where-to-watch-live/"
			},
			{
				label: "NCAA.com · Week 5 AP",
				href: "https://www.ncaa.com/news/football/article/2026-09-27/florida-flies-top-10-latest-ap-top-25-college-football-rankings"
			},
			{
				label: "USA Today · Week 5 picks",
				href: "https://www.usatoday.com/story/sports/ncaaf/2026/09/30/college-football-picks-week-5-top-25-game-predictions-odds/91987813007/"
			}
		]
	},
	{
		slug: "week-5-alabama-mississippi-state",
		kicker: "Week 5 · Spread gap",
		headline: "Vegas has Alabama −6. HX has Alabama −13.3 — and Miss State is still HX 66th.",
		dek: "AP’s No. 16 hosts No. 7. HASHMARK’s ballot gap on the Bulldogs is the loudest on the board.",
		date: STORY_DATE_WEEK5,
		body: [
			"No. 7 Alabama visits No. 16 Mississippi State on Saturday (11:00 CT, ABC). Live HASHMARK: Alabama −13.3 / 77.9%. Vegas close on the schedule: Alabama −6.0, O/U 59.5 — a 7.3-point chill, same favorite.",
			"The ranking fight is louder than the spread. Mississippi State climbed to AP 16 after beating Missouri 31–24 (NCAA Week 5). HX still has the Bulldogs 66th (0.21) — a −50 gap vs the Week 5 ballot, and the site’s Week 4 stamp already showed −42 vs AP 24. Alabama is HX 9th (5.28) against AP 7.",
			"CBS frames Kamario Taylor (SEC-leading yards of offense per game) against Keelon Russell’s recent explosion (685 yards, seven TDs in the last two). Both sides are 4–0. Stick to the schedule number. Pair in social with the Florida–Missouri flip if Marketing wants an “SEC numbers” thread — Starkville is the morning ABC window."
		],
		whyItMatters: "Biggest HX–AP disagreement meeting a live ranked home underdog; clean Make-12 / CFP resume stress for both.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=5"
			},
			{
				label: "HASHMARK Rankings",
				href: "https://hashmarkcfb.com/rankings"
			},
			{
				label: "CBS Sports · Alabama–Miss State",
				href: "https://www.cbssports.com/college-football/news/alabama-mississippi-state-prediction-picks-odds-spread-where-to-watch-live/"
			},
			{
				label: "NCAA.com · Week 5 AP",
				href: "https://www.ncaa.com/news/football/article/2026-09-27/florida-flies-top-10-latest-ap-top-25-college-football-rankings"
			}
		]
	},
	{
		slug: "week-5-ohio-state-iowa",
		kicker: "Week 5 · GameDay",
		headline: "No. 5 Ohio State at No. 14 Iowa — HX has Ohio State −9.7; Vegas has −13.5.",
		dek: "College GameDay is in Iowa City for the first time in 20 years. HASHMARK trims the road favorite.",
		date: STORY_DATE_WEEK5,
		body: [
			"No. 5 Ohio State visits No. 14 Iowa on Saturday (2:30 CT, CBS). Live HASHMARK: Ohio St −9.7 / 72.2%. Vegas close on the schedule: Ohio St −13.5, O/U 45.5. Same favorite; HX is ~3.8 points cooler on the Buckeyes at Kinnick.",
			"HX ranks Ohio State 2nd (7.81) against AP 5; Iowa is HX 23rd (3.71) vs AP 14 — a −9 ballot gap on the home side. Iowa jumped after the last-play 20–19 win at Michigan (NCAA / Bleacher Report GameDay). Ohio State’s only loss is the one-point road game at Texas.",
			"CBS and SI note Ohio State’s last Kinnick trip (55–24 loss in 2017) and Iowa’s early-season run game. Do not invent snaps. The card is agreement on the side, disagreement on the margin — useful contrast against the Florida–Missouri flip and the Miami–Clemson chill."
		],
		whyItMatters: "National GameDay window + HX’s Iowa under-rank vs a top-15 ballot home dog.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=5"
			},
			{
				label: "HASHMARK Board",
				href: "https://hashmarkcfb.com/"
			},
			{
				label: "CBS Sports · Ohio State–Iowa",
				href: "https://www.cbssports.com/college-football/news/ohio-state-iowa-prediction-picks-odds-spread-where-to-watch-live/"
			},
			{
				label: "SI · McElroy / GameDay",
				href: "https://www.si.com/fannation/college/cfb-hq/picks/greg-mcelroy-predicts-ohio-state-iowa-winner-college-gameday-heads-kinnick-buckeyes-hawkeyes"
			},
			{
				label: "Bleacher Report · GameDay",
				href: "https://bleacherreport.com/articles/25505507-espn-college-gameday-2026-week-5-schedule-location-predictions-and-more"
			},
			{
				label: "NCAA.com · Week 5 AP",
				href: "https://www.ncaa.com/news/football/article/2026-09-27/florida-flies-top-10-latest-ap-top-25-college-football-rankings"
			}
		]
	},
	{
		slug: "week-5-louisville-nc-state",
		kicker: "Week 5 · Winner flip",
		headline: "Vegas has Louisville −6.5. HX has NC State −0.6.",
		dek: "Louisville fell out of the AP. HASHMARK flips the favorite in Raleigh.",
		date: STORY_DATE_WEEK5,
		body: [
			"Louisville visits NC State on Saturday (2:30 CT, ACC Network). Live HASHMARK: NC State −0.6 / 51.6%. Vegas close on the schedule: Louisville −6.5, O/U 60.5 — a winner flip of roughly seven points from favorite to favorite.",
			"HX still has Louisville 26th (2.98) after the team dropped out of the Week 5 AP (was 16 on the Week 4 stamp). NC State is HX 33rd (2.10) and unranked. Wake Forest’s win at Louisville last week helped push the Cardinals off the ballot (NCAA others-receiving-votes list still has Louisville with 25 points).",
			"Stick to the live schedule number. Pair with Miami–Clemson if Marketing wants an ACC Saturday thread — this is the quieter flip under the Death Valley ABC card."
		],
		whyItMatters: "Clean winner flip on a team HX still rates inside the top 30 after an AP exit.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=5"
			},
			{
				label: "HASHMARK Rankings",
				href: "https://hashmarkcfb.com/rankings"
			},
			{
				label: "NCAA.com · Week 5 AP",
				href: "https://www.ncaa.com/news/football/article/2026-09-27/florida-flies-top-10-latest-ap-top-25-college-football-rankings"
			},
			{
				label: "CBS Sports · Miami–Clemson (ACC slate)",
				href: "https://www.cbssports.com/college-football/news/miami-clemson-prediction-picks-odds-spread-where-to-watch-live/"
			}
		]
	},
	{
		slug: "week-5-wku-nmsu-final",
		kicker: "Week 5 · Tape",
		headline: "HX took Western Kentucky −13. New Mexico State won 34–13.",
		dek: "First Week 5 winner-flip result is in. Live /schedule has not stamped the FINAL.",
		date: STORY_DATE_WEEK5,
		body: [
			"Western Kentucky visited New Mexico State on Thursday (7:00 CT, CBSSN). Live HASHMARK had posted a winner flip: WKU −13.0 / 77.5% against Vegas NM State −2.5, O/U 54.5. Final: New Mexico State 34, Western Kentucky 13 (NMSU athletics / ESPN box). Aggies SU and cover; HX flip MISS.",
			"James Jones ran for 155 yards and a touchdown; De’Marcus Peters returned an interception for a score (ESPN). Rodney Tisdale Jr. threw for 314 yards with an interception for WKU. The card was one of the largest absolute HX–Vegas disagreements on the early Week 5 board — and the first flip result of the weekend went against the model.",
			"Same night: North Texas 45, Tulsa 44 in OT (ESPN). HX had Tulsa −0.3 / 50.9% vs Vegas Tulsa −1.5 — both sides leaned Tulsa. Live /schedule?w=5 still shows both Thursday games as Kick until this stamp ships the FINALs."
		],
		whyItMatters: "Honest early-weekend tape note; board-hole flag for the FINAL stamp; social-ready “flip miss” before Friday’s ESPN/FOX windows.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=5"
			},
			{
				label: "NMSU athletics",
				href: "https://nmstatesports.com/news/2026/10/1/football-aggies-shine-in-all-three-phases-to-defeat-western-kentucky-in-cusa-opener.aspx"
			},
			{
				label: "ESPN · WKU @ NMSU",
				href: "https://www.espn.com/college-football/recap?gameId=401871049"
			},
			{
				label: "ESPN · UNT @ Tulsa",
				href: "https://www.espn.com/college-football/recap?gameId=401862786"
			},
			{
				label: "NMSU box score",
				href: "https://nmstatesports.com/sports/football/stats/2026/western-kentucky/boxscore/19276"
			}
		]
	},
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
//#region node_modules/.nitro/vite/services/ssr/assets/router-BSlUEYPc.js
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
var styles_default = "/assets/styles-pJmepFQg.css";
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
var $$splitComponentImporter$16 = () => import("./routes-BFZ7Thqk.mjs");
var Route$17 = createFileRoute("/")({
	loader: async () => {
		const [teams, games, slate] = await Promise.all([
			listTeams(),
			listGames(),
			listScheduleWeek({ data: { week: 6 } })
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
	head: () => ({ meta: [{ title: `HASHMARK · Week 6 board` }] })
});
var $$splitComponentImporter$15 = () => import("./desk-D_Ewpp6P.mjs");
var Route$16 = createFileRoute("/desk")({
	component: lazyRouteComponent($$splitComponentImporter$15, "component"),
	head: () => ({ meta: [{ title: "The desk · HASHMARK" }, {
		name: "description",
		content: "What HASHMARK is, how HX is built, and the glossary for the college football ratings desk."
	}] })
});
var $$splitComponentImporter$14 = () => import("./edge-BxcRM3qn.mjs");
var Route$15 = createFileRoute("/edge")({
	component: lazyRouteComponent($$splitComponentImporter$14, "component"),
	head: () => ({ meta: [{ title: `${EDGE.name} · HASHMARK` }, {
		name: "description",
		content: "HX Edge Pack is the weekly depth product. The $5 week sample is the full pack — confidence cards, unit O/D pulse, tape write-up — not the free-board teaser. The public board stays free."
	}] })
});
var $$splitComponentImporter$13 = () => import("./logos-C1QQKi1n.mjs");
var Route$14 = createFileRoute("/logos")({
	loader: async () => listTeams(),
	component: lazyRouteComponent($$splitComponentImporter$13, "component"),
	head: () => ({ meta: [{ title: "Team logos · HASHMARK" }] })
});
var $$splitComponentImporter$12 = () => import("./matchup-C8dY8MSk.mjs");
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
var $$splitComponentImporter$11 = () => import("./model-Co8OCzSd.mjs");
var Route$12 = createFileRoute("/model")({
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	head: () => ({ meta: [{ title: "The Model · HASHMARK" }] })
});
var $$splitComponentImporter$10 = () => import("./rankings-DawaF6wU.mjs");
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
var $$splitComponentImporter$9 = () => import("./recruiting-BZfeklXe.mjs");
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
var $$splitComponentImporter$8 = () => import("./schedule-BAsCEPUZ.mjs");
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
var $$splitComponentImporter$7 = () => import("./states-BNdNx5rq.mjs");
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
var $$splitComponentImporter$6 = () => import("./stories-DMinKuPS.mjs");
var Route$7 = createFileRoute("/stories")({
	loader: () => listStories(),
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({ meta: [{ title: "Stories · HASHMARK" }] })
});
var $$splitComponentImporter$5 = () => import("./talent--AvdqQEy.mjs");
var Route$6 = createFileRoute("/talent")({
	validateSearch: (s) => ({
		board: s.board === "size" ? "size" : "composite",
		conf: parseConf(s.conf)
	}),
	loader: () => listTeams(),
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [{ title: "Roster Talent · HASHMARK" }] })
});
var $$splitComponentImporter$4 = () => import("./edge.board-UtF2O1_D.mjs");
var Route$5 = createFileRoute("/edge/board")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: `Edge Board · ${EDGE.name} · HASHMARK` }, {
		name: "description",
		content: "HX Edge Board v1 — confidence schema: tiers A–D, calibration FLAGS, small/medium/large edge bands (large ≥ 7 pts), copy bans. Free board is HX vs Vegas. Paid pack is ranked cards."
	}] })
});
var verifyEdgeUnlock = createServerFn({ method: "GET" }).validator(object({ sessionId: string().optional() })).handler(createSsrRpc("4fe58dd28fd7340a345c36b313f0f7fe83bb1daaeec7d6b97ee43c0751bef21c"));
var $$splitComponentImporter$3 = () => import("./edge.unlock-DJ_01Qju.mjs");
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
var scenario_sim_golden_response_free_default = {
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
			"proj_wins": 10.491,
			"conf_title": 48.62
		},
		"oklahoma": {
			"make_field": 1.95,
			"proj_wins": 6.452,
			"conf_title": 1.06
		},
		"oregon": {
			"make_field": 46.2,
			"proj_wins": 9.122,
			"conf_title": 31.47
		},
		"ohio-state": {
			"make_field": 59.57,
			"proj_wins": 9.503,
			"conf_title": 44.98
		},
		"michigan": {
			"make_field": 21.29,
			"proj_wins": 8.543,
			"conf_title": 4.66
		}
	},
	scenario: {
		"georgia": {
			"make_field": 52.4,
			"proj_wins": 9.53,
			"conf_title": 34.45
		},
		"oklahoma": {
			"make_field": 6.53,
			"proj_wins": 7.297,
			"conf_title": 3.59
		},
		"oregon": {
			"make_field": 42.41,
			"proj_wins": 8.984,
			"conf_title": 28.49
		},
		"ohio-state": {
			"make_field": 60.77,
			"proj_wins": 9.539,
			"conf_title": 46.72
		},
		"michigan": {
			"make_field": 22.14,
			"proj_wins": 8.562,
			"conf_title": 5.01
		}
	},
	delta: {
		"georgia": {
			"make_field": -22.86,
			"proj_wins": -.961,
			"conf_title": -14.17
		},
		"oklahoma": {
			"make_field": 4.58,
			"proj_wins": .845,
			"conf_title": 2.53
		},
		"oregon": {
			"make_field": -3.79,
			"proj_wins": -.138,
			"conf_title": -2.98
		},
		"ohio-state": {
			"make_field": 1.2,
			"proj_wins": .036,
			"conf_title": 1.74
		},
		"michigan": {
			"make_field": .85,
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
var week5_hx_vs_ap_gaps_2026_default = {
	as_of: "2026-10-04",
	poll_week: 5,
	source_ap: "week5_ap_top25_2026 / NCAA Week 5 (Sept. 27)",
	source_hx: "week5_od_hx_ship_2026.json",
	hx_board: "HX 2026.7",
	note: "Rebuilt vs Week 5 AP ballot (Sept. 27) and HX 2026.7 ranks in week5_od_hx_ship_2026. Gaps with |delta| >= 3. Same ballot as the Week 5 AP stamp. Soft-cal FLAG stays.",
	gaps: [
		{
			"name": "Oklahoma State",
			"ap": 19,
			"hx": 89,
			"hx_rating": -1.1718,
			"delta": -70
		},
		{
			"name": "Mississippi State",
			"ap": 16,
			"hx": 66,
			"hx_rating": .1988,
			"delta": -50
		},
		{
			"name": "Kentucky",
			"ap": 24,
			"hx": 64,
			"hx_rating": .3116,
			"delta": -40
		},
		{
			"name": "Boise State",
			"ap": 22,
			"hx": 47,
			"hx_rating": 1.3464,
			"delta": -25
		},
		{
			"name": "UCLA",
			"ap": 23,
			"hx": 45,
			"hx_rating": 1.3963,
			"delta": -22
		},
		{
			"name": "Houston",
			"ap": 20,
			"hx": 38,
			"hx_rating": 1.6401,
			"delta": -18
		},
		{
			"name": "Florida",
			"ap": 8,
			"hx": 24,
			"hx_rating": 3.5318,
			"delta": -16
		},
		{
			"name": "Oregon",
			"ap": 15,
			"hx": 4,
			"hx_rating": 6.9019,
			"delta": 11
		},
		{
			"name": "Missouri",
			"ap": 25,
			"hx": 14,
			"hx_rating": 4.2455,
			"delta": 11
		},
		{
			"name": "Iowa",
			"ap": 14,
			"hx": 23,
			"hx_rating": 3.6796,
			"delta": -9
		},
		{
			"name": "BYU",
			"ap": 10,
			"hx": 17,
			"hx_rating": 4.1251,
			"delta": -7
		},
		{
			"name": "LSU",
			"ap": 11,
			"hx": 18,
			"hx_rating": 4.1243,
			"delta": -7
		},
		{
			"name": "Miami",
			"ap": 4,
			"hx": 10,
			"hx_rating": 5.2538,
			"delta": -6
		},
		{
			"name": "Indiana",
			"ap": 6,
			"hx": 11,
			"hx_rating": 4.9465,
			"delta": -5
		},
		{
			"name": "Texas Tech",
			"ap": 12,
			"hx": 7,
			"hx_rating": 5.7444,
			"delta": 5
		},
		{
			"name": "Texas",
			"ap": 1,
			"hx": 5,
			"hx_rating": 6.4516,
			"delta": -4
		},
		{
			"name": "Ohio State",
			"ap": 5,
			"hx": 2,
			"hx_rating": 7.839,
			"delta": 3
		},
		{
			"name": "USC",
			"ap": 18,
			"hx": 21,
			"hx_rating": 3.852,
			"delta": -3
		}
	],
	hx_not_in_ap: [
		{
			"hx_rank": 6,
			"name": "Texas A&M",
			"hx": 6.0649
		},
		{
			"hx_rank": 12,
			"name": "Michigan",
			"hx": 4.8807
		},
		{
			"hx_rank": 15,
			"name": "Penn State",
			"hx": 4.2432
		},
		{
			"hx_rank": 16,
			"name": "Oklahoma",
			"hx": 4.1888
		},
		{
			"hx_rank": 22,
			"name": "Clemson",
			"hx": 3.8145
		},
		{
			"hx_rank": 25,
			"name": "Washington",
			"hx": 3.2445
		}
	],
	ap_not_in_hx25: [
		{
			"ap": 16,
			"name": "Mississippi State",
			"hx_rank": 66
		},
		{
			"ap": 19,
			"name": "Oklahoma State",
			"hx_rank": 89
		},
		{
			"ap": 20,
			"name": "Houston",
			"hx_rank": 38
		},
		{
			"ap": 22,
			"name": "Boise State",
			"hx_rank": 47
		},
		{
			"ap": 23,
			"name": "UCLA",
			"hx_rank": 45
		},
		{
			"ap": 24,
			"name": "Kentucky",
			"hx_rank": 64
		}
	]
};
var week5_tape_2026_default = {
	meta: {
		"as_of": "2026-10-04 10:13 AM CT",
		"week": 5,
		"season": 2026,
		"scope": "FBS–FBS only",
		"n_games": 55,
		"su": "39/55",
		"su_pct": 70.9,
		"hx_closer": "20/55",
		"hx_closer_pct": 36.4,
		"vegas_closer": "35/55",
		"closer_ties": 0,
		"ats_hx": "26/55",
		"ats_hx_pct": 47.3,
		"ats_note": "Stored file figure. Research tape peer did not re-derive the ATS rule.",
		"mae_hx": 14.87,
		"mae_vegas": 13.19,
		"brier": .195,
		"season_w1_w5_su": "78.7%",
		"season_w1_w5_closer": "39.9%",
		"season_w1_w5_su_frac": "203/258",
		"season_w1_w5_closer_frac": "103/258",
		"season_note": "Arithmetic from prior W1-W4 notes plus this week. Not a fresh W1-W4 audit.",
		"sources": {
			"finals": "week5_fbs_fbs_finals_clear_2026-10-04",
			"grade": "metrics/week5_hx_vs_vegas_detail.json",
			"hx_ranks": "data/week4_od_hx_ship_2026.json (HX 2026.6 pregame, unchanged by this tape)",
			"peer": "week5_tape_research_peer_clear_2026-10-04.md"
		},
		"coverage_notes": [
			"All 55 FBS-FBS games are ESPN STATUS_FINAL. Thursday WKU at NMSU and North Texas at Tulsa were already live; 53 scores stamp in 0046.",
			"Vegas closes and kicks stay the stamped Week 5 books. This tape does not rewrite them.",
			"HX lines on the ledger are the HX 2026.6 pregame board. The tape is not a retune.",
			"Closer FLAG: 20/55 (36.4%) is under 45%. Soft-cal FLAG remains.",
			"Season 203/258 is arithmetic, not a fresh audit of Weeks 1-4."
		],
		"headline_flags": {
			"closer_below_45": true,
			"su_below_70": false,
			"n_su_misses": 16,
			"n_winner_flip_hits": 6,
			"n_winner_flip_misses": 5
		}
	},
	su_misses: [
		{
			"matchup": "Western Kentucky@New Mexico State",
			"hx_fav": "Western Kentucky",
			"hx_spread_display": "Western Kentucky -13.0",
			"vegas_details": "NMSU -2.5",
			"final": "Western Kentucky 13–New Mexico State 34",
			"closer": "vegas",
			"winner_flip": true,
			"espn_event_id": "401871049"
		},
		{
			"matchup": "North Texas@Tulsa",
			"hx_fav": "Tulsa",
			"hx_spread_display": "Tulsa -0.3",
			"vegas_details": "TLSA -1.5",
			"final": "North Texas 45–Tulsa 44 OT",
			"closer": "hx",
			"winner_flip": false,
			"espn_event_id": "401862786"
		},
		{
			"matchup": "Pittsburgh@Virginia Tech",
			"hx_fav": "Virginia Tech",
			"hx_spread_display": "Virginia Tech -4.4",
			"vegas_details": "VT -3.5",
			"final": "Pittsburgh 35–Virginia Tech 33",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401858245"
		},
		{
			"matchup": "Penn State@Northwestern",
			"hx_fav": "Penn State",
			"hx_spread_display": "Penn State -4.3",
			"vegas_details": "PSU -2.5",
			"final": "Penn State 13–Northwestern 34",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401858476"
		},
		{
			"matchup": "Michigan@Minnesota",
			"hx_fav": "Michigan",
			"hx_spread_display": "Michigan -6.0",
			"vegas_details": "MICH -5.5",
			"final": "Michigan 14–Minnesota 20",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401858474"
		},
		{
			"matchup": "Syracuse@UConn",
			"hx_fav": "UConn",
			"hx_spread_display": "UConn -1.6",
			"vegas_details": "SYR -6",
			"final": "Syracuse 42–UConn 41 OT",
			"closer": "hx",
			"winner_flip": true,
			"espn_event_id": "401858252"
		},
		{
			"matchup": "Navy@Air Force",
			"hx_fav": "Navy",
			"hx_spread_display": "Navy -0.9",
			"vegas_details": "AFA -3.5",
			"final": "Navy 9–Air Force 14",
			"closer": "vegas",
			"winner_flip": true,
			"espn_event_id": "401862791"
		},
		{
			"matchup": "Old Dominion@Georgia State",
			"hx_fav": "Old Dominion",
			"hx_spread_display": "Old Dominion -5.8",
			"vegas_details": "GAST -1.5",
			"final": "Old Dominion 10–Georgia State 42",
			"closer": "vegas",
			"winner_flip": true,
			"espn_event_id": "401869956"
		},
		{
			"matchup": "Bowling Green@Miami (OH)",
			"hx_fav": "Miami (OH)",
			"hx_spread_display": "Miami (OH) -15.4",
			"vegas_details": "M-OH -13.5",
			"final": "Bowling Green 24–Miami (OH) 20",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401866477"
		},
		{
			"matchup": "Kentucky@South Carolina",
			"hx_fav": "South Carolina",
			"hx_spread_display": "South Carolina -12.1",
			"vegas_details": "SC -2.5",
			"final": "Kentucky 35–South Carolina 34 OT",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401856709"
		},
		{
			"matchup": "Purdue@Illinois",
			"hx_fav": "Illinois",
			"hx_spread_display": "Illinois -14.3",
			"vegas_details": "ILL -10",
			"final": "Purdue 24–Illinois 17",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401858472"
		},
		{
			"matchup": "Georgia Southern@Coastal Carolina",
			"hx_fav": "Coastal Carolina",
			"hx_spread_display": "Coastal Carolina -2.8",
			"vegas_details": "GASO -2.5",
			"final": "Georgia Southern 31–Coastal Carolina 24",
			"closer": "vegas",
			"winner_flip": true,
			"espn_event_id": "401869942"
		},
		{
			"matchup": "Temple@South Florida",
			"hx_fav": "South Florida",
			"hx_spread_display": "South Florida -15.5",
			"vegas_details": "USF -6",
			"final": "Temple 17–South Florida 13",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401862792"
		},
		{
			"matchup": "Fresno State@Washington State",
			"hx_fav": "Washington State",
			"hx_spread_display": "Washington State -5.2",
			"vegas_details": "WSU -2.5",
			"final": "Fresno State 26–Washington State 6",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401860921"
		},
		{
			"matchup": "Baylor@Arizona State",
			"hx_fav": "Arizona State",
			"hx_spread_display": "Arizona State -5.3",
			"vegas_details": "ASU -4",
			"final": "Baylor 55–Arizona State 19",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401856817"
		},
		{
			"matchup": "San José State@Hawaiʻi",
			"hx_fav": "Hawaiʻi",
			"hx_spread_display": "Hawaiʻi -14.8",
			"vegas_details": "HAW -3",
			"final": "San José State 20–Hawaiʻi 16",
			"closer": "vegas",
			"winner_flip": false,
			"espn_event_id": "401864513"
		}
	],
	winner_flip_hits: [
		{
			"matchup": "Eastern Michigan @ Massachusetts",
			"hx": "Eastern Michigan -17.9",
			"vegas": "MASS -4.5",
			"final": "38–14",
			"espn_event_id": "401866433"
		},
		{
			"matchup": "Louisville @ NC State",
			"hx": "NC State -0.6",
			"vegas": "LOU -6.5",
			"final": "28–31",
			"espn_event_id": "401858248"
		},
		{
			"matchup": "Virginia @ Florida State",
			"hx": "Florida State -0.0",
			"vegas": "UVA -2.5",
			"final": "7–38",
			"espn_event_id": "401858253"
		},
		{
			"matchup": "Florida @ Missouri",
			"hx": "Missouri -5.6",
			"vegas": "FLA -4.5",
			"final": "17–45",
			"espn_event_id": "401856708"
		},
		{
			"matchup": "Army @ Louisiana Tech",
			"hx": "Louisiana Tech -11.0",
			"vegas": "ARMY -3",
			"final": "29–31",
			"espn_event_id": "401869842"
		},
		{
			"matchup": "Texas State @ San Diego State",
			"hx": "San Diego State -3.2",
			"vegas": "TXST -4",
			"final": "29–31",
			"espn_event_id": "401860900"
		}
	],
	winner_flip_misses: [
		{
			"matchup": "Western Kentucky @ New Mexico State",
			"hx": "Western Kentucky -13.0",
			"vegas": "NMSU -2.5",
			"final": "13–34",
			"espn_event_id": "401871049"
		},
		{
			"matchup": "Syracuse @ UConn",
			"hx": "UConn -1.6",
			"vegas": "SYR -6",
			"final": "42–41",
			"espn_event_id": "401858252"
		},
		{
			"matchup": "Navy @ Air Force",
			"hx": "Navy -0.9",
			"vegas": "AFA -3.5",
			"final": "9–14",
			"espn_event_id": "401862791"
		},
		{
			"matchup": "Old Dominion @ Georgia State",
			"hx": "Old Dominion -5.8",
			"vegas": "GAST -1.5",
			"final": "10–42",
			"espn_event_id": "401869956"
		},
		{
			"matchup": "Georgia Southern @ Coastal Carolina",
			"hx": "Coastal Carolina -2.8",
			"vegas": "GASO -2.5",
			"final": "31–24",
			"espn_event_id": "401869942"
		}
	],
	games: [
		{
			"espn_event_id": "401871049",
			"kick_ct": "2026-10-01 19:00",
			"tv": "CBSSN",
			"away": "Western Kentucky",
			"home": "New Mexico State",
			"away_slug": "western-kentucky",
			"home_slug": "new-mexico-state",
			"score_away": 13,
			"score_home": 34,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "Western Kentucky",
			"hx_spread_display": "Western Kentucky -13.0",
			"vegas_details": "NMSU -2.5",
			"home_hx_rank": 125,
			"away_hx_rank": 64,
			"flags": ["WINNER_FLIP_MISS"]
		},
		{
			"espn_event_id": "401862786",
			"kick_ct": "2026-10-01 20:00",
			"tv": "ESPN",
			"away": "North Texas",
			"home": "Tulsa",
			"away_slug": "north-texas",
			"home_slug": "tulsa",
			"score_away": 45,
			"score_home": 44,
			"ot": true,
			"closer": "hx",
			"su_hit": false,
			"hx_fav": "Tulsa",
			"hx_spread_display": "Tulsa -0.3",
			"vegas_details": "TLSA -1.5",
			"home_hx_rank": 111,
			"away_hx_rank": 103,
			"flags": []
		},
		{
			"espn_event_id": "401871050",
			"kick_ct": "2026-10-02 18:00",
			"tv": "CBSSN",
			"away": "Liberty",
			"home": "Delaware",
			"away_slug": "liberty",
			"home_slug": "delaware",
			"score_away": 30,
			"score_home": 14,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Liberty",
			"hx_spread_display": "Liberty -2.8",
			"vegas_details": "LIB -7",
			"home_hx_rank": 105,
			"away_hx_rank": 75,
			"flags": []
		},
		{
			"espn_event_id": "401858245",
			"kick_ct": "2026-10-02 18:00",
			"tv": "ESPN",
			"away": "Pittsburgh",
			"home": "Virginia Tech",
			"away_slug": "pittsburgh",
			"home_slug": "virginia-tech",
			"score_away": 35,
			"score_home": 33,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "Virginia Tech",
			"hx_spread_display": "Virginia Tech -4.4",
			"vegas_details": "VT -3.5",
			"home_hx_rank": 49,
			"away_hx_rank": 53,
			"flags": []
		},
		{
			"espn_event_id": "401858476",
			"kick_ct": "2026-10-02 19:00",
			"tv": "FOX",
			"away": "Penn State",
			"home": "Northwestern",
			"away_slug": "penn-state",
			"home_slug": "northwestern",
			"score_away": 13,
			"score_home": 34,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "Penn State",
			"hx_spread_display": "Penn State -4.3",
			"vegas_details": "PSU -2.5",
			"home_hx_rank": 36,
			"away_hx_rank": 14,
			"flags": []
		},
		{
			"espn_event_id": "401862787",
			"kick_ct": "2026-10-03 10:00",
			"tv": "ESPN+",
			"away": "Memphis",
			"home": "Charlotte",
			"away_slug": "memphis",
			"home_slug": "charlotte",
			"score_away": 59,
			"score_home": 8,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Memphis",
			"hx_spread_display": "Memphis -20.7",
			"vegas_details": "MEM -20.5",
			"home_hx_rank": 133,
			"away_hx_rank": 51,
			"flags": []
		},
		{
			"espn_event_id": "401858251",
			"kick_ct": "2026-10-03 11:00",
			"tv": "ACC Network",
			"away": "Stanford",
			"home": "Wake Forest",
			"away_slug": "stanford",
			"home_slug": "wake-forest",
			"score_away": 3,
			"score_home": 57,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Wake Forest",
			"hx_spread_display": "Wake Forest -4.8",
			"vegas_details": "WAKE -12.5",
			"home_hx_rank": 71,
			"away_hx_rank": 79,
			"flags": []
		},
		{
			"espn_event_id": "401858250",
			"kick_ct": "2026-10-03 11:00",
			"tv": "ESPN",
			"away": "Notre Dame",
			"home": "North Carolina",
			"away_slug": "notre-dame",
			"home_slug": "north-carolina",
			"score_away": 37,
			"score_home": 26,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Notre Dame",
			"hx_spread_display": "Notre Dame -26.3",
			"vegas_details": "ND -21.5",
			"home_hx_rank": 85,
			"away_hx_rank": 3,
			"flags": []
		},
		{
			"espn_event_id": "401856822",
			"kick_ct": "2026-10-03 11:00",
			"tv": "TNT",
			"away": "West Virginia",
			"home": "Iowa State",
			"away_slug": "west-virginia",
			"home_slug": "iowa-state",
			"score_away": 42,
			"score_home": 45,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Iowa State",
			"hx_spread_display": "Iowa State -9.9",
			"vegas_details": "ISU -3.5",
			"home_hx_rank": 54,
			"away_hx_rank": 88,
			"flags": []
		},
		{
			"espn_event_id": "401858474",
			"kick_ct": "2026-10-03 11:00",
			"tv": "FOX",
			"away": "Michigan",
			"home": "Minnesota",
			"away_slug": "michigan",
			"home_slug": "minnesota",
			"score_away": 14,
			"score_home": 20,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "Michigan",
			"hx_spread_display": "Michigan -6.0",
			"vegas_details": "MICH -5.5",
			"home_hx_rank": 35,
			"away_hx_rank": 12,
			"flags": []
		},
		{
			"espn_event_id": "401856807",
			"kick_ct": "2026-10-03 11:00",
			"tv": "ESPNU",
			"away": "Middle Tennessee",
			"home": "Kansas",
			"away_slug": "middle-tennessee",
			"home_slug": "kansas",
			"score_away": 0,
			"score_home": 55,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Kansas",
			"hx_spread_display": "Kansas -24.7",
			"vegas_details": "KU -18.5",
			"home_hx_rank": 55,
			"away_hx_rank": 126,
			"flags": []
		},
		{
			"espn_event_id": "401856819",
			"kick_ct": "2026-10-03 11:00",
			"tv": "ESPN2",
			"away": "UCF",
			"home": "Houston",
			"away_slug": "ucf",
			"home_slug": "houston",
			"score_away": 17,
			"score_home": 27,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Houston",
			"hx_spread_display": "Houston -11.3",
			"vegas_details": "HOU -10.5",
			"home_hx_rank": 39,
			"away_hx_rank": 78,
			"flags": []
		},
		{
			"espn_event_id": "401856707",
			"kick_ct": "2026-10-03 11:00",
			"tv": "ABC",
			"away": "Alabama",
			"home": "Mississippi State",
			"away_slug": "alabama",
			"home_slug": "mississippi-state",
			"score_away": 56,
			"score_home": 23,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Alabama",
			"hx_spread_display": "Alabama -13.3",
			"vegas_details": "ALA -6",
			"home_hx_rank": 66,
			"away_hx_rank": 9,
			"flags": []
		},
		{
			"espn_event_id": "401858246",
			"kick_ct": "2026-10-03 11:00",
			"tv": "CW",
			"away": "Boston College",
			"home": "SMU",
			"away_slug": "boston-college",
			"home_slug": "smu",
			"score_away": 16,
			"score_home": 25,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "SMU",
			"hx_spread_display": "SMU -28.3",
			"vegas_details": "SMU -20.5",
			"home_hx_rank": 20,
			"away_hx_rank": 104,
			"flags": []
		},
		{
			"espn_event_id": "401858252",
			"kick_ct": "2026-10-03 11:00",
			"tv": "CBSSN",
			"away": "Syracuse",
			"home": "UConn",
			"away_slug": "syracuse",
			"home_slug": "uconn",
			"score_away": 42,
			"score_home": 41,
			"ot": true,
			"closer": "hx",
			"su_hit": false,
			"hx_fav": "UConn",
			"hx_spread_display": "UConn -1.6",
			"vegas_details": "SYR -6",
			"home_hx_rank": 95,
			"away_hx_rank": 91,
			"flags": ["WINNER_FLIP_MISS"]
		},
		{
			"espn_event_id": "401862791",
			"kick_ct": "2026-10-03 11:00",
			"tv": "CBS",
			"away": "Navy",
			"home": "Air Force",
			"away_slug": "navy",
			"home_slug": "air-force",
			"score_away": 9,
			"score_home": 14,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "Navy",
			"hx_spread_display": "Navy -0.9",
			"vegas_details": "AFA -3.5",
			"home_hx_rank": 135,
			"away_hx_rank": 129,
			"flags": ["WINNER_FLIP_MISS"]
		},
		{
			"espn_event_id": "401858479",
			"kick_ct": "2026-10-03 11:30",
			"tv": "BTN",
			"away": "Michigan State",
			"home": "Wisconsin",
			"away_slug": "michigan-state",
			"home_slug": "wisconsin",
			"score_away": 3,
			"score_home": 31,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Wisconsin",
			"hx_spread_display": "Wisconsin -14.0",
			"vegas_details": "WIS -10",
			"home_hx_rank": 50,
			"away_hx_rank": 97,
			"flags": []
		},
		{
			"espn_event_id": "401856705",
			"kick_ct": "2026-10-03 11:45",
			"tv": "SEC Network",
			"away": "Vanderbilt",
			"home": "Georgia",
			"away_slug": "vanderbilt",
			"home_slug": "georgia",
			"score_away": 14,
			"score_home": 38,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Georgia",
			"hx_spread_display": "Georgia -24.3",
			"vegas_details": "UGA -24.5",
			"home_hx_rank": 1,
			"away_hx_rank": 28,
			"flags": []
		},
		{
			"espn_event_id": "401866432",
			"kick_ct": "2026-10-03 12:00",
			"tv": "ESPN+",
			"away": "Western Michigan",
			"home": "Buffalo",
			"away_slug": "western-michigan",
			"home_slug": "buffalo",
			"score_away": 20,
			"score_home": 17,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Western Michigan",
			"hx_spread_display": "Western Michigan -8.6",
			"vegas_details": "WMU -13.5",
			"home_hx_rank": 115,
			"away_hx_rank": 61,
			"flags": []
		},
		{
			"espn_event_id": "401866431",
			"kick_ct": "2026-10-03 13:00",
			"tv": "ESPN+",
			"away": "Toledo",
			"home": "Ball State",
			"away_slug": "toledo",
			"home_slug": "ball-state",
			"score_away": 39,
			"score_home": 24,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Toledo",
			"hx_spread_display": "Toledo -21.1",
			"vegas_details": "TOL -19.5",
			"home_hx_rank": 131,
			"away_hx_rank": 42,
			"flags": []
		},
		{
			"espn_event_id": "401866430",
			"kick_ct": "2026-10-03 14:30",
			"tv": "ESPN+",
			"away": "Akron",
			"home": "Central Michigan",
			"away_slug": "akron",
			"home_slug": "central-michigan",
			"score_away": 17,
			"score_home": 41,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Central Michigan",
			"hx_spread_display": "Central Michigan -3.8",
			"vegas_details": "CMU -6",
			"home_hx_rank": 113,
			"away_hx_rank": 116,
			"flags": []
		},
		{
			"espn_event_id": "401866433",
			"kick_ct": "2026-10-03 14:30",
			"tv": "ESPN+",
			"away": "Eastern Michigan",
			"home": "Massachusetts",
			"away_slug": "eastern-michigan",
			"home_slug": "massachusetts",
			"score_away": 38,
			"score_home": 14,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Eastern Michigan",
			"hx_spread_display": "Eastern Michigan -17.9",
			"vegas_details": "MASS -4.5",
			"home_hx_rank": 136,
			"away_hx_rank": 107,
			"flags": ["WINNER_FLIP_HIT"]
		},
		{
			"espn_event_id": "401858248",
			"kick_ct": "2026-10-03 14:30",
			"tv": "ACC Network",
			"away": "Louisville",
			"home": "NC State",
			"away_slug": "louisville",
			"home_slug": "nc-state",
			"score_away": 28,
			"score_home": 31,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "NC State",
			"hx_spread_display": "NC State -0.6",
			"vegas_details": "LOU -6.5",
			"home_hx_rank": 33,
			"away_hx_rank": 26,
			"flags": ["WINNER_FLIP_HIT"]
		},
		{
			"espn_event_id": "401858253",
			"kick_ct": "2026-10-03 14:30",
			"tv": "ESPN2",
			"away": "Virginia",
			"home": "Florida State",
			"away_slug": "virginia",
			"home_slug": "florida-state",
			"score_away": 7,
			"score_home": 38,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Florida State",
			"hx_spread_display": "Florida State -0.0",
			"vegas_details": "UVA -2.5",
			"home_hx_rank": 63,
			"away_hx_rank": 46,
			"flags": ["WINNER_FLIP_HIT"]
		},
		{
			"espn_event_id": "401869956",
			"kick_ct": "2026-10-03 14:30",
			"tv": "ESPN+",
			"away": "Old Dominion",
			"home": "Georgia State",
			"away_slug": "old-dominion",
			"home_slug": "georgia-state",
			"score_away": 10,
			"score_home": 42,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "Old Dominion",
			"hx_spread_display": "Old Dominion -5.8",
			"vegas_details": "GAST -1.5",
			"home_hx_rank": 122,
			"away_hx_rank": 92,
			"flags": ["WINNER_FLIP_MISS"]
		},
		{
			"espn_event_id": "401856710",
			"kick_ct": "2026-10-03 14:30",
			"tv": "ESPN",
			"away": "Auburn",
			"home": "Tennessee",
			"away_slug": "auburn",
			"home_slug": "tennessee",
			"score_away": 14,
			"score_home": 24,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Tennessee",
			"hx_spread_display": "Tennessee -9.4",
			"vegas_details": "TENN -7",
			"home_hx_rank": 19,
			"away_hx_rank": 31,
			"flags": []
		},
		{
			"espn_event_id": "401866434",
			"kick_ct": "2026-10-03 14:30",
			"tv": "ESPN+",
			"away": "Ohio",
			"home": "Kent State",
			"away_slug": "ohio",
			"home_slug": "kent-state",
			"score_away": 13,
			"score_home": 10,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Ohio",
			"hx_spread_display": "Ohio -17.5",
			"vegas_details": "OHIO -3",
			"home_hx_rank": 134,
			"away_hx_rank": 65,
			"flags": []
		},
		{
			"espn_event_id": "401858473",
			"kick_ct": "2026-10-03 14:30",
			"tv": "CBS",
			"away": "Ohio State",
			"home": "Iowa",
			"away_slug": "ohio-state",
			"home_slug": "iowa",
			"score_away": 31,
			"score_home": 14,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Ohio State",
			"hx_spread_display": "Ohio State -9.7",
			"vegas_details": "OSU -13.5",
			"home_hx_rank": 23,
			"away_hx_rank": 2,
			"flags": []
		},
		{
			"espn_event_id": "401866477",
			"kick_ct": "2026-10-03 14:30",
			"tv": "ESPN+",
			"away": "Bowling Green",
			"home": "Miami (OH)",
			"away_slug": "bowling-green",
			"home_slug": "miami-oh",
			"score_away": 24,
			"score_home": 20,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "Miami (OH)",
			"hx_spread_display": "Miami (OH) -15.4",
			"vegas_details": "M-OH -13.5",
			"home_hx_rank": 81,
			"away_hx_rank": 124,
			"flags": []
		},
		{
			"espn_event_id": "401858247",
			"kick_ct": "2026-10-03 14:30",
			"tv": "CBSSN",
			"away": "California",
			"home": "UNLV",
			"away_slug": "california",
			"home_slug": "unlv",
			"score_away": 31,
			"score_home": 39,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "UNLV",
			"hx_spread_display": "UNLV -7.1",
			"vegas_details": "UNLV -2.5",
			"home_hx_rank": 37,
			"away_hx_rank": 60,
			"flags": []
		},
		{
			"espn_event_id": "401869962",
			"kick_ct": "2026-10-03 14:45",
			"tv": "ESPNU",
			"away": "Marshall",
			"home": "James Madison",
			"away_slug": "marshall",
			"home_slug": "james-madison",
			"score_away": 17,
			"score_home": 45,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "James Madison",
			"hx_spread_display": "James Madison -7.5",
			"vegas_details": "JMU -18.5",
			"home_hx_rank": 44,
			"away_hx_rank": 67,
			"flags": []
		},
		{
			"espn_event_id": "401856708",
			"kick_ct": "2026-10-03 14:50",
			"tv": "ABC",
			"away": "Florida",
			"home": "Missouri",
			"away_slug": "florida",
			"home_slug": "missouri",
			"score_away": 17,
			"score_home": 45,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Missouri",
			"hx_spread_display": "Missouri -5.6",
			"vegas_details": "FLA -4.5",
			"home_hx_rank": 15,
			"away_hx_rank": 24,
			"flags": ["WINNER_FLIP_HIT"]
		},
		{
			"espn_event_id": "401864514",
			"kick_ct": "2026-10-03 15:00",
			"tv": "MW+",
			"away": "UTEP",
			"home": "New Mexico",
			"away_slug": "utep",
			"home_slug": "new-mexico",
			"score_away": 7,
			"score_home": 61,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "New Mexico",
			"hx_spread_display": "New Mexico -16.1",
			"vegas_details": "UNM -22.5",
			"home_hx_rank": 98,
			"away_hx_rank": 132,
			"flags": []
		},
		{
			"espn_event_id": "401858475",
			"kick_ct": "2026-10-03 15:00",
			"tv": "FS1",
			"away": "Maryland",
			"home": "Nebraska",
			"away_slug": "maryland",
			"home_slug": "nebraska",
			"score_away": 23,
			"score_home": 48,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Nebraska",
			"hx_spread_display": "Nebraska -11.1",
			"vegas_details": "NEB -14.5",
			"home_hx_rank": 34,
			"away_hx_rank": 72,
			"flags": []
		},
		{
			"espn_event_id": "401856709",
			"kick_ct": "2026-10-03 15:15",
			"tv": "SEC Network",
			"away": "Kentucky",
			"home": "South Carolina",
			"away_slug": "kentucky",
			"home_slug": "south-carolina",
			"score_away": 35,
			"score_home": 34,
			"ot": true,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "South Carolina",
			"hx_spread_display": "South Carolina -12.1",
			"vegas_details": "SC -2.5",
			"home_hx_rank": 27,
			"away_hx_rank": 62,
			"flags": []
		},
		{
			"espn_event_id": "401858472",
			"kick_ct": "2026-10-03 15:15",
			"tv": "BTN",
			"away": "Purdue",
			"home": "Illinois",
			"away_slug": "purdue",
			"home_slug": "illinois",
			"score_away": 24,
			"score_home": 17,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "Illinois",
			"hx_spread_display": "Illinois -14.3",
			"vegas_details": "ILL -10",
			"home_hx_rank": 38,
			"away_hx_rank": 94,
			"flags": []
		},
		{
			"espn_event_id": "401860899",
			"kick_ct": "2026-10-03 17:00",
			"tv": "USA Net",
			"away": "Oregon State",
			"home": "Colorado State",
			"away_slug": "oregon-state",
			"home_slug": "colorado-state",
			"score_away": 56,
			"score_home": 26,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Oregon State",
			"hx_spread_display": "Oregon State -3.7",
			"vegas_details": "ORST -4.5",
			"home_hx_rank": 114,
			"away_hx_rank": 84,
			"flags": []
		},
		{
			"espn_event_id": "401871089",
			"kick_ct": "2026-10-03 18:00",
			"tv": "ESPN+",
			"away": "UL Monroe",
			"home": "South Alabama",
			"away_slug": "ul-monroe",
			"home_slug": "south-alabama",
			"score_away": 35,
			"score_home": 52,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "South Alabama",
			"hx_spread_display": "South Alabama -10.4",
			"vegas_details": "USA -14",
			"home_hx_rank": 108,
			"away_hx_rank": 128,
			"flags": []
		},
		{
			"espn_event_id": "401869942",
			"kick_ct": "2026-10-03 18:00",
			"tv": "ESPN+",
			"away": "Georgia Southern",
			"home": "Coastal Carolina",
			"away_slug": "georgia-southern",
			"home_slug": "coastal-carolina",
			"score_away": 31,
			"score_home": 24,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "Coastal Carolina",
			"hx_spread_display": "Coastal Carolina -2.8",
			"vegas_details": "GASO -2.5",
			"home_hx_rank": 99,
			"away_hx_rank": 96,
			"flags": ["WINNER_FLIP_MISS"]
		},
		{
			"espn_event_id": "401856711",
			"kick_ct": "2026-10-03 18:00",
			"tv": "ESPN2",
			"away": "Arkansas",
			"home": "Texas A&M",
			"away_slug": "arkansas",
			"home_slug": "texas-am",
			"score_away": 7,
			"score_home": 34,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Texas A&M",
			"hx_spread_display": "Texas A&M -24.3",
			"vegas_details": "TA&M -14",
			"home_hx_rank": 6,
			"away_hx_rank": 59,
			"flags": []
		},
		{
			"espn_event_id": "401856818",
			"kick_ct": "2026-10-03 18:00",
			"tv": "ESPN",
			"away": "BYU",
			"home": "TCU",
			"away_slug": "byu",
			"home_slug": "tcu",
			"score_away": 17,
			"score_home": 10,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "BYU",
			"hx_spread_display": "BYU -2.4",
			"vegas_details": "BYU -6.5",
			"home_hx_rank": 32,
			"away_hx_rank": 18,
			"flags": []
		},
		{
			"espn_event_id": "401862788",
			"kick_ct": "2026-10-03 18:00",
			"tv": "ESPN+",
			"away": "UTSA",
			"home": "Rice",
			"away_slug": "utsa",
			"home_slug": "rice",
			"score_away": 16,
			"score_home": 14,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "UTSA",
			"hx_spread_display": "UTSA -12.7",
			"vegas_details": "UTSA -10.5",
			"home_hx_rank": 117,
			"away_hx_rank": 48,
			"flags": []
		},
		{
			"espn_event_id": "401858478",
			"kick_ct": "2026-10-03 18:30",
			"tv": "NBC",
			"away": "Washington",
			"home": "USC",
			"away_slug": "washington",
			"home_slug": "usc",
			"score_away": 21,
			"score_home": 25,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "USC",
			"hx_spread_display": "USC -5.2",
			"vegas_details": "USC -9.5",
			"home_hx_rank": 21,
			"away_hx_rank": 25,
			"flags": []
		},
		{
			"espn_event_id": "401869842",
			"kick_ct": "2026-10-03 18:30",
			"tv": "ESPN+",
			"away": "Army",
			"home": "Louisiana Tech",
			"away_slug": "army",
			"home_slug": "louisiana-tech",
			"score_away": 29,
			"score_home": 31,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Louisiana Tech",
			"hx_spread_display": "Louisiana Tech -11.0",
			"vegas_details": "ARMY -3",
			"home_hx_rank": 101,
			"away_hx_rank": 123,
			"flags": ["WINNER_FLIP_HIT"]
		},
		{
			"espn_event_id": "401858249",
			"kick_ct": "2026-10-03 18:30",
			"tv": "ABC",
			"away": "Miami",
			"home": "Clemson",
			"away_slug": "miami",
			"home_slug": "clemson",
			"score_away": 41,
			"score_home": 13,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Miami",
			"hx_spread_display": "Miami -0.9",
			"vegas_details": "MIA -17.5",
			"home_hx_rank": 22,
			"away_hx_rank": 10,
			"flags": []
		},
		{
			"espn_event_id": "401856821",
			"kick_ct": "2026-10-03 18:30",
			"tv": "FOX",
			"away": "Texas Tech",
			"home": "Colorado",
			"away_slug": "texas-tech",
			"home_slug": "colorado",
			"score_away": 29,
			"score_home": 7,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Texas Tech",
			"hx_spread_display": "Texas Tech -17.8",
			"vegas_details": "TTU -13.5",
			"home_hx_rank": 73,
			"away_hx_rank": 7,
			"flags": []
		},
		{
			"espn_event_id": "401862792",
			"kick_ct": "2026-10-03 18:30",
			"tv": "ESPNU",
			"away": "Temple",
			"home": "South Florida",
			"away_slug": "temple",
			"home_slug": "usf",
			"score_away": 17,
			"score_home": 13,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "South Florida",
			"hx_spread_display": "South Florida -15.5",
			"vegas_details": "USF -6",
			"home_hx_rank": 69,
			"away_hx_rank": 112,
			"flags": []
		},
		{
			"espn_event_id": "401860898",
			"kick_ct": "2026-10-03 18:30",
			"tv": "CBSSN",
			"away": "Utah State",
			"home": "Boise State",
			"away_slug": "utah-state",
			"home_slug": "boise-state",
			"score_away": 18,
			"score_home": 37,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Boise State",
			"hx_spread_display": "Boise State -9.9",
			"vegas_details": "BOIS -20.5",
			"home_hx_rank": 47,
			"away_hx_rank": 76,
			"flags": []
		},
		{
			"espn_event_id": "401869932",
			"kick_ct": "2026-10-03 19:00",
			"tv": "ESPN+",
			"away": "Arkansas State",
			"home": "Louisiana",
			"away_slug": "arkansas-state",
			"home_slug": "louisiana",
			"score_away": 20,
			"score_home": 23,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Louisiana",
			"hx_spread_display": "Louisiana -4.5",
			"vegas_details": "UL -6.5",
			"home_hx_rank": 86,
			"away_hx_rank": 93,
			"flags": []
		},
		{
			"espn_event_id": "401858477",
			"kick_ct": "2026-10-03 19:00",
			"tv": "BTN",
			"away": "Indiana",
			"home": "Rutgers",
			"away_slug": "indiana",
			"home_slug": "rutgers",
			"score_away": 47,
			"score_home": 15,
			"ot": false,
			"closer": "vegas",
			"su_hit": true,
			"hx_fav": "Indiana",
			"hx_spread_display": "Indiana -13.1",
			"vegas_details": "IU -24.5",
			"home_hx_rank": 70,
			"away_hx_rank": 11,
			"flags": []
		},
		{
			"espn_event_id": "401860921",
			"kick_ct": "2026-10-03 20:30",
			"tv": "USA Net",
			"away": "Fresno State",
			"home": "Washington State",
			"away_slug": "fresno-state",
			"home_slug": "washington-state",
			"score_away": 26,
			"score_home": 6,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "Washington State",
			"hx_spread_display": "Washington State -5.2",
			"vegas_details": "WSU -2.5",
			"home_hx_rank": 56,
			"away_hx_rank": 68,
			"flags": []
		},
		{
			"espn_event_id": "401856817",
			"kick_ct": "2026-10-03 21:30",
			"tv": "ESPN",
			"away": "Baylor",
			"home": "Arizona State",
			"away_slug": "baylor",
			"home_slug": "arizona-state",
			"score_away": 55,
			"score_home": 19,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "Arizona State",
			"hx_spread_display": "Arizona State -5.3",
			"vegas_details": "ASU -4",
			"home_hx_rank": 41,
			"away_hx_rank": 52,
			"flags": []
		},
		{
			"espn_event_id": "401860900",
			"kick_ct": "2026-10-03 21:30",
			"tv": "CW",
			"away": "Texas State",
			"home": "San Diego State",
			"away_slug": "texas-state",
			"home_slug": "san-diego-state",
			"score_away": 29,
			"score_home": 31,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "San Diego State",
			"hx_spread_display": "San Diego State -3.2",
			"vegas_details": "TXST -4",
			"home_hx_rank": 57,
			"away_hx_rank": 58,
			"flags": ["WINNER_FLIP_HIT"]
		},
		{
			"espn_event_id": "401856820",
			"kick_ct": "2026-10-03 22:00",
			"tv": "FOX",
			"away": "Cincinnati",
			"home": "Arizona",
			"away_slug": "cincinnati",
			"home_slug": "arizona",
			"score_away": 7,
			"score_home": 34,
			"ot": false,
			"closer": "hx",
			"su_hit": true,
			"hx_fav": "Arizona",
			"hx_spread_display": "Arizona -15.1",
			"vegas_details": "ARIZ -7",
			"home_hx_rank": 30,
			"away_hx_rank": 82,
			"flags": []
		},
		{
			"espn_event_id": "401864513",
			"kick_ct": "2026-10-03 22:59",
			"tv": "MW+",
			"away": "San José State",
			"home": "Hawaiʻi",
			"away_slug": "san-jose-state",
			"home_slug": "hawaii",
			"score_away": 20,
			"score_home": 16,
			"ot": false,
			"closer": "vegas",
			"su_hit": false,
			"hx_fav": "Hawaiʻi",
			"hx_spread_display": "Hawaiʻi -14.8",
			"vegas_details": "HAW -3",
			"home_hx_rank": 83,
			"away_hx_rank": 121,
			"flags": []
		}
	]
};
var week5_tape_top25_closer_2026_default = {
	meta: {
		"as_of": "2026-10-04 10:13 AM CT",
		"week": 5,
		"season": 2026,
		"universe": "FBS–FBS with at least one team in HX Top 25 (HX 2026.6 hx_rank_post <= 25)",
		"n_games": 15,
		"hx_closer": "7/15",
		"hx_closer_pct": 46.7,
		"su": "13/15",
		"su_pct": 86.7,
		"vegas_closer_n": 8,
		"closer_ties": 0,
		"full_slate_closer": "20/55 (36.4%)",
		"source_tape": "data/week5_tape_2026.json",
		"rank_source": "week4_od_hx_ship_2026.json hx_rank_post (HX 2026.6 pregame, not retuned)",
		"peer_note": "Week 4 Top 25 rule applied to the Research-CLEARed 55 and HX 2026.6 ranks. Research tape memo did not publish this cut. Public headline stays 39/55 SU and 20/55 closer FLAG."
	},
	games: [
		{
			"espn_event_id": "401858476",
			"kick_ct": "2026-10-02 19:00",
			"matchup": "Penn State @ Northwestern",
			"away": "Penn State",
			"home": "Northwestern",
			"home_hx_rank": 36,
			"away_hx_rank": 14,
			"hx_spread_display": "Penn State -4.3",
			"vegas_details": "PSU -2.5",
			"final": "13–34",
			"score_away": 13,
			"score_home": 34,
			"closer": "vegas",
			"su_hit": false
		},
		{
			"espn_event_id": "401858250",
			"kick_ct": "2026-10-03 11:00",
			"matchup": "Notre Dame @ North Carolina",
			"away": "Notre Dame",
			"home": "North Carolina",
			"home_hx_rank": 85,
			"away_hx_rank": 3,
			"hx_spread_display": "Notre Dame -26.3",
			"vegas_details": "ND -21.5",
			"final": "37–26",
			"score_away": 37,
			"score_home": 26,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401858474",
			"kick_ct": "2026-10-03 11:00",
			"matchup": "Michigan @ Minnesota",
			"away": "Michigan",
			"home": "Minnesota",
			"home_hx_rank": 35,
			"away_hx_rank": 12,
			"hx_spread_display": "Michigan -6.0",
			"vegas_details": "MICH -5.5",
			"final": "14–20",
			"score_away": 14,
			"score_home": 20,
			"closer": "vegas",
			"su_hit": false
		},
		{
			"espn_event_id": "401856707",
			"kick_ct": "2026-10-03 11:00",
			"matchup": "Alabama @ Mississippi State",
			"away": "Alabama",
			"home": "Mississippi State",
			"home_hx_rank": 66,
			"away_hx_rank": 9,
			"hx_spread_display": "Alabama -13.3",
			"vegas_details": "ALA -6",
			"final": "56–23",
			"score_away": 56,
			"score_home": 23,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401858246",
			"kick_ct": "2026-10-03 11:00",
			"matchup": "Boston College @ SMU",
			"away": "Boston College",
			"home": "SMU",
			"home_hx_rank": 20,
			"away_hx_rank": 104,
			"hx_spread_display": "SMU -28.3",
			"vegas_details": "SMU -20.5",
			"final": "16–25",
			"score_away": 16,
			"score_home": 25,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401856705",
			"kick_ct": "2026-10-03 11:45",
			"matchup": "Vanderbilt @ Georgia",
			"away": "Vanderbilt",
			"home": "Georgia",
			"home_hx_rank": 1,
			"away_hx_rank": 28,
			"hx_spread_display": "Georgia -24.3",
			"vegas_details": "UGA -24.5",
			"final": "14–38",
			"score_away": 14,
			"score_home": 38,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401856710",
			"kick_ct": "2026-10-03 14:30",
			"matchup": "Auburn @ Tennessee",
			"away": "Auburn",
			"home": "Tennessee",
			"home_hx_rank": 19,
			"away_hx_rank": 31,
			"hx_spread_display": "Tennessee -9.4",
			"vegas_details": "TENN -7",
			"final": "14–24",
			"score_away": 14,
			"score_home": 24,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401858473",
			"kick_ct": "2026-10-03 14:30",
			"matchup": "Ohio State @ Iowa",
			"away": "Ohio State",
			"home": "Iowa",
			"home_hx_rank": 23,
			"away_hx_rank": 2,
			"hx_spread_display": "Ohio State -9.7",
			"vegas_details": "OSU -13.5",
			"final": "31–14",
			"score_away": 31,
			"score_home": 14,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401856708",
			"kick_ct": "2026-10-03 14:50",
			"matchup": "Florida @ Missouri",
			"away": "Florida",
			"home": "Missouri",
			"home_hx_rank": 15,
			"away_hx_rank": 24,
			"hx_spread_display": "Missouri -5.6",
			"vegas_details": "FLA -4.5",
			"final": "17–45",
			"score_away": 17,
			"score_home": 45,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401856711",
			"kick_ct": "2026-10-03 18:00",
			"matchup": "Arkansas @ Texas A&M",
			"away": "Arkansas",
			"home": "Texas A&M",
			"home_hx_rank": 6,
			"away_hx_rank": 59,
			"hx_spread_display": "Texas A&M -24.3",
			"vegas_details": "TA&M -14",
			"final": "7–34",
			"score_away": 7,
			"score_home": 34,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401856818",
			"kick_ct": "2026-10-03 18:00",
			"matchup": "BYU @ TCU",
			"away": "BYU",
			"home": "TCU",
			"home_hx_rank": 32,
			"away_hx_rank": 18,
			"hx_spread_display": "BYU -2.4",
			"vegas_details": "BYU -6.5",
			"final": "17–10",
			"score_away": 17,
			"score_home": 10,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401858478",
			"kick_ct": "2026-10-03 18:30",
			"matchup": "Washington @ USC",
			"away": "Washington",
			"home": "USC",
			"home_hx_rank": 21,
			"away_hx_rank": 25,
			"hx_spread_display": "USC -5.2",
			"vegas_details": "USC -9.5",
			"final": "21–25",
			"score_away": 21,
			"score_home": 25,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401858249",
			"kick_ct": "2026-10-03 18:30",
			"matchup": "Miami @ Clemson",
			"away": "Miami",
			"home": "Clemson",
			"home_hx_rank": 22,
			"away_hx_rank": 10,
			"hx_spread_display": "Miami -0.9",
			"vegas_details": "MIA -17.5",
			"final": "41–13",
			"score_away": 41,
			"score_home": 13,
			"closer": "vegas",
			"su_hit": true
		},
		{
			"espn_event_id": "401856821",
			"kick_ct": "2026-10-03 18:30",
			"matchup": "Texas Tech @ Colorado",
			"away": "Texas Tech",
			"home": "Colorado",
			"home_hx_rank": 73,
			"away_hx_rank": 7,
			"hx_spread_display": "Texas Tech -17.8",
			"vegas_details": "TTU -13.5",
			"final": "29–7",
			"score_away": 29,
			"score_home": 7,
			"closer": "hx",
			"su_hit": true
		},
		{
			"espn_event_id": "401858477",
			"kick_ct": "2026-10-03 19:00",
			"matchup": "Indiana @ Rutgers",
			"away": "Indiana",
			"home": "Rutgers",
			"home_hx_rank": 70,
			"away_hx_rank": 11,
			"hx_spread_display": "Indiana -13.1",
			"vegas_details": "IU -24.5",
			"final": "47–15",
			"score_away": 47,
			"score_home": 15,
			"closer": "vegas",
			"su_hit": true
		}
	]
};
var sim_free_hx2026_7_default = {
	meta: {
		"n_sims": 1e4,
		"seed": 20260913,
		"as_of": "2026-10-05",
		"as_of_tz": "America/Chicago",
		"hx_stamp": "HX 2026.7",
		"hx_policy": "offline HX 2026.7 from week5_od_hx_ship_2026.json hx_post; matchup = board; do not claim LIVE",
		"source": "sim_10k_2026_hx2026_7.json",
		"free_export": "Generated by scripts/generate-sim-free.mjs. make-field is public; title odds are Edge Pack only and are not in this file."
	},
	teams: [
		{
			"name": "Notre Dame",
			"slug": "notre-dame",
			"conference": "Independent",
			"make_field": 94.36,
			"proj_wins": 10.944,
			"conf_title": 0
		},
		{
			"name": "Texas Tech",
			"slug": "texas-tech",
			"conference": "Big 12",
			"make_field": 91.73,
			"proj_wins": 11.423,
			"conf_title": 57.06
		},
		{
			"name": "Miami",
			"slug": "miami",
			"conference": "ACC",
			"make_field": 90.43,
			"proj_wins": 11.05,
			"conf_title": 61.28
		},
		{
			"name": "Georgia",
			"slug": "georgia",
			"conference": "SEC",
			"make_field": 86.51,
			"proj_wins": 11.004,
			"conf_title": 57.08
		},
		{
			"name": "Ohio State",
			"slug": "ohio-state",
			"conference": "Big Ten",
			"make_field": 69.94,
			"proj_wins": 9.973,
			"conf_title": 51.29
		},
		{
			"name": "James Madison",
			"slug": "james-madison",
			"conference": "Sun Belt",
			"make_field": 66.31,
			"proj_wins": 10.637,
			"conf_title": 53.76
		},
		{
			"name": "Oregon",
			"slug": "oregon",
			"conference": "Big Ten",
			"make_field": 56.65,
			"proj_wins": 9.587,
			"conf_title": 35.05
		},
		{
			"name": "Utah",
			"slug": "utah",
			"conference": "Big 12",
			"make_field": 56.43,
			"proj_wins": 9.943,
			"conf_title": 20.47
		},
		{
			"name": "Texas",
			"slug": "texas",
			"conference": "SEC",
			"make_field": 55.78,
			"proj_wins": 9.792,
			"conf_title": 23.54
		},
		{
			"name": "Toledo",
			"slug": "toledo",
			"conference": "MAC",
			"make_field": 50.1,
			"proj_wins": 9.992,
			"conf_title": 43.94
		},
		{
			"name": "BYU",
			"slug": "byu",
			"conference": "Big 12",
			"make_field": 48.46,
			"proj_wins": 9.621,
			"conf_title": 19.37
		},
		{
			"name": "Alabama",
			"slug": "alabama",
			"conference": "SEC",
			"make_field": 41.94,
			"proj_wins": 9.38,
			"conf_title": 9.86
		},
		{
			"name": "Indiana",
			"slug": "indiana",
			"conference": "Big Ten",
			"make_field": 41.69,
			"proj_wins": 9.426,
			"conf_title": 8.58
		},
		{
			"name": "UNLV",
			"slug": "unlv",
			"conference": "Mountain West",
			"make_field": 41.18,
			"proj_wins": 9.589,
			"conf_title": 50.6
		},
		{
			"name": "UTSA",
			"slug": "utsa",
			"conference": "American",
			"make_field": 38.21,
			"proj_wins": 9.683,
			"conf_title": 42.56
		},
		{
			"name": "SMU",
			"slug": "smu",
			"conference": "ACC",
			"make_field": 38.17,
			"proj_wins": 9.184,
			"conf_title": 23.47
		},
		{
			"name": "Memphis",
			"slug": "memphis",
			"conference": "American",
			"make_field": 32.24,
			"proj_wins": 9.513,
			"conf_title": 35.16
		},
		{
			"name": "Liberty",
			"slug": "liberty",
			"conference": "CUSA",
			"make_field": 21.51,
			"proj_wins": 9.264,
			"conf_title": 36.07
		},
		{
			"name": "Iowa",
			"slug": "iowa",
			"conference": "Big Ten",
			"make_field": 13.49,
			"proj_wins": 8.496,
			"conf_title": 1.17
		},
		{
			"name": "Ole Miss",
			"slug": "ole-miss",
			"conference": "SEC",
			"make_field": 13.33,
			"proj_wins": 8.171,
			"conf_title": 3.8
		},
		{
			"name": "Clemson",
			"slug": "clemson",
			"conference": "ACC",
			"make_field": 11.66,
			"proj_wins": 8.215,
			"conf_title": 7.36
		},
		{
			"name": "LSU",
			"slug": "lsu",
			"conference": "SEC",
			"make_field": 9.57,
			"proj_wins": 8.098,
			"conf_title": 1.34
		},
		{
			"name": "Louisiana",
			"slug": "louisiana",
			"conference": "Sun Belt",
			"make_field": 7.3,
			"proj_wins": 8.322,
			"conf_title": 12.53
		},
		{
			"name": "USC",
			"slug": "usc",
			"conference": "Big Ten",
			"make_field": 7.03,
			"proj_wins": 8.077,
			"conf_title": 1.12
		},
		{
			"name": "Tennessee",
			"slug": "tennessee",
			"conference": "SEC",
			"make_field": 6.71,
			"proj_wins": 7.9,
			"conf_title": .74
		},
		{
			"name": "Ohio",
			"slug": "ohio",
			"conference": "MAC",
			"make_field": 6.38,
			"proj_wins": 8.25,
			"conf_title": 19.41
		},
		{
			"name": "Western Michigan",
			"slug": "western-michigan",
			"conference": "MAC",
			"make_field": 6.21,
			"proj_wins": 8.308,
			"conf_title": 29.62
		},
		{
			"name": "South Florida",
			"slug": "usf",
			"conference": "American",
			"make_field": 5.76,
			"proj_wins": 8.316,
			"conf_title": 4.14
		},
		{
			"name": "Kansas State",
			"slug": "kansas-state",
			"conference": "Big 12",
			"make_field": 5.69,
			"proj_wins": 7.826,
			"conf_title": .69
		},
		{
			"name": "Pittsburgh",
			"slug": "pittsburgh",
			"conference": "ACC",
			"make_field": 5.67,
			"proj_wins": 8.384,
			"conf_title": 1.02
		},
		{
			"name": "Duke",
			"slug": "duke",
			"conference": "ACC",
			"make_field": 5.62,
			"proj_wins": 7.93,
			"conf_title": 1.02
		},
		{
			"name": "Boise State",
			"slug": "boise-state",
			"conference": "Mountain West",
			"make_field": 5.52,
			"proj_wins": 7.97,
			"conf_title": 23.59
		},
		{
			"name": "NC State",
			"slug": "nc-state",
			"conference": "ACC",
			"make_field": 5.33,
			"proj_wins": 7.722,
			"conf_title": 3.05
		},
		{
			"name": "Marshall",
			"slug": "marshall",
			"conference": "Sun Belt",
			"make_field": 5.28,
			"proj_wins": 8.16,
			"conf_title": 11.94
		},
		{
			"name": "Houston",
			"slug": "houston",
			"conference": "Big 12",
			"make_field": 4.8,
			"proj_wins": 7.975,
			"conf_title": .58
		},
		{
			"name": "Texas A&M",
			"slug": "texas-am",
			"conference": "SEC",
			"make_field": 4.53,
			"proj_wins": 7.465,
			"conf_title": 1.7
		},
		{
			"name": "UCLA",
			"slug": "ucla",
			"conference": "Big Ten",
			"make_field": 4.19,
			"proj_wins": 7.987,
			"conf_title": .36
		},
		{
			"name": "Missouri",
			"slug": "missouri",
			"conference": "SEC",
			"make_field": 4.04,
			"proj_wins": 7.505,
			"conf_title": .79
		},
		{
			"name": "New Mexico",
			"slug": "new-mexico",
			"conference": "Mountain West",
			"make_field": 4.01,
			"proj_wins": 8.275,
			"conf_title": 2.77
		},
		{
			"name": "Penn State",
			"slug": "penn-state",
			"conference": "Big Ten",
			"make_field": 3.85,
			"proj_wins": 7.744,
			"conf_title": .27
		},
		{
			"name": "Arizona",
			"slug": "arizona",
			"conference": "Big 12",
			"make_field": 3.73,
			"proj_wins": 7.673,
			"conf_title": .56
		},
		{
			"name": "Florida",
			"slug": "florida",
			"conference": "SEC",
			"make_field": 3.38,
			"proj_wins": 7.577,
			"conf_title": .66
		},
		{
			"name": "Nebraska",
			"slug": "nebraska",
			"conference": "Big Ten",
			"make_field": 2.94,
			"proj_wins": 7.475,
			"conf_title": .45
		},
		{
			"name": "Minnesota",
			"slug": "minnesota",
			"conference": "Big Ten",
			"make_field": 2.44,
			"proj_wins": 7.274,
			"conf_title": .81
		},
		{
			"name": "Jacksonville State",
			"slug": "jacksonville-state",
			"conference": "CUSA",
			"make_field": 2.21,
			"proj_wins": 7.717,
			"conf_title": 22.85
		},
		{
			"name": "East Carolina",
			"slug": "east-carolina",
			"conference": "American",
			"make_field": 1.85,
			"proj_wins": 7.29,
			"conf_title": 9.09
		},
		{
			"name": "Wisconsin",
			"slug": "wisconsin",
			"conference": "Big Ten",
			"make_field": 1.75,
			"proj_wins": 7.385,
			"conf_title": .48
		},
		{
			"name": "Louisville",
			"slug": "louisville",
			"conference": "ACC",
			"make_field": 1.31,
			"proj_wins": 6.927,
			"conf_title": 1.31
		},
		{
			"name": "Fresno State",
			"slug": "fresno-state",
			"conference": "Mountain West",
			"make_field": 1.26,
			"proj_wins": 7.321,
			"conf_title": 12.09
		},
		{
			"name": "Michigan",
			"slug": "michigan",
			"conference": "Big Ten",
			"make_field": 1.21,
			"proj_wins": 7.208,
			"conf_title": .29
		},
		{
			"name": "Baylor",
			"slug": "baylor",
			"conference": "Big 12",
			"make_field": 1.07,
			"proj_wins": 6.88,
			"conf_title": .71
		},
		{
			"name": "Virginia",
			"slug": "virginia",
			"conference": "ACC",
			"make_field": 1.06,
			"proj_wins": 6.933,
			"conf_title": .73
		},
		{
			"name": "App State",
			"slug": "app-state",
			"conference": "Sun Belt",
			"make_field": .82,
			"proj_wins": 6.867,
			"conf_title": 1.92
		},
		{
			"name": "Northwestern",
			"slug": "northwestern",
			"conference": "Big Ten",
			"make_field": .74,
			"proj_wins": 7.03,
			"conf_title": .09
		},
		{
			"name": "San José State",
			"slug": "san-jose-state",
			"conference": "Mountain West",
			"make_field": .68,
			"proj_wins": 7.308,
			"conf_title": .3
		},
		{
			"name": "Oklahoma",
			"slug": "oklahoma",
			"conference": "SEC",
			"make_field": .64,
			"proj_wins": 6.352,
			"conf_title": .41
		},
		{
			"name": "Tulane",
			"slug": "tulane",
			"conference": "American",
			"make_field": .56,
			"proj_wins": 6.535,
			"conf_title": 3.74
		},
		{
			"name": "Virginia Tech",
			"slug": "virginia-tech",
			"conference": "ACC",
			"make_field": .47,
			"proj_wins": 6.954,
			"conf_title": .11
		},
		{
			"name": "Washington",
			"slug": "washington",
			"conference": "Big Ten",
			"make_field": .42,
			"proj_wins": 6.73,
			"conf_title": .03
		},
		{
			"name": "Florida Atlantic",
			"slug": "florida-atlantic",
			"conference": "American",
			"make_field": .41,
			"proj_wins": 6.766,
			"conf_title": .48
		},
		{
			"name": "Arizona State",
			"slug": "arizona-state",
			"conference": "Big 12",
			"make_field": .37,
			"proj_wins": 6.15,
			"conf_title": .28
		},
		{
			"name": "Georgia Tech",
			"slug": "georgia-tech",
			"conference": "ACC",
			"make_field": .36,
			"proj_wins": 4.88,
			"conf_title": .36
		},
		{
			"name": "Troy",
			"slug": "troy",
			"conference": "Sun Belt",
			"make_field": .33,
			"proj_wins": 6.393,
			"conf_title": 4.23
		},
		{
			"name": "Vanderbilt",
			"slug": "vanderbilt",
			"conference": "SEC",
			"make_field": .32,
			"proj_wins": 6.385,
			"conf_title": .07
		},
		{
			"name": "North Texas",
			"slug": "north-texas",
			"conference": "American",
			"make_field": .29,
			"proj_wins": 6.924,
			"conf_title": 2.87
		},
		{
			"name": "Wake Forest",
			"slug": "wake-forest",
			"conference": "ACC",
			"make_field": .27,
			"proj_wins": 6.903,
			"conf_title": .09
		},
		{
			"name": "Iowa State",
			"slug": "iowa-state",
			"conference": "Big 12",
			"make_field": .2,
			"proj_wins": 6.35,
			"conf_title": .15
		},
		{
			"name": "California",
			"slug": "california",
			"conference": "ACC",
			"make_field": .19,
			"proj_wins": 5.287,
			"conf_title": .19
		},
		{
			"name": "UAB",
			"slug": "uab",
			"conference": "American",
			"make_field": .14,
			"proj_wins": 6.037,
			"conf_title": 1.35
		},
		{
			"name": "Florida International",
			"slug": "fiu",
			"conference": "CUSA",
			"make_field": .13,
			"proj_wins": 6.096,
			"conf_title": 2.91
		},
		{
			"name": "Central Michigan",
			"slug": "central-michigan",
			"conference": "MAC",
			"make_field": .12,
			"proj_wins": 6.271,
			"conf_title": .8
		},
		{
			"name": "Tulsa",
			"slug": "tulsa",
			"conference": "American",
			"make_field": .11,
			"proj_wins": 6.452,
			"conf_title": .26
		},
		{
			"name": "Miami (OH)",
			"slug": "miami-oh",
			"conference": "MAC",
			"make_field": .09,
			"proj_wins": 6.617,
			"conf_title": 3.97
		},
		{
			"name": "Kansas",
			"slug": "kansas",
			"conference": "Big 12",
			"make_field": .07,
			"proj_wins": 5.559,
			"conf_title": .05
		},
		{
			"name": "Georgia State",
			"slug": "georgia-state",
			"conference": "Sun Belt",
			"make_field": .06,
			"proj_wins": 5.896,
			"conf_title": .17
		},
		{
			"name": "Mississippi State",
			"slug": "mississippi-state",
			"conference": "SEC",
			"make_field": .06,
			"proj_wins": 6.421,
			"conf_title": .01
		},
		{
			"name": "Arkansas State",
			"slug": "arkansas-state",
			"conference": "Sun Belt",
			"make_field": .05,
			"proj_wins": 6.084,
			"conf_title": 1.8
		},
		{
			"name": "TCU",
			"slug": "tcu",
			"conference": "Big 12",
			"make_field": .04,
			"proj_wins": 5.583,
			"conf_title": .04
		},
		{
			"name": "Auburn",
			"slug": "auburn",
			"conference": "SEC",
			"make_field": .03,
			"proj_wins": 6.16,
			"conf_title": 0
		},
		{
			"name": "Oklahoma State",
			"slug": "oklahoma-state",
			"conference": "Big 12",
			"make_field": .03,
			"proj_wins": 5.554,
			"conf_title": .01
		},
		{
			"name": "Southern Miss",
			"slug": "southern-miss",
			"conference": "Sun Belt",
			"make_field": .03,
			"proj_wins": 5.692,
			"conf_title": 9.89
		},
		{
			"name": "Colorado",
			"slug": "colorado",
			"conference": "Big 12",
			"make_field": .02,
			"proj_wins": 4.897,
			"conf_title": .02
		},
		{
			"name": "Delaware",
			"slug": "delaware",
			"conference": "CUSA",
			"make_field": .02,
			"proj_wins": 5.56,
			"conf_title": 1.73
		},
		{
			"name": "Kentucky",
			"slug": "kentucky",
			"conference": "SEC",
			"make_field": .02,
			"proj_wins": 5.966,
			"conf_title": 0
		},
		{
			"name": "Louisiana Tech",
			"slug": "louisiana-tech",
			"conference": "CUSA",
			"make_field": .02,
			"proj_wins": 5.928,
			"conf_title": 0
		},
		{
			"name": "South Alabama",
			"slug": "south-alabama",
			"conference": "Sun Belt",
			"make_field": .02,
			"proj_wins": 5.613,
			"conf_title": .72
		},
		{
			"name": "Cincinnati",
			"slug": "cincinnati",
			"conference": "Big 12",
			"make_field": .01,
			"proj_wins": 5.957,
			"conf_title": 0
		},
		{
			"name": "Florida State",
			"slug": "florida-state",
			"conference": "ACC",
			"make_field": .01,
			"proj_wins": 5.492,
			"conf_title": .01
		},
		{
			"name": "Illinois",
			"slug": "illinois",
			"conference": "Big Ten",
			"make_field": .01,
			"proj_wins": 5.24,
			"conf_title": .01
		},
		{
			"name": "Missouri State",
			"slug": "missouri-state",
			"conference": "CUSA",
			"make_field": .01,
			"proj_wins": 4.918,
			"conf_title": 2.57
		},
		{
			"name": "UCF",
			"slug": "ucf",
			"conference": "Big 12",
			"make_field": .01,
			"proj_wins": 5.673,
			"conf_title": .01
		},
		{
			"name": "Air Force",
			"slug": "air-force",
			"conference": "Mountain West",
			"make_field": 0,
			"proj_wins": 5.171,
			"conf_title": .09
		},
		{
			"name": "Akron",
			"slug": "akron",
			"conference": "MAC",
			"make_field": 0,
			"proj_wins": 4.291,
			"conf_title": .31
		},
		{
			"name": "Arkansas",
			"slug": "arkansas",
			"conference": "SEC",
			"make_field": 0,
			"proj_wins": 4.017,
			"conf_title": 0
		},
		{
			"name": "Army",
			"slug": "army",
			"conference": "American",
			"make_field": 0,
			"proj_wins": 5.212,
			"conf_title": .02
		},
		{
			"name": "Ball State",
			"slug": "ball-state",
			"conference": "MAC",
			"make_field": 0,
			"proj_wins": 3.978,
			"conf_title": 0
		},
		{
			"name": "Boston College",
			"slug": "boston-college",
			"conference": "ACC",
			"make_field": 0,
			"proj_wins": 3.649,
			"conf_title": 0
		},
		{
			"name": "Bowling Green",
			"slug": "bowling-green",
			"conference": "MAC",
			"make_field": 0,
			"proj_wins": 4.721,
			"conf_title": .52
		},
		{
			"name": "Buffalo",
			"slug": "buffalo",
			"conference": "MAC",
			"make_field": 0,
			"proj_wins": 5.514,
			"conf_title": .36
		},
		{
			"name": "Charlotte",
			"slug": "charlotte",
			"conference": "American",
			"make_field": 0,
			"proj_wins": 1.849,
			"conf_title": 0
		},
		{
			"name": "Coastal Carolina",
			"slug": "coastal-carolina",
			"conference": "Sun Belt",
			"make_field": 0,
			"proj_wins": 4.054,
			"conf_title": .46
		},
		{
			"name": "Colorado State",
			"slug": "colorado-state",
			"conference": "Mountain West",
			"make_field": 0,
			"proj_wins": 3.268,
			"conf_title": .66
		},
		{
			"name": "Eastern Michigan",
			"slug": "eastern-michigan",
			"conference": "MAC",
			"make_field": 0,
			"proj_wins": 5.52,
			"conf_title": 1.07
		},
		{
			"name": "Georgia Southern",
			"slug": "georgia-southern",
			"conference": "Sun Belt",
			"make_field": 0,
			"proj_wins": 5.3,
			"conf_title": 2.33
		},
		{
			"name": "Hawai'i",
			"slug": "hawaii",
			"conference": "Mountain West",
			"make_field": 0,
			"proj_wins": 5.915,
			"conf_title": 0
		},
		{
			"name": "Kennesaw State",
			"slug": "kennesaw-state",
			"conference": "CUSA",
			"make_field": 0,
			"proj_wins": 4.039,
			"conf_title": .62
		},
		{
			"name": "Kent State",
			"slug": "kent-state",
			"conference": "MAC",
			"make_field": 0,
			"proj_wins": 4.223,
			"conf_title": 0
		},
		{
			"name": "Maryland",
			"slug": "maryland",
			"conference": "Big Ten",
			"make_field": 0,
			"proj_wins": 4.427,
			"conf_title": 0
		},
		{
			"name": "Massachusetts",
			"slug": "massachusetts",
			"conference": "MAC",
			"make_field": 0,
			"proj_wins": 4.963,
			"conf_title": 0
		},
		{
			"name": "Michigan State",
			"slug": "michigan-state",
			"conference": "Big Ten",
			"make_field": 0,
			"proj_wins": 3.475,
			"conf_title": 0
		},
		{
			"name": "Middle Tennessee",
			"slug": "middle-tennessee",
			"conference": "CUSA",
			"make_field": 0,
			"proj_wins": 4.545,
			"conf_title": .11
		},
		{
			"name": "Navy",
			"slug": "navy",
			"conference": "American",
			"make_field": 0,
			"proj_wins": 3.421,
			"conf_title": .01
		},
		{
			"name": "Nevada",
			"slug": "nevada",
			"conference": "Mountain West",
			"make_field": 0,
			"proj_wins": 3.922,
			"conf_title": .02
		},
		{
			"name": "New Mexico State",
			"slug": "new-mexico-state",
			"conference": "CUSA",
			"make_field": 0,
			"proj_wins": 4.331,
			"conf_title": .63
		},
		{
			"name": "North Carolina",
			"slug": "north-carolina",
			"conference": "ACC",
			"make_field": 0,
			"proj_wins": 4.67,
			"conf_title": 0
		},
		{
			"name": "Northern Illinois",
			"slug": "northern-illinois",
			"conference": "MAC",
			"make_field": 0,
			"proj_wins": 3.956,
			"conf_title": 0
		},
		{
			"name": "Old Dominion",
			"slug": "old-dominion",
			"conference": "Sun Belt",
			"make_field": 0,
			"proj_wins": 4.457,
			"conf_title": .23
		},
		{
			"name": "Oregon State",
			"slug": "oregon-state",
			"conference": "Pac-12",
			"make_field": 0,
			"proj_wins": 5.454,
			"conf_title": 67.4
		},
		{
			"name": "Purdue",
			"slug": "purdue",
			"conference": "Big Ten",
			"make_field": 0,
			"proj_wins": 3.769,
			"conf_title": 0
		},
		{
			"name": "Rice",
			"slug": "rice",
			"conference": "American",
			"make_field": 0,
			"proj_wins": 3.862,
			"conf_title": .08
		},
		{
			"name": "Rutgers",
			"slug": "rutgers",
			"conference": "Big Ten",
			"make_field": 0,
			"proj_wins": 3.551,
			"conf_title": 0
		},
		{
			"name": "Sam Houston",
			"slug": "sam-houston",
			"conference": "CUSA",
			"make_field": 0,
			"proj_wins": 4.095,
			"conf_title": .42
		},
		{
			"name": "San Diego State",
			"slug": "san-diego-state",
			"conference": "Mountain West",
			"make_field": 0,
			"proj_wins": 5.666,
			"conf_title": 8.78
		},
		{
			"name": "South Carolina",
			"slug": "south-carolina",
			"conference": "SEC",
			"make_field": 0,
			"proj_wins": 4.678,
			"conf_title": 0
		},
		{
			"name": "Stanford",
			"slug": "stanford",
			"conference": "ACC",
			"make_field": 0,
			"proj_wins": 4.342,
			"conf_title": 0
		},
		{
			"name": "Syracuse",
			"slug": "syracuse",
			"conference": "ACC",
			"make_field": 0,
			"proj_wins": 4.126,
			"conf_title": 0
		},
		{
			"name": "Temple",
			"slug": "temple",
			"conference": "American",
			"make_field": 0,
			"proj_wins": 5.27,
			"conf_title": .24
		},
		{
			"name": "Texas State",
			"slug": "texas-state",
			"conference": "Sun Belt",
			"make_field": 0,
			"proj_wins": 5.67,
			"conf_title": 0
		},
		{
			"name": "UConn",
			"slug": "uconn",
			"conference": "Independent",
			"make_field": 0,
			"proj_wins": 6.172,
			"conf_title": 0
		},
		{
			"name": "UL Monroe",
			"slug": "ul-monroe",
			"conference": "Sun Belt",
			"make_field": 0,
			"proj_wins": 1.719,
			"conf_title": .02
		},
		{
			"name": "UTEP",
			"slug": "utep",
			"conference": "CUSA",
			"make_field": 0,
			"proj_wins": 4.481,
			"conf_title": 0
		},
		{
			"name": "Utah State",
			"slug": "utah-state",
			"conference": "Mountain West",
			"make_field": 0,
			"proj_wins": 3.829,
			"conf_title": .79
		},
		{
			"name": "Washington State",
			"slug": "washington-state",
			"conference": "Pac-12",
			"make_field": 0,
			"proj_wins": 4.28,
			"conf_title": 32.6
		},
		{
			"name": "West Virginia",
			"slug": "west-virginia",
			"conference": "Big 12",
			"make_field": 0,
			"proj_wins": 5.066,
			"conf_title": 0
		},
		{
			"name": "Western Kentucky",
			"slug": "western-kentucky",
			"conference": "CUSA",
			"make_field": 0,
			"proj_wins": 6.435,
			"conf_title": 32.09
		},
		{
			"name": "Wyoming",
			"slug": "wyoming",
			"conference": "Mountain West",
			"make_field": 0,
			"proj_wins": 5.41,
			"conf_title": .31
		}
	]
};
var week5_ap_top25_2026_default = {
	product: "AP Top 25 stamp pack",
	poll: "AP",
	season: 2026,
	poll_week: 5,
	as_of: "2026-09-27",
	as_of_label: "Week 5 AP · Sept. 27",
	source: "https://www.ncaa.com/news/football/article/2026-09-27/florida-flies-top-10-latest-ap-top-25-college-football-rankings",
	source_secondary: "Website peer CLEAR 2026-10-02 vs NCAA Week 5 ballot",
	chrome: {
		"replace": "Week 4 AP (Sept. 20) / AP_STAMP week:4",
		"set": {
			"week": 5,
			"asOf": "Sept. 27",
			"label": "Week 5 AP",
			"columnHint": "W5 stamp",
			"lede": "HX is Week 5. AP is the last stamped poll (Week 5, Sept. 27) — not a Week 4 ballot."
		}
	},
	scope: "AP ranks + chrome only — no HX retune",
	teams: [
		{
			"rank": 1,
			"school": "Texas",
			"slug": "texas",
			"record": "4-0",
			"previous_rank": 1,
			"first_place_votes": 62,
			"points": 1737
		},
		{
			"rank": 2,
			"school": "Georgia",
			"slug": "georgia",
			"record": "4-0",
			"previous_rank": 2,
			"first_place_votes": 6,
			"points": 1646
		},
		{
			"rank": 3,
			"school": "Notre Dame",
			"slug": "notre-dame",
			"record": "4-0",
			"previous_rank": 3,
			"first_place_votes": 0,
			"points": 1581
		},
		{
			"rank": 4,
			"school": "Miami (FL)",
			"slug": "miami",
			"record": "4-0",
			"previous_rank": 6,
			"first_place_votes": 1,
			"points": 1501
		},
		{
			"rank": 5,
			"school": "Ohio State",
			"slug": "ohio-state",
			"record": "3-1",
			"previous_rank": 7,
			"first_place_votes": 0,
			"points": 1465
		},
		{
			"rank": 6,
			"school": "Indiana",
			"slug": "indiana",
			"record": "4-0",
			"previous_rank": 5,
			"first_place_votes": 1,
			"points": 1408
		},
		{
			"rank": 7,
			"school": "Alabama",
			"slug": "alabama",
			"record": "4-0",
			"previous_rank": 8,
			"first_place_votes": 0,
			"points": 1305
		},
		{
			"rank": 8,
			"school": "Florida",
			"slug": "florida",
			"record": "4-0",
			"previous_rank": 21,
			"first_place_votes": 0,
			"points": 1272
		},
		{
			"rank": 9,
			"school": "Ole Miss",
			"slug": "ole-miss",
			"record": "3-1",
			"previous_rank": 4,
			"first_place_votes": 0,
			"points": 1089
		},
		{
			"rank": 10,
			"school": "BYU",
			"slug": "byu",
			"record": "3-0",
			"previous_rank": 10,
			"first_place_votes": 0,
			"points": 1078
		},
		{
			"rank": 11,
			"school": "LSU",
			"slug": "lsu",
			"record": "3-1",
			"previous_rank": 11,
			"first_place_votes": 0,
			"points": 1073
		},
		{
			"rank": 12,
			"school": "Texas Tech",
			"slug": "texas-tech",
			"record": "4-0",
			"previous_rank": 12,
			"first_place_votes": 0,
			"points": 1053
		},
		{
			"rank": 13,
			"school": "Utah",
			"slug": "utah",
			"record": "4-0",
			"previous_rank": 15,
			"first_place_votes": 0,
			"points": 903
		},
		{
			"rank": 14,
			"school": "Iowa",
			"slug": "iowa",
			"record": "4-0",
			"previous_rank": 17,
			"first_place_votes": 0,
			"points": 856
		},
		{
			"rank": 15,
			"school": "Oregon",
			"slug": "oregon",
			"record": "3-1",
			"previous_rank": 20,
			"first_place_votes": 0,
			"points": 725
		},
		{
			"rank": 16,
			"school": "Mississippi State",
			"slug": "mississippi-state",
			"record": "4-0",
			"previous_rank": 24,
			"first_place_votes": 0,
			"points": 715
		},
		{
			"rank": 17,
			"school": "Tennessee",
			"slug": "tennessee",
			"record": "3-1",
			"previous_rank": 14,
			"first_place_votes": 0,
			"points": 663
		},
		{
			"rank": 18,
			"school": "USC",
			"slug": "usc",
			"record": "4-1",
			"previous_rank": 12,
			"first_place_votes": 0,
			"points": 410
		},
		{
			"rank": 19,
			"school": "Oklahoma State",
			"slug": "oklahoma-state",
			"record": "3-1",
			"previous_rank": null,
			"first_place_votes": 0,
			"points": 345
		},
		{
			"rank": 20,
			"school": "Houston",
			"slug": "houston",
			"record": "3-1",
			"previous_rank": 25,
			"first_place_votes": 0,
			"points": 278
		},
		{
			"rank": 21,
			"school": "SMU",
			"slug": "smu",
			"record": "3-1",
			"previous_rank": 22,
			"first_place_votes": 0,
			"points": 246
		},
		{
			"rank": 22,
			"school": "Boise State",
			"slug": "boise-state",
			"record": "3-1",
			"previous_rank": null,
			"first_place_votes": 0,
			"points": 221
		},
		{
			"rank": 23,
			"school": "UCLA",
			"slug": "ucla",
			"record": "4-0",
			"previous_rank": null,
			"first_place_votes": 0,
			"points": 218
		},
		{
			"rank": 24,
			"school": "Kentucky",
			"slug": "kentucky",
			"record": "3-1",
			"previous_rank": null,
			"first_place_votes": 0,
			"points": 150
		},
		{
			"rank": 25,
			"school": "Missouri",
			"slug": "missouri",
			"record": "3-1",
			"previous_rank": 19,
			"first_place_votes": 0,
			"points": 118
		}
	]
};
/**
* Truth-pack loaders. Numbers come from the AMD / Research JSON payloads —
* do not invent deltas, tape rates, or make/title splits.
*
*   data/week5_hx_vs_ap_gaps_2026.json
*   data/week1_accountability_pack_2026.json
*   data/week2_tape_2026.json
*   data/week2_tape_top25_closer_2026.json
*   data/week3_tape_2026.json
*   data/week3_tape_top25_closer_2026.json
*   data/week4_tape_2026.json
*   data/week4_tape_top25_closer_2026.json
*   data/week5_tape_2026.json
*   data/week5_tape_top25_closer_2026.json
*   data/sim_free_hx2026_7.json — free export of sim_10k_2026_hx2026_7.json
*     (make_field, proj_wins, conf_title; no win_title). Generated by scripts/generate-sim-free.mjs. The full sim
*     (with win_title) is server/test only: ./sim-full.server.ts. Never import the
*     full file here — this module is bundled into the public client JS.
*/
/** Research desk flags on the Week 5 ballot. Mississippi State (−50) / Oklahoma State (−70) lead the |delta| sort after these. */
var DISAGREE_HIGHLIGHT_NAMES = [
	"Florida",
	"Oregon",
	"Houston",
	"Missouri",
	"Iowa",
	"BYU"
];
var hxApGaps = week5_hx_vs_ap_gaps_2026_default;
var week5TapePack = week5_tape_2026_default;
var week5Top25Pack = week5_tape_top25_closer_2026_default;
/** Free sim export (make-field / proj_wins / conf_title). No win_title. */
var sim10k = sim_free_hx2026_7_default;
var AP_SLUG_BY_NAME = new Map(week5_ap_top25_2026_default.teams.flatMap((t) => {
	const names = [t.school];
	if (t.slug === "usc") names.push("USC");
	if (t.slug === "miami") names.push("Miami");
	if (t.slug === "ole-miss") names.push("Ole Miss");
	return names.map((n) => [n, t.slug]);
}));
/** HX 2026.7 10k draws — AMD re-sim (seed 20260913). Stamp from meta.hx_stamp when present. */
var SIM_10K_AS_OF = sim10k.meta.as_of;
var SIM_10K_HX_STAMP = sim10k.meta.hx_stamp ?? "HX 2026.7";
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
/** Research Week 5 tape mapped onto the board chrome shape. Headline numbers only from the pack. */
function week5Tape() {
	const m = week5TapePack.meta;
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
		source: "Research week5_tape_2026 · FBS–FBS n=55 · ESPN FINALs"
	};
}
function week5SeasonTape() {
	const m = week5TapePack.meta;
	return {
		label: "W1–W5",
		weeks: [
			1,
			2,
			3,
			4,
			5
		],
		su: m.season_w1_w5_su_frac,
		su_pct: pctFromLabeled(m.season_w1_w5_su),
		hx_closer: m.season_w1_w5_closer_frac,
		hx_closer_pct: pctFromLabeled(m.season_w1_w5_closer),
		note: "Week 1–5 arithmetic from Research week5_tape_2026. Not a fresh W1–W4 audit."
	};
}
function week5BoardFlags() {
	const byEspn = new Map(week5TapePack.games.map((g) => [g.espn_event_id, g]));
	return [...week5TapePack.winner_flip_hits.map((row) => ({
		result: "HIT",
		row
	})), ...week5TapePack.winner_flip_misses.map((row) => ({
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
function week5Top25Tape() {
	const m = week5Top25Pack.meta;
	const vegasN = week5Top25Pack.games.filter((g) => g.closer === "vegas").length;
	return {
		n: m.n_games,
		su: m.su,
		su_pct: m.su_pct,
		hx_closer: m.hx_closer,
		hx_closer_pct: m.hx_closer_pct,
		vegas_closer: `${vegasN}/${m.n_games}`,
		source: "week5_tape_top25_closer_2026 · HX Top 25 involvement n=15 · HX 2026.6 pregame ranks · ESPN FINALs"
	};
}
function simTeamBySlug(slug) {
	return sim10k.teams.find((t) => t.slug === slug);
}
/**
* HX Edge Pack — Scenario Sim AMD contract (2026.09.14).
* MVP: types, validators, request builder, golden fixture runner.
* No browser Monte Carlo. Live CLI path is not wired — desk fixture only.
*
* Free preview metrics only: win_title is Edge Pack / paid and never appears in
* this module's runtime data (the preview renders a locked Edge Pack column).
*/
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
/** Free golden fixture (win_title stripped). Full contract fixture: scenario-sim-contract.server.ts. */
function loadScenarioSimFixture() {
	return scenario_sim_golden_response_free_default;
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
		proj_wins: roundTo(scenario.proj_wins - baseline.proj_wins, 2),
		conf_title: roundTo(scenario.conf_title - baseline.conf_title, 1)
	};
}
function metricsFromSimRow(slug) {
	const row = simTeamBySlug(slug);
	if (!row) return null;
	return {
		make_field: row.make_field,
		proj_wins: roundTo(row.proj_wins, 3),
		conf_title: roundTo(row.conf_title, 2)
	};
}
function zeroDelta() {
	return {
		make_field: 0,
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
* Georgia make-field 75.26 → 52.40 plus the four other AMD return teams.
* Free preview: title odds stay in the Edge Pack (locked column in the UI).
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
var $$splitComponentImporter$2 = () => import("./edge_.sim-Pap1bhx3.mjs");
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
var $$splitComponentImporter$1 = () => import("./stories._slug-rghWCSCD.mjs");
var Route$2 = createFileRoute("/stories/$slug")({
	loader: ({ params }) => {
		const story = getStory(params.slug);
		if (!story) throw notFound();
		return story;
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.headline} · HASHMARK` : "Story · HASHMARK" }] })
});
var $$splitComponentImporter = () => import("./teams._slug-Cjj7kaWG.mjs");
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
	const { handleEdgePackDownload } = await import("./edge-pack-files.server-DJuVV6KJ.mjs");
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
export { TeamSelect as $, Route$10 as A, formatVegas as B, week5Top25Tape as C, Route$8 as D, Route$7 as E, Route$17 as F, ConfPills as G, selectWeekScopedFeatured as H, AP_STAMP as I, EdgeBuyButton as J, EDGE as K, favoriteLine as L, Route$11 as M, Route$13 as N, Route$9 as O, Route$14 as P, Panel as Q, featuredBook as R, week5Tape as S, Route$6 as T, spreadGap as U, isNotableSpreadGap as V, Button as W, EdgePackStrip as X, EdgeCheckoutNote as Y, PageHead as Z, boardDisagreementRows as _, WEEK0_SLATE as a, fmtPct as at, week5BoardFlags as b, SCENARIO_SIM_GOLDEN_EVENT_ID as c, formatScenarioError as d, apLabel as et, isScenarioSimUnlocked as f, SIM_10K_NOTE as g, SIM_10K_HX_STAMP as h, Route$3 as i, fmtNum as it, YEARS as j, defaultWeek as k, SCENARIO_SIM_GOLDEN_FORCE as l, runDemoScenarioSim as m, Route$1 as n, deltaVsAp as nt, SCENARIO_SIM_DEMO_LABEL as o, inConf as ot, loadScenarioSimGoldenRequest as p, EDGE_SUPPORT_EMAIL as q, Route$2 as r, fmtHeight as rt, SCENARIO_SIM_GOLDEN_BUMP as s, router_exports as t, cn as tt, buildScenarioRequest as u, odTermLabel as v, Route$4 as w, week5SeasonTape as x, simTeamBySlug as y, featuredSlateWeek as z };
