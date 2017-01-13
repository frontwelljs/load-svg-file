'use strict'

const gulp = require('gulp')

require('./build')
require('./doc')
require('./serve')
require('./coveralls')

gulp.task('default', ['build'])
