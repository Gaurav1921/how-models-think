/** Shown while a page's content is being fetched. */
export function LoadingState() {
  return (
    <div className="flex flex-col gap-3" aria-label="Loading" role="status">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="h-20 animate-pulse rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-raised)]"
          style={{ animationDelay: `${index * 100}ms` }}
        />
      ))}
    </div>
  );
}
