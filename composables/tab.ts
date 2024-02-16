import type { LocationQueryValue } from "vue-router";

export type TabData = {
  icon: string;
  description: string;
  enabled: boolean;
};

export const useTabs = <TabKeys extends Readonly<string[]>, Tab extends string = TabKeys[number]>(tabKeys: TabKeys, tabData: Record<TabKeys[number], TabData>) => {
  const route = useRoute();
  const router = useRouter();

  function capitalized(s: string) {
    return s.replace(' ', '').split('-').map(capitalize).join(' ')
  }

  function isValidTab(s: string): s is Tab {
    return !!tabData[s as Tab]
  }

  function updateTabQuery(tab: string) {
    router.push({ query: { tab } });
  }

  function dataFor(k: Tab) { return tabData[k] }

  function queryToTab(rawParam: LocationQueryValue | LocationQueryValue[]): Tab {
    const param = Array.isArray(rawParam) ? rawParam[0] : rawParam;

    const def = tabKeys[0] as Tab;
    if (!param) {
      updateTabQuery(def);
      return def;
    }

    if (isValidTab(param) && dataFor(param).enabled) {
      return param;
    }

    updateTabQuery(def);
    return def;
  }

  const currentTab = ref<Tab>(queryToTab(route.query.tab));
  watch(currentTab, updateTabQuery);
  watchEffect(() => {
    // @ts-ignore ts is somehow more braindead than me
    currentTab.value = queryToTab(route.query.tab);
  });

  return {
    currentTab,
    currentTabData: computed(() => dataFor(currentTab.value as Tab)),
    entries: Object.entries(tabData) as [Tab, TabData][],
    dataFor,
    capitalized,
    isValidTab,
    queryToTab,
  }
}
