import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout/Layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import SEO from "../components/SEO";
type Data = {
  contentfulProject: {
    title: string;
    body?: {
      raw: string;
    } | null;
    gallery?: Array<{
      gatsbyImageData: any;
      description?: string | null;
    }> | null;
  };
};

export default function ProjectTemplate({ data }: PageProps<Data>) {
  const project = data.contentfulProject;

  if (!project) return null;

  const options: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_, children) => <p>{children}</p>,
    },
  };

  return (
    <>
      <SEO
        title="Måns Henriksson -Frontend Developer"
        description="Frontend developer passionate about creating modern and accessible web experiences."
        pathname="/"
      />
      <Layout>
        <article
          style={{ maxWidth: 960, margin: "0 auto", padding: "4rem 1rem" }}
        >
          <h1>{project.title}</h1>

          {/* BODY / DESCRIPTION Parse*/}
          {project.body?.raw && (
            <section style={{ marginTop: "2rem" }}>
              {documentToReactComponents(JSON.parse(project.body.raw), options)}
            </section>
          )}

          {/* Hämtar contentfuls gallery Source/data*/}
          {project.gallery?.length ? (
            <section
              style={{
                marginTop: "3rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {project.gallery.map((img, i) => {
                const image = getImage(img);
                return image ? (
                  <div
                    key={i}
                    style={{
                      position: "relative",
                      aspectRatio: "16 / 9",
                      overflow: "hidden",
                      borderRadius: "12px",
                      backgroundColor: "rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <GatsbyImage
                      image={image}
                      alt={img.description ?? `Project image ${i + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      imgStyle={{
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                    />
                  </div>
                ) : null;
              })}
            </section>
          ) : null}
        </article>
      </Layout>
    </>
  );
}

export const query = graphql`
  query ProjectBySlug($slug: String!) {
    contentfulProject(slug: { eq: $slug }) {
      title
      body {
        raw
      }
      gallery {
        gatsbyImageData(
          width: 1600
          height: 900
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
          layout: CONSTRAINED
          resizingBehavior: PAD
        )
        description
      }
    }
  }
`;
