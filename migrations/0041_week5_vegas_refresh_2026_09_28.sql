-- Week 5 FBS–FBS kick / TV / Vegas refresh from Research CLEAR pack
-- data/week5_vegas_clear_pack_2026-09-28.json (as_of 2026-09-28 09:34 CT).
-- Memo: data/week5_vegas_clear_pack_2026-09-28.md.
-- Website peer CLEAR: data/week5_vegas_clear_pack_website_peer_clear_2026-09-28.md.
-- Supersedes 0036_week5_kick_tv_vegas.sql (Sep 24 archive: 6 CLEAR · 49 HOLD · 41 blank Vegas).
-- Archive data/week5_fbs_fbs_kick_tv_vegas_2026.{md,json} stays in place.
-- vegas_details is the DraftKings favorite line (e.g. NMSU -2.5).
-- Pack vegas_spread is home-perspective (negative = home favored).
-- SQL stores the board convention: positive = home favored.
-- board_vegas_spread = -pack.vegas_spread when the pack home matches.
-- Favorite abbrev is matched to the Sep 24 home_short / away_short on that card.
-- Match by home/away slug + week=5. ESPN id is comment-only; games has no event-id column.
-- kickoff_at / kickoff_date use ESPN America/Chicago civil time (kick_ct). Oct 2026 is CDT (−05).
-- HOLD (TV) Auburn @ Tennessee: stamp kick + TENN -7 / 54.5; leave tv null.
-- 55 updates · 54 CLEAR · 1 HOLD (TV) · 0 blank Vegas · 1 blank TV.
-- 41 NEW lines · 14 MOVED · 4 kick gains · 9 TV gains.
-- No scores. No HX writes. No locks. Live desk week stays 4. Soft-cal FLAG stays.
-- Week-scoped featured for /schedule?w=5: Pittsburgh @ Virginia Tech · Fri 18:00 CT · ESPN · VT -3.5 / 52.5 (MOVED from -5.5 / 56.5).
-- Live desk / homepage featured stay as-is (earliest Week 5 kick, not this pin). Every site is the home stadium.

-- Western Kentucky @ New Mexico State · Thu 2026-10-01 19:00 CT · CBSSN · NMSU -2.5 / O/U 54.5 · CLEAR · NEW · day-risk: ESPN CT Thu 2026-10-01 19:00 (HM Friday, Oct 2) · ESPN 401871049
update games g
set kickoff_at = timestamptz '2026-10-01 19:00:00-05',
    kickoff_date = date '2026-10-01',
    tv = 'CBSSN',
    vegas_spread = case when h.slug = 'new-mexico-state' then 2.5 else -2.5 end,
    vegas_total = 54.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'new-mexico-state' and a.slug = 'western-kentucky')
    or (h.slug = 'western-kentucky' and a.slug = 'new-mexico-state'))
  and g.week = 5;

-- North Texas @ Tulsa · Thu 2026-10-01 20:00 CT · ESPN · TLSA -1.5 / O/U 57.5 · CLEAR · NEW · day-risk: ESPN CT Thu 2026-10-01 20:00 (HM Friday, Oct 2) · ESPN 401862786
update games g
set kickoff_at = timestamptz '2026-10-01 20:00:00-05',
    kickoff_date = date '2026-10-01',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'tulsa' then 1.5 else -1.5 end,
    vegas_total = 57.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'tulsa' and a.slug = 'north-texas')
    or (h.slug = 'north-texas' and a.slug = 'tulsa'))
  and g.week = 5;

-- Liberty @ Delaware · Fri 2026-10-02 18:00 CT · CBSSN · LIB -7 / O/U 49.5 · CLEAR · NEW · ESPN 401871050
update games g
set kickoff_at = timestamptz '2026-10-02 18:00:00-05',
    kickoff_date = date '2026-10-02',
    tv = 'CBSSN',
    vegas_spread = case when h.slug = 'delaware' then -7 else 7 end,
    vegas_total = 49.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'delaware' and a.slug = 'liberty')
    or (h.slug = 'liberty' and a.slug = 'delaware'))
  and g.week = 5;

