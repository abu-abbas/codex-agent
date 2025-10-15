export interface TransactionPayload {
  customerName: string;
  amount: number;
  notes?: string;
}

export interface Transaction extends TransactionPayload {
  id: string;
  createdAt: string;
  status: 'pending' | 'synced' | 'failed';
}
