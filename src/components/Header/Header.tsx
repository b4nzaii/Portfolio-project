import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import * as s from "./Header.module.scss";

function applyTheme(theme: "light" | "dark") {
  const html = document.documentElement;
  html.classList.remove("theme-dark", "theme-light");
  html.classList.add(theme === "dark" ? "theme-dark" : "theme-light");
  localStorage.setItem("theme", theme);
} // Dark / light theme toggle

// Typdeklarationerna för GRAPHQL
type Q = {
  allContentfulNavigation: {
    nodes: Array<{
      title?: string | null;
      items?: Array<{
        label: string;
        path: string;
        order?: number | null;
      }> | null;
    }>;
  };
};

export default function Header() {
  const data = useStaticQuery<Q>(graphql`
    query HeaderNavQuery {
      allContentfulNavigation(limit: 1) {
        nodes {
          title
          items {
            label
            path
            order
          }
        }
      }
    }
  `);

  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const saved =
      (localStorage.getItem("theme") as "light" | "dark" | null) ?? "light";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems =
    data.allContentfulNavigation.nodes[0]?.items
      ?.slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) ?? [];

  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.bar}>
          <Link to="/" className={s.brand}>
            <span className={s.brandIcon} aria-hidden="true">
              {"</>"}
            </span>
            <span className={s.brandText}>Måns Henrikssons Portfolio</span>
          </Link>

          {/* Vanlig Desktop Nav */}
          <div className={s.desktop}>
            <nav className={s.nav}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={s.navLink}
                  activeClassName={s.navLinkActive}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className={s.actions}>
              <button
                type="button"
                className={s.themeBtn}
                onClick={toggleTheme}
              >
                {theme === "dark" ? "Light" : "Dark"}
              </button>
              <Link to="/contact" className={s.ctaBtn}>
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={s.mobileBtn}
            type="button"
            aria-label="Toggle menu"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Navigation för mobilen */}
      {mobileMenuOpen && (
        <div className={s.mobileMenu}>
          <nav className={s.mobileNav}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={s.mobileNavLink}
                activeClassName={s.mobileNavLinkActive}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={s.mobileActions}>
            <button
              type="button"
              className={s.mobileThemeBtn}
              onClick={toggleTheme}
            >
              {theme === "dark" ? "☀ Light" : "🌙 Dark"}
            </button>
            <Link
              to="/contact"
              className={s.mobileCtaBtn}
              onClick={closeMobileMenu}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
