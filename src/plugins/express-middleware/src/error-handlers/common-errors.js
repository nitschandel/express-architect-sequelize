'use strict';

const errors = require('common-errors');
const assert = require('assert');

module.exports = function(options, imports) {
  assert(imports.requestResponseUtils, 'Require imports `requestResponseUtils`');

  return function(err, req, res, next) {

    if (!(
      err instanceof errors.AlreadyInUseError ||
        err instanceof errors.ArgumentError ||
        err instanceof errors.ArgumentNullError ||
        err instanceof errors.AuthenticationRequiredError ||
        err instanceof errors.ConnectionError ||
        err instanceof errors.HttpStatusError ||
        err instanceof errors.InvalidOperationError ||
        err instanceof errors.NotFoundError ||
        err instanceof errors.NotImplementedError ||
        err instanceof errors.NotSupportedError ||
        err instanceof errors.NotPermittedError ||
        err instanceof errors.OutOfMemoryError ||
        err instanceof errors.RangeError ||
        err instanceof errors.ReferenceError ||
        err instanceof errors.StackOverflowError ||
        err instanceof errors.SyntaxError ||
        err instanceof errors.TimeoutError ||
        err instanceof errors.TypeError ||
        err instanceof errors.URIError ||
        err instanceof errors.ValidationError ||
        err instanceof errors.io.DirectoryNotFoundError ||
        err instanceof errors.io.DriveNotFoundError ||
        err instanceof errors.io.EndOfStreamError ||
        err instanceof errors.io.FileLoadError ||
        err instanceof errors.io.FileNotFoundError ||
        err instanceof errors.io.IOError ||
        err instanceof errors.io.SocketError
    )) {
      next(err);
      return;
    }

    console.log('warn', 'An `common-errors` error occurred:', err);

    console.log('warn', err.stack);

    const HttpStatusError = errors.HttpStatusError;

    if (!err) {
      if (next) return next();
      else return res.end();
    }

    err = new HttpStatusError(err, req);

    if (err.status_code >= 500) {
      console.error(err.stack);
      err.message = HttpStatusError.message_map[500]; // hide the real error from user agent.
    }

    let message = err.message;

    if (message) {
      let messages = message.split(':');
      if (messages.length > 1) {
        message = messages.splice(1, messages.length - 1).join('');
      }
    }

    delete err.stack;

    imports.requestResponseUtils.responseStructure(err.status_code, null, err, message, res);
  };
};
