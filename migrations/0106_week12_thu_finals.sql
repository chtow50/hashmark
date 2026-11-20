-- Week 12 Thursday FINAL (Nightly FINAL Stamp, 2026-11-20 ~1:30 AM CT).
-- Source: ESPN scoreboard + summary, STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0101 kick/TV/Vegas on the same card.

-- Rice @ Temple — Temple 27, Rice 31 (home is temple).
update games g
set status = 'final',
    home_score = 27,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'temple' and a.slug = 'rice';

-- Source event 401862830. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
