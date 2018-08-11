module.exports = {
  "database": {
    "mysql": {
      "db": "dbName",
      "master": {
        "username": "root",
        "host": "127.0.0.1",
        "password":""
      },
      "slave1":
        {
          "username": "root",
          "host": "127.0.0.1",
          "password":""
        }
    }
  },
  "server": {
    "host": "0.0.0.0",
    "port": 27010
  },
  "project": {
    "name": "express-architect-sequelize"
  },
  "logs": {
    "logLevel": "silly"
  }
}
