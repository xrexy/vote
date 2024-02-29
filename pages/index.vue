<template>
  <div>
    <div
      v-for="server in servers"
      :key="server.title"
    >
      <NuxtLink :to="{ name: 'server-id', params: { id: server.id } }">
        {{ server.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const servers = useServers()
</script>
