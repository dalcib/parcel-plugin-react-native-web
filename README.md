# parcel-plugin-react-native-web

Parcel plugin to build react-native-web projects without configuration.

## Quick start

#### yarn

```
yarn [global] add parcel-bundler       // Install Parccel (local or global)
yarn parcel-plugin-react-native-web    // Install the plugin
yarn parcel public/index.html          // Run the server or
yarn parcel build src/index.js         // Compile the App
```

#### npm

```
npm i [-g] parcel-bundler               // Install Parccel (local or global)
npm i parcel-plugin-react-native-web    // Install the plugin
npx parcel public/index.html            // Run the sever or
npx parcel build src/index.js           // Compile the App
```

## Features

* Alias `react-native` to `react-native-web`
* Enable the use of `.web.js` extensions
* Transpile react-native libraries in `node_modules` following this rules:
  * There is a reference to `react-native` in the package.json at `dependencies`, `devDependencies`, `peerDependencies` or `keywords`
  * In case that the rule above doesn't catch the react-native library to transpile, it can be included in the `parcel-rnw` field in the package.json.
  ```
  "parcel-rnw" : ["react-native-xxx"],
  ```
  * To alias one library, use the `alias` field in package.json.
  ```
  "alias": {
    "expo": "expo-web",
    "victory-native": "victory"
  },
  ```
  * The libraries and the source code are compiled with the follow Babel configuration (the local Babel configuration is meged with that for the source code):
  ```
  {
    presets: ['env', 'react-native'],
    plugins: [
      require('./babel-plugin'),  //internal plugin to .web.js
      'react-native-web',
      'expo-web',
      'transform-dev',
    ],
  }
  ```

## Getting started

1.  You can start creating a react-native project, with

* react-native,

```
react-native --init MyApp
```

* or Expo

```
exp --init MyApp
```

* or create-react-native-app

```
create-react-native-app MyApp
```

2.  Install Parcel and the Plugin

```
yarn add parcel-bundler parcel-plugin-react-native-web
```

3.  Create an `public/index.html` file

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>React Native Web App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script src="./../index.web.js"></script>
</html>
```

4.  Create an `index.web.js` file

```js
import React from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import App from './App'

AppRegistry.registerComponent('App', () => App)
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root'),
})
```

5.  Update `.gitignore`

```
.cache
dist
```

6.  Update the scripts in the `package.json`

```
  "scripts": {
    ...
    "web": "parcel public/index.html",
    "build": "parcel build index.web.js"
  },
```

## Expo and vector-icons

The [`expo-web`](https://github.com/raarts/expo-web) library is in an earlier stage, but if you are using `react-native-vector-icons` or `@expo/vector-icons`, it is a good option to automatically inject the icon's fonts in your HTML page.

```
"alias": {
  "@expo/vector-icons": "expo-web",
  "react-native-vector-icons": "expo-web/dist/exports"
}
```
