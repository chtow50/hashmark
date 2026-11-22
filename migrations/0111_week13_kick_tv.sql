-- Week 13 FBS–FBS kick / TV (Sunday Board + Tape ship, 2026-11-22).
-- Pack: data/week13_fbs_fbs_kick_tv_vegas_2026.json.
-- Kick = ESPN scoreboard America/Chicago civil time (timeValid only; TBD kicks stay blank). Kicks are CST (UTC-6; DST ended Nov 1).
-- TV = ESPN broadcast (single network only; blank stays null).
-- Vegas: all blank. CFBD lines list DraftKings only for Week 13 (Bovada not posted) and ESPN's only book is
-- DraftKings, so no two independent books match exactly. Nothing is filled or invented.
-- Match by home/away slug + week=13. No scores. No HX writes. No locks language.
-- 65 updates · 0 Vegas · 0 blank TV · 0 TBD kick.
-- Four ESPN Week 13 cards between teams that already met this season (Boise State @ Colorado State, San Diego State @ Washington State,
-- Texas State @ Utah State, Oregon State @ Fresno State, Sat Nov 28) have no row in the games table and are not stamped here.

-- Kent State Golden Flashes @ Eastern Michigan Eagles · Tue 2026-11-24 18:00 CT · ESPN+ · Vegas — · ESPN 401866470
update games g
set kickoff_at = timestamptz '2026-11-24 18:00:00-06',
    kickoff_date = date '2026-11-24',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'eastern-michigan' and a.slug = 'kent-state'
  and g.week = 13;

-- Miami (OH) RedHawks @ Western Michigan Broncos · Tue 2026-11-24 18:00 CT · ESPN2 · Vegas — · ESPN 401866471
update games g
set kickoff_at = timestamptz '2026-11-24 18:00:00-06',
    kickoff_date = date '2026-11-24',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'western-michigan' and a.slug = 'miami-oh'
  and g.week = 13;

-- TCU Horned Frogs @ Texas Tech Red Raiders · Thu 2026-11-26 19:00 CT · ESPN · Vegas — · ESPN 401856879
update games g
set kickoff_at = timestamptz '2026-11-26 19:00:00-06',
    kickoff_date = date '2026-11-26',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'texas-tech' and a.slug = 'tcu'
  and g.week = 13;

-- Mississippi State Bulldogs @ Ole Miss Rebels · Fri 2026-11-27 11:00 CT · ABC · Vegas — · ESPN 401856762
update games g
set kickoff_at = timestamptz '2026-11-27 11:00:00-06',
    kickoff_date = date '2026-11-27',
    tv = 'ABC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ole-miss' and a.slug = 'mississippi-state'
  and g.week = 13;

-- Nebraska Cornhuskers @ Iowa Hawkeyes · Fri 2026-11-27 11:00 CT · CBS · Vegas — · ESPN 401858536
update games g
set kickoff_at = timestamptz '2026-11-27 11:00:00-06',
    kickoff_date = date '2026-11-27',
    tv = 'CBS',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'iowa' and a.slug = 'nebraska'
  and g.week = 13;

-- Tulsa Golden Hurricane @ UTSA Roadrunners · Fri 2026-11-27 11:00 CT · ESPN · Vegas — · ESPN 401862840
update games g
set kickoff_at = timestamptz '2026-11-27 11:00:00-06',
    kickoff_date = date '2026-11-27',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'utsa' and a.slug = 'tulsa'
  and g.week = 13;

-- Buffalo Bulls @ Akron Zips · Fri 2026-11-27 11:00 CT · CBSSN · Vegas — · ESPN 401866472
update games g
set kickoff_at = timestamptz '2026-11-27 11:00:00-06',
    kickoff_date = date '2026-11-27',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'akron' and a.slug = 'buffalo'
  and g.week = 13;

-- Toledo Rockets @ Ohio Bobcats · Fri 2026-11-27 11:00 CT · ESPNU · Vegas — · ESPN 401866473
update games g
set kickoff_at = timestamptz '2026-11-27 11:00:00-06',
    kickoff_date = date '2026-11-27',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ohio' and a.slug = 'toledo'
  and g.week = 13;

-- App State Mountaineers @ South Alabama Jaguars · Fri 2026-11-27 14:00 CT · ESPN+ · Vegas — · ESPN 401869930
update games g
set kickoff_at = timestamptz '2026-11-27 14:00:00-06',
    kickoff_date = date '2026-11-27',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'south-alabama' and a.slug = 'app-state'
  and g.week = 13;

