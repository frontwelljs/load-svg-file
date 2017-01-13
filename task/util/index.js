'use strict'

const p = require('path')

const freePort = require('get-port')

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
 * Normalizes the given path.
 *
 * @param {string} path - The path to be normalized.
 *
 * @returns {string} The normalized path.
 */
function path (path) {
  return path.normalize(path)
}

/**
 * Normalizes the given path relative to the project's root directory.
 *
 * @param {string} path - The path to normalize relative to the project's root directory.
 *
 * @returns {string} The normalized path.
 */
path.root = function (path) {
  return p.normalize(`${__dirname}/../../${path}`)
}

module.exports = {
  getHost,
  getFreePort,
  getUrl,
  path
}
