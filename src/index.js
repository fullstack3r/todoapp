import express from "express";
import todoRouter from "./routes/todo.routes.js";

const app = express();

app.use(express.json());
app.use("/", express.static("public"));
app.use("/todo", todoRouter);

// Start my server
app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
