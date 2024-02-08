<template>
  <header
    class="relative border-b border-border flex flex-row justify-between items-center rounded-md h-[4.5rem] py-4 px-8">
    <div class="flex flex-row items-center gap-1">
      <NuxtLink to="/">
        <AppLogo />
      </NuxtLink>

      <NuxtLink v-if="isStudio" class="font-black font-mono text-lg select-none" to="/studio">
        Studio
      </NuxtLink>
    </div>



    <AppHeaderSearch class="absolute left-[50%] -translate-x-[50%]" />
    <div class="flex items-center gap-4 h-full">
      <AppHeaderActions />
      <UserAvatar />
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();
const isStudio = computed(() => route.path.startsWith('/studio'));
</script>
