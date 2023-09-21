// gatsby-node.js

// Fix for Error: Type with name "WpBlockAttributesObject" does not exists
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type WpBlockAttributesObject {
      foobar: String
    },
    type WpJetpackCookieConsentBlockAttributes {
      foobar: String
    },
    type WpJetpackCookieConsentBlock {
      foobar: String
    },
    type WpCoreFreeformBlockAttributes {
      foobar: String,
    }
    type WpCoreFreeformBlock {
      foobar: String,
    }
  `;
  createTypes(typeDefs);
};

exports.createPages = async ({ graphql, actions }) => {

  const wpPages = await getPages(graphql);
  const wpPosts = await getPosts(graphql);

  wpPages.map((page) => {
    // TODO: identify parent page (instead of slug) to load correct template for product landing pages
    const { isFrontPage, id, uri, slug } = page;

    if (isFrontPage) {
      return actions.createPage({
        path: uri,
        component: require.resolve("./src/templates/homepage-template.js"),
        context: {
          id: id,
        },
      });
    } else {
      switch (slug) {
        case 'products':
          return actions.createPage({
            path: uri,
            component: require.resolve("./src/templates/product-page-template.js"),
            context: {
              id: id,
            },
          });
        case 'fireplaces':
          return actions.createPage({
            path: uri,
            component: require.resolve("./src/templates/fireplace-landing-template.js"),
            context: {
              id: id,
            }
          })
        case 'commercial':
          return actions.createPage({
            path: uri,
            component: require.resolve("./src/templates/commercial-template.js"),
            context: {
              id: id,
            }
          })
        case 'services':
          return actions.createPage({
            path: uri,
            component: require.resolve("./src/templates/service-template.js"),
            context: {
              id: id,
            }
          })
        default:
          return actions.createPage({
            path: uri,
            component: require.resolve("./src/templates/default-page-template.js"),
            context: {
              id: id,
            },
          });
      }
    }
  });

  const slugs = ['products', 'commercial', 'services']
  wpPosts.map((post) => {
    const { id, slug, categories } = post;
    const postCategories = categories.nodes
    const isExclusive = postCategories.some(category => {
      const { categorySlug, name } = category;
      return categorySlug === 'exclusives'
    })
    const onlyPageCategories = postCategories.filter(category => {
      const { categorySlug, name } = category;
      return slugs.includes(categorySlug)
    })
    onlyPageCategories.map(category => {
      const { categorySlug, name } = category
      if (categorySlug === 'products' && isExclusive) {
        return actions.createPage({
          path: `/${categorySlug}/${slug}`,
          component: require.resolve(`./src/templates/exclusive-post-template.js`),
          context: {
            id: id,
          }
        })
      } else {
        return actions.createPage({
          path: `/${categorySlug}/${slug}`,
          component: require.resolve(`./src/templates/${categorySlug}-post-template.js`),
          context: {
            id: id,
          }
        })
      }
    })
  });
};

async function getPages(graphql) {
  const pageQuery = await graphql(`
    query {
      allWpPage {
        nodes {
          isFrontPage
          id
          uri
          slug
        }
      }
    }
  `);
  return pageQuery.data.allWpPage.nodes;
}

async function getPosts(graphql) {
  const postQuery = await graphql(`
    query {
      allWpPost {
        nodes {
          id
          slug
          categories {
            nodes {
              categorySlug: slug
              name
            }
          }
        }
      }
    }
  `);
  return postQuery.data.allWpPost.nodes;
}
