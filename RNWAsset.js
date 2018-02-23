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
  if (appPackage.package && appPackage.package.babel) {
    rootBabel = appPackage.package.babel
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

const babelConfig = getBabelConfig()

class RNWAsset extends JSAsset {
  constructor(name, pkg, options) {
    super(name, pkg, options)

    const isReactNativeModule =
      ((this.package.dependencies &&
        Object.keys(this.package.dependencies).includes('react-native')) ||
        (this.package.devDependencies &&
          Object.keys(this.package.devDependencies).includes('react-native')) ||
        (appPackage.rnw && appPackage.rnw.includes(this.package.name)) ||
        !/node_modules/g.test(this.name)) &&
      this.package.name !== 'react-native-web'

    if (isReactNativeModule) {
      //console.log(this.name)
      this.babelConfig = babelConfig
    }
  }
}

module.exports = RNWAsset

/*
const { File: BabelFile, transform } = require('babel-core');
const babylon = require('babylon');
//const babel = require('parcel-bundler/lib/transforms/babel');
async getParserOptions() {
    const options = {
      filename: this.name,
      allowReturnOutsideFunction: true,
      allowHashBang: true,
      ecmaVersion: Infinity,
      strictMode: false,
      sourceType: 'module',
      locations: true,
      plugins: ['exportExtensions', 'dynamicImport']
    };
 
    if ((this.package.dependencies && Object.keys(this.package.dependencies).includes('react-native'))
      || (this.package.devDependencies && Object.keys(this.package.devDependencies).includes('react-native'))
      || (appPackage.rnw && appPackage.rnw.includes(this.package.name))) {
      console.log('preset:react-native', this.package.name)
      this.babelConfig = {
        presets: ["react-native"],
        plugins: ["react-native-web", "transform-class-properties"]
        // ["extension-resolver", { "extensions": [".web.js", ".js"] }]
      }
    } else {
      console.log('preset:-----------', this.package.name)
      this.babelConfig = await babel.getConfig(this);
    }
    if (this.babelConfig) {
      const file = new BabelFile(this.babelConfig);
      options.plugins.push(...file.parserOpts.plugins);
    }
 
    return options;
  }
 
  async parse(code) {
    const options = await this.getParserOptions();
    console.log('parsed', JSON.stringify(this.babelConfig && this.babelConfig.presets), this.name)/* , this.package.dependencies[0] 
    return babylon.parse(code, options);
  } */

/* async parse(code) {


    const options = {
      filename: this.name,
      allowReturnOutsideFunction: true,
      allowHashBang: true,
      ecmaVersion: Infinity,
      strictMode: false,
      sourceType: 'module',
      locations: true,
      plugins: ['exportExtensions', 'dynamicImport', 'classProperties']
    };

    this.babelConfig = {
      presets: ['env', 'react-native'],
      plugins: [
        'react-native-web',
        // ["extension-resolver", { "extensions": [".web.js", ".js"] }]
      ],
      code: true,
      filename: this.name,
      babelrc: false,
      parserOpts: options
    }

    /* if (this.isES6Module) {
      this.babelConfig.internal = true
      this.babelConfig.plugins = [require('babel-plugin-transform-es2015-modules-commonjs')]
      this.babelConfig.presets = null
      this.babelConfig.parserOpts = null
    }
 
    const file = new BabelFile(this.babelConfig);
    options.plugins.push(...file.parserOpts.plugins);

    const isReactNativeModule =
      !!((this.package.dependencies && Object.keys(this.package.dependencies).includes('react-native'))
        || (this.package.devDependencies && Object.keys(this.package.devDependencies).includes('react-native'))
        || (appPackage.rnw && appPackage.rnw.includes(this.package.name)))

    //console.log(file.pluginVisitors)
    //console.log('isReactNativeModule', this.name, isReactNativeModule)

    if (isReactNativeModule) {
      //const res = babylon.parse(code, options);
      const res = await transform(code, this.babelConfig);
      console.log('RNW', this.name, res.code)
      //return await super.parse(res)
      return res.ast
    } else {
      //console.log('normal', this.name)
      return super.parse(code)
    }
  } */
