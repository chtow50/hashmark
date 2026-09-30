-- Week 5 Auburn @ Tennessee TV CLEAR — ESPN only.
-- Research CLEAR: data/week5_auburn_tennessee_tv_clear_2026-09-30.{md,json}
-- as_of 2026-09-30 ~15:20 CT. Closes the sole HOLD (TV) left by 0041.
-- TV field only. Kick 2:30 CT and Vegas TENN -7 / 54.5 already live from 0041 — do not restamp.
-- Soft-cal FLAG / all-D stays. No scores. No HX writes. No locks.
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0041 kick and Vegas on the same card.

update games g
set tv = 'ESPN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 5
  and ((h.slug = 'tennessee' and a.slug = 'auburn')
    or (h.slug = 'auburn' and a.slug = 'tennessee'));

-- Source event 401856710. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
