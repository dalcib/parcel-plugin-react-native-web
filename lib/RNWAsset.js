const path = require('path')
const resolve = require('resolve')
const utils = require('./utils')
const preset = require('./preset')
const JSAsset = require(path.join(utils.getParcelPath(), 'lib/assets/JSAsset'))

class RNWAsset extends JSAsset {
  constructor(name, pkg, options) {
    super(name, pkg, options)

    if (
      !!(this.package.dependencies && this.package.dependencies['react-native']) ||
      !!(this.package.devDependencies && this.package.devDependencies['react-native']) ||
      !!(this.package.peerDependencies && this.package.peerDependencies['react-native']) ||
      !!(this.package.sourceDependencies && this.package.sourceDependencies['react-native']) ||
      !!(this.package.keywords && this.package.keywords.includes('react-native')) ||
      !!(this.package['parcel-rnw'] && this.package['parcel-rnw'].includes(this.package.name)) ||
      !/node_modules/g.test(this.name)
    ) {
      this.babelConfig = utils.mergeConfigs(this.babelConfig, preset)
    }
  }

  addDependency(name, opts) {
    name = utils.getWebExtension(name, this.name)
    super.addDependency(name, opts)
  }
}

module.exports = RNWAsset
