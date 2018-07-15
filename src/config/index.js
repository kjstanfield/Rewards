// src/config/index.js
require('dotenv').config()

module.exports = {
  appName: 'KFC HD Rewards',
  port: 3030,
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dbName: process.env.DB_NAME
  },
  authdb: {
    username: process.env.AUTH_USERNAME,
    password: process.env.AUTH_PASSWORD,
    host: process.env.AUTH_HOST,
    dbname: process.env.AUTH_NAME
  }
}
