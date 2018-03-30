
module.exports = {
  //internal: false
  presets: ['env', 'react-native'],
  plugins: [
    require('./babel-plugin'),
    'react-native-web',
    'expo-web',
    'transform-dev',
    /* for babel-preset-expo compatibility    
    'transform-decorators-legacy',
    'transform-exponentiation-operator',
    'transform-export-extensions', 
    */
  ],
}
