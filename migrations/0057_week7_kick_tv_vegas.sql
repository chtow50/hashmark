-- Week 7 FBS–FBS kick / TV / Vegas (Sunday Board + Tape ship, 2026-10-11 ~10:20 AM CT).
-- Pack: data/week7_fbs_fbs_kick_tv_vegas_2026.json.
-- Kick = ESPN scoreboard America/Chicago civil time, cross-checked against the CBS Sports
-- odds board (ET). TV = ESPN broadcast. Match by home/away slug + week=7.
-- Vegas only when the ESPN DraftKings spread AND total equal the CBS Sports listing
-- exactly on both sides; otherwise null. SQL stores the board convention: positive = home favored.
-- Nebraska @ Oregon: ESPN 22:00 CT vs CBS 3:00 PM ET and goducks.com shows TBD — kick + TV HOLD (untouched).
-- Blank TV and blank Vegas stay null. No scores. No HX writes. No locks language.
-- 57 updates · 6 Vegas · 51 blank Vegas · 2 blank TV · 1 TBD kick.
-- FCS opponents (Clemson, Texas A&M, Nevada, Stanford, Ohio) are not in the games table.
-- Soft-cal FLAG / PR #46 Scenario Sim untouched.

-- Delaware @ Middle Tennessee · Tue 2026-10-13 18:00 CT · CBSSN · Vegas — · HOLD · ESPN 401871067
update games g
set kickoff_at = timestamptz '2026-10-13 18:00:00-05',
    kickoff_date = date '2026-10-13',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'middle-tennessee' and a.slug = 'delaware'
  and g.week = 7;

-- Florida International @ Jacksonville State · Tue 2026-10-13 19:00 CT · ESPNU · Vegas — · HOLD · ESPN 401871053
update games g
set kickoff_at = timestamptz '2026-10-13 19:00:00-05',
    kickoff_date = date '2026-10-13',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'jacksonville-state' and a.slug = 'fiu'
  and g.week = 7;

-- Kennesaw State @ Missouri State · Wed 2026-10-14 18:30 CT · CBSSN · Vegas — · HOLD · ESPN 401871054
update games g
set kickoff_at = timestamptz '2026-10-14 18:30:00-05',
    kickoff_date = date '2026-10-14',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'missouri-state' and a.slug = 'kennesaw-state'
  and g.week = 7;

-- Western Kentucky @ Sam Houston · Wed 2026-10-14 19:00 CT · ESPN · Vegas — · HOLD · ESPN 401871068
update games g
set kickoff_at = timestamptz '2026-10-14 19:00:00-05',
    kickoff_date = date '2026-10-14',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'sam-houston' and a.slug = 'western-kentucky'
  and g.week = 7;

-- East Carolina @ UAB · Thu 2026-10-15 18:30 CT · ESPN · Vegas — · HOLD · ESPN 401862800
update games g
set kickoff_at = timestamptz '2026-10-15 18:30:00-05',
    kickoff_date = date '2026-10-15',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'uab' and a.slug = 'east-carolina'
  and g.week = 7;

-- Georgia Southern @ Old Dominion · Thu 2026-10-15 18:30 CT · ESPN2 · Vegas — · HOLD · ESPN 401869950
update games g
set kickoff_at = timestamptz '2026-10-15 18:30:00-05',
    kickoff_date = date '2026-10-15',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'old-dominion' and a.slug = 'georgia-southern'
  and g.week = 7;

-- Colorado State @ Texas State · Thu 2026-10-15 19:00 CT · CBSSN · TXST -11.5 / O/U 67.5 · CLEAR · ESPN 401860923
update games g
set kickoff_at = timestamptz '2026-10-15 19:00:00-05',
    kickoff_date = date '2026-10-15',
    tv = 'CBSSN',
    vegas_spread = 11.5,
    vegas_total = 67.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'texas-state' and a.slug = 'colorado-state'
  and g.week = 7;

-- Memphis @ Tulane · Fri 2026-10-16 18:30 CT · ESPN · Vegas — · HOLD · ESPN 401862801
update games g
set kickoff_at = timestamptz '2026-10-16 18:30:00-05',
    kickoff_date = date '2026-10-16',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'tulane' and a.slug = 'memphis'
  and g.week = 7;

-- Washington @ Purdue · Fri 2026-10-16 19:00 CT · FOX · PUR -2.5 / O/U 51.5 · CLEAR · ESPN 401858493
update games g
set kickoff_at = timestamptz '2026-10-16 19:00:00-05',
    kickoff_date = date '2026-10-16',
    tv = 'FOX',
    vegas_spread = 2.5,
    vegas_total = 51.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'purdue' and a.slug = 'washington'
  and g.week = 7;

