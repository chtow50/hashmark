/**
 * Stripe Checkout Session verify + CLEARed pack load. Server-only.
 *
 * Vercel: set STRIPE_SECRET_KEY on the project (Production; Preview if you
 * test Payment Links). Secret key from Stripe Dashboard → Developers → API
 * keys. Do not prefix with VITE_ — it must never reach the browser.
 *
 * See docs/vercel-env.md.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { assembleClearedPack, parseEdgePackManifest } from "./edge-pack-assemble.ts";
import {
  EDGE_PACK_DIR,
  parseCheckoutSessionId,
  type EdgeUnlockPack,
  type EdgeUnlockResult,
} from "./edge-unlock.ts";

if (typeof window !== "undefined") {
  throw new Error(
    "@/lib/edge-unlock.server is server-only. Unlock the pack from a createServerFn handler, never from a React component.",
  );
}

export type StripeCheckoutSnapshot = {
  id: string;
  object: string;
  payment_status: string;
  status: string | null;
};

export type StripeVerifyResult =
  | { ok: true; session: StripeCheckoutSnapshot }
  | { ok: false; status: Exclude<EdgeUnlockResult["status"], "unlocked" | "pack_unavailable"> };

export function stripeSecretKey(env: NodeJS.ProcessEnv = process.env): string | null {
  const value = env.STRIPE_SECRET_KEY?.trim() ?? "";
  if (!value || value.startsWith("VITE_")) return null;
  if (!value.startsWith("sk_test_") && !value.startsWith("sk_live_")) return null;
  return value;
}

export async function retrieveCheckoutSession(
  sessionId: string,
  secretKey: string,
  fetchImpl: typeof fetch = fetch,
): Promise<StripeVerifyResult> {
  const url = `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`;
  let response: Response;
  try {
    response = await fetchImpl(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        Accept: "application/json",
      },
    });
  } catch {
    return { ok: false, status: "stripe_error" };
  }

  if (response.status === 404) return { ok: false, status: "not_found" };
  if (response.status === 401 || response.status === 403) {
    return { ok: false, status: "missing_key" };
  }
  if (!response.ok) return { ok: false, status: "stripe_error" };

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    return { ok: false, status: "stripe_error" };
  }

  const rec = body as {
    id?: unknown;
    object?: unknown;
    payment_status?: unknown;
    status?: unknown;
  };
  if (rec.object !== "checkout.session" || typeof rec.id !== "string") {
    return { ok: false, status: "stripe_error" };
  }
  const session: StripeCheckoutSnapshot = {
    id: rec.id,
    object: "checkout.session",
    payment_status: typeof rec.payment_status === "string" ? rec.payment_status : "",
    status: typeof rec.status === "string" ? rec.status : null,
  };
  if (session.payment_status !== "paid") {
    return { ok: false, status: "unpaid" };
  }
  return { ok: true, session };
}

export function loadClearedCurrentPackFromFs(root = process.cwd()): EdgeUnlockPack {
  const dir = join(root, EDGE_PACK_DIR);
  const manifestRaw = JSON.parse(readFileSync(join(dir, "manifest.json"), "utf8")) as unknown;
  const manifest = parseEdgePackManifest(manifestRaw);
  if (!manifest) {
    throw Object.assign(new Error("invalid"), { reason: "invalid" as const });
  }
  if (!manifest.cleared) {
    throw Object.assign(new Error("not_cleared"), { reason: "not_cleared" as const });
  }
  const markdown = readFileSync(join(dir, manifest.files.md), "utf8");
  const jsonRaw = JSON.parse(readFileSync(join(dir, manifest.files.json), "utf8")) as unknown;
  const assembled = assembleClearedPack({
    manifestRaw,
    markdown,
    jsonRaw,
    mdName: manifest.files.md,
    jsonName: manifest.files.json,
  });
  if (!assembled.ok) {
    throw Object.assign(new Error(assembled.reason), { reason: assembled.reason });
  }
  return assembled.pack;
}

export async function loadClearedCurrentPack(root = process.cwd()): Promise<EdgeUnlockPack> {
  try {
    return loadClearedCurrentPackFromFs(root);
  } catch (err) {
    const reason = (err as { reason?: string }).reason;
    if (reason === "not_cleared" || reason === "invalid") throw err;
    const { bundledEdgePack } = await import("./edge-pack-bundled.server");
    const assembled = assembleClearedPack({
      manifestRaw: bundledEdgePack.manifest,
      markdown: bundledEdgePack.markdown,
      jsonRaw: bundledEdgePack.json,
      mdName: bundledEdgePack.mdName,
      jsonName: bundledEdgePack.jsonName,
    });
    if (!assembled.ok) {
      throw Object.assign(new Error(assembled.reason), { reason: assembled.reason });
    }
    return assembled.pack;
  }
}

export async function fulfillEdgeUnlock(
  rawSessionId: unknown,
  deps: {
    secretKey?: string | null;
    retrieve?: typeof retrieveCheckoutSession;
    loadPack?: () => Promise<EdgeUnlockPack>;
  } = {},
): Promise<EdgeUnlockResult> {
  const blank =
    rawSessionId == null ||
    rawSessionId === "" ||
    (typeof rawSessionId === "string" && rawSessionId.trim() === "");
  if (blank) return { status: "missing_session" };
  const sessionId = parseCheckoutSessionId(rawSessionId);
  if (!sessionId) return { status: "invalid_session" };

  const secretKey = deps.secretKey !== undefined ? deps.secretKey : stripeSecretKey();
  if (!secretKey) return { status: "missing_key" };

  const retrieve = deps.retrieve ?? retrieveCheckoutSession;
  const verified = await retrieve(sessionId, secretKey);
  if (!verified.ok) return { status: verified.status };

  try {
    const pack = await (deps.loadPack ?? loadClearedCurrentPack)();
    return { status: "unlocked", pack };
  } catch (err) {
    const reason = (err as { reason?: string }).reason;
    if (reason === "not_cleared" || reason === "invalid") {
      return { status: "pack_unavailable" };
    }
    return { status: "pack_unavailable" };
  }
}
