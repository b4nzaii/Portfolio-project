import * as React from "react";
import { graphql, PageProps, Link } from "gatsby";
import Fuse from "fuse.js";
import Layout from "../components/Layout/Layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

type Project = {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  image?: any;
};

type Data = {
  allContentfulProject: {
    nodes: Project[];
  };
};

export default function ProjectsPage({ data }: PageProps<Data>) {
  const projects = data.allContentfulProject.nodes;
  const [q, setQ] = React.useState("");

  const fuse = React.useMemo(
    () =>
      new Fuse(projects, {
        keys: ["title", "description"],
        threshold: 0.4,
      }),
    [projects]
  );

  const results =
    q.trim() === "" ? projects : fuse.search(q).map((r) => r.item);

  return (
    <Layout>
      <section
        style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 1rem" }}
      >
        <h1>Projects</h1>

        {/* Search */}
        <input
          type="search"
          placeholder="Search projects…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 14px",
            margin: "1.5rem 0 2.5rem",
            fontSize: 16,
          }}
        />

        {results.length === 0 ? <p>No projects found.</p> : null}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {results.map((p) => {
            const img = p.image ? getImage(p.image) : null;

            return (
              <article key={p.id}>
                {img && (
                  <GatsbyImage
                    image={img}
                    alt={p.title}
                    style={{ borderRadius: 8 }}
                  />
                )}

                <h2 style={{ marginTop: "1rem" }}>{p.title}</h2>

                {p.description ? <p>{p.description}</p> : null}

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
        id
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