-- App State @ Coastal Carolina · Fri 2026-10-16 19:00 CT · ESPN2 · Vegas — · HOLD · ESPN 401869844
update games g
set kickoff_at = timestamptz '2026-10-16 19:00:00-05',
    kickoff_date = date '2026-10-16',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'coastal-carolina' and a.slug = 'app-state'
  and g.week = 7;

-- Mississippi State @ LSU · Sat 2026-10-17 11:00 CT · ESPN · Vegas — · HOLD · ESPN 401856720
update games g
set kickoff_at = timestamptz '2026-10-17 11:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'lsu' and a.slug = 'mississippi-state'
  and g.week = 7;

-- Florida @ Texas · Sat 2026-10-17 11:00 CT · ABC · Vegas — · HOLD · ESPN 401856724
update games g
set kickoff_at = timestamptz '2026-10-17 11:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ABC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'texas' and a.slug = 'florida'
  and g.week = 7;

-- Cincinnati @ West Virginia · Sat 2026-10-17 11:00 CT · TNT · Vegas — · HOLD · ESPN 401856829
update games g
set kickoff_at = timestamptz '2026-10-17 11:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'TNT',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'west-virginia' and a.slug = 'cincinnati'
  and g.week = 7;

-- Kansas @ Kansas State · Sat 2026-10-17 11:00 CT · FS1 · KSU -8.5 / O/U 54.5 · CLEAR · ESPN 401856830
update games g
set kickoff_at = timestamptz '2026-10-17 11:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'FS1',
    vegas_spread = 8.5,
    vegas_total = 54.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'kansas-state' and a.slug = 'kansas'
  and g.week = 7;

-- Pittsburgh @ Boston College · Sat 2026-10-17 11:00 CT · ESPN2 · Vegas — · HOLD · ESPN 401858267
update games g
set kickoff_at = timestamptz '2026-10-17 11:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'boston-college' and a.slug = 'pittsburgh'
  and g.week = 7;

-- Virginia @ SMU · Sat 2026-10-17 11:00 CT · CW · Vegas — · HOLD · ESPN 401858268
update games g
set kickoff_at = timestamptz '2026-10-17 11:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'smu' and a.slug = 'virginia'
  and g.week = 7;

-- Ohio State @ Indiana · Sat 2026-10-17 11:00 CT · FOX · Vegas — · HOLD · ESPN 401858488
update games g
set kickoff_at = timestamptz '2026-10-17 11:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'FOX',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'indiana' and a.slug = 'ohio-state'
  and g.week = 7;

-- Northwestern @ Michigan State · Sat 2026-10-17 11:00 CT · Peacock · Vegas — · HOLD · ESPN 401858491
update games g
set kickoff_at = timestamptz '2026-10-17 11:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'Peacock',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'michigan-state' and a.slug = 'northwestern'
  and g.week = 7;

-- Florida Atlantic @ Army · Sat 2026-10-17 11:00 CT · CBSSN · Vegas — · HOLD · ESPN 401862802
update games g
set kickoff_at = timestamptz '2026-10-17 11:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'army' and a.slug = 'florida-atlantic'
  and g.week = 7;

-- Ball State @ Bowling Green · Sat 2026-10-17 11:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401866441
update games g
set kickoff_at = timestamptz '2026-10-17 11:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'bowling-green' and a.slug = 'ball-state'
  and g.week = 7;

-- Georgia State @ James Madison · Sat 2026-10-17 11:00 CT · ESPNU · Vegas — · HOLD · ESPN 401869957
update games g
set kickoff_at = timestamptz '2026-10-17 11:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'james-madison' and a.slug = 'georgia-state'
  and g.week = 7;

-- Rutgers @ Maryland · Sat 2026-10-17 11:30 CT · BTN · Vegas — · HOLD · ESPN 401858489
update games g
set kickoff_at = timestamptz '2026-10-17 11:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'BTN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'maryland' and a.slug = 'rutgers'
  and g.week = 7;

-- Charlotte @ Temple · Sat 2026-10-17 12:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401862803
update games g
set kickoff_at = timestamptz '2026-10-17 12:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'temple' and a.slug = 'charlotte'
  and g.week = 7;

-- Massachusetts @ Buffalo · Sat 2026-10-17 12:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401866442
update games g
set kickoff_at = timestamptz '2026-10-17 12:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'buffalo' and a.slug = 'massachusetts'
  and g.week = 7;

-- Western Michigan @ Central Michigan · Sat 2026-10-17 12:30 CT · ESPN+ · Vegas — · HOLD · ESPN 401866443
update games g
set kickoff_at = timestamptz '2026-10-17 12:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'central-michigan' and a.slug = 'western-michigan'
  and g.week = 7;