-- Florida Gators @ Florida State Seminoles · Fri 2026-11-27 14:30 CT · ABC · Vegas — · ESPN 401856759
update games g
set kickoff_at = timestamptz '2026-11-27 14:30:00-06',
    kickoff_date = date '2026-11-27',
    tv = 'ABC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'florida-state' and a.slug = 'florida'
  and g.week = 13;

-- Temple Owls @ Memphis Tigers · Fri 2026-11-27 14:30 CT · ESPN · Vegas — · ESPN 401862838
update games g
set kickoff_at = timestamptz '2026-11-27 14:30:00-06',
    kickoff_date = date '2026-11-27',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'memphis' and a.slug = 'temple'
  and g.week = 13;

-- North Dakota State Bison @ San José State Spartans · Fri 2026-11-27 14:30 CT · CBSSN · Vegas — · ESPN 401864549
update games g
set kickoff_at = timestamptz '2026-11-27 14:30:00-06',
    kickoff_date = date '2026-11-27',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'san-jose-state' and a.slug = 'north-dakota-state'
  and g.week = 13;

-- Air Force Falcons @ New Mexico Lobos · Fri 2026-11-27 15:30 CT · CW · Vegas — · ESPN 401864546
update games g
set kickoff_at = timestamptz '2026-11-27 15:30:00-06',
    kickoff_date = date '2026-11-27',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'new-mexico' and a.slug = 'air-force'
  and g.week = 13;

-- Texas Longhorns @ Texas A&M Aggies · Fri 2026-11-27 18:30 CT · ABC · Vegas — · ESPN 401856756
update games g
set kickoff_at = timestamptz '2026-11-27 18:30:00-06',
    kickoff_date = date '2026-11-27',
    tv = 'ABC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'texas-am' and a.slug = 'texas'
  and g.week = 13;

-- Minnesota Golden Gophers @ Wisconsin Badgers · Fri 2026-11-27 18:30 CT · NBC · Vegas — · ESPN 401858544
update games g
set kickoff_at = timestamptz '2026-11-27 18:30:00-06',
    kickoff_date = date '2026-11-27',
    tv = 'NBC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'wisconsin' and a.slug = 'minnesota'
  and g.week = 13;

-- West Virginia Mountaineers @ Utah Utes · Fri 2026-11-27 20:00 CT · Fox · Vegas — · ESPN 401856880
update games g
set kickoff_at = timestamptz '2026-11-27 20:00:00-06',
    kickoff_date = date '2026-11-27',
    tv = 'Fox',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'utah' and a.slug = 'west-virginia'
  and g.week = 13;

-- Louisville Cardinals @ Kentucky Wildcats · Sat 2026-11-28 11:00 CT · ESPN2 · Vegas — · ESPN 401856761
update games g
set kickoff_at = timestamptz '2026-11-28 11:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'kentucky' and a.slug = 'louisville'
  and g.week = 13;

-- Boston College Eagles @ Miami Hurricanes · Sat 2026-11-28 11:00 CT · ESPN · Vegas — · ESPN 401858311
update games g
set kickoff_at = timestamptz '2026-11-28 11:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'miami' and a.slug = 'boston-college'
  and g.week = 13;

-- NC State Wolfpack @ North Carolina Tar Heels · Sat 2026-11-28 11:00 CT · ACC Network · Vegas — · ESPN 401858313
update games g
set kickoff_at = timestamptz '2026-11-28 11:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ACC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'north-carolina' and a.slug = 'nc-state'
  and g.week = 13;

-- Notre Dame Fighting Irish @ Syracuse Orange · Sat 2026-11-28 11:00 CT · ABC · Vegas — · ESPN 401858314
update games g
set kickoff_at = timestamptz '2026-11-28 11:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ABC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'syracuse' and a.slug = 'notre-dame'
  and g.week = 13;

-- Michigan Wolverines @ Ohio State Buckeyes · Sat 2026-11-28 11:00 CT · Fox · Vegas — · ESPN 401858540
update games g
set kickoff_at = timestamptz '2026-11-28 11:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'Fox',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ohio-state' and a.slug = 'michigan'
  and g.week = 13;

-- UConn Huskies @ Wyoming Cowboys · Sat 2026-11-28 11:00 CT · FS1 · Vegas — · ESPN 401861969
update games g
set kickoff_at = timestamptz '2026-11-28 11:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'wyoming' and a.slug = 'uconn'
  and g.week = 13;

