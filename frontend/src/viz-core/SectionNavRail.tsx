import { useEffect, useState } from "react";
import { slugify } from "./slugify";

interface SectionNavRailProps {
  titles: string[];
}

/**
 * A fixed vertical rail of dots, one per page section, for long
 * scrollytelling pages. Highlights the section currently in view and lets
 * a reader jump straight to any other one. Hidden below the xl breakpoint,
 * where there isn't enough side margin to show it without overlapping content.
 */
export function SectionNavRail({ titles }: SectionNavRailProps) {
  const sections = titles.map((title) => ({ id: slugify(title), title }));
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((closest, entry) =>
          entry.boundingClientRect.top < closest.boundingClientRect.top ? entry : closest,
        );
        setActiveId(topMost.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    for (const section of sections) {
      const node = document.getElementById(section.id);
      if (node) observer.observe(node);
    }

    return () => observer.disconnect();
    // oxlint-disable-next-line react-hooks/exhaustive-deps -- titles is stable per page
  }, []);

  return (
    <nav
      aria-label="Section progress"
      className="fixed top-1/2 right-6 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
    >
      {sections.map((section) => {
        const isActive = section.id === activeId;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-center gap-3"
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={`pointer-events-none max-w-0 overflow-hidden font-mono text-xs whitespace-nowrap text-[var(--color-text-muted)] opacity-0 transition-all duration-200 group-hover:max-w-xs group-hover:opacity-100 ${
                isActive ? "max-w-xs opacity-100" : ""
              }`}
            >
              {section.title}
            </span>
            <span
              className="block rounded-full transition-all duration-200"
              style={{
                width: isActive ? 8 : 6,
                height: isActive ? 8 : 6,
                backgroundColor: isActive ? "var(--color-attention)" : "var(--color-border)",
              }}
            />
          </a>
        );
      })}
    </nav>
  );
}
