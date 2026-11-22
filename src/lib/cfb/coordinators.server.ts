/** Server only: reads data/coordinators_2026.json and the /stats team board for 2026 to date. */
import coordRaw from "../../../data/coordinators_2026.json" with { type: "json" };
import statsRaw from "../../../data/stats_2026.json" with { type: "json" };
import type { CoordinatorsFile, Season2026, Unit } from "./coordinators.ts";

type TeamStat = { slug: string; epa?: number | null; oepa?: number | null; sr?: number | null; osr?: number | null; xpl?: number | null; oxpl?: number | null; adv_g?: number | null };
const file = coordRaw as unknown as CoordinatorsFile;
const stats = statsRaw as unknown as { meta: { as_of: string }; teams: TeamStat[] };

export const coordinatorsFile = (): CoordinatorsFile => file;

/** 2026-to-date unit numbers (same opponent-adjusted values as /stats), with FBS rank on adj EPA. */
export function season2026(slug: string, unit: Unit): Season2026 | null {
  const [ek, sk, xk] = unit === "off" ? (["epa", "sr", "xpl"] as const) : (["oepa", "osr", "oxpl"] as const);
  const pool = stats.teams.filter((t) => typeof t[ek] === "number");
  const t = pool.find((x) => x.slug === slug);
  if (!t) return null;
  const v = t[ek] as number;
  const better = pool.filter((x) => (unit === "off" ? (x[ek] as number) > v : (x[ek] as number) < v)).length;
  return { epa: v, sr: (t[sk] as number | null) ?? null, xpl: (t[xk] as number | null) ?? null, rank: better + 1, n: pool.length, games: t.adv_g ?? null };
}

export const stats2026AsOf = () => stats.meta.as_of;
