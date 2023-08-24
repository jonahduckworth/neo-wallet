import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
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

const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id)
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
  
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = async (transactionId: string) => {
    await deleteTransaction({ variables: { id: transactionId } });
    // Refresh transactions list after deleting
    window.location.reload();
  };

  return (
    <div>
      <h3>Transactions</h3>
      <ul>
        {data.transactions.map((transaction: Transaction) => (
          <li key={transaction.id}>
            {transaction.description} - ${transaction.amount} - {transaction.type}
            <button onClick={() => handleDelete(transaction.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionsList;
