-- Week 2 early-window FINALs. Research CLEAR pack
-- data/week2_early_window_finals_clear_2026.json (as_of 2026-09-12 3:00 PM CT).
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Stamp clear[] FBS–FBS only. Do not stamp hold[] (Oregon @ Oklahoma State,
-- Western Kentucky @ Georgia still in progress).
-- Reassert Oklahoma @ Michigan (already on 0025) with the same 17–10.
-- Do not put ESPN event digits here: parseSqlStampsForWeek would overwrite 0024 kick/Vegas.

-- Rutgers @ Boston College — Boston College 28, Rutgers 21 (home is boston-college)
update games g
set status = 'final',
    home_score = 28,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'boston-college' and a.slug = 'rutgers')
    or (h.slug = 'rutgers' and a.slug = 'boston-college'));

-- Missouri @ Kansas — Missouri 38, Kansas 21 (home is kansas)
update games g
set status = 'final',
    home_score = 21,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'kansas' and a.slug = 'missouri')
    or (h.slug = 'missouri' and a.slug = 'kansas'));

-- Washington State @ Kansas State — Kansas State 34, Washington State 7 (home is kansas-state)
update games g
set status = 'final',
    home_score = 34,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'kansas-state' and a.slug = 'washington-state')
    or (h.slug = 'washington-state' and a.slug = 'kansas-state'));

-- Arizona State @ Texas A&M — Texas A&M 48, Arizona State 20 (home is texas-am)
update games g
set status = 'final',
    home_score = 48,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'texas-am' and a.slug = 'arizona-state')
    or (h.slug = 'arizona-state' and a.slug = 'texas-am'));

-- Oklahoma @ Michigan — Michigan 17, Oklahoma 10 (home is michigan; reassert 0025)
update games g
set status = 'final',
    home_score = 17,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'michigan' and a.slug = 'oklahoma')
    or (h.slug = 'oklahoma' and a.slug = 'michigan'));

-- Penn State @ Temple — Penn State 27, Temple 9 (home is temple)
update games g
set status = 'final',
    home_score = 9,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'temple' and a.slug = 'penn-state')
    or (h.slug = 'penn-state' and a.slug = 'temple'));

-- Old Dominion @ Virginia Tech — Virginia Tech 44, Old Dominion 21 (home is virginia-tech)
update games g
set status = 'final',
    home_score = 44,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'virginia-tech' and a.slug = 'old-dominion')
    or (h.slug = 'old-dominion' and a.slug = 'virginia-tech'));

-- Wake Forest @ Purdue — Wake Forest 38, Purdue 36 (home is purdue)
update games g
set status = 'final',
    home_score = 36,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'purdue' and a.slug = 'wake-forest')
    or (h.slug = 'wake-forest' and a.slug = 'purdue'));

-- South Florida @ Army — South Florida 28, Army 24 (home is army)
update games g
set status = 'final',
    home_score = 24,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'army' and a.slug = 'usf')
    or (h.slug = 'usf' and a.slug = 'army'));

-- App State @ East Carolina — App State 27, East Carolina 24 (home is east-carolina)
update games g
set status = 'final',
    home_score = 24,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 2
  and ((h.slug = 'east-carolina' and a.slug = 'app-state')
    or (h.slug = 'app-state' and a.slug = 'east-carolina'));
