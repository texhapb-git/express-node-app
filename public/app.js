document.addEventListener('click', event => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id

    remove(id).then(() => {
      event.target.closest('li').remove()
    })

  } else if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id
    const value = event.target.dataset.value

    const newValue = prompt(`Введите новое название`, value).trim();

    if (newValue.length) {
      update(id, newValue).then(() => {
        event.target.closest('li').querySelector('.title').innerText = newValue;
      });
    } else {
      alert('Необходимо ввести название');
    }

  }
})

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' })
}

async function update(id, title) {

  const updatedNote = {
    id, title
  }

  await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedNote)
  })
}