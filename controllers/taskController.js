const Project = require('../models/Project')
const Task = require('../models/Task')

const postAddTask = async (req, res, next) => {
  const { projectSlug } = req.params
  if (!projectSlug) {
    return res.redirect('/')
  }
  const project = await Project.findOne({ where: { url: projectSlug } })
  const { task } = req.body
  const status = false
  const projectId = project.id
  //   console.log(project)
  //   console.log(req.body)
  //   console.log(projectId)
  const result = await Task.create({ task, status, projectId })
  if (!result) {
    return next()
  }
  res.redirect(`/projects/${projectSlug}`)
}

const patchChangeStatus = async (req, res, next) => {
  //   console.log(req.data)
  const { taskId } = req.params
  const task = await Task.findByPk(taskId)

  //   Changing status
  task.status = task.status == 0 ? true : false

  const result = await task.save()
  if (!result) {
    return next()
  }
  res.status(200).json({ status: result.status })
}

const deleteTask = async (req, res, next) => {
  const { taskId } = req.params
  const result = await Task.destroy({ where: { id: taskId } })
  if (!result) {
    return next()
  }
  res.status(200).send('Task deleted!')
}

module.exports = {
  postAddTask,
  patchChangeStatus,
  deleteTask,
}
