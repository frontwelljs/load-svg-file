'use strict'

const gulp = require('gulp')
const debug = require('gulp-debug')
const tap = require('gulp-tap')
const concat = require('gulp-concat')
const merger = require ('lcov-result-merger')
const coveralls = require('gulp-coveralls')

gulp.task('coveralls', () => {
  return gulp
    .src('../coverage/**/lcov.info')
    .pipe(debug())
    //.pipe(merger())
    //.pipe(debug())
    .pipe(concat('lcov.info'))
    .pipe(debug())
    .pipe(tap(function(file) {
      console.log(file.contents.toString())
    }))
    .pipe(coveralls())
})
