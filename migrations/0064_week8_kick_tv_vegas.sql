-- Week 8 FBS–FBS kick / TV / Vegas (Sunday Board + Tape ship, 2026-10-18 ~10:30 AM CT).
-- Pack: data/week8_fbs_fbs_kick_tv_vegas_2026.json.
-- Kick = ESPN scoreboard America/Chicago civil time, cross-checked against the CBS Sports
-- odds board (ET) or the home school's official schedule. TV = ESPN broadcast.
-- Match by home/away slug + week=8.
-- Vegas only when the ESPN DraftKings spread AND total equal the CBS Sports listing
-- exactly on both sides; otherwise null. SQL stores the board convention: positive = home favored.
-- Kick + TV HOLD (untouched): four Saturday TBD cards (ESPN timeValid false), Houston @ Utah
-- (ESPN vs CBS disagree; uhcougars.com TBA), Kansas State @ Arizona State (ESPN vs CBS disagree).
-- Blank TV and blank Vegas stay null. No scores. No HX writes. No locks language.
-- 54 updates · 7 Vegas · 47 blank Vegas · 7 blank TV · 6 TBD kick.
-- FCS opponents (Sacramento State at Ball State, North Dakota State at New Mexico) are not in the games table.
-- Soft-cal FLAG / PR #46 Scenario Sim untouched.

-- Middle Tennessee @ Florida International · Tue 2026-10-20 18:00 CT · CBSSN · Vegas — · HOLD · ESPN 401871055
update games g
set kickoff_at = timestamptz '2026-10-20 18:00:00-05',
    kickoff_date = date '2026-10-20',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'fiu' and a.slug = 'middle-tennessee'
  and g.week = 8;

-- Missouri State @ Delaware · Tue 2026-10-20 18:00 CT · ESPNU · Vegas — · HOLD · ESPN 401871069
update games g
set kickoff_at = timestamptz '2026-10-20 18:00:00-05',
    kickoff_date = date '2026-10-20',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'delaware' and a.slug = 'missouri-state'
  and g.week = 8;

-- South Alabama @ Marshall · Tue 2026-10-20 18:30 CT · ESPN2 · Vegas — · HOLD · ESPN 401871092
update games g
set kickoff_at = timestamptz '2026-10-20 18:30:00-05',
    kickoff_date = date '2026-10-20',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'marshall' and a.slug = 'south-alabama'
  and g.week = 8;

-- New Mexico State @ Sam Houston · Wed 2026-10-21 19:00 CT · ESPN2 · Vegas — · HOLD · ESPN 401871070
update games g
set kickoff_at = timestamptz '2026-10-21 19:00:00-05',
    kickoff_date = date '2026-10-21',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'sam-houston' and a.slug = 'new-mexico-state'
  and g.week = 8;

-- James Madison @ App State · Thu 2026-10-22 18:00 CT · ESPNU · Vegas — · HOLD · ESPN 401869845
update games g
set kickoff_at = timestamptz '2026-10-22 18:00:00-05',
    kickoff_date = date '2026-10-22',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'app-state' and a.slug = 'james-madison'
  and g.week = 8;

-- Liberty @ Kennesaw State · Thu 2026-10-22 18:00 CT · CBSSN · Vegas — · HOLD · ESPN 401871056
update games g
set kickoff_at = timestamptz '2026-10-22 18:00:00-05',
    kickoff_date = date '2026-10-22',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'kennesaw-state' and a.slug = 'liberty'
  and g.week = 8;

-- East Carolina @ Memphis · Thu 2026-10-22 18:30 CT · ESPN2 · MEM -9.5 / O/U 53.5 · CLEAR · ESPN 401862807
update games g
set kickoff_at = timestamptz '2026-10-22 18:30:00-05',
    kickoff_date = date '2026-10-22',
    tv = 'ESPN2',
    vegas_spread = 9.5,
    vegas_total = 53.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'memphis' and a.slug = 'east-carolina'
  and g.week = 8;

-- Duke @ Virginia · Fri 2026-10-23 18:00 CT · ESPN · Vegas — · HOLD · ESPN 401858271
update games g
set kickoff_at = timestamptz '2026-10-23 18:00:00-05',
    kickoff_date = date '2026-10-23',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'virginia' and a.slug = 'duke'
  and g.week = 8;

-- Massachusetts @ UConn · Fri 2026-10-23 18:00 CT · CBSSN · CONN -16.5 / O/U 47.5 · CLEAR · ESPN 401861965
update games g
set kickoff_at = timestamptz '2026-10-23 18:00:00-05',
    kickoff_date = date '2026-10-23',
    tv = 'CBSSN',
    vegas_spread = 16.5,
    vegas_total = 47.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'uconn' and a.slug = 'massachusetts'
  and g.week = 8;

