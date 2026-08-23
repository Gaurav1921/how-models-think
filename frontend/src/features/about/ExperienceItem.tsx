import { OrgLogo } from "./OrgLogo";
import type { ExperienceEntry } from "./data";

interface ExperienceItemProps {
  entry: ExperienceEntry;
}

/** A single work experience entry, positioned along the vertical rail with a marker dot. */
export function ExperienceItem({ entry }: ExperienceItemProps) {
  return (
    <div className="relative pb-8 pl-8 last:pb-0">
      <span
        className="absolute top-1.5 -left-[5px] block h-[9px] w-[9px] rounded-full ring-4 ring-[var(--color-bg)]"
        style={{ backgroundColor: "var(--color-position)" }}
      />
      <div className="flex gap-3">
        <OrgLogo src={entry.logo} alt={entry.org} />
        <div className="flex-1">
          <h3 className="font-medium">{entry.role}</h3>
          <p className="text-sm text-[var(--color-text-muted)]">
            {entry.org}
            {entry.location && ` · ${entry.location}`}
          </p>
          <p className="font-mono text-xs text-[var(--color-text-muted)]">{entry.dateRange}</p>
          {entry.description && (
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">{entry.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
