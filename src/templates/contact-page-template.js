import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout/layout';

// The template component queries each page by ID,
// which is passed from context field in createPage
// in gatsby-node.js
const ContactPageTemplate = ({ data: { wpPage } }) => {
    const {title, content} = wpPage;

    return (
        <Layout>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2956.2581272077628!2d-70.92606148412881!3d42.18754805397024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3620de33d7ac5%3A0xc315bae924ee5315!2s611+Pleasant+St%2C+East+Weymouth%2C+MA+02189!5e0!3m2!1sen!2sus!4v1530380988381" width="100%" height="250vh" frameborder="0" style={{border:'0'}} allowfullscreen=""></iframe>
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

export default ContactPageTemplate;