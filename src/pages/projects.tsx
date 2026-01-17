import * as React from "react";
import { graphql, PageProps, Link } from "gatsby";
import Fuse from "fuse.js";
import Layout from "../components/Layout/Layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as s from "./projects.module.scss";
import SEO from "../components/SEO";
type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  tech: string[] | null;
  image: any;
};

type Data = {
  allContentfulProject: { nodes: Project[] };
};

export default function ProjectsPage({ data }: PageProps<Data>) {
  const projects = data.allContentfulProject.nodes;

  const [q, setQ] = React.useState("");
  const [activeTech, setActiveTech] = React.useState<string>("All");

  const techOptions = React.useMemo(() => {
    const all = projects
      .flatMap((p) => p.tech ?? [])
      .filter((t): t is string => Boolean(t));

    return [
      "All",
      ...Array.from(new Set(all)).sort((a, b) => a.localeCompare(b)),
    ];
  }, [projects]);

  const filtered = React.useMemo(() => {
    if (activeTech === "All") return projects;
    return projects.filter((p) => p.tech?.includes(activeTech));
  }, [projects, activeTech]);

  const fuse = React.useMemo(
    () =>
      new Fuse(filtered, {
        keys: ["title", "description", "tech"],
      }),
    [filtered],
  );

  const results =
    q.trim() === "" ? filtered : fuse.search(q.trim()).map((r) => r.item);

  return (
    <>
      <SEO
        title="Måns Henriksson -Frontend Developer"
        description="Frontend developer passionate about creating modern and accessible web experiences."
        pathname="/projects"
      />
      <Layout>
        <main className={s.page}>
          <header className={s.heading}>
            <h1 className={s.h1}>Selected Works</h1>
            <p className={s.lead}>
              My collection of projects, although not exhaustive, there is some
              variety 😅
            </p>

            <div className={s.searchRow}>
              <input
                type="search"
                className={s.search}
                placeholder="Search projects…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />

              <div className={s.chips}>
                {techOptions.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={activeTech === t ? s.chipActive : s.chip}
                    onClick={() => setActiveTech(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <section className={s.grid}>
            {results.length === 0 ? (
              <p className={s.empty}>No projects found matching your search.</p>
            ) : (
              results.map((p) => {
                const img = getImage(p.image);
                const techArray = Array.isArray(p.tech) ? p.tech : [];
                const tags = techArray.filter(Boolean).slice(0, 3);

                return (
                  <article key={p.id} className={s.card}>
                    <div className={s.media}>
                      {img && <GatsbyImage image={img} alt={p.title} />}
                      {tags[0] && <span className={s.badge}>{tags[0]}</span>}
                    </div>

                    <div className={s.body}>
                      <h3 className={s.cardTitle}>{p.title}</h3>
                      <p className={s.desc}>{p.description}</p>

                      {tags.length > 0 && (
                        <div className={s.tags}>
                          {tags.map((t) => (
                            <span key={t} className={s.tag}>
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link className={s.linkBtn} to={`/projects/${p.slug}`}>
                        View Project <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </article>
                );
              })
            )}
          </section>

          <section className={s.cta}>
            <h2 className={s.ctaTitle}>Want to contact me?</h2>
            <p className={s.ctaText}>Contact me below :) </p>
            <div className={s.ctaBtns}>
              <Link to="/contact" className={s.ctaPrimary}>
                Contact Me <span aria-hidden="true">✉</span>
              </Link>
              <a
                className={s.ctaSecondary}
                href="/"
                target="_blank"
                rel="noreferrer"
              >
                View Resume <span aria-hidden="true">📄</span>
              </a>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}

export const query = graphql`
  query ProjectsPageQuery {
    allContentfulProject(sort: { createdAt: DESC }) {
      nodes {
        id
        title
        slug
        description
        tech
        image {
          gatsbyImageData(
            width: 900
            height: 520
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  }
`;
