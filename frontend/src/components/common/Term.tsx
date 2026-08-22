/** Inline glossary reference: dotted-underlined text that reveals a short definition on hover or focus. */

import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { useGlossaryTerm } from "../../lib/GlossaryContext";

interface TermProps {
  slug: string;
  children: ReactNode;
}

export function Term({ slug, children }: TermProps) {
  const term = useGlossaryTerm(slug);

  if (!term) return <>{children}</>;

  return (
    <span tabIndex={0} className="group relative border-b border-dotted border-current cursor-help outline-none">
      {children}
      <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-3 text-sm leading-snug text-[var(--color-text)] opacity-0 shadow-lg transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-focus:pointer-events-auto group-focus:opacity-100">
        <span className="mb-1 block font-mono text-xs text-[var(--color-text-muted)]">{term.term}</span>
        {term.short_definition}
        {term.read_more_href && (
          <Link to={term.read_more_href} className="mt-2 block text-xs text-[var(--color-query)] hover:underline">
            Read more &gt;
          </Link>
        )}
      </span>
    </span>
  );
}
