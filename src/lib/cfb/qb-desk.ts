/**
 * HASHMARK QB Desk (client-safe math and types; no data import).
 * One QB: last game, season before vs after it, rank moves among qualified QBs, a conference chart,
 * and game-by-game EPA. Data: data/qb_desk_2026.json (scripts/build-qb-desk-data.mjs) plus the /stats QB rows.
 */
import { deriveValues, isQualified, metricOf, standing, type Metric, type StatRow } from "./stats.ts";

export const P4_CONFS = new Set(["SEC", "Big Ten", "Big 12", "ACC"]);
export const G5_CONFS = new Set(["American", "Sun Belt", "MAC", "CUSA", "Mountain West", "Pac-12"]);

/** Metrics shown in the before/after and rank tables, in order. */
export const DESK_KEYS = ["epa", "tepa", "eff", "ypa", "aya", "cmp", "tdp", "intp"] as const;
export type DeskKey = (typeof DESK_KEYS)[number];
/** Metrics the conference chart can plot. */
export const CHART_KEYS = ["epa", "tepa", "eff", "ypa"] as const;

export type DeskGame = {
  gid: number;
  w: number;
  date: string;
  opp: string | null;
  opp_name: string;
  ha: "H" | "A" | "N";
  /** Listed home team (also on neutral sites). */
  home: boolean;
  pf: number;
  pa: number;
  c: number;
  a: number;
  y: number;
  td: number;
  i: number;
  car: number;
  ry: number;
  rtd: number;
  /** CFBD average EPA per play: all plays, passes, rushes. */
  ea: number | null;
  ep: number | null;
  er: number | null;
};
export type DeskFileQb = { key: string; name: string; slug: string; att_logs: number; prev: { epa: number | null; tepa: number | null } | null; games: DeskGame[] };
export type DeskFile = {
  meta: { as_of: string; before_as_of: string; advanced_through: string; before_advanced_through: string; game_source: string; season_source: string; matched: string; prev_epa: string };
  qbs: DeskFileQb[];
};

export type Stand = { rank: number; n: number } | null;
export type DeskPool = { label: string; n: number; ranks: Record<DeskKey, { before: Stand; after: Stand }> };
export type DeskLine = { g: number; att: number; cmp: number; yds: number; td: number; int: number; ruy: number };
export type DeskOption = { key: string; name: string; team: string; conference: string };
export type ConfBar = { key: string; name: string; team: string; slug: string; color: string; v: Record<string, number | null> };
export type DeskGameOut = DeskGame & { result: "W" | "L" | "T"; gameKey: string | null; oppShort: string };

export type QbDesk = {
  asOf: string;
  beforeAsOf: string;
  options: DeskOption[];
  qb: { key: string; name: string; slug: string; team: string; conference: string; color: string };
  last: DeskGameOut | null;
  /** Season line after (current) and before the last game (current minus the last game's box line). */
  line: { before: DeskLine | null; after: DeskLine };
  values: { before: Record<DeskKey, number | null> | null; after: Record<DeskKey, number | null> };
  /** Why EPA before the last game is blank, when it is. */
  epaBeforeNote: string | null;
  pools: DeskPool[];
  conf: { label: string; rows: ConfBar[] };
  games: DeskGameOut[];
};

export const deskMetric = (k: string): Metric => metricOf("qb", k)!;

/** Pools a QB is ranked in: own conference (if it has 4+ qualified QBs), P4 or G5, then FBS. */
export function poolsFor(conference: string): { label: string; test: (c: string) => boolean }[] {
  const out: { label: string; test: (c: string) => boolean }[] = [];
  if (conference && conference !== "Independent") out.push({ label: conference, test: (c) => c === conference });
  if (P4_CONFS.has(conference)) out.push({ label: "P4", test: (c) => P4_CONFS.has(c) });
  else if (G5_CONFS.has(conference)) out.push({ label: "G5", test: (c) => G5_CONFS.has(c) });
  out.push({ label: "FBS", test: () => true });
  return out;
}

const pickVals = (v: Record<string, number | null>) => Object.fromEntries(DESK_KEYS.map((k) => [k, v[k] ?? null])) as Record<DeskKey, number | null>;

