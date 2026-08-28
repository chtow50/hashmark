import { cn } from "@/lib/utils";
import type { StateRow } from "@/lib/cfb/types";

const ROWS: (string | null)[][] = [
  [null, null, null, null, null, null, null, null, null, null, "ME"],
  [null, null, null, null, null, null, null, null, "VT", "NH", null],
  ["WA", "ID", "MT", "ND", "MN", "WI", null, "MI", "NY", "MA", "RI"],
  ["OR", "NV", "WY", "SD", "IA", "IL", "IN", "OH", "PA", "NJ", "CT"],
  ["CA", "UT", "CO", "NE", "MO", "KY", "WV", "VA", "MD", "DE", null],
  [null, "AZ", "NM", "KS", "AR", "TN", "NC", "SC", "DC", null, null],
  [null, null, null, "OK", "LA", "MS", "AL", "GA", null, null, null],
  [null, null, null, "TX", null, null, null, "FL", null, "AK", "HI"],
];

function tone(index: number, max: number) {
  const t = max <= 0 ? 0 : index / max;
  if (t < 0.08) return "bg-raised text-faint";
  if (t < 0.25) return "bg-heat-1 text-muted";
  if (t < 0.5) return "bg-heat-2 text-muted";
  if (t < 0.75) return "bg-heat-3 text-fg";
  return "bg-accent text-accent-fg";
}

export function StateMosaic({
  states,
  selected,
  onSelect,
}: {
  states: StateRow[];
  selected: string | null;
  onSelect: (code: string) => void;
}) {
  const byCode = new Map(states.map((s) => [s.code, s]));
  const max = Math.max(...states.map((s) => s.talentIndex), 1);

  return (
    <div className="overflow-x-auto">
      <div className="inline-grid min-w-[520px] grid-cols-11 gap-1 sm:min-w-0 sm:w-full">
        {ROWS.flatMap((row, ri) =>
          row.map((code, ci) => {
            if (!code) {
              return <div key={`${ri}-${ci}`} className="aspect-square" />;
            }
            const st = byCode.get(code);
            const active = selected === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => onSelect(code)}
                title={st ? `${st.name} · talent ${st.talentIndex}` : code}
                className={cn(
                  "aspect-square rounded-md text-[10px] font-medium tabular transition-[box-shadow,transform] duration-150 sm:text-xs",
                  tone(st?.talentIndex ?? 0, max),
                  active && "ring-2 ring-fg ring-offset-1 ring-offset-bg",
                )}
              >
                {code}
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
}
