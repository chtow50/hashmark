-- Week 3 FBS–FBS kick / TV / Vegas from Research CLEAR pack
-- data/week3_stamp_compact_2026.json (as_of 2026-09-14).
-- Pack vegas_spread is home-relative (negative = home favored).
-- SQL stores the Week 2 / board convention: positive = home favored.
-- kickoff_date = America/Chicago civil date of kick_iso (not stale pack dates).
-- TV left null on the 2 HOLDs only. Do not invent. No ESPN event IDs.
-- Featured: Syracuse @ Pittsburgh · hashmark_id 97 · Thu 18:30 CT · ESPN · PITT -10.5.

-- Syracuse @ Pittsburgh · Thu 2026-09-17 18:30 CT · ESPN · PITT -10.5 · id 97
update games g
set kickoff_at = timestamptz '2026-09-17 18:30:00-05',
    kickoff_date = date '2026-09-17',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'pittsburgh' then 10.5 else -10.5 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 97
  and ((h.slug = 'pittsburgh' and a.slug = 'syracuse')
    or (h.slug = 'syracuse' and a.slug = 'pittsburgh'))
  and g.week = 3;

-- Miami @ Wake Forest · Fri 2026-09-18 18:30 CT · ESPN · MIA -20.5 · id 98
update games g
set kickoff_at = timestamptz '2026-09-18 18:30:00-05',
    kickoff_date = date '2026-09-18',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'wake-forest' then -20.5 else 20.5 end,
    vegas_total = 55.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 98
  and ((h.slug = 'wake-forest' and a.slug = 'miami')
    or (h.slug = 'miami' and a.slug = 'wake-forest'))
  and g.week = 3;

-- Houston @ Texas Tech · Fri 2026-09-18 19:00 CT · FOX · TTU -7.5 · id 99
update games g
set kickoff_at = timestamptz '2026-09-18 19:00:00-05',
    kickoff_date = date '2026-09-18',
    tv = 'FOX',
    vegas_spread = case when h.slug = 'texas-tech' then 7.5 else -7.5 end,
    vegas_total = null,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 99
  and ((h.slug = 'texas-tech' and a.slug = 'houston')
    or (h.slug = 'houston' and a.slug = 'texas-tech'))
  and g.week = 3;

-- Coastal Carolina @ Delaware · Sat 2026-09-19 10:30 CT · CBSSN · DEL -5.5 · id 100
update games g
set kickoff_at = timestamptz '2026-09-19 10:30:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'CBSSN',
    vegas_spread = case when h.slug = 'delaware' then 5.5 else -5.5 end,
    vegas_total = 57.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 100
  and ((h.slug = 'delaware' and a.slug = 'coastal-carolina')
    or (h.slug = 'coastal-carolina' and a.slug = 'delaware'))
  and g.week = 3;

-- Georgia @ Arkansas · Sat 2026-09-19 11:00 CT · ABC · UGA -25.5 · id 101
update games g
set kickoff_at = timestamptz '2026-09-19 11:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ABC',
    vegas_spread = case when h.slug = 'arkansas' then -25.5 else 25.5 end,
    vegas_total = 54.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 101
  and ((h.slug = 'arkansas' and a.slug = 'georgia')
    or (h.slug = 'georgia' and a.slug = 'arkansas'))
  and g.week = 3;

-- Kent State @ Ohio State · Sat 2026-09-19 11:00 CT · FOX · OSU -52.5 · id 108
update games g
set kickoff_at = timestamptz '2026-09-19 11:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'FOX',
    vegas_spread = case when h.slug = 'ohio-state' then 52.5 else -52.5 end,
    vegas_total = 59.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 108
  and ((h.slug = 'ohio-state' and a.slug = 'kent-state')
    or (h.slug = 'kent-state' and a.slug = 'ohio-state'))
  and g.week = 3;

-- Buffalo @ Penn State · Sat 2026-09-19 11:00 CT · BTN · PSU -39.5 · id 105
update games g
set kickoff_at = timestamptz '2026-09-19 11:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'BTN',
    vegas_spread = case when h.slug = 'penn-state' then 39.5 else -39.5 end,
    vegas_total = 48.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 105
  and ((h.slug = 'penn-state' and a.slug = 'buffalo')
    or (h.slug = 'buffalo' and a.slug = 'penn-state'))
  and g.week = 3;

