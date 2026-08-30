-- Week 1 kick / TV from Research CFB (NCAA.com, America/Chicago).
-- Vegas only on the four sourced closes. Do not invent the rest.
-- NDSU / Sac State stay off. FCS opponents: stamp the FBS home row by date.
alter table games add column if not exists tv text;

update games g
set kickoff_at = timestamptz '2026-09-03 17:00:00-05',
    tv = 'BTN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'rutgers' and a.slug = 'massachusetts')
    or (h.slug = 'massachusetts' and a.slug = 'rutgers'))
  and g.kickoff_date between date '2026-09-03' - 1 and date '2026-09-03' + 1;

update games g
set kickoff_at = timestamptz '2026-09-03 18:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ucf'
  and g.kickoff_date = date '2026-09-03';

update games g
set kickoff_at = timestamptz '2026-09-03 18:00:00-05',
    tv = 'ACCN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'wake-forest' and a.slug = 'akron')
    or (h.slug = 'akron' and a.slug = 'wake-forest'))
  and g.kickoff_date between date '2026-09-03' - 1 and date '2026-09-03' + 1;

update games g
set kickoff_at = timestamptz '2026-09-03 18:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'delaware'
  and g.kickoff_date = date '2026-09-03';

update games g
set kickoff_at = timestamptz '2026-09-03 18:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'kennesaw-state'
  and g.kickoff_date = date '2026-09-03';

update games g
set kickoff_at = timestamptz '2026-09-03 18:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'buffalo'
  and g.kickoff_date = date '2026-09-03';

update games g
set kickoff_at = timestamptz '2026-09-03 19:00:00-05',
    tv = 'SECN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'missouri'
  and g.kickoff_date = date '2026-09-03';

update games g
set kickoff_at = timestamptz '2026-09-03 19:00:00-05',
    tv = 'ESPN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'georgia-tech' and a.slug = 'colorado')
    or (h.slug = 'colorado' and a.slug = 'georgia-tech'))
  and g.kickoff_date between date '2026-09-03' - 1 and date '2026-09-03' + 1;

update games g
set kickoff_at = timestamptz '2026-09-03 19:00:00-05',
    tv = 'Peacock'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'minnesota'
  and g.kickoff_date = date '2026-09-03';

update games g
set kickoff_at = timestamptz '2026-09-03 20:00:00-05',
    tv = 'ESPNU'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'utah'
  and g.kickoff_date = date '2026-09-03';

update games g
set kickoff_at = timestamptz '2026-09-03 20:00:00-05',
    tv = 'BTN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'illinois' and a.slug = 'uab')
    or (h.slug = 'uab' and a.slug = 'illinois'))
  and g.kickoff_date between date '2026-09-03' - 1 and date '2026-09-03' + 1;

update games g
set kickoff_at = timestamptz '2026-09-04 17:30:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'eastern-michigan' and a.slug = 'san-jose-state')
    or (h.slug = 'san-jose-state' and a.slug = 'eastern-michigan'))
  and g.kickoff_date between date '2026-09-04' - 1 and date '2026-09-04' + 1;

update games g
set kickoff_at = timestamptz '2026-09-04 18:00:00-05',
    tv = 'BTN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'purdue'
  and g.kickoff_date = date '2026-09-04';

update games g
set kickoff_at = timestamptz '2026-09-04 18:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'georgia-state'
  and g.kickoff_date = date '2026-09-04';

update games g
set kickoff_at = timestamptz '2026-09-04 19:00:00-05',
    tv = 'SECN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'oklahoma' and a.slug = 'utep')
    or (h.slug = 'utep' and a.slug = 'oklahoma'))
  and g.kickoff_date between date '2026-09-04' - 1 and date '2026-09-04' + 1;

update games g
set kickoff_at = timestamptz '2026-09-04 19:00:00-05',
    tv = 'ESPNU'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'kansas'
  and g.kickoff_date = date '2026-09-04';

update games g
set kickoff_at = timestamptz '2026-09-04 19:00:00-05',
    tv = 'FS1'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'michigan-state' and a.slug = 'toledo')
    or (h.slug = 'toledo' and a.slug = 'michigan-state'))
  and g.kickoff_date between date '2026-09-04' - 1 and date '2026-09-04' + 1;

update games g
set kickoff_at = timestamptz '2026-09-04 20:00:00-05',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'stanford' then -23.5 else 23.5 end
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'stanford' and a.slug = 'miami')
    or (h.slug = 'miami' and a.slug = 'stanford'))
  and g.kickoff_date between date '2026-09-04' - 1 and date '2026-09-04' + 1;

