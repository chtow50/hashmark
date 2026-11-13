/**
 * Replay migrations/*.sql (non-recursive, same order as scripts/migrate.mjs) into an
 * in-memory PGLite and return the db. Offline tooling only — never touches DATABASE_URL.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { PGlite } from "@electric-sql/pglite";

export const ROOT = join(import.meta.dirname, "..");
export const MIGRATIONS_DIR = join(ROOT, "migrations");

export function migrationFiles() {
  return readdirSync(MIGRATIONS_DIR)
    .filter((f) => /^\d{4}_.+\.sql$/.test(f))
    .sort();
}

export async function replayMigrations({ until } = {}) {
  const db = new PGlite();
  for (const f of migrationFiles()) {
    if (until && f > until) break;
    await db.exec(readFileSync(join(MIGRATIONS_DIR, f), "utf8"));
  }
  return db;
}

/** Stamped FBS–FBS FINALs, chronological. */
export async function loadFinals(db) {
  const r = await db.query(`
    select g.id, g.week, g.kickoff_date::text as kickoff_date, h.slug as home, a.slug as away,
           g.neutral, g.home_score, g.away_score, g.vegas_spread
    from games g
    join teams h on h.id = g.home_team_id
    join teams a on a.id = g.away_team_id
    where g.status = 'final' and g.home_score is not null and g.away_score is not null
    order by g.kickoff_date, g.id`);
  return r.rows.map((x) => ({
    id: x.id,
    week: x.week,
    kickoffDate: x.kickoff_date,
    home: x.home,
    away: x.away,
    neutral: x.neutral,
    homeScore: x.home_score,
    awayScore: x.away_score,
    vegasSpread: x.vegas_spread,
  }));
}

/**
 * Replay migrations one at a time and record, for every game, the HX board that was
 * live when the game was first stamped FINAL (the pregame board — boards only change
 * in rankings migrations, which never stamp scores). Returns the db plus the FINALs
 * that still have no lock_home_hx / lock_away_hx after the full replay.
 *
 * Key = "week|home|away" (exact orientation; migrations match exact h/a slugs).
 */
export async function replayWithPregameLocks() {
  const db = new PGlite();
  const boardAtStamp = new Map();
  let board = null;
  const readBoard = async () => {
    const r = await db.query(
      "select t.slug, r.hx_rating from rankings r join teams t on t.id = r.team_id where r.season = 2026 and r.week = 0",
    );
    return new Map(r.rows.map((x) => [x.slug, x.hx_rating]));
  };
  for (const f of migrationFiles()) {
    const sql = readFileSync(join(MIGRATIONS_DIR, f), "utf8");
    const before = board;
    await db.exec(sql);
    if (/update\s+rankings|insert\s+into\s+rankings/i.test(sql) || board === null) board = await readBoard();
    let finals;
    try {
      finals = await db.query(`
        select g.week, h.slug as home, a.slug as away from games g
        join teams h on h.id = g.home_team_id join teams a on a.id = g.away_team_id
        where g.status = 'final' and g.home_score is not null and g.away_score is not null`);
    } catch {
      continue; // early migrations: games has no status/score columns yet
    }
    const live = before ?? board;
    for (const g of finals.rows) {
      const key = `${g.week}|${g.home}|${g.away}`;
      if (!boardAtStamp.has(key)) boardAtStamp.set(key, { ...g, homeHx: live.get(g.home), awayHx: live.get(g.away) });
    }
  }
  const unlocked = await db.query(`
    select g.week, h.slug as home, a.slug as away from games g
    join teams h on h.id = g.home_team_id join teams a on a.id = g.away_team_id
    where g.status = 'final' and g.home_score is not null and g.away_score is not null
      and (g.lock_home_hx is null or g.lock_away_hx is null)
    order by g.week, h.slug`);
  const locks = unlocked.rows.map((g) => boardAtStamp.get(`${g.week}|${g.home}|${g.away}`));
  return { db, locks };
}
