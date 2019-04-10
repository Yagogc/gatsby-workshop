import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Layout from '../components/Layout';

const Tips = ({ data }) => {
  const tips = data.allMdx.nodes;

  return (
    <Layout>
      <h3>Hello tips</h3>
      <ul>
        {tips.map(tip => (
          <li key={tip.id}>
            <Link to={`tip/${tip.frontmatter.slug}`}>
              {tip.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Tips;

export const query = graphql`
  query {
    allMdx {
      nodes {
        id
        frontmatter {
          slug
          title
        }
      }
    }
  }
`;
