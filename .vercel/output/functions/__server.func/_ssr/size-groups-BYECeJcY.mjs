import { i as OL_POS_LIST, n as DL_POS_LIST, r as LB_POS_LIST, s as SKILL_POS_LIST, t as DB_POS_LIST } from "./positions-C0zZnrTX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/size-groups-BYECeJcY.js
function sqlIn(list) {
	return list.map((p) => `'${p}'`).join(",");
}
/** Two-deep height/weight averages by position group — not HX or talent composite. */
var SIZE_UNITS_JOIN = `
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
    select team_id, height_in, weight_lbs, ${`case
  when position = 'QB' then 'QB'
  when position in (${sqlIn(SKILL_POS_LIST)}) then 'SKILL'
  when position in (${sqlIn(OL_POS_LIST)}) then 'OL'
  when position in (${sqlIn(DL_POS_LIST)}) then 'DL'
  when position in (${sqlIn(LB_POS_LIST)}) then 'LB'
  when position in (${sqlIn(DB_POS_LIST)}) then 'DB'
  else 'OTHER'
end`} as grp
    from players
  ) raw
  where grp <> 'OTHER'
  group by team_id
) sz on sz.team_id = t.id
`;
var SIZE_GROUPS = [
	{
		key: "QB",
		label: "QB",
		heightKey: "qbAvgHeightIn",
		weightKey: "qbAvgWeightLbs"
	},
	{
		key: "SKILL",
		label: "Skill",
		heightKey: "skillAvgHeightIn",
		weightKey: "skillAvgWeightLbs"
	},
	{
		key: "OL",
		label: "OL",
		heightKey: "olAvgHeightIn",
		weightKey: "olAvgWeightLbs"
	},
	{
		key: "DL",
		label: "DL",
		heightKey: "dlAvgHeightIn",
		weightKey: "dlAvgWeightLbs"
	},
	{
		key: "LB",
		label: "LB",
		heightKey: "lbAvgHeightIn",
		weightKey: "lbAvgWeightLbs"
	},
	{
		key: "DB",
		label: "DB",
		heightKey: "dbAvgHeightIn",
		weightKey: "dbAvgWeightLbs"
	}
];
function sizeLensFor(group, metric) {
	const g = SIZE_GROUPS.find((x) => x.key === group);
	return metric === "height" ? g?.heightKey ?? "olAvgHeightIn" : g?.weightKey ?? "olAvgWeightLbs";
}
function sizeSortLabel(key) {
	for (const g of SIZE_GROUPS) {
		if (g.heightKey === key) return `${g.label} height`;
		if (g.weightKey === key) return `${g.label} weight`;
	}
	return "OL weight";
}
//#endregion
export { sizeSortLabel as i, SIZE_UNITS_JOIN as n, sizeLensFor as r, SIZE_GROUPS as t };
