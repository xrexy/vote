// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/eslint-module",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    'shadcn-nuxt',
    '@nuxtjs/tailwindcss'
  ],
  devtools: { enabled: true },
  googleFonts: {
    families: {
      'DM+Sans': true,
      'DM+Mono': true,
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