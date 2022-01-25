const { Project } = require('../models')

class ProjectsController {
  getHome = async (req, res) => {
    const projects = await Project.findAll()

    res.render('home', { title: 'Home', projects })
  }

  getNewProject = async (req, res) => {
    const projects = await Project.findAll()
    res.render('new-project', { title: 'New Project', projects })
  }

  postNewProject = async (req, res) => {
    const projects = await Project.findAll()
    const { name } = req.body
    let errors = []

    if (!name) {
      errors.push({ text: 'Add a name to the project' })
    }

    if (errors.length > 0) {
      return res.render('new-project', {
        title: 'New Project',
        errors,
        projects,
      })
    } else {
      await Project.create({ name })
      res.redirect('/')
    }
  }

  getProject = async (req, res, next) => {
    const { slug } = req.params
    const project = await Project.findOne({ where: { url: slug } })

    if (!project) {
      return next()
    }

    const projects = await Project.findAll()

    res.render('tasks', { title: 'Project Tasks', projects, project })
  }
}

module.exports = new ProjectsController()
