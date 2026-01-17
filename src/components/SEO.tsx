import * as React from "react";
import { Helmet } from "react-helmet";

type SEOProps = {
  title: string;
  description?: string;
  pathname?: string;
  children?: React.ReactNode;
};

export default function SEO({
  title,
  description,
  pathname,
  children,
}: SEOProps) {
  const siteUrl = "https://portfolioprojectmans.netlify.app/";
  const defaultDescription =
    "Frontend developer passionate about creating modern and accessible web experiences.";
  const seo = {
    title: title,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ""}`,
  };

  return (
    <Helmet>
      <html lang="en" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />

      {children}
    </Helmet>
  );
}
