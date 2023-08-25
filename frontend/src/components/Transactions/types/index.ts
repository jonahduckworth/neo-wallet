interface Transaction {
    id: string;
    description: string;
    amount: number;
    date: string;
    type: string;
  }
  
interface TransactionProps {
  userId: string;
}

interface TransactionFormProps {
  formData: TransactionFormData;
  onSubmit: (event: React.FormEvent) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

interface TransactionFormData {
  description: string;
  amount: string;
  type: 'income' | 'expense';
}

export type { Transaction, TransactionProps, TransactionFormProps, TransactionFormData };