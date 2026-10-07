#!/usr/bin/env node
/**
 * Build assertion: the public client output must not carry win_title.
 *
 * Everything under .vercel/output/static/ is served publicly (Vercel static).
 * win_title is Edge Pack / paid only — it may exist in the server function bundle
 * (functions/__server.func, not publicly served; the Edge Pack files are read there
 * after Stripe verification) but never in static/.
 *
 * Usage: node scripts/check-client-bundle.mjs [staticDir]
 * Exits 1 and lists offending files when any match is found.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = join(import.meta.dirname, "..");
export const DEFAULT_STATIC_DIR = join(ROOT, ".vercel/output/static");

/** Paid-only tokens that must never appear in public client output. */
export const FORBIDDEN_CLIENT_TOKENS = ["win_title"];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...walk(path));
    else out.push(path);
  }
  return out;
}

function countOf(text, token) {
  let n = 0;
  let i = text.indexOf(token);
  while (i !== -1) {
    n += 1;
    i = text.indexOf(token, i + token.length);
  }
  return n;
}

/** @returns {{ file: string, token: string, count: number }[]} */
export function scanClientOutput(staticDir = DEFAULT_STATIC_DIR) {
  const hits = [];
  for (const file of walk(staticDir)) {
    const text = readFileSync(file).toString("latin1");
    for (const token of FORBIDDEN_CLIENT_TOKENS) {
      const count = countOf(text, token);
      if (count) hits.push({ file: relative(ROOT, file), token, count });
    }
  }
  return hits;
}

function main() {
  const dir = process.argv[2] ? join(process.cwd(), process.argv[2]) : DEFAULT_STATIC_DIR;
  const hits = scanClientOutput(dir);
  if (hits.length) {
    for (const h of hits) console.error(`[client-bundle] ${h.file}: ${h.token} ×${h.count}`);
    console.error("[client-bundle] FAIL — paid-only fields in public static output");
    process.exit(1);
  }
  console.log(`[client-bundle] OK — no ${FORBIDDEN_CLIENT_TOKENS.join(", ")} in ${relative(ROOT, dir)}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
