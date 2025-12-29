import * as dotenv from "dotenv"
import { GatsbyConfig } from "gatsby"
import * as path from "path"

dotenv.config({ path: path.resolve(process.cwd(), ".env.development") })

const config: GatsbyConfig = {
  siteMetadata: {
    title: `My Gatsby Site`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sass",
  ],
}

export default config