-- Navy Midshipmen @ Charlotte 49ers · Sat 2026-11-28 11:00 CT · ESPN+ · Vegas — · ESPN 401862842
update games g
set kickoff_at = timestamptz '2026-11-28 11:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'charlotte' and a.slug = 'navy'
  and g.week = 13;

-- Central Michigan Chippewas @ Ball State Cardinals · Sat 2026-11-28 11:00 CT · CBSSN · Vegas — · ESPN 401866474
update games g
set kickoff_at = timestamptz '2026-11-28 11:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ball-state' and a.slug = 'central-michigan'
  and g.week = 13;

-- Louisiana Tech Bulldogs @ Georgia Southern Eagles · Sat 2026-11-28 11:00 CT · ESPNU · Vegas — · ESPN 401869954
update games g
set kickoff_at = timestamptz '2026-11-28 11:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'georgia-southern' and a.slug = 'louisiana-tech'
  and g.week = 13;

-- Illinois Fighting Illini @ Northwestern Wildcats · Sat 2026-11-28 11:30 CT · BTN · Vegas — · ESPN 401858537
update games g
set kickoff_at = timestamptz '2026-11-28 11:30:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'BTN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'northwestern' and a.slug = 'illinois'
  and g.week = 13;

-- LSU Tigers @ Arkansas Razorbacks · Sat 2026-11-28 11:45 CT · SEC Network · Vegas — · ESPN 401856758
update games g
set kickoff_at = timestamptz '2026-11-28 11:45:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'SEC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'arkansas' and a.slug = 'lsu'
  and g.week = 13;

-- Florida Atlantic Owls @ East Carolina Pirates · Sat 2026-11-28 12:00 CT · ESPN+ · Vegas — · ESPN 401862837
update games g
set kickoff_at = timestamptz '2026-11-28 12:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'east-carolina' and a.slug = 'florida-atlantic'
  and g.week = 13;

-- Kennesaw State Owls @ Western Kentucky Hilltoppers · Sat 2026-11-28 12:00 CT · ESPN+ · Vegas — · ESPN 401870804
update games g
set kickoff_at = timestamptz '2026-11-28 12:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'western-kentucky' and a.slug = 'kennesaw-state'
  and g.week = 13;

-- Marshall Thundering Herd @ UL Monroe Warhawks · Sat 2026-11-28 12:00 CT · ESPN+ · Vegas — · ESPN 401871102
update games g
set kickoff_at = timestamptz '2026-11-28 12:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ul-monroe' and a.slug = 'marshall'
  and g.week = 13;

-- Southern Miss Golden Eagles @ Old Dominion Monarchs · Sat 2026-11-28 12:00 CT · ESPN+ · Vegas — · ESPN 401871103
update games g
set kickoff_at = timestamptz '2026-11-28 12:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'old-dominion' and a.slug = 'southern-miss'
  and g.week = 13;

-- UCF Knights @ Colorado Buffaloes · Sat 2026-11-28 13:00 CT · TNT · Vegas — · ESPN 401856875
update games g
set kickoff_at = timestamptz '2026-11-28 13:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'TNT',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'colorado' and a.slug = 'ucf'
  and g.week = 13;

-- Kansas State Wildcats @ Iowa State Cyclones · Sat 2026-11-28 13:00 CT · ESPN+ · Vegas — · ESPN 401856878
update games g
set kickoff_at = timestamptz '2026-11-28 13:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'iowa-state' and a.slug = 'kansas-state'
  and g.week = 13;

-- Army Black Knights @ Rice Owls · Sat 2026-11-28 13:00 CT · ESPN+ · Vegas — · ESPN 401862841
update games g
set kickoff_at = timestamptz '2026-11-28 13:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'rice' and a.slug = 'army'
  and g.week = 13;

-- Coastal Carolina Chanticleers @ James Madison Dukes · Sat 2026-11-28 13:00 CT · ESPN+ · Vegas — · ESPN 401869947
update games g
set kickoff_at = timestamptz '2026-11-28 13:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'james-madison' and a.slug = 'coastal-carolina'
  and g.week = 13;

-- Louisiana Ragin' Cajuns @ Georgia State Panthers · Sat 2026-11-28 13:00 CT · ESPN+ · Vegas — · ESPN 401869959
update games g
set kickoff_at = timestamptz '2026-11-28 13:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'georgia-state' and a.slug = 'louisiana'
  and g.week = 13;

-- Liberty Flames @ Missouri State Bears · Sat 2026-11-28 13:00 CT · ESPN+ · Vegas — · ESPN 401871063
update games g
set kickoff_at = timestamptz '2026-11-28 13:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'missouri-state' and a.slug = 'liberty'
  and g.week = 13;

