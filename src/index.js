import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import AppRouter from './AppRouter';
import registerServiceWorker from './registerServiceWorker';

const wsLink = new WebSocketLink({
  uri: 'wss://subscriptions.graph.cool/v1/cjcp56hk51iie0102goru8qza',
  options: {
    reconnect: true
  }
});

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjcp56hk51iie0102goru8qza'
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const withApolloProvider = Comp => (
  <ApolloProvider client={client}>{Comp}</ApolloProvider>
);

ReactDOM.render(
  withApolloProvider(<AppRouter />),
  document.getElementById('root')
);
registerServiceWorker();
