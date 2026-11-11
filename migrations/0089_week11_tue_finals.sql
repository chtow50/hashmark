-- Week 11 Tuesday FINALs (Nightly FINAL Stamp, 2026-11-11 ~1:20 AM CT).
-- Source: ESPN scoreboard, STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0087 kick/TV/Vegas on the same card.

-- Western Michigan @ Akron — Western Michigan 42, Akron 14 (home is akron).
update games g
set status = 'final',
    home_score = 14,
    away_score = 42
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'akron' and a.slug = 'western-michigan';

-- Source event 401866458. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Kent State @ Bowling Green — Bowling Green 33, Kent State 28 (home is bowling-green).
update games g
set status = 'final',
    home_score = 33,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'bowling-green' and a.slug = 'kent-state';

-- Source event 401866459. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Ohio @ Miami (OH) — Miami (OH) 34, Ohio 17 (home is miami-oh).
update games g
set status = 'final',
    home_score = 34,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'miami-oh' and a.slug = 'ohio';

-- Source event 401866460. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
