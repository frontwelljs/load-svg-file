'use strict'

const freePort = require('get-port')

const HOST = '127.0.0.1'
const PORT = 8080

function getHost () {
  return HOST
}

async function getFreePort () {
  return await freePort({ port: PORT })
}

function getUrl (port = PORT) {
  const host = getHost()

  return `http://${host}:${port}`
}

module.exports = {
  getHost,
  getFreePort,
  getUrl
}
