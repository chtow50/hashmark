import { o as __toESM } from "../_runtime.mjs";
import { n as addDaysYmd, t as MODEL, u as todayChicago } from "./chicago-BWYtrpnu.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useRouter, Q as notFound, S as useNavigate, Y as redirect, _ as Outlet, b as createRootRoute, d as Scripts, f as HeadContent, h as createRouter, p as useRouterState, v as lazyRouteComponent, w as require_jsx_runtime, x as Link, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as createServerFn } from "./ssr.mjs";
import { a as object, i as number, o as string, r as literal, s as union, t as _enum } from "../_libs/zod.mjs";
import { c as listScheduleWeek, i as getTeam, l as listStates, n as getMatchup, o as listGames, r as getStateDetail, s as listRecruiting, t as createSsrRpc, u as listTeams } from "./queries-Dk--NEHa.mjs";
import { i as Search, n as TriangleAlert, o as Menu, r as Star, t as X } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { a as STAT_TABS, f as metricOf, p as parseTab, t as COLUMN_SETS } from "./stats-Bm1Dth9z.mjs";
import { t as Analytics } from "../_libs/vercel__analytics.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-DpewCw0l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Slugs with a committed asset under `public/logos/`. */
var TEAM_LOGO_SLUGS = new Set(Object.keys({
	"alabama": 333,
	"arkansas": 8,
	"auburn": 2,
	"florida": 57,
	"georgia": 61,
	"kentucky": 96,
	"lsu": 99,
	"mississippi-state": 344,
	"missouri": 142,
	"oklahoma": 201,
	"ole-miss": 145,
	"south-carolina": 2579,
	"tennessee": 2633,
	"texas": 251,
	"texas-am": 245,
	"vanderbilt": 238,
	"illinois": 356,
	"indiana": 84,
	"iowa": 2294,
	"maryland": 120,
	"michigan": 130,
	"michigan-state": 127,
	"minnesota": 135,
	"nebraska": 158,
	"northwestern": 77,
	"ohio-state": 194,
	"oregon": 2483,
	"penn-state": 213,
	"purdue": 2509,
	"rutgers": 164,
	"ucla": 26,
	"usc": 30,
	"washington": 264,
	"wisconsin": 275,
	"boston-college": 103,
	"california": 25,
	"clemson": 228,
	"duke": 150,
	"florida-state": 52,
	"georgia-tech": 59,
	"louisville": 97,
	"miami": 2390,
	"nc-state": 152,
	"north-carolina": 153,
	"pittsburgh": 221,
	"smu": 2567,
	"stanford": 24,
	"syracuse": 183,
	"virginia": 258,
	"virginia-tech": 259,
	"wake-forest": 154,
	"arizona": 12,
	"arizona-state": 9,
	"baylor": 239,
	"byu": 252,
	"cincinnati": 2132,
	"colorado": 38,
	"houston": 248,
	"iowa-state": 66,
	"kansas": 2305,
	"kansas-state": 2306,
	"oklahoma-state": 197,
	"tcu": 2628,
	"texas-tech": 2641,
	"ucf": 2116,
	"utah": 254,
	"west-virginia": 277,
	"army": 349,
	"charlotte": 2429,
	"east-carolina": 151,
	"florida-atlantic": 2226,
	"memphis": 235,
	"navy": 2426,
	"north-texas": 249,
	"rice": 242,
	"temple": 218,
	"tulane": 2655,
	"tulsa": 202,
	"uab": 5,
	"usf": 58,
	"utsa": 2636,
	"air-force": 2005,
	"boise-state": 68,
	"colorado-state": 36,
	"fresno-state": 278,
	"hawaii": 62,
	"north-dakota-state": 2449,
	"nevada": 2440,
	"new-mexico": 167,
	"san-diego-state": 21,
	"san-jose-state": 23,
	"unlv": 2439,
	"utah-state": 328,
	"wyoming": 2751,
	"app-state": 2026,
	"arkansas-state": 2032,
	"coastal-carolina": 324,
	"georgia-southern": 290,
	"georgia-state": 2247,
	"james-madison": 256,
	"louisiana": 309,
	"marshall": 276,
	"old-dominion": 295,
	"south-alabama": 6,
	"southern-miss": 2572,
	"texas-state": 326,
	"troy": 2653,
	"ul-monroe": 2433,
	"akron": 2006,
	"ball-state": 2050,
	"bowling-green": 189,
	"buffalo": 2084,
	"central-michigan": 2117,
	"eastern-michigan": 2199,
	"kent-state": 2309,
	"massachusetts": 113,
	"miami-oh": 193,
	"northern-illinois": 2459,
	"ohio": 195,
	"toledo": 2649,
	"sacramento-state": 16,
	"western-michigan": 2711,
	"delaware": 48,
	"fiu": 2229,
	"jacksonville-state": 55,
	"kennesaw-state": 338,
	"liberty": 2335,
	"louisiana-tech": 2348,
	"middle-tennessee": 2393,
	"missouri-state": 2623,
	"new-mexico-state": 166,
	"sam-houston": 2534,
	"utep": 2638,
	"western-kentucky": 98,
	"oregon-state": 204,
	"washington-state": 265,
	"notre-dame": 87,
	"uconn": 41
}));
function hasTeamLogo(slug) {
	return TEAM_LOGO_SLUGS.has(slug);
}
function teamLogoSrc(slug) {
	return hasTeamLogo(slug) ? `/logos/${slug}.png` : null;
}
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
var DEFAULT_SIZE = 18;
function TeamLogo({ slug, size = DEFAULT_SIZE, className }) {
	const src = teamLogoSrc(slug);
	const [hidden, setHidden] = (0, import_react.useState)(false);
	if (!src || hidden) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: "",
		width: size,
		height: size,
		loading: "lazy",
		decoding: "async",
		className: cn("inline-block shrink-0 object-contain", className),
		style: {
			width: size,
			height: size,
			filter: "drop-shadow(0 0 0.75px rgba(242,241,236,0.6))"
		},
		onError: () => setHidden(true)
	});
}
/** One pinned favorite team per browser. localStorage only; no accounts, nothing sent anywhere. */
var KEY = "hashmark:pinned-team";
var EVENT = "hashmark:pin-change";
function readPinned() {
	if (typeof window === "undefined") return null;
	try {
		return window.localStorage.getItem(KEY);
	} catch {
		return null;
	}
}
function writePinned(slug) {
	try {
		if (slug) window.localStorage.setItem(KEY, slug);
		else window.localStorage.removeItem(KEY);
	} catch {}
	window.dispatchEvent(new Event(EVENT));
}
/**
* Pinned slug, or null. Always null on the server and first client render so
* hydration matches; the real value lands right after mount.
*/
function usePinnedTeam() {
	const [slug, setSlug] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const sync = () => setSlug(readPinned());
		sync();
		window.addEventListener(EVENT, sync);
		window.addEventListener("storage", sync);
		return () => {
			window.removeEventListener(EVENT, sync);
			window.removeEventListener("storage", sync);
		};
	}, []);
	return [slug, writePinned];
}
/** Pin / unpin toggle for a team hub. Saved in this browser only. */
function PinButton({ slug, name }) {
	const [pinned, setPinned] = usePinnedTeam();
	const on = pinned === slug;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setPinned(on ? null : slug),
		"aria-pressed": on,
		className: cn("inline-flex min-h-10 items-center gap-2 rounded-md border px-3 text-sm transition-colors", on ? "border-accent/60 bg-accent/10 text-fg" : "border-line text-muted hover:text-fg"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
			className: cn("size-4", on ? "fill-accent text-accent" : ""),
			"aria-hidden": true
		}), on ? `${name} is your team` : "Pin as my team"]
	});
}
/** Header shortcut to the pinned team. Renders nothing until a team is pinned. */
function PinnedChip() {
	const [pinned] = usePinnedTeam();
	if (!pinned) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/teams/$slug",
		params: { slug: pinned },
		"aria-label": "Your pinned team",
		title: "Your pinned team",
		className: "flex size-10 items-center justify-center rounded-md hover:bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamLogo, {
			slug: pinned,
			size: 22
		})
	});
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
						children: "Loading the 138…"
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
		to: "/rankings",
		label: "Rankings"
	},
	{
		to: "/stats",
		label: "Stats"
	},
	{
		to: "/conferences",
		label: "Races"
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
		to: "/model",
		label: "The Model"
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
							children: NAV.map((item) => {
								const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.to,
									"aria-current": active ? "page" : void 0,
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinnedChip, {}),
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
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col",
						children: NAV.map((item) => {
							const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								onClick: () => setOpen(false),
								"aria-current": active ? "page" : void 0,
								className: cn("flex h-12 items-center justify-between border-b border-line text-base last:border-0", active ? "text-fg" : "text-muted"),
								children: [item.label, active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-1.5 w-1.5 rounded-full bg-accent",
									"aria-hidden": true
								}) : null]
							}, item.to);
						})
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
									to: "/stats",
									className: "hover:text-fg",
									children: "Stats"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/conferences",
									className: "hover:text-fg",
									children: "Conference races"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/strength",
									className: "hover:text-fg",
									children: "Strength of record"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/accuracy",
									className: "hover:text-fg",
									children: "Accuracy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/model",
									className: "hover:text-fg",
									children: "The Model"
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
function PageHead({ kicker, title, lede, action }) {
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
			}) : null,
			action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: action
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
		className: "-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0",
		role: "tablist",
		"aria-label": "Conference",
		children: CONFS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to,
			search: searchFor(c),
			role: "tab",
			"aria-selected": value === c,
			className: cn("inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm transition-colors duration-150 sm:h-9 sm:px-3.5", value === c ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
			children: c
		}, c))
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/featured-CVKAlHnJ.js
/**
* Last stamped AP ballot on the live board: Week 11 AP (Nov. 8), ESPN rankings API with
* an NCAA.com cross-check (25/25 ranks, records, points; no ties; through games Nov. 7).
* Source: data/week11_ap_top25_2026.json (migration 0092).
*/
var AP_STAMP = {
	week: 11,
	asOf: "Nov. 8",
	label: "Week 11 AP",
	columnHint: "W11 stamp",
	vsHx: "the last stamped AP poll (Week 11, Nov. 8)",
	lede: "AP is the last stamped poll (Week 11, Nov. 8). CFP is the committee ranking of Nov. 10."
};
/**
* Last stamped CFP committee ranking (top 25), ESPN rankings API with an NCAA.com
* cross-check (25/25 ranks and records). Source: data/cfp_rankings_2026_11_10.json (0092).
* The committee's number, not HASHMARK's — HX stays the only rating.
*/
var CFP_STAMP = {
	release: "2026-11-10",
	asOf: "Nov. 10",
	label: "CFP rankings · Nov. 10",
	columnHint: "Committee · Nov. 10"
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
* Saturday ABC: Alabama at Tennessee, Neyland Stadium. Schedule-page pin for
* `/schedule?w=7` and the home desk featured card.
* Sat 2026-10-17 14:30 CT · ABC · ALA −6.5 / 55.5 (ESPN DraftKings = CBS
* Sports, 2026-10-11; migration 0057). Historical pin (FINAL).
*/
var WEEK7_FEATURED = {
	homeSlug: "tennessee",
	awaySlug: "alabama"
};
/**
* Saturday ABC: Ole Miss at Texas, DKR. Schedule-page pin for `/schedule?w=8`
* and the home desk featured card (best combined HX 2026.7 rank on the Week 8
* slate with a CLEAR kick + TV: HX #8 @ #5; AP #9 @ #7).
* Sat 2026-10-24 18:30 CT · ABC (ESPN = CBS Sports ET; migration 0064).
* Vegas blank: ESPN DraftKings and CBS Sports did not match exactly.
* Historical pin (FINAL).
*/
var WEEK8_FEATURED = {
	homeSlug: "texas",
	awaySlug: "ole-miss"
};
/**
* Saturday NBC: Ohio State at USC, LA Memorial Coliseum. Schedule-page pin for
* `/schedule?w=9` and the home desk featured card (best combined HX 2026.7 rank
* on the Week 9 slate with a CLEAR kick + TV: HX #2 @ #21; AP #3 @ #16).
* Sat 2026-10-31 18:30 CT · NBC (ESPN = CBS Sports ET; migration 0072).
* Vegas blank: no exact ESPN DraftKings = CBS Sports match.
* Historical pin (FINAL).
*/
var WEEK9_FEATURED = {
	homeSlug: "usc",
	awaySlug: "ohio-state"
};
/**
* Saturday CBS: Oregon at Ohio State, Ohio Stadium. Schedule-page pin for
* `/schedule?w=10` and the home desk featured card (best combined HX 2026.7 rank
* on the Week 10 slate with a CLEAR kick + TV: HX #4 @ #2; AP NR @ #2).
* Sat 2026-11-07 14:30 CT · CBS (ESPN = CBS Sports ET; migration 0080).
* Vegas blank: ESPN DraftKings (OSU −10.5, 45.5) and CBS Sports (−9.5, 46.5/47.5)
* did not match exactly.
* Historical pin (FINAL). Home desk FEATURED_SLATE_WEEK is 11.
*/
var WEEK10_FEATURED = {
	homeSlug: "ohio-state",
	awaySlug: "oregon"
};
/**
* Saturday FS1: Michigan at Oregon, Autzen Stadium. Schedule-page pin for
* `/schedule?w=11` and the home desk featured card (best combined HX 2026.7 rank
* on the Week 11 slate with a CLEAR kick + TV: HX #12 @ #4; AP NR @ NR).
* Sat 2026-11-14 14:30 CT · FS1 (ESPN = CBS Sports ET; migration 0087).
* Vegas blank: ESPN DraftKings (ORE −10.5, 41.5) and CBS Sports (o40.5 / u41.5)
* did not match exactly on the total.
* Home desk FEATURED_SLATE_WEEK is 11.
*/
var WEEK11_FEATURED = {
	homeSlug: "oregon",
	awaySlug: "michigan"
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
* Board featured for the live featured slate (Week 11).
* Prefers the Week 11 pin (Michigan @ Oregon) via
* `selectWeekScopedFeatured(FEATURED_SLATE_WEEK, …)`. Falls back to the
* earliest upcoming kick only when the pin is missing or FINAL.
* Week 2–5 Research pins stay historical helpers. Never a FINAL. Never
* FCS. Never invent a book or matchup. Blank Vegas stays blank.
*/
function selectBoardFeaturedKick(slate, nowMs) {
	const pinned = selectWeekScopedFeatured(11, slate);
	if (pinned && isUpcomingKick(pinned, nowMs)) return pinned;
	return selectFeaturedKick(slate, nowMs);
}
function isPittsburghAtVirginiaTech(g) {
	return g.homeSlug === WEEK5_FEATURED.homeSlug && g.awaySlug === WEEK5_FEATURED.awaySlug;
}
function isIowaStateAtByu(g) {
	return g.homeSlug === WEEK6_FEATURED.homeSlug && g.awaySlug === WEEK6_FEATURED.awaySlug;
}
function isAlabamaAtTennessee(g) {
	return g.homeSlug === WEEK7_FEATURED.homeSlug && g.awaySlug === WEEK7_FEATURED.awaySlug;
}
function isOleMissAtTexas(g) {
	return g.homeSlug === WEEK8_FEATURED.homeSlug && g.awaySlug === WEEK8_FEATURED.awaySlug;
}
function isOhioStateAtUsc(g) {
	return g.homeSlug === WEEK9_FEATURED.homeSlug && g.awaySlug === WEEK9_FEATURED.awaySlug;
}
function isOregonAtOhioState(g) {
	return g.homeSlug === WEEK10_FEATURED.homeSlug && g.awaySlug === WEEK10_FEATURED.awaySlug;
}
function isMichiganAtOregon(g) {
	return g.homeSlug === WEEK11_FEATURED.homeSlug && g.awaySlug === WEEK11_FEATURED.awaySlug;
}
/**
* Featured card scoped to the schedule week being viewed.
* Week 5 pins Pittsburgh @ Virginia Tech (CLEAR), even though WKU @ NMSU
* kicks earlier. Week 6 pins Iowa State @ BYU (CLEAR), even though midweek
* cards kick earlier. Week 7 pins Alabama @ Tennessee. Week 8 pins Ole Miss @ Texas.
* Week 9 pins Ohio State @ USC. Week 10 pins Oregon @ Ohio State.
* Week 11 pins Michigan @ Oregon.
* The homepage desk uses FEATURED_SLATE_WEEK (11) and the same Week 11 pin via
* `selectBoardFeaturedKick`. Never invents a matchup.
*/
function selectWeekScopedFeatured(week, slate) {
	if (week === 5) return slate.find((g) => !g.isFcs && g.status !== "final" && isPittsburghAtVirginiaTech(g)) ?? null;
	if (week === 6) return slate.find((g) => !g.isFcs && g.status !== "final" && isIowaStateAtByu(g)) ?? null;
	if (week === 7) return slate.find((g) => !g.isFcs && g.status !== "final" && isAlabamaAtTennessee(g)) ?? null;
	if (week === 8) return slate.find((g) => !g.isFcs && g.status !== "final" && isOleMissAtTexas(g)) ?? null;
	if (week === 9) return slate.find((g) => !g.isFcs && g.status !== "final" && isOhioStateAtUsc(g)) ?? null;
	if (week === 10) return slate.find((g) => !g.isFcs && g.status !== "final" && isOregonAtOhioState(g)) ?? null;
	if (week === 11) return slate.find((g) => !g.isFcs && g.status !== "final" && isMichiganAtOregon(g)) ?? null;
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
/** Vegas cell parts: favorite line as the value, total underneath; null when nothing is stamped. */
function vegasParts(line, total) {
	if (line) return {
		value: line,
		sub: total != null ? `O/U ${total.toFixed(1)}` : null
	};
	if (total != null) return {
		value: `O/U ${total.toFixed(1)}`,
		sub: null
	};
	return {
		value: null,
		sub: null
	};
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
//#region node_modules/.nitro/vite/services/ssr/assets/seo-DGQgQNhm.js
/**
* Per-route head tags: title, description, canonical, Open Graph and Twitter.
* The root route sets site-wide defaults only (no canonical, no og:url); every page
* route spreads seo(...) into its head() so each URL gets its own canonical and card.
* TanStack dedupes title and meta by name/property with the deepest route winning;
* links are not deduped, so canonical must live only here.
*/
var SITE_URL = "https://hashmarkcfb.com";
`${SITE_URL}`;
function canonicalUrl(path) {
	const clean = path.split(/[?#]/)[0] || "/";
	return clean === "/" ? `${SITE_URL}/` : `${SITE_URL}${clean.replace(/\/+$/, "")}`;
}
function seo({ path, title, description, noindex }) {
	const url = canonicalUrl(path);
	return {
		meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			...noindex ? [{
				name: "robots",
				content: "noindex,follow"
			}] : [],
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			},
			{
				property: "og:url",
				content: url
			},
			{
				name: "twitter:title",
				content: title
			},
			{
				name: "twitter:description",
				content: description
			}
		],
		links: [{
			rel: "canonical",
			href: url
		}]
	};
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/conf-races-B9NCUL30.js
/**
* Conference race odds from the 10k HX season sim (data/conf_races_2026.json, written by
* scripts/conf-races.mjs from the same draws as data/sim_10k_2026_hx2026_8.json).
* Title-game and conference-title odds only; national title odds never live here.
*/
var data = {
	meta: {
		"n_sims": 1e4,
		"seed": 20261112,
		"hx_stamp": "HX 2026.8",
		"as_of": "2026-11-12",
		"as_of_tz": "America/Chicago",
		"source": "data/sim_10k_2026_hx2026_8.json",
		"title_game_rule": "Top two by simulated conference win % (then conference wins, then HX, then a coin flip) meet at a neutral site. This is a simplified tiebreak, not each league's full rulebook.",
		"pac12_rule": "Pac-12 has two members in 2026 and no title game: champion by overall record, then head-to-head, then HX.",
		"independents": "Independents have no conference race.",
		"note": "Conference title odds are the same numbers as the 10k sim file. National title odds are not shown here."
	},
	teams: [
		{
			"slug": "air-force",
			"conference": "Mountain West",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 2,
			"proj_conf_w": 2.843,
			"proj_conf_l": 3.157,
			"proj_wins": 8.665
		},
		{
			"slug": "akron",
			"conference": "MAC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 0,
			"conf_l_now": 6,
			"proj_conf_w": .582,
			"proj_conf_l": 7.418,
			"proj_wins": 1.582
		},
		{
			"slug": "alabama",
			"conference": "SEC",
			"make_ccg": 85.93,
			"conf_title": 40.36,
			"conf_w_now": 5,
			"conf_l_now": 2,
			"proj_conf_w": 6.722,
			"proj_conf_l": 2.278,
			"proj_wins": 10.044
		},
		{
			"slug": "app-state",
			"conference": "Sun Belt",
			"make_ccg": .3,
			"conf_title": .04,
			"conf_w_now": 2,
			"conf_l_now": 3,
			"proj_conf_w": 3.499,
			"proj_conf_l": 4.501,
			"proj_wins": 6.5
		},
		{
			"slug": "arizona",
			"conference": "Big 12",
			"make_ccg": 5.18,
			"conf_title": 1.97,
			"conf_w_now": 4,
			"conf_l_now": 2,
			"proj_conf_w": 5.898,
			"proj_conf_l": 3.103,
			"proj_wins": 8.917
		},
		{
			"slug": "arizona-state",
			"conference": "Big 12",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 3,
			"conf_l_now": 3,
			"proj_conf_w": 3.964,
			"proj_conf_l": 5.036,
			"proj_wins": 5.964
		},
		{
			"slug": "arkansas",
			"conference": "SEC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 1,
			"conf_l_now": 5,
			"proj_conf_w": 1.701,
			"proj_conf_l": 7.299,
			"proj_wins": 3.701
		},
		{
			"slug": "arkansas-state",
			"conference": "Sun Belt",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 3,
			"proj_conf_w": 2.994,
			"proj_conf_l": 4.006,
			"proj_wins": 5.202
		},
		{
			"slug": "army",
			"conference": "American",
			"make_ccg": 2.66,
			"conf_title": .87,
			"conf_w_now": 4,
			"conf_l_now": 2,
			"proj_conf_w": 5.102,
			"proj_conf_l": 2.898,
			"proj_wins": 6.666
		},
		{
			"slug": "auburn",
			"conference": "SEC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 3,
			"conf_l_now": 4,
			"proj_conf_w": 3.577,
			"proj_conf_l": 5.423,
			"proj_wins": 6.495
		},
		{
			"slug": "ball-state",
			"conference": "MAC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 4,
			"proj_conf_w": 2.6,
			"proj_conf_l": 5.4,
			"proj_wins": 3.6
		},
		{
			"slug": "baylor",
			"conference": "Big 12",
			"make_ccg": 2.31,
			"conf_title": .8,
			"conf_w_now": 4,
			"conf_l_now": 2,
			"proj_conf_w": 5.265,
			"proj_conf_l": 3.735,
			"proj_wins": 7.273
		},
		{
			"slug": "boise-state",
			"conference": "Mountain West",
			"make_ccg": 100,
			"conf_title": 69.08,
			"conf_w_now": 3,
			"conf_l_now": 0,
			"proj_conf_w": 3.891,
			"proj_conf_l": .11,
			"proj_wins": 10.396
		},
		{
			"slug": "boston-college",
			"conference": "ACC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 4,
			"proj_conf_w": 2.614,
			"proj_conf_l": 5.386,
			"proj_wins": 4.689
		},
		{
			"slug": "bowling-green",
			"conference": "MAC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 3,
			"conf_l_now": 3,
			"proj_conf_w": 3.907,
			"proj_conf_l": 4.093,
			"proj_wins": 3.907
		},
		{
			"slug": "buffalo",
			"conference": "MAC",
			"make_ccg": 36.8,
			"conf_title": 14.52,
			"conf_w_now": 5,
			"conf_l_now": 1,
			"proj_conf_w": 6.358,
			"proj_conf_l": 1.642,
			"proj_wins": 8.503
		},
		{
			"slug": "byu",
			"conference": "Big 12",
			"make_ccg": 15.96,
			"conf_title": 6.5,
			"conf_w_now": 4,
			"conf_l_now": 2,
			"proj_conf_w": 6.121,
			"proj_conf_l": 2.88,
			"proj_wins": 9.186
		},
		{
			"slug": "california",
			"conference": "ACC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 4,
			"proj_conf_w": 3.18,
			"proj_conf_l": 5.82,
			"proj_wins": 4.18
		},
		{
			"slug": "central-michigan",
			"conference": "MAC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 3,
			"conf_l_now": 3,
			"proj_conf_w": 4,
			"proj_conf_l": 4,
			"proj_wins": 6
		},
		{
			"slug": "charlotte",
			"conference": "American",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 1,
			"conf_l_now": 4,
			"proj_conf_w": 1.886,
			"proj_conf_l": 6.114,
			"proj_wins": 1.886
		},
		{
			"slug": "cincinnati",
			"conference": "Big 12",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 4,
			"proj_conf_w": 3.278,
			"proj_conf_l": 5.722,
			"proj_wins": 6.278
		},
		{
			"slug": "clemson",
			"conference": "ACC",
			"make_ccg": 2.16,
			"conf_title": .48,
			"conf_w_now": 4,
			"conf_l_now": 2,
			"proj_conf_w": 5.209,
			"proj_conf_l": 2.792,
			"proj_wins": 7.69
		},
		{
			"slug": "coastal-carolina",
			"conference": "Sun Belt",
			"make_ccg": .12,
			"conf_title": .02,
			"conf_w_now": 2,
			"conf_l_now": 3,
			"proj_conf_w": 2.998,
			"proj_conf_l": 5.002,
			"proj_wins": 3.998
		},
		{
			"slug": "colorado",
			"conference": "Big 12",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 1,
			"conf_l_now": 5,
			"proj_conf_w": 2.047,
			"proj_conf_l": 6.953,
			"proj_wins": 4.047
		},
		{
			"slug": "colorado-state",
			"conference": "Mountain West",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 2,
			"proj_conf_w": 2.18,
			"proj_conf_l": 2.82,
			"proj_wins": 3.52
		},
		{
			"slug": "delaware",
			"conference": "CUSA",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 3,
			"proj_conf_w": 3.722,
			"proj_conf_l": 4.278,
			"proj_wins": 5.722
		},
		{
			"slug": "duke",
			"conference": "ACC",
			"make_ccg": 1.94,
			"conf_title": .47,
			"conf_w_now": 4,
			"conf_l_now": 2,
			"proj_conf_w": 5.173,
			"proj_conf_l": 3.827,
			"proj_wins": 8.178
		},
		{
			"slug": "east-carolina",
			"conference": "American",
			"make_ccg": 1.49,
			"conf_title": .45,
			"conf_w_now": 3,
			"conf_l_now": 2,
			"proj_conf_w": 4.703,
			"proj_conf_l": 3.297,
			"proj_wins": 6.708
		},
		{
			"slug": "eastern-michigan",
			"conference": "MAC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 3,
			"conf_l_now": 3,
			"proj_conf_w": 3.779,
			"proj_conf_l": 4.221,
			"proj_wins": 4.779
		},
		{
			"slug": "fiu",
			"conference": "CUSA",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 3,
			"proj_conf_w": 3.64,
			"proj_conf_l": 4.36,
			"proj_wins": 5.64
		},
		{
			"slug": "florida",
			"conference": "SEC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 3,
			"conf_l_now": 4,
			"proj_conf_w": 4.173,
			"proj_conf_l": 4.827,
			"proj_wins": 6.697
		},
		{
			"slug": "florida-atlantic",
			"conference": "American",
			"make_ccg": .63,
			"conf_title": .29,
			"conf_w_now": 3,
			"conf_l_now": 2,
			"proj_conf_w": 4.263,
			"proj_conf_l": 3.737,
			"proj_wins": 7.266
		},
		{
			"slug": "florida-state",
			"conference": "ACC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 4,
			"proj_conf_w": 3.159,
			"proj_conf_l": 4.841,
			"proj_wins": 5.635
		},
		{
			"slug": "fresno-state",
			"conference": "Mountain West",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 1,
			"conf_l_now": 3,
			"proj_conf_w": 1.82,
			"proj_conf_l": 3.18,
			"proj_wins": 6.154
		},
		{
			"slug": "georgia",
			"conference": "SEC",
			"make_ccg": 97.84,
			"conf_title": 54.36,
			"conf_w_now": 6,
			"conf_l_now": 1,
			"proj_conf_w": 7.513,
			"proj_conf_l": 1.487,
			"proj_wins": 11.018
		},
		{
			"slug": "georgia-southern",
			"conference": "Sun Belt",
			"make_ccg": 69.21,
			"conf_title": 26.29,
			"conf_w_now": 4,
			"conf_l_now": 1,
			"proj_conf_w": 5.122,
			"proj_conf_l": 1.878,
			"proj_wins": 6.916
		},
		{
			"slug": "georgia-state",
			"conference": "Sun Belt",
			"make_ccg": 1.22,
			"conf_title": .34,
			"conf_w_now": 2,
			"conf_l_now": 3,
			"proj_conf_w": 3.394,
			"proj_conf_l": 4.606,
			"proj_wins": 6.397
		},
		{
			"slug": "georgia-tech",
			"conference": "ACC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 1,
			"conf_l_now": 5,
			"proj_conf_w": 1.401,
			"proj_conf_l": 6.599,
			"proj_wins": 2.439
		},
		{
			"slug": "hawaii",
			"conference": "Mountain West",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 0,
			"conf_l_now": 4,
			"proj_conf_w": .706,
			"proj_conf_l": 5.294,
			"proj_wins": 4.496
		},
		{
			"slug": "houston",
			"conference": "Big 12",
			"make_ccg": 7.78,
			"conf_title": 2.74,
			"conf_w_now": 4,
			"conf_l_now": 2,
			"proj_conf_w": 5.992,
			"proj_conf_l": 3.008,
			"proj_wins": 9.02
		},
		{
			"slug": "illinois",
			"conference": "Big Ten",
			"make_ccg": .3,
			"conf_title": .09,
			"conf_w_now": 4,
			"conf_l_now": 2,
			"proj_conf_w": 5.008,
			"proj_conf_l": 3.992,
			"proj_wins": 7.009
		},
		{
			"slug": "indiana",
			"conference": "Big Ten",
			"make_ccg": 56.61,
			"conf_title": 29.23,
			"conf_w_now": 5,
			"conf_l_now": 1,
			"proj_conf_w": 7.148,
			"proj_conf_l": 1.852,
			"proj_wins": 10.44
		},
		{
			"slug": "iowa",
			"conference": "Big Ten",
			"make_ccg": 2.48,
			"conf_title": 1.13,
			"conf_w_now": 4,
			"conf_l_now": 2,
			"proj_conf_w": 6.025,
			"proj_conf_l": 2.975,
			"proj_wins": 9.036
		},
		{
			"slug": "iowa-state",
			"conference": "Big 12",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 4,
			"proj_conf_w": 3.719,
			"proj_conf_l": 5.281,
			"proj_wins": 5.719
		},
		{
			"slug": "jacksonville-state",
			"conference": "CUSA",
			"make_ccg": 99.85,
			"conf_title": 28.08,
			"conf_w_now": 5,
			"conf_l_now": 0,
			"proj_conf_w": 6.812,
			"proj_conf_l": 1.188,
			"proj_wins": 9.093
		},
		{
			"slug": "james-madison",
			"conference": "Sun Belt",
			"make_ccg": 82.04,
			"conf_title": 56.02,
			"conf_w_now": 5,
			"conf_l_now": 2,
			"proj_conf_w": 5.859,
			"proj_conf_l": 2.141,
			"proj_wins": 10.114
		},
		{
			"slug": "kansas",
			"conference": "Big 12",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 1,
			"conf_l_now": 5,
			"proj_conf_w": 1.974,
			"proj_conf_l": 7.026,
			"proj_wins": 3.974
		},
		{
			"slug": "kansas-state",
			"conference": "Big 12",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 1,
			"conf_l_now": 5,
			"proj_conf_w": 1.947,
			"proj_conf_l": 7.053,
			"proj_wins": 4.947
		},
		{
			"slug": "kennesaw-state",
			"conference": "CUSA",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 3,
			"proj_conf_w": 3.521,
			"proj_conf_l": 4.479,
			"proj_wins": 4.521
		},
		{
			"slug": "kent-state",
			"conference": "MAC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 4,
			"proj_conf_w": 2.74,
			"proj_conf_l": 5.26,
			"proj_wins": 3.74
		},
		{
			"slug": "kentucky",
			"conference": "SEC",
			"make_ccg": 3.36,
			"conf_title": .68,
			"conf_w_now": 5,
			"conf_l_now": 2,
			"proj_conf_w": 5.934,
			"proj_conf_l": 3.066,
			"proj_wins": 8.481
		},
		{
			"slug": "liberty",
			"conference": "CUSA",
			"make_ccg": 99.94,
			"conf_title": 71.9,
			"conf_w_now": 5,
			"conf_l_now": 0,
			"proj_conf_w": 7.562,
			"proj_conf_l": .438,
			"proj_wins": 11.281
		},
		{
			"slug": "louisiana",
			"conference": "Sun Belt",
			"make_ccg": 42.42,
			"conf_title": 15.94,
			"conf_w_now": 3,
			"conf_l_now": 1,
			"proj_conf_w": 4.988,
			"proj_conf_l": 2.012,
			"proj_wins": 8.148
		},
		{
			"slug": "louisiana-tech",
			"conference": "CUSA",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 0,
			"conf_l_now": 0,
			"proj_conf_w": 0,
			"proj_conf_l": 0,
			"proj_wins": 9.108
		},
		{
			"slug": "louisville",
			"conference": "ACC",
			"make_ccg": 34.65,
			"conf_title": 10.91,
			"conf_w_now": 5,
			"conf_l_now": 2,
			"proj_conf_w": 6.296,
			"proj_conf_l": 2.704,
			"proj_wins": 7.865
		},
		{
			"slug": "lsu",
			"conference": "SEC",
			"make_ccg": .15,
			"conf_title": .05,
			"conf_w_now": 3,
			"conf_l_now": 3,
			"proj_conf_w": 4.828,
			"proj_conf_l": 4.172,
			"proj_wins": 7.829
		},
		{
			"slug": "marshall",
			"conference": "Sun Belt",
			"make_ccg": .62,
			"conf_title": .13,
			"conf_w_now": 2,
			"conf_l_now": 3,
			"proj_conf_w": 3.799,
			"proj_conf_l": 4.201,
			"proj_wins": 6.8
		},
		{
			"slug": "maryland",
			"conference": "Big Ten",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 1,
			"conf_l_now": 5,
			"proj_conf_w": 1.839,
			"proj_conf_l": 7.161,
			"proj_wins": 3.839
		},
		{
			"slug": "massachusetts",
			"conference": "MAC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 4,
			"proj_conf_w": 2.978,
			"proj_conf_l": 5.022,
			"proj_wins": 5.978
		},
		{
			"slug": "memphis",
			"conference": "American",
			"make_ccg": 75.29,
			"conf_title": 41.48,
			"conf_w_now": 4,
			"conf_l_now": 1,
			"proj_conf_w": 6.057,
			"proj_conf_l": 1.943,
			"proj_wins": 9.472
		},
		{
			"slug": "miami",
			"conference": "ACC",
			"make_ccg": 99.85,
			"conf_title": 70.28,
			"conf_w_now": 6,
			"conf_l_now": 0,
			"proj_conf_w": 8.612,
			"proj_conf_l": .388,
			"proj_wins": 11.315
		},
		{
			"slug": "miami-oh",
			"conference": "MAC",
			"make_ccg": .04,
			"conf_title": .02,
			"conf_w_now": 4,
			"conf_l_now": 2,
			"proj_conf_w": 4.891,
			"proj_conf_l": 3.109,
			"proj_wins": 6.891
		},
		{
			"slug": "michigan",
			"conference": "Big Ten",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 4,
			"proj_conf_w": 2.793,
			"proj_conf_l": 6.207,
			"proj_wins": 5.793
		},
		{
			"slug": "michigan-state",
			"conference": "Big Ten",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 1,
			"conf_l_now": 5,
			"proj_conf_w": 2.291,
			"proj_conf_l": 6.709,
			"proj_wins": 4.291
		},
		{
			"slug": "middle-tennessee",
			"conference": "CUSA",
			"make_ccg": .21,
			"conf_title": .02,
			"conf_w_now": 3,
			"conf_l_now": 2,
			"proj_conf_w": 4.302,
			"proj_conf_l": 3.698,
			"proj_wins": 6.302
		},
		{
			"slug": "minnesota",
			"conference": "Big Ten",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 3,
			"conf_l_now": 3,
			"proj_conf_w": 3.945,
			"proj_conf_l": 5.055,
			"proj_wins": 5.945
		},
		{
			"slug": "mississippi-state",
			"conference": "SEC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 5,
			"proj_conf_w": 2.757,
			"proj_conf_l": 6.243,
			"proj_wins": 5.678
		},
		{
			"slug": "missouri",
			"conference": "SEC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 3,
			"conf_l_now": 3,
			"proj_conf_w": 4.519,
			"proj_conf_l": 4.481,
			"proj_wins": 7.519
		},
		{
			"slug": "missouri-state",
			"conference": "CUSA",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 3,
			"proj_conf_w": 3.098,
			"proj_conf_l": 4.903,
			"proj_wins": 4.098
		},
		{
			"slug": "navy",
			"conference": "American",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 4,
			"proj_conf_w": 2.925,
			"proj_conf_l": 5.075,
			"proj_wins": 4.37
		},
		{
			"slug": "nc-state",
			"conference": "ACC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 4,
			"proj_conf_w": 3.047,
			"proj_conf_l": 5.954,
			"proj_wins": 5.047
		},
		{
			"slug": "nebraska",
			"conference": "Big Ten",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 4,
			"proj_conf_w": 3.534,
			"proj_conf_l": 5.466,
			"proj_wins": 6.534
		},
		{
			"slug": "nevada",
			"conference": "Mountain West",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 1,
			"conf_l_now": 3,
			"proj_conf_w": 1.908,
			"proj_conf_l": 4.092,
			"proj_wins": 4.54
		},
		{
			"slug": "new-mexico",
			"conference": "Mountain West",
			"make_ccg": 90.51,
			"conf_title": 28.64,
			"conf_w_now": 4,
			"conf_l_now": 0,
			"proj_conf_w": 6.276,
			"proj_conf_l": .724,
			"proj_wins": 10.562
		},
		{
			"slug": "new-mexico-state",
			"conference": "CUSA",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 3,
			"proj_conf_w": 3.117,
			"proj_conf_l": 4.883,
			"proj_wins": 4.117
		},
		{
			"slug": "north-carolina",
			"conference": "ACC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 3,
			"proj_conf_w": 3.751,
			"proj_conf_l": 4.249,
			"proj_wins": 6.751
		},
		{
			"slug": "north-dakota-state",
			"conference": "Mountain West",
			"make_ccg": .22,
			"conf_title": .06,
			"conf_w_now": 3,
			"conf_l_now": 2,
			"proj_conf_w": 4.342,
			"proj_conf_l": 2.658,
			"proj_wins": 9.243
		},
		{
			"slug": "north-texas",
			"conference": "American",
			"make_ccg": 87.69,
			"conf_title": 41.97,
			"conf_w_now": 5,
			"conf_l_now": 0,
			"proj_conf_w": 6.834,
			"proj_conf_l": 1.167,
			"proj_wins": 9.253
		},
		{
			"slug": "northern-illinois",
			"conference": "MAC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 0,
			"conf_l_now": 0,
			"proj_conf_w": 0,
			"proj_conf_l": 0,
			"proj_wins": 1.083
		},
		{
			"slug": "northwestern",
			"conference": "Big Ten",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 3,
			"conf_l_now": 3,
			"proj_conf_w": 4.562,
			"proj_conf_l": 4.438,
			"proj_wins": 7.562
		},
		{
			"slug": "notre-dame",
			"conference": "Independent",
			"make_ccg": null,
			"conf_title": null,
			"conf_w_now": 0,
			"conf_l_now": 0,
			"proj_conf_w": 0,
			"proj_conf_l": 0,
			"proj_wins": 10.559
		},
		{
			"slug": "ohio",
			"conference": "MAC",
			"make_ccg": 28.6,
			"conf_title": 11.04,
			"conf_w_now": 5,
			"conf_l_now": 1,
			"proj_conf_w": 6.286,
			"proj_conf_l": 1.714,
			"proj_wins": 8.396
		},
		{
			"slug": "ohio-state",
			"conference": "Big Ten",
			"make_ccg": 27.57,
			"conf_title": 15.27,
			"conf_w_now": 4,
			"conf_l_now": 2,
			"proj_conf_w": 6.126,
			"proj_conf_l": 2.874,
			"proj_wins": 8.279
		},
		{
			"slug": "oklahoma",
			"conference": "SEC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 3,
			"conf_l_now": 3,
			"proj_conf_w": 4.316,
			"proj_conf_l": 4.684,
			"proj_wins": 6.316
		},
		{
			"slug": "oklahoma-state",
			"conference": "Big 12",
			"make_ccg": 5.91,
			"conf_title": 2.14,
			"conf_w_now": 4,
			"conf_l_now": 2,
			"proj_conf_w": 5.907,
			"proj_conf_l": 3.093,
			"proj_wins": 7.928
		},
		{
			"slug": "old-dominion",
			"conference": "Sun Belt",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 4,
			"proj_conf_w": 2.622,
			"proj_conf_l": 4.378,
			"proj_wins": 3.917
		},
		{
			"slug": "ole-miss",
			"conference": "SEC",
			"make_ccg": .02,
			"conf_title": 0,
			"conf_w_now": 4,
			"conf_l_now": 3,
			"proj_conf_w": 5.365,
			"proj_conf_l": 3.635,
			"proj_wins": 8.286
		},
		{
			"slug": "oregon",
			"conference": "Big Ten",
			"make_ccg": 25.65,
			"conf_title": 14.21,
			"conf_w_now": 4,
			"conf_l_now": 2,
			"proj_conf_w": 6.339,
			"proj_conf_l": 2.661,
			"proj_wins": 8.481
		},
		{
			"slug": "oregon-state",
			"conference": "Pac-12",
			"make_ccg": null,
			"conf_title": 100,
			"conf_w_now": 1,
			"conf_l_now": 0,
			"proj_conf_w": 1,
			"proj_conf_l": 0,
			"proj_wins": 5.79
		},
		{
			"slug": "penn-state",
			"conference": "Big Ten",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 4,
			"proj_conf_w": 4.257,
			"proj_conf_l": 4.743,
			"proj_wins": 7.257
		},
		{
			"slug": "pittsburgh",
			"conference": "ACC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 3,
			"conf_l_now": 3,
			"proj_conf_w": 4.499,
			"proj_conf_l": 4.501,
			"proj_wins": 7.499
		},
		{
			"slug": "purdue",
			"conference": "Big Ten",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 4,
			"proj_conf_w": 2.753,
			"proj_conf_l": 6.247,
			"proj_wins": 3.753
		},
		{
			"slug": "rice",
			"conference": "American",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 0,
			"conf_l_now": 5,
			"proj_conf_w": 1.376,
			"proj_conf_l": 6.624,
			"proj_wins": 2.376
		},
		{
			"slug": "rutgers",
			"conference": "Big Ten",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 1,
			"conf_l_now": 5,
			"proj_conf_w": 1.771,
			"proj_conf_l": 7.229,
			"proj_wins": 2.771
		},
		{
			"slug": "sacramento-state",
			"conference": "MAC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 1,
			"conf_l_now": 7,
			"proj_conf_w": 1,
			"proj_conf_l": 7,
			"proj_wins": 2.21
		},
		{
			"slug": "sam-houston",
			"conference": "CUSA",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 0,
			"conf_l_now": 5,
			"proj_conf_w": 1.073,
			"proj_conf_l": 6.928,
			"proj_wins": 2.073
		},
		{
			"slug": "san-diego-state",
			"conference": "Mountain West",
			"make_ccg": .65,
			"conf_title": .09,
			"conf_w_now": 1,
			"conf_l_now": 1,
			"proj_conf_w": 1.564,
			"proj_conf_l": 2.436,
			"proj_wins": 4.565
		},
		{
			"slug": "san-jose-state",
			"conference": "Mountain West",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 1,
			"conf_l_now": 4,
			"proj_conf_w": 2.14,
			"proj_conf_l": 5.86,
			"proj_wins": 6.14
		},
		{
			"slug": "smu",
			"conference": "ACC",
			"make_ccg": 10.46,
			"conf_title": 2.69,
			"conf_w_now": 5,
			"conf_l_now": 2,
			"proj_conf_w": 6.256,
			"proj_conf_l": 2.744,
			"proj_wins": 8.477
		},
		{
			"slug": "south-alabama",
			"conference": "Sun Belt",
			"make_ccg": 2.29,
			"conf_title": .79,
			"conf_w_now": 2,
			"conf_l_now": 2,
			"proj_conf_w": 3.794,
			"proj_conf_l": 3.206,
			"proj_wins": 5.802
		},
		{
			"slug": "south-carolina",
			"conference": "SEC",
			"make_ccg": .02,
			"conf_title": 0,
			"conf_w_now": 4,
			"conf_l_now": 3,
			"proj_conf_w": 4.94,
			"proj_conf_l": 4.06,
			"proj_wins": 7.463
		},
		{
			"slug": "southern-miss",
			"conference": "Sun Belt",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 3,
			"proj_conf_w": 2.82,
			"proj_conf_l": 4.18,
			"proj_wins": 3.973
		},
		{
			"slug": "stanford",
			"conference": "ACC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 4,
			"proj_conf_w": 2.948,
			"proj_conf_l": 6.052,
			"proj_wins": 4.948
		},
		{
			"slug": "syracuse",
			"conference": "ACC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 5,
			"proj_conf_w": 2.907,
			"proj_conf_l": 6.093,
			"proj_wins": 5.078
		},
		{
			"slug": "tcu",
			"conference": "Big 12",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 4,
			"proj_conf_w": 3.31,
			"proj_conf_l": 5.69,
			"proj_wins": 5.31
		},
		{
			"slug": "temple",
			"conference": "American",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 1,
			"conf_l_now": 4,
			"proj_conf_w": 2.253,
			"proj_conf_l": 5.747,
			"proj_wins": 3.253
		},
		{
			"slug": "tennessee",
			"conference": "SEC",
			"make_ccg": 5.43,
			"conf_title": 1.85,
			"conf_w_now": 4,
			"conf_l_now": 2,
			"proj_conf_w": 5.873,
			"proj_conf_l": 3.127,
			"proj_wins": 8.891
		},
		{
			"slug": "texas",
			"conference": "SEC",
			"make_ccg": 7.25,
			"conf_title": 2.7,
			"conf_w_now": 4,
			"conf_l_now": 2,
			"proj_conf_w": 5.903,
			"proj_conf_l": 3.097,
			"proj_wins": 8.93
		},
		{
			"slug": "texas-am",
			"conference": "SEC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 1,
			"conf_l_now": 5,
			"proj_conf_w": 2.267,
			"proj_conf_l": 6.733,
			"proj_wins": 5.267
		},
		{
			"slug": "texas-state",
			"conference": "Sun Belt",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 0,
			"conf_l_now": 0,
			"proj_conf_w": 0,
			"proj_conf_l": 0,
			"proj_wins": 6.483
		},
		{
			"slug": "texas-tech",
			"conference": "Big 12",
			"make_ccg": 64.15,
			"conf_title": 25.42,
			"conf_w_now": 5,
			"conf_l_now": 1,
			"proj_conf_w": 6.674,
			"proj_conf_l": 2.326,
			"proj_wins": 9.928
		},
		{
			"slug": "toledo",
			"conference": "MAC",
			"make_ccg": 50.33,
			"conf_title": 23.29,
			"conf_w_now": 5,
			"conf_l_now": 1,
			"proj_conf_w": 6.289,
			"proj_conf_l": 1.711,
			"proj_wins": 9.522
		},
		{
			"slug": "troy",
			"conference": "Sun Belt",
			"make_ccg": 1.37,
			"conf_title": .39,
			"conf_w_now": 2,
			"conf_l_now": 2,
			"proj_conf_w": 3.222,
			"proj_conf_l": 3.778,
			"proj_wins": 5.226
		},
		{
			"slug": "tulane",
			"conference": "American",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 3,
			"proj_conf_w": 3.137,
			"proj_conf_l": 4.863,
			"proj_wins": 5.137
		},
		{
			"slug": "tulsa",
			"conference": "American",
			"make_ccg": .03,
			"conf_title": .02,
			"conf_w_now": 2,
			"conf_l_now": 3,
			"proj_conf_w": 3.825,
			"proj_conf_l": 4.175,
			"proj_wins": 6.825
		},
		{
			"slug": "uab",
			"conference": "American",
			"make_ccg": .53,
			"conf_title": .19,
			"conf_w_now": 3,
			"conf_l_now": 2,
			"proj_conf_w": 4.084,
			"proj_conf_l": 3.916,
			"proj_wins": 6.086
		},
		{
			"slug": "ucf",
			"conference": "Big 12",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 3,
			"conf_l_now": 3,
			"proj_conf_w": 4.719,
			"proj_conf_l": 4.281,
			"proj_wins": 6.719
		},
		{
			"slug": "ucla",
			"conference": "Big Ten",
			"make_ccg": 84.83,
			"conf_title": 39.08,
			"conf_w_now": 6,
			"conf_l_now": 0,
			"proj_conf_w": 8.03,
			"proj_conf_l": .97,
			"proj_wins": 11.421
		},
		{
			"slug": "uconn",
			"conference": "Independent",
			"make_ccg": null,
			"conf_title": null,
			"conf_w_now": 0,
			"conf_l_now": 0,
			"proj_conf_w": 0,
			"proj_conf_l": 0,
			"proj_wins": 5.48
		},
		{
			"slug": "ul-monroe",
			"conference": "Sun Belt",
			"make_ccg": .41,
			"conf_title": .04,
			"conf_w_now": 2,
			"conf_l_now": 2,
			"proj_conf_w": 2.888,
			"proj_conf_l": 4.112,
			"proj_wins": 2.889
		},
		{
			"slug": "unlv",
			"conference": "Mountain West",
			"make_ccg": .11,
			"conf_title": .02,
			"conf_w_now": 2,
			"conf_l_now": 2,
			"proj_conf_w": 3.488,
			"proj_conf_l": 3.512,
			"proj_wins": 6.488
		},
		{
			"slug": "usc",
			"conference": "Big Ten",
			"make_ccg": 1.45,
			"conf_title": .54,
			"conf_w_now": 4,
			"conf_l_now": 2,
			"proj_conf_w": 5.49,
			"proj_conf_l": 3.51,
			"proj_wins": 8.496
		},
		{
			"slug": "usf",
			"conference": "American",
			"make_ccg": .02,
			"conf_title": .01,
			"conf_w_now": 2,
			"conf_l_now": 3,
			"proj_conf_w": 3.711,
			"proj_conf_l": 4.29,
			"proj_wins": 7.711
		},
		{
			"slug": "utah",
			"conference": "Big 12",
			"make_ccg": 98.71,
			"conf_title": 60.43,
			"conf_w_now": 6,
			"conf_l_now": 0,
			"proj_conf_w": 8.116,
			"proj_conf_l": .884,
			"proj_wins": 11.72
		},
		{
			"slug": "utah-state",
			"conference": "Mountain West",
			"make_ccg": 8.35,
			"conf_title": 2.1,
			"conf_w_now": 2,
			"conf_l_now": 1,
			"proj_conf_w": 2.546,
			"proj_conf_l": 1.454,
			"proj_wins": 4.962
		},
		{
			"slug": "utep",
			"conference": "CUSA",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 0,
			"conf_l_now": 0,
			"proj_conf_w": 0,
			"proj_conf_l": 0,
			"proj_wins": 1.891
		},
		{
			"slug": "utsa",
			"conference": "American",
			"make_ccg": 31.66,
			"conf_title": 14.72,
			"conf_w_now": 4,
			"conf_l_now": 1,
			"proj_conf_w": 5.844,
			"proj_conf_l": 2.156,
			"proj_wins": 8.991
		},
		{
			"slug": "vanderbilt",
			"conference": "SEC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 1,
			"conf_l_now": 5,
			"proj_conf_w": 1.613,
			"proj_conf_l": 7.387,
			"proj_wins": 4.613
		},
		{
			"slug": "virginia",
			"conference": "ACC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 4,
			"proj_conf_w": 3.546,
			"proj_conf_l": 5.454,
			"proj_wins": 5.546
		},
		{
			"slug": "virginia-tech",
			"conference": "ACC",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 3,
			"conf_l_now": 3,
			"proj_conf_w": 4.526,
			"proj_conf_l": 4.474,
			"proj_wins": 7.526
		},
		{
			"slug": "wake-forest",
			"conference": "ACC",
			"make_ccg": 50.94,
			"conf_title": 15.17,
			"conf_w_now": 5,
			"conf_l_now": 1,
			"proj_conf_w": 6.877,
			"proj_conf_l": 2.123,
			"proj_wins": 10.028
		},
		{
			"slug": "washington",
			"conference": "Big Ten",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 4,
			"proj_conf_w": 3.131,
			"proj_conf_l": 5.869,
			"proj_wins": 6.131
		},
		{
			"slug": "washington-state",
			"conference": "Pac-12",
			"make_ccg": null,
			"conf_title": 0,
			"conf_w_now": 0,
			"conf_l_now": 1,
			"proj_conf_w": 0,
			"proj_conf_l": 1,
			"proj_wins": 1.843
		},
		{
			"slug": "west-virginia",
			"conference": "Big 12",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 4,
			"proj_conf_w": 3.071,
			"proj_conf_l": 5.929,
			"proj_wins": 6.071
		},
		{
			"slug": "western-kentucky",
			"conference": "CUSA",
			"make_ccg": 0,
			"conf_title": 0,
			"conf_w_now": 2,
			"conf_l_now": 3,
			"proj_conf_w": 3.153,
			"proj_conf_l": 4.847,
			"proj_wins": 4.153
		},
		{
			"slug": "western-michigan",
			"conference": "MAC",
			"make_ccg": 84.23,
			"conf_title": 51.13,
			"conf_w_now": 5,
			"conf_l_now": 1,
			"proj_conf_w": 6.591,
			"proj_conf_l": 1.41,
			"proj_wins": 9.102
		},
		{
			"slug": "wisconsin",
			"conference": "Big Ten",
			"make_ccg": 1.11,
			"conf_title": .45,
			"conf_w_now": 4,
			"conf_l_now": 2,
			"proj_conf_w": 5.958,
			"proj_conf_l": 3.042,
			"proj_wins": 7.962
		},
		{
			"slug": "wyoming",
			"conference": "Mountain West",
			"make_ccg": .16,
			"conf_title": .01,
			"conf_w_now": 4,
			"conf_l_now": 2,
			"proj_conf_w": 4.3,
			"proj_conf_l": 2.701,
			"proj_wins": 7.501
		}
	]
};
var RACE_CONFS = [
	"SEC",
	"Big Ten",
	"ACC",
	"Big 12",
	"American",
	"Sun Belt",
	"MAC",
	"CUSA",
	"Mountain West",
	"Pac-12"
];
var parseRaceConf = (v) => RACE_CONFS.includes(v) ? v : void 0;
var confRacesMeta = () => data.meta;
/** One league's race, best title odds first (then title-game odds, then projected conf wins). */
function confRace(conf) {
	return data.teams.filter((t) => t.conference === conf).sort((a, b) => (b.conf_title ?? 0) - (a.conf_title ?? 0) || (b.make_ccg ?? 0) - (a.make_ccg ?? 0) || b.proj_conf_w - a.proj_conf_w || a.slug.localeCompare(b.slug));
}
var confRaceFor = (slug) => data.teams.find((t) => t.slug === slug);
/** Shown as "<0.1%" rather than a bare 0 when a team is alive but very unlikely; exact 0 stays 0. */
function fmtOdds(x) {
	if (x == null) return "n/a";
	if (x === 0) return "0%";
	if (x < .1) return "<0.1%";
	if (x > 99.9 && x < 100) return ">99.9%";
	return `${x.toFixed(1)}%`;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/stats-queries-B5WJ4YN6.js
/** One /stats tab: rows joined to team name, conference, and color. Data file stays server-side. */
var getStatsTab = createServerFn({ method: "GET" }).validator(object({ tab: _enum(STAT_TABS) })).handler(createSsrRpc("1bcb5614a4b0c0e964e8cd896b3f3adeb70bf0346ddda783d7bc1ff58e3f503e"));
/** Team-page advanced block (CFBD metrics with FBS rank), or null when the team has no row. */
var getTeamAdvanced = createServerFn({ method: "GET" }).validator(object({ slug: string().min(1) })).handler(createSsrRpc("f39ad56d3d347de0a6b25c8e8ad2766460a4dc12615fb1f0df56124407037068"));
/** Matchup unit-vs-unit edges from the committed stats file, or null when a team has no row. */
var getMatchupEdges = createServerFn({ method: "GET" }).validator(object({
	home: string().min(1),
	away: string().min(1)
})).handler(createSsrRpc("15966f3ae068c05fe480bee351a575db8156272dddcf0f8d17efa1eb37487af2"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/stories-zBMs46mY.js
var STORY_DATE = "Friday, Aug 28, 2026";
var STORY_DATE_WEEK1 = "Friday, Sep 4, 2026";
var STORY_DATE_TAPE = "Tuesday, Sep 8, 2026";
var STORY_DATE_TAPE_WEEK2 = "Sunday, Sep 13, 2026";
var STORY_DATE_TAPE_WEEK3 = "Sunday, Sep 20, 2026";
var STORY_DATE_TAPE_WEEK4 = "Sunday, Sep 27, 2026";
var STORY_DATE_WEEK3 = "Friday, Sep 18, 2026";
var STORY_DATE_WEEK4 = "Friday, Sep 25, 2026";
var STORY_DATE_WEEK5 = "Friday, Oct 2, 2026";
var STORY_DATE_TAPE_WEEK5 = "Sunday, Oct 4, 2026";
var STORY_DATE_WEEK6 = "Friday, Oct 9, 2026";
var STORIES = [
	{
		slug: "week-6-georgia-alabama",
		kicker: "Week 6 · Winner flip",
		headline: "HX takes Georgia in Tuscaloosa as the book moves to Alabama",
		dek: "The market swung from Georgia to Alabama. HX didn’t follow.",
		date: STORY_DATE_WEEK6,
		body: [
			"No. 2 Georgia (5–0) visits No. 6 Alabama (5–0) Saturday at 6:30 CT on ABC, with College GameDay set up at Denny Chimes and Bryce Young as guest picker.",
			"The line has traveled. Alabama opened as a three-point home underdog and was bet to a 1.5-point favorite, per ESPN’s DraftKings tracking. ESPN’s FPI makes it Alabama by 0.9 with a 53% win probability.",
			"HASHMARK lands on the other side: Georgia −4.6, 61.8%. HX rates Georgia No. 1 nationally at 7.90 and Alabama ninth at 5.29, a gap of more than two and a half points of rating. HX’s board also gives the Bulldogs an 86.5% Make 12 number.",
			"Georgia arrives without junior running back Chauncey Bowens, its touchdown leader with six and the primary short-yardage back, who is out after an injury against Vanderbilt. Nate Frazier, the team’s leading rusher (211 yards), came off the availability report after bruised ribs. Alabama’s run defense is allowing 78.6 yards per game, third in the SEC.",
			"HX is a team rating. It doesn’t adjust for a single running back’s availability. That’s the honest gap between the model and a market that has spent all week digesting injury reports."
		],
		whyItMatters: "It’s the week’s biggest game and the cleanest winner flip at the top of the board. HX and FPI split the winner, and the market moved toward Alabama.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=6"
			},
			{
				label: "ESPN · Week 6 Top 25 lines",
				href: "https://www.espn.com/espn/betting/story/_/id/50106943/2026-college-football-week-6-top-25-betting-lines-odds"
			},
			{
				label: "ESPN · Bowens out",
				href: "https://www.espn.com/college-football/story/_/id/50128870/georgia-bulldogs-chauncey-bowens-vs-alabama-crimson-tide"
			},
			{
				label: "ESPN · College GameDay Week 6",
				href: "https://www.espn.com/college-football/story/_/id/50133318/2026-college-gameday-week-6-georgia-vs-alabama"
			}
		]
	},
	{
		slug: "week-6-ucla-oregon",
		kicker: "Week 6 · Spread gap",
		headline: "Dante Moore out vs. UCLA; HX’s Oregon number is twice the book’s",
		dek: "HX has the Ducks by 24.5. Vegas has 11.5. Only one of them knows who’s playing quarterback.",
		date: STORY_DATE_WEEK6,
		body: [
			"Oregon quarterback Dante Moore is officially out Saturday against No. 21 UCLA (2:30 CT, CBS), per the Big Ten injury report. Moore sustained a concussion against USC on Sept. 26. Former Nebraska starter Dylan Raiola, who threw for 289 yards and two touchdowns in relief in the USC win, makes his first start for the Ducks. Raiola is 13–9 as a college starter with 5,232 career passing yards.",
			"HX has Oregon −24.5, 89.0%. Vegas has Oregon −11.5, O/U 59.5, and FPI makes it Oregon by 14.7. That’s a 13-point HX–Vegas gap, the largest among ranked matchups this week.",
			"Two things drive it. HX rates Oregon fourth nationally (6.90) against an AP rank of 13, and it rates UCLA 45th (1.40) against an AP rank of 21. UCLA is 4–0 under first-year coach Bob Chesney, 13 months after an 0–3 start got DeShaun Foster fired. HX’s inputs (talent, prior-year SP+/Elo/SRS, portal net, returning production) haven’t caught up with that turnaround.",
			"HX also doesn’t price a quarterback swap. Raiola is a former five-star with a full résumé, but the number on the board is a team number."
		],
		whyItMatters: "It’s the week’s only other ranked-vs-ranked game besides Georgia–Alabama, and it’s where HX disagrees most with both the AP and the book.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=6"
			},
			{
				label: "HASHMARK Rankings",
				href: "https://hashmarkcfb.com/rankings"
			},
			{
				label: "ESPN · Moore out, Raiola starts",
				href: "https://www.espn.com/college-football/story/_/id/50129251/oregon-qb-moore-ruled-ucla-game-raiola-start"
			},
			{
				label: "ESPN · Chesney’s UCLA turnaround",
				href: "https://www.espn.com/college-football/story/_/id/50125661/2026-bob-chesney-ucla-winning-turnaround"
			},
			{
				label: "ESPN · Week 6 Top 25 lines",
				href: "https://www.espn.com/espn/betting/story/_/id/50106943/2026-college-football-week-6-top-25-betting-lines-odds"
			}
		]
	},
	{
		slug: "week-6-texas-am-missouri",
		kicker: "Week 6 · Winner flip",
		headline: "Missouri climbed 11 spots. HX still takes Texas A&M in Columbia",
		dek: "The AP’s biggest riser hosts the team HX can’t stop ranking.",
		date: STORY_DATE_WEEK6,
		body: [
			"Missouri jumped from No. 25 to No. 14 in the AP Week 6 poll after a 45–17 win over Florida, a game HX had as a winner flip toward the Tigers (Missouri −5.6 vs Vegas Florida −4.5). That one hit.",
			"This week the model flips the other way. Texas A&M (3–2) visits Missouri (4–1) at 11:00 CT on ABC, and HX has Texas A&M −2.1, 55.7% against Vegas Missouri −3.5. FPI calls it nearly even, Missouri by 0.8 with a 52% win probability.",
			"The disagreement is about A&M more than Missouri. HX rates the Aggies sixth nationally at 6.06 despite two losses and no AP ranking. Missouri sits 14th in HX at 4.25, which happens to match its new AP rank exactly. HX has held A&M high all season. It took the Aggies at LSU in Week 4 as a winner flip, and that one missed."
		],
		whyItMatters: "It’s an 11:00 window winner flip involving a ranked home team, and it’s a direct test of HX’s most stubborn AP disagreement.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=6"
			},
			{
				label: "HASHMARK Board",
				href: "https://hashmarkcfb.com/"
			},
			{
				label: "ESPN · Week 6 Top 25 lines",
				href: "https://www.espn.com/espn/betting/story/_/id/50106943/2026-college-football-week-6-top-25-betting-lines-odds"
			},
			{
				label: "ESPN · AP Week 6 (Oct 4)",
				href: "https://www.espn.com/college-football/rankings"
			}
		]
	},
	{
		slug: "week-6-iowa-washington",
		kicker: "Week 6 · Friday night",
		headline: "Hank Brown questionable as Iowa visits Washington Friday night",
		dek: "HX and Vegas have Washington by about two. FPI has Iowa by 3.5.",
		date: STORY_DATE_WEEK6,
		body: [
			"No. 20 Iowa (4–1) plays at Washington (3–2) Friday at 8:00 CT. Quarterback Hank Brown is questionable with a sprained AC joint in his throwing shoulder from last week’s loss to Ohio State. Kirk Ferentz said Brown will likely be cleared medically, but “we can’t count on that.” Jeremy Hecklinski has been taking first-team reps, and Jimmy Sullivan is the backup. Brown has 832 passing yards, five touchdowns and one interception in five starts.",
			"HX has Washington −1.9, 55.2%. Vegas has Washington −2.5 with a 41.5 total. FPI goes the other way: Iowa by 3.5 with a 60% win probability.",
			"HX rates Washington 25th (3.24) and Iowa 23rd (3.68). Iowa is the stronger team on HX’s sheet, so the Huskies’ edge on the board comes from playing at home."
		],
		whyItMatters: "A ranked team on a Friday night with a quarterback question, and FPI on the other side from HX and the book. That makes it a clean before-and-after test.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=6"
			},
			{
				label: "ESPN · Ferentz on Hank Brown",
				href: "https://www.espn.com/college-football/story/_/id/50129420/kirk-ferentz-iowa-count-hank-brown-being-ready-fri"
			},
			{
				label: "ESPN · Week 6 Top 25 lines",
				href: "https://www.espn.com/espn/betting/story/_/id/50106943/2026-college-football-week-6-top-25-betting-lines-odds"
			}
		]
	},
	{
		slug: "week-6-ranked-chill-gaps",
		kicker: "Week 6 · Spread gap",
		headline: "HX trims the chalk on Florida, Tennessee and Oklahoma State",
		dek: "Three ranked favorites, three HX numbers well below Vegas.",
		date: STORY_DATE_WEEK6,
		body: [
			"HX agrees on the favorite in all three games. It just thinks the book has the margins too wide.",
			"South Carolina at No. 16 Florida (11:45 CT, SEC Network): HX Florida −5.2 (63.3%) vs Vegas Florida −13.5. FPI has Florida by 8.5. HX rates Florida 24th, eight spots below its AP rank of 16, even after the Gators fell 8 spots in the poll.",
			"No. 15 Tennessee at Arkansas (3:15 CT, SEC Network): HX Tennessee −7.4 (68.0%) vs Vegas −13.5. FPI is wider than both at 16.1.",
			"UCF at No. 18 Oklahoma State (11:00 CT, ESPN2): HX Oklahoma State −1.9 (55.2%) vs Vegas −10.0. FPI says 4.4. HX rates Oklahoma State 89th (−1.17). That 71-spot gap against its AP rank is the biggest on the board.",
			"The other way: No. 25 Pittsburgh (5–0) makes its AP debut ranked 53rd in HX. But against North Carolina, HX (Pitt −9.5) sits right next to FPI (9.2) and well above Vegas (−4.5)."
		],
		whyItMatters: "These are the board’s biggest ranked-team margin gaps. They’re a fair test of the soft-calibration FLAG that’s been on the board all season. The Week 5 full-slate closer was 20/55.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=6"
			},
			{
				label: "HASHMARK Rankings",
				href: "https://hashmarkcfb.com/rankings"
			},
			{
				label: "ESPN · Week 6 Top 25 lines",
				href: "https://www.espn.com/espn/betting/story/_/id/50106943/2026-college-football-week-6-top-25-betting-lines-odds"
			}
		]
	},
	{
		slug: "week-6-midweek-tape",
		kicker: "Week 6 · Tape",
		headline: "HX goes 6–1 midweek; South Alabama and Arkansas State set the season’s scoring high",
		dek: "Seven games are in the books before Friday, and no head coach has been fired yet this season.",
		date: STORY_DATE_WEEK6,
		body: [
			"Week 6 opened early. Troy beat Southern Miss 55–34 on Tuesday. Wednesday had Jacksonville State edging Kennesaw State 27–26 on a Garrison Rippa field goal with 51 seconds left, and FIU beating New Mexico State 22–3 behind five Robert Czeremcha field goals. Thursday brought Liberty 35–3 over Sam Houston, WKU 34–13 over Missouri State, UTSA 31–24 over USF, and South Alabama 56–49 at Arkansas State, the highest-scoring FBS game of the season according to ESPN.",
			"HX picked six of the seven winners. The miss was Arkansas State (HX −7.5), which Vegas also favored at −1.5. UTSA landed exactly on HX’s −7.0, which matched the book’s number too.",
			"Off the field, the carousel hasn’t started. ESPN’s Pete Thamel reports no FBS firings so far this season. By this point last year there were five power-conference openings. Turnover hit a record 33 jobs in the last cycle, and ADs are weighing big buyouts against rising roster costs. Separately, Big Ten commissioner Tony Petitti said the league has had “absolutely no discussions” about expansion, even though the proposed Protect College Sports Act would allow up to 20 members."
		],
		whyItMatters: "The midweek results are already final on the site, and the carousel’s silence is the backdrop for a Saturday that could start it.",
		sources: [
			{
				label: "HASHMARK Schedule",
				href: "https://hashmarkcfb.com/schedule?w=6"
			},
			{
				label: "ESPN · South Alabama 56, Arkansas State 49",
				href: "https://www.espn.com/college-football/recap/_/gameId/401869933"
			},
			{
				label: "ESPN · Jacksonville State 27, Kennesaw State 26",
				href: "https://www.espn.com/college-football/recap/_/gameId/401871051"
			},
			{
				label: "ESPN · FIU 22, New Mexico State 3",
				href: "https://www.espn.com/college-football/recap/_/gameId/401871066"
			},
			{
				label: "ESPN · Coaching carousel buyouts",
				href: "https://www.espn.com/college-football/story/_/id/50136127/college-football-coaching-carousel-buyouts"
			},
			{
				label: "ESPN · Big Ten: no expansion talks",
				href: "https://www.espn.com/college-sports/story/_/id/50133579/big-ten-18-strong-members-no-expansion-talks-commish-says"
			}
		]
	},
	{
		slug: "week-5-tape",
		kicker: "Week 5 tape",
		headline: "Week 5 tape: 39/55 SU, 20/55 closer FLAG.",
		dek: "Full slate closer is a FLAG. Soft-cal FLAG stays. HX not retuned.",
		date: STORY_DATE_TAPE_WEEK5,
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
		dek: "First Week 5 winner-flip result is in.",
		date: STORY_DATE_WEEK5,
		body: [
			"Western Kentucky visited New Mexico State on Thursday (7:00 CT, CBSSN). Live HASHMARK had posted a winner flip: WKU −13.0 / 77.5% against Vegas NM State −2.5, O/U 54.5. Final: New Mexico State 34, Western Kentucky 13 (NMSU athletics / ESPN box). Aggies SU and cover; HX flip MISS.",
			"James Jones ran for 155 yards and a touchdown; De’Marcus Peters returned an interception for a score (ESPN). Rodney Tisdale Jr. threw for 314 yards with an interception for WKU. The card was one of the largest absolute HX–Vegas disagreements on the early Week 5 board — and the first flip result of the weekend went against the model.",
			"Same night: North Texas 45, Tulsa 44 in OT (ESPN). HX had Tulsa −0.3 / 50.9% vs Vegas Tulsa −1.5 — both sides leaned Tulsa."
		],
		whyItMatters: "Honest early-weekend tape note; social-ready “flip miss” before Friday’s ESPN/FOX windows.",
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
//#region node_modules/.nitro/vite/services/ssr/assets/sor-queries-5SAtEqDZ.js
/** SOR + SOS for every board team from current HX, the games table, and the FCS stubs. */
var getSorBoard = createServerFn({ method: "GET" }).handler(createSsrRpc("8fc30d569d06734d70bec6e4323a3edfbaefd8eb191dde667d76927e807531ee"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-sQaRW2oG.js
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
var styles_default = "/assets/styles-DLjAz41b.css";
var APP_NAME = "HASHMARK";
var Route$19 = createRootRoute({
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
				content: "College football ratings desk. One number: HX. Full 138 FBS."
			},
			{
				property: "og:image",
				content: "https://hashmarkcfb.com/og.jpg"
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
				content: "One rating. Full 138 FBS. Board, slate, matchups, recruiting, talent."
			},
			{
				name: "twitter:image",
				content: "https://hashmarkcfb.com/og.jpg"
			}
		],
		links: [
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
				children: "That page is not in the HASHMARK set. Use the search icon above to find any FBS team, or jump to a section:"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg",
					children: "Back to the board"
				}), [
					["/schedule", "Schedule"],
					["/rankings", "Rankings"],
					["/stats", "Stats"],
					["/matchup", "Matchup"]
				].map(([to, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to,
					className: "inline-flex h-11 items-center rounded-md bg-raised px-4 text-sm text-fg hover:bg-border",
					children: label
				}, to))]
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
					description: "College football ratings desk. One number: HX. Full 138 FBS.",
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
var $$splitComponentImporter$13 = () => import("./routes-jVm8AAJ6.mjs");
var Route$18 = createFileRoute("/")({
	loader: async () => {
		const [teams, games, slate] = await Promise.all([
			listTeams(),
			listGames(),
			listScheduleWeek({ data: { week: 11 } })
		]);
		const top = new Set(teams.slice(0, 20).map((t) => t.slug));
		const notable = games.filter((g) => top.has(g.homeSlug) && top.has(g.awaySlug));
		const featured = selectBoardFeaturedKick(slate.filter((g) => !g.isFcs), Date.now());
		return {
			teams,
			games: notable.length ? notable : games.slice(0, 12),
			featured,
			slate
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$13, "component"),
	head: () => seo({
		path: "/",
		title: `HASHMARK · Week 11 college football board · HX ratings`,
		description: "One college football rating, every FBS team: the HX board, this week's slate with HX spreads and win odds, playoff make-field odds, and the weekly accountability tape."
	})
});
/** CFP committee top 12 (last stamped release) next to HX rank and make-field. Committee's number, not HASHMARK's. */
/** Every FINAL (FBS–FBS from the games table, FBS–FCS from the stubs), graded on its frozen pregame HX. */
var getAccuracy = createServerFn({ method: "GET" }).handler(createSsrRpc("f10099cdbad71a91021c2c6930a843871be7cb7eba78087d6bf15e538a9f257b"));
var $$splitComponentImporter$12 = () => import("./accuracy-BuSQOCmq.mjs");
var Route$17 = createFileRoute("/accuracy")({
	validateSearch: (s) => {
		const w = Number(s.week);
		return Number.isInteger(w) && w >= 0 && w <= 16 ? { week: w } : {};
	},
	loader: () => getAccuracy(),
	component: lazyRouteComponent($$splitComponentImporter$12, "component"),
	head: () => seo({
		path: "/accuracy",
		title: "HX accuracy · every FINAL against its pregame line · HASHMARK",
		description: "Every 2026 FINAL graded against the frozen pregame HX line and win probability: straight-up picks, average miss, Brier score, weekly and season rollups, and the same games against the Vegas close."
	})
});
var $$splitComponentImporter$11 = () => import("./conferences-B5uvfIUW.mjs");
var Route$16 = createFileRoute("/conferences")({
	validateSearch: (s) => {
		const conf = parseRaceConf(s.conf);
		return conf && conf !== "SEC" ? { conf } : {};
	},
	loader: () => listTeams(),
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	head: () => seo({
		path: "/conferences",
		title: "Conference races · title game and conference title odds · HASHMARK",
		description: "Every FBS conference race from 10,000 simulated seasons on the HX board: odds to reach the conference title game, odds to win the league, and projected conference records."
	})
});
/** /desk merged into /model (What this is / is not + glossary live at /model#desk). */
var Route$15 = createFileRoute("/desk")({ beforeLoad: () => {
	throw redirect({
		to: "/model",
		hash: "desk",
		statusCode: 301
	});
} });
/** Edge is gone. /edge and every /edge/* URL permanently redirects to the board. */
var Route$14 = createFileRoute("/edge")({ beforeLoad: () => {
	throw redirect({
		to: "/",
		statusCode: 301
	});
} });
/** /logos was an internal asset grid; deleted. Old links go to the board. */
var Route$13 = createFileRoute("/logos")({ beforeLoad: () => {
	throw redirect({
		to: "/",
		statusCode: 301
	});
} });
var $$splitComponentImporter$10 = () => import("./matchup-CYnn5nqX.mjs");
function parseNeutral(v) {
	if (v === true || v === "1" || v === "true") return true;
	if (v === false || v === "0" || v === "false") return false;
}
var Route$12 = createFileRoute("/matchup")({
	validateSearch: (s) => ({
		...typeof s.home === "string" ? { home: s.home } : {},
		...typeof s.away === "string" ? { away: s.away } : {},
		...parseNeutral(s.neutral) !== void 0 ? { neutral: parseNeutral(s.neutral) } : {}
	}),
	loaderDeps: ({ search }) => ({
		home: search.home,
		away: search.away,
		neutral: search.neutral
	}),
	loader: async ({ deps }) => {
		let home = deps.home;
		let away = deps.away;
		let featured = false;
		if (!home || !away) {
			const pick = selectBoardFeaturedKick((await listScheduleWeek({ data: { week: 11 } })).filter((g) => !g.isFcs), Date.now());
			home = home ?? pick?.homeSlug ?? "texas";
			away = away ?? pick?.awaySlug ?? "ohio-state";
			featured = Boolean(pick && !deps.home && !deps.away);
		}
		const [teams, match, edges] = await Promise.all([
			listTeams(),
			getMatchup({ data: {
				home,
				away,
				...deps.neutral !== void 0 ? { neutral: deps.neutral } : {}
			} }),
			getMatchupEdges({ data: {
				home,
				away
			} })
		]);
		return {
			teams,
			match,
			edges,
			homeSlug: home,
			awaySlug: away,
			featured
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	head: () => seo({
		path: "/matchup",
		title: "Matchup engine · HX spread and win probability · HASHMARK",
		description: "Pick any two FBS teams for an HX spread and win probability, home or neutral."
	})
});
var $$splitComponentImporter$9 = () => import("./model-DlnTDUj3.mjs");
var Route$11 = createFileRoute("/model")({
	component: lazyRouteComponent($$splitComponentImporter$9, "component"),
	head: () => seo({
		path: "/model",
		title: "How HX is built · The Model · HASHMARK",
		description: "How HASHMARK's single college football rating, HX, is built: preseason prior, weekly in-season refit from FINALs, the matchup engine, measured accountability, and the glossary."
	})
});
var $$splitComponentImporter$8 = () => import("./rankings--FGCjSGo.mjs");
var Route$10 = createFileRoute("/rankings")({
	validateSearch: (s) => {
		const conf = parseConf(s.conf);
		return conf === "All" ? {} : { conf };
	},
	loader: () => listTeams(),
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	head: () => seo({
		path: "/rankings",
		title: "HX Rankings · all FBS teams · HASHMARK",
		description: "Every FBS team ranked by HX, refit weekly from results, with AP and CFP ranks, offense/defense, projected wins and playoff make-field odds."
	})
});
/** Rank col is w-16; Team sticks at that offset so names never slide under AP. */
var YEARS = [
	2023,
	2024,
	2025,
	2026
];
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
var TONES = [
	"bg-raised text-faint",
	"bg-heat-1 text-muted",
	"bg-heat-2 text-muted",
	"bg-heat-3 text-fg",
	"bg-accent text-accent-fg"
];
/**
* Quintile by rank among states with any tracked talent (index > 0). Scaling by the max put most
* states in the top band, so the map carried little information.
*/
function toneFor(index, sorted) {
	if (index <= 0 || sorted.length === 0) return TONES[0];
	const below = sorted.filter((v) => v < index).length;
	return TONES[Math.min(3, Math.floor(below / sorted.length * 4)) + 1];
}
function StateMosaic({ states, selected, onSelect }) {
	const byCode = new Map(states.map((s) => [s.code, s]));
	const sorted = states.map((s) => s.talentIndex).filter((v) => v > 0).sort((a, b) => a - b);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-x-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "inline-grid min-w-[520px] grid-cols-11 gap-1 sm:min-w-0 sm:w-full",
			children: ROWS.flatMap((row, ri) => row.map((code, ci) => {
				if (!code) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-square" }, `${ri}-${ci}`);
				const st = byCode.get(code);
				const active = selected === code;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onSelect(code),
					title: st ? `${st.name} · talent ${st.talentIndex}` : code,
					className: cn("aspect-square rounded-md text-[10px] font-medium tabular transition-[box-shadow,transform] duration-150 sm:text-xs", toneFor(st?.talentIndex ?? 0, sorted), active && "ring-2 ring-fg ring-offset-1 ring-offset-bg"),
					children: code
				}, code);
			}))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex items-center gap-2 text-xs text-muted",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Less talent" }),
				TONES.slice(1).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-3 w-6 rounded-sm", t.split(" ")[0]) }, t)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "More (quartiles of states)" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("ml-2 h-3 w-6 rounded-sm", TONES[0].split(" ")[0]) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "None tracked" })
			]
		})]
	});
}
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
/**
* One labeled line/number cell (HASHMARK, Vegas, FINAL). A missing value renders as a quiet
* phrase ("No line posted") instead of a bare dash that reads like a failed load.
*/
function LineStat({ label, value, sub, empty = "No line posted", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("min-w-0", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] uppercase tracking-[0.14em] text-faint",
			children: label
		}), value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 font-display text-lg tabular leading-tight text-fg sm:text-2xl sm:leading-none",
			children: value
		}), sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-0.5 text-xs tabular text-muted sm:mt-1",
			children: sub
		}) : null] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1.5 text-sm text-muted",
			children: empty
		})]
	});
}
function parseStateCode(value) {
	if (typeof value === "string" && /^[A-Za-z]{2}$/.test(value)) return value.toUpperCase();
	return "TX";
}
/** "By state" tab on /recruiting (formerly /states): pipelines by recruit hometown. */
function StatesTab({ states, detail, code, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateMosaic, {
				states,
				selected: code,
				onSelect
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
					children: detail.state?.name ?? code
				}),
				detail.state ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
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
					children: "No pipeline on the desk for this state."
				}),
				detail.teams.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
				}) : detail.state ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-sm text-muted",
					children: [
						"No FBS programs in ",
						detail.state.name,
						"."
					]
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
				detail.commits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommitList, { commits: detail.commits }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"No tracked starters from ",
						code,
						" on the desk."
					]
				})
			] })]
		}),
		states.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl tracking-wide",
				children: "Pipeline empty"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: "State rows did not load. The mosaic and table stay blank until the desk has pipeline data."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
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
						onClick: () => onSelect(s.code),
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
function CommitList({ commits }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: commits.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
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
	}, c.teamSlug)) });
}
var $$splitComponentImporter$7 = () => import("./recruiting-Cp6mrIO9.mjs");
var Route$9 = createFileRoute("/recruiting")({
	validateSearch: (s) => {
		const y = Number(s.year);
		const year = YEARS.includes(y) ? y : 2026;
		if (s.tab === "states") return {
			tab: "states",
			code: parseStateCode(s.code)
		};
		return {
			year,
			board: s.board === "cycle" ? "cycle" : "class",
			conf: parseConf(s.conf)
		};
	},
	loaderDeps: ({ search }) => ({
		tab: search.tab === "states" ? "states" : void 0,
		code: parseStateCode(search.code)
	}),
	loader: async ({ deps }) => {
		if (deps.tab === "states") {
			const [states, detail] = await Promise.all([listStates(), getStateDetail({ data: { code: deps.code } })]);
			return {
				rows: [],
				states: {
					states,
					detail,
					code: deps.code
				}
			};
		}
		return {
			rows: await listRecruiting(),
			states: null
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	head: () => seo({
		path: "/recruiting",
		title: "Composite Recruiting · Classes, cycle and pipelines by state · HASHMARK",
		description: "247Sports Composite recruiting classes for every FBS program, 2023–2026, the four-year cycle board, and recruiting pipelines by state."
	})
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
/**
* ?w= parser for /schedule. Integer weeks clamp into 0..max (w=99 → 13, w=-1 → 0);
* anything else (abc, 1.5, empty) is undefined so the caller falls back to the current week.
* The router merges raw search params into deps, so the loader must run this too.
*/
function parseScheduleWeek(value, max = 13) {
	const n = typeof value === "number" ? value : typeof value === "string" && value.trim() !== "" ? Number(value) : NaN;
	if (!Number.isInteger(n)) return void 0;
	return Math.min(max, Math.max(0, n));
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
var $$splitComponentImporter$6 = () => import("./schedule-C7ZR14nI.mjs");
function parseWeek(v) {
	return parseScheduleWeek(v, 13);
}
var Route$8 = createFileRoute("/schedule")({
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
		const week = parseWeek(deps.w) ?? defaultWeek(todayChicago());
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
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => seo({
		path: "/schedule",
		title: "College football schedule · HX spreads, win odds, Vegas · HASHMARK",
		description: "Every FBS game by week with the HX spread and win probability, the Vegas line where sourced, and FINALs."
	})
});
/** /states merged into /recruiting as the "By state" tab. */
var Route$7 = createFileRoute("/states")({ beforeLoad: ({ search }) => {
	const code = parseStateCode(search.code);
	throw redirect({
		to: "/recruiting",
		search: {
			tab: "states",
			code
		},
		statusCode: 301
	});
} });
var $$splitComponentImporter$5 = () => import("./stats-DzFSj2Lz.mjs");
/** Link search with defaults dropped, matching validateSearch (no redirect on crawl). */
var Route$6 = createFileRoute("/stats")({
	validateSearch: (s) => {
		const tab = parseTab(s.tab);
		const conf = parseConf(s.conf);
		const group = COLUMN_SETS[tab].some((c) => c.key === s.group) && s.group !== COLUMN_SETS[tab][0].key ? String(s.group) : void 0;
		return {
			tab: s.tab != null && tab !== "teams" ? tab : void 0,
			conf: conf !== "All" ? conf : void 0,
			group,
			sort: metricOf(tab, String(s.sort)) ? String(s.sort) : void 0,
			dir: s.dir === "worst" ? "worst" : void 0
		};
	},
	loaderDeps: ({ search }) => ({ tab: search.tab ?? "teams" }),
	loader: ({ deps }) => getStatsTab({ data: { tab: deps.tab } }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => seo({
		path: "/stats",
		title: "CFB stats explorer · EPA, success rate, havoc, box stats · HASHMARK",
		description: "2026 FBS team and player stats: opponent-adjusted EPA per play, success rate, explosiveness, line yards, havoc, player EPA and usage, plus box stats. Sort, filter by conference, chart, and compare."
	})
});
/** Column widths shared by the sticky header strip and the body table. */
/** Phone row: the sorted stat up top, the rest of the column set as a shaded grid. */
var $$splitComponentImporter$4 = () => import("./stories-CxDSOS4N.mjs");
var Route$5 = createFileRoute("/stories")({
	loader: () => listStories(),
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => seo({
		path: "/stories",
		title: "Stories · HASHMARK",
		description: "HASHMARK game notes and weekly tapes from the 2026 college football season."
	})
});
var SORTS = [
	{
		key: "sor",
		label: "Strength of record"
	},
	{
		key: "played",
		label: "Schedule played"
	},
	{
		key: "remaining",
		label: "Schedule left"
	}
];
var $$splitComponentImporter$3 = () => import("./strength-7OT03iCF.mjs");
var Route$4 = createFileRoute("/strength")({
	validateSearch: (s) => {
		const conf = parseConf(s.conf);
		const sort = SORTS.some((x) => x.key === s.sort) && s.sort !== "sor" ? s.sort : void 0;
		return {
			...conf !== "All" ? { conf } : {},
			...sort ? { sort } : {}
		};
	},
	loader: async () => {
		const [teams, sor] = await Promise.all([listTeams(), getSorBoard()]);
		return {
			teams,
			sor
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => seo({
		path: "/strength",
		title: "Strength of record and schedule · every FBS team · HASHMARK",
		description: "Strength of record (wins above what a No. 25 HX team would get on the same schedule) and strength of schedule played and remaining, from current HX ratings and the real 2026 slate."
	})
});
var $$splitComponentImporter$2 = () => import("./talent-FQ0Y8bJ2.mjs");
var Route$3 = createFileRoute("/talent")({
	validateSearch: (s) => ({
		board: s.board === "size" ? "size" : "composite",
		conf: parseConf(s.conf)
	}),
	loader: async () => (await listTeams()).filter((t) => t.hasProfile !== false),
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => seo({
		path: "/talent",
		title: "Roster talent · two-deep composite and size · HASHMARK",
		description: "Two-deep roster talent for every FBS team (247 composite, transfers included) and the measurables size board."
	})
});
/** Old Edge URLs (/edge/board, /edge/unlock, /edge/sim, …) permanently redirect to the board. */
var Route$2 = createFileRoute("/edge/$")({ beforeLoad: () => {
	throw redirect({
		to: "/",
		statusCode: 301
	});
} });
var $$splitComponentImporter$1 = () => import("./stories_._slug-fA70G2gy.mjs");
var Route$1 = createFileRoute("/stories_/$slug")({
	loader: ({ params }) => {
		const story = getStory(params.slug);
		if (!story) throw notFound();
		return story;
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: ({ loaderData, params }) => seo({
		path: `/stories/${params.slug}`,
		title: loaderData ? `${loaderData.headline} · HASHMARK` : "Story · HASHMARK",
		description: loaderData?.dek ?? "A HASHMARK college football story."
	})
});
/** HX by week for one team (refit history; newcomers start the week they joined the board). */
var getHxHistory = createServerFn({ method: "GET" }).validator(object({ slug: string().min(1).max(80) })).handler(createSsrRpc("f55452d4f3f77cab0f95a24b56e8bed8434a482e94fed743291a342313100904"));
var $$splitComponentImporter = () => import("./teams._slug-CU7HAlRH.mjs");
var Route = createFileRoute("/teams/$slug")({
	loader: async ({ params }) => {
		const [data, advanced, sor, hxHistory] = await Promise.all([
			getTeam({ data: { slug: params.slug } }),
			getTeamAdvanced({ data: { slug: params.slug } }),
			getSorBoard(),
			getHxHistory({ data: { slug: params.slug } })
		]);
		if (!data) throw notFound();
		return {
			...data,
			advanced,
			hxHistory,
			sor: sor.rows.find((r) => r.slug === params.slug) ?? null
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: ({ loaderData, params }) => seo({
		path: `/teams/${params.slug}`,
		title: loaderData ? `${loaderData.team.name} ${loaderData.team.mascot} · HX rating, schedule, stats · HASHMARK` : "Team · HASHMARK",
		description: loaderData ? `${loaderData.team.name}: HX rank #${loaderData.team.hxRank}, record, schedule with HX spreads, playoff make-field odds, and HX vs results.` : "HASHMARK team page."
	})
});
/** 2026 FBS newcomers (0093): no preseason profile rows, so no talent, class, size, or two-deep panels. */
var IndexRoute = Route$18.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$19
});
var AccuracyRoute = Route$17.update({
	id: "/accuracy",
	path: "/accuracy",
	getParentRoute: () => Route$19
});
var ConferencesRoute = Route$16.update({
	id: "/conferences",
	path: "/conferences",
	getParentRoute: () => Route$19
});
var DeskRoute = Route$15.update({
	id: "/desk",
	path: "/desk",
	getParentRoute: () => Route$19
});
var EdgeRoute = Route$14.update({
	id: "/edge",
	path: "/edge",
	getParentRoute: () => Route$19
});
var LogosRoute = Route$13.update({
	id: "/logos",
	path: "/logos",
	getParentRoute: () => Route$19
});
var MatchupRoute = Route$12.update({
	id: "/matchup",
	path: "/matchup",
	getParentRoute: () => Route$19
});
var ModelRoute = Route$11.update({
	id: "/model",
	path: "/model",
	getParentRoute: () => Route$19
});
var RankingsRoute = Route$10.update({
	id: "/rankings",
	path: "/rankings",
	getParentRoute: () => Route$19
});
var RecruitingRoute = Route$9.update({
	id: "/recruiting",
	path: "/recruiting",
	getParentRoute: () => Route$19
});
var ScheduleRoute = Route$8.update({
	id: "/schedule",
	path: "/schedule",
	getParentRoute: () => Route$19
});
var StatesRoute = Route$7.update({
	id: "/states",
	path: "/states",
	getParentRoute: () => Route$19
});
var StatsRoute = Route$6.update({
	id: "/stats",
	path: "/stats",
	getParentRoute: () => Route$19
});
var StoriesRoute = Route$5.update({
	id: "/stories",
	path: "/stories",
	getParentRoute: () => Route$19
});
var StrengthRoute = Route$4.update({
	id: "/strength",
	path: "/strength",
	getParentRoute: () => Route$19
});
var TalentRoute = Route$3.update({
	id: "/talent",
	path: "/talent",
	getParentRoute: () => Route$19
});
var EdgeSplatRoute = Route$2.update({
	id: "/$",
	path: "/$",
	getParentRoute: () => EdgeRoute
});
var StoriesSlugRoute = Route$1.update({
	id: "/stories_/$slug",
	path: "/stories/$slug",
	getParentRoute: () => Route$19
});
var TeamsSlugRoute = Route.update({
	id: "/teams/$slug",
	path: "/teams/$slug",
	getParentRoute: () => Route$19
});
var EdgeRouteChildren = { EdgeSplatRoute };
var rootRouteChildren = {
	IndexRoute,
	AccuracyRoute,
	ConferencesRoute,
	DeskRoute,
	EdgeRoute: EdgeRoute._addFileChildren(EdgeRouteChildren),
	LogosRoute,
	MatchupRoute,
	ModelRoute,
	RankingsRoute,
	RecruitingRoute,
	ScheduleRoute,
	StatesRoute,
	StatsRoute,
	StoriesRoute,
	StrengthRoute,
	TalentRoute,
	StoriesSlugRoute,
	TeamsSlugRoute
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { apLabel as $, Route$18 as A, favoriteLine as B, TeamMark as C, Route$12 as D, Route$10 as E, confRacesMeta as F, vegasParts as G, featuredSlateWeek as H, fmtOdds as I, ConfPills as J, Button as K, parseRaceConf as L, RACE_CONFS as M, confRace as N, Route$16 as O, confRaceFor as P, TeamSelect as Q, AP_STAMP as R, TeamLink as S, YEARS as T, isNotableSpreadGap as U, featuredBook as V, selectWeekScopedFeatured as W, Panel as X, PageHead as Y, PinButton as Z, MixBar as _, Route$4 as a, parseConf as at, RankSpark as b, Route$6 as c, Route$9 as d, cn as et, StatesTab as f, LineStat as g, DeskChip as h, Route$3 as i, inConf as it, WEEK0_SLATE as j, Route$17 as k, Route$8 as l, DeltaChip as m, Route as n, fmtNum as nt, SORTS as o, teamLogoSrc as ot, CompareRow as p, CONFS as q, Route$1 as r, fmtPct as rt, Route$5 as s, usePinnedTeam as st, router_exports as t, fmtHeight as tt, defaultWeek as u, RankMove as v, WinBar as w, Stat as x, RankNum as y, CFP_STAMP as z };
