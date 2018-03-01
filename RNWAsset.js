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
      (this.package.dependencies &&
        Object.keys(this.package.dependencies).indexOf('react-native') !== -1) ||
      (this.package.devDependencies &&
        Object.keys(this.package.devDependencies).indexOf('react-native') !== -1) ||
      !!pkgBabelConfig ||
      !/node_modules/g.test(this.name)

    if (isReactNativeModule) {
      if (pkgBabelConfig) {
        this.babelConfig = utils.mergeConfigs(this.babelConfig, pkgBabelConfig[this.package.name])
      }
      this.babelConfig = utils.mergeConfigs(this.babelConfig, rnwBabelConfig)
    }
    if (this.package.name === 'react-native-md-textinput') {
      console.log(
        'kdfhkdghkdgkldghldghdgh',
        'react-native-md-textinput',
        isReactNativeModule,
        pkgBabelConfig
      )
    }
  }
}

module.exports = RNWAsset