-- Tulane @ Kansas State · Sat 2026-09-19 11:00 CT · ESPN2 · KSU -20.5 · id 104
update games g
set kickoff_at = timestamptz '2026-09-19 11:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPN2',
    vegas_spread = case when h.slug = 'kansas-state' then 20.5 else -20.5 end,
    vegas_total = 49.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 104
  and ((h.slug = 'kansas-state' and a.slug = 'tulane')
    or (h.slug = 'tulane' and a.slug = 'kansas-state'))
  and g.week = 3;

-- Bowling Green @ Iowa State · Sat 2026-09-19 11:00 CT · ESPNU · ISU -23.5 · id 107
update games g
set kickoff_at = timestamptz '2026-09-19 11:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPNU',
    vegas_spread = case when h.slug = 'iowa-state' then 23.5 else -23.5 end,
    vegas_total = 44.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 107
  and ((h.slug = 'iowa-state' and a.slug = 'bowling-green')
    or (h.slug = 'bowling-green' and a.slug = 'iowa-state'))
  and g.week = 3;

-- Arizona State vs Kansas · Sat 2026-09-19 11:00 CT · FS1 · ASU -5.5 · id 103
update games g
set kickoff_at = timestamptz '2026-09-19 11:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'FS1',
    vegas_spread = case when h.slug = 'kansas' then -5.5 else 5.5 end,
    vegas_total = 51.5,
    neutral = true
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 103
  and ((h.slug = 'kansas' and a.slug = 'arizona-state')
    or (h.slug = 'arizona-state' and a.slug = 'kansas'))
  and g.week = 3;

-- North Carolina @ Clemson · Sat 2026-09-19 11:00 CT · ESPN/Disney+ · CLEM -3.5 · id 106
update games g
set kickoff_at = timestamptz '2026-09-19 11:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPN/Disney+',
    vegas_spread = case when h.slug = 'clemson' then 3.5 else -3.5 end,
    vegas_total = 44.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 106
  and ((h.slug = 'clemson' and a.slug = 'north-carolina')
    or (h.slug = 'north-carolina' and a.slug = 'clemson'))
  and g.week = 3;

-- Akron @ Minnesota · Sat 2026-09-19 11:00 CT · BTN · MINN -24.5 · id 102
update games g
set kickoff_at = timestamptz '2026-09-19 11:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'BTN',
    vegas_spread = case when h.slug = 'minnesota' then 24.5 else -24.5 end,
    vegas_total = 49.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 102
  and ((h.slug = 'minnesota' and a.slug = 'akron')
    or (h.slug = 'akron' and a.slug = 'minnesota'))
  and g.week = 3;

-- North Texas @ Texas State · Sat 2026-09-19 11:00 CT · USA Net · TXST -3 · id 148
update games g
set kickoff_at = timestamptz '2026-09-19 11:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'USA Net',
    vegas_spread = case when h.slug = 'texas-state' then 3 else -3 end,
    vegas_total = 63.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 148
  and ((h.slug = 'texas-state' and a.slug = 'north-texas')
    or (h.slug = 'north-texas' and a.slug = 'texas-state'))
  and g.week = 3;

-- Eastern Michigan @ Wisconsin · Sat 2026-09-19 11:30 CT · Peacock · WIS -23.5 · id 109
update games g
set kickoff_at = timestamptz '2026-09-19 11:30:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'Peacock',
    vegas_spread = case when h.slug = 'wisconsin' then 23.5 else -23.5 end,
    vegas_total = 45.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 109
  and ((h.slug = 'wisconsin' and a.slug = 'eastern-michigan')
    or (h.slug = 'eastern-michigan' and a.slug = 'wisconsin'))
  and g.week = 3;

-- NC State @ Vanderbilt · Sat 2026-09-19 11:45 CT · SEC Network · VAN -3 · id 111
update games g
set kickoff_at = timestamptz '2026-09-19 11:45:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'SEC Network',
    vegas_spread = case when h.slug = 'vanderbilt' then 3 else -3 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 111
  and ((h.slug = 'vanderbilt' and a.slug = 'nc-state')
    or (h.slug = 'nc-state' and a.slug = 'vanderbilt'))
  and g.week = 3;

