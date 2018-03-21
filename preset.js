module.exports = {
  //internal: false
  presets: ['env', 'react-native'],
  plugins: [
    'extension-resolver-web',
    'expo-web',
    'react-native-web',
    'dev-expression',
    /*     
    'transform-decorators-legacy',
    'transform-exponentiation-operator',
    'transform-export-extensions', 
    */
  ],
}
