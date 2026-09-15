import { n as MODEL } from "./fcs-stubs-DntyZ00F.mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as EDGE, K as PageHead, i as Route$2, x as isScenarioSimUnlocked } from "./router-C7mZt9b6.mjs";
import { n as ScenarioSimPanel, t as ScenarioSimGate } from "./scenario-sim-D87c-ZMr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edge_.sim-KYTCzNoP.js
var import_jsx_runtime = require_jsx_runtime();
function EdgeSimPage() {
	const { teams } = Route$2.useLoaderData();
	const search = Route$2.useSearch();
	const unlocked = isScenarioSimUnlocked(search);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: `${EDGE.name} · HX ${MODEL.version}`,
				title: "Scenario Sim (preview)",
				lede: "Coming online. Pin a winner or an HX bump, then read baseline vs scenario vs Δ. This page is a desk fixture until the AMD CLI is wired — Monte Carlo noise, not a lock."
			}),
			unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioSimPanel, { teams }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioSimGate, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/edge",
						className: "text-fg underline-offset-4 hover:underline",
						children: "Back to Edge Pack"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-faint",
						children: " · "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-fg underline-offset-4 hover:underline",
						children: "The board"
					})
				]
			})
		]
	});
}
//#endregion
export { EdgeSimPage as component };
