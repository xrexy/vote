<template>
  <main>
    <NuxtLoadingIndicator :color="`repeating-linear-gradient(to right,${emerald['500']} 0%,#34cdfe 50%,#0047e1 100%)`" />
    <Sonner position="bottom-center" theme="dark" rich-colors :duration="2500" />

    <AppHeader />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>

<script setup lang="ts">
import { emerald } from 'tailwindcss/colors'

useHead({ htmlAttrs: { class: 'dark' } })
</script>

<style>
::-moz-selection {
  @apply bg-emerald-700/25 text-emerald-400;
}

::selection {
  @apply bg-emerald-700/25 text-emerald-400;
}
</style>
