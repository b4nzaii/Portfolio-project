import * as React from "react";
import { Link } from "gatsby";
import * as s from "./FeaturedProjects.module.scss";

type Project = {
  title: string;
  description: string;
  year?: string;
  tags?: string[];
};

const mock: Project[] = [
  {
    title: "E-commerce Analytics Dashboard",
    description:
      "A responsive dashboard built for managing online store metrics. Features real-time data visualization and sales tracking capabilities.",
    year: "2023",
    tags: ["React", "Next.js", "Tailwind"],
  },
  {
    title: "SaaS Product Landing Page",
    description:
      "High-conversion landing page for a startup. Implemented payments and user authentication.",
    tags: ["Vue.js", "Stripe", "Firebase"],
  },
  {
    title: "Weather Data Visualizer",
    description:
      "Interactive application visualizing global weather patterns with real-time data and complex charts.",
    tags: ["D3.js", "REST API", "JavaScript"],
  },
];

export default function FeaturedProjects() {
  return (
    <section className={s.section} id="projects">
      <div className={s.container}>
        <div className={s.head}>
          <div>
            <p className={s.kicker}>Portfolio</p>
            <h2 className={s.title}>Featured Work</h2>
          </div>
          <p className={s.sub}>
            A curated selection of my recent web development work, focusing on performance, accessibility,
            and user experience.
          </p>
        </div>

        <div className={s.grid}>
          {mock.map((p) => (
            <article key={p.title} className={s.card}>
              <div className={s.media}>
                <div className={s.cover} />
                {p.year && <div className={s.badge}>{p.year}</div>}
              </div>

              <div className={s.body}>
                {p.tags?.length ? (
                  <div className={s.tags}>
                    {p.tags.map((t) => (
                      <span key={t} className={s.tag}>{t}</span>
                    ))}
                  </div>
                ) : null}

                <h3 className={s.cardTitle}>{p.title}</h3>
                <p className={s.desc}>{p.description}</p>

                <div className={s.links}>
                  <a href="#" className={s.linkPrimary}>Live Demo</a>
                  <a href="#" className={s.linkMuted}>Source</a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={s.more}>
          <Link to="/projects" className={s.moreBtn}>
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
