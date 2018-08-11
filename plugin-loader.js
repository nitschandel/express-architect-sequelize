'use strict';
const fs = require('fs');
const path = require('path');
const config = require('./config');
const _ = require('lodash');
const errors = require('common-errors');
const assert = require('assert');

var assertPropertyExists = function(packageName, obj, propertyName) {
  var msg = 'package.json file for plugin `' + packageName + '` must have the `' + propertyName + '` property';

  try {
    assert(obj[propertyName], msg);
  } catch (err) {
    throw new errors.ArgumentNullError(msg, err);
  }
};

var loadAllPlugins = function() {

  const pluginList = [];
  fs.readdirSync(path.join(__dirname, '/src/plugins'))
    .forEach((pluginName) => {

      // U can read package file for more info.
      var packageFile = path.join(__dirname, '/src/plugins/', pluginName, 'package.json');

      try {
        let packageInfo = JSON.parse(fs.readFileSync(packageFile, {
          encoding: 'utf8'
        }));

        assertPropertyExists(pluginName, packageInfo, 'name');
        assertPropertyExists(pluginName, packageInfo, 'main');
        assertPropertyExists(pluginName, packageInfo, 'plugin');

        // You can push other config parameters which will be available as options in each plugin
        // Pass on or merge config variables with this obj
        var obj = {
          name: pluginName,
          packagePath: './src/plugins/' + pluginName
        };

        pluginList.push(_.merge(obj, config)); // Pushing config with plugin info.

      } catch (err) {
        console.log(err);
        throw new Error('Could not parse package.json');
      }
    });
  return pluginList;
};

module.exports = loadAllPlugins();
