import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { tt as cn } from "./router-czT5d5Ox.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/show-more-6axMVXot.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Phone lists: first `limit` items, then a "Show all" button. Used on the sm:hidden card lists
* (the desktop tables beside them still carry every row, so nothing is hidden from crawlers).
* Resets when `resetKey` changes (new sort or filter).
*/
function ShowMore({ items, limit = 25, noun, render, className, resetKey }) {
	const [openKey, setOpenKey] = (0, import_react.useState)(null);
	const open = openKey === (resetKey ?? "");
	const shown = open ? items : items.slice(0, limit);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className,
		children: shown.map((it, i) => render(it, i))
	}), items.length > limit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => setOpenKey(open ? null : resetKey ?? ""),
		className: cn("mt-3 flex h-11 w-full items-center justify-center rounded-xl bg-raised text-sm text-fg hover:bg-border"),
		children: open ? `Show top ${limit}` : `Show all ${items.length} ${noun}`
	}) : null] });
}
//#endregion
export { ShowMore as t };
