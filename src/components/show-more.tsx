import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Phone lists: first `limit` items, then a "Show all" button. Used on the sm:hidden card lists
 * (the desktop tables beside them still carry every row, so nothing is hidden from crawlers).
 * Resets when `resetKey` changes (new sort or filter).
 */
export function ShowMore<T>({
  items,
  limit = 25,
  noun,
  render,
  className,
  resetKey,
}: {
  items: T[];
  limit?: number;
  noun: string;
  render: (item: T, index: number) => ReactNode;
  className?: string;
  resetKey?: string;
}) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const open = openKey === (resetKey ?? "");
  const shown = open ? items : items.slice(0, limit);
  return (
    <>
      <div className={className}>{shown.map((it, i) => render(it, i))}</div>
      {items.length > limit ? (
        <button
          type="button"
          onClick={() => setOpenKey(open ? null : (resetKey ?? ""))}
          className={cn(
            "mt-3 flex h-11 w-full items-center justify-center rounded-xl bg-raised text-sm text-fg hover:bg-border",
          )}
        >
          {open ? `Show top ${limit}` : `Show all ${items.length} ${noun}`}
        </button>
      ) : null}
    </>
  );
}
