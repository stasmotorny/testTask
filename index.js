/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {token} from './src/reactiveVariables';

const httpLink = createHttpLink({
  uri: 'https://api-dev.foodstyles.com/graphql',
});

const interceptRequest = setContext(async (_, context) => {
  console.log('GRAPHQL_TOKEN', token());
  return {
    ...context,
    headers: {
      ...context.headers,
      ...(token() ? {Authorization: `Bearer ${token()}`} : {}),
    },
  };
});

const client = new ApolloClient({
  link: interceptRequest.concat(httpLink),
  cache: new InMemoryCache(),
});

const AppWithWrapper = props => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => AppWithWrapper);
