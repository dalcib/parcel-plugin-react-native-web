const utils = require('./utils')
const path = require('path')

module.exports = function(bundler) {
  bundler.addAssetType('js', require.resolve('./RNWAsset'))
  bundler.addAssetType('jsx', require.resolve('./RNWAsset'))
  bundler.addAssetType('web.js', require.resolve('./RNWAsset'))
  bundler.addAssetType('web.jsx', require.resolve('./RNWAsset'))
  bundler.addAssetType(
    'web.ts',
    require.resolve(path.join(utils.getParcelPath(), 'lib/assets/TypeScriptAsset'))
  )
  bundler.addAssetType(
    'web.tsx',
    require.resolve(path.join(utils.getParcelPath(), 'lib/assets/TypeScriptAsset'))
  )
}
