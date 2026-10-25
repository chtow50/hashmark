-- Week 9 FBS–FBS kick / TV / Vegas (Sunday Board + Tape ship, 2026-10-25 ~10:30 AM CT).
-- Pack: data/week9_fbs_fbs_kick_tv_vegas_2026.json.
-- Kick = ESPN scoreboard America/Chicago civil time, cross-checked against the CBS Sports
-- odds board (ET). TV = ESPN broadcast.
-- Match by home/away slug + week=9.
-- Vegas only when the ESPN DraftKings spread AND total equal the CBS Sports listing
-- exactly on both sides; otherwise null. SQL stores the board convention: positive = home favored.
-- Blank TV and blank Vegas stay null. No scores. No HX writes. No locks language.
-- 54 updates · 6 Vegas · 48 blank Vegas · 0 blank TV · 0 TBD kick.
-- FCS opponents (Kent State @ Sacramento State; UTEP @ North Dakota State) are not in the games table.
-- Soft-cal FLAG / PR #46 Scenario Sim untouched.

-- Delaware @ Western Kentucky · Tue 2026-10-27 18:00 CT · CBSSN · Vegas — · HOLD · ESPN 401871071
update games g
set kickoff_at = timestamptz '2026-10-27 18:00:00-05',
    kickoff_date = date '2026-10-27',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'western-kentucky' and a.slug = 'delaware'
  and g.week = 9;

-- Sam Houston @ Missouri State · Tue 2026-10-27 19:00 CT · ESPN2 · Vegas — · HOLD · ESPN 401871072
update games g
set kickoff_at = timestamptz '2026-10-27 19:00:00-05',
    kickoff_date = date '2026-10-27',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'missouri-state' and a.slug = 'sam-houston'
  and g.week = 9;

-- Kennesaw State @ Middle Tennessee · Wed 2026-10-28 18:00 CT · CBSSN · Vegas — · HOLD · ESPN 401871058
update games g
set kickoff_at = timestamptz '2026-10-28 18:00:00-05',
    kickoff_date = date '2026-10-28',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'middle-tennessee' and a.slug = 'kennesaw-state'
  and g.week = 9;

-- Jacksonville State @ New Mexico State · Wed 2026-10-28 19:00 CT · ESPN2 · Vegas — · HOLD · ESPN 401871057
update games g
set kickoff_at = timestamptz '2026-10-28 19:00:00-05',
    kickoff_date = date '2026-10-28',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'new-mexico-state' and a.slug = 'jacksonville-state'
  and g.week = 9;

-- Florida Atlantic @ North Texas · Thu 2026-10-29 18:30 CT · ESPN · Vegas — · HOLD · ESPN 401862812
update games g
set kickoff_at = timestamptz '2026-10-29 18:30:00-05',
    kickoff_date = date '2026-10-29',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'north-texas' and a.slug = 'florida-atlantic'
  and g.week = 9;

-- Troy @ James Madison · Thu 2026-10-29 18:30 CT · ESPN2 · Vegas — · HOLD · ESPN 401869963
update games g
set kickoff_at = timestamptz '2026-10-29 18:30:00-05',
    kickoff_date = date '2026-10-29',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'james-madison' and a.slug = 'troy'
  and g.week = 9;

-- Tulane @ Charlotte · Fri 2026-10-30 18:00 CT · ESPN2 · Vegas — · HOLD · ESPN 401862813
update games g
set kickoff_at = timestamptz '2026-10-30 18:00:00-05',
    kickoff_date = date '2026-10-30',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'charlotte' and a.slug = 'tulane'
  and g.week = 9;

-- Baylor @ UCF · Fri 2026-10-30 18:30 CT · ESPN · UCF -2.5 / O/U 48.5 · CLEAR · ESPN 401856844
update games g
set kickoff_at = timestamptz '2026-10-30 18:30:00-05',
    kickoff_date = date '2026-10-30',
    tv = 'ESPN',
    vegas_spread = 2.5,
    vegas_total = 48.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ucf' and a.slug = 'baylor'
  and g.week = 9;

-- Arizona @ Texas Tech · Sat 2026-10-31 11:00 CT · ESPN · TTU -4.5 / O/U 55.5 · CLEAR · ESPN 401856842
update games g
set kickoff_at = timestamptz '2026-10-31 11:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'ESPN',
    vegas_spread = 4.5,
    vegas_total = 55.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'texas-tech' and a.slug = 'arizona'
  and g.week = 9;

