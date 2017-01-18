<a name="loadSvgFile"></a>

## loadSvgFile(url, [optionsOrCallback], [callback]) ⇒ <code>Promise</code> \| <code>null</code>
Loads an SVG file using XHR and embeds its content into the DOM.

**Returns**: <code>Promise</code> \| <code>null</code> - Promise, where available, otherwise null.  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>url</td><td><code>string</code></td><td><p>The URL of the SVG file to load.
                                                        The .svg extension can be omitted.</p>
</td>
    </tr><tr>
    <td>[optionsOrCallback]</td><td><code><a href="#optionsType">optionsType</a></code> | <code><a href="#callbackType">callbackType</a></code></td><td><p>The options of the SVG file loader or the callback.</p>
</td>
    </tr><tr>
    <td>[callback]</td><td><code><a href="#callbackType">callbackType</a></code></td><td><p>The result callback</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// Loading an SVG file.
loadSvgFile('images/icons.svg')
```
**Example**  
```js
// Loading an SVG file with options.
loadSvgFile('images/icons.svg', {
 class: 'custom-class', // custom class on the container element
 hide: false            // don't hide the container element
})
```
**Example**  
```js
// Loading an SVG file with callback.
loadSvgFile('images/icons.svg', function (error) {
 if (error) {
   throw error
 }
 console.log('SVG Loaded successfully')
})
```
**Example**  
```js
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
**Example**  
```js
// Loading an SVG file using Promise - ES2015.
loadSvgFile('images/icons.svg')
  .then(() => console.log('SVG Loaded successfully'))
  .catch(error => console.log(error))
```
**Example**  
```js
// Loading an SVG file using async/await - ES2017.
await loadSvgFile('images/icons.svg')
```
**Example**  
```js
// Loading an SVG file, omitting the extension.
loadSvgFile('images/icons')
```
**Example**  
```js
// Using in Node.js (CommonJS).
const loadSvgFile = require('load-svg-file')
```
**Example**  
```js
// Using in ES6.
import loadSvgFile from 'load-svg-file'
```
**Example**  
```js
// Using with RequireJS (AMD).
require(['loadSvgFile'], function (loadSvgFile) {
  console.log('loadSvgFile ready')
})
```
<a name="optionsType"></a>

## optionsType : <code>Object</code>
The options of the SVG content loading function.

**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[class]</td><td><code>string</code></td><td><code>&quot;&#x27;&#x27;&quot;</code></td><td><p>The class of the element, in which the content of the SVG file will be loaded.</p>
</td>
    </tr><tr>
    <td>[hide]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>Hide the element to prevent showing the content of the loaded SVG file.</p>
</td>
    </tr>  </tbody>
</table>

<a name="callbackType"></a>

## callbackType : <code>function</code>
The SVG content loading callback.

<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>error</td><td><code>Error</code></td><td><p>The error, that caused the failure.</p>
</td>
    </tr>  </tbody>
</table>

