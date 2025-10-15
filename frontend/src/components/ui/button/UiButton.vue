<template>
  <button
    :type="type"
    :class="cn(
      'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      variantClasses
    )"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

type ButtonVariant = 'default' | 'outline' | 'ghost';

type ButtonProps = {
  variant?: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
};

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  type: 'button'
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'outline':
      return 'border border-primary/50 bg-transparent text-primary hover:bg-primary/10';
    case 'ghost':
      return 'bg-transparent text-foreground hover:bg-primary/10';
    default:
      return 'bg-primary text-primary-foreground hover:bg-primary/90';
  }
});

const type = computed(() => props.type);
</script>
