-- Week 8 Tuesday FINALs (Nightly FINAL Stamp, 2026-10-21 ~1:20 AM CT).
-- Source: ESPN scoreboard + ESPN game summary, both STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0064 kick/TV/Vegas on the same card.

-- Middle Tennessee @ FIU — Middle Tennessee 26, FIU 23 (home is fiu).
update games g
set status = 'final',
    home_score = 23,
    away_score = 26
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'fiu' and a.slug = 'middle-tennessee';

-- Source event 401871055. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Missouri State @ Delaware — Delaware 61, Missouri State 38 (home is delaware).
update games g
set status = 'final',
    home_score = 61,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'delaware' and a.slug = 'missouri-state';

-- Source event 401871069. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- South Alabama @ Marshall — Marshall 20, South Alabama 13 (home is marshall).
update games g
set status = 'final',
    home_score = 20,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'marshall' and a.slug = 'south-alabama';

-- Source event 401871092. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
