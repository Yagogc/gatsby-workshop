import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../Layout';

const Tip = ({ data, pageContext }) => {
  const { previous, next } = pageContext;
  const { user } = data;
  return (
    <Layout>
      <div>
        <h2>User: {user.username}</h2>
        <p>Name: {user.name}</p>
        <p>Phone: {user.phone}</p>
      </div>
      {previous && (
        <div>
          <Link to={`user/${previous}`}>Previous user</Link>
        </div>
      )}
      {next && (
        <div>
          <Link to={`user/${next}`}>Next user</Link>
        </div>
      )}
    </Layout>
  );
};

export default Tip;

export const query = graphql`
  query($id: String!) {
    user(id: { eq: $id }) {
      id
      name
      username
      phone
    }
  }
`;
