-- Week 13 Tuesday FINALs (Nightly FINAL Stamp, 2026-11-25 ~1:20 AM CT).
-- Source: ESPN scoreboard, STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0111 kick/TV/Vegas on the same card.

-- Kent State @ Eastern Michigan — Eastern Michigan 17, Kent State 12 (home is eastern-michigan).
update games g
set status = 'final',
    home_score = 17,
    away_score = 12
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 13
  and h.slug = 'eastern-michigan' and a.slug = 'kent-state';

-- Source event 401866470. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Miami (OH) @ Western Michigan — Western Michigan 24, Miami (OH) 28 (home is western-michigan).
update games g
set status = 'final',
    home_score = 24,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 13
  and h.slug = 'western-michigan' and a.slug = 'miami-oh';

-- Source event 401866471. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
