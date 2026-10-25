import { t as MODEL } from "./chicago-BukGnqrI.mjs";
import { _ as Outlet, g as useChildMatches, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as Panel, U as EDGE, q as PageHead } from "./router-BMKNwI0G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edge-B-r7G-Bx.js
var import_jsx_runtime = require_jsx_runtime();
function EdgeLayout() {
	if (useChildMatches().length > 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EdgePausedPage, {});
}
function EdgePausedPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: `${EDGE.name} · Paused`,
				title: "Edge is paused.",
				lede: "Nothing is for sale. The desk runs one rating — HX — and all of it is on the free board."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-2 text-sm leading-relaxed text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"Week ",
						9,
						" board · HX ",
						MODEL.version,
						" · full 136 FBS."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Every slate game: HX spread and win% next to the Vegas close when one is sourced." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The weekly tape: SU and closer, scored in public against ESPN FINALs." })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-fg underline underline-offset-4 hover:text-accent",
						children: "Open the board"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/schedule",
						search: { w: 9 },
						className: "text-fg underline underline-offset-4 hover:text-accent",
						children: [
							"Week ",
							9,
							" slate"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/model",
						className: "text-fg underline underline-offset-4 hover:text-accent",
						children: "How HX is built"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs leading-relaxed text-faint",
				children: [
					"Questions: ",
					EDGE.supportEmail,
					". Not betting advice."
				]
			})
		]
	});
}
//#endregion
export { EdgeLayout as component };
