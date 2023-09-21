import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"
import styled from "styled-components"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

import ProductSidebar from "../components/layout/productSidebar"
import { StaticImage } from "gatsby-plugin-image"
// import Seo from "../components/seo"

const DefaultProductTemplate = ({ data: { wpPost } }) => {
  const { categories, content, title, tags } = wpPost;
  return (
    <ProductSidebar>
      {/* <Seo title={post.title} description={post.excerpt} /> */}

        <ExclusiveHeader>
            <StaticImage style={{ maxWidth:'75%'}} src="../images/exclusives.png" alt="Plymouth Quarries Exclusives" />
            <p style={{ margin:'5px'}}>The Exclusives Product line of Plymouth Quarries has been established with premium companies over many years. Our personal relationship with these companies guarantees you the best products and services available. Our exclusive products will add a unique beauty and character to your projects. Stop by our showrooms to see and touch them for yourself.</p>
        </ExclusiveHeader>
        {!!content && (
          <section style={{ maxWidth:'100%'}}>{parse(content)}</section>
        )}

    </ProductSidebar>
  )
}

const ExclusiveHeader = styled.div`
    display:flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: center;
`

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