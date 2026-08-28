-- C20 coach-change HX moves (2026 week 0 rankings only).
-- Ten Connelly-residual adjustments. Re-rank all 136.
-- Week 0 scheduled matchup HX is frozen so win% / SU picks do not move
-- (Hawaiʻi at Stanford stays Hawaiʻi 53.8% / HAW −1.4).

alter table games add column if not exists lock_home_hx double precision;
alter table games add column if not exists lock_away_hx double precision;

-- Snapshot current ratings onto Week 0 games BEFORE the HX updates.
update games g
set lock_home_hx = hr.hx_rating,
    lock_away_hx = ar.hx_rating
from rankings hr, rankings ar
where hr.team_id = g.home_team_id and hr.season = 2026 and hr.week = 0
  and ar.team_id = g.away_team_id and ar.season = 2026 and ar.week = 0
  and g.kickoff_date <= date '2026-08-30';

-- Apply the ten HX moves.
-- Ole Miss: Lane Kiffin → Pete Golding
update rankings set hx_rating = 5.492 where team_id = 5 and season = 2026 and week = 0;

-- Florida: Billy Napier → Jon Sumrall
update rankings set hx_rating = 3.506 where team_id = 33 and season = 2026 and week = 0;

-- South Florida: Alex Golesh → Brian Hartline
update rankings set hx_rating = 0.187 where team_id = 46 and season = 2026 and week = 0;

-- Tulane: Jon Sumrall → Will Hall
update rankings set hx_rating = -1.144 where team_id = 61 and season = 2026 and week = 0;

-- North Texas: Eric Morris → Neal Brown
update rankings set hx_rating = -2.224 where team_id = 62 and season = 2026 and week = 0;

-- UConn: Jim Mora → Jason Candle
update rankings set hx_rating = -1.867 where team_id = 74 and season = 2026 and week = 0;

-- Virginia Tech: Brent Pry → James Franklin
update rankings set hx_rating = 1.156 where team_id = 80 and season = 2026 and week = 0;

-- Stanford: Troy Taylor / Frank Reich (i) → Tavita Pritchard
update rankings set hx_rating = -0.759 where team_id = 102 and season = 2026 and week = 0;

-- Oregon State: Trent Bray → JaMarcus Shephard
update rankings set hx_rating = -1.148 where team_id = 106 and season = 2026 and week = 0;

-- Oklahoma State: Mike Gundy → Eric Morris
update rankings set hx_rating = -1.255 where team_id = 119 and season = 2026 and week = 0;

-- Re-rank all 136 by HX (ties broken by team_id).
with ordered as (
  select team_id,
         row_number() over (order by hx_rating desc, team_id) as rk
  from rankings
  where season = 2026 and week = 0
)
update rankings r
set hx_rank = o.rk
from ordered o
where r.team_id = o.team_id and r.season = 2026 and r.week = 0;

-- Playoff odds are a function of rank. Remap the existing curve onto the new order.
with odds as (
  select * from (values
    (1, 98.4),
    (2, 97.7),
    (3, 96.7),
    (4, 95.4),
    (5, 93.6),
    (6, 91.1),
    (7, 87.7),
    (8, 83.3),
    (9, 77.7),
    (10, 70.9),
    (11, 63.1),
    (12, 54.5),
    (13, 45.5),
    (14, 36.9),
    (15, 29.1),
    (16, 22.3),
    (17, 16.7),
    (18, 12.3),
    (19, 8.9),
    (20, 6.4),
    (21, 4.6),
    (22, 3.3),
    (23, 2.3),
    (24, 1.6),
    (25, 1.1),
    (26, 0.8),
    (27, 0.6),
    (28, 0.4),
    (29, 0.3),
    (30, 0.2),
    (31, 0.1),
    (32, 0.1),
    (33, 0.1),
    (34, 0.0),
    (35, 0.0),
    (36, 0.0),
    (37, 0.0),
    (38, 0.0),
    (39, 0.0),
    (40, 0.0),
    (41, 0.0),
    (42, 0.0),
    (43, 0.0),
    (44, 0.0),
    (45, 0.0),
    (46, 0.0),
    (47, 0.0),
    (48, 0.0),
    (49, 0.0),
    (50, 0.0),
    (51, 0.0),
    (52, 0.0),
    (53, 0.0),
    (54, 0.0),
    (55, 0.0),
    (56, 0.0),
    (57, 0.0),
    (58, 0.0),
    (59, 0.0),
    (60, 0.0),
    (61, 0.0),
    (62, 0.0),
    (63, 0.0),
    (64, 0.0),
    (65, 0.0),
    (66, 0.0),
    (67, 0.0),
    (68, 0.0),
    (69, 0.0),
    (70, 0.0),
    (71, 0.0),
    (72, 0.0),
    (73, 0.0),
    (74, 0.0),
    (75, 0.0),
    (76, 0.0),
    (77, 0.0),
    (78, 0.0),
    (79, 0.0),
    (80, 0.0),
    (81, 0.0),
    (82, 0.0),
    (83, 0.0),
    (84, 0.0),
    (85, 0.0),
    (86, 0.0),
    (87, 0.0),
    (88, 0.0),
    (89, 0.0),
    (90, 0.0),
    (91, 0.0),
    (92, 0.0),
    (93, 0.0),
    (94, 0.0),
    (95, 0.0),
    (96, 0.0),
    (97, 0.0),
    (98, 0.0),
    (99, 0.0),
    (100, 0.0),
    (101, 0.0),
    (102, 0.0),
    (103, 0.0),
    (104, 0.0),
    (105, 0.0),
    (106, 0.0),
    (107, 0.0),
    (108, 0.0),
    (109, 0.0),
    (110, 0.0),
    (111, 0.0),
    (112, 0.0),
    (113, 0.0),
    (114, 0.0),
    (115, 0.0),
    (116, 0.0),
    (117, 0.0),
    (118, 0.0),
    (119, 0.0),
    (120, 0.0),
    (121, 0.0),
    (122, 0.0),
    (123, 0.0),
    (124, 0.0),
    (125, 0.0),
    (126, 0.0),
    (127, 0.0),
    (128, 0.0),
    (129, 0.0),
    (130, 0.0),
    (131, 0.0),
    (132, 0.0),
    (133, 0.0),
    (134, 0.0),
    (135, 0.0),
    (136, 0.0)
  ) as v(rk, odds)
)
update rankings r
set playoff_odds = odds.odds
from odds
where r.hx_rank = odds.rk and r.season = 2026 and r.week = 0;

