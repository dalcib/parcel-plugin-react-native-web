# parcel-plugin-react-native-web [alpha]

Parcel plugin to build react-native-web projects without configuration.

**_This project is currently at an earlier stage._**

## Details

This plugin uses internaly the follow babel config:

```
{"presets": "react-native", "plugins": ["react-native-web"]}
```

Other babel configurations in package.json or .babelrc will be merged.

All packages that are dependent of react-native as well the source code of the app will be transpiled with above configuration.
Other packages can be included to be transpiled using the property `parcel-rnw` in the package.json as an array of modules.

It can be used with global install of Parcel.

## Use

#### yarn

```
yarn add parcel-bundler parcel-plugin-react-native-web
yarn parcel public/index.html
yarn parcel build src/index.js
```

#### npm

```
npm i parcel-bundler parcel-plugin-react-native-web
npx parcel public/index.html
npx parcel build src/index.js
```
