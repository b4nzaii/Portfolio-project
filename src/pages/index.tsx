import * as React from "react";
import Layout from "../components/Layout/Layout";
import Hero from "../components/Hero/Hero";
import FeaturedProjects from "../components/FeaturedProjects/FeaturedProjects";
import SEO from "../components/SEO";

export default function IndexPage() {
  return (
    <>
      <SEO
        title="Måns Henriksson -Frontend Developer"
        description="Frontend developer passionate about creating modern and accessible web experiences."
        pathname="/"
      />
      <Layout>
        <Hero />
        <FeaturedProjects />
      </Layout>
    </>
  );
}
