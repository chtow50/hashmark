-- Week 8 Friday FINALs (Nightly FINAL Stamp, 2026-10-24 ~1:20 AM CT).
-- Source: ESPN scoreboard + ESPN game summary, all STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0064 kick/TV/Vegas on the same card.

-- Duke @ Virginia — Duke 19, Virginia 16 (home is virginia).
update games g
set status = 'final',
    home_score = 16,
    away_score = 19
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'virginia' and a.slug = 'duke';

-- Massachusetts @ UConn — Massachusetts 16, UConn 35 (home is uconn).
update games g
set status = 'final',
    home_score = 35,
    away_score = 16
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'uconn' and a.slug = 'massachusetts';

-- Army @ Tulsa — Army 38, Tulsa 35 (home is tulsa).
update games g
set status = 'final',
    home_score = 35,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'tulsa' and a.slug = 'army';

-- Air Force @ Wyoming — Air Force 14, Wyoming 28 (home is wyoming).
update games g
set status = 'final',
    home_score = 28,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'wyoming' and a.slug = 'air-force';

-- NC State @ Stanford — NC State 28, Stanford 31 (home is stanford).
update games g
set status = 'final',
    home_score = 31,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'stanford' and a.slug = 'nc-state';

-- Source events 401858271, 401861965, 401862808, 401864525, 401858272. Digits stay below the week predicates so the stamp gate keeps kick/Vegas.
