# grunt-emojs-compiler

> Grunt Compiler for EmoJS

## Major TODOS
* Finish definition list (which you should be able to find soon at https://github.com/EmoJS/emojs-definitions)
* Finish implementation of bracketed escape charaecters
* Publish to npm

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install emojs-compiler --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('emojs-compiler');
```

## The "emojs-compiler" task

### Overview
In your project's Gruntfile, add a section named `emojs-compiler` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  'emojs-compiler': {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### TODO: options.definitionsSrc
Type: `String`
Default value: `lib/definitions.json`

Path to custom definition set

#### TODO: options.definitionsType
Type: `String`
Default value: `default`

Switch for custom definitions

### Usage Examples

#### Default Options
In this example, the default options are used to compile . So if the `main.emojs` file has the content `This is an A: 🌀`, the generated result would be `This is an A: A`

```js
grunt.initConfig({
  'emojs-compiler': {
    options: {},
    files: {
      'dest/main.js': ['src/main.emojs'],
    },
  },
})
```

#### TODO: Custom Options
In this example, the default options are used to compile . So if the `main.emojs` file has the content `This is an A: 🌀`, the generated result would be made according to the custom definiton list

```js
grunt.initConfig({
  'emojs-compiler': {
    options: {
      definitionsType: 'custom',
      definitionsSrc: 'custom-definitions.json',
    },
    files: {
      'dest/main.js': ['src/main.emojs'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0: Initial Release

## License
Copyright (c) 2014 RedRiderX. Licensed under the MIT license.
