/**
 * CDN cache policy for the Vercel function (applied by
 * server/middleware/cdn-cache.ts). Plain ESM so `node --test` and the Nitro
 * bundler share it.
 *
 * Why this is safe: every page and server-function response is built from the
 * PGLite snapshot baked into the deployment, and Vercel's CDN cache key
 * includes the deployment URL. A merge → new deploy → fresh cache, so data
 * pages can be cached for a long time without ever serving another deploy's
 * numbers.
 *
 * The only inputs that change WITHOUT a deploy are the clock reads:
 *   - `/`        featured "next kick" card (Date.now in the loader)
 *   - `/matchup` with no home/away pair (opens on that same featured kick)
 *   - `/schedule` default week + week links (Chicago civil date)
 * Those get short or midnight-bounded lifetimes. If you add another
 * clock-dependent server render, give it a tier here.
 */

/** Long tier: data-only pages and GET server functions. */
export const LONG_CACHE = "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800";
/** Featured-kick tier: at most ~2 min behind the clock. */
export const FEATURED_CACHE = "public, max-age=0, s-maxage=60, stale-while-revalidate=60";

const CACHEABLE_STATUS = new Set([200, 301, 307, 308, 404, 410]);

/** @param {number} ms */
function chicagoParts(ms) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(ms));
  const get = (/** @type {string} */ t) => Number(parts.find((p) => p.type === t)?.value);
  return { y: get("year"), m: get("month"), d: get("day"), h: get("hour"), mi: get("minute"), s: get("second") };
}

/**
 * Exact instant (ms) of the next 00:00 America/Chicago after `nowMs` (DST-safe).
 * @param {number} nowMs
 */
export function nextChicagoMidnightMs(nowMs) {
  const { y, m, d } = chicagoParts(nowMs);
  // Next civil day, then try both Chicago offsets (CDT −5, CST −6).
  const next = new Date(Date.UTC(y, m - 1, d + 1));
  for (const offsetH of [5, 6]) {
    const t = Date.UTC(next.getUTCFullYear(), next.getUTCMonth(), next.getUTCDate(), offsetH);
    const p = chicagoParts(t);
    if (p.h === 0 && p.mi === 0 && p.d === next.getUTCDate()) return t;
  }
  // Unreachable for America/Chicago; fall back to one hour from now.
  return nowMs + 3_600_000;
}

/**
 * Cache-Control for a response, or null to leave it alone.
 * @param {{ method: string, pathname: string, search?: string, status: number,
 *   existingCacheControl?: string | null, hasSetCookie?: boolean, nowMs?: number }} r
 */
export function cdnCacheControl(r) {
  const method = String(r.method ?? "GET").toUpperCase();
  if (method !== "GET" && method !== "HEAD") return null;
  if (r.existingCacheControl) return null; // e.g. PWA manifest / install page set no-cache
  if (r.hasSetCookie) return null;
  if (!CACHEABLE_STATUS.has(r.status)) return null;

  const path = String(r.pathname ?? "/");
  if (path.startsWith("/api/") || path.startsWith("/__grok/") || path.startsWith("/auth/")) return null;
  const params = new URLSearchParams(r.search ?? "");
  if (params.has("install")) return null;

  if (path === "/") return FEATURED_CACHE;
  if (path === "/matchup" && !(params.get("home") && params.get("away"))) return FEATURED_CACHE;
  if (path === "/schedule") {
    const nowMs = r.nowMs ?? Date.now();
    const ttl = Math.max(1, Math.floor((nextChicagoMidnightMs(nowMs) - nowMs) / 1000));
    return `public, max-age=0, s-maxage=${ttl}`;
  }
  return LONG_CACHE;
}
