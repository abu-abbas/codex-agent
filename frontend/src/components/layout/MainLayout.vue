<template>
  <div class="min-h-screen bg-background text-foreground">
    <nav class="border-b border-muted bg-background/80 backdrop-blur">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div class="flex items-center gap-3">
          <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-lg font-bold text-primary">POS</span>
          <div>
            <h1 class="text-lg font-semibold">Cashier+</h1>
            <p class="text-xs text-muted-foreground">Vue 3 • Laravel 12 • Tailwind 4</p>
          </div>
        </div>
        <div class="flex items-center gap-4 text-sm text-muted-foreground">
          <span class="flex items-center gap-2">
            <span class="h-2 w-2 rounded-full" :class="online ? 'bg-emerald-400' : 'bg-red-500'"></span>
            {{ online ? 'Online' : 'Offline' }}
          </span>
          <RouterLink to="/" class="hover:text-foreground">Dashboard</RouterLink>
          <RouterLink to="/sync" class="hover:text-foreground">Sinkronisasi</RouterLink>
        </div>
      </div>
    </nav>
    <main class="mx-auto max-w-5xl px-6 py-10">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useNetwork } from '@vueuse/core';

const { isOnline: online } = useNetwork();
</script>
