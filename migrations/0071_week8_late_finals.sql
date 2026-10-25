-- Week 8 late FINAL (Sunday Board + Tape ship, 2026-10-25 ~10:15 AM CT).
-- Source: ESPN scoreboard (week 8) + ESPN game summary, STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Houston @ Utah was in progress at the 0070 nightly stamp. Week 8 is now 54/54 FINAL.
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0064 kick/TV/Vegas on the same card.

-- Houston @ Utah — Houston 13, Utah 21 (home is utah).
update games g
set status = 'final',
    home_score = 21,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 8
  and h.slug = 'utah' and a.slug = 'houston';

-- Source event 401856837. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
