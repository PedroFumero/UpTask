const express = require('express')
const { body } = require('express-validator/check')

const Router = express.Router()

const {
  ProjectsController,
  TasksController,
  UsersController,
} = require('../controllers')

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

Router.patch('/tasks/:taskId', TasksController.patchChangeTaskStatus)

Router.delete('/tasks/:taskId', TasksController.deleteTask)

Router.get('/signup', UsersController.getSignup)
Router.post('/signup', UsersController.postSignup)

module.exports = Router
