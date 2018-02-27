const resolveGlobal = require('resolve-global')

exports.getParcelPath = function() {
  const globalPath = resolveGlobal.silent('parcel-bundler')
  return globalPath ? globalPath.substr(0, globalPath.length - 8) : 'parcel-bundler'
}

/* async function getBabelConfig(config) {
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
    config = mergeConfig(config, rootBabel)
  }
  return config
} */

function mergeConfigs(a, b) {
  if (b) {
    a.presets = (a.presets || []).concat(b.presets || [])
    a.plugins = (a.plugins || []).concat(b.plugins || [])
  }

  return a
}

/* exports.setBabelConfig = function(config) {
  getBabelConfig(config)
    .then(config => {
      babelConfig = config
    })
    .catch(error => {
      console.log(error)
    })
} */
