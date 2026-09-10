import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as Panel, r as Route$1, w as PageHead } from "./router-b4QcdpTO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stories._slug-YPdWwFjc.js
var import_jsx_runtime = require_jsx_runtime();
function StoryPage() {
	const story = Route$1.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: story.kicker,
			title: story.headline,
			lede: story.dek
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-8 font-mono text-[11px] uppercase tracking-[0.16em] text-faint",
			children: ["HASHMARK desk · ", story.date]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4 text-base leading-relaxed text-fg",
					children: story.body.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p.slice(0, 48)))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.18em] text-faint",
						children: "Why it matters"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-base leading-relaxed",
						children: story.whyItMatters
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.18em] text-faint",
						children: "Sources"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: story.sources.map((src) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: src.href,
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex min-h-11 items-center text-sm text-fg underline decoration-border underline-offset-4 hover:text-accent",
							children: src.label
						}) }, src.href))
					})]
				})
			]
		})
	] });
}
//#endregion
export { StoryPage as component };
