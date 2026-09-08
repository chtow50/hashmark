-- Week 1 Monday FINAL. Research CFB confirmed vs ESPN STATUS_FINAL (~00:01 CT Tue 2026-09-08).
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- SMU @ Florida State — SMU 27, Florida State 24 (home is florida-state)

update games g
set status = 'final',
    home_score = 24,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'florida-state' and a.slug = 'smu')
    or (h.slug = 'smu' and a.slug = 'florida-state'));
