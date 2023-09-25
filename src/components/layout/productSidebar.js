import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from 'styled-components';
import Layout from "./layout";
import { AiOutlineMail } from "@react-icons/all-files/ai/AiOutlineMail";
// import { TbMap2 } from "@react-icons/all-files/tb";
import { AiOutlineFacebook } from "@react-icons/all-files/ai/AiOutlineFacebook";

const ProductSidebar = ({ children }) => {
  const {
    productPostList: {
      posts: {
        nodes
      },
    },
  } = useStaticQuery(graphql`
    query {
      productPostList: wpCategory(name: {eq: "Products"}) {
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
            <h2>(781) 335-1021</h2>
            <span style={{whiteSpace: "nowrap"}}>
                        <p><AiOutlineMail style={{whiteSpace: "nowrap"}}/> <a href="mailto:Info@JFPriceCo.com">email</a></p>
                    </span> 
                    <span>
                        <p><AiOutlineFacebook/> <a href='https://www.facebook.com/JFPriceCompany'>Join Us</a></p>
                    </span>
            {/* <TbMap2/> */}
            <br></br>
            <h2>Products</h2>
            {nodes.map(post => {
              const { title, slug } = post;
              return (
                <NavButton href={`/products/${slug}`}><p>{title}</p></NavButton>
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
  background: #FFFFFF;
  padding:1vh 3vw;
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
padding:0.25vh 0.5vw;
&:hover {
    color:#ECC570;
}
`

export default ProductSidebar;