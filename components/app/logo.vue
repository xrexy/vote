<template>
  <Icon v-bind="props" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<
    Partial<{
      class: string;
      width: number;
      height: number;
      name: string;
    }>
  >(),
  {
    width: 36,
    height: 36,
    name: "clarity:block-solid",
  }
);
</script>
