'use strict';
const express = require('express');
const _ = require('lodash');

module.exports = function initExpressMiddleware(options, imports, register) {
  let middleware = {};
  let router = express();

  try {

    let mergedImports = _.merge({}, middleware, imports);

    router.get('/hello', require('./src/hello-world')(options, mergedImports));

    register(null, _.merge({
        helloWorldRouter: router
    }, middleware));

  } catch (err) {
    register(err);
  }
};
