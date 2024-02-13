<template>
  <div class="flex flex-col justify-start pl-5">
    <div
      class="grid place-items-center absolute -left-6 p-2.5 w-11 h-11 bg-background rounded-full transition-all border border-border group hover:border-emerald-400/75"
    >
      <Icon
        :name="$props.icon"
        class="w-full h-full text-muted-foreground/50 transition-all group-hover:text-emerald-400/75 "
      />
    </div>

    <h1 class="font-bold">
      {{ $props.title }}
    </h1>

    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    icon: string;
}>();
</script>