-- Wyoming @ Central Michigan · Sat 2026-09-19 12:00 CT · ESPN+ · CMU -1.5 · id 112
update games g
set kickoff_at = timestamptz '2026-09-19 12:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'central-michigan' then 1.5 else -1.5 end,
    vegas_total = 39.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 112
  and ((h.slug = 'central-michigan' and a.slug = 'wyoming')
    or (h.slug = 'wyoming' and a.slug = 'central-michigan'))
  and g.week = 3;

-- Temple @ Toledo · Sat 2026-09-19 14:00 CT · CBSSN · TOL -5.5 · id 113
update games g
set kickoff_at = timestamptz '2026-09-19 14:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'CBSSN',
    vegas_spread = case when h.slug = 'toledo' then 5.5 else -5.5 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 113
  and ((h.slug = 'toledo' and a.slug = 'temple')
    or (h.slug = 'temple' and a.slug = 'toledo'))
  and g.week = 3;

-- Kentucky @ Texas A&M · Sat 2026-09-19 14:30 CT · ESPN · TA&M -16.5 · id 119
update games g
set kickoff_at = timestamptz '2026-09-19 14:30:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'texas-am' then 16.5 else -16.5 end,
    vegas_total = 49.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 119
  and ((h.slug = 'texas-am' and a.slug = 'kentucky')
    or (h.slug = 'kentucky' and a.slug = 'texas-am'))
  and g.week = 3;

-- Florida State @ Alabama · Sat 2026-09-19 14:30 CT · ABC · ALA -19.5 · id 116
update games g
set kickoff_at = timestamptz '2026-09-19 14:30:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ABC',
    vegas_spread = case when h.slug = 'alabama' then 19.5 else -19.5 end,
    vegas_total = 49.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 116
  and ((h.slug = 'alabama' and a.slug = 'florida-state')
    or (h.slug = 'florida-state' and a.slug = 'alabama'))
  and g.week = 3;

-- USC @ Rutgers · Sat 2026-09-19 14:30 CT · CBS · USC -23.5 · id 120
update games g
set kickoff_at = timestamptz '2026-09-19 14:30:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'CBS',
    vegas_spread = case when h.slug = 'rutgers' then -23.5 else 23.5 end,
    vegas_total = 59.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 120
  and ((h.slug = 'rutgers' and a.slug = 'usc')
    or (h.slug = 'usc' and a.slug = 'rutgers'))
  and g.week = 3;

-- SMU @ Louisville · Sat 2026-09-19 14:30 CT · ESPN2 · LOU -1.5 · id 118
update games g
set kickoff_at = timestamptz '2026-09-19 14:30:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPN2',
    vegas_spread = case when h.slug = 'louisville' then 1.5 else -1.5 end,
    vegas_total = 59.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 118
  and ((h.slug = 'louisville' and a.slug = 'smu')
    or (h.slug = 'smu' and a.slug = 'louisville'))
  and g.week = 3;

-- Utah State @ Utah · Sat 2026-09-19 14:30 CT · FOX · UTAH -28.5 · id 114
update games g
set kickoff_at = timestamptz '2026-09-19 14:30:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'FOX',
    vegas_spread = case when h.slug = 'utah' then 28.5 else -28.5 end,
    vegas_total = 56.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 114
  and ((h.slug = 'utah' and a.slug = 'utah-state')
    or (h.slug = 'utah-state' and a.slug = 'utah'))
  and g.week = 3;

-- UTEP @ Michigan · Sat 2026-09-19 14:30 CT · BTN · MICH -35.5 · id 117
update games g
set kickoff_at = timestamptz '2026-09-19 14:30:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'BTN',
    vegas_spread = case when h.slug = 'michigan' then 35.5 else -35.5 end,
    vegas_total = 48.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 117
  and ((h.slug = 'michigan' and a.slug = 'utep')
    or (h.slug = 'utep' and a.slug = 'michigan'))
  and g.week = 3;

