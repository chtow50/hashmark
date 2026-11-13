-- 2026 FBS newcomers: North Dakota State (Mountain West) and Sacramento State (MAC).
-- Source: data/fbs_newcomers_2026.json (ESPN summary API scores/kick/TV/venue, CFBD cross-check; Week 2 Vegas from the AMD Week 2 FCS pack).
-- Their FBS–FBS games move from FCS stubs into games. FINALs played before they joined the board are hx_unrated:
-- no pregame HX existed, so no HX line is shown or graded for them. They do count in records and in the HX refit fit.
-- Prior: mean preseason HX of the 2025 newcomers Delaware and Missouri State (data/hx_preseason_prior_2026.json).
-- The next hx_refit migration sets their HX and rank. Idempotent.

alter table games add column if not exists hx_unrated boolean not null default false;
alter table rankings alter column offense_rating drop not null, alter column defense_rating drop not null,
  alter column special_rating drop not null, alter column sos_rating drop not null, alter column projected_wins drop not null,
  alter column returning_production drop not null, alter column playoff_odds drop not null, alter column prior_score drop not null,
  alter column talent_score drop not null;

insert into teams (id, slug, name, short_name, mascot, conference, city, state, color_primary, color_secondary, last_wins, last_losses, last_finish)
select (select max(id) + 1 from teams), 'north-dakota-state', 'North Dakota State', 'N Dakota St', 'Bison', 'Mountain West', 'Fargo', 'ND', '#01402a', '#ffffff', 12, 1, '8–0 MVFC (FCS)'
where not exists (select 1 from teams where slug = 'north-dakota-state');
insert into teams (id, slug, name, short_name, mascot, conference, city, state, color_primary, color_secondary, last_wins, last_losses, last_finish)
select (select max(id) + 1 from teams), 'sacramento-state', 'Sacramento State', 'Sacramento St', 'Hornets', 'MAC', 'Sacramento', 'CA', '#00573c', '#cdb97d', 7, 5, 'FCS Independent'
where not exists (select 1 from teams where slug = 'sacramento-state');
select setval(pg_get_serial_sequence('teams', 'id'), (select max(id) from teams));

insert into rankings (team_id, season, week, hx_rank, hx_rating)
select t.id, 2026, 0, 137, -2.691 from teams t
where t.slug = 'north-dakota-state'
  and not exists (select 1 from rankings r where r.team_id = t.id and r.season = 2026 and r.week = 0);
insert into rankings (team_id, season, week, hx_rank, hx_rating)
select t.id, 2026, 0, 138, -2.691 from teams t
where t.slug = 'sacramento-state'
  and not exists (select 1 from rankings r where r.team_id = t.id and r.season = 2026 and r.week = 0);

-- jacksonville-state @ north-dakota-state · ESPN 401864577 · FINAL 33–7
insert into games (week, kickoff_date, kickoff_at, home_team_id, away_team_id, neutral, location, tv, vegas_spread, status, home_score, away_score, hx_unrated)
select 1, date '2026-08-29', timestamptz '2026-08-29T21:30:00Z', h.id, a.id, false, 'Fargodome', 'CBSSN', null, 'final', 33, 7, true
from teams h, teams a
where h.slug = 'north-dakota-state' and a.slug = 'jacksonville-state'
  and not exists (select 1 from games x where x.home_team_id = h.id and x.away_team_id = a.id and x.week = 1);
-- sacramento-state @ eastern-michigan · ESPN 401866408 · FINAL 28–17
insert into games (week, kickoff_date, kickoff_at, home_team_id, away_team_id, neutral, location, tv, vegas_spread, status, home_score, away_score, hx_unrated)
select 1, date '2026-08-29', timestamptz '2026-08-29T22:30:00Z', h.id, a.id, false, 'Rynearson Stadium', 'ESPN+', null, 'final', 28, 17, true
from teams h, teams a
where h.slug = 'eastern-michigan' and a.slug = 'sacramento-state'
  and not exists (select 1 from games x where x.home_team_id = h.id and x.away_team_id = a.id and x.week = 1);
