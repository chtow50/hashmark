-- Week 12 FBS–FBS kick / TV (Sunday Board + Tape ship, 2026-11-15 ~11:35 AM CT, re-verified against a fresh ESPN pull).
-- Pack: data/week12_fbs_fbs_kick_tv_vegas_2026.json.
-- Kick = ESPN scoreboard America/Chicago civil time (timeValid only; TBD kicks stay blank). Kicks are CST (UTC-6; DST ended Nov 1).
-- TV = ESPN broadcast (single network only; blank stays null).
-- Vegas: all blank. CFBD lines (re-pulled 11:30 AM CT) list DraftKings only for Week 12 (Bovada not posted yet) and ESPN's only book is
-- DraftKings, so no two independent books match exactly. Nothing is filled or invented.
-- Match by home/away slug + week=12. No scores. No HX writes. No locks language.
-- 66 updates · 0 Vegas · 7 blank TV · 4 TBD kick.
-- Four FCS opponents (Wofford @ Ole Miss, Tennessee Tech @ Mississippi State, Chattanooga @ Alabama, Samford @ Auburn, Sat Nov 21) are not in the games table.

-- Eastern Michigan Eagles @ Western Michigan Broncos · Tue 2026-11-17 17:00 CT · ESPN2 · Vegas — · ESPN 401866465
update games g
set kickoff_at = timestamptz '2026-11-17 17:00:00-06',
    kickoff_date = date '2026-11-17',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'western-michigan' and a.slug = 'eastern-michigan'
  and g.week = 12;

-- Ball State Cardinals @ Ohio Bobcats · Tue 2026-11-17 18:00 CT · CBSSN · Vegas — · ESPN 401866464
update games g
set kickoff_at = timestamptz '2026-11-17 18:00:00-06',
    kickoff_date = date '2026-11-17',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ohio' and a.slug = 'ball-state'
  and g.week = 12;

-- Miami (OH) RedHawks @ Kent State Golden Flashes · Tue 2026-11-17 18:00 CT · ESPNU · Vegas — · ESPN 401866466
update games g
set kickoff_at = timestamptz '2026-11-17 18:00:00-06',
    kickoff_date = date '2026-11-17',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'kent-state' and a.slug = 'miami-oh'
  and g.week = 12;

-- Akron Zips @ Massachusetts Minutemen · Wed 2026-11-18 18:00 CT · CBSSN · Vegas — · ESPN 401866467
update games g
set kickoff_at = timestamptz '2026-11-18 18:00:00-06',
    kickoff_date = date '2026-11-18',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'massachusetts' and a.slug = 'akron'
  and g.week = 12;

-- Central Michigan Chippewas @ Buffalo Bulls · Wed 2026-11-18 18:30 CT · ESPNU · Vegas — · ESPN 401866469
update games g
set kickoff_at = timestamptz '2026-11-18 18:30:00-06',
    kickoff_date = date '2026-11-18',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'buffalo' and a.slug = 'central-michigan'
  and g.week = 12;

-- Rice Owls @ Temple Owls · Thu 2026-11-19 18:30 CT · ESPN · Vegas — · ESPN 401862830
update games g
set kickoff_at = timestamptz '2026-11-19 18:30:00-06',
    kickoff_date = date '2026-11-19',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'temple' and a.slug = 'rice'
  and g.week = 12;

-- Iowa State Cyclones @ UCF Knights · Fri 2026-11-20 17:00 CT · FS1 · Vegas — · ESPN 401856869
update games g
set kickoff_at = timestamptz '2026-11-20 17:00:00-06',
    kickoff_date = date '2026-11-20',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ucf' and a.slug = 'iowa-state'
  and g.week = 12;

-- Clemson Tigers @ Duke Blue Devils · Fri 2026-11-20 18:30 CT · ESPN · Vegas — · ESPN 401858303
update games g
set kickoff_at = timestamptz '2026-11-20 18:30:00-06',
    kickoff_date = date '2026-11-20',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'duke' and a.slug = 'clemson'
  and g.week = 12;

-- Bowling Green Falcons @ Toledo Rockets · Fri 2026-11-20 18:30 CT · ESPN2 · Vegas — · ESPN 401866468
update games g
set kickoff_at = timestamptz '2026-11-20 18:30:00-06',
    kickoff_date = date '2026-11-20',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'toledo' and a.slug = 'bowling-green'
  and g.week = 12;

