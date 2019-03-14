module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      browsers: 'last 2 versions'
    },
    cssnano: {}
  }
}

/* const postcssImport = require('postcss-import')
const postcssPresetEnv = require('postcss-preset-env')
const cssnano = require('cssnano')

const postcssPlugins = [
  postcssImport(),
  postcssPresetEnv({
    browsers: 'last 2 versions'
  }),
  cssnano()
] */
