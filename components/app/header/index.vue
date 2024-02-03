<template>
  <header class="relative border-b border-border flex flex-row justify-between items-center rounded-md h-[4.5rem] py-4 px-8">
    <NuxtLink to="/">
      <AppLogo />
    </NuxtLink>

    <AppHeaderSearch class="absolute left-[50%] -translate-x-[50%]" />
    <div class="flex items-center gap-4 h-full">
      <AppHeaderActions />
      <UserAvatar />
    </div>
  </header>
</template>
