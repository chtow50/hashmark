-- Week 10 FBS–FBS kick / TV / Vegas (Sunday Board + Tape ship, 2026-11-01 ~10:30 AM CT).
-- Pack: data/week10_fbs_fbs_kick_tv_vegas_2026.json.
-- Kick = ESPN scoreboard America/Chicago civil time, cross-checked against the CBS Sports
-- odds board (ET). Kicks are CST (UTC-6; DST ended Nov 1). TV = ESPN broadcast.
-- Match by home/away slug + week=10.
-- Vegas only when the ESPN DraftKings spread AND total equal the CBS Sports listing
-- exactly on both sides; otherwise null. SQL stores the board convention: positive = home favored.
-- Blank TV and blank Vegas stay null. No scores. No HX writes. No locks language.
-- 61 updates · 5 Vegas · 56 blank Vegas · 3 blank TV · 3 TBD kick.
-- FCS opponents (Toledo @ Sacramento State; Merrimack @ Wake Forest) are not in the games table.
-- Soft-cal FLAG / PR #46 Scenario Sim untouched.

-- Ohio @ Akron · Tue 2026-11-03 18:00 CT · ESPN2 · Vegas — · HOLD · ESPN 401866453
update games g
set kickoff_at = timestamptz '2026-11-03 18:00:00-06',
    kickoff_date = date '2026-11-03',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'akron' and a.slug = 'ohio'
  and g.week = 10;

-- Buffalo @ Miami (OH) · Tue 2026-11-03 19:00 CT · ESPN · Vegas — · HOLD · ESPN 401866454
update games g
set kickoff_at = timestamptz '2026-11-03 19:00:00-06',
    kickoff_date = date '2026-11-03',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'miami-oh' and a.slug = 'buffalo'
  and g.week = 10;

-- Ball State @ Massachusetts · Wed 2026-11-04 18:00 CT · ESPNU · Vegas — · HOLD · ESPN 401866455
update games g
set kickoff_at = timestamptz '2026-11-04 18:00:00-06',
    kickoff_date = date '2026-11-04',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'massachusetts' and a.slug = 'ball-state'
  and g.week = 10;

-- Central Michigan @ Eastern Michigan · Wed 2026-11-04 18:30 CT · ESPN2 · Vegas — · HOLD · ESPN 401866456
update games g
set kickoff_at = timestamptz '2026-11-04 18:30:00-06',
    kickoff_date = date '2026-11-04',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'eastern-michigan' and a.slug = 'central-michigan'
  and g.week = 10;

-- UTSA @ Florida Atlantic · Thu 2026-11-05 18:30 CT · ESPN · Vegas — · HOLD · ESPN 401862817
update games g
set kickoff_at = timestamptz '2026-11-05 18:30:00-06',
    kickoff_date = date '2026-11-05',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'florida-atlantic' and a.slug = 'utsa'
  and g.week = 10;

-- James Madison @ Southern Miss · Thu 2026-11-05 19:00 CT · ESPN2 · Vegas — · HOLD · ESPN 401869964
update games g
set kickoff_at = timestamptz '2026-11-05 19:00:00-06',
    kickoff_date = date '2026-11-05',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'southern-miss' and a.slug = 'james-madison'
  and g.week = 10;

-- Virginia Tech @ SMU · Fri 2026-11-06 18:00 CT · ESPN · Vegas — · HOLD · ESPN 401858288
update games g
set kickoff_at = timestamptz '2026-11-06 18:00:00-06',
    kickoff_date = date '2026-11-06',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'smu' and a.slug = 'virginia-tech'
  and g.week = 10;

-- South Florida @ East Carolina · Fri 2026-11-06 18:30 CT · ESPN2 · USF -1.5 / O/U 45.5 · CLEAR · ESPN 401862818
update games g
set kickoff_at = timestamptz '2026-11-06 18:30:00-06',
    kickoff_date = date '2026-11-06',
    tv = 'ESPN2',
    vegas_spread = -1.5,
    vegas_total = 45.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'east-carolina' and a.slug = 'usf'
  and g.week = 10;

