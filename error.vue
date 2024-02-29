<template>
  <NuxtLayout>
    <div class="antialiased px-10 pt-14 text-black justify-center items-center gap-2 dark:text-white h-[calc(100vh-150px)] flex flex-col">
      <div class="flex flex-col justify-center items-center">
        <p class="text-2xl">
          Something went wrong...
        </p>
        <h1 class="text-9xl font-black text-emerald-500 tracking-wider pb-10">
          {{ error?.statusCode }}
        </h1>
      </div>
      <p class="text-muted-foreground text-xl">
        {{ message }}
      </p>
      <NuxtLink
        to="/"
        class="text-lg font-bold flex justify-center items-center gap-[1px] text-emerald-500 hover:underline"
      >
        <Icon
          name="material-symbols:arrow-left"
          size="2rem"
          class="inline-block"
        />
        Go Home
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>

<script setup>
useHead({
  htmlAttrs: { class: 'dark' }
})

const error = useError()
console.log(error)
if(!error) await navigateTo('/')

watch(error, () => console.log)

const message = !error instanceof Error || error.value.statusCode === 500 ? 'Something went wrong' : error.value.message

</script>
