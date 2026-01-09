import * as React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as s from "./FeaturedProjects.module.scss";

type Q = {
  allContentfulProject: {
    nodes: Array<{
      title: string;
      slug: string;
      description?: string | null;
      image?: any;
    }>;
  };
};

export default function FeaturedProjects() {
  const data = useStaticQuery<Q>(graphql`
    query FeaturedProjectsQuery {
      allContentfulProject(sort: { createdAt: DESC }, limit: 3) {
        nodes {
          title
          slug
          description
          image {
            gatsbyImageData(
              width: 900
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
            description
          }
        }
      }
    }
  `);

  const projects = data.allContentfulProject.nodes;

  return (
    <section className={s.section} id="projects">
      <div className={s.container}>
        <div className={s.head}>
          <div>
            <p className={s.kicker}>Portfolio</p>
            <h2 className={s.title}>Featured Work</h2>
          </div>
          <p className={s.sub}>
            A curated selection of my recent work, focusing on performance,
            accessibility, and user experience.
          </p>
        </div>

        <div className={s.grid}>
          {projects.map((p) => {
            const img = p.image ? getImage(p.image) : null;

            return (
              <article key={p.slug} className={s.card}>
                <div className={s.media}>
                  {img ? (
                    <GatsbyImage
                      className={s.cover}
                      image={img}
                      alt={p.image?.description ?? p.title}
                    />
                  ) : (
                    <div className={s.cover} />
                  )}
                </div>

                <div className={s.body}>
                  <h3 className={s.cardTitle}>{p.title}</h3>
                  {p.description && <p className={s.desc}>{p.description}</p>}

                  <div className={s.links}>
                    <Link to={`/projects/${p.slug}`} className={s.linkPrimary}>
                      View project →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className={s.more}>
          <Link to="/projects" className={s.moreBtn}>
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
