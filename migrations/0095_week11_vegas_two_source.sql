-- Week 11 Vegas fill, two-source rule (Chase-approved), 2026-11-12 evening CT.
-- Pack: data/week11_vegas_two_source_2026.json. Unplayed Week 11 FBS–FBS cards that had no Vegas.
-- Spread only when DraftKings and Bovada (CFBD lines feed) match exactly AND the live ESPN
-- DraftKings spread still equals it; total only when all three agree. Otherwise untouched.
-- Board convention: positive = home favored. Only fills nulls. No kick/TV, scores, or HX writes.
-- 21 spreads · 12 totals. Skipped: south-carolina @ arkansas (ESPN DraftKings moved).
-- Event digits stay below each week predicate so the stamp gate keeps the 0087 kick/TV.

-- memphis @ usf · DK 4.5 / Bovada 4.5 (home line) · ESPN DK MEM -4.5
update games g
set vegas_spread = -4.5,
    vegas_total = coalesce(g.vegas_total, null)
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'usf' and a.slug = 'memphis'
  and g.vegas_spread is null and g.status <> 'final'
  and g.week = 11;

-- Source event 401862824.

-- louisiana @ ul-monroe · DK 10.5 / Bovada 10.5 (home line) · ESPN DK UL -10.5
update games g
set vegas_spread = -10.5,
    vegas_total = coalesce(g.vegas_total, 47.5)
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ul-monroe' and a.slug = 'louisiana'
  and g.vegas_spread is null and g.status <> 'final'
  and g.week = 11;

-- Source event 401869969.

-- florida-state @ pittsburgh · DK -3.5 / Bovada -3.5 (home line) · ESPN DK PITT -3.5
update games g
set vegas_spread = 3.5,
    vegas_total = coalesce(g.vegas_total, null)
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'pittsburgh' and a.slug = 'florida-state'
  and g.vegas_spread is null and g.status <> 'final'
  and g.week = 11;

-- Source event 401858293.

-- illinois @ ucla · DK -10 / Bovada -10 (home line) · ESPN DK UCLA -10
update games g
set vegas_spread = 10,
    vegas_total = coalesce(g.vegas_total, null)
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'ucla' and a.slug = 'illinois'
  and g.vegas_spread is null and g.status <> 'final'
  and g.week = 11;

-- Source event 401858526.

-- houston @ colorado · DK 9.5 / Bovada 9.5 (home line) · ESPN DK HOU -9.5
update games g
set vegas_spread = -9.5,
    vegas_total = coalesce(g.vegas_total, null)
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'colorado' and a.slug = 'houston'
  and g.vegas_spread is null and g.status <> 'final'
  and g.week = 11;

-- Source event 401856860.

-- james-madison @ uconn · DK 4 / Bovada 4 (home line) · ESPN DK JMU -4
update games g
set vegas_spread = -4,
    vegas_total = coalesce(g.vegas_total, null)
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'uconn' and a.slug = 'james-madison'
  and g.vegas_spread is null and g.status <> 'final'
  and g.week = 11;

-- Source event 401861967.

-- syracuse @ nc-state · DK 3 / Bovada 3 (home line) · ESPN DK SYR -3
update games g
set vegas_spread = -3,
    vegas_total = coalesce(g.vegas_total, 53.5)
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'nc-state' and a.slug = 'syracuse'
  and g.vegas_spread is null and g.status <> 'final'
  and g.week = 11;

-- Source event 401858300.

-- duke @ miami · DK -13.5 / Bovada -13.5 (home line) · ESPN DK MIA -13.5
update games g
set vegas_spread = 13.5,
    vegas_total = coalesce(g.vegas_total, 54.5)
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'miami' and a.slug = 'duke'
  and g.vegas_spread is null and g.status <> 'final'
  and g.week = 11;

-- Source event 401858296.

-- auburn @ mississippi-state · DK 2.5 / Bovada 2.5 (home line) · ESPN DK AUB -2.5
update games g
set vegas_spread = -2.5,
    vegas_total = coalesce(g.vegas_total, 50.5)
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'mississippi-state' and a.slug = 'auburn'
  and g.vegas_spread is null and g.status <> 'final'
  and g.week = 11;

-- Source event 401856886.

-- georgia-tech @ clemson · DK -14 / Bovada -14 (home line) · ESPN DK CLEM -14
update games g
set vegas_spread = 14,
    vegas_total = coalesce(g.vegas_total, 48.5)
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'clemson' and a.slug = 'georgia-tech'
  and g.vegas_spread is null and g.status <> 'final'
  and g.week = 11;

