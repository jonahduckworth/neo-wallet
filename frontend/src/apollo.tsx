import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:8080'  
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        transactions: {
          merge(existing = [], incoming: any[]) {
            return [...incoming];
          }
        }
      }
    }
  }
});

const client: ApolloClient<any> = new ApolloClient({
  link: httpLink,
  cache: cache
});

export default client;