-- Pittsburgh @ Virginia Tech · Fri 2026-10-02 18:00 CT · ESPN · VT -3.5 / O/U 52.5 · CLEAR · MOVED · ESPN 401858245
update games g
set kickoff_at = timestamptz '2026-10-02 18:00:00-05',
    kickoff_date = date '2026-10-02',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'virginia-tech' then 3.5 else -3.5 end,
    vegas_total = 52.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'virginia-tech' and a.slug = 'pittsburgh')
    or (h.slug = 'pittsburgh' and a.slug = 'virginia-tech'))
  and g.week = 5;

-- Penn State @ Northwestern · Fri 2026-10-02 19:00 CT · FOX · PSU -2.5 / O/U 46.5 · CLEAR · MOVED · day-risk: ESPN CT Fri 2026-10-02 19:00 (HM Saturday, Oct 3) · ESPN 401858476
update games g
set kickoff_at = timestamptz '2026-10-02 19:00:00-05',
    kickoff_date = date '2026-10-02',
    tv = 'FOX',
    vegas_spread = case when h.slug = 'northwestern' then -2.5 else 2.5 end,
    vegas_total = 46.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'northwestern' and a.slug = 'penn-state')
    or (h.slug = 'penn-state' and a.slug = 'northwestern'))
  and g.week = 5;

-- Boston College @ SMU · Sat 2026-10-03 11:00 CT · CW · SMU -20.5 / O/U 56.5 · CLEAR · NEW · ESPN 401858246
update games g
set kickoff_at = timestamptz '2026-10-03 11:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'CW',
    vegas_spread = case when h.slug = 'smu' then 20.5 else -20.5 end,
    vegas_total = 56.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'smu' and a.slug = 'boston-college')
    or (h.slug = 'boston-college' and a.slug = 'smu'))
  and g.week = 5;

-- Michigan @ Minnesota · Sat 2026-10-03 11:00 CT · FOX · MICH -5.5 / O/U 43.5 · CLEAR · MOVED · ESPN 401858474
update games g
set kickoff_at = timestamptz '2026-10-03 11:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'FOX',
    vegas_spread = case when h.slug = 'minnesota' then -5.5 else 5.5 end,
    vegas_total = 43.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'minnesota' and a.slug = 'michigan')
    or (h.slug = 'michigan' and a.slug = 'minnesota'))
  and g.week = 5;

-- Middle Tennessee @ Kansas · Sat 2026-10-03 11:00 CT · ESPNU · KU -18.5 / O/U 50.5 · CLEAR · NEW · ESPN 401856807
update games g
set kickoff_at = timestamptz '2026-10-03 11:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPNU',
    vegas_spread = case when h.slug = 'kansas' then 18.5 else -18.5 end,
    vegas_total = 50.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'kansas' and a.slug = 'middle-tennessee')
    or (h.slug = 'middle-tennessee' and a.slug = 'kansas'))
  and g.week = 5;

-- Navy @ Air Force · Sat 2026-10-03 11:00 CT · CBS · AFA -3.5 / O/U 46.5 · CLEAR · NEW · ESPN 401862791
update games g
set kickoff_at = timestamptz '2026-10-03 11:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'CBS',
    vegas_spread = case when h.slug = 'air-force' then 3.5 else -3.5 end,
    vegas_total = 46.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'air-force' and a.slug = 'navy')
    or (h.slug = 'navy' and a.slug = 'air-force'))
  and g.week = 5;

-- Stanford @ Wake Forest · Sat 2026-10-03 11:00 CT · ACC Network · WAKE -12.5 / O/U 54.5 · CLEAR · NEW · ESPN 401858251
update games g
set kickoff_at = timestamptz '2026-10-03 11:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ACC Network',
    vegas_spread = case when h.slug = 'wake-forest' then 12.5 else -12.5 end,
    vegas_total = 54.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'wake-forest' and a.slug = 'stanford')
    or (h.slug = 'stanford' and a.slug = 'wake-forest'))
  and g.week = 5;

