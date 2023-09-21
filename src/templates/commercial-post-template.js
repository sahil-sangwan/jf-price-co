import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

import CommercialSidebar from "../components/layout/commercialSidebar"
// import Seo from "../components/seo"

const DefaultCommercialTemplate = ({ data: { wpPost }, pageContext }) => {
  const { categories, content, title, tags } = wpPost;
  return (
    <CommercialSidebar>
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

    </CommercialSidebar>
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