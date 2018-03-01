const resolveGlobal = require('resolve-global')
const config = require(getParcelPath() + 'lib/transforms/babel').getConfig
let cwd = process.cwd()
const appPackage = require(cwd + '/package.json')

function getParcelPath() {
  const globalPath = resolveGlobal.silent('parcel-bundler')
  return globalPath ? globalPath.substr(0, globalPath.length - 8) : 'parcel-bundler'
}
exports.getParcelPath = getParcelPath

exports.mergeConfigs = function(a, b) {
  if (!a) return b
  if (b) {
    a.presets = (a.presets || []).concat(b.presets || [])
    a.plugins = (a.plugins || []).concat(b.plugins || [])
  }
  return a
}

exports.setBabelConfig = function(babelConfig) {
  config(babelConfig)
    .then(config => {
      return config
    })
    .catch(error => {
      console.log(error)
    })
}

exports.getPkgConfig = function(name) {
  const parcelRnw = appPackage['parcel-rnw']
  if (parcelRnw) {
    parcelRnw.map((module, index) => {
      if (name === 'react-native-md-textinput') {
        console.log('taatatatttatatatatataatatta', name)
      }
      if (typeof module === 'string') {
        if (module === name) {
          console.log('mmmmmmm', name)
          return true
        }
      } else {
        if (Object.keys(module)[0] === name) {
          console.log('gggggggg', name, module)
          return module
        }
      }
    })
  }
  return false
}

//const uniqueElements = arr => [...new Set(arr)]

/* function uniquePreset(config) {
  config.presets = uniqueElements(config.presets)
  config.plugins = uniqueElements(config.plugins)
}

const uniqueElements = function(arr) {
  const o = {}
  let i
  if (arr) {
    const l = arr.length
    const r = []
    for (i = 0; i < l; i += 1) {
      o[JSON.stringify(arr[i])] = arr[i]
    }
    Object.keys(o).forEach(index => {
      r.push(o[index])
    })
    return r
  }
} */

/* async function getBabelrc() {
  const conf = await config.resolve(cwd, ['.babelrc', '.babelrc.js'])
  if (conf) {
    return await config.load(cwd, ['.babelrc', '.babelrc.js'])
  }
}

let appBabelConfig = null

var Singleton = (function getAppBabelConfig() {
  console.log(config, 'yyyyyyyyyyyyyyy')
  if (!appBabelConfig) {
    if (appPackage && appPackage.babel) {
      appBabelConfig = appPackage.babel
    } else {
      getBabelrc()
        .then(config => {
          console.log(config, 'ooooooooooooooo')
          appBabelConfig = config
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})()

exports.appBabelConfig = appBabelConfig */
