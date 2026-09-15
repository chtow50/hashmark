# Week 3 2026 FBS–FBS kick / TV / Vegas — HASHMARK stamp pack

- **Verified**: Research CLEAR 2026-09-14
- **Scope**: FBS–FBS only · Week 3 (Thu Sep 17 – Sat Sep 19 2026 CT)
- **Counts**: **56 games** · **56 Vegas** · **0 blank Vegas** · **54 TV CLEAR** · **2 TV HOLD**
- **JSON**: `data/week3_stamp_compact_2026.json`
- **SQL**: `migrations/0029_week3_kick_tv_vegas.sql`
- **Policy**: Do not invent kick / TV / Vegas. Stamp by `hashmark_id` + slugs + `week = 3`. No ESPN event IDs.

## Featured (Website card)

**Syracuse @ Pittsburgh** (`hashmark_id` 97)
- Kick: **Thu 2026-09-17 18:30 CT**
- TV: **ESPN**
- Vegas: **PITT -10.5** · O/U 51.5 (home-relative pack −10.5; board stores +10.5 = home favored)
- Site: Pittsburgh home — Acrisure Stadium

## TV HOLDs (kick + Vegas only; TV stays blank)

| id | Matchup | Kick CT | Vegas |
| --- | --- | --- | --- |
| 137 | Colorado @ Northwestern | Sat 2026-09-19 18:30 | NU -3.5 |
| 139 | Virginia Tech @ Maryland | Sat 2026-09-19 18:30 | VT -3 |

## Neutral

- Arizona State vs Kansas (`103`) — Wembley
- West Virginia vs Virginia (`141`) — Bank of America Stadium

## kickoffDate from kick_iso (America/Chicago)

Houston @ Texas Tech (`99`) is **Fri 2026-09-18 19:00 CT** (pack `kickoff_date` said 2026-09-19).
Eight late Saturday cards had stale 2026-09-20 date-only rows; stamp **Sat 2026-09-19** from `kick_iso`.
