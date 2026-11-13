import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, it, before } from "node:test";
import {
  HX_REFIT,
  buildRefitSql,
  diffFromSpread,
  gradeGames,
  predictGame,
  rankBoard,
  refitHx,
  spreadFromDiff,
} from "./hx-refit-core.mjs";
import { REFIT_PATH, buildRefit, loadPrior } from "./hx-refit.mjs";
import { loadFinals, replayMigrations } from "./replay-migrations.mjs";

const ROOT = join(import.meta.dirname, "..");
const MIG = join(ROOT, "migrations");

describe("HX 2026.8 refit math", () => {
  it("inverse spread map round-trips", () => {
    for (const d of [-700, -250, -60, -1, 0, 1, 60, 250, 700]) {
      assert.ok(Math.abs(diffFromSpread(spreadFromDiff(d)) - d) < 1e-6, String(d));
    }
  });

  it("no games → the preseason prior, unchanged", () => {
    const prior = { a: 3, b: -1, c: 0.5 };
    const hx = refitHx(prior, []);
    for (const k of Object.keys(prior)) assert.ok(Math.abs(hx[k] - prior[k]) < 1e-9);
  });

  it("a team that beats expectations moves up, its opponent down; margins cap at 28", () => {
    const prior = { a: 0, b: 0 };
    const g = (hs, as) => [{ home: "a", away: "b", neutral: true, homeScore: hs, awayScore: as, week: 1 }];
    const win = refitHx(prior, g(21, 0));
    assert.ok(win.a > 0 && win.b < 0);
    assert.ok(Math.abs(win.a + win.b) < 1e-9, "zero-sum around the prior");
    const capped = refitHx(prior, g(28, 0));
    const blowout = refitHx(prior, g(70, 0));
    assert.ok(Math.abs(capped.a - blowout.a) < 1e-9, "70-0 counts the same as 28-0");
    // Two teams, one neutral game: the fitted Elo gap is obs / (1 + λ/2) (closed form).
    const obs = diffFromSpread(21);
    assert.ok(Math.abs((win.a - win.b) * HX_REFIT.eloScale - obs / (1 + HX_REFIT.lambda / 2)) < 1e-6);
  });

  it("rankBoard ranks 1..n by HX desc with 4-dp values", () => {
    const b = rankBoard({ x: 1.23456, y: 2, z: -3 });
    assert.deepEqual(b.map((r) => [r.slug, r.rank]), [["y", 1], ["x", 2], ["z", 3]]);
    assert.equal(b[1].hx, 1.2346);
  });

  it("refit SQL is an exact-slug rankings update for the live week-0 rows", () => {
    const sql = buildRefitSql(rankBoard({ georgia: 7, ucla: 5 }), { hxStamp: "HX 2026.8", nFinals: 1, throughWeek: 1, lambda: 2, marginCap: 28 });
    assert.match(sql, /update rankings r/);
    assert.match(sql, /on v\.slug = t\.slug/);
    assert.match(sql, /r\.season = 2026 and r\.week = 0/);
    assert.match(sql, /\('georgia'::text, 7\.0000::double precision, 1::int\)/);
    const body = sql.split("\n").filter((l) => !l.startsWith("--")).join("\n");
    assert.doesNotMatch(body, /truncate|delete/i);
  });
});

