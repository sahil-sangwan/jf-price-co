import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"

import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

import ServiceSidebar from "../components/layout/serviceSidebar"
// import Seo from "../components/seo"

const DefaultCommercialTemplate = ({ data: { wpPost }, pageContext }) => {
  const { categories, content, title, tags } = wpPost;
  return (
    <ServiceSidebar>
      {/* <Seo title={post.title} description={post.excerpt} /> */}

      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >

        {!!content && (
          <section itemProp="articleBody">{parse(content)}</section>
        )}

        <hr />

      </article>

    </ServiceSidebar>
  )
}

export const query = graphql`
query($id: String!){ 
  wpPost(id: {eq: $id}) {
    categories {
        nodes {
            slug
        }
    }
    content
    title
    tags {
        nodes {
            slug
        }
    }
  }
}`;

export default DefaultCommercialTemplate