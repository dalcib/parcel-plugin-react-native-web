const TypeScriptAsset = require('parcel-bundler/src/assets/TypeScriptAsset')

module.exports = function (bundler) {
    bundler.addAssetType('js', require.resolve('./RNWAsset'));
    bundler.addAssetType('web.js', require.resolve('./RNWAsset'));
    //bundler.addAssetType('web.jsx', require.resolve('./RNWAsset'));
    //bundler.addAssetType('jsx', require.resolve('./RNWAsset'));
    bundler.addAssetType('web.ts', require.resolve('parcel-bundler/src/assets/TypeScriptAsset'));
};
