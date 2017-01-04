// UMD - returnExports.js - https://github.com/umdjs/umd/blob/master/templates/returnExports.js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.loadSvgFile = factory()
  }
}(typeof self !== 'undefined' ? self : this, function () {
  // {{source}}
  return loadSvgFile
}))
