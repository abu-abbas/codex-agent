<template>
  <article class="rounded-xl border border-muted bg-background/80 shadow-sm">
    <header v-if="$slots.header" class="border-b border-muted p-4">
      <slot name="header" />
    </header>
    <section class="p-4">
      <slot />
    </section>
    <footer v-if="$slots.footer" class="border-t border-muted p-4">
      <slot name="footer" />
    </footer>
  </article>
</template>
