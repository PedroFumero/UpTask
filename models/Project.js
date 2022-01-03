const Sequelize = require('sequelize')
const shortid = require('shortid')
const slug = require('slug')

const db = require('../config/db')

const Project = db.define(
  'projects',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(100),
    },
    url: {
      type: Sequelize.STRING(100),
    },
  },
  {
    hooks: {
      beforeCreate(project) {
        console.log('Before Create')
        const url = slug(project.name)
        project.url = `${url}-${shortid.generate()}`
      },
    },
  }
)

module.exports = Project
