import { Link } from "react-router-dom";
import { PageShell } from "../components/layout/PageShell";

/** Fallback page for unmatched routes. */
export function NotFound() {
  return (
    <PageShell>
      <h1 className="font-serif text-3xl">Page not found</h1>
      <p className="mt-3 text-[var(--color-text-muted)]">
        That page does not exist.{" "}
        <Link to="/" className="text-[var(--color-query)] underline">
          Go back home
        </Link>
        .
      </p>
    </PageShell>
  );
}