-- California @ NC State · Sat 2026-10-31 11:00 CT · ACC Network · Vegas — · HOLD · ESPN 401858277
update games g
set kickoff_at = timestamptz '2026-10-31 11:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'ACC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'nc-state' and a.slug = 'california'
  and g.week = 9;

-- SMU @ Syracuse · Sat 2026-10-31 11:00 CT · ESPN2 · Vegas — · HOLD · ESPN 401858278
update games g
set kickoff_at = timestamptz '2026-10-31 11:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'syracuse' and a.slug = 'smu'
  and g.week = 9;

-- Boston College @ Duke · Sat 2026-10-31 11:00 CT · CW · Vegas — · HOLD · ESPN 401858279
update games g
set kickoff_at = timestamptz '2026-10-31 11:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'duke' and a.slug = 'boston-college'
  and g.week = 9;

-- Wisconsin @ Iowa · Sat 2026-10-31 11:00 CT · FOX · Vegas — · HOLD · ESPN 401858502
update games g
set kickoff_at = timestamptz '2026-10-31 11:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'FOX',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'iowa' and a.slug = 'wisconsin'
  and g.week = 9;

-- Illinois @ Maryland · Sat 2026-10-31 11:00 CT · FS1 · Vegas — · HOLD · ESPN 401858503
update games g
set kickoff_at = timestamptz '2026-10-31 11:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'maryland' and a.slug = 'illinois'
  and g.week = 9;

-- Notre Dame @ Navy · Sat 2026-10-31 11:00 CT · ABC · ND -30.5 / O/U 52.5 · CLEAR · ESPN 401859185
update games g
set kickoff_at = timestamptz '2026-10-31 11:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'ABC',
    vegas_spread = -30.5,
    vegas_total = 52.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'navy' and a.slug = 'notre-dame'
  and g.week = 9;

-- UAB @ South Florida · Sat 2026-10-31 11:00 CT · ESPNU · Vegas — · HOLD · ESPN 401862816
update games g
set kickoff_at = timestamptz '2026-10-31 11:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'usf' and a.slug = 'uab'
  and g.week = 9;

-- Bowling Green @ Western Michigan · Sat 2026-10-31 11:00 CT · CBSSN · Vegas — · HOLD · ESPN 401866452
update games g
set kickoff_at = timestamptz '2026-10-31 11:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'western-michigan' and a.slug = 'bowling-green'
  and g.week = 9;

-- Michigan @ Rutgers · Sat 2026-10-31 11:30 CT · BTN · Vegas — · HOLD · ESPN 401858507
update games g
set kickoff_at = timestamptz '2026-10-31 11:30:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'BTN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'rutgers' and a.slug = 'michigan'
  and g.week = 9;

-- Auburn @ Ole Miss · Sat 2026-10-31 11:45 CT · SEC Network · Vegas — · HOLD · ESPN 401856735
update games g
set kickoff_at = timestamptz '2026-10-31 11:45:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'SEC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ole-miss' and a.slug = 'auburn'
  and g.week = 9;

-- Marshall @ Old Dominion · Sat 2026-10-31 12:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401871096
update games g
set kickoff_at = timestamptz '2026-10-31 12:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'old-dominion' and a.slug = 'marshall'
  and g.week = 9;

-- Kansas State @ Colorado · Sat 2026-10-31 13:00 CT · TNT · Vegas — · HOLD · ESPN 401856846
update games g
set kickoff_at = timestamptz '2026-10-31 13:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'TNT',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'colorado' and a.slug = 'kansas-state'
  and g.week = 9;

-- Coastal Carolina @ Georgia State · Sat 2026-10-31 13:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401869944
update games g
set kickoff_at = timestamptz '2026-10-31 13:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'georgia-state' and a.slug = 'coastal-carolina'
  and g.week = 9;

-- UConn @ Air Force · Sat 2026-10-31 14:00 CT · MW+ · Vegas — · HOLD · ESPN 401861966
update games g
set kickoff_at = timestamptz '2026-10-31 14:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'MW+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'air-force' and a.slug = 'uconn'
  and g.week = 9;

-- Temple @ East Carolina · Sat 2026-10-31 14:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401862815
update games g
set kickoff_at = timestamptz '2026-10-31 14:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'east-carolina' and a.slug = 'temple'
  and g.week = 9;

-- Louisiana Tech @ South Alabama · Sat 2026-10-31 14:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401871097
update games g
set kickoff_at = timestamptz '2026-10-31 14:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'south-alabama' and a.slug = 'louisiana-tech'
  and g.week = 9;

