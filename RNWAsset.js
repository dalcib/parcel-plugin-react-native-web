const resolveGlobal = require('resolve-global')
const global = resolveGlobal('parcel-bundler')
const parcel = global ? global.substr(0, global.length - 8) : 'parcel-bundler'
const JSAsset = require(parcel + 'lib/assets/JSAsset')
const config = require(parcel + 'lib/utils/config')
let cwd = process.cwd()
const appPackage = require(cwd + '/package.json')

async function getBabelConfig() {
  let babelConfig = {
    presets: ['env', 'react-native'],
    plugins: ['react-native-web'],
    internal: false,
  }

  let rootBabel
  if (appPackage && appPackage.babel) {
    rootBabel = appPackage.babel
  } else {
    const conf = await config.resolve(cwd, ['.babelrc', '.babelrc.js'])
    if (conf) {
      rootBabel = await config.load(cwd, ['.babelrc', '.babelrc.js'])
    }
  }
  if (rootBabel) {
    babelConfig.presets = babelConfig.presets.concat(rootBabel.presets || [])
    babelConfig.plugins = babelConfig.plugins.concat(rootBabel.plugins || [])
  }
  return babelConfig
}

let babelConfig /* getBabelConfig() */
getBabelConfig()
  .then(config => {
    babelConfig = config
  })
  .catch(error => {
    console.log(error)
  })

class RNWAsset extends JSAsset {
  constructor(name, pkg, options) {
    super(name, pkg, options)

    const isReactNativeModule =
      ((this.package.dependencies &&
        Object.keys(this.package.dependencies).includes('react-native')) ||
        (this.package.devDependencies &&
          Object.keys(this.package.devDependencies).includes('react-native')) ||
        (appPackage['parcel-rnw'] && appPackage['parcel-rnw'].includes(this.package.name)) ||
        !/node_modules/g.test(this.name)) &&
      this.package.name !== 'react-native-web'

    if (isReactNativeModule) {
      this.babelConfig = babelConfig
    }
  }
}

module.exports = RNWAsset
