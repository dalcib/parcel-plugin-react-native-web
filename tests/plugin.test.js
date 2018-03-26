const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
const inputPath = `${__dirname}/samples/input.js`
const outputPath = `${__dirname}/samples/output.js`

describe('#initialization', () => {
  const plugin = require('../index')
  const Bundler = require('parcel-bundler')
  let bundler = new Bundler(inputPath)
  plugin(bundler)
  const jsAsset = 'parcel-plugin-surplus/lib/js-asset'
  const tsAsset = 'parcel-plugin-surplus/lib/ts-asset'

  it('surplus plugin should be a function', () => expect(typeof plugin).toBe('function'))

  it('should define SurplusAsset as the js asset', () =>
    expect(bundler.parser.extensions['.js'].includes(jsAsset)).toBeTruthy())
  it('should define SurplusAsset as the js asset', () =>
    expect(bundler.parser.extensions['.web.js'].includes(jsAsset)).toBeTruthy())
})

describe('#transform', () => {
  const Bundler = require('parcel-bundler')
  const plugin = require('../index')
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
