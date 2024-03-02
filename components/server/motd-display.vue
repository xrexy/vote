<template>
  <div
    v-if="query"
    class="font-mono border border-border rounded-md text-xs p-2"
  >
    <div
      v-for="line, k in query.motd.html"
      :key="k"
      class="tracking-wider whitespace-pre"
    >
      <span v-html="line" />
    </div>
  </div>
  <Skeleton
    v-else
    class="font-mono border border-border bg-black rounded-md text-sm p-1.5 h-[6ch]"
  />
</template>

<script setup lang="ts">
defineProps<{ query: ServerQuery | null }>()
</script>
