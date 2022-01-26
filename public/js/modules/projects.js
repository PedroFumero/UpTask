import Swal from 'sweetalert2'
// import Swal from 'sweetalert2/src/sweetalert2'
import axios from 'axios'

const deleteBtn = document.querySelector('#eliminar-proyecto')

if (deleteBtn) {
  deleteBtn.addEventListener('click', (e) => {
    const projectId = e.target.dataset.projectId

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
        const url = `${location.origin}/projects`
        console.log(url)

        axios
          .delete(url, {
            params: {
              id: projectId,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              Swal.fire('Deleted!', 'Your project has been deleted.', 'success')
            }
          })
          .catch(() => {
            Swal.fire('Error!', 'Something went wrong', 'error')
          })
          .finally(() => {
            setTimeout(() => {
              location.href = '/'
            }, 3000)
          })
      }
    })
  })
}
