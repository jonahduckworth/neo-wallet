import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://Neo-wallet-env.eba-edn2qvng.us-east-2.elasticbeanstalk.com'
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
