import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TRANSACTIONS, DELETE_TRANSACTION } from '../graphql/transactions';

const TransactionsList: React.FC<TransactionsListProps> = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: { userId }
  });

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    update(cache, { data: { deleteTransaction } }) {
      const existingTransactions: any = cache.readQuery({
        query: GET_TRANSACTIONS,
        variables: { userId }
      });
  
      const newTransactions = existingTransactions.transactions.filter(
        (transaction: Transaction) => transaction.id !== deleteTransaction
      );
  
      cache.writeQuery({
        query: GET_TRANSACTIONS,
        variables: { userId },
        data: { transactions: newTransactions }
      });
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const handleDelete = async (transactionId: string) => {
    await deleteTransaction({ variables: { id: transactionId } });
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
