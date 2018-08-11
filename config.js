'use strict';

var nodeEnv = process.env.NODE_ENV || 'development',
  config;

console.log('Config: starting with NODE_ENV `%s`', nodeEnv);

switch (nodeEnv) {

  case 'test':

    config = require('./config/test.js');
    break;

  case 'test_integration':

    config = require('./config/test.js');
    break;

  case 'production':
    break;

  case 'staging':

    config = require('./config/staging.js');
    break;

  case 'development':

    config = require('./config/development.js');
    break;

  default:
    console.error('Invalid environment `%s` provided', nodeEnv);
}

module.exports = config;
