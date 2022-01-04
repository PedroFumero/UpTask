const Router = require('express').Router()

// Controllers
const projectsController = require('../controllers/projectsController')
const tasksController = require('../controllers/tasksController')
const usersController = require('../controllers/usersControllers')
const authController = require('../controllers/authController')

// Express validator
const { body } = require('express-validator')

Router.get('/', authController.checkAuthentication, projectsController.getHome)

Router.get(
  '/new-project',
  authController.checkAuthentication,
  projectsController.getNewProject
)

Router.post(
  '/new-project',
  authController.checkAuthentication,
  body('name').not().isEmpty().trim().escape(),
  projectsController.postNewProject
)

Router.get(
  '/projects/:projectSlug',
  authController.checkAuthentication,
  projectsController.getProject
)

Router.get(
  '/projects/edit/:projectId',
  authController.checkAuthentication,
  projectsController.getEditProject
)

Router.post(
  '/projects/edit',
  authController.checkAuthentication,
  body('name').not().isEmpty().trim().escape(),
  projectsController.postEditProject
)

Router.delete(
  '/projects/:projectSlug',
  authController.checkAuthentication,
  projectsController.deleteProject
)

Router.post(
  '/projects/:projectSlug',
  authController.checkAuthentication,
  tasksController.postAddTask
)

Router.patch(
  '/tasks/:taskId',
  authController.checkAuthentication,
  tasksController.patchChangeStatus
)

Router.delete(
  '/tasks/:taskId',
  authController.checkAuthentication,
  tasksController.deleteTask
)

Router.get('/create-account', usersController.getCreateAccount)

Router.post('/create-account', usersController.postCreateAccount)

Router.get('/login', usersController.getLogin)

Router.post('/login', authController.authenticateUser)

Router.get('/logout', authController.logOut)

module.exports = Router
