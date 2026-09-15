import {
  EDGE_SUPPORT_EMAIL,
  type EdgePackManifest,
  type EdgeUnlockPack,
} from "./edge-unlock.ts";

export type AssembleFail = "not_cleared" | "invalid";

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

export function parseEdgePackManifest(raw: unknown): EdgePackManifest | null {
  const rec = asRecord(raw);
  if (!rec) return null;
  const files = asRecord(rec.files);
  const md = files && typeof files.md === "string" ? files.md.trim() : "";
  const json = files && typeof files.json === "string" ? files.json.trim() : "";
  if (!md.endsWith(".md") || !json.endsWith(".json")) return null;
  if (md.includes("/") || md.includes("\\") || json.includes("/") || json.includes("\\")) {
    return null;
  }
  const week = Number(rec.week);
  const season = Number(rec.season);
  if (!Number.isInteger(week) || week < 1 || !Number.isInteger(season) || season < 2000) {
    return null;
  }
  if (typeof rec.product !== "string" || typeof rec.tier !== "string") return null;
  if (typeof rec.hx_stamp !== "string") return null;
  const support =
    typeof rec.support_email === "string" && rec.support_email.includes("@")
      ? rec.support_email.trim()
      : EDGE_SUPPORT_EMAIL;
  return {
    week,
    season,
    product: rec.product,
    tier: rec.tier,
    hx_stamp: rec.hx_stamp,
    cleared: rec.cleared === true,
    files: { md, json },
    support_email: support,
  };
}

export function assembleClearedPack(args: {
  manifestRaw: unknown;
  markdown: string;
  jsonRaw: unknown;
  mdName: string;
  jsonName: string;
}): { ok: true; pack: EdgeUnlockPack } | { ok: false; reason: AssembleFail } {
  const manifest = parseEdgePackManifest(args.manifestRaw);
  if (!manifest) return { ok: false, reason: "invalid" };
  if (!manifest.cleared) return { ok: false, reason: "not_cleared" };
  if (manifest.files.md !== args.mdName || manifest.files.json !== args.jsonName) {
    return { ok: false, reason: "invalid" };
  }
  if (!args.markdown.trim()) return { ok: false, reason: "invalid" };
  const json = asRecord(args.jsonRaw);
  if (!json) return { ok: false, reason: "invalid" };
  return {
    ok: true,
    pack: {
      manifest,
      markdown: args.markdown,
      jsonText: `${JSON.stringify(json, null, 2)}\n`,
      json,
    },
  };
}
