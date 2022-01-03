const Project = require('../models/Project')
const Task = require('../models/Task')

const getHome = async (req, res, next) => {
  const projects = await Project.findAll()
  res.render('index', { pageName: 'Projects', projects })
}

const getNewProject = async (req, res, next) => {
  const projects = await Project.findAll()
  res.render('newProject', {
    pageName: 'New Project',
    projects,
    editMode: false,
  })
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
      editMode: false,
    })
  } else {
    //   There are no errors
    await Project.create({ name })
    res.redirect('/')
  }
}

const getProject = async (req, res, next) => {
  const projectsPromise = Project.findAll()
  const projectPromise = Project.findOne({
    where: { url: req.params.projectSlug },
  })

  const [projects, project] = await Promise.all([
    projectsPromise,
    projectPromise,
  ])

  // Querying Tasks of current Project
  const tasks = await Task.findAll({ where: { projectId: project.id } })

  if (!project) {
    return next()
  }

  res.render('task', { pageName: 'Project Task', project, projects, tasks })
}

const getEditProject = async (req, res, next) => {
  const projectsPromise = Project.findAll()
  const projectPromise = Project.findOne({
    where: { id: req.params.projectId },
  })

  const [projects, project] = await Promise.all([
    projectsPromise,
    projectPromise,
  ])

  res.render('newProject', {
    pageName: 'Edit Project',
    projects,
    project,
    editMode: true,
  })
}

const postEditProject = async (req, res, next) => {
  const { projectId, name } = req.body
  if (!projectId) {
    return res.redirect('/')
  }

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
      editMode: false,
    })
  } else {
    //   There are no errors
    await Project.update({ name }, { where: { id: projectId } })
    res.redirect('/')
  }
}

const deleteProject = async (req, res, next) => {
  const { projectSlug } = req.params
  const result = await Project.destroy({ where: { url: projectSlug } })

  if (!result) {
    return next()
  }

  res.status(200).send('Project deleted successfully')
}

module.exports = {
  getHome,
  getNewProject,
  postNewProject,
  getProject,
  getEditProject,
  postEditProject,
  deleteProject,
}
