import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const link = createUploadLink({
  uri: 'http://localhost:5000/graphql',
  headers: { 'Apollo-Require-Preflight': 'true' },
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
