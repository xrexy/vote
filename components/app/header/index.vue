<template>
  <header>
    <div class="relative border-b border-border flex flex-row justify-between items-center rounded-md px-8 py-4">
      <AppLogo />
      <AppHeaderSearch class="absolute left-[50%] -translate-x-[50%]" />
      <div class="flex ">
        <AppHeaderActions />
        <UserAvatar />
      </div>
    </div>
  </header>
</template>
