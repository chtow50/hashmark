-- Week 7 Saturday FINALs (Nightly FINAL Stamp, 2026-10-18 ~1:15 AM CT).
-- Source: ESPN game pages and scoreboard (STATUS_FINAL).
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).
-- Nebraska @ Oregon was still in progress (4th quarter); not stamped.
-- Do not put ESPN event digits in this header: parseSqlStampsForWeek would
-- overwrite the 0057 kick/TV/Vegas on the same card.

-- Utah @ Colorado — Utah 27, Colorado 24 (road win) (home is colorado).
update games g
set status = 'final',
    home_score = 24,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'colorado' and a.slug = 'utah';

-- Source event 401856833. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- New Mexico @ Hawaiʻi — New Mexico 21, Hawaiʻi 10 (road win) (home is hawaii).
update games g
set status = 'final',
    home_score = 10,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'hawaii' and a.slug = 'new-mexico';

-- Source event 401864521. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Auburn @ Georgia — Auburn 27, Georgia 24 (road win) (home is georgia).
update games g
set status = 'final',
    home_score = 24,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'georgia' and a.slug = 'auburn';

-- Source event 401856719. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Notre Dame @ BYU — BYU 28, Notre Dame 24 (home is byu).
update games g
set status = 'final',
    home_score = 28,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'byu' and a.slug = 'notre-dame';

-- Source event 401856809. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Florida State @ Miami — Miami 43, Florida State 35 (2OT) (home is miami).
update games g
set status = 'final',
    home_score = 43,
    away_score = 35
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'miami' and a.slug = 'florida-state';

-- Source event 401858263. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Ohio State @ Indiana — Ohio State 19, Indiana 15 (road win) (home is indiana).
update games g
set status = 'final',
    home_score = 15,
    away_score = 19
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'indiana' and a.slug = 'ohio-state';

-- Source event 401858488. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Alabama @ Tennessee — Tennessee 26, Alabama 10 (home is tennessee).
update games g
set status = 'final',
    home_score = 26,
    away_score = 10
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'tennessee' and a.slug = 'alabama';

-- Source event 401856723. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Florida @ Texas — Florida 27, Texas 24 (road win) (home is texas).
update games g
set status = 'final',
    home_score = 24,
    away_score = 27
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'texas' and a.slug = 'florida';

-- Source event 401856724. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Missouri @ Ole Miss — Ole Miss 31, Missouri 3 (home is ole-miss).
update games g
set status = 'final',
    home_score = 31,
    away_score = 3
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'ole-miss' and a.slug = 'missouri';

-- Source event 401856721. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Arizona State @ Texas Tech — Texas Tech 53, Arizona State 25 (home is texas-tech).
update games g
set status = 'final',
    home_score = 53,
    away_score = 25
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'texas-tech' and a.slug = 'arizona-state';

-- Source event 401856828. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Wisconsin @ UCLA — UCLA 17, Wisconsin 7 (home is ucla).
update games g
set status = 'final',
    home_score = 17,
    away_score = 7
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'ucla' and a.slug = 'wisconsin';

-- Source event 401858494. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Kentucky @ Oklahoma — Kentucky 21, Oklahoma 13 (road win) (home is oklahoma).
update games g
set status = 'final',
    home_score = 13,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'oklahoma' and a.slug = 'kentucky';

-- Source event 401856722. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Mississippi State @ LSU — LSU 31, Mississippi State 0 (home is lsu).
update games g
set status = 'final',
    home_score = 31,
    away_score = 0
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'lsu' and a.slug = 'mississippi-state';

-- Source event 401856720. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Oklahoma State @ Houston — Houston 35, Oklahoma State 32 (home is houston).
update games g
set status = 'final',
    home_score = 35,
    away_score = 32
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'houston' and a.slug = 'oklahoma-state';

-- Source event 401856831. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Wake Forest @ California — Wake Forest 41, California 7 (road win) (home is california).
update games g
set status = 'final',
    home_score = 7,
    away_score = 41
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'california' and a.slug = 'wake-forest';

