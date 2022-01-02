const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('uptask_node', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: '3306',
  define: {
    timestamps: false,
  },
})

module.exports = sequelize
