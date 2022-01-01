const Project = require('../models/Project')

const getHome = (req, res, next) => {
  res.render('index', { pageName: 'Projects' })
}

const getNewProject = (req, res, next) => {
  res.render('newProject', { pageName: 'New Project' })
}

const postNewProject = async (req, res, next) => {
  const { name } = req.body
  let errors = []
  if (!name) {
    errors.push({ text: 'Add a name to the project' })
  }

  if (errors.length > 0) {
    res.render('newProject', {
      pageName: 'New Project',
      errors,
    })
  } else {
    //   There are no errors
    await Project.create({ name })
    res.redirect('/')
  }
}

module.exports = {
  getHome,
  getNewProject,
  postNewProject,
}
