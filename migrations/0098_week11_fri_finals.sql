-- Week 11 Friday FINALs (Nightly FINAL Stamp, 2026-11-14 ~1:20 AM CT).
-- Source: ESPN scoreboard, STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0087 kick/TV/Vegas on the same card.

-- Florida State @ Pittsburgh — Florida State 16, Pittsburgh 10 (home is pittsburgh).
update games g
set status = 'final',
    home_score = 10,
    away_score = 16
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'pittsburgh' and a.slug = 'florida-state';

-- Source event 401858293. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Illinois @ UCLA — UCLA 22, Illinois 14 (home is ucla).
update games g
set status = 'final',
    home_score = 22,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'ucla' and a.slug = 'illinois';

-- Source event 401858526. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Houston @ Colorado — Colorado 42, Houston 32 (home is colorado).
update games g
set status = 'final',
    home_score = 42,
    away_score = 32
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'colorado' and a.slug = 'houston';

-- Source event 401856860. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
