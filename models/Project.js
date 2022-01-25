const Sequelize = require('sequelize')
const slug = require('slug')
const db = require('../config/db')

const Project = db.define(
  'Project',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
  },
  {
    hooks: {
      beforeCreate(project) {
        const url = `${slug(
          project.name
        ).toLowerCase()}-${Date.now().toString()}`
        project.url = url
      },
    },
  }
)

module.exports = Project
