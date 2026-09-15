import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import {
  CHECKOUT_SESSION_ID_RE,
  checkoutSessionIsPaid,
  isCheckoutSessionId,
  packDownloadHref,
  parsePackManifest,
  readPackFile,
  readStripeSecretKey,
  selectPackDownload,
  STRIPE_SECRET_ENV,
  verifyEdgeUnlockResult,
} from "./edge-unlock.ts";

const PAID_ID = "cs_test_paidSessionAbcdefgh";
const UNPAID_ID = "cs_test_unpaidSessionAbcdef";

const MANIFEST = {
  week: 3,
  season: 2026,
  product: "HX Edge Pack Week 3 SAMPLE",
  files: {
    md: "hx_edge_pack_week3_sample_thickened_2026.md",
    json: "hx_edge_pack_week3_sample_thickened_2026.json",
  },
  support_email: "hello@hashmarkcfb.com",
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test("missing secret key fails closed without calling Stripe", async () => {
  let called = 0;
  const result = await verifyEdgeUnlockResult({
    sessionId: PAID_ID,
    secretKey: undefined,
    fetchFn: async () => {
      called += 1;
      return jsonResponse({ payment_status: "paid", status: "complete" });
    },
  });
  assert.equal(result.ok, false);
  if (!result.ok) assert.equal(result.reason, "unavailable");
  assert.equal(called, 0);
});

test("blank and publishable keys fail closed without calling Stripe", async () => {
  for (const secretKey of ["", "   ", "pk_test_1234567890", "not-a-key"]) {
    let called = 0;
    const result = await verifyEdgeUnlockResult({
      sessionId: PAID_ID,
      secretKey,
      fetchFn: async () => {
        called += 1;
        return jsonResponse({ payment_status: "paid", status: "complete" });
      },
    });
    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.reason, "unavailable");
    assert.equal(called, 0, `called Stripe with ${JSON.stringify(secretKey)}`);
  }
});

test("unpaid checkout session fails closed", async () => {
  const result = await verifyEdgeUnlockResult({
    sessionId: UNPAID_ID,
    secretKey: "sk_test_unlock",
    fetchFn: async () =>
      jsonResponse({
        id: UNPAID_ID,
        payment_status: "unpaid",
        status: "open",
      }),
  });
  assert.equal(result.ok, false);
  if (!result.ok) assert.equal(result.reason, "unpaid");
});

test("paid complete checkout session unlocks", async () => {
  let calledUrl = "";
  let auth = "";
  const result = await verifyEdgeUnlockResult({
    sessionId: PAID_ID,
    secretKey: "sk_test_unlock",
    fetchFn: async (url, init) => {
      calledUrl = url;
      auth = init?.headers?.Authorization ?? "";
      return jsonResponse({
        id: PAID_ID,
        payment_status: "paid",
        status: "complete",
      });
    },
  });
  assert.equal(result.ok, true);
  assert.match(calledUrl, /\/v1\/checkout\/sessions\/cs_test_paidSessionAbcdefgh$/);
  assert.equal(auth, "Bearer sk_test_unlock");
  assert.doesNotMatch(calledUrl, /sk_test/);
});

test("restricted key is accepted for a paid session", async () => {
  const result = await verifyEdgeUnlockResult({
    sessionId: PAID_ID,
    secretKey: "rk_live_unlock",
    fetchFn: async (_url, init) => {
      assert.equal(init?.headers?.Authorization, "Bearer rk_live_unlock");
      return jsonResponse({ payment_status: "paid", status: "complete" });
    },
  });
  assert.equal(result.ok, true);
});

test("missing or junk session id fails closed without calling Stripe", async () => {
  for (const sessionId of [undefined, "", "   ", "not-a-session", "pk_test_abc", "/etc/passwd"]) {
    let called = 0;
    const result = await verifyEdgeUnlockResult({
      sessionId,
      secretKey: "sk_test_unlock",
      fetchFn: async () => {
        called += 1;
        return jsonResponse({ payment_status: "paid" });
      },
    });
    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.reason, "missing_session");
    assert.equal(called, 0);
  }
});

