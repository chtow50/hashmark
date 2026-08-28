//#region node_modules/.nitro/vite/services/ssr/assets/positions-BXGdtgxF.js
/** Display order for a 2026 two-deep. Matches TWO·DEEP listed slots, including scheme nicknames. */
var POS_ORDER = [
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
	"HUSKY"
];
var POS_SQL_ARRAY = `ARRAY[${POS_ORDER.map((p) => `'${p}'`).join(",")}]::text[]`;
function sqlIn(list) {
	return list.map((p) => `'${p}'`).join(",");
}
/** Skill minus QB — used for size averages. */
var SKILL_POS_LIST = [
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
	"TE-F"
];
var OL_POS_LIST = [
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
	"ST"
];
var DL_POS_LIST = [
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
	"SPEAR"
];
/** Includes Kirby Smart MAC/MONEY, Navy/Stanford LILB/RILB, etc. */
var LB_POS_LIST = [
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
	"DOG"
];
var DB_POS_LIST = [
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
	"CHEETAH"
];
new Set(OL_POS_LIST);
new Set(SKILL_POS_LIST);
new Set(DL_POS_LIST);
new Set(LB_POS_LIST);
new Set(DB_POS_LIST);
/** Position-group talent. OL is one unit of six — not the composite. */
var TALENT_UNITS = [
	{
		key: "qbTalent",
		label: "QB",
		grp: "QB"
	},
	{
		key: "skillTalent",
		label: "Skill",
		grp: "SKILL"
	},
	{
		key: "olTalent",
		label: "OL",
		grp: "OL"
	},
	{
		key: "dlTalent",
		label: "DL",
		grp: "DL"
	},
	{
		key: "lbTalent",
		label: "LB",
		grp: "LB"
	},
	{
		key: "dbTalent",
		label: "DB",
		grp: "DB"
	}
];
var TALENT_UNITS_JOIN = `
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
      ${`case
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
  group by team_id
) u on u.team_id = t.id
`;
//#endregion
export { TALENT_UNITS_JOIN as i, POS_SQL_ARRAY as n, TALENT_UNITS as r, POS_ORDER as t };
