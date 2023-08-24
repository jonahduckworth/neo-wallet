import React from 'react';
import { useQuery } from '@apollo/client';
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

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: string;
}

interface TransactionsListProps {
  userId: string;
}

const TransactionsList: React.FC<TransactionsListProps> = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: { userId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h3>Transactions</h3>
      <ul>
        {data.transactions.map((transaction: Transaction) => (
          <li key={transaction.id}>
            {transaction.description} - ${transaction.amount} - {transaction.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionsList;
