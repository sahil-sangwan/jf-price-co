import React from 'react';
import { graphql } from 'gatsby';
import ServiceSidebar from '../components/layout/serviceSidebar';

const ServicePageTemplate = ({ data: { wpPage } }) => {
    const {title, content} = wpPage;
    return (
        <ServiceSidebar>
            {/* <h1 style={{textAlign:'center'}}>{title}</h1> */}
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </ServiceSidebar>
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

export default ServicePageTemplate;