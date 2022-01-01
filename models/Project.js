const Sequelize = require('sequelize')
const db = require('../config/db')

const Project = db.define('proyects', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  url: {
    type: Sequelize.STRING,
  },
})

module.exports = Project
