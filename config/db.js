const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  host: 'localhost',
  port: '3306',
  dialect: 'mysql',
  username: 'root',
  password: '',
  database: 'uptask_node',
})

module.exports = sequelize
