-- Week 10 Thursday FINALs (Nightly FINAL Stamp, 2026-11-06 ~1:22 AM CT).
-- Source: ESPN scoreboard + ESPN game summary, both STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0080 kick/TV/Vegas on the same card.

-- UTSA @ Florida Atlantic — Florida Atlantic 60, UTSA 29 (home is florida-atlantic).
update games g
set status = 'final',
    home_score = 60,
    away_score = 29
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'florida-atlantic' and a.slug = 'utsa';

-- Source event 401862817. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- James Madison @ Southern Miss — James Madison 54, Southern Miss 23 (home is southern-miss).
update games g
set status = 'final',
    home_score = 23,
    away_score = 54
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'southern-miss' and a.slug = 'james-madison';

-- Source event 401869964. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
