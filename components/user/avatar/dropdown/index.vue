<template>
  <DropdownMenu v-if="user">
    <DropdownMenuTrigger>
      <UserAvatar :user="user" />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="min-w-36 mt-2">
      <!--Account-->
      <DropdownMenuLabel>
        <p class="font-bold">
          {{ user.username }}
        </p>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />

      <template v-if="!user.uuid">
        <UserAvatarDropdownItem
          class="border border-red-400 bg-red-500/25 font-semibold focus:bg-red-600/25 group-hover:text-red-100 px-4"
          to="/settings?tab=minecraft"
          icon="mingcute:user-warning-fill"
          text="Account not linked"
        />
        <DropdownMenuSeparator />
      </template>

      <DropdownMenuGroup class="flex flex-col gap-1">
        <UserAvatarDropdownItem
          to="/"
          icon="mdi:user"
          text="Profile"
        />
        <UserAvatarDropdownItem
          to="/studio"
          icon="material-symbols:cloud"
          text="Studio"
        />
        <UserAvatarDropdownItem
          to="/settings"
          icon="material-symbols:settings"
          text="Settings"
        />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <button
        class="w-full h-full group"
        @click="logout"
      >
        <DropdownMenuItem class="group-hover:text-red-400">
          <Icon
            class="mr-2 group-hover:rotate-6 transition-transform"
            size="1.15rem"
            name="ic:round-logout"
          />
          <span>Log Out</span>
        </DropdownMenuItem>
      </button>
    </DropdownMenuContent>
  </DropdownMenu>
  <NuxtLink
    v-else
    to="/login"
    class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none border border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/25 font-black rounded-md h-full px-4"
  >
    <Icon
      name="material-symbols:person"
      width="20"
      height="20"
    />
    Sign In
  </NuxtLink>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";

const user = useUser();

function logout() {
  $toastFetch("/api/auth/logout", {
    method: "POST",
    onResponse({ response }) {
      if (response.ok) {
        user.value = null;
        toast.success("Logged out");
      }
    },
  });
}
</script>