-- Syracuse @ UConn · Sat 2026-10-03 11:00 CT · CBSSN · SYR -6 / O/U 51.5 · CLEAR · NEW · ESPN 401858252
update games g
set kickoff_at = timestamptz '2026-10-03 11:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'CBSSN',
    vegas_spread = case when h.slug = 'uconn' then -6 else 6 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'uconn' and a.slug = 'syracuse')
    or (h.slug = 'syracuse' and a.slug = 'uconn'))
  and g.week = 5;

-- UCF @ Houston · Sat 2026-10-03 11:00 CT · ESPN2 · HOU -10.5 / O/U 51.5 · CLEAR · NEW · ESPN 401856819
update games g
set kickoff_at = timestamptz '2026-10-03 11:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN2',
    vegas_spread = case when h.slug = 'houston' then 10.5 else -10.5 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'houston' and a.slug = 'ucf')
    or (h.slug = 'ucf' and a.slug = 'houston'))
  and g.week = 5;

-- West Virginia @ Iowa State · Sat 2026-10-03 11:00 CT · TNT · ISU -3.5 / O/U 53.5 · CLEAR · NEW · ESPN 401856822
update games g
set kickoff_at = timestamptz '2026-10-03 11:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'TNT',
    vegas_spread = case when h.slug = 'iowa-state' then 3.5 else -3.5 end,
    vegas_total = 53.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'iowa-state' and a.slug = 'west-virginia')
    or (h.slug = 'west-virginia' and a.slug = 'iowa-state'))
  and g.week = 5;

-- Michigan State @ Wisconsin · Sat 2026-10-03 11:30 CT · BTN · WIS -10 / O/U 44.5 · CLEAR · NEW · ESPN 401858479
update games g
set kickoff_at = timestamptz '2026-10-03 11:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'BTN',
    vegas_spread = case when h.slug = 'wisconsin' then 10 else -10 end,
    vegas_total = 44.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'wisconsin' and a.slug = 'michigan-state')
    or (h.slug = 'michigan-state' and a.slug = 'wisconsin'))
  and g.week = 5;

-- Western Michigan @ Buffalo · Sat 2026-10-03 12:00 CT · ESPN+ · WMU -13.5 / O/U 47.5 · CLEAR · NEW · ESPN 401866432
update games g
set kickoff_at = timestamptz '2026-10-03 12:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'buffalo' then -13.5 else 13.5 end,
    vegas_total = 47.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'buffalo' and a.slug = 'western-michigan')
    or (h.slug = 'western-michigan' and a.slug = 'buffalo'))
  and g.week = 5;

-- Toledo @ Ball State · Sat 2026-10-03 13:00 CT · ESPN+ · TOL -19.5 / O/U 51.5 · CLEAR · NEW · ESPN 401866431
update games g
set kickoff_at = timestamptz '2026-10-03 13:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'ball-state' then -19.5 else 19.5 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'ball-state' and a.slug = 'toledo')
    or (h.slug = 'toledo' and a.slug = 'ball-state'))
  and g.week = 5;

-- Akron @ Central Michigan · Sat 2026-10-03 14:30 CT · ESPN+ · CMU -6 / O/U 47.5 · CLEAR · NEW · ESPN 401866430
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'central-michigan' then 6 else -6 end,
    vegas_total = 47.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'central-michigan' and a.slug = 'akron')
    or (h.slug = 'akron' and a.slug = 'central-michigan'))
  and g.week = 5;

-- Auburn @ Tennessee · Sat 2026-10-03 14:30 CT · TV — · TENN -7 / O/U 54.5 · HOLD (TV) · MOVED · ESPN 401856710
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = null,
    vegas_spread = case when h.slug = 'tennessee' then 7 else -7 end,
    vegas_total = 54.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'tennessee' and a.slug = 'auburn')
    or (h.slug = 'auburn' and a.slug = 'tennessee'))
  and g.week = 5;

