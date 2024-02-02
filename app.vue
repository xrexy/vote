<template>
  <body>
    <AppHeader />

    <main>
      <Sonner
        position="bottom-center"
        theme="dark"
        rich-colors
      />

      <NuxtPage />
    </main>
    <AppFooter />
  </body>
</template>

<script setup lang="ts">
useHead({ htmlAttrs: { class: 'dark' }})
</script>