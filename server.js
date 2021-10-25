const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const PORT = process.env.port || 3017;

const app = express();


//* Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* access to files in public folder
app.use(express.static('public'));

//* GET Route for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//* GET Route for  notes section
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//todo: -----------------------------------------------------
//* API routes ---- 'GET /api/notes' -> read db.json -> return all saved notes as JSON

app.get('/api/notes', (req, res) => {
  //* Inform the client
  res.json(`${req.method} request received to get notes`);

  //* Log our request to the terminal
  console.info(`${req.method} request received to get notes`);
});




//todo: --------------------------------------------------------------------
//* API routes ---- `POST /api/notes` -> receive new note to save on request body -> add to db.json -> return new note to client ++ give each note unique id when saved

app.post('/api/notes', (req, res) => {
  //* Inform the client that their POST request was received
  res.json(`${req.method} request received to add a note`);

  //* Log our request to the terminal
  console.info(`${req.method} request received to add a note`);
});


//* listen to port 3017
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
