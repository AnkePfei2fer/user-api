import express from 'express';

const app = express(); // erstelle App
const port = 3000; // lokaler offener Port

app.get('/api/users/:name/', (request, response) => {
  response.send(request.params.name);
});

app.get('/api/users', (_request, response) => {
  const users = ['David', 'Anke', 'Alice', 'Zied'];
  response.send(users); // schickt Inhalt des Arrays zurück
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
