/**
 * HX 2026.8 in-season refit — pure math (no I/O). Shared by scripts/hx-refit.mjs,
 * scripts/hx-sim-10k.mjs and the tests.
 *
 * One rating only: HX keeps its Elo scale (1500 + 55·HX), home field 60 Elo
 * (0 neutral) and the quadratic spread map. The refit only changes HX values.
 *
 * Method (Bayesian blend / MAP ridge):
 *   minimize  Σ_games (f⁻¹(clip(margin, ±CAP)) − HFA − (E_home − E_away))²
 *           + λ · Σ_teams (E_i − E_i^pre)²
 * where E = 1500 + 55·HX, E^pre is the preseason HX board, f⁻¹ inverts the quadratic
 * spread map, and λ is the strength of the preseason prior in pseudo-games.
 * Inputs are stamped FBS–FBS FINALs only (FCS opponents are unrated).
 *
 * Chosen out of sample (review 2026-11-12, walk-forward weeks 2–11):
 *   λ = 2, cap = 28. MAE 12.10 vs 13.04 for the HX 2026.7 board as shipped.
 *
 * Replaces the old Sunday ΔHX = (ΔO+ΔD)/55 step (retired with HX 2026.8).
 */
export const HX_REFIT = Object.freeze({
  version: "2026.8",
  hxStamp: "HX 2026.8",
  lambda: 2,
  marginCap: 28,
  eloBase: 1500,
  eloScale: 55,
  homeFieldElo: 60,
  spreadA: 0.050835,
  spreadB: 4.5795e-5,
});

export const toElo = (hx) => HX_REFIT.eloBase + HX_REFIT.eloScale * hx;
export const fromElo = (elo) => (elo - HX_REFIT.eloBase) / HX_REFIT.eloScale;

/** Home-perspective spread from an Elo gap that already includes HFA. */
export function spreadFromDiff(d) {
  return HX_REFIT.spreadA * d + HX_REFIT.spreadB * d * Math.abs(d);
}

/** Inverse of spreadFromDiff: the Elo gap that predicts margin m. */
export function diffFromSpread(m) {
  const { spreadA: a, spreadB: b } = HX_REFIT;
  return (Math.sign(m) * (-a + Math.sqrt(a * a + 4 * b * Math.abs(m)))) / (2 * b);
}

export const winProb = (d) => 1 / (1 + 10 ** (-d / 400));

/** Gaussian elimination with partial pivoting (n ≈ 136, SPD system). */
export function solveLinear(M, b) {
  const n = b.length;
  const X = M.map((row, i) => [...row, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(X[r][c]) > Math.abs(X[p][c])) p = r;
    [X[c], X[p]] = [X[p], X[c]];
    for (let r = c + 1; r < n; r++) {
      const f = X[r][c] / X[c][c];
      if (f) for (let k = c; k <= n; k++) X[r][k] -= f * X[c][k];
    }
  }
  const x = new Array(n).fill(0);
  for (let r = n - 1; r >= 0; r--) {
    let s = X[r][n];
    for (let k = r + 1; k < n; k++) s -= X[r][k] * x[k];
    x[r] = s / X[r][r];
  }
  return x;
}

/**
 * @param prior  Record<slug, preseason HX>
 * @param games  [{home, away, neutral, homeScore, awayScore}] — FBS–FBS FINALs only
 * @returns Record<slug, HX> (unrounded)
 */
export function refitHx(prior, games, opts = {}) {
  const lambda = opts.lambda ?? HX_REFIT.lambda;
  const cap = opts.marginCap ?? HX_REFIT.marginCap;
  const slugs = Object.keys(prior).sort();
  const idx = new Map(slugs.map((s, i) => [s, i]));
  const n = slugs.length;
  const M = Array.from({ length: n }, () => new Array(n).fill(0));
  const b = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    M[i][i] += lambda;
    b[i] += lambda * toElo(prior[slugs[i]]);
  }
  for (const g of games) {
    const h = idx.get(g.home);
    const a = idx.get(g.away);
    if (h === undefined || a === undefined) throw new Error(`refitHx: unknown team in ${g.away} @ ${g.home}`);
    const margin = Math.max(-cap, Math.min(cap, g.homeScore - g.awayScore));
    const y = diffFromSpread(margin) - (g.neutral ? 0 : HX_REFIT.homeFieldElo);
    M[h][h] += 1;
    M[a][a] += 1;
    M[h][a] -= 1;
    M[a][h] -= 1;
    b[h] += y;
    b[a] -= y;
  }
  const E = solveLinear(M, b);
  return Object.fromEntries(slugs.map((s, i) => [s, fromElo(E[i])]));
}

