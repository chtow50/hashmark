-- Week 10 Wednesday FINALs (Nightly FINAL Stamp, 2026-11-05 ~1:20 AM CT).
-- Source: ESPN scoreboard + ESPN game summary, both STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0080 kick/TV/Vegas on the same card.

-- Ball State @ Massachusetts — Massachusetts 31, Ball State 30 (home is massachusetts).
update games g
set status = 'final',
    home_score = 31,
    away_score = 30
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'massachusetts' and a.slug = 'ball-state';

-- Source event 401866455. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Central Michigan vs Eastern Michigan (neutral, Ford Field) — Central Michigan 35, Eastern Michigan 7 (home is eastern-michigan).
update games g
set status = 'final',
    home_score = 7,
    away_score = 35
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'eastern-michigan' and a.slug = 'central-michigan';

-- Source event 401866456. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
