import { Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { EdgeBuyButton } from "@/components/edge-pack";
import { DeskChip } from "@/components/marks";
import { Panel } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { cn, fmtNum, fmtPct } from "@/lib/utils";
import {
  SCENARIO_SIM_CONFIDENCE_NOTE,
  SCENARIO_SIM_DEMO_LABEL,
  SCENARIO_SIM_HX_BUMP_MAX,
  SCENARIO_SIM_HX_BUMP_MIN,
  SCENARIO_SIM_MAX_OVERRIDES,
  buildScenarioRequest,
  formatScenarioError,
  runDemoScenarioSim,
  type ForceWinnerOverride,
  type HxBumpOverride,
  type ScenarioOverride,
  type ScenarioSimRequest,
  type ScenarioSimResponse,
  type ScenarioTeamMetrics,
} from "@/lib/scenario-sim";

export type ScenarioTeamOption = {
  slug: string;
  name: string;
  hxRank: number;
  shortName?: string;
  conference?: string;
};

type ForceRow = {
  key: string;
  week: string;
  homeSlug: string;
  awaySlug: string;
  winner: "home" | "away";
  note: string;
};

type BumpDraft = {
  on: boolean;
  teamSlug: string;
  deltaHx: string;
  note: string;
};

const METRIC_COLS = [
  { key: "make_field" as const, label: "Make field", kind: "pct" as const, digits: 2 },
  { key: "win_title" as const, label: "Win title", kind: "pct" as const, digits: 2 },
  { key: "proj_wins" as const, label: "Proj. wins", kind: "num" as const, digits: 2 },
  { key: "conf_title" as const, label: "Conf. title", kind: "pct" as const, digits: 1 },
];

function newRow(teams: ScenarioTeamOption[], seed: number): ForceRow {
  const home = teams.find((t) => t.slug === "georgia") ?? teams[0];
  const away = teams.find((t) => t.slug === "alabama") ?? teams[1] ?? teams[0];
  return {
    key: `fw-${seed}`,
    week: "4",
    homeSlug: home?.slug ?? "georgia",
    awaySlug: away?.slug ?? "alabama",
    winner: "away",
    note: "",
  };
}

function fmtMetric(value: number, kind: "pct" | "num", digits: number) {
  return kind === "pct" ? fmtPct(value, digits) : fmtNum(value, digits);
}

function deltaClass(n: number) {
  if (n > 0) return "text-up";
  if (n < 0) return "text-down";
  return "text-faint";
}

function signed(n: number, formatted: string) {
  if (n > 0) return `+${formatted}`;
  return formatted;
}

export function ScenarioSimGate({ className }: { className?: string }) {
  return (
    <Panel className={className}>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
        HX Edge Pack
      </p>
      <h2 className="mt-2 font-display text-2xl tracking-wide">
        Scenario Sim (preview / offline)
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Offline desk fixture — not this week’s paid pack. Soft unlock is a
        query flag until Checkout returns a token. No site login,
        not a guarantee. The public board still shows one Make 12 cell.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <EdgeBuyButton kind="week" label="Buy · $9 Week sample" />
        <EdgeBuyButton kind="month" label="Buy · $29/mo" />
      </div>
    </Panel>
  );
}

export function ScenarioSimPanel({
  teams,
  className,
}: {
  teams: ScenarioTeamOption[];
  className?: string;
}) {
  const [rows, setRows] = useState<ForceRow[]>(() => [newRow(teams, 1)]);
  const [bump, setBump] = useState<BumpDraft>({
    on: false,
    teamSlug: teams.find((t) => t.slug === "ohio-state")?.slug ?? teams[0]?.slug ?? "ohio-state",
    deltaHx: "0.15",
    note: "",
  });
  const [returnSlugs, setReturnSlugs] = useState("georgia, ohio-state");
  const [error, setError] = useState<string | null>(null);
  const [request, setRequest] = useState<ScenarioSimRequest | null>(null);
  const [response, setResponse] = useState<ScenarioSimResponse | null>(null);

  const overrideCount = rows.length + (bump.on ? 1 : 0);
  const canAddForce = overrideCount < SCENARIO_SIM_MAX_OVERRIDES;
  const canEnableBump = rows.length < SCENARIO_SIM_MAX_OVERRIDES;

  const nameBySlug = useMemo(() => {
    const map = new Map(teams.map((t) => [t.slug, t.name]));
    return map;
  }, [teams]);

  function setRow(key: string, patch: Partial<ForceRow>) {
    setRows((cur) => cur.map((row) => (row.key === key ? { ...row, ...patch } : row)));
  }

  function collectOverrides(): ScenarioOverride[] {
    const list: ScenarioOverride[] = rows.map((row) => {
      const weekNum = Number.parseInt(row.week, 10);
      const ov: ForceWinnerOverride = {
        type: "force_winner",
        home_slug: row.homeSlug,
        away_slug: row.awaySlug,
        winner_slug: row.winner === "home" ? row.homeSlug : row.awaySlug,
      };
      if (Number.isFinite(weekNum)) ov.week = weekNum;
      if (row.note.trim()) ov.note = row.note.trim();
      return ov;
    });
    if (bump.on) {
      const delta = Number.parseFloat(bump.deltaHx);
      const ov: HxBumpOverride = {
        type: "hx_bump",
        team_slug: bump.teamSlug,
        delta_hx: Number.isFinite(delta) ? delta : 0,
      };
      if (bump.note.trim()) ov.note = bump.note.trim();
      list.push(ov);
    }
    return list;
  }

  function run() {
    const teamsWanted = returnSlugs
      .split(/[,\s]+/)
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    const built = buildScenarioRequest({
      overrides: collectOverrides(),
      teams: teamsWanted.length ? teamsWanted : ["georgia", "ohio-state"],
    });
    if (!built.ok) {
      setError(formatScenarioError(built.error));
      setRequest(null);
      setResponse(null);
      return;
    }
    const demo = runDemoScenarioSim(built.request);
    if (!demo.ok) {
      setError(formatScenarioError(demo.error));
      setRequest(built.request);
      setResponse(demo);
      return;
    }
    setError(null);
    setRequest(built.request);
    setResponse(demo);
  }

  return (
    <div className={cn("space-y-6", className)}>
      <Panel>
        <div className="flex flex-wrap items-center gap-2">
          <DeskChip>preview / offline</DeskChip>
          <DeskChip>CLI-backed</DeskChip>
        </div>
        <h2 className="mt-3 font-display text-2xl tracking-wide">
          Scenario Sim (preview / offline)
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Pin one to three overrides, then read baseline vs scenario vs Δ.
          This desk run is a {SCENARIO_SIM_DEMO_LABEL}. Not this week’s paid
          pack. Not a lock, not a guarantee, and not ROI.
        </p>

        <div className="mt-5 space-y-4">
          {rows.map((row, index) => (
            <ForceWinnerEditor
              key={row.key}
              index={index}
              row={row}
              teams={teams}
              onChange={(patch) => setRow(row.key, patch)}
              onRemove={
                rows.length > 1
                  ? () => setRows((cur) => cur.filter((r) => r.key !== row.key))
                  : undefined
              }
            />
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!canAddForce}
            onClick={() => setRows((cur) => [...cur, newRow(teams, Date.now())])}
          >
            <Plus className="size-4" />
            Force winner
          </Button>
        </div>

        <HxBumpEditor
          bump={bump}
          teams={teams}
          disabled={!bump.on && !canEnableBump}
          onChange={setBump}
        />

        <label className="mt-5 block">
          <span className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-faint">
            Return teams
          </span>
          <input
            value={returnSlugs}
            onChange={(e) => setReturnSlugs(e.target.value)}
            spellCheck={false}
            className="h-12 w-full rounded-lg bg-raised px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-faint focus:shadow-[var(--shadow-border-hover)]"
            aria-label="Return team slugs"
          />
        </label>

        {error ? <p className="mt-4 text-sm text-down">{error}</p> : null}

        <Button type="button" className="mt-5 w-full sm:w-auto" onClick={run}>
          Run scenario
        </Button>
      </Panel>

      {request ? (
        <Panel>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            Request
          </p>
          <p className="mt-2 text-sm text-muted">{SCENARIO_SIM_DEMO_LABEL}</p>
          <pre className="mt-3 max-h-64 overflow-auto rounded-lg bg-inset p-4 font-mono text-xs leading-relaxed text-muted">
            {JSON.stringify(request, null, 2)}
          </pre>
        </Panel>
      ) : null}

      {response ? <ScenarioSimResult response={response} nameBySlug={nameBySlug} /> : null}
    </div>
  );
}

function ForceWinnerEditor({
  index,
  row,
  teams,
  onChange,
  onRemove,
}: {
  index: number;
  row: ForceRow;
  teams: ScenarioTeamOption[];
  onChange: (patch: Partial<ForceRow>) => void;
  onRemove?: () => void;
}) {
  const home = teams.find((t) => t.slug === row.homeSlug);
  const away = teams.find((t) => t.slug === row.awaySlug);
  return (
    <div className="rounded-lg bg-raised/60 p-3 shadow-[var(--shadow-border)] sm:p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          Force winner {index + 1}
        </p>
        {onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex size-11 items-center justify-center text-muted hover:text-fg"
            aria-label={`Remove force winner ${index + 1}`}
          >
            <Minus className="size-4" />
          </button>
        ) : null}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block min-w-0">
          <span className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-faint">Week</span>
          <input
            type="number"
            min={1}
            max={15}
            value={row.week}
            onChange={(e) => onChange({ week: e.target.value })}
            className="h-12 w-full rounded-lg bg-inset px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none focus:shadow-[var(--shadow-border-hover)]"
          />
        </label>
        <TeamNativeSelect
          label="Home"
          value={row.homeSlug}
          teams={teams}
          onChange={(homeSlug) =>
            onChange({
              homeSlug,
              winner: row.winner === "home" ? "home" : row.winner,
            })
          }
        />
        <TeamNativeSelect
          label="Away"
          value={row.awaySlug}
          teams={teams}
          onChange={(awaySlug) => onChange({ awaySlug })}
        />
        <label className="block min-w-0">
          <span className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-faint">Winner</span>
          <select
            value={row.winner}
            onChange={(e) => onChange({ winner: e.target.value as "home" | "away" })}
            className="h-12 w-full rounded-lg bg-inset px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none focus:shadow-[var(--shadow-border-hover)]"
          >
            <option value="home">{home?.name ?? "Home"}</option>
            <option value="away">{away?.name ?? "Away"}</option>
          </select>
        </label>
      </div>
    </div>
  );
}

function HxBumpEditor({
  bump,
  teams,
  disabled,
  onChange,
}: {
  bump: BumpDraft;
  teams: ScenarioTeamOption[];
  disabled: boolean;
  onChange: (next: BumpDraft) => void;
}) {
  return (
    <div className="mt-5 rounded-lg bg-raised/60 p-3 shadow-[var(--shadow-border)] sm:p-4">
      <label className="flex min-h-11 items-center gap-3 text-sm text-fg">
        <input
          type="checkbox"
          className="size-4 accent-accent"
          checked={bump.on}
          disabled={disabled && !bump.on}
          onChange={(e) => onChange({ ...bump, on: e.target.checked })}
        />
        Optional HX bump
      </label>
      {bump.on ? (
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <TeamNativeSelect
            label="Team"
            value={bump.teamSlug}
            teams={teams}
            onChange={(teamSlug) => onChange({ ...bump, teamSlug })}
          />
          <label className="block min-w-0">
            <span className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-faint">
              ΔHX ({SCENARIO_SIM_HX_BUMP_MIN} to {SCENARIO_SIM_HX_BUMP_MAX})
            </span>
            <input
              type="number"
              step="0.05"
              min={SCENARIO_SIM_HX_BUMP_MIN}
              max={SCENARIO_SIM_HX_BUMP_MAX}
              value={bump.deltaHx}
              onChange={(e) => onChange({ ...bump, deltaHx: e.target.value })}
              className="h-12 w-full rounded-lg bg-inset px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none focus:shadow-[var(--shadow-border-hover)]"
            />
          </label>
          <label className="block min-w-0">
            <span className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-faint">Note</span>
            <input
              value={bump.note}
              onChange={(e) => onChange({ ...bump, note: e.target.value })}
              className="h-12 w-full rounded-lg bg-inset px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-faint focus:shadow-[var(--shadow-border-hover)]"
            />
          </label>
        </div>
      ) : null}
    </div>
  );
}

function TeamNativeSelect({
  label,
  value,
  teams,
  onChange,
}: {
  label: string;
  value: string;
  teams: ScenarioTeamOption[];
  onChange: (slug: string) => void;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-faint">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-lg bg-inset px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none focus:shadow-[var(--shadow-border-hover)]"
      >
        {teams.map((t) => (
          <option key={t.slug} value={t.slug}>
            {t.hxRank}. {t.name}
            {t.conference ? ` · ${t.conference}` : ""}
          </option>
        ))}
      </select>
    </label>
  );
}

function ScenarioSimResult({
  response,
  nameBySlug,
}: {
  response: ScenarioSimResponse;
  nameBySlug: Map<string, string>;
}) {
  const slugs = Object.keys(response.baseline);
  return (
    <Panel>
      <div className="flex flex-wrap items-center gap-2">
        <DeskChip tone="warn">{SCENARIO_SIM_DEMO_LABEL}</DeskChip>
      </div>
      <h2 className="mt-3 font-display text-2xl tracking-wide">Baseline · scenario · Δ</h2>
      <p className="mt-2 text-sm text-muted">{response.confidence_note || SCENARIO_SIM_CONFIDENCE_NOTE}</p>
      {!response.ok ? (
        <p className="mt-3 text-sm text-down">{formatScenarioError(response.error)}</p>
      ) : null}

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[42rem] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[11px] uppercase tracking-[0.14em] text-faint">
              <th className="py-2 pr-3 font-medium">Team</th>
              <th className="py-2 pr-3 font-medium">Cut</th>
              {METRIC_COLS.map((col) => (
                <th key={col.key} className="py-2 pr-3 font-medium tabular">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slugs.flatMap((slug) => {
              const rows: { cut: string; metrics: ScenarioTeamMetrics; delta?: boolean }[] = [
                { cut: "Baseline", metrics: response.baseline[slug] },
                { cut: "Scenario", metrics: response.scenario[slug] },
                { cut: "Δ", metrics: response.delta[slug], delta: true },
              ];
              return rows.map((row, i) => (
                <tr
                  key={`${slug}-${row.cut}`}
                  className={cn(
                    "border-b border-line",
                    i === 2 && "border-b-2",
                  )}
                >
                  <td className="py-2.5 pr-3 font-medium text-fg">
                    {i === 0 ? (nameBySlug.get(slug) ?? slug) : ""}
                  </td>
                  <td className="py-2.5 pr-3 text-muted">{row.cut}</td>
                  {METRIC_COLS.map((col) => {
                    const n = row.metrics[col.key];
                    const formatted = fmtMetric(n, col.kind, col.digits);
                    return (
                      <td
                        key={col.key}
                        className={cn(
                          "py-2.5 pr-3 tabular",
                          row.delta ? deltaClass(n) : "text-fg",
                        )}
                      >
                        {row.delta ? signed(n, formatted) : formatted}
                      </td>
                    );
                  })}
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-faint">
        Make field is not win title. Numbers above are a desk fixture until the
        AMD CLI is wired. Not this week’s paid pack. {response.confidence_note}
      </p>
    </Panel>
  );
}
