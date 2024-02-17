<script setup lang="ts">
const { entries, currentTab, currentTabData, capitalized, dataFor } = useTabs(["dashboard", "analytics"] as const, {
  dashboard: {
    icon: "material-symbols:dashboard",
    description: "TODO Dashboard for server creation/editing/deletion",
    enabled: true
  },
  analytics: {
    icon: "material-symbols:analytics-sharp",
    description: "TODO Analytics for your servers",
    enabled: false,
  }
})
</script>

<template>
  <div class="py-8 h-[calc(100dvh-var(--header-height))] w-[75dvw] mx-auto flex flex-row justify-between items-center">
    <div class="w-min h-full pt-4 pr-10 flex flex-col justify-between items-left gap-y-2 sticky">
      <!-- TOP SECTION -->
      <div class="">
        <div
          v-for="[tab, { icon, enabled }] in entries"
          :key="tab"
          class="flex flex-row items-center"
        >
          <Button
            variant="ghost"
            :disabled="!enabled || currentTab == tab"
            :class="cn(
              'justify-start group text-lg outline outline-1 outline-transparent hover:text-emerald-300',
              currentTab == tab && 'text-emerald-600'
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
          <Badge
            v-if="!enabled"
            variant="emerald"
            class="h-6 px-2 font-bold"
          >
            SOON
          </Badge>
        </div>
      </div>

      <!-- BOTTOM SECTION -->
      <div>
        <Button
          variant="ghost"
          :class="cn(
            'justify-start group text-lg outline outline-1 outline-transparent hover:text-emerald-300')"
          to="/settings"
        >
          <NuxtLink to="/settings">
            <Icon
              size="1.5rem"
              :class="cn(
                'mr-4 group-hover:rotate-6 z-10 transition-all duration-150',)
              "
              name="material-symbols:settings"
            />
            Settings
          </NuxtLink>
        </Button>
        <Button
          variant="ghost"
          :class="cn(
            'justify-start group text-lg outline outline-1 outline-transparent hover:text-emerald-300',
          )
          "
        >
          <NuxtLink
            external
            target="_blank"
            to="https://github.com/xrexy/vote"
          >
            <Icon
              size="1.5rem"
              :class="cn(
                'mr-4 group-hover:rotate-6 z-10 transition-all duration-150',)
              "
              name="mdi:github"
            />
            Source Code
          </NuxtLink>
        </Button>
      </div>
    </div>
    <Card class="h-full flex flex-col flex-1">
      <CardHeader>
        <CardTitle>{{ capitalized(currentTab) }}</CardTitle>
        <CardDescription>{{ currentTabData.description }}</CardDescription>
      </CardHeader>
      <CardContent class="scroll-smooth mb-6 pb-0 flex-1 h-full overflow-scroll">
        <!-- <ScrollArea class="max-h-full"> -->
        <PageFragmentStudioDashboard v-if="currentTab === 'dashboard'" />
        <div
          v-else
          class="text-red-400 font-bold text-lg"
        >
          Internal Error - Please let an administrator know about this asap.
        </div>
        <!-- </ScrollArea> -->
      </CardContent>
    </Card>
  </div>
</template>
