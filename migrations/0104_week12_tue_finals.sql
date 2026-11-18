-- Week 12 Tuesday FINALs (Nightly FINAL Stamp, 2026-11-18 ~1:30 AM CT).
-- Source: ESPN scoreboard + summary, STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0101 kick/TV/Vegas on the same card.

-- Eastern Michigan @ Western Michigan — Western Michigan 34, Eastern Michigan 27 (home is western-michigan).
update games g
set status = 'final',
    home_score = 34,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'western-michigan' and a.slug = 'eastern-michigan';

-- Source event 401866465. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Ball State @ Ohio — Ohio 35, Ball State 28 (home is ohio).
update games g
set status = 'final',
    home_score = 35,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'ohio' and a.slug = 'ball-state';

-- Source event 401866464. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Miami (OH) @ Kent State — Kent State 3, Miami (OH) 20 (home is kent-state).
update games g
set status = 'final',
    home_score = 3,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'kent-state' and a.slug = 'miami-oh';

-- Source event 401866466. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
