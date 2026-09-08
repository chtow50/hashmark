-- Re-assert Week 0 FBS FINALs (Research CFB vs ESPN overall).
-- Same six as 0008_week0_finals.sql — idempotent if that already landed.
-- Scores: columns are home_score / away_score.

-- TCU 10, UNC 15 (away UNC win)
update games g
set status = 'final', home_score = 10, away_score = 15
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'tcu' and a.slug = 'north-carolina';

-- USC 42, San José State 26
update games g
set status = 'final', home_score = 42, away_score = 26
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'usc' and a.slug = 'san-jose-state'
  and g.kickoff_date = date '2026-08-29';

-- Virginia 34, NC State 8
update games g
set status = 'final', home_score = 34, away_score = 8
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'virginia' and a.slug = 'nc-state'
  and g.kickoff_date = date '2026-08-29';

-- Stanford 37, Hawaiʻi 27
update games g
set status = 'final', home_score = 37, away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'stanford' and a.slug = 'hawaii'
  and g.kickoff_date = date '2026-08-29';

-- Florida State 34, New Mexico State 17
update games g
set status = 'final', home_score = 34, away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'florida-state' and a.slug = 'new-mexico-state'
  and g.kickoff_date = date '2026-08-29';

-- UNLV 21, Memphis 27 (away Memphis win)
update games g
set status = 'final', home_score = 21, away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'unlv' and a.slug = 'memphis';
