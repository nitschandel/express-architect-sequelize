'use strict';
const assert = require('assert');
module.exports = function(options, imports) {
  assert(imports.requestResponseUtils, 'Require imports `requestResponseUtils`');

  return function(err, req, res, next) {

    if (typeof err !== 'object') {
      next(err);
      return;
    }


    if (err.name !== 'JsonSchemaValidationError') {
      next(err);
      return;
    }

    let message = 'Bad Request';
    for(let key in err.validationErrors) {
      let errors = err.validationErrors[key][0];
      if(errors && errors.message) {
        message += ' ' + key + ' ' + errors.message;
      }
    }

    console.log('warn', err.message, err.validationErrors);

    imports.requestResponseUtils.responseStructure(400, null, {
      messsage: message,
      jsonSchemaValidationError: true,
      validationErrors: err.validationErrors
    }, message, res);
  };
};
