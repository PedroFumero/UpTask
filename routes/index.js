const Router = require('express').Router()

// Controllers
const projectsController = require('../controllers/projectsController')
const taskController = require('../controllers/taskController')

// Express validator
const { body } = require('express-validator')

Router.get('/', projectsController.getHome)

Router.get('/new-project', projectsController.getNewProject)

Router.post(
  '/new-project',
  body('name').not().isEmpty().trim().escape(),
  projectsController.postNewProject
)

Router.get('/projects/:projectSlug', projectsController.getProject)

Router.get('/projects/edit/:projectId', projectsController.getEditProject)

Router.post(
  '/projects/edit',
  body('name').not().isEmpty().trim().escape(),
  projectsController.postEditProject
)

Router.delete('/projects/:projectSlug', projectsController.deleteProject)

Router.post('/projects/:projectSlug', taskController.postAddTask)

Router.patch('/tasks/:taskId', taskController.patchChangeStatus)

Router.delete('/tasks/:taskId', taskController.deleteTask)

module.exports = Router
