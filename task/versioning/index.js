'use strict'

const gulp = require('gulp')
const shell = require('shelljs')

const util = require('../util')
const path = util.path

const pkg = require('../../package')
const version = pkg.version

gulp.task('versioning', done => {
  shell.cd(path.root('/'))
  shell.exec('git add .')
  shell.exec(`git commit -m 'Release v${version}'`)
  shell.exec(`git tag v${version}`)
  shell.exec('git push -u origin master --follow-tags')

  const error = shell.error()

  if (error) {
    console.log(error)
  }

  done()
})
