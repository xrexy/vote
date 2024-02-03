<template>
  <form class="w-[24rem] h-full duration-300 flex items-center">
    <!-- TODO light theme -->
    <label
      for="server-search"
      class="sr-only"
    >
      Search
    </label>
    <div class="relative w-full text-gray-200">
      <input
        id="server-search"
        type="text"
        class="bg-foreground/5 outline-none border border-input text-sm rounded-lg focus:border-emerald-500 block w-full ps-10 p-2.5"
        placeholder="Search"
        required
      >
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
      >
        <Icon
          class="text-foreground/30"
          name="material-symbols:search"
          height="16"
          width="16"
        />
      </div>
    </div>
  </form>
</template>