'use strict'

const gulp = require('gulp')
const chalk = require('chalk')
const semver = require('semver')
const fs = require('fs-extra')

const util = require('../util')
const path = util.path

gulp.task('bump', async () => {
  const pkg = require('../../package')

  let type = process.argv[process.argv.length - 1]

  if (type && type.startsWith('--')) {
    type = type.substr(2)
  }

  switch (type) {
    case 'major':
    case 'minor':
    case 'patch':
      break

    default:
      type = 'patch'
      break
  }

  const oldVersion = pkg.version
  const newVersion = semver.inc(oldVersion, type)

  console.log(`
  Bumped from ${chalk.blue.bold(oldVersion)} to ${chalk.magenta.bold(newVersion)}
  `)

  pkg.version = newVersion
  await fs.writeFile(path.root('/package.json'), JSON.stringify(pkg, null, 2))
})
