import React from 'react';
import AddTransaction from './AddTransaction';
import TransactionsList from './TransactionsList';

interface DashboardProps {
  userId: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
  // Function to refresh transactions after adding a new one
  const handleTransactionAdded = () => {
    // For simplicity, we're just reloading the page. In a real-world scenario, 
    // you might want to update the Apollo Client cache or refetch the transactions query.
    window.location.reload();
  };

  return (
    <div>
      <h2>Welcome to Neo Wallet</h2>
      <AddTransaction userId={userId} onAdded={handleTransactionAdded} />
      <TransactionsList userId={userId} />
    </div>
  );
}

export default Dashboard;
