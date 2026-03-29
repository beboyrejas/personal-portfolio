import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full bg-mist px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-pine",
        className
      )}
    >
      {children}
    </span>
  );
}
