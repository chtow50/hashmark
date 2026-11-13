#!/usr/bin/env node
/**
 * HASHMARK 10k season / CFP Make 12 draws from the current HX board (HX 2026.8+).
 * Node port of the offline AMD runner (sim_10k_2026.py, HX 2026.7) with the same rules:
 *
 *   Elo = 1500 + 55·HX · HFA 60 (0 neutral) · P = 1/(1+10^(-d/400)) · Bernoulli draws
 *   FCS (unrated) opponents: P(FBS wins) = 0.92 home / 0.88 away / 0.90 neutral
 *   Synthetic neutral CCGs (top-2 by conference record) for P4 + American/CUSA/MAC/MW/Sun Belt;
 *   Pac-12 (2 teams) crown by record / H2H. Army–Navy (week 15) counts after CCGs.
 *   Committee proxy = wins, then HX, then fewer losses. AQ: P4 champs, highest-ranked G6,
 *   Notre Dame if proxy top 12. Seeds 1–4 bye; 5v12..8v9 at higher seed; QF/SF/NG neutral.
 *
 * make_field and win_title are separate numbers. win_title lives only in the full file
 * (server / pack tooling); the client reads the generated free export (no win_title).
 *
 *   node scripts/hx-sim-10k.mjs     # writes data/sim_10k_2026_hx2026_8.{json,md}
 *
 * Inputs (repo only, never invented): HX board data/hx_refit_2026.json; FBS–FBS slate and
 * FINALs replayed from migrations/; FBS–FCS FINALs from src/lib/cfb/fcs-stubs.ts; games not
 * in the 136-team games table yet (remaining FBS–FCS, Army–Navy) from the ESPN slate in
 * data/cfb.db.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { DatabaseSync } from "node:sqlite";
import { replayMigrations, ROOT } from "./replay-migrations.mjs";
import { HX_REFIT, toElo, winProb } from "./hx-refit-core.mjs";
import { FCS_STUB_GAMES } from "../src/lib/cfb/fcs-stubs.ts";

export const SIM_OUT_JSON = "data/sim_10k_2026_hx2026_8.json";
export const SIM_OUT_MD = "data/sim_10k_2026_hx2026_8.md";
export const N_SIMS = 10_000;
export const SEED = 20261112;
const FCS_P = { home: 0.92, away: 0.88, neutral: 0.9 };
const P4 = new Set(["SEC", "Big Ten", "Big 12", "ACC"]);
const G6 = new Set(["American", "CUSA", "MAC", "Mountain West", "Pac-12", "Sun Belt"]);
const CCG_CONFS = new Set([...P4, "American", "CUSA", "MAC", "Mountain West", "Sun Belt"]);

/** sfc32 — small deterministic PRNG. */
export function rng(seed) {
  let a = 0x9e3779b9, b = 0x243f6a88, c = 0xb7e15162, d = seed >>> 0;
  const next = () => {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
    const t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0;
    const r = (t + d) | 0;
    c = (c + r) | 0;
    return (r >>> 0) / 4294967296;
  };
  for (let i = 0; i < 20; i++) next();
  return next;
}

const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
const NAME_ALIASES = { hawaii: "hawaii", sanjosestate: "sanjosestate" };

