import React from 'react';
import AddTransaction from './AddTransaction';
import TransactionsList from './TransactionsList';

interface DashboardProps {
  userId: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
  return (
    <div>
      <h2>Welcome to Neo Wallet</h2>
      <AddTransaction userId={userId} />
      <TransactionsList userId={userId} />
    </div>
  );
}

export default Dashboard;
