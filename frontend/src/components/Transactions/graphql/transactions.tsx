import gql from 'graphql-tag';

const GET_TRANSACTIONS = gql`
  query GetTransactions($userId: ID!) {
    transactions(userId: $userId) {
      id
      description
      amount
      date
      type
    }
  }
`;

const ADD_TRANSACTION = gql`
  mutation AddTransaction($description: String!, $amount: Float!, $date: String!, $type: String!, $userId: ID!) {
    addTransaction(description: $description, amount: $amount, date: $date, type: $type, userId: $userId) {
      id
      description
      amount
      date
      type
    }
  }
`;

const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id)
  }
`;

export { GET_TRANSACTIONS, ADD_TRANSACTION, DELETE_TRANSACTION };