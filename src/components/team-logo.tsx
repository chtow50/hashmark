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
      style={{ width: size, height: size }}
      onError={() => setHidden(true)}
    />
  );
}
