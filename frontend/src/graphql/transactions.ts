import gql from 'graphql-tag';

export const GET_TRANSACTIONS = gql`
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

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id)
  }
`;
