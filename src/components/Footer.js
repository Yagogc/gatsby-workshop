import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const Footer = ({ author }) => (
  // const data = useStaticQuery(graphql`
  //   query SiteData {
  //     site {
  //       siteMetadata {
  //         author
  //       }
  //     }
  //   }
  // `);

  // const { author } = data.site.siteMetadata;
  <footer>
    <div>{author} 💜</div>
  </footer>
);
export default Footer;
