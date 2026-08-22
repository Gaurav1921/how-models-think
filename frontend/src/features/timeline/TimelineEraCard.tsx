import { Card } from "../../components/common/Card";
import { Tag } from "../../components/common/Tag";
import type { TimelineEvent } from "../../lib/types";

interface TimelineEraCardProps {
  event: TimelineEvent;
}

/** A single timeline entry: year, title, and summary. */
export function TimelineEraCard({ event }: TimelineEraCardProps) {
  return (
    <Card as="article">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm text-[var(--color-position)]">{event.year_label}</span>
        <h3 className="font-medium">{event.title}</h3>
      </div>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{event.summary}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {event.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
    </Card>
  );
}
