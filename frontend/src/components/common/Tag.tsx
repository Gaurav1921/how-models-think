interface TagProps {
  label: string;
}

/** A small pill used to display a topic tag. */
export function Tag({ label }: TagProps) {
  return (
    <span className="rounded-full border border-[var(--color-border)] px-2.5 py-0.5 text-xs text-[var(--color-text-muted)]">
      {label}
    </span>
  );
}
