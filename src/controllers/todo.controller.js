import respository from "../repositories/todo.repository.js";

const list = [];
let nextId = 1;

function getTaskById(id) {
  return list.find((t) => t.id == id);
}

function getTaskIndexById(id) {
  return list.findIndex((t) => t.id == id);
}

async function all(req, res) {
  let check;
  if (req.query.check) {
    check = req.query.check == "true";
  }

  const values = await respository.all(check);
  res.send(values);
}

function create(req, res) {
  const body = req.body;
  const todo = {
    id: nextId,
    title: body.title,
    check: false,
  };

  list.push(todo);
  nextId++;

  res.send("Ok!");
}

function one(req, res) {
  // req.params // { id: "1" }
  const id = req.params.id;
  const result = getTaskById(id);

  // validar que result exista!
  if (!result) {
    res.status(404).send("Task not found");
  }

  res.send(result);
}

function update(req, res) {
  const task = getTaskById(req.params.id);
  const body = req.body;

  if (!task) {
    res.status(404).send("Task not found");
  }

  task.title = body.title ? body.title : task.title;
  task.check = body.check;

  res.send("Ok!");
}

function destroy(req, res) {
  const index = getTaskIndexById(req.params.id);
  list.splice(index, 1);
  res.send("Ok!");
}

export default { all, create, one, update, destroy };
