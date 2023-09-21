import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from 'styled-components';
import Layout from "./layout";

const CommercialSidebar = ({ children }) => {
    const {
        commercialPostList: {
            posts: {
                nodes
            },
        },
    } = useStaticQuery(graphql`
    query {
        commercialPostList: wpCategory(name: {eq: "Services"}) {
            posts {
                nodes {
                    title
                    slug
                }
            }
        }
    }
    `);

    return (
        <React.Fragment>
            <Layout>
                <PostWrapper>
                    <MainNav>
                        {nodes.map(post => {
                            const { title, slug } = post;
                            return (
                                <NavButton href={`/services/${slug}`}><p>{title}</p></NavButton>
                            );
                        })}
                    </MainNav>
                    <main style={{ width: '50vw', paddingLeft: '1vw' }}>{children}</main>
                </PostWrapper>
            </Layout>
        </React.Fragment>
    );
}

const PostWrapper = styled.div`
  margin-top:10px;
  display:flex;
  flex-flow: row nowrap;
  align-items: flex-start;
`

const MainNav = styled.div`
  @media(min-width: 1200px) {
    width:15vw;
  }
  @media(min-width: 993px) {
    width:18vw;
  }
  @media(max-width: 992px) {
    width:30vw;
    margin: 0;
    padding: 0;
  }
  // width:15vw;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-content: stretch;
  height:auto;
  align-items: stretch;
`

const NavButton = styled.a`
text-align:left;
text-decoration: none;
color:white;
padding:1vh 0.5vw;
&:hover {
    color:#ECC570;
}
`

export default CommercialSidebar;