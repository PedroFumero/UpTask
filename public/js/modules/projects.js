import Swal from 'sweetalert2'
import axios from 'axios'

const deleteBtn = document.querySelector('#eliminar-proyecto')

if (deleteBtn) {
  deleteBtn.addEventListener('click', (e) => {
    const urlProject = e.target.dataset.projectUrl

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FDD835',
      cancelButtonColor: '#607D8B',
      confirmButtonText: 'Yes, delete it!',
    })
      .then((result) => {
        if (result.isConfirmed) {
          const url = `${location.origin}/projects/${urlProject}`

          axios.delete(url, { params: urlProject }).then((result) => {
            Swal.fire('Deleted!', result.data, 'success')

            setTimeout(() => {
              location.href = '/'
            }, 3000)
          })
        }
      })
      .catch((err) => {
        Swal.fire({
          title: 'Error',
          text: 'Was not possible to remove the project',
          type: 'error',
        })
      })
  })
}

export default deleteBtn
