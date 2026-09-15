/**
 * Post-purchase Edge Pack unlock — fail closed.
 *
 * Stripe Payment Links redirect to /edge/unlock?session_id={CHECKOUT_SESSION_ID}.
 * The server retrieves the Checkout Session with STRIPE_SECRET_KEY (never VITE_)
 * and only then serves files from data/edge-packs/current/.
 */

export const EDGE_UNLOCK_PATH = "/edge/unlock";
export const EDGE_PACK_DOWNLOAD_PATH = "/api/edge/pack";
export const STRIPE_SECRET_ENV = "STRIPE_SECRET_KEY";
export const STRIPE_API_VERSION = "2026-07-29.dahlia";

/** Checkout Session ids from Payment Links: cs_test_… / cs_live_… / cs_… */
export const CHECKOUT_SESSION_ID_RE = /^cs_(?:test_|live_)?[A-Za-z0-9]{8,}$/;

/** Manifest filenames are basenames only — no path separators. */
export const PACK_FILENAME_RE = /^[A-Za-z0-9][A-Za-z0-9._-]*\.(md|json)$/;

export type UnlockReason = "missing_session" | "unpaid" | "unavailable";

export type UnlockFailure = { ok: false; reason: UnlockReason };
export type UnlockSuccess = { ok: true };
export type UnlockVerifyResult = UnlockSuccess | UnlockFailure;

export type PackManifest = {
  week: number;
  season: number;
  product: string;
  files: { md: string; json: string };
  support_email: string;
};

export type PackFormat = "md" | "json";

export type PackDownload = {
  format: PackFormat;
  filename: string;
  mime: string;
};

export type FetchLike = (
  input: string,
  init?: { method?: string; headers?: Record<string, string> },
) => Promise<Response>;

export function isCheckoutSessionId(value: string | undefined | null): value is string {
  const id = value?.trim() ?? "";
  return CHECKOUT_SESSION_ID_RE.test(id);
}

/**
 * Server-only secret. Publishable keys (pk_) and empty/missing values fail closed.
 * Restricted keys (rk_) are accepted — preferred over a full secret key.
 */
export function readStripeSecretKey(
  env: Record<string, string | undefined> = typeof process !== "undefined"
    ? (process.env as Record<string, string | undefined>)
    : {},
): string | null {
  const raw = env[STRIPE_SECRET_ENV]?.trim() ?? "";
  if (!raw) return null;
  if (raw.startsWith("pk_")) return null;
  if (raw.startsWith("sk_") || raw.startsWith("rk_")) return raw;
  return null;
}

export function checkoutSessionIsPaid(session: {
  payment_status?: unknown;
  status?: unknown;
}): boolean {
  return session.payment_status === "paid" && session.status !== "expired";
}

export async function retrieveCheckoutSession(
  sessionId: string,
  secretKey: string,
  fetchFn: FetchLike,
): Promise<{ payment_status?: string; status?: string } | null> {
  const url = `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`;
  try {
    const res = await fetchFn(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Stripe-Version": STRIPE_API_VERSION,
      },
    });
    if (!res.ok) return null;
    const body: unknown = await res.json();
    if (!body || typeof body !== "object") return null;
    const session = body as { payment_status?: unknown; status?: unknown };
    return {
      payment_status: typeof session.payment_status === "string" ? session.payment_status : undefined,
      status: typeof session.status === "string" ? session.status : undefined,
    };
  } catch {
    return null;
  }
}

export async function verifyEdgeUnlockResult(input: {
  sessionId?: string | null;
  secretKey?: string | null;
  fetchFn: FetchLike;
}): Promise<UnlockVerifyResult> {
  if (!isCheckoutSessionId(input.sessionId)) {
    return { ok: false, reason: "missing_session" };
  }
  const secretKey = input.secretKey?.trim() ? readStripeSecretKey({ [STRIPE_SECRET_ENV]: input.secretKey }) : null;
  if (!secretKey) {
    return { ok: false, reason: "unavailable" };
  }

  const session = await retrieveCheckoutSession(input.sessionId.trim(), secretKey, input.fetchFn);
  if (!session) return { ok: false, reason: "unavailable" };
  if (!checkoutSessionIsPaid(session)) return { ok: false, reason: "unpaid" };
  return { ok: true };
}

export function parsePackManifest(raw: string): PackManifest | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const rec = parsed as Record<string, unknown>;
    const files = rec.files;
    if (!files || typeof files !== "object") return null;
    const fileRec = files as Record<string, unknown>;
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
      files: { md, json },
      support_email: rec.support_email,
    };
  } catch {
    return null;
  }
}

export function selectPackDownload(
  manifest: PackManifest,
  format: string | undefined | null,
): PackDownload | null {
  if (format === "md") {
    return {
      format: "md",
      filename: manifest.files.md,
      mime: "text/markdown; charset=utf-8",
    };
  }
  if (format === "json") {
    return {
      format: "json",
      filename: manifest.files.json,
      mime: "application/json; charset=utf-8",
    };
  }
  return null;
}

export function readPackFile(
  files: Record<string, string>,
  filename: string,
): string | null {
  if (!PACK_FILENAME_RE.test(filename)) return null;
  const body = files[filename];
  return typeof body === "string" ? body : null;
}

export function packDownloadHref(sessionId: string, format: PackFormat): string {
  const params = new URLSearchParams({ session_id: sessionId, format });
  return `${EDGE_PACK_DOWNLOAD_PATH}?${params.toString()}`;
}