-- Auburn @ Georgia · Sat 2026-10-17 14:30 CT · ESPN · Vegas — · HOLD · ESPN 401856719
update games g
set kickoff_at = timestamptz '2026-10-17 14:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'georgia' and a.slug = 'auburn'
  and g.week = 7;

-- Missouri @ Ole Miss · Sat 2026-10-17 14:30 CT · SEC Network · Vegas — · HOLD · ESPN 401856721
update games g
set kickoff_at = timestamptz '2026-10-17 14:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'SEC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ole-miss' and a.slug = 'missouri'
  and g.week = 7;

-- Alabama @ Tennessee · Sat 2026-10-17 14:30 CT · ABC · ALA -6.5 / O/U 55.5 · CLEAR · ESPN 401856723
update games g
set kickoff_at = timestamptz '2026-10-17 14:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ABC',
    vegas_spread = -6.5,
    vegas_total = 55.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'tennessee' and a.slug = 'alabama'
  and g.week = 7;

-- Arizona State @ Texas Tech · Sat 2026-10-17 14:30 CT · FOX · Vegas — · HOLD · ESPN 401856828
update games g
set kickoff_at = timestamptz '2026-10-17 14:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'FOX',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'texas-tech' and a.slug = 'arizona-state'
  and g.week = 7;

-- Georgia Tech @ Virginia Tech · Sat 2026-10-17 14:30 CT · ACC Network · Vegas — · HOLD · ESPN 401858264
update games g
set kickoff_at = timestamptz '2026-10-17 14:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ACC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'virginia-tech' and a.slug = 'georgia-tech'
  and g.week = 7;

-- North Carolina @ Duke · Sat 2026-10-17 14:30 CT · ESPN2 · Vegas — · HOLD · ESPN 401858266
update games g
set kickoff_at = timestamptz '2026-10-17 14:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'duke' and a.slug = 'north-carolina'
  and g.week = 7;

-- Penn State @ Michigan · Sat 2026-10-17 14:30 CT · TV — · Vegas — · HOLD · ESPN 401858490
update games g
set kickoff_at = timestamptz '2026-10-17 14:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = null,
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'michigan' and a.slug = 'penn-state'
  and g.week = 7;

-- Northern Illinois @ Wyoming · Sat 2026-10-17 14:30 CT · CW · Vegas — · HOLD · ESPN 401864522
update games g
set kickoff_at = timestamptz '2026-10-17 14:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'wyoming' and a.slug = 'northern-illinois'
  and g.week = 7;

-- UNLV @ Air Force · Sat 2026-10-17 14:30 CT · CBSSN · Vegas — · HOLD · ESPN 401864524
update games g
set kickoff_at = timestamptz '2026-10-17 14:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'air-force' and a.slug = 'unlv'
  and g.week = 7;

-- Toledo @ Eastern Michigan · Sat 2026-10-17 14:30 CT · ESPN+ · Vegas — · HOLD · ESPN 401866444
update games g
set kickoff_at = timestamptz '2026-10-17 14:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'eastern-michigan' and a.slug = 'toledo'
  and g.week = 7;

-- Akron @ Miami (OH) · Sat 2026-10-17 14:30 CT · ESPN+ · Vegas — · HOLD · ESPN 401866478
update games g
set kickoff_at = timestamptz '2026-10-17 14:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'miami-oh' and a.slug = 'akron'
  and g.week = 7;

-- Tulsa @ Rice · Sat 2026-10-17 15:30 CT · ESPN+ · Vegas — · HOLD · ESPN 401862805
update games g
set kickoff_at = timestamptz '2026-10-17 15:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'rice' and a.slug = 'tulsa'
  and g.week = 7;

-- Troy @ Louisiana · Sat 2026-10-17 16:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401869966
update games g
set kickoff_at = timestamptz '2026-10-17 16:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'louisiana' and a.slug = 'troy'
  and g.week = 7;

-- Washington State @ Oregon State · Sat 2026-10-17 17:00 CT · USA Net · Vegas — · HOLD · ESPN 401860903
update games g
set kickoff_at = timestamptz '2026-10-17 17:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'USA Net',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'oregon-state' and a.slug = 'washington-state'
  and g.week = 7;

-- Arkansas @ Vanderbilt · Sat 2026-10-17 18:00 CT · ESPN2 · Vegas — · HOLD · ESPN 401856726
update games g
set kickoff_at = timestamptz '2026-10-17 18:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'vanderbilt' and a.slug = 'arkansas'
  and g.week = 7;

-- TCU @ Baylor · Sat 2026-10-17 18:00 CT · FS1 · Vegas — · HOLD · ESPN 401856832
update games g
set kickoff_at = timestamptz '2026-10-17 18:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'baylor' and a.slug = 'tcu'
  and g.week = 7;

