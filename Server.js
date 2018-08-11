'use strict';
/**
 * Most of the business login , initialisations and exports will be in plugin directory which other
 * plugin can easily consume.
 * @type {*|exports|module.exports}
 */

const app = require('./app');
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
var cors = require('cors');
const expressServer = express();
const queryParser = require('query-parser-express');
const Promise = require('bluebird');

expressServer.use(cors());

// parse application/x-www-form-urlencoded
expressServer.use(bodyParser.urlencoded({extended: false}));

// parse application/json
expressServer.use(bodyParser.json());

// query parser
expressServer.use(queryParser(
  {
    parseBoolean: true, // default true
    parseNumber: true // default true
  }
)); 

app({excludePlugins: []}) // Optionally we can include or exclude plugin name from here.
  .then((architectApp) => {

    global.architectApp = architectApp;

    routes(expressServer, architectApp);


    expressServer.use(architectApp.services.jsonSchemaValidationErrorHandlerMiddleware);
    expressServer.use(architectApp.services.commonErrorsHandlerMiddleware);
    expressServer.use(architectApp.services.requestErrorHandlerMiddleware);
    expressServer.use(architectApp.services.databaseErrorHandlerMiddleware);
    expressServer.use(architectApp.services.fallbackErrorMiddleware);

    process.on('unhandledRejection', function(reason, p) {
      console.error('Unhandled Rejection:', reason.stack);
    });


    // //Handling worse cases expcetions.
    // process.on('unhandledRejection', function(reason, p) {
    //   architectApp.services.logger.error("Unhandled Rejection:", reason.stack);
    // });

    let port = process.env.PORT || 27010;
    expressServer.listen(port);
    console.log('info', 'server started on port', port);
  }).catch((err) => {
    console.log('warn', 'Error in initialising server ', err);
  });
