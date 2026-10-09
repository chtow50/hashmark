/**
 * Structural W–L check (Research-approved 2026-10-09). Replaces the frozen
 * Oct 8 ESPN snapshot so future FINAL stamps never break this test.
 *
 * Applies every migration to an in-memory PGlite (same files the preview
 * fallback applies) and checks:
 *   1. Every FCS stub names one of the 136 FBS teams, and every stub dated on
 *      or before RECORDS_CUTOFF is FINAL with both scores.
 *   2. Every FBS–FBS `games` row kicking on or before RECORDS_CUTOFF is FINAL
 *      with both scores.
 *   3. For all 136 teams, the production `SEASON_RECORD_JOIN` equals an
 *      independent tally: FINAL games rows (tallySeasonRecord) plus FINAL FCS
 *      stubs (tallyFcsStubRecord).
 * The Oct 9 ESPN audit (data/records_audit_vs_espn_2026-10-09.json) stays as a
 * historical source: its own 136/136 counts are checked, not live site values.
 */
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { PGlite } from "@electric-sql/pglite";
import { FCS_STUB_GAMES } from "./fcs-stubs.ts";
import {
  SEASON_RECORD_JOIN,
  combineSeasonRecord,
  formatSeasonRecord,
  tallyFcsStubRecord,
  tallySeasonRecord,
} from "./season-record.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");

/** Last date (CT) Research has CLEARed every FINAL for, as of the Oct 9 audit. */
export const RECORDS_CUTOFF = "2026-10-08";

async function migratedDb(): Promise<PGlite> {
  const db = new PGlite();
  const migDir = join(root, "migrations");
  for (const f of readdirSync(migDir).filter((n) => n.endsWith(".sql")).sort()) {
    await db.exec(readFileSync(join(migDir, f), "utf8"));
  }
  return db;
}

describe("records: structural W–L (games FINALs + FCS stubs)", () => {
  it("Oct 9 ESPN audit file is internally 136/136 (historical source only)", () => {
    const spec = JSON.parse(
      readFileSync(join(root, "data/records_audit_vs_espn_2026-10-09.json"), "utf8"),
    ) as {
      meta: { n_fbs: number };
      counts: { match_after_all_fixes: number; exceptions_after_all_fixes: unknown[] };
    };
    assert.equal(spec.meta.n_fbs, 136);
    assert.equal(spec.counts.match_after_all_fixes, 136);
    assert.deepEqual(spec.counts.exceptions_after_all_fixes, []);
  });

  it("every FCS stub and FBS game dated on or before the cutoff is FINAL with scores; records equal games + stubs for 136/136", async () => {
    const db = await migratedDb();
    try {
      const teams = (await db.query<{ id: number; slug: string }>(`select id, slug from teams`)).rows;
      assert.equal(teams.length, 136);
      const slugs = new Set(teams.map((t) => t.slug));

      // 1. FCS stubs
      const badStubs: string[] = [];
      for (const s of FCS_STUB_GAMES) {
        if (!slugs.has(s.teamSlug)) badStubs.push(`${s.teamSlug} W${s.week}: not an FBS slug`);
        if (s.kickoffDate > RECORDS_CUTOFF) continue;
        if (s.status !== "final" || s.homeScore == null || s.awayScore == null) {
          badStubs.push(`${s.teamSlug} W${s.week} ${s.kickoffDate}: ${s.status} ${s.homeScore}-${s.awayScore}`);
        }
      }
      assert.deepEqual(badStubs, []);

      // 2. FBS–FBS games
      const games = (
        await db.query<{
          home_team_id: number;
          away_team_id: number;
          status: string;
          home_score: number | null;
          away_score: number | null;
          kickoff_date: string;
        }>(
          `select home_team_id, away_team_id, status, home_score, away_score,
                  to_char(kickoff_date, 'YYYY-MM-DD') as kickoff_date
           from games`,
        )
      ).rows;
      const unstamped = games
        .filter((g) => g.kickoff_date <= RECORDS_CUTOFF)
        .filter((g) => g.status !== "final" || g.home_score == null || g.away_score == null)
        .map((g) => `${g.away_team_id}@${g.home_team_id} ${g.kickoff_date} ${g.status}`);
      assert.deepEqual(unstamped, []);
      // Not vacuous: Weeks 0–6 midweek are on or before the cutoff.
      assert.ok(games.filter((g) => g.kickoff_date <= RECORDS_CUTOFF).length >= 250);
      assert.ok(FCS_STUB_GAMES.filter((s) => s.kickoffDate <= RECORDS_CUTOFF).length >= 100);

      // 3. SQL join == independent TS tally (games FINALs + FCS stub FINALs)
      const { rows } = await db.query<{ slug: string; w: number; l: number }>(
        `select t.slug, coalesce(wl.season_wins, 0)::int as w, coalesce(wl.season_losses, 0)::int as l
         from teams t ${SEASON_RECORD_JOIN}`,
      );
      assert.equal(rows.length, 136);
      const site = new Map(rows.map((r) => [r.slug, formatSeasonRecord(r.w, r.l)]));
      const tallyGames = games.map((g) => ({
        status: g.status,
        homeTeamId: g.home_team_id,
        awayTeamId: g.away_team_id,
        homeScore: g.home_score,
        awayScore: g.away_score,
      }));
      const mismatches: string[] = [];
      for (const t of teams) {
        const rec = combineSeasonRecord(tallySeasonRecord(tallyGames, t.id), tallyFcsStubRecord(t.slug));
        const want = formatSeasonRecord(rec.seasonWins, rec.seasonLosses);
        if (site.get(t.slug) !== want) mismatches.push(`${t.slug}: join ${site.get(t.slug)} vs tally ${want}`);
      }
      assert.deepEqual(mismatches, []);
    } finally {
      await db.close();
    }
  });
});