-- Bowling Green @ Miami (OH) · Sat 2026-10-03 14:30 CT · ESPN+ · M-OH -13.5 / O/U 46.5 · CLEAR · NEW · ESPN 401866477
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'miami-oh' then 13.5 else -13.5 end,
    vegas_total = 46.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'miami-oh' and a.slug = 'bowling-green')
    or (h.slug = 'bowling-green' and a.slug = 'miami-oh'))
  and g.week = 5;

-- California @ UNLV · Sat 2026-10-03 14:30 CT · CBSSN · UNLV -2.5 / O/U 53.5 · CLEAR · NEW · ESPN 401858247
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'CBSSN',
    vegas_spread = case when h.slug = 'unlv' then 2.5 else -2.5 end,
    vegas_total = 53.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'unlv' and a.slug = 'california')
    or (h.slug = 'california' and a.slug = 'unlv'))
  and g.week = 5;

-- Eastern Michigan @ Massachusetts · Sat 2026-10-03 14:30 CT · ESPN+ · MASS -4.5 / O/U 48.5 · CLEAR · NEW · ESPN 401866433
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'massachusetts' then 4.5 else -4.5 end,
    vegas_total = 48.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'massachusetts' and a.slug = 'eastern-michigan')
    or (h.slug = 'eastern-michigan' and a.slug = 'massachusetts'))
  and g.week = 5;

-- Florida @ Missouri · Sat 2026-10-03 14:30 CT · ABC · FLA -4.5 / O/U 56.5 · CLEAR · MOVED · TV GAIN · ESPN 401856708
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ABC',
    vegas_spread = case when h.slug = 'missouri' then -4.5 else 4.5 end,
    vegas_total = 56.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'missouri' and a.slug = 'florida')
    or (h.slug = 'florida' and a.slug = 'missouri'))
  and g.week = 5;

-- Louisville @ NC State · Sat 2026-10-03 14:30 CT · ACC Network · LOU -6.5 / O/U 60.5 · CLEAR · MOVED · TV GAIN · ESPN 401858248
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ACC Network',
    vegas_spread = case when h.slug = 'nc-state' then -6.5 else 6.5 end,
    vegas_total = 60.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'nc-state' and a.slug = 'louisville')
    or (h.slug = 'louisville' and a.slug = 'nc-state'))
  and g.week = 5;

-- Memphis @ Charlotte · Sat 2026-10-03 14:30 CT · ESPN+ · MEM -20.5 / O/U 54.5 · CLEAR · NEW · ESPN 401862787
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'charlotte' then -20.5 else 20.5 end,
    vegas_total = 54.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'charlotte' and a.slug = 'memphis')
    or (h.slug = 'memphis' and a.slug = 'charlotte'))
  and g.week = 5;

-- Ohio @ Kent State · Sat 2026-10-03 14:30 CT · ESPN+ · OHIO -3 / O/U 50.5 · CLEAR · NEW · ESPN 401866434
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'kent-state' then -3 else 3 end,
    vegas_total = 50.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'kent-state' and a.slug = 'ohio')
    or (h.slug = 'ohio' and a.slug = 'kent-state'))
  and g.week = 5;

-- Ohio State @ Iowa · Sat 2026-10-03 14:30 CT · CBS · OSU -13.5 / O/U 45.5 · CLEAR · MOVED · ESPN 401858473
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'CBS',
    vegas_spread = case when h.slug = 'iowa' then -13.5 else 13.5 end,
    vegas_total = 45.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'iowa' and a.slug = 'ohio-state')
    or (h.slug = 'ohio-state' and a.slug = 'iowa'))
  and g.week = 5;

