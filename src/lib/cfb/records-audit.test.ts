/**
 * 136/136 site W–L vs ESPN overall through Thu 2026-10-08
 * (data/records_audit_vs_espn_2026-10-09.json, Research CFB).
 *
 * Applies every migration to an in-memory PGLite (same files the preview
 * fallback applies) and runs the production `SEASON_RECORD_JOIN` — FBS FINAL
 * `games` rows plus FINAL FCS stubs — then compares each team to ESPN.
 */
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { PGlite } from "@electric-sql/pglite";
import { SEASON_RECORD_JOIN, formatSeasonRecord } from "./season-record.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const spec = JSON.parse(
  readFileSync(join(root, "data/records_audit_vs_espn_2026-10-09.json"), "utf8"),
) as {
  meta: { n_fbs: number };
  counts: { match_after_all_fixes: number; exceptions_after_all_fixes: unknown[] };
  change_spec: {
    records_after_all_fixes: Array<{ slug: string; after_all_fixes: string; espn_overall: string }>;
  };
};

describe("records audit: all 136 site records match ESPN", () => {
  it("SEASON_RECORD_JOIN over migrations + FCS stubs equals ESPN overall for 136/136", async () => {
    const target = spec.change_spec.records_after_all_fixes;
    assert.equal(spec.meta.n_fbs, 136);
    assert.equal(target.length, 136);
    assert.equal(spec.counts.match_after_all_fixes, 136);
    assert.deepEqual(spec.counts.exceptions_after_all_fixes, []);

    const db = new PGlite();
    try {
      const migDir = join(root, "migrations");
      for (const f of readdirSync(migDir).filter((n) => n.endsWith(".sql")).sort()) {
        await db.exec(readFileSync(join(migDir, f), "utf8"));
      }
      const { rows } = await db.query<{ slug: string; w: number; l: number }>(
        `select t.slug, coalesce(wl.season_wins, 0)::int as w, coalesce(wl.season_losses, 0)::int as l
         from teams t ${SEASON_RECORD_JOIN}`,
      );
      assert.equal(rows.length, 136);
      const site = new Map(rows.map((r) => [r.slug, formatSeasonRecord(r.w, r.l)]));
      const mismatches = target
        .filter((t) => site.get(t.slug) !== t.espn_overall)
        .map((t) => `${t.slug}: site ${site.get(t.slug)} vs ESPN ${t.espn_overall}`);
      assert.deepEqual(mismatches, []);
      for (const t of target) assert.equal(t.after_all_fixes, t.espn_overall, t.slug);
    } finally {
      await db.close();
    }
  });
});