-- Source event 401858269. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Virginia @ SMU — SMU 23, Virginia 13 (home is smu).
update games g
set status = 'final',
    home_score = 23,
    away_score = 13
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'smu' and a.slug = 'virginia';

-- Source event 401858268. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Northwestern @ Michigan State — Northwestern 24, Michigan State 21 (road win) (home is michigan-state).
update games g
set status = 'final',
    home_score = 21,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'michigan-state' and a.slug = 'northwestern';

-- Source event 401858491. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Cincinnati @ West Virginia — West Virginia 45, Cincinnati 42 (home is west-virginia).
update games g
set status = 'final',
    home_score = 45,
    away_score = 42
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'west-virginia' and a.slug = 'cincinnati';

-- Source event 401856829. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Kansas @ Kansas State — Kansas State 35, Kansas 24 (home is kansas-state).
update games g
set status = 'final',
    home_score = 35,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'kansas-state' and a.slug = 'kansas';

-- Source event 401856830. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Pittsburgh @ Boston College — Boston College 27, Pittsburgh 21 (home is boston-college).
update games g
set status = 'final',
    home_score = 27,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'boston-college' and a.slug = 'pittsburgh';

-- Source event 401858267. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Florida Atlantic @ Army — Army 56, Florida Atlantic 24 (home is army).
update games g
set status = 'final',
    home_score = 56,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'army' and a.slug = 'florida-atlantic';

-- Source event 401862802. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Ball State @ Bowling Green — Ball State 32, Bowling Green 31 (OT, road win) (home is bowling-green).
update games g
set status = 'final',
    home_score = 31,
    away_score = 32
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'bowling-green' and a.slug = 'ball-state';

-- Source event 401866441. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Georgia State @ James Madison — James Madison 49, Georgia State 22 (home is james-madison).
update games g
set status = 'final',
    home_score = 49,
    away_score = 22
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'james-madison' and a.slug = 'georgia-state';

-- Source event 401869957. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Rutgers @ Maryland — Rutgers 37, Maryland 30 (road win) (home is maryland).
update games g
set status = 'final',
    home_score = 30,
    away_score = 37
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'maryland' and a.slug = 'rutgers';

-- Source event 401858489. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Charlotte @ Temple — Charlotte 38, Temple 31 (road win) (home is temple).
update games g
set status = 'final',
    home_score = 31,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'temple' and a.slug = 'charlotte';

-- Source event 401862803. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Massachusetts @ Buffalo — Buffalo 25, Massachusetts 18 (OT) (home is buffalo).
update games g
set status = 'final',
    home_score = 25,
    away_score = 18
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'buffalo' and a.slug = 'massachusetts';

-- Source event 401866442. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Western Michigan @ Central Michigan — Western Michigan 21, Central Michigan 14 (road win) (home is central-michigan).
update games g
set status = 'final',
    home_score = 14,
    away_score = 21
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'central-michigan' and a.slug = 'western-michigan';

-- Source event 401866443. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Georgia Tech @ Virginia Tech — Virginia Tech 34, Georgia Tech 24 (home is virginia-tech).
update games g
set status = 'final',
    home_score = 34,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'virginia-tech' and a.slug = 'georgia-tech';

-- Source event 401858264. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- North Carolina @ Duke — North Carolina 24, Duke 20 (road win) (home is duke).
update games g
set status = 'final',
    home_score = 20,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'duke' and a.slug = 'north-carolina';

-- Source event 401858266. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Penn State @ Michigan — Michigan 21, Penn State 18 (home is michigan).
update games g
set status = 'final',
    home_score = 21,
    away_score = 18
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'michigan' and a.slug = 'penn-state';

-- Source event 401858490. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Northern Illinois @ Wyoming — Wyoming 41, Northern Illinois 23 (home is wyoming).
update games g
set status = 'final',
    home_score = 41,
    away_score = 23
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'wyoming' and a.slug = 'northern-illinois';

