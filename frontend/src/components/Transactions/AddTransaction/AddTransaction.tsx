import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_TRANSACTIONS, ADD_TRANSACTION } from '../graphql/transactions';
import TransactionForm from '../TransactionForm';
import { TransactionProps, TransactionFormData } from '../Types';

const AddTransaction: React.FC<TransactionProps> = ({ userId }) => {
  const [formData, setFormData] = useState<TransactionFormData>({ description: '', amount: '', type: 'expense' });
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
    const amountValue = formData.amount ? parseFloat(formData.amount) : 0;

    const { data } = await addTransaction({ 
      variables: { ...formData, userId, amount: amountValue, date: date.toISOString() } 
    });

    if (data) {
      setFormData({ description: '', amount: '', type: 'expense' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h4>Add Transaction</h4>
      <TransactionForm 
        formData={formData} 
        onSubmit={handleSubmit} 
        onInputChange={handleInputChange} 
      />
    </div>
  );
}

export default AddTransaction;
