import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';

const CREATE_SHORT_LINK_MUTATION = gql`
  mutation CreateLinkMutation($url: String!, $description: String!) {
    createLink(url: $url, description: $description) {
      id
    }
  }
`;

class CreateShortLink extends Component {
  state = {
    description: '',
    url: ''
  };

  _createShortLink = async () => {
    await this.props.createShortLinkMutation({
      variables: {
        ...this.state
      }
    });
  };

  render() {
    return (
      <div>
        <input
          id="url"
          type="text"
          value={this.state.url}
          placeholder="Link URL"
          onChange={e => this.setState({ url: e.target.value })}
        />
        <input
          id="description"
          type="text"
          value={this.state.description}
          placeholder="Link description"
          onChange={e => this.setState({ description: e.target.value })}
        />
        <button onClick={() => this._createShortLink()}>Create</button>
      </div>
    );
  }
}

export default graphql(CREATE_SHORT_LINK_MUTATION, {
  name: 'createShortLinkMutation'
})(withApollo(CreateShortLink));