-- Old Dominion @ Georgia State · Sat 2026-10-03 14:30 CT · ESPN+ · GAST -1.5 / O/U 50.5 · CLEAR · NEW · ESPN 401869956
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'georgia-state' then 1.5 else -1.5 end,
    vegas_total = 50.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'georgia-state' and a.slug = 'old-dominion')
    or (h.slug = 'old-dominion' and a.slug = 'georgia-state'))
  and g.week = 5;

-- Virginia @ Florida State · Sat 2026-10-03 14:30 CT · ESPN2 · UVA -2.5 / O/U 51.5 · CLEAR · NEW · TV GAIN · ESPN 401858253
update games g
set kickoff_at = timestamptz '2026-10-03 14:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN2',
    vegas_spread = case when h.slug = 'florida-state' then -2.5 else 2.5 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'florida-state' and a.slug = 'virginia')
    or (h.slug = 'virginia' and a.slug = 'florida-state'))
  and g.week = 5;

-- Marshall @ James Madison · Sat 2026-10-03 14:45 CT · ESPNU · JMU -18.5 / O/U 54.5 · CLEAR · NEW · ESPN 401869962
update games g
set kickoff_at = timestamptz '2026-10-03 14:45:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPNU',
    vegas_spread = case when h.slug = 'james-madison' then 18.5 else -18.5 end,
    vegas_total = 54.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'james-madison' and a.slug = 'marshall')
    or (h.slug = 'marshall' and a.slug = 'james-madison'))
  and g.week = 5;

-- Maryland @ Nebraska · Sat 2026-10-03 15:00 CT · FS1 · NEB -14.5 / O/U 52.5 · CLEAR · NEW · ESPN 401858475
update games g
set kickoff_at = timestamptz '2026-10-03 15:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'FS1',
    vegas_spread = case when h.slug = 'nebraska' then 14.5 else -14.5 end,
    vegas_total = 52.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'nebraska' and a.slug = 'maryland')
    or (h.slug = 'maryland' and a.slug = 'nebraska'))
  and g.week = 5;

-- UTEP @ New Mexico · Sat 2026-10-03 15:00 CT · MW+ · UNM -22.5 / O/U 48.5 · CLEAR · NEW · ESPN 401864514
update games g
set kickoff_at = timestamptz '2026-10-03 15:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'MW+',
    vegas_spread = case when h.slug = 'new-mexico' then 22.5 else -22.5 end,
    vegas_total = 48.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'new-mexico' and a.slug = 'utep')
    or (h.slug = 'utep' and a.slug = 'new-mexico'))
  and g.week = 5;

-- Kentucky @ South Carolina · Sat 2026-10-03 15:15 CT · SEC Network · SC -2.5 / O/U 53.5 · CLEAR · MOVED · ESPN 401856709
update games g
set kickoff_at = timestamptz '2026-10-03 15:15:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'SEC Network',
    vegas_spread = case when h.slug = 'south-carolina' then 2.5 else -2.5 end,
    vegas_total = 53.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'south-carolina' and a.slug = 'kentucky')
    or (h.slug = 'kentucky' and a.slug = 'south-carolina'))
  and g.week = 5;

-- Purdue @ Illinois · Sat 2026-10-03 15:15 CT · BTN · ILL -10 / O/U 60.5 · CLEAR · NEW · ESPN 401858472
update games g
set kickoff_at = timestamptz '2026-10-03 15:15:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'BTN',
    vegas_spread = case when h.slug = 'illinois' then 10 else -10 end,
    vegas_total = 60.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'illinois' and a.slug = 'purdue')
    or (h.slug = 'purdue' and a.slug = 'illinois'))
  and g.week = 5;

-- Oregon State @ Colorado State · Sat 2026-10-03 17:00 CT · USA Net · ORST -4.5 / O/U 61.5 · CLEAR · NEW · ESPN 401860899
update games g
set kickoff_at = timestamptz '2026-10-03 17:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'USA Net',
    vegas_spread = case when h.slug = 'colorado-state' then -4.5 else 4.5 end,
    vegas_total = 61.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'colorado-state' and a.slug = 'oregon-state')
    or (h.slug = 'oregon-state' and a.slug = 'colorado-state'))
  and g.week = 5;

