import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  eyebrow,
  description,
  className,
  children
}: PropsWithChildren<{
  title: string;
  eyebrow?: string;
  description?: string;
  className?: string;
}>) {
  return (
    <div className={cn("max-w-3xl space-y-4", className)}>
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ember">{eyebrow}</p> : null}
      <h2 className="font-display text-4xl tracking-tight text-ink md:text-5xl">{title}</h2>
      {description ? <p className="text-lg leading-8 text-ink/70">{description}</p> : null}
      {children}
    </div>
  );
}
