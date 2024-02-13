<template>
  <div
    class="py-8 h-[calc(100dvh-var(--header-height))] w-[75dvw] mx-auto flex flex-row justify-between items-center"
  >
    <div
      class="w-min h-full pt-4 pr-12 flex flex-col justify-start items-left gap-y-2 sticky"
    >
      <Button
        v-for="[tab, { icon }] in entries"
        :key="tab"
        variant="ghost"
        :disabled="currentTab == tab"
        :class="
          cn(
            'justify-start group text-lg utline outline-1 outline-transparent hover:text-emerald-300',
            currentTab == tab && 'text-emerald-600',
            tab == 'danger-zone' &&
              'bg-red-600/10 text-red-400 border border-red-600 border-opacity-25 hover:border-opacity-50 hover:bg-red-700/20 hover:text-red-400/90 transition duration-200'
          )
        "
        @click="currentTab = tab"
      >
        <Icon
          size="1.5rem"
          :class="
            cn(
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
        <CardDescription>{{ tabs[currentTab].description }}</CardDescription>
      </CardHeader>
      <CardContent class="mx-4 flex-1 h-full">
        <PageFragmentSettingsAccount v-if="currentTab === 'account'" />
        <PageFragmentSettingsMinecraft v-else-if="currentTab === 'minecraft'" />
        <PageFragmentSettingsDangerZone
          v-else-if="currentTab === 'danger-zone'"
        />
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

<script setup lang="ts">
import type { LocationQueryValue } from "vue-router";

const validTabs = ["account", "minecraft", "danger-zone"] as const;

type Tab = (typeof validTabs)[number];
type TabData = {
  icon: string;
  description: string;
};

const tabs = Object.freeze({
  account: {
    icon: "solar:user-bold",
    description: "TODO Manage your account settings",
  },
  minecraft: {
    icon: "mdi:minecraft",
    description: "TODO Link your minecraft account",
  },
  "danger-zone": {
    icon: "ph:warning-fill",
    description: "TODO These actions are irreversible",
  },
} as Record<Tab, TabData>);
const entries = Object.entries(tabs) as [Tab, TabData][];

const route = useRoute();
const router = useRouter();

function capitalized(s: Tab) {
  return s.split("-").map(capitalize).join(" ");
}

function isValidTab(s: string): s is Tab {
  return validTabs.includes(s as Tab);
}

function updateTabQuery(tab: Tab) {
  router.push({ query: { tab } });
}

function queryToTab(rawParam: LocationQueryValue | LocationQueryValue[]): Tab {
  const param = Array.isArray(rawParam) ? rawParam[0] : rawParam;
  const def = validTabs[0];
  if (!param) {
    updateTabQuery(def);
    return def;
  }

  if (isValidTab(param)) {
    return param;
  }

  updateTabQuery(def);
  return def;
}

const currentTab = ref(queryToTab(route.query.tab));
watch(currentTab, updateTabQuery);
watchEffect(() => {
  currentTab.value = queryToTab(route.query.tab);
});
</script>