-- north-dakota-state @ air-force · ESPN 401864502 · FINAL 32–38
insert into games (week, kickoff_date, kickoff_at, home_team_id, away_team_id, neutral, location, tv, vegas_spread, status, home_score, away_score, hx_unrated)
select 2, date '2026-09-12', timestamptz '2026-09-13T02:00:00Z', h.id, a.id, false, 'Falcon Stadium', 'FS1', -1.5, 'final', 32, 38, true
from teams h, teams a
where h.slug = 'air-force' and a.slug = 'north-dakota-state'
  and not exists (select 1 from games x where x.home_team_id = h.id and x.away_team_id = a.id and x.week = 2);
-- sacramento-state @ fresno-state · ESPN 401860883 · FINAL 49–3
insert into games (week, kickoff_date, kickoff_at, home_team_id, away_team_id, neutral, location, tv, vegas_spread, status, home_score, away_score, hx_unrated)
select 2, date '2026-09-12', timestamptz '2026-09-13T02:30:00Z', h.id, a.id, false, 'Valley Children''s Stadium', 'CBSSN', 18.5, 'final', 49, 3, true
from teams h, teams a
where h.slug = 'fresno-state' and a.slug = 'sacramento-state'
  and not exists (select 1 from games x where x.home_team_id = h.id and x.away_team_id = a.id and x.week = 2);
-- north-dakota-state @ sacramento-state · ESPN 401864507 · FINAL 10–31
insert into games (week, kickoff_date, kickoff_at, home_team_id, away_team_id, neutral, location, tv, vegas_spread, status, home_score, away_score, hx_unrated)
select 3, date '2026-09-19', timestamptz '2026-09-20T02:30:00Z', h.id, a.id, false, 'Hornet Stadium', 'ESPN', null, 'final', 10, 31, true
from teams h, teams a
where h.slug = 'sacramento-state' and a.slug = 'north-dakota-state'
  and not exists (select 1 from games x where x.home_team_id = h.id and x.away_team_id = a.id and x.week = 3);
-- massachusetts @ sacramento-state · ESPN 401866429 · FINAL 6–35
insert into games (week, kickoff_date, kickoff_at, home_team_id, away_team_id, neutral, location, tv, vegas_spread, status, home_score, away_score, hx_unrated)
select 4, date '2026-09-26', timestamptz '2026-09-27T01:00:00Z', h.id, a.id, false, 'Hornet Stadium', 'ESPN+', null, 'final', 6, 35, true
from teams h, teams a
where h.slug = 'sacramento-state' and a.slug = 'massachusetts'
  and not exists (select 1 from games x where x.home_team_id = h.id and x.away_team_id = a.id and x.week = 4);
-- wyoming @ north-dakota-state · ESPN 401864515 · FINAL 28–0
insert into games (week, kickoff_date, kickoff_at, home_team_id, away_team_id, neutral, location, tv, vegas_spread, status, home_score, away_score, hx_unrated)
select 5, date '2026-10-03', timestamptz '2026-10-03T19:30:00Z', h.id, a.id, false, 'Fargodome', 'CW', null, 'final', 28, 0, true
from teams h, teams a
where h.slug = 'north-dakota-state' and a.slug = 'wyoming'
  and not exists (select 1 from games x where x.home_team_id = h.id and x.away_team_id = a.id and x.week = 5);
-- sacramento-state @ bowling-green · ESPN 401866436 · FINAL 38–10
insert into games (week, kickoff_date, kickoff_at, home_team_id, away_team_id, neutral, location, tv, vegas_spread, status, home_score, away_score, hx_unrated)
select 6, date '2026-10-10', timestamptz '2026-10-10T16:00:00Z', h.id, a.id, false, 'Doyt L. Perry Stadium', 'ESPN+', null, 'final', 38, 10, true
from teams h, teams a
where h.slug = 'bowling-green' and a.slug = 'sacramento-state'
  and not exists (select 1 from games x where x.home_team_id = h.id and x.away_team_id = a.id and x.week = 6);
