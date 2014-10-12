'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.emojs_compiler = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  default_options: function (test) {
    test.expect(3);

    var actual = grunt.file.read('tmp/default_options.js');
    var expected = grunt.file.read('test/expected/default_options.js');
    test.equal(actual, expected, 'Proof of concept find and replace');

    actual = grunt.file.read('tmp/test2.js');
    expected = grunt.file.read('test/expected/test2.js');
    test.equal(actual, expected, 'Find Single Emoji and replace with Ascii-compat letter');

    actual = grunt.file.read('tmp/test3.js');
    expected = grunt.file.read('test/expected/test3.js');
    test.equal(actual, expected, 'Find Single Emoji and not replace due to escape character');

    test.done();
    }
};
