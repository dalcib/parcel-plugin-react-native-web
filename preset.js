module.exports = {
  //internal: false
  presets: ['env', 'react-native'],
  plugins: [
    'extension-resolver-web',
    'expo-web',
    'react-native-web',
    'transform-dev',
    /* for preset-expo compatibility    
    'transform-decorators-legacy',
    'transform-exponentiation-operator',
    'transform-export-extensions', 
    */
  ],
}
