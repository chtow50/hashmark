import { copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "node_modules/@electric-sql/pglite/dist");
const dest = join(root, ".vercel/output/functions/__server.func/_libs");

for (const name of ["pglite.wasm", "initdb.wasm", "pglite.data"]) {
  const from = join(src, name);
  const to = join(dest, name);
  if (!existsSync(from)) {
    throw new Error(`PGLite sidecar missing: ${from}`);
  }
  if (!existsSync(dest)) {
    throw new Error(`Vercel function libs dir missing: ${dest}`);
  }
  copyFileSync(from, to);
}
