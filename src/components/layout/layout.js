import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { NavButton } from "../pageNavButton";
import styled from 'styled-components';
import { createGlobalStyle } from "styled-components";

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
      <footer style={{ display: 'flex', justifyContent: 'center', color: 'white', paddingTop:'5vh', paddingBottom:'1vh', fontSize:'12px', alignContent:'center'}}>
        <div>
          © {new Date().getFullYear()} JF Price. Designed by DuvoisinDesign

        </div>
      </footer>
    </React.Fragment>
  );
};

const MainNav = styled.div`
  margin:0px 0px 5vh 0px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  background: black;
  color: white;
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
    color: black;
  }
  table {
    border-collapse: collapse;
    border: 0;
  }
  td {
    vertical-align:top;
    padding:2dvw;
    border-collapse: collapse;
    border: 0;
  }
  tr {
    border-collapse: collapse;
    border: 0;
  }
  body {
    font-size:16px;
    font-family:arial;
    font-style:normal;
    font-weight:400;
    background: #998674;
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
