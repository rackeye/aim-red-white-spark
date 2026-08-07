import { GraduationCap } from "lucide-react";
import { useState } from "react";

import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * Renders the custom logo from `brand.logoSrc` inside a fixed square box.
 * Any aspect ratio is preserved (object-contain) and a graduation-cap mark
 * is used as a fallback when the file is missing.
 */
export function BrandLogo({ className, iconClassName }: { className?: string; iconClassName?: string }) {
  const [failed, setFailed] = useState(false);

  if (!brand.logoSrc || failed) {
    return (
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-xl gradient-primary text-primary-foreground",
          className,
        )}
      >
        <GraduationCap className={cn("h-6 w-6", iconClassName)} />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center overflow-hidden rounded-xl bg-card p-1",
        className,
      )}
    >
      <img
        src={brand.logoSrc}
        alt={`${brand.fullName} logo`}
        width={128}
        height={128}
        decoding="async"
        className="h-full w-full object-contain"
        onError={() => setFailed(true)}
      />
    </span>
  );
}
