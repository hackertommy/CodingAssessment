
const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/data', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: 'Tom',
        last_name: 'Serrino'
      })
    })
  })
