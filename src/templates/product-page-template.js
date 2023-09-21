import React from 'react';
import { graphql } from 'gatsby';
import parse from "html-react-parser"
import ProductSidebar from '../components/layout/productSidebar';
import styled from 'styled-components';

// The template component queries each page by ID,
// which is passed from context field in createPage
// in gatsby-node.js
const ProductPageTemplate = ({ data: { wpPage } }) => {
    const { title, content } = wpPage;
    return (
        <ProductSidebar>
            {!!content && (
                <CustomSection>{parse(content)}</CustomSection>
            )}        
        </ProductSidebar>
    );
};

const CustomSection = styled.section`
  img {
    max-width: 100%;
  }
`

export const query = graphql`
    query($id: String!) {
        wpPage(id: {eq: $id}) {
            title
            content
        }
    }
`;

export default ProductPageTemplate;