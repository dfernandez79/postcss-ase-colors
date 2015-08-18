var postcss = require('postcss');
var assert = require('assert');
var plugin = require('../');
var path = require('path');
var processor = postcss([ plugin({file: path.resolve(__dirname, 'fixture.ase')}) ]) ;

function test(input, output) {
  assert.equal(processor.process(input).css, output);
}

describe('postcss-ase-colors', function () {

  it('replaces color names from an ase file', function () {
    test('a { color: brand }', 'a { color: #E5308B }');
  });

  it('can handle color names with spaces', function () {
    test('a { color: some-crazy-color-name-1 }', 'a { color: #2DC1C1 }');
  });

  it('ignores unknown names', function () {
    test('a { color: unknown-name }', 'a { color: unknown-name }');
  });

  it('throws an error if the file option is not defined', function () {
    assert.throws(function () {
      var output = postcss([ plugin() ]).process('.selector { }').css;
    }, 'postcss-ase-colors must be configured with the ASE file to use');
  });

  it('should allow to add the plugin without opts', function () {
    assert.doesNotThrow(function () {
      postcss([ plugin({}) ]);
    });
  });

});
