const utils = require('./utils')
const JSAsset = require(utils.getParcelPath() + 'lib/assets/JSAsset')
const babelTransform = require(utils.getParcelPath() + 'lib/transforms/babel')
let cwd = process.cwd()
const appPackage = require(cwd + '/package.json')

const rnwBabelConfig = {
  presets: ['env', 'react-native'],
  plugins: ['react-native-web'],
  internal: false,
}

class RNWAsset extends JSAsset {
  constructor(name, pkg, options) {
    super(name, pkg, options)

    const isReactNativeModule =
      (this.package.dependencies &&
        Object.keys(this.package.dependencies).indexOf('react-native') !== -1) ||
      (this.package.devDependencies &&
        Object.keys(this.package.devDependencies).indexOf('react-native') !== -1) ||
      (appPackage['parcel-rnw'] && appPackage['parcel-rnw'].indexOf(this.package.name) !== -1) ||
      (appPackage['parcel-rnw'] && appPackage['parcel-rnw'][this.package.name]) ||
      !/node_modules/g.test(this.name)

    let aaa = null
    if (isReactNativeModule) {
      if (appPackage['parcel-rnw'] && appPackage['parcel-rnw'][this.package.name]) {
        const pkgBabelConfig =
          appPackage['parcel-rnw'] && appPackage['parcel-rnw'][this.package.name]
        this.babelConfig = utils.mergeConfigs(this.babelConfig, pkgBabelConfig)
        console.log(pkgBabelConfig)
      }
      this.babelConfig = utils.mergeConfigs(this.babelConfig, rnwBabelConfig)
    }
  }
}

module.exports = RNWAsset
