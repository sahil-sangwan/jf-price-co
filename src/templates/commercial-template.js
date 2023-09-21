import React from 'react';
import { graphql } from 'gatsby';
import CommercialSidebar from '../components/layout/commercialSidebar';

const CommercialPageTemplate = ({ data: { wpPage } }) => {
    const {title, content} = wpPage;
    return (
        <CommercialSidebar>
            {/* <h1 style={{textAlign:'center'}}>{title}</h1> */}
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </CommercialSidebar>
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

export default CommercialPageTemplate;