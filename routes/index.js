const Router = require('express').Router()

// Controllers
const projectsController = require('../controllers/projectsController')

Router.get('/', projectsController.getHome)
Router.get('/new-project', projectsController.getNewProject)
Router.post('/new-project', projectsController.postNewProject)

module.exports = Router
