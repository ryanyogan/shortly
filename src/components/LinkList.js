import React, { Component } from 'react';
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

const LINKS_SUBSCRIPTION = gql`
  subscription NewLinkCreatedSubscription {
    Link(filter: { mutation_in: [CREATED] }) {
      node {
        id
        url
        description
        hash
      }
    }
  }
`;

class LinkList extends Component {
  componentDidMount() {
    this.props.allLinksQuery.subscribeToMore({
      document: LINKS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newLinks = [...prev.allLinks, subscriptionData.data.Link.node];
        const result = {
          ...prev,
          allLinks: newLinks
        };
        return result;
      }
    });
  }

  render() {
    const { allLinksQuery: { loading, error, allLinks } } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error Occurred</div>;
    }

    if (allLinks.length === 0) {
      return <div>No Links...</div>;
    }

    return (
      <div>{allLinks.map(link => <Link key={link.id} link={link} />)}</div>
    );
  }
}

export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' })(LinkList);