-- Stanford @ Louisville · Sat 2026-10-31 14:15 CT · ACC Network · Vegas — · HOLD · ESPN 401858283
update games g
set kickoff_at = timestamptz '2026-10-31 14:15:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'ACC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'louisville' and a.slug = 'stanford'
  and g.week = 9;

-- Florida @ Georgia · Sat 2026-10-31 14:30 CT · ABC · Vegas — · HOLD · ESPN 401856734
update games g
set kickoff_at = timestamptz '2026-10-31 14:30:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'ABC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'georgia' and a.slug = 'florida'
  and g.week = 9;

-- Arizona State @ BYU · Sat 2026-10-31 14:30 CT · FOX · Vegas — · HOLD · ESPN 401856843
update games g
set kickoff_at = timestamptz '2026-10-31 14:30:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'FOX',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'byu' and a.slug = 'arizona-state'
  and g.week = 9;

-- Kansas @ TCU · Sat 2026-10-31 14:30 CT · FS1 · Vegas — · HOLD · ESPN 401856845
update games g
set kickoff_at = timestamptz '2026-10-31 14:30:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'tcu' and a.slug = 'kansas'
  and g.week = 9;

-- Minnesota @ Indiana · Sat 2026-10-31 14:30 CT · CBS · Vegas — · HOLD · ESPN 401858501
update games g
set kickoff_at = timestamptz '2026-10-31 14:30:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'CBS',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'indiana' and a.slug = 'minnesota'
  and g.week = 9;

-- Northwestern @ Oregon · Sat 2026-10-31 14:30 CT · Peacock · Vegas — · HOLD · ESPN 401858505
update games g
set kickoff_at = timestamptz '2026-10-31 14:30:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'Peacock',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'oregon' and a.slug = 'northwestern'
  and g.week = 9;

-- Colorado State @ Utah State · Sat 2026-10-31 14:30 CT · USA Net · Vegas — · HOLD · ESPN 401860910
update games g
set kickoff_at = timestamptz '2026-10-31 14:30:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'USA Net',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'utah-state' and a.slug = 'colorado-state'
  and g.week = 9;

-- Florida International @ Liberty · Sat 2026-10-31 14:30 CT · CBSSN · Vegas — · HOLD · ESPN 401871059
update games g
set kickoff_at = timestamptz '2026-10-31 14:30:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'liberty' and a.slug = 'fiu'
  and g.week = 9;

-- Southern Miss @ UL Monroe · Sat 2026-10-31 14:30 CT · ESPN+ · Vegas — · HOLD · ESPN 401871095
update games g
set kickoff_at = timestamptz '2026-10-31 14:30:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ul-monroe' and a.slug = 'southern-miss'
  and g.week = 9;

-- Utah @ Cincinnati · Sat 2026-10-31 14:45 CT · ESPN · UTAH -6.5 / O/U 55.5 · CLEAR · ESPN 401856848
update games g
set kickoff_at = timestamptz '2026-10-31 14:45:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'ESPN',
    vegas_spread = -6.5,
    vegas_total = 55.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'cincinnati' and a.slug = 'utah'
  and g.week = 9;

-- Virginia @ Wake Forest · Sat 2026-10-31 14:45 CT · ESPN2 · WAKE -13.5 / O/U 49.5 · CLEAR · ESPN 401858284
update games g
set kickoff_at = timestamptz '2026-10-31 14:45:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'ESPN2',
    vegas_spread = 13.5,
    vegas_total = 49.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'wake-forest' and a.slug = 'virginia'
  and g.week = 9;

-- New Mexico @ San José State · Sat 2026-10-31 15:00 CT · MW+ · Vegas — · HOLD · ESPN 401864529
update games g
set kickoff_at = timestamptz '2026-10-31 15:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'MW+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'san-jose-state' and a.slug = 'new-mexico'
  and g.week = 9;

-- South Carolina @ Oklahoma · Sat 2026-10-31 15:15 CT · SEC Network · Vegas — · HOLD · ESPN 401856736
update games g
set kickoff_at = timestamptz '2026-10-31 15:15:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'SEC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'oklahoma' and a.slug = 'south-carolina'
  and g.week = 9;

-- Purdue @ Penn State · Sat 2026-10-31 15:15 CT · BTN · Vegas — · HOLD · ESPN 401858506
update games g
set kickoff_at = timestamptz '2026-10-31 15:15:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'BTN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'penn-state' and a.slug = 'purdue'
  and g.week = 9;

