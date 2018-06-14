'use strict'

const gulp = require('gulp')
const shell = require('shelljs')

gulp.task('versioning', done => {
  const pkg = require('../../package')
  const version = pkg.version

  shell.cd('..')
  shell.exec('git add .')
  shell.exec(`git commit -m 'Release v${version}'`)
  shell.exec(`git tag v${version}`)

  const error = shell.error()

  if (error) {
    console.log(error)
  }

  done()
})
