<template>
  <label class="space-y-2 text-sm">
    <span class="block text-muted-foreground">{{ label }}</span>
    <textarea
      v-bind="$attrs"
      v-model="model"
      class="min-h-[120px] w-full rounded-lg border border-muted bg-background/70 px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
    ></textarea>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type TextAreaProps = {
  label: string;
  modelValue?: string;
};

const props = withDefaults(defineProps<TextAreaProps>(), {
  modelValue: ''
});

const emit = defineEmits(['update:modelValue']);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});
</script>
