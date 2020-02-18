const pkg = require('./package');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/blackar.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl',
    '~/assets/scss/main.scss',
    'swiper/dist/css/swiper.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    '~/plugins/auth.js',
    '~/plugins/match-height',
    { src: '~/plugins/VueAwesomeSwiper', ssr: false },
    { src: '~/plugins/gmap', ssr: false },
    { src: '~/plugins/global', ssr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [

  ],
  /*
   ** Nuxt.js routers
   */
  router: {
    middleware: 'router-auth'
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
};
