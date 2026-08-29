-- Schedule hub: kick times, Vegas (home-perspective + total), and final scores.
-- HASHMARK spreads stay computed from lock/current HX — never stored here.
-- Research CFB locked the Week 0 consensus. NDSU / Sac State / EMU stay off the 136.

alter table games add column if not exists kickoff_at timestamptz;
alter table games add column if not exists vegas_spread double precision;
alter table games add column if not exists vegas_total double precision;
alter table games add column if not exists home_score int;
alter table games add column if not exists away_score int;
alter table games add column if not exists status text not null default 'scheduled';

-- Dublin: TCU listed home, Neutral. Opened −6.5; consensus TCU −8.5 / 46.5.
update games g
set kickoff_at = timestamptz '2026-08-29 16:00:00+00',
    vegas_spread = 8.5,
    vegas_total = 46.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'tcu' and a.slug = 'north-carolina';

update games g
set kickoff_at = timestamptz '2026-08-29 19:00:00+00',
    vegas_spread = 38.5,
    vegas_total = 61.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'usc' and a.slug = 'san-jose-state'
  and g.kickoff_date = date '2026-08-29';

update games g
set kickoff_at = timestamptz '2026-08-29 19:30:00+00',
    vegas_spread = 4,
    vegas_total = 51.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'virginia' and a.slug = 'nc-state'
  and g.kickoff_date = date '2026-08-29';

update games g
set kickoff_at = timestamptz '2026-08-29 23:00:00+00',
    vegas_spread = 4,
    vegas_total = 48.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'stanford' and a.slug = 'hawaii'
  and g.kickoff_date = date '2026-08-29';

update games g
set kickoff_at = timestamptz '2026-08-29 23:00:00+00',
    vegas_spread = 31.5,
    vegas_total = 53.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'florida-state' and a.slug = 'new-mexico-state'
  and g.kickoff_date = date '2026-08-29';

-- 10:00 ET Saturday = 9:00 CT Saturday, still 8/29 in Chicago (seed date is 8/30).
-- Consensus UNLV −4 / 56.5; Research will refresh if it settles before 9 CT.
update games g
set kickoff_at = timestamptz '2026-08-30 02:00:00+00',
    vegas_spread = 4,
    vegas_total = 56.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'unlv' and a.slug = 'memphis';
