import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useInView } from "./useInView";

interface FigureProps {
  title?: string;
  caption?: string;
  children: ReactNode;
}

/** Wraps a visualization with a consistent frame, caption, and entrance animation. */
export function Figure({ title, caption, children }: FigureProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <div
      ref={ref}
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4 sm:p-6"
    >
      {title && (
        <div className="mb-3 text-sm font-medium tracking-wide text-[var(--color-text-muted)] uppercase">
          {title}
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
      {caption && <p className="mt-3 text-sm text-[var(--color-text-muted)]">{caption}</p>}
    </div>
  );
}
