const Project = require('../models/Project')

const getHome = async (req, res, next) => {
  const projects = await Project.findAll()
  res.render('index', { pageName: 'Projects', projects })
}

const getNewProject = async (req, res, next) => {
  const projects = await Project.findAll()
  res.render('newProject', { pageName: 'New Project', projects })
}

const postNewProject = async (req, res, next) => {
  let { name } = req.body
  const projects = await Project.findAll()
  let errors = []
  if (!name) {
    errors.push({ text: 'Add a name to the project' })
  }

  if (errors.length > 0) {
    res.render('newProject', {
      pageName: 'New Project',
      errors,
      projects,
    })
  } else {
    //   There are no errors
    await Project.create({ name })
    res.redirect('/')
  }
}

const getProject = async (req, res, next) => {
  const project = await Project.findOne({
    where: { url: req.params.projectSlug },
  })
  const projects = await Project.findAll()

  if (!project) {
    return next()
  }

  res.render('task', { pageName: 'Project Task', project, projects })
}

module.exports = {
  getHome,
  getNewProject,
  postNewProject,
  getProject,
}
