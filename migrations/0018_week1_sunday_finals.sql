-- Week 1 Sunday FINALs. Research CFB confirmed vs NCAA + ESPN FINAL (~11:24 CT Sun 2026-09-06).
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- HOLD: SMU @ Florida State (Mon 6:30 CT ESPN).

-- Washington State @ Washington — Washington 24, WSU 10
update games g
set status = 'final',
    home_score = 24,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'washington' and a.slug = 'washington-state')
    or (h.slug = 'washington-state' and a.slug = 'washington'));

-- Louisville vs Ole Miss (Neutral) — Ole Miss 41, Louisville 38
-- Live home is ole-miss
update games g
set status = 'final',
    home_score = 41,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'ole-miss' and a.slug = 'louisville')
    or (h.slug = 'louisville' and a.slug = 'ole-miss'));

-- Wisconsin vs Notre Dame — Notre Dame 41, Wisconsin 13
-- Live home is notre-dame
update games g
set status = 'final',
    home_score = 41,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'notre-dame' and a.slug = 'wisconsin')
    or (h.slug = 'wisconsin' and a.slug = 'notre-dame'));
