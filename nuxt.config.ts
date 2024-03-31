// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/ui', '@nuxt/test-utils/module', 'dayjs-nuxt'],
  css: [],
  app: {},
  ui: {
    icons: ['ant-design'],
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
  },
  colorMode: {
    preference: 'dark',
  },
});