-- north-dakota-state @ unlv · ESPN 401864518 · FINAL 13–7
insert into games (week, kickoff_date, kickoff_at, home_team_id, away_team_id, neutral, location, tv, vegas_spread, status, home_score, away_score, hx_unrated)
select 6, date '2026-10-10', timestamptz '2026-10-10T23:00:00Z', h.id, a.id, false, 'Allegiant Stadium', 'CW', null, 'final', 13, 7, true
from teams h, teams a
where h.slug = 'unlv' and a.slug = 'north-dakota-state'
  and not exists (select 1 from games x where x.home_team_id = h.id and x.away_team_id = a.id and x.week = 6);
-- nevada @ north-dakota-state · ESPN 401864520 · FINAL 31–17
insert into games (week, kickoff_date, kickoff_at, home_team_id, away_team_id, neutral, location, tv, vegas_spread, status, home_score, away_score, hx_unrated)
select 7, date '2026-10-17', timestamptz '2026-10-17T23:00:00Z', h.id, a.id, false, 'Fargodome', 'CBSSN', null, 'final', 31, 17, true
from teams h, teams a
where h.slug = 'north-dakota-state' and a.slug = 'nevada'
  and not exists (select 1 from games x where x.home_team_id = h.id and x.away_team_id = a.id and x.week = 7);
-- ohio @ sacramento-state · ESPN 401866445 · FINAL 7–48
insert into games (week, kickoff_date, kickoff_at, home_team_id, away_team_id, neutral, location, tv, vegas_spread, status, home_score, away_score, hx_unrated)
select 7, date '2026-10-17', timestamptz '2026-10-18T02:00:00Z', h.id, a.id, false, 'Hornet Stadium', 'ESPN+', null, 'final', 7, 48, true
from teams h, teams a
where h.slug = 'sacramento-state' and a.slug = 'ohio'
  and not exists (select 1 from games x where x.home_team_id = h.id and x.away_team_id = a.id and x.week = 7);
-- sacramento-state @ ball-state · ESPN 401866447 · FINAL 34–17
insert into games (week, kickoff_date, kickoff_at, home_team_id, away_team_id, neutral, location, tv, vegas_spread, status, home_score, away_score, hx_unrated)
select 8, date '2026-10-24', timestamptz '2026-10-24T19:30:00Z', h.id, a.id, false, 'Scheumann Stadium', 'ESPN+', null, 'final', 34, 17, true
from teams h, teams a
where h.slug = 'ball-state' and a.slug = 'sacramento-state'
  and not exists (select 1 from games x where x.home_team_id = h.id and x.away_team_id = a.id and x.week = 8);
-- north-dakota-state @ new-mexico · ESPN 401864527 · FINAL 21–16
insert into games (week, kickoff_date, kickoff_at, home_team_id, away_team_id, neutral, location, tv, vegas_spread, status, home_score, away_score, hx_unrated)
select 8, date '2026-10-24', timestamptz '2026-10-25T02:20:00Z', h.id, a.id, false, 'University Stadium (NM)', 'CW', null, 'final', 21, 16, true
from teams h, teams a
where h.slug = 'new-mexico' and a.slug = 'north-dakota-state'
  and not exists (select 1 from games x where x.home_team_id = h.id and x.away_team_id = a.id and x.week = 8);
-- kent-state @ sacramento-state · ESPN 401866451 · FINAL 31–10
insert into games (week, kickoff_date, kickoff_at, home_team_id, away_team_id, neutral, location, tv, vegas_spread, status, home_score, away_score, hx_unrated)
select 9, date '2026-10-30', timestamptz '2026-10-31T02:30:00Z', h.id, a.id, false, 'Hornet Stadium', 'ESPNU', null, 'final', 31, 10, true
from teams h, teams a
where h.slug = 'sacramento-state' and a.slug = 'kent-state'
  and not exists (select 1 from games x where x.home_team_id = h.id and x.away_team_id = a.id and x.week = 9);
-- utep @ north-dakota-state · ESPN 401864531 · FINAL 31–7
insert into games (week, kickoff_date, kickoff_at, home_team_id, away_team_id, neutral, location, tv, vegas_spread, status, home_score, away_score, hx_unrated)
select 9, date '2026-10-31', timestamptz '2026-10-31T19:30:00Z', h.id, a.id, false, 'Fargodome', 'MW+', null, 'final', 31, 7, true
from teams h, teams a
where h.slug = 'north-dakota-state' and a.slug = 'utep'
  and not exists (select 1 from games x where x.home_team_id = h.id and x.away_team_id = a.id and x.week = 9);
