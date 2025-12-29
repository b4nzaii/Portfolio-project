import * as React from "react";
import Layout from "../components/Layout/Layout";
import Hero from "../components/Hero/Hero";
import FeaturedProjects from "../components/FeaturedProjects/FeaturedProjects";

export default function IndexPage() {
  return (
    <Layout>
      <Hero />
      <FeaturedProjects />
    </Layout>
  );
}
