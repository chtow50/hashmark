-- Display name uses the ʻokina (same rule as teams in 0009_chrome_pass.sql). State code stays HI. No HX change.
update states
set name = 'Hawaiʻi'
where code = 'HI';
