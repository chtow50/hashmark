#!/usr/bin/env node
/**
 * Builds data/qb_desk_2026.json for the HASHMARK QB Desk on /stats?tab=qb.
 *
 *   node scripts/build-qb-desk-data.mjs --cfbd <cfbd-data dir> --before <stats_2026.json snapshot>
 *
 * Inputs are files that were already pulled (no API calls, no key read here):
 *   - data/stats_2026.json: current season lines (official box from cfbstats, PPA from CFBD).
 *   - --before: an earlier stats_2026.json build (the season as it stood before the latest games).
 *   - <cfbd>/cache/games_players__seasonType-regular_week-N_year-2026.json: CFBD /games/players box lines.
 *   - <cfbd>/cache/ppa_players_games__position-QB_seasonType-regular_week-N_year-2026.json: CFBD
 *     /ppa/players/games, average EPA per play for each QB game.
 *   - <cfbd>/out/2026/{games,teams,players_season_qb_rb_wr_te}.json.
 * Deterministic. Every number is copied from a source file; nothing is estimated.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export const QB_DESK_PATH = "data/qb_desk_2026.json";
const ROOT = join(import.meta.dirname, "..");
const norm = (s) =>
  String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]/g, "");
const playerKey = (name) => norm(String(name).replace(/\b(jr|sr|ii|iii|iv|v)\.?$/i, ""));
const slugify = (s) =>
  String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const num = (s) => {
  const x = Number(s);
  return Number.isFinite(x) ? x : null;
};
/** Desk key for one QB: name + team slug, e.g. "marcel-reed-texas-am". */
export const deskKey = (name, slug) => `${slugify(name)}-${slug}`;