update games g
set kickoff_at = timestamptz '2026-09-04 20:00:00-05',
    tv = 'FOX'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'usc' and a.slug = 'fresno-state')
    or (h.slug = 'fresno-state' and a.slug = 'usc'))
  and g.kickoff_date between date '2026-09-04' - 1 and date '2026-09-04' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 11:00:00-05',
    tv = 'FOX'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'indiana' and a.slug = 'north-texas')
    or (h.slug = 'north-texas' and a.slug = 'indiana'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 11:00:00-05',
    tv = 'ABC'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'alabama' and a.slug = 'east-carolina')
    or (h.slug = 'east-carolina' and a.slug = 'alabama'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 11:00:00-05',
    tv = 'ESPN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'houston' and a.slug = 'oregon-state')
    or (h.slug = 'oregon-state' and a.slug = 'houston'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 11:00:00-05',
    tv = 'TNT/HBO Max'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'west-virginia' and a.slug = 'coastal-carolina')
    or (h.slug = 'coastal-carolina' and a.slug = 'west-virginia'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 11:00:00-05',
    tv = 'ACCN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'syracuse'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 11:00:00-05',
    tv = 'FS1'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'nebraska' and a.slug = 'ohio')
    or (h.slug = 'ohio' and a.slug = 'nebraska'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 11:00:00-05',
    tv = 'CBSSN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'army'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 11:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'bowling-green'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 11:00:00-05',
    tv = 'ESPNU'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'james-madison' and a.slug = 'liberty')
    or (h.slug = 'liberty' and a.slug = 'james-madison'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 11:30:00-05',
    tv = 'BTN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'ohio-state' and a.slug = 'ball-state')
    or (h.slug = 'ball-state' and a.slug = 'ohio-state'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 11:30:00-05',
    tv = 'CW'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'pittsburgh' and a.slug = 'miami-oh')
    or (h.slug = 'miami-oh' and a.slug = 'pittsburgh'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 11:45:00-05',
    tv = 'SECN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'south-carolina' and a.slug = 'kent-state')
    or (h.slug = 'kent-state' and a.slug = 'south-carolina'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 12:00:00-05',
    tv = 'SECN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'kentucky'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 12:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'iowa-state'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 12:00:00-05',
    tv = 'MW+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'air-force'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 13:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'temple'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 14:00:00-05',
    tv = 'SECN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'georgia'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 14:30:00-05',
    tv = 'CBS'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'oregon' and a.slug = 'boise-state')
    or (h.slug = 'boise-state' and a.slug = 'oregon'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 14:30:00-05',
    tv = 'ESPN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'texas' and a.slug = 'texas-state')
    or (h.slug = 'texas-state' and a.slug = 'texas'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 14:30:00-05',
    tv = 'FS1'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'penn-state' and a.slug = 'marshall')
    or (h.slug = 'marshall' and a.slug = 'penn-state'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 14:30:00-05',
    tv = 'SECN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'tennessee'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 14:30:00-05',
    tv = 'ABC',
    neutral = true
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'baylor' and a.slug = 'auburn')
    or (h.slug = 'auburn' and a.slug = 'baylor'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 14:30:00-05',
    tv = 'FOX'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'cincinnati' and a.slug = 'boston-college')
    or (h.slug = 'boston-college' and a.slug = 'cincinnati'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 14:30:00-05',
    tv = 'ACCN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'duke' and a.slug = 'tulane')
    or (h.slug = 'tulane' and a.slug = 'duke'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 14:30:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'charlotte'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 14:30:00-05',
    tv = 'CBSSN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'navy'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 14:30:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'utsa'
  and g.kickoff_date = date '2026-09-05';

-- skip (not on 136): Maine at Appalachian State

update games g
set kickoff_at = timestamptz '2026-09-05 14:45:00-05',
    tv = 'ESPNU'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'tulsa' and a.slug = 'oklahoma-state')
    or (h.slug = 'oklahoma-state' and a.slug = 'tulsa'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 15:15:00-05',
    tv = 'BTN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'iowa' and a.slug = 'northern-illinois')
    or (h.slug = 'northern-illinois' and a.slug = 'iowa'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 15:15:00-05',
    tv = 'SECN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'arkansas'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 16:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'southern-miss'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 17:00:00-05',
    tv = 'USA'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'colorado-state' and a.slug = 'wyoming')
    or (h.slug = 'wyoming' and a.slug = 'colorado-state'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 17:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'old-dominion'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 18:00:00-05',
    tv = 'ESPN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'texas-am' and a.slug = 'missouri-state')
    or (h.slug = 'missouri-state' and a.slug = 'texas-am'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 18:00:00-05',
    tv = 'FS1'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'texas-tech'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 18:00:00-05',
    tv = 'SECN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'vanderbilt'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 18:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'kansas-state'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 18:00:00-05',
    tv = 'CBSSN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'utah-state'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 18:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'memphis' and a.slug = 'arkansas-state')
    or (h.slug = 'arkansas-state' and a.slug = 'memphis'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 18:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'rice'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 18:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'usf' and a.slug = 'fiu')
    or (h.slug = 'fiu' and a.slug = 'usf'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 18:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'middle-tennessee'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 18:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'jacksonville-state'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 18:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'georgia-southern'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 18:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'south-alabama'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 18:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'troy' and a.slug = 'sam-houston')
    or (h.slug = 'sam-houston' and a.slug = 'troy'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 18:30:00-05',
    tv = 'ABC',
    vegas_spread = case when h.slug = 'lsu' then 10.5 else -10.5 end,
    vegas_total = 51.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'lsu' and a.slug = 'clemson')
    or (h.slug = 'clemson' and a.slug = 'lsu'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 18:30:00-05',
    tv = 'NBC'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'michigan' and a.slug = 'western-michigan')
    or (h.slug = 'western-michigan' and a.slug = 'michigan'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 18:30:00-05',
    tv = 'ESPNU'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'mississippi-state' and a.slug = 'ul-monroe')
    or (h.slug = 'ul-monroe' and a.slug = 'mississippi-state'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 18:30:00-05',
    tv = 'ACCN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'virginia-tech'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 18:30:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'louisiana-tech'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 18:45:00-05',
    tv = 'SECN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'florida' and a.slug = 'florida-atlantic')
    or (h.slug = 'florida-atlantic' and a.slug = 'florida'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 19:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'byu'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 19:00:00-05',
    tv = 'BTN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'maryland'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 19:00:00-05',
    tv = 'BTN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'northwestern'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 19:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'louisiana'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 20:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'new-mexico-state'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 20:30:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'arizona'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 20:30:00-05',
    tv = 'USA'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'san-diego-state'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 21:00:00-05',
    tv = 'ESPN+'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'arizona-state'
  and g.kickoff_date = date '2026-09-05';

update games g
set kickoff_at = timestamptz '2026-09-05 21:00:00-05',
    tv = 'CW'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'hawaii' and a.slug = 'unlv')
    or (h.slug = 'unlv' and a.slug = 'hawaii'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 21:00:00-05',
    tv = 'FS1'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'new-mexico' and a.slug = 'central-michigan')
    or (h.slug = 'central-michigan' and a.slug = 'new-mexico'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 21:30:00-05',
    tv = 'ESPN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'california' and a.slug = 'ucla')
    or (h.slug = 'ucla' and a.slug = 'california'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-05 21:30:00-05',
    tv = 'CBSSN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'nevada' and a.slug = 'western-kentucky')
    or (h.slug = 'western-kentucky' and a.slug = 'nevada'))
  and g.kickoff_date between date '2026-09-05' - 1 and date '2026-09-05' + 1;

update games g
set kickoff_at = timestamptz '2026-09-06 15:00:00-05',
    tv = 'NBC'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'washington' and a.slug = 'washington-state')
    or (h.slug = 'washington-state' and a.slug = 'washington'))
  and g.kickoff_date between date '2026-09-06' - 1 and date '2026-09-06' + 1;

update games g
set kickoff_at = timestamptz '2026-09-06 18:30:00-05',
    tv = 'NBC',
    neutral = true,
    vegas_spread = case when h.slug = 'notre-dame' then 20.5 else -20.5 end,
    vegas_total = 47.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'wisconsin' and a.slug = 'notre-dame')
    or (h.slug = 'notre-dame' and a.slug = 'wisconsin'))
  and g.kickoff_date between date '2026-09-06' - 1 and date '2026-09-06' + 1;

update games g
set kickoff_at = timestamptz '2026-09-06 18:30:00-05',
    tv = 'ABC',
    neutral = true,
    vegas_spread = case when h.slug = 'ole-miss' then 6.5 else -6.5 end,
    vegas_total = 55.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'louisville' and a.slug = 'ole-miss')
    or (h.slug = 'ole-miss' and a.slug = 'louisville'))
  and g.kickoff_date between date '2026-09-06' - 1 and date '2026-09-06' + 1;

update games g
set kickoff_at = timestamptz '2026-09-07 18:30:00-05',
    tv = 'ESPN'
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'florida-state' and a.slug = 'smu')
    or (h.slug = 'smu' and a.slug = 'florida-state'))
  and g.kickoff_date between date '2026-09-07' - 1 and date '2026-09-07' + 1;
