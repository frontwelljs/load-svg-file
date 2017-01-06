'use strict'

const p = require('path')

const freePort = require('get-port')
//const fs = require('fs-extra')

const HOST = '127.0.0.1'
const PORT = 8080

/**
 * Returns the default host.
 *
 * @returns {string}
 */
function getHost () {
  return HOST
}

/**
 * Returns a free port. The default port is 8080.
 *
 * @returns {Promise<*>}
 */
async function getFreePort () {
  return freePort({ port: PORT })
}

/**
 * Returns the default URL.
 *
 * @param {number|string} port - The port, which will be used in the URL.
 *
 * @returns {string} The URL with the given port.
 */
function getUrl (port = PORT) {
  const host = getHost()

  return `http://${host}:${port}`
}

/**
 * Saves the recent code coverage partial to its own directory.
 *
 * @param {string} partialName
 */
/*
async function saveCoveragePartial (partialName) {
  const root = p.normalize(`${__dirname}/../../`)
  console.log(root)

  const main = p.normalize(`${root}/coverage`)
  console.log(main)

  // create coverage dir if doesn't exist
  if (!fs.pathExistsSync(main)) {
    console.log(`${main} doesn't exist, create it`)
    fs.mkdirsSync(main)
  }

  // move partial coverage report to the main coverage dir
  const partial = p.normalize(`${root}/coverage-partial`)
  console.log(partial)

  // wait for coverage partial
  if (!fs.pathExistsSync(partial)) {
    await (() => new Promise(resolve => {
      let i = 0
      const id = setInterval(() => {
        console.log(i++)
        if (fs.pathExistsSync(partial)) {
          clearInterval(id)
          resolve()
        }
      }, 0)

    }))()
  }

  if (!fs.pathExistsSync(partial)) {
    throw new Error(`Coverage partial doesn't exist at: "${partial}".`)
  }

  //fs.moveSync(partial, main)



  //debugger;
}
*/

module.exports = {
  getHost,
  getFreePort,
  getUrl
  //saveCoveragePartial
}
