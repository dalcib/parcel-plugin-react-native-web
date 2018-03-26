var resolvePath = require('babel-plugin-module-resolver')
var resolve = require('resolve')
var path = require('path')

module.exports = {
  //internal: false
  presets: ['env', 'react-native'],
  plugins: [
    /*     [
      'module-resolver',
      {
        alias: {
          'react-native': 'react-native-web',
          'react-native-vector-icons': 'expo-web/dist/exports',
          '@expo/vector-icons': 'expo-web',
          expo: 'expo-web',
        },
      },
    ], */
    'react-native-web',
    'expo-web',
    //'extension-resolver-web',
    'transform-dev',
    /* for preset-expo compatibility    
    'transform-decorators-legacy',
    'transform-exponentiation-operator',
    'transform-export-extensions', 
    */
  ],
}
