import { fmtHeight, fmtNum } from "@/lib/utils";
import { POS_ORDER } from "@/lib/cfb/positions";
import type { Player } from "@/lib/cfb/types";

function group(players: Player[]) {
  const map = new Map<string, Player[]>();
  for (const p of players) {
    const list = map.get(p.position) ?? [];
    list.push(p);
    map.set(p.position, list);
  }
  for (const list of map.values()) {
    list.sort((a, b) => a.depth - b.depth || a.name.localeCompare(b.name));
  }
  return map;
}

function positionsOf(a: Map<string, Player[]>, b?: Map<string, Player[]>) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const pos of POS_ORDER) {
    if (a.has(pos) || b?.has(pos)) {
      out.push(pos);
      seen.add(pos);
    }
  }
  for (const pos of a.keys()) {
    if (!seen.has(pos)) {
      out.push(pos);
      seen.add(pos);
    }
  }
  if (b) {
    for (const pos of b.keys()) {
      if (!seen.has(pos)) out.push(pos);
    }
  }
  return out;
}

export function RosterDuel({
  home,
  away,
  homeName,
  awayName,
}: {
  home: Player[];
  away: Player[];
  homeName: string;
  awayName: string;
}) {
  const h = group(home);
  const a = group(away);
  const rows: { pos: string; left?: Player; right?: Player }[] = [];
  for (const pos of positionsOf(h, a)) {
    const ln = h.get(pos)?.length ?? 0;
    const rn = a.get(pos)?.length ?? 0;
    const n = Math.max(ln, rn, 0);
    for (let i = 0; i < n; i++) {
      rows.push({ pos, left: h.get(pos)?.[i], right: a.get(pos)?.[i] });
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-line text-[11px] uppercase tracking-[0.14em] text-faint">
            <th className="py-3 pr-3 font-medium">{homeName}</th>
            <th className="py-3 px-2 text-center font-medium">Pos</th>
            <th className="py-3 pl-3 font-medium text-right">{awayName}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={`${row.pos}-${i}`} className="border-b border-line last:border-0">
              <td className="py-3 pr-3 align-top">
                {row.left ? <PlayerCell p={row.left} /> : <span className="text-faint">—</span>}
              </td>
              <td className="px-2 py-3 text-center font-mono text-xs text-muted">{row.pos}</td>
              <td className="py-3 pl-3 text-right align-top">
                {row.right ? <PlayerCell p={row.right} align="right" /> : <span className="text-faint">—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function jerseyLabel(n: number | null) {
  if (n == null || Number.isNaN(n)) return "";
  return `#${n}`;
}

function PlayerCell({ p, align }: { p: Player; align?: "right" }) {
  return (
    <div className={align === "right" ? "text-right" : ""}>
      <div className="font-medium text-fg">
        <span className="mr-1 font-mono text-xs text-faint">{jerseyLabel(p.jersey)}</span>
        {p.name}{" "}
        <span className="font-normal text-faint">
          {p.classYear} · {p.stars}-star{p.transfer ? " · TR" : ""}
        </span>
      </div>
      <div className="mt-0.5 text-xs tabular text-muted">
        {fmtHeight(p.heightIn)} · {fmtNum(p.weightLbs, 0)} lb · {p.hometownState}
      </div>
    </div>
  );
}

export function RosterList({ players }: { players: Player[] }) {
  const offense = players.filter((p) => p.unit === "OFF");
  const defense = players.filter((p) => p.unit === "DEF");
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <TwoDeepTable title="Offense" players={offense} />
      <TwoDeepTable title="Defense" players={defense} />
    </div>
  );
}

function TwoDeepTable({ title, players }: { title: string; players: Player[] }) {
  const g = group(players);
  const rows = positionsOf(g).map((pos) => {
    const list = g.get(pos) ?? [];
    return { pos, one: list[0], two: list[1] };
  });

  return (
    <div>
      <h3 className="mb-3 font-display text-xl tracking-wide">{title}</h3>
      <ul className="space-y-3 sm:hidden">
        {rows.map((row) => (
          <li key={row.pos} className="border-b border-line pb-3 last:border-0">
            <div className="font-mono text-xs text-muted">{row.pos}</div>
            <div className="mt-1.5 space-y-1.5">
              {row.one ? <DepthName p={row.one} /> : null}
              {row.two ? <DepthName p={row.two} /> : <span className="text-xs text-faint">—</span>}
            </div>
          </li>
        ))}
      </ul>
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[11px] uppercase tracking-[0.14em] text-faint">
              <th className="w-14 py-2 pr-2 font-medium">Pos</th>
              <th className="py-2 pr-2 font-medium">1</th>
              <th className="py-2 font-medium">2</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.pos} className="border-b border-line last:border-0 align-top">
                <td className="py-2.5 pr-2 font-mono text-xs text-muted">{row.pos}</td>
                <td className="py-2.5 pr-3">
                  {row.one ? <DepthName p={row.one} /> : <span className="text-faint">—</span>}
                </td>
                <td className="py-2.5">
                  {row.two ? <DepthName p={row.two} /> : <span className="text-faint">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DepthName({ p }: { p: Player }) {
  return (
    <div>
      <div className="font-medium">
        <span className="mr-1 font-mono text-xs text-faint">{jerseyLabel(p.jersey)}</span>
        {p.name}
        {p.transfer ? <span className="ml-1.5 font-mono text-xs text-faint">TR</span> : null}
      </div>
      <div className="text-xs text-muted">
        {p.classYear} · {fmtHeight(p.heightIn)} · {fmtNum(p.weightLbs, 0)} lb · {p.hometownState}
      </div>
    </div>
  );
}
