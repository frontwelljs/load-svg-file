'use strict'

const p = require('path')

const gulp = require('gulp')
const connect = require('connect')
const serveStatic = require('serve-static')
const livereload = require('livereload')
const util = require('../util')

function path (relativePath) {
  return p.normalize(`${__dirname}/${relativePath}`)
}

gulp.task('serve', async () => {
  const port = await util.getFreePort()
  const url = util.getUrl(port)

  // create static server
  connect()
    .use(serveStatic(path('../../'), {index: 'test/src/index.html'}))
    .listen(port, () => console.log(`Server running at: ${url}`))

  // init livereload
  livereload
    .createServer()
    .watch([
      path('../../test'),
      path('../../src')
    ])
})
