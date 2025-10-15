import { defineStore } from 'pinia';
import type { Transaction } from '@/types/transaction';

type TransactionState = {
  transactions: Transaction[];
  lastSyncedAt?: string;
};

export const useTransactionStore = defineStore('transaction', {
  state: (): TransactionState => ({
    transactions: [],
    lastSyncedAt: undefined
  }),
  getters: {
    pendingTransactions: (state) => state.transactions.filter((transaction) => transaction.status === 'pending')
  },
  actions: {
    addTransaction(transaction: Transaction) {
      this.transactions.unshift(transaction);
    },
    markSynced(ids: string[]) {
      this.transactions = this.transactions.map((transaction) =>
        ids.includes(transaction.id)
          ? { ...transaction, status: 'synced' }
          : transaction
      );
      this.lastSyncedAt = new Date().toISOString();
    },
    markFailed(ids: string[]) {
      this.transactions = this.transactions.map((transaction) =>
        ids.includes(transaction.id)
          ? { ...transaction, status: 'failed' }
          : transaction
      );
    },
    reset() {
      this.transactions = [];
      this.lastSyncedAt = undefined;
    }
  },
  persist: {
    storage: localStorage,
    paths: ['transactions', 'lastSyncedAt']
  }
});
