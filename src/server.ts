import express from 'express';

const app = express(); // create app
const port = 3000; // use local open port

const users = [
  { name: 'David', username: 'David9000', password: 'David123' },
  { name: 'Anke', username: 'Anke9000', password: 'Anke123' },
  { name: 'Alice', username: 'Alice9000', password: 'Alice123' },
  { name: 'Zied', username: 'Zied9000', password: 'Zied123' },
];

// Middleware for parsing application/json (strings of the json object is converted into JS)
app.use(express.json());

// POST a new user
app.post('/api/users/', (request, response) => {
  const newUser = request.body;
  const isNameKnown = users.find(
    (newUser) => newUser.username === request.body.username
  );
  if (isNameKnown) {
    response.status(409).send('User already exists.');
  } else {
    users.push(newUser);
    response.send(`${JSON.stringify(newUser)} added`);
  }
});

// DELETE user
app.delete('/api/users/:username', (request, response) => {
  const user = users.find((user) => user.username === request.params.username);
  if (user) {
    const filtered = users.filter(
      (filtered) => filtered.username != request.params.username
    );
    response.send(
      'User ' +
        request.params.username +
        ' deleted' +
        '. Still in: ' +
        JSON.stringify(filtered)
    );
  } else {
    response.status(404).send('Name is unknown');
  }
});

// Display single user
app.get('/api/users/:username/', (request, response) => {
  const user = users.find((user) => user.username === request.params.username);
  if (user) {
    response.send(user);
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
