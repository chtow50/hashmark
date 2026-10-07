-- Week 6 Tuesday FINAL. Research CLEAR pack
-- week6_finals_clear_2026-10-07 (as_of 2026-10-07 01:09 AM CT).
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Soft-cal FLAG stays. Marketing HOLD until LIVE CLEAR.
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0043/0048 kick and Vegas on the same card.

-- Southern Miss @ Troy — Troy 55, Southern Miss 34 (home is troy).
update games g
set status = 'final',
    home_score = 55,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and ((h.slug = 'troy' and a.slug = 'southern-miss')
    or (h.slug = 'southern-miss' and a.slug = 'troy'));

-- Source event 401871090. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