-- Miami (OH) @ Cincinnati · Sat 2026-09-19 14:30 CT · ESPN+ · CIN -14.5 · id 115
update games g
set kickoff_at = timestamptz '2026-09-19 14:30:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'cincinnati' then 14.5 else -14.5 end,
    vegas_total = 50.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 115
  and ((h.slug = 'cincinnati' and a.slug = 'miami-oh')
    or (h.slug = 'miami-oh' and a.slug = 'cincinnati'))
  and g.week = 3;

-- Western Kentucky @ Indiana · Sat 2026-09-19 15:00 CT · Peacock · IU -44.5 · id 121
update games g
set kickoff_at = timestamptz '2026-09-19 15:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'Peacock',
    vegas_spread = case when h.slug = 'indiana' then 44.5 else -44.5 end,
    vegas_total = 60.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 121
  and ((h.slug = 'indiana' and a.slug = 'western-kentucky')
    or (h.slug = 'western-kentucky' and a.slug = 'indiana'))
  and g.week = 3;

-- Stanford @ Duke · Sat 2026-09-19 15:00 CT · CW · DUKE -9.5 · id 122
update games g
set kickoff_at = timestamptz '2026-09-19 15:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'CW',
    vegas_spread = case when h.slug = 'duke' then 9.5 else -9.5 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 122
  and ((h.slug = 'duke' and a.slug = 'stanford')
    or (h.slug = 'stanford' and a.slug = 'duke'))
  and g.week = 3;

-- Ball State @ Liberty · Sat 2026-09-19 15:00 CT · ESPN+ · LIB -14.5 · id 123
update games g
set kickoff_at = timestamptz '2026-09-19 15:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'liberty' then 14.5 else -14.5 end,
    vegas_total = 49.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 123
  and ((h.slug = 'liberty' and a.slug = 'ball-state')
    or (h.slug = 'ball-state' and a.slug = 'liberty'))
  and g.week = 3;

-- Louisiana Tech @ Baylor · Sat 2026-09-19 15:00 CT · ESPNU · BAY -19.5 · id 124
update games g
set kickoff_at = timestamptz '2026-09-19 15:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPNU',
    vegas_spread = case when h.slug = 'baylor' then 19.5 else -19.5 end,
    vegas_total = 53.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 124
  and ((h.slug = 'baylor' and a.slug = 'louisiana-tech')
    or (h.slug = 'louisiana-tech' and a.slug = 'baylor'))
  and g.week = 3;

-- Mississippi State @ South Carolina · Sat 2026-09-19 15:15 CT · SEC Network · SC -4 · id 125
update games g
set kickoff_at = timestamptz '2026-09-19 15:15:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'SEC Network',
    vegas_spread = case when h.slug = 'south-carolina' then 4 else -4 end,
    vegas_total = 59.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 125
  and ((h.slug = 'south-carolina' and a.slug = 'mississippi-state')
    or (h.slug = 'mississippi-state' and a.slug = 'south-carolina'))
  and g.week = 3;

-- East Carolina @ Old Dominion · Sat 2026-09-19 17:00 CT · ESPN+ · ODU -3 · id 127
update games g
set kickoff_at = timestamptz '2026-09-19 17:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'old-dominion' then 3 else -3 end,
    vegas_total = 49.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 127
  and ((h.slug = 'old-dominion' and a.slug = 'east-carolina')
    or (h.slug = 'east-carolina' and a.slug = 'old-dominion'))
  and g.week = 3;

-- Florida International @ Florida Atlantic · Sat 2026-09-19 17:00 CT · ESPN+ · FAU -7 · id 128
update games g
set kickoff_at = timestamptz '2026-09-19 17:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'florida-atlantic' then 7 else -7 end,
    vegas_total = 62.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 128
  and ((h.slug = 'florida-atlantic' and a.slug = 'fiu')
    or (h.slug = 'fiu' and a.slug = 'florida-atlantic'))
  and g.week = 3;

