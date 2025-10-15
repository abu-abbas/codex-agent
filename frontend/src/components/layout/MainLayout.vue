<template>
  <div class="min-h-screen bg-background text-foreground">
    <nav class="border-b border-muted bg-background/80 backdrop-blur">
      <div
        class="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between"
      >
        <div class="flex items-center gap-3">
          <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-lg font-bold text-primary">
            POS
          </span>
          <div>
            <h1 class="text-lg font-semibold">{{ t('app.name') }}</h1>
            <p class="text-xs text-muted-foreground">{{ t('app.tagline') }}</p>
          </div>
        </div>
        <div class="flex flex-col gap-3 md:items-end">
          <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground md:justify-end">
            <span class="flex items-center gap-2">
              <span class="h-2 w-2 rounded-full" :class="online ? 'bg-emerald-400' : 'bg-red-500'"></span>
              {{ online ? t('nav.online') : t('nav.offline') }}
            </span>
            <RouterLink to="/" class="hover:text-foreground">{{ t('nav.dashboard') }}</RouterLink>
            <RouterLink to="/sync" class="hover:text-foreground">{{ t('nav.sync') }}</RouterLink>
          </div>
          <div class="flex flex-wrap items-center gap-3 text-xs text-muted-foreground md:justify-end">
            <label class="flex items-center gap-2">
              <span class="hidden md:inline">{{ t('nav.theme') }}</span>
              <select
                v-model="themeMode"
                class="rounded-md border border-muted bg-background px-2 py-1 text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option v-for="option in themeOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </label>
            <label class="flex items-center gap-2">
              <span class="hidden md:inline">{{ t('nav.accent') }}</span>
              <select
                v-model="accent"
                class="rounded-md border border-muted bg-background px-2 py-1 text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option v-for="option in accentOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </label>
            <label class="flex items-center gap-2">
              <span class="hidden md:inline">{{ t('nav.language') }}</span>
              <select
                v-model="locale"
                class="rounded-md border border-muted bg-background px-2 py-1 text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option v-for="option in languageOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </nav>
    <main class="mx-auto max-w-5xl px-6 py-10">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useNetwork } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { ACCENT_PRESETS, useSettingsStore } from '@/store/settingsStore';

const { t } = useI18n();
const { isOnline: online } = useNetwork();

const settingsStore = useSettingsStore();
const { themeMode, accent, locale } = storeToRefs(settingsStore);

const themeOptions = computed(() => [
  { value: 'system', label: t('nav.system') },
  { value: 'light', label: t('nav.light') },
  { value: 'dark', label: t('nav.dark') }
]);

const accentOptions = computed(() =>
  (Object.keys(ACCENT_PRESETS) as Array<keyof typeof ACCENT_PRESETS>).map((value) => ({
    value,
    label: t(`accent.${value}`)
  }))
);

const languageOptions = computed(() => [
  { value: 'id', label: t('nav.indonesian') },
  { value: 'en', label: t('nav.english') }
]);
</script>
