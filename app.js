'use strict';
/**
 * Most of the business login , initialisations and exports will
 * be in plugin directory which other plugin can easily consume.
 * @type {*|exports|module.exports}
 */
var architect = require('architect');
var path = require('path');
var Promise = require('bluebird');
require('dotenv').config();

var app = function(options) {

// Architect js expect config loader as file which it can call require() on.
  return new Promise((resolve, reject) => {

    architect.loadConfig(path.join(__dirname, 'plugin-loader.js'), function(thisErr, loadedPlugins) {

      if (thisErr) {
        reject(thisErr);
        return;
      }

      let finalPlugins = [];

      for(let i = 0; i < loadedPlugins.length; i++) {
        let plugin = loadedPlugins[i];

        if(options && options.includePlugins && options.includePlugins.length) {

          if(options.includePlugins.indexOf(plugin.name) !== -1) {
            finalPlugins.push(plugin);
          }
          continue;
        }

        if(options && options.excludePlugins && options.excludePlugins.length) {
          if(options.excludePlugins.indexOf(plugin.name) !== -1) {
            continue;
          }
        }

        finalPlugins.push(plugin)
      }

      // loadedPlugins is list of all plugins which needs to be pass on to createApp.
      // You can optionally filter out few plugins if required.


      architect.createApp(finalPlugins, (err, architectInstance) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(architectInstance);
      });
    });

  });
};

module.exports = app;
