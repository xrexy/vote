<template>
  <header
    class="relative border-b border-border flex flex-col md:flex-row justify-between items-center h-header md:py-4 md:px-8 z-10"
  >
    <ClientOnly>
      <div class="block md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </ClientOnly>

    <div class="flex flex-col md:flex-row items-center gap-1">
      <NuxtLink to="/">
        <AppLogo />
      </NuxtLink>

      <NuxtLink
        v-if="isStudio"
        class="font-black font-mono text-lg select-none"
        to="/studio"
      >
        Studio
      </NuxtLink>
    </div>

    <AppHeaderSearch class="hidden md: absolute left-[50%] -translate-x-[50%]" />
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
