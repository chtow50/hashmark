/**
 * HX by week for one team, from the refit history in data/hx_refit_2026.json
 * (history.hx[slug][i] = HX entering history.weeks[i], refit on FINALs from earlier weeks;
 * Week 1 = the frozen preseason prior; the last entry is the live board). Nothing is
 * interpolated. Teams that joined the board late get points only from the week they joined.
 */
export type HxHistoryInput = { weeks: number[]; hx: Record<string, number[]> };

export type HxPoint = { week: number; hx: number; rank: number; of: number };

export type HxHistory = {
  points: HxPoint[];
  /** Board week the team joined (null = on the board since the preseason). */
  joinedWeek: number | null;
  peak: HxPoint | null;
  low: HxPoint | null;
};

/**
 * @param late slug → first board week for teams that joined the board in-season.
 * Ranks are among the teams on the board that week (late joiners don't count before they joined).
 */
export function teamHxHistory(
  h: HxHistoryInput,
  slug: string,
  late: Record<string, number> = {},
  /** Live board (full precision); its rank replaces the last point's so it matches the header, even on rounded ties. */
  live?: Record<string, { hx: number; rank: number }>,
): HxHistory | null {
  const series = h.hx[slug];
  if (!series || series.length !== h.weeks.length) return null;
  const joinedWeek = late[slug] ?? null;
  const points: HxPoint[] = [];
  h.weeks.forEach((week, i) => {
    if (joinedWeek != null && week < joinedWeek) return;
    const onBoard = Object.entries(h.hx).filter(([s]) => late[s] == null || week >= late[s]);
    const mine = series[i];
    const rank = 1 + onBoard.filter(([, v]) => v[i] > mine).length;
    points.push({ week, hx: mine, rank, of: onBoard.length });
  });
  if (!points.length) return null;
  const now = live?.[slug];
  if (now) points[points.length - 1] = { ...points[points.length - 1], rank: now.rank };
  const peak = points.reduce((a, b) => (b.hx > a.hx ? b : a));
  const low = points.reduce((a, b) => (b.hx < a.hx ? b : a));
  return { points, joinedWeek, peak, low };
}
