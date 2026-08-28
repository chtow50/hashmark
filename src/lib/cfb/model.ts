import type { Prediction, TeamSummary } from "./types";

/**
 * HASHMARK Index — the user's validated preseason model (2026.2).
 * Weights from power_rankings.py DEFAULT_WEIGHTS, walk-forward Top 25
 * balanced ≈ 0.646. Talent and prior_rating carry the real signal.
 * Matchup math is the Elo mapping from matchup.py (70.8% SU, 2019–2025).
 * Spread is a quadratic on Elo gap, fit on 2019–2023 FBS MOV (holdout 2024–2025).
 */
export const MODEL = {
  name: "HX Rating",
  version: "2026.2",
  season: 2026,
  week: 0,
  weekLabel: "2026 Preseason",
  eloBase: 1500,
  eloScale: 55,
  homeFieldElo: 60,
  eloDenom: 400,
  /** Previous linear spread map (kept for display). */
  pointsPerElo: 0.0534,
  /** Quadratic MOV map: spread = a·d + b·d·|d| */
  spreadA: 0.050835,
  spreadB: 4.5795e-5,
  weights: {
    talent: 1.5,
    prior: 1.5,
    trend: 1.0,
    retention: 0.5,
    portal: 0.5,
  },
} as const;

export function toElo(composite: number) {
  return MODEL.eloBase + MODEL.eloScale * composite;
}

/** Home-perspective spread (positive = home favored). Round separately. */
export function spreadFromDiff(d: number) {
  return MODEL.spreadA * d + MODEL.spreadB * d * Math.abs(d);
}

export function predictMatchup(
  home: Pick<TeamSummary, "hxRating" | "offenseRating" | "defenseRating">,
  away: Pick<TeamSummary, "hxRating" | "offenseRating" | "defenseRating">,
  opts?: { neutral?: boolean },
): Prediction {
  const h = toElo(home.hxRating);
  const a = toElo(away.hxRating);
  const hfa = opts?.neutral ? 0 : MODEL.homeFieldElo;
  const diff = h - a + hfa;
  const homeWinPct = 1 / (1 + 10 ** (-diff / MODEL.eloDenom));
  const spread = spreadFromDiff(diff);
  const tempo =
    51.4 +
    (home.offenseRating + away.offenseRating - home.defenseRating - away.defenseRating) *
      0.12;
  const total = Math.max(38, Math.min(78, tempo));
  const homeScore = total / 2 + spread / 2;
  const awayScore = total / 2 - spread / 2;
  return {
    homeWinPct,
    awayWinPct: 1 - homeWinPct,
    spread: Math.round(spread * 10) / 10,
    total: Math.round(total * 10) / 10,
    homeScore: Math.max(6, Math.round(homeScore)),
    awayScore: Math.max(6, Math.round(awayScore)),
    edge: Math.round(diff * 10) / 10,
  };
}

export type FeatureShare = {
  talent: number;
  prior: number;
  trend: number;
  retention: number;
  portal: number;
};

/** Signed z-scores that actually enter the composite. */
export function modelShare(team: TeamSummary): FeatureShare {
  return {
    talent: team.zTalent,
    prior: team.zPrior,
    trend: team.zTrend,
    retention: team.zRetention,
    portal: team.zPortal,
  };
}

export function featureContribution(team: TeamSummary) {
  const w = MODEL.weights;
  return {
    talent: w.talent * team.zTalent,
    prior: w.prior * team.zPrior,
    trend: w.trend * team.zTrend,
    retention: w.retention * team.zRetention,
    portal: w.portal * team.zPortal,
  };
}
