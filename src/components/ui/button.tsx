import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
    fullWidth?: boolean;
  }
>;

export function Button({
  children,
  className,
  variant = "primary",
  fullWidth = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition",
        variant === "primary" && "bg-ink text-white hover:bg-pine",
        variant === "secondary" && "bg-white text-ink ring-1 ring-ink/10 hover:bg-sand",
        variant === "ghost" && "bg-transparent text-ink hover:bg-ink/5",
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
