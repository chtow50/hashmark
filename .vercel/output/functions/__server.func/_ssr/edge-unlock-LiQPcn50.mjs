//#region node_modules/.nitro/vite/services/ssr/assets/edge-unlock-LiQPcn50.js
var EDGE_PACK_DOWNLOAD_PATH = "/api/edge/pack";
var STRIPE_SECRET_ENV = "STRIPE_SECRET_KEY";
var STRIPE_API_VERSION = "2026-07-29.dahlia";
/** Checkout Session ids from Payment Links: cs_test_… / cs_live_… / cs_… */
var CHECKOUT_SESSION_ID_RE = /^cs_(?:test_|live_)?[A-Za-z0-9]{8,}$/;
/** Manifest filenames are basenames only — no path separators. */
var PACK_FILENAME_RE = /^[A-Za-z0-9][A-Za-z0-9._-]*\.(md|json)$/;
function isCheckoutSessionId(value) {
	const id = value?.trim() ?? "";
	return CHECKOUT_SESSION_ID_RE.test(id);
}
/**
* Server-only secret. Publishable keys (pk_) and empty/missing values fail closed.
* Restricted keys (rk_) are accepted — preferred over a full secret key.
*/
function readStripeSecretKey(env = typeof process !== "undefined" ? process.env : {}) {
	const raw = env["STRIPE_SECRET_KEY"]?.trim() ?? "";
	if (!raw) return null;
	if (raw.startsWith("pk_")) return null;
	if (raw.startsWith("sk_") || raw.startsWith("rk_")) return raw;
	return null;
}
function checkoutSessionIsPaid(session) {
	return session.payment_status === "paid" && session.status !== "expired";
}
async function retrieveCheckoutSession(sessionId, secretKey, fetchFn) {
	const url = `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`;
	try {
		const res = await fetchFn(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${secretKey}`,
				"Stripe-Version": STRIPE_API_VERSION
			}
		});
		if (!res.ok) return null;
		const body = await res.json();
		if (!body || typeof body !== "object") return null;
		const session = body;
		return {
			payment_status: typeof session.payment_status === "string" ? session.payment_status : void 0,
			status: typeof session.status === "string" ? session.status : void 0
		};
	} catch {
		return null;
	}
}
async function verifyEdgeUnlockResult(input) {
	if (!isCheckoutSessionId(input.sessionId)) return {
		ok: false,
		reason: "missing_session"
	};
	const secretKey = input.secretKey?.trim() ? readStripeSecretKey({ [STRIPE_SECRET_ENV]: input.secretKey }) : null;
	if (!secretKey) return {
		ok: false,
		reason: "unavailable"
	};
	const session = await retrieveCheckoutSession(input.sessionId.trim(), secretKey, input.fetchFn);
	if (!session) return {
		ok: false,
		reason: "unavailable"
	};
	if (!checkoutSessionIsPaid(session)) return {
		ok: false,
		reason: "unpaid"
	};
	return { ok: true };
}
function parsePackManifest(raw) {
	try {
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object") return null;
		const rec = parsed;
		const files = rec.files;
		if (!files || typeof files !== "object") return null;
		const fileRec = files;
		const md = fileRec.md;
		const json = fileRec.json;
		if (typeof md !== "string" || typeof json !== "string") return null;
		if (!PACK_FILENAME_RE.test(md) || !PACK_FILENAME_RE.test(json)) return null;
		if (typeof rec.week !== "number" || typeof rec.season !== "number") return null;
		if (typeof rec.product !== "string" || typeof rec.support_email !== "string") return null;
		return {
			week: rec.week,
			season: rec.season,
			product: rec.product,
			files: {
				md,
				json
			},
			support_email: rec.support_email
		};
	} catch {
		return null;
	}
}
function selectPackDownload(manifest, format) {
	if (format === "md") return {
		format: "md",
		filename: manifest.files.md,
		mime: "text/markdown; charset=utf-8"
	};
	if (format === "json") return {
		format: "json",
		filename: manifest.files.json,
		mime: "application/json; charset=utf-8"
	};
	return null;
}
function readPackFile(files, filename) {
	if (!PACK_FILENAME_RE.test(filename)) return null;
	const body = files[filename];
	return typeof body === "string" ? body : null;
}
function packDownloadHref(sessionId, format) {
	return `${EDGE_PACK_DOWNLOAD_PATH}?${new URLSearchParams({
		session_id: sessionId,
		format
	}).toString()}`;
}
//#endregion
export { verifyEdgeUnlockResult as a, selectPackDownload as i, parsePackManifest as n, readPackFile as r, packDownloadHref as t };
