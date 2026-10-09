/**
 * HX Edge Pack — public monetization surface.
 * Checkout URL is a Stripe Payment Link from env when it exists:
 *   VITE_EDGE_CHECKOUT_WEEK_URL  week sample ($5) — the only paid buy on the site.
 * Edge pause step 1 (2026-10-09): the recurring tier and its env path are removed.
 * Never invent a payment link. Unset → #checkout-pending.
 */

export const EDGE_CHECKOUT_PENDING = "#checkout-pending";

export const EDGE_SUPPORT_EMAIL = "hello@hashmarkcfb.com";

export const EDGE = {
  name: "HX Edge Pack",
  shortName: "Edge Pack",
  weekPrice: "$5",
  weekLabel: "$5 Week sample",
  supportEmail: EDGE_SUPPORT_EMAIL,
} as const;

export type EdgeCheckoutKind = "week";

export type EdgeCheckoutEnv = {
  VITE_EDGE_CHECKOUT_WEEK_URL?: string | undefined;
};

function readCheckoutEnv(): EdgeCheckoutEnv {
  return ((import.meta as { env?: EdgeCheckoutEnv }).env ?? {}) as EdgeCheckoutEnv;
}

/** Accept only absolute http(s) URLs. Empty, hash, or junk → unset. */
export function resolveCheckoutUrl(raw: string | undefined | null): string | null {
  const value = raw?.trim() ?? "";
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol === "http:" || url.protocol === "https:") return url.toString();
  } catch {
    return null;
  }
  return null;
}

export function edgeCheckoutUrl(
  kind: EdgeCheckoutKind = "week",
  env: EdgeCheckoutEnv = readCheckoutEnv(),
): string | null {
  void kind;
  return resolveCheckoutUrl(env.VITE_EDGE_CHECKOUT_WEEK_URL);
}

export function edgeCheckoutHref(
  kind: EdgeCheckoutKind = "week",
  env: EdgeCheckoutEnv = readCheckoutEnv(),
): string {
  return edgeCheckoutUrl(kind, env) ?? EDGE_CHECKOUT_PENDING;
}

export function edgeCheckoutLive(
  kind: EdgeCheckoutKind = "week",
  env: EdgeCheckoutEnv = readCheckoutEnv(),
): boolean {
  return edgeCheckoutUrl(kind, env) != null;
}
