/*
 * emojs-compiler
 * emojs.github.io
 *
 * Copyright (c) 2014 RedRiderX
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    'emojs-compiler': {
      default_options: {
        files: {
          // 'tmp/default_options.js': ['test/fixtures/testing.emojs'],
          'tmp/test2.js': ['test/fixtures/test2.emojs'],
          'tmp/test3.js': ['test/fixtures/test3.emojs'],
          'tmp/test4.js': ['test/fixtures/test4.emojs'],
          'tmp/test5.js': ['test/fixtures/test5.emojs']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

    // watch: {
    //   files: '<%= jshint.lint %>',
    //   tasks: ['jshint', 'test']
    // },
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'emojs-compiler', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
