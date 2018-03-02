const utils = require('./utils')

module.exports = function(bundler) {
  bundler.addAssetType('js', require.resolve('./RNWAsset'))
  bundler.addAssetType('jsx', require.resolve('./RNWAsset'))
  bundler.addAssetType('web.js', require.resolve('./RNWAsset'))
  bundler.addAssetType('web.jsx', require.resolve('./RNWAsset'))
  bundler.addAssetType(
    'web.ts',
    require.resolve(utils.getParcelPath() + 'lib/assets/TypeScriptAsset')
  )
  bundler.addAssetType(
    'web.tsx',
    require.resolve(utils.getParcelPath() + 'lib/assets/TypeScriptAsset')
  )
}

/* {
  id: 1,
  name: 'C:\\Users\\Dalci\\Playground\\react-native-material-ui-web-app\\src\\index.js',
  basename: 'index.js',
  relativeName: 'index.js',
  package:
   {},
     pkgfile: 'C:\\Users\\Dalci\\Playground\\react-native-material-ui-web-app\\package.json' },
  options:
   { outDir: 'C:\\Users\\Dalci\\Playground\\react-native-material-ui-web-app\\dist',
     outFile: '',
     publicURL: '/dist',
     watch: false,
     cache: false,
     cacheDir: 'C:\\Users\\Dalci\\Playground\\react-native-material-ui-web-app\\.cache',
     killWorkers: true,
     minify: true,
     target: 'browser',
     hmr: false,
     https: false,
     logLevel: 3,
     mainFile: 'C:\\Users\\Dalci\\Playground\\react-native-material-ui-web-app\\src\\index.js',
     hmrPort: 0,
     rootDir: 'C:\\Users\\Dalci\\Playground\\react-native-material-ui-web-app\\src',
     sourceMaps: false,
     hmrHostname: '',
     detailedReport: false,
     extensions:
      { 
        ".web.js': 'C:\\Users\\Dalci\\Playground\\parcel-plugin-react-native-web\\RNWAsset.js',
        '.web.jsx': 'C:\\Users\\Dalci\\Playground\\parcel-plugin-react-native-web\\RNWAsset.js',
        '.web.ts': 'C:\\Users\\Dalci\\AppData\\Local\\Yarn\\config\\global\\node_modules\\parcel-bundler\\lib\\assets\\TypeScriptAsset.js',
        '.web.tsx': 'C:\\Users\\Dalci\\AppData\\Local\\Yarn\\config\\global\\node_modules\\parcel-bundler\\lib\\assets\\TypeScriptAsset.js' },
     bundleLoaders:
      { wasm: 'C:\\Users\\Dalci\\AppData\\Local\\Yarn\\config\\global\\node_modules\\parcel-bundler\\src\\builtins\\loaders\\wasm-loader.js',
        css: 'C:\\Users\\Dalci\\AppData\\Local\\Yarn\\config\\global\\node_modules\\parcel-bundler\\src\\builtins\\loaders\\css-loader.js',
        js: 'C:\\Users\\Dalci\\AppData\\Local\\Yarn\\config\\global\\node_modules\\parcel-bundler\\src\\builtins\\loaders\\js-loader.js' },
     env:
      {  },
     parser:  { extensions: [Object] } },
  encoding: 'utf8',
  type: 'js',
  processed: false,
  contents: null,
  ast: null,
  generated: null,
  hash: null,
  parentDeps:  {},
  dependencies:  {},
  depAssets:  {},
  parentBundle: null,
  bundles:  {},
  cacheData: { env: {} },
  buildTime: 0,
  bundledSize: 0,
  globals:  {},
  isAstDirty: false,
  isES6Module: false
} */
