'use strict'

const gulp = require('gulp')
const debug = require('gulp-debug')
const tap = require('gulp-tap')
const coveralls = require('gulp-coveralls')

gulp.task('coveralls', () => {
  const pkg = require('../../package')

  return gulp
    .src('../coverage/lcov.info')
    .pipe(tap(file => {
      let content = file.contents.toString()

      content = content.replace(/(SF):(.*index.js)/, (matches, prefix) => `${prefix}:${pkg.name}.js`)

      file.contents = Buffer.from(content)
    }))
    .pipe(coveralls())
})
