-- Research CFB locked Week 0 consensus (spread / total). Idempotent if 0006
-- already ran with morning placeholders. NDSU / Sac State / EMU stay off the 136.

alter table games add column if not exists vegas_total double precision;

update games g
set vegas_spread = 8.5, vegas_total = 46.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'tcu' and a.slug = 'north-carolina';

update games g
set vegas_spread = 38.5, vegas_total = 61.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'usc' and a.slug = 'san-jose-state'
  and g.kickoff_date = date '2026-08-29';

update games g
set vegas_spread = 4, vegas_total = 51.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'virginia' and a.slug = 'nc-state'
  and g.kickoff_date = date '2026-08-29';

update games g
set vegas_spread = 4, vegas_total = 48.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'stanford' and a.slug = 'hawaii'
  and g.kickoff_date = date '2026-08-29';

update games g
set vegas_spread = 31.5, vegas_total = 53.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'florida-state' and a.slug = 'new-mexico-state'
  and g.kickoff_date = date '2026-08-29';

update games g
set vegas_spread = 4, vegas_total = 56.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'unlv' and a.slug = 'memphis';
