import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as Download } from "../_libs/lucide-react.mjs";
import { t as packDownloadHref } from "./edge-unlock-LiQPcn50.mjs";
import { $ as Panel, D as Route$4, G as Button, J as EDGE_SUPPORT_EMAIL, Q as PageHead, q as EDGE } from "./router-BPTRgrgl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edge.unlock-CbSj5Eoy.js
var import_jsx_runtime = require_jsx_runtime();
function SupportLine() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-4 text-sm text-muted",
		children: [
			"Support:",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `mailto:${EDGE_SUPPORT_EMAIL}`,
				className: "text-fg underline-offset-4 hover:underline",
				children: EDGE_SUPPORT_EMAIL
			})
		]
	});
}
function UnlockPage() {
	const result = Route$4.useLoaderData();
	const { session_id: sessionId } = Route$4.useSearch();
	if (result.ok && sessionId) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: `${EDGE.name} · Week ${result.pack.week}`,
				title: "Thanks. Your pack is ready.",
				lede: `${result.pack.product}. Download the markdown brief and the JSON. This page does not keep a login — keep the files.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.18em] text-faint",
					children: "Downloads"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "primary",
						className: "w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: packDownloadHref(sessionId, "md"),
							rel: "noreferrer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "Download markdown"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: packDownloadHref(sessionId, "json"),
							rel: "noreferrer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "Download JSON"]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SupportLine, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/edge",
					className: "text-fg underline-offset-4 hover:underline",
					children: "Back to Edge Pack"
				})
			})
		]
	});
	const missing = !result.ok && result.reason === "missing_session";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: EDGE.name,
			title: missing ? "This unlock link needs a checkout." : "We could not unlock this pack.",
			lede: missing ? "Stripe sends you here after a paid checkout. If you opened this page directly, start from Edge Pack." : "Payment could not be confirmed. If you were charged, email support with the time of purchase — do not forward card details."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: "The pack is not on the public Edge Pack page. Unlock only follows a paid Checkout Session."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SupportLine, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/edge",
						children: "Open Edge Pack"
					})
				})
			})
		] })]
	});
}
//#endregion
export { UnlockPage as component };