-- Nevada @ UCLA · Sat 2026-10-31 15:15 CT · BTN · Vegas — · HOLD · ESPN 401858508
update games g
set kickoff_at = timestamptz '2026-10-31 15:15:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'BTN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ucla' and a.slug = 'nevada'
  and g.week = 9;

-- App State @ Georgia Southern · Sat 2026-10-31 17:30 CT · ESPN+ · Vegas — · HOLD · ESPN 401869846
update games g
set kickoff_at = timestamptz '2026-10-31 17:30:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'georgia-southern' and a.slug = 'app-state'
  and g.week = 9;

-- Oklahoma State @ Iowa State · Sat 2026-10-31 18:00 CT · FS1 · Vegas — · HOLD · ESPN 401856847
update games g
set kickoff_at = timestamptz '2026-10-31 18:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'iowa-state' and a.slug = 'oklahoma-state'
  and g.week = 9;

-- Clemson @ Florida State · Sat 2026-10-31 18:00 CT · ACC Network · Vegas — · HOLD · ESPN 401858280
update games g
set kickoff_at = timestamptz '2026-10-31 18:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'ACC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'florida-state' and a.slug = 'clemson'
  and g.week = 9;

-- Washington State @ San Diego State · Sat 2026-10-31 18:00 CT · CBSSN · Vegas — · HOLD · ESPN 401860909
update games g
set kickoff_at = timestamptz '2026-10-31 18:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'san-diego-state' and a.slug = 'washington-state'
  and g.week = 9;

-- Mississippi State @ Texas · Sat 2026-10-31 18:30 CT · ESPN · TEX -20.5 / O/U 50.5 · CLEAR · ESPN 401856737
update games g
set kickoff_at = timestamptz '2026-10-31 18:30:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'ESPN',
    vegas_spread = 20.5,
    vegas_total = 50.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'texas' and a.slug = 'mississippi-state'
  and g.week = 9;

-- Georgia Tech @ Pittsburgh · Sat 2026-10-31 18:30 CT · ESPN2 · Vegas — · HOLD · ESPN 401858281
update games g
set kickoff_at = timestamptz '2026-10-31 18:30:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'pittsburgh' and a.slug = 'georgia-tech'
  and g.week = 9;

-- Miami @ North Carolina · Sat 2026-10-31 18:30 CT · ABC · Vegas — · HOLD · ESPN 401858282
update games g
set kickoff_at = timestamptz '2026-10-31 18:30:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'ABC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'north-carolina' and a.slug = 'miami'
  and g.week = 9;

-- Ohio State @ USC · Sat 2026-10-31 18:30 CT · NBC · Vegas — · HOLD · ESPN 401858509
update games g
set kickoff_at = timestamptz '2026-10-31 18:30:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'NBC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'usc' and a.slug = 'ohio-state'
  and g.week = 9;

-- Missouri @ Arkansas · Sat 2026-10-31 18:45 CT · SEC Network · Vegas — · HOLD · ESPN 401856733
update games g
set kickoff_at = timestamptz '2026-10-31 18:45:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'SEC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'arkansas' and a.slug = 'missouri'
  and g.week = 9;

-- Washington @ Nebraska · Sat 2026-10-31 19:00 CT · BTN · Vegas — · HOLD · ESPN 401858504
update games g
set kickoff_at = timestamptz '2026-10-31 19:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'BTN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'nebraska' and a.slug = 'washington'
  and g.week = 9;

-- Army @ Memphis · Sat 2026-10-31 19:00 CT · ESPNU · Vegas — · HOLD · ESPN 401862814
update games g
set kickoff_at = timestamptz '2026-10-31 19:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'memphis' and a.slug = 'army'
  and g.week = 9;

-- Texas State @ Boise State · Sat 2026-10-31 21:00 CT · CW · Vegas — · HOLD · ESPN 401860908
update games g
set kickoff_at = timestamptz '2026-10-31 21:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'boise-state' and a.slug = 'texas-state'
  and g.week = 9;

-- Northern Illinois @ UNLV · Sat 2026-10-31 21:30 CT · CBSSN · Vegas — · HOLD · ESPN 401864530
update games g
set kickoff_at = timestamptz '2026-10-31 21:30:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'unlv' and a.slug = 'northern-illinois'
  and g.week = 9;

-- Oregon State @ Fresno State · Sat 2026-10-31 22:00 CT · USA Net · Vegas — · HOLD · ESPN 401860924
update games g
set kickoff_at = timestamptz '2026-10-31 22:00:00-05',
    kickoff_date = date '2026-10-31',
    tv = 'USA Net',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'fresno-state' and a.slug = 'oregon-state'
  and g.week = 9;
