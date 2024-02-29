<template>
  <div
    v-if="!isValid"
  >
    kys
  </div>
  <div v-else>
    <p>Some Server Here</p>
    {{ serverId }}
  </div>
</template>

<script setup lang="ts">
const servers = useServers()
const route = useRoute('server-id');
const serverId = route.params.id;

const isValid = ref(false);
onBeforeMount(() => {
  isValid.value = servers.value.some((server) => server.id === serverId);
})

</script>
