import * as React from "react";
import { Link } from "gatsby";
import * as s from "./Header.module.scss";

function applyTheme(theme: "light" | "dark") {
  const html = document.documentElement;
  html.classList.remove("theme-dark", "theme-light");
  html.classList.add(theme === "dark" ? "theme-dark" : "theme-light");
  localStorage.setItem("theme", theme);
}

export default function Header() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const saved = (localStorage.getItem("theme") as "light" | "dark" | null) ?? "light";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.bar}>
          <Link to="/" className={s.brand}>
            <span className={s.brandIcon} aria-hidden="true">{"</>"}</span>
            <span className={s.brandText}>John Doe Dev</span>
          </Link>

          <div className={s.desktop}>
            <nav className={s.nav}>
              <Link to="/" className={s.navLinkActive}>Home</Link>
              <Link to="/projects" className={s.navLink}>Projects</Link>
              <Link to="/about" className={s.navLink}>About</Link>
              <Link to="/contact" className={s.navLink}>Contact</Link>
            </nav>

            <div className={s.actions}>
              <button type="button" className={s.themeBtn} onClick={toggleTheme}>
                {theme === "dark" ? "Light" : "Dark"}
              </button>
              <Link to="/contact" className={s.ctaBtn}>Get in Touch</Link>
            </div>
          </div>

          <button className={s.mobileBtn} type="button" aria-label="Open menu">
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
