const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("MIDDLEWARE!");
  next();
});

// CREATE
app.post("/todo", (request, response) => {
  // ... 
  response.send("Ok!");
});

// READ
app.get("/todo", (req, res) => {
  // ... 
  console.log('GET /todo');
  res.send("Ok!");
});

// UPDATE
app.put("/todo", (req, res) => {
  // ...
  res.send("Ok!");
});

// DELETE
app.delete("/todo", (req, res) => {
  // ...
  res.send("Ok!");
});

// Start my server
app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