export function buildQbDesk({ stats, before, cfbdDir }) {
  const read = (...p) => JSON.parse(readFileSync(join(cfbdDir, ...p), "utf8"));
  const teams = read("out", "2026", "teams.json");
  const slugBySchool = new Map(teams.map((t) => [norm(t.school), t.slug]));
  const games = new Map(read("out", "2026", "games.json").filter((g) => g.completed).map((g) => [Number(g.id), g]));
  const players = read("out", "2026", "players_season_qb_rb_wr_te.json");
  const weeks = [...new Set([...games.values()].map((g) => g.week))].sort((a, b) => a - b);

  // Box lines and per-game EPA, keyed by CFBD/ESPN athlete id.
  const box = new Map(); // id -> [{gid, week, slug, ...}]
  const ppa = new Map(); // `${id}|${week}|${slug}` -> averagePPA
  for (const w of weeks) {
    const gp = join(cfbdDir, "cache", `games_players__seasonType-regular_week-${w}_year-2026.json`);
    const pp = join(cfbdDir, "cache", `ppa_players_games__position-QB_seasonType-regular_week-${w}_year-2026.json`);
    if (!existsSync(gp) || !existsSync(pp)) throw new Error(`missing CFBD week ${w} player files`);
    for (const g of JSON.parse(readFileSync(gp, "utf8"))) {
      const meta = games.get(Number(g.id));
      if (!meta) continue;
      for (const t of g.teams) {
        const slug = slugBySchool.get(norm(t.team));
        if (!slug) continue;
        const lines = new Map();
        const put = (id, name, k, v) => {
          if (!lines.has(id)) lines.set(id, { name });
          lines.get(id)[k] = v;
        };
        for (const c of t.categories) {
          if (c.name !== "passing" && c.name !== "rushing") continue;
          for (const ty of c.types) {
            for (const a of ty.athletes) {
              if (String(a.id).startsWith("-")) continue; // team rows
              if (c.name === "passing" && ty.name === "C/ATT") {
                const [cm, at] = String(a.stat).split("/").map(num);
                put(a.id, a.name, "c", cm);
                put(a.id, a.name, "a", at);
              } else if (c.name === "passing" && ty.name === "YDS") put(a.id, a.name, "y", num(a.stat));
              else if (c.name === "passing" && ty.name === "TD") put(a.id, a.name, "td", num(a.stat));
              else if (c.name === "passing" && ty.name === "INT") put(a.id, a.name, "i", num(a.stat));
              else if (c.name === "rushing" && ty.name === "CAR") put(a.id, a.name, "car", num(a.stat));
              else if (c.name === "rushing" && ty.name === "YDS") put(a.id, a.name, "ry", num(a.stat));
              else if (c.name === "rushing" && ty.name === "TD") put(a.id, a.name, "rtd", num(a.stat));
            }
          }
        }
        const home = meta.home === slug;
        const opp = home ? meta.away : meta.home;
        for (const [id, l] of lines) {
          (box.get(id) ?? box.set(id, []).get(id)).push({
            gid: Number(g.id),
            w: meta.week,
            date: meta.start,
            slug,
            opp: opp ?? null,
            opp_name: home ? meta.away_name : meta.home_name,
            ha: meta.neutral ? "N" : home ? "H" : "A",
            home,
            pf: home ? meta.home_pts : meta.away_pts,
            pa: home ? meta.away_pts : meta.home_pts,
            c: l.c ?? 0, a: l.a ?? 0, y: l.y ?? 0, td: l.td ?? 0, i: l.i ?? 0,
            car: l.car ?? 0, ry: l.ry ?? 0, rtd: l.rtd ?? 0,
          });
        }
      }
    }
    for (const p of JSON.parse(readFileSync(pp, "utf8"))) {
      const slug = slugBySchool.get(norm(p.team));
      if (slug) ppa.set(`${p.id}|${p.week}|${slug}`, p.averagePPA ?? {});
    }
  }

  // Same name match as build-stats-data.mjs: exact team + name, else unique same-team last name with volume within 15%.
  const byTeam = new Map();
  for (const p of players) if (p.pos === "QB" || p.passing_att > 0) (byTeam.get(p.team) ?? byTeam.set(p.team, []).get(p.team)).push(p);
  const lastName = (name) => playerKey(String(name).trim().split(/\s+/).filter((w) => !/^(jr|sr|ii|iii|iv|v)\.?$/i.test(w)).pop() ?? "");
  const findId = (name, slug, att) => {
    const list = byTeam.get(slug) ?? [];
    const exact = list.filter((p) => playerKey(p.name) === playerKey(name));
    if (exact.length) return exact.sort((a, b) => (b.passing_att ?? 0) - (a.passing_att ?? 0))[0].player_id;
    const c = list.filter((p) => lastName(p.name) === lastName(name) && att > 0 && Math.abs((p.passing_att ?? 0) - att) / att <= 0.15);
    return c.length === 1 ? c[0].player_id : null;
  };
  const beforeBy = new Map(before.qb.map((q) => [`${q.slug}|${playerKey(q.name)}`, q]));

  const qbs = [];
  const seen = new Set();
  const unmatched = [];
  const attOff = [];
  let prevCount = 0;
  for (const q of stats.qb) {
    const key = deskKey(q.name, q.slug);
    if (seen.has(key)) throw new Error(`duplicate desk key ${key}`);
    seen.add(key);
    const id = findId(q.name, q.slug, q.att);
    const log = id
      ? (box.get(String(id)) ?? [])
          .filter((g) => g.slug === q.slug && (g.a > 0 || g.car > 0))
          .sort((a, b) => a.date.localeCompare(b.date) || a.gid - b.gid)
          .map((g) => {
            const e = ppa.get(`${id}|${g.w}|${g.slug}`);
            return { ...g, ea: e?.all ?? null, ep: e?.pass ?? null, er: e?.rush ?? null };
          })
      : [];
    if (!id || !log.length) unmatched.push(`${q.name} (${q.slug})`);
    const attSum = log.reduce((s, g) => s + g.a, 0);
    if (log.length && Math.abs(attSum - q.att) > 3) attOff.push(`${q.name} (${q.slug}) box ${q.att} vs game logs ${attSum}`);
    // Season EPA before the last game comes from the earlier build, and only when that build is exactly
    // "everything but the last game": the last game kicked off after the earlier build's cutoff, it is the only
    // such game, and current box minus earlier box equals the last game's box line.
    const b = beforeBy.get(`${q.slug}|${playerKey(q.name)}`);
    const last = log.at(-1);
    const after = log.filter((g) => g.date > before.meta.advanced_through);
    const prevOk =
      b && last && after.length === 1 && after[0] === last &&
      q.att - b.att === last.a && q.yds - b.yds === last.y && q.td - b.td === last.td && q.int - b.int === last.i;
    if (prevOk) prevCount++;
    qbs.push({
      key, name: q.name, slug: q.slug, att_logs: attSum,
      prev: prevOk ? { epa: b.epa, tepa: b.tepa } : null,
      games: log.map(({ slug: _slug, ...g }) => g),
    });
  }
  return {
    meta: {
      as_of: stats.meta.as_of,
      before_as_of: before.meta.as_of,
      advanced_through: stats.meta.advanced_through,
      before_advanced_through: before.meta.advanced_through,
      game_source: "CollegeFootballData (CFBD) /games/players box lines and /ppa/players/games EPA per play",
      season_source: "data/stats_2026.json (cfbstats official box; CFBD player PPA)",
      matched: `${qbs.filter((q) => q.games.length).length}/${qbs.length}`,
      prev_epa: `${prevCount}/${qbs.length}`,
    },
    qbs,
    _report: { unmatched, attOff },
  };
}

function arg(name) {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : null;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const cfbdDir = arg("--cfbd");
  const beforePath = arg("--before");
  if (!cfbdDir || !beforePath) throw new Error("usage: --cfbd <cfbd-data dir> --before <stats_2026.json snapshot>");
  const stats = JSON.parse(readFileSync(join(ROOT, "data/stats_2026.json"), "utf8"));
  const before = JSON.parse(readFileSync(beforePath, "utf8"));
  const { _report, ...out } = buildQbDesk({ stats, before, cfbdDir });
  writeFileSync(join(ROOT, QB_DESK_PATH), `${JSON.stringify(out)}\n`);
  console.log(`[qb-desk] wrote ${QB_DESK_PATH} · as_of ${out.meta.as_of} · before ${out.meta.before_as_of} · matched ${out.meta.matched}`);
  if (_report.unmatched.length) console.log(`[qb-desk] no game log: ${_report.unmatched.join("; ")}`);
  if (_report.attOff.length) console.log(`[qb-desk] attempts differ by >3:\n  ${_report.attOff.join("\n  ")}`);
}
