<template>
  <header
    class="relative border-b border-border flex flex-col md:flex-row justify-between items-center h-header md:py-4 md:px-8 z-10"
  >
    <div class="block md:hidden">
      <ClientOnly>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button>
              KURA MI QNKO
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ClientOnly>
    </div>

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

    <AppHeaderSearch
      class="opacity-[0.001] pointer-events-none md:pointer-events-auto md:opacity-100 absolute left-[50%] -translate-x-[50%]"
    />

    <UserAvatarDropdown />
  </header>
</template>

<script setup lang="ts">
const route = useRoute();
const isStudio = computed(() => route.path.startsWith("/studio"));
</script>