export async function loadInputs() {
  const refit = JSON.parse(readFileSync(join(ROOT, "data/hx_refit_2026.json"), "utf8"));
  const hx = Object.fromEntries(refit.board.map((r) => [r.slug, r.hx]));
  const db = await replayMigrations();
  const teams = (await db.query("select slug, name, conference from teams order by slug")).rows;
  const games = (await db.query(`
    select g.id, g.week, h.slug as home, a.slug as away, g.neutral, g.status, g.home_score, g.away_score
    from games g join teams h on h.id = g.home_team_id join teams a on a.id = g.away_team_id
    order by g.week, g.id`)).rows;
  await db.close();

  const locked = [];
  const remaining = [];
  const seen = new Set();
  const listed = Object.fromEntries(teams.map((t) => [t.slug, 0]));
  for (const g of games) {
    seen.add(`${g.week}|${g.home}|${g.away}`);
    listed[g.home]++; listed[g.away]++;
    if (g.status === "final" && g.home_score != null && g.away_score != null) {
      locked.push({ home: g.home, away: g.away, winner: g.home_score > g.away_score ? g.home : g.away, week: g.week });
    } else {
      remaining.push({ home: g.home, away: g.away, neutral: g.neutral, week: g.week });
    }
  }
  const fcsSeen = new Set();
  for (const s of FCS_STUB_GAMES) {
    listed[s.teamSlug]++;
    fcsSeen.add(`${Math.max(1, s.week)}|${s.teamSlug}`); // ESPN slate files Week 0 under week 1
    if (s.status === "final" && s.homeScore != null && s.awayScore != null) {
      const fbsScore = s.home ? s.homeScore : s.awayScore;
      const oppScore = s.home ? s.awayScore : s.homeScore;
      locked.push({ fcs: s.teamSlug, won: fbsScore > oppScore, week: s.week });
    } else {
      remaining.push({ fcs: s.teamSlug, side: s.home ? "home" : "away", week: s.week, opp: s.opponentLabel });
    }
  }

  // ESPN slate fills games the 136-team table does not carry yet.
  const bySchool = new Map(teams.map((t) => [norm(t.name), t.slug]));
  const sq = new DatabaseSync(join(ROOT, "data/cfb.db"), { readOnly: true });
  const rows = sq.prepare(`
    select g.week, g.status, g.neutral_site, h.school as hs, a.school as aws
    from games g join teams h on h.id = g.home_team_id join teams a on a.id = g.away_team_id
    where g.season = 2026`).all();
  sq.close();
  const slugOf = (school) => bySchool.get(NAME_ALIASES[norm(school)] ?? norm(school)) ?? null;
  const extra = { fcs: [], fbs: [], unstubbed_past: [] };
  const maxLockedWeek = Math.max(...locked.map((g) => g.week));
  for (const r of rows) {
    const h = slugOf(r.hs);
    const a = slugOf(r.aws);
    if (!h && !a) continue;
    if (h && a) {
      if (seen.has(`${r.week}|${h}|${a}`) || seen.has(`${r.week}|${a}|${h}`)) continue;
      if (r.week <= 13) continue; // regular-season FBS–FBS truth is the games table
      remaining.push({ home: h, away: a, neutral: !!r.neutral_site, week: r.week });
      listed[h]++; listed[a]++;
      extra.fbs.push(`W${r.week} ${r.aws} @ ${r.hs}`);
      continue;
    }
    const fbs = h ?? a;
    if (fcsSeen.has(`${Math.max(1, r.week)}|${fbs}`)) continue;
    if (r.week < maxLockedWeek) { extra.unstubbed_past.push(`W${r.week} ${r.aws} @ ${r.hs}`); continue; }
    const side = r.neutral_site ? "neutral" : h ? "home" : "away";
    remaining.push({ fcs: fbs, side, week: r.week, opp: h ? r.aws : r.hs });
    listed[fbs]++;
    extra.fcs.push(`W${r.week} ${r.aws} @ ${r.hs}`);
  }
  return { refit, hx, teams, locked, remaining, listed, extra };
}

