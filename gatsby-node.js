// gatsby-node.js

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

  const slugs = ['products', 'services']
  wpPosts.map((post) => {
    const { id, slug, categories } = post;
    const postCategories = categories.nodes
    const onlyPageCategories = postCategories.filter(category => {
      const { categorySlug, name } = category;
      return slugs.includes(categorySlug)
    })
    onlyPageCategories.map(category => {
      const { categorySlug, name } = category
      return actions.createPage({
        path: `/${categorySlug}/${slug}`,
        component: require.resolve(`./src/templates/${categorySlug}-post-template.js`),
        context: {
          id: id,
        }
      })
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