-- Oregon Ducks @ Michigan State Spartans · Fri 2026-11-20 19:00 CT · FOX · Vegas — · ESPN 401858529
update games g
set kickoff_at = timestamptz '2026-11-20 19:00:00-06',
    kickoff_date = date '2026-11-20',
    tv = 'FOX',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'michigan-state' and a.slug = 'oregon'
  and g.week = 12;

-- UTEP Miners @ Air Force Falcons · Fri 2026-11-20 19:00 CT · CW · Vegas — · ESPN 401864545
update games g
set kickoff_at = timestamptz '2026-11-20 19:00:00-06',
    kickoff_date = date '2026-11-20',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'air-force' and a.slug = 'utep'
  and g.week = 12;

-- New Mexico Lobos @ Wyoming Cowboys · Fri 2026-11-20 20:00 CT · FS1 · Vegas — · ESPN 401864542
update games g
set kickoff_at = timestamptz '2026-11-20 20:00:00-06',
    kickoff_date = date '2026-11-20',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'wyoming' and a.slug = 'new-mexico'
  and g.week = 12;

-- Virginia Tech Hokies @ Miami Hurricanes · kick TBD (HOLD) · TV — · Vegas — · ESPN 401858302
update games g
set vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'miami' and a.slug = 'virginia-tech'
  and g.week = 12;

-- Pittsburgh Panthers @ Louisville Cardinals · kick TBD (HOLD) · TV — · Vegas — · ESPN 401858306
update games g
set vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'louisville' and a.slug = 'pittsburgh'
  and g.week = 12;

-- Wake Forest Demon Deacons @ Georgia Tech Yellow Jackets · kick TBD (HOLD) · TV — · Vegas — · ESPN 401858310
update games g
set vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'georgia-tech' and a.slug = 'wake-forest'
  and g.week = 12;

-- North Texas Mean Green @ Tulane Green Wave · kick TBD (HOLD) · TV — · Vegas — · ESPN 401862835
update games g
set vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'tulane' and a.slug = 'north-texas'
  and g.week = 12;

-- Vanderbilt Commodores @ Florida Gators · Sat 2026-11-21 11:00 CT · TV — · Vegas — · ESPN 401856748
update games g
set kickoff_at = timestamptz '2026-11-21 11:00:00-06',
    kickoff_date = date '2026-11-21',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'florida' and a.slug = 'vanderbilt'
  and g.week = 12;

-- Texas A&M Aggies @ Oklahoma Sooners · Sat 2026-11-21 11:00 CT · TV — · Vegas — · ESPN 401856752
update games g
set kickoff_at = timestamptz '2026-11-21 11:00:00-06',
    kickoff_date = date '2026-11-21',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'oklahoma' and a.slug = 'texas-am'
  and g.week = 12;

-- BYU Cougars @ Kansas Jayhawks · Sat 2026-11-21 11:00 CT · ABC · Vegas — · ESPN 401856866
update games g
set kickoff_at = timestamptz '2026-11-21 11:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ABC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'kansas' and a.slug = 'byu'
  and g.week = 12;

-- Colorado Buffaloes @ Cincinnati Bearcats · Sat 2026-11-21 11:00 CT · ESPN+ · Vegas — · ESPN 401856867
update games g
set kickoff_at = timestamptz '2026-11-21 11:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'cincinnati' and a.slug = 'colorado'
  and g.week = 12;

-- Syracuse Orange @ Boston College Eagles · Sat 2026-11-21 11:00 CT · ACC Network · Vegas — · ESPN 401858309
update games g
set kickoff_at = timestamptz '2026-11-21 11:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ACC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'boston-college' and a.slug = 'syracuse'
  and g.week = 12;

-- Northwestern Wildcats @ Minnesota Golden Gophers · Sat 2026-11-21 11:00 CT · FS1 · Vegas — · ESPN 401858530
update games g
set kickoff_at = timestamptz '2026-11-21 11:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'minnesota' and a.slug = 'northwestern'
  and g.week = 12;

-- Ohio State Buckeyes @ Nebraska Cornhuskers · Sat 2026-11-21 11:00 CT · FOX · Vegas — · ESPN 401858531
update games g
set kickoff_at = timestamptz '2026-11-21 11:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'FOX',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'nebraska' and a.slug = 'ohio-state'
  and g.week = 12;

-- Wisconsin Badgers @ Purdue Boilermakers · Sat 2026-11-21 11:00 CT · NBC · Vegas — · ESPN 401858533
update games g
set kickoff_at = timestamptz '2026-11-21 11:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'NBC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'purdue' and a.slug = 'wisconsin'
  and g.week = 12;

