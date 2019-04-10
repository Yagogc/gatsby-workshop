const path = require('path'); // note this is require syntax, not ES6
const axios = require('axios');
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

async function turnUsersIntoPages({ graphql, actions }) {
  // Resolve the component template
  const userTemplate = path.resolve('./src/components/templates/user.js');
  // Query the data we need
  const { data } = await graphql(`
    query {
      allUser {
        edges {
          node {
            id
            name
            username
            phone
          }
          next {
            id
          }
          previous {
            id
          }
        }
      }
    }
  `);

  // Loop over the users

  const users = data.allUser.edges;
  users.forEach(user => {
    actions.createPage({
      // What is the URL?
      path: `user/${user.node.id}`,
      // What react component should we use to render this page?
      component: userTemplate,
      // What data should be surfaced to the Component or Query on this page?
      context: {
        id: user.node.id,
        next: user.next !== null ? user.next.id : null,
        previous: user.previous !== null ? user.previous.id : null,
      },
    });
  });
}

async function sourceUsers({ actions, createNodeId, createContentDigest }) {
  const { createNode } = actions;
  // 1. Fetch the users
  const { data: users } = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  // 2. Loop over Each user
  users.forEach(user => {
    // 3. Create an object for the user
    const node = {
      // Data for the node
      ...user, // take everything from the user,
      // Custom data fields
      // custom ID
      id: createNodeId(`user-${user.id}`),
      parent: null, // there is no parent
      children: [], // no children
      internal: {
        type: `User`, // What should we call it?
        mediaType: 'application/json',
        contentDigest: createContentDigest(user), // helps gatsby know when a node changed
      },
    };
    createNode(node);
  });
}

exports.sourceNodes = async function({
  actions,
  createNodeId,
  createContentDigest,
}) {
  await sourceUsers({ actions, createNodeId, createContentDigest });
};

exports.createPages = async function({ graphql, actions }) {
  await turnMDXIntoPages({ graphql, actions });
  await turnUsersIntoPages({ graphql, actions });
};
