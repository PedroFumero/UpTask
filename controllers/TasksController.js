const { Project, Task } = require('../models')

class TasksController {
  postCreateTask = async (req, res, next) => {
    const slug = req.params.slug
    const project = await Project.findOne({ where: { url: slug } })
    const { task } = req.body
    const result = await Task.create({
      task,
      ProjectId: project.id,
    })

    if (!result) {
      return next()
    }

    res.redirect(`/projects/${slug}`)
  }
}

module.exports = new TasksController()
