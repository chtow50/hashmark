-- Week 7 Wednesday FINALs (Nightly FINAL Stamp, 2026-10-15 ~1:22 AM CT).
-- Source: ESPN game pages (STATUS_FINAL) + official athletics / AP.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0057 kick/TV/Vegas on the same card.

-- Kennesaw State @ Missouri State — Missouri State 24, Kennesaw State 21 (home is missouri-state).
update games g
set status = 'final',
    home_score = 24,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'missouri-state' and a.slug = 'kennesaw-state';

-- Source event 401871054. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Western Kentucky @ Sam Houston — Western Kentucky 16, Sam Houston 3 (home is sam-houston).
update games g
set status = 'final',
    home_score = 3,
    away_score = 16
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'sam-houston' and a.slug = 'western-kentucky';

-- Source event 401871068. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
