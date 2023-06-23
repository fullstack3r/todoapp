import repository from "../repositories/todo.repository.js";

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

  const values = await repository.all(check);
  res.send(values);
}

async function create(req, res) {
  const { title } = req.body;
  const todo = { title, check: false };
  const result = await repository.create(todo);

  if (result.acknowledged) {
    res.status(201).send("Proyecto creado con exito!");
  } else {
    res.status(500).send("Error al crear el proyecto");
  }

  res.send("Ok!");
}

async function one(req, res) {
  const id = req.params.id;
  const todo = await repository.one(id);

  if (!todo) {
    return res.status(404).send("Task not found");
  }

  res.json(todo);
}

export async function update(req, res) {
  const id = req.params.id;
  const body = req.body;
  const result = await repository.update(id, body);
  if (result.acknowledged) {
    res.status(202).send("Tarea actualizada con exito");
  } else {
    res.status(500).send("ERROR: Tarea no actualizada!");
  }
}

export async function remove(req, res) {
  const id = req.params.id;
  const result = await repository.remove(id);

  if (result.acknowledged) {
    res.status(202).send("Proyecto eliminado con exito!");
  } else {
    res.status(500).send("Imposible eliminar proyecto!");
  }
}

export default { all, create, one, update, remove };
