import { addDaysYmd } from "./chicago.ts";

/**
 * Regular-season cap. Same bound as `HASHMARK_MAX_WEEK` in queries.ts
 * (weeks 0–13). Kept here so the calendar stays importable in node tests
 * without pulling the server query module.
 */
export const SCHEDULE_MAX_WEEK = 13;

/**
 * Default schedule week for a Chicago civil date (YYYY-MM-DD).
 *
 * Early buckets stay fixed:
 *   Week 0 through 2026-08-30
 *   Week 1 through 2026-09-07
 *   Week 2 through 2026-09-12
 *   Week 3 through 2026-09-20 (Week 3 slate finished Sep 17–19)
 *   Week 4 through 2026-09-27 (Wed 2026-09-23 is Week 4)
 *
 * Later weeks end on successive Sundays (+7 from 2026-09-27) up to
 * SCHEDULE_MAX_WEEK. Dates after the last Sunday stay on that cap —
 * there is no permanent cap at week 3.
 */
export function defaultWeek(ymd: string, maxWeek = SCHEDULE_MAX_WEEK): number {
  if (ymd <= "2026-08-30") return 0;
  if (ymd <= "2026-09-07") return 1;
  if (ymd <= "2026-09-12") return 2;
  if (ymd <= "2026-09-20") return 3;
  if (ymd <= "2026-09-27") return Math.min(maxWeek, 4);

  let end = "2026-09-27";
  for (let week = 5; week <= maxWeek; week += 1) {
    end = addDaysYmd(end, 7);
    if (ymd <= end) return week;
  }
  return maxWeek;
}
