-- Week 6 Friday FINALs (nightly stamp, 2026-10-10 01:15 AM CT).
-- Source: ESPN game pages / scoreboard, all STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0043/0048 kick and Vegas on the same card.

-- Florida State @ Louisville — Louisville 44, Florida State 20 (home is louisville).
update games g
set status = 'final',
    home_score = 44,
    away_score = 20
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'louisville' and a.slug = 'florida-state';

-- Source event 401858254. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Washington State @ Utah State — Utah State 17, Washington State 16 (home is utah-state).
update games g
set status = 'final',
    home_score = 17,
    away_score = 16
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'utah-state' and a.slug = 'washington-state';

-- Source event 401860922. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Wyoming @ San José State — Wyoming 16, San José State 13 (OT, road win) (home is san-jose-state).
update games g
set status = 'final',
    home_score = 13,
    away_score = 16
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'san-jose-state' and a.slug = 'wyoming';

-- Source event 401864519. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Iowa @ Washington — Iowa 41, Washington 24 (road win) (home is washington).
update games g
set status = 'final',
    home_score = 24,
    away_score = 41
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'washington' and a.slug = 'iowa';

-- Source event 401858487. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Iowa State @ BYU — BYU 24, Iowa State 10 (home is byu).
update games g
set status = 'final',
    home_score = 24,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 6
  and h.slug = 'byu' and a.slug = 'iowa-state';

-- Source event 401856826. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
