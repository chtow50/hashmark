-- Display name uses the okina. Slug stays hawaii. No HX change.
update teams
set name = 'Hawaiʻi', short_name = 'Hawaiʻi'
where slug = 'hawaii';

-- Georgia 2026 class avg was mixed 0–1 / 0–100. 247 Composite points ~292 are fine.
-- Class avg = mean of 247 Composite decimals × 100 (CFBTrack 0.921). Rankings stay frozen.
update recruiting
set avg_rating = 92.1
where team_id = 1 and class_year = 2026;
