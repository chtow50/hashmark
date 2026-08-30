-- Week 0 FINALs. Same six as the Sunday tape. NDSU / Sac State stay off the 136.
-- Scores: away listed first in copy; columns are home_score / away_score.

update games g
set status = 'final', home_score = 10, away_score = 15
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'tcu' and a.slug = 'north-carolina';

update games g
set status = 'final', home_score = 42, away_score = 26
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'usc' and a.slug = 'san-jose-state'
  and g.kickoff_date = date '2026-08-29';

update games g
set status = 'final', home_score = 34, away_score = 8
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'virginia' and a.slug = 'nc-state'
  and g.kickoff_date = date '2026-08-29';

update games g
set status = 'final', home_score = 37, away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'stanford' and a.slug = 'hawaii'
  and g.kickoff_date = date '2026-08-29';

update games g
set status = 'final', home_score = 34, away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'florida-state' and a.slug = 'new-mexico-state'
  and g.kickoff_date = date '2026-08-29';

update games g
set status = 'final', home_score = 21, away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'unlv' and a.slug = 'memphis';
