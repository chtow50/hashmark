import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  EDGE,
  EDGE_CHECKOUT_PENDING,
  edgeCheckoutHref,
  edgeCheckoutLive,
} from "@/lib/edge";
import { cn } from "@/lib/utils";

export function EdgePackNavButton({ className }: { className?: string }) {
  return (
    <Button asChild size="sm" variant="primary" className={className}>
      <Link to="/edge">{EDGE.shortName}</Link>
    </Button>
  );
}

export function EdgePackStrip({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <Link
        to="/edge"
        className={cn(
          "mb-6 flex min-h-11 items-center justify-between gap-3 text-sm text-muted hover:text-fg",
          className,
        )}
      >
        <span>
          {EDGE.name} · weekly disagreements and SU/closer tape · {EDGE.weekLabel} · {EDGE.monthLabel}
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 text-fg">
          Open
          <ArrowRight className="size-4" />
        </span>
      </Link>
    );
  }

  return (
    <Link
      to="/edge"
      className={cn(
        "flex flex-col gap-2 rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)] sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          {EDGE.name}
        </p>
        <p className="mt-1 text-sm text-muted">
          Weekly depth — HX vs AP/market, flagged games, SU/closer tape.{" "}
          {EDGE.weekLabel} · {EDGE.monthLabel}.
        </p>
      </div>
      <span className="inline-flex h-11 shrink-0 items-center gap-1 text-sm text-fg">
        Open pack
        <ArrowRight className="size-4" />
      </span>
    </Link>
  );
}

export function EdgeBuyButton({
  kind,
  label,
  className,
}: {
  kind: "week" | "month";
  label: string;
  className?: string;
}) {
  const live = edgeCheckoutLive(kind);
  const href = edgeCheckoutHref(kind);
  return (
    <Button asChild variant="primary" className={cn("w-full", className)}>
      <a
        href={href}
        {...(live ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label}
      </a>
    </Button>
  );
}

export function EdgeCheckoutNote({ className }: { className?: string }) {
  if (edgeCheckoutLive("week") && edgeCheckoutLive("month")) return null;
  return (
    <p
      id={EDGE_CHECKOUT_PENDING.slice(1)}
      className={cn("text-sm text-muted", className)}
    >
      Checkout wiring this week
    </p>
  );
}
