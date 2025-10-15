import { ref, watch, type WatchStopHandle } from 'vue';
import { v4 as uuid } from 'uuid';
import { set, del, entries, createStore } from 'idb-keyval';
import { useNetwork } from '@vueuse/core';
import { useTransactionStore } from '@/store/transactionStore';
import type { TransactionPayload } from '@/types/transaction';
import { apiClient } from '@/api/client';

type SyncLog = Array<{
  status: 'success' | 'error' | 'info';
  message: string;
  timestamp: string;
}>;

const QUEUE_DB = createStore('transactions-queue', 'queue');
const isSyncing = ref(false);
const syncLog = ref<SyncLog>([]);
let isHydrated = false;
let stopWatcher: WatchStopHandle | null = null;

export function useTransactionQueue() {
  const { isOnline } = useNetwork();
  const transactionStore = useTransactionStore();

  const enqueueTransaction = async (payload: TransactionPayload) => {
    const transaction = {
      id: uuid(),
      createdAt: new Date().toISOString(),
      status: 'pending' as const,
      ...payload
    };

    transactionStore.addTransaction(transaction);
    await set(transaction.id, transaction, QUEUE_DB);

    syncLog.value.unshift({
      status: 'info',
      message: `Transaksi ${transaction.customerName} tersimpan lokal`,
      timestamp: new Date().toISOString()
    });

    if (isOnline.value) {
      await syncTransactions();
    }
  };

  const syncTransactions = async () => {
    const pending = transactionStore.pendingTransactions;
    if (!pending.length) {
      syncLog.value.unshift({
        status: 'info',
        message: 'Tidak ada transaksi untuk sinkronisasi',
        timestamp: new Date().toISOString()
      });
      return;
    }

    isSyncing.value = true;

    const successful: string[] = [];
    const failed: string[] = [];

    for (const transaction of pending) {
      try {
        await apiClient.post('/transactions', transaction);
        await del(transaction.id, QUEUE_DB);
        successful.push(transaction.id);
      } catch (error) {
        failed.push(transaction.id);
        console.error('Failed to sync transaction', error);
      }
    }

    if (successful.length) {
      transactionStore.markSynced(successful);
      syncLog.value.unshift({
        status: 'success',
        message: `${successful.length} transaksi berhasil disinkronkan`,
        timestamp: new Date().toISOString()
      });
    }

    if (failed.length) {
      transactionStore.markFailed(failed);
      syncLog.value.unshift({
        status: 'error',
        message: `${failed.length} transaksi gagal disinkronkan`,
        timestamp: new Date().toISOString()
      });
    }

    isSyncing.value = false;
  };

  const hydrateQueue = async () => {
    if (isHydrated) {
      return;
    }
    const persisted = (await entries(QUEUE_DB)) as Array<[string, TransactionPayload]>;
    persisted.forEach(([id, transaction]) => {
      if (!transactionStore.transactions.find((item) => item.id === id)) {
        transactionStore.addTransaction({
          id,
          createdAt: new Date().toISOString(),
          status: 'pending',
          ...transaction
        });
      }
    });
    isHydrated = true;
  };

  if (!stopWatcher) {
    stopWatcher = watch(
      () => isOnline.value,
      async (online) => {
        if (online) {
          await syncTransactions();
        }
      },
      { immediate: false }
    );
  }

  hydrateQueue();

  return {
    enqueueTransaction,
    syncTransactions,
    isSyncing,
    syncLog
  };
}
