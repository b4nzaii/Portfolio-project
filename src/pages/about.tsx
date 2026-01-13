import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout/Layout";
import PageContent from "../components/PageContent/PageContent";
import SEO from "../components/SEO";
type Data = {
  contentfulPage: {
    title: string;
    lead?: string | null;
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
    <>
      <SEO
        title="Måns Henriksson -Frontend Developer"
        description="Frontend developer passionate about creating modern and accessible web experiences."
        pathname="/"
      />
      <Layout>
        <PageContent
          title={page.title}
          lead={page.lead ?? null}
          body={page.body}
          image={page.image}
        />
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

export const Head = ({ data }: PageProps<Data>) => {
  const page = data.contentfulPage;
  return (
    <>
      <title>{page?.title ?? "About"}</title>
      <meta name="description" content={page?.lead ?? ""} />
    </>
  );
};
