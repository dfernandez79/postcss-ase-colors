var postcss = require('postcss');
var parser = require('postcss-value-parser');
var ase  = require('ase-util');
var fs = require('fs');

module.exports = postcss.plugin('postcss-ase-colors', function (opts) {
  return function (css) {
    var colors = {};

    if (opts.file) {
      colors = ase.formatAsColorsObject(ase.read(fs.readFileSync(opts.file)));
    } else {
      throw new Error('postcss-ase-colors must be configured with the ASE file to use');
    }

    css.eachDecl(function (decl) {
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
