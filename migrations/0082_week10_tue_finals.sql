-- Week 10 Tuesday FINALs (Nightly FINAL Stamp, 2026-11-04 ~1:25 AM CT).
-- Source: ESPN scoreboard + ESPN game summary, both STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0080 kick/TV/Vegas on the same card.

-- Ohio @ Akron — Ohio 28, Akron 20 (home is akron).
update games g
set status = 'final',
    home_score = 20,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'akron' and a.slug = 'ohio';

-- Source event 401866453. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Buffalo @ Miami (OH) — Buffalo 34, Miami (OH) 31 (home is miami-oh).
update games g
set status = 'final',
    home_score = 31,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'miami-oh' and a.slug = 'buffalo';

-- Source event 401866454. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
