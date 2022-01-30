const { Sequelize } = require('sequelize')
// Extract from dotenv
require('dotenv').config({ path: 'variables.env' })

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

module.exports = sequelize
