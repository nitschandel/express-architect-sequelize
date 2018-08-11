'use strict';
const assert = require('assert');

module.exports = function(options, imports) {

  return [
    function(req, res, next) {
        imports.requestResponseUtils.responseStructure(200, {message: "HellowWorld"}, null, 'Successfully Implemented', res);
    }
  ];
};
