import { n as MODEL } from "./fcs-stubs-DntyZ00F.mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as EdgeBoardView, t as EDGE_BOARD_SCHEMA_ID } from "./edge-board-p07aj1cN.mjs";
import { Q as PageHead, q as EDGE } from "./router-DqwbFJB5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edge.board-C55l6ju3.js
var import_jsx_runtime = require_jsx_runtime();
function EdgeBoardPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: `${EDGE.name} · HX ${MODEL.version}`,
				title: "Edge Board",
				lede: "Confidence schema surface. Tiers A–D, calibration FLAGS, small / medium / large edge bands (large ≥ 7 pts) and lean bands. Free is public schedule HX vs Vegas. Paid is ranked cards. Example cards are a schema demo — not a dump of the paid pack."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EdgeBoardView, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "max-w-2xl text-xs leading-relaxed text-faint",
				children: [
					"Schema `",
					EDGE_BOARD_SCHEMA_ID,
					"`. Scenario Sim desk fixture is preview / offline — not this week’s paid pack."
				]
			}),
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
export { EdgeBoardPage as component };
