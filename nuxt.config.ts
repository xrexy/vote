// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  googleFonts: {
    families: {
      Montserrat: [300, 500, 700],
    },
    display: "swap",
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  tailwindcss: { viewer: false },
  modules: [
    "@nuxtjs/eslint-module",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    'shadcn-nuxt',
    '@nuxtjs/tailwindcss'
  ],
});