import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const ADD_TRANSACTION = gql`
  mutation AddTransaction($userId: ID!, $description: String!, $amount: Float!, $type: String!) {
    createTransaction(userId: $userId, description: $description, amount: $amount, type: $type) {
      id
    }
  }
`;

interface AddTransactionProps {
  userId: string;
  onAdded: () => void;
}

const AddTransaction: React.FC<AddTransactionProps> = ({ userId, onAdded }) => {
  const [formData, setFormData] = useState({ description: '', amount: '', type: 'expense' });
  const [addTransaction] = useMutation(ADD_TRANSACTION);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { data } = await addTransaction({ 
      variables: { ...formData, userId, amount: parseFloat(formData.amount) } 
    });
    if (data) {
      onAdded();
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