-- toledo @ sacramento-state · ESPN 401866457 · FINAL 17–20
insert into games (week, kickoff_date, kickoff_at, home_team_id, away_team_id, neutral, location, tv, vegas_spread, status, home_score, away_score, hx_unrated)
select 10, date '2026-11-04', timestamptz '2026-11-05T00:00:00Z', h.id, a.id, false, 'Hornet Stadium', 'CBSSN', null, 'final', 17, 20, true
from teams h, teams a
where h.slug = 'sacramento-state' and a.slug = 'toledo'
  and not exists (select 1 from games x where x.home_team_id = h.id and x.away_team_id = a.id and x.week = 10);
-- sacramento-state @ central-michigan · ESPN 401866462 · FINAL 28–7
insert into games (week, kickoff_date, kickoff_at, home_team_id, away_team_id, neutral, location, tv, vegas_spread, status, home_score, away_score, hx_unrated)
select 11, date '2026-11-11', timestamptz '2026-11-12T00:30:00Z', h.id, a.id, false, 'Kelly/Shorts Stadium', 'ESPNU', null, 'final', 28, 7, true
from teams h, teams a
where h.slug = 'central-michigan' and a.slug = 'sacramento-state'
  and not exists (select 1 from games x where x.home_team_id = h.id and x.away_team_id = a.id and x.week = 11);
-- north-dakota-state @ hawaii · ESPN 401864537 · SCHEDULED
insert into games (week, kickoff_date, kickoff_at, home_team_id, away_team_id, neutral, location, tv, vegas_spread, status, home_score, away_score, hx_unrated)
select 11, date '2026-11-14', timestamptz '2026-11-15T04:00:00Z', h.id, a.id, false, 'Clarence T.C. Ching Athletics Complex', 'CW', null, 'scheduled', null, null, false
from teams h, teams a
where h.slug = 'hawaii' and a.slug = 'north-dakota-state'
  and not exists (select 1 from games x where x.home_team_id = h.id and x.away_team_id = a.id and x.week = 11);
-- northern-illinois @ north-dakota-state · ESPN 401864543 · SCHEDULED
insert into games (week, kickoff_date, kickoff_at, home_team_id, away_team_id, neutral, location, tv, vegas_spread, status, home_score, away_score, hx_unrated)
select 12, date '2026-11-21', timestamptz '2026-11-21T21:00:00Z', h.id, a.id, false, 'Fargodome', 'CW', null, 'scheduled', null, null, false
from teams h, teams a
where h.slug = 'north-dakota-state' and a.slug = 'northern-illinois'
  and not exists (select 1 from games x where x.home_team_id = h.id and x.away_team_id = a.id and x.week = 12);
-- north-dakota-state @ san-jose-state · ESPN 401864549 · SCHEDULED
insert into games (week, kickoff_date, kickoff_at, home_team_id, away_team_id, neutral, location, tv, vegas_spread, status, home_score, away_score, hx_unrated)
select 13, date '2026-11-27', timestamptz '2026-11-27T20:30:00Z', h.id, a.id, false, 'CEFCU Stadium', 'CBSSN', null, 'scheduled', null, null, false
from teams h, teams a
where h.slug = 'san-jose-state' and a.slug = 'north-dakota-state'
  and not exists (select 1 from games x where x.home_team_id = h.id and x.away_team_id = a.id and x.week = 13);
-- sacramento-state @ hawaii · ESPN 401864547 · SCHEDULED
insert into games (week, kickoff_date, kickoff_at, home_team_id, away_team_id, neutral, location, tv, vegas_spread, status, home_score, away_score, hx_unrated)
select 13, date '2026-11-28', timestamptz '2026-11-29T04:00:00Z', h.id, a.id, false, 'Clarence T.C. Ching Athletics Complex', 'MW+', null, 'scheduled', null, null, false
from teams h, teams a
where h.slug = 'hawaii' and a.slug = 'sacramento-state'
  and not exists (select 1 from games x where x.home_team_id = h.id and x.away_team_id = a.id and x.week = 13);
