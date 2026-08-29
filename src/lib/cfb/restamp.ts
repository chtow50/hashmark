/** AMD in-game restamp. Same HX mean. Sigma from 2019–2023 FBS linescores (n=3458). */

export const RESTAMP_PERIODS = ["Q1", "half", "Q3", "FINAL"] as const;
export type RestampPeriod = (typeof RESTAMP_PERIODS)[number];

export const RESTAMP_SIGMA: Record<RestampPeriod, number> = {
  Q1: 15.335849462797231,
  half: 11.442739265399666,
  Q3: 7.966494691654868,
  FINAL: 0,
};

export const RESTAMP_TIME_LEFT: Record<RestampPeriod, number> = {
  Q1: 45,
  half: 30,
  Q3: 15,
  FINAL: 0,
};

export type RestampResult = {
  pHome: number;
  restampedSpread: number;
  sigma: number;
  period: RestampPeriod;
};

function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1 / (1 + p * ax);
  return sign * (1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax));
}

function phi(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

/** Home-perspective pregame spread already includes HFA (0 if Neutral). */
export function restamp(
  pregameSpread: number,
  homeScore: number,
  awayScore: number,
  period: RestampPeriod,
): RestampResult {
  const sigma = RESTAMP_SIGMA[period];
  const tLeft = RESTAMP_TIME_LEFT[period];
  const current = homeScore - awayScore;
  const restampedSpread = current + pregameSpread * (tLeft / 60);
  if (period === "FINAL" || sigma <= 0) {
    const pHome = restampedSpread > 0 ? 1 : restampedSpread < 0 ? 0 : 0.5;
    return { pHome, restampedSpread, sigma: 0, period };
  }
  return { pHome: phi(restampedSpread / sigma), restampedSpread, sigma, period };
}
