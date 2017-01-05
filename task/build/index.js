'use strict'

const gulp = require('gulp')
const replace = require('gulp-replace')
const header = require('gulp-header')
const rename = require('gulp-rename')
const tap = require('gulp-tap')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')

const path = {
  source: '../src/index.js',
  template: {
    es6: '../src/tmpl/es6.js',
    commonjs: '../src/tmpl/commonjs.js',
    amd: '../src/tmpl/amd.js',
    umd: '../src/tmpl/umd.js'
  },
  dest: '../dist'
}

const pkg = require('../../package')
const dedent = require('dentist').dedent
const name = pkg.name
const placeholder = '// {{source}}'

const license = {
  short: `/*! ${pkg.name} v${pkg.version} | (c) ${pkg.license} @ ${pkg.author} */\n`,
  jsdoc: dedent(`
    /**
     * @file ${pkg.description}
     * @copyright ${pkg.author}
     * @license ${pkg.license}
    */
  `) + '\n\n'
}

/**
 * Returns the content of the source script to use when embedding into different templates.
 *
 * @returns {string} The content of the source script.
 */
function content () {
  const p = require('path')
  const fs = require('fs')

  if (!content.__sourceContent) {
    content.__sourceContent = fs.readFileSync(p.normalize(`${__dirname}/../${path.source}`), 'utf8')
  }
  return content.__sourceContent
}

/**
 * Fixes any issues after Babel's ES6 conversion to ES5.
 *
 * @param {Object} file - The file in the Gulp stream to use.
 */
function fix (file) {
  let fixed = file.contents.toString()

  // replace extra lines between the jsDoc comment and the function
  fixed = fixed.replace(/(\*\/)\n+(function loadSvgFile)/gm, (matches, beginning, end) => `${beginning}\n${end}`)

  // replace extra lines between the jsDoc comment and the function, when indented within a block
  fixed = fixed.replace(/(\*\/)\n+?(\s+function loadSvgFile)/gm, (matches, beginning, end) => `${beginning}${end}`)

  // remove unneeded 'use strict' in amd module;
  fixed = fixed.replace(/'use strict';[\n\s]+(define)/gm, (matches, match) => `${match}`)

  // remove unneeded 'use strict' in umd module;
  fixed = fixed.replace(/'use strict';[\n\s]+(\/\/ UMD)/gm, (matches, match) => `${match}`)

  file.contents = Buffer.from(fixed)
}

/* ---------------------------------------------------------------------------------------------------------------------
 | Development Builds
 */

/* eslint-disable no-multi-spaces */
gulp.task('build.development.es5', () => {
  return gulp                     // quick rundown:
    .src(path.source)             // read the given template
    .pipe(babel())                // convert to ES5
    .pipe(tap(file => fix(file))) // fix any formatting issue
    .pipe(header(license.jsdoc))  // add credits header
    .pipe(rename(`${name}.js`))   // rename the file
    .pipe(gulp.dest(path.dest))   // save to the dist folder
})
/* eslint-enable no-multi-spaces */

gulp.task('build.development.es6', () => {
  return gulp
    .src(path.template.es6)
    .pipe(replace(placeholder, () => content()))
    .pipe(tap(file => fix(file)))
    .pipe(header(license.jsdoc))
    .pipe(rename(`${name}.es6.js`))
    .pipe(gulp.dest(path.dest))
})

gulp.task('build.development.commonjs', () => {
  return gulp
    .src(path.template.commonjs)
    .pipe(replace(placeholder, () => content()))
    .pipe(tap(file => fix(file)))
    .pipe(header(license.jsdoc))
    .pipe(rename(`${name}.commonjs.js`))
    .pipe(gulp.dest(path.dest))
})

gulp.task('build.development.amd', () => {
  return gulp
    .src(path.template.amd)
    .pipe(replace(placeholder, () => content()))
    .pipe(babel())
    .pipe(tap(file => fix(file)))
    .pipe(header(license.jsdoc))
    .pipe(rename(`${name}.amd.js`))
    .pipe(gulp.dest(path.dest))
})

gulp.task('build.development.umd', () => {
  return gulp
    .src(path.template.umd)
    .pipe(replace(placeholder, () => content()))
    .pipe(babel())
    .pipe(tap(file => fix(file)))
    .pipe(header(license.jsdoc))
    .pipe(rename(`${name}.umd.js`))
    .pipe(gulp.dest(path.dest))
})

gulp.task('build.development', [
  'build.development.es5',
  'build.development.es6',
  'build.development.commonjs',
  'build.development.amd',
  'build.development.umd'
])

/* ---------------------------------------------------------------------------------------------------------------------
 | Production Builds
 */

/* eslint-disable no-multi-spaces */
gulp.task('build.production.es5', () => {
  return gulp                                               // quick rundown:
    .src(path.source)                                       // read the template
    .pipe(rename(`${name}.js`))                             // rename before processing to fix the filename in sourcemap
    .pipe(sourcemaps.init())                                // init the sourcemap
    .pipe(babel())                                          // convert to ES5
    .pipe(uglify())                                         // compress
    .pipe(header(license.short))                            // add credits header
    .pipe(rename(`${name}.min.js`))                         // rename
    .pipe(sourcemaps.write(path.dest, {addComment: false})) // save the sourcemap
    .pipe(gulp.dest(path.dest))                             // save the file to dist
})
/* eslint-enable no-multi-spaces */

gulp.task('build.production.amd', () => {
  return gulp
    .src(path.template.amd)
    .pipe(rename(`${name}.amd.js`))
    .pipe(replace(placeholder, () => content()))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(header(license.short))
    .pipe(rename(`${name}.amd.min.js`))
    .pipe(sourcemaps.write(path.dest, {addComment: false}))
    .pipe(gulp.dest(path.dest))
})

gulp.task('build.production.umd', () => {
  return gulp
    .src(path.template.umd)
    .pipe(rename(`${name}.umd.js`))
    .pipe(replace(placeholder, () => content()))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(header(license.short))
    .pipe(rename(`${name}.umd.min.js`))
    .pipe(sourcemaps.write(path.dest, {addComment: false}))
    .pipe(gulp.dest(path.dest))
})

gulp.task('build.production', [
  'build.production.es5',
  'build.production.amd',
  'build.production.umd'
])

// =====================================================================================================================

gulp.task('build', [
  'build.development',
  'build.production'
])