-- East Carolina Pirates @ Army Black Knights · Sat 2026-11-21 11:00 CT · CBSSN · Vegas — · ESPN 401862831
update games g
set kickoff_at = timestamptz '2026-11-21 11:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'army' and a.slug = 'east-carolina'
  and g.week = 12;

-- Memphis Tigers @ Navy Midshipmen · Sat 2026-11-21 11:00 CT · TV — · Vegas — · ESPN 401862834
update games g
set kickoff_at = timestamptz '2026-11-21 11:00:00-06',
    kickoff_date = date '2026-11-21',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'navy' and a.slug = 'memphis'
  and g.week = 12;

-- North Carolina Tar Heels @ Virginia Cavaliers · Sat 2026-11-21 11:30 CT · CW · Vegas — · ESPN 401858305
update games g
set kickoff_at = timestamptz '2026-11-21 11:30:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'virginia' and a.slug = 'north-carolina'
  and g.week = 12;

-- Houston Cougars @ West Virginia Mountaineers · Sat 2026-11-21 12:00 CT · TNT · Vegas — · ESPN 401856868
update games g
set kickoff_at = timestamptz '2026-11-21 12:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'TNT',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'west-virginia' and a.slug = 'houston'
  and g.week = 12;

-- Western Kentucky Hilltoppers @ Liberty Flames · Sat 2026-11-21 12:00 CT · ESPN+ · Vegas — · ESPN 401871080
update games g
set kickoff_at = timestamptz '2026-11-21 12:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'liberty' and a.slug = 'western-kentucky'
  and g.week = 12;

-- Charlotte 49ers @ Tulsa Golden Hurricane · Sat 2026-11-21 13:00 CT · ESPN+ · Vegas — · ESPN 401862832
update games g
set kickoff_at = timestamptz '2026-11-21 13:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'tulsa' and a.slug = 'charlotte'
  and g.week = 12;

-- Missouri State Bears @ Jacksonville State Gamecocks · Sat 2026-11-21 13:00 CT · ESPN+ · Vegas — · ESPN 401871079
update games g
set kickoff_at = timestamptz '2026-11-21 13:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'jacksonville-state' and a.slug = 'missouri-state'
  and g.week = 12;

-- Middle Tennessee Blue Raiders @ Sam Houston Bearkats · Sat 2026-11-21 13:00 CT · ESPN+ · Vegas — · ESPN 401871081
update games g
set kickoff_at = timestamptz '2026-11-21 13:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'sam-houston' and a.slug = 'middle-tennessee'
  and g.week = 12;

-- Iowa Hawkeyes @ Illinois Fighting Illini · Sat 2026-11-21 13:30 CT · BTN · Vegas — · ESPN 401858527
update games g
set kickoff_at = timestamptz '2026-11-21 13:30:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'BTN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'illinois' and a.slug = 'iowa'
  and g.week = 12;

-- South Florida Bulls @ Florida Atlantic Owls · Sat 2026-11-21 13:30 CT · ESPN+ · Vegas — · ESPN 401862833
update games g
set kickoff_at = timestamptz '2026-11-21 13:30:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'florida-atlantic' and a.slug = 'usf'
  and g.week = 12;

-- UL Monroe Warhawks @ App State Mountaineers · Sat 2026-11-21 13:30 CT · ESPN+ · Vegas — · ESPN 401869929
update games g
set kickoff_at = timestamptz '2026-11-21 13:30:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'app-state' and a.slug = 'ul-monroe'
  and g.week = 12;

-- Coastal Carolina Chanticleers @ Louisiana Ragin' Cajuns · Sat 2026-11-21 14:00 CT · ESPN+ · Vegas — · ESPN 401869946
update games g
set kickoff_at = timestamptz '2026-11-21 14:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'louisiana' and a.slug = 'coastal-carolina'
  and g.week = 12;

-- Delaware Blue Hens @ New Mexico State Aggies · Sat 2026-11-21 14:00 CT · ESPN+ · Vegas — · ESPN 401871077
update games g
set kickoff_at = timestamptz '2026-11-21 14:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'new-mexico-state' and a.slug = 'delaware'
  and g.week = 12;

-- Florida International Panthers @ Kennesaw State Owls · Sat 2026-11-21 14:00 CT · ESPN+ · Vegas — · ESPN 401871078
update games g
set kickoff_at = timestamptz '2026-11-21 14:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'kennesaw-state' and a.slug = 'fiu'
  and g.week = 12;

