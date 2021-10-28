import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDatabse } from './utils/database';

const app = express(); // create app
const port = 3000; // use local open port

// Middleware for parsing application/json (strings of the json object is converted into JS)
app.use(express.json());

// Middleware for parsing cookies
app.use(cookieParser());

const users = [
  { name: 'David', username: 'David9000', password: 'David123' },
  { name: 'Anke', username: 'Anke9000', password: 'Anke123' },
  { name: 'Alice', username: 'Alice9000', password: 'Alice123' },
  { name: 'Zied', username: 'Zied9000', password: 'Zied123' },
];

// GET logged user
app.get('/api/me', (request, response) => {
  const username = request.cookies.username;
  const foundUser = users.find((user) => user.username === username);
  if (foundUser) {
    response.send(foundUser);
  } else {
    response.status(404).send('User not found');
  }
});

// LOGIN a user (for security reasons, don't tell if only the password is incorrect)
app.post('/api/login/', (request, response) => {
  const isNameKnown = users.find(
    (user) =>
      user.username === request.body.username &&
      user.password === request.body.password
  );
  if (isNameKnown) {
    response.setHeader('Set-Cookie', `username=${isNameKnown.username}`);
    response.send('Login successful.');
  } else {
    response.status(401).send('Incorrect username or password.');
  }
});

// POST a new user
app.post('/api/users/', (request, response) => {
  const newUser = request.body;
  if (
    typeof newUser.name !== 'string' ||
    typeof newUser.username !== 'string' ||
    typeof newUser.password !== 'string'
  ) {
    response.status(404).send('Missing properties');
    return;
  }
  const isNameKnown = users.find(
    (newUser) => newUser.username === request.body.username
  );
  if (isNameKnown) {
    response.status(409).send('User already exists.');
  } else {
    users.push(newUser);
    response.send(`${request.body.username} added`);
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
