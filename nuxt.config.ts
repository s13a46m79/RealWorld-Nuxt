// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    'nuxt-mongoose',
    '@vueform/nuxt',
    '@vueuse/nuxt',
    '@sidebase/nuxt-auth',
    '@pinia/nuxt',
    'nuxt-icon'
  ],
  auth: {
    provider: {
        type: 'local'
    }
  },
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: 'models',
  },
})
