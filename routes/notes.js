const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

//* GET Route for retrieving notes
notes.get('/', (req, res) =>
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))
);

//* POST Route for submitting notes
notes.post('/', (req, res) => {
  //* Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  //* If all the required properties are present
  if (title && text) {
    //* Variable for the object we will save
    const newNotes = {
      title,
      text,
    };

    readAndAppend(newNotes, './db/notes.json');

    const response = {
      status: 'success',
      body: newNotes,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

module.exports = notes;