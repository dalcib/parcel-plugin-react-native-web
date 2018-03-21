const resolve = require('resolve')
const path = require('path')
const fs = require('fs')

function resolvePath(sourcePath, currentFile, opts) {
  if (sourcePath.match(/(react-native-vector-icons|@expo\/vector-icons)/g)) {
    try {
      resolve.sync('expo-web')
    } catch (error) {
      return sourcePath
    }
    return sourcePath.replace(/(react-native-vector-icons|@expo\/vector-icons)/g, 'expo-web')
  }

  if (sourcePath.match(/(react|react-dom|react-native|expo|react-navigation)/g)) {
    return sourcePath
  }

  return resolve.sync(sourcePath, {
    basedir: path.resolve(currentFile, '..'),
    extensions: ['.web.js', '.js'],
    packageFilter: function(pkg) {
      if (pkg.main /* && sourcePath[0] !== '.' */) {
        pkg.main = pkg.main.match(/(.+?)\.[^.]*$|$/)[1] || pkg.main
      }
      return pkg
    },
  })
}

function mapPathString(nodePath, state) {
  if (!state.types.isStringLiteral(nodePath)) {
    return
  }
  const sourcePath = nodePath.node.value
  const currentFile = state.file.opts.filename
  const modulePath = resolvePath(sourcePath, currentFile, state.opts)
  if (modulePath) {
    if (nodePath.node.pathResolved) {
      return
    }
    nodePath.replaceWith(state.types.stringLiteral(modulePath))
    nodePath.node.pathResolved = true
  }
}

const importVisitors = {
  'ImportDeclaration|ExportDeclaration': (nodePath, state) => {
    mapPathString(nodePath.get('source'), state)
  },
}

module.exports = ({ types }) => ({
  name: 'extension-resolver',

  pre(file) {
    this.types = types
  },

  visitor: {
    Program: {
      enter(programPath, state) {
        programPath.traverse(importVisitors, state)
      },
    },
  },
})
