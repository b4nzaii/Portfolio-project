import * as React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  SiReact,
  SiTypescript,
  SiGatsby,
  SiContentful,
  SiSass,
  SiGraphql,
  SiFigma,
  SiExpress,
  SiPostgresql,
  SiGit,
  SiVite,
  SiJavascript,
  SiBootstrap,
  SiVuedotjs,
} from "react-icons/si";
import * as s from "./Hero.module.scss";

type Q = {
  contentfulPage: {
    title: string;
    lead?: { lead?: string | null } | null;
    body?: { raw: string } | null;
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
        lead {
          lead
        }
        body {
          raw
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
    }, 6500);
    return () => window.clearInterval(t);
  }, [projects.length]);

  const leadText = page?.lead?.lead ?? "";
  const bodyDoc = page?.body?.raw ? JSON.parse(page.body.raw) : null;

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
              <span className={s.quote}>
                Måns Henriksson Frontend Developer
              </span>
            </h1>

            {leadText ? <p className={s.lead}>{leadText}</p> : null}

            {bodyDoc ? (
              <div className={s.bodyText}>
                {documentToReactComponents(bodyDoc)}
              </div>
            ) : null}

            <div className={s.ctaRow}>
              <Link to="/projects" className={s.primaryBtn}>
                View Projects <span className={s.arrow}>↓</span>
              </Link>
              <Link to="/contact" className={s.secondaryBtn}>
                Contact Me
              </Link>
            </div>

            <div className={s.stack}>
              <span className={s.stackLabel}>
                Some of the tech stacks that i've worked with in my projects
              </span>
              <div className={s.stackIcons}>
                <SiReact
                  size={32}
                  color="#61DAFB"
                  title="React"
                  className={s.stackIcon}
                />
                <SiTypescript
                  size={32}
                  color="#3178C6"
                  title="TypeScript"
                  className={s.stackIcon}
                />
                <SiJavascript
                  size={32}
                  color="#F7DF1E"
                  title="JavaScript"
                  className={s.stackIcon}
                />
                <SiGatsby
                  size={32}
                  color="#663399"
                  title="Gatsby"
                  className={s.stackIcon}
                />
                <SiVuedotjs
                  size={32}
                  color="#4FC08D"
                  title="Vue.js"
                  className={s.stackIcon}
                />
                <SiContentful
                  size={32}
                  color="#2478CC"
                  title="Contentful"
                  className={s.stackIcon}
                />
                <SiGraphql
                  size={32}
                  color="#E10098"
                  title="GraphQL"
                  className={s.stackIcon}
                />
                <SiSass
                  size={32}
                  color="#CC6699"
                  title="SCSS"
                  className={s.stackIcon}
                />
                <SiBootstrap
                  size={32}
                  color="#7952B3"
                  title="Bootstrap"
                  className={s.stackIcon}
                />
                <SiFigma
                  size={32}
                  color="#F24E1E"
                  title="Figma"
                  className={s.stackIcon}
                />
                <SiExpress
                  size={32}
                  color="#000000"
                  title="Express"
                  className={s.stackIcon2}
                />
                <SiPostgresql
                  size={32}
                  color="#4169E1"
                  title="PostgreSQL"
                  className={s.stackIcon}
                />
                <SiGit
                  size={32}
                  color="#F05032"
                  title="Git"
                  className={s.stackIcon}
                />
                <SiVite
                  size={32}
                  color="#646CFF"
                  title="Vite"
                  className={s.stackIcon}
                />
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
