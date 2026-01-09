import * as React from "react";
import { graphql, PageProps, Link } from "gatsby";
import Layout from "../components/Layout/Layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

type Data = {
  allContentfulProject: {
    nodes: Array<{
      title: string;
      slug: string;
      description?: string | null;
      image?: any;
    }>;
  };
};

export default function ProjectsPage({ data }: PageProps<Data>) {
  const projects = data.allContentfulProject.nodes;

  return (
    <Layout>
      <section
        style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 1rem" }}
      >
        <h1>Projects</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          {projects.map((p) => {
            const img = p.image ? getImage(p.image) : null;

            return (
              <article key={p.slug}>
                {img && (
                  <GatsbyImage
                    image={img}
                    alt={p.title}
                    style={{ borderRadius: 8 }}
                  />
                )}

                <h2 style={{ marginTop: "1rem" }}>{p.title}</h2>

                {p.description && <p>{p.description}</p>}

                <Link to={`/projects/${p.slug}`}>View project →</Link>
              </article>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

export const query = graphql`
  query ProjectsPageQuery {
    allContentfulProject(sort: { createdAt: DESC }) {
      nodes {
        title
        slug
        description
        image {
          gatsbyImageData(
            width: 800
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  }
`;
