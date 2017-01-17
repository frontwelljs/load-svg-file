'use strict'

const gulp = require('gulp')

require('./build')
require('./bump')
require('./coveralls')
require('./doc')
require('./serve')

gulp.task('default', ['build'])
