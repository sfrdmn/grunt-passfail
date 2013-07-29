# grunt-passfail

> Run functions when your tasks complete or fail.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-passfail --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-passfail');
```

## The "passfail" task

### Overview
In your project's Gruntfile, add a section named `passfail` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  passfail: {
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

All callbacks called in task context, giving you access to the "inside tasks" API:
[http://gruntjs.com/api/inside-tasks](http://gruntjs.com/api/inside-tasks)

Could be useful, for example, to run async logic with `this.async`

#### options.force
### read this!

Type: `Boolean`
Default value: `false`

Alias for the `--force` option on the command line. Defaults to false.
This plugin won't work without force, since it will presumably be the last task
run and will never be run if a previous task fails without --force set.

This is just a convenience so you don't have to supply `--force` all the time, but beware!
It'll force `--force` on all your tasks! force force :O

#### options.fail
Type: `Function`

A function to be run when at least one warning or error has occured anywhere
in the current task. Is passed the number of warnings and errors occurred.

`callback(warncount, errorcount)`

#### options.success
Type: `Function`

A function to be run when no errors nor warnings have occurred. Also, the options `ignoreWarn` and
`ignoreError` can be supplied to affect the condition on which `success` is callled.

#### options.error
Type: `Function`

A function to be run when at least one error has occurred in the current task. It is passed
the number of errors occurred.

`callback(errorcount)`

#### options.warn
Type: `Function`

A function to be run when at least one warning has occurred in the current task. It is passed
the number of warnings occurred.

`callback(warncount)`

### options.ignoreWarn
Type: `Boolean`
Default: `false`

If set to true, warnings will not affect whether the success function will be run.

### options.ignoreError
Type: `Boolean`
Default: `false`

If set to true, errors will not affect whether the success function will be run.

### Usage Examples

```js
grunt.initConfig({
  passfail: {
    options: {
      force: true
    },
    all: {
      success: function() {
        console.log("Cool :)")
      },
      fail: function() {
        console.log("Lame :'(")
      }
    }
  }
})
```

### Possible TODOs

- Use `this.requires` for success / fail checking?
- Allow customizable success and failure conditions?

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
