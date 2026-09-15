import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { assembleClearedPack, parseEdgePackManifest } from "./edge-pack-assemble.ts";
import { parseCheckoutSessionId } from "./edge-unlock.ts";
import {
  fulfillEdgeUnlock,
  loadClearedCurrentPackFromFs,
  retrieveCheckoutSession,
  stripeSecretKey,
} from "./edge-unlock.server.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const packDir = join(root, "data/edge-packs/current");

const PAID_ID = "cs_live_abcdefghijklmnopqrstuvwx";

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

describe("parseCheckoutSessionId", () => {
  it("accepts live and test Checkout Session ids", () => {
    assert.equal(parseCheckoutSessionId(PAID_ID), PAID_ID);
    assert.equal(
      parseCheckoutSessionId("cs_test_abcdefghijklmnopqrstuvwx"),
      "cs_test_abcdefghijklmnopqrstuvwx",
    );
  });

  it("rejects missing, short, relative, and non-cs values", () => {
    assert.equal(parseCheckoutSessionId(undefined), null);
    assert.equal(parseCheckoutSessionId(""), null);
    assert.equal(parseCheckoutSessionId("cs_live_short"), null);
    assert.equal(parseCheckoutSessionId("/edge/unlock"), null);
    assert.equal(parseCheckoutSessionId("pi_live_abcdefghijklmnopqrstuvwx"), null);
    assert.equal(parseCheckoutSessionId("cs_live_abc/../etc"), null);
  });
});

describe("CLEARed pack assemble", () => {
  const manifest = JSON.parse(readFileSync(join(packDir, "manifest.json"), "utf8"));
  const markdown = readFileSync(join(packDir, manifest.files.md), "utf8");
  const jsonRaw = JSON.parse(readFileSync(join(packDir, manifest.files.json), "utf8"));

  it("loads the Week 3 CLEARed sample from data/edge-packs/current", () => {
    assert.equal(manifest.cleared, true);
    assert.equal(manifest.week, 3);
    assert.equal(manifest.support_email, "hello@hashmarkcfb.com");
    const assembled = assembleClearedPack({
      manifestRaw: manifest,
      markdown,
      jsonRaw,
      mdName: manifest.files.md,
      jsonName: manifest.files.json,
    });
    assert.equal(assembled.ok, true);
    if (!assembled.ok) return;
    assert.match(assembled.pack.markdown, /HX Edge Pack/);
    assert.equal(typeof assembled.pack.json.confidence_cards, "object");
  });

  it("refuses a pack that is not CLEARed", () => {
    const assembled = assembleClearedPack({
      manifestRaw: { ...manifest, cleared: false },
      markdown,
      jsonRaw,
      mdName: manifest.files.md,
      jsonName: manifest.files.json,
    });
    assert.deepEqual(assembled, { ok: false, reason: "not_cleared" });
  });

  it("refuses path-escaping filenames", () => {
    assert.equal(
      parseEdgePackManifest({
        ...manifest,
        files: { md: "../secret.md", json: manifest.files.json },
      }),
      null,
    );
  });

  it("reads the same pack from the workspace filesystem", () => {
    const pack = loadClearedCurrentPackFromFs(root);
    assert.equal(pack.manifest.cleared, true);
    assert.match(pack.markdown, /Week 3/);
  });
});

describe("Stripe secret + Checkout Session retrieve", () => {
  it("only accepts sk_test_ / sk_live_ and never a VITE_ value", () => {
    assert.equal(stripeSecretKey({}), null);
    assert.equal(stripeSecretKey({ STRIPE_SECRET_KEY: "" }), null);
    assert.equal(stripeSecretKey({ STRIPE_SECRET_KEY: "pk_live_abc" }), null);
    assert.equal(stripeSecretKey({ STRIPE_SECRET_KEY: "VITE_sk_live_abc" }), null);
    assert.equal(stripeSecretKey({ STRIPE_SECRET_KEY: "sk_live_abc" }), "sk_live_abc");
  });

  it("treats payment_status paid as success", async () => {
    const result = await retrieveCheckoutSession(PAID_ID, "sk_live_abc", async () =>
      jsonResponse(200, {
        id: PAID_ID,
        object: "checkout.session",
        payment_status: "paid",
        status: "complete",
      }),
    );
    assert.equal(result.ok, true);
  });

  it("does not serve unpaid, missing, or error sessions", async () => {
    const unpaid = await retrieveCheckoutSession(PAID_ID, "sk_live_abc", async () =>
      jsonResponse(200, {
        id: PAID_ID,
        object: "checkout.session",
        payment_status: "unpaid",
        status: "open",
      }),
    );
    assert.deepEqual(unpaid, { ok: false, status: "unpaid" });

    const missing = await retrieveCheckoutSession(PAID_ID, "sk_live_abc", async () =>
      jsonResponse(404, { error: { message: "No such checkout.session" } }),
    );
    assert.deepEqual(missing, { ok: false, status: "not_found" });

    const auth = await retrieveCheckoutSession(PAID_ID, "sk_live_abc", async () =>
      jsonResponse(401, { error: { message: "Invalid API Key" } }),
    );
    assert.deepEqual(auth, { ok: false, status: "missing_key" });
  });
});

