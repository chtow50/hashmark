-- Week 9 Tuesday FINALs (Nightly FINAL Stamp, 2026-10-28 ~1:15 AM CT).
-- Source: ESPN scoreboard + ESPN game summary, both STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0072 kick/TV/Vegas on the same card.

-- Delaware @ Western Kentucky — Delaware 35, Western Kentucky 21 (home is western-kentucky).
update games g
set status = 'final',
    home_score = 21,
    away_score = 35
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'western-kentucky' and a.slug = 'delaware';

-- Source event 401871071. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Sam Houston @ Missouri State — Missouri State 24, Sam Houston 3 (home is missouri-state).
update games g
set status = 'final',
    home_score = 24,
    away_score = 3
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'missouri-state' and a.slug = 'sam-houston';

-- Source event 401871072. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