export function simulate({ hx, teams, locked, remaining }, { nSims = N_SIMS, seed = SEED } = {}) {
  const rand = rng(seed);
  const conf = Object.fromEntries(teams.map((t) => [t.slug, t.conference]));
  const slugs = teams.map((t) => t.slug);
  const byConf = {};
  for (const s of slugs) (byConf[conf[s]] ??= []).push(s);
  const pGame = (home, away, neutral) => winProb(toElo(hx[home]) - toElo(hx[away]) + (neutral ? 0 : HX_REFIT.homeFieldElo));
  const sameConf = (x, y) => conf[x] === conf[y] && conf[x] !== "Independent";

  const base = { w: {}, l: {}, cw: {}, cl: {} };
  for (const s of slugs) { base.w[s] = 0; base.l[s] = 0; base.cw[s] = 0; base.cl[s] = 0; }
  let pacH2hLocked = null;
  for (const g of locked) {
    if (g.fcs) { g.won ? base.w[g.fcs]++ : base.l[g.fcs]++; continue; }
    const loser = g.winner === g.home ? g.away : g.home;
    base.w[g.winner]++; base.l[loser]++;
    if (sameConf(g.home, g.away)) { base.cw[g.winner]++; base.cl[loser]++; }
    if (conf[g.home] === "Pac-12" && conf[g.away] === "Pac-12") pacH2hLocked = g.winner;
  }
  const regular = remaining.filter((g) => g.week < 15);
  const post = remaining.filter((g) => g.week >= 15);

  // ccg = reached the conference title game; scw/scl = simulated conference W/L (regular season).
  // These counters read the draws but never consume the RNG, so every other number is unchanged.
  const mf = {}, wt = {}, ct = {}, sw = {}, ccg = {}, scw = {}, scl = {};
  for (const s of slugs) { mf[s] = 0; wt[s] = 0; ct[s] = 0; sw[s] = 0; ccg[s] = 0; scw[s] = 0; scl[s] = 0; }

  const play = (rec, g) => {
    if (g.fcs) {
      const p = FCS_P[g.side];
      rand() < p ? rec.w[g.fcs]++ : rec.l[g.fcs]++;
      return null;
    }
    const winner = rand() < pGame(g.home, g.away, g.neutral) ? g.home : g.away;
    const loser = winner === g.home ? g.away : g.home;
    rec.w[winner]++; rec.l[loser]++;
    if (g.countConf && sameConf(g.home, g.away)) { rec.cw[winner]++; rec.cl[loser]++; }
    return winner;
  };

  for (let s = 0; s < nSims; s++) {
    const rec = { w: { ...base.w }, l: { ...base.l }, cw: { ...base.cw }, cl: { ...base.cl } };
    let pacH2h = pacH2hLocked;
    for (const g of regular) {
      const winner = play(rec, { ...g, countConf: true });
      if (winner && conf[g.home] === "Pac-12" && conf[g.away] === "Pac-12") pacH2h = winner;
    }
    const champ = {};
    for (const [c, members] of Object.entries(byConf)) {
      if (!CCG_CONFS.has(c) || members.length < 2) continue;
      const key = (t) => { const gp = rec.cw[t] + rec.cl[t]; return [gp ? rec.cw[t] / gp : -1, rec.cw[t], hx[t], rand()]; };
      const ranked = members.map((t) => [t, key(t)]).sort((x, y) => {
        for (let i = 0; i < 4; i++) if (x[1][i] !== y[1][i]) return y[1][i] - x[1][i];
        return 0;
      });
      const a = ranked[0][0], b = ranked[1][0];
      ccg[a]++; ccg[b]++;
      const winner = rand() < pGame(a, b, true) ? a : b;
      rec.w[winner]++; rec.l[winner === a ? b : a]++;
      champ[winner] = true;
    }
    const pac = byConf["Pac-12"] ?? [];
    if (pac.length === 2) {
      const [a, b] = pac;
      const pct = (t) => (rec.w[t] + rec.l[t] ? rec.w[t] / (rec.w[t] + rec.l[t]) : 0);
      if (rec.w[a] === rec.w[b] && rec.l[a] === rec.l[b] && pac.includes(pacH2h)) champ[pacH2h] = true;
      else {
        const ka = [pct(a), rec.w[a], hx[a]], kb = [pct(b), rec.w[b], hx[b]];
        let aWins = true;
        for (let i = 0; i < 3; i++) if (ka[i] !== kb[i]) { aWins = ka[i] > kb[i]; break; }
        champ[aWins ? a : b] = true;
      }
    }
    for (const t of slugs) { scw[t] += rec.cw[t]; scl[t] += rec.cl[t]; }
    for (const g of post) play(rec, { ...g, countConf: false });
    for (const t of slugs) { sw[t] += rec.w[t]; if (champ[t]) ct[t]++; }

    const ranked = [...slugs].sort((x, y) => rec.w[y] - rec.w[x] || hx[y] - hx[x] || rec.l[x] - rec.l[y]);
    const sel = new Set();
    for (const c of [...P4].sort()) { const p = ranked.find((t) => conf[t] === c && champ[t]); if (p) sel.add(p); }
    const g6 = ranked.find((t) => G6.has(conf[t]) && !sel.has(t)); if (g6) sel.add(g6);
    if (ranked.slice(0, 12).includes("notre-dame")) sel.add("notre-dame");
    for (const t of ranked) { if (sel.size >= 12) break; sel.add(t); }
    const seeded = ranked.filter((t) => sel.has(t)).slice(0, 12);
    for (const t of seeded) mf[t]++;
    const game = (h, a, neutral) => (rand() < pGame(h, a, neutral) ? h : a);
    const fr = {};
    for (const [hi, lo] of [[4, 11], [5, 10], [6, 9], [7, 8]]) fr[hi] = game(seeded[hi], seeded[lo], false);
    const qf = [[0, 7], [1, 6], [2, 5], [3, 4]].map(([bye, f]) => game(seeded[bye], fr[f], true));
    const champion = game(game(qf[0], qf[3], true), game(qf[1], qf[2], true), true);
    wt[champion]++;
  }
  const pct = (x) => Math.round((10000 * x) / nSims) / 100;
  const avg = (x) => Math.round((1000 * x) / nSims) / 1000;
  return Object.fromEntries(slugs.map((t) => [t, {
    make_field: pct(mf[t]), win_title: pct(wt[t]), conf_title: pct(ct[t]), proj_wins: avg(sw[t]),
    make_ccg: CCG_CONFS.has(conf[t]) ? pct(ccg[t]) : null,
    conf_w_now: base.cw[t], conf_l_now: base.cl[t], proj_conf_w: avg(scw[t]), proj_conf_l: avg(scl[t]),
  }]));
}

function chicagoYmd(d = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(d);
}

