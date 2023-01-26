const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  const parsedNotes = JSON.parse(notes);

  return Array.isArray(parsedNotes) ? parsedNotes : []
}

async function writeNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title: title,
    id: Date.now().toString()
  }

  notes.push(note);

  await writeNotes(notes);
  console.log(chalk.bgGreen('Note was added!'));
}

async function removeNote(id) {
  const notes = await getNotes();

  const removingNote = notes.find(note => note.id === id);

  if (removingNote) {
    const updatedNotes = notes.filter(note => note.id !== id);
    await writeNotes(updatedNotes);
    console.log(chalk.green(`Note with id ${id} was deleted`));
  } else {
    console.log(chalk.red(`Not found note with id: ${id}`));
  }

}

async function updateNote(id, title) {
  const notes = await getNotes();

  const updatedNotes = notes.map(note => {
    if (note.id === id) {
      return { ...note, title }
    }

    return note;
  })

  await writeNotes(updatedNotes);

}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue('Here is the list of notes:'));

  notes.forEach(note => {
    console.log(chalk.green('id:'), chalk.blue(note.id), chalk.green('title:'), chalk.blue(note.title))
  });
}


module.exports = {
  addNote, getNotes, updateNote, removeNote, printNotes
}