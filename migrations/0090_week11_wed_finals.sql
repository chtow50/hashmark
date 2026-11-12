-- Week 11 Wednesday FINALs (Nightly FINAL Stamp, 2026-11-12 ~1:20 AM CT).
-- Source: ESPN scoreboard, STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Sacramento State @ Central Michigan is an FCS stub (src/lib/cfb/fcs-stubs.ts), not stamped here.
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0087 kick/TV/Vegas on the same card.

-- Buffalo @ Ball State — Buffalo 28, Ball State 7 (home is ball-state).
update games g
set status = 'final',
    home_score = 7,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'ball-state' and a.slug = 'buffalo';

-- Source event 401866461. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Massachusetts @ Toledo — Toledo 24, Massachusetts 0 (home is toledo).
update games g
set status = 'final',
    home_score = 24,
    away_score = 0
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 11
  and h.slug = 'toledo' and a.slug = 'massachusetts';

-- Source event 401866463. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
