
const updateButton = document.querySelector('#update-button')

updateButton.addEventListener('click', _ => {
    fetch('/data', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: 'Tom',
        last_name: 'Serrino'
      })
    })
})

const deleteButton = document.querySelector('#delete-button')

deleteButton.addEventListener('click', _ => {
    fetch('/data', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: 'Tom'
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(data => {
        window.location.reload()
      })
  })
