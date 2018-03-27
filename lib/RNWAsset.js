const utils = require('./utils')
const JSAsset = require(path.join([utils.getParcelPath(), 'lib/assets/JSAsset']))
const preset = require('./preset')

const path = require('path')
const fs = require('fs')
const resolve = require('resolve')

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
      !!(this.package.keywords && this.package.keywords.indexOf('react-native') !== -1) ||
      !!pkgBabelConfig ||
      !/node_modules/g.test(this.name)

    if (isReactNativeModule) {
      if (pkgBabelConfig && pkgBabelConfig[this.package.name]) {
        this.babelConfig = utils.mergeConfigs(this.babelConfig, pkgBabelConfig[this.package.name])
      }
      this.babelConfig = utils.mergeConfigs(this.babelConfig, rnwBabelConfig)
    }
  }

  addDependency(name, opts) {
    var modulePath = resolve.sync(name, {
      basedir: path.resolve(this.name, '..'),
    })
    if (name.match(/^expo/g)) {
      name = name.replace(/expo/g, 'expo-web')
    }
    if (modulePath.substr(-7) !== '.web.js') {
      modulePath = modulePath.replace('.js', '.web.js')
      name = isFile(modulePath) ? modulePath : name
    }
    super.addDependency(name, opts)
    console.log(this.name, name, opts)
  }
}

module.exports = RNWAsset

function isFile(file) {
  try {
    var stat = fs.statSync(file)
  } catch (e) {
    if (e && (e.code === 'ENOENT' || e.code === 'ENOTDIR')) return false
    throw e
  }
  return stat.isFile() || stat.isFIFO()
}
