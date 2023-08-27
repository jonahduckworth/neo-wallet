const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
    transactions(userId: ID!): [Transaction]
  }

  type AuthData {
    userId: ID!
    token: String!
  }

  type Transaction {
    id: ID!
    description: String!
    amount: Float!
    date: String!
    type: String!
}

type Mutation {
    signUp(username: String!, email: String!, password: String!): AuthData!
    logIn(email: String!, password: String!): AuthData!
    addTransaction(userId: ID!, description: String!, amount: Float!, type: String!, date: String!): Transaction
    updateTransaction(id: ID!, description: String, amount: Float, type: String): Transaction
    deleteTransaction(id: ID!): ID
}
`;

module.exports = typeDefs;