-- Army @ Tulsa · Fri 2026-10-23 19:30 CT · ESPN2 · Vegas — · HOLD · ESPN 401862808
update games g
set kickoff_at = timestamptz '2026-10-23 19:30:00-05',
    kickoff_date = date '2026-10-23',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'tulsa' and a.slug = 'army'
  and g.week = 8;

-- Air Force @ Wyoming · Fri 2026-10-23 20:00 CT · CW · Vegas — · HOLD · ESPN 401864525
update games g
set kickoff_at = timestamptz '2026-10-23 20:00:00-05',
    kickoff_date = date '2026-10-23',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'wyoming' and a.slug = 'air-force'
  and g.week = 8;

-- NC State @ Stanford · Fri 2026-10-23 21:30 CT · ESPN · Vegas — · HOLD · ESPN 401858272
update games g
set kickoff_at = timestamptz '2026-10-23 21:30:00-05',
    kickoff_date = date '2026-10-23',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'stanford' and a.slug = 'nc-state'
  and g.week = 8;

-- LSU @ Auburn · Sat 2026-10-24 11:00 CT · ABC · Vegas — · HOLD · ESPN 401856728
update games g
set kickoff_at = timestamptz '2026-10-24 11:00:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'ABC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'auburn' and a.slug = 'lsu'
  and g.week = 8;

-- West Virginia @ TCU · Sat 2026-10-24 11:00 CT · ESPN2 · Vegas — · HOLD · ESPN 401856841
update games g
set kickoff_at = timestamptz '2026-10-24 11:00:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'tcu' and a.slug = 'west-virginia'
  and g.week = 8;

-- California @ SMU · Sat 2026-10-24 11:00 CT · CW · Vegas — · HOLD · ESPN 401858270
update games g
set kickoff_at = timestamptz '2026-10-24 11:00:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'smu' and a.slug = 'california'
  and g.week = 8;

-- Pittsburgh @ Miami · Sat 2026-10-24 11:00 CT · ESPN · Vegas — · HOLD · ESPN 401858274
update games g
set kickoff_at = timestamptz '2026-10-24 11:00:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'miami' and a.slug = 'pittsburgh'
  and g.week = 8;

-- Indiana @ Michigan · Sat 2026-10-24 11:00 CT · FOX · Vegas — · HOLD · ESPN 401858496
update games g
set kickoff_at = timestamptz '2026-10-24 11:00:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'FOX',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'michigan' and a.slug = 'indiana'
  and g.week = 8;

-- Rutgers @ Northwestern · Sat 2026-10-24 11:00 CT · Peacock · Vegas — · HOLD · ESPN 401858498
update games g
set kickoff_at = timestamptz '2026-10-24 11:00:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'Peacock',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'northwestern' and a.slug = 'rutgers'
  and g.week = 8;

-- Rice @ Florida Atlantic · Sat 2026-10-24 11:00 CT · ESPNU · Vegas — · HOLD · ESPN 401862809
update games g
set kickoff_at = timestamptz '2026-10-24 11:00:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'florida-atlantic' and a.slug = 'rice'
  and g.week = 8;

-- Western Michigan @ Toledo · Sat 2026-10-24 11:00 CT · CBSSN · Vegas — · HOLD · ESPN 401866450
update games g
set kickoff_at = timestamptz '2026-10-24 11:00:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'toledo' and a.slug = 'western-michigan'
  and g.week = 8;

-- Akron @ Kent State · Sat 2026-10-24 12:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401866446
update games g
set kickoff_at = timestamptz '2026-10-24 12:00:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'kent-state' and a.slug = 'akron'
  and g.week = 8;

-- Miami (OH) @ Central Michigan · Sat 2026-10-24 12:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401866476
update games g
set kickoff_at = timestamptz '2026-10-24 12:00:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'central-michigan' and a.slug = 'miami-oh'
  and g.week = 8;

-- Oregon @ Illinois · Sat 2026-10-24 14:00 CT · BTN · Vegas — · HOLD · ESPN 401858495
update games g
set kickoff_at = timestamptz '2026-10-24 14:00:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'BTN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'illinois' and a.slug = 'oregon'
  and g.week = 8;

-- Texas A&M @ Alabama · Sat 2026-10-24 14:30 CT · ABC · Vegas — · HOLD · ESPN 401856727
update games g
set kickoff_at = timestamptz '2026-10-24 14:30:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'ABC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'alabama' and a.slug = 'texas-am'
  and g.week = 8;

