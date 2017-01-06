'use strict'

const gulp = require('gulp')

require('./build')
require('./serve')
require('./coveralls')

gulp.task('default', ['build'])
