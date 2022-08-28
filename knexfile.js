const path = require("path");

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,

    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")    
    },

    pool: {
      afterCreate: (connection, callback) => connection.run("PRAGMA foreign_keys = ON", callback)
    },
    
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    }
  }

};
