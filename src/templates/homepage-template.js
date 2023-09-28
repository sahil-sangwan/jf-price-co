import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout/layout';
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';

// The template component queries each page by ID,
// which is passed from context field in createPage
// in gatsby-node.js
const HomepageTemplate = ({ data: { wpPage } }) => {
    const {title, content} = wpPage;
    return (
        <Layout>
            <StaticImage objectPosition="center" src="../images/JFPSlideShowLargeEquipr.jpg" alt="JF Price" layout="fullWidth" />
            <div style={{background:'#FFFFFF', padding: '0% 2%'}} dangerouslySetInnerHTML={{ __html: content }}></div>
        </Layout>
    );
};

export const query = graphql`
    query($id: String!) {
        wpPage(id: {eq: $id}) {
            title
            content
        }
    }
`;

export default HomepageTemplate;