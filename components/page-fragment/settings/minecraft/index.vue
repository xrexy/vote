<script setup lang="ts">
import { toast } from "vue-sonner";
const user = useUser();
const serverIp = "link.votesite.com";

function copyIP() {
  navigator.clipboard.writeText(serverIp);
  toast("Successfully copied IP to clipboard");
}

const value = ref<string[]>([])
const handleComplete = (e: string[]) => alert(e.join(''))


</script>


<template>
  <div v-if="!user" />
  <div
    v-else
    class="h-full pb-8"
  >
    <h1
      v-if="user.uuid"
      class="text-lg font-bold"
    >
      Link Account
    </h1>
    <p
      v-if="user.uuid"
      class="text-emerald-400"
    >
      Account linked to <b>{{ user.username }}</b>
    </p>

    <div
      v-else
      class="h-full flex flex-row border-l-2 relative mt-4"
    >
      <Separator
        orientation="vertical"
        class="rounded-full bg-background/5 mr-2"
      />

      <div class="flex flex-col gap-10">
        <PageFragmentSettingsMinecraftLinkSection
          title="Link Account"
          icon="material-symbols:person-add-rounded"
        >
          <p class="text-muted-foreground">
            This will use and
            <span class="font-semibold text-red-400">LOCK</span>
            your current username
            <span class="font-semibold text-emerald-400">
              {{
                user.username
              }}
            </span>
          </p>
          <div class="inline-flex px-2.5 w-fit items-center mt-2 p-2 border border-border rounded-sm bg-border/25">
            <Icon
              name="uil:exclamation-triangle"
              size="1.5rem"
              class="text-red-400 mr-1.5"
            />
            <p class="text-muted-foreground text-sm">
              If it's doesn't match with your Minecraft one,
              change it from the
              <NuxtLink
                class="underline underline-offset-4 text-emerald-400"
                to="/settings?tab=account"
              >
                Account tab
              </NuxtLink>
            </p>
          </div>
        </PageFragmentSettingsMinecraftLinkSection>

        <PageFragmentSettingsMinecraftLinkSection
          title="Join the Minecraft server"
          icon="solar:server-bold"
        >
          <ul class="ml-4 list-disc text-emerald-400 flex flex-col gap-1">
            <li>
              <p class="text-muted-foreground">
                Open the game and click the Multiplayer button
              </p>
            </li>
            <li>
              <p class="text-muted-foreground">
                Click the
                <span class="text-emerald-400">Direct Connection</span>
                button
              </p>
            </li>
            <li>
              <div class="flex items-center text-muted-foreground">
                <p>Copy the IP address:</p>
                <button
                  class="hover:text-emerald-400 transition-colors flex items-start underline underline-offset-2 px-1"
                  @click="copyIP"
                >
                  {{ serverIp }}
                  <Icon
                    name="material-symbols:content-copy"
                    size="0.8rem"
                    class="opacity-75"
                  />
                </button>
                <p>
                  and paste it in the
                  <span class="text-emerald-400">Server Address</span>
                  field
                </p>
              </div>
            </li>
          </ul>
        </PageFragmentSettingsMinecraftLinkSection>
        <PageFragmentSettingsMinecraftLinkSection
          title="Enter the pin"
          icon="material-symbols:pin"
        >
          <p class="text-muted-foreground">
            After joining the server, you will get kicked, and a pin
            code will appear on your screen
          </p>
          <!-- <div class="inline-flex px-3 w-fit items-center mt-2 p-2 border border-border rounded-sm bg-border/25">
            <Icon
              name="uil:exclamation-triangle"
              size="1.5rem"
              class="text-amber-400 mr-1.5 animate-pulse"
            />
            <p class="text-muted-foreground text-sm">
              If it's doesn't match with your Minecraft one,
              please change it from the
            </p>
          </div> -->
          <p>TODO pin input</p>
        </PageFragmentSettingsMinecraftLinkSection>
      </div>
    </div>
  </div>
</template>