test("Stripe error or non-JSON fails closed as unavailable", async () => {
  const errorResult = await verifyEdgeUnlockResult({
    sessionId: PAID_ID,
    secretKey: "sk_test_unlock",
    fetchFn: async () => jsonResponse({ error: { message: "No such session" } }, 404),
  });
  assert.equal(errorResult.ok, false);
  if (!errorResult.ok) assert.equal(errorResult.reason, "unavailable");

  const throwResult = await verifyEdgeUnlockResult({
    sessionId: PAID_ID,
    secretKey: "sk_test_unlock",
    fetchFn: async () => {
      throw new Error("network down");
    },
  });
  assert.equal(throwResult.ok, false);
  if (!throwResult.ok) assert.equal(throwResult.reason, "unavailable");
});

test("expired sessions do not unlock even if payment_status is paid", () => {
  assert.equal(checkoutSessionIsPaid({ payment_status: "paid", status: "expired" }), false);
  assert.equal(checkoutSessionIsPaid({ payment_status: "paid", status: "complete" }), true);
  assert.equal(checkoutSessionIsPaid({ payment_status: "unpaid", status: "complete" }), false);
});

test("readStripeSecretKey only honors STRIPE_SECRET_KEY, never a VITE_ alias", () => {
  assert.equal(STRIPE_SECRET_ENV, "STRIPE_SECRET_KEY");
  assert.equal(
    readStripeSecretKey({
      VITE_STRIPE_SECRET_KEY: "sk_test_leaked",
      STRIPE_SECRET_KEY: undefined,
    }),
    null,
  );
  assert.equal(readStripeSecretKey({ STRIPE_SECRET_KEY: "sk_live_ok" }), "sk_live_ok");
});

test("checkout session id shape rejects path traversal and short junk", () => {
  assert.equal(isCheckoutSessionId("cs_test_abcdefgh"), true);
  assert.equal(isCheckoutSessionId("cs_live_abcdefgh"), true);
  assert.equal(CHECKOUT_SESSION_ID_RE.test("cs_abc"), false);
  assert.equal(isCheckoutSessionId("cs_test_../pack"), false);
});

test("pack downloads only allow md/json basenames from the manifest", () => {
  const manifest = parsePackManifest(JSON.stringify(MANIFEST));
  assert.ok(manifest);
  assert.deepEqual(selectPackDownload(manifest, "md"), {
    format: "md",
    filename: MANIFEST.files.md,
    mime: "text/markdown; charset=utf-8",
  });
  assert.deepEqual(selectPackDownload(manifest, "json"), {
    format: "json",
    filename: MANIFEST.files.json,
    mime: "application/json; charset=utf-8",
  });
  assert.equal(selectPackDownload(manifest, "exe"), null);
  assert.equal(selectPackDownload(manifest, "../secret"), null);
  assert.equal(selectPackDownload(manifest, MANIFEST.files.md), null);
  assert.equal(selectPackDownload(manifest, ""), null);
});

test("parsePackManifest rejects path-shaped filenames", () => {
  assert.equal(
    parsePackManifest(
      JSON.stringify({
        ...MANIFEST,
        files: { md: "../etc/passwd.md", json: MANIFEST.files.json },
      }),
    ),
    null,
  );
  assert.equal(
    parsePackManifest(
      JSON.stringify({
        ...MANIFEST,
        files: { md: "nested/pack.md", json: MANIFEST.files.json },
      }),
    ),
    null,
  );
});

test("readPackFile refuses unknown and path-shaped names", () => {
  const files = { [MANIFEST.files.md]: "# pack", "secret.txt": "nope" };
  assert.equal(readPackFile(files, MANIFEST.files.md), "# pack");
  assert.equal(readPackFile(files, "secret.txt"), null);
  assert.equal(readPackFile(files, "../secret.md"), null);
  assert.equal(readPackFile(files, "missing.md"), null);
});

test("current on-disk pack manifest is valid and files exist", () => {
  const dir = join("data/edge-packs/current");
  const raw = readFileSync(join(dir, "manifest.json"), "utf8");
  const manifest = parsePackManifest(raw);
  assert.ok(manifest);
  assert.equal(manifest.week, 3);
  assert.equal(manifest.season, 2026);
  assert.equal(manifest.support_email, "hello@hashmarkcfb.com");
  const md = readFileSync(join(dir, manifest.files.md), "utf8");
  const json = readFileSync(join(dir, manifest.files.json), "utf8");
  assert.match(md, /HX Edge Pack/);
  assert.ok(json.length > 0);
  JSON.parse(json);
});

test("download href keeps session_id and format as query params", () => {
  assert.equal(
    packDownloadHref(PAID_ID, "md"),
    `/api/edge/pack?session_id=${PAID_ID}&format=md`,
  );
});
