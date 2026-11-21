-- Week 12 Friday FINALs (Nightly FINAL Stamp, 2026-11-21 ~1:15 AM CT).
-- Source: ESPN scoreboard, STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0101 kick/TV/Vegas on the same card.

-- Iowa State @ UCF — UCF 48, Iowa State 17 (home is ucf).
update games g
set status = 'final',
    home_score = 48,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'ucf' and a.slug = 'iowa-state';

-- Clemson @ Duke — Duke 10, Clemson 20 (home is duke).
update games g
set status = 'final',
    home_score = 10,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'duke' and a.slug = 'clemson';

-- Bowling Green @ Toledo — Toledo 19, Bowling Green 0 (home is toledo).
update games g
set status = 'final',
    home_score = 19,
    away_score = 0
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'toledo' and a.slug = 'bowling-green';

-- Oregon @ Michigan State — Michigan State 7, Oregon 45 (home is michigan-state).
update games g
set status = 'final',
    home_score = 7,
    away_score = 45
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'michigan-state' and a.slug = 'oregon';

-- UTEP @ Air Force — Air Force 52, UTEP 3 (home is air-force).
update games g
set status = 'final',
    home_score = 52,
    away_score = 3
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'air-force' and a.slug = 'utep';

-- New Mexico @ Wyoming — Wyoming 17, New Mexico 24 (home is wyoming).
update games g
set status = 'final',
    home_score = 17,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'wyoming' and a.slug = 'new-mexico';

-- Source events: 401856869, 401858303, 401866468, 401858529, 401864545, 401864542. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
