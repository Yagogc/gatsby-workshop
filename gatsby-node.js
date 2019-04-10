const path = require('path'); // note this is require syntax, not ES6

// 1. Query all our tips
// 2. Loop over each tip
// 3. Create a page for each tip with a template

async function turnMDXIntoPages({ graphql, actions }) {
  // Resolve the component template
  const tipTemplate = path.resolve('./src/components/templates/tip.js');
  // Query the data we need
  const { data } = await graphql(`
    query {
      allMdx(filter: { frontmatter: { type: { eq: "tip" } } }) {
        edges {
          node {
            id
            frontmatter {
              slug
            }
          }
          next {
            frontmatter {
              slug
            }
          }
          previous {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);
  // Loop over the tips
  const tips = data.allMdx.edges;
  tips.forEach(tip => {
    console.log(tip);
    actions.createPage({
      // What is the URL?
      path: `tip/${tip.node.frontmatter.slug}`,
      // What react component should we use to render this page?
      component: tipTemplate,
      // What data should be surfaced to the Component or Query on this page?
      context: {
        id: tip.node.id,
        next: tip.next !== null ? tip.next.frontmatter.slug : null,
        previous: tip.previous !== null ? tip.previous.frontmatter.slug : null,
      },
    });
  });
}

exports.createPages = async function({ graphql, actions }) {
  await turnMDXIntoPages({ graphql, actions });
};
