-- Week 13 Thursday FINALs (Nightly FINAL Stamp, 2026-11-27 ~1:20 AM CT).
-- Source: ESPN scoreboard and game summary, STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0111 kick/TV/Vegas on the same card.

-- TCU @ Texas Tech — Texas Tech 48, TCU 27 (home is texas-tech).
update games g
set status = 'final',
    home_score = 48,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 13
  and h.slug = 'texas-tech' and a.slug = 'tcu';

-- Source event 401856879. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
