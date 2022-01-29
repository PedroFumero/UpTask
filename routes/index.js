const express = require('express')
const { body } = require('express-validator/check')

const Router = express.Router()

const {
  ProjectsController,
  TasksController,
  UsersController,
  AuthController,
} = require('../controllers')

Router.get('/', AuthController.userAuthenticated, ProjectsController.getHome)

Router.get(
  '/new-project',
  AuthController.userAuthenticated,
  ProjectsController.getNewProject
)
Router.post(
  '/new-project',
  AuthController.userAuthenticated,
  body('name').not().isEmpty().trim().escape(),
  ProjectsController.postNewProject
)

Router.get(
  '/projects/:slug',
  AuthController.userAuthenticated,
  ProjectsController.getProject
)

Router.get(
  '/projects/edit/:id',
  AuthController.userAuthenticated,
  ProjectsController.getEditProject
)

Router.post(
  '/edit-project',
  AuthController.userAuthenticated,
  body('name').not().isEmpty().trim().escape(),
  ProjectsController.postEditProject
)

Router.delete(
  '/projects',
  AuthController.userAuthenticated,
  ProjectsController.deleteProject
)

Router.post(
  '/projects/:slug',
  AuthController.userAuthenticated,
  TasksController.postCreateTask
)

Router.patch(
  '/tasks/:taskId',
  AuthController.userAuthenticated,
  TasksController.patchChangeTaskStatus
)

Router.delete(
  '/tasks/:taskId',
  AuthController.userAuthenticated,
  TasksController.deleteTask
)

Router.get('/signup', UsersController.getSignup)
Router.post('/signup', UsersController.postSignup)

Router.get('/login', UsersController.getLogin)
Router.post('/login', AuthController.userAuthenticate)

Router.get('/logout', AuthController.destroySession)

Router.get('/reset-password', UsersController.getResetPassword)
Router.post('/reset-password', AuthController.sendToken)

Router.get('/reset-password/:token', AuthController.getResetPassword)
Router.post('/reset-password/:token', AuthController.postResetPassword)

module.exports = Router
