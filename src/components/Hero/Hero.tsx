import * as React from "react";
import { Link } from "gatsby";
import * as s from "./Hero.module.scss";

export default function Hero() {
  return (
    <section className={s.hero}>
      <div className={s.bg} aria-hidden="true">
        <div className={s.blobPrimary} />
        <div className={s.blobSecondary} />
      </div>

      <div className={s.container}>
        <div className={s.grid}>
          <div className={s.copy}>
            <h1 className={s.title}>
              Frontend Developer <br />
              <span className={s.accent}>Crafting engaging</span> web experiences
            </h1>

            <p className={s.lead}>
              Hi, I'm John. I specialize in building accessible, pixel-perfect, and performant web applications
              using React and modern web technologies.
            </p>

            <div className={s.ctaRow}>
              <Link to="/projects" className={s.primaryBtn}>
                View Projects <span className={s.arrow} aria-hidden="true">↓</span>
              </Link>

              <Link to="/contact" className={s.secondaryBtn}>
                Contact Me
              </Link>
            </div>

            <div className={s.stack}>
              <span className={s.stackLabel}>Tech Stack</span>
              <div className={s.stackDots}>
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>

          <div className={s.media}>
            <div className={s.heroImage}>
              <div className={s.overlay} />
              <div className={s.callout}>
                <div className={s.calloutBox}>
                  <p className={s.calloutTitle}>Currently working on</p>
                  <p className={s.calloutText}>Design System Architecture for Fintech</p>
                </div>
              </div>
            </div>
            {/* Byt gärna till GatsbyImage/Contentful-bild senare */}
          </div>
        </div>
      </div>
    </section>
  );
}