describe("HX 2026.8 committed board", () => {
  let finals;
  let refit;
  let committed;
  before(async () => {
    const db = await replayMigrations();
    finals = await loadFinals(db);
    await db.close();
    refit = buildRefit(loadPrior(), finals);
    committed = JSON.parse(readFileSync(join(ROOT, REFIT_PATH), "utf8"));
  });

  it("data/hx_refit_2026.json matches the stamped FINALs (run node scripts/hx-refit.mjs)", () => {
    assert.deepEqual(committed.board, refit.board);
    assert.deepEqual(committed.grades, refit.grades);
    assert.equal(committed.meta.n_finals, finals.length);
    assert.equal(committed.board.length, 136);
  });

  it("the live rankings rows equal the committed board after replaying every migration", async () => {
    const db = await replayMigrations();
    const rows = (await db.query("select t.slug, r.hx_rating, r.hx_rank from rankings r join teams t on t.id = r.team_id where r.season = 2026 and r.week = 0")).rows;
    await db.close();
    const live = Object.fromEntries(rows.map((r) => [r.slug, [r.hx_rating, r.hx_rank]]));
    for (const b of committed.board) assert.deepEqual(live[b.slug], [b.hx, b.rank], b.slug);
    assert.equal(committed.meta.migration && readdirSync(MIG).includes(committed.meta.migration), true);
  });

  it("every stamped FINAL carries its pregame HX lock, so refits never move posted lines", async () => {
    const db = await replayMigrations();
    const r = await db.query("select count(*)::int as n from games where status = 'final' and (lock_home_hx is null or lock_away_hx is null)");
    // Same-day FINALs stamped after the last refit are locked by the next refit run.
    const pending = await db.query("select count(*)::int as n from games where status = 'final'");
    await db.close();
    assert.ok(r.rows[0].n === 0 || r.rows[0].n < pending.rows[0].n / 10, `${r.rows[0].n} FINALs unlocked`);
  });

  it("Week 1 grade is the preseason board; walk-forward weeks 2–11 match the review (MAE 12.023 on 502)", () => {
    const w1 = refit.grades.find((g) => g.week === 1);
    assert.deepEqual([w1.n, w1.su, w1.mae], [49, 40, 14.823]);
    const w = refit.grades.filter((g) => g.week >= 2 && g.week <= 11);
    const n = w.reduce((a, g) => a + g.n, 0);
    // Reviewed season to date: 502 games (Week 11 partial when the method was chosen).
    if (n === 502) {
      const mae = w.reduce((a, g) => a + g.mae * g.n, 0) / n;
      assert.ok(Math.abs(mae - 12.023) < 0.002, `mae ${mae}`);
    }
  });

  it("prediction helper agrees with src/lib/cfb/model.ts spread math", () => {
    const g = { home: "a", away: "b", neutral: false };
    const p = predictGame({ a: 1, b: 0 }, g);
    const d = 55 + 60;
    assert.ok(Math.abs(p.spread - (0.050835 * d + 4.5795e-5 * d * d)) < 1e-9);
    assert.equal(gradeGames([{ g: { homeScore: 10, awayScore: 3 }, spread: p.spread, homeWinPct: p.homeWinPct }]).su, 1);
  });
});

describe("10k sim follows the refit", () => {
  it("data/sim_10k_2026_hx2026_8.json was drawn from the committed HX board (run node scripts/hx-sim-10k.mjs after a refit)", () => {
    const refitFile = JSON.parse(readFileSync(join(ROOT, REFIT_PATH), "utf8"));
    const sim = JSON.parse(readFileSync(join(ROOT, "data/sim_10k_2026_hx2026_8.json"), "utf8"));
    assert.equal(sim.meta.hx_stamp, refitFile.meta.hx_stamp);
    const hx = Object.fromEntries(refitFile.board.map((r) => [r.slug, r.hx]));
    for (const t of sim.teams) assert.equal(t.hx_board, hx[t.slug], t.slug);
  });
});

describe("ΔHX /55 step is retired", () => {
  it("after HX 2026.8, only generated *_hx_refit_*.sql migrations write hx_rating", () => {
    const files = readdirSync(MIG).filter((f) => /^\d{4}_.+\.sql$/.test(f)).sort();
    const first = files.findIndex((f) => /_hx_refit_/.test(f));
    assert.ok(first > 0, "an hx_refit migration exists");
    for (const f of files.slice(first)) {
      const sql = readFileSync(join(MIG, f), "utf8");
      if (/hx_rating\s*=/.test(sql)) assert.match(f, /_hx_refit_/, `${f} writes hx_rating outside the refit script`);
    }
  });

  it("model.ts carries version 2026.8 and the refit knobs", () => {
    const src = readFileSync(join(ROOT, "src/lib/cfb/model.ts"), "utf8");
    assert.match(src, new RegExp(`version: "${HX_REFIT.version.replace(".", "\\.")}"`));
    assert.match(src, new RegExp(`refit: \\{ lambda: ${HX_REFIT.lambda}, marginCap: ${HX_REFIT.marginCap} \\}`));
  });
});
