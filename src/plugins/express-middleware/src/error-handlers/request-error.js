'use strict';
const assert = require('assert');
module.exports = function(options, imports) {
  assert(imports.requestResponseUtils, 'Require imports `requestResponseUtils`');

  return function(err, req, res, next) {

    if (typeof err !== 'object') {
      next(err);
      return;
    }


    if (['RequestError', 'StatusCodeError', 'AlgoliaSearchRequestTimeoutError'].indexOf(err.name) === -1) {
      next(err);
      return;
    }

    let message = err.message;

    if (err.error && err.error.message) {
      message = err.error.message;
    }

    iconsole.log('warn', message, err);


    let errors = {
      message: message,
      requestError: true,
      err: err
    };

    if (err.error && err.error.errors) {
      errors = err.error.errors;
    }

    imports.requestResponseUtils.responseStructure(400, null, errors, message, res);
  };
};
