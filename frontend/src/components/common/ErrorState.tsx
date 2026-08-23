interface ErrorStateProps {
  message?: string;
}

/** Shown when a page's content fails to load. */
export function ErrorState({ message = "Something went wrong loading this page." }: ErrorStateProps) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-5 py-4 text-sm text-[var(--color-attention)]">
      {message}
    </div>
  );
}
