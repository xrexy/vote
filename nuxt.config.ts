// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/eslint-module",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    'shadcn-nuxt',
    '@nuxtjs/tailwindcss',
    "@pinia/nuxt",
    "nuxt-icon",
  ],
  devtools: { enabled: true },
  googleFonts: {
    families: {
      'DM+Sans': '400..1000',
      'DM+Mono': [400, 500],
      "DM+Serif+Display": true,
    },
    display: "swap",
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  tailwindcss: { viewer: false },
});