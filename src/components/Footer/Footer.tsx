import * as React from "react";
import { Link } from "gatsby";
import * as s from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.top}>
          <div className={s.brandBlock}>
            <div className={s.brand}>
              <span className={s.brandIcon} aria-hidden="true">{"</>"}</span>
              <span className={s.brandText}>John Doe Dev</span>
            </div>
            <p className={s.tagline}>Building digital products, brands, and experiences.</p>
          </div>

          <div className={s.cols}>
            <div className={s.col}>
              <h4 className={s.colTitle}>Navigation</h4>
              <Link className={s.link} to="/">Home</Link>
              <Link className={s.link} to="/projects">Projects</Link>
              <Link className={s.link} to="/about">About</Link>
              <Link className={s.link} to="/contact">Contact</Link>
            </div>

            <div className={s.col}>
              <h4 className={s.colTitle}>Connect</h4>
              <a className={s.link} href="#">LinkedIn</a>
              <a className={s.link} href="#">GitHub</a>
              <a className={s.link} href="#">Twitter</a>
              <a className={s.link} href="mailto:hello@example.com">Email</a>
            </div>
          </div>
        </div>

        <div className={s.bottom}>
          <p className={s.copy}>© {new Date().getFullYear()} John Doe. All rights reserved.</p>
          <div className={s.icons}>
            <a className={s.icon} href="#" aria-label="Terminal">⌘</a>
            <a className={s.icon} href="#" aria-label="Email">@</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
