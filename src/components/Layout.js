import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import Nav from './Nav';
import Footer from './Footer';
import 'normalize.css';
import './styles/global.css';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteData {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `);
  const { title, author } = data.site.siteMetadata;

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
      <Footer author={author} />
    </>
  );
};

export default Layout;
