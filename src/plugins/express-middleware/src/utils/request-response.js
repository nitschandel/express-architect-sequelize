'use strict';

module.exports = function(options, imports) {
  return {

    responseStructure: function(status, data, errors, message, res) {
      let success = status === 200 || status === 201;
      let structuredResponse = {success, data, errors, message, status};
      return res.status(status).send(structuredResponse);
    }

  };
};
