import projects from './modules/projects'
import tasks from './modules/tasks'
import progress from './functions/progress'
import { updateProgress } from './functions/progress'

document.addEventListener('DOMContentLoaded', () => {
  updateProgress()
})
