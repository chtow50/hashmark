import { t as createServerFn } from "./ssr.mjs";
import { a as string, i as object } from "../_libs/zod.mjs";
import { a as verifyEdgeUnlockResult } from "./edge-unlock-BHwL6bYd.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edge-unlock-fn-BeYxUQBb.js
function stripeSecret() {
	return typeof process !== "undefined" ? process.env.STRIPE_SECRET_KEY : void 0;
}
var verifyEdgeUnlock_createServerFn_handler = createServerRpc({
	id: "4fe58dd28fd7340a345c36b313f0f7fe83bb1daaeec7d6b97ee43c0751bef21c",
	name: "verifyEdgeUnlock",
	filename: "src/lib/edge-unlock-fn.ts"
}, (opts) => verifyEdgeUnlock.__executeServer(opts));
var verifyEdgeUnlock = createServerFn({ method: "GET" }).validator(object({ sessionId: string().optional() })).handler(verifyEdgeUnlock_createServerFn_handler, async ({ data }) => {
	const verified = await verifyEdgeUnlockResult({
		sessionId: data.sessionId,
		secretKey: stripeSecret(),
		fetchFn: fetch
	});
	if (!verified.ok) return verified;
	const { currentPackManifest } = await import("./edge-pack-files.server-fo61e-8g.mjs");
	const manifest = currentPackManifest();
	if (!manifest) return {
		ok: false,
		reason: "unavailable"
	};
	return {
		ok: true,
		pack: {
			product: manifest.product,
			week: manifest.week,
			season: manifest.season
		}
	};
});
//#endregion
export { verifyEdgeUnlock_createServerFn_handler };
