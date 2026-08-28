/** Display order for a 2026 two-deep. Matches TWO·DEEP listed slots, including scheme nicknames. */
export const POS_ORDER = [
  "QB",
  "RB",
  "RB-A",
  "RB-B",
  "FB",
  "SB",
  "SB-A",
  "SB-Z",
  "WR-X",
  "WR-Z",
  "SLOT",
  "WR",
  "WR-F",
  "WR-Y",
  "TE",
  "TE-Y",
  "TE-H",
  "TE-F",
  "LT",
  "LG",
  "C",
  "RG",
  "RT",
  "OT",
  "OG",
  "QT",
  "QG",
  "SG",
  "ST",
  "OL",
  "DE",
  "LDE",
  "RDE",
  "JACK",
  "EDGE",
  "LEO",
  "RUSH",
  "STUD",
  "JOKER",
  "STING",
  "SPEAR",
  "DT",
  "NT",
  "LDT",
  "RDT",
  "DL",
  "MLB",
  "WLB",
  "ILB",
  "OLB",
  "LB",
  "MAC",
  "MONEY",
  "SLB",
  "LILB",
  "RILB",
  "LOLB",
  "ROLB",
  "CASH",
  "BUCK",
  "WOLF",
  "DOG",
  "LCB",
  "RCB",
  "FCB",
  "BCB",
  "NB",
  "CB",
  "CAT",
  "CHEETAH",
  "FS",
  "SS",
  "S",
  "BS",
  "ROVER",
  "SPUR",
  "BANDIT",
  "HUSKY",
  "DB",
] as const;

export const POS_SQL_ARRAY = `ARRAY[${POS_ORDER.map((p) => `'${p}'`).join(",")}]::text[]`;

function sqlIn(list: readonly string[]) {
  return list.map((p) => `'${p}'`).join(",");
}

/** Skill minus QB — used for size averages. */
export const SKILL_POS_LIST = [
  "RB",
  "RB-A",
  "RB-B",
  "FB",
  "SB",
  "SB-A",
  "SB-Z",
  "WR",
  "WR-X",
  "WR-Z",
  "WR-F",
  "WR-Y",
  "SLOT",
  "TE",
  "TE-Y",
  "TE-H",
  "TE-F",
] as const;

export const OL_POS_LIST = ["LT", "LG", "C", "RG", "RT", "OT", "OG", "OL", "QT", "QG", "SG", "ST"] as const;

export const DL_POS_LIST = [
  "DE",
  "LDE",
  "RDE",
  "JACK",
  "EDGE",
  "DT",
  "NT",
  "LDT",
  "RDT",
  "LEO",
  "RUSH",
  "STUD",
  "JOKER",
  "STING",
  "SPEAR",
  "DL",
] as const;

/** Includes Kirby Smart MAC/MONEY, Navy/Stanford LILB/RILB, etc. */
export const LB_POS_LIST = [
  "MLB",
  "WLB",
  "ILB",
  "OLB",
  "LB",
  "MAC",
  "MONEY",
  "SLB",
  "LILB",
  "RILB",
  "LOLB",
  "ROLB",
  "CASH",
  "BUCK",
  "WOLF",
  "DOG",
] as const;

export const DB_POS_LIST = [
  "CB",
  "LCB",
  "RCB",
  "FCB",
  "BCB",
  "NB",
  "FS",
  "SS",
  "S",
  "BS",
  "ROVER",
  "SPUR",
  "BANDIT",
  "HUSKY",
  "CAT",
  "CHEETAH",
  "DB",
] as const;

export const OL_POS = new Set<string>(OL_POS_LIST);
export const SKILL_POS = new Set<string>(SKILL_POS_LIST);
export const DL_POS = new Set<string>(DL_POS_LIST);
export const LB_POS = new Set<string>(LB_POS_LIST);
export const DB_POS = new Set<string>(DB_POS_LIST);

/** Position-group talent. OL is one unit of six — not the composite. */
export const TALENT_UNITS = [
  { key: "qbTalent", label: "QB", grp: "QB" },
  { key: "skillTalent", label: "Skill", grp: "SKILL" },
  { key: "olTalent", label: "OL", grp: "OL" },
  { key: "dlTalent", label: "DL", grp: "DL" },
  { key: "lbTalent", label: "LB", grp: "LB" },
  { key: "dbTalent", label: "DB", grp: "DB" },
] as const;

export type TalentUnitKey = (typeof TALENT_UNITS)[number]["key"];

export const TALENT_GROUP_SQL = `case
  when position = 'QB' then 'QB'
  when position in (${sqlIn(SKILL_POS_LIST)}) then 'SKILL'
  when position in (${sqlIn(OL_POS_LIST)}) then 'OL'
  when position in (${sqlIn(DL_POS_LIST)}) then 'DL'
  when position in (${sqlIn(LB_POS_LIST)}) then 'LB'
  when position in (${sqlIn(DB_POS_LIST)}) then 'DB'
  else 'OTHER'
end`;

export const TALENT_UNITS_JOIN = `
left join (
  select
    team_id,
    coalesce(sum(case when not transfer then rating * w else 0 end)
      / nullif(sum(case when not transfer then w else 0 end), 0), 0) as hs_talent,
    coalesce(sum(case when transfer then rating * w else 0 end)
      / nullif(sum(case when transfer then w else 0 end), 0), 0) as portal_talent,
    coalesce(sum(case when transfer then w else 0 end)
      / nullif(sum(w), 0) * 100, 0) as portal_share,
    coalesce(sum(case when grp = 'QB' then rating * w else 0 end)
      / nullif(sum(case when grp = 'QB' then w else 0 end), 0), 0) as qb_talent,
    coalesce(sum(case when grp = 'SKILL' then rating * w else 0 end)
      / nullif(sum(case when grp = 'SKILL' then w else 0 end), 0), 0) as skill_talent,
    coalesce(sum(case when grp = 'OL' then rating * w else 0 end)
      / nullif(sum(case when grp = 'OL' then w else 0 end), 0), 0) as ol_talent,
    coalesce(sum(case when grp = 'DL' then rating * w else 0 end)
      / nullif(sum(case when grp = 'DL' then w else 0 end), 0), 0) as dl_talent,
    coalesce(sum(case when grp = 'LB' then rating * w else 0 end)
      / nullif(sum(case when grp = 'LB' then w else 0 end), 0), 0) as lb_talent,
    coalesce(sum(case when grp = 'DB' then rating * w else 0 end)
      / nullif(sum(case when grp = 'DB' then w else 0 end), 0), 0) as db_talent
  from (
    select
      team_id,
      rating,
      transfer,
      case when depth = 1 then 1.0 else 0.4 end as w,
      ${TALENT_GROUP_SQL} as grp
    from players
  ) raw
  group by team_id
) u on u.team_id = t.id
`;
