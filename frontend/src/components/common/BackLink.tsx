import { Link } from "react-router-dom";

interface BackLinkProps {
  to: string;
  label: string;
}

/** A small "back to" link shown at the top of a page, consistent with the Learn hub's own back link. */
export function BackLink({ to, label }: BackLinkProps) {
  return (
    <Link to={to} className="font-mono text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
      &lt; {label}
    </Link>
  );
}