-- Source event 401858297.

-- usc @ indiana · DK -8.5 / Bovada -8.5 (home line) · ESPN DK IU -8.5
update games g
set vegas_spread = 8.5,
    vegas_total = coalesce(g.vegas_total, 50.5)
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'indiana' and a.slug = 'usc'
  and g.vegas_spread is null and g.status <> 'final'
  and g.week = 11;

-- Source event 401858518.

-- michigan @ oregon · DK -10.5 / Bovada -10.5 (home line) · ESPN DK ORE -10.5
update games g
set vegas_spread = 10.5,
    vegas_total = coalesce(g.vegas_total, null)
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'oregon' and a.slug = 'michigan'
  and g.vegas_spread is null and g.status <> 'final'
  and g.week = 11;

-- Source event 401858523.

-- washington @ michigan-state · DK 3.5 / Bovada 3.5 (home line) · ESPN DK WASH -3.5
update games g
set vegas_spread = -3.5,
    vegas_total = coalesce(g.vegas_total, null)
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'michigan-state' and a.slug = 'washington'
  and g.vegas_spread is null and g.status <> 'final'
  and g.week = 11;

-- Source event 401858521.

-- oregon-state @ boise-state · DK -14.5 / Bovada -14.5 (home line) · ESPN DK BOIS -14.5
update games g
set vegas_spread = 14.5,
    vegas_total = coalesce(g.vegas_total, null)
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'boise-state' and a.slug = 'oregon-state'
  and g.vegas_spread is null and g.status <> 'final'
  and g.week = 11;

-- Source event 401860914.

-- san-jose-state @ air-force · DK -12.5 / Bovada -12.5 (home line) · ESPN DK AF -12.5
update games g
set vegas_spread = 12.5,
    vegas_total = coalesce(g.vegas_total, 47.5)
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'air-force' and a.slug = 'san-jose-state'
  and g.vegas_spread is null and g.status <> 'final'
  and g.week = 11;

-- Source event 401864538.

-- unlv @ new-mexico · DK -14.5 / Bovada -14.5 (home line) · ESPN DK UNM -14.5
update games g
set vegas_spread = 14.5,
    vegas_total = coalesce(g.vegas_total, 46.5)
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'new-mexico' and a.slug = 'unlv'
  and g.vegas_spread is null and g.status <> 'final'
  and g.week = 11;

-- Source event 401864539.

-- north-texas @ utsa · DK 2.5 / Bovada 2.5 (home line) · ESPN DK UNT -2.5
update games g
set vegas_spread = -2.5,
    vegas_total = coalesce(g.vegas_total, null)
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'utsa' and a.slug = 'north-texas'
  and g.vegas_spread is null and g.status <> 'final'
  and g.week = 11;

-- Source event 401862827.

-- north-dakota-state @ hawaii · DK 6.5 / Bovada 6.5 (home line) · ESPN DK NDSU -6.5
update games g
set vegas_spread = -6.5,
    vegas_total = coalesce(g.vegas_total, 38.5)
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'hawaii' and a.slug = 'north-dakota-state'
  and g.vegas_spread is null and g.status <> 'final'
  and g.week = 11;

-- Source event 401864537.

-- louisville @ north-carolina · DK 3.5 / Bovada 3.5 (home line) · ESPN DK LOU -3.5
update games g
set vegas_spread = -3.5,
    vegas_total = coalesce(g.vegas_total, 59.5)
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'north-carolina' and a.slug = 'louisville'
  and g.vegas_spread is null and g.status <> 'final'
  and g.week = 11;

-- Source event 401858298.

-- tennessee @ texas-am · DK 2.5 / Bovada 2.5 (home line) · ESPN DK TENN -2.5
update games g
set vegas_spread = -2.5,
    vegas_total = coalesce(g.vegas_total, 43.5)
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'texas-am' and a.slug = 'tennessee'
  and g.vegas_spread is null and g.status <> 'final'
  and g.week = 11;

-- Source event 401856888.

-- missouri @ georgia · DK -16.5 / Bovada -16.5 (home line) · ESPN DK UGA -16.5
update games g
set vegas_spread = 16.5,
    vegas_total = coalesce(g.vegas_total, 47.5)
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and h.slug = 'georgia' and a.slug = 'missouri'
  and g.vegas_spread is null and g.status <> 'final'
  and g.week = 11;

-- Source event 401856883.
