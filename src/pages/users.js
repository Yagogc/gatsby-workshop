import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Layout from '../components/Layout';

const Users = ({ data }) => {
  const users = data.allUser.nodes;

  return (
    <Layout>
      <h3>Hello Users</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`user/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Users;

export const query = graphql`
  query {
    allUser {
      nodes {
        id
        name
        phone
      }
    }
  }
`;
