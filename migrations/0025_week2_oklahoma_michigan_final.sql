-- Week 2 Saturday FINAL. Research CLEAR vs ESPN STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Oklahoma @ Michigan — Michigan 17, Oklahoma 10 (home is michigan)
-- Do not put ESPN event digits here: parseSqlStampsForWeek would overwrite 0024 kick/Vegas.

update games g
set status = 'final',
    home_score = 17,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'michigan' and a.slug = 'oklahoma')
    or (h.slug = 'oklahoma' and a.slug = 'michigan'));
