import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as Panel, p as Route$10, w as PageHead } from "./router-DgNS_QMM.mjs";
import { n as TeamLogo, t as TEAM_LOGO_ESPN_IDS } from "./team-logo-B4vdH6FI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logos-DmyP07sO.js
var import_jsx_runtime = require_jsx_runtime();
function LogosPage() {
	const teams = Route$10.useLoaderData();
	const bySlug = new Map(teams.map((t) => [t.slug, t]));
	const slugs = Object.keys(TEAM_LOGO_ESPN_IDS).sort((a, b) => {
		const an = bySlug.get(a)?.name ?? a;
		const bn = bySlug.get(b)?.name ?? b;
		return an.localeCompare(bn);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-6 px-4 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			title: "Team logos",
			lede: `${slugs.length} FBS slugs in registry — vendored PNGs under /logos/{slug}.png`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
			children: slugs.map((slug) => {
				const team = bySlug.get(slug);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-col items-center gap-2 rounded-lg border border-line bg-surface-2 p-3 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamLogo, {
							slug,
							size: 20
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium leading-tight text-ink",
							children: team?.shortName ?? slug
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] text-muted",
							children: slug
						})
					]
				}, slug);
			})
		}) })]
	});
}
//#endregion
export { LogosPage as component };
