import React from 'react';
import { TransactionFormProps } from '../Types';

const TransactionForm: React.FC<TransactionFormProps> = ({ formData, onSubmit, onInputChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Description: </label>
        <input 
          type="text" 
          value={formData.description} 
          onChange={onInputChange} 
          name="description"
        />
      </div>
      <div>
        <label>Amount: </label>
        <input 
          type="number" 
          value={formData.amount} 
          onChange={onInputChange} 
          name="amount"
        />
      </div>
      <div>
        <label>Type: </label>
        <select 
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