-- Nebraska @ Illinois · Fri 2026-11-06 19:00 CT · FOX · Vegas — · HOLD · ESPN 401858510
update games g
set kickoff_at = timestamptz '2026-11-06 19:00:00-06',
    kickoff_date = date '2026-11-06',
    tv = 'FOX',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'illinois' and a.slug = 'nebraska'
  and g.week = 10;

-- New Mexico @ Nevada · Fri 2026-11-06 20:00 CT · CBSSN · Vegas — · HOLD · ESPN 401864533
update games g
set kickoff_at = timestamptz '2026-11-06 20:00:00-06',
    kickoff_date = date '2026-11-06',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'nevada' and a.slug = 'new-mexico'
  and g.week = 10;

-- TCU @ Arizona · Fri 2026-11-06 21:15 CT · ESPN · Vegas — · HOLD · ESPN 401856855
update games g
set kickoff_at = timestamptz '2026-11-06 21:15:00-06',
    kickoff_date = date '2026-11-06',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'arizona' and a.slug = 'tcu'
  and g.week = 10;

-- Texas @ Missouri · Sat 2026-11-07 11:00 CT · ESPN · Vegas — · HOLD · ESPN 401856743
update games g
set kickoff_at = timestamptz '2026-11-07 11:00:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'missouri' and a.slug = 'texas'
  and g.week = 10;

-- BYU @ Utah · Sat 2026-11-07 11:00 CT · ABC · Vegas — · HOLD · ESPN 401856849
update games g
set kickoff_at = timestamptz '2026-11-07 11:00:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ABC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'utah' and a.slug = 'byu'
  and g.week = 10;

-- Clemson @ Syracuse · Sat 2026-11-07 11:00 CT · ESPN2 · Vegas — · HOLD · ESPN 401858285
update games g
set kickoff_at = timestamptz '2026-11-07 11:00:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'syracuse' and a.slug = 'clemson'
  and g.week = 10;

-- Florida State @ Boston College · Sat 2026-11-07 11:00 CT · ACC Network · Vegas — · HOLD · ESPN 401858289
update games g
set kickoff_at = timestamptz '2026-11-07 11:00:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ACC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'boston-college' and a.slug = 'florida-state'
  and g.week = 10;

-- North Carolina @ UConn · Sat 2026-11-07 11:00 CT · CBSSN · Vegas — · HOLD · ESPN 401858292
update games g
set kickoff_at = timestamptz '2026-11-07 11:00:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'uconn' and a.slug = 'north-carolina'
  and g.week = 10;

-- UCLA @ Minnesota · Sat 2026-11-07 11:00 CT · FOX · Vegas — · HOLD · ESPN 401858512
update games g
set kickoff_at = timestamptz '2026-11-07 11:00:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'FOX',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'minnesota' and a.slug = 'ucla'
  and g.week = 10;

-- Tulsa @ Tulane · Sat 2026-11-07 11:00 CT · ESPNU · Vegas — · HOLD · ESPN 401862822
update games g
set kickoff_at = timestamptz '2026-11-07 11:00:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'tulane' and a.slug = 'tulsa'
  and g.week = 10;

-- Duke @ NC State · Sat 2026-11-07 11:30 CT · CW · Vegas — · HOLD · ESPN 401858286
update games g
set kickoff_at = timestamptz '2026-11-07 11:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'nc-state' and a.slug = 'duke'
  and g.week = 10;

-- Maryland @ Purdue · Sat 2026-11-07 11:30 CT · BTN · Vegas — · HOLD · ESPN 401858515
update games g
set kickoff_at = timestamptz '2026-11-07 11:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'BTN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'purdue' and a.slug = 'maryland'
  and g.week = 10;

-- Arkansas @ Auburn · Sat 2026-11-07 11:45 CT · SEC Network · Vegas — · HOLD · ESPN 401856738
update games g
set kickoff_at = timestamptz '2026-11-07 11:45:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'SEC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'auburn' and a.slug = 'arkansas'
  and g.week = 10;

