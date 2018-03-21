const utils = require('./utils')
const JSAsset = require(utils.getParcelPath() + 'lib/assets/JSAsset')
const preset = require('./preset')

const rnwBabelConfig = preset
/* {
  presets: ['react-native-web-expo'],
  internal: false,
} */

class RNWAsset extends JSAsset {
  constructor(name, pkg, options) {
    super(name, pkg, options)

    const pkgBabelConfig = utils.getPkgConfig(this.package.name)

    const isReactNativeModule =
      !!(this.package.dependencies && this.package.dependencies['react-native']) ||
      !!(this.package.devDependencies && this.package.devDependencies['react-native']) ||
      !!(this.package.peerDependencies && this.package.peerDependencies['react-native']) ||
      !!this.basename.match(/react-native-vector-icons/g) ||
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
