import React from 'react';
import { TransactionFormProps } from '../Types';

const TransactionForm: React.FC<TransactionFormProps> = ({ formData, onSubmit, onInputChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="description">Description: </label>
        <input 
          id="description"
          type="text" 
          value={formData.description} 
          onChange={onInputChange} 
          name="description"
        />
      </div>
      <div>
        <label htmlFor="amount">Amount: </label>
        <input 
          id="amount"
          type="number" 
          value={formData.amount} 
          onChange={onInputChange} 
          name="amount"
        />
      </div>
      <div>
        <label htmlFor="type">Type: </label>
        <select 
          id="type"
          value={formData.type} 
          onChange={onInputChange}
          name="type"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <button type="submit">Add</button>
    </form>
  );
}

export default TransactionForm;
