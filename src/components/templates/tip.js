import React from 'react';
import { MDXRenderer } from 'gatsby-mdx';
import { graphql, Link } from 'gatsby';
import Layout from '../Layout';

const Tip = props => {
  console.log(props);
  const { data, pageContext } = props;
  const { previous, next } = pageContext;

  const tip = data.mdx;
  return (
    <Layout>
      <div>
        <h2>{tip.frontmatter.title}</h2>
        <MDXRenderer>{tip.code.body}</MDXRenderer>
      </div>
      {previous && <Link to={`tip/${previous}`}>Previous tip</Link>}
      {next && <Link to={`tip/${next}`}>Next tip</Link>}
    </Layout>
  );
};

export default Tip;

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      code {
        body
        scope
      }
      frontmatter {
        slug
        title
      }
    }
  }
`;
