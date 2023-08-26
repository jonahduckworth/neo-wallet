import React from 'react';
import { TransactionFormProps } from '../Types';
import { 
  Box, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button 
} from '@mui/material';

const TransactionForm: React.FC<TransactionFormProps> = ({ formData, onSubmit, onInputChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <Box my={2}>
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          type="text"
          name="description"
          value={formData.description}
          onChange={onInputChange}
          size="small"
        />
      </Box>
      <Box my={2}>
        <TextField
          fullWidth
          label="Amount"
          variant="outlined"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={onInputChange}
          size="small"
        />
      </Box>
      <Box my={2}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            label="Type"
            value={formData.type}
            onChange={onInputChange as any}
            name="type"
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mt={3}>
        <Button fullWidth variant="contained" color="primary" type="submit">
          Add
        </Button>
      </Box>
    </form>
  );
}

export default TransactionForm;
