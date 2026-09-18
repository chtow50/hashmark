-- Week 3 Thursday FINAL. Research CLEAR vs ESPN STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Syracuse @ Pittsburgh — Pittsburgh 27, Syracuse 13 (home is pittsburgh)
-- Do not put ESPN event digits here: parseSqlStampsForWeek would overwrite 0029 kick/Vegas.

update games g
set status = 'final',
    home_score = 27,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 3
  and ((h.slug = 'pittsburgh' and a.slug = 'syracuse')
    or (h.slug = 'syracuse' and a.slug = 'pittsburgh'));
