<script setup lang="ts">
defineProps<
  {
    text: string;
  } & Partial<{
    class: string;
    textClass: string;
    separatorClass: string;
  }>
>();
</script>

<template>
  <div :class="cn('flex items-center gap-2 w-full', $props.class)">
    <Separator :class="cn('flex-1', $props.separatorClass)" />
    <p :class="cn('text-border brightness-150 pb-[4px]', $props.textClass)">
      {{ $props.text }}
    </p>
    <Separator :class="cn('flex-1', $props.separatorClass)" />
  </div>
</template>

