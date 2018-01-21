import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Link from './Link';

const ALL_LINKS_QUERY = gql`
  query AllLinksQuery {
    allLinks {
      id
      url
      description
      hash
    }
  }
`;

const LinkList = ({ allLinksQuery: { loading, error, allLinks } }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error Occurred</div>;
  }

  if (allLinks.length === 0) {
    return <div>No Links...</div>;
  }

  return <div>{allLinks.map(link => <Link key={link.id} link={link} />)}</div>;
};

export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' })(LinkList);
