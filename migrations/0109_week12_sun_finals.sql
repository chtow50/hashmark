-- Week 12 Sunday-night straggler FINAL (Sunday Board + Tape ship, 2026-11-22).
-- Source: ESPN scoreboard + summary, STATUS_FINAL.
-- Scores and status only — kickoff, TV, Vegas, and HX unchanged.
-- Exact home/away orientation only (no reversed-order match).

-- Oklahoma State @ Arizona State — Arizona State 27, Oklahoma State 30 (home is arizona-state).
update games g
set status = 'final',
    home_score = 27,
    away_score = 30
from teams h, teams a
where g.home_team_id = h.id and g.away_team_id = a.id
  and g.week = 12
  and h.slug = 'arizona-state' and a.slug = 'oklahoma-state';
