'use strict'

const gulp = require('gulp')
const shell = require('shelljs')

gulp.task('versioning', done => {
  const pkg = require('../../package')
  const version = pkg.version

  shell
    .cd('..')
    .exec('git add .')
    .exec(`git commit -m 'Release v${version}'`)
    .exec(`git tag v${version}`)

  done()
})
