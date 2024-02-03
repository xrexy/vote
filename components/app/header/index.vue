<template>
  <header>
    <div class="relative border-b border-border flex flex-row justify-between items-center rounded-md px-8 py-4">
      <NuxtLink to="/">
        <AppLogo />
      </NuxtLink>

      <AppHeaderSearch class="absolute left-[50%] -translate-x-[50%]" />
      <div class="flex gap-4">
        <AppHeaderActions />
        <UserAvatar />
      </div>
    </div>
  </header>
</template>
