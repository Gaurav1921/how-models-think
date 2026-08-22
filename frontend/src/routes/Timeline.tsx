import { PageShell } from "../components/layout/PageShell";
import { LoadingState } from "../components/common/LoadingState";
import { ErrorState } from "../components/common/ErrorState";
import { TimelineEraCard } from "../features/timeline/TimelineEraCard";
import { getTimelineEvents } from "../lib/api";
import { useApi } from "../lib/useApi";
import type { TimelineEvent } from "../lib/types";

function groupByEra(events: TimelineEvent[]): [string, TimelineEvent[]][] {
  const eraOrder: string[] = [];
  const grouped = new Map<string, TimelineEvent[]>();
  for (const event of events) {
    if (!grouped.has(event.era)) {
      grouped.set(event.era, []);
      eraOrder.push(event.era);
    }
    grouped.get(event.era)!.push(event);
  }
  return eraOrder.map((era) => [era, grouped.get(era)!]);
}

/** Timeline page: a chronological view of AI/ML evolution. */
export function Timeline() {
  const state = useApi(getTimelineEvents);

  return (
    <PageShell wide>
      <h1 className="font-serif text-3xl">How we got here</h1>
      <p className="mt-3 max-w-2xl text-[var(--color-text-muted)]">
        From rule-based systems to classical machine learning, deep learning,
        transformers, and today's large language models.
      </p>

      <div className="mt-10 space-y-10">
        {state.status === "loading" && <LoadingState />}
        {state.status === "error" && <ErrorState />}
        {state.status === "success" &&
          groupByEra(state.data).map(([era, events]) => (
            <section key={era}>
              <h2 className="mb-4 text-sm font-medium tracking-wide text-[var(--color-text-muted)] uppercase">
                {era}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {events.map((event) => (
                  <TimelineEraCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          ))}
      </div>
    </PageShell>
  );
}
