-- Week 9 Saturday late FINALs (Nightly FINAL Stamp, 2026-11-01 ~1:20 AM CST).
-- Source: ESPN scoreboard + ESPN game summary, all STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- These three were in progress when 0078 shipped.
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0072 kick/TV/Vegas on the same card.

-- Texas State @ Boise State — Texas State 45, Boise State 46 (home is boise-state).
update games g
set status = 'final',
    home_score = 46,
    away_score = 45
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'boise-state' and a.slug = 'texas-state';

-- Source event 401860908. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Northern Illinois @ UNLV — Northern Illinois 24, UNLV 31 (home is unlv).
update games g
set status = 'final',
    home_score = 31,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'unlv' and a.slug = 'northern-illinois';

-- Source event 401864530. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Oregon State @ Fresno State — Oregon State 22, Fresno State 38 (home is fresno-state).
update games g
set status = 'final',
    home_score = 38,
    away_score = 22
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 9
  and h.slug = 'fresno-state' and a.slug = 'oregon-state';

-- Source event 401860924. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
