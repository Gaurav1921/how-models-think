import { Link } from "react-router-dom";
import { PageShell } from "../components/layout/PageShell";
import { Card } from "../components/common/Card";
import { LoadingState } from "../components/common/LoadingState";
import { ErrorState } from "../components/common/ErrorState";
import { getCurriculumDomains } from "../lib/api";
import { useApi } from "../lib/useApi";

/** The Learn hub: every subject area this site covers, each one drilling into an ordered list of topics. */
export function Learn() {
  const state = useApi(getCurriculumDomains);

  return (
    <PageShell wide>
      <h1 className="font-serif text-3xl">Learn</h1>
      <p className="mt-3 max-w-2xl text-[var(--color-text-muted)]">
        Pick a subject area, then work through its topics in order. Each one
        builds on the last.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {state.status === "loading" && <LoadingState />}
        {state.status === "error" && <ErrorState />}
        {state.status === "success" &&
          [...state.data]
            .sort((a, b) => a.order - b.order)
            .map((domain) =>
            domain.status === "live" ? (
              <Link key={domain.slug} to={`/learn/${domain.slug}`} className="block h-full">
                <Card as="article" interactive>
                  <h2 className="font-medium">{domain.title}</h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">{domain.summary}</p>
                </Card>
              </Link>
            ) : (
              <Card as="article" key={domain.slug}>
                <div className="flex items-center gap-2">
                  <h2 className="font-medium text-[var(--color-text-muted)]">{domain.title}</h2>
                  <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-text-muted)]">
                    coming soon
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">{domain.summary}</p>
              </Card>
            ),
          )}
      </div>
    </PageShell>
  );
}