-- Sam Houston Bearkats @ Florida International Panthers · Sat 2026-11-28 13:00 CT · ESPN+ · Vegas — · ESPN 401871082
update games g
set kickoff_at = timestamptz '2026-11-28 13:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'fiu' and a.slug = 'sam-houston'
  and g.week = 13;

-- New Mexico State Aggies @ Middle Tennessee Blue Raiders · Sat 2026-11-28 13:00 CT · ESPN+ · Vegas — · ESPN 401871083
update games g
set kickoff_at = timestamptz '2026-11-28 13:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'middle-tennessee' and a.slug = 'new-mexico-state'
  and g.week = 13;

-- South Carolina Gamecocks @ Clemson Tigers · Sat 2026-11-28 14:00 CT · ESPN2 · Vegas — · ESPN 401856764
update games g
set kickoff_at = timestamptz '2026-11-28 14:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'clemson' and a.slug = 'south-carolina'
  and g.week = 13;

-- Virginia Cavaliers @ Virginia Tech Hokies · Sat 2026-11-28 14:00 CT · CW · Vegas — · ESPN 401858317
update games g
set kickoff_at = timestamptz '2026-11-28 14:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'CW',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'virginia-tech' and a.slug = 'virginia'
  and g.week = 13;

-- Troy Trojans @ Arkansas State Red Wolves · Sat 2026-11-28 14:00 CT · ESPN+ · Vegas — · ESPN 401869939
update games g
set kickoff_at = timestamptz '2026-11-28 14:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'arkansas-state' and a.slug = 'troy'
  and g.week = 13;

-- Georgia Tech Yellow Jackets @ Georgia Bulldogs · Sat 2026-11-28 14:30 CT · ABC · Vegas — · ESPN 401856760
update games g
set kickoff_at = timestamptz '2026-11-28 14:30:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ABC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'georgia' and a.slug = 'georgia-tech'
  and g.week = 13;

-- Cincinnati Bearcats @ BYU Cougars · Sat 2026-11-28 14:30 CT · Fox · Vegas — · ESPN 401856876
update games g
set kickoff_at = timestamptz '2026-11-28 14:30:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'Fox',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'byu' and a.slug = 'cincinnati'
  and g.week = 13;

-- Duke Blue Devils @ Wake Forest Demon Deacons · Sat 2026-11-28 14:30 CT · ESPN · Vegas — · ESPN 401858312
update games g
set kickoff_at = timestamptz '2026-11-28 14:30:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'wake-forest' and a.slug = 'duke'
  and g.week = 13;

-- SMU Mustangs @ Stanford Cardinal · Sat 2026-11-28 14:30 CT · ACC Network · Vegas — · ESPN 401858316
update games g
set kickoff_at = timestamptz '2026-11-28 14:30:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ACC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'stanford' and a.slug = 'smu'
  and g.week = 13;

-- Penn State Nittany Lions @ Maryland Terrapins · Sat 2026-11-28 14:30 CT · FS1 · Vegas — · ESPN 401858539
update games g
set kickoff_at = timestamptz '2026-11-28 14:30:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'maryland' and a.slug = 'penn-state'
  and g.week = 13;

-- USC Trojans @ UCLA Bruins · Sat 2026-11-28 14:30 CT · CBS · Vegas — · ESPN 401858543
update games g
set kickoff_at = timestamptz '2026-11-28 14:30:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'CBS',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ucla' and a.slug = 'usc'
  and g.week = 13;

-- Tulane Green Wave @ South Florida Bulls · Sat 2026-11-28 14:30 CT · ESPN+ · Vegas — · ESPN 401862839
update games g
set kickoff_at = timestamptz '2026-11-28 14:30:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'usf' and a.slug = 'tulane'
  and g.week = 13;

-- UTEP Miners @ Northern Illinois Huskies · Sat 2026-11-28 14:30 CT · MW+ · Vegas — · ESPN 401864550
update games g
set kickoff_at = timestamptz '2026-11-28 14:30:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'MW+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'northern-illinois' and a.slug = 'utep'
  and g.week = 13;

-- Massachusetts Minutemen @ Bowling Green Falcons · Sat 2026-11-28 14:30 CT · ESPN+ · Vegas — · ESPN 401866475
update games g
set kickoff_at = timestamptz '2026-11-28 14:30:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'bowling-green' and a.slug = 'massachusetts'
  and g.week = 13;

