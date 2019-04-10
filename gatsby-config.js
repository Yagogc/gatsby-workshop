const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Gatsby Workshop',
    description: 'An amazing workshop by Wes Bos',
    author: 'Yago Gonzalez',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
};
