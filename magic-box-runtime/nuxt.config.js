module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'magic-box-runtime',
    meta: [
      { charset: 'utf-8' },
      { name: 'MobileOptimized', content: '320' },
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'apple-mobile-web-app-title', content: 'magic-box' },
      { name: 'apple-touch-icon', content: '/static/icon.png' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },
      { hid: 'keywords', name: 'keywords', content: 'magic-box' },
      { hid: 'description', name: 'description', content: '苦逼毕设' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }
    ]
  },

  plugins: [
    { src: '~plugins/axios' },
    { src: '~plugins/vue-easy-toast', ssr: false }
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
