-- Week 6 late Saturday FINALs (Sunday Board + Tape ship, 2026-10-11 ~10:15 AM CT).
-- Source: ESPN scoreboard + ESPN game summary, both STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- These two were in progress at the 0055 nightly stamp. Week 6 is now 56/56 FINAL.
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0043/0048 kick and Vegas on the same card.

-- Hawaiʻi @ Arizona State — Arizona State 30, Hawaiʻi 12 (home is arizona-state).
update games g
set status = 'final',
    home_score = 30,
    away_score = 12
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'arizona-state' and a.slug = 'hawaii';

-- Source event 401856808. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Boise State @ Fresno State — Boise State 38, Fresno State 31 (road win) (home is fresno-state).
update games g
set status = 'final',
    home_score = 31,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'fresno-state' and a.slug = 'boise-state';

-- Source event 401860901. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
