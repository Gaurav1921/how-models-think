import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/transformers", label: "Transformers" },
  { to: "/timeline", label: "Timeline" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
];

/** Site-wide navigation bar. */
export function NavBar() {
  return (
    <header className="border-b border-[var(--color-border)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="font-semibold tracking-tight">
          How Models Think
        </NavLink>
        <nav className="flex gap-6 text-sm">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