-- Old Dominion @ Coastal Carolina · Sat 2026-11-07 12:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401869945
update games g
set kickoff_at = timestamptz '2026-11-07 12:00:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'coastal-carolina' and a.slug = 'old-dominion'
  and g.week = 10;

-- Georgia State @ App State · Sat 2026-11-07 13:30 CT · ESPN+ · APP -3.5 / O/U 57.5 · CLEAR · ESPN 401869927
update games g
set kickoff_at = timestamptz '2026-11-07 13:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ESPN+',
    vegas_spread = 3.5,
    vegas_total = 57.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'app-state' and a.slug = 'georgia-state'
  and g.week = 10;

-- Texas A&M @ South Carolina · Sat 2026-11-07 14:00 CT · ESPN · Vegas — · HOLD · ESPN 401856744
update games g
set kickoff_at = timestamptz '2026-11-07 14:00:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'south-carolina' and a.slug = 'texas-am'
  and g.week = 10;

-- UL Monroe @ Arkansas State · Sat 2026-11-07 14:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401869936
update games g
set kickoff_at = timestamptz '2026-11-07 14:00:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'arkansas-state' and a.slug = 'ul-monroe'
  and g.week = 10;

-- Delaware @ Kennesaw State · Sat 2026-11-07 14:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401871073
update games g
set kickoff_at = timestamptz '2026-11-07 14:00:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'kennesaw-state' and a.slug = 'delaware'
  and g.week = 10;

-- Alabama @ LSU · Sat 2026-11-07 14:30 CT · ABC · Vegas — · HOLD · ESPN 401856740
update games g
set kickoff_at = timestamptz '2026-11-07 14:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ABC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'lsu' and a.slug = 'alabama'
  and g.week = 10;

-- Oregon @ Ohio State · Sat 2026-11-07 14:30 CT · CBS · Vegas — · HOLD · ESPN 401858514
update games g
set kickoff_at = timestamptz '2026-11-07 14:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'CBS',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ohio-state' and a.slug = 'oregon'
  and g.week = 10;

-- Penn State @ Washington · Sat 2026-11-07 14:30 CT · FS1 · Vegas — · HOLD · ESPN 401858516
update games g
set kickoff_at = timestamptz '2026-11-07 14:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'washington' and a.slug = 'penn-state'
  and g.week = 10;

-- Charlotte @ UAB · Sat 2026-11-07 14:30 CT · ESPN+ · Vegas — · HOLD · ESPN 401862819
update games g
set kickoff_at = timestamptz '2026-11-07 14:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'uab' and a.slug = 'charlotte'
  and g.week = 10;

-- Temple @ Navy · Sat 2026-11-07 14:30 CT · CBSSN · Vegas — · HOLD · ESPN 401862820
update games g
set kickoff_at = timestamptz '2026-11-07 14:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'navy' and a.slug = 'temple'
  and g.week = 10;

-- Marshall @ Georgia Southern · Sat 2026-11-07 14:30 CT · ESPN+ · GASO -8.5 / O/U 53.5 · CLEAR · ESPN 401869951
update games g
set kickoff_at = timestamptz '2026-11-07 14:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ESPN+',
    vegas_spread = 8.5,
    vegas_total = 53.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'georgia-southern' and a.slug = 'marshall'
  and g.week = 10;

-- Western Kentucky @ Middle Tennessee · Sat 2026-11-07 14:30 CT · ESPN+ · Vegas — · HOLD · ESPN 401871076
update games g
set kickoff_at = timestamptz '2026-11-07 14:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'middle-tennessee' and a.slug = 'western-kentucky'
  and g.week = 10;

-- UCF @ Kansas · Sat 2026-11-07 14:45 CT · ESPN2 · Vegas — · HOLD · ESPN 401856850
update games g
set kickoff_at = timestamptz '2026-11-07 14:45:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'kansas' and a.slug = 'ucf'
  and g.week = 10;

