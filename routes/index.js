const Router = require('express').Router()

// Controllers
const projectsController = require('../controllers/projectsController')

// Express validator
const { body } = require('express-validator/check')

Router.get('/', projectsController.getHome)

Router.get('/new-project', projectsController.getNewProject)

Router.post(
  '/new-project',
  body('name').not().isEmpty().trim().escape(),
  projectsController.postNewProject
)

Router.get('/projects/:projectSlug', projectsController.getProject)

module.exports = Router
