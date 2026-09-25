-- Week 4 Thursday FINAL. Website peer CLEAR vs ESPN STATUS_FINAL (Sep 24).
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Liberty @ Coastal Carolina — Coastal Carolina 17, Liberty 34 (home is coastal-carolina).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0031/0035 kick and Vegas on the same card.

update games g
set status = 'final',
    home_score = 17,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 4
  and ((h.slug = 'coastal-carolina' and a.slug = 'liberty')
    or (h.slug = 'liberty' and a.slug = 'coastal-carolina'));

-- Source event 401869941. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
