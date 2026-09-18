import { o as __toESM } from "../_runtime.mjs";
import { a as fcsStubsForTeam, i as fcsStubIsFinal, m as todayChicago, n as MODEL } from "./fcs-stubs-mzWktTly.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { H as notFound, S as require_jsx_runtime, _ as createFileRoute, b as useNavigate, d as useRouterState, g as lazyRouteComponent, h as Outlet, l as Scripts, p as createRouter, u as HeadContent, v as createRootRoute, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as string, i as object, n as literal, o as union, r as number, t as boolean } from "../_libs/zod.mjs";
import { n as TriangleAlert, o as Menu, r as Search, t as X, u as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-99NqN9pT.js
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
//#region node_modules/.nitro/vite/services/ssr/assets/featured-C0dIFJVf.js
/**
* Last stamped AP ballot on the live board.
* HX chrome is Week 4; AP is the last stamped poll (Week 3, Sept. 13) —
* not an invented Week 4 ballot.
*/
var AP_STAMP = {
	week: 3,
	asOf: "Sept. 13",
	label: "Week 3 AP",
	columnHint: "W3 stamp",
	vsHx: "last stamped AP (Week 3, Sept. 13)",
	lede: "HX is Week 4. AP is the last stamped poll (Week 3, Sept. 13) — not a Week 4 ballot."
};
/** Thursday night flag: Colorado at Georgia Tech, Bobby Dodd. */
var WEEK1_FLAG = {
	homeSlug: "georgia-tech",
	awaySlug: "colorado"
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
* Board featured for the live chrome week.
* Week 2 Research pins (Ohio State @ Texas, Oklahoma @ Michigan) stay as
* historical helpers only — those rows are FINAL and must not feature.
* Week 4: next upcoming FBS kick on the week-4 slate (Research featured is
* Liberty @ Coastal Carolina — earliest stamped kick; Vegas HOLD, do not invent).
* Never a FINAL. Never FCS. Never invent a book or matchup.
*/
function selectBoardFeaturedKick(slate, nowMs) {
	return selectFeaturedKick(slate, nowMs);
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
//#region node_modules/.nitro/vite/services/ssr/assets/stories-DpwjH5vl.js
var STORY_DATE = "Friday, Aug 28, 2026";
var STORY_DATE_WEEK1 = "Friday, Sep 4, 2026";
var STORIES = [
	{
		slug: "week-2-tape",
		kicker: "Week 2 tape",
		headline: "Week 2 tape: 37/47 SU, 20/47 closer FLAG. Top 25 closer 12/19.",
		dek: "Full slate closer is a FLAG. HX Top 25 desk beat the book 12/19. HX not retuned.",
		date: "Sunday, Sep 13, 2026",
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
		date: "Tuesday, Sep 8, 2026",
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
//#region node_modules/.nitro/vite/services/ssr/assets/router-DJtCggE9.js
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
var styles_default = "/assets/styles-DjUxmTQn.css";
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$16 = () => import("./routes-BcNPyryr.mjs");
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
var $$splitComponentImporter$15 = () => import("./desk-BsJAKn3q.mjs");
var Route$16 = createFileRoute("/desk")({
	component: lazyRouteComponent($$splitComponentImporter$15, "component"),
	head: () => ({ meta: [{ title: "The desk · HASHMARK" }, {
		name: "description",
		content: "What HASHMARK is, how HX is built, and the glossary for the college football ratings desk."
	}] })
});
var $$splitComponentImporter$14 = () => import("./edge-D2Ifx1Ob.mjs");
var Route$15 = createFileRoute("/edge")({
	component: lazyRouteComponent($$splitComponentImporter$14, "component"),
	head: () => ({ meta: [{ title: `${EDGE.name} · HASHMARK` }, {
		name: "description",
		content: "HX Edge Pack is the weekly depth product. The $5 week sample is the full pack — confidence cards, unit O/D pulse, tape write-up — not the free-board teaser. The public board stays free."
	}] })
});
var $$splitComponentImporter$13 = () => import("./logos-CqA-JAIJ.mjs");
var Route$14 = createFileRoute("/logos")({
	loader: async () => listTeams(),
	component: lazyRouteComponent($$splitComponentImporter$13, "component"),
	head: () => ({ meta: [{ title: "Team logos · HASHMARK" }] })
});
var $$splitComponentImporter$12 = () => import("./matchup-Bx2YH1Qg.mjs");
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
var $$splitComponentImporter$11 = () => import("./model-B47PjvaD.mjs");
var Route$12 = createFileRoute("/model")({
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	head: () => ({ meta: [{ title: "The Model · HASHMARK" }] })
});
var $$splitComponentImporter$10 = () => import("./rankings-D8dO35Be.mjs");
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
var $$splitComponentImporter$9 = () => import("./recruiting-Cnr2V239.mjs");
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
function defaultWeek(ymd) {
	if (ymd <= "2026-08-30") return 0;
	if (ymd <= "2026-09-07") return 1;
	if (ymd <= "2026-09-12") return 2;
	return Math.min(13, 3);
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
var $$splitComponentImporter$8 = () => import("./schedule-b4kntviT.mjs");
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
var $$splitComponentImporter$7 = () => import("./states-CptATVon.mjs");
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
var $$splitComponentImporter$6 = () => import("./stories-CL-ookZ2.mjs");
var Route$7 = createFileRoute("/stories")({
	loader: () => listStories(),
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({ meta: [{ title: "Stories · HASHMARK" }] })
});
var $$splitComponentImporter$5 = () => import("./talent-DjrRylmz.mjs");
var Route$6 = createFileRoute("/talent")({
	validateSearch: (s) => ({
		board: s.board === "size" ? "size" : "composite",
		conf: parseConf(s.conf)
	}),
	loader: () => listTeams(),
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [{ title: "Roster Talent · HASHMARK" }] })
});
var $$splitComponentImporter$4 = () => import("./edge.board-CmPkOgQe.mjs");
var Route$5 = createFileRoute("/edge/board")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: `Edge Board · ${EDGE.name} · HASHMARK` }, {
		name: "description",
		content: "HX Edge Board v1 — confidence schema: tiers A–D, calibration FLAGS, small/medium/large edge bands (large ≥ 7 pts), copy bans. Free board is HX vs Vegas. Paid pack is ranked cards."
	}] })
});
var verifyEdgeUnlock = createServerFn({ method: "GET" }).validator(object({ sessionId: string().optional() })).handler(createSsrRpc("4fe58dd28fd7340a345c36b313f0f7fe83bb1daaeec7d6b97ee43c0751bef21c"));
var $$splitComponentImporter$3 = () => import("./edge.unlock-C8EkMwfY.mjs");
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
var week1_hx_vs_ap_gaps_2026_default = {
	as_of: "2026-09-08",
	source_ap: "week1_ap_top25_2026 / Research clear",
	source_hx: "week1_od_hx_ship_2026.json",
	gaps: [
		{
			"name": "Virginia",
			"ap": 25,
			"hx": 45,
			"hx_rating": 1.4645,
			"delta": -20
		},
		{
			"name": "Houston",
			"ap": 22,
			"hx": 40,
			"hx_rating": 1.6041,
			"delta": -18
		},
		{
			"name": "LSU",
			"ap": 8,
			"hx": 19,
			"hx_rating": 4.0619,
			"delta": -11
		},
		{
			"name": "Missouri",
			"ap": 23,
			"hx": 14,
			"hx_rating": 4.3308,
			"delta": 9
		},
		{
			"name": "USC",
			"ap": 14,
			"hx": 21,
			"hx_rating": 3.8873,
			"delta": -7
		},
		{
			"name": "Indiana",
			"ap": 5,
			"hx": 11,
			"hx_rating": 4.981,
			"delta": -6
		},
		{
			"name": "Texas Tech",
			"ap": 13,
			"hx": 7,
			"hx_rating": 5.9024,
			"delta": 6
		},
		{
			"name": "Washington",
			"ap": 19,
			"hx": 25,
			"hx_rating": 3.3275,
			"delta": -6
		},
		{
			"name": "Oklahoma",
			"ap": 11,
			"hx": 16,
			"hx_rating": 4.1987,
			"delta": -5
		},
		{
			"name": "Utah",
			"ap": 20,
			"hx": 15,
			"hx_rating": 4.2403,
			"delta": 5
		},
		{
			"name": "Texas A&M",
			"ap": 10,
			"hx": 6,
			"hx_rating": 6.1871,
			"delta": 4
		},
		{
			"name": "Miami",
			"ap": 7,
			"hx": 10,
			"hx_rating": 5.2345,
			"delta": -3
		},
		{
			"name": "Alabama",
			"ap": 12,
			"hx": 9,
			"hx_rating": 5.343,
			"delta": 3
		},
		{
			"name": "BYU",
			"ap": 15,
			"hx": 18,
			"hx_rating": 4.0673,
			"delta": -3
		},
		{
			"name": "Penn State",
			"ap": 16,
			"hx": 13,
			"hx_rating": 4.4001,
			"delta": 3
		}
	],
	hx_not_in_ap: [
		{
			"hx_rank": 12,
			"name": "Michigan",
			"hx": 4.8893
		},
		{
			"hx_rank": 22,
			"name": "Clemson",
			"hx": 3.8551
		},
		{
			"hx_rank": 24,
			"name": "Florida",
			"hx": 3.4941
		}
	],
	ap_not_in_hx25: [
		{
			"ap": 25,
			"name": "Virginia",
			"hx_rank": 45
		},
		{
			"ap": 22,
			"name": "Houston",
			"hx_rank": 40
		},
		{
			"ap": 24,
			"name": "Louisville",
			"hx_rank": 26
		}
	]
};
var week2_tape_2026_default = {
	meta: {
		"week": 2,
		"season": 2026,
		"as_of": "2026-09-13",
		"as_of_tz": "America/Chicago",
		"scope": "FBS–FBS only",
		"n": 47,
		"hx_version": "2026.3",
		"hx_policy": "pre-Δ · HX not retuned · no 2026.4 in this pack",
		"live_clear": "ESPN FINALs already stamped (early-window + remaining CLEAR packs)",
		"sources": [
			"Research week2_tape_2026 (LIVE CLEAR already on FINALs)",
			"data/week2_fbs_fbs_kick_tv_vegas_2026.json — Research Vegas pack",
			"data/week2_early_window_finals_clear_2026.json — ESPN STATUS_FINAL",
			"data/week2_remaining_finals_clear_2026.json — ESPN STATUS_FINAL"
		],
		"policy": "Do not invent scores or lines. FBS–FBS only. No FCS posts. HX stays 2026.3."
	},
	tape: {
		"n": 47,
		"su": "37/47",
		"su_pct": 78.7,
		"hx_closer": "20/47",
		"hx_closer_pct": 42.6,
		"closer_flag": true,
		"closer_flag_rule": "<45%",
		"vegas_closer": "27/47",
		"hx_ats": "20/47",
		"hx_ats_pct": 42.6,
		"mae_hx": 12.2,
		"mae_vegas": 10.49,
		"brier": .147,
		"source": "Research week2_tape_2026 · FBS–FBS n=47 · ESPN FINALs"
	},
	season: {
		"label": "W1–W2",
		"weeks": [1, 2],
		"su": "73/90",
		"su_pct": 81.1,
		"hx_closer": "40/90",
		"hx_closer_pct": 44.4,
		"note": "Week 1 36/43 SU · 20/43 closer plus Week 2 37/47 SU · 20/47 closer"
	},
	board_flags: [{
		"id": "michigan-winner-flip",
		"label": "Michigan winner-flip",
		"result": "HIT",
		"matchup": "Oklahoma @ Michigan",
		"espn_event_id": "401856679",
		"hx": "Mich −5.4",
		"vegas": "OU −5.5",
		"final": "Mich 17–10",
		"away_score": 10,
		"home_score": 17
	}, {
		"id": "osu-at-texas",
		"label": "OSU @ Texas",
		"result": "MISS",
		"matchup": "Ohio State @ Texas",
		"espn_event_id": "401856682",
		"hx": "Ohio St −1.0",
		"vegas": "TEX −1.5",
		"final": "Texas 24–23",
		"away_score": 23,
		"home_score": 24
	}],
	su_misses: [
		{
			"n": 1,
			"matchup": "Rutgers @ Boston College",
			"espn_event_id": "401858214",
			"hx_favorite": "Rutgers",
			"hx": "Rutgers −3.3",
			"vegas": "BC −3.5",
			"final": "21–28",
			"away_score": 21,
			"home_score": 28,
			"winner_flip_miss": true
		},
		{
			"n": 2,
			"matchup": "App State @ East Carolina",
			"espn_event_id": "401864571",
			"hx_favorite": "East Carolina",
			"hx": "ECU −9.1",
			"vegas": "ECU −6.5",
			"final": "27–24",
			"away_score": 27,
			"home_score": 24,
			"winner_flip_miss": false
		},
		{
			"n": 3,
			"matchup": "Oregon @ Oklahoma State",
			"espn_event_id": "401856782",
			"hx_favorite": "Oregon",
			"hx": "Oregon −27.0",
			"vegas": "ORE −23.5",
			"final": "31–39",
			"away_score": 31,
			"home_score": 39,
			"winner_flip_miss": false
		},
		{
			"n": 4,
			"matchup": "Duke @ Illinois",
			"espn_event_id": "401858217",
			"hx_favorite": "Illinois",
			"hx": "ILL −3.7",
			"vegas": "ILL −5.5",
			"final": "31–27",
			"away_score": 31,
			"home_score": 27,
			"winner_flip_miss": false
		},
		{
			"n": 5,
			"matchup": "Mississippi State @ Minnesota",
			"espn_event_id": "401856677",
			"hx_favorite": "Minnesota",
			"hx": "MINN −9.2",
			"vegas": "MSST −1.5",
			"final": "38–13",
			"away_score": 38,
			"home_score": 13,
			"winner_flip_miss": true
		},
		{
			"n": 6,
			"matchup": "UTSA @ Texas State",
			"espn_event_id": "401860884",
			"hx_favorite": "Texas State",
			"hx": "TXST −1.3",
			"vegas": "TXST −1.5",
			"final": "31–26",
			"away_score": 31,
			"home_score": 26,
			"winner_flip_miss": false
		},
		{
			"n": 7,
			"matchup": "UNLV @ North Texas",
			"espn_event_id": "401862705",
			"hx_favorite": "UNLV",
			"hx": "UNLV −9.2",
			"vegas": "UNLV −3",
			"final": "6–44",
			"away_score": 6,
			"home_score": 44,
			"winner_flip_miss": false
		},
		{
			"n": 8,
			"matchup": "Georgia State @ Kennesaw State",
			"espn_event_id": "401869955",
			"hx_favorite": "Kennesaw State",
			"hx": "KENN −4.9",
			"vegas": "KENN −7.5",
			"final": "31–17",
			"away_score": 31,
			"home_score": 17,
			"winner_flip_miss": false
		},
		{
			"n": 9,
			"matchup": "Tulsa @ Sam Houston",
			"espn_event_id": "401862707",
			"hx_favorite": "Sam Houston",
			"hx": "SHSU −0.1",
			"vegas": "TLSA −13.5",
			"final": "23–17",
			"away_score": 23,
			"home_score": 17,
			"winner_flip_miss": true
		},
		{
			"n": 10,
			"matchup": "Ohio State @ Texas",
			"espn_event_id": "401856682",
			"hx_favorite": "Ohio State",
			"hx": "Ohio St −1.0",
			"vegas": "TEX −1.5",
			"final": "23–24",
			"away_score": 23,
			"home_score": 24,
			"winner_flip_miss": true
		}
	],
	winner_flip_hits: [
		{
			"matchup": "South Florida @ Army",
			"espn_event_id": "401862702",
			"vegas": "ARMY −3.5",
			"final": "28–24",
			"away_score": 28,
			"home_score": 24,
			"hx": null,
			"note": "Research tape lists as winner-flip HIT. HX line not in the excerpt."
		},
		{
			"matchup": "Oklahoma @ Michigan",
			"espn_event_id": "401856679",
			"hx": "Mich −5.4",
			"vegas": "OU −5.5",
			"final": "10–17",
			"away_score": 10,
			"home_score": 17
		},
		{
			"matchup": "California @ Syracuse",
			"espn_event_id": "401858216",
			"vegas": "SYR −3.5",
			"final": "21–18",
			"away_score": 21,
			"home_score": 18,
			"hx": null,
			"note": "Research tape lists as winner-flip HIT. HX line not in the excerpt."
		},
		{
			"matchup": "Navy @ Florida Atlantic",
			"espn_event_id": "401862703",
			"vegas": "NAVY −4.5",
			"final": "30–38",
			"away_score": 30,
			"home_score": 38,
			"hx": null,
			"note": "Research tape lists as winner-flip HIT. HX line not in the excerpt."
		}
	],
	games_summary: {
		"n": 47,
		"scope": "FBS–FBS only",
		"su_hits": 37,
		"su_misses": 10,
		"hx_closer_hits": 20,
		"vegas_closer_hits": 27,
		"hx_ats_hits": 20,
		"winner_flip_hits": 4,
		"winner_flip_misses": 4,
		"su_miss_favorites": [
			"Rutgers",
			"East Carolina",
			"Oregon",
			"Illinois",
			"Minnesota",
			"Texas State",
			"UNLV",
			"Kennesaw State",
			"Sam Houston",
			"Ohio State"
		]
	}
};
var week2_tape_top25_closer_2026_default = {
	meta: {
		"week": 2,
		"season": 2026,
		"as_of": "2026-09-13",
		"as_of_tz": "America/Chicago",
		"scope": "FBS–FBS with ≥1 HX Top 25 team (hx_rank ≤25 on HX 2026.3 pre-Δ)",
		"n": 19,
		"hx_version": "2026.3",
		"hx_policy": "pre-Δ · HX not retuned · no 2026.4 in this pack",
		"primary_cut": "HX Top 25 involvement",
		"live_clear": "ESPN FINALs already stamped (early-window + remaining CLEAR packs)",
		"sources": [
			"Research week2_tape_top25_closer_2026",
			"Research week2_tape_2026 — full slate 37/47 SU · 20/47 closer FLAG",
			"data/week2_fbs_fbs_kick_tv_vegas_2026.json — Research Vegas pack",
			"data/week2_early_window_finals_clear_2026.json — ESPN STATUS_FINAL",
			"data/week2_remaining_finals_clear_2026.json — ESPN STATUS_FINAL",
			"data/week1_od_hx_ship_2026.json — hx_rank_pre for HX 2026.3 Top 25 set"
		],
		"policy": "Do not invent scores or lines. FBS–FBS only. No FCS posts. HX stays 2026.3. HX lines only where the Week 2 tape already published them."
	},
	tape: {
		"n": 19,
		"su": "17/19",
		"su_pct": 89.5,
		"hx_closer": "12/19",
		"hx_closer_pct": 63.2,
		"vegas_closer": "7/19",
		"mae_hx": 10.81,
		"mae_vegas": 12.03,
		"source": "Research week2_tape_top25_closer_2026 · HX Top 25 involvement n=19 · ESPN FINALs"
	},
	full_slate: {
		"n": 47,
		"su": "37/47",
		"su_pct": 78.7,
		"hx_closer": "20/47",
		"hx_closer_pct": 42.6,
		"closer_flag": true,
		"note": "Full slate closer remains FLAG. Top 25 cut is the public scorecard beat."
	},
	ap_alt: {
		"n": 18,
		"hx_closer": "12/18",
		"hx_closer_pct": 66.7,
		"note": "AP-only involvement. HX Top 25 (n=19) is the primary cut."
	},
	su_misses: [{
		"matchup": "Oregon @ Oklahoma State",
		"espn_event_id": "401856782",
		"hx": "Oregon −27.0",
		"vegas": "ORE −23.5",
		"final": "31–39",
		"away_score": 31,
		"home_score": 39,
		"closer": "Vegas"
	}, {
		"matchup": "Ohio State @ Texas",
		"espn_event_id": "401856682",
		"hx": "Ohio St −1.0",
		"vegas": "TEX −1.5",
		"final": "23–24",
		"away_score": 23,
		"home_score": 24,
		"closer": "Vegas"
	}],
	hx_closer_hits: [
		{
			"matchup": "Missouri @ Kansas",
			"espn_event_id": "401856678",
			"vegas": "MIZ −5.5",
			"final": "38–21",
			"away_score": 38,
			"home_score": 21
		},
		{
			"matchup": "Oklahoma @ Michigan",
			"espn_event_id": "401856679",
			"hx": "Mich −5.4",
			"vegas": "OU −5.5",
			"final": "10–17",
			"away_score": 10,
			"home_score": 17
		},
		{
			"matchup": "Arizona State @ Texas A&M",
			"espn_event_id": "401856683",
			"vegas": "TA&M −15.5",
			"final": "20–48",
			"away_score": 20,
			"home_score": 48
		},
		{
			"matchup": "Arizona @ BYU",
			"espn_event_id": "401856810",
			"vegas": "BYU −7.5",
			"final": "17–28",
			"away_score": 17,
			"home_score": 28
		},
		{
			"matchup": "Rice @ Notre Dame",
			"espn_event_id": "401859184",
			"vegas": "ND −44.5",
			"final": "0–52",
			"away_score": 0,
			"home_score": 52
		},
		{
			"matchup": "Alabama @ Kentucky",
			"espn_event_id": "401856674",
			"vegas": "ALA −10",
			"final": "45–17",
			"away_score": 45,
			"home_score": 17
		},
		{
			"matchup": "Utah State @ Washington",
			"espn_event_id": "401858446",
			"vegas": "WASH −27.5",
			"final": "14–16",
			"away_score": 14,
			"home_score": 16
		},
		{
			"matchup": "Iowa State @ Iowa",
			"espn_event_id": "401856788",
			"vegas": "IOWA −14",
			"final": "13–16",
			"away_score": 13,
			"home_score": 16
		},
		{
			"matchup": "Louisiana Tech @ LSU",
			"espn_event_id": "401867796",
			"vegas": "LSU −35.5",
			"final": "14–45",
			"away_score": 14,
			"home_score": 45
		},
		{
			"matchup": "Texas Tech @ Oregon State",
			"espn_event_id": "401856783",
			"vegas": "TTU −26.5",
			"final": "35–24",
			"away_score": 35,
			"home_score": 24
		},
		{
			"matchup": "Arkansas @ Utah",
			"espn_event_id": "401856670",
			"vegas": "UTAH −12.5",
			"final": "10–43",
			"away_score": 10,
			"home_score": 43
		},
		{
			"matchup": "Louisiana @ USC",
			"espn_event_id": "401858445",
			"vegas": "USC −31.5",
			"final": "30–49",
			"away_score": 30,
			"home_score": 49
		}
	],
	vegas_closer: [
		{
			"matchup": "Oregon @ Oklahoma State",
			"espn_event_id": "401856782",
			"hx": "Oregon −27.0",
			"vegas": "ORE −23.5",
			"final": "31–39",
			"away_score": 31,
			"home_score": 39,
			"su_miss": true
		},
		{
			"matchup": "Penn State @ Temple",
			"espn_event_id": "401858442",
			"vegas": "PSU −23.5",
			"final": "27–9",
			"away_score": 27,
			"home_score": 9
		},
		{
			"matchup": "Western Kentucky @ Georgia",
			"espn_event_id": "401856673",
			"vegas": "UGA −40.5",
			"final": "20–70",
			"away_score": 20,
			"home_score": 70
		},
		{
			"matchup": "Tennessee @ Georgia Tech",
			"espn_event_id": "401856681",
			"vegas": "TENN −12.5",
			"final": "45–24",
			"away_score": 45,
			"home_score": 24
		},
		{
			"matchup": "Georgia Southern @ Clemson",
			"espn_event_id": "401858219",
			"vegas": "CLEM −19.5",
			"final": "7–22",
			"away_score": 7,
			"home_score": 22
		},
		{
			"matchup": "Ohio State @ Texas",
			"espn_event_id": "401856682",
			"hx": "Ohio St −1.0",
			"vegas": "TEX −1.5",
			"final": "23–24",
			"away_score": 23,
			"home_score": 24,
			"su_miss": true
		},
		{
			"matchup": "Charlotte @ Ole Miss",
			"espn_event_id": "401856676",
			"vegas": "MISS −45.5",
			"final": "9–41",
			"away_score": 9,
			"home_score": 41
		}
	],
	games_summary: {
		"n": 19,
		"scope": "FBS–FBS with ≥1 HX Top 25 team",
		"su_hits": 17,
		"su_misses": 2,
		"hx_closer_hits": 12,
		"vegas_closer_hits": 7,
		"su_miss_matchups": ["Oregon @ Oklahoma State", "Ohio State @ Texas"]
	}
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
var week1_ap_top25_2026_default = {
	label: "Week 1 AP",
	poll: "AP Top 25",
	season: 2026,
	as_of: "2026-09-08",
	source: "ESPN rankings API AP Top 25 (https://site.api.espn.com/apis/site/v2/sports/football/college-football/rankings)",
	source_note: "First regular-season AP poll after Week 1. AP.org hub is JS-rendered; ESPN carries the official AP ballot. Corroborated by AP wire “AP Top 25 Fared” (Sept 8).",
	chrome: "Week 1 AP (not Aug 17 preseason)",
	n: 25,
	dropped_from_preseason: ["Michigan"],
	new_to_top25: ["Virginia"],
	teams: [
		{
			"rank": 1,
			"prev": 1,
			"team": "Ohio State",
			"slug": "ohio-state",
			"record": "1-0",
			"points": 1684,
			"first_place_votes": 46,
			"trend": "-"
		},
		{
			"rank": 2,
			"prev": 3,
			"team": "Georgia",
			"slug": "georgia",
			"record": "1-0",
			"points": 1532,
			"first_place_votes": 0,
			"trend": "+1"
		},
		{
			"rank": 3,
			"prev": 4,
			"team": "Notre Dame",
			"slug": "notre-dame",
			"record": "1-0",
			"points": 1512,
			"first_place_votes": 4,
			"trend": "+1"
		},
		{
			"rank": 4,
			"prev": 5,
			"team": "Texas",
			"slug": "texas",
			"record": "1-0",
			"points": 1462,
			"first_place_votes": 2,
			"trend": "+1"
		},
		{
			"rank": 5,
			"prev": 6,
			"team": "Indiana",
			"slug": "indiana",
			"record": "1-0",
			"points": 1428,
			"first_place_votes": 8,
			"trend": "+1"
		},
		{
			"rank": 6,
			"prev": 2,
			"team": "Oregon",
			"slug": "oregon",
			"record": "1-0",
			"points": 1422,
			"first_place_votes": 3,
			"trend": "-4"
		},
		{
			"rank": 7,
			"prev": 7,
			"team": "Miami",
			"slug": "miami",
			"record": "1-0",
			"points": 1405,
			"first_place_votes": 1,
			"trend": "-"
		},
		{
			"rank": 8,
			"prev": 11,
			"team": "LSU",
			"slug": "lsu",
			"record": "1-0",
			"points": 1315,
			"first_place_votes": 5,
			"trend": "+3"
		},
		{
			"rank": 9,
			"prev": 9,
			"team": "Ole Miss",
			"slug": "ole-miss",
			"record": "1-0",
			"points": 1154,
			"first_place_votes": 0,
			"trend": "-"
		},
		{
			"rank": 10,
			"prev": 8,
			"team": "Texas A&M",
			"slug": "texas-am",
			"record": "1-0",
			"points": 1079,
			"first_place_votes": 0,
			"trend": "-2"
		},
		{
			"rank": 11,
			"prev": 10,
			"team": "Oklahoma",
			"slug": "oklahoma",
			"record": "1-0",
			"points": 1039,
			"first_place_votes": 0,
			"trend": "-1"
		},
		{
			"rank": 12,
			"prev": 13,
			"team": "Alabama",
			"slug": "alabama",
			"record": "1-0",
			"points": 910,
			"first_place_votes": 0,
			"trend": "+1"
		},
		{
			"rank": 13,
			"prev": 12,
			"team": "Texas Tech",
			"slug": "texas-tech",
			"record": "1-0",
			"points": 900,
			"first_place_votes": 0,
			"trend": "-1"
		},
		{
			"rank": 14,
			"prev": 14,
			"team": "USC",
			"slug": "usc",
			"record": "2-0",
			"points": 861,
			"first_place_votes": 0,
			"trend": "-"
		},
		{
			"rank": 15,
			"prev": 14,
			"team": "BYU",
			"slug": "byu",
			"record": "1-0",
			"points": 840,
			"first_place_votes": 0,
			"trend": "-1"
		},
		{
			"rank": 16,
			"prev": 18,
			"team": "Penn State",
			"slug": "penn-state",
			"record": "1-0",
			"points": 621,
			"first_place_votes": 0,
			"trend": "+2"
		},
		{
			"rank": 17,
			"prev": 19,
			"team": "SMU",
			"slug": "smu",
			"record": "1-0",
			"points": 501,
			"first_place_votes": 0,
			"trend": "+2"
		},
		{
			"rank": 18,
			"prev": 20,
			"team": "Tennessee",
			"slug": "tennessee",
			"record": "1-0",
			"points": 491,
			"first_place_votes": 0,
			"trend": "+2"
		},
		{
			"rank": 19,
			"prev": 17,
			"team": "Washington",
			"slug": "washington",
			"record": "1-0",
			"points": 489,
			"first_place_votes": 0,
			"trend": "-2"
		},
		{
			"rank": 20,
			"prev": 21,
			"team": "Utah",
			"slug": "utah",
			"record": "1-0",
			"points": 381,
			"first_place_votes": 0,
			"trend": "+1"
		},
		{
			"rank": 21,
			"prev": 22,
			"team": "Iowa",
			"slug": "iowa",
			"record": "1-0",
			"points": 369,
			"first_place_votes": 0,
			"trend": "+1"
		},
		{
			"rank": 22,
			"prev": 23,
			"team": "Houston",
			"slug": "houston",
			"record": "1-0",
			"points": 214,
			"first_place_votes": 0,
			"trend": "+1"
		},
		{
			"rank": 23,
			"prev": 25,
			"team": "Missouri",
			"slug": "missouri",
			"record": "1-0",
			"points": 182,
			"first_place_votes": 0,
			"trend": "+2"
		},
		{
			"rank": 24,
			"prev": 24,
			"team": "Louisville",
			"slug": "louisville",
			"record": "0-1",
			"points": 163,
			"first_place_votes": 0,
			"trend": "-"
		},
		{
			"rank": 25,
			"prev": null,
			"team": "Virginia",
			"slug": "virginia",
			"record": "1-0",
			"points": 89,
			"first_place_votes": 0,
			"trend": "+1"
		}
	]
};
/**
* Truth-pack loaders. Numbers come from the AMD / Research JSON payloads —
* do not invent deltas, tape rates, or make/title splits.
*
*   data/week1_hx_vs_ap_gaps_2026.json
*   data/week1_accountability_pack_2026.json
*   data/week2_tape_2026.json
*   data/week2_tape_top25_closer_2026.json
*   data/sim_10k_2026_hx2026_4.json
*/
var DISAGREE_HIGHLIGHT_NAMES = [
	"Virginia",
	"Houston",
	"LSU",
	"Missouri",
	"Texas Tech"
];
var hxApGaps = week1_hx_vs_ap_gaps_2026_default;
var week2TapePack = week2_tape_2026_default;
var week2Top25Pack = week2_tape_top25_closer_2026_default;
var sim10k = sim_10k_2026_hx2026_4_default;
var AP_SLUG_BY_NAME = new Map(week1_ap_top25_2026_default.teams.map((t) => [t.team, t.slug]));
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
function week2Tape() {
	return week2TapePack.tape;
}
function week2SeasonTape() {
	return week2TapePack.season;
}
function week2BoardFlags() {
	return week2TapePack.board_flags;
}
function week2Top25Tape() {
	return week2Top25Pack.tape;
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
var $$splitComponentImporter$2 = () => import("./edge_.sim-CGvKIeCj.mjs");
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
var $$splitComponentImporter$1 = () => import("./stories._slug-gAT182vs.mjs");
var Route$2 = createFileRoute("/stories/$slug")({
	loader: ({ params }) => {
		const story = getStory(params.slug);
		if (!story) throw notFound();
		return story;
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.headline} · HASHMARK` : "Story · HASHMARK" }] })
});
var $$splitComponentImporter = () => import("./teams._slug-DfsiLm8X.mjs");
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
export { Panel as $, Route$8 as A, favoriteLine as B, week2BoardFlags as C, Route$4 as D, week2Top25Tape as E, Route$11 as F, Button as G, featuredSlateWeek as H, Route$13 as I, EDGE_SUPPORT_EMAIL as J, ConfPills as K, Route$14 as L, defaultWeek as M, Route$10 as N, Route$6 as O, YEARS as P, PageHead as Q, Route$17 as R, odTermLabel as S, week2Tape as T, formatVegas as U, featuredBook as V, spreadGap as W, EdgeCheckoutNote as X, EdgeBuyButton as Y, EdgePackStrip as Z, make12FieldLabel as _, WEEK0_SLATE as a, fmtNum as at, make12TitleLabel as b, SCENARIO_SIM_GOLDEN_EVENT_ID as c, formatScenarioError as d, TeamSelect as et, isScenarioSimUnlocked as f, buildSeasonSchedule as g, buildRemainingSchedule as h, Route$3 as i, fmtHeight as it, Route$9 as j, Route$7 as k, SCENARIO_SIM_GOLDEN_FORCE as l, runDemoScenarioSim as m, Route$1 as n, cn as nt, SCENARIO_SIM_DEMO_LABEL as o, fmtPct as ot, loadScenarioSimGoldenRequest as p, EDGE as q, Route$2 as r, deltaVsAp as rt, SCENARIO_SIM_GOLDEN_BUMP as s, inConf as st, router_exports as t, apLabel as tt, buildScenarioRequest as u, make12FromSim as v, week2SeasonTape as w, boardDisagreementRows as x, make12PanelLede as y, AP_STAMP as z };
