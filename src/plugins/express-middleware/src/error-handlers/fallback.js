'use strict';

module.exports = function() {
  return function(err, req, res, next) {
    if (!err) {
      next();
      return;
    }
    /* jshint unused: false */

    console.log('error', 'An unexpected error occurred:', err);
    console.log('error', err.stack);

    throw err;
  };
};
