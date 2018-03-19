const utils = require('./utils')
const JSAsset = require(utils.getParcelPath() + 'lib/assets/JSAsset')

const rnwBabelConfig = {
  presets: ['react-native-web-expo'],
  internal: false,
}

class RNWAsset extends JSAsset {
  constructor(name, pkg, options) {
    super(name, pkg, options)

    const pkgBabelConfig = utils.getPkgConfig(this.package.name)

    const isReactNativeModule =
      !!(this.package.dependencies && this.package.dependencies['react-native']) ||
      !!(this.package.devDependencies && this.package.devDependencies['react-native']) ||
      !!pkgBabelConfig ||
      !/node_modules/g.test(this.name)

    if (isReactNativeModule) {
      if (pkgBabelConfig && pkgBabelConfig[this.package.name]) {
        this.babelConfig = utils.mergeConfigs(this.babelConfig, pkgBabelConfig[this.package.name])
      }
      this.babelConfig = utils.mergeConfigs(this.babelConfig, rnwBabelConfig)
    }
  }
}

module.exports = RNWAsset
