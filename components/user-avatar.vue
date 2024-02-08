<template>
  <DropdownMenu v-if="user">
    <DropdownMenuTrigger>
      <Avatar>
        <img
          src="https://crafatar.com/avatars/a414f636-1d55-417e-bae8-4426a0c9f5df"
        >
        <AvatarImage src="https://avatars.githubusercontent.com/u/140431" />
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <!--Account-->
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <NuxtLink to="/profile">
          <DropdownMenuItem>
            <Icon
              class="mr-1"
              size="1rem"
              name="mdi:user"
            />
            <span>Profile</span>
          </DropdownMenuItem>
        </NuxtLink>
        <NuxtLink to="/settings">
          <DropdownMenuItem>
            <Icon
              class="mr-1"
              size="1rem"
              name="material-symbols:settings"
            />
            <span>Settings</span>
          </DropdownMenuItem>
        </NuxtLink>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="logout()">
        <Icon
          name="ic:round-logout"
          class="mr-2 h-4 w-4"
        />
        <span>Log out</span>
      </DropdownMenuItem>
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
import { toast } from 'vue-sonner';

const user = useUser();

const logout = async () => {
  try {
    await $fetch("/api/auth/logout", {
      method: "POST",
    });

    useUser().value = null;

    toast.success("Logged out")
  } catch {
    toast.error("Logout failed, please try again later.");
  }
};
</script>