-- LSU Tigers @ Tennessee Volunteers · Sat 2026-11-21 14:30 CT · ABC · Vegas — · ESPN 401856754
update games g
set kickoff_at = timestamptz '2026-11-21 14:30:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ABC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'tennessee' and a.slug = 'lsu'
  and g.week = 12;

-- Arkansas Razorbacks @ Texas Longhorns · Sat 2026-11-21 14:30 CT · ESPN · Vegas — · ESPN 401856755
update games g
set kickoff_at = timestamptz '2026-11-21 14:30:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'texas' and a.slug = 'arkansas'
  and g.week = 12;

-- Texas Tech Red Raiders @ Baylor Bears · Sat 2026-11-21 14:30 CT · FOX · Vegas — · ESPN 401856871
update games g
set kickoff_at = timestamptz '2026-11-21 14:30:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'FOX',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'baylor' and a.slug = 'texas-tech'
  and g.week = 12;

-- NC State Wolfpack @ Florida State Seminoles · Sat 2026-11-21 14:30 CT · ACC Network · Vegas — · ESPN 401858304
update games g
set kickoff_at = timestamptz '2026-11-21 14:30:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ACC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'florida-state' and a.slug = 'nc-state'
  and g.week = 12;

-- UCLA Bruins @ Michigan Wolverines · Sat 2026-11-21 14:30 CT · CBS · Vegas — · ESPN 401858528
update games g
set kickoff_at = timestamptz '2026-11-21 14:30:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'CBS',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'michigan' and a.slug = 'ucla'
  and g.week = 12;

-- Rutgers Scarlet Knights @ Penn State Nittany Lions · Sat 2026-11-21 14:30 CT · FS1 · Vegas — · ESPN 401858532
update games g
set kickoff_at = timestamptz '2026-11-21 14:30:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'penn-state' and a.slug = 'rutgers'
  and g.week = 12;

-- Indiana Hoosiers @ Washington Huskies · Sat 2026-11-21 14:30 CT · Peacock · Vegas — · ESPN 401858535
update games g
set kickoff_at = timestamptz '2026-11-21 14:30:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'Peacock',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'washington' and a.slug = 'indiana'
  and g.week = 12;

-- Old Dominion Monarchs @ UConn Huskies · Sat 2026-11-21 14:30 CT · CBSSN · Vegas — · ESPN 401861968
update games g
set kickoff_at = timestamptz '2026-11-21 14:30:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'uconn' and a.slug = 'old-dominion'
  and g.week = 12;

-- Northern Illinois Huskies @ North Dakota State Bison · Sat 2026-11-21 15:00 CT · CW · Vegas — · ESPN 401864543
update games g
set kickoff_at = timestamptz '2026-11-21 15:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'north-dakota-state' and a.slug = 'northern-illinois'
  and g.week = 12;

-- Georgia Southern Eagles @ Troy Trojans · Sat 2026-11-21 15:00 CT · ESPN+ · Vegas — · ESPN 401869953
update games g
set kickoff_at = timestamptz '2026-11-21 15:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'troy' and a.slug = 'georgia-southern'
  and g.week = 12;

-- Georgia State Panthers @ Marshall Thundering Herd · Sat 2026-11-21 15:00 CT · ESPN+ · Vegas — · ESPN 401869958
update games g
set kickoff_at = timestamptz '2026-11-21 15:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'marshall' and a.slug = 'georgia-state'
  and g.week = 12;

-- South Alabama Jaguars @ Southern Miss Golden Eagles · Sat 2026-11-21 15:00 CT · ESPN+ · Vegas — · ESPN 401871101
update games g
set kickoff_at = timestamptz '2026-11-21 15:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'southern-miss' and a.slug = 'south-alabama'
  and g.week = 12;

-- Washington State Cougars @ Texas State Bobcats · Sat 2026-11-21 17:00 CT · USA Net · Vegas — · ESPN 401860920
update games g
set kickoff_at = timestamptz '2026-11-21 17:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'USA Net',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'texas-state' and a.slug = 'washington-state'
  and g.week = 12;

-- Maryland Terrapins @ USC Trojans · Sat 2026-11-21 17:15 CT · BTN · Vegas — · ESPN 401858534
update games g
set kickoff_at = timestamptz '2026-11-21 17:15:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'BTN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'usc' and a.slug = 'maryland'
  and g.week = 12;

