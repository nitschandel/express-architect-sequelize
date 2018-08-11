'use strict';
const {Validator} = require('express-json-validator-middleware');
const _ = require('lodash');

module.exports = function initExpressMiddleware(options, imports, register) {
  var middleware = {};

  try {

    // Schema validator middleware
    middleware.expressSchemaValidatorMiddleware = new Validator({allErrors: true});

    // Utils
    middleware.requestResponseUtils = require('./src/utils/request-response')(options, imports);

    // error handlers
    let mergedImports = _.merge({}, imports, middleware);
    middleware.commonErrorsHandlerMiddleware = require('./src/error-handlers/common-errors')(options, mergedImports);
    middleware.jsonSchemaValidationErrorHandlerMiddleware = require(
      './src/error-handlers/json-schema-validation-error')(options, mergedImports);
    middleware.requestErrorHandlerMiddleware = require('./src/error-handlers/request-error')(options, mergedImports);
    middleware.databaseErrorHandlerMiddleware = require('./src/error-handlers/database-error')(options, mergedImports);
    middleware.fallbackErrorMiddleware = require('./src/error-handlers/fallback')(options, mergedImports);

    register(null, middleware);
  } catch (err) {
    register(err);
  }
};
