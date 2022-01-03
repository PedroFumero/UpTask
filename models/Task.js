const Sequelize = require('sequelize')
const db = require('../config/db')

const Project = require('./Project')

const Task = db.define('tasks', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  task: Sequelize.STRING(100),
  status: Sequelize.BOOLEAN,
})

Task.belongsTo(Project)

module.exports = Task
