<template>
  <section class="space-y-6">
    <header class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-semibold">Pusat Sinkronisasi</h1>
        <p class="text-sm text-muted-foreground">
          Kelola transaksi yang tersimpan lokal dan pantau status sinkronisasi dengan server Laravel.
        </p>
      </div>
      <RouterLink to="/">
        <UiButton variant="outline">Kembali</UiButton>
      </RouterLink>
    </header>

    <div class="grid gap-6 md:grid-cols-2">
      <UiCard>
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-lg font-semibold">Status Koneksi</span>
            <span class="flex items-center gap-2 text-sm" :class="online ? 'text-emerald-400' : 'text-red-400'">
              <span class="h-2 w-2 rounded-full" :class="online ? 'bg-emerald-400' : 'bg-red-500'"></span>
              {{ online ? 'Online' : 'Offline' }}
            </span>
          </div>
        </template>
        <p class="text-sm text-muted-foreground">
          Transaksi akan otomatis dikirim ketika koneksi tersedia. Anda juga dapat memaksakan sinkronisasi manual.
        </p>
        <template #footer>
          <UiButton :disabled="!online || isSyncing" @click="syncTransactions">
            {{ isSyncing ? 'Sinkronisasi...' : 'Sinkronkan Sekarang' }}
          </UiButton>
        </template>
      </UiCard>

      <UiCard>
        <template #header>
          <h2 class="text-lg font-semibold">Ringkasan Pending</h2>
        </template>
        <ul class="space-y-2 text-sm text-muted-foreground">
          <li>
            <span class="font-medium text-foreground">{{ pendingTransactions.length }}</span>
            transaksi menunggu sinkronisasi
          </li>
          <li>Total nominal: Rp {{ formatCurrency(totalAmount) }}</li>
          <li>Terakhir sinkron: {{ lastSynced ? formatDate(lastSynced) : 'Belum pernah' }}</li>
        </ul>
      </UiCard>
    </div>

    <UiCard>
      <template #header>
        <h2 class="text-lg font-semibold">Log Sinkronisasi</h2>
      </template>
      <ul class="space-y-2 text-xs text-muted-foreground" v-if="syncLog.length">
        <li v-for="(entry, index) in syncLog" :key="index">
          <span class="font-medium text-foreground">{{ entry.status }}</span>
          — {{ entry.message }} ({{ formatDate(entry.timestamp) }})
        </li>
      </ul>
      <p v-else class="text-sm text-muted-foreground">Belum ada aktivitas sinkronisasi.</p>
    </UiCard>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useNetwork } from '@vueuse/core';
import { useTransactionQueue } from '@/composables/useTransactionQueue';
import { useTransactionStore } from '@/store/transactionStore';
import UiButton from '@/components/ui/button/UiButton.vue';
import UiCard from '@/components/ui/card/UiCard.vue';

const { isOnline: online } = useNetwork();
const { syncTransactions, isSyncing, syncLog } = useTransactionQueue();
const transactionStore = useTransactionStore();
const { pendingTransactions, lastSyncedAt } = storeToRefs(transactionStore);

const totalAmount = computed(() =>
  pendingTransactions.value.reduce((total, transaction) => total + transaction.amount, 0)
);

const lastSynced = computed(() => lastSyncedAt.value);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('id-ID', { style: 'decimal', maximumFractionDigits: 2 }).format(value);

const formatDate = (iso: string | undefined) =>
  iso ? new Date(iso).toLocaleString('id-ID') : '';
</script>
