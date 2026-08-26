import type { ReactNode } from "react";
import { Figure } from "./Figure";
import { useScrollStep } from "./useScrollStep";
import { slugify } from "./slugify";
import { Math } from "./Math";

interface ScrollSectionProps {
  index: number;
  title: string;
  math?: string;
  caption?: string;
  steps: ReactNode[];
  renderGraphic: (activeStep: number) => ReactNode;
}

/**
 * A scrollytelling section: a sticky visualization panel next to narration
 * steps that scroll past. The active step is driven by scroll position via
 * useScrollStep, and also drives which state the visualization renders.
 */
export function ScrollSection({ index, title, math, caption, steps, renderGraphic }: ScrollSectionProps) {
  const { activeStep, registerStep } = useScrollStep(steps.length);

  return (
    <section id={slugify(title)} className="grid scroll-mt-24 gap-8 py-16 lg:grid-cols-2 lg:items-start">
      <div className="lg:sticky lg:top-24">
        <div className="mb-4 flex items-baseline gap-3">
          <span className="font-mono text-sm text-[var(--color-text-muted)]">
            {String(index).padStart(2, "0")}
          </span>
          <h2 className="font-serif text-2xl">{title}</h2>
        </div>
        <Figure caption={caption}>{renderGraphic(activeStep)}</Figure>
        {math && (
          <div className="mt-3 overflow-x-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-4 py-3 text-[var(--color-text)]">
            <Math tex={math} block />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-24 lg:gap-40">
        {steps.map((step, stepIndex) => (
          <p
            key={stepIndex}
            ref={registerStep(stepIndex)}
            className={`max-w-md text-lg leading-relaxed transition-opacity duration-300 ${
              activeStep === stepIndex ? "opacity-100" : "opacity-40"
            }`}
          >
            {step}
          </p>
        ))}
      </div>
    </section>
  );
}
