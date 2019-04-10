import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import Nav from './Nav';
// ...
const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteData {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  const { title } = data.site.siteMetadata;

  return (
    <>
      <Helmet>
        <title>{data.site.siteMetadata.title}</title>
        <meta charSet="utf-8" />
      </Helmet>
      <div>
        <h1>{title}</h1>
        <Nav />
        {children}
      </div>
    </>
  );
};

export default Layout;
