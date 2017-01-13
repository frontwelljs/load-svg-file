'use strict'

const gulp = require('gulp')
const jsdoc2md = require('jsdoc-to-markdown')
const fs = require('fs-extra')

const util = require('../util')
const path = util.path

gulp.task('doc', async () => {
  const output = await jsdoc2md.render({
    files: path.root('/src/index.js'),
    partial: path.root('/src/doc/**/*.hbs'),
    'no-gfm': true // https://github.com/jsdoc2md/jsdoc-to-markdown/issues/110
  })

  await fs.writeFile(path.root('/doc/API.md'), output)
})
