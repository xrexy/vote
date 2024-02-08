<template>
  <main>
    <Sonner
      position="bottom-center"
      theme="dark"
      rich-colors
      :duration="2500"
    />

    <AppHeader />

    <NuxtPage />
    
    <!-- <AppFooter /> -->
  </main>
</template>

<script setup lang="ts">
useHead({ htmlAttrs: { class: 'dark' }})
</script>