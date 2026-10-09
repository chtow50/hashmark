-- Week 6 Thursday FINALs. Research CLEAR pack
-- week6_finals_clear_2026-10-09 (as_of 2026-10-09 01:13 AM CT).
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Soft-cal FLAG stays. Marketing HOLD until LIVE CLEAR.
-- 4 CLEAR / 0 HOLD / 0 OT. Southern Miss @ Troy (0049), Jacksonville State @
-- Kennesaw State and New Mexico State @ FIU (0050) already FINAL; no restamp.
-- Exact home/away orientation only (no reversed-order match), per Research nit on 0049/0050.
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0043/0048 kick and Vegas on the same card.

-- Sam Houston @ Liberty — Liberty 35, Sam Houston 3 (home is liberty).
update games g
set status = 'final',
    home_score = 35,
    away_score = 3
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'liberty' and a.slug = 'sam-houston';

-- Source event 401870766. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Missouri State @ Western Kentucky — Western Kentucky 34, Missouri State 13 (home is western-kentucky).
update games g
set status = 'final',
    home_score = 34,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'western-kentucky' and a.slug = 'missouri-state';

-- Source event 401871052. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- South Florida @ UTSA — UTSA 31, South Florida 24 (home is utsa).
update games g
set status = 'final',
    home_score = 31,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'utsa' and a.slug = 'usf';

-- Source event 401862794. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- South Alabama @ Arkansas State — South Alabama 56, Arkansas State 49 (road win) (home is arkansas-state).
update games g
set status = 'final',
    home_score = 49,
    away_score = 56
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'arkansas-state' and a.slug = 'south-alabama';

-- Source event 401869933. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
