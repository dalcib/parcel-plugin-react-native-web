const resolveGlobal = require('resolve-global')
let cwd = process.cwd()
const path = require('path')
const appPackage = require(path.join(cwd, '/package.json'))

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

exports.getWebExtension = function(sourcePath, currentFile) {
  try {
    var modulePath = resolve.sync(sourcePath, {
      basedir: path.resolve(currentFile, '..'),
      extensions: ['.web.js', '.js'],
    })
    if (modulePath.match(/react-native-implementation/g)) {
      console.log('_________________')
      console.log('_________________')
      console.log('_________________')
      console.log('_________________')
      console.log('_________________')
      console.log(sourcePath, currentFile)
    }
    if (modulePath.substr(-7) === '.web.js') {
      return modulePath
    }
  } catch (error) {
    return sourcePath
  }

  return sourcePath
}
