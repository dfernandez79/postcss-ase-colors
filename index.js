'use strict';

var postcss = require('postcss');
var parser = require('postcss-value-parser');
var ase = require('ase-util');
var fs = require('fs');

module.exports = postcss.plugin('postcss-ase-colors', function (opts) {
  var colors = {};

  if (opts && opts.file) {
    colors = ase.formatAsColorsObject(ase.read(fs.readFileSync(opts.file)));
  }

  return function (css) {
    if (!opts || !opts.file) {
      throw new Error('postcss-ase-colors must be configured with the ASE file to use');
    }

    css.walkDecls(function (decl) {
      var colorNameFound = false;
      var parsedValue = parser(decl.value);

      parsedValue.walk(function (node) {
        if (node.type === 'word' && colors[node.value]) {
          colorNameFound = true;
          node.value = colors[node.value];
        }
      });

      if (colorNameFound) {
        decl.replaceWith(decl.clone({ value: parsedValue.toString() }));
      }
    });
  };
});
