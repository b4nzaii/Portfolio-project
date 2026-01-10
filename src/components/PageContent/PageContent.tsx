import * as React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import "./PageContent.scss";

type PageContentProps = {
  title: string;
  lead?: string | null;
  body?: { raw: string } | null;
  image?: any;
};

export default function PageContent({
  title,
  lead,
  body,
  image,
}: PageContentProps) {
  const imageData = image ? getImage(image) : null;

  return (
    <article className="page-content">
      <h1>{title}</h1>
      {imageData && (
        <GatsbyImage image={imageData} alt={image.description || title} />
      )}
      {lead && <p className="lead">{lead}</p>}{" "}
      {body && <div className="body-content">{renderRichText(body)}</div>}
    </article>
  );
}
