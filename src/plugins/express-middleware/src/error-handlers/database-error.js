'use strict';
const assert = require('assert');
module.exports = function(options, imports) {
  assert(imports.requestResponseUtils, 'Require imports `requestResponseUtils`');

  return function(err, req, res, next) {

    if (typeof err !== 'object') {
      next(err);
      return;
    }


    if (['SequelizeDatabaseError', 'SequelizeValidationError',
      'SequelizeUniqueConstraintError'].indexOf(err.name) === -1) {
      next(err);
      return;
    }

    console.log('warn', err.message, err);

    let message = err.message;
    if (err.original && err.original.message) {
      message = err.original.message;
    }

    imports.requestResponseUtils.responseStructure(400, null, err, message, res);
  };
};
