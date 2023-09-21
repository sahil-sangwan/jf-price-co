import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { NavButton } from "../pageNavButton";
import styled from 'styled-components';
import { createGlobalStyle } from "styled-components";
import { AiOutlineInstagram } from "@react-icons/all-files/ai/AiOutlineInstagram";
import { AiOutlineYoutube } from "@react-icons/all-files/ai/AiOutlineYoutube";
import { AiOutlineFacebook } from "@react-icons/all-files/ai/AiOutlineFacebook";

const Layout = ({ isHomePage, children }) => {
  const {
    wp: {
      generalSettings: { title },
    },
    allWpMenu: {
      nodes: {
        0: {
          // why 0 here?
          menuItems: { nodes },
        },
      },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      wp {
        generalSettings {
          title
          description
        }
      }
      allWpMenu {
        nodes {
          menuItems {
            nodes {
              label
              path
            }
          }
        }
      }
    }
  `);

  return (
    <React.Fragment>
      <GlobalStyle />
      <MainNav>
        {nodes.map((item, index) => {
          const { label, path } = item;
          return (
            <NavButton href={path}><p>{label}</p></NavButton>
          );

        })}
      </MainNav>
      <main>{children}</main>
      <hr></hr>
      <footer style={{ display: 'flex', justifyContent: 'space-between', color: 'white', paddingBottom:'1vh', fontSize:'12px', alignContent:'center'}}>
        <div>
          © {new Date().getFullYear()}, Site by DuVoisin Design
        </div>
        <div>
          <a href='https://www.instagram.com/plymouthquarriesllc/' style={{color:'white'}}><AiOutlineInstagram style={{ height: '5vh', width: '5vw' }} /></a>
          <a href='https://www.youtube.com/results?search_query=Plymouth+quarries' style={{color:'white'}}><AiOutlineYoutube style={{ height: '5vh', width: '5vw' }} /></a>
          <a href='https://www.facebook.com/PlymouthQuarries/' style={{color:'white'}}><AiOutlineFacebook style={{ height: '5vh', width: '5vw' }} /></a>
        </div>
      </footer>
    </React.Fragment>
  );
};

const MainNav = styled.div`
  margin:auto;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`

const GlobalStyle = createGlobalStyle`
  h1 {
    font-family: Garamond, serif;
  }
  h2 {
    font-family: Garamond, serif;
  }
  h3 {
    font-family: Garamond, serif;
  }
  h4 {
    font-family: Garamond, serif;
  }
  h5 {
    font-family: Garamond, serif;
  }
  a {
    text-decoration: none;
    color: white;
  }
  body {
    font-size:16px;
    font-family:arial;
    font-style:normal;
    font-weight:400;
    color:white;
    background: #7D7C7A;
    position:center;
    display:flex;
    flex-flow:column nowrap;
    align-items:center;
    @media(min-width: 1200px) {
      width:auto;
      margin:0 22dvw;
    }
    @media(max-width: 992) {
      width:auto;
      margin:0 6dvw;
    }
  }
  GatsbyImage {
    max-width:50vw;
    layout: constrained;
  }
`

export default Layout;
