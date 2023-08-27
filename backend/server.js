const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const connectDB = require('./db/connectDB');

const PORT = process.env.PORT || 8080;

const server = new ApolloServer({ typeDefs, resolvers });
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

connectDB();