-- Source event 401864522. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- UNLV @ Air Force — Air Force 41, UNLV 31 (home is air-force).
update games g
set status = 'final',
    home_score = 41,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'air-force' and a.slug = 'unlv';

-- Source event 401864524. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Toledo @ Eastern Michigan — Toledo 34, Eastern Michigan 14 (road win) (home is eastern-michigan).
update games g
set status = 'final',
    home_score = 14,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'eastern-michigan' and a.slug = 'toledo';

-- Source event 401866444. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Akron @ Miami (OH) — Miami (OH) 34, Akron 14 (home is miami-oh).
update games g
set status = 'final',
    home_score = 34,
    away_score = 14
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'miami-oh' and a.slug = 'akron';

-- Source event 401866478. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Tulsa @ Rice — Tulsa 38, Rice 17 (road win) (home is rice).
update games g
set status = 'final',
    home_score = 17,
    away_score = 38
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'rice' and a.slug = 'tulsa';

-- Source event 401862805. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Troy @ Louisiana — Louisiana 33, Troy 6 (home is louisiana).
update games g
set status = 'final',
    home_score = 33,
    away_score = 6
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'louisiana' and a.slug = 'troy';

-- Source event 401869966. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Washington State @ Oregon State — Oregon State 48, Washington State 30 (home is oregon-state).
update games g
set status = 'final',
    home_score = 48,
    away_score = 30
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'oregon-state' and a.slug = 'washington-state';

-- Source event 401860903. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Arkansas @ Vanderbilt — Arkansas 31, Vanderbilt 21 (road win) (home is vanderbilt).
update games g
set status = 'final',
    home_score = 21,
    away_score = 31
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'vanderbilt' and a.slug = 'arkansas';

-- Source event 401856726. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- TCU @ Baylor — TCU 17, Baylor 6 (road win) (home is baylor).
update games g
set status = 'final',
    home_score = 6,
    away_score = 17
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'baylor' and a.slug = 'tcu';

-- Source event 401856832. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Kent State @ South Florida — South Florida 29, Kent State 2 (home is usf).
update games g
set status = 'final',
    home_score = 29,
    away_score = 2
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'usf' and a.slug = 'kent-state';

-- Source event 401862806. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Arkansas State @ Southern Miss — Arkansas State 23, Southern Miss 13 (road win) (home is southern-miss).
update games g
set status = 'final',
    home_score = 13,
    away_score = 23
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'southern-miss' and a.slug = 'arkansas-state';

-- Source event 401869934. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Louisville @ Syracuse — Louisville 34, Syracuse 26 (road win) (home is syracuse).
update games g
set status = 'final',
    home_score = 26,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'syracuse' and a.slug = 'louisville';

-- Source event 401858265. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Navy @ UTSA — UTSA 38, Navy 34 (home is utsa).
update games g
set status = 'final',
    home_score = 38,
    away_score = 34
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'utsa' and a.slug = 'navy';

-- Source event 401862804. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Louisiana Tech @ UL Monroe — Louisiana Tech 24, UL Monroe 0 (road win) (home is ul-monroe).
update games g
set status = 'final',
    home_score = 0,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'ul-monroe' and a.slug = 'louisiana-tech';

-- Source event 401871091. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- San José State @ UTEP — San José State 24, UTEP 11 (road win) (home is utep).
update games g
set status = 'final',
    home_score = 11,
    away_score = 24
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'utep' and a.slug = 'san-jose-state';

-- Source event 401864523. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.

-- Fresno State @ San Diego State — San Diego State 26, Fresno State 23 (home is san-diego-state).
update games g
set status = 'final',
    home_score = 26,
    away_score = 23
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 7
  and h.slug = 'san-diego-state' and a.slug = 'fresno-state';

-- Source event 401860904. Digits stay below the week predicate so the stamp gate keeps kick/Vegas.
