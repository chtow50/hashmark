-- Week 7 Friday FINALs (Nightly FINAL Stamp, 2026-10-17 ~1:22 AM CT).
-- Source: ESPN game pages and scoreboard (STATUS_FINAL).
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0057 kick/TV/Vegas on the same card.

-- Memphis @ Tulane — Tulane 31, Memphis 17 (home is tulane).
update games g
set status = 'final',
    home_score = 31,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'tulane' and a.slug = 'memphis';

-- Source event 401862801. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Washington @ Purdue — Washington 38, Purdue 26 (road win) (home is purdue).
update games g
set status = 'final',
    home_score = 26,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'purdue' and a.slug = 'washington';

-- Source event 401858493. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- App State @ Coastal Carolina — App State 35, Coastal Carolina 32 (road win) (home is coastal-carolina).
update games g
set status = 'final',
    home_score = 32,
    away_score = 35
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'coastal-carolina' and a.slug = 'app-state';

-- Source event 401869844. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
