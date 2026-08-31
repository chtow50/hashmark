-- Class avg = mean of *rated* 247 Composite decimals (0–100).
-- import-user-cfb.py stored sum(rating)/commits, so NA / unrated / zero-placeholder
-- kids sat in the denominator as 0. Points, ranks, commits, and star chrome stay put.
-- Georgia 2026 is already 92.1 (CFBTrack 0.921 × 100) and must not move.
-- Leftover commits that are rated 2-stars (rescale would exceed ~100) are left alone.
--
-- Research CFB live-check (no 247 calendar date in seed — do not invent one):
--   A&M 2023 rank 15, 20 enrollees, 19 rated: 87.02 = 1740.4/20 → 91.60 = 1740.4/19.
--     Points stay 268.85. 91.42 was 1737/19 (same bug, rounding).
--   2026 academies, same NA-as-zero: Army 5.00→83.33 (50/3), Navy 13.38→83.63 (50/8),
--     Air Force 17.04→83.50 (49/10). Points unchanged. The 70–99.5 gate is on the
--     *corrected* mean, so these floors still move.

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
