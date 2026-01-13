// src/pages/about.tsx
import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout/Layout";
import SEO from "../components/SEO";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import * as s from "./about.module.scss";

type Data = {
  contentfulPage: {
    title: string;
    lead?: string | null;
    body?: { raw: string } | null;
    image?: any;
  } | null;
};

export default function AboutPage({ data, location }: PageProps<Data>) {
  const page = data.contentfulPage;

  if (!page) {
    return (
      <Layout>
        <main className={s.page}>
          <div className={s.container}>
            <h1 className={s.title}>About</h1>
            <p className={s.lead}>Ingen Page hittades</p>
          </div>
        </main>
      </Layout>
    );
  }

  const img = page.image ? getImage(page.image) : null;
  const bodyDoc = page.body?.raw ? JSON.parse(page.body.raw) : null;

  return (
    <>
      <SEO
        title={`${page.title} | Måns Henriksson`}
        description={page.lead ?? "About Måns Henriksson"}
        pathname={location.pathname}
      />
      <Layout>
        <main className={s.page}>
          <div className={s.container}>
            <div className={s.grid}>
              <div className={s.copy}>
                <h1 className={s.title}>{page.title}</h1>
                {page.lead ? <p className={s.lead}>{page.lead}</p> : null}
                {bodyDoc ? (
                  <div className={s.prose}>
                    {documentToReactComponents(bodyDoc)}
                  </div>
                ) : null}
              </div>

              <div className={s.media}>
                {img ? (
                  <GatsbyImage
                    className={s.image}
                    image={img}
                    alt={page.title}
                    imgStyle={{ objectFit: "cover", objectPosition: "center" }}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}

export const query = graphql`
  query AboutPageQuery {
    contentfulPage(slug: { eq: "about" }) {
      title
      lead
      body {
        raw
      }
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
`;