-- Rice @ North Texas · Sat 2026-11-07 15:00 CT · ESPNU · Vegas — · HOLD · ESPN 401862821
update games g
set kickoff_at = timestamptz '2026-11-07 15:00:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'north-texas' and a.slug = 'rice'
  and g.week = 10;

-- Northern Illinois @ San José State · Sat 2026-11-07 15:00 CT · MW+ · Vegas — · HOLD · ESPN 401864534
update games g
set kickoff_at = timestamptz '2026-11-07 15:00:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'MW+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'san-jose-state' and a.slug = 'northern-illinois'
  and g.week = 10;

-- Missouri State @ Florida International · Sat 2026-11-07 15:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401871074
update games g
set kickoff_at = timestamptz '2026-11-07 15:00:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'fiu' and a.slug = 'missouri-state'
  and g.week = 10;

-- Louisiana Tech @ Troy · Sat 2026-11-07 15:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401871098
update games g
set kickoff_at = timestamptz '2026-11-07 15:00:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'troy' and a.slug = 'louisiana-tech'
  and g.week = 10;

-- Vanderbilt @ Mississippi State · Sat 2026-11-07 15:15 CT · SEC Network · Vegas — · HOLD · ESPN 401856742
update games g
set kickoff_at = timestamptz '2026-11-07 15:15:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'SEC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'mississippi-state' and a.slug = 'vanderbilt'
  and g.week = 10;

-- Rutgers @ Wisconsin · Sat 2026-11-07 15:15 CT · BTN · Vegas — · HOLD · ESPN 401858517
update games g
set kickoff_at = timestamptz '2026-11-07 15:15:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'BTN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'wisconsin' and a.slug = 'rutgers'
  and g.week = 10;

-- South Alabama @ Louisiana · Sat 2026-11-07 16:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401869968
update games g
set kickoff_at = timestamptz '2026-11-07 16:00:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'louisiana' and a.slug = 'south-alabama'
  and g.week = 10;

-- Boise State @ Colorado State · Sat 2026-11-07 17:00 CT · USA Net · Vegas — · HOLD · ESPN 401860911
update games g
set kickoff_at = timestamptz '2026-11-07 17:00:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'USA Net',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'colorado-state' and a.slug = 'boise-state'
  and g.week = 10;

-- Kentucky @ Tennessee · Sat 2026-11-07 17:15 CT · ESPN · Vegas — · HOLD · ESPN 401856745
update games g
set kickoff_at = timestamptz '2026-11-07 17:15:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'tennessee' and a.slug = 'kentucky'
  and g.week = 10;

-- Sam Houston @ Jacksonville State · Sat 2026-11-07 18:00 CT · CBSSN · Vegas — · HOLD · ESPN 401871075
update games g
set kickoff_at = timestamptz '2026-11-07 18:00:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'jacksonville-state' and a.slug = 'sam-houston'
  and g.week = 10;

-- Georgia @ Ole Miss · Sat 2026-11-07 18:30 CT · ABC · UGA -3 / O/U 56.5 · CLEAR · ESPN 401856741
update games g
set kickoff_at = timestamptz '2026-11-07 18:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ABC',
    vegas_spread = -3,
    vegas_total = 56.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ole-miss' and a.slug = 'georgia'
  and g.week = 10;

-- Colorado @ Arizona State · Sat 2026-11-07 18:30 CT · ESPN2 · Vegas — · HOLD · ESPN 401856852
update games g
set kickoff_at = timestamptz '2026-11-07 18:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'arizona-state' and a.slug = 'colorado'
  and g.week = 10;

-- Louisville @ Georgia Tech · Sat 2026-11-07 18:30 CT · ACC Network · Vegas — · HOLD · ESPN 401858287
update games g
set kickoff_at = timestamptz '2026-11-07 18:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ACC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'georgia-tech' and a.slug = 'louisville'
  and g.week = 10;

