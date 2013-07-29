/*
 * grunt-passfail
 * https://github.com/sean/grunt-passfail
 *
 * Copyright (c) 2013 Sean Fridman
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var _ = grunt.util._;

  // Set force option when module loaded so it will apply to all tasks
  // Requires the configuration to have already been initialized before task is loaded
  var force = grunt.config(['passfail', 'options', 'force']);
  // Default is false
  if (force) {
    grunt.option('force', true);
  }

  grunt.registerMultiTask('passfail', 'Run functions when your tasks complete or fail.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      force: true,
      fail: false,
      error: false,
      warn: false,
      success: false,
      ignoreWarn: false,
      ignoreError: false
    });

    var taskOptions = grunt.config(['passfail', this.target, 'options']) ||
        grunt.config(['passfail', this.target]) || {};
    var failFn = taskOptions.fail || options.fail;
    var errorFn = taskOptions.error || options.error;
    var warnFn = taskOptions.warn || options.warn;
    var successFn = taskOptions.success || options.success;
    var ignoreWarn = taskOptions.ignoreWarn || options.ignoreWarn;
    var ignoreError = taskOptions.ignoreError || options.ignoreError;
    var warncount = grunt.fail.warncount;
    var errorcount = grunt.fail.errorcount;
    var isWarn = warncount > 0;
    var isError = errorcount > 0;

    if (failFn && (isWarn || isError) && _.isFunction(failFn)) {
      failFn.apply(this, [warncount, errorcount]);
    }
    if (errorFn && isError && _.isFunction(errorFn)) {
      errorFn.call(this, errorcount);
    }
    if (warnFn && isWarn && _.isFunction(warnFn)) {
      warnFn.call(this, warncount);
    }
    if (successFn && _.isFunction(successFn)) {
      // If warning or error, figure out whether it's ignored as success condition
      if (isWarn || isError) {
        if ((ignoreWarn && ignoreError) ||
            (ignoreWarn && !isError) ||
            (ignoreError && !isWarn)) {
          successFn.call(this);
        }
      // Otherwise it's a success
      } else {
        successFn.call(this);
      }
    }

  });

};