-- Florida State @ Miami · Sat 2026-10-17 18:00 CT · ESPN · Vegas — · HOLD · ESPN 401858263
update games g
set kickoff_at = timestamptz '2026-10-17 18:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'miami' and a.slug = 'florida-state'
  and g.week = 7;

-- Kent State @ South Florida · Sat 2026-10-17 18:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401862806
update games g
set kickoff_at = timestamptz '2026-10-17 18:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'usf' and a.slug = 'kent-state'
  and g.week = 7;

-- Arkansas State @ Southern Miss · Sat 2026-10-17 18:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401869934
update games g
set kickoff_at = timestamptz '2026-10-17 18:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'southern-miss' and a.slug = 'arkansas-state'
  and g.week = 7;

-- Kentucky @ Oklahoma · Sat 2026-10-17 18:30 CT · SEC Network · OU -6.5 / O/U 42.5 · CLEAR · ESPN 401856722
update games g
set kickoff_at = timestamptz '2026-10-17 18:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'SEC Network',
    vegas_spread = 6.5,
    vegas_total = 42.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'oklahoma' and a.slug = 'kentucky'
  and g.week = 7;

-- Notre Dame @ BYU · Sat 2026-10-17 18:30 CT · ABC · Vegas — · HOLD · ESPN 401856809
update games g
set kickoff_at = timestamptz '2026-10-17 18:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ABC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'byu' and a.slug = 'notre-dame'
  and g.week = 7;

-- Oklahoma State @ Houston · Sat 2026-10-17 18:30 CT · FOX · HOU -3.5 / O/U 58.5 · CLEAR · ESPN 401856831
update games g
set kickoff_at = timestamptz '2026-10-17 18:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'FOX',
    vegas_spread = 3.5,
    vegas_total = 58.5
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'houston' and a.slug = 'oklahoma-state'
  and g.week = 7;

-- Louisville @ Syracuse · Sat 2026-10-17 18:30 CT · ACC Network · Vegas — · HOLD · ESPN 401858265
update games g
set kickoff_at = timestamptz '2026-10-17 18:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ACC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'syracuse' and a.slug = 'louisville'
  and g.week = 7;

-- Wisconsin @ UCLA · Sat 2026-10-17 18:30 CT · NBC · Vegas — · HOLD · ESPN 401858494
update games g
set kickoff_at = timestamptz '2026-10-17 18:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'NBC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ucla' and a.slug = 'wisconsin'
  and g.week = 7;

-- Navy @ UTSA · Sat 2026-10-17 19:00 CT · ESPNU · Vegas — · HOLD · ESPN 401862804
update games g
set kickoff_at = timestamptz '2026-10-17 19:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'utsa' and a.slug = 'navy'
  and g.week = 7;

-- Louisiana Tech @ UL Monroe · Sat 2026-10-17 19:00 CT · ESPN+ · Vegas — · HOLD · ESPN 401871091
update games g
set kickoff_at = timestamptz '2026-10-17 19:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ul-monroe' and a.slug = 'louisiana-tech'
  and g.week = 7;

-- San José State @ UTEP · Sat 2026-10-17 20:00 CT · MW+ · Vegas — · HOLD · ESPN 401864523
update games g
set kickoff_at = timestamptz '2026-10-17 20:00:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'MW+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'utep' and a.slug = 'san-jose-state'
  and g.week = 7;

-- Utah @ Colorado · Sat 2026-10-17 21:15 CT · ESPN · Vegas — · HOLD · ESPN 401856833
update games g
set kickoff_at = timestamptz '2026-10-17 21:15:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'colorado' and a.slug = 'utah'
  and g.week = 7;

-- Wake Forest @ California · Sat 2026-10-17 21:30 CT · ESPN2 · Vegas — · HOLD · ESPN 401858269
update games g
set kickoff_at = timestamptz '2026-10-17 21:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'california' and a.slug = 'wake-forest'
  and g.week = 7;

-- Fresno State @ San Diego State · Sat 2026-10-17 21:30 CT · CBSSN · Vegas — · HOLD · ESPN 401860904
update games g
set kickoff_at = timestamptz '2026-10-17 21:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'san-diego-state' and a.slug = 'fresno-state'
  and g.week = 7;

-- New Mexico @ Hawaiʻi · Sat 2026-10-17 21:30 CT · FS1 · Vegas — · HOLD · ESPN 401864521
update games g
set kickoff_at = timestamptz '2026-10-17 21:30:00-05',
    kickoff_date = date '2026-10-17',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'hawaii' and a.slug = 'new-mexico'
  and g.week = 7;

-- Nebraska @ Oregon · kick TBD (HOLD) · TV — · Vegas — · HOLD · ESPN 401858492
update games g
set vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'oregon' and a.slug = 'nebraska'
  and g.week = 7;
