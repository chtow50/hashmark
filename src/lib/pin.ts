import { useEffect, useState } from "react";

/** One pinned favorite team per browser. localStorage only; no accounts, nothing sent anywhere. */
const KEY = "hashmark:pinned-team";
const EVENT = "hashmark:pin-change";

export function readPinned(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function writePinned(slug: string | null) {
  try {
    if (slug) window.localStorage.setItem(KEY, slug);
    else window.localStorage.removeItem(KEY);
  } catch {
    /* private mode: pin just won't persist */
  }
  window.dispatchEvent(new Event(EVENT));
}

/**
 * Pinned slug, or null. Always null on the server and first client render so
 * hydration matches; the real value lands right after mount.
 */
export function usePinnedTeam(): [string | null, (slug: string | null) => void] {
  const [slug, setSlug] = useState<string | null>(null);
  useEffect(() => {
    const sync = () => setSlug(readPinned());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return [slug, writePinned];
}
