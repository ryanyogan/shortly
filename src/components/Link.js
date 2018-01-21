import React, { Component } from 'react';
import { string, shape } from 'prop-types';

class Link extends Component {
  static propTypes = {
    link: shape({
      id: string,
      url: string,
      hash: string,
      description: string
    })
  };

  render() {
    return (
      <div>
        <div>
          {this.props.link.description} ({this.props.link.url} -{' '}
          {this.props.link.hash})
        </div>
      </div>
    );
  }
}

export default Link;
