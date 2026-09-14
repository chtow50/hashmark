/**
 * HX Edge Pack — public monetization surface.
 * Checkout URL comes from env. Never invent a payment link.
 */

export const EDGE_CHECKOUT_PENDING = "#checkout-pending";

export const EDGE = {
  name: "HX Edge Pack",
  shortName: "Edge Pack",
  weekPrice: "$9",
  weekLabel: "$9 Week sample",
  monthPrice: "$29/mo",
  monthLabel: "$29/mo",
} as const;

function readEnv(key: string): string | undefined {
  const env = (import.meta as { env?: Record<string, string | undefined> }).env;
  return env?.[key];
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

export function edgeCheckoutUrl(kind: "week" | "month" = "month"): string | null {
  const monthly = resolveCheckoutUrl(readEnv("VITE_EDGE_CHECKOUT_URL"));
  if (kind === "week") {
    return resolveCheckoutUrl(readEnv("VITE_EDGE_CHECKOUT_WEEK_URL")) ?? monthly;
  }
  return monthly;
}

export function edgeCheckoutHref(kind: "week" | "month" = "month"): string {
  return edgeCheckoutUrl(kind) ?? EDGE_CHECKOUT_PENDING;
}

export function edgeCheckoutLive(kind: "week" | "month" = "month"): boolean {
  return edgeCheckoutUrl(kind) != null;
}