-- Arkansas @ Texas A&M · Sat 2026-10-03 18:00 CT · ESPN2 · TA&M -14 / O/U 51.5 · CLEAR · NEW · TV GAIN · ESPN 401856711
update games g
set kickoff_at = timestamptz '2026-10-03 18:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN2',
    vegas_spread = case when h.slug = 'texas-am' then 14 else -14 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'texas-am' and a.slug = 'arkansas')
    or (h.slug = 'arkansas' and a.slug = 'texas-am'))
  and g.week = 5;

-- BYU @ TCU · Sat 2026-10-03 18:00 CT · ESPN · BYU -6.5 / O/U 48.5 · CLEAR · MOVED · TV GAIN · ESPN 401856818
update games g
set kickoff_at = timestamptz '2026-10-03 18:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'tcu' then -6.5 else 6.5 end,
    vegas_total = 48.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'tcu' and a.slug = 'byu')
    or (h.slug = 'byu' and a.slug = 'tcu'))
  and g.week = 5;

-- Georgia Southern @ Coastal Carolina · Sat 2026-10-03 18:00 CT · ESPN+ · GASO -2.5 / O/U 54.5 · CLEAR · NEW · ESPN 401869942
update games g
set kickoff_at = timestamptz '2026-10-03 18:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'coastal-carolina' then -2.5 else 2.5 end,
    vegas_total = 54.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'coastal-carolina' and a.slug = 'georgia-southern')
    or (h.slug = 'georgia-southern' and a.slug = 'coastal-carolina'))
  and g.week = 5;

-- UL Monroe @ South Alabama · Sat 2026-10-03 18:00 CT · ESPN+ · USA -14 / O/U 55.5 · CLEAR · NEW · ESPN 401871089
update games g
set kickoff_at = timestamptz '2026-10-03 18:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'south-alabama' then 14 else -14 end,
    vegas_total = 55.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'south-alabama' and a.slug = 'ul-monroe')
    or (h.slug = 'ul-monroe' and a.slug = 'south-alabama'))
  and g.week = 5;

-- UTSA @ Rice · Sat 2026-10-03 18:00 CT · ESPN+ · UTSA -10.5 / O/U 54.5 · CLEAR · NEW · ESPN 401862788
update games g
set kickoff_at = timestamptz '2026-10-03 18:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'rice' then -10.5 else 10.5 end,
    vegas_total = 54.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'rice' and a.slug = 'utsa')
    or (h.slug = 'utsa' and a.slug = 'rice'))
  and g.week = 5;

-- Army @ Louisiana Tech · Sat 2026-10-03 18:30 CT · ESPN+ · ARMY -3 / O/U 46.5 · CLEAR · NEW · ESPN 401869842
update games g
set kickoff_at = timestamptz '2026-10-03 18:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'louisiana-tech' then -3 else 3 end,
    vegas_total = 46.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'louisiana-tech' and a.slug = 'army')
    or (h.slug = 'army' and a.slug = 'louisiana-tech'))
  and g.week = 5;

-- Temple @ South Florida · Sat 2026-10-03 18:30 CT · ESPNU · USF -6 / O/U 51.5 · CLEAR · NEW · ESPN 401862792
update games g
set kickoff_at = timestamptz '2026-10-03 18:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPNU',
    vegas_spread = case when h.slug = 'usf' then 6 else -6 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'usf' and a.slug = 'temple')
    or (h.slug = 'temple' and a.slug = 'usf'))
  and g.week = 5;

