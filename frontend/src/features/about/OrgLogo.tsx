import { useState } from "react";

interface OrgLogoProps {
  src?: string;
  alt: string;
}

/** A small org logo badge, falling back to an initial letter if the image is missing or fails to load. */
export function OrgLogo({ src, alt }: OrgLogoProps) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] font-mono text-xs text-[var(--color-text-muted)]">
        {alt.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className="h-10 w-10 shrink-0 rounded-lg border border-[var(--color-border)] bg-white object-contain p-1.5"
    />
  );
}
