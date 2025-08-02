require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || null,
    database: process.env.MYSQL_DATABASE || null,
    host: process.env.MYSQL_HOST || '127.0.0.1',
    dialect: process.env.MYSQL_DIALECT || 'mysql',
    port: process.env.MYSQL_PORT || 3306
  },
  test: {
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || null,
    database: process.env.MYSQL_DATABASE || null,
    host: process.env.MYSQL_HOST || '127.0.0.1',
    dialect: process.env.MYSQL_DIALECT || 'mysql',
    port: process.env.MYSQL_PORT || 3306
  },
  production: {
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || null,
    database: process.env.MYSQL_DATABASE || null,
    host: process.env.MYSQL_HOST || '127.0.0.1',
    dialect: process.env.MYSQL_DIALECT || 'mysql',
    port: process.env.MYSQL_PORT || 3306
  }
};
