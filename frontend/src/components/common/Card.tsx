import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  as?: "div" | "article";
}

/** A bordered card container used across list and grid layouts. */
export function Card({ children, as: As = "div" }: CardProps) {
  return (
    <As className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-5">
      {children}
    </As>
  );
}
