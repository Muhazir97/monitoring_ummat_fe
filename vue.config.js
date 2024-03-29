const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    // Set up all the aliases we use in our app.
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ]
  },
  pwa: {
    name: 'Vue Argon Design',
    themeColor: '#172b4d',
    msTileColor: '#172b4d',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#172b4d'
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  },

  publicPath: '/',
  // assetsDir: 'assets',
  // outputDir: 'C:/xampp/htdocs/kotaserang_monitoringummat_fe'
  // outputDir: 'C:/xampp/htdocs/kabserang_monitoringummat_fe'
  outputDir: 'C:/xampp/htdocs/kotacilegon_monitoringummat_fe'
};
