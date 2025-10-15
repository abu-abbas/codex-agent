<template>
  <section class="space-y-6">
    <header class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-semibold">{{ t('sync.title') }}</h1>
        <p class="text-sm text-muted-foreground">{{ t('sync.subtitle') }}</p>
      </div>
      <RouterLink to="/">
        <UiButton variant="outline">{{ t('sync.back') }}</UiButton>
      </RouterLink>
    </header>

    <div class="grid gap-6 md:grid-cols-2">
      <UiCard>
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-lg font-semibold">{{ t('sync.connectionStatus') }}</span>
            <span class="flex items-center gap-2 text-sm" :class="online ? 'text-emerald-400' : 'text-red-400'">
              <span class="h-2 w-2 rounded-full" :class="online ? 'bg-emerald-400' : 'bg-red-500'"></span>
              {{ online ? t('sync.online') : t('sync.offline') }}
            </span>
          </div>
        </template>
        <p class="text-sm text-muted-foreground">{{ t('sync.description') }}</p>
        <template #footer>
          <UiButton :disabled="!online || isSyncing" @click="syncTransactions">
            {{ isSyncing ? t('sync.syncing') : t('sync.syncNow') }}
          </UiButton>
        </template>
      </UiCard>

      <UiCard>
        <template #header>
          <h2 class="text-lg font-semibold">{{ t('sync.summary') }}</h2>
        </template>
        <ul class="space-y-2 text-sm text-muted-foreground">
          <li>
            <span class="font-medium text-foreground">{{ pendingTransactions.length }}</span>
            {{ t('sync.pendingCount') }}
          </li>
          <li>{{ t('sync.totalAmount') }}: {{ formatCurrency(totalAmount) }}</li>
          <li>{{ t('sync.lastSynced') }}: {{ lastSynced ? formatDate(lastSynced) : t('sync.never') }}</li>
        </ul>
      </UiCard>
    </div>

    <UiCard>
      <template #header>
        <h2 class="text-lg font-semibold">{{ t('sync.logTitle') }}</h2>
      </template>
      <ul class="space-y-2 text-xs text-muted-foreground" v-if="syncLog.length">
        <li v-for="(entry, index) in syncLog" :key="index">
          <span class="font-medium text-foreground">{{ t(`queue.status.${entry.status}`) }}</span>
          — {{ entry.message }} ({{ formatDate(entry.timestamp) }})
        </li>
      </ul>
      <p v-else class="text-sm text-muted-foreground">{{ t('sync.logEmpty') }}</p>
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
import { useI18n } from 'vue-i18n';

const { isOnline: online } = useNetwork();
const { syncTransactions, isSyncing, syncLog } = useTransactionQueue();
const transactionStore = useTransactionStore();
const { pendingTransactions, lastSyncedAt } = storeToRefs(transactionStore);
const { t } = useI18n();

const totalAmount = computed(() =>
  pendingTransactions.value.reduce((total, transaction) => total + transaction.amount, 0)
);

const lastSynced = computed(() => lastSyncedAt.value);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat(t('formatting.locale'), {
    style: 'currency',
    currency: t('formatting.currency'),
    maximumFractionDigits: 2
  }).format(value);

const formatDate = (iso: string | undefined) =>
  iso ? new Date(iso).toLocaleString(t('formatting.datetime')) : '';
</script>
