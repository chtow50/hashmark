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

const TONES = ["bg-raised text-faint", "bg-heat-1 text-muted", "bg-heat-2 text-muted", "bg-heat-3 text-fg", "bg-accent text-accent-fg"];

/**
 * Quintile by rank among states with any tracked talent (index > 0). Scaling by the max put most
 * states in the top band, so the map carried little information.
 */
function toneFor(index: number, sorted: number[]) {
  if (index <= 0 || sorted.length === 0) return TONES[0];
  const below = sorted.filter((v) => v < index).length;
  const q = Math.min(3, Math.floor((below / sorted.length) * 4));
  return TONES[q + 1];
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
  const sorted = states.map((s) => s.talentIndex).filter((v) => v > 0).sort((a, b) => a - b);

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
                  toneFor(st?.talentIndex ?? 0, sorted),
                  active && "ring-2 ring-fg ring-offset-1 ring-offset-bg",
                )}
              >
                {code}
              </button>
            );
          }),
        )}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-muted" aria-hidden>
        <span>Less talent</span>
        {TONES.slice(1).map((t) => (
          <span key={t} className={cn("h-3 w-6 rounded-sm", t.split(" ")[0])} />
        ))}
        <span>More (quartiles of states)</span>
        <span className={cn("ml-2 h-3 w-6 rounded-sm", TONES[0].split(" ")[0])} />
        <span>None tracked</span>
      </div>
    </div>
  );
}
