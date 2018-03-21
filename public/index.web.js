import React from 'react'
import { AppRegistry } from 'react-native'
import App from './../src/App'

AppRegistry.registerComponent('App', () => App)
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root'),
})

/*
"web": "parcel public/index.html --open",
"build": "parcel build public/index.web.js"
*/
