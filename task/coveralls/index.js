'use strict'

const gulp = require('gulp')
const debug = require('gulp-debug')
const coveralls = require('gulp-coveralls')

gulp.task('coveralls', () => {
  return gulp
    .src('../coverage/**/lcov.info')
    .pipe(coveralls())
})
