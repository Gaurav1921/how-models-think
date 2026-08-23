import { Link } from "react-router-dom";

const links = [
  { to: "/learn", label: "Learn" },
  { to: "/timeline", label: "Timeline" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
];

/** Site-wide footer. */
export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <p className="max-w-sm text-sm text-[var(--color-text-muted)]">
          Built to make transformers, attention, and the engineering around
          large language models easier to see and understand.
        </p>

        <div className="flex flex-col gap-3 text-sm sm:items-end">
          <nav className="flex flex-wrap gap-4 sm:justify-end">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href="https://github.com/Gaurav1921/how-models-think"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            source on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
