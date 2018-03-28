const utils = require('./utils')
const path = require('path')
const JSAsset = require(path.join(utils.getParcelPath(), 'lib/assets/JSAsset'))
const preset = require('./preset')

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
      extensions: ['.web.js', '.js'],
    })
    if (modulePath.substr(-7) === '.web.js') {
      name = modulePath
    }
    /*     if (name.match(/^expo/g)) {
      name = name.replace(/expo/g, 'expo-web')
    } */
    /*     var modulePath = resolve.sync(name, {
      basedir: path.resolve(this.name, '..'),
    })
    if (modulePath.substr(-7) !== '.web.js') {
      modulePath = modulePath.replace('.js', '.web.js')
      if (isFile(modulePath)) {
        if (name[0] !== '.') {
          name = path.relative('./node_modules', modulePath)
        } else {
          name = path.relative(process.cwd(), modulePath)
        }
      }
    } */
    super.addDependency(name, opts)
    //console.log(this.name, name, opts)
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
