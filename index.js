const resolveGlobal = require('resolve-global')
const global = resolveGlobal('parcel-bundler')
const parcel = global ? global.substr(0, global.length - 8) : 'parcel-bundler'

module.exports = function(bundler) {
  bundler.addAssetType('js', require.resolve('./RNWAsset'))
  bundler.addAssetType('jsx', require.resolve('./RNWAsset'))
  bundler.addAssetType('web.js', require.resolve('./RNWAsset'))
  bundler.addAssetType('web.jsx', require.resolve('./RNWAsset'))
  bundler.addAssetType('web.ts', require.resolve(parcel + 'lib/assets/TypeScriptAsset'))
  bundler.addAssetType('web.tsx', require.resolve(parcel + 'lib/assets/TypeScriptAsset'))
}
