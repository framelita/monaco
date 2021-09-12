const path = require('path');

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        // only include less file with variables and mixins
        // not those that will generate actual css
        path.resolve(__dirname, './src/assets/styles/_variables.scss'),
        path.resolve(__dirname, './src/assets/styles/_mixins.scss'),
      ],
    },
  },
  configureWebpack: {
    plugins: [],
  },
};
