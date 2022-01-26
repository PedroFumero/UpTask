const Sequelize = require('sequelize')
const db = require('../config/db')

const Project = require('./Project')

const Task = db.define('Task', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  task: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
})

Task.belongsTo(Project)

module.exports = Task
