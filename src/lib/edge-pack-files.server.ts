/**
 * Server-only current Edge Pack files.
 * Bundled via import.meta.glob so Vercel prebuilt output contains them.
 * Do not import this module from client routes — that would dump the pack.
 */
import {
  parsePackManifest,
  readPackFile,
  selectPackDownload,
  verifyEdgeUnlockResult,
  type PackManifest,
} from "./edge-unlock";

const rawFiles = import.meta.glob("/data/edge-packs/current/*", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function basename(path: string): string {
  const parts = path.split("/");
  return parts[parts.length - 1] ?? path;
}

export function currentPackFiles(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [path, contents] of Object.entries(rawFiles)) {
    out[basename(path)] = contents;
  }
  return out;
}

export function currentPackManifest(): PackManifest | null {
  const files = currentPackFiles();
  const raw = files["manifest.json"];
  if (typeof raw !== "string") return null;
  return parsePackManifest(raw);
}

export function currentPackDownload(format: string | undefined | null): {
  filename: string;
  mime: string;
  body: string;
} | null {
  const files = currentPackFiles();
  const manifest = currentPackManifest();
  if (!manifest) return null;
  const selected = selectPackDownload(manifest, format);
  if (!selected) return null;
  const body = readPackFile(files, selected.filename);
  if (body == null) return null;
  return { filename: selected.filename, mime: selected.mime, body };
}

const CLOSED = {
  "content-type": "text/plain; charset=utf-8",
  "cache-control": "private, no-store",
} as const;

function stripeSecret(): string | undefined {
  return typeof process !== "undefined" ? process.env.STRIPE_SECRET_KEY : undefined;
}

function closed(status: number): Response {
  return new Response("Pack unavailable.", { status, headers: CLOSED });
}

export async function handleEdgePackDownload(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id") ?? "";
  const format = url.searchParams.get("format") ?? "";
  const verified = await verifyEdgeUnlockResult({
    sessionId,
    secretKey: stripeSecret(),
    fetchFn: fetch,
  });
  if (!verified.ok) {
    return closed(verified.reason === "missing_session" ? 400 : 403);
  }
  const file = currentPackDownload(format);
  if (!file) return closed(403);
  return new Response(file.body, {
    status: 200,
    headers: {
      "content-type": file.mime,
      "content-disposition": `attachment; filename="${file.filename}"`,
      "cache-control": "private, no-store",
    },
  });
}
