'use strict';

module.exports = function(expressServer, architectApp) {
  expressServer.use('/api/v1/', architectApp.services.helloWorldRouter);
};
