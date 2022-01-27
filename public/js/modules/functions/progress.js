import Swal from 'sweetalert2'

export const updateProgress = () => {
  const tasks = document.querySelectorAll('li.tarea')
  const completedTasks = document.querySelectorAll('.fa-check-circle.completo')
  if (tasks.length) {
    let result = Math.round((completedTasks.length * 100) / tasks.length)
    // console.log(result)
    let progress = document.querySelector('#porcentaje')
    progress.style.width = `${result}%`

    if (result === 100) {
      Swal.fire('Completed!', 'Your project has been completed.', 'success')
    }
  }
}
