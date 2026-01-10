import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout/Layout";
import PageContent from "../components/PageContent/PageContent";

type Data = {
  contentfulPage: {
    title: string;
    lead?: {
      lead?: string | null;
    } | null;
    body?: { raw: string } | null;
    image?: any;
  } | null;
};

export default function ContactPage({ data }: PageProps<Data>) {
  const page = data.contentfulPage;

  if (!page) {
    return (
      <Layout>
        <h1>Contact</h1>
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
  query ContactPageQuery {
    contentfulPage(slug: { eq: "contact" }) {
      title
      lead {
        lead # ← ÄNDRAT
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
      <title>{page?.title ?? "Contact"}</title>
      <meta name="description" content={page?.lead?.lead ?? ""} />
    </>
  );
};
