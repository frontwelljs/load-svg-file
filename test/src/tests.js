'use strict'

describe('loadSvgFile', function () {
  beforeEach(() => Container.clear())
  afterEach(() => Container.clear())

  describe('when called improperly', () => {
    it('should throw errors, when called with non-valid arguments', () => {
      TestEnvironment.disablePromise()

      assert.throws(() => loadSvgFile(), 'The url must be a non-empty string, got: "undefined".')
      assert.throws(() => loadSvgFile(null), 'The url must be a non-empty string, got: "object".')
      assert.throws(() => loadSvgFile(''), 'The url must be a non-empty string, got: "empty string".')

      TestEnvironment.enablePromise()
    })

    it('should throw an error, when trying to load a non-existent SVG file', (done) => {
      const file = 'test/utils/non-existent-content.svg'

      loadSvgFile(file, (error) => {
        assert.throws(() => { throw error }, `Cannot load SVG file: "${file}".`)
        assert(!Container.containsSvg())
        done()
      })
    })
  })

  describe('when called properly', () => {
    it('should load an SVG file, no callback', (done) => {
      loadSvgFile('test/utils/content.svg')
      Container.check(() => {
        assert(Container.containsSvg())
        done()
      })
    })

    it('should load an SVG file, using a callback', (done) => {
      loadSvgFile('test/utils/content.svg', () => {
        assert(Container.containsSvg())
        done()
      })
    })

    it('should load an SVG file, using custom options and a callback', (done) => {
      loadSvgFile('test/utils/content.svg', {}, () => {
        assert(Container.containsSvg())
        done()
      })
    })

    it('should load an SVG file, even without ".svg" extension', (done) => {
      loadSvgFile('test/utils/content', () => {
        assert(Container.containsSvg())
        done()
      })
    })
  })

  describe('when called with custom options', () => {
    it('should load an SVG file with custom class on the container element', (done) => {
      const customClass = 'custom-class'

      loadSvgFile('test/utils/content.svg', {class: customClass})

      Container.check(() => {
        assert(Container.hasClass(customClass))
        done()
      })
    })

    it('should load an SVG file without hiding the container element', (done) => {
      loadSvgFile('test/utils/content.svg', {hide: false})

      Container.check(() => {
        assert(Container.isVisible())
        done()
      })
    })
  })

  describe('when called, where Promise is available', () => {
    it('should try to load an SVG file and reject it, when there was an error', (done) => {
      const file = 'test/utils/non-existent-content.svg'

      loadSvgFile(file)
        .then(() => done())
        .catch((error) => {
          assert.equal(error.message, `Cannot load SVG file: "${file}".`)
          assert(!Container.containsSvg())
          done()
        })
        .catch(done)
    })

    it('should load an SVG file and resolve it, when loaded - ES2015 syntax (new Promise(...))', (done) => {
      const loadPromise = loadSvgFile('test/utils/content.svg')
      const newPromise = new Promise(resolve => loadPromise.then(() => resolve()))

      newPromise.then(() => {
        assert(Container.containsSvg())
        done()
      })
    })

    it('should load an SVG file and resolve it, when loaded - ES2017 syntax (async/await)', async () => {
      await loadSvgFile('test/utils/content.svg')

      assert(Container.containsSvg())
    })
  })

  describe('when called, where Promise is not available', () => {
    it('should load an SVG file', (done) => {
      TestEnvironment.disablePromise()

      const returnValue = loadSvgFile('test/utils/content.svg', () => {
        assert(returnValue === null)
        assert(Container.exists())
        assert(Container.containsSvg())

        TestEnvironment.enablePromise()
        done()
      })
    })
  })
})
