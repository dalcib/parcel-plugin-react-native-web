const babel = require('babel-core')
const fs = require('fs')
const path = require('path')
const resolve = require('resolve')

const preset = require('./../lib/preset')

xit('hasExpoWeb', () => {
  expect(!!resolve.sync('expo-web', '..')).toBeTruthy()
})

it(`compiles sample files`, () => {
  let options = {
    babelrc: false,
    presets: [preset],
    sourceMaps: true,
  }

  let samplesPath = path.resolve(__dirname, 'samples')
  let filenames = fs.readdirSync(samplesPath)

  for (let filename of filenames) {
    let { code, map, ast } = babel.transformFileSync(path.join(samplesPath, filename), options)

    expect(code).toBeDefined()
    expect(map).toBeDefined()
    expect(ast).toBeDefined()
  }
})

xit(`aliases react-native-vector-icons`, () => {
  let options = {
    babelrc: false,
    presets: [preset],
    // Make the snapshot easier to read
    retainLines: true,
  }

  let sourceCode = `
import 'react-native-vector-icons';
require('react-native-vector-icons');

imposter.require('react-native-vector-icons');
imposter.import('react-native-vector-icons');
`
  let { code } = babel.transform(sourceCode, options)

  //expect(code).toMatch(/'@expo\/vector-icons'/);
  expect(code).toMatch(/expo-web/)
  expect(code).toMatchSnapshot()
})

xit(`aliases @expo/vector-icons`, () => {
  let options = {
    babelrc: false,
    presets: [preset],
    // Make the snapshot easier to read
    retainLines: true,
  }

  let sourceCode = `
import '@expo/vector-icons';
require('@expo/vector-icons');

imposter.require('@expo/vector-icons');
imposter.import('@expo/vector-icons');
`
  let { code } = babel.transform(sourceCode, options)

  //expect(code).toMatch(/'@expo\/vector-icons'/);
  expect(code).toMatch(/expo-web/)
  expect(code).toMatchSnapshot()
})

it(`composes with babel-plugin-module-resolver`, () => {
  let options = {
    babelrc: false,
    presets: [preset],
    // Make the snapshot easier to read
    retainLines: true,
  }

  let sourceCode = `
import 'react-native';
import 'expo';
`
  let { code } = babel.transform(sourceCode, options)

  //expect(code).toMatch(/expo-web/)
  expect(code).toMatch(/react-native-web/)
  expect(code).toMatchSnapshot()
})

it('replace __DEV__', () => {
  let options = {
    babelrc: false,
    presets: [preset],
    retainLines: true,
  }

  let sourceCode = '(__DEV__)'
  let { code } = babel.transform(sourceCode, options)

  expect(code).toMatchSnapshot()
})

it('web extension local file', () => {
  let options = {
    babelrc: false,
    presets: [preset], // Make the snapshot easier to read
    retainLines: true,
  }

  let sourceCode = `
import './tests/module';
require('./tests/module');

imposter.require('./tests/module');
imposter.import('./tests/module');
`
  let { code } = babel.transform(sourceCode, options)

  expect(code).toMatch(/\.web\.js/)
  expect(code).toMatchSnapshot()
})

it('web extension local folder', () => {
  let options = {
    babelrc: false,
    presets: [preset], // Make the snapshot easier to read
    retainLines: true,
  }

  let sourceCode = `
import './tests/comp';
require('./tests/comp');

imposter.require('./tests/comp');
imposter.import('./tests/comp');
`
  let { code } = babel.transform(sourceCode, options)

  expect(code).toMatch(/\.web\.js/)
  expect(code).toMatchSnapshot()
})
