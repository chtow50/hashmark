export type TeamSummary = {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  mascot: string;
  conference: string;
  city: string;
  state: string;
  colorPrimary: string;
  colorSecondary: string;
  lastWins: number;
  lastLosses: number;
  lastFinish: string;
  hxRank: number;
  hxRating: number;
  apRank: number | null;
  offenseRating: number;
  defenseRating: number;
  specialRating: number;
  sosRating: number;
  projectedWins: number;
  returningProduction: number;
  playoffOdds: number;
  priorScore: number;
  talentScore: number;
  recRank: number;
  commits: number;
  recAvg: number;
  recPoints: number;
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  talentRank: number;
  blueChipPct: number;
  transferPct: number;
  transferCount: number;
  offTalent: number;
  defTalent: number;
  starterTalent: number;
  rosterAvgRating: number;
  hsTalent: number;
  portalTalent: number;
  portalShare: number;
  qbTalent: number;
  skillTalent: number;
  olTalent: number;
  dlTalent: number;
  lbTalent: number;
  dbTalent: number;
  avgHeightIn: number;
  avgWeightLbs: number;
  olAvgHeightIn: number;
  olAvgWeightLbs: number;
  skillAvgHeightIn: number;
  skillAvgWeightLbs: number;
  dbAvgHeightIn: number;
  returningStarters: number;
  zTalent: number;
  zRetention: number;
  zTrend: number;
  zPortal: number;
  zPrior: number;
  twoDeepSource: "listed" | "projected";
};

export type Player = {
  id: number;
  teamId: number;
  name: string;
  jersey: number | null;
  position: string;
  depth: number;
  classYear: string;
  heightIn: number;
  weightLbs: number;
  stars: number;
  rating: number;
  hometownState: string;
  unit: string;
  transfer: boolean;
};

export type RecruitingClass = {
  teamId: number;
  slug: string;
  name: string;
  shortName: string;
  conference: string;
  colorPrimary: string;
  hxRank: number;
  classYear: number;
  compositeRank: number;
  commits: number;
  avgRating: number;
  points: number;
  fiveStars: number;
  fourStars: number;
  threeStars: number;
};

export type GameRow = {
  id: number;
  week: number;
  kickoffDate: string;
  homeSlug: string;
  awaySlug: string;
  homeName: string;
  awayName: string;
  homeShort: string;
  awayShort: string;
  homeColor: string;
  awayColor: string;
  homeHx: number;
  awayHx: number;
  homeRank: number;
  awayRank: number;
  homeOff: number;
  awayOff: number;
  homeDef: number;
  awayDef: number;
  neutral: boolean;
  location: string | null;
  headline: string | null;
};

export type GameStatus = "scheduled" | "final";

/** Game row plus the schedule-board columns from 0006. */
export type ScheduleGame = GameRow & {
  kickoffAt: string | null;
  vegasSpread: number | null;
  vegasTotal: number | null;
  homeScore: number | null;
  awayScore: number | null;
  status: GameStatus;
  tv: string | null;
};

export type StateRow = {
  code: string;
  name: string;
  region: string;
  recruits: number;
  fiveStars: number;
  avgRating: number;
  talentIndex: number;
  teamCount: number;
};

export type StateCommit = {
  stateCode: string;
  teamSlug: string;
  teamName: string;
  conference: string;
  colorPrimary: string;
  commits: number;
};

export type Prediction = {
  homeWinPct: number;
  awayWinPct: number;
  spread: number;
  total: number;
  homeScore: number;
  awayScore: number;
  edge: number;
};
