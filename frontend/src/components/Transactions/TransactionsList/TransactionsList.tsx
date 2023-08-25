import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TRANSACTIONS, DELETE_TRANSACTION } from '../graphql/transactions';
import { TransactionProps, Transaction } from '../Types';

import { 
  Typography, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  IconButton 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TransactionsList: React.FC<TransactionProps> = ({ userId }) => {
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
    try {
      await deleteTransaction({ variables: { id: transactionId } });
    } catch (error) {
      console.error("Error deleting the transaction:", error);
      // Optionally, show an error to the user.
    }
  };  

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Transactions
      </Typography>
      
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.transactions.map((transaction: Transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.description}</TableCell>
              <TableCell align="right">${transaction.amount}</TableCell>
              <TableCell align="right">{transaction.type}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleDelete(transaction.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default TransactionsList;
