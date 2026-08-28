-- HASHMARK college football schema (unowned, world-readable)

create table if not exists teams (
  id serial primary key,
  slug text not null unique,
  name text not null,
  short_name text not null,
  mascot text not null,
  conference text not null,
  city text not null,
  state text not null,
  color_primary text not null,
  color_secondary text not null,
  last_wins int not null,
  last_losses int not null,
  last_finish text not null
);

create table if not exists rankings (
  team_id int not null references teams(id),
  season int not null,
  week int not null,
  hx_rank int not null,
  hx_rating double precision not null,
  ap_rank int,
  offense_rating double precision not null,
  defense_rating double precision not null,
  special_rating double precision not null,
  sos_rating double precision not null,
  projected_wins double precision not null,
  returning_production double precision not null,
  playoff_odds double precision not null,
  prior_score double precision not null,
  talent_score double precision not null,
  z_talent double precision not null default 0,
  z_retention double precision not null default 0,
  z_trend double precision not null default 0,
  z_portal double precision not null default 0,
  z_prior double precision not null default 0,
  primary key (team_id, season, week)
);

create index if not exists rankings_hx_rank_idx on rankings (season, week, hx_rank);

create table if not exists recruiting (
  team_id int not null references teams(id),
  class_year int not null,
  composite_rank int not null,
  commits int not null,
  avg_rating double precision not null,
  points double precision not null,
  five_stars int not null,
  four_stars int not null,
  three_stars int not null,
  primary key (team_id, class_year)
);

create table if not exists roster_profile (
  team_id int primary key references teams(id),
  talent_rank int not null,
  talent_score double precision not null,
  blue_chip_pct double precision not null,
  transfer_pct double precision not null default 0,
  transfer_count int not null default 0,
  off_talent double precision not null default 0,
  def_talent double precision not null default 0,
  starter_talent double precision not null default 0,
  hs_talent double precision not null default 0,
  portal_talent double precision not null default 0,
  portal_share double precision not null default 0,
  qb_talent double precision not null default 0,
  skill_talent double precision not null default 0,
  ol_talent double precision not null default 0,
  dl_talent double precision not null default 0,
  lb_talent double precision not null default 0,
  db_talent double precision not null default 0,
  avg_rating double precision not null default 0,
  avg_height_in double precision not null,
  avg_weight_lbs double precision not null,
  ol_avg_height_in double precision not null,
  ol_avg_weight_lbs double precision not null,
  skill_avg_height_in double precision not null,
  skill_avg_weight_lbs double precision not null,
  db_avg_height_in double precision not null,
  returning_starters int not null,
  two_deep_source text not null default 'projected'
);

create table if not exists players (
  id serial primary key,
  team_id int not null references teams(id),
  name text not null,
  jersey int,
  position text not null,
  depth int not null default 1,
  class_year text not null,
  height_in int not null,
  weight_lbs int not null,
  stars int not null,
  rating double precision not null,
  hometown_state text not null,
  unit text not null,
  transfer boolean not null default false
);

create index if not exists players_team_id_idx on players (team_id);

create table if not exists games (
  id serial primary key,
  week int not null,
  kickoff_date date not null,
  home_team_id int not null references teams(id),
  away_team_id int not null references teams(id),
  neutral boolean not null default false,
  location text,
  headline text
);

create table if not exists states (
  code text primary key,
  name text not null,
  region text not null,
  recruits int not null,
  five_stars int not null,
  avg_rating double precision not null,
  talent_index double precision not null
);

create table if not exists state_commits (
  state_code text not null references states(code),
  team_id int not null references teams(id),
  commits int not null,
  primary key (state_code, team_id)
);
