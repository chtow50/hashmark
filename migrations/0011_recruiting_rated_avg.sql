-- Class avg = mean of *rated* 247 Composite decimals (0–100).
-- import-user-cfb.py stored sum(rating)/commits, so NA / unrated / zero-placeholder
-- kids sat in the denominator as 0. Points, ranks, commits, and star chrome stay put.
-- Georgia 2026 is already 92.1 (CFBTrack 0.921 × 100) and must not move.
-- Leftover commits that are rated 2-stars (rescale would exceed ~100) are left alone.

update recruiting rec
set avg_rating = round((rec.avg_rating * rec.commits / starred.n)::numeric, 2)
from (
  select
    team_id,
    class_year,
    (five_stars + four_stars + three_stars)::double precision as n,
    (five_stars * 98.5 + four_stars * 91.5 + three_stars * 86.0) as star_sum
  from recruiting
) starred
where rec.team_id = starred.team_id
  and rec.class_year = starred.class_year
  and starred.n > 0
  and starred.n < rec.commits
  and rec.avg_rating * rec.commits / starred.n between 70 and 99.5
  and abs(rec.avg_rating - starred.star_sum / rec.commits)
      < abs(rec.avg_rating - starred.star_sum / starred.n);
