#!/usr/bin/env node
/**
 * HX 2026.8 weekly refit (Sunday routine).
 *
 *   node scripts/hx-refit.mjs            # write data/hx_refit_2026.json + a new migrations/NNNN_hx_refit_<date>.sql when the board changed
 *   node scripts/hx-refit.mjs --tag=x    # second refit on one day: NNNN_hx_refit_<date>_x.sql
 *   node scripts/hx-refit.mjs --check    # exit 1 if the committed JSON is stale vs the stamped FINALs (no writes)
 *
 * Reads only the repo: the frozen preseason prior (data/hx_preseason_prior_2026.json)
 * and the stamped FINALs (replayed from migrations/). Deterministic; safe to re-run.
 * Math lives in scripts/hx-refit-core.mjs.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { HX_REFIT, buildRefitSql, rankBoard, refitHx, walkForward } from "./hx-refit-core.mjs";
import { MIGRATIONS_DIR, ROOT, loadFinals, migrationFiles, replayWithPregameLocks } from "./replay-migrations.mjs";

export const PRIOR_PATH = "data/hx_preseason_prior_2026.json";
export const REFIT_PATH = "data/hx_refit_2026.json";
/** First week graded live on HX 2026.8 (weeks before it are retroactive walk-forward). */
export const FIRST_LIVE_WEEK = 12;

export function loadPrior() {
  const raw = JSON.parse(readFileSync(join(ROOT, PRIOR_PATH), "utf8"));
  return Object.fromEntries(raw.teams.map((t) => [t.slug, t.hx]));
}

/** Teams added after the preseason board (prior rank null): no preseason rank, so no pre_rank. */
export function loadNewcomers() {
  const raw = JSON.parse(readFileSync(join(ROOT, PRIOR_PATH), "utf8"));
  return new Set(raw.teams.filter((t) => t.rank == null).map((t) => t.slug));
}

function chicagoYmd(d = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(d);
}

export function buildRefit(prior, finals) {
  const throughWeek = Math.max(...finals.map((g) => g.week));
  const hx = refitHx(prior, finals);
  const board = rankBoard(hx);
  const newcomers = loadNewcomers();
  const preBoard = rankBoard(Object.fromEntries(Object.entries(prior).filter(([slug]) => !newcomers.has(slug))));
  const preRank = Object.fromEntries(preBoard.map((r) => [r.slug, r.rank]));
  const weeks = Array.from({ length: throughWeek + 1 }, (_, i) => i + 1);
  const wf = walkForward(prior, finals, weeks);
  return {
    meta: {
      hx_stamp: HX_REFIT.hxStamp,
      method: "Bayesian blend: MAP ridge of opponent-adjusted capped margins around the preseason HX prior",
      lambda: HX_REFIT.lambda,
      margin_cap: HX_REFIT.marginCap,
      hfa_elo: HX_REFIT.homeFieldElo,
      n_finals: finals.length,
      through_week: throughWeek,
      last_final_date: finals[finals.length - 1].kickoffDate,
      first_live_week: FIRST_LIVE_WEEK,
      scope: "Stamped FBS–FBS FINALs only; FCS opponents are unrated and excluded.",
    },
    board: board.map((r) => ({
      slug: r.slug,
      hx: r.hx,
      rank: r.rank,
      pre_hx: Math.round(prior[r.slug] * 1e4) / 1e4,
      pre_rank: preRank[r.slug] ?? null,
    })),
    history: { weeks: wf.weeks, note: "HX entering each week (refit on FINALs from earlier weeks; Week 1 = preseason).", hx: wf.hx },
    grades: wf.grades.map((g) => ({ ...g, live: g.week >= FIRST_LIVE_WEEK })),
  };
}

function boardKey(refit) {
  return JSON.stringify(refit.board.map((r) => [r.slug, r.hx, r.rank]));
}

export async function main(argv = process.argv.slice(2)) {
  const check = argv.includes("--check");
  const { db, locks } = await replayWithPregameLocks();
  const finals = await loadFinals(db);
  await db.close();
  const refit = buildRefit(loadPrior(), finals);
  const abs = join(ROOT, REFIT_PATH);
  const current = existsSync(abs) ? JSON.parse(readFileSync(abs, "utf8")) : null;
  const sameBoard = current && boardKey(current) === boardKey(refit);
  if (check) {
    refit.meta.migration = current?.meta?.migration;
    const body = `${JSON.stringify(refit, null, 1)}\n`;
    if (locks.length) {
      console.error(`[hx-refit] stale: ${locks.length} FINAL(s) have no pregame HX lock (run node scripts/hx-refit.mjs)`);
      process.exit(1);
    }
    if (!current || readFileSync(abs, "utf8") !== body) {
      console.error(`[hx-refit] stale: ${REFIT_PATH} (run node scripts/hx-refit.mjs)`);
      process.exit(1);
    }
    console.log(`[hx-refit] up to date · ${refit.meta.n_finals} FINALs through Week ${refit.meta.through_week}`);
    return;
  }
  if (!sameBoard || locks.length) {
    const files = migrationFiles();
    const next = String(Number(files[files.length - 1].slice(0, 4)) + 1).padStart(4, "0");
    const tag = argv.find((a) => a.startsWith("--tag="))?.slice(6).replace(/[^a-z0-9]+/gi, "_");
    const name = `${next}_hx_refit_${chicagoYmd().replaceAll("-", "_")}${tag ? `_${tag}` : ""}.sql`;
    if (files.some((f) => f.endsWith(name.slice(5)))) {
      throw new Error(`[hx-refit] ${name.slice(5)} already exists today — merge or delete it before re-running`);
    }
    const sql = buildRefitSql(
      refit.board,
      { hxStamp: HX_REFIT.hxStamp, nFinals: refit.meta.n_finals, throughWeek: refit.meta.through_week, lambda: HX_REFIT.lambda, marginCap: HX_REFIT.marginCap },
      locks,
    );
    writeFileSync(join(MIGRATIONS_DIR, name), sql);
    refit.meta.migration = name;
    console.log(`[hx-refit] wrote migrations/${name} (${locks.length} pregame lock(s))`);
  } else {
    refit.meta.migration = current.meta.migration;
    console.log("[hx-refit] board unchanged and no new FINALs to lock — no new migration");
  }
  writeFileSync(abs, `${JSON.stringify(refit, null, 1)}\n`);
  const top = refit.board.slice(0, 5).map((r) => `${r.rank}. ${r.slug} ${r.hx}`).join(" · ");
  console.log(`[hx-refit] ${refit.meta.n_finals} FINALs through Week ${refit.meta.through_week} · ${top}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
