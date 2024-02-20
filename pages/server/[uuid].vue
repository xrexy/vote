<template>
  <div>
    <p>Some Server Here</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
console.log(route.params.uuid)
</script>
