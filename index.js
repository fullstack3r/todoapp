const express = require("express");
const app = express();
const list = [];
let nextId = 1;

function getTaskById(id) {
  return list.find((t) => t.id == id);
}

function getTaskIndexById(id) {
  return list.findIndex((t) => t.id == id);
}

app.use((req, res, next) => {
  console.log("MIDDLEWARE!");
  next();
});

app.use(express.json());

// CREATE
app.post("/todo", (request, response) => {
  const body = request.body;
  const todo = {
    id: nextId,
    title: body.title,
    check: false,
  };

  list.push(todo);
  nextId++;

  response.send("Ok!");
});

// READ
app.get("/todo", (req, res) => {
  console.log("GET /todo");

  const check = req.query.check == "true";
  const result = list.filter((task) => task.check == check);

  res.send(result);
});

app.get("/todo/:id", (req, res) => {
  // req.params // { id: "1" }
  const id = req.params.id;
  const result = getTaskById(id);

  // validar que result exista!
  if (!result) {
    res.status(404).send("Task not found");
  }

  res.send(result);
});

// UPDATE
app.put("/todo/:id", (req, res) => {
  const task = getTaskById(req.params.id);
  const body = req.body;

  if (!task) {
    res.status(404).send("Task not found");
  }

  task.title = body.title ? body.title : task.title;
  task.check = body.check;

  res.send("Ok!");
});

// DELETE
app.delete("/todo/:id", (req, res) => {
  const index = getTaskIndexById(req.params.id);
  list.splice(index, 1);
  res.send("Ok!");
});

// Start my server
app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
