const { Project, Task } = require('../models')

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
    const projectsPromise = Project.findAll()
    const projectPromise = Project.findOne({ where: { url: slug } })

    const [projects, project] = await Promise.all([
      projectsPromise,
      projectPromise,
    ])

    if (!project) {
      return next()
    }

    const tasks = await Task.findAll({ where: { ProjectId: project.id } })

    res.render('tasks', { title: 'Project Tasks', projects, project, tasks })
  }

  getEditProject = async (req, res) => {
    const projectsPromise = Project.findAll()
    const projectPromise = Project.findOne({ where: { id: req.params.id } })

    const [projects, project] = await Promise.all([
      projectsPromise,
      projectPromise,
    ])

    res.render('new-project', { title: 'Edit Project', projects, project })
  }

  postEditProject = async (req, res) => {
    const { id, name, slug } = req.body
    // const project = await Project.findByPk(id)
    await Project.update({ name }, { where: { id } })
    res.redirect(`/projects/${slug}`)
  }

  deleteProject = async (req, res) => {
    const { id } = req.query
    const deleted = await Project.destroy({ where: { id } })
    if (!deleted) {
      return res.status(500).json({ deleted: false })
    }
    res.status(200).json({ deleted: true })
  }
}

module.exports = new ProjectsController()
