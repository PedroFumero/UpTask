import axios from 'axios'
import Swal from 'sweetalert2'

import { updateProgress } from './functions/progress'

const tasks = document.querySelector('.listado-pendientes')

if (tasks) {
  tasks.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-check-circle')) {
      const icon = e.target
      const taskId = icon.parentElement.parentElement.dataset.taskId

      axios
        .patch(`${location.origin}/tasks/${taskId}`)
        .then((result) => {
          if (result.status === 200) {
            icon.classList.toggle('completo')
            updateProgress()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (e.target.classList.contains('fa-trash')) {
      const icon = e.target
      const taskHTML = icon.parentElement.parentElement
      const taskId = taskHTML.dataset.taskId

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f4c700',
        cancelButtonColor: '#455A64',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${location.origin}/tasks/${taskId}`)
            .then((result) => {
              if (result.status === 200) {
                taskHTML.parentElement.removeChild(taskHTML)
                Swal.fire('Deleted!', 'Your task has been deleted.', 'success')
                updateProgress()
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    }
  })
}