/**
 * Builds the desk for one QB. `rows` are the /stats QB rows (current season, with team info);
 * `raw` is that QB's raw season row from data/stats_2026.json; `entry` its desk-file entry.
 * Ranks: the QB's before and after values against every other qualified QB in the pool at their
 * current numbers, so the move isolates what this one game did.
 */
export function buildDesk(args: {
  file: DeskFile;
  entry: DeskFileQb;
  row: StatRow;
  raw: { g: number; att: number; cmp: number; yds: number; td: number; int: number; ruy: number; epa: number | null; tepa: number | null };
  rows: StatRow[];
  keyOf: (r: StatRow) => string;
  teamShort: (slug: string | null, name: string) => string;
  gameKeyOf: (g: DeskGame, slug: string) => string | null;
}): QbDesk {
  const { file, entry, row, raw, rows, keyOf, teamShort, gameKeyOf } = args;
  const qualified = rows.filter((r) => isQualified("qb", r));
  const games: DeskGameOut[] = entry.games.map((g) => ({
    ...g,
    result: g.pf > g.pa ? "W" : g.pf < g.pa ? "L" : "T",
    gameKey: gameKeyOf(g, row.slug),
    oppShort: teamShort(g.opp, g.opp_name),
  }));
  const last = games.at(-1) ?? null;
  const cmpN = Math.round((raw.cmp * raw.att) / 100);
  const after: DeskLine = { g: raw.g, att: raw.att, cmp: cmpN, yds: raw.yds, td: raw.td, int: raw.int, ruy: raw.ruy };
  const before: DeskLine | null =
    last && raw.att - last.a > 0
      ? { g: raw.g - 1, att: raw.att - last.a, cmp: cmpN - last.c, yds: raw.yds - last.y, td: raw.td - last.td, int: raw.int - last.i, ruy: raw.ruy - last.ry }
      : null;
  const afterV = pickVals(row.v);
  const beforeV = before
    ? pickVals(
        deriveValues("qb", {
          ...before,
          cmp: (100 * before.cmp) / before.att,
          epa: entry.prev?.epa ?? null,
          tepa: entry.prev?.tepa ?? null,
        }),
      )
    : null;
  const epaBeforeNote = !before
    ? null
    : entry.prev
      ? null
      : `EPA before this game needs a stats build from just before it. Ours is from ${file.meta.before_as_of}, and this game was not the only one played after that, so the before EPA is left blank.`;

  const pools: DeskPool[] = poolsFor(row.conference).map((p) => {
    const others = qualified.filter((r) => r.id !== row.id && p.test(r.conference));
    const ranks = Object.fromEntries(
      DESK_KEYS.map((k) => {
        const mt = deskMetric(k);
        const vals = others.map((r) => r.v[k]);
        const s = (x: number | null): Stand => {
          const st = standing(mt, x, [...vals, x]);
          return st ? { rank: st.rank, n: st.n } : null;
        };
        return [k, { before: beforeV ? s(beforeV[k]) : null, after: s(afterV[k]) }];
      }),
    ) as DeskPool["ranks"];
    return { label: p.label, n: others.length + 1, ranks };
  });

  const confLabel = row.conference && row.conference !== "Independent" ? row.conference : "FBS independents";
  const confRows = qualified
    .filter((r) => r.conference === row.conference || r.id === row.id)
    .map((r) => ({ key: keyOf(r), name: r.name, team: r.team, slug: r.slug, color: r.color, v: Object.fromEntries(CHART_KEYS.map((k) => [k, r.v[k] ?? null])) }));

  return {
    asOf: file.meta.as_of,
    beforeAsOf: file.meta.before_as_of,
    options: qualified
      .map((r) => ({ key: keyOf(r), name: r.name, team: r.team, conference: r.conference }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    qb: { key: entry.key, name: row.name, slug: row.slug, team: row.team, conference: row.conference, color: row.color },
    last,
    line: { before, after },
    values: { before: beforeV, after: afterV },
    epaBeforeNote,
    pools,
    conf: { label: confLabel, rows: confRows },
    games,
  };
}
