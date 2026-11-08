-- Week 11 FBS–FBS kick / TV / Vegas (Sunday Board + Tape ship, 2026-11-08 ~10:30 AM CT).
-- Pack: data/week11_fbs_fbs_kick_tv_vegas_2026.json.
-- Kick = ESPN scoreboard America/Chicago civil time, cross-checked against the CBS Sports
-- odds board (ET). Kicks are CST (UTC-6; DST ended Nov 1). TV = ESPN broadcast.
-- Match by home/away slug + week=11.
-- Vegas only when the ESPN DraftKings spread AND total equal the CBS Sports listing
-- exactly on both sides; otherwise null. SQL stores the board convention: positive = home favored.
-- Blank TV and blank Vegas stay null. No scores. No HX writes. No locks language.
-- 65 updates · 28 Vegas · 37 blank Vegas · 17 blank TV · 14 TBD kick.
-- FCS opponents (401866462 Sacramento State @ Central Michigan; 401864537 North Dakota State @ Hawai'i) are not in the games table.
-- Soft-cal FLAG / PR #46 Scenario Sim untouched.

-- Western Michigan @ Akron · Tue 2026-11-10 18:00 CT · CBSSN · Vegas — · HOLD · ESPN 401866458
update games g
set kickoff_at = timestamptz '2026-11-10 18:00:00-06',
    kickoff_date = date '2026-11-10',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'akron' and a.slug = 'western-michigan'
  and g.week = 11;

-- Kent State @ Bowling Green · Tue 2026-11-10 18:00 CT · ESPNU · Vegas — · HOLD · ESPN 401866459
update games g
set kickoff_at = timestamptz '2026-11-10 18:00:00-06',
    kickoff_date = date '2026-11-10',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'bowling-green' and a.slug = 'kent-state'
  and g.week = 11;

-- Ohio @ Miami (OH) · Tue 2026-11-10 19:00 CT · ESPN2 · Vegas — · HOLD · ESPN 401866460
update games g
set kickoff_at = timestamptz '2026-11-10 19:00:00-06',
    kickoff_date = date '2026-11-10',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'miami-oh' and a.slug = 'ohio'
  and g.week = 11;

-- Buffalo @ Ball State · Wed 2026-11-11 18:30 CT · ESPN2 · Vegas — · HOLD · ESPN 401866461
update games g
set kickoff_at = timestamptz '2026-11-11 18:30:00-06',
    kickoff_date = date '2026-11-11',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ball-state' and a.slug = 'buffalo'
  and g.week = 11;

-- Massachusetts @ Toledo · Wed 2026-11-11 18:30 CT · TV — · Vegas — · HOLD · ESPN 401866463
update games g
set kickoff_at = timestamptz '2026-11-11 18:30:00-06',
    kickoff_date = date '2026-11-11',
    tv = null,
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'toledo' and a.slug = 'massachusetts'
  and g.week = 11;

-- Memphis @ South Florida · Thu 2026-11-12 19:00 CT · ESPN · Vegas — · HOLD · ESPN 401862824
update games g
set kickoff_at = timestamptz '2026-11-12 19:00:00-06',
    kickoff_date = date '2026-11-12',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'usf' and a.slug = 'memphis'
  and g.week = 11;

-- Louisiana @ UL Monroe · Thu 2026-11-12 20:00 CT · ESPN2 · Vegas — · HOLD · ESPN 401869969
update games g
set kickoff_at = timestamptz '2026-11-12 20:00:00-06',
    kickoff_date = date '2026-11-12',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ul-monroe' and a.slug = 'louisiana'
  and g.week = 11;

-- Florida State @ Pittsburgh · Fri 2026-11-13 18:00 CT · ESPN · Vegas — · HOLD · ESPN 401858293
update games g
set kickoff_at = timestamptz '2026-11-13 18:00:00-06',
    kickoff_date = date '2026-11-13',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'pittsburgh' and a.slug = 'florida-state'
  and g.week = 11;

-- Illinois @ UCLA · Fri 2026-11-13 20:00 CT · FOX · Vegas — · HOLD · ESPN 401858526
update games g
set kickoff_at = timestamptz '2026-11-13 20:00:00-06',
    kickoff_date = date '2026-11-13',
    tv = 'FOX',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ucla' and a.slug = 'illinois'
  and g.week = 11;

-- Houston @ Colorado · Fri 2026-11-13 21:15 CT · ESPN · Vegas — · HOLD · ESPN 401856860
update games g
set kickoff_at = timestamptz '2026-11-13 21:15:00-06',
    kickoff_date = date '2026-11-13',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'colorado' and a.slug = 'houston'
  and g.week = 11;

-- Auburn @ Mississippi State · Sat 2026-11-14 11:00 CT · TV — · Vegas — · HOLD · ESPN 401856886
update games g
set kickoff_at = timestamptz '2026-11-14 11:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = null,
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'mississippi-state' and a.slug = 'auburn'
  and g.week = 11;

-- Duke @ Miami · Sat 2026-11-14 11:00 CT · ABC · Vegas — · HOLD · ESPN 401858296
update games g
set kickoff_at = timestamptz '2026-11-14 11:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'ABC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'miami' and a.slug = 'duke'
  and g.week = 11;

-- Syracuse @ NC State · Sat 2026-11-14 11:00 CT · ACC Network · Vegas — · HOLD · ESPN 401858300
update games g
set kickoff_at = timestamptz '2026-11-14 11:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'ACC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'nc-state' and a.slug = 'syracuse'
  and g.week = 11;

-- Wake Forest @ SMU · Sat 2026-11-14 11:00 CT · TV — · Vegas — · HOLD · ESPN 401858301
update games g
set kickoff_at = timestamptz '2026-11-14 11:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = null,
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'smu' and a.slug = 'wake-forest'
  and g.week = 11;

-- Wisconsin @ Maryland · Sat 2026-11-14 11:00 CT · FS1 · Vegas — · HOLD · ESPN 401858520
update games g
set kickoff_at = timestamptz '2026-11-14 11:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'maryland' and a.slug = 'wisconsin'
  and g.week = 11;

-- Northwestern @ Ohio State · Sat 2026-11-14 11:00 CT · FOX · OSU -10.5 / O/U 47.5 · CLEAR · ESPN 401858522
update games g
set kickoff_at = timestamptz '2026-11-14 11:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'FOX',
    vegas_spread = 10.5,
    vegas_total = 47.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ohio-state' and a.slug = 'northwestern'
  and g.week = 11;

-- James Madison @ UConn · Sat 2026-11-14 11:00 CT · CBSSN · Vegas — · HOLD · ESPN 401861967
update games g
set kickoff_at = timestamptz '2026-11-14 11:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'uconn' and a.slug = 'james-madison'
  and g.week = 11;

-- Georgia Tech @ Clemson · Sat 2026-11-14 11:30 CT · CW · Vegas — · HOLD · ESPN 401858297
update games g
set kickoff_at = timestamptz '2026-11-14 11:30:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'clemson' and a.slug = 'georgia-tech'
  and g.week = 11;

-- Nebraska @ Rutgers · Sat 2026-11-14 11:30 CT · BTN · Vegas — · HOLD · ESPN 401858525
update games g
set kickoff_at = timestamptz '2026-11-14 11:30:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'BTN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'rutgers' and a.slug = 'nebraska'
  and g.week = 11;

-- Alabama @ Vanderbilt · Sat 2026-11-14 11:45 CT · SEC Network · ALA -19.5 / O/U 54.5 · CLEAR · ESPN 401856889
update games g
set kickoff_at = timestamptz '2026-11-14 11:45:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'SEC Network',
    vegas_spread = -19.5,
    vegas_total = 54.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'vanderbilt' and a.slug = 'alabama'
  and g.week = 11;

-- East Carolina @ Charlotte · Sat 2026-11-14 12:00 CT · ESPN+ · ECU -11.5 / O/U 45.5 · CLEAR · ESPN 401862825
update games g
set kickoff_at = timestamptz '2026-11-14 12:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'ESPN+',
    vegas_spread = -11.5,
    vegas_total = 45.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'charlotte' and a.slug = 'east-carolina'
  and g.week = 11;

-- UAB @ Temple · Sat 2026-11-14 12:00 CT · ESPN+ · TEM -2.5 / O/U 51.5 · CLEAR · ESPN 401862829
update games g
set kickoff_at = timestamptz '2026-11-14 12:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'ESPN+',
    vegas_spread = 2.5,
    vegas_total = 51.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'temple' and a.slug = 'uab'
  and g.week = 11;

-- Arkansas State @ Coastal Carolina · Sat 2026-11-14 12:00 CT · ESPN+ · CCU -1.5 / O/U 50.5 · CLEAR · ESPN 401869937
update games g
set kickoff_at = timestamptz '2026-11-14 12:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'ESPN+',
    vegas_spread = 1.5,
    vegas_total = 50.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'coastal-carolina' and a.slug = 'arkansas-state'
  and g.week = 11;

-- Tulane @ Rice · Sat 2026-11-14 13:00 CT · ESPN+ · RICE -1.5 / O/U 46.5 · CLEAR · ESPN 401862828
update games g
set kickoff_at = timestamptz '2026-11-14 13:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'ESPN+',
    vegas_spread = 1.5,
    vegas_total = 46.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'rice' and a.slug = 'tulane'
  and g.week = 11;

-- Kennesaw State @ Sam Houston · Sat 2026-11-14 13:00 CT · ESPN+ · KENN -7.5 / O/U 44.5 · CLEAR · ESPN 401870769
update games g
set kickoff_at = timestamptz '2026-11-14 13:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'ESPN+',
    vegas_spread = -7.5,
    vegas_total = 44.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'sam-houston' and a.slug = 'kennesaw-state'
  and g.week = 11;

-- New Mexico State @ Missouri State · Sat 2026-11-14 14:00 CT · ESPN+ · MOST -1.5 / O/U 50.5 · CLEAR · ESPN 401870796
update games g
set kickoff_at = timestamptz '2026-11-14 14:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'ESPN+',
    vegas_spread = 1.5,
    vegas_total = 50.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'missouri-state' and a.slug = 'new-mexico-state'
  and g.week = 11;

-- Florida International @ Delaware · Sat 2026-11-14 14:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401871060
update games g
set kickoff_at = timestamptz '2026-11-14 14:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'delaware' and a.slug = 'fiu'
  and g.week = 11;

-- Boston College @ Notre Dame · Sat 2026-11-14 14:30 CT · NBC · Vegas — · HOLD · ESPN 401858294
update games g
set kickoff_at = timestamptz '2026-11-14 14:30:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'NBC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'notre-dame' and a.slug = 'boston-college'
  and g.week = 11;

-- California @ Virginia · Sat 2026-11-14 14:30 CT · ACC Network · UVA -12.5 / O/U 47.5 · CLEAR · ESPN 401858295
update games g
set kickoff_at = timestamptz '2026-11-14 14:30:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'ACC Network',
    vegas_spread = 12.5,
    vegas_total = 47.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'virginia' and a.slug = 'california'
  and g.week = 11;

-- USC @ Indiana · Sat 2026-11-14 14:30 CT · CBS · Vegas — · HOLD · ESPN 401858518
update games g
set kickoff_at = timestamptz '2026-11-14 14:30:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'CBS',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'indiana' and a.slug = 'usc'
  and g.week = 11;

-- Michigan @ Oregon · Sat 2026-11-14 14:30 CT · FS1 · Vegas — · HOLD · ESPN 401858523
update games g
set kickoff_at = timestamptz '2026-11-14 14:30:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'oregon' and a.slug = 'michigan'
  and g.week = 11;

-- Florida Atlantic @ Tulsa · Sat 2026-11-14 14:30 CT · ESPN+ · Vegas — · HOLD · ESPN 401862826
update games g
set kickoff_at = timestamptz '2026-11-14 14:30:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'tulsa' and a.slug = 'florida-atlantic'
  and g.week = 11;

-- Nevada @ Northern Illinois · Sat 2026-11-14 14:30 CT · MW+ · NEV -10.5 / O/U 46.5 · CLEAR · ESPN 401864536
update games g
set kickoff_at = timestamptz '2026-11-14 14:30:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'MW+',
    vegas_spread = -10.5,
    vegas_total = 46.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'northern-illinois' and a.slug = 'nevada'
  and g.week = 11;

-- Georgia Southern @ Georgia State · Sat 2026-11-14 14:30 CT · ESPN+ · GASO -5.5 / O/U 55.5 · CLEAR · ESPN 401869952
update games g
set kickoff_at = timestamptz '2026-11-14 14:30:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'ESPN+',
    vegas_spread = -5.5,
    vegas_total = 55.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'georgia-state' and a.slug = 'georgia-southern'
  and g.week = 11;

-- Jacksonville State @ Western Kentucky · Sat 2026-11-14 14:30 CT · ESPN+ · JXST -6 / O/U 52.5 · CLEAR · ESPN 401870752
update games g
set kickoff_at = timestamptz '2026-11-14 14:30:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'ESPN+',
    vegas_spread = -6,
    vegas_total = 52.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'western-kentucky' and a.slug = 'jacksonville-state'
  and g.week = 11;

-- Middle Tennessee @ Liberty · Sat 2026-11-14 14:30 CT · CBSSN · LIB -20.5 / O/U 54.5 · CLEAR · ESPN 401871061
update games g
set kickoff_at = timestamptz '2026-11-14 14:30:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'CBSSN',
    vegas_spread = 20.5,
    vegas_total = 54.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'liberty' and a.slug = 'middle-tennessee'
  and g.week = 11;

-- Fresno State @ Texas State · Sat 2026-11-14 15:00 CT · CW · Vegas — · HOLD · ESPN 401860916
update games g
set kickoff_at = timestamptz '2026-11-14 15:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'texas-state' and a.slug = 'fresno-state'
  and g.week = 11;

-- Washington @ Michigan State · Sat 2026-11-14 15:15 CT · BTN · Vegas — · HOLD · ESPN 401858521
update games g
set kickoff_at = timestamptz '2026-11-14 15:15:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'BTN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'michigan-state' and a.slug = 'washington'
  and g.week = 11;

-- Southern Miss @ Louisiana Tech · Sat 2026-11-14 16:00 CT · ESPN+ · LT -18.5 / O/U 54.5 · CLEAR · ESPN 401871099
update games g
set kickoff_at = timestamptz '2026-11-14 16:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'ESPN+',
    vegas_spread = 18.5,
    vegas_total = 54.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'louisiana-tech' and a.slug = 'southern-miss'
  and g.week = 11;

-- Oregon State @ Boise State · Sat 2026-11-14 17:00 CT · USA Net · Vegas — · HOLD · ESPN 401860914
update games g
set kickoff_at = timestamptz '2026-11-14 17:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'USA Net',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'boise-state' and a.slug = 'oregon-state'
  and g.week = 11;

-- App State @ Marshall · Sat 2026-11-14 17:00 CT · ESPN+ · APP -2.5 / O/U 53.5 · CLEAR · ESPN 401869928
update games g
set kickoff_at = timestamptz '2026-11-14 17:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'ESPN+',
    vegas_spread = -2.5,
    vegas_total = 53.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'marshall' and a.slug = 'app-state'
  and g.week = 11;

-- Minnesota @ Penn State · Sat 2026-11-14 18:00 CT · FS1 · PSU -7.5 / O/U 43.5 · CLEAR · ESPN 401858524
update games g
set kickoff_at = timestamptz '2026-11-14 18:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'FS1',
    vegas_spread = 7.5,
    vegas_total = 43.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'penn-state' and a.slug = 'minnesota'
  and g.week = 11;

-- San José State @ Air Force · Sat 2026-11-14 18:00 CT · CBSSN · Vegas — · HOLD · ESPN 401864538
update games g
set kickoff_at = timestamptz '2026-11-14 18:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'air-force' and a.slug = 'san-jose-state'
  and g.week = 11;

-- Troy @ South Alabama · Sat 2026-11-14 18:00 CT · ESPN+ · USA -3 / O/U 56.5 · CLEAR · ESPN 401871100
update games g
set kickoff_at = timestamptz '2026-11-14 18:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'ESPN+',
    vegas_spread = 3,
    vegas_total = 56.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'south-alabama' and a.slug = 'troy'
  and g.week = 11;

-- Purdue @ Iowa · Sat 2026-11-14 18:30 CT · NBC · IOWA -16.5 / O/U 45.5 · CLEAR · ESPN 401858519
update games g
set kickoff_at = timestamptz '2026-11-14 18:30:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'NBC',
    vegas_spread = 16.5,
    vegas_total = 45.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'iowa' and a.slug = 'purdue'
  and g.week = 11;

-- UNLV @ New Mexico · Sat 2026-11-14 18:30 CT · CW · Vegas — · HOLD · ESPN 401864539
update games g
set kickoff_at = timestamptz '2026-11-14 18:30:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'new-mexico' and a.slug = 'unlv'
  and g.week = 11;

-- South Carolina @ Arkansas · Sat 2026-11-14 18:45 CT · SEC Network · Vegas — · HOLD · ESPN 401856882
update games g
set kickoff_at = timestamptz '2026-11-14 18:45:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'SEC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'arkansas' and a.slug = 'south-carolina'
  and g.week = 11;

-- North Texas @ UTSA · Sat 2026-11-14 20:00 CT · ESPNU · Vegas — · HOLD · ESPN 401862827
update games g
set kickoff_at = timestamptz '2026-11-14 20:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'utsa' and a.slug = 'north-texas'
  and g.week = 11;

-- Utah State @ San Diego State · Sat 2026-11-14 20:30 CT · USA Net · Vegas — · HOLD · ESPN 401860915
update games g
set kickoff_at = timestamptz '2026-11-14 20:30:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'USA Net',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'san-diego-state' and a.slug = 'utah-state'
  and g.week = 11;

-- Wyoming @ UTEP · Sat 2026-11-14 21:00 CT · FS1 · WYO -10 / O/U 43.5 · CLEAR · ESPN 401864540
update games g
set kickoff_at = timestamptz '2026-11-14 21:00:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'FS1',
    vegas_spread = -10,
    vegas_total = 43.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'utep' and a.slug = 'wyoming'
  and g.week = 11;

-- Colorado State @ Washington State · Sat 2026-11-14 21:30 CT · CBSSN · Vegas — · HOLD · ESPN 401860917
update games g
set kickoff_at = timestamptz '2026-11-14 21:30:00-06',
    kickoff_date = date '2026-11-14',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'washington-state' and a.slug = 'colorado-state'
  and g.week = 11;

-- Arizona State @ UCF · kick TBD (HOLD) · TV — · UCF -2.5 / O/U 52.5 · HOLD · ESPN 401856857
update games g
set vegas_spread = 2.5,
    vegas_total = 52.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ucf' and a.slug = 'arizona-state'
  and g.week = 11;

-- Baylor @ BYU · kick TBD (HOLD) · TV — · BYU -7 / O/U 48.5 · HOLD · ESPN 401856858
update games g
set vegas_spread = 7,
    vegas_total = 48.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'byu' and a.slug = 'baylor'
  and g.week = 11;

-- Cincinnati @ Iowa State · kick TBD (HOLD) · TV — · ISU -1.5 / O/U 60.5 · HOLD · ESPN 401856859
update games g
set vegas_spread = 1.5,
    vegas_total = 60.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'iowa-state' and a.slug = 'cincinnati'
  and g.week = 11;

-- Kansas @ West Virginia · kick TBD (HOLD) · TV — · WVU -2.5 / O/U 64.5 · HOLD · ESPN 401856861
update games g
set vegas_spread = 2.5,
    vegas_total = 64.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'west-virginia' and a.slug = 'kansas'
  and g.week = 11;

-- Kansas State @ TCU · kick TBD (HOLD) · TV — · TCU -9.5 / O/U 45.5 · HOLD · ESPN 401856862
update games g
set vegas_spread = 9.5,
    vegas_total = 45.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'tcu' and a.slug = 'kansas-state'
  and g.week = 11;

-- Texas Tech @ Oklahoma State · kick TBD (HOLD) · TV — · OKST -2.5 / O/U 70.5 · HOLD · ESPN 401856863
update games g
set vegas_spread = 2.5,
    vegas_total = 70.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'oklahoma-state' and a.slug = 'texas-tech'
  and g.week = 11;

-- Utah @ Arizona · kick TBD (HOLD) · TV — · UTAH -2.5 / O/U 53.5 · HOLD · ESPN 401856864
update games g
set vegas_spread = -2.5,
    vegas_total = 53.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'arizona' and a.slug = 'utah'
  and g.week = 11;

-- Missouri @ Georgia · kick TBD (HOLD) · TV — · Vegas — · HOLD · ESPN 401856883
update games g
set vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'georgia' and a.slug = 'missouri'
  and g.week = 11;

-- Florida @ Kentucky · kick TBD (HOLD) · TV — · UK -2.5 / O/U 53.5 · HOLD · ESPN 401856884
update games g
set vegas_spread = 2.5,
    vegas_total = 53.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'kentucky' and a.slug = 'florida'
  and g.week = 11;

-- Texas @ LSU · kick TBD (HOLD) · TV — · LSU -3.5 / O/U 45.5 · HOLD · ESPN 401856885
update games g
set vegas_spread = 3.5,
    vegas_total = 45.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'lsu' and a.slug = 'texas'
  and g.week = 11;

-- Ole Miss @ Oklahoma · kick TBD (HOLD) · TV — · Vegas — · HOLD · ESPN 401856887
update games g
set vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'oklahoma' and a.slug = 'ole-miss'
  and g.week = 11;

-- Tennessee @ Texas A&M · kick TBD (HOLD) · TV — · Vegas — · HOLD · ESPN 401856888
update games g
set vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'texas-am' and a.slug = 'tennessee'
  and g.week = 11;

-- Louisville @ North Carolina · kick TBD (HOLD) · TV — · Vegas — · HOLD · ESPN 401858298
update games g
set vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'north-carolina' and a.slug = 'louisville'
  and g.week = 11;

-- Stanford @ Virginia Tech · kick TBD (HOLD) · TV — · Vegas — · HOLD · ESPN 401858299
update games g
set vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'virginia-tech' and a.slug = 'stanford'
  and g.week = 11;
