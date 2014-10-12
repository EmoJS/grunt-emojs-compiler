/*
 * emojs-compiler
 * 127.0.0.1
 *
 * Copyright (c) 2014 RedRiderX
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  // Take source file(s) and pass them into grunt-string-replace, with the EmoJS list as a param
  grunt.registerMultiTask('emojs-compiler', 'Grunt Compiler for EmoJS', function () {

    // Set up dependences
    var punycode = require('punycode');
    var esrever = require('esrever');
    var path = require('path');
    JSON.minify = JSON.minify || require('node-json-minify');

    // Load user options
    var options = this.options({
      definitionsType: 'default',
      definitionsSrc: 'lib/emojs-definitions/definitions.json'
    });

    // find and parse definitionList
    // if (!grunt.file.isFile(options.definitionsSrc)) {
    //   grunt.log.error('Definition list "' + options.definitionsSrc + '" not found.');
    // } else {
      var definitionsAbsolutePath = __dirname + path.sep + options.definitionsSrc;

      var definitionList = JSON.parse(JSON.minify(grunt.file.read(definitionsAbsolutePath)));

      // Define the escape charecter to use for definitions
      var escapeChar = punycode.ucs2.encode([definitionList.escapeCharacters.singleEscape]);
    // }

    // Iterate over all specified file groups.
    this.files.forEach(function (file) {

      var src = file.src.filter(function (filepath) {

        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        
        var contents = grunt.file.read(filepath);

        // Reverse contents for funky RegExp
        contents = esrever.reverse(contents);

        // definitionList.singleCharacters.forEach(function (newChar, sourceChar) {
        for (var sourceChar in definitionList.singleCharacters) {
          
          var newChar = definitionList.singleCharacters[sourceChar];

          // Use Punycode to make sure that unicode is properly formatted
          if (sourceChar.lastIndexOf("0x", 0) === 0) {
            sourceChar = punycode.ucs2.encode([sourceChar]);
          }

          // RegExp template
          // A negative lookbehind by way of a negative lookahead on reversed data
          var re = new RegExp("(" + sourceChar + ")(?!" + escapeChar + ")","g");

          // Use template on contents
          // var replaceWith = "$1" + newChar;
          // contents = contents.replace(re, replaceWith);
          contents = contents.replace(re, newChar);
        }

        // Run final find and replace for escape characters
        for (var ecCharTitle in definitionList.escapeCharacters) {
          
          var ecCharValue = definitionList.escapeCharacters[ecCharTitle];

          // Use Punycode to make sure that unicode is properly formatted
          if (ecCharValue.lastIndexOf("0x", 0) === 0) {
            ecCharValue = punycode.ucs2.encode([ecCharValue]);
          }

          // // RegExp template
          // var eCre = new RegExp("([^" + escapeChar + "])(" + ecCharValue + ")","g");

          // RegExp template
          // A negative lookbehind by way of a negative lookahead on reversed data
          var eCre = new RegExp("(" + ecCharValue + ")(?!" + escapeChar + ")","g");

          // Use template on contents
          contents = contents.replace(eCre, "");
        }


        // Reverse contents back after all funky RegExp is completed 
        contents = esrever.reverse(contents);

        return contents;
      });

      // Write the destination file.
      grunt.file.write(file.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });
};
