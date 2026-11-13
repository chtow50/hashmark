import { useState } from "react";
import { teamLogoSrc } from "@/lib/cfb/team-logos";
import { cn } from "@/lib/utils";

const DEFAULT_SIZE = 18;

export function TeamLogo({
  slug,
  size = DEFAULT_SIZE,
  className,
}: {
  slug: string;
  size?: number;
  className?: string;
}) {
  const src = teamLogoSrc(slug);
  const [hidden, setHidden] = useState(false);

  if (!src || hidden) return null;

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={cn("inline-block shrink-0 object-contain", className)}
      // Thin light halo so dark marks (Texas A&M, Wake Forest, Iowa...) stay visible on the dark desk.
      style={{ width: size, height: size, filter: "drop-shadow(0 0 0.75px rgba(242,241,236,0.6))" }}
      onError={() => setHidden(true)}
    />
  );
}