-- Texas Tech @ Colorado · Sat 2026-10-03 18:30 CT · FOX · TTU -13.5 / O/U 50.5 · CLEAR · NEW · ESPN 401856821
update games g
set kickoff_at = timestamptz '2026-10-03 18:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'FOX',
    vegas_spread = case when h.slug = 'colorado' then -13.5 else 13.5 end,
    vegas_total = 50.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'colorado' and a.slug = 'texas-tech')
    or (h.slug = 'texas-tech' and a.slug = 'colorado'))
  and g.week = 5;

-- Utah State @ Boise State · Sat 2026-10-03 18:30 CT · CBSSN · BOIS -20.5 / O/U 51.5 · CLEAR · NEW · ESPN 401860898
update games g
set kickoff_at = timestamptz '2026-10-03 18:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'CBSSN',
    vegas_spread = case when h.slug = 'boise-state' then 20.5 else -20.5 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'boise-state' and a.slug = 'utah-state')
    or (h.slug = 'utah-state' and a.slug = 'boise-state'))
  and g.week = 5;

-- Washington @ USC · Sat 2026-10-03 18:30 CT · NBC · USC -9.5 / O/U 56.5 · CLEAR · MOVED · ESPN 401858478
update games g
set kickoff_at = timestamptz '2026-10-03 18:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'NBC',
    vegas_spread = case when h.slug = 'usc' then 9.5 else -9.5 end,
    vegas_total = 56.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'usc' and a.slug = 'washington')
    or (h.slug = 'washington' and a.slug = 'usc'))
  and g.week = 5;

-- Arkansas State @ Louisiana · Sat 2026-10-03 19:00 CT · ESPN+ · UL -6.5 / O/U 47.5 · CLEAR · NEW · ESPN 401869932
update games g
set kickoff_at = timestamptz '2026-10-03 19:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN+',
    vegas_spread = case when h.slug = 'louisiana' then 6.5 else -6.5 end,
    vegas_total = 47.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'louisiana' and a.slug = 'arkansas-state')
    or (h.slug = 'arkansas-state' and a.slug = 'louisiana'))
  and g.week = 5;

-- Indiana @ Rutgers · Sat 2026-10-03 19:00 CT · BTN · IU -24.5 / O/U 55.5 · CLEAR · NEW · day-risk: ESPN CT Sat 2026-10-03 19:00 (HM Sunday, Oct 4) · ESPN 401858477
update games g
set kickoff_at = timestamptz '2026-10-03 19:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'BTN',
    vegas_spread = case when h.slug = 'rutgers' then -24.5 else 24.5 end,
    vegas_total = 55.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'rutgers' and a.slug = 'indiana')
    or (h.slug = 'indiana' and a.slug = 'rutgers'))
  and g.week = 5;

-- Fresno State @ Washington State · Sat 2026-10-03 20:30 CT · USA Net · WSU -2.5 / O/U 46.5 · CLEAR · NEW · day-risk: ESPN CT Sat 2026-10-03 20:30 (HM Sunday, Oct 4) · ESPN 401860921
update games g
set kickoff_at = timestamptz '2026-10-03 20:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'USA Net',
    vegas_spread = case when h.slug = 'washington-state' then 2.5 else -2.5 end,
    vegas_total = 46.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'washington-state' and a.slug = 'fresno-state')
    or (h.slug = 'fresno-state' and a.slug = 'washington-state'))
  and g.week = 5;

-- Baylor @ Arizona State · Sat 2026-10-03 21:30 CT · ESPN · ASU -4 / O/U 50.5 · CLEAR · NEW · ESPN 401856817
update games g
set kickoff_at = timestamptz '2026-10-03 21:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'arizona-state' then 4 else -4 end,
    vegas_total = 50.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'arizona-state' and a.slug = 'baylor')
    or (h.slug = 'baylor' and a.slug = 'arizona-state'))
  and g.week = 5;

