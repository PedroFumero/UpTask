import Swal from 'sweetalert2'

export const updateProgress = () => {
  const tasks = document.querySelectorAll('li.tarea')
  const percent = document.querySelector('#porcentaje')

  if (tasks.length) {
    const completedTasks = document.querySelectorAll('i.completo')
    let progress = Math.round((completedTasks.length * 100) / tasks.length)
    // console.log(progress)
    percent.style.width = progress + '%'

    if (progress === 100) {
      Swal.fire(
        'Project Completed',
        "Congrats! You've completed all the tasks",
        'success'
      )
    }
  }
}