export async function main() {
  const t0 = Date.now();
  const inputs = await loadInputs();
  const out = simulate(inputs);
  const { refit, teams, locked, remaining, listed, extra } = inputs;
  const rows = teams.map((t) => ({
    name: t.name,
    slug: t.slug,
    conference: t.conference,
    hx_board: inputs.hx[t.slug],
    hx_matchup: inputs.hx[t.slug],
    ...out[t.slug],
    schedule_games_listed: listed[t.slug],
  })).sort((a, b) => b.make_field - a.make_field || b.win_title - a.win_title || a.name.localeCompare(b.name));
  const order = ["name", "slug", "conference", "hx_board", "hx_matchup", "make_field", "win_title", "proj_wins", "conf_title", "schedule_games_listed"];
  const teamsOut = rows.map((r) => Object.fromEntries(order.map((k) => [k, r[k]])));
  const payload = {
    meta: {
      n_sims: N_SIMS,
      seed: SEED,
      as_of: chicagoYmd(),
      as_of_tz: "America/Chicago",
      hx_stamp: refit.meta.hx_stamp,
      hx_policy: `${refit.meta.hx_stamp} live board (data/hx_refit_2026.json, ${refit.meta.n_finals} FINALs through Week ${refit.meta.through_week}); matchup = board`,
      engine: { elo: "1500+55*HX", hfa: 60, p: "1/(1+10^(-d/400))", draw: "Bernoulli", note: "CFP path is win/loss on P, not ATS" },
      fcs_stub: { rule: "Unrated FCS opponent: fixed P(FBS wins)=0.92 home, 0.88 away, 0.90 neutral", remaining_fcs_games: remaining.filter((g) => g.fcs).length },
      schedule: {
        locked_finals: locked.length,
        remaining_draws: remaining.length,
        extra_from_espn_slate: extra,
        under_12_listed: teamsOut.filter((t) => t.schedule_games_listed < 12).map((t) => ({ team: t.name, games_listed: t.schedule_games_listed })),
        note: "Opponents and scores are never invented; teams under 12 listed games keep the gap.",
      },
      cfp_2026_assumptions: {
        field_size: 12,
        aq: "P4 champions auto; highest-ranked G6 auto; Notre Dame auto if proxy top 12",
        ranking_proxy: "wins, then HX, then fewer losses — not the official committee",
        bracket: "Seeds 1-4 bye; 5v12, 6v11, 7v10, 8v9 at higher seed (HFA 60); QF/SF/NG neutral; no re-seed",
      },
      generator: "scripts/hx-sim-10k.mjs",
      runtime_sec: Math.round((Date.now() - t0) / 100) / 10,
    },
    teams: teamsOut,
  };
  writeFileSync(join(ROOT, SIM_OUT_JSON), `${JSON.stringify(payload, null, 2)}\n`);
  const tbl = (list, cols) => [
    `| # | Team | ${cols.join(" | ")} |`,
    `| --- | --- | ${cols.map(() => "---").join(" | ")} |`,
    ...list.map((r, i) => `| ${i + 1} | ${r.name} | ${cols.map((c) => (typeof r[c] === "number" ? r[c].toFixed(2) : r[c])).join(" | ")} |`),
  ].join("\n");
  const md = [
    `# HASHMARK 10k season / CFP slate — ${refit.meta.hx_stamp}`,
    "",
    `- n_sims ${N_SIMS} · seed ${SEED} · as_of ${payload.meta.as_of} America/Chicago`,
    `- Board: ${payload.meta.hx_policy}`,
    `- Locked FINALs ${locked.length} · remaining draws ${remaining.length} (FCS ${payload.meta.fcs_stub.remaining_fcs_games})`,
    "- make_field and win_title are separate numbers. win_title is not on free surfaces (free export drops it).",
    "",
    "## Top 15 make_field",
    "",
    tbl(rows.slice(0, 15), ["make_field", "win_title", "proj_wins", "conf_title"]),
    "",
    "## Top 15 win_title",
    "",
    tbl([...rows].sort((a, b) => b.win_title - a.win_title).slice(0, 15), ["win_title", "make_field", "proj_wins", "conf_title"]),
    "",
  ].join("\n");
  writeFileSync(join(ROOT, SIM_OUT_MD), md);
  console.log(`[hx-sim-10k] wrote ${SIM_OUT_JSON} · locked ${locked.length} · remaining ${remaining.length} · ${payload.meta.runtime_sec}s`);
  console.log("[hx-sim-10k] extra from ESPN slate:", JSON.stringify(extra));
  console.log("[hx-sim-10k] top make_field:", rows.slice(0, 12).map((r) => `${r.slug} ${r.make_field}`).join(", "));
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
