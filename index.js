const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Homepage - includes query string form and "enter user ID" form
app.get('/', (req, res) => {
  res.send(`
    <h2>Query String Form (GET)</h2>
    <form action="/search" method="GET">
      <label for="term">Search Term:</label>
      <input type="text" id="term" name="term" required>
      <button type="submit">Search</button>
    </form>

    <hr>

    <h2>Enter User ID (to go to user form)</h2>
    <form action="/user-form" method="GET">
      <label for="userId">User ID:</label>
      <input type="text" name="id" required>
      <button type="submit">Go to User Form</button>
    </form>
  `);
});

// Handle GET query string
app.get('/search', (req, res) => {
  const term = req.query.term;
  res.send(`You searched for: ${term}`);
});

// Redirect to user form based on ID
app.get('/user-form', (req, res) => {
  const userId = req.query.id;
  res.redirect(`/user/${userId}/form`);
});

// Show the form for a specific user (using route param)
app.get('/user/:id/form', (req, res) => {
  const userId = req.params.id;
  res.send(`
    <h2>Submit Name for User ID: ${userId}</h2>
    <form action="/user/${userId}" method="POST">
      <label for="name">Name:</label>
      <input type="text" name="name" required>
      <button type="submit">Submit</button>
    </form>
  `);
});

// Handle form POST with route parameter
app.post('/user/:id', (req, res) => {
  const userId = req.params.id;
  const name = req.body.name;
  res.send(`Form submitted for user ID: ${userId}, with name: ${name}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