-- Jacksonville State Gamecocks @ Delaware Blue Hens · Sat 2026-11-28 14:30 CT · CBSSN · Vegas — · ESPN 401871062
update games g
set kickoff_at = timestamptz '2026-11-28 14:30:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'delaware' and a.slug = 'jacksonville-state'
  and g.week = 13;

-- UAB Blazers @ North Texas Mean Green · Sat 2026-11-28 15:00 CT · ESPNU · Vegas — · ESPN 401862843
update games g
set kickoff_at = timestamptz '2026-11-28 15:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPNU',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'north-texas' and a.slug = 'uab'
  and g.week = 13;

-- Oklahoma Sooners @ Missouri Tigers · Sat 2026-11-28 15:15 CT · SEC Network · Vegas — · ESPN 401856763
update games g
set kickoff_at = timestamptz '2026-11-28 15:15:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'SEC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'missouri' and a.slug = 'oklahoma'
  and g.week = 13;

-- Michigan State Spartans @ Rutgers Scarlet Knights · Sat 2026-11-28 15:15 CT · BTN · Vegas — · ESPN 401858542
update games g
set kickoff_at = timestamptz '2026-11-28 15:15:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'BTN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'rutgers' and a.slug = 'michigan-state'
  and g.week = 13;

-- Kansas Jayhawks @ Oklahoma State Cowboys · Sat 2026-11-28 17:15 CT · ESPN2 · Vegas — · ESPN 401856877
update games g
set kickoff_at = timestamptz '2026-11-28 17:15:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'oklahoma-state' and a.slug = 'kansas'
  and g.week = 13;

-- Tennessee Volunteers @ Vanderbilt Commodores · Sat 2026-11-28 18:00 CT · ESPN · Vegas — · ESPN 401856765
update games g
set kickoff_at = timestamptz '2026-11-28 18:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'vanderbilt' and a.slug = 'tennessee'
  and g.week = 13;

-- Purdue Boilermakers @ Indiana Hoosiers · Sat 2026-11-28 18:00 CT · FS1 · Vegas — · ESPN 401858538
update games g
set kickoff_at = timestamptz '2026-11-28 18:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'FS1',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'indiana' and a.slug = 'purdue'
  and g.week = 13;

-- Auburn Tigers @ Alabama Crimson Tide · Sat 2026-11-28 18:30 CT · ABC · Vegas — · ESPN 401856757
update games g
set kickoff_at = timestamptz '2026-11-28 18:30:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ABC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'alabama' and a.slug = 'auburn'
  and g.week = 13;

-- Pittsburgh Panthers @ California Golden Bears · Sat 2026-11-28 18:30 CT · ACC Network · Vegas — · ESPN 401858315
update games g
set kickoff_at = timestamptz '2026-11-28 18:30:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ACC Network',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'california' and a.slug = 'pittsburgh'
  and g.week = 13;

-- Washington Huskies @ Oregon Ducks · Sat 2026-11-28 18:30 CT · NBC · Vegas — · ESPN 401858541
update games g
set kickoff_at = timestamptz '2026-11-28 18:30:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'NBC',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'oregon' and a.slug = 'washington'
  and g.week = 13;

-- Arizona State Sun Devils @ Arizona Wildcats · Sat 2026-11-28 20:00 CT · Fox · Vegas — · ESPN 401856873
update games g
set kickoff_at = timestamptz '2026-11-28 20:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'Fox',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'arizona' and a.slug = 'arizona-state'
  and g.week = 13;

-- Nevada Wolf Pack @ UNLV Rebels · Sat 2026-11-28 20:00 CT · CBSSN · Vegas — · ESPN 401864548
update games g
set kickoff_at = timestamptz '2026-11-28 20:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'CBSSN',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'unlv' and a.slug = 'nevada'
  and g.week = 13;

-- Baylor Bears @ Houston Cougars · Sat 2026-11-28 20:30 CT · ESPN2 · Vegas — · ESPN 401856874
update games g
set kickoff_at = timestamptz '2026-11-28 20:30:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'ESPN2',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'houston' and a.slug = 'baylor'
  and g.week = 13;

-- Sacramento State Hornets @ Hawai'i Rainbow Warriors · Sat 2026-11-28 22:00 CT · MW+ · Vegas — · ESPN 401864547
update games g
set kickoff_at = timestamptz '2026-11-28 22:00:00-06',
    kickoff_date = date '2026-11-28',
    tv = 'MW+',
    vegas_spread = null,
    vegas_total = null
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'hawaii' and a.slug = 'sacramento-state'
  and g.week = 13;