-- Oklahoma @ Mississippi State · Sat 2026-10-24 14:30 CT · SEC Network · Vegas — · HOLD · ESPN 401856730
update games g
set kickoff_at = timestamptz '2026-10-24 14:30:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'SEC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'mississippi-state' and a.slug = 'oklahoma'
  and g.week = 8;

-- Tennessee @ South Carolina · Sat 2026-10-24 14:30 CT · ESPN · Vegas — · HOLD · ESPN 401856731
update games g
set kickoff_at = timestamptz '2026-10-24 14:30:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'south-carolina' and a.slug = 'tennessee'
  and g.week = 8;

-- Boston College @ Georgia Tech · Sat 2026-10-24 14:30 CT · ACC Network · Vegas — · HOLD · ESPN 401858273
update games g
set kickoff_at = timestamptz '2026-10-24 14:30:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'ACC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'georgia-tech' and a.slug = 'boston-college'
  and g.week = 8;

-- Iowa @ Minnesota · Sat 2026-10-24 14:30 CT · FS1 · IOWA -5.5 / O/U 41.5 · CLEAR · ESPN 401858497
update games g
set kickoff_at = timestamptz '2026-10-24 14:30:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'FS1',
    vegas_spread = -5.5,
    vegas_total = 41.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'minnesota' and a.slug = 'iowa'
  and g.week = 8;

-- Michigan State @ UCLA · Sat 2026-10-24 14:30 CT · TV — · UCLA -13.5 / O/U 47.5 · HOLD · ESPN 401858499
update games g
set kickoff_at = timestamptz '2026-10-24 14:30:00-05',
    kickoff_date = date '2026-10-24',
    tv = null,
    vegas_spread = 13.5,
    vegas_total = 47.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ucla' and a.slug = 'michigan-state'
  and g.week = 8;

-- North Texas @ Navy · Sat 2026-10-24 14:30 CT · CBSSN · Vegas — · HOLD · ESPN 401862810
update games g
set kickoff_at = timestamptz '2026-10-24 14:30:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'navy' and a.slug = 'north-texas'
  and g.week = 8;

-- Hawaiʻi @ Northern Illinois · Sat 2026-10-24 14:30 CT · MW+ · Vegas — · HOLD · ESPN 401864526
update games g
set kickoff_at = timestamptz '2026-10-24 14:30:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'MW+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'northern-illinois' and a.slug = 'hawaii'
  and g.week = 8;

-- Bowling Green @ Buffalo · Sat 2026-10-24 14:30 CT · ESPN+ · Vegas — · HOLD · ESPN 401866448
update games g
set kickoff_at = timestamptz '2026-10-24 14:30:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'buffalo' and a.slug = 'bowling-green'
  and g.week = 8;

-- Eastern Michigan @ Ohio · Sat 2026-10-24 15:00 CT · ESPNU · Vegas — · HOLD · ESPN 401866449
update games g
set kickoff_at = timestamptz '2026-10-24 15:00:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ohio' and a.slug = 'eastern-michigan'
  and g.week = 8;

-- UL Monroe @ Troy · Sat 2026-10-24 15:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401871094
update games g
set kickoff_at = timestamptz '2026-10-24 15:00:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'troy' and a.slug = 'ul-monroe'
  and g.week = 8;

-- San José State @ Nevada · Sat 2026-10-24 16:00 CT · MW+ · Vegas — · HOLD · ESPN 401864528
update games g
set kickoff_at = timestamptz '2026-10-24 16:00:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'MW+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'nevada' and a.slug = 'san-jose-state'
  and g.week = 8;

-- Louisiana @ Southern Miss · Sat 2026-10-24 16:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401869967
update games g
set kickoff_at = timestamptz '2026-10-24 16:00:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'southern-miss' and a.slug = 'louisiana'
  and g.week = 8;

-- Old Dominion @ Louisiana Tech · Sat 2026-10-24 16:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401871093
update games g
set kickoff_at = timestamptz '2026-10-24 16:00:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'louisiana-tech' and a.slug = 'old-dominion'
  and g.week = 8;

-- Boise State @ Washington State · Sat 2026-10-24 17:00 CT · USA Net · Vegas — · HOLD · ESPN 401860907
update games g
set kickoff_at = timestamptz '2026-10-24 17:00:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'USA Net',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'washington-state' and a.slug = 'boise-state'
  and g.week = 8;

