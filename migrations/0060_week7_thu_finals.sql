-- Week 7 Thursday FINALs (Nightly FINAL Stamp, 2026-10-16 ~1:14 AM CT).
-- Source: ESPN game pages and scoreboard (STATUS_FINAL).
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0057 kick/TV/Vegas on the same card.

-- East Carolina @ UAB — UAB 30, East Carolina 17 (OT) (home is uab).
update games g
set status = 'final',
    home_score = 30,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'uab' and a.slug = 'east-carolina';

-- Source event 401862800. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Georgia Southern @ Old Dominion — Georgia Southern 23, Old Dominion 15 (road win) (home is old-dominion).
update games g
set status = 'final',
    home_score = 15,
    away_score = 23
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'old-dominion' and a.slug = 'georgia-southern';

-- Source event 401869950. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Colorado State @ Texas State — Texas State 66, Colorado State 27 (home is texas-state).
update games g
set status = 'final',
    home_score = 66,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'texas-state' and a.slug = 'colorado-state';

-- Source event 401860923. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
