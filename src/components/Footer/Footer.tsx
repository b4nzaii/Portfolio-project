import * as React from "react";
import { Link } from "gatsby";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { SiReact, SiGatsby } from "react-icons/si";
import * as s from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.top}>
          <div className={s.brandBlock}>
            <div className={s.brand}>
              <span className={s.brandIcon} aria-hidden="true">
                {"</>"}
              </span>
              <span className={s.brandText}>Måns Henriksson</span>
            </div>
            <p className={s.tagline}>Frontend developer! 🤓</p>
            <div className={s.socialIcons}>
              <a
                className={s.socialIcon}
                href="https://www.linkedin.com/in/m%C3%A5ns-bergstr%C3%B6m-henriksson-823ab0210/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                className={s.socialIcon}
                href="https://github.com/b4nzaii"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                className={s.socialIcon}
                href="https://twitter.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                className={s.socialIcon}
                href="mailto:mans200@live.se"
                aria-label="Email"
              >
                <HiMail size={22} />
              </a>
            </div>
          </div>

          <div className={s.cols}>
            <div className={s.col}>
              <h4 className={s.colTitle}>Navigation</h4>
              <Link className={s.link} to="/">
                Home
              </Link>
              <Link className={s.link} to="/projects">
                Projects
              </Link>
              <Link className={s.link} to="/tech">
                Technologies
              </Link>
              <Link className={s.link} to="/about">
                About
              </Link>
              <Link className={s.link} to="/contact">
                Contact
              </Link>
            </div>

            <div className={s.col}>
              <h4 className={s.colTitle}>Projects</h4>
              <Link className={s.link} to="/projects">
                All Projects
              </Link>
              <Link className={s.link} to="/projects#featured">
                Featured Work
              </Link>
              <Link className={s.link} to="/tech">
                Tech Stack
              </Link>
            </div>

            <div className={s.col}>
              <h4 className={s.colTitle}>Connect</h4>
              <a
                className={s.link}
                href="https://www.linkedin.com/in/m%C3%A5ns-bergstr%C3%B6m-henriksson-823ab0210/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={16} className={s.linkIcon} /> LinkedIn
              </a>
              <a
                className={s.link}
                href="https://github.com/b4nzaii"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={16} className={s.linkIcon} /> GitHub
              </a>
              <a
                className={s.link}
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={16} className={s.linkIcon} /> Twitter
              </a>
              <a className={s.link} href="mailto:mans200@live.se">
                <HiMail size={18} className={s.linkIcon} /> Email
              </a>
            </div>
          </div>
        </div>

        <div className={s.bottom}>
          <div className={s.bottomLeft}>
            <p className={s.copy}>
              © {new Date().getFullYear()} Måns Henriksson. All rights reserved.
            </p>
            <div className={s.builtWith}>
              <span className={s.builtText}>Built with</span>
              <SiReact size={16} className={s.techIcon} title="React" />
              <SiGatsby size={16} className={s.techIcon} title="Gatsby" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
