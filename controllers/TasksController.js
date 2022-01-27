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

  patchChangeTaskStatus = async (req, res, next) => {
    const { taskId } = req.params
    const task = await Task.findByPk(taskId)
    task.status = !task.status
    const result = await task.save()

    if (!result) {
      return next()
    }

    res.status(200).send(task.status)
  }

  deleteTask = async (req, res, next) => {
    const { taskId } = req.params
    const result = await Task.destroy({ where: { id: taskId } })
    if (!result) {
      return next()
    }
    res.sendStatus(200)
  }
}

module.exports = new TasksController()
