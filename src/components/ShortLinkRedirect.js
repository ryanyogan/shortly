import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { string } from 'prop-types';

const GET_FULL_LINK_QUERY = gql`
  query GetFullLinkQuery($hash: String!) {
    allLinks(filter: { hash: $hash }) {
      url
    }
  }
`;

const ShortLinkRedirect = ({
  hash,
  getFullLinkQuery: { loading, error, allLinks }
}) => {
  if (error) {
    return <div>Error Occurred</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!allLinks || allLinks.length === 0) {
    return <div>No redirect found for '{hash}'</div>;
  }

  window.location = allLinks[0].url;
  return null;
};

ShortLinkRedirect.propTypes = {
  hash: string
};

export default graphql(GET_FULL_LINK_QUERY, {
  name: 'getFullLinkQuery',
  options: ({ hash }) => ({ variables: { hash } })
})(ShortLinkRedirect);
