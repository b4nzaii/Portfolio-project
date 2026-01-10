import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout/Layout";
import PageContent from "../components/PageContent/PageContent";

type Data = {
  contentfulPage: {
    title: string;
    lead?: {
      lead?: string | null; // ← ÄNDRAT: lead är nu ett objekt med lead-prop
    } | null;
    body?: { raw: string } | null;
    image?: any;
  } | null;
};

export default function AboutPage({ data }: PageProps<Data>) {
  const page = data.contentfulPage;

  if (!page) {
    return (
      <Layout>
        <h1>About</h1>
        <p>Ingen Page hittades</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageContent
        title={page.title}
        lead={page.lead?.lead ?? null} // ← ÄNDRAT
        body={page.body}
        image={page.image}
      />
    </Layout>
  );
}

export const query = graphql`
  query AboutPageQuery {
    contentfulPage(slug: { eq: "about" }) {
      title
      lead {
        lead
      }
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

export const Head = ({ data }: PageProps<Data>) => {
  const page = data.contentfulPage;
  return (
    <>
      <title>{page?.title ?? "About"}</title>
      <meta name="description" content={page?.lead?.lead ?? ""} />
    </>
  );
};
