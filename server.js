const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const PORT = process.env.PORT || 3017;

const app = express();


//* Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* access to files in public folder
app.use(express.static('public'));


//=============================================================================


//* GET Route for  notes section
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


//=====================================================================================
//* API routes ---- 'GET /api/notes' -> read db.json -> return all saved notes as JSON

app.get('/api/notes', (req, res) => {
  //* 
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return
    } else {
      res.send(data);
    }
  })

  //* Log our request to the terminal
  // console.info(`${req.method} request received to get notes`);
});



//* API routes ---- `POST /api/notes` -> receive new note to save on request body -> add to db.json -> return new note to client ++ give each note unique id when saved

app.post('/api/notes', (req, res) => {
  //* 
  req.body.id = uuidv4();

  let savedNotes = fs.readFileSync('./db/db.json', 'utf8');
  let jsonNotes = JSON.parse(savedNotes);
  jsonNotes.push(req.body);
  let newData = JSON.stringify(jsonNotes, null, 2);
  
  fs.writeFile('./db/db.json', newData, (err) => {
    if (err) {
      res.send('SAVE NOTE FAILED:', err)

    } else {
      res.send(`NOTE SUCCESSFULLY SAVED: ID = ${req.body.id}`)
    }
    });
  });

//* delete note with app.delete ---- 

app.delete('/api/notes/:id', (req, res) => {
  let deleteID = req.params.id;
  let savedNotes = fs.readFileSync('./db/db.json', 'utf8');
  let jsonNotes = JSON.parse(savedNotes);
  let updateNotes = jsonNotes.reduce((arr, note) => {
    if (note.id !== deleteID) {
      arr.push(note)
    }
    return arr;
}, []);

let newData = JSON.stringify(updateNotes, null, 2);

fs.writeFile('./db/db.json', newData, (err) => {
  if (err) {
    res.send('DELETE NOTE FAILED:', err)

  } else {
    res.send(`DELETED NOTE: ID = ${req.params.id}` )
  }
});

});

//* HTML Routes
//* GET Route for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//* listen to port 3017
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

