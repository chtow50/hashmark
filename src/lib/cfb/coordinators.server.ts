/** Server only: reads data/coordinators_2026.json, the /stats team board (2026 to date) and 247 talent. */
import coordRaw from "../../../data/coordinators_2026.json" with { type: "json" };
import statsRaw from "../../../data/stats_2026.json" with { type: "json" };
import talentRaw from "../../../data/talent_247_2026.json" with { type: "json" };
import type { CoachRecord, CoordinatorsFile, HistoryRow, Live2026, Unit } from "./coordinators.ts";

type TeamStat = { slug: string; g?: number | null; ppg?: number | null; oppg?: number | null; epa?: number | null; oepa?: number | null; sr?: number | null; osr?: number | null; xpl?: number | null; oxpl?: number | null; adv_g?: number | null };
const file = coordRaw as unknown as CoordinatorsFile;
const stats = statsRaw as unknown as { meta: { as_of: string }; teams: TeamStat[] };
const talent = talentRaw as unknown as { years: Record<string, { slug: string; rank: number }[]> };

export const coordinatorsFile = (): CoordinatorsFile => file;
export const stats2026AsOf = () => stats.meta.as_of;

/** 2026-to-date unit numbers (same opponent-adjusted values as /stats) with FBS rank on adj EPA, keyed `unit|slug`. */
export function live2026(): Record<string, Live2026 | null> {
  const out: Record<string, Live2026 | null> = {};
  for (const unit of ["off", "def"] as Unit[]) {
    const [ek, sk, xk, pk] = unit === "off" ? (["epa", "sr", "xpl", "ppg"] as const) : (["oepa", "osr", "oxpl", "oppg"] as const);
    const pool = stats.teams.filter((t) => typeof t[ek] === "number");
    for (const t of stats.teams) {
      const v = t[ek];
      if (typeof v !== "number") { out[`${unit}|${t.slug}`] = null; continue; }
      const better = pool.filter((x) => (unit === "off" ? (x[ek] as number) > v : (x[ek] as number) < v)).length;
      out[`${unit}|${t.slug}`] = { epa: v, sr: (t[sk] as number | null) ?? null, xpl: (t[xk] as number | null) ?? null, ppg: (t[pk] as number | null) ?? null, games: t.adv_g ?? null, rank: better + 1, n: pool.length };
    }
  }
  return out;
}

/** 247 Team Talent Composite rank for 2026 (FBS), keyed by slug. */
export function talent2026(): Record<string, number> {
  return Object.fromEntries((talent.years["2026"] ?? []).map((t) => [t.slug, t.rank]));
}

/** Fill the 2026 history row's numbers from the live board (the file stores who/where, not the stats). */
export function withLive2026(f: CoordinatorsFile, live: Record<string, Live2026 | null>): CoachRecord[] {
  return f.coaches.map((c) => ({
    ...c,
    history: c.history.map((h): HistoryRow => {
      if (h.season !== 2026) return h;
      const l = live[`${c.unit}|${h.team}`];
      return { ...h, stats: l ? { epa: l.epa, sr: l.sr, xpl: l.xpl, ppg: l.ppg, rank: l.rank, nFbs: l.n, games: l.games } : null };
    }),
  }));
}
