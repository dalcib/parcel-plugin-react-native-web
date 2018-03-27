const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
const inputPath = `${__dirname}/samples/App.js`
const outputPath = `${__dirname}/samples/output.js`
const utils = require('./../lib/utils')
let Bundler = require(utils.getParcelPath())

describe('#initialization', () => {
  const plugin = require('./../lib/index')
  let bundler = new Bundler(inputPath)
  plugin(bundler)
  const jsAsset = 'parcel-plugin-react-native-web/lib/RNWAsset'

  it('rnw plugin should be a function', () => expect(typeof plugin).toBe('function'))

  it('should define RNWAsset as the js asset', () =>
    expect(bundler.parser.extensions['.js'].includes(jsAsset)).toBeTruthy())
  it('should define RNWAsset as the .web.js asset', () =>
    expect(bundler.parser.extensions['.web.js'].includes(jsAsset)).toBeTruthy())
})

describe('#transform', () => {
  const plugin = require('./../lib/index')
  let bundler = new Bundler(inputPath, {
    watch: false,
  })
  pugin(bundler)

  it('should transform the jsx in input.js', async () => {
    expect.assertions(1)
    const result = await bundler.bundle()
    const output = await readFile(outputPath, 'utf8')
    expect(result.entryAsset.generated.js).toEqual(output)
  })
})
