Development Manual
==================

**DISCUSS, CLONE, DEVELOP, COMMIT, PROFIT**

Tools
-----

 - Tasks: [**Gulp**][1]
 - Tests: [**Mocha**][2]
 - Style: [**StandardJS**][3]
 - Catalyst: [**Coffee**][4]

Structure
---------

The main and only source is **src/index.js**, which will be then used 
to embed, transform, and generate different variants 
*(browser, CommonJS, AMD, UMD, ES6, etc.)*. 

 - **dist**: distributable variants of loadSvgFile 
             *(development, production, source maps)*
 - **doc**: generated API documentation based on the source's JSDoc
 - **example**: usage examples to help out people
 - **src**: **the one source, mighty and precious** 
            *(...also doc and variant templates)*
 - **task**: organized Gulp tasks
 - **test**: several headless tests *(to test all variants in the /dist)* 
             and local server test *(to test src/index.js)*

Main NPM commands
----------------- 

```bash
# Run local server to develop and test src/index.js with livereload, 
# the url will be displayed upon start
npm run serve

# Check coding style
npm run check

# Build all variants (browser, CommonJS, AMD, UMD, ES6, etc.) 
# based on the templates (src/tmpl) using src/index.js
npm run build

# Runs all test variants using the recent builds from the /dist directory
# and also test the code coverage of the src/index.js
npm run test

# Generates the documentation in doc/API.md
npm run doc

# Prepares (check, test, and build) the project before commit 
npm run prepare
```

HAVE FUN!
---------

 [1]: https://gulpjs.com/
 [2]: https://mochajs.org/
 [3]: https://standardjs.com/
 [4]: https://twitter.com/richardszkcs/status/1006990821709766658
