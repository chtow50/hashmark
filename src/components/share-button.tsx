import { useState } from "react";
import { ImageDown } from "lucide-react";
import { shareCard, type ShareCard } from "@/lib/share-card";

/** Builds a 1200×630 PNG from the page's own numbers and shares or downloads it. */
export function ShareImageButton({ card, label = "Share image" }: { card: () => ShareCard; label?: string }) {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  return (
    <button
      type="button"
      disabled={state === "busy"}
      onClick={async () => {
        setState("busy");
        try {
          await shareCard(card());
          setState("done");
          setTimeout(() => setState("idle"), 2000);
        } catch {
          setState("error");
        }
      }}
      className="inline-flex min-h-10 items-center gap-2 rounded-md border border-line px-3 text-sm text-muted transition-colors hover:text-fg disabled:opacity-60"
    >
      <ImageDown className="size-4" aria-hidden />
      <span aria-live="polite">{state === "busy" ? "Making image…" : state === "done" ? "Image ready" : state === "error" ? "Couldn't make image" : label}</span>
    </button>
  );
}
