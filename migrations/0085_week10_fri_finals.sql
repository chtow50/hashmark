-- Week 10 Friday FINALs (Nightly FINAL Stamp, 2026-11-07 ~1:20 AM CT).
-- Source: ESPN scoreboard + ESPN game summary, both STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0080 kick/TV/Vegas on the same card.

-- Virginia Tech @ SMU — SMU 51, Virginia Tech 28 (home is smu).
update games g
set status = 'final',
    home_score = 51,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'smu' and a.slug = 'virginia-tech';

-- Source event 401858288. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- USF @ East Carolina — East Carolina 20, USF 17 (home is east-carolina).
update games g
set status = 'final',
    home_score = 20,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'east-carolina' and a.slug = 'usf';

-- Source event 401862818. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Nebraska @ Illinois — Illinois 24, Nebraska 13 (home is illinois).
update games g
set status = 'final',
    home_score = 24,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'illinois' and a.slug = 'nebraska';

-- Source event 401858510. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- New Mexico @ Nevada — New Mexico 31, Nevada 3 (home is nevada).
update games g
set status = 'final',
    home_score = 3,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'nevada' and a.slug = 'new-mexico';

-- Source event 401864533. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- TCU @ Arizona — Arizona 29, TCU 28 (home is arizona).
update games g
set status = 'final',
    home_score = 29,
    away_score = 28
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 10
  and h.slug = 'arizona' and a.slug = 'tcu';

-- Source event 401856855. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
