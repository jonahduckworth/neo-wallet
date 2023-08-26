import React, { useState } from 'react';
import AddTransaction from './Transactions/AddTransaction';
import TransactionsList from './Transactions/TransactionsList';

import { Card, CardContent, Typography, Box, Modal } from '@mui/material';

interface DashboardProps {
  userId: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
  const [openAddTransaction, setOpenAddTransaction] = useState(false);
  const [openTransactionList, setOpenTransactionList] = useState(false);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Welcome to Neo Wallet
      </Typography>
      
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Card variant="outlined" style={{ width: '48%', cursor: 'pointer' }} onClick={() => setOpenAddTransaction(true)}>
          <CardContent>
            <Typography variant="h6">Add Transaction</Typography>
          </CardContent>
        </Card>
        
        <Card variant="outlined" style={{ width: '48%', cursor: 'pointer' }} onClick={() => setOpenTransactionList(true)}>
          <CardContent>
            <Typography variant="h6">View Transactions</Typography>
          </CardContent>
        </Card>
      </Box>

      <Modal 
        open={openAddTransaction} 
        onClose={() => setOpenAddTransaction(false)}
        aria-labelledby="add-transaction-modal"
      >
        <Box 
          style={{ 
            outline: 'none', 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            width: '80vw',
            maxWidth: '500px'
          }}
        >
          <Card>
            <CardContent>
              <AddTransaction userId={userId} />
            </CardContent>
          </Card>
        </Box>
      </Modal>
      
      <Modal 
        open={openTransactionList} 
        onClose={() => setOpenTransactionList(false)}
        aria-labelledby="transaction-list-modal"
      >
        <Box 
          style={{ 
            outline: 'none', 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            width: '90vw',
            maxWidth: '800px'
          }}
        >
          <Card>
            <CardContent>
              <TransactionsList userId={userId} />
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </Box>
  );
}

export default Dashboard;
