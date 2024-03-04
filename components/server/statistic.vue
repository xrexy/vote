<template>
  <div class="w-full group flex items-center justify-between font-mono">
    <div class="flex items-center gap-2">
      <Icon
        :name="icon"
        size="1rem"
      />
      <p>{{ label }}</p>
    </div>
    <div :class="cn('mx-1 h-px flex-1 transition duration-300 bg-neutral-400/20 group-hover:bg-emerald-500/60')" />
    <p class="text-emerald-200 text-sm">
      {{ value }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ icon: string, label: string, value: string | number }>();
</script>
