import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
  wide?: boolean;
}

/** Consistent max-width container and vertical rhythm for page content. */
export function PageShell({ children, wide = false }: PageShellProps) {
  return (
    <main className={`mx-auto px-6 py-12 ${wide ? "max-w-6xl 2xl:max-w-7xl" : "max-w-3xl"}`}>{children}</main>
  );
}
