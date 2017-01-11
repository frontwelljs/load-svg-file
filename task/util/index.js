'use strict'

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

module.exports = {
  getHost,
  getFreePort,
  getUrl
}
