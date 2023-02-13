document.addEventListener('click', event => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id

    remove(id).then(() => {
      event.target.closest('li').remove()
    })

  } else if (event.target.dataset.type === 'edit') {
    const li = event.target.closest('li');
    const title = li.querySelector('.title');
    const input = li.querySelector('.input');

    const value = title.innerText;

    title.classList.add('d-none');
    input.classList.remove('d-none');
    input.value = value;

    li.querySelector('.removing').classList.remove('d-none');
    li.querySelector('.base').classList.add('d-none');

  } else if (event.target.dataset.type === 'decline') {

    const li = event.target.closest('li');
    const title = li.querySelector('.title');
    const input = li.querySelector('.input');

    title.classList.remove('d-none');
    input.classList.add('d-none');

    li.querySelector('.removing').classList.add('d-none');
    li.querySelector('.base').classList.remove('d-none');

  } else if (event.target.dataset.type === 'submit') {

    const id = event.target.dataset.id

    const li = event.target.closest('li');
    const title = li.querySelector('.title');
    const input = li.querySelector('.input');

    const newValue = input.value.trim();

    if (newValue.length) {
      update(id, newValue).then(() => {
        title.innerText = newValue;
        title.classList.remove('d-none');
        input.classList.add('d-none');

        li.querySelector('.removing').classList.add('d-none');
        li.querySelector('.base').classList.remove('d-none');
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