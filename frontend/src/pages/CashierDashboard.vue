<template>
  <section class="space-y-6">
    <header class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-semibold">{{ t('dashboard.title') }}</h1>
        <p class="text-sm text-muted-foreground">{{ t('dashboard.subtitle') }}</p>
      </div>
      <RouterLink to="/sync">
        <UiButton variant="outline">{{ t('dashboard.syncCenter') }}</UiButton>
      </RouterLink>
    </header>

    <UiCard>
      <template #header>
        <h2 class="text-xl font-semibold">{{ t('dashboard.newTransaction') }}</h2>
      </template>
      <form class="grid gap-4 md:grid-cols-2" @submit.prevent="handleSubmit">
        <UiInput v-model="form.customerName" :label="t('dashboard.customerName')" required />
        <UiInput
          v-model.number="form.amount"
          :label="t('dashboard.amount')"
          type="number"
          min="0"
          step="0.01"
          required
        />
        <UiTextarea
          v-model="form.notes"
          :label="t('dashboard.notes')"
          class="md:col-span-2"
          :placeholder="t('dashboard.notesPlaceholder')"
        />
        <div class="md:col-span-2 flex justify-end gap-2">
          <UiButton type="button" variant="outline" @click="resetForm">{{ t('dashboard.clear') }}</UiButton>
          <UiButton type="submit">{{ t('dashboard.save') }}</UiButton>
        </div>
      </form>
    </UiCard>

    <UiCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">{{ t('dashboard.localHistory') }}</h2>
          <span class="text-xs text-muted-foreground">
            {{ t('dashboard.pendingCount', { count: pendingTransactions.length }) }}
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
            <span class="text-sm text-accent">{{ formatCurrency(transaction.amount) }}</span>
          </div>
          <p class="text-xs text-muted-foreground">{{ transaction.notes || t('dashboard.noNotes') }}</p>
          <p class="text-xs text-muted-foreground">
            {{ t('dashboard.createdAt') }}: {{ formatDate(transaction.createdAt) }}
          </p>
        </li>
      </ul>
      <p v-else class="text-sm text-muted-foreground">{{ t('dashboard.empty') }}</p>
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
import { useI18n } from 'vue-i18n';

const { enqueueTransaction } = useTransactionQueue();
const transactionStore = useTransactionStore();
const { pendingTransactions } = storeToRefs(transactionStore);
const { t } = useI18n();

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
  new Intl.NumberFormat(t('formatting.locale'), {
    style: 'currency',
    currency: t('formatting.currency'),
    maximumFractionDigits: 2
  }).format(value);

const formatDate = (iso: string) => new Date(iso).toLocaleString(t('formatting.datetime'));
</script>
