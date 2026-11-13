-- Week 11 Thursday FINALs (Nightly FINAL Stamp, 2026-11-13 ~1:20 AM CT).
-- Source: ESPN scoreboard, STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0087 kick/TV/Vegas on the same card.

-- Memphis @ USF — Memphis 52, USF 41 (home is usf).
update games g
set status = 'final',
    home_score = 41,
    away_score = 52
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'usf' and a.slug = 'memphis';

-- Source event 401862824. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Louisiana @ UL Monroe — Louisiana 42, UL Monroe 21 (home is ul-monroe).
update games g
set status = 'final',
    home_score = 21,
    away_score = 42
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'ul-monroe' and a.slug = 'louisiana';

-- Source event 401869969. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
