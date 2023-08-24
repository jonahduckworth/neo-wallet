import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

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

interface AddTransactionProps {
  userId: string;
}

const AddTransaction: React.FC<AddTransactionProps> = ({ userId }) => {
  const [formData, setFormData] = useState({ description: '', amount: '', type: 'expense' });
  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    update(cache, { data: { addTransaction } }) {
      const existingTransactions: any = cache.readQuery({
        query: GET_TRANSACTIONS,
        variables: { userId }
      });
  
      cache.writeQuery({
        query: GET_TRANSACTIONS,
        variables: { userId },
        data: {
          transactions: [...existingTransactions.transactions, addTransaction]
        }
      });
    },
    onError(err) {
      console.error("Error while adding transaction:", err);
    }
});  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const date = new Date();

    const { data } = await addTransaction({ 
      variables: { ...formData, userId, amount: parseFloat(formData.amount), date: date.toISOString() } 
    });

    if (data) {
      setFormData({ description: '', amount: '', type: 'expense' });
    }
  };

  return (
    <div>
      <h4>Add Transaction</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description: </label>
          <input 
            type="text" 
            value={formData.description} 
            onChange={e => setFormData({ ...formData, description: e.target.value })} 
          />
        </div>
        <div>
          <label>Amount: </label>
          <input 
            type="number" 
            value={formData.amount} 
            onChange={e => setFormData({ ...formData, amount: e.target.value })} 
          />
        </div>
        <div>
          <label>Type: </label>
          <select 
            value={formData.type} 
            onChange={e => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTransaction;
