import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from 'styled-components';
import Layout from "./layout";

const ProductSidebar = ({ children }) => {
  const {
    allWpCategory: {
      productObject
    }
  } = useStaticQuery(graphql`
  query {
    allWpCategory(filter: {parentId: {eq: null}, name: {eq: "Products"}}) {
      productObject: nodes {
        categories: wpChildren {
          listOfCategories: nodes {
            categoryName: name
            availableBrands: wpChildren {
              listOfAvailableBrands: nodes {
                brandName: name
                posts {
                  listOfBrandedProducts: nodes {
                    title
                    slug
                  }
                }
              }
            }
            posts {
              listOfGenericProducts: nodes {
                title
                slug
              }
            }
          }
        }
      }
    }
  }
  `);

  const oldCategoryList = productObject[0].categories.listOfCategories
  const categoryList = [];
  categoryList.push(oldCategoryList.find(categoryObject => {
    return categoryObject.categoryName === 'Exclusives'
  }))
  categoryList.push(oldCategoryList.find(categoryObject => {
    return categoryObject.categoryName === 'Thin Stone'
  }))
  categoryList.push(oldCategoryList.find(categoryObject => {
    return categoryObject.categoryName === 'Cobble Stones'
  }))
  categoryList.push(oldCategoryList.find(categoryObject => {
    return categoryObject.categoryName === 'Concrete Pavers'
  }))
  categoryList.push(oldCategoryList.find(categoryObject => {
    return categoryObject.categoryName === 'Concrete Walls'
  }))
  categoryList.push(oldCategoryList.find(categoryObject => {
    return categoryObject.categoryName === 'Specialty Items'
  }))
  categoryList.push(oldCategoryList.find(categoryObject => {
    return categoryObject.categoryName === 'Mantles and Hearths'
  }))
  categoryList.push(oldCategoryList.find(categoryObject => {
    return categoryObject.categoryName === 'One Of A Kind'
  }))
  categoryList.push(oldCategoryList.find(categoryObject => {
    return categoryObject.categoryName === 'Pools'
  }))
  categoryList.push(oldCategoryList.find(categoryObject => {
    return categoryObject.categoryName === 'Earth Products'
  }))
  categoryList.push(oldCategoryList.find(categoryObject => {
    return categoryObject.categoryName === 'Stone'
  }))
  categoryList.push(oldCategoryList.find(categoryObject => {
    return categoryObject.categoryName === 'Brick'
  }))

  return (
    <Layout>
      <PostWrapper>
        <MainNav>
          {
            categoryList.map(categoryObject => {
              const brandList = categoryObject.availableBrands.listOfAvailableBrands;
              const categoryName = categoryObject.categoryName
              if (brandList.length > 0) {
                return (
                  <React.Fragment>
                    <h2 style={{ color: '#ECC570' }}>{categoryName}</h2>
                    {brandList.map(brandObject => {
                      const name = brandObject.brandName;
                      const posts = brandObject.posts.listOfBrandedProducts;
                      if (posts !== null) {
                        return (
                          <React.Fragment>
                            <h3 style={{ color: '#e6c98c' }}>{name}</h3>
                            {posts.sort((a, b) => {
                              const titleA = a.title.toUpperCase(); // ignore upper and lowercase
                              const titleB = b.title.toUpperCase();
                              if (titleA < titleB) {
                                return -1;
                              }
                              if (titleA > titleB) {
                                return 1;
                              }
                              return 0;
                            }).map(post => {
                              return (<NavButton href={`/products/${post.slug}`}>{post.title}</NavButton>)
                            })}
                          </React.Fragment>
                        )
                      }
                      // TODO add a statement to handle else case (return something)
                    })}
                  </React.Fragment>)
              } else {
                const posts = categoryObject.posts.listOfGenericProducts;

                return (
                  <React.Fragment>
                    <h2 style={{ color: '#ECC570' }}>{categoryObject.categoryName}</h2>
                    {posts.sort((a, b) => {
                      const titleA = a.title.toUpperCase(); // ignore upper and lowercase
                      const titleB = b.title.toUpperCase();
                      if (titleA < titleB) {
                        return -1;
                      }
                      if (titleA > titleB) {
                        return 1;
                      }
                      return 0;
                    }).map(post => {
                      return (<NavButton href={`/products/${post.slug}`}>{post.title}</NavButton>)
                    })}
                  </React.Fragment>
                )
              }
            })
          }
        </MainNav>
        <ContentWrapper>{children}</ContentWrapper>
      </PostWrapper>
    </Layout>
  );
};

const ContentWrapper = styled.main`
  @media(min-width: 1200px) {
    width:50vw;
  }
  @media(min-width: 993px) {
    width:47vw;
  }
  @media(max-width: 992px) {
    width:70vw;
    margin-left: 2px;
    padding:0
  }
  padding-left: 1vw;
`

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

export default ProductSidebar;