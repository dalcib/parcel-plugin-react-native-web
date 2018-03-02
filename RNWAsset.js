const utils = require('./utils')
const JSAsset = require(utils.getParcelPath() + 'lib/assets/JSAsset')

const rnwBabelConfig = {
  presets: ['env', 'react-native'],
  plugins: ['react-native-web'],
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

/* if (
  this.name ===
  'C:\\Users\\dalci\\playground\\react-native-material-ui-web-app\\node_modules\\react-vector-icons\\lib\\create-icon-set.js'
) {
  console.log(this.name, isReactNativeModule, this.babelConfig)
  setTimeout(function() {}, 10000)
} */
