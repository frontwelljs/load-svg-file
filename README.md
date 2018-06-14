load-svg-file
=============

[![Build Status](https://travis-ci.org/atjse/load-svg-file.svg?branch=master)](https://travis-ci.org/atjse/load-svg-file)
[![Coverage Status](https://coveralls.io/repos/github/atjse/load-svg-file/badge.svg?branch=master)](https://coveralls.io/github/atjse/load-svg-file?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Load **SVG files over XHR** and embed the SVG content **into the DOM**.
Compatible with every module type, environment, and variety (browser, Node.js, 
AMD, CommonJS, UMD, ES2015-2017) and uses Promises, where available.

Installation
============

```bash
# Using NPM
npm install load-svg-file --save

# Using Yarn
yarn add load-svg-file

# Using CDN - development
https://cdn.jsdelivr.net/npm/load-svg-file/dist/load-svg-file.js

# Using CDN - production (source map included besides the file)
https://cdn.jsdelivr.net/npm/load-svg-file/dist/load-svg-file.min.js
```

To use **CDN with SRI** [*(Subresource Integrity)*][1], 
check out the [**jsdelivr**][2] page and get the hash there.

Usage
=====

```javascript
// Loading an SVG file.
loadSvgFile('images/icons.svg')

// Loading an SVG file with options.
loadSvgFile('images/icons.svg', {
 class: 'custom-class', // custom class on the container element
 hide: false            // don't hide the container element
})

// Loading an SVG file with callback.
loadSvgFile('images/icons.svg', function (error) {
 if (error) {
   throw error
 }
 console.log('SVG Loaded successfully')
})

// Loading an SVG file with options and callback.
loadSvgFile(
  'images/icons.svg',
  {
    class: 'custom-class', // custom class on the container element
    hide: false            // don't hide the container element
  },
  function (error) {
    if (error) {
      throw error
    }
    console.log('SVG Loaded successfully')
  }
)
```

```javascript
// With RequireJS (AMD).
require(['loadSvgFile'], function (loadSvgFile) {
  console.log('loadSvgFile ready')
})

// In Node.js (CommonJS) or with Browserify.
const loadSvgFile = require('load-svg-file')

// In ES6 (e.g.: with Babel)
import loadSvgFile from 'load-svg-file'

// In ES2015
loadSvgFile('images/icons.svg')
  .then(() => console.log('SVG Loaded successfully'))

// In ES2017
await loadSvgFile('images/icons.svg')
```

For more, check out the [**documentation**](doc/API.md), 
[**examples**](example) and the [**tests**](test/src/tests.js).

Contribution
============

**Any contribution is appreciated**. To get going, check out the 
[**contribution guidelines**](CONTRIBUTING.md), then the 
[**development manual**](DEVELOPMENT.md).

**Thank you, have fun!**

License
=======

[MIT](LICENSE.md) @ [Richard Szakacs](https://www.github.com/richardszkcs)

 [1]: https://hacks.mozilla.org/2015/09/subresource-integrity-in-firefox-43/
 [2]: https://www.jsdelivr.com/package/npm/load-svg-file?path=dist
