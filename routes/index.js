const express = require('express')
const { body } = require('express-validator/check')

const Router = express.Router()

const { ProjectsController } = require('../controllers')

Router.get('/', ProjectsController.getHome)

Router.get('/new-project', ProjectsController.getNewProject)
Router.post(
  '/new-project',
  body('name').not().isEmpty().trim().escape(),
  ProjectsController.postNewProject
)

Router.get('/projects/:slug', ProjectsController.getProject)

module.exports = Router
