<template>
  <section class="space-y-6">
    <header class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-semibold">Kasir Offline/Online</h1>
        <p class="text-sm text-muted-foreground">
          Kelola transaksi secara realtime atau simpan ketika offline lalu sinkronkan ketika koneksi kembali.
        </p>
      </div>
      <RouterLink to="/sync">
        <UiButton variant="outline">Pusat Sinkronisasi</UiButton>
      </RouterLink>
    </header>

    <UiCard>
      <template #header>
        <h2 class="text-xl font-semibold">Transaksi Baru</h2>
      </template>
      <form class="grid gap-4 md:grid-cols-2" @submit.prevent="handleSubmit">
        <UiInput v-model="form.customerName" label="Nama Pelanggan" required />
        <UiInput v-model.number="form.amount" label="Total Pembayaran" type="number" min="0" step="0.01" required />
        <UiTextarea v-model="form.notes" label="Catatan" class="md:col-span-2" placeholder="opsional" />
        <div class="md:col-span-2 flex justify-end gap-2">
          <UiButton type="button" variant="outline" @click="resetForm">Bersihkan</UiButton>
          <UiButton type="submit">Simpan</UiButton>
        </div>
      </form>
    </UiCard>

    <UiCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">Riwayat Transaksi Lokal</h2>
          <span class="text-xs text-muted-foreground">
            {{ pendingTransactions.length }} transaksi antri sinkronisasi
          </span>
        </div>
      </template>
      <ul class="space-y-3" v-if="pendingTransactions.length">
        <li
          v-for="transaction in pendingTransactions"
          :key="transaction.id"
          class="rounded-lg border border-muted bg-background/40 p-3"
        >
          <div class="flex items-center justify-between">
            <p class="font-medium">{{ transaction.customerName }}</p>
            <span class="text-sm text-accent">Rp {{ formatCurrency(transaction.amount) }}</span>
          </div>
          <p class="text-xs text-muted-foreground">{{ transaction.notes || 'Tanpa catatan' }}</p>
          <p class="text-xs text-muted-foreground">{{ formatDate(transaction.createdAt) }}</p>
        </li>
      </ul>
      <p v-else class="text-sm text-muted-foreground">Belum ada transaksi offline.</p>
    </UiCard>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useTransactionQueue } from '@/composables/useTransactionQueue';
import { useTransactionStore } from '@/store/transactionStore';
import UiCard from '@/components/ui/card/UiCard.vue';
import UiButton from '@/components/ui/button/UiButton.vue';
import UiInput from '@/components/ui/form/UiInput.vue';
import UiTextarea from '@/components/ui/form/UiTextarea.vue';

const { enqueueTransaction } = useTransactionQueue();
const transactionStore = useTransactionStore();
const { pendingTransactions } = storeToRefs(transactionStore);

const form = reactive({
  customerName: '',
  amount: 0,
  notes: ''
});

const handleSubmit = async () => {
  await enqueueTransaction({
    customerName: form.customerName,
    amount: Number(form.amount),
    notes: form.notes
  });
  resetForm();
};

const resetForm = () => {
  form.customerName = '';
  form.amount = 0;
  form.notes = '';
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('id-ID', { style: 'decimal', maximumFractionDigits: 2 }).format(value);

const formatDate = (iso: string) => new Date(iso).toLocaleString('id-ID');
</script>
