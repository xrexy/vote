<template>
  <Badge variant="emerald">
    {{ tagLookup[tag] }}
  </Badge>
</template>

<script setup lang="ts">
type ValidTag = Server['tags'][number]

defineProps<{ tag: ValidTag, class?: string }>()
</script>
