import axios from 'axios'
import Swal from 'sweetalert2'

import { updateProgress } from '../functions/progress'

const tasks = document.querySelector('.listado-pendientes')

if (tasks) {
  tasks.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-check-circle')) {
      //   console.log('Updating')
      const icon = e.target
      const taskId = icon.parentElement.parentElement.dataset.task
      //   console.log(taskId)
      const url = `${location.origin}/tasks/${taskId}`
      axios.patch(url, { taskId }).then((result) => {
        // console.log(result.data.status)
        //   location.href = url
        if (result.status === 200) {
          icon.classList.toggle('completo')
          updateProgress()
        }
        // window.location.reload()
      })
    }

    if (e.target.classList.contains('fa-trash')) {
      const taskHTML = e.target.parentElement.parentElement
      const taskId = taskHTML.dataset.task

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FDD835',
        cancelButtonColor: '#607D8B',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          //   console.log('Deleting!')
          const url = `${location.origin}/tasks/${taskId}`
          axios.delete(url, { params: { taskId } }).then((result) => {
            if (result.status === 200) {
              taskHTML.parentElement.removeChild(taskHTML)

              Swal.fire('Successfully Deleted!', result.data, 'success')
              updateProgress()
            }
          })
        }
      })
    }
  })
}

export default tasks
