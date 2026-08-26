import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/learn", label: "Learn" },
  { to: "/timeline", label: "Timeline" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
];

function linkClassName({ isActive }: { isActive: boolean }) {
  return isActive
    ? "text-[var(--color-text)]"
    : "text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]";
}

/** Site-wide navigation bar: sticky, with a mobile menu below the sm breakpoint. */
export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 2xl:max-w-7xl">
        <NavLink to="/" className="font-semibold tracking-tight" onClick={() => setMenuOpen(false)}>
          How Models Think
        </NavLink>

        <nav className="hidden gap-6 text-sm sm:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClassName}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
          className="relative h-8 w-8 sm:hidden"
        >
          <span
            className="absolute top-1/2 left-1/2 h-px w-5 bg-[var(--color-text)] transition-transform"
            style={{ transform: menuOpen ? "translate(-50%, -50%) rotate(45deg)" : "translate(-50%, -50%) translateY(-4.5px)" }}
          />
          <span
            className="absolute top-1/2 left-1/2 h-px w-5 bg-[var(--color-text)] transition-transform"
            style={{ transform: menuOpen ? "translate(-50%, -50%) rotate(-45deg)" : "translate(-50%, -50%) translateY(4.5px)" }}
          />
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-[var(--color-border)] px-6 py-3 text-sm sm:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={linkClassName}
              onClick={() => setMenuOpen(false)}
            >
              <span className="block py-1.5">{link.label}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
