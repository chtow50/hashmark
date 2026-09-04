-- Week 1 FINAL: UAB @ Illinois. Research CFB confirmed Illinois 42, UAB 23.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.

update games g
set status = 'final',
    home_score = 42,
    away_score = 23
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'illinois' and a.slug = 'uab')
    or (h.slug = 'uab' and a.slug = 'illinois'));
