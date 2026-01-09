import * as React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as s from "./Hero.module.scss";

type Q = {
  contentfulPage: {
    title: string;
    lead?: { lead?: string | null } | null;
  } | null;
  allContentfulProject: {
    nodes: Array<{
      title: string;
      slug: string;
      image?: any;
    }>;
  };
};

export default function Hero() {
  const data = useStaticQuery<Q>(graphql`
    query HomeHeroQuery {
      contentfulPage(slug: { eq: "home" }) {
        title
        lead {
          lead
        }
      }
      allContentfulProject(sort: { createdAt: DESC }, limit: 6) {
        nodes {
          title
          slug
          image {
            gatsbyImageData(
              width: 1400
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
            description
          }
        }
      }
    }
  `);

  const page = data.contentfulPage;
  const projects = data.allContentfulProject.nodes.filter((p) => p.image);

  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    if (projects.length <= 1) return;
    const t = window.setInterval(() => {
      setI((prev) => (prev + 1) % projects.length);
    }, 3500);
    return () => window.clearInterval(t);
  }, [projects.length]);

  const leadText = page?.lead?.lead ?? "";
  const active = projects.length ? projects[i] : null;
  const img = active?.image ? getImage(active.image) : null;

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
              {page?.title ?? "Frontend Developer"}{" "}
              <span className={s.accent}>Crafting engaging</span> web
              experiences
            </h1>

            {leadText ? <p className={s.lead}>{leadText}</p> : null}

            <div className={s.ctaRow}>
              <Link to="/projects" className={s.primaryBtn}>
                View Projects <span className={s.arrow}>↓</span>
              </Link>
              <Link to="/contact" className={s.secondaryBtn}>
                Contact Me
              </Link>
            </div>

            <div className={s.stack}>
              <span className={s.stackLabel}>Tech Stack</span>
              <div className={s.stackDots} aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>

          <div className={s.media}>
            <div className={s.heroImage}>
              {img ? (
                <GatsbyImage
                  className={s.heroImg}
                  image={img}
                  alt={active?.title ?? "Project preview"}
                />
              ) : null}

              <div className={s.overlay} />

              <div className={s.callout}>
                <div className={s.calloutBox}>
                  <p className={s.calloutTitle}>Currently showcasing</p>
                  <p className={s.calloutText}>
                    {active
                      ? active.title
                      : "Add project screenshots in Contentful to enable slideshow"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
