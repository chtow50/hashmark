-- Week 7 late Saturday FINAL (Sunday Board + Tape ship, 2026-10-18 ~10:15 AM CT).
-- Source: ESPN scoreboard + ESPN game summary, both STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Nebraska @ Oregon was in progress at the 0062 nightly stamp. Week 7 is now 57/57 FINAL.
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0057 kick/TV/Vegas on the same card.

-- Nebraska @ Oregon — Oregon 17, Nebraska 14 (home is oregon).
update games g
set status = 'final',
    home_score = 17,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'oregon' and a.slug = 'nebraska';

-- Source event 401858492. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
