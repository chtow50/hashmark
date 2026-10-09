-- Week 6 Kansas @ Utah Vegas CLEAR (single-game fill) from Research CLEAR pack
-- data/week6_vegas_ku_utah_clear_2026-10-09.json (as_of 2026-10-09 09:58 CT).
-- Was HOLD (Vegas) in 0048 (DraftKings O/U-only on Oct 5). Now ESPN DraftKings + CBS
-- match exactly: UTAH -15.5 / O/U 51.5. Kick + TV re-confirmed unchanged vs 0048.
-- Pack vegas_spread is home-perspective (negative = home favored).
-- SQL stores the board convention: positive = home favored.
-- No scores. No HX writes. Soft-cal FLAG stays. Iowa @ Washington TV stays HOLD.

-- Kansas @ Utah · Sat 2026-10-10 21:15 CT · ESPN · UTAH -15.5 / O/U 51.5 · CLEAR · NEW · ESPN 401856827
update games g
set
    kickoff_at = timestamptz '2026-10-10 21:15:00-05',
    kickoff_date = date '2026-10-10',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'utah' then 15.5 else -15.5 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'utah' and a.slug = 'kansas')
    or (h.slug = 'kansas' and a.slug = 'utah'))
  and g.week = 6;
