/**
 * @file Load SVG files over XHR and embed the SVG content into the DOM.
 * @copyright Richard Szakacs, richardszkcs@gmail.com, www.richardszkcs.com
 * @license MIT
*/

// UMD - returnExports.js - https://github.com/umdjs/umd/blob/master/templates/returnExports.js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.loadSvgFile = factory();
  }
})(typeof self !== 'undefined' ? self : undefined, function () {
  'use strict';

  /**
   * The options of the SVG content loading function.
   *
   * @typedef {Object} optionsType
   *
   * @property {string}  [class='']  - The class of the script tag, in which the content of the SVG file will be loaded.
   * @property {boolean} [hide=true] - Hide the script tag to prevent showing the content of the loaded SVG file.
   */

  /**
   * The SVG content loading callback.
   *
   * @callback callbackType
   *
   * @param {Object} error - The error, that caused the failure.
   */

  /**
   * Loads an SVG file using XHR and embeds its content into the DOM.
   *
   * @function loadSvgFile
   *
   * @param {string}                   url                 - The URL of the SVG file to load.
   *                                                         The .svg extension can be omitted.
   * @param {optionsType|callbackType} [optionsOrCallback] - The options of the SVG file loader or the callback.
   * @param {callback}                 [callback]          - The result callback
   *
   * @returns {Promise|null} Promise if supported and not turned off, otherwise null.
   *
   * @example Loading an SVG file.
   * loadSvgFile('images/icons.svg')
   *
   * @example Loading an SVG file with options.
   * loadSvgFile('images/icons.svg', {
   *  class: 'custom-class', // custom class on the container element
   *  hide: false            // don't hide the container element
   * })
   *
   * @example Loading an SVG file with callback.
   * loadSvgFile('images/icons.svg', function (error) {
   *  if (error) {
   *    throw error
   *  }
   *  console.log('SVG Loaded successfully')
   * })
   *
   * @example Loading an SVG file with options and callback.
   * loadSvgFile(
   *   'images/icons.svg',
   *   {
   *     class: 'custom-class', // custom class on the container element
   *     hide: false            // don't hide the container element
   *   },
   *   function (error) {
   *     if (error) {
   *       throw error
   *     }
   *     console.log('SVG Loaded successfully')
   *   }
   * )
   *
   * @example Loading an SVG file using promises.
   * loadSvgFile('images/icons.svg')
   *   .then(() => console.log('SVG Loaded successfully'))
   *   .catch(error => console.log(error))
   *
   * @example Loading an SVG file, omitting the extension.
   * loadSvgFile('images/icons')
   */
  function loadSvgFile(url, optionsOrCallback, callback) {
    var type = typeof url;

    if (!url || type !== 'string') {
      type = type !== 'string' ? type : 'empty ' + type;

      throw new Error('The url must be a non-empty string, got: "' + type + '".');
    }

    // check if the url has the .svg extension, otherwise append to it automatically
    if (url.lastIndexOf('.svg') !== url.length - 4) {
      url += '.svg';
    }

    var options = optionsOrCallback || {};

    type = typeof optionsOrCallback;

    if (optionsOrCallback && type === 'object') {
      options = optionsOrCallback;
    } else if (type === 'function') {
      options = {};
      callback = optionsOrCallback;
    }

    //const usePromise = typeof options.usePromise === 'boolean' ? options.usePromise : true

    var promise = void 0;
    var resolve = void 0;
    var reject = void 0;

    //if(usePromise && typeof Promise !== "undefined"){
    if (typeof Promise !== "undefined") {
      promise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
      });
    }

    //console.log('usePromise', usePromise, Promise)

    var xhr = new XMLHttpRequest();

    xhr.onloadend = xhr.onerror = function () {
      if (xhr.status === 200) {
        var element = document.createElement('div');
        element.innerHTML = xhr.response;

        var elementClass = typeof options.class === 'string' ? options.class : '';

        if (elementClass.length > 0) {
          element.className = elementClass;
        }

        var hideElement = typeof options.hide === 'boolean' ? options.hide : true;

        if (hideElement) {
          element.style.display = 'none';
        }

        document.body.appendChild(element);

        if (callback) {
          callback();
        } else if (promise) {
          resolve();
        }
      } else {
        var error = new Error('Cannot load SVG file: "' + url + '".');

        if (callback) {
          callback(error);
        } else if (promise) {
          reject(error);
        }
      }
    };

    xhr.open('get', url, true);
    xhr.send(null);

    return promise || null;
  }

  return loadSvgFile;
});