-- Texas State @ San Diego State · Sat 2026-10-03 21:30 CT · CW · TXST -4 / O/U 58.5 · CLEAR · NEW · day-risk: ESPN CT Sat 2026-10-03 21:30 (HM Sunday, Oct 4) · ESPN 401860900
update games g
set kickoff_at = timestamptz '2026-10-03 21:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'CW',
    vegas_spread = case when h.slug = 'san-diego-state' then -4 else 4 end,
    vegas_total = 58.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'san-diego-state' and a.slug = 'texas-state')
    or (h.slug = 'texas-state' and a.slug = 'san-diego-state'))
  and g.week = 5;

-- Cincinnati @ Arizona · Sat 2026-10-03 22:00 CT · FOX · ARIZ -7 / O/U 54.5 · CLEAR · NEW · ESPN 401856820
update games g
set kickoff_at = timestamptz '2026-10-03 22:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'FOX',
    vegas_spread = case when h.slug = 'arizona' then 7 else -7 end,
    vegas_total = 54.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'arizona' and a.slug = 'cincinnati')
    or (h.slug = 'cincinnati' and a.slug = 'arizona'))
  and g.week = 5;

-- San José State @ Hawaiʻi · Sat 2026-10-03 22:59 CT · MW+ · HAW -3 / O/U 52.5 · CLEAR · NEW · ESPN 401864513
update games g
set kickoff_at = timestamptz '2026-10-03 22:59:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'MW+',
    vegas_spread = case when h.slug = 'hawaii' then 3 else -3 end,
    vegas_total = 52.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'hawaii' and a.slug = 'san-jose-state')
    or (h.slug = 'san-jose-state' and a.slug = 'hawaii'))
  and g.week = 5;

-- Alabama @ Mississippi State · Sat 2026-10-03 11:00 CT · ABC · ALA -6 / O/U 59.5 · CLEAR · MOVED · KICK GAIN · TV GAIN · ESPN 401856707
update games g
set kickoff_at = timestamptz '2026-10-03 11:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ABC',
    vegas_spread = case when h.slug = 'mississippi-state' then -6 else 6 end,
    vegas_total = 59.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'mississippi-state' and a.slug = 'alabama')
    or (h.slug = 'alabama' and a.slug = 'mississippi-state'))
  and g.week = 5;

-- Miami @ Clemson · Sat 2026-10-03 18:30 CT · ABC · MIA -17.5 / O/U 49.5 · CLEAR · MOVED · KICK GAIN · TV GAIN · ESPN 401858249
update games g
set kickoff_at = timestamptz '2026-10-03 18:30:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ABC',
    vegas_spread = case when h.slug = 'clemson' then -17.5 else 17.5 end,
    vegas_total = 49.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'clemson' and a.slug = 'miami')
    or (h.slug = 'miami' and a.slug = 'clemson'))
  and g.week = 5;

-- Notre Dame @ North Carolina · Sat 2026-10-03 11:00 CT · ESPN · ND -21.5 / O/U 47.5 · CLEAR · MOVED · KICK GAIN · TV GAIN · ESPN 401858250
update games g
set kickoff_at = timestamptz '2026-10-03 11:00:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'ESPN',
    vegas_spread = case when h.slug = 'north-carolina' then -21.5 else 21.5 end,
    vegas_total = 47.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'north-carolina' and a.slug = 'notre-dame')
    or (h.slug = 'notre-dame' and a.slug = 'north-carolina'))
  and g.week = 5;

-- Vanderbilt @ Georgia · Sat 2026-10-03 11:45 CT · SEC Network · UGA -24.5 / O/U 51.5 · CLEAR · MOVED · KICK GAIN · TV GAIN · ESPN 401856705
update games g
set kickoff_at = timestamptz '2026-10-03 11:45:00-05',
    kickoff_date = date '2026-10-03',
    tv = 'SEC Network',
    vegas_spread = case when h.slug = 'georgia' then 24.5 else -24.5 end,
    vegas_total = 51.5,
    neutral = false
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and ((h.slug = 'georgia' and a.slug = 'vanderbilt')
    or (h.slug = 'vanderbilt' and a.slug = 'georgia'))
  and g.week = 5;
