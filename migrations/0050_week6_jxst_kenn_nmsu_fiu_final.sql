-- Week 6 Wednesday FINALs. Research CLEAR pack
-- week6_finals_clear_2026-10-08 (as_of 2026-10-08 01:07 AM CT).
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Soft-cal FLAG stays. Marketing HOLD until LIVE CLEAR.
-- 2 CLEAR / 0 HOLD. Southern Miss @ Troy already FINAL (0049); no restamp.
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0043/0048 kick and Vegas on the same card.

-- Jacksonville State @ Kennesaw State — Jacksonville State 27, Kennesaw State 26 (home is kennesaw-state).
update games g
set status = 'final',
    home_score = 26,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and ((h.slug = 'kennesaw-state' and a.slug = 'jacksonville-state')
    or (h.slug = 'jacksonville-state' and a.slug = 'kennesaw-state'));

-- Source event 401871051. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- New Mexico State @ FIU — FIU 22, New Mexico State 3 (home is fiu).
update games g
set status = 'final',
    home_score = 22,
    away_score = 3
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and ((h.slug = 'fiu' and a.slug = 'new-mexico-state')
    or (h.slug = 'new-mexico-state' and a.slug = 'fiu'));

-- Source event 401871066. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
