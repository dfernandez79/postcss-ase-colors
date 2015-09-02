postcss-ase-colors
==================

[![Build Status][ci-img]][ci]
[ci-img]:  https://travis-ci.org/dfernandez79/postcss-ase-colors.svg
[ci]:      https://travis-ci.org/dfernandez79/postcss-ase-colors

[PostCSS] plugin that replaces color values from an [Adobe Swatch Exchange] file. 

ASE files are color palettes used by mainly by Adobe products: Photoshop, Illustrator, InDesign, and Kuler. The file is read using the [ase-util] package.
  
[Adobe Swatch Exchange]: https://helpx.adobe.com/illustrator/using/using-creating-swatches.html
[PostCSS]: https://github.com/postcss/postcss
[ase-util]: https://github.com/dfernandez79/ase-util

For example if you have an ASE file that defines a color named **brand**, processing a CSS with
`.selector { color: brand; }` it will replace `brand` with the hex color value in your ASE file.

Installation
------------

```
npm install postcss-ase-colors --save-dev
```

Usage
-----

```js
var postcss = require('postcss');
var aseColors = require('postcss-ase-colors');

var css = fs.readFileSync('input.css', 'utf8');

var output = postcss()
  .use(aseColors({file: 'myColors.ase'}))
  .process(css)
  .css;
```
