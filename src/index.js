import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  link: new HttpLink(
    'https://api.graph.cool/simple/v1/cjcp56hk51iie0102goru8qza'
  ),
  cache: new InMemoryCache()
});

const withApolloProvider = Comp => (
  <ApolloProvider client={client}>{Comp}</ApolloProvider>
);

ReactDOM.render(withApolloProvider(<App />), document.getElementById('root'));
registerServiceWorker();
