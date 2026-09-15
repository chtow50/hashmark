/**
 * HX Edge Pack unlock — client-safe types and checkout-session parsing.
 *
 * Paid content is never imported here. The server verifies Stripe, then
 * returns the CLEARed pack from data/edge-packs/current/.
 *
 * Payment Links redirect to:
 *   https://hashmarkcfb.com/edge/unlock?session_id={CHECKOUT_SESSION_ID}
 *
 * Server env (Vercel → Project → Settings → Environment Variables):
 *   STRIPE_SECRET_KEY  Stripe secret (sk_live_ / sk_test_). Never VITE_.
 */

export const EDGE_SUPPORT_EMAIL = "hello@hashmarkcfb.com";
export const EDGE_PACK_DIR = "data/edge-packs/current";

/** Stripe Checkout Session ids from Payment Link {CHECKOUT_SESSION_ID}. */
const SESSION_ID_RE = /^cs_(test|live)_[A-Za-z0-9]+$/;

export function parseCheckoutSessionId(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const value = raw.trim();
  if (value.length < 16 || value.length > 255) return null;
  if (!SESSION_ID_RE.test(value)) return null;
  return value;
}

export type EdgeUnlockStatus =
  | "missing_session"
  | "invalid_session"
  | "missing_key"
  | "not_found"
  | "unpaid"
  | "stripe_error"
  | "pack_unavailable"
  | "unlocked";

export type EdgePackManifest = {
  week: number;
  season: number;
  product: string;
  tier: string;
  hx_stamp: string;
  cleared: boolean;
  files: { md: string; json: string };
  support_email: string;
};

export type EdgeUnlockPack = {
  manifest: EdgePackManifest;
  markdown: string;
  jsonText: string;
  json: Record<string, unknown>;
};

export type EdgeUnlockResult =
  | { status: Exclude<EdgeUnlockStatus, "unlocked"> }
  | { status: "unlocked"; pack: EdgeUnlockPack };

export const UNLOCK_COPY = {
  thanksTitle: "Thanks — pack is open",
  thanksLede:
    "The Week 3 HX Edge Pack is on this page. HASHMARK does not create an account. Bookmark this link if you want it later.",
  supportLine: "Questions or a missing file",
  missingTitle: "Checkout to open the pack",
  missingLede:
    "Stripe sends you here after a paid Edge Pack checkout, with a session id on the URL. The public board stays free.",
  invalidTitle: "That checkout link is not valid",
  unpaidTitle: "Payment is not complete",
  unpaidLede:
    "Stripe has not marked this checkout as paid. Finish payment, or wait a moment and refresh.",
  notFoundTitle: "No checkout with that id",
  stripeTitle: "Could not verify payment",
  stripeLede: "Stripe did not answer. Refresh this page in a moment.",
  keyTitle: "Unlock is not wired on this host",
  keyLede:
    "The pack stays closed until the server can verify a Stripe Checkout Session. The public board is still open.",
  packTitle: "Pack is not cleared to send",
} as const;
