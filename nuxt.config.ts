// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: ['@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      Inter: [300, 600, 700],
    },
  },
});