describe("fulfillEdgeUnlock", () => {
  const pack = loadClearedCurrentPackFromFs(root);

  it("does not call Stripe or return the pack without a session id", async () => {
    let called = 0;
    const result = await fulfillEdgeUnlock("", {
      secretKey: "sk_live_abc",
      retrieve: async () => {
        called += 1;
        return { ok: false, status: "stripe_error" };
      },
      loadPack: async () => pack,
    });
    assert.equal(result.status, "missing_session");
    assert.equal(called, 0);
  });

  it("does not return the pack for an invalid session id", async () => {
    const result = await fulfillEdgeUnlock("not-a-session", {
      secretKey: "sk_live_abc",
      retrieve: async () => ({ ok: true, session: { id: "x", object: "checkout.session", payment_status: "paid", status: "complete" } }),
      loadPack: async () => pack,
    });
    assert.equal(result.status, "invalid_session");
  });

  it("does not return the pack when the secret key is missing", async () => {
    const result = await fulfillEdgeUnlock(PAID_ID, {
      secretKey: null,
      loadPack: async () => pack,
    });
    assert.equal(result.status, "missing_key");
  });

  it("returns the CLEARed pack only after paid verification", async () => {
    const result = await fulfillEdgeUnlock(PAID_ID, {
      secretKey: "sk_live_abc",
      retrieve: async (id, key) => {
        assert.equal(id, PAID_ID);
        assert.equal(key, "sk_live_abc");
        return {
          ok: true,
          session: {
            id,
            object: "checkout.session",
            payment_status: "paid",
            status: "complete",
          },
        };
      },
      loadPack: async () => pack,
    });
    assert.equal(result.status, "unlocked");
    if (result.status !== "unlocked") return;
    assert.match(result.pack.markdown, /HX Edge Pack/);
    assert.equal(result.pack.manifest.support_email, "hello@hashmarkcfb.com");
  });

  it("keeps the pack closed when Stripe says unpaid", async () => {
    const result = await fulfillEdgeUnlock(PAID_ID, {
      secretKey: "sk_live_abc",
      retrieve: async () => ({ ok: false, status: "unpaid" }),
      loadPack: async () => {
        throw new Error("pack must not load");
      },
    });
    assert.equal(result.status, "unpaid");
  });

  it("does not serve an uncleared directory even if Stripe is paid", async () => {
    const dir = mkdtempSync(join(tmpdir(), "edge-pack-"));
    const current = join(dir, "data/edge-packs/current");
    mkdirSync(current, { recursive: true });
    writeFileSync(
      join(current, "manifest.json"),
      JSON.stringify({
        week: 3,
        season: 2026,
        product: "draft",
        tier: "SAMPLE_9",
        hx_stamp: "HX 2026.4",
        cleared: false,
        files: { md: "x.md", json: "x.json" },
        support_email: "hello@hashmarkcfb.com",
      }),
    );
    writeFileSync(join(current, "x.md"), "# draft\n");
    writeFileSync(join(current, "x.json"), "{\"ok\":true}");
    const result = await fulfillEdgeUnlock(PAID_ID, {
      secretKey: "sk_live_abc",
      retrieve: async () => ({
        ok: true,
        session: {
          id: PAID_ID,
          object: "checkout.session",
          payment_status: "paid",
          status: "complete",
        },
      }),
      loadPack: async () => loadClearedCurrentPackFromFs(dir),
    });
    assert.equal(result.status, "pack_unavailable");
  });
});

describe("pack is not a public static file", () => {
  it("client/route sources do not import the bundled pack or current json", () => {
    const files = [
      readFileSync(join(root, "src/routes/edge.unlock.tsx"), "utf8"),
      readFileSync(join(root, "src/components/edge-unlock.tsx"), "utf8"),
      readFileSync(join(root, "src/lib/edge-unlock-fn.ts"), "utf8"),
    ].join("\n");
    assert.doesNotMatch(files, /from ["'][^"']*edge-pack-bundled/);
    assert.doesNotMatch(files, /from ["'][^"']*edge-packs/);
    assert.doesNotMatch(files, /hx_edge_pack_week3/);
    assert.doesNotMatch(
      readFileSync(join(root, "src/lib/edge-unlock.ts"), "utf8"),
      /from ["'][^"']*edge-pack-bundled|from ["'][^"']*edge-packs|hx_edge_pack_week3/,
    );
  });

  it("documents STRIPE_SECRET_KEY for Vercel", () => {
    const doc = readFileSync(join(root, "docs/vercel-env.md"), "utf8");
    assert.match(doc, /STRIPE_SECRET_KEY/);
    assert.match(doc, /Environment Variables/);
    assert.match(doc, /VITE_/);
    assert.match(doc, /hashmarkcfb.com\/edge\/unlock/);
  });
});
