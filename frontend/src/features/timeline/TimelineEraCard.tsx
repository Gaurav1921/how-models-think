import { useEffect, useRef, useState } from "react";
import { Tag } from "../../components/common/Tag";
import type { TimelineEvent } from "../../lib/types";

interface TimelineEraCardProps {
  event: TimelineEvent;
}

/** A single timeline entry, positioned along the vertical rail with a marker dot. */
export function TimelineEraCard({ event }: TimelineEraCardProps) {
  const [expanded, setExpanded] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  function closeExpanded() {
    setExpanded(false);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!expanded) return;
    closeButtonRef.current?.focus();
    function onKeyDown(keyboardEvent: KeyboardEvent) {
      if (keyboardEvent.key === "Escape") closeExpanded();
      if (keyboardEvent.key === "Tab") {
        // The dialog has one focusable element, so keep focus pinned to it
        // rather than letting Tab escape to the page behind the overlay.
        keyboardEvent.preventDefault();
        closeButtonRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded]);

  return (
    <div className="relative pb-8 pl-8 last:pb-0">
      <span
        className="absolute top-1.5 -left-[5px] block h-[9px] w-[9px] rounded-full ring-4 ring-[var(--color-bg)]"
        style={{ backgroundColor: "var(--color-position)" }}
      />
      <div className="flex gap-5">
        <div className="flex-1">
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
        </div>

        {event.image && (
          <figure className="w-40 shrink-0 sm:w-56">
            <button
              type="button"
              ref={triggerRef}
              onClick={() => setExpanded(true)}
              className="block w-full cursor-zoom-in"
              aria-label={`Expand image: ${event.title}`}
            >
              <img
                src={event.image}
                alt={event.title}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-lg border border-[var(--color-border)] object-cover transition-opacity hover:opacity-90"
              />
            </button>
            {event.image_credit && (
              <figcaption className="mt-1 text-[10px] leading-tight text-[var(--color-text-muted)]">
                {event.image_credit}
              </figcaption>
            )}
          </figure>
        )}
      </div>

      {expanded && event.image && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Expanded image: ${event.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={closeExpanded}
        >
          <figure className="flex max-h-full max-w-3xl flex-col items-center gap-3">
            <img
              src={event.image}
              alt={event.title}
              className="max-h-[80vh] max-w-full rounded-lg border border-[var(--color-border)] object-contain"
            />
            <figcaption className="text-center text-sm text-[var(--color-text-muted)]">
              {event.title}
              {event.image_credit && <span className="block text-xs">{event.image_credit}</span>}
            </figcaption>
          </figure>
          <button
            type="button"
            ref={closeButtonRef}
            onClick={(clickEvent) => {
              clickEvent.stopPropagation();
              closeExpanded();
            }}
            aria-label="Close expanded image"
            className="absolute top-6 right-6 text-2xl text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}
