import express from 'express';

const app = express(); // create app
const port = 3000; // local open port

const users = ['David', 'Anke', 'Alice', 'Zied'];

app.get('/api/users/:name/', (request, response) => {
  const isNameKnown = users.includes(request.params.name);
  if (isNameKnown) {
    response.send(request.params.name);
  } else {
    response.status(404).send('Name is unknown'); // Console gibt zusätzlich den Status aus
  }
});

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

// user route anlegen
// wie kann man auf den Namen zugreifen? -> route parameters
