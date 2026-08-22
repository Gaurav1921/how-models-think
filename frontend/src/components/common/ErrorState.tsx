interface ErrorStateProps {
  message?: string;
}

/** Shown when a page's content fails to load. */
export function ErrorState({ message = "Something went wrong loading this page." }: ErrorStateProps) {
  return <p className="text-[var(--color-attention)]">{message}</p>;
}
