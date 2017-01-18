'use strict'

const gulp = require('gulp')

require('./build')
require('./bump')
require('./coveralls')
require('./doc')
require('./serve')
require('./versioning')

gulp.task('default', ['build'])
