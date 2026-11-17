import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { nt as cn } from "./router-DoqqwjXe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/talent-nav-_bLSVw9b.js
var import_jsx_runtime = require_jsx_runtime();
var ITEMS = [
	{
		key: "classes",
		label: "Classes",
		to: "/recruiting",
		search: {}
	},
	{
		key: "states",
		label: "By state",
		to: "/recruiting",
		search: { tab: "states" }
	},
	{
		key: "roster",
		label: "Roster talent",
		to: "/talent",
		search: {}
	},
	{
		key: "results",
		label: "Talent vs results",
		to: "/talent",
		search: { board: "results" }
	},
	{
		key: "size",
		label: "Size",
		to: "/talent",
		search: { board: "size" }
	}
];
/** One nav for the recruiting + talent pages (incoming classes → roster → results). */
function TalentNav({ active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Recruiting and talent",
		className: "-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0",
		children: ITEMS.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: it.to,
			search: it.search,
			"aria-current": active === it.key ? "page" : void 0,
			className: cn("inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm transition-colors duration-150 sm:h-10", active === it.key ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
			children: it.label
		}, it.key))
	});
}
//#endregion
export { TalentNav as t };
