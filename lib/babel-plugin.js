const resolve = require('resolve')
const path = require('path')
const fs = require('fs')
const utils = require('./utils')

function resolvePath(sourcePath, currentFile, opts) {
  //console.log(sourcePath, currentFile)
  return utils.getWebExtension(sourcePath, currentFile)
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