/** Board rows sorted by HX desc, rank 1..n, HX rounded to 4 dp (the stamped value). */
export function rankBoard(hxBySlug) {
  return Object.entries(hxBySlug)
    .map(([slug, hx]) => ({ slug, hx: Math.round(hx * 1e4) / 1e4 }))
    .sort((x, y) => y.hx - x.hx || x.slug.localeCompare(y.slug))
    .map((r, i) => ({ ...r, rank: i + 1 }));
}

/** Predict one game from an HX map. */
export function predictGame(hx, g) {
  const d = toElo(hx[g.home]) - toElo(hx[g.away]) + (g.neutral ? 0 : HX_REFIT.homeFieldElo);
  return { spread: spreadFromDiff(d), homeWinPct: winProb(d) };
}

/** Grade predictions: SU (ties excluded from wins), MAE, Brier. */
export function gradeGames(rows) {
  let su = 0;
  let ae = 0;
  let br = 0;
  for (const { g, spread, homeWinPct } of rows) {
    const m = g.homeScore - g.awayScore;
    if (m !== 0 && Math.sign(spread) === Math.sign(m)) su++;
    ae += Math.abs(m - spread);
    br += ((m > 0 ? 1 : 0) - homeWinPct) ** 2;
  }
  const n = rows.length;
  const r3 = (x) => Math.round(x * 1000) / 1000;
  return { n, su, mae: n ? r3(ae / n) : null, brier: n ? r3(br / n) : null };
}

/**
 * Walk-forward history: the board entering each week W uses only FINALs from
 * weeks < W. Returns { weeks, hx: {slug: number[]}, grades: [{week, ...grade}] }.
 */
export function walkForward(prior, games, weeks, opts = {}) {
  const hx = Object.fromEntries(Object.keys(prior).map((s) => [s, []]));
  const grades = [];
  for (const w of weeks) {
    const board = refitHx(prior, games.filter((g) => g.week < w), opts);
    for (const s of Object.keys(hx)) hx[s].push(Math.round(board[s] * 1e3) / 1e3);
    const wk = games.filter((g) => g.week === w && !g.hxUnrated); // no pregame HX existed for unrated FINALs
    if (wk.length) grades.push({ week: w, ...gradeGames(wk.map((g) => ({ g, ...predictGame(board, g) }))) });
  }
  return { weeks, hx, grades };
}

/**
 * Pregame lock: FINALs keep the HX that was live at kickoff, so posted lines on past
 * games never move when HX is refit. Exact h/a slug + week match; only fills nulls.
 */
export function buildLockSql(locks) {
  if (!locks.length) return "-- No new FINALs to lock.\n";
  const values = locks
    .map((l) => `  (${l.week}::int, '${l.home}'::text, '${l.away}'::text, ${Number(l.homeHx).toFixed(4)}::double precision, ${Number(l.awayHx).toFixed(4)}::double precision)`)
    .join(",\n");
  return `-- Pregame HX lock for ${locks.length} FINAL(s): the board that was live when each game was stamped.
update games g
set lock_home_hx = v.home_hx,
    lock_away_hx = v.away_hx
from teams h, teams a,
(values
${values}
) as v(week, home, away, home_hx, away_hx)
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = v.home and a.slug = v.away and g.week = v.week
  and g.lock_home_hx is null and g.lock_away_hx is null;
`;
}

/** Idempotent rankings UPDATE in the same shape as the old O/D ship migrations. */
export function buildRefitSql(board, meta, locks = []) {
  const values = board
    .map((r) => `  ('${r.slug}'::text, ${r.hx.toFixed(4)}::double precision, ${r.rank}::int)`)
    .join(",\n");
  return `-- ${meta.hxStamp} in-season refit (Bayesian blend). Generated by scripts/hx-refit.mjs — do not hand-edit.
-- Prior: data/hx_preseason_prior_2026.json (preseason HX board, post-0005).
-- Data: ${meta.nFinals} stamped FBS–FBS FINALs through Week ${meta.throughWeek} (FCS opponents unrated, excluded).
-- lambda = ${meta.lambda} prior pseudo-games · margin cap ±${meta.marginCap} · HFA 60 Elo (0 neutral) · inverse quadratic spread map.
-- Replaces the retired ΔHX = (ΔO+ΔD)/55 step. O/D/ST display units are not touched.
-- Live board rows: rankings.season = 2026 AND rankings.week = 0. Exact slug match only. No TRUNCATE.
${buildLockSql(locks)}
update rankings r
set hx_rating = v.hx_rating,
    hx_rank = v.hx_rank
from teams t
join (values
${values}
) as v(slug, hx_rating, hx_rank) on v.slug = t.slug
where r.team_id = t.id and r.season = 2026 and r.week = 0;
`;
}
