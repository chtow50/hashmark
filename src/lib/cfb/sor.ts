/**
 * Strength of Record (SOR) and strength of schedule (SOS), from current HX and the actual
 * schedule. Pure; the server function feeds it games, FCS stubs, and the board.
 *
 * - SOS (played / remaining): average current HX of FBS opponents. FCS opponents are counted
 *   but have no HX, so they sit outside the average.
 * - Benchmark: the current No. 25 team on the HX board.
 * - SOR = actual wins − the benchmark's expected wins on the same games at the same sites
 *   (Elo = 1500 + 55·HX, 60 home field, P = 1/(1+10^(−d/400))). FCS games use the season sim's
 *   fixed rule for the benchmark: 0.92 home, 0.88 away, 0.90 neutral.
 * Positive SOR = a better record than a typical top-25 team would have against that schedule.
 */
import { MODEL, toElo } from "./model.ts";

export type SorGame = {
  home: string;
  away: string;
  neutral: boolean;
  final: boolean;
  /** Winner slug for FINALs. */
  winner: string | null;
};
export type SorFcs = { team: string; site: "home" | "away" | "neutral"; final: boolean; won: boolean | null };

export type SorRow = {
  slug: string;
  w: number;
  l: number;
  /** Average HX of FBS opponents already played; null with none. */
  sosPlayed: number | null;
  sosRemaining: number | null;
  fbsPlayed: number;
  fbsRemaining: number;
  fcsPlayed: number;
  fcsRemaining: number;
  /** Benchmark (No. 25) expected wins on the played games. */
  benchW: number;
  sor: number;
  sorRank: number;
  sosPlayedRank: number | null;
  sosRemainingRank: number | null;
};

export const FCS_BENCH_P = { home: 0.92, away: 0.88, neutral: 0.9 } as const;

export function pWin(hxA: number, hxB: number, site: "home" | "away" | "neutral"): number {
  const hfa = site === "home" ? MODEL.homeFieldElo : site === "away" ? -MODEL.homeFieldElo : 0;
  const d = toElo(hxA) - toElo(hxB) + hfa;
  return 1 / (1 + 10 ** (-d / MODEL.eloDenom));
}

const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);

/** Rank 1 = highest value; ties share the best rank; nulls get null. */
function rankDesc(rows: SorRow[], get: (r: SorRow) => number | null): Map<string, number> {
  const vals = rows.map((r) => [r.slug, get(r)] as const).filter((x): x is readonly [string, number] => x[1] != null);
  const out = new Map<string, number>();
  for (const [slug, v] of vals) out.set(slug, 1 + vals.filter(([, x]) => x > v + 1e-9).length);
  return out;
}

export function computeSor(hx: Record<string, number>, games: SorGame[], fcs: SorFcs[], benchHx: number): SorRow[] {
  const acc = new Map<string, { w: number; l: number; opp: number[]; rem: number[]; bench: number; fcsP: number; fcsR: number }>();
  const get = (s: string) => {
    let a = acc.get(s);
    if (!a) acc.set(s, (a = { w: 0, l: 0, opp: [], rem: [], bench: 0, fcsP: 0, fcsR: 0 }));
    return a;
  };
  for (const s of Object.keys(hx)) get(s);
  for (const g of games) {
    if (hx[g.home] == null || hx[g.away] == null) continue;
    for (const [me, opp, site] of [
      [g.home, g.away, g.neutral ? "neutral" : "home"],
      [g.away, g.home, g.neutral ? "neutral" : "away"],
    ] as const) {
      const a = get(me);
      if (g.final && g.winner) {
        if (g.winner === me) a.w++;
        else a.l++;
        a.opp.push(hx[opp]);
        a.bench += pWin(benchHx, hx[opp], site);
      } else if (!g.final) {
        a.rem.push(hx[opp]);
      }
    }
  }
  for (const f of fcs) {
    if (hx[f.team] == null) continue;
    const a = get(f.team);
    if (f.final && f.won != null) {
      if (f.won) a.w++;
      else a.l++;
      a.fcsP++;
      a.bench += FCS_BENCH_P[f.site];
    } else if (!f.final) a.fcsR++;
  }
  const rows: SorRow[] = [...acc.entries()].map(([slug, a]) => ({
    slug,
    w: a.w,
    l: a.l,
    sosPlayed: mean(a.opp),
    sosRemaining: mean(a.rem),
    fbsPlayed: a.opp.length,
    fbsRemaining: a.rem.length,
    fcsPlayed: a.fcsP,
    fcsRemaining: a.fcsR,
    benchW: a.bench,
    sor: a.w - a.bench,
    sorRank: 0,
    sosPlayedRank: null,
    sosRemainingRank: null,
  }));
  const sorR = rankDesc(rows, (r) => r.sor);
  const spR = rankDesc(rows, (r) => r.sosPlayed);
  const srR = rankDesc(rows, (r) => r.sosRemaining);
  for (const r of rows) {
    r.sorRank = sorR.get(r.slug)!;
    r.sosPlayedRank = spR.get(r.slug) ?? null;
    r.sosRemainingRank = srR.get(r.slug) ?? null;
  }
  return rows.sort((a, b) => a.sorRank - b.sorRank || a.slug.localeCompare(b.slug));
}
