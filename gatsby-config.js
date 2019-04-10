const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Gatsby Workshop',
    description: 'An amazing workshop by Wes Bos',
    author: 'Yago Gonzalez',
  },
  plugins: [
    // Source the iamges from the filesystem
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    // Source the MARKDOWN /tips folder
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tip`,
        path: `${__dirname}/src/tips`,
      },
    },
    // Use transformer-sharp to resize and compress the images
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // Source the MARKDOWN files and images
    {
      resolve: 'gatsby-mdx',
      options: {
        root: __dirname,
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 500,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
  ],
};
