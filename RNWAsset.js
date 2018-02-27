const utils = require('./utils')
const JSAsset = require(utils.getParcelPath() + 'lib/assets/JSAsset')
const config = require(utils.getParcelPath() + 'lib/utils/config')
const babelTransform = require(utils.getParcelPath() + 'lib/transforms/babel')
let cwd = process.cwd()
const appPackage = require(cwd + '/package.json')

const rnwBabelConfig = {
  presets: ['env', 'react-native'],
  plugins: ['react-native-web'],
  internal: false,
}

class RNWAsset extends JSAsset {
  /*   constructor(name, pkg, options) {
    super(name, pkg, options)

    const config 
    babelTransform.getConfig(this).then() || { presets: [], plugins: [] }
    let babelConfig = utils.mergeConfig(config, rnwBabelConfig)


  } */

  async getParserOptions() {
    this.babelConfig = await babel.getConfig(this)

    const isReactNativeModule =
      (this.package.dependencies &&
        Object.keys(this.package.dependencies).indexOf('react-native') !== -1) ||
      (this.package.devDependencies &&
        Object.keys(this.package.devDependencies).indexOf('react-native') !== -1) ||
      (appPackage['parcel-rnw'] && appPackage['parcel-rnw'].indexOf(this.package.name) !== -1) ||
      (appPackage['parcel-rnw'] && appPackage['parcel-rnw'][this.package.name]) ||
      !/node_modules/g.test(this.name)

    if (isReactNativeModule) {
      if (appPackage['parcel-rnw'] && appPackage['parcel-rnw'][this.package.name]) {
        const pkgBabelConfig =
          appPackage['parcel-rnw'] && appPackage['parcel-rnw'][this.package.name]
        babelConfig = utils.mergeConfig(babelConfig, pkgBabelConfig)
      }
      this.babelConfig = utils.mergeConfig(this.babelConfig, rnwBabelConfig)
    }

    await super.getParserOptions()
  }
}

module.exports = RNWAsset
