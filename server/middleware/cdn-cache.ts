/**
 * Long-lived Vercel CDN caching for server-rendered pages and GET server
 * functions, so repeat views and crawlers are served from the CDN instead of
 * waking the function (PGLite snapshot boot is CPU/memory heavy). Policy and
 * the reasoning for each tier live in scripts/cdn-cache-policy.mjs.
 *
 * Auto-registered by Nitro (serverDir: "./server"); runs before grok-pwa.ts
 * (alphabetical), so it sees the final, head-injected response.
 */
import { cdnCacheControl } from "../../scripts/cdn-cache-policy.mjs";

interface CdnCacheEvent {
  url: URL;
  req: { method: string; headers: Headers };
}

export default async function cdnCacheMiddleware(
  event: CdnCacheEvent,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  const result = await next();
  if (!(result instanceof Response)) return result;

  const value = cdnCacheControl({
    method: event.req.method,
    pathname: event.url.pathname,
    search: event.url.search,
    status: result.status,
    existingCacheControl: result.headers.get("cache-control"),
    hasSetCookie: result.headers.has("set-cookie"),
  });
  if (!value) return result;

  // Copy headers: redirect / fetch Responses can carry immutable headers.
  const headers = new Headers(result.headers);
  headers.set("cache-control", value);
  return new Response(result.body, {
    status: result.status,
    statusText: result.statusText,
    headers,
  });
}
