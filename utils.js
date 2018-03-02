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
  return uniquePreset(a)
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
    const module = parcelRnw.find(module => module === name || Object.keys(module)[0] === name)
    if (typeof module === 'string') {
      return true
    } else {
      if (module) {
        return module
      }
    }
  }
  return false
}

const uniqueElements = arr => [...new Set(arr)]

function uniquePreset(config) {
  config.presets = uniqueElements(config.presets)
  config.plugins = uniqueElements(config.plugins)
  return config
}
