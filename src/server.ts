import express from 'express';

const app = express(); // create app
const port = 3000; // use local open port

const users = ['David', 'Anke', 'Alice', 'Zied'];

// Middleware for parsing application/json (strings of the json object is converted into JS)
app.use(express.json());

// POST a new user
app.post('/api/users/', (request, response) => {
  const newUser = request.body;
  const isNameKnown = users.includes(newUser.name);
  if (isNameKnown) {
    response.status(409).send('User has already been added.');
  } else {
    users.push(newUser.name);
    response.send(`${newUser.name} added`);
  }
});

// DELETE user
app.delete('/api/users/:name', (request, response) => {
  const isNameKnown = users.includes(request.params.name);
  if (isNameKnown) {
    const index = users.indexOf(request.params.name);
    users.splice(index, 1);
    response.send(
      'User ' + request.params.name + ' deleted' + '. Still in: ' + users
    );
  } else {
    response.status(404).send('Name is unknown');
  }
});

// Display single user
app.get('/api/users/:name/', (request, response) => {
  const isNameKnown = users.includes(request.params.name);
  if (isNameKnown) {
    response.send(request.params.name);
  } else {
    response.status(404).send('Name is unknown'); // status is displayed in console
  }
});

// Display all users
app.get('/api/users', (_request, response) => {
  response.send(users); // returns content of the array
});

app.get('/', (_req, res) => {
  // GET request to root directory (/)
  res.send('Hello World!'); // Server soll "Hello World" zurückschicken
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
