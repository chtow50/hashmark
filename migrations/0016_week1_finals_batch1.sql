-- Week 1 FINAL batch 1. Research CFB confirmed vs NCAA.com (~3:50 CT Sun 2026-09-06).
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Still open (do not stamp): WSU@Washington, Louisville–Ole Miss, Wisconsin–ND, SMU@FSU.

-- Toledo @ Michigan State — MSU 30, Toledo 20
update games g
set status = 'final',
    home_score = 30,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'michigan-state' and a.slug = 'toledo')
    or (h.slug = 'toledo' and a.slug = 'michigan-state'));

-- Miami @ Stanford — Miami 45, Stanford 6
update games g
set status = 'final',
    home_score = 6,
    away_score = 45
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'stanford' and a.slug = 'miami')
    or (h.slug = 'miami' and a.slug = 'stanford'));

-- Clemson @ LSU — LSU 51, Clemson 10
update games g
set status = 'final',
    home_score = 51,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'lsu' and a.slug = 'clemson')
    or (h.slug = 'clemson' and a.slug = 'lsu'));

-- UCLA @ California — UCLA 45, Cal 24
update games g
set status = 'final',
    home_score = 24,
    away_score = 45
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 1
  and ((h.slug = 'california' and a.slug = 'ucla')
    or (h.slug = 'ucla' and a.slug = 'california'));
