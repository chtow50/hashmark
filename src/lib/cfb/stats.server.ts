/** Server only: reads data/stats_2026.json. Imported dynamically from server-function handlers. */
import statsRaw from "../../../data/stats_2026.json" with { type: "json" };
import { deriveValues, METRICS, TEAM_ADVANCED_KEYS, standing, unitEdges, type StatRow, type StatsMeta, type StatTab, type UnitEdge } from "./stats.ts";

type TeamInfo = { slug: string; name: string; conference: string; colorPrimary: string };
type RawFile = { meta: StatsMeta; teams: Record<string, unknown>[]; qb: Record<string, unknown>[]; rush: Record<string, unknown>[]; rec: Record<string, unknown>[]; def: Record<string, unknown>[] };
const data = statsRaw as unknown as RawFile;

export const statsMeta = (): StatsMeta => data.meta;

export function statRows(tab: StatTab, teams: TeamInfo[]): StatRow[] {
  const bySlug = new Map(teams.map((t) => [t.slug, t]));
  const teamGames = new Map(data.teams.map((t) => [String(t.slug), Number(t.g ?? 0)]));
  const volKey = tab === "rec" ? "rec" : tab === "qb" || tab === "rush" ? "att" : null;
  return data[tab].map((r, i) => {
    const slug = String(r.slug);
    const t = bySlug.get(slug);
    return {
      id: `${tab}-${i}`,
      name: tab === "teams" ? (t?.name ?? slug) : String(r.name),
      slug,
      team: t?.name ?? slug,
      conference: t?.conference ?? "",
      color: t?.colorPrimary ?? "#888888",
      pos: tab === "teams" ? "" : String(r.pos ?? ""),
      g: Number(r.g ?? 0),
      wl: tab === "teams" ? `${r.w}–${r.l}` : "",
      ...(volKey ? { vol: Number(r[volKey] ?? 0), teamG: teamGames.get(slug) ?? 0 } : {}),
      v: deriveValues(tab, r),
    };
  });
}

export type TeamAdvanced = {
  meta: StatsMeta;
  rows: { k: string; value: number | null; rank: number | null; n: number }[];
  games: number | null;
} | null;

export function teamAdvanced(slug: string): TeamAdvanced {
  const row = data.teams.find((t) => t.slug === slug);
  if (!row) return null;
  const all = data.teams.map((t) => deriveValues("teams", t));
  const mine = deriveValues("teams", row);
  return {
    meta: data.meta,
    games: typeof row.adv_g === "number" ? row.adv_g : null,
    rows: TEAM_ADVANCED_KEYS.map((k) => {
      const mt = METRICS.teams.find((x) => x.k === k)!;
      const s = standing(mt, mine[k], all.map((v) => v[k]));
      return { k, value: mine[k], rank: s?.rank ?? null, n: s?.n ?? 0 };
    }),
  };
}

export type MatchupEdges = {
  asOf: string;
  advancedThrough: string;
  /** Home offense vs away defense, and away offense vs home defense. */
  homeOff: UnitEdge[];
  awayOff: UnitEdge[];
} | null;

export function matchupEdges(home: string, away: string): MatchupEdges {
  const h = data.teams.find((t) => t.slug === home);
  const a = data.teams.find((t) => t.slug === away);
  if (!h || !a) return null;
  const all = data.teams.map((t) => deriveValues("teams", t));
  const hv = deriveValues("teams", h);
  const av = deriveValues("teams", a);
  return { asOf: data.meta.as_of, advancedThrough: data.meta.advanced_through, homeOff: unitEdges(hv, av, all), awayOff: unitEdges(av, hv, all) };
}
