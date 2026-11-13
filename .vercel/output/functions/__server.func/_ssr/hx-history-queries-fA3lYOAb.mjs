import { t as createServerFn } from "./ssr.mjs";
import { a as object, o as string } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hx-history-queries-fA3lYOAb.js
/**
* @param late slug → first board week for teams that joined the board in-season.
* Ranks are among the teams on the board that week (late joiners don't count before they joined).
*/
function teamHxHistory(h, slug, late = {}, live) {
	const series = h.hx[slug];
	if (!series || series.length !== h.weeks.length) return null;
	const joinedWeek = late[slug] ?? null;
	const points = [];
	h.weeks.forEach((week, i) => {
		if (joinedWeek != null && week < joinedWeek) return;
		const onBoard = Object.entries(h.hx).filter(([s]) => late[s] == null || week >= late[s]);
		const mine = series[i];
		const rank = 1 + onBoard.filter(([, v]) => v[i] > mine).length;
		points.push({
			week,
			hx: mine,
			rank,
			of: onBoard.length
		});
	});
	if (!points.length) return null;
	const now = live?.[slug];
	if (now) points[points.length - 1] = {
		...points[points.length - 1],
		rank: now.rank
	};
	return {
		points,
		joinedWeek,
		peak: points.reduce((a, b) => b.hx > a.hx ? b : a),
		low: points.reduce((a, b) => b.hx < a.hx ? b : a)
	};
}
/** HX by week for one team (refit history; newcomers start the week they joined the board). */
var getHxHistory_createServerFn_handler = createServerRpc({
	id: "f55452d4f3f77cab0f95a24b56e8bed8434a482e94fed743291a342313100904",
	name: "getHxHistory",
	filename: "src/lib/cfb/hx-history-queries.ts"
}, (opts) => getHxHistory.__executeServer(opts));
var getHxHistory = createServerFn({ method: "GET" }).validator(object({ slug: string().min(1).max(80) })).handler(getHxHistory_createServerFn_handler, async ({ data }) => {
	const refit = (await import("./hx_refit_2026-DruU6f41.mjs").then((n) => n.t).then((n) => n.n)).default;
	const newcomers = (await import("./fbs_newcomers_2026-DcTJaOY9.mjs")).default;
	const late = Object.fromEntries(newcomers.teams.map((t) => [t.slug, refit.meta.first_live_week]));
	const live = Object.fromEntries(refit.board.map((b) => [b.slug, {
		hx: b.hx,
		rank: b.rank
	}]));
	return teamHxHistory(refit.history, data.slug, late, live);
});
//#endregion
export { getHxHistory_createServerFn_handler };