-- Charlotte @ App State · Sat 2026-09-19 17:00 CT · ESPN+ · APP -17.5 · id 126
update games g
set kickoff_at = timestamptz '2026-09-19 17:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'app-state' then 17.5 else -17.5 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 126
  and ((h.slug = 'app-state' and a.slug = 'charlotte')
    or (h.slug = 'charlotte' and a.slug = 'app-state'))
  and g.week = 3;

-- Marshall @ Missouri State · Sat 2026-09-19 17:30 CT · CBSSN · MRSH -3.5 · id 129
update games g
set kickoff_at = timestamptz '2026-09-19 17:30:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'CBSSN',
    vegas_spread = case when h.slug = 'missouri-state' then -3.5 else 3.5 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 129
  and ((h.slug = 'missouri-state' and a.slug = 'marshall')
    or (h.slug = 'marshall' and a.slug = 'missouri-state'))
  and g.week = 3;

-- Troy @ Missouri · Sat 2026-09-19 18:00 CT · SECN+ · MIZ -26.5 · id 110
update games g
set kickoff_at = timestamptz '2026-09-19 18:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'SECN+',
    vegas_spread = case when h.slug = 'missouri' then 26.5 else -26.5 end,
    vegas_total = 50.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 110
  and ((h.slug = 'missouri' and a.slug = 'troy')
    or (h.slug = 'troy' and a.slug = 'missouri'))
  and g.week = 3;

-- Florida @ Auburn · Sat 2026-09-19 18:00 CT · ESPN · FLA -2.5 · id 134
update games g
set kickoff_at = timestamptz '2026-09-19 18:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'auburn' then -2.5 else 2.5 end,
    vegas_total = 53.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 134
  and ((h.slug = 'auburn' and a.slug = 'florida')
    or (h.slug = 'florida' and a.slug = 'auburn'))
  and g.week = 3;

-- Georgia State @ UCF · Sat 2026-09-19 18:00 CT · ESPN+ · UCF -18.5 · id 131
update games g
set kickoff_at = timestamptz '2026-09-19 18:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'ucf' then 18.5 else -18.5 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 131
  and ((h.slug = 'ucf' and a.slug = 'georgia-state')
    or (h.slug = 'georgia-state' and a.slug = 'ucf'))
  and g.week = 3;

-- UConn @ Southern Miss · Sat 2026-09-19 18:00 CT · ESPN+ · CONN -3 · id 132
update games g
set kickoff_at = timestamptz '2026-09-19 18:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'southern-miss' then -3 else 3 end,
    vegas_total = 54.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 132
  and ((h.slug = 'southern-miss' and a.slug = 'uconn')
    or (h.slug = 'uconn' and a.slug = 'southern-miss'))
  and g.week = 3;

-- Western Michigan @ Rice · Sat 2026-09-19 18:00 CT · ESPN+ · WMU -9.5 · id 133
update games g
set kickoff_at = timestamptz '2026-09-19 18:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'rice' then -9.5 else 9.5 end,
    vegas_total = 43.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 133
  and ((h.slug = 'rice' and a.slug = 'western-michigan')
    or (h.slug = 'western-michigan' and a.slug = 'rice'))
  and g.week = 3;

-- Nevada @ Middle Tennessee · Sat 2026-09-19 18:00 CT · ESPN+ · NEV -3.5 · id 136
update games g
set kickoff_at = timestamptz '2026-09-19 18:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'middle-tennessee' then -3.5 else 3.5 end,
    vegas_total = 50.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 136
  and ((h.slug = 'middle-tennessee' and a.slug = 'nevada')
    or (h.slug = 'nevada' and a.slug = 'middle-tennessee'))
  and g.week = 3;

-- Ohio @ South Alabama · Sat 2026-09-19 18:00 CT · ESPN+ · USA -4.5 · id 130
update games g
set kickoff_at = timestamptz '2026-09-19 18:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'south-alabama' then 4.5 else -4.5 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 130
  and ((h.slug = 'south-alabama' and a.slug = 'ohio')
    or (h.slug = 'ohio' and a.slug = 'south-alabama'))
  and g.week = 3;

