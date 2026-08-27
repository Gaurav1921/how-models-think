import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Drives a scrollytelling section's active step index from scroll position.
 *
 * Each step element is registered via the returned `registerStep` ref
 * callback. A step becomes active when it crosses the vertical center band
 * of the viewport, using a single shared IntersectionObserver.
 */
export function useScrollStep() {
  const [activeStep, setActiveStep] = useState(0);
  const stepNodes = useRef<(HTMLElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((closest, entry) =>
          entry.boundingClientRect.top < closest.boundingClientRect.top ? entry : closest,
        );
        const index = stepNodes.current.indexOf(topMost.target as HTMLElement);
        if (index !== -1) setActiveStep(index);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    observerRef.current = observer;
    // Ref callbacks run during commit, before this effect, so any step
    // already registered by then was skipped (no observer existed yet).
    // Observe them now so the very first render isn't left unobserved.
    for (const node of stepNodes.current) {
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
  }, []);

  // registerStep(index) must return the same function reference across
  // renders for a given index, or React treats the ref as changed on every
  // render (since ScrollSection re-renders on every activeStep change) and
  // tears down/reattaches the IntersectionObserver registration constantly.
  const registerStepFns = useRef<((node: HTMLElement | null) => void)[]>([]);

  const registerStep = useCallback((index: number) => {
    registerStepFns.current[index] ??= (node: HTMLElement | null) => {
      const observer = observerRef.current;
      const previous = stepNodes.current[index];
      if (previous && observer) observer.unobserve(previous);
      stepNodes.current[index] = node;
      if (node && observer) observer.observe(node);
    };
    return registerStepFns.current[index];
  }, []);

  return { activeStep, registerStep };
}
