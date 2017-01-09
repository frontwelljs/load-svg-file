'use strict'

const p = require('path')

const assert = require('chai').assert
const pti = require('puppeteer-to-istanbul')
const util = require('../../task/util')

const type = process.argv[process.argv.length - 1]

let port
let url
let browser
let page

describe('loadSvgFile', async function () {
  this.timeout(10000)

  before(async () => {
    const connect = require('connect')
    const serveStatic = require('serve-static')

    port = await util.getFreePort()
    url = util.getUrl(port)

    let file

    switch (type) {
      default:
      case '--type-es5':
        file = 'index.html'
        break

      case '--type-es5-min':
        file = 'index-min.html'
        break

      case '--type-amd':
        file = 'index-amd.html'
        break

      case '--type-amd-min':
        file = 'index-amd-min.html'
        break

      case '--type-commonjs':
        file = 'index-commonjs.html'
        break

      case '--type-umd-browser':
        file = 'index-umd-browser.html'
        break

      case '--type-umd-browser-min':
        file = 'index-umd-browser-min.html'
        break

      case '--type-umd-amd':
        file = 'index-umd-amd.html'
        break

      case '--type-umd-amd-min':
        file = 'index-umd-amd-min.html'
        break

      case '--type-umd-commonjs':
        file = 'index-umd-commonjs.html'
        break

      case '--type-umd-commonjs-min':
        file = 'index-umd-commonjs-min.html'
        break

      case '--type-es6':
        file = 'index-es6.html'
        break
    }

    // start server
    await connect()
      .use(serveStatic(p.normalize(`${__dirname}/../../`), {index: `test/headless/${file}`}))
      .listen(port)

    // run headless browser
    const puppeteer = require('puppeteer')
    browser = await puppeteer.launch({
      timeout: 10000,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    page = await browser.newPage()

    // enable coverage
    await page.coverage.startJSCoverage()
    await page.goto(`${url}`)

    // wait for everything to load
    await page.evaluate(async () => {
      return new Promise((resolve) => {
        const id = setInterval(() => {
          if (typeof loadSvgFile === 'function') {
            clearInterval(id)
            resolve()
          }
        }, 0)
      })
    })
  })

  after(async () => {
    // save coverage
    const jsCoverage = await page.coverage.stopJSCoverage()
    pti.write(jsCoverage)

    await browser.close()
    setTimeout(() => process.exit(), 0)
  })

  beforeEach(async () => {
    await page.evaluate(() => Container.clear())
  })

  afterEach(async () => {
    await page.evaluate(() => Container.clear())
  })

  describe('when called improperly', () => {
    it('should throw errors, when called with non-valid arguments', async () => {
      const result = await page.evaluate(() => {
        const errors = []

        TestEnvironment.disablePromise()

        try { loadSvgFile() } catch (error) { errors.push(error.message) }
        try { loadSvgFile(null) } catch (error) { errors.push(error.message) }
        try { loadSvgFile('') } catch (error) { errors.push(error.message) }
        try { loadSvgFile(1) } catch (error) { errors.push(error.message) }

        TestEnvironment.enablePromise()

        return errors
      })

      assert.deepEqual(result, [
        'The url must be a non-empty string, got: "undefined".',
        'The url must be a non-empty string, got: "object".',
        'The url must be a non-empty string, got: "empty string".',
        'The url must be a non-empty string, got: "number".'
      ])
    })

    it('should throw an error, when trying to load a non-existent SVG file', async () => {
      const file = 'test/util/non-existent-content.svg'

      const result = await page.evaluate(async (file) => {
        return (() => new Promise(resolve => {
          loadSvgFile(file, error => {
            resolve({
              errorMessage: error.message,
              containsSvg: Container.containsSvg()
            })
          })
        }))()
      }, file)

      assert.equal(result.errorMessage, `Cannot load SVG file: "${file}".`)
      assert.equal(result.containsSvg, false)
    })
  })

  describe('when called properly', () => {
    it('should load an SVG file, no callback', async () => {
      const result = await page.evaluate(async () => {
        loadSvgFile('test/util/content.svg')

        return (() => new Promise(resolve => {
          Container.check(() => resolve({
            containerExists: Container.exists(),
            containsSvg: Container.containsSvg()
          }))
        }))()
      })

      assert.equal(result.containerExists, true)
      assert.equal(result.containsSvg, true)
    })

    it('should load an SVG file, using a callback', async () => {
      const result = await page.evaluate(async () => {
        return (() => new Promise(resolve => {
          loadSvgFile('test/util/content.svg', () => {
            resolve({
              containerExists: Container.exists(),
              containsSvg: Container.containsSvg()
            })
          })
        }))()
      })

      assert.equal(result.containerExists, true)
      assert.equal(result.containsSvg, true)
    })

    it('should load an SVG file, using custom options and a callback', async () => {
      const result = await page.evaluate(async () => {
        return (() => new Promise(resolve => {
          loadSvgFile('test/util/content.svg', {}, () => {
            resolve({
              containerExists: Container.exists(),
              containsSvg: Container.containsSvg()
            })
          })
        }))()
      })

      assert.equal(result.containerExists, true)
      assert.equal(result.containsSvg, true)
    })

    it('should load an SVG file, even without ".svg" extension', async () => {
      const result = await page.evaluate(async () => {
        return (() => new Promise(resolve => {
          loadSvgFile('test/util/content', () => {
            resolve({
              containerExists: Container.exists(),
              containsSvg: Container.containsSvg()
            })
          })
        }))()
      })

      assert.equal(result.containerExists, true)
      assert.equal(result.containsSvg, true)
    })
  })

  describe('when called with custom options', () => {
    it('should load an SVG file with custom class on the container element', async () => {
      const customClass = 'custom-class'

      const result = await page.evaluate(async (customClass) => {
        loadSvgFile('test/util/content.svg', { class: customClass })

        return (() => new Promise(resolve => {
          Container.check(() => resolve({ hasClass: Container.hasClass(customClass) }))
        }))()
      }, customClass)

      assert.equal(result.hasClass, true)
    })

    it('should load an SVG file without hiding the container element', async () => {
      const result = await page.evaluate(async () => {
        loadSvgFile('test/util/content.svg', { hide: false })

        return (() => new Promise(resolve => {
          Container.check(() => resolve({ isVisible: Container.isVisible() }))
        }))()
      })

      assert.equal(result.isVisible, true)
    })
  })

  describe('when called, where Promise is available', () => {
    it('should try to load an SVG file and reject it, when there was an error', async () => {
      const file = 'test/util/non-existent-content.svg'

      let contains

      try {
        await page.evaluate(async (file) => loadSvgFile(file), file)
      } catch (error) {
        let message = error.message
        contains = message.indexOf(`Cannot load SVG file: "${file}".`) > -1
      }

      assert.equal(contains, true)

      const containsSvg = await page.evaluate(() => Container.containsSvg())

      assert.equal(containsSvg, false)
    })

    it('should load an SVG file and resolve it, when loaded - ES2015 syntax (new Promise())', async () => {
      await page.evaluate(async () => {
        const promise = loadSvgFile('test/util/content.svg')

        return new Promise(resolve => promise.then(() => resolve()))
      })

      const containsSvg = await page.evaluate(() => Container.containsSvg())

      assert.equal(containsSvg, true)
    })

    it('should load an SVG file and resolve it, when loaded - ES2017 syntax (async/await)', async () => {
      await page.evaluate(async () => loadSvgFile('test/util/content.svg'))

      const containsSvg = await page.evaluate(() => Container.containsSvg())

      assert.equal(containsSvg, true)
    })
  })

  describe('when called, where Promise is not available', () => {
    it('should load an SVG file', async () => {
      const result = await page.evaluate(async () => {
        const _Promise = TestEnvironment.getPromise()

        TestEnvironment.disablePromise()

        const result = new _Promise(resolve => {
          const returnValue = loadSvgFile('test/util/content.svg', () => {
            resolve({
              returnValue: returnValue,
              containerExists: Container.exists(),
              containsSvg: Container.containsSvg()
            })
          })
        })

        TestEnvironment.enablePromise()

        return result
      })

      assert.equal(result.returnValue, null)
      assert.equal(result.containerExists, true)
      assert.equal(result.containsSvg, true)
    })
  })
})