-- Georgia Southern @ Jacksonville State · Sat 2026-09-19 18:00 CT · ESPN+ · JXST -3 · id 135
update games g
set kickoff_at = timestamptz '2026-09-19 18:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'jacksonville-state' then 3 else -3 end,
    vegas_total = 52.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 135
  and ((h.slug = 'jacksonville-state' and a.slug = 'georgia-southern')
    or (h.slug = 'georgia-southern' and a.slug = 'jacksonville-state'))
  and g.week = 3;

-- Michigan State @ Notre Dame · Sat 2026-09-19 18:30 CT · NBC · ND -29.5 · id 138
update games g
set kickoff_at = timestamptz '2026-09-19 18:30:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'NBC',
    vegas_spread = case when h.slug = 'notre-dame' then 29.5 else -29.5 end,
    vegas_total = 52.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 138
  and ((h.slug = 'notre-dame' and a.slug = 'michigan-state')
    or (h.slug = 'michigan-state' and a.slug = 'notre-dame'))
  and g.week = 3;

-- LSU @ Ole Miss · Sat 2026-09-19 18:30 CT · ABC · LSU -3 · id 143
update games g
set kickoff_at = timestamptz '2026-09-19 18:30:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ABC',
    vegas_spread = case when h.slug = 'ole-miss' then -3 else 3 end,
    vegas_total = 59.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 143
  and ((h.slug = 'ole-miss' and a.slug = 'lsu')
    or (h.slug = 'lsu' and a.slug = 'ole-miss'))
  and g.week = 3;

-- BYU @ Colorado State · Sat 2026-09-19 18:30 CT · CBS · BYU -17.5 · id 142
update games g
set kickoff_at = timestamptz '2026-09-19 18:30:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'CBS',
    vegas_spread = case when h.slug = 'colorado-state' then -17.5 else 17.5 end,
    vegas_total = 52.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 142
  and ((h.slug = 'colorado-state' and a.slug = 'byu')
    or (h.slug = 'byu' and a.slug = 'colorado-state'))
  and g.week = 3;

-- New Mexico @ Oklahoma · Sat 2026-09-19 18:30 CT · ESPN2 · OU -22.5 · id 140
update games g
set kickoff_at = timestamptz '2026-09-19 18:30:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPN2',
    vegas_spread = case when h.slug = 'oklahoma' then 22.5 else -22.5 end,
    vegas_total = 46.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 140
  and ((h.slug = 'oklahoma' and a.slug = 'new-mexico')
    or (h.slug = 'new-mexico' and a.slug = 'oklahoma'))
  and g.week = 3;

-- West Virginia vs Virginia · Sat 2026-09-19 18:30 CT · ACC Network · UVA -10 · id 141
update games g
set kickoff_at = timestamptz '2026-09-19 18:30:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ACC Network',
    vegas_spread = case when h.slug = 'virginia' then 10 else -10 end,
    vegas_total = 53.5,
    neutral = true
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 141
  and ((h.slug = 'virginia' and a.slug = 'west-virginia')
    or (h.slug = 'west-virginia' and a.slug = 'virginia'))
  and g.week = 3;

-- Colorado @ Northwestern · Sat 2026-09-19 18:30 CT · TV — · NU -3.5 · id 137 · TV HOLD
update games g
set kickoff_at = timestamptz '2026-09-19 18:30:00-05',
    kickoff_date = date '2026-09-19',
    tv = null,
    vegas_spread = case when h.slug = 'northwestern' then 3.5 else -3.5 end,
    vegas_total = 48.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 137
  and ((h.slug = 'northwestern' and a.slug = 'colorado')
    or (h.slug = 'colorado' and a.slug = 'northwestern'))
  and g.week = 3;

-- Virginia Tech @ Maryland · Sat 2026-09-19 18:30 CT · TV — · VT -3 · id 139 · TV HOLD
update games g
set kickoff_at = timestamptz '2026-09-19 18:30:00-05',
    kickoff_date = date '2026-09-19',
    tv = null,
    vegas_spread = case when h.slug = 'maryland' then -3 else 3 end,
    vegas_total = 53.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 139
  and ((h.slug = 'maryland' and a.slug = 'virginia-tech')
    or (h.slug = 'virginia-tech' and a.slug = 'maryland'))
  and g.week = 3;

