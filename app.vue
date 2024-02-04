<template>
  <main>
    <Sonner
      position="bottom-center"
      theme="dark"
      rich-colors
    />

    <AppHeader />

    <NuxtPage />
    
    <!-- <AppFooter /> -->
  </main>
</template>

<script setup lang="ts">
useHead({ htmlAttrs: { class: 'dark' }})
</script>