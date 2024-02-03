<template>
  <Avatar v-if="isAuthenticated">
    <AvatarImage src="https://avatars.githubusercontent.com/u/140431" />
  </Avatar>
  <NuxtLink
    v-else
    to="/login"
    class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none border border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/25 font-black rounded-md h-full px-4"
  >
    <Icon
      name="material-symbols:person"
      width="20"
      height="20"
    />
    Sign In
  </NuxtLink>
</template>

<script setup lang="ts">
const isAuthenticated = ref(false);
</script>