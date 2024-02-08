<template>
  <main>
    <Sonner
      position="bottom-center"
      theme="dark"
      rich-colors
      :duration="2500"
    />
    
    <AppHeader />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>

<script setup lang="ts">
useHead({ htmlAttrs: { class: 'dark' }})
</script>

<style>
::-moz-selection {
  @apply bg-emerald-700/25 text-emerald-400;
}

::selection {
  @apply bg-emerald-700/25 text-emerald-400;
}
</style>