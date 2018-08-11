var config = require('../config');
var environment = process.env.NODE_ENV || 'development';


module.exports[environment] = {
  "username": config.database.mysql.master.username,
  "password": config.database.mysql.master.password,
  "database": config.database.mysql.db,
  "host": config.database.mysql.master.host,
  "dialect": "mysql"
}
