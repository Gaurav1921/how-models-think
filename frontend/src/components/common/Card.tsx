import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  as?: "div" | "article";
  interactive?: boolean;
}

/** A bordered card container used across list and grid layouts. */
export function Card({ children, as: As = "div", interactive = false }: CardProps) {
  return (
    <As
      className={`h-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5 ${
        interactive
          ? "transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-text-muted)] hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]"
          : ""
      }`}
    >
      {children}
    </As>
  );
}
