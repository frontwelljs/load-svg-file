'use strict'

/**
 * @typedef {Object} optionsObject
 *
 * @property {string}  [class='']  - The class of the script tag, in which the content of the SVG file will be loaded.
 * @property {boolean} [hide=true] - Hide the script tag to prevent showing the content of the loaded SVG file.
 */

/**
 * Loads an SVG file using XHR and embeds its content into the DOM.
 *
 * @function loadSvgFile
 *
 * @param {string}        url       - The URL of the SVG file to load. The .svg extension can be omitted.
 * @param {optionsObject} [options] - The options of the SVG file loader.
 *
 * @example Loading an SVG
 * loadSvgFile('images/icons.svg')
 *
 * @example Loading an SVG, omitting the extension
 * loadSvgFile('images/icons')
 */
function loadSvgFile (url, options) {
  const urlType = typeof url

  if (!url || urlType !== 'string') {
    throw new Error(`The url must be a non-empty string, got:"${urlType}".`)
  }

  // check if the url has the .svg extension, otherwise append to it automatically
  if (url.lastIndexOf('.svg') !== url.length - 4) {
    url += '.svg'
  }

  const xhr = new XMLHttpRequest()

  xhr.onload = function () {
    let div = document.createElement('div')
    div.innerHTML = this.responseText

    options = options || {}
    const elementClass = typeof options.class === 'boolean' ? options.class : ''

    if (elementClass) {
      div.className = elementClass
    }

    const hideElement = typeof options.hide === 'boolean' ? options.hide : true

    if (hideElement) {
      div.style.display = 'none'
    }

    const scripts = document.getElementsByTagName('script')
    const script = scripts[scripts.length - 1]

    script.parentNode.insertBefore(div, script)
  }

  xhr.open('get', url, true)
  xhr.send()
}

module.exports = loadSvgFile