-- Arizona Wildcats @ Kansas State Wildcats · Sat 2026-11-21 18:00 CT · FS1 · Vegas — · ESPN 401856865
update games g
set kickoff_at = timestamptz '2026-11-21 18:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'kansas-state' and a.slug = 'arizona'
  and g.week = 12;

-- UNLV Rebels @ San José State Spartans · Sat 2026-11-21 18:00 CT · CBSSN · Vegas — · ESPN 401864544
update games g
set kickoff_at = timestamptz '2026-11-21 18:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'san-jose-state' and a.slug = 'unlv'
  and g.week = 12;

-- Arkansas State Red Wolves @ Louisiana Tech Bulldogs · Sat 2026-11-21 18:00 CT · ESPN+ · Vegas — · ESPN 401869938
update games g
set kickoff_at = timestamptz '2026-11-21 18:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'louisiana-tech' and a.slug = 'arkansas-state'
  and g.week = 12;

-- Kentucky Wildcats @ Missouri Tigers · Sat 2026-11-21 18:30 CT · SEC Network · Vegas — · ESPN 401856751
update games g
set kickoff_at = timestamptz '2026-11-21 18:30:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'SEC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'missouri' and a.slug = 'kentucky'
  and g.week = 12;

-- Georgia Bulldogs @ South Carolina Gamecocks · Sat 2026-11-21 18:30 CT · ABC · Vegas — · ESPN 401856753
update games g
set kickoff_at = timestamptz '2026-11-21 18:30:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ABC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'south-carolina' and a.slug = 'georgia'
  and g.week = 12;

-- SMU Mustangs @ Notre Dame Fighting Irish · Sat 2026-11-21 18:30 CT · NBC · Vegas — · ESPN 401858307
update games g
set kickoff_at = timestamptz '2026-11-21 18:30:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'NBC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'notre-dame' and a.slug = 'smu'
  and g.week = 12;

-- Stanford Cardinal @ California Golden Bears · Sat 2026-11-21 18:30 CT · ACC Network · Vegas — · ESPN 401858308
update games g
set kickoff_at = timestamptz '2026-11-21 18:30:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ACC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'california' and a.slug = 'stanford'
  and g.week = 12;

-- Colorado State Rams @ Fresno State Bulldogs · Sat 2026-11-21 18:30 CT · CW · Vegas — · ESPN 401860918
update games g
set kickoff_at = timestamptz '2026-11-21 18:30:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'fresno-state' and a.slug = 'colorado-state'
  and g.week = 12;

-- UTSA Roadrunners @ UAB Blazers · Sat 2026-11-21 19:00 CT · ESPNU · Vegas — · ESPN 401862836
update games g
set kickoff_at = timestamptz '2026-11-21 19:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'uab' and a.slug = 'utsa'
  and g.week = 12;

-- Utah Utes @ TCU Horned Frogs · Sat 2026-11-21 20:00 CT · FOX · Vegas — · ESPN 401856872
update games g
set kickoff_at = timestamptz '2026-11-21 20:00:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'FOX',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'tcu' and a.slug = 'utah'
  and g.week = 12;

-- San Diego State Aztecs @ Boise State Broncos · Sat 2026-11-21 20:30 CT · USA Net · Vegas — · ESPN 401860925
update games g
set kickoff_at = timestamptz '2026-11-21 20:30:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'USA Net',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'boise-state' and a.slug = 'san-diego-state'
  and g.week = 12;

-- Oklahoma State Cowboys @ Arizona State Sun Devils · Sat 2026-11-21 21:15 CT · ESPN · Vegas — · ESPN 401856870
update games g
set kickoff_at = timestamptz '2026-11-21 21:15:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'arizona-state' and a.slug = 'oklahoma-state'
  and g.week = 12;

-- Utah State Aggies @ Oregon State Beavers · Sat 2026-11-21 21:30 CT · CBSSN · Vegas — · ESPN 401860919
update games g
set kickoff_at = timestamptz '2026-11-21 21:30:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'oregon-state' and a.slug = 'utah-state'
  and g.week = 12;

-- Hawai'i Rainbow Warriors @ Nevada Wolf Pack · Sat 2026-11-21 21:30 CT · FS1 · Vegas — · ESPN 401864541
update games g
set kickoff_at = timestamptz '2026-11-21 21:30:00-06',
    kickoff_date = date '2026-11-21',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'nevada' and a.slug = 'hawaii'
  and g.week = 12;
