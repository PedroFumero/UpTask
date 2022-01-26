const express = require('express')
const { body } = require('express-validator/check')

const Router = express.Router()

const { ProjectsController, TasksController } = require('../controllers')

Router.get('/', ProjectsController.getHome)

Router.get('/new-project', ProjectsController.getNewProject)
Router.post(
  '/new-project',
  body('name').not().isEmpty().trim().escape(),
  ProjectsController.postNewProject
)

Router.get('/projects/:slug', ProjectsController.getProject)

Router.get('/projects/edit/:id', ProjectsController.getEditProject)

Router.post(
  '/edit-project',
  body('name').not().isEmpty().trim().escape(),
  ProjectsController.postEditProject
)

Router.delete('/projects', ProjectsController.deleteProject)

Router.post('/projects/:slug', TasksController.postCreateTask)

module.exports = Router
