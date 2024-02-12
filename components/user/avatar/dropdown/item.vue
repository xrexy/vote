<template>
  <NuxtLink
    :to="$props.to"
    class="group"
  >
    <DropdownMenuItem :class="cn('group-hover:text-emerald-400', $props.class)">
      <Icon
        class="mr-2 group-hover:rotate-6 transition-transform"
        size="1.15rem"
        :name="$props.icon"
      />
      <span>{{ $props.text }}</span>
    </DropdownMenuItem>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

defineProps<{
  to: RouteLocationRaw;
  icon: string;
  text: string;
  class?: string;
}>();
</script>