-- Miami @ Notre Dame · Sat 2026-11-07 18:30 CT · NBC · Vegas — · HOLD · ESPN 401858291
update games g
set kickoff_at = timestamptz '2026-11-07 18:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'NBC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'notre-dame' and a.slug = 'miami'
  and g.week = 10;

-- Michigan State @ Michigan · Sat 2026-11-07 18:30 CT · Peacock · Vegas — · HOLD · ESPN 401858511
update games g
set kickoff_at = timestamptz '2026-11-07 18:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'Peacock',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'michigan' and a.slug = 'michigan-state'
  and g.week = 10;

-- Iowa @ Northwestern · Sat 2026-11-07 18:30 CT · FOX · NU -1.5 / O/U 42.5 · CLEAR · ESPN 401858513
update games g
set kickoff_at = timestamptz '2026-11-07 18:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'FOX',
    vegas_spread = 1.5,
    vegas_total = 42.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'northwestern' and a.slug = 'iowa'
  and g.week = 10;

-- Air Force @ Army · Sat 2026-11-07 18:30 CT · CBS · Vegas — · HOLD · ESPN 401862823
update games g
set kickoff_at = timestamptz '2026-11-07 18:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'CBS',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'army' and a.slug = 'air-force'
  and g.week = 10;

-- Oklahoma @ Florida · Sat 2026-11-07 18:45 CT · SEC Network · Vegas — · HOLD · ESPN 401856739
update games g
set kickoff_at = timestamptz '2026-11-07 18:45:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'SEC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'florida' and a.slug = 'oklahoma'
  and g.week = 10;

-- Liberty @ New Mexico State · Sat 2026-11-07 19:00 CT · ESPNU · Vegas — · HOLD · ESPN 401870795
update games g
set kickoff_at = timestamptz '2026-11-07 19:00:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'new-mexico-state' and a.slug = 'liberty'
  and g.week = 10;

-- West Virginia @ Texas Tech · Sat 2026-11-07 20:30 CT · ESPN · Vegas — · HOLD · ESPN 401856856
update games g
set kickoff_at = timestamptz '2026-11-07 20:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'texas-tech' and a.slug = 'west-virginia'
  and g.week = 10;

-- Fresno State @ Utah State · Sat 2026-11-07 20:30 CT · USA Net · Vegas — · HOLD · ESPN 401860913
update games g
set kickoff_at = timestamptz '2026-11-07 20:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'USA Net',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'utah-state' and a.slug = 'fresno-state'
  and g.week = 10;

-- Hawaiʻi @ UTEP · Sat 2026-11-07 20:30 CT · FS1 · Vegas — · HOLD · ESPN 401864532
update games g
set kickoff_at = timestamptz '2026-11-07 20:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'utep' and a.slug = 'hawaii'
  and g.week = 10;

-- Texas State @ Oregon State · Sat 2026-11-07 21:30 CT · CW · Vegas — · HOLD · ESPN 401860912
update games g
set kickoff_at = timestamptz '2026-11-07 21:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'oregon-state' and a.slug = 'texas-state'
  and g.week = 10;

-- Wyoming @ UNLV · Sat 2026-11-07 21:30 CT · CBSSN · Vegas — · HOLD · ESPN 401864535
update games g
set kickoff_at = timestamptz '2026-11-07 21:30:00-06',
    kickoff_date = date '2026-11-07',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'unlv' and a.slug = 'wyoming'
  and g.week = 10;

-- Cincinnati @ Houston · kick TBD (HOLD) · TV — · Vegas — · HOLD · ESPN 401856851
update games g
set vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'houston' and a.slug = 'cincinnati'
  and g.week = 10;

-- Iowa State @ Baylor · kick TBD (HOLD) · TV — · Vegas — · HOLD · ESPN 401856853
update games g
set vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'baylor' and a.slug = 'iowa-state'
  and g.week = 10;

-- Oklahoma State @ Kansas State · kick TBD (HOLD) · TV — · Vegas — · HOLD · ESPN 401856854
update games g
set vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'kansas-state' and a.slug = 'oklahoma-state'
  and g.week = 10;
