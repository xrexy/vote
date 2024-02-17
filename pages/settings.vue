<script setup lang="ts">
const { entries, currentTab, currentTabData, capitalized, dataFor } = useTabs(["account", "minecraft", "danger-zone"] as const, {
  account: {
    icon: "solar:user-bold",
    description: "TODO Manage your account settings",
    enabled: true,
  },
  minecraft: {
    icon: "mdi:minecraft",
    description: "TODO Link your minecraft account",
    enabled: true,
  },
  "danger-zone": {
    icon: "ph:warning-fill",
    description: "TODO These actions are irreversible",
    enabled: true,
  }
})
</script>

<template>
  <div class="py-8 h-[calc(100dvh-var(--header-height))] w-[75dvw] mx-auto flex flex-row justify-between items-center">
    <div class="w-min h-full pt-4 pr-12 flex flex-col justify-start items-left gap-y-2 sticky">
      <Button
        v-for="[tab, { icon, enabled }] in entries"
        :key="tab"
        variant="ghost"
        :disabled="!enabled || currentTab == tab"
        :class="cn(
          'justify-start group text-lg outline outline-1 outline-transparent hover:text-emerald-300',
          currentTab == tab && 'text-emerald-600',
          tab == 'danger-zone' &&
            'bg-red-600/10 text-red-400 border border-red-600 border-opacity-25 hover:border-opacity-50 hover:bg-red-700/20 hover:text-red-400/90 transition duration-200'
        )
        "
        @click="currentTab = tab"
      >
        <Icon
          size="1.5rem"
          :class="cn(
            'mr-4 group-hover:rotate-6 z-10 transition-all duration-150',
            currentTab == tab && ''
          )
          "
          :name="icon"
        />
        {{ capitalized(tab) }}
      </Button>
    </div>

    <Card class="h-full flex flex-col flex-1">
      <CardHeader>
        <CardTitle>{{ capitalized(currentTab) }}</CardTitle>
        <CardDescription>{{ currentTabData.description }}</CardDescription>
      </CardHeader>
      <CardContent class="mx-4 flex-1 h-full">
        <PageFragmentSettingsAccount v-if="currentTab === 'account'" />
        <PageFragmentSettingsMinecraft v-else-if="currentTab === 'minecraft'" />
        <PageFragmentSettingsDangerZone v-else-if="currentTab === 'danger-zone'" />
        <div
          v-else
          class="text-red-400 font-bold text-lg"
        >
          Internal Error - Please let an administrator know about this asap.
        </div>
      </CardContent>
    </Card>
  </div>
</template>

