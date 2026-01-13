import type { GatsbyNode } from "gatsby";
import path from "path";

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    const { createTypes } = actions;

    createTypes(`
      type ContentfulPage implements Node {
        lead: String
      }
    `);
  };

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;

  const result = await graphql<{
    allContentfulProject: { nodes: { slug: string }[] };
  }>(`
    query CreateProjectPages {
      allContentfulProject {
        nodes {
          slug
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const items = result.data?.allContentfulProject.nodes ?? [];

  items.forEach((item) => {
    createPage({
      path: `/projects/${item.slug}`,
      component: path.resolve("src/templates/project-template.tsx"),
      context: { slug: item.slug },
    });
  });
};
