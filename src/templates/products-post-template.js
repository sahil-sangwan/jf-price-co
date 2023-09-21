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

import ProductSidebar from "../components/layout/productSidebar"
// import Seo from "../components/seo"

const DefaultProductTemplate = ({ data: { wpPost } }) => {
  const { categories, content, title, tags } = wpPost;
  return (
    <ProductSidebar>
      {/* <Seo title={post.title} description={post.excerpt} /> */}

        {!!content && (
          <section style={{ maxWidth:'100%'}}>{parse(content)}</section>
        )}

    </ProductSidebar>
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


export default DefaultProductTemplate