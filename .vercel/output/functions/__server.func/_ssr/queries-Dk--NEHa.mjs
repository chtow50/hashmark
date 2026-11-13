import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as object, i as number, n as boolean, o as string } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-Dk--NEHa.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var listTeams = createServerFn({ method: "GET" }).handler(createSsrRpc("212fff7d2072b94c01d35d756a6846efbcca652fa93e6206b5e625d8fd64ecc1"));
var getTeam = createServerFn({ method: "GET" }).validator(object({ slug: string().min(1) })).handler(createSsrRpc("7bd9c5bd2dac37273cb6e205f595eb0bc550bfd9c6ffff5b5b31dcf74c2250bb"));
var listRecruiting = createServerFn({ method: "GET" }).handler(createSsrRpc("eefaa67313e68bdbcc1c8f6789d44047383841a9720a2e2ed8b4294d8674c7ca"));
var listGames = createServerFn({ method: "GET" }).handler(createSsrRpc("245d4daa33d1f4543fb00eb58f19731eeb1b55fa11f6b5859d8efe1c0915d423"));
createServerFn({ method: "GET" }).validator(object({ date: string().regex(/^\d{4}-\d{2}-\d{2}$/) })).handler(createSsrRpc("9ad172d35fd2eca98874454de1af972b7e747ffcef39b3001b6739144dfe4457"));
function hashmarkWeekFromRow(kickoffDate, ncaaWeek) {
	return kickoffDate <= "2026-08-30" ? 0 : ncaaWeek;
}
/** FBS slate for one HASHMARK week, sorted by kick. Uses lock HX the same way as listGames. */
var listScheduleWeek = createServerFn({ method: "GET" }).validator(object({ week: number().int().min(0).max(13) })).handler(createSsrRpc("a86900331928441127b7b8d77aaf20878746d66deb7c81c2cb47f2c898494144"));
var getMatchup = createServerFn({ method: "GET" }).validator(object({
	home: string().min(1),
	away: string().min(1),
	neutral: boolean().optional()
})).handler(createSsrRpc("e848cc7c6a78d9034685b108649e3e18d710ecbbe452bcc72388a9cb1e28bc5d"));
var listStates = createServerFn({ method: "GET" }).handler(createSsrRpc("9e7264d9dac7ca986bcb4f134e9bd2a0a4dbce110f243ebdee63580e3b08ec00"));
var getStateDetail = createServerFn({ method: "GET" }).validator(object({ code: string().min(2).max(2) })).handler(createSsrRpc("bab9328854859b702258836ae2f74acf39b2bd6bc01cd038d2facb244149f301"));
//#endregion
export { hashmarkWeekFromRow as a, listScheduleWeek as c, getTeam as i, listStates as l, getMatchup as n, listGames as o, getStateDetail as r, listRecruiting as s, createSsrRpc as t, listTeams as u };
