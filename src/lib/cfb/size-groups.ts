import {
  DB_POS_LIST,
  DL_POS_LIST,
  LB_POS_LIST,
  OL_POS_LIST,
  SKILL_POS_LIST,
} from "./positions";

function sqlIn(list: readonly string[]) {
  return list.map((p) => `'${p}'`).join(",");
}

const SIZE_GROUP_SQL = `case
  when position = 'QB' then 'QB'
  when position in (${sqlIn(SKILL_POS_LIST)}) then 'SKILL'
  when position in (${sqlIn(OL_POS_LIST)}) then 'OL'
  when position in (${sqlIn(DL_POS_LIST)}) then 'DL'
  when position in (${sqlIn(LB_POS_LIST)}) then 'LB'
  when position in (${sqlIn(DB_POS_LIST)}) then 'DB'
  else 'OTHER'
end`;

/** Two-deep height/weight averages by position group — not HX or talent composite. */
export const SIZE_UNITS_JOIN = `
left join (
  select
    team_id,
    avg(case when grp = 'QB' then height_in end) as qb_avg_height_in,
    avg(case when grp = 'QB' then weight_lbs end) as qb_avg_weight_lbs,
    avg(case when grp = 'SKILL' then height_in end) as skill_avg_height_in,
    avg(case when grp = 'SKILL' then weight_lbs end) as skill_avg_weight_lbs,
    avg(case when grp = 'OL' then height_in end) as ol_avg_height_in,
    avg(case when grp = 'OL' then weight_lbs end) as ol_avg_weight_lbs,
    avg(case when grp = 'DL' then height_in end) as dl_avg_height_in,
    avg(case when grp = 'DL' then weight_lbs end) as dl_avg_weight_lbs,
    avg(case when grp = 'LB' then height_in end) as lb_avg_height_in,
    avg(case when grp = 'LB' then weight_lbs end) as lb_avg_weight_lbs,
    avg(case when grp = 'DB' then height_in end) as db_avg_height_in,
    avg(case when grp = 'DB' then weight_lbs end) as db_avg_weight_lbs
  from (
    select team_id, height_in, weight_lbs, ${SIZE_GROUP_SQL} as grp
    from players
  ) raw
  where grp <> 'OTHER'
  group by team_id
) sz on sz.team_id = t.id
`;

export type SizeGroupKey = "QB" | "SKILL" | "OL" | "DL" | "LB" | "DB";

export type SizeMetric = `${Lowercase<SizeGroupKey>}AvgHeightIn` | `${Lowercase<SizeGroupKey>}AvgWeightLbs`;

export const SIZE_GROUPS: {
  key: SizeGroupKey;
  label: string;
  heightKey: SizeMetric;
  weightKey: SizeMetric;
}[] = [
  { key: "QB", label: "QB", heightKey: "qbAvgHeightIn", weightKey: "qbAvgWeightLbs" },
  { key: "SKILL", label: "Skill", heightKey: "skillAvgHeightIn", weightKey: "skillAvgWeightLbs" },
  { key: "OL", label: "OL", heightKey: "olAvgHeightIn", weightKey: "olAvgWeightLbs" },
  { key: "DL", label: "DL", heightKey: "dlAvgHeightIn", weightKey: "dlAvgWeightLbs" },
  { key: "LB", label: "LB", heightKey: "lbAvgHeightIn", weightKey: "lbAvgWeightLbs" },
  { key: "DB", label: "DB", heightKey: "dbAvgHeightIn", weightKey: "dbAvgWeightLbs" },
];

export type SizeSortKey = SizeMetric;

export function sizeSortLabel(key: SizeSortKey): string {
  for (const g of SIZE_GROUPS) {
    if (g.heightKey === key) return `${g.label} height`;
    if (g.weightKey === key) return `${g.label} weight`;
  }
  return "OL weight";
}