-- Kennesaw State @ Tennessee · Sat 2026-09-19 18:45 CT · SEC Network · TENN -35.5 · id 144
update games g
set kickoff_at = timestamptz '2026-09-19 18:45:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'SEC Network',
    vegas_spread = case when h.slug = 'tennessee' then 35.5 else -35.5 end,
    vegas_total = 59.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 144
  and ((h.slug = 'tennessee' and a.slug = 'kennesaw-state')
    or (h.slug = 'kennesaw-state' and a.slug = 'tennessee'))
  and g.week = 3;

-- UTSA @ Texas · Sat 2026-09-19 19:00 CT · SECN+ · TEX -30.5 · id 146
update games g
set kickoff_at = timestamptz '2026-09-19 19:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'SECN+',
    vegas_spread = case when h.slug = 'texas' then 30.5 else -30.5 end,
    vegas_total = 58.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 146
  and ((h.slug = 'texas' and a.slug = 'utsa')
    or (h.slug = 'utsa' and a.slug = 'texas'))
  and g.week = 3;

-- Arkansas State @ TCU · Sat 2026-09-19 19:00 CT · ESPNU · TCU -20.5 · id 145
update games g
set kickoff_at = timestamptz '2026-09-19 19:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPNU',
    vegas_spread = case when h.slug = 'tcu' then 20.5 else -20.5 end,
    vegas_total = 55.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 145
  and ((h.slug = 'tcu' and a.slug = 'arkansas-state')
    or (h.slug = 'arkansas-state' and a.slug = 'tcu'))
  and g.week = 3;

-- UAB @ Louisiana · Sat 2026-09-19 19:00 CT · ESPN+ · UL -7.5 · id 147
update games g
set kickoff_at = timestamptz '2026-09-19 19:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'louisiana' then 7.5 else -7.5 end,
    vegas_total = 56.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 147
  and ((h.slug = 'louisiana' and a.slug = 'uab')
    or (h.slug = 'uab' and a.slug = 'louisiana'))
  and g.week = 3;

-- James Madison @ San Diego State · Sat 2026-09-19 21:00 CT · CW · SDSU -2.5 · id 149
update games g
set kickoff_at = timestamptz '2026-09-19 21:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'CW',
    vegas_spread = case when h.slug = 'san-diego-state' then 2.5 else -2.5 end,
    vegas_total = 46.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 149
  and ((h.slug = 'san-diego-state' and a.slug = 'james-madison')
    or (h.slug = 'james-madison' and a.slug = 'san-diego-state'))
  and g.week = 3;

-- Northern Illinois @ Arizona · Sat 2026-09-19 21:30 CT · TNT · ARIZ -34.5 · id 150
update games g
set kickoff_at = timestamptz '2026-09-19 21:30:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'TNT',
    vegas_spread = case when h.slug = 'arizona' then 34.5 else -34.5 end,
    vegas_total = 49.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 150
  and ((h.slug = 'arizona' and a.slug = 'northern-illinois')
    or (h.slug = 'northern-illinois' and a.slug = 'arizona'))
  and g.week = 3;

-- Purdue @ UCLA · Sat 2026-09-19 22:00 CT · BTN · UCLA -14.5 · id 151
update games g
set kickoff_at = timestamptz '2026-09-19 22:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'BTN',
    vegas_spread = case when h.slug = 'ucla' then 14.5 else -14.5 end,
    vegas_total = 52.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 151
  and ((h.slug = 'ucla' and a.slug = 'purdue')
    or (h.slug = 'purdue' and a.slug = 'ucla'))
  and g.week = 3;

-- Fresno State @ San José State · Sat 2026-09-19 22:00 CT · FS1 · FRES -6.5 · id 152
update games g
set kickoff_at = timestamptz '2026-09-19 22:00:00-05',
    kickoff_date = date '2026-09-19',
    tv = 'FS1',
    vegas_spread = case when h.slug = 'san-jose-state' then -6.5 else 6.5 end,
    vegas_total = 50.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.id = 152
  and ((h.slug = 'san-jose-state' and a.slug = 'fresno-state')
    or (h.slug = 'fresno-state' and a.slug = 'san-jose-state'))
  and g.week = 3;