-- San Diego State @ Colorado State · Sat 2026-10-24 17:30 CT · CW · Vegas — · HOLD · ESPN 401860905
update games g
set kickoff_at = timestamptz '2026-10-24 17:30:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'colorado-state' and a.slug = 'san-diego-state'
  and g.week = 8;

-- Virginia Tech @ Clemson · Sat 2026-10-24 18:00 CT · ESPN · VT -1.5 / O/U 49.5 · CLEAR · ESPN 401858276
update games g
set kickoff_at = timestamptz '2026-10-24 18:00:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'ESPN',
    vegas_spread = -1.5,
    vegas_total = 49.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'clemson' and a.slug = 'virginia-tech'
  and g.week = 8;

-- Georgia State @ Arkansas State · Sat 2026-10-24 18:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401869935
update games g
set kickoff_at = timestamptz '2026-10-24 18:00:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'arkansas-state' and a.slug = 'georgia-state'
  and g.week = 8;

-- Vanderbilt @ Kentucky · Sat 2026-10-24 18:30 CT · SEC Network · UK -11.5 / O/U 51.5 · CLEAR · ESPN 401856729
update games g
set kickoff_at = timestamptz '2026-10-24 18:30:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'SEC Network',
    vegas_spread = 11.5,
    vegas_total = 51.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'kentucky' and a.slug = 'vanderbilt'
  and g.week = 8;

-- Ole Miss @ Texas · Sat 2026-10-24 18:30 CT · ABC · Vegas — · HOLD · ESPN 401856732
update games g
set kickoff_at = timestamptz '2026-10-24 18:30:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'ABC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'texas' and a.slug = 'ole-miss'
  and g.week = 8;

-- Iowa State @ Arizona · Sat 2026-10-24 18:30 CT · ESPN2 · ARIZ -10 / O/U 50.5 · CLEAR · ESPN 401856838
update games g
set kickoff_at = timestamptz '2026-10-24 18:30:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'ESPN2',
    vegas_spread = 10,
    vegas_total = 50.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'arizona' and a.slug = 'iowa-state'
  and g.week = 8;

-- Syracuse @ North Carolina · Sat 2026-10-24 18:30 CT · ACC Network · Vegas — · HOLD · ESPN 401858275
update games g
set kickoff_at = timestamptz '2026-10-24 18:30:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'ACC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'north-carolina' and a.slug = 'syracuse'
  and g.week = 8;

-- USC @ Wisconsin · Sat 2026-10-24 18:30 CT · NBC · Vegas — · HOLD · ESPN 401858500
update games g
set kickoff_at = timestamptz '2026-10-24 18:30:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'NBC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'wisconsin' and a.slug = 'usc'
  and g.week = 8;

-- Utah State @ Texas State · Sat 2026-10-24 18:30 CT · CBSSN · Vegas — · HOLD · ESPN 401860906
update games g
set kickoff_at = timestamptz '2026-10-24 18:30:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'texas-state' and a.slug = 'utah-state'
  and g.week = 8;

-- UTSA @ Tulane · Sat 2026-10-24 19:00 CT · ESPNU · Vegas — · HOLD · ESPN 401862811
update games g
set kickoff_at = timestamptz '2026-10-24 19:00:00-05',
    kickoff_date = date '2026-10-24',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'tulane' and a.slug = 'utsa'
  and g.week = 8;

-- Baylor @ Kansas · kick TBD (HOLD) · TV — · Vegas — · HOLD · ESPN 401856834
update games g
set vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'kansas' and a.slug = 'baylor'
  and g.week = 8;

-- BYU @ UCF · kick TBD (HOLD) · TV — · Vegas — · HOLD · ESPN 401856835
update games g
set vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ucf' and a.slug = 'byu'
  and g.week = 8;

-- Colorado @ Oklahoma State · kick TBD (HOLD) · TV — · Vegas — · HOLD · ESPN 401856836
update games g
set vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'oklahoma-state' and a.slug = 'colorado'
  and g.week = 8;

-- Houston @ Utah · kick TBD (HOLD) · TV — · Vegas — · HOLD · ESPN 401856837
update games g
set vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'utah' and a.slug = 'houston'
  and g.week = 8;

-- Kansas State @ Arizona State · kick TBD (HOLD) · TV — · Vegas — · HOLD · ESPN 401856839
update games g
set vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'arizona-state' and a.slug = 'kansas-state'
  and g.week = 8;

-- Texas Tech @ Cincinnati · kick TBD (HOLD) · TV — · Vegas — · HOLD · ESPN 401856840
update games g
set vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'cincinnati' and a.slug = 'texas-tech'
  and g.week = 8;
