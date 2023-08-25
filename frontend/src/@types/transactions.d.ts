interface Transaction {
    id: string;
    description: string;
    amount: number;
    date: string;
    type: string;
  }
  
interface TransactionsListProps {
  userId: string;
}
  