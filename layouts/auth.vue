<template>
  <div class="relative grid place-items-center h-[calc(100dvh-var(--header-height))]">
    <div class="absolute w-full -z-50 opacity-20 h-full">
      <NuxtImg
        class="h-full w-full select-none"
        src="https://cdn.mos.cms.futurecdn.net/VCuddyGEoA7P2AzGMBu9hn-1200-80.jpg"
      />
    </div>

    <div class="grid transition-all duration-150 place-items-center bg-background/75 border border-emerald-400 rounded-lg shadow-glow-emerald w-[95%] lg:w-[40%] 2xl:w-[26vw] py-5 sm:px-16 sm:py-8">
      <div class="w-full h-full grid place-items-center">
        <AppLogo
          :width="100"
          :height="100" 
        />


        <div class="my-6 w-full">
          <Separator />